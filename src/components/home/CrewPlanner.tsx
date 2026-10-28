'use client'

import { useState } from 'react'
import type { Crew } from '@/content/types'
import { useLang } from '@/i18n/LangProvider'
import { Img } from '../ui/Img'
import { SiteLink } from '../ui/SiteLink'

export function CrewPlanner({ crews, heading, intro }: { crews: Crew[]; heading?: string; intro?: string }) {
  const [id, setId] = useState(crews[0].id)
  const { t } = useLang()
  const crew = crews.find((c) => c.id === id) ?? crews[0]
  return (
    <section aria-labelledby="crew-h" className="relative overflow-hidden bg-lilac">
      <div aria-hidden="true" className="dots pointer-events-none absolute inset-0 text-bowl/15" />
      <div className="wrap relative py-12 md:py-20">
        <h2 id="crew-h" className="h2">
          {heading ?? t("Who's coming?")}
        </h2>
        <p className="mt-2.5 mb-6 text-lg text-bowl-ink md:text-[19px]">{intro ?? t("Pick your crew. We'll plan the day and the ticket.")}</p>
        <div role="tablist" aria-label={t('Plan by crew')} className="scroll-x -mx-4 mb-6 gap-2 px-4 md:mx-0 md:flex-wrap md:px-0">
          {crews.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={c.id === id}
              onClick={() => setId(c.id)}
              className={
                'min-h-12 rounded-full px-5 text-[15px] md:min-h-13 md:text-base ' +
                (c.id === id ? 'bg-bowl font-bold text-white' : 'border border-[#D9C8F7] bg-white font-semibold hover:border-bowl')
              }
            >
              {t(c.label)}
            </button>
          ))}
        </div>
        <div role="tabpanel" className="grid overflow-hidden rounded-[24px] border-2 border-ink bg-white shadow-[8px_8px_0_0_var(--bowl)] md:grid-cols-2 md:rounded-[28px]">
          <div className="relative min-h-[220px] md:min-h-[420px]">
            <Img media={crew.image} fill sizes="(min-width: 768px) 50vw, 100vw" alt={t(crew.image.alt)} />
          </div>
          <div className="flex flex-col gap-5 p-5 md:p-9">
            <h3 className="display text-[30px] md:text-[40px]">{t(crew.title)}</h3>
            <ol className="flex flex-col">
              {crew.steps.map((s) => (
                <li key={s.time + s.what} className="flex gap-4 border-t border-line py-3.5">
                  <span className="w-[76px] flex-none font-bold text-muted md:w-[82px]">{t(s.time)}</span>
                  <span className="text-[16px] leading-snug md:text-[17px]">{t(s.what)}</span>
                </li>
              ))}
            </ol>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3.5 rounded-[18px] bg-yellow-soft p-4">
              <div>
                <div className="text-[13px] text-muted">{t('Best ticket for this day')}</div>
                <div className="text-lg font-bold">{t(crew.ticket)}</div>
              </div>
              <SiteLink href={crew.cta.href} className="inline-flex min-h-13 w-full items-center justify-center rounded-2xl bg-ink px-6 font-bold text-white sm:w-auto">
                {t(crew.cta.label)}
              </SiteLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
