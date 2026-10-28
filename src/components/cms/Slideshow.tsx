'use client'

import { ChevronLeft, ChevronRight, Pause, Play, Ticket } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Media } from '@/content/types'
import { useLang } from '@/i18n/LangProvider'
import { Img } from '../ui/Img'
import { SiteLink } from '../ui/SiteLink'

export type Slide = { id: string; image: Media; heading?: string; text?: string; link?: { label: string; href: string } }

/**
 * Photos one after another. Every slide is in the page (readable and
 * swipeable without JavaScript, as a scroll strip); the arrows, dots and
 * auto-advance are added on top. Auto-advance pauses on hover, on focus and
 * for visitors who prefer reduced motion, and has a pause button (WCAG 2.2.2).
 *
 * framed: one photo at a time near its real size, with the same photo blurred behind.
 * cards:  several cards in view, swipe for more.
 * full:   edge to edge, for large photos only.
 */
export function Slideshow({ slides, style = 'framed', seconds = 5, dark = false, label }: { slides: Slide[]; style?: 'framed' | 'cards' | 'full'; seconds?: number; dark?: boolean; label: string }) {
  const { t } = useLang()
  const rail = useRef<HTMLUListElement>(null)
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [hold, setHold] = useState(false)
  const n = slides.length

  useEffect(() => {
    if (seconds > 0 && n > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(true)
  }, [seconds, n])

  const go = useCallback(
    (k: number) => {
      const el = rail.current
      if (!el) return
      const next = (k + n) % n
      const child = el.children[next] as HTMLElement | undefined
      if (child) el.scrollTo({ left: child.offsetLeft - el.offsetLeft - (style === 'cards' ? 0 : 0), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
      setI(next)
    },
    [n, style],
  )

  // Keep the dots in step when the visitor swipes.
  useEffect(() => {
    const el = rail.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const kids = Array.from(el.children) as HTMLElement[]
        const x = el.scrollLeft
        let best = 0
        kids.forEach((c, k) => {
          if (Math.abs(c.offsetLeft - el.offsetLeft - x) < Math.abs(kids[best].offsetLeft - el.offsetLeft - x)) best = k
        })
        setI(best)
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!playing || hold || n < 2) return
    const id = window.setTimeout(() => go(i + 1), Math.max(2, seconds) * 1000)
    return () => window.clearTimeout(id)
  }, [playing, hold, i, n, seconds, go])

  const item =
    style === 'cards'
      ? 'w-[82%] flex-none snap-start sm:w-[46%] lg:w-[31.5%]'
      : 'w-full flex-none snap-center'

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription={t('carousel')}
      aria-label={label}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      <ul ref={rail} className={'rail m-0 flex list-none snap-x snap-mandatory overflow-x-auto p-0 ' + (style === 'cards' ? 'gap-4' : 'gap-0')}>
        {slides.map((s, k) => (
          <li key={s.id} className={item} aria-roledescription={t('slide')} aria-label={t('{n} of {total}', { n: k + 1, total: n })}>
            {style === 'cards' ? (
              <figure className={'m-0 flex h-full flex-col overflow-hidden rounded-[22px] ' + (dark ? 'bg-white/10' : 'border border-line bg-white text-ink')}>
                <div className="relative aspect-[4/3]">
                  <Img media={s.image} fill sizes="(min-width: 1024px) 420px, (min-width: 640px) 46vw, 82vw" />
                </div>
                {(s.heading || s.text || s.link?.label) && (
                  <figcaption className="flex flex-1 flex-col gap-2 p-4 md:p-5">
                    {s.heading && <strong className="text-lg leading-tight">{t(s.heading)}</strong>}
                    {s.text && <span className={dark ? 'text-white/85' : 'text-ink-2'}>{t(s.text)}</span>}
                    {s.link?.label && s.link.href && (
                      <SiteLink href={s.link.href} className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start pt-1 font-bold underline">
                        {t(s.link.label)} →
                      </SiteLink>
                    )}
                  </figcaption>
                )}
              </figure>
            ) : style === 'full' ? (
              <figure className="relative m-0 aspect-[4/5] overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
                <Img media={s.image} fill sizes="100vw" />
                {(s.heading || s.text || s.link?.label) && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-5 pt-20 text-white md:p-10 md:pt-28">
                    <div className="wrap !px-0">
                      {s.heading && <strong className="display block text-[clamp(28px,5vw,56px)] leading-[0.95]">{t(s.heading)}</strong>}
                      {s.text && <span className="mt-2 block max-w-[560px] text-lg text-white/90">{t(s.text)}</span>}
                      {s.link?.label && s.link.href && <SlideButton href={s.link.href} label={t(s.link.label)} />}
                    </div>
                  </figcaption>
                )}
              </figure>
            ) : (
              <figure className="m-0 grid items-center gap-5 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-10">
                {/* Shown near its real size over a blurred wash of itself, so small park photos stay sharp. */}
                <div className="relative overflow-hidden rounded-[24px]">
                  <div aria-hidden="true" className="absolute inset-0 scale-110 blur-2xl">
                    <Img media={s.image} fill sizes="200px" alt="" />
                  </div>
                  <div className="relative mx-auto aspect-[4/3] w-full max-w-[720px] overflow-hidden rounded-[18px] border-4 border-white shadow-xl">
                    <Img media={s.image} fill sizes="(min-width: 768px) 720px, 92vw" />
                  </div>
                </div>
                {(s.heading || s.text || s.link?.label) && (
                  <figcaption className="min-w-0">
                    {s.heading && <strong className="h2 block [overflow-wrap:anywhere]">{t(s.heading)}</strong>}
                    {s.text && <span className={'mt-3 block text-lg leading-relaxed ' + (dark ? 'text-white/85' : 'text-ink-2')}>{t(s.text)}</span>}
                    {s.link?.label && s.link.href && <SlideButton href={s.link.href} label={t(s.link.label)} />}
                  </figcaption>
                )}
              </figure>
            )}
          </li>
        ))}
      </ul>

      {n > 1 && (
        <div className={'mt-4 flex flex-wrap items-center gap-3 ' + (style === 'full' ? 'wrap' : '')}>
          <button type="button" onClick={() => go(i - 1)} aria-label={t('Previous slide')} className={'grid size-11 place-items-center rounded-full border-2 ' + (dark ? 'border-white' : 'border-ink')}>
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(i + 1)} aria-label={t('Next slide')} className={'grid size-11 place-items-center rounded-full border-2 ' + (dark ? 'border-white' : 'border-ink')}>
            <ChevronRight size={20} aria-hidden="true" />
          </button>
          <ol className="m-0 flex list-none flex-wrap gap-1 p-0" aria-label={t('Choose a slide')}>
            {slides.map((s, k) => (
              <li key={s.id}>
                <button type="button" onClick={() => go(k)} aria-label={t('Slide {n}', { n: k + 1 })} aria-current={k === i ? 'true' : undefined} className="grid size-6 place-items-center">
                  <span className={'block h-2 rounded-full transition-all motion-reduce:transition-none ' + (k === i ? 'w-6 ' + (dark ? 'bg-white' : 'bg-ink') : 'w-2 ' + (dark ? 'bg-white/40' : 'bg-ink/25'))} />
                </button>
              </li>
            ))}
          </ol>
          {seconds > 0 && (
            <button type="button" onClick={() => setPlaying(!playing)} aria-label={playing ? t('Pause slideshow') : t('Play slideshow')} className="ml-auto grid size-10 place-items-center rounded-full">
              {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function SlideButton({ href, label }: { href: string; label: string }) {
  return (
    <SiteLink href={href} className="mt-5 inline-flex min-h-13 items-center gap-2 rounded-2xl bg-yellow px-6 font-bold text-ink">
      <Ticket size={18} aria-hidden="true" />
      {label}
    </SiteLink>
  )
}
