'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/i18n/LangProvider'

/** Days · hours · minutes until a CMS date. Shows the end date without JavaScript. */
export function Countdown({ endsAt, dark = true }: { endsAt: string; dark?: boolean }) {
  const { t } = useLang()
  const end = new Date(endsAt).getTime()
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 30_000)
    return () => window.clearInterval(id)
  }, [])
  if (now === null) return null
  const left = Math.max(0, end - now)
  if (!left) return <p className="text-xl font-bold">{t('This offer has ended.')}</p>
  const d = Math.floor(left / 86_400_000)
  const h = Math.floor((left % 86_400_000) / 3_600_000)
  const m = Math.floor((left % 3_600_000) / 60_000)
  const box = 'flex min-w-20 flex-col items-center rounded-2xl px-3 py-2.5 ' + (dark ? 'bg-white/12' : 'bg-ink/8')
  return (
    <div role="timer" aria-live="off" className="flex gap-2">
      {[
        [d, 'days'],
        [h, 'hours'],
        [m, 'minutes'],
      ].map(([n, label]) => (
        <span key={label} className={box}>
          <span className="display text-[40px] leading-none tabular-nums">{n}</span>
          <span className="mt-1 text-xs font-semibold opacity-80">{t(label as string)}</span>
        </span>
      ))}
    </div>
  )
}
