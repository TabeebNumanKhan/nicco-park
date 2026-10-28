'use client'

import { useEffect, useId, useState } from 'react'
import type { Offer, ParkEvent } from '@/content/types'
import { useLang } from '@/i18n/LangProvider'
import { monthShort } from '@/i18n/translate'
import { Img } from '../ui/Img'
import { SiteLink } from '../ui/SiteLink'

const THEME: Record<Offer['theme'], { card: string; btn: string; chip: string }> = {
  white: { card: 'bg-white text-ink border-2 border-ink', btn: 'bg-yellow text-ink', chip: 'border-ink/50' },
  cream: { card: 'bg-cream text-ink', btn: 'bg-ink text-white', chip: 'border-ink/50' },
  coral: { card: 'bg-coral text-white', btn: 'bg-yellow text-ink', chip: 'border-white/60' },
  snow: { card: 'bg-snow-soft text-snow-ink', btn: 'bg-snow text-white', chip: 'border-snow-ink/50' },
  lilac: { card: 'bg-lilac text-bowl-ink', btn: 'bg-bowl text-white', chip: 'border-bowl-ink/50' },
  dry: { card: 'bg-dry text-white', btn: 'bg-white text-dry', chip: 'border-white/60' },
  yellow: { card: 'bg-yellow text-ink', btn: 'bg-ink text-white', chip: 'border-ink/50' },
  ink: { card: 'bg-ink text-white', btn: 'bg-yellow text-ink', chip: 'border-white/60' },
  mint: { card: 'bg-[#E5F3EA] text-dry-ink', btn: 'bg-dry text-white', chip: 'border-dry-ink/50' },
  wet: { card: 'bg-wet-soft text-wet-ink', btn: 'bg-wet text-white', chip: 'border-wet-ink/50' },
  bowl: { card: 'bg-bowl-soft text-[#3D2272]', btn: 'bg-bowl text-white', chip: 'border-[#3D2272]/50' },
}
const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'families', label: 'Families' },
  { id: 'students', label: 'Students' },
  { id: 'id', label: 'With ID' },
  { id: 'season', label: 'Seasonal' },
] as const
const TONE = { alert: 'text-alert', dry: 'text-dry', wet: 'text-wet', bowl: 'text-bowl' }

export function OfferList({ offers, heading, filters = true }: { offers: Offer[]; heading?: string; filters?: boolean }) {
  const { t } = useLang()
  const hid = useId()
  const [f, setF] = useState<(typeof FILTERS)[number]['id']>('all')
  const shown = f === 'all' ? offers : offers.filter((o) => o.category === f)
  return (
    <section aria-labelledby={hid} className="wrap pt-12 md:pt-16">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <h2 id={hid} className="h2">
          {heading ?? t('Offers')}
        </h2>
        {filters && (
        <div role="group" aria-label={t("Filter offers")} className="scroll-x -mx-4 w-[calc(100%+32px)] gap-1.5 px-4 sm:mx-0 sm:w-auto sm:flex-wrap sm:px-0">
          {FILTERS.map((x) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={f === x.id}
              onClick={() => setF(x.id)}
              className={'min-h-11 rounded-full px-4 ' + (f === x.id ? 'bg-ink font-bold text-white' : 'border border-[#C9CFD6] bg-white font-semibold')}
            >
              {t(x.label)}
            </button>
          ))}
        </div>
        )}
      </div>
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((o) => {
          const th = THEME[o.theme] ?? THEME.dry
          return (
            <article key={o.name} className={`flex flex-col gap-2.5 rounded-[24px] p-5 md:p-6 ${th.card}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="eyebrow opacity-90">{t(o.tag)}</span>
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${th.chip}`}>{t(o.status)}</span>
              </div>
              <h3 className="display text-[34px] md:text-[38px]">{t(o.name)}</h3>
              <p className="text-xl font-bold md:text-2xl">{t(o.deal)}</p>
              <p className="leading-snug opacity-90">{t(o.terms)}</p>
              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                <SiteLink href={o.cta.href} className={`inline-flex min-h-12 items-center rounded-2xl px-5 font-bold ${th.btn}`}>
                  {t(o.cta.label)}
                </SiteLink>
                {o.hasLanding && o.slug && (
                  <SiteLink href={`/offers/${o.slug}`} className="inline-flex min-h-11 items-center font-bold underline underline-offset-4">
                    {t('Offer details')}
                  </SiteLink>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export function YearCalendar({ events }: { events: ParkEvent[] }) {
  const { lang, t } = useLang()
  const [now, setNow] = useState<number | null>(null)
  const [cur, setCur] = useState<number | null>(null)
  useEffect(() => {
    const m = new Date().getMonth()
    setNow(m)
    setCur(m)
  }, [])
  const start = now ?? 0
  const months = Array.from({ length: 12 }, (_, i) => (start + i) % 12)
  const sel = cur ?? start
  const list = events.filter((e) => e.months.includes(sel))
  return (
    <section id="calendar" aria-labelledby="cal-h" className="wrap scroll-mt-32 py-12 md:py-16">
      <h2 id="cal-h" className="h2">
        {t("A year at Nicco")}
      </h2>
      <p className="mt-2 mb-5 text-lg text-muted">{t("Pick a month to see what's happening.")}</p>
      <div role="tablist" aria-label={t("Months")} className="scroll-x -mx-4 gap-1.5 px-4 pb-1 md:mx-0 md:grid md:grid-cols-12 md:px-0">
        {months.map((m) => {
          const n = events.filter((e) => e.months.includes(m)).length
          const on = m === sel
          return (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setCur(m)}
              className={'flex min-h-16 w-[72px] flex-col items-center justify-center rounded-2xl md:w-auto ' + (on ? 'bg-ink text-white' : 'border border-line bg-white')}
            >
              <strong>{monthShort(lang, new Date(2026, m, 1))}</strong>
              <span className={'text-xs ' + (on ? 'text-subtle' : 'text-muted')}>
                {n === 1 ? t('1 event') : t('{n} events', { n })}
              </span>
            </button>
          )
        })}
      </div>
      <div role="tabpanel" className="mt-5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e) => (
          <article key={e.name} className="flex flex-col overflow-hidden rounded-[24px] border-2 border-ink bg-white">
            <div className="relative h-[180px] flex-none md:h-[200px]">
              <Img media={e.image} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" alt="" />
            </div>
            <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
              <span className={`eyebrow ${TONE[e.tone]}`}>{t(e.when)}</span>
              <h3 className="mt-1 mb-1.5 text-[22px] font-bold">
                {e.hasLanding && e.slug ? (
                  <SiteLink href={`/whats-on/${e.slug}`} className="hover:underline">
                    {t(e.name)}
                  </SiteLink>
                ) : (
                  t(e.name)
                )}
              </h3>
              <p className="leading-snug text-muted">{t(e.blurb)}</p>
              {e.cta && (
                <div className="mt-auto pt-4">
                  <SiteLink href={e.cta.href} className="flex min-h-12 items-center justify-center rounded-xl bg-yellow px-4 font-bold text-ink hover:brightness-95">
                    {t(e.cta.label)}
                  </SiteLink>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
