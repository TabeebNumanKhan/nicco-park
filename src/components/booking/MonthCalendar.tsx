'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useLang } from '@/i18n/LangProvider'
import { dateLongL, monthLong, monthShort, weekdayNarrow, weekdayShort } from '@/i18n/translate'
import type { Crowd, DayAvailability } from '@/lib/booking/types'
import { addDays, fromISODate, startOfToday, toISODate } from '@/lib/format'

export const CROWD: Record<Crowd, { label: string; dot: string; bg: string; text: string }> = {
  plenty: { label: 'Plenty left', dot: 'bg-[#20B464]', bg: 'bg-[#F1FBF5]', text: 'text-dry' },
  filling: { label: 'Filling up', dot: 'bg-[#F5A300]', bg: 'bg-white', text: 'text-[#8A5A00]' },
  few: { label: 'Few left', dot: 'bg-[#E0452B]', bg: 'bg-[#FFF4F1]', text: 'text-[#B3341D]' },
  soldout: { label: 'Sold out', dot: 'bg-[#9AA3AD]', bg: 'bg-ground', text: 'text-muted' },
}

const monthsBetween = (a: Date, b: Date) => (b.getFullYear() - a.getFullYear()) * 12 + b.getMonth() - a.getMonth()

/**
 * One month at a time, with previous / next and a row of month tabs, over the
 * whole booking window (today + `days`). Used inline on the booking page
 * (`size="lg"`, shows the crowd label in each day) and in the pop-out picker.
 */
export function MonthCalendar({
  days,
  value,
  onPick,
  size = 'sm',
}: {
  days: DayAvailability[]
  value: string | null
  onPick: (iso: string) => void
  size?: 'sm' | 'lg'
}) {
  const { lang, t } = useLang()
  const today = startOfToday()
  const byDate = useMemo(() => new Map(days.map((d) => [d.date, d])), [days])
  const last = days.length ? fromISODate(days[days.length - 1].date) : addDays(today, 90)
  const maxOffset = Math.max(0, monthsBetween(today, last))
  const [offset, setOffset] = useState(0)

  // Open on the month of the chosen date.
  useEffect(() => {
    if (value) setOffset(Math.min(maxOffset, Math.max(0, monthsBetween(today, fromISODate(value)))))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, maxOffset])

  const first = new Date(today.getFullYear(), today.getMonth() + offset, 1)
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()
  // This month: start at the current week, so weeks already gone don't push the bookable days down.
  const startDay = offset === 0 ? Math.max(1, today.getDate() - today.getDay()) : 1
  const weekStart = addDays(today, -today.getDay())
  const lg = size === 'lg'

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <button
          type="button"
          aria-label={t('Previous month')}
          disabled={offset === 0}
          onClick={() => setOffset((m) => Math.max(0, m - 1))}
          className="grid size-11 flex-none place-items-center rounded-xl border border-line-2 bg-white hover:border-ink disabled:opacity-30"
        >
          <ChevronLeft size={20} />
        </button>
        <strong aria-live="polite" className={lg ? 'text-xl' : 'text-lg'}>
          {monthLong(lang, first)}
        </strong>
        <button
          type="button"
          aria-label={t('Next month')}
          disabled={offset >= maxOffset}
          onClick={() => setOffset((m) => Math.min(maxOffset, m + 1))}
          className="grid size-11 flex-none place-items-center rounded-xl border border-line-2 bg-white hover:border-ink disabled:opacity-30"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Month tabs: jump straight to any month in the window. */}
      <div role="group" aria-label={t('Months')} className="mb-3 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${maxOffset + 1}, minmax(0, 1fr))` }}>
        {Array.from({ length: maxOffset + 1 }).map((_, m) => {
          const d = new Date(today.getFullYear(), today.getMonth() + m, 1)
          const on = m === offset
          return (
            <button
              key={m}
              type="button"
              aria-pressed={on}
              onClick={() => setOffset(m)}
              className={'min-h-10 rounded-full text-sm font-bold ' + (on ? 'bg-ink text-white' : 'bg-ground text-ink-2 hover:bg-line')}
            >
              {monthShort(lang, d)}
            </button>
          )
        })}
      </div>

      <div className={'grid grid-cols-7 ' + (lg ? 'gap-1 sm:gap-1.5' : 'gap-1.5')}>
        {Array.from({ length: 7 }).map((_, i) => {
          const wd = addDays(weekStart, i)
          return (
            <div key={i} className="pb-1 text-center text-[13px] font-bold text-muted">
              <span className={lg ? 'sm:hidden' : ''}>{weekdayNarrow(lang, wd)}</span>
              {lg && <span className="hidden sm:inline">{weekdayShort(lang, wd)}</span>}
            </div>
          )
        })}
        {Array.from({ length: new Date(first.getFullYear(), first.getMonth(), startDay).getDay() }).map((_, i) => (
          <div key={`b${i}`} aria-hidden="true" />
        ))}
        {Array.from({ length: daysInMonth - startDay + 1 }).map((_, n) => {
          const i = n + startDay - 1
          const d = new Date(first.getFullYear(), first.getMonth(), i + 1)
          const iso = toISODate(d)
          const info = byDate.get(iso)
          const isToday = iso === toISODate(today)
          const past = d < today
          const bookable = !!info && info.bookable && !isToday
          const on = iso === value
          const c = info ? CROWD[info.crowd] : null
          const cell = lg
            ? 'flex min-h-[52px] flex-col justify-between rounded-xl p-1.5 text-left sm:min-h-[72px] sm:rounded-2xl sm:p-2'
            : 'flex aspect-square flex-col items-center justify-center gap-1 rounded-xl text-[15px]'
          if (!bookable)
            return (
              <div
                key={iso}
                title={isToday ? t('Same-day tickets are sold at the gate') : info?.crowd === 'soldout' ? t('Sold out') : undefined}
                className={
                  `${cell} text-[#A9B0B8] ` +
                  (info?.crowd === 'soldout' ? 'bg-[repeating-linear-gradient(135deg,#F4F5F2_0_6px,#ECEEEA_6px_12px)] ' : '') +
                  (isToday ? 'border border-dashed border-[#C9CFD6] ' : '') +
                  (past ? 'opacity-50' : '')
                }
              >
                <span className={(lg ? 'text-base font-bold sm:text-lg ' : '') + (info?.crowd === 'soldout' ? 'line-through' : '')}>{i + 1}</span>
                {lg && isToday && <span className="hidden text-xs sm:block">{t('Today: at the gate')}</span>}
                {lg && info?.crowd === 'soldout' && <span className="hidden text-xs font-bold sm:block">{t('Sold out')}</span>}
              </div>
            )
          return (
            <button
              key={iso}
              type="button"
              aria-pressed={on}
              aria-label={`${dateLongL(lang, d)}, ${t(c!.label)}`}
              onClick={() => onPick(iso)}
              className={`${cell} font-bold ` + (on ? 'border-2 border-ink bg-ink text-white' : `${c!.bg} border border-line hover:border-ink`)}
            >
              {lg ? (
                <>
                  <strong className="text-base sm:text-lg">{i + 1}</strong>
                  <span className="flex items-center gap-1 text-xs font-medium">
                    <span aria-hidden="true" className={`size-2 flex-none rounded-full ${c!.dot}`} />
                    <span className={'hidden truncate md:inline ' + (on ? 'text-subtle' : 'text-muted')}>{t(c!.label)}</span>
                  </span>
                </>
              ) : (
                <>
                  {i + 1}
                  <span aria-hidden="true" className={`size-1.5 rounded-full ${c!.dot}`} />
                </>
              )}
            </button>
          )
        })}
      </div>
      <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted">
        {(['plenty', 'filling', 'few', 'soldout'] as Crowd[]).map((k) => (
          <span key={k} className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className={`size-2.5 rounded-full ${CROWD[k].dot}`} />
            {t(CROWD[k].label)}
          </span>
        ))}
      </p>
    </div>
  )
}
