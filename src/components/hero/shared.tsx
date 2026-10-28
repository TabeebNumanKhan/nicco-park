'use client'

import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Ticket } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Media } from '@/content/types'
import { useLang } from '@/i18n/LangProvider'
import { SiteLink } from '../ui/SiteLink'

/** One banner slide, as edited in the CMS (Home page → Hero banner → Slides). */
export type Slide = {
  id: string
  tab: string
  eyebrow?: string
  title: string
  body?: string
  image?: Media
  tone: 'ink' | 'dry' | 'wet' | 'bowl' | 'snow' | 'alert'
  badge?: string
  price?: string
  cta: { label: string; href: string }
  secondary?: { label: string; href: string }
  /** Use the "Ride. Splash. Strike." headline. */
  brand?: boolean
}

export const TONE: Record<Slide['tone'], { chip: string; wash: string; bar: string; bg: string; panel: string; text: string }> = {
  ink: { chip: 'bg-yellow text-ink', wash: 'from-ink via-ink/60', bar: 'bg-yellow', bg: 'bg-ink', panel: 'bg-ink text-white', text: 'text-yellow' },
  dry: { chip: 'bg-dry text-white', wash: 'from-[#06331A] via-[#06331A]/60', bar: 'bg-[#2BD17E]', bg: 'bg-dry-ink', panel: 'bg-dry text-white', text: 'text-[#BFF0D2]' },
  wet: { chip: 'bg-sea text-white', wash: 'from-[#032a52] via-[#032a52]/55', bar: 'bg-[#3FA2FF]', bg: 'bg-wet-ink', panel: 'bg-wet text-white', text: 'text-[#CDE6FF]' },
  bowl: { chip: 'bg-bowl text-white', wash: 'from-[#22094a] via-[#22094a]/55', bar: 'bg-[#B78BFF]', bg: 'bg-bowl-ink', panel: 'bg-bowl text-white', text: 'text-[#E2D3FF]' },
  snow: { chip: 'bg-white text-snow-ink', wash: 'from-[#0d2a6b] via-[#0d2a6b]/40', bar: 'bg-[#9CC4FF]', bg: 'bg-snow', panel: 'bg-snow text-white', text: 'text-snow-soft' },
  alert: { chip: 'bg-coral text-white', wash: 'from-[#4a1208] via-[#4a1208]/55', bar: 'bg-coral', bg: 'bg-coral', panel: 'bg-coral text-white', text: 'text-[#FFF0A0]' },
}

/**
 * Carousel state shared by every banner style: which slide is showing,
 * autoplay (off for reduced motion, paused on hover and focus) and a pause
 * button. `scroller` styles move a scroll-snap track so phones can swipe.
 */
export function useCarousel(count: number, autoplayMs: number, scroller = false) {
  const track = useRef<HTMLDivElement>(null)
  const [index, setIndexState] = useState(0)
  const [playing, setPlaying] = useState(autoplayMs > 0)
  const [hold, setHold] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false)
  }, [])

  const go = useCallback(
    (i: number) => {
      const n = (i + count) % count
      const el = track.current
      if (scroller && el) {
        const child = el.children[n] as HTMLElement | undefined
        el.scrollTo({ left: child ? child.offsetLeft - el.offsetLeft : n * el.clientWidth, behavior: 'smooth' })
      } else setIndexState(n)
    },
    [count, scroller],
  )

  useEffect(() => {
    const el = track.current
    if (!scroller || !el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const kids = Array.from(el.children) as HTMLElement[]
        let best = 0
        kids.forEach((k, i) => {
          if (Math.abs(k.offsetLeft - el.offsetLeft - el.scrollLeft) < Math.abs(kids[best].offsetLeft - el.offsetLeft - el.scrollLeft)) best = i
        })
        setIndexState(best)
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [scroller])

  const running = playing && !hold && count > 1
  useEffect(() => {
    if (!running) return
    const id = window.setTimeout(() => go(index + 1), autoplayMs)
    return () => window.clearTimeout(id)
  }, [index, running, go, autoplayMs])

  const holdProps = {
    onMouseEnter: () => setHold(true),
    onMouseLeave: () => setHold(false),
    onFocus: () => setHold(true),
    onBlur: () => setHold(false),
  }
  return { track, index, go, playing, setPlaying, running, holdProps }
}

/** Story-style progress tabs + pause/prev/next. */
export function Controls({
  slides,
  c,
  autoplayMs,
  dark = true,
  arrows = true,
}: {
  slides: Slide[]
  c: ReturnType<typeof useCarousel>
  autoplayMs: number
  dark?: boolean
  arrows?: boolean
}) {
  const { t } = useLang()
  if (slides.length < 2) return null
  const btn = dark ? 'bg-white/15 backdrop-blur hover:bg-white/25 text-white' : 'bg-ink/8 hover:bg-ink/15 text-ink'
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <div role="group" aria-label={t('Choose a slide')} className="flex min-w-0 flex-1 gap-1.5 md:gap-2">
        {slides.map((s, i) => {
          const on = i === c.index
          return (
            <button key={s.id} type="button" aria-label={`${i + 1}: ${t(s.tab)}`} aria-current={on} onClick={() => c.go(i)} className="group min-w-0 flex-1 py-2 text-left">
              <span className={'relative block h-1 overflow-hidden rounded-full ' + (dark ? 'bg-white/30' : 'bg-ink/15')}>
                <span
                  key={on ? `on-${c.index}-${c.running}` : 'off'}
                  className={`absolute inset-y-0 left-0 rounded-full ${dark ? TONE[s.tone].bar : 'bg-ink'} ${on ? (c.running ? 'hero-progress' : 'w-full') : i < c.index ? 'w-full opacity-60' : 'w-0'}`}
                  style={on && c.running ? { animationDuration: `${autoplayMs}ms` } : undefined}
                />
              </span>
              <span className={'mt-2 hidden truncate text-[13px] font-semibold lg:block ' + (dark ? (on ? 'text-white' : 'text-white/60 group-hover:text-white') : on ? 'text-ink' : 'text-muted group-hover:text-ink')}>
                {t(s.tab)}
              </span>
            </button>
          )
        })}
      </div>
      <div className="flex flex-none gap-1.5">
        {autoplayMs > 0 && (
          <button type="button" onClick={() => c.setPlaying((p) => !p)} aria-label={c.playing ? t('Pause slides') : t('Play slides')} className={`grid size-10 place-items-center rounded-full ${btn}`}>
            {c.playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
        )}
        {arrows && (
          <>
            <button type="button" onClick={() => c.go(c.index - 1)} aria-label={t('Previous slide')} className={`hidden size-10 place-items-center rounded-full md:grid ${btn}`}>
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={() => c.go(c.index + 1)} aria-label={t('Next slide')} className={`hidden size-10 place-items-center rounded-full md:grid ${btn}`}>
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

const BRAND: [string, string][] = [
  ['Ride.', 'bg-[#2BD17E]'],
  ['Splash.', 'bg-[#3FA2FF]'],
  ['Strike.', 'bg-[#B78BFF]'],
]

/**
 * The slide headline. The page's one h1 is the brand slide, or the first
 * slide when no slide is marked as the brand headline.
 */
export function Headline({ slide, slides, i, size = 'lg', className = '' }: { slide: Slide; slides: Slide[]; i: number; size?: 'lg' | 'md'; className?: string }) {
  const { lang, t } = useLang()
  const isH1 = slide.brand || (i === 0 && !slides.some((s) => s.brand))
  // Bengali and Hindi words are longer than "Ride." — a smaller size keeps each on one line.
  const latin = lang === 'en'
  if (slide.brand) {
    const sz =
      size === 'lg'
        ? latin
          ? 'text-[clamp(44px,12vw,120px)]'
          : 'text-[clamp(38px,9.5vw,92px)]'
        : latin
          ? 'text-[clamp(40px,9vw,88px)]'
          : 'text-[clamp(34px,7.5vw,72px)]'
    return (
      <h1 className={`display leading-[0.9] font-extrabold tracking-[-0.03em] [font-stretch:78%] ${sz} ${className}`}>
        {BRAND.map(([w, c]) => (
          <span key={w} className="flex items-center gap-3 md:gap-4">
            <span className="whitespace-nowrap">{t(w)}</span>
            <span aria-hidden="true" className={`size-3.5 flex-none rounded-full md:size-5 ${c}`} />
          </span>
        ))}
      </h1>
    )
  }
  const Tag = isH1 ? 'h1' : 'h2'
  return <Tag className={`display leading-[0.92] [overflow-wrap:anywhere] ${size === 'lg' ? 'text-[clamp(38px,8vw,88px)]' : 'text-[clamp(34px,6vw,64px)]'} ${className}`}>{t(slide.title)}</Tag>
}

export function Ctas({ slide, active = true, light = false }: { slide: Slide; active?: boolean; light?: boolean }) {
  const { t } = useLang()
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
      <SiteLink
        href={slide.cta.href}
        tabIndex={active ? undefined : -1}
        className="inline-flex min-h-14 items-center gap-2.5 rounded-2xl bg-yellow px-6 text-[17px] font-bold text-ink shadow-[0_10px_30px_-10px_rgba(255,212,0,0.7)] transition hover:-translate-y-0.5 hover:brightness-95 motion-reduce:transform-none"
      >
        <Ticket size={20} aria-hidden="true" />
        {t(slide.cta.label)}
      </SiteLink>
      {slide.secondary && (
        <SiteLink
          href={slide.secondary.href}
          tabIndex={active ? undefined : -1}
          className={'inline-flex min-h-11 items-center gap-1.5 font-bold underline-offset-4 hover:underline ' + (light ? 'text-ink' : 'text-white')}
        >
          {t(slide.secondary.label)}
          <ArrowRight size={18} aria-hidden="true" />
        </SiteLink>
      )}
    </div>
  )
}

export function PriceSticker({ price, className = '' }: { price?: string; className?: string }) {
  const { t } = useLang()
  if (!price) return null
  return (
    <span
      className={`grid size-20 -rotate-6 place-items-center rounded-full border-2 border-ink bg-yellow p-2 text-center text-[12px] leading-tight font-extrabold text-ink shadow-lg md:size-28 md:text-[15px] ${className}`}
    >
      {t(price)}
    </span>
  )
}

export function Eyebrow({ slide, className = 'text-yellow' }: { slide: Slide; className?: string }) {
  const { t } = useLang()
  if (!slide.eyebrow && !slide.badge) return null
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2 md:mb-4">
      {slide.eyebrow && <span className={`eyebrow ${className}`}>{t(slide.eyebrow)}</span>}
      {slide.badge && <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${TONE[slide.tone].chip}`}>{t(slide.badge)}</span>}
    </div>
  )
}
