'use client'

import { Cookie } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLang } from '@/i18n/LangProvider'
import { type Consent, readConsent, saveConsent, type TagConfig } from '@/lib/analytics'
import { SiteLink } from '../ui/SiteLink'

function addScript(id: string, src: string) {
  if (document.getElementById(id)) return
  const s = document.createElement('script')
  s.id = id
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

function load(cfg: TagConfig, c: Consent | null) {
  const w = window as Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; fbq?: unknown; _fbq?: unknown }
  const any = !!c && (c.analytics || c.marketing)
  // Basic mode: nothing loads before a "yes". Advanced: Google tags load with everything denied (cookieless pings).
  const google = cfg.consentMode === 'advanced' || any
  if (google && cfg.gtmId && !document.getElementById('np-gtm')) {
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    addScript('np-gtm', `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(cfg.gtmId)}`)
  } else if (google && !cfg.gtmId && (cfg.ga4Id || cfg.adsId) && !document.getElementById('np-gtag')) {
    addScript('np-gtag', `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent((cfg.ga4Id || cfg.adsId)!)}`)
    w.gtag?.('js', new Date())
    if (cfg.ga4Id) w.gtag?.('config', cfg.ga4Id)
    if (cfg.adsId) w.gtag?.('config', cfg.adsId, { allow_enhanced_conversions: true })
  }
  // Meta has no consent mode: the Pixel loads only after a "yes" to marketing.
  if (cfg.metaPixelId && c?.marketing && !w.fbq) {
    const q: unknown[] = []
    const fbq = (...a: unknown[]) => q.push(a)
    Object.assign(fbq, { queue: q, loaded: true, version: '2.0', push: fbq, callMethod: undefined })
    w.fbq = fbq
    w._fbq = fbq
    addScript('np-fbq', 'https://connect.facebook.net/en_US/fbevents.js')
    ;(w.fbq as (...a: unknown[]) => void)('init', cfg.metaPixelId)
    ;(w.fbq as (...a: unknown[]) => void)('track', 'PageView')
  }
}

/**
 * Loads the tags set in CMS → Tracking, and the cookie banner. Nothing is
 * shown or loaded when no tag is configured.
 */
export function Tags({ cfg, banner, privacyUrl }: { cfg: TagConfig; banner: boolean; privacyUrl: string }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [choose, setChoose] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(true)
  const configured = !!(cfg.gtmId || cfg.ga4Id || cfg.adsId || cfg.metaPixelId)

  useEffect(() => {
    if (!configured) return
    const c = readConsent()
    load(cfg, c)
    if (!c && banner) setOpen(true)
    if (c) (setAnalytics(c.analytics), setMarketing(c.marketing))
    const onConsent = (e: Event) => load(cfg, (e as CustomEvent<Consent>).detail)
    const onOpen = () => (setChoose(true), setOpen(true))
    window.addEventListener('np:consent', onConsent)
    window.addEventListener('np:consent-open', onOpen)
    return () => {
      window.removeEventListener('np:consent', onConsent)
      window.removeEventListener('np:consent-open', onOpen)
    }
  }, [cfg, banner, configured])

  if (!open || !configured) return null
  const done = (c: Consent) => {
    saveConsent(c)
    setOpen(false)
  }
  return (
    <section
      role="region"
      aria-labelledby="np-consent-h"
      className="fixed inset-x-3 bottom-[88px] z-[70] mx-auto max-w-[620px] rounded-[22px] border-2 border-ink bg-white p-4 text-ink shadow-[6px_6px_0_0_var(--ink)] md:bottom-5 md:p-5"
    >
      <h2 id="np-consent-h" className="flex items-center gap-2 text-lg font-bold">
        <Cookie size={20} aria-hidden="true" className="flex-none" />
        {t('Cookies on Nicco Park')}
      </h2>
      <p className="mt-1.5 text-[15px] leading-snug text-ink-2">
        {t('We use cookies to see which pages help and to show you our offers on other sites. You choose.')}{' '}
        <SiteLink href={privacyUrl} className="font-bold underline">
          {t('Privacy policy')}
        </SiteLink>
      </p>
      {choose && (
        <div className="mt-3 flex flex-col gap-2">
          <label className="flex items-start gap-3 rounded-xl bg-ground p-3">
            <input type="checkbox" checked disabled className="mt-1 size-4 flex-none" />
            <span>
              <strong className="block">{t('Necessary')}</strong>
              <span className="text-sm text-muted">{t('Your cart, language and booking. Always on.')}</span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-ground p-3">
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1 size-4 flex-none" />
            <span>
              <strong className="block">{t('Analytics')}</strong>
              <span className="text-sm text-muted">{t('Counts visits so we can improve the site (Google Analytics).')}</span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-ground p-3">
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-1 size-4 flex-none" />
            <span>
              <strong className="block">{t('Marketing')}</strong>
              <span className="text-sm text-muted">{t('Shows you our offers on Google, Facebook and Instagram.')}</span>
            </span>
          </label>
        </div>
      )}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {choose ? (
          <button type="button" onClick={() => done({ analytics, marketing })} className="col-span-2 min-h-12 rounded-2xl bg-ink px-5 font-bold text-white sm:col-span-1">
            {t('Save my choices')}
          </button>
        ) : (
          <>
            <button type="button" onClick={() => done({ analytics: true, marketing: true })} className="min-h-12 rounded-2xl bg-ink px-4 leading-tight font-bold text-white sm:px-5">
              {t('Accept all')}
            </button>
            <button type="button" onClick={() => done({ analytics: false, marketing: false })} className="min-h-12 rounded-2xl border-2 border-ink px-4 leading-tight font-bold sm:px-5">
              {t('Only necessary')}
            </button>
            <button type="button" onClick={() => setChoose(true)} className="col-span-2 min-h-11 px-2 font-bold underline sm:col-span-1">
              {t('Choose')}
            </button>
          </>
        )}
      </div>
    </section>
  )
}

/** "Cookie settings" link for the footer: reopens the banner. */
export function CookieSettingsLink({ className }: { className?: string }) {
  const { t } = useLang()
  const [on, setOn] = useState(false)
  useEffect(() => setOn(!!(window as Window & { __npTags?: unknown }).__npTags), [])
  if (!on) return null
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event('np:consent-open'))}>
      {t('Cookie settings')}
    </button>
  )
}
