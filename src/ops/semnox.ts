// Server only: imported by src/payload/endpoints.ts, never by the browser.

/**
 * Semnox (Parafait / Tixera) adapter — SERVER ONLY.
 *
 * Semnox publishes no public API. This client is shaped like the partner
 * APIs ticketing systems usually expose (OCTO-style: catalogue →
 * availability → quote → hold → confirm → tickets → cancel) so that, once
 * Semnox shares documentation and test credentials, only the request/response
 * mapping inside each method changes — not the website.
 *
 * Settings:
 *   .env (secret)   SEMNOX_API_BASE_URL, SEMNOX_API_USER, SEMNOX_API_KEY, SEMNOX_WEBHOOK_SECRET
 *   CMS (not secret) Integrations → Ticketing → Semnox: site ID, website channel/POS, test or live
 *
 * Until it's configured every call throws SemnoxNotReady and the site keeps
 * working on its own booking engine (or sends visitors to the existing
 * booking site, if Integrations → Ticketing says so).
 *
 * Do NOT call the web store's internal endpoints (callajax.aspx) from here
 * without Semnox's written permission: they're not a partner API and can
 * change without notice.
 */

export class SemnoxNotReady extends Error {
  constructor(what = 'Semnox API is not configured (SEMNOX_API_BASE_URL / USER / KEY in .env)') {
    super(what)
  }
}

export type SemnoxSettings = { siteId?: string | null; channel?: string | null; environment?: string | null }

export type SProduct = { productId: string; name: string; price: number; taxIncluded: boolean; kind: 'ticket' | 'extra' | 'lane' }
export type SDay = { date: string; open: boolean; remaining?: number }
export type SSlot = { start: string; end?: string; remaining: number }
export type SQuoteLine = { productId: string; qty: number; unitPrice: number; tax: number; total: number }
export type SQuote = { lines: SQuoteLine[]; discount: number; tax: number; total: number; couponApplied?: string }
export type SHold = { holdId: string; expiresAt: string; quote: SQuote }
export type SBooking = { bookingRef: string; status: 'confirmed' | 'cancelled' | 'redeemed' | 'pending'; tickets: { code: string; qr?: string; productId: string }[] }

function env() {
  const base = process.env.SEMNOX_API_BASE_URL?.replace(/\/$/, '')
  const user = process.env.SEMNOX_API_USER
  const key = process.env.SEMNOX_API_KEY
  return base && user && key ? { base, user, key } : null
}

export const semnoxConfigured = () => !!env()

let token: { value: string; until: number } | null = null

/** One authenticated JSON call. Times out after 10 s; retries once on 401 with a fresh token. */
async function call<T>(path: string, init: { method?: string; body?: unknown; settings?: SemnoxSettings } = {}, retry = true): Promise<T> {
  const cfg = env()
  if (!cfg) throw new SemnoxNotReady()
  if (!token || token.until < Date.now()) {
    // TO CONFIRM with Semnox: the login endpoint and token lifetime.
    const r = await fetch(`${cfg.base}/api/Login/AuthenticateUsers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ LoginId: cfg.user, Password: cfg.key, SiteId: init.settings?.siteId ?? undefined }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!r.ok) throw new Error(`Semnox login failed (${r.status})`)
    const j = (await r.json()) as { data?: { WebApiToken?: string }; token?: string }
    token = { value: j.data?.WebApiToken ?? j.token ?? '', until: Date.now() + 20 * 60_000 }
  }
  const r = await fetch(`${cfg.base}${path}`, {
    method: init.method ?? 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: token.value, ...(init.settings?.siteId ? { SiteId: String(init.settings.siteId) } : {}) },
    body: init.body ? JSON.stringify(init.body) : undefined,
    signal: AbortSignal.timeout(10_000),
  })
  if (r.status === 401 && retry) {
    token = null
    return call<T>(path, init, false)
  }
  if (!r.ok) throw new Error(`Semnox ${path} failed (${r.status})`)
  return (await r.json()) as T
}

/**
 * Each method lists the Semnox call it is expected to map to. Paths are
 * placeholders until Semnox confirms them; responses are normalised to the
 * shapes above so the rest of the site never sees Semnox's format.
 */
export const semnox = {
  async health(s: SemnoxSettings) {
    if (!env()) return { ok: false, reason: 'not configured' }
    try {
      await call('/api/Common/Health', { settings: s })
      return { ok: true }
    } catch (e) {
      return { ok: false, reason: (e as Error).message }
    }
  },
  /** Products for sale on the website channel → ticket, extra or lane. */
  async catalogue(s: SemnoxSettings): Promise<SProduct[]> {
    const j = await call<{ data?: { ProductId: number; ProductName: string; Price: number; TaxInclusive?: boolean; ProductType?: string }[] }>(`/api/Product/Products?posMachine=${encodeURIComponent(s.channel ?? '')}`, { settings: s })
    return (j.data ?? []).map((p) => ({ productId: String(p.ProductId), name: p.ProductName, price: p.Price, taxIncluded: p.TaxInclusive !== false, kind: /lane|bowl/i.test(p.ProductType ?? p.ProductName) ? 'lane' : /meal|combo|add/i.test(p.ProductName) ? 'extra' : 'ticket' }))
  },
  /** Open days and remaining capacity. */
  async availability(s: SemnoxSettings, fromISO: string, days: number): Promise<SDay[]> {
    const j = await call<{ data?: { Date: string; IsOpen: boolean; Available?: number }[] }>(`/api/Product/Availability?fromDate=${fromISO}&days=${days}`, { settings: s })
    return (j.data ?? []).map((d) => ({ date: d.Date.slice(0, 10), open: d.IsOpen, remaining: d.Available }))
  },
  /** Bowling lane slots for a day. */
  async laneSlots(s: SemnoxSettings, dateISO: string): Promise<SSlot[]> {
    const j = await call<{ data?: { StartTime: string; EndTime?: string; Available: number }[] }>(`/api/Attraction/Schedules?date=${dateISO}`, { settings: s })
    return (j.data ?? []).map((x) => ({ start: x.StartTime, end: x.EndTime, remaining: x.Available }))
  },
  /** Prices with GST as Semnox will charge them, with an optional coupon. */
  async quote(s: SemnoxSettings, visitDate: string, lines: { productId: string; qty: number }[], coupon?: string): Promise<SQuote> {
    const j = await call<{ data: { Lines: { ProductId: number; Quantity: number; Price: number; Tax: number; Amount: number }[]; Discount: number; Tax: number; Total: number; Coupon?: string } }>(`/api/Transaction/Estimate`, { method: 'POST', body: { VisitDate: visitDate, Lines: lines.map((l) => ({ ProductId: Number(l.productId), Quantity: l.qty })), CouponNumber: coupon }, settings: s })
    return { lines: j.data.Lines.map((l) => ({ productId: String(l.ProductId), qty: l.Quantity, unitPrice: l.Price, tax: l.Tax, total: l.Amount })), discount: j.data.Discount, tax: j.data.Tax, total: j.data.Total, couponApplied: j.data.Coupon }
  },
  /** Reserve capacity while the visitor pays (released if they don't). */
  async hold(s: SemnoxSettings, visitDate: string, lines: { productId: string; qty: number }[], customer: { name: string; mobile: string; email?: string }, ref: string): Promise<SHold> {
    const j = await call<{ data: { TransactionId: number; ExpiresAt: string; Estimate: Parameters<typeof normQuote>[0] } }>(`/api/Transaction/Hold`, { method: 'POST', body: { ExternalReference: ref, VisitDate: visitDate, Lines: lines, Customer: customer }, settings: s })
    return { holdId: String(j.data.TransactionId), expiresAt: j.data.ExpiresAt, quote: normQuote(j.data.Estimate) }
  },
  /** After the payment gateway says "paid": issue the tickets. */
  async confirm(s: SemnoxSettings, holdId: string, payment: { gateway: string; reference: string; amount: number }): Promise<SBooking> {
    const j = await call<{ data: { TransactionNumber: string; Tickets: { Code: string; QRCode?: string; ProductId: number }[] } }>(`/api/Transaction/${encodeURIComponent(holdId)}/Confirm`, { method: 'POST', body: payment, settings: s })
    return { bookingRef: j.data.TransactionNumber, status: 'confirmed', tickets: j.data.Tickets.map((x) => ({ code: x.Code, qr: x.QRCode, productId: String(x.ProductId) })) }
  },
  async release(s: SemnoxSettings, holdId: string) {
    await call(`/api/Transaction/${encodeURIComponent(holdId)}/Release`, { method: 'POST', settings: s })
  },
  async booking(s: SemnoxSettings, bookingRef: string): Promise<SBooking> {
    const j = await call<{ data: { TransactionNumber: string; Status: string; Tickets: { Code: string; ProductId: number }[] } }>(`/api/Transaction/${encodeURIComponent(bookingRef)}`, { settings: s })
    return { bookingRef: j.data.TransactionNumber, status: (j.data.Status?.toLowerCase() as SBooking['status']) ?? 'confirmed', tickets: j.data.Tickets.map((x) => ({ code: x.Code, productId: String(x.ProductId) })) }
  },
  async changeDate(s: SemnoxSettings, bookingRef: string, newDate: string) {
    await call(`/api/Transaction/${encodeURIComponent(bookingRef)}/Reschedule`, { method: 'POST', body: { VisitDate: newDate }, settings: s })
  },
  async cancel(s: SemnoxSettings, bookingRef: string, reason: string) {
    await call(`/api/Transaction/${encodeURIComponent(bookingRef)}/Cancel`, { method: 'POST', body: { Reason: reason }, settings: s })
  },
}

function normQuote(q: { Lines: { ProductId: number; Quantity: number; Price: number; Tax: number; Amount: number }[]; Discount: number; Tax: number; Total: number }): SQuote {
  return { lines: q.Lines.map((l) => ({ productId: String(l.ProductId), qty: l.Quantity, unitPrice: l.Price, tax: l.Tax, total: l.Amount })), discount: q.Discount, tax: q.Tax, total: q.Total }
}

/**
 * Semnox → website webhook (gate scans, cancellations made at the counter).
 * Signed with SEMNOX_WEBHOOK_SECRET (HMAC-SHA256 of the body, hex) — the
 * header name is TO CONFIRM with Semnox.
 */
export async function verifySemnoxWebhook(body: string, signature: string | null) {
  const secret = process.env.SEMNOX_WEBHOOK_SECRET
  if (!secret || !signature) return false
  const { createHmac, timingSafeEqual } = await import('node:crypto')
  const want = createHmac('sha256', secret).update(body).digest('hex')
  const got = signature.replace(/^sha256=/, '')
  return want.length === got.length && timingSafeEqual(Buffer.from(want), Buffer.from(got))
}
