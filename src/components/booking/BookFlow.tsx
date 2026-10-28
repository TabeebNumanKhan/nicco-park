'use client'

import { Check, TriangleAlert, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '@/i18n/LangProvider'
import { useSiteData } from '@/lib/site-data'
import { dateLongL, dateShortL } from '@/i18n/translate'
import { provider, useCart } from '@/lib/booking/cart-context'
import type { Crowd, DayAvailability, LaneSlot } from '@/lib/booking/types'
import { fromISODate, inr, startOfToday, toISODate } from '@/lib/format'
import { Img } from '../ui/Img'
import { SiteLink } from '../ui/SiteLink'
import { Stepper } from '../ui/Stepper'
import { CROWD, MonthCalendar } from './MonthCalendar'
import { Summary } from './Summary'

type Step = 'date' | 'tickets' | 'extras'
const ORDER: Step[] = ['date', 'tickets', 'extras']


export function BookFlow() {
  const { settings: siteSettings, catalog } = useSiteData()
  const { tickets, extras } = catalog
  const params = useSearchParams()
  const { cart, setCart, priced, ready } = useCart()
  const { lang, t } = useLang()
  const [step, setStep] = useState<Step>('date')
  const [days, setDays] = useState<DayAvailability[]>([])
  const [slots, setSlots] = useState<LaneSlot[]>([])
  const applied = useRef(false)

  // Availability comes from the booking provider (demo data today, Semnox later).
  useEffect(() => {
    provider.getAvailability(toISODate(startOfToday()), 91).then(setDays)
  }, [])
  useEffect(() => {
    if (cart.date) provider.getLaneSlots(cart.date, catalog.laneTimes).then(setSlots)
  }, [cart.date, catalog.laneTimes])

  // Deep links from offers, crews and the home widget: ?ticket= &student= &step=
  useEffect(() => {
    if (!ready || !days.length || applied.current) return
    applied.current = true
    const patch: Parameters<typeof setCart>[0] = {}
    const tk = params.get('ticket')
    if (tk && tickets.some((x) => x.id === tk)) patch.ticket = tk as typeof cart.ticket
    if (params.get('student') === '1') patch.student = true
    const valid = cart.date && days.some((d) => d.date === cart.date && d.bookable && d.date !== days[0].date)
    if (!valid) {
      const pick = days.slice(4).find((d) => d.bookable) ?? days.slice(1).find((d) => d.bookable)
      if (pick) patch.date = pick.date
    }
    setCart(patch)
    const s = params.get('step')
    if (s === 'tickets' || s === 'extras') setStep(s)
  }, [ready, days, params, cart.date, setCart, tickets])

  const idx = ORDER.indexOf(step)
  const sel = cart.date ? fromISODate(cart.date) : null
  const selCrowd = useMemo(() => days.find((d) => d.date === cart.date)?.crowd ?? 'plenty', [days, cart.date])
  const go = (s: Step) => {
    setStep(s)
    requestAnimationFrame(() => document.getElementById(`s-${s}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <div className="bg-ground">
      <div className="wrap pt-6 pb-10 md:pt-8 md:pb-24">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4 md:mb-6">
          <h1 className="display text-[clamp(40px,9vw,96px)] leading-[0.9]">{t('Book your day')}</h1>
          <ol aria-label={t('Booking steps')} className="grid w-full grid-cols-4 gap-1 sm:flex sm:w-auto sm:gap-1.5">
            {['Date', 'Tickets', 'Extras', 'Pay'].map((label, i) => {
              const done = i < idx
              const current = i === idx
              return (
                <li
                  key={label}
                  aria-current={current ? 'step' : undefined}
                  className={
                    'flex items-center justify-center gap-1.5 rounded-full px-2 py-2 text-xs whitespace-nowrap sm:px-3.5 sm:text-sm ' +
                    (done ? 'bg-ink font-bold text-white' : current ? 'bg-yellow font-bold' : 'bg-white font-semibold text-muted')
                  }
                >
                  {done ? <Check size={14} strokeWidth={3} aria-hidden="true" /> : `${i + 1}.`} {t(label)}
                </li>
              )
            })}
          </ol>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-6">
          <div className="flex min-w-0 flex-col gap-4">
            {/* 1. Date */}
            <section id="s-date" aria-labelledby="h-date" className="scroll-mt-32 rounded-[24px] bg-white p-4 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2.5">
                <h2 id="h-date" className="text-[22px] font-bold">
                  {t('1. When are you coming?')}
                </h2>
                {idx > 0 && (
                  <button type="button" onClick={() => go('date')} className="font-bold text-wet">
                    {t('Change date')}
                  </button>
                )}
              </div>
              {idx > 0 && sel && (
                <p className="mt-2.5 text-lg font-semibold">
                  {dateLongL(lang, sel)} · <span className={CROWD[selCrowd].text}>{t(CROWD[selCrowd].label)}</span>
                </p>
              )}
              {step === 'date' && (
                <>
                  <p className="mt-2 mb-4 flex flex-wrap items-center gap-2 text-muted">
                    {t('Book up to 3 months ahead. Same price every day.')}
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-dry-soft px-2.5 py-1 text-[13px] font-semibold text-dry-ink">
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-[#20B464]" />
                      {t('Live availability')}{provider.name !== 'Live' && ` (${t(provider.name)})`}
                    </span>
                  </p>
                  <MonthCalendar days={days} value={cart.date} onPick={(iso) => setCart({ date: iso })} size="lg" />
                  <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
                    <button
                      type="button"
                      disabled={!sel}
                      onClick={() => go('tickets')}
                      className="min-h-14 w-full rounded-2xl bg-ink px-7 font-bold text-white disabled:opacity-40 sm:w-auto"
                    >
                      {sel ? t('Continue with {date}', { date: dateShortL(lang, sel) }) : t('Pick a date')}
                    </button>
                  </div>
                </>
              )}
            </section>

            {/* 2. Tickets */}
            <section id="s-tickets" aria-labelledby="h-tix" className={'scroll-mt-32 rounded-[24px] bg-white p-4 sm:p-6 ' + (idx < 1 ? 'opacity-55' : '')}>
              <div className="flex flex-wrap items-baseline justify-between gap-2.5">
                <h2 id="h-tix" className="text-[22px] font-bold">
                  {t('2. Pick tickets')}
                </h2>
                {idx > 1 && (
                  <button type="button" onClick={() => go('tickets')} className="font-bold text-wet">
                    {t('Edit')}
                  </button>
                )}
              </div>
              {idx > 1 && (
                <p className="mt-2.5 text-lg font-semibold">
                  {t(priced.ticket.name)} × {cart.guests}
                  {cart.littleOnes > 0 && ` + ${t('{n} under 80 cm (free)', { n: cart.littleOnes })}`}
                </p>
              )}
              {step === 'tickets' && (
                <>
                  {siteSettings.alerts.length > 0 && sel && (
                    <p className="mt-3 flex gap-2.5 rounded-2xl bg-alert-soft px-3.5 py-3 text-[15px] font-semibold text-alert-ink">
                      <TriangleAlert size={16} aria-hidden="true" className="mt-0.5 flex-none" />
                      {t('Lazy River will be closed for maintenance on {date}. Every other ride is scheduled to run.', { date: dateShortL(lang, sel) })}
                    </p>
                  )}
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {tickets.map((tk) => {
                      const on = tk.id === cart.ticket
                      const unit = cart.student && tk.studentPrice ? tk.studentPrice : tk.price
                      return (
                        <button
                          key={tk.id}
                          type="button"
                          aria-pressed={on}
                          onClick={() => setCart({ ticket: tk.id })}
                          className={
                            'relative flex flex-col gap-2.5 rounded-[20px] p-4 text-left ' +
                            (on ? 'border-2 border-ink bg-yellow-soft' : 'border border-line bg-white hover:border-ink')
                          }
                        >
                          {tk.popular && <span className="absolute -top-2.5 right-3 rounded-full bg-yellow px-2.5 py-0.5 text-xs font-bold">{t('Most popular')}</span>}
                          <span className="flex items-baseline justify-between gap-2">
                            <strong className="text-lg">{t(tk.name)}</strong>
                            <span className="display text-[30px] [font-stretch:90%]">{inr(unit)}</span>
                          </span>
                          {cart.student && tk.studentPrice && (
                            <span className="text-[13px] font-bold text-dry">
                              {t('Student price · was')} <s>{inr(tk.price)}</s>
                            </span>
                          )}
                          <span className="flex flex-col gap-1.5 text-sm leading-snug">
                            {tk.includes.map((i) => (
                              <span key={i} className="flex gap-2">
                                <Check size={15} strokeWidth={3} aria-hidden="true" className="mt-0.5 flex-none text-dry" />
                                {t(i)}
                              </span>
                            ))}
                            {tk.excludes.map((x) => (
                              <span key={x} className="flex gap-2 text-muted">
                                <X size={15} strokeWidth={2.6} aria-hidden="true" className="mt-0.5 flex-none text-[#9AA3AD]" />
                                {t(x)}
                              </span>
                            ))}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    <div className="flex items-center justify-between gap-3 rounded-[18px] border border-line px-4 py-3">
                      <span>
                        <strong className="block">{t('Guests')}</strong>
                        <span className="text-[13px] text-muted">{t('80 cm and taller')}</span>
                      </span>
                      <Stepper value={cart.guests} onChange={(n) => setCart({ guests: n })} min={1} label={t('Guests')} tone="dark" />
                    </div>
                    <div className="flex items-center justify-between gap-3 rounded-[18px] border border-line px-4 py-3">
                      <span>
                        <strong className="block">{t('Little ones')}</strong>
                        <span className="text-[13px] text-muted">{t('Under 80 cm · free')}</span>
                      </span>
                      <Stepper value={cart.littleOnes} onChange={(n) => setCart({ littleOnes: n })} max={10} label={t('Little ones')} />
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={cart.student}
                      onClick={() => setCart({ student: !cart.student })}
                      className={
                        'flex items-center justify-between gap-3 rounded-[18px] px-4 py-3 text-left sm:col-span-2 xl:col-span-1 ' +
                        (cart.student ? 'border-2 border-dry bg-dry-soft' : 'border border-line bg-white')
                      }
                    >
                      <span>
                        <strong className="block">{t("We're students")}</strong>
                        <span className="text-[13px] text-muted">{t('20% off · college ID at the gate')}</span>
                      </span>
                      <span aria-hidden="true" className={'relative h-7 w-12 flex-none rounded-full transition ' + (cart.student ? 'bg-dry' : 'bg-[#C9CFD6]')}>
                        <span className={'absolute top-[3px] size-[22px] rounded-full bg-white transition-all ' + (cart.student ? 'left-[23px]' : 'left-[3px]')} />
                      </span>
                    </button>
                  </div>
                  <div className="mt-5 flex justify-end">
                    <button type="button" onClick={() => go('extras')} className="min-h-14 w-full rounded-2xl bg-ink px-8 font-bold text-white sm:w-auto">
                      {t('Continue')}
                    </button>
                  </div>
                </>
              )}
            </section>

            {/* 3. Extras */}
            <section id="s-extras" aria-labelledby="h-ex" className={'scroll-mt-32 rounded-[24px] bg-white p-4 sm:p-6 ' + (idx < 2 ? 'opacity-55' : '')}>
              <h2 id="h-ex" className="text-[22px] font-bold">
                {t('3. Make it a bigger day')} <span className="text-base font-medium text-muted">{t('(optional)')}</span>
              </h2>
              {step === 'extras' && (
                <>
                  <p className="mt-2 mb-4 text-muted">{t('Nothing is pre-selected. Add only what you want.')}</p>
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {extras.map((e) => (
                      <div key={e.id} className="flex overflow-hidden rounded-[18px] border border-line">
                        <div className="relative w-24 flex-none sm:w-26">
                          <Img media={e.image} fill sizes="104px" alt="" />
                        </div>
                        <div className="flex flex-1 flex-col gap-1.5 px-3.5 py-3">
                          <strong>{t(e.name)}</strong>
                          <span className="text-[13px] leading-snug text-muted">{t(e.note)}</span>
                          <span className="mt-auto flex items-center justify-between gap-2">
                            <span className="font-bold">{inr(e.price)}</span>
                            <Stepper
                              value={cart.extras[e.id]}
                              onChange={(n) => setCart((c) => ({ extras: { ...c.extras, [e.id]: n } }))}
                              label={t(e.name)}
                            />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {cart.extras.bowl > 0 && (
                    <fieldset className="mt-3.5 rounded-[18px] bg-bowl-soft p-4">
                      <legend className="sr-only">{t('Pick your lane time')}</legend>
                      <p aria-hidden="true" className="mb-2.5 font-bold text-[#3D2272]">
                        {t('Pick your lane time')} <span className="font-medium">· {t('live from Super Bowl')}</span>
                      </p>
                      <div className="grid grid-cols-[repeat(auto-fill,minmax(92px,1fr))] gap-2">
                        {slots.map((s, i) => {
                          const full = s.lanesLeft === 0
                          const on = !full && i === cart.laneSlot
                          if (full)
                            return (
                              <div key={s.time} aria-label={`${s.time} ${t('Full')}`} className="flex min-h-14 flex-col items-center justify-center rounded-xl border border-dashed border-[#C9B8EE] text-[#8C7CB0]">
                                <s>{s.time}</s>
                                <span className="text-xs">{t('Full')}</span>
                              </div>
                            )
                          return (
                            <button
                              key={s.time}
                              type="button"
                              aria-pressed={on}
                              onClick={() => setCart({ laneSlot: i })}
                              className={'flex min-h-14 flex-col items-center justify-center rounded-xl ' + (on ? 'border-2 border-bowl-ink bg-bowl text-white' : 'border border-[#D9C8F7] bg-white text-[#3D2272]')}
                            >
                              <strong>{s.time}</strong>
                              <span className="text-xs">{s.lanesLeft === 1 ? t('1 lane left') : t('{n} lanes left', { n: s.lanesLeft })}</span>
                            </button>
                          )
                        })}
                      </div>
                    </fieldset>
                  )}
                  <p className="mt-3.5 text-sm text-muted">{t('Lockers and swimwear for Wet-O-Wild are rented at the counter inside the park.')}</p>
                </>
              )}
            </section>
          </div>

          <div className="hidden lg:sticky lg:top-32 lg:block">
            <Summary />
          </div>
          <div className="lg:hidden">
            <Summary cta={false} />
          </div>
        </div>
      </div>

      {/* Phone + tablet: one total-and-continue bar, no tab bar on booking pages. */}
      <div className="sticky bottom-0 z-30 flex items-center justify-between gap-3 border-t border-line bg-white px-4 pt-2.5 pb-[max(12px,env(safe-area-inset-bottom))] md:px-6 lg:hidden">
        <span className="leading-tight">
          <span className="block text-xs font-semibold text-muted">{t('Total, incl. taxes')}</span>
          <span className="display mt-1 block text-[26px] leading-none [font-stretch:90%]">{priced.totalLabel}</span>
        </span>
        {step === 'extras' ? (
          <SiteLink href="/book/pay" className="inline-flex min-h-13 items-center rounded-2xl bg-yellow px-6 font-bold text-ink">
            {t('Continue to pay')}
          </SiteLink>
        ) : (
          <button
            type="button"
            disabled={!sel}
            onClick={() => go(step === 'date' ? 'tickets' : 'extras')}
            className="min-h-13 rounded-2xl bg-yellow px-6 font-bold text-ink disabled:opacity-40"
          >
            {step === 'date' ? t('Next: tickets') : t('Next: extras')}
          </button>
        )}
      </div>
    </div>
  )
}

