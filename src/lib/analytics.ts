'use client'

/**
 * Marketing measurement: Google Tag Manager / GA4 / Google Ads / Meta Pixel,
 * all behind the visitor's cookie choice (Consent Mode v2).
 *
 *  np_consent   cookie, 180 days: "a1.m0" = analytics yes, marketing no.
 *
 * Event names follow GA4's recommended ecommerce events so reports, Google
 * Ads conversions and Meta all line up: view_item_list, view_item,
 * view_promotion, select_promotion, add_to_cart, begin_checkout,
 * add_payment_info, purchase, generate_lead (and video_start, share).
 * Prices are rupees, currency INR, GST included.
 */

export type Consent = { analytics: boolean; marketing: boolean }
export type TagConfig = { gtmId?: string; ga4Id?: string; metaPixelId?: string; adsId?: string; adsPurchaseLabel?: string; adsLeadLabel?: string; consentMode: 'basic' | 'advanced' }
export type Item = { item_id: string; item_name: string; price: number; quantity: number; item_category?: string }

type W = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void; __npTags?: TagConfig }
const w = () => (typeof window === 'undefined' ? null : (window as W))

export const CONSENT_COOKIE = 'np_consent'

export function readConsent(): Consent | null {
  if (typeof document === 'undefined') return null
  const m = document.cookie.match(/(?:^|; )np_consent=a([01])\.m([01])/)
  return m ? { analytics: m[1] === '1', marketing: m[2] === '1' } : null
}

export function saveConsent(c: Consent) {
  document.cookie = `${CONSENT_COOKIE}=a${c.analytics ? 1 : 0}.m${c.marketing ? 1 : 0}; Max-Age=${180 * 86400}; Path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`
  w()?.gtag?.('consent', 'update', consentState(c))
  window.dispatchEvent(new CustomEvent('np:consent', { detail: c }))
}

export const consentState = (c: Consent) => ({
  analytics_storage: c.analytics ? 'granted' : 'denied',
  ad_storage: c.marketing ? 'granted' : 'denied',
  ad_user_data: c.marketing ? 'granted' : 'denied',
  ad_personalization: c.marketing ? 'granted' : 'denied',
})

const META: Record<string, string> = {
  view_item: 'ViewContent',
  add_to_cart: 'AddToCart',
  begin_checkout: 'InitiateCheckout',
  add_payment_info: 'AddPaymentInfo',
  purchase: 'Purchase',
  generate_lead: 'Lead',
}

/**
 * One event to every configured tag. With GTM, it goes on the dataLayer
 * (set GA4/Ads/Meta tags up in the container); without GTM, straight to
 * gtag.js and the Meta Pixel. `eventId` lets Meta match it with the copy
 * the server sends (Conversions API) so it's counted once.
 */
export function gaEvent(name: string, params: Record<string, unknown> = {}, eventId?: string) {
  const win = w()
  const cfg = win?.__npTags
  if (!win || !cfg) return
  win.dataLayer = win.dataLayer || []
  if (cfg.gtmId) {
    if ('ecommerce' in params) win.dataLayer.push({ ecommerce: null })
    win.dataLayer.push({ event: name, ...params, ...(eventId ? { event_id: eventId } : {}) })
  } else if (win.gtag && (cfg.ga4Id || cfg.adsId)) {
    const flat = 'ecommerce' in params ? { ...(params.ecommerce as object) } : params
    win.gtag('event', name, flat)
    const label = name === 'purchase' ? cfg.adsPurchaseLabel : name === 'generate_lead' ? cfg.adsLeadLabel : undefined
    if (cfg.adsId && label) win.gtag('event', 'conversion', { send_to: `${cfg.adsId}/${label}`, ...('value' in flat ? { value: (flat as { value: number }).value, currency: 'INR' } : {}), ...(eventId ? { transaction_id: eventId } : {}) })
  }
  const metaName = META[name]
  if (win.fbq && cfg.metaPixelId && metaName && readConsent()?.marketing) {
    const e = ('ecommerce' in params ? params.ecommerce : params) as { value?: number; items?: Item[] }
    win.fbq('track', metaName, { currency: 'INR', value: e.value, content_ids: e.items?.map((i) => i.item_id), content_type: 'product', num_items: e.items?.reduce((n, i) => n + i.quantity, 0) }, eventId ? { eventID: eventId } : undefined)
  }
}

/** Google Ads enhanced conversions: email/phone, hashed by Google's tag. Only with marketing consent. */
export function setUserData(d: { email?: string; phone?: string }) {
  const win = w()
  if (!win?.gtag || !readConsent()?.marketing) return
  const digits = d.phone?.replace(/\D/g, '') ?? ''
  const phone = digits.length === 10 ? `+91${digits}` : digits ? `+${digits}` : undefined
  win.gtag('set', 'user_data', { ...(d.email ? { email: d.email.trim().toLowerCase() } : {}), ...(phone ? { phone_number: phone } : {}) })
}

export const ecommerce = (value: number, items: Item[], extra: Record<string, unknown> = {}) => ({ ecommerce: { currency: 'INR', value, items, ...extra } })
