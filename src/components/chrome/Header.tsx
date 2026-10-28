'use client'

import { Menu, Ticket, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLang } from '@/i18n/LangProvider'
import { useSiteData } from '@/lib/site-data'
import { staticAsset } from '@/lib/static-path'
import { WhatsappIcon } from '../ui/icons'
import { SiteLink } from '../ui/SiteLink'
import { LangToggle } from './LangToggle'
import { isActive, useRoute } from './nav'

/**
 * Phones (<768): logo, account and language only — navigation and "Buy
 * tickets" live in the bottom tab bar, so nothing is duplicated.
 * Tablets (768–1023): hamburger menu + Buy tickets.
 * Desktop (1024+): full navigation + Buy tickets.
 */
export function Header() {
  const pathname = useRoute()
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [pathname])
  const { settings: siteSettings, header, minPrice: MIN_PRICE, whatsapp, brand } = useSiteData()
  const logo = brand.logo ?? { url: '/images/logo.png', width: 123, height: 108, alt: 'Nicco Park' }
  const mainNav = header.nav
  const alert = siteSettings.alerts[0]

  return (
    <header className="z-40 border-b border-line bg-white md:sticky md:top-0">
      <div className="bg-night text-sm text-[#E6E9ED]">
        <div className="wrap flex min-h-10 items-center justify-between gap-3 py-1.5">
          <div className="flex min-w-0 items-center gap-4">
            <span className="flex items-center gap-2 whitespace-nowrap">
              <span aria-hidden="true" className="size-2 rounded-full bg-[#2BD17E]" />
              <strong className="text-white">{t('Open today')}</strong>
              <span className="hidden xs:inline">{siteSettings.todayHours}</span>
            </span>
            {alert && (
              <SiteLink href={alert.href ?? '/plan'} className="hidden truncate text-yellow hover:underline lg:inline">
                {t(alert.title)} · {t('see ride status')}
              </SiteLink>
            )}
          </div>
          <div className="flex items-center gap-4">
            <a href={whatsapp} className="hidden items-center gap-1.5 whitespace-nowrap hover:text-white md:flex">
              <WhatsappIcon size={15} className="text-[#2BD17E]" />
              {t('WhatsApp us')}
            </a>
            <a href={`tel:${siteSettings.phone.tel}`} className="hidden whitespace-nowrap hover:text-white lg:inline">
              {siteSettings.phone.display}
            </a>
            <SiteLink href="/my-nicco" className="hidden whitespace-nowrap hover:text-white md:inline">
              {t('My Nicco')}
            </SiteLink>
            <LangToggle />
          </div>
        </div>
      </div>

      <div className="wrap flex items-center gap-3 py-2 lg:gap-6">
        {/* The logo already carries the "Nicco Park" wordmark, so no text beside it. */}
        <SiteLink href="/" aria-label={t('Nicco Park home')} className="flex-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={staticAsset(logo.url)}
            alt="Nicco Park"
            width={logo.width ?? 123}
            height={logo.height ?? 108}
            className="h-12 w-auto md:h-[var(--logo-h)]"
            style={{ '--logo-h': `${brand.logoHeight}px` } as React.CSSProperties}
          />
        </SiteLink>

        <nav aria-label={t('Main')} className="hidden min-w-0 flex-1 flex-nowrap gap-0.5 lg:flex">
          {mainNav.map((n) => {
            const active = isActive(pathname, n.match)
            return (
              <SiteLink
                key={n.id}
                href={n.href}
                aria-current={active ? 'page' : undefined}
                className={
                  'min-h-11 items-center rounded-xl px-2.5 text-[15px] whitespace-nowrap xl:px-3 xl:text-base ' +
                  (n.wideOnly ? 'hidden xl:inline-flex ' : 'inline-flex ') +
                  (active ? 'bg-[#F2F4F6] font-bold' : 'font-medium hover:bg-[#F2F4F6]')
                }
              >
                {t(n.label)}
              </SiteLink>
            )
          })}
        </nav>

        <button
          type="button"
          aria-label={t('Menu')}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="ml-auto hidden size-12 place-items-center rounded-2xl border border-line-2 md:grid lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <SiteLink
          href="/my-nicco"
          aria-label={t('My Nicco')}
          className="ml-auto grid size-11 place-items-center rounded-2xl border border-line-2 md:hidden"
        >
          <User size={20} />
        </SiteLink>

        <SiteLink
          href={header.buy.href}
          className="hidden min-h-12 items-center gap-2.5 rounded-2xl bg-yellow px-5 font-bold text-ink transition hover:brightness-95 md:inline-flex"
        >
          <Ticket size={18} strokeWidth={2.2} />
          {t(header.buy.label)}
          <span className="hidden text-sm font-medium xl:inline">{t('from ₹{price}', { price: MIN_PRICE })}</span>
        </SiteLink>
      </div>

      {open && (
        <nav aria-label={t('Main menu')} className="hidden border-t border-line px-4 pt-2 pb-4 md:block lg:hidden">
          {[...mainNav, { id: 'account', label: 'My Nicco · manage booking', href: '/my-nicco', match: ['/my-nicco'] }].map((n) => (
            <SiteLink
              key={n.id}
              href={n.href}
              className="flex min-h-13 items-center justify-between border-b border-[#F0F2F4] px-2 text-lg font-semibold"
            >
              {t(n.label)}
              <span aria-hidden="true">→</span>
            </SiteLink>
          ))}
        </nav>
      )}
    </header>
  )
}
