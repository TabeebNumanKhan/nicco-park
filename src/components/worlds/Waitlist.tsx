'use client'

import { useState } from 'react'
import { useLang } from '@/i18n/LangProvider'

export function Waitlist() {
  const [joined, setJoined] = useState(false)
  const { t } = useLang()
  return (
    <div id="waitlist" className="flex scroll-mt-32 flex-col gap-4 rounded-[24px] bg-snow p-5 text-white md:rounded-[28px] md:p-8">
      <h2 className="display text-[32px] md:text-[40px]">{t("Be first in the snow")}</h2>
      <p className="text-[#DDEEFF]">{t("Join the waitlist for the opening date and early-bird tickets before they go on sale.")}</p>
      {joined ? (
        <p role="status" className="rounded-2xl bg-white/15 px-4 py-3 font-bold">
          {t("You're in. We'll message you before anyone else.")}
        </p>
      ) : (
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            setJoined(true)
          }}
        >
          <label htmlFor="wl" className="font-semibold">
            {t("WhatsApp number")}
          </label>
          <input id="wl" type="tel" inputMode="numeric" placeholder={t("10-digit mobile")} className="h-14 rounded-2xl border-0 bg-white px-4 text-ink" />
          <button className="min-h-14 rounded-2xl bg-yellow font-bold text-ink">{t("Join the waitlist")}</button>
        </form>
      )}
    </div>
  )
}
