import { addDays, fromISODate, toISODate } from '@/lib/format'
import { priceCart, type Catalog } from '@/lib/booking/pricing'
import type { Attribution, Cart, Contact, Crowd, DayAvailability, LaneSlot, PaymentMethod } from '@/lib/booking/types'
import { nowISO, q, run } from './db'

/* ------------------------------------------------------------------ */
/*  Capacity                                                           */
/* ------------------------------------------------------------------ */

/** Default gate capacity per day until Semnox supplies the real figure. */
function defaultCapacity(d: Date) {
  const w = d.getDay()
  if (d.getMonth() === 11 && d.getDate() >= 24) return 5000
  return w === 0 || w === 6 ? 6000 : 4000
}

function crowdOf(sold: number, capacity: number): Crowd {
  const r = capacity ? sold / capacity : 1
  if (r >= 1) return 'soldout'
  if (r >= 0.85) return 'few'
  if (r >= 0.6) return 'filling'
  return 'plenty'
}

export async function availability(fromISO: string, days: number): Promise<DayAvailability[]> {
  const start = fromISODate(fromISO)
  const end = toISODate(addDays(start, days - 1))
  const rows = await q<{ date: string; capacity: number; sold: number }>(
    `SELECT date, capacity, sold FROM capacity WHERE pool = 'gate' AND date BETWEEN ? AND ?`,
    [fromISO, end],
  )
  const byDate = new Map(rows.map((r) => [r.date, r]))
  const out: DayAvailability[] = []
  for (let i = 0; i < days; i++) {
    const d = addDays(start, i)
    const iso = toISODate(d)
    const row = byDate.get(iso)
    const crowd = crowdOf(Number(row?.sold ?? 0), Number(row?.capacity ?? defaultCapacity(d)))
    out.push({ date: iso, crowd, bookable: crowd !== 'soldout' })
  }
  return out
}

export async function laneSlots(dateISO: string, laneTimes: string[], lanes = 4): Promise<LaneSlot[]> {
  const rows = await q<{ slot: string; n: number }>(
    `SELECT l.slot AS slot, SUM(l.qty) AS n FROM order_lines l JOIN orders o ON o.id = l.order_id
     WHERE o.visit_date = ? AND l.product_code = 'bowl' AND o.status IN ('paid','confirmed') GROUP BY l.slot`,
    [dateISO],
  )
  const used = new Map(rows.map((r) => [r.slot, Number(r.n)]))
  return laneTimes.map((time) => ({ time, lanesLeft: Math.max(0, lanes - (used.get(time) ?? 0)) }))
}

async function addSold(dateISO: string, n: number) {
  const d = fromISODate(dateISO)
  await run(
    `INSERT INTO capacity (date, pool, capacity, sold) VALUES (?, 'gate', ?, ?)
     ON CONFLICT(date, pool) DO UPDATE SET sold = sold + excluded.sold`,
    [dateISO, defaultCapacity(d), n],
  )
}

/* ------------------------------------------------------------------ */
/*  Orders                                                             */
/* ------------------------------------------------------------------ */

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const ref = () => 'NP-' + Array.from({ length: 6 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('')
const uuid = () => globalThis.crypto.randomUUID()
const paise = (rupees: number) => Math.round(rupees * 100)
/** Amusement park admission: 18% GST, prices shown inclusive. */
const taxOf = (inclusivePaise: number) => Math.round(inclusivePaise - inclusivePaise / 1.18)

export type CreateOrderInput = {
  idempotencyKey?: string
  cart: Cart
  contact: Contact & { email?: string; marketingOptIn?: boolean }
  method: PaymentMethod
  lang?: string
  attribution?: Attribution
  channel?: string
  createdAt?: string // seeding only
  status?: string // seeding only
}

/**
 * Price on the server (never trust the browser), write the order, its lines,
 * one group QR ticket and the payment, and count it against capacity.
 * Calling it twice with the same idempotency key returns the first order.
 */
export async function createOrder(input: CreateOrderInput, catalog: Catalog) {
  const id = input.idempotencyKey || uuid()
  const existing = await q<{ booking_ref: string; total: number }>(`SELECT booking_ref, total FROM orders WHERE id = ?`, [id])
  if (existing[0]) return { bookingId: existing[0].booking_ref, total: Number(existing[0].total) / 100, duplicate: true }

  const { cart, contact } = input
  if (!cart.date) throw new Error('A visit date is required')
  if (!contact.name?.trim() || contact.mobile.replace(/\D/g, '').length < 10) throw new Error('Name and a 10-digit mobile are required')
  const priced = priceCart(cart, catalog)
  const at = input.createdAt || nowISO()
  const status = input.status || 'confirmed'

  const customerId = uuid()
  await run(
    `INSERT INTO customers (id, phone, name, email, wa_optin, consent_at, notice_version, created_at) VALUES (?,?,?,?,?,?,?,?)`,
    [customerId, '+91' + contact.mobile.replace(/\D/g, '').slice(-10), contact.name.trim(), contact.email ?? null, contact.marketingOptIn ? 1 : 0, at, 'v1-2026-10', at],
  )
  if (contact.marketingOptIn) {
    await run(`INSERT INTO consent_log (customer_id, purpose, granted, notice_version, channel, at) VALUES (?,?,?,?,?,?)`, [customerId, 'marketing_whatsapp', 1, 'v1-2026-10', 'web', at])
  }

  const total = paise(priced.total)
  const bookingRef = ref()
  const a = input.attribution ?? {}
  await run(
    `INSERT INTO orders (id, booking_ref, channel, status, visit_date, customer_id, guests, little_ones, subtotal, discount, tax, total,
      payment_method, visitor_id, campaign, variant, promo_code, utm_first, utm_last, lang, created_at, updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      id, bookingRef, input.channel || 'web', status, cart.date, customerId, cart.guests, cart.littleOnes,
      paise(priced.fullTicketsTotal + priced.extrasTotal), paise(priced.saving), taxOf(total), total,
      input.method, a.visitorId ?? null, a.campaign ?? null, a.variant ?? null, a.promoCode ?? null,
      a.utmFirst ? JSON.stringify(a.utmFirst) : null, a.utmLast ? JSON.stringify(a.utmLast) : null, input.lang ?? null, at, at,
    ],
  )
  await run(`INSERT INTO order_lines (order_id, kind, product_code, unit_type, qty, unit_price, discount) VALUES (?,?,?,?,?,?,?)`, [
    id, 'ticket', priced.ticket.id, cart.student ? 'student' : 'standard', cart.guests, paise(priced.unit), paise(priced.saving),
  ])
  if (cart.littleOnes > 0) {
    await run(`INSERT INTO order_lines (order_id, kind, product_code, unit_type, qty, unit_price) VALUES (?,?,?,?,?,0)`, [id, 'ticket', priced.ticket.id, 'child_free', cart.littleOnes])
  }
  for (const l of priced.lines) {
    await run(`INSERT INTO order_lines (order_id, kind, product_code, unit_type, qty, unit_price, slot) VALUES (?,?,?,?,?,?,?)`, [
      id, 'extra', l.id, 'standard', l.qty, paise(l.amount / l.qty), l.time ?? null,
    ])
  }
  await run(`INSERT INTO tickets (id, order_id, barcode, guests, valid_on, status, delivered_via, delivered_at) VALUES (?,?,?,?,?,?,?,?)`, [
    uuid(), id, `${bookingRef}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, cart.guests + cart.littleOnes, cart.date,
    'issued', contact.channel, at,
  ])
  await run(`INSERT INTO payments (id, order_id, gateway, status, amount, method, captured_at) VALUES (?,?,?,?,?,?,?)`, [
    uuid(), id, 'demo', 'captured', total, input.method, at,
  ])
  if (a.promoCode) await run(`INSERT INTO promo_redemptions (code, order_id, discount, at) VALUES (?,?,?,?)`, [a.promoCode, id, paise(priced.saving), at])
  await addSold(cart.date, cart.guests + cart.littleOnes)
  await track({ name: 'purchase', visitorId: a.visitorId, campaign: a.campaign, variant: a.variant, props: { total: priced.total, ref: bookingRef }, at })

  return { bookingId: bookingRef, total: priced.total, duplicate: false }
}

/* ------------------------------------------------------------------ */
/*  Analytics events and leads                                         */
/* ------------------------------------------------------------------ */

export const EVENT_NAMES = ['page_view', 'lp_impression', 'cta_click', 'begin_checkout', 'purchase', 'lead', 'video_play', 'view_promotion', 'select_promotion', 'share', 'chat_open', 'chat_message'] as const

export async function track(e: { name: string; visitorId?: string; sessionId?: string; campaign?: string; variant?: string; path?: string; props?: unknown; at?: string }) {
  if (!(EVENT_NAMES as readonly string[]).includes(e.name)) return
  await run(`INSERT INTO analytics_events (visitor_id, session_id, name, campaign, variant, path, props, at) VALUES (?,?,?,?,?,?,?,?)`, [
    e.visitorId ?? null, e.sessionId ?? null, e.name, e.campaign ?? null, e.variant ?? null, e.path ?? null, e.props ? JSON.stringify(e.props) : null, e.at || nowISO(),
  ])
}

export async function addLead(l: { type: string; name?: string; mobile?: string; email?: string; details?: unknown; source?: string; lang?: string; consent: boolean }) {
  const r = await run(`INSERT INTO leads (type, name, mobile, email, details, source, lang, consent, created_at) VALUES (?,?,?,?,?,?,?,?,?)`, [
    l.type, l.name ?? null, l.mobile ?? null, l.email ?? null, l.details ? JSON.stringify(l.details) : null, l.source ?? null, l.lang ?? null, l.consent ? 1 : 0, nowISO(),
  ])
  await track({ name: 'lead', props: { type: l.type }, path: l.source })
  return Number(r.lastInsertRowid)
}

/* ------------------------------------------------------------------ */
/*  Leads inbox (/admin/leads)                                         */
/* ------------------------------------------------------------------ */

export const LEAD_STATUSES = ['new', 'contacted', 'won', 'lost', 'spam'] as const
export type Lead = {
  id: number
  type: string
  status: string
  name: string | null
  mobile: string | null
  email: string | null
  details: string | null
  source: string | null
  lang: string | null
  consent: number
  notes: string | null
  created_at: string
  updated_at: string | null
  updated_by: string | null
}
export type LeadFilter = { from?: string; to?: string; type?: string; status?: string; source?: string; q?: string; limit?: number; offset?: number }

function leadWhere(f: LeadFilter) {
  const w: string[] = []
  const a: (string | number)[] = []
  if (f.from) (w.push('created_at >= ?'), a.push(f.from))
  if (f.to) (w.push('created_at < ?'), a.push(f.to))
  if (f.type) (w.push('type = ?'), a.push(f.type))
  if (f.status) (w.push('status = ?'), a.push(f.status))
  if (f.source) (w.push('source LIKE ?'), a.push(`%${f.source}%`))
  if (f.q) {
    w.push('(name LIKE ? OR mobile LIKE ? OR email LIKE ? OR details LIKE ? OR notes LIKE ?)')
    a.push(...Array(5).fill(`%${f.q}%`))
  }
  return { sql: w.length ? `WHERE ${w.join(' AND ')}` : '', args: a }
}

export async function listLeads(f: LeadFilter) {
  const { sql, args } = leadWhere(f)
  const [rows, total, byType, byStatus, sources] = await Promise.all([
    q<Lead>(`SELECT * FROM leads ${sql} ORDER BY created_at DESC LIMIT ? OFFSET ?`, [...args, Math.min(f.limit ?? 50, 5000), f.offset ?? 0]),
    q<{ n: number }>(`SELECT COUNT(*) n FROM leads ${sql}`, args),
    q<{ k: string; n: number }>(`SELECT type k, COUNT(*) n FROM leads ${sql} GROUP BY type`, args),
    q<{ k: string; n: number }>(`SELECT status k, COUNT(*) n FROM leads ${sql} GROUP BY status`, args),
    q<{ k: string; n: number }>(`SELECT source k, COUNT(*) n FROM leads GROUP BY source ORDER BY n DESC LIMIT 30`),
  ])
  return { rows, total: Number(total[0]?.n ?? 0), byType, byStatus, sources }
}

export async function updateLead(id: number, patch: { status?: string; notes?: string }, by: string) {
  if (patch.status && !(LEAD_STATUSES as readonly string[]).includes(patch.status)) throw new Error('status')
  await run(`UPDATE leads SET status = COALESCE(?, status), notes = COALESCE(?, notes), updated_at = ?, updated_by = ? WHERE id = ?`, [patch.status ?? null, patch.notes ?? null, nowISO(), by, id])
  return (await q<Lead>(`SELECT * FROM leads WHERE id = ?`, [id]))[0]
}

/** Spreadsheet-friendly CSV (opens in Excel; UTF-8 with BOM so Bengali/Hindi names show). */
export function leadsCsv(rows: Lead[]) {
  const cols = ['id', 'created_at', 'type', 'status', 'name', 'mobile', 'email', 'details', 'source', 'lang', 'consent', 'notes', 'updated_by'] as const
  const cell = (v: unknown) => {
    const s = v === null || v === undefined ? '' : String(v)
    // Guard against spreadsheet formula injection.
    const safe = /^[=@\t\r]|^[+-](?!\d)/.test(s) ? `'${s}` : s
    return /[",\n]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe
  }
  return '\ufeff' + [cols.join(','), ...rows.map((r) => cols.map((c) => cell(r[c])).join(','))].join('\r\n')
}

/* ------------------------------------------------------------------ */
/*  Reports for the Operations dashboard                               */
/* ------------------------------------------------------------------ */

export async function salesSummary(days: number) {
  const since = toISODate(addDays(new Date(), -days + 1))
  const [tot] = await q<{ orders: number; revenue: number; guests: number; little: number }>(
    `SELECT COUNT(*) orders, COALESCE(SUM(total),0) revenue, COALESCE(SUM(guests),0) guests, COALESCE(SUM(little_ones),0) little
     FROM orders WHERE status IN ('paid','confirmed') AND substr(created_at,1,10) >= ?`,
    [since],
  )
  const byProduct = await q<{ product_code: string; qty: number; revenue: number }>(
    `SELECT l.product_code, SUM(l.qty) qty, SUM(l.qty * l.unit_price) revenue FROM order_lines l JOIN orders o ON o.id = l.order_id
     WHERE o.status IN ('paid','confirmed') AND l.unit_type != 'child_free' AND substr(o.created_at,1,10) >= ? GROUP BY l.product_code ORDER BY revenue DESC`,
    [since],
  )
  const byDay = await q<{ day: string; orders: number; revenue: number }>(
    `SELECT substr(created_at,1,10) day, COUNT(*) orders, SUM(total) revenue FROM orders
     WHERE status IN ('paid','confirmed') AND substr(created_at,1,10) >= ? GROUP BY day ORDER BY day`,
    [since],
  )
  const byChannel = await q<{ channel: string; orders: number; revenue: number }>(
    `SELECT channel, COUNT(*) orders, SUM(total) revenue FROM orders WHERE status IN ('paid','confirmed') AND substr(created_at,1,10) >= ? GROUP BY channel ORDER BY revenue DESC`,
    [since],
  )
  const students = await q<{ n: number }>(
    `SELECT COALESCE(SUM(l.qty),0) n FROM order_lines l JOIN orders o ON o.id = l.order_id WHERE l.unit_type = 'student' AND o.status IN ('paid','confirmed') AND substr(o.created_at,1,10) >= ?`,
    [since],
  )
  return { ...tot, students: Number(students[0]?.n ?? 0), byProduct, byDay, byChannel }
}

export async function upcomingCapacity(days = 14) {
  const out = await availability(toISODate(new Date()), days)
  const rows = await q<{ date: string; capacity: number; sold: number }>(`SELECT date, capacity, sold FROM capacity WHERE pool='gate' AND date >= ? ORDER BY date LIMIT ?`, [toISODate(new Date()), days])
  const m = new Map(rows.map((r) => [r.date, r]))
  return out.map((d) => ({ ...d, sold: Number(m.get(d.date)?.sold ?? 0), capacity: Number(m.get(d.date)?.capacity ?? defaultCapacity(fromISODate(d.date))) }))
}

export async function redemptionsSummary(days = 7) {
  const since = toISODate(addDays(new Date(), -days + 1))
  return q<{ day: string; scans: number; ok: number }>(
    `SELECT substr(scanned_at,1,10) day, COUNT(*) scans, SUM(result = 'ok') ok FROM redemptions WHERE substr(scanned_at,1,10) >= ? GROUP BY day ORDER BY day`,
    [since],
  )
}

/** A/B results per campaign and variant: visitors, conversions, rate, revenue, and a two-proportion z-score vs variant A. */
export async function campaignResults() {
  const rows = await q<{ campaign: string; variant: string; visitors: number; clicks: number }>(
    `SELECT campaign, variant, COUNT(DISTINCT CASE WHEN name='lp_impression' THEN COALESCE(visitor_id, id) END) visitors,
            SUM(name='cta_click') clicks
     FROM analytics_events WHERE campaign IS NOT NULL GROUP BY campaign, variant ORDER BY campaign, variant`,
  )
  const conv = await q<{ campaign: string; variant: string; orders: number; revenue: number }>(
    `SELECT campaign, variant, COUNT(*) orders, SUM(total) revenue FROM orders WHERE campaign IS NOT NULL AND status IN ('paid','confirmed') GROUP BY campaign, variant`,
  )
  const cm = new Map(conv.map((c) => [`${c.campaign}|${c.variant}`, c]))
  const result = rows.map((r) => {
    const c = cm.get(`${r.campaign}|${r.variant}`)
    const visitors = Number(r.visitors)
    const orders = Number(c?.orders ?? 0)
    return { campaign: r.campaign, variant: r.variant, visitors, clicks: Number(r.clicks), orders, revenue: Number(c?.revenue ?? 0), rate: visitors ? orders / visitors : 0, z: 0 }
  })
  for (const r of result) {
    const base = result.find((x) => x.campaign === r.campaign && x.variant === 'a')
    if (!base || base === r || !base.visitors || !r.visitors) continue
    const p = (base.orders + r.orders) / (base.visitors + r.visitors)
    const se = Math.sqrt(p * (1 - p) * (1 / base.visitors + 1 / r.visitors))
    r.z = se ? (r.rate - base.rate) / se : 0
  }
  return result
}

export async function recentOrders(limit = 20) {
  return q<{ booking_ref: string; visit_date: string; total: number; guests: number; status: string; channel: string; campaign: string | null; variant: string | null; created_at: string; name: string }>(
    `SELECT o.booking_ref, o.visit_date, o.total, o.guests, o.status, o.channel, o.campaign, o.variant, o.created_at, c.name
     FROM orders o LEFT JOIN customers c ON c.id = o.customer_id ORDER BY o.created_at DESC LIMIT ?`,
    [limit],
  )
}

export async function recentLeads(limit = 20) {
  return q<{ id: number; type: string; status: string; name: string; mobile: string; source: string; created_at: string }>(
    `SELECT id, type, status, name, mobile, source, created_at FROM leads ORDER BY created_at DESC LIMIT ?`,
    [limit],
  )
}
