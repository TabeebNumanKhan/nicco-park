// Server only: imported by src/payload/endpoints.ts, never by the browser.
import type { Payload } from 'payload'
import type { DayAvailability, LaneSlot } from '@/lib/booking/types'
import { semnox, semnoxConfigured, type SemnoxSettings } from './semnox'
import { run } from './db'
import { availability, laneSlots } from './service'

export type TicketingMode = 'demo' | 'linkout' | 'semnox'
export type TicketingSettings = { mode: TicketingMode; bookingUrl: string; semnox: SemnoxSettings }

/** CMS → Integrations → Ticketing. TICKETING_MODE in .env overrides it (e.g. to force link-out in an emergency). */
export async function ticketingSettings(payload: Payload): Promise<TicketingSettings> {
  let g: Record<string, unknown> = {}
  try {
    g = (await payload.findGlobal({ slug: 'integrations', depth: 0, overrideAccess: true })) as unknown as Record<string, unknown>
  } catch {}
  const envMode = process.env.TICKETING_MODE
  const mode = (['demo', 'linkout', 'semnox'].includes(envMode ?? '') ? envMode : g.ticketingMode ?? 'demo') as TicketingMode
  const url = typeof g.bookingUrl === 'string' && /^https:\/\//.test(g.bookingUrl) ? g.bookingUrl : 'https://bookings.niccoparks.com'
  return { mode, bookingUrl: url, semnox: (g.semnox as SemnoxSettings) ?? {} }
}

const crowdOf = (remaining?: number): DayAvailability['crowd'] => (remaining === undefined ? 'plenty' : remaining <= 0 ? 'soldout' : remaining < 150 ? 'few' : remaining < 600 ? 'filling' : 'plenty')

/** Days for the calendar: Semnox when it's switched on and answering, otherwise the site's own capacity. */
export async function availabilityVia(payload: Payload, fromISO: string, days: number): Promise<DayAvailability[]> {
  const s = await ticketingSettings(payload)
  if (s.mode === 'semnox' && semnoxConfigured()) {
    try {
      return (await semnox.availability(s.semnox, fromISO, days)).map((d) => ({ date: d.date, bookable: d.open && (d.remaining ?? 1) > 0, crowd: crowdOf(d.remaining) }))
    } catch (e) {
      payload.logger.warn({ err: e }, 'Semnox availability failed; using site capacity')
    }
  }
  return availability(fromISO, days)
}

export async function laneSlotsVia(payload: Payload, dateISO: string, laneTimes: string[]): Promise<LaneSlot[]> {
  const s = await ticketingSettings(payload)
  if (s.mode === 'semnox' && semnoxConfigured()) {
    try {
      return (await semnox.laneSlots(s.semnox, dateISO)).map((x) => ({ time: x.start.slice(11, 16) || x.start, lanesLeft: x.remaining }))
    } catch (e) {
      payload.logger.warn({ err: e }, 'Semnox lane slots failed; using site capacity')
    }
  }
  return laneSlots(dateISO, laneTimes)
}

/** Semnox → website events (gate scans, counter cancellations), kept for the Operations dashboard. */
export async function recordTicketingEvent(kind: string, ref: string, body: unknown) {
  await run(`INSERT INTO ticketing_events (kind, ref, payload, at) VALUES (?,?,?,?)`, [kind.slice(0, 40), ref.slice(0, 80), JSON.stringify(body).slice(0, 8000), new Date().toISOString()])
}
