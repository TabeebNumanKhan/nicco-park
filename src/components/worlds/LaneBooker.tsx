'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { withLang } from '@/i18n/config'
import { useLang } from '@/i18n/LangProvider'
import { useSiteData } from '@/lib/site-data'
import { useCart } from '@/lib/booking/cart-context'
import { staticHref } from '../ui/SiteLink'

export function LaneBooker() {
  const { laneTimes } = useSiteData().catalog
  const router = useRouter()
  const { setCart } = useCart()
  const { lang, t } = useLang()
  const [slot, setSlot] = useState(3)
  const book = () => {
    setCart((c) => ({ laneSlot: slot, extras: { ...c.extras, bowl: Math.max(1, c.extras.bowl) } }))
    const href = withLang('/book?step=extras', lang)
    if (process.env.NEXT_PUBLIC_STATIC === '1') window.location.href = staticHref(href)
    else router.push(href)
  }
  return (
    <div id="lane" className="flex scroll-mt-32 flex-col gap-4 rounded-[24px] bg-bowl-soft p-5 md:rounded-[28px] md:p-8">
      <h2 className="display text-[32px] md:text-[40px]">{t("Book a lane")}</h2>
      <p className="text-[#3D2272]">{t("Pick a start time and skip the wait at the counter.")}</p>
      <div role="group" aria-label={t("Start time")} className="grid grid-cols-4 gap-2">
        {laneTimes.map((time, i) => (
          <button
            key={time}
            type="button"
            aria-pressed={i === slot}
            onClick={() => setSlot(i)}
            className={'min-h-12 rounded-xl text-sm font-bold sm:text-base ' + (i === slot ? 'border-2 border-bowl-ink bg-bowl text-white' : 'border border-[#D9C8F7] bg-white text-[#3D2272]')}
          >
            {time}
          </button>
        ))}
      </div>
      <button type="button" onClick={book} className="min-h-14 rounded-2xl bg-bowl px-6 font-bold text-white">
        {t('Book the {time} lane', { time: laneTimes[slot] })}
      </button>
      <p className="text-sm text-[#3D2272]">{t("Hosted the Merchant's Cup, Cyber Cup, The Telegraph inter-school tournament and the Kolkata Bowling Championship.")}</p>
    </div>
  )
}
