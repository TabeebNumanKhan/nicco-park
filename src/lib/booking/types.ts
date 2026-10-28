import type { Extra, Ticket } from '@/content/types'
import type { Catalog } from './pricing'

export type Crowd = 'plenty' | 'filling' | 'few' | 'soldout'

export type DayAvailability = {
  date: string // YYYY-MM-DD
  crowd: Crowd
  bookable: boolean
}

export type LaneSlot = { time: string; lanesLeft: number }

export type Cart = {
  date: string | null
  ticket: Ticket['id']
  guests: number
  littleOnes: number
  student: boolean
  extras: Record<Extra['id'], number>
  laneSlot: number
}

export type Contact = { name: string; mobile: string; channel: 'whatsapp' | 'sms' | 'email' }
export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet'

/** Where the order came from: visitor, campaign landing page, UTM tags. */
export type Attribution = {
  visitorId?: string
  campaign?: string
  variant?: string
  utmFirst?: Record<string, string>
  utmLast?: Record<string, string>
  promoCode?: string
}

export type OrderContext = { catalog: Catalog; lang: string; attribution?: Attribution }

export type Order = {
  bookingId: string
  cart: Cart
  contact: Contact
  total: number
}

/**
 * Everything the front end needs from a ticketing system. The site ships
 * with `mockProvider`; `semnoxProvider` documents how each call maps to the
 * Semnox web store endpoints found in the backend audit.
 */
export interface BookingProvider {
  name: string
  getAvailability(fromISO: string, days: number): Promise<DayAvailability[]>
  getLaneSlots(dateISO: string, laneTimes?: string[]): Promise<LaneSlot[]>
  createOrder(cart: Cart, contact: Contact, method: PaymentMethod, ctx: OrderContext): Promise<Order>
}
