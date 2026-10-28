'use client'

import { ChevronLeft, ChevronRight, Megaphone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLang } from '@/i18n/LangProvider'
import type { Announcement } from '@/lib/cms'
import { useSiteData } from '@/lib/site-data'
import { SiteLink } from '../ui/SiteLink'

const TONE: Record<string, string> = {
  yellow: 'bg-yellow text-ink',
  coral: 'bg-coral text-white',
  ink: 'bg-ink text-white',
  dry: 'bg-dry text-white',
  wet: 'bg-wet text-white',
  bowl: 'bg-bowl text-white',
}

/**
 * CMS → Header → Announcement bar. One message at a time; several rotate
 * every 6 s (paused on hover/focus, never for reduced motion) with arrows.
 * Without JavaScript the first message shows.
 */
export function AnnouncementBar({ items }: { items: Announcement[] }) {
  const { t } = useLang()
  const [i, setI] = useState(0)
  const [hold, setHold] = useState(false)
  const [moving, setMoving] = useState(false)
  useEffect(() => setMoving(items.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches), [items.length])
  useEffect(() => {
    if (!moving || hold) return
    const id = window.setTimeout(() => setI((x) => (x + 1) % items.length), 6000)
    return () => window.clearTimeout(id)
  }, [moving, hold, i, items.length])
  const a = items[i % items.length]
  const text = (
    <>
      <Megaphone size={15} aria-hidden="true" className="flex-none" />
      <span className="min-w-0 [overflow-wrap:anywhere]">{t(a.text)}</span>
      {a.href && <span aria-hidden="true">→</span>}
    </>
  )
  return (
    <div className={TONE[a.tone] ?? TONE.yellow} role="region" aria-label={t('Announcements')} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}>
      <div className="wrap flex min-h-10 items-center justify-center gap-2 py-1.5 text-center text-sm font-bold">
        {items.length > 1 && (
          <button type="button" aria-label={t('Previous message')} onClick={() => setI((x) => (x - 1 + items.length) % items.length)} className="grid size-8 flex-none place-items-center rounded-full hover:bg-black/10">
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
        )}
        <p className="m-0 flex min-w-0 flex-1 items-center justify-center gap-2" aria-live="polite">
          {a.href ? (
            <SiteLink href={a.href} className="inline-flex min-w-0 items-center gap-2 underline-offset-4 hover:underline">
              {text}
            </SiteLink>
          ) : (
            text
          )}
        </p>
        {items.length > 1 && (
          <button type="button" aria-label={t('Next message')} onClick={() => setI((x) => (x + 1) % items.length)} className="grid size-8 flex-none place-items-center rounded-full hover:bg-black/10">
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}

/** Above the header, outside it, so it scrolls away and the sticky header keeps its height. */
export function Announcements() {
  const { announcements } = useSiteData()
  return announcements.length ? <AnnouncementBar items={announcements} /> : null
}
