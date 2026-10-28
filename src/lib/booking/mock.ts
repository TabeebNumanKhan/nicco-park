import { addDays, fromISODate, toISODate } from '@/lib/format'
import { priceCart } from './pricing'
import type { BookingProvider, Crowd, DayAvailability } from './types'

/**
 * Demo availability for the static preview copy of the site (no server):
 * weekends busy, Fridays filling, one Sunday sold out. Deterministic for a
 * given "today" so server and browser agree.
 */
export function crowdFor(d: Date, today: Date): Crowd {
  let soldIdx = 8
  while (addDays(today, soldIdx).getDay() !== 0) soldIdx++
  const sold = toISODate(addDays(today, soldIdx))
  if (toISODate(d) === sold) return 'soldout'
  if (d.getMonth() === 11 && d.getDate() >= 24) return 'few'
  const w = d.getDay()
  if (w === 0 || w === 6) return 'few'
  if (w === 5) return 'filling'
  return 'plenty'
}

const LANES_LEFT = [4, 4, 3, 2, 0, 2, 1, 3]

export const mockProvider: BookingProvider = {
  name: 'Demo data',
  async getAvailability(fromISO, days) {
    const start = fromISODate(fromISO)
    const out: DayAvailability[] = []
    for (let i = 0; i < days; i++) {
      const d = addDays(start, i)
      const crowd = crowdFor(d, start)
      out.push({ date: toISODate(d), crowd, bookable: crowd !== 'soldout' })
    }
    return out
  },
  async getLaneSlots(_date, laneTimes = []) {
    return laneTimes.map((time, i) => ({ time, lanesLeft: LANES_LEFT[i % LANES_LEFT.length] }))
  },
  async createOrder(cart, contact, _method, ctx) {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let id = 'NP-'
    for (let i = 0; i < 6; i++) id += alphabet[Math.floor(Math.random() * alphabet.length)]
    await new Promise((r) => setTimeout(r, 700))
    return { bookingId: id, cart, contact, total: priceCart(cart, ctx.catalog).total }
  },
}
