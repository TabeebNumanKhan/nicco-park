'use client'

import { useEffect } from 'react'
import { gaEvent } from '@/lib/analytics'
import { rememberCampaign, track } from '@/lib/attribution'

/**
 * Counts the landing-page view and button clicks for the A/B results, and
 * remembers the campaign so a booking made later in the visit is credited.
 */
export function LandingTracker({ campaign, variant, promoCode, tested }: { campaign: string; variant: string; promoCode?: string; tested: boolean }) {
  useEffect(() => {
    rememberCampaign({ campaign, variant, promoCode })
    track('lp_impression', { campaign, variant, props: { tested } })
    const promo = { promotion_id: campaign, promotion_name: campaign, creative_name: variant, creative_slot: 'landing' }
    gaEvent('view_promotion', { ecommerce: { ...promo, items: [{ item_id: campaign, item_name: campaign, ...promo }] } })
    const root = document.getElementById('landing')
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a')
      if (a && root?.contains(a)) {
        track('cta_click', { campaign, variant, props: { href: a.getAttribute('href'), primary: a.dataset.track === 'cta' } })
        if (a.dataset.track === 'cta') gaEvent('select_promotion', { ecommerce: { promotion_id: campaign, promotion_name: campaign, creative_name: variant, items: [{ item_id: campaign, item_name: campaign }] } })
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [campaign, variant, promoCode, tested])
  return null
}
