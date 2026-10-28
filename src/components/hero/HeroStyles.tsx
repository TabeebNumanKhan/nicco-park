'use client'

import { ArrowRight, Snowflake, Ticket } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Media } from '@/content/types'
import { useLang } from '@/i18n/LangProvider'
import { staticAsset } from '@/lib/static-path'
import { Img } from '../ui/Img'
import { SiteLink } from '../ui/SiteLink'
import { Controls, Ctas, Eyebrow, Headline, PriceSticker, type Slide, TONE, useCarousel } from './shared'

/* Every style keeps all slides in the HTML (crawlers, no-JS visitors can swipe). */

const track = 'flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

/** Style "Split": a solid colour panel with the words, the photo beside it. Bold and very readable. */
export function HeroSplit({ slides, autoplayMs }: { slides: Slide[]; autoplayMs: number }) {
  const { t } = useLang()
  const c = useCarousel(slides.length, autoplayMs, true)
  return (
    <section aria-roledescription="carousel" aria-label={t('Highlights at Nicco Park')} className="relative bg-ink text-white" {...c.holdProps}>
      <div ref={c.track} className={track}>
        {slides.map((s, i) => (
          <article key={s.id} aria-roledescription="slide" aria-label={`${i + 1} / ${slides.length}`} aria-hidden={i !== c.index} className="grid w-full flex-none snap-start md:grid-cols-2 lg:min-h-[600px]">
            <div className={`relative order-last flex flex-col justify-center px-4 pt-8 pb-20 md:order-first md:px-10 md:pt-24 md:pb-32 lg:px-16 ${TONE[s.tone].panel}`}>
              <div aria-hidden="true" className="dots pointer-events-none absolute inset-0 text-white/10" />
              <div className="relative max-w-[560px]">
                <Eyebrow slide={s} className={TONE[s.tone].text} />
                <Headline slide={s} slides={slides} i={i} size="md" />
                {s.body && <p className="mt-3 max-w-[520px] text-[16px] leading-relaxed text-white/90 md:mt-4 md:text-lg">{t(s.body)}</p>}
                <Ctas slide={s} active={i === c.index} />
              </div>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden bg-ink md:aspect-auto">
              {s.image ? (
                <>
                  <div aria-hidden="true" className="absolute inset-0 scale-110 opacity-60 blur-2xl">
                    <Img media={s.image} fill sizes="30vw" alt="" />
                  </div>
                  <div className="absolute inset-4 overflow-hidden rounded-[22px] md:inset-auto md:top-1/2 md:right-8 md:left-8 md:aspect-[4/3] md:-translate-y-1/2">
                    <Img media={s.image} fill priority={i === 0} sizes="(min-width: 768px) 46vw, 92vw" />
                  </div>
                </>
              ) : (
                <div aria-hidden="true" className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_70%_30%,#CFE3FF_0,#6F9BFF_45%,#2F5DCC_100%)]">
                  <Snowflake strokeWidth={0.8} className="size-36 text-white/80" />
                </div>
              )}
              <PriceSticker price={s.price} className="absolute right-6 bottom-6 md:right-14 md:bottom-28" />
            </div>
          </article>
        ))}
      </div>
      <div className="wrap pointer-events-none absolute inset-x-0 top-0 pt-4 md:pt-6">
        <div className="pointer-events-auto">
          <Controls slides={slides} c={c} autoplayMs={autoplayMs} />
        </div>
      </div>
    </section>
  )
}

/** Style "Cards": a headline and a swipeable row of offer cards. Several things on screen at once. */
export function HeroCards({ slides, autoplayMs }: { slides: Slide[]; autoplayMs: number }) {
  const { t } = useLang()
  const c = useCarousel(slides.length, autoplayMs, true)
  const lead = slides.find((s) => s.brand) ?? slides[0]
  const cards = slides.filter((s) => s !== lead || !lead.brand)
  return (
    <section aria-label={t('Highlights at Nicco Park')} className="relative overflow-hidden bg-cream pb-20 md:pb-32" {...c.holdProps}>
      <div aria-hidden="true" className="dots pointer-events-none absolute inset-0 text-ink/8" />
      <div className="wrap relative pt-10 md:pt-16">
        <div className="mb-6 grid items-end gap-4 md:mb-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Eyebrow slide={lead} className="text-coral-ink" />
            <Headline slide={lead} slides={slides} i={slides.indexOf(lead)} size="md" />
            {lead.body && <p className="mt-3 max-w-[560px] text-lg text-ink-2">{t(lead.body)}</p>}
          </div>
          <div className="md:pb-2">
            <Controls slides={cards} c={c} autoplayMs={autoplayMs} dark={false} />
          </div>
        </div>
        <div ref={c.track} className={`${track} -mx-4 gap-3 px-4 md:mx-0 md:gap-5 md:px-0`}>
          {cards.map((s, i) => (
            <article key={s.id} className="flex w-[84%] flex-none snap-start flex-col overflow-hidden rounded-[24px] border-2 border-ink bg-white sm:w-[60%] lg:w-[calc((100%-40px)/3)]">
              <div className={`relative aspect-[16/10] flex-none ${TONE[s.tone].bg}`}>
                {s.image ? (
                  <Img media={s.image} fill priority={i < 3} sizes="(min-width: 1024px) 420px, 84vw" />
                ) : (
                  <div aria-hidden="true" className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_70%_30%,#CFE3FF_0,#6F9BFF_45%,#2F5DCC_100%)]">
                    <Snowflake strokeWidth={0.8} className="size-24 text-white/80" />
                  </div>
                )}
                {s.badge && <span className={`absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-xs font-bold ${TONE[s.tone].chip}`}>{t(s.badge)}</span>}
                <PriceSticker price={s.price} className="absolute top-3 right-3 size-20! text-[12px]!" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                {s.eyebrow && <p className="eyebrow text-muted">{t(s.eyebrow)}</p>}
                <h2 className="mt-1 text-[26px] leading-tight font-bold">{t(s.title)}</h2>
                {s.body && <p className="mt-2 line-clamp-3 leading-snug text-muted">{t(s.body)}</p>}
                <div className="mt-auto pt-4">
                  <SiteLink href={s.cta.href} className="flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-yellow px-4 font-bold text-ink hover:brightness-95">
                    <Ticket size={18} aria-hidden="true" />
                    {t(s.cta.label)}
                  </SiteLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Style "Photo mosaic": one message and a collage of small, sharp park photos. No sliding. */
export function HeroMosaic({ slides, mosaic }: { slides: Slide[]; mosaic: Media[] }) {
  const { t } = useLang()
  const lead = slides.find((s) => s.brand) ?? slides[0]
  const others = slides.filter((s) => s !== lead)
  const tiles = (mosaic.length ? mosaic : slides.flatMap((s) => (s.image ? [s.image] : []))).slice(0, 5)
  const shapes = ['col-span-2 row-span-2', '', '', 'col-span-2', '']
  const rot = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-1']
  return (
    <section aria-label={t('Highlights at Nicco Park')} className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="dots pointer-events-none absolute inset-0 text-white/10" />
      <div className="wrap relative grid items-center gap-8 pt-10 pb-24 md:grid-cols-[1fr_1.05fr] md:pt-20 md:pb-36">
        <div>
          <Eyebrow slide={lead} />
          <Headline slide={lead} slides={slides} i={slides.indexOf(lead)} />
          {lead.body && <p className="mt-4 max-w-[520px] text-lg text-white/90">{t(lead.body)}</p>}
          <Ctas slide={lead} />
          {others.length > 0 && (
            <ul className="mt-7 flex flex-wrap gap-2">
              {others.map((s) => (
                <li key={s.id}>
                  <SiteLink href={s.cta.href} className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-3.5 text-sm font-bold ${TONE[s.tone].chip}`}>
                    {t(s.tab)} <ArrowRight size={14} aria-hidden="true" />
                  </SiteLink>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative grid auto-rows-[110px] grid-cols-3 gap-2.5 sm:auto-rows-[140px] md:gap-3 lg:auto-rows-[160px]">
          {tiles.map((m, i) => (
            <div key={m.url + i} className={`relative overflow-hidden rounded-[18px] border-[3px] border-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.7)] ${shapes[i]} ${rot[i]} motion-reduce:rotate-0`}>
              <Img media={m} fill priority={i === 0} sizes="(min-width: 768px) 320px, 45vw" />
            </div>
          ))}
          <PriceSticker price={lead.price ?? others.find((s) => s.price)?.price} className="absolute right-1 -bottom-8 md:-right-2" />
        </div>
      </div>
    </section>
  )
}

/** Style "Booking first": the headline and a deal card that changes; the date picker sits right under it. */
export function HeroTicket({ slides, autoplayMs }: { slides: Slide[]; autoplayMs: number }) {
  const { t } = useLang()
  const lead = slides.find((s) => s.brand) ?? slides[0]
  const deals = slides.filter((s) => s !== lead)
  const c = useCarousel(deals.length, autoplayMs, true)
  return (
    <section aria-label={t('Highlights at Nicco Park')} className="relative overflow-hidden bg-yellow text-ink" {...c.holdProps}>
      <div aria-hidden="true" className="dots pointer-events-none absolute inset-0 text-ink/10" />
      <div className="wrap relative grid items-center gap-8 pt-10 pb-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:pt-16 md:pb-14">
        <div>
          <Eyebrow slide={lead} className="text-ink" />
          <Headline slide={lead} slides={slides} i={slides.indexOf(lead)} size="md" />
          {lead.body && <p className="mt-4 max-w-[520px] text-lg text-ink-2">{t(lead.body)}</p>}
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-yellow">
            <Ticket size={16} aria-hidden="true" /> {t('Pick your date below. QR on WhatsApp in seconds.')}
          </p>
        </div>
        {deals.length > 0 && (
          <div className="relative min-w-0">
            <div ref={c.track} className={`${track} rounded-[26px] border-2 border-ink bg-white shadow-[8px_8px_0_0_var(--ink)]`}>
              {deals.map((s, i) => (
                <article key={s.id} aria-hidden={i !== c.index} className="grid w-full flex-none snap-start grid-cols-[1fr_auto]">
                  <div className="flex min-w-0 flex-col p-5 md:p-6">
                    {s.badge && <span className={`mb-2 self-start rounded-full px-2.5 py-1 text-xs font-bold ${TONE[s.tone].chip}`}>{t(s.badge)}</span>}
                    <h2 className="text-[26px] leading-tight font-bold md:text-[30px]">{t(s.title)}</h2>
                    {s.price && <p className="display mt-2 text-[28px] text-coral-ink md:text-[34px]">{t(s.price)}</p>}
                    <SiteLink href={s.cta.href} tabIndex={i === c.index ? undefined : -1} className="mt-4 inline-flex min-h-12 items-center gap-2 self-start rounded-2xl bg-ink px-5 font-bold text-white">
                      {t(s.cta.label)} <ArrowRight size={16} aria-hidden="true" />
                    </SiteLink>
                  </div>
                  <div className={`relative w-[38vw] max-w-[220px] border-l-2 border-dashed border-ink ${TONE[s.tone].bg}`}>
                    {s.image && <Img media={s.image} fill sizes="220px" />}
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-4">
              <Controls slides={deals} c={c} autoplayMs={autoplayMs} dark={false} arrows={false} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/** Style "Full-screen photo": edge-to-edge picture with the words over it. Only for large, sharp photos. */
export function HeroFullbleed({ slides, autoplayMs }: { slides: Slide[]; autoplayMs: number }) {
  const { t } = useLang()
  const c = useCarousel(slides.length, autoplayMs, true)
  return (
    <section aria-roledescription="carousel" aria-label={t('Highlights at Nicco Park')} className="relative bg-ink text-white" {...c.holdProps}>
      <div ref={c.track} className={track}>
        {slides.map((s, i) => (
          <article key={s.id} aria-roledescription="slide" aria-label={`${i + 1} / ${slides.length}`} aria-hidden={i !== c.index} className={`relative flex min-h-[560px] w-full flex-none snap-start items-end overflow-hidden md:min-h-[78vh] ${TONE[s.tone].bg}`}>
            {s.image && <Img media={s.image} fill priority={i === 0} sizes="100vw" />}
            <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-t ${TONE[s.tone].wash} to-transparent`} />
            <div className="wrap relative w-full pt-24 pb-24 md:pb-36">
              <div className="max-w-[720px]">
                <Eyebrow slide={s} />
                <Headline slide={s} slides={slides} i={i} />
                {s.body && <p className="mt-3 max-w-[560px] text-lg text-white/90">{t(s.body)}</p>}
                <Ctas slide={s} active={i === c.index} />
              </div>
            </div>
            <PriceSticker price={s.price} className="absolute top-20 right-4 max-md:hidden md:top-24 md:right-10" />
          </article>
        ))}
      </div>
      <div className="wrap pointer-events-none absolute inset-x-0 top-0 pt-4 md:pt-6">
        <div className="pointer-events-auto">
          <Controls slides={slides} c={c} autoplayMs={autoplayMs} />
        </div>
      </div>
    </section>
  )
}

/** Style "Video background": a silent looping clip behind the words. Falls back to a slow photo pan. */
export function HeroVideo({ slides, autoplayMs, video }: { slides: Slide[]; autoplayMs: number; video?: string }) {
  const { t } = useLang()
  const c = useCarousel(slides.length, autoplayMs, true)
  const [motion, setMotion] = useState(true)
  useEffect(() => setMotion(!window.matchMedia('(prefers-reduced-motion: reduce)').matches), [])
  const poster = slides.find((s) => s.image)?.image
  return (
    <section aria-roledescription="carousel" aria-label={t('Highlights at Nicco Park')} className="relative overflow-hidden bg-ink text-white" {...c.holdProps}>
      <div aria-hidden="true" className="absolute inset-0">
        {video && motion ? (
          <video className="h-full w-full object-cover" src={staticAsset(video)} poster={poster ? staticAsset(poster.url) : undefined} autoPlay muted loop playsInline />
        ) : poster ? (
          <div className="hero-pan absolute inset-0 scale-110 blur-[2px]">
            <Img media={poster} fill sizes="60vw" alt="" />
          </div>
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
      </div>
      <div ref={c.track} className={`${track} relative`}>
        {slides.map((s, i) => (
          <article key={s.id} aria-roledescription="slide" aria-label={`${i + 1} / ${slides.length}`} aria-hidden={i !== c.index} className="w-full flex-none snap-start">
            <div className="wrap flex min-h-[560px] items-center pt-20 pb-24 md:min-h-[680px] md:pb-36">
              <div className="max-w-[680px]">
                <Eyebrow slide={s} />
                <Headline slide={s} slides={slides} i={i} />
                {s.body && <p className="mt-3 max-w-[560px] text-lg text-white/90">{t(s.body)}</p>}
                <Ctas slide={s} active={i === c.index} />
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="wrap pointer-events-none absolute inset-x-0 top-0 pt-4 md:pt-6">
        <div className="pointer-events-auto">
          <Controls slides={slides} c={c} autoplayMs={autoplayMs} />
        </div>
      </div>
    </section>
  )
}
