import type { Extra, Ticket } from '@/content/types'
import { inr } from '@/lib/format'
import type { Cart } from './types'

/** What the cart prices against. Comes from the CMS (tickets, add-ons, lane times). */
export type Catalog = { tickets: Ticket[]; extras: Extra[]; laneTimes: string[] }

export const defaultCart: Cart = {
  date: null,
  ticket: 'pkg',
  guests: 2,
  littleOnes: 0,
  student: false,
  extras: { bowl: 0, pool: 0, meal: 0 },
  laneSlot: 5,
}

export function ticketOf(cart: Cart, catalog: Catalog) {
  return catalog.tickets.find((t) => t.id === cart.ticket) ?? catalog.tickets[0]
}

export function unitPrice(cart: Cart, catalog: Catalog) {
  const t = ticketOf(cart, catalog)
  return cart.student && t.studentPrice ? t.studentPrice : t.price
}

export function priceCart(cart: Cart, catalog: Catalog) {
  const t = ticketOf(cart, catalog)
  const unit = unitPrice(cart, catalog)
  const ticketsTotal = unit * cart.guests
  const fullTicketsTotal = t.price * cart.guests
  const lines = catalog.extras
    .filter((e) => (cart.extras[e.id] ?? 0) > 0)
    .map((e) => ({
      id: e.id,
      name: e.name,
      time: e.needsLaneSlot ? catalog.laneTimes[cart.laneSlot] : undefined,
      qty: cart.extras[e.id],
      amount: e.price * cart.extras[e.id],
    }))
  const extrasTotal = lines.reduce((a, l) => a + l.amount, 0)
  return {
    ticket: t,
    unit,
    ticketsTotal,
    fullTicketsTotal,
    saving: fullTicketsTotal - ticketsTotal,
    lines,
    extrasTotal,
    total: ticketsTotal + extrasTotal,
    totalLabel: inr(ticketsTotal + extrasTotal),
  }
}
