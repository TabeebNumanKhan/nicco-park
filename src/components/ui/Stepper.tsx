'use client'

import { Minus, Plus } from 'lucide-react'
import { useLang } from '@/i18n/LangProvider'

export function Stepper({
  value,
  onChange,
  min = 0,
  max = 20,
  label,
  tone = 'light',
}: {
  value: number
  onChange: (n: number) => void
  min?: number
  max?: number
  label: string
  tone?: 'light' | 'dark'
}) {
  const { t } = useLang()
  const btn =
    'grid size-11 place-items-center rounded-xl transition disabled:opacity-40 ' +
    (tone === 'dark' ? 'bg-ink text-white' : 'border border-line-2 bg-white text-ink hover:bg-ground')
  return (
    <span role="group" aria-label={label} className="flex items-center gap-1">
      <button type="button" className={btn.replace('bg-ink text-white', 'border border-line-2 bg-white text-ink')} aria-label={`${t('Remove one')}: ${label}`} disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))}>
        <Minus size={18} strokeWidth={2.6} />
      </button>
      <span aria-live="polite" className="min-w-8 text-center text-lg font-bold tabular-nums">
        {value}
      </span>
      <button type="button" className={btn} aria-label={`${t('Add one')}: ${label}`} disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))}>
        <Plus size={18} strokeWidth={2.6} />
      </button>
    </span>
  )
}
