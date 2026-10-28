'use client'

/**
 * Who sent this visitor, and which campaign variant they saw.
 *
 *  np_vid           visitor id (cookie set by src/proxy.ts; 1 year)
 *  np_utm_first     first utm_* set we saw (cookie, 90 days)
 *  np_utm_last      latest utm_* set (cookie, 30 days)
 *  np-campaign      last landing page seen: { campaign, variant, promoCode, at } (localStorage, 7 days)
 *
 * Checkout sends all of this with the order, so the Operations dashboard can
 * say which ad and which variant sold which tickets.
 */
import type { Attribution } from '@/lib/booking/types'

const STATIC = process.env.NEXT_PUBLIC_STATIC === '1'
const WEEK = 7 * 24 * 3600 * 1000

function cookie(name: string) {
  if (typeof document === 'undefined') return undefined
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return m ? decodeURIComponent(m[1]) : undefined
}
function json<T>(raw?: string | null): T | undefined {
  try {
    return raw ? (JSON.parse(raw) as T) : undefined
  } catch {
    return undefined
  }
}

export function visitorId() {
  const fromCookie = cookie('np_vid')
  if (fromCookie) return fromCookie
  try {
    let id = localStorage.getItem('np-vid')
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem('np-vid', id)
    }
    return id
  } catch {
    return undefined
  }
}

export function rememberCampaign(c: { campaign: string; variant: string; promoCode?: string }) {
  try {
    localStorage.setItem('np-campaign', JSON.stringify({ ...c, at: Date.now() }))
  } catch {}
}

export function attribution(): Attribution {
  let camp: { campaign?: string; variant?: string; promoCode?: string; at?: number } | undefined
  try {
    camp = json(localStorage.getItem('np-campaign'))
  } catch {}
  if (camp?.at && Date.now() - camp.at > WEEK) camp = undefined
  return {
    visitorId: visitorId(),
    campaign: camp?.campaign,
    variant: camp?.variant,
    promoCode: camp?.promoCode,
    utmFirst: json(cookie('np_utm_first')),
    utmLast: json(cookie('np_utm_last')),
  }
}

/** Send a measurement event to the operations database. Never blocks the page. */
export function track(name: string, data: { campaign?: string; variant?: string; props?: Record<string, unknown> } = {}) {
  if (STATIC || typeof window === 'undefined') return
  const body = JSON.stringify({ name, visitorId: visitorId(), path: location.pathname, ...data })
  try {
    if (navigator.sendBeacon) navigator.sendBeacon('/api/track', new Blob([body], { type: 'application/json' }))
    else void fetch('/api/track', { method: 'POST', body, headers: { 'Content-Type': 'application/json' }, keepalive: true })
  } catch {}
}
