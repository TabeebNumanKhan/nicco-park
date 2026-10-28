'use client'

import { Snowflake } from 'lucide-react'
import { useLang } from '@/i18n/LangProvider'
import { Img } from '../ui/Img'
import { Controls, Ctas, Eyebrow, Headline, PriceSticker, type Slide, TONE, useCarousel } from './shared'

/**
 * Style "Framed photo on colour" (the default). Each slide is a colour band
 * with the park photo shown close to its real size in a tilted frame, and the
 * same photo blurred behind as a colour wash, so small photos never look
 * pixelated. Swipe on phones; controls sit at the top, clear of the booking box.
 */
export function HeroFramed({ slides, autoplayMs }: { slides: Slide[]; autoplayMs: number }) {
  const { t } = useLang()
  const c = useCarousel(slides.length, autoplayMs, true)
  return (
    <section aria-roledescription="carousel" aria-label={t('Highlights at Nicco Park')} className="relative bg-ink text-white" {...c.holdProps}>
      <div ref={c.track} className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {slides.map((s, i) => {
          const tone = TONE[s.tone]
          return (
            <article
              key={s.id}
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${slides.length}`}
              aria-hidden={i !== c.index}
              className={`relative w-full flex-none snap-start overflow-hidden ${tone.bg}`}
            >
              {s.image && (
                <div aria-hidden="true" className="absolute inset-0 scale-110 opacity-45 blur-2xl">
                  <Img media={s.image} fill sizes="40vw" alt="" />
                </div>
              )}
              <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-br ${tone.wash} to-transparent`} />
              <div aria-hidden="true" className="dots pointer-events-none absolute inset-0 text-white/10" />
              <div className="wrap relative grid items-center gap-5 pt-16 pb-20 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-10 md:pt-28 md:pb-36 lg:min-h-[640px]">
                <div className="relative order-first md:order-last">
                  {s.image ? (
                    <div className="relative mx-auto aspect-[2/1] w-full max-w-[560px] overflow-hidden rounded-[22px] border-4 border-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] md:aspect-[16/10] md:rotate-2 md:rounded-[28px]">
                      <Img media={s.image} fill priority={i === 0} sizes="(min-width: 768px) 560px, 92vw" />
                    </div>
                  ) : (
                    <div
                      aria-hidden="true"
                      className="relative mx-auto grid aspect-[2/1] w-full max-w-[560px] place-items-center overflow-hidden rounded-[22px] border-4 border-white bg-[radial-gradient(circle_at_70%_30%,#CFE3FF_0,#6F9BFF_45%,#2F5DCC_100%)] md:aspect-[16/10] md:rotate-2 md:rounded-[28px]"
                    >
                      <Snowflake strokeWidth={0.8} className="size-32 text-white/80 md:size-48" />
                    </div>
                  )}
                  <PriceSticker price={s.price} className="absolute -top-4 right-3 md:top-auto md:-right-3 md:-bottom-6" />
                </div>
                <div className="max-w-[640px]">
                  <Eyebrow slide={s} />
                  <Headline slide={s} slides={slides} i={i} />
                  {s.body && <p className="mt-3 line-clamp-3 max-w-[560px] text-[16px] leading-relaxed text-white/90 md:mt-4 md:line-clamp-none md:text-xl">{t(s.body)}</p>}
                  <Ctas slide={s} active={i === c.index} />
                </div>
              </div>
            </article>
          )
        })}
      </div>
      <div className="wrap pointer-events-none absolute inset-x-0 top-0 pt-4 md:pt-6">
        <div className="pointer-events-auto">
          <Controls slides={slides} c={c} autoplayMs={autoplayMs} />
        </div>
      </div>
    </section>
  )
}
