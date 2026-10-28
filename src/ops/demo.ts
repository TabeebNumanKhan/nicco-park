/**
 * Demo operations data, so the Operations dashboard can be reviewed before
 * real bookings exist: ~60 days of orders, gate scans, two A/B tests and some
 * leads. Every name and number is invented. Turn off with OPS_DEMO_DATA=0 and
 * delete data/ops.db to start clean.
 */
import type { Catalog } from '@/lib/booking/pricing'
import type { Cart, PaymentMethod } from '@/lib/booking/types'
import { addDays, toISODate } from '@/lib/format'
import { nowISO, q, run } from './db'
import { addLead, createOrder, track } from './service'

const FIRST = ['Aarav', 'Riya', 'Sourav', 'Ananya', 'Rohan', 'Puja', 'Arjun', 'Tania', 'Kunal', 'Priya', 'Debjit', 'Sneha', 'Rahul', 'Moumita', 'Vikram', 'Ishita', 'Sayan', 'Neha', 'Abhishek', 'Payel']
const LAST = ['Das', 'Sen', 'Ghosh', 'Banerjee', 'Mukherjee', 'Chatterjee', 'Bose', 'Roy', 'Gupta', 'Sharma', 'Singh', 'Agarwal', 'Dutta', 'Paul', 'Saha']

/** Small deterministic random generator so the demo looks the same every time. */
function rng(seed = 42) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 2 ** 32
  }
}

export async function seedOpsDemo(catalog: Catalog, log: (m: string) => void = () => {}) {
  const [{ n }] = await q<{ n: number }>(`SELECT COUNT(*) n FROM orders`)
  if (Number(n) > 0) {
    log('operations database already has orders — demo data skipped')
    return
  }
  const r = rng()
  const pick = <T,>(xs: T[]) => xs[Math.floor(r() * xs.length)]
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const methods: PaymentMethod[] = ['upi', 'upi', 'upi', 'card', 'netbanking', 'wallet']
  const channels = ['web', 'web', 'web', 'whatsapp', 'whatsapp', 'gate', 'district']
  let count = 0

  async function order(createdAt: Date, extra: { campaign?: string; variant?: string; channel?: string; student?: boolean } = {}) {
    const visit = addDays(createdAt, 1 + Math.floor(r() * 12))
    const ticket = pick(['pkg', 'pkg', 'pkg', 'dry', 'dry', 'meal']) as Cart['ticket']
    const cart: Cart = {
      date: toISODate(visit),
      ticket,
      guests: 1 + Math.floor(r() * 5),
      littleOnes: r() < 0.3 ? 1 : 0,
      student: extra.student ?? (ticket !== 'meal' && r() < 0.18),
      extras: { bowl: r() < 0.12 ? 1 + Math.floor(r() * 2) : 0, pool: r() < 0.06 ? 1 : 0, meal: r() < 0.1 ? 2 : 0 },
      laneSlot: Math.floor(r() * Math.max(1, catalog.laneTimes.length)),
    }
    const at = new Date(createdAt.getTime() + (9 + r() * 13) * 3600 * 1000)
    const vid = `demo-${Math.floor(r() * 1e9)}`
    await createOrder(
      {
        cart,
        contact: { name: `${pick(FIRST)} ${pick(LAST)}`, mobile: `98${String(Math.floor(1e7 + r() * 9e7))}`, channel: pick(['whatsapp', 'whatsapp', 'sms', 'email']), marketingOptIn: r() < 0.4 },
        method: pick(methods),
        channel: extra.channel ?? pick(channels),
        lang: pick(['en', 'en', 'bn', 'bn', 'hi']),
        attribution: { visitorId: vid, campaign: extra.campaign, variant: extra.variant, utmLast: extra.campaign ? { utm_source: pick(['facebook', 'instagram', 'google']), utm_medium: 'paid' } : undefined },
        createdAt: at.toISOString(),
      },
      catalog,
    )
    count++
  }

  /* Everyday sales: busier at weekends and in the last two weeks (Puja season). */
  for (let d = 60; d >= 0; d--) {
    const day = addDays(today, -d)
    const weekend = day.getDay() === 0 || day.getDay() === 6
    const n = Math.round((weekend ? 22 : 11) * (d < 14 ? 1.4 : 1) * (0.8 + r() * 0.4))
    for (let i = 0; i < n; i++) await order(day)
  }
  log(`${count} orders`)

  /* Two A/B tests on offer landing pages. B converts better on Fun Fest; Students is a near tie. */
  const tests: { campaign: string; rate: Record<string, number>; visitors: number; student?: boolean }[] = [
    { campaign: 'offer:fun-fest', rate: { a: 0.028, b: 0.043 }, visitors: 1400 },
    { campaign: 'offer:student-offer', rate: { a: 0.035, b: 0.037 }, visitors: 900, student: true },
  ]
  for (const tst of tests) {
    for (const variant of ['a', 'b']) {
      for (let i = 0; i < tst.visitors; i++) {
        const at = addDays(today, -Math.floor(r() * 21))
        const vid = `demo-v-${tst.campaign}-${variant}-${i}`
        const iso = new Date(at.getTime() + r() * 20 * 3600 * 1000).toISOString()
        await track({ name: 'lp_impression', visitorId: vid, campaign: tst.campaign, variant, path: `/en/${tst.campaign.replace('offer:', 'offers/')}`, at: iso })
        if (r() < 0.22) await track({ name: 'cta_click', visitorId: vid, campaign: tst.campaign, variant, at: iso })
        if (r() < tst.rate[variant]) await order(at, { campaign: tst.campaign, variant, channel: 'web', student: tst.student })
      }
    }
  }
  log(`A/B traffic for ${tests.length} campaigns`)

  /* Gate scans for visits that have happened. */
  const due = await q<{ id: string; valid_on: string }>(`SELECT id, valid_on FROM tickets WHERE valid_on <= ?`, [toISODate(today)])
  for (const tk of due) {
    if (r() < 0.06) continue // no-shows
    const at = new Date(`${tk.valid_on}T${String(10 + Math.floor(r() * 6)).padStart(2, '0')}:${String(Math.floor(r() * 60)).padStart(2, '0')}:00+05:30`).toISOString()
    await run(`INSERT INTO redemptions (ticket_id, point, device, result, scanned_at) VALUES (?,?,?,?,?)`, [tk.id, 'main-gate', `gate-${1 + Math.floor(r() * 4)}`, r() < 0.985 ? 'ok' : 'rejected', at])
    await run(`UPDATE tickets SET status='redeemed' WHERE id=?`, [tk.id])
  }
  log(`${due.length} tickets scanned at the gate`)

  /* Enquiries and sign-ups. */
  for (let i = 0; i < 36; i++) {
    await addLead({
      type: pick(['groups', 'groups', 'offers', 'offers', 'waitlist', 'callback']),
      name: `${pick(FIRST)} ${pick(LAST)}`,
      mobile: `97${String(Math.floor(1e7 + r() * 9e7))}`,
      source: pick(['page:groups', 'offer:fun-fest', 'world:snow-park', 'page:home']),
      lang: pick(['en', 'bn', 'hi']),
      consent: true,
    })
  }
  await run(`UPDATE leads SET created_at = datetime('now', '-' || (abs(random()) % 20) || ' days')`, [])
  log(`demo data ready (${nowISO()})`)
}
