'use client'

import { useState } from 'react'
import type { Ride } from '@/content/types'
import { rideAccessLabel, rideKindLabel } from '@/content/worlds'
import { useLang } from '@/i18n/LangProvider'
import { Img } from '../ui/Img'

const KINDS: Ride['kind'][] = ['thrill', 'family', 'little', 'sights']
const ACCESS_TONE = { day: 'text-dry', package: 'text-muted', pay: 'text-alert-ink' }

export function RideGrid({ rides, tint, color }: { rides: Ride[]; tint: string; color: string }) {
  const { t } = useLang()
  const [filter, setFilter] = useState<'all' | Ride['kind']>('all')
  const kinds = KINDS.filter((k) => rides.some((r) => r.kind === k))
  const shown = filter === 'all' ? rides : rides.filter((r) => r.kind === filter)
  return (
    <>
      <div role="group" aria-label={t("Filter rides")} className="scroll-x -mx-4 mb-5 gap-1.5 px-4 md:mx-0 md:flex-wrap md:px-0">
        {(['all', ...kinds] as const).map((k) => {
          const count = k === 'all' ? rides.length : rides.filter((r) => r.kind === k).length
          const on = filter === k
          return (
            <button
              key={k}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(k)}
              className={'min-h-11 rounded-full px-4 ' + (on ? 'bg-ink font-bold text-white' : 'border border-[#C9CFD6] bg-white font-semibold')}
            >
              {k === 'all' ? t('All') : t(rideKindLabel[k])} <span className="opacity-70">{count}</span>
            </button>
          )
        })}
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((r) => (
          <article key={r.slug} className="flex overflow-hidden rounded-[18px] border border-line bg-white sm:flex-col sm:rounded-[22px]">
            <div className="relative w-28 flex-none sm:h-[190px] sm:w-auto">
              {r.image ? (
                <Img media={r.image} fill sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 112px" />
              ) : (
                <div aria-hidden="true" className="flex h-full min-h-32 items-center justify-center p-2 text-center font-display text-base font-extrabold [font-stretch:80%] sm:text-[28px]" style={{ background: tint, color }}>
                  {r.name}
                </div>
              )}
              <span className="absolute top-1.5 left-1.5 rounded-full bg-white px-2 py-0.5 text-xs font-bold sm:top-3 sm:left-3 sm:px-2.5 sm:py-1 sm:text-xs">{t(rideKindLabel[r.kind])}</span>
              {r.status === 'maintenance' && (
                <span className="absolute inset-x-1.5 bottom-1.5 rounded-full bg-alert px-2 py-0.5 text-center text-xs font-bold text-white sm:inset-x-auto sm:top-3 sm:right-3 sm:bottom-auto sm:text-xs">
                  {t("Closed for maintenance")}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1 px-3.5 py-3 sm:gap-2 sm:px-4.5 sm:pt-4 sm:pb-4.5">
              <h3 className="display text-[21px] [font-stretch:85%] sm:text-[26px]">{r.name}</h3>
              <p className="text-sm leading-snug text-ink-2 sm:text-base">{t(r.line)}</p>
              <p className={`mt-auto pt-1 text-[13px] font-bold sm:pt-2.5 ${ACCESS_TONE[r.access]}`}>{t(rideAccessLabel[r.access])}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
