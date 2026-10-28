import { mockProvider } from './mock'
import type { BookingProvider } from './types'

/**
 * The website's own booking API (src/payload/endpoints.ts → operations
 * database). Prices are recalculated on the server from the CMS; the browser's
 * total is never trusted. Semnox replaces the inside of these endpoints, not
 * this file.
 */
async function json<T>(res: Response): Promise<T> {
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error((body as { error?: string }).error || `Request failed (${res.status})`)
  return body as T
}

export const apiProvider: BookingProvider = {
  name: 'Live',
  // Reads fall back to demo data if the API is unreachable, so the calendar always shows.
  async getAvailability(fromISO, days) {
    try {
      return await json(await fetch(`/api/booking/availability?from=${fromISO}&days=${days}`, { cache: 'no-store' }))
    } catch {
      return mockProvider.getAvailability(fromISO, days)
    }
  },
  async getLaneSlots(date, laneTimes) {
    try {
      return await json(await fetch(`/api/booking/lane-slots?date=${date}`, { cache: 'no-store' }))
    } catch {
      return mockProvider.getLaneSlots(date, laneTimes)
    }
  },
  async createOrder(cart, contact, method, ctx) {
    const idempotencyKey = crypto.randomUUID()
    const res = await fetch('/api/booking/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idempotencyKey, cart, contact, method, lang: ctx.lang, attribution: ctx.attribution }),
    })
    const o = await json<{ bookingId: string; total: number }>(res)
    return { bookingId: o.bookingId, cart, contact, total: o.total }
  },
}
