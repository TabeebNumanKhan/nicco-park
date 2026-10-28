'use client'

import { Compass, House, MapPin, Menu, Ticket, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/i18n/LangProvider'
import { useSiteData } from '@/lib/site-data'
import { SiteLink } from '../ui/SiteLink'
import { LangToggle } from './LangToggle'
import { useRoute } from './nav'

/**
 * Phone-only bottom bar: the single, always-visible "Buy tickets" and the
 * site menu. Hidden from 768px up (the header takes over) and on the booking
 * pages, which carry their own total + continue bar.
 */
export function MobileTabBar() {
  const pathname = useRoute()
  const { t } = useLang()
  const { settings: siteSettings, worlds, header, minPrice: MIN_PRICE, whatsapp } = useSiteData()
  const SHEET = header.moreSheet
  const [open, setOpen] = useState(false)
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    sheetRef.current?.querySelector<HTMLElement>('a,button')?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (pathname.startsWith('/book')) return null

  const world = worlds.find((w) => pathname === `/worlds/${w.slug}`)
  const cta = world ? { ...world.tabCta, sub: t(world.tabCta.sub) } : { label: 'Buy tickets', sub: t('from ₹{price}', { price: MIN_PRICE }), href: '/book' }

  const tab = (href: string, label: string, Icon: typeof House, active: boolean) => (
    <SiteLink
      href={href}
      aria-current={active ? 'page' : undefined}
      className={
        'flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 text-xs font-semibold ' +
        (active ? 'text-yellow' : 'text-subtle')
      }
    >
      <Icon size={22} strokeWidth={2} aria-hidden="true" />
      <span className="max-w-full truncate">{t(label)}</span>
    </SiteLink>
  )

  return (
    <>
      {/* Keeps the footer clear of the fixed bar. */}
      <div aria-hidden="true" className="h-[84px] bg-night md:hidden" />

      {open && (
        <button
          type="button"
          aria-label={t('Close menu')}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-ink/45 md:hidden"
        />
      )}

      <nav
        aria-label={t('Quick menu')}
        className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink px-1.5 pt-1.5 pb-[max(10px,env(safe-area-inset-bottom))] md:hidden"
      >
        {open && (
          <div
            ref={sheetRef}
            id="more-sheet"
            className="absolute inset-x-2 bottom-[calc(100%+10px)] rounded-[22px] bg-white px-4 pt-2.5 pb-4 text-ink shadow-[0_-20px_50px_-20px_rgba(16,20,24,0.55)]"
          >
            <div className="mx-1 mt-1.5 mb-1 flex items-center justify-between gap-2">
              <p className="eyebrow text-muted">{t('More from Nicco')}</p>
              <LangToggle tone="light" />
            </div>
            {SHEET.map((s) => (
              <SiteLink
                key={s.href}
                href={s.href}
                className="flex min-h-13 items-center justify-between gap-2 border-b border-[#EEF0F2] px-1 text-[17px] font-semibold"
              >
                {t(s.label)}
                {s.badge ? (
                  <span className={'rounded-full px-2 py-0.5 text-xs font-bold ' + (s.tone === 'snow' ? 'bg-snow-soft text-snow-ink' : 'bg-yellow')}>
                    {t(s.badge)}
                  </span>
                ) : (
                  <span aria-hidden="true">→</span>
                )}
              </SiteLink>
            ))}
            {siteSettings.alerts[0] && (
              <SiteLink
                href={siteSettings.alerts[0].href ?? '/plan'}
                className="mt-3 flex items-center gap-2 rounded-xl bg-alert-soft px-3 py-2.5 text-sm font-semibold text-alert-ink"
              >
                <span aria-hidden="true" className="size-2 flex-none rounded-full bg-alert" />
                {t(siteSettings.alerts[0].title)} · {t('ride status')}
              </SiteLink>
            )}
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <a href={whatsapp} className="grid min-h-12 place-items-center rounded-xl bg-wa font-bold text-white">
                {t('WhatsApp us')}
              </a>
              <a href={`tel:${siteSettings.phone.tel}`} className="grid min-h-12 place-items-center rounded-xl border border-line-2 font-bold">
                {siteSettings.phone.display}
              </a>
            </div>
          </div>
        )}

        <div className="flex items-center gap-0.5">
          {tab('/', 'Home', House, pathname === '/')}
          {tab('/worlds/dry-park', 'Worlds', Compass, pathname.startsWith('/worlds'))}
          <SiteLink
            href={cta.href}
            className="-mt-5 flex min-h-[62px] min-w-0 flex-[1.6] flex-col items-center justify-center rounded-[18px] bg-yellow text-ink shadow-[0_0_0_4px_var(--ink)]"
          >
            <span className="flex max-w-full items-center gap-1.5 truncate text-[15px] font-extrabold whitespace-nowrap">
              <Ticket size={18} strokeWidth={2.2} aria-hidden="true" />
              {t(cta.label)}
            </span>
            <span className="text-xs font-semibold">{cta.sub}</span>
          </SiteLink>
          {tab('/plan', 'Plan', MapPin, pathname.startsWith('/plan'))}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="more-sheet"
            onClick={() => setOpen((o) => !o)}
            className={'flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 text-xs font-semibold ' + (open ? 'text-yellow' : 'text-subtle')}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            {t('More')}
          </button>
        </div>
      </nav>
    </>
  )
}
