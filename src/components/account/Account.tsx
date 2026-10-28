'use client'

import { useEffect, useState } from 'react'
import { media } from '@/content/media'
import { useCart } from '@/lib/booking/cart-context'
import { useLang } from '@/i18n/LangProvider'
import { dateLongL, dateShortL, weekdayShort } from '@/i18n/translate'
import { addDays, fromISODate, inr, startOfToday } from '@/lib/format'
import { Img } from '../ui/Img'
import { QrCode } from '../ui/QrCode'
import { SiteLink } from '../ui/SiteLink'

const avail = (d: Date) =>
  d.getDay() === 0 || d.getDay() === 6 ? ['Few left', 'text-[#B3341D]'] : d.getDay() === 5 ? ['Filling', 'text-[#8A5A00]'] : ['Plenty', 'text-dry-ink']

/**
 * "My Nicco" — booking management. Shows the visitor's real order from this
 * browser session if they just booked, otherwise a sample account.
 */
export function Account() {
  const { order } = useCart()
  const { lang, t } = useLang()
  const [today, setToday] = useState<Date | null>(null)
  const [offset, setOffset] = useState(4)
  const [pending, setPending] = useState(5)
  const [changing, setChanging] = useState(false)
  const [changed, setChanged] = useState(false)
  const [lane, setLane] = useState(false)
  const [balance, setBalance] = useState(320)

  useEffect(() => setToday(startOfToday()), [])
  useEffect(() => {
    if (order?.cart.date && today) {
      const diff = Math.round((fromISODate(order.cart.date).getTime() - today.getTime()) / 86400000)
      if (diff > 0) setOffset(diff)
    }
  }, [order, today])

  const visit = today ? addDays(today, offset) : null
  const name = order?.contact.name.split(' ')[0] || 'Ananya'
  const bookingId = order?.bookingId || 'NP-4K7Q2X'
  const ticketLine = order ? `${t(order.cart.ticket === 'pkg' ? 'Parks Package' : order.cart.ticket === 'meal' ? 'Dry Park + Meal' : 'Dry Park Day')} × ${order.cart.guests}` : `${t('Parks Package')} × 2`
  const little = order ? order.cart.littleOnes : 1

  return (
    <div className="bg-ground">
      <div className="wrap pt-6 pb-12 md:pt-9 md:pb-24">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3 md:mb-6">
          <div>
            <p className="font-semibold text-muted">{t("Signed in with +91 98300 •••45")}</p>
            <h1 className="display text-[clamp(44px,9vw,96px)] leading-[0.9]">{t('Hi {name}', { name })}</h1>
          </div>
          <SiteLink href="/book" className="inline-flex min-h-13 items-center rounded-2xl bg-yellow px-6 font-bold">
            {t("Book another day")}
          </SiteLink>
        </div>

        <section aria-labelledby="up-h" className="grid gap-4 md:grid-cols-[1.6fr_1fr]">
          <div className="rounded-[24px] bg-ink p-5 text-white md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="up-h" className="eyebrow text-yellow">
                {t("Your next visit")}
              </h2>
              <span className="text-sm text-subtle">{t('Booking {id}', { id: bookingId })}</span>
            </div>
            <p className="display mt-3 text-[34px] md:text-[56px]">{visit ? dateLongL(lang, visit) : '…'}</p>
            <dl className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {[
                ['Tickets', ticketLine],
                ['Little ones', little ? t('{n}, free', { n: little }) : t('None')],
                ['Super Bowl lane', lane ? t('6:00 PM, 1 lane') : t('Not added')],
                ['Gates open', '10:30 AM'],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-white/8 px-4 py-3">
                  <dt className="text-[13px] text-subtle">{t(k)}</dt>
                  <dd className="font-bold">{v}</dd>
                </div>
              ))}
            </dl>
            {!changing ? (
              <>
                <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                  <button type="button" onClick={() => (setChanging(true), setChanged(false))} className="min-h-12 rounded-xl bg-white px-3 py-2 leading-tight font-bold text-ink">
                    {t("Change date")}
                  </button>
                  <button type="button" onClick={() => setLane((l) => !l)} className="min-h-12 rounded-xl border border-white/30 px-3 py-2 leading-tight font-bold">
                    {lane ? t('Remove lane') : t('Add a 6 PM lane')}
                  </button>
                  <SiteLink href="/book?step=tickets" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-3 py-2 text-center leading-tight font-bold">
                    {t("Add a guest")}
                  </SiteLink>
                  <button type="button" className="min-h-12 rounded-xl bg-wa px-3 py-2 leading-tight font-bold">
                    {t("Send to my group")}
                  </button>
                </div>
                {changed && (
                  <p role="status" className="mt-4 rounded-xl bg-dry px-4 py-3 font-semibold">
                    {t("Date changed. Your QR stays the same, and we've sent the update on WhatsApp.")}
                  </p>
                )}
              </>
            ) : (
              <div className="mt-5 rounded-2xl bg-white p-4 text-ink">
                <p className="font-bold">
                  {t("Pick a new date")} <span className="font-medium text-muted">{t("· free until the day before your visit")}</span>
                </p>
                <div className="mt-3 grid grid-cols-7 gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7].map((o) => {
                    const d = today ? addDays(today, o) : null
                    const on = o === pending
                    const [label, tone] = d ? avail(d) : ['', '']
                    const wd = d ? weekdayShort(lang, d) : ''
                    return (
                      <button
                        key={o}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setPending(o)}
                        className={'flex min-h-16 flex-col items-center justify-center rounded-xl text-center ' + (on ? 'bg-ink text-white' : 'border border-line')}
                      >
                        <span className="text-xs">{wd}</span>
                        <strong>{d?.getDate()}</strong>
                        <span className={'hidden text-xs font-semibold sm:block ' + (on ? 'text-subtle' : tone)}>{label && t(label)}</span>
                      </button>
                    )
                  })}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:justify-end">
                  <button type="button" onClick={() => setChanging(false)} className="min-h-12 rounded-xl border border-[#C9CFD6] px-4 font-bold">
                    {t("Keep my date")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOffset(pending)
                      setChanging(false)
                      setChanged(true)
                    }}
                    className="min-h-12 rounded-xl bg-yellow px-4 font-bold"
                  >
                    {t('Move to {date}', { date: today ? dateShortL(lang, addDays(today, pending)) : '' })}
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="relative flex flex-col items-center gap-3 rounded-[24px] bg-yellow p-5 md:p-7">
            <QrCode label={t("Entry QR code")} seed={3} className="w-full max-w-[220px]" />
            <p className="text-lg font-bold">{t("Scan at any gate")}</p>
            <p className="border-t-2 border-dashed border-ink/40 pt-3 text-center text-[15px]">{t("One QR for the whole group: rides, Wet-O-Wild and your Super Bowl lane.")}</p>
          </div>
        </section>

        <section aria-label={t("Game card, pass and waitlist")} className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] bg-bowl p-5 text-white md:p-7">
            <h2 className="display text-[32px]">{t("Game card")}</h2>
            <p className="mt-2 text-[#E2D3FF]">{t("Your phone is your game card at Super Bowl. Tap to play coin games and air hockey.")}</p>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="display text-[52px]">{inr(balance)}</span>
              <span className="font-semibold">{t("balance")}</span>
            </p>
            <div role="group" aria-label={t("Top up amount")} className="mt-3 grid grid-cols-3 gap-2">
              {[200, 500, 1000].map((n) => (
                <button key={n} type="button" onClick={() => setBalance((b) => b + n)} className="min-h-12 rounded-xl border border-white/40 font-bold">
                  + {inr(n)}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-[#E2D3FF]">{t("Topped up by UPI in seconds. Works on your existing RFID card too.")}</p>
          </div>
          <div className="rounded-[24px] bg-white p-5 md:p-7">
            <h2 className="display text-[32px]">{t("Annual Fun Ticket")}</h2>
            <p className="mt-2 text-muted">{t("You've visited 3 times this year. Regulars save with one pass for the Dry Park and Wet-O-Wild.")}</p>
            <div aria-hidden="true" className="mt-4 grid grid-cols-4 gap-1.5">
              {[1, 1, 1, 0].map((v, i) => (
                <span key={i} className={'h-2 rounded-full ' + (v ? 'bg-dry' : 'bg-line')} />
              ))}
            </div>
            <SiteLink href="/offers" className="mt-4 inline-flex min-h-12 items-center rounded-xl border-2 border-ink px-4 font-bold">
              {t("See the pass")}
            </SiteLink>
          </div>
          <div className="rounded-[24px] bg-snow-soft p-5 text-snow-ink md:p-7">
            <h2 className="display text-[32px]">{t("Snow Park")}</h2>
            <p className="mt-2">{t("You're on the waitlist. Members hear about the opening date and early-bird slots first.")}</p>
            <span className="mt-4 inline-block rounded-full bg-snow px-3 py-1.5 text-sm font-bold text-white">{t("On the list")}</span>
          </div>
        </section>

        <section aria-labelledby="past-h" className="mt-4 rounded-[24px] bg-white p-5 md:p-7">
          <h2 id="past-h" className="display text-[32px] md:text-[40px]">
            {t("Past visits")}
          </h2>
          <ul className="mt-3">
            {[
              { img: media('crazyriver', ''), h: 'Durga Puja Fun Express', s: 'Parks Package × 4 · October' },
              { img: media('bowl15', ''), h: 'Super Bowl birthday', s: '2 lanes · August' },
              { img: media('wavepool', ''), h: 'Summer at Wet-O-Wild', s: 'Parks Package × 3 · May' },
            ].map((v) => (
              <li key={v.h} className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line py-3.5">
                <div className="relative size-16 flex-none overflow-hidden rounded-xl">
                  <Img media={v.img} fill sizes="64px" alt="" />
                </div>
                <span className="min-w-[160px] flex-1">
                  <strong className="block">{t(v.h)}</strong>
                  <span className="text-muted">{t(v.s)}</span>
                </span>
                <span className="flex gap-4">
                  <SiteLink href="/moments#share" className="font-bold text-wet underline">
                    {t("Share a photo")}
                  </SiteLink>
                  <SiteLink href="/book" className="font-bold underline">
                    {t("Book again")}
                  </SiteLink>
                </span>
              </li>
            ))}
          </ul>
        </section>
        <p className="mt-5 text-sm text-muted">{t("Sample account for the demo. Bookings, passes and game-card balances will come from the park's ticketing system.")}</p>
      </div>
    </div>
  )
}
