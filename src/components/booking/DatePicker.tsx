'use client'

import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/i18n/LangProvider'
import { provider } from '@/lib/booking/cart-context'
import type { DayAvailability } from '@/lib/booking/types'
import { startOfToday, toISODate } from '@/lib/format'
import { MonthCalendar } from './MonthCalendar'

export { CROWD } from './MonthCalendar'

const DAYS_AHEAD = 90

/**
 * Pop-out calendar: every bookable day for the next three months, month by
 * month, with live availability. Opens as a bottom sheet on phones and a
 * centred dialog from tablet up.
 */
export function DatePicker({
  open,
  value,
  onPick,
  onClose,
}: {
  open: boolean
  value: string | null
  onPick: (iso: string) => void
  onClose: () => void
}) {
  const { lang, t } = useLang()
  const [days, setDays] = useState<DayAvailability[]>([])
  const panel = useRef<HTMLDivElement>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!open || days.length) return
    provider.getAvailability(toISODate(startOfToday()), DAYS_AHEAD + 1).then(setDays)
  }, [open, days.length])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeRef.current()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])


  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/50 md:items-center" onClick={onClose}>
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dp-h"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-[26px] bg-white p-4 pb-[max(16px,env(safe-area-inset-bottom))] text-ink outline-none md:max-w-[520px] md:rounded-[26px] md:p-6"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 id="dp-h" className="text-xl font-bold">
            {t('Pick any date')}
          </h2>
          <button type="button" onClick={onClose} aria-label={t('Close')} className="grid size-11 place-items-center rounded-xl border border-line-2">
            <X size={20} />
          </button>
        </div>
        <MonthCalendar
          days={days}
          value={value}
          onPick={(iso) => {
            onPick(iso)
            onClose()
          }}
        />
        <p className="mt-2 text-[13px] text-muted">{t('Same price every day. Same-day tickets are sold at the gate.')}</p>
      </div>
    </div>
  )
}
