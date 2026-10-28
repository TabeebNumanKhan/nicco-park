'use client'

import { CalendarDays, Disc3, Snowflake, Ticket as TicketIcon, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import type { Ticket } from '@/content/types'
import { withLang } from '@/i18n/config'
import { useLang } from '@/i18n/LangProvider'
import { useSiteData } from '@/lib/site-data'
import { dayMonth, weekdayShort } from '@/i18n/translate'
import { useCart } from '@/lib/booking/cart-context'
import { addDays, fromISODate, inr, startOfToday, toISODate } from '@/lib/format'
import { DatePicker } from '../booking/DatePicker'
import { SiteLink, staticHref } from '../ui/SiteLink'
import { Stepper } from '../ui/Stepper'

const TABS = [
  { id: 'day', label: 'Day tickets', I: TicketIcon },
  { id: 'bowl', label: 'Super Bowl', I: Disc3 },
  { id: 'group', label: 'Groups', I: Users },
  { id: 'snow', label: 'Snow Park', I: Snowflake, soon: true },
] as const

/**
 * The booking box under the hero: date → ticket → guests → total → Buy.
 * Four quick dates plus "More dates", which opens a calendar of the next
 * three months. "Buy tickets" carries everything into the booking page.
 */
export function BookingWidget({ overlap = true }: { overlap?: boolean }) {
  const { tickets } = useSiteData().catalog
  const router = useRouter()
  const { lang, t } = useLang()
  const { setCart } = useCart()
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('day')
  const [quick, setQuick] = useState<string[]>([])
  const [date, setDate] = useState<string | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [prod, setProd] = useState<Ticket['id']>('pkg')
  const [guests, setGuests] = useState(4)
  const [joined, setJoined] = useState(false)

  // Dates are computed in the browser so the static build never shows stale days.
  useEffect(() => {
    const today = startOfToday()
    const q = [1, 2, 3, 4].map((o) => toISODate(addDays(today, o)))
    setQuick(q)
    setDate((d) => d ?? q[2])
  }, [])

  const price = useMemo(() => (tickets.find((x) => x.id === prod) ?? tickets[0])?.price ?? 0, [prod, tickets])
  const custom = date && quick.length && !quick.includes(date) ? date : null

  const go = () => {
    setCart({ date, ticket: prod, guests })
    const href = withLang('/book?step=extras', lang)
    if (process.env.NEXT_PUBLIC_STATIC === '1') window.location.href = staticHref(href)
    else router.push(href)
  }

  const chip = 'flex min-h-14 flex-col items-center justify-center rounded-2xl px-0.5 text-center leading-tight'

  return (
    <section aria-label={t('Book your visit')} className={'relative px-4 md:px-6 ' + (overlap ? '-mt-14 md:-mt-24' : 'bg-yellow pb-2')}>
      <div className="mx-auto max-w-[1320px] overflow-hidden rounded-[24px] border-2 border-ink bg-white shadow-[0_30px_60px_-30px_rgba(16,20,24,0.55)] md:rounded-[28px]">
        <div role="tablist" aria-label={t('What would you like to book?')} className="grid grid-cols-4 border-b border-line bg-cream md:flex md:px-3">
          {TABS.map((x) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={tab === x.id}
              onClick={() => setTab(x.id)}
              className={
                'relative flex min-h-16 min-w-0 flex-col items-center justify-center gap-1 border-b-4 px-1 text-center text-[12px] leading-tight sm:text-[13px] md:min-h-15 md:flex-row md:gap-2 md:px-5 md:text-base ' +
                (tab === x.id ? 'border-yellow bg-white font-bold text-ink' : 'border-transparent font-semibold text-muted hover:text-ink')
              }
            >
              <x.I size={18} aria-hidden="true" className={tab === x.id ? 'text-ink' : ''} />
              <span className="max-w-full">{t(x.label)}</span>
              {'soon' in x && <span className="rounded-full bg-snow-soft px-1.5 py-0.5 text-xs leading-none text-snow-ink md:px-2">{t('Soon')}</span>}
            </button>
          ))}
        </div>

        {tab === 'day' && (
          <div role="tabpanel">
            <div className="grid gap-4 p-4 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1.5fr)] md:p-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.4fr)_auto_minmax(0,1fr)] lg:items-end lg:gap-6">
              <fieldset className="min-w-0">
                <legend className="mb-2 text-sm font-bold text-muted">{t('When')}</legend>
                <div className="grid grid-cols-3 gap-1.5 min-[400px]:grid-cols-5">
                  {(quick.length ? quick : [null, null, null, null]).map((iso, i) => {
                    const d = iso ? fromISODate(iso) : null
                    const on = !!iso && iso === date
                    return (
                      <button
                        key={i}
                        type="button"
                        aria-pressed={on}
                        onClick={() => iso && setDate(iso)}
                        className={chip + ' ' + (on ? 'border-2 border-ink bg-ink text-white' : 'border border-line-2 bg-white hover:border-ink')}
                      >
                        <strong className="max-w-full truncate text-[13px] md:text-[12px] xl:text-sm">{d ? (i === 0 ? t('Tomorrow') : weekdayShort(lang, d)) : '—'}</strong>
                        <span className={'text-xs whitespace-nowrap sm:text-xs ' + (on ? 'text-subtle' : 'text-muted')}>{d ? dayMonth(lang, d) : ''}</span>
                      </button>
                    )
                  })}
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    aria-pressed={!!custom}
                    onClick={() => setPickerOpen(true)}
                    className={chip + ' ' + (custom ? 'border-2 border-ink bg-ink text-white' : 'border border-dashed border-ink/50 bg-yellow-soft hover:border-ink')}
                  >
                    {custom ? (
                      <>
                        <strong className="max-w-full truncate text-[13px] md:text-[12px] xl:text-sm">{weekdayShort(lang, fromISODate(custom))}</strong>
                        <span className="text-xs whitespace-nowrap text-subtle sm:text-xs">{dayMonth(lang, fromISODate(custom))}</span>
                      </>
                    ) : (
                      <>
                        <CalendarDays size={18} aria-hidden="true" />
                        <span className="text-xs font-bold sm:text-xs">{t('More dates')}</span>
                      </>
                    )}
                  </button>
                </div>
              </fieldset>

              <fieldset className="min-w-0">
                <legend className="mb-2 text-sm font-bold text-muted">{t('Ticket')}</legend>
                <div className="grid gap-1.5 sm:grid-cols-3">
                  {tickets.map((x) => {
                    const on = x.id === prod
                    return (
                      <button
                        key={x.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setProd(x.id)}
                        className={
                          'relative flex min-h-13 items-center justify-between gap-2 rounded-2xl px-3 text-left sm:min-h-14 sm:flex-col sm:items-start sm:justify-center sm:gap-0 ' +
                          (on ? 'border-2 border-ink bg-yellow-soft' : 'border border-line-2 bg-white hover:border-ink') +
                          (x.popular ? ' sm:pt-3' : '')
                        }
                      >
                        <strong className="text-sm leading-tight">{t(x.shortName)}</strong>
                        <span className={'text-[13px] ' + (on ? '' : 'text-muted')}>{inr(x.price)}</span>
                        {x.popular && (
                          <span className="absolute -top-2.5 right-2 rounded-full bg-yellow px-2 py-0.5 text-xs leading-tight font-bold whitespace-nowrap">{t('Most popular')}</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              <div className="flex items-center justify-between gap-3 md:col-span-2 lg:col-span-1 lg:block">
                <span id="hg" className="text-sm font-bold text-muted lg:mb-2 lg:block">
                  {t('Guests')}
                </span>
                <div aria-labelledby="hg" className="flex min-h-14 items-center rounded-2xl border border-line-2 px-1.5">
                  <Stepper value={guests} onChange={setGuests} min={1} label={t('Guests')} />
                </div>
              </div>

              <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-end lg:col-span-1 lg:flex-col lg:items-stretch xl:flex-row xl:items-center">
                <div className="flex items-baseline justify-between gap-3 md:block md:text-right lg:text-left xl:text-right">
                  <div className="text-[13px] text-muted">{t('Total, taxes included')}</div>
                  <div className="font-display text-[30px] leading-none font-extrabold md:text-[34px]">{inr(price * guests)}</div>
                </div>
                <button
                  type="button"
                  onClick={go}
                  disabled={!date}
                  className="min-h-14 rounded-2xl bg-yellow px-7 text-[17px] font-bold whitespace-nowrap text-ink transition hover:brightness-95 disabled:opacity-50"
                >
                  {t('Buy tickets')}
                </button>
              </div>
            </div>
            <p className="flex flex-wrap gap-x-5 gap-y-1.5 border-t border-dashed border-line px-4 py-3 text-[13px] text-muted md:px-6 md:text-sm">
              <span>{t('Under 80 cm go free')}</span>
              <span>{t('QR ticket on WhatsApp in seconds')}</span>
              <span>{t('Pay with UPI, card or net banking')}</span>
              <span className="font-semibold text-dry">{t('Best price only on niccoparks.com')}</span>
              <button type="button" onClick={() => setPickerOpen(true)} className="font-semibold text-wet underline md:ml-auto">
                {t('Live availability for the next 3 months')}
              </button>
            </p>
          </div>
        )}

        {tab === 'bowl' && (
          <div role="tabpanel" className="flex flex-wrap items-center justify-between gap-5 p-4 md:p-6">
            <div className="flex flex-wrap gap-2">
              {['Entry ₹100', 'Bowling ₹250 a game', 'Pool ₹150 / 20 min', 'Air hockey ₹60'].map((x) => (
                <span key={x} className="rounded-2xl bg-bowl-soft px-4 py-3 font-bold text-bowl-ink">
                  {t(x)}
                </span>
              ))}
            </div>
            <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">
              <span className="text-muted">{t('Open 1–9 PM weekdays, till 10 PM weekends')}</span>
              <SiteLink href="/worlds/super-bowl#lane" className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-bowl px-7 font-bold text-white sm:w-auto">
                {t('Book a lane')}
              </SiteLink>
            </div>
          </div>
        )}

        {tab === 'group' && (
          <div role="tabpanel" className="flex flex-wrap items-center justify-between gap-5 p-4 md:p-6">
            <p className="max-w-[720px] text-lg">
              <strong>{t('Schools, offices, birthdays, weddings.')}</strong> {t('Venues for 50 to 5,000 guests, with food, decor and the whole park on tap.')}
            </p>
            <SiteLink href="/groups" className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-ink px-7 font-bold text-white sm:w-auto">
              {t('Plan a group day')}
            </SiteLink>
          </div>
        )}

        {tab === 'snow' && (
          <div role="tabpanel" className="flex flex-wrap items-center justify-between gap-5 bg-[#F2F8FF] p-4 md:p-6">
            <p className="max-w-[620px] text-lg">
              <strong>{t('Snow in Kolkata, all year round.')}</strong> {t('Join the waitlist and get first access to early-bird tickets when Snow Park opens.')}
            </p>
            {joined ? (
              <p role="status" className="font-bold text-snow">
                {t("You're on the list. We'll WhatsApp you first.")}
              </p>
            ) : (
              <form
                aria-label={t('Snow Park waitlist')}
                className="flex w-full flex-wrap gap-2 sm:w-auto"
                onSubmit={(e) => {
                  e.preventDefault()
                  setJoined(true)
                }}
              >
                <label htmlFor="snow-m" className="sr-only">
                  {t('Mobile number')}
                </label>
                <input id="snow-m" type="tel" inputMode="numeric" placeholder={t('Mobile number')} className="h-14 min-w-0 flex-1 rounded-2xl border border-[#B9CCE6] bg-white px-4 sm:w-60 sm:flex-none" />
                <button className="min-h-14 flex-1 rounded-2xl bg-snow px-6 font-bold text-white sm:flex-none">{t('Notify me')}</button>
              </form>
            )}
          </div>
        )}
      </div>
      <DatePicker open={pickerOpen} value={date} onPick={setDate} onClose={() => setPickerOpen(false)} />
    </section>
  )
}
