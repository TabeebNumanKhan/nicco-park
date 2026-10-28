'use client'

import { useState } from 'react'
import { useLang } from '@/i18n/LangProvider'
import { gaEvent } from '@/lib/analytics'
import { track } from '@/lib/attribution'
import { useSiteData } from '@/lib/site-data'
import { staticAsset } from '@/lib/static-path'
import { FacebookIcon, InstagramIcon, XIcon, YoutubeIcon } from '../ui/icons'
import { CookieSettingsLink } from '../tracking/Tags'
import { SiteLink } from '../ui/SiteLink'

const SOCIAL = { Instagram: InstagramIcon, Facebook: FacebookIcon, YouTube: YoutubeIcon, X: XIcon }

export function Footer() {
  const [joined, setJoined] = useState(false)
  const [mobile, setMobile] = useState('')
  const [err, setErr] = useState('')
  const { lang, t } = useLang()
  const { settings: siteSettings, footer, brand } = useSiteData()
  return (
    <footer id="offers-signup" className="bg-night text-white">
      <div className="wrap pt-10 md:pt-14">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/15 pb-8 md:pb-11">
          <p className="display max-w-[620px] text-[40px] md:text-[52px]">{t(footer.signupHeading)}</p>
          {joined ? (
            <p role="status" className="font-bold text-yellow">
              {t('Done. Watch WhatsApp for your first offer.')}
            </p>
          ) : (
            <form
              aria-label={t('Offers on WhatsApp')}
              className="flex w-full flex-col gap-2 sm:w-auto"
              onSubmit={async (e) => {
                e.preventDefault()
                if (mobile.replace(/\D/g, '').length < 10) return setErr(t('Enter a 10-digit mobile number.'))
                setErr('')
                if (process.env.NEXT_PUBLIC_STATIC !== '1')
                  await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'offers', mobile, lang, consent: true, source: `footer:${location.pathname}` }) }).catch(() => {})
                track('lead', { props: { type: 'offers', source: 'footer' } })
                gaEvent('generate_lead', { lead_type: 'offers', form_location: 'footer' })
                setJoined(true)
              }}
            >
              <div className="flex flex-col gap-2 min-[420px]:flex-row">
                <label htmlFor="f-m" className="sr-only">
                  {t('Mobile number for WhatsApp offers')}
                </label>
                <input
                  id="f-m"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder={t('WhatsApp number')}
                  className="h-14 w-full min-w-0 rounded-2xl border border-white/30 bg-transparent px-4 text-white placeholder:text-white/60 min-[420px]:flex-1 sm:w-[260px] sm:flex-none"
                />
                <button className="min-h-14 rounded-2xl bg-yellow px-6 leading-tight font-bold text-ink">{t('Send me offers')}</button>
              </div>
              <p className="max-w-[460px] text-[13px] text-[#AEB6BF]">{t('By sending, you agree to get Nicco Park offers on WhatsApp. Reply STOP any time.')}</p>
              {err && (
                <p role="alert" className="text-sm font-bold text-yellow">
                  {err}
                </p>
              )}
            </form>
          )}
        </div>

        <div className="grid gap-8 py-10 lg:grid-cols-[1.1fr_2fr] md:py-12">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={staticAsset(brand.logoFooter?.url ?? '/images/logo.png')}
              alt="Nicco Park"
              width={brand.logoFooter?.width ?? 123}
              height={brand.logoFooter?.height ?? 108}
              className="h-[76px] w-auto rounded-2xl bg-white p-1.5"
            />
            <address className="mt-4 leading-relaxed text-[#AEB6BF] not-italic">
              {siteSettings.address.map((l) => (
                <span key={l} className="block">
                  {t(l)}
                </span>
              ))}
            </address>
            <a href={`tel:${siteSettings.phone.tel}`} className="mt-2 inline-block text-lg font-bold">
              {siteSettings.phone.display} <span className="text-sm font-medium text-[#AEB6BF]">{t('toll-free')}</span>
            </a>
          </div>
          <nav aria-label={t('Footer')} className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {footer.columns.map((c) => (
              <div key={c.heading}>
                <h2 className="mb-3 text-sm font-bold text-yellow">{t(c.heading)}</h2>
                <ul className="space-y-2.5">
                  {c.links.map(({ label, href }) => (
                    <li key={label + href}>
                      <SiteLink href={href} className="text-[#E6E9ED] hover:text-white hover:underline">
                        {t(label)}
                        {label === 'Snow Park' && <span className="ml-1 text-xs text-[#9CC4FF]">{t('soon')}</span>}
                      </SiteLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 py-6">
          <div className="flex flex-wrap gap-2">
            {['UPI', 'RuPay', 'Visa', 'Mastercard', 'Net banking'].map((p) => (
              <span key={p} className="rounded-lg border border-white/25 px-2.5 py-1 text-[13px] font-bold">
                {t(p)}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            {siteSettings.socials.map((s) => {
              const Icon = SOCIAL[s.label]
              return (
                <a key={s.label} href={s.href} aria-label={s.label} className="grid size-11 place-items-center rounded-xl bg-white/10 hover:bg-white/20">
                  <Icon />
                </a>
              )
            })}
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 pb-8 text-[13px] text-[#AEB6BF]">
          <span className="max-w-[760px]">
            © {new Date().getFullYear()} {siteSettings.legalName} · {t('A joint sector company with GoWB (WBIDC & WBTDC)')} · {t(siteSettings.officialChannels)}
          </span>
          <span className="flex flex-wrap gap-x-4 gap-y-2">
            {footer.legal.map((l) => (
              <SiteLink key={l.label} href={l.href} className="underline">
                {t(l.label)}
              </SiteLink>
            ))}
            <CookieSettingsLink className="underline" />
          </span>
        </div>
      </div>
    </footer>
  )
}
