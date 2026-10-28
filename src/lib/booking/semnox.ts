import type { BookingProvider } from './types'

/**
 * Semnox web store adapter — NOT WIRED. This documents how each provider call
 * maps onto the Semnox endpoints observed on bookings.niccoparks.com
 * (ASP.NET WebForms, POST JSON to /assets/ajax/callajax.aspx/<Method>).
 *
 * Calls must run server-side (a Next.js route handler or server action), never
 * from the browser, so site credentials and session cookies stay private.
 *
 *  getAvailability  → GetProductsWithGroups { purchaseDate: 'MM/DD/YYYY', groupId, siteId: 1011 }
 *                     (one call per day; an empty product list = not bookable)
 *  getLaneSlots     → GetAttractionSchedules { attraction: Super Bowl lanes, date }
 *  createOrder      → GuestLogin → AddCartProduct (per line) → ApplyRemoveCoupon (optional)
 *                     → CreateTransactionEstimate → hand-off to the payment gateway (CCAvenue today)
 *
 * Confirm with Semnox before building: API credentials for a server-to-server
 * integration, the product IDs for each ticket and extra, and whether the
 * estimate endpoint returns final taxed prices.
 */
export const semnoxProvider: BookingProvider = {
  name: 'Semnox',
  async getAvailability() {
    throw new Error('Semnox adapter not wired yet — see src/lib/booking/semnox.ts')
  },
  async getLaneSlots() {
    throw new Error('Semnox adapter not wired yet — see src/lib/booking/semnox.ts')
  },
  async createOrder() {
    throw new Error('Semnox adapter not wired yet — see src/lib/booking/semnox.ts')
  },
}
