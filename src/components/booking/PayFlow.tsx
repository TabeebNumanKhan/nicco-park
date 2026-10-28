'use client'

import { CalendarPlus, Lock, Phone, RotateCcw, Share2, ShieldCheck, Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'
import { media } from '@/content/media'
import { ecommerce, gaEvent, type Item, setUserData } from '@/lib/analytics'
import { attribution, track } from '@/lib/attribution'
import { provider, useCart } from '@/lib/booking/cart-context'
import type { Contact, PaymentMethod } from '@/lib/booking/types'
import { useLang } from '@/i18n/LangProvider'
import { useSiteData } from '@/lib/site-data'
import { dateLongL, dateShortL } from '@/i18n/translate'
import { fromISODate, inr } from '@/lib/format'
import { Img } from '../ui/Img'
import { QrCode } from '../ui/QrCode'
import { SiteLink } from '../ui/SiteLink'

const METHODS: { id: PaymentMethod; label: string; note: string; rec?: boolean }[] = [
  { id: 'upi', label: 'UPI', note: 'Any UPI app. Scan or tap to pay.', rec: true },
  { id: 'card', label: 'Debit or credit card', note: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', label: 'Net banking', note: 'All major Indian banks' },
  { id: 'wallet', label: 'Wallets', note: 'Paytm, Amazon Pay, Mobikwik' },
]
const CHANNELS: { id: Contact['channel']; label: string }[] = [
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'sms', label: 'SMS' },
  { id: 'email', label: 'Email' },
]

export function PayFlow() {
  const { settings: siteSettings } = useSiteData()
  const { cart, priced, order, setOrder, resetCart, catalog } = useCart()
  const { lang, t } = useLang()
  const [method, setMethod] = useState<PaymentMethod>('upi')
  const [channel, setChannel] = useState<Contact['channel']>('whatsapp')
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const date = cart.date ? fromISODate(cart.date) : null
  const { ticketing } = useSiteData()
  const handOff = ticketing.mode !== 'demo' && process.env.NEXT_PUBLIC_STATIC !== '1'

  // GA4 / Ads / Meta items: the ticket and any extras, in rupees incl. GST.
  const items: Item[] = [
    { item_id: priced.ticket.id, item_name: priced.ticket.name, price: priced.unit, quantity: cart.guests, item_category: 'Ticket' },
    ...priced.lines.map((l) => ({ item_id: l.id, item_name: l.name, price: l.amount / l.qty, quantity: l.qty, item_category: 'Extra' })),
  ]

  useEffect(() => {
    const a = attribution()
    track('begin_checkout', { campaign: a.campaign, variant: a.variant, props: { total: priced.total } })
    gaEvent('begin_checkout', ecommerce(priced.total, items))
    // once per visit to the payment page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pay = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || mobile.replace(/\D/g, '').length < 10) {
      setError(t('Add your name and a 10-digit mobile number so we can send your ticket.'))
      return
    }
    setError('')
    setBusy(true)
    gaEvent('add_payment_info', ecommerce(priced.total, items, { payment_type: method }))
    try {
      const o = await provider.createOrder(cart, { name: name.trim(), mobile, channel }, method, { catalog, lang, attribution: attribution() })
      setOrder(o)
      setUserData({ phone: mobile })
      // The booking id is the transaction id: GA4 drops repeats, Meta matches it with the server copy.
      gaEvent('purchase', ecommerce(o.total, items, { transaction_id: o.bookingId }), o.bookingId)
    } catch {
      setError(t('Sorry, that did not go through and you have not been charged. Please try again.'))
    }
    setBusy(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (order) {
    const d = order.cart.date ? fromISODate(order.cart.date) : null
    return (
      <div className="bg-ground">
        <div className="wrap py-8 md:py-14">
          <section aria-labelledby="ok-h" className="grid items-center gap-6 overflow-hidden rounded-[28px] bg-ink p-5 text-white md:grid-cols-[1.3fr_1fr] md:p-10">
            <div>
              <span className="inline-flex max-w-full items-center gap-2 rounded-2xl bg-dry px-3 py-1.5 text-sm leading-snug font-bold">{t('Paid · ticket sent on {channel}', { channel: t(CHANNELS.find((c) => c.id === order.contact.channel)?.label ?? '') })}</span>
              <h1 id="ok-h" className="display mt-4 text-[clamp(40px,8vw,84px)] leading-[0.9]">
                {t("You're going to Nicco Park!")}
              </h1>
              <p className="mt-4 max-w-[520px] text-lg text-subtle">{t("One QR lets your whole group in. Show it at the gate, no counter or wristband queue.")}</p>
              {/* One per row on phones, so long Bengali/Hindi labels never squeeze into three lines. */}
              <div className="mt-6 grid gap-2 min-[480px]:grid-cols-2 sm:flex sm:flex-wrap">
                {[
                  { l: 'Add to Google Wallet', I: Wallet },
                  { l: 'Share with your group', I: Share2 },
                  { l: 'Add to calendar', I: CalendarPlus },
                ].map(({ l, I }) => (
                  <button key={l} type="button" className="inline-flex min-h-12 items-center justify-start gap-2.5 rounded-2xl border border-white/30 px-4 py-2 text-left text-[15px] leading-tight font-bold sm:justify-center">
                    <I size={17} aria-hidden="true" className="flex-none" />
                    {t(l)}
                  </button>
                ))}
                <SiteLink href="/my-nicco" className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-yellow px-4 py-2 text-center text-[15px] leading-tight font-bold text-ink">
                  {t("Manage booking")}
                </SiteLink>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[340px] rounded-[24px] bg-yellow p-5 text-ink">
              <QrCode label={t("Entry QR code")} seed={11} />
              <dl className="mt-4 grid grid-cols-2 gap-3 border-t-2 border-dashed border-ink/40 pt-4 text-sm">
                <div>
                  <dt className="text-ink/70">{t("Date")}</dt>
                  <dd className="font-bold">{d ? dateShortL(lang, d) : '—'}</dd>
                </div>
                <div>
                  <dt className="text-ink/70">{t("Booking ID")}</dt>
                  <dd className="font-bold">{order.bookingId}</dd>
                </div>
                <div>
                  <dt className="text-ink/70">{t("Guests")}</dt>
                  <dd className="font-bold">
                    {order.cart.guests}
                    {order.cart.littleOnes > 0 && ` + ${order.cart.littleOnes} ${t('Little ones').toLowerCase()}`}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink/70">{t("Paid")}</dt>
                  <dd className="font-bold">{inr(order.total)}</dd>
                </div>
              </dl>
            </div>
          </section>
          <section aria-label={t("Before you go")} className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              { h: 'Plan your day', s: 'Timings, the park map and what to pack for Wet-O-Wild.', href: '/plan' },
              { h: 'Share #NiccoMoments', s: 'Post your best photo. One family wins a free day every month.', href: '/moments' },
              { h: 'Snow Park is coming', s: 'Ticket holders get first access when it opens.', href: '/worlds/snow-park' },
            ].map((c) => (
              <SiteLink key={c.h} href={c.href} className="rounded-[20px] bg-white p-5 hover:shadow-md">
                <strong className="block text-lg">{t(c.h)} →</strong>
                <span className="text-muted">{t(c.s)}</span>
              </SiteLink>
            ))}
          </section>
          <p className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setOrder(null)
                resetCart()
              }}
              className="inline-flex items-center gap-2 font-bold text-wet"
            >
              <RotateCcw size={16} aria-hidden="true" />
              {t("Start a new booking")}
            </button>
          </p>
        </div>
      </div>
    )
  }

  if (handOff) {
    // Until payment is connected here, the official ticketing site completes the booking.
    const go = `${ticketing.bookingUrl}${ticketing.bookingUrl.includes('?') ? '&' : '?'}utm_source=niccoparks.com&utm_medium=referral&utm_campaign=website_handoff${cart.date ? `&date=${cart.date}` : ''}`
    return (
      <div className="bg-ground">
        <div className="wrap pt-6 pb-12 md:pt-8 md:pb-24">
          <h1 className="display text-[clamp(40px,9vw,96px)] leading-[0.9]">{t('Last step')}</h1>
          <section aria-labelledby="ho-h" className="mt-5 max-w-[720px] rounded-[24px] bg-white p-5 md:p-7">
            <h2 id="ho-h" className="text-[22px] leading-tight font-bold">
              {t('Finish on our official ticketing site')}
            </h2>
            <p className="mt-2 text-lg leading-relaxed text-ink-2">{t('You will pick the same tickets there and pay securely. Your QR ticket comes on WhatsApp or SMS.')}</p>
            <dl className="mt-4 grid gap-2 rounded-2xl bg-ground p-4">
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="text-muted">{t('Date')}</dt>
                <dd className="font-bold">{date ? dateLongL(lang, date) : t('No date picked')}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="text-muted">{t(priced.ticket.name)}</dt>
                <dd className="font-bold">× {cart.guests}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2 border-t border-line pt-2">
                <dt className="font-bold">{t('Total')}</dt>
                <dd className="font-bold">{priced.totalLabel}</dd>
              </div>
            </dl>
            <a
              href={go}
              onClick={() => track('cta_click', { props: { href: 'booking-site' } })}
              className="mt-5 flex min-h-[62px] w-full items-center justify-center gap-2 rounded-2xl bg-yellow px-4 text-center text-[19px] leading-tight font-bold text-ink"
            >
              <Lock size={18} aria-hidden="true" className="flex-none" />
              {t('Continue to secure booking')}
            </a>
            <p className="mt-3 text-sm text-muted">{t('Help: {phone}', { phone: siteSettings.phone.display })}</p>
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-ground">
      <form onSubmit={pay} className="wrap pt-6 pb-12 md:pt-8 md:pb-24">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3 md:mb-6">
          <h1 className="display text-[clamp(40px,9vw,96px)] leading-[0.9]">{t("Last step")}</h1>
          <SiteLink href="/book?step=extras" className="font-bold underline">
            {t("Back to your day")}
          </SiteLink>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-6">
          {/* Order summary first on phones, so people see what they're paying for. */}
          <aside aria-labelledby="o-h" className="overflow-hidden rounded-[24px] bg-white lg:sticky lg:top-32 lg:order-2">
            <div className="relative hidden h-40 lg:block">
              <Img media={media('crazyriver', '')} fill sizes="400px" alt="" />
            </div>
            <div className="flex flex-col gap-2.5 p-5 md:p-6">
              <h2 id="o-h" className="display text-[28px] md:text-[32px]">
                {date ? dateLongL(lang, date) : t('No date picked')}
              </h2>
              <div className="flex justify-between gap-2">
                <span>
                  {t(priced.ticket.name)} × {cart.guests}
                </span>
                <strong>{inr(priced.ticketsTotal)}</strong>
              </div>
              {cart.littleOnes > 0 && (
                <div className="flex justify-between gap-2 text-muted">
                  <span>{t('Little ones')} × {cart.littleOnes}</span>
                  <span>{t("Free")}</span>
                </div>
              )}
              {priced.lines.map((l) => (
                <div key={l.id} className="flex justify-between gap-2">
                  <span>{t(l.name)}{l.time ? ` · ${l.time}` : ''} × {l.qty}</span>
                  <strong>{inr(l.amount)}</strong>
                </div>
              ))}
              <div className="flex items-baseline justify-between border-t-2 border-dashed border-line pt-3">
                <span className="font-bold">
                  {t("Total")} <span className="text-[13px] font-normal text-muted">{t("incl. taxes")}</span>
                </span>
                <span className="display text-[36px] [font-stretch:90%]">{priced.totalLabel}</span>
              </div>
              {!date && (
                <SiteLink href="/book" className="font-bold text-wet underline">
                  {t("Pick a date first")}
                </SiteLink>
              )}
            </div>
          </aside>

          <div className="flex min-w-0 flex-col gap-4 lg:order-1">
            <section aria-labelledby="c1" className="rounded-[24px] bg-white p-4 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 id="c1" className="text-[22px] font-bold">
                  {t("Who's booking?")}
                </h2>
                <span className="text-sm text-muted">
                  {t('No account needed.')}{' '}
                  <SiteLink href="/my-nicco" className="font-semibold text-wet underline">
                    {t("Have one? Sign in")}
                  </SiteLink>
                </span>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="nm" className="mb-1.5 block font-semibold">
                    {t("Full name")}
                  </label>
                  <input id="nm" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("As on your ID")} className="h-13 w-full rounded-2xl border border-[#C9CFD6] px-4" />
                </div>
                <div>
                  <label htmlFor="mb" className="mb-1.5 block font-semibold">
                    {t("Mobile number")}
                  </label>
                  <div className="flex gap-2">
                    <span className="grid h-13 place-items-center rounded-2xl bg-ground px-3.5 font-semibold">+91</span>
                    <input id="mb" type="tel" inputMode="numeric" autoComplete="tel-national" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder={t("10-digit mobile")} className="h-13 min-w-0 flex-1 rounded-2xl border border-[#C9CFD6] px-4" />
                  </div>
                </div>
              </div>
              <fieldset className="mt-4">
                <legend className="mb-2 font-semibold">{t("Send my QR ticket by")}</legend>
                <div role="radiogroup" className="grid grid-cols-3 gap-2 sm:flex">
                  {CHANNELS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      role="radio"
                      aria-checked={channel === c.id}
                      onClick={() => setChannel(c.id)}
                      className={'min-h-12 min-w-0 rounded-2xl px-2 text-[15px] leading-tight font-bold sm:px-5 sm:text-base ' + (channel === c.id ? 'border-2 border-ink bg-yellow-soft' : 'border border-[#C9CFD6] bg-white')}
                    >
                      {t(c.label)}
                    </button>
                  ))}
                </div>
              </fieldset>
            </section>

            <section aria-labelledby="c2" className="rounded-[24px] bg-white p-4 sm:p-6">
              <h2 id="c2" className="text-[22px] font-bold">
                {t("Pay")}
              </h2>
              <div role="radiogroup" aria-labelledby="c2" className="mt-4 flex flex-col gap-2.5">
                {METHODS.map((m) => {
                  const on = method === m.id
                  return (
                    <div key={m.id} className={'rounded-[18px] ' + (on ? 'border-2 border-ink bg-[#FFFDF2]' : 'border border-line')}>
                      <button type="button" role="radio" aria-checked={on} onClick={() => setMethod(m.id)} className="flex w-full items-center gap-3.5 p-4 text-left">
                        <span aria-hidden="true" className={'size-5 flex-none rounded-full ' + (on ? 'border-[6px] border-ink' : 'border-2 border-[#C9CFD6]')} />
                        <span className="min-w-0 flex-1">
                          <strong className="block">{t(m.label)}</strong>
                          <span className="text-sm text-muted">{t(m.note)}</span>
                        </span>
                        {m.rec && <span className="rounded-full bg-dry px-2.5 py-1 text-xs font-bold text-white">{t("Fastest")}</span>}
                      </button>
                      {on && m.id === 'upi' && (
                        <div className="flex flex-wrap items-center gap-4 px-4 pb-4 sm:pl-12">
                          <QrCode label={t("UPI QR code")} seed={5} className="w-36 border border-line" />
                          <div className="min-w-[180px] flex-1">
                            <p className="leading-snug">{t("Scan with any UPI app. On your phone, we'll open the app for you.")}</p>
                            <p className="mt-2.5 flex flex-wrap gap-1.5">
                              {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((a) => (
                                <span key={a} className="rounded-lg border border-line bg-white px-2.5 py-1 text-[13px] font-bold">
                                  {a}
                                </span>
                              ))}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              <details className="mt-4">
                <summary className="min-h-8 cursor-pointer font-semibold text-wet">{t("Have an offer code?")}</summary>
                <div className="mt-2.5 flex max-w-[420px] gap-2">
                  <label htmlFor="code" className="sr-only">
                    {t("Offer code")}
                  </label>
                  <input id="code" placeholder={t("Enter code")} className="h-12 min-w-0 flex-1 rounded-xl border border-[#C9CFD6] px-3.5" />
                  <button type="button" className="min-h-12 rounded-xl border-2 border-ink px-4 font-bold">
                    {t("Apply")}
                  </button>
                </div>
              </details>
              {error && (
                <p role="alert" className="mt-4 rounded-xl bg-alert-soft px-3.5 py-2.5 font-semibold text-alert-ink">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={busy || !date}
                className="mt-5 min-h-[62px] w-full rounded-2xl bg-yellow text-[19px] font-bold text-ink disabled:opacity-50"
              >
                {busy ? t('Processing…') : t('Pay {amount} securely', { amount: inr(priced.total) })}
              </button>
              <div className="mt-4 grid gap-2 text-sm text-ink-2 sm:grid-cols-2">
                {[
                  { I: Lock, x: t('Encrypted payment') },
                  { I: ShieldCheck, x: t('Official Nicco Park site') },
                  { I: RotateCcw, x: t('Free date change until the day before') },
                  { I: Phone, x: t('Help: {phone}', { phone: siteSettings.phone.display }) },
                ].map(({ I, x }) => (
                  <span key={x} className="flex items-center gap-2">
                    <I size={16} aria-hidden="true" className="text-dry" />
                    {x}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted">{t("Demo checkout: no payment is taken. In production this hands off to the park's payment gateway.")}</p>
            </section>
          </div>
        </div>
      </form>
    </div>
  )
}
