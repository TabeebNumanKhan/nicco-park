'use client'

import { Check } from 'lucide-react'
import { useLang } from '@/i18n/LangProvider'
import { dateLongL } from '@/i18n/translate'
import { useCart } from '@/lib/booking/cart-context'
import { fromISODate, inr } from '@/lib/format'
import { SiteLink } from '../ui/SiteLink'

export function Summary({ cta = true }: { cta?: boolean }) {
  const { cart, priced } = useCart()
  const { lang, t } = useLang()
  return (
    <aside aria-labelledby="sum-h" className="overflow-hidden rounded-[24px] bg-white">
      <div className="relative bg-ink px-6 py-5 text-white">
        <h2 id="sum-h" className="display text-[34px] md:text-[40px]">
          {t('Your day')}
        </h2>
        <p className="mt-1.5 text-subtle">{cart.date ? dateLongL(lang, fromISODate(cart.date)) : t('Pick a date')}</p>
        <span aria-hidden="true" className="absolute -bottom-3 -left-3 size-6 rounded-full bg-ground" />
        <span aria-hidden="true" className="absolute -right-3 -bottom-3 size-6 rounded-full bg-ground" />
      </div>
      <div className="flex flex-col gap-3 px-6 py-5">
        <div className="flex justify-between gap-2.5">
          <span>
            {t(priced.ticket.name)} × {cart.guests}
          </span>
          <strong>{inr(priced.fullTicketsTotal)}</strong>
        </div>
        {cart.littleOnes > 0 && (
          <div className="flex justify-between gap-2.5 text-muted">
            <span>{t('Little ones')} × {cart.littleOnes}</span>
            <span>{t('Free')}</span>
          </div>
        )}
        {priced.lines.map((l) => (
          <div key={l.id} className="flex justify-between gap-2.5">
            <span>{t(l.name)}{l.time ? ` · ${l.time}` : ''} × {l.qty}</span>
            <strong>{inr(l.amount)}</strong>
          </div>
        ))}
        {priced.saving > 0 && (
          <div className="flex justify-between gap-2.5 font-semibold text-dry">
            <span>{t('Student saving')}</span>
            <span>−{inr(priced.saving)}</span>
          </div>
        )}
        <div className="flex items-baseline justify-between border-t-2 border-dashed border-line pt-3.5">
          <span className="font-bold">
            {t('Total')} <span className="text-[13px] font-normal text-muted">{t('incl. taxes')}</span>
          </span>
          <span className="display text-[40px] [font-stretch:90%]">{priced.totalLabel}</span>
        </div>
        {cta && (
          <SiteLink
            href="/book/pay"
            aria-disabled={!cart.date}
            className={'flex min-h-14 items-center justify-center rounded-2xl text-[17px] font-bold ' + (cart.date ? 'bg-yellow text-ink' : 'pointer-events-none bg-line text-muted')}
          >
            {t('Continue to pay')}
          </SiteLink>
        )}
        <ul className="mt-1 flex flex-col gap-2 text-sm text-ink-2">
          {['QR ticket on WhatsApp. No wristband queue.', 'Change your date free until the day before', 'Official Nicco Park price. No hidden fees.'].map((x) => (
            <li key={x} className="flex gap-2">
              <Check size={16} strokeWidth={2.6} className="mt-0.5 flex-none text-dry" aria-hidden="true" />
              {t(x)}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
