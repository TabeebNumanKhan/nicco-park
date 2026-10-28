import { CalendarDays, Clock, Tag, Ticket } from 'lucide-react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { ShareButtons } from '@/components/ui/ShareButtons'
import type { LayoutBlock } from '@/blocks/types'
import type { Media } from '@/content/types'
import type { Lang } from '@/i18n/config'
import { dateYearL } from '@/i18n/translate'
import { getT } from '@/lib/cms'
import { section } from '@/blocks/tone'
import { Img } from '../ui/Img'
import { SiteLink } from '../ui/SiteLink'
import { LandingTracker } from './LandingTracker'

export type LandingVariant = {
  key: string
  headline: string
  subhead?: string
  image?: Media
  tone?: string
  ctaLabel?: string
  ctaHref?: string
}

/**
 * A campaign landing page (an offer or an event): one focused banner in the
 * variant this visitor was given, the deal, the small print, then the
 * sections chosen in the CMS. Ads link straight here.
 */
export async function Landing({
  lang,
  campaign,
  variant,
  variantCount,
  kicker,
  deal,
  terms,
  when,
  validTo,
  promoCode,
  cta,
  blocks,
  fallback,
}: {
  lang: Lang
  campaign: string
  variant: LandingVariant
  variantCount: number
  kicker?: string
  deal?: string
  terms?: string
  when?: string
  validTo?: string
  promoCode?: string
  cta: { label: string; href: string }
  blocks?: LayoutBlock[] | null
  fallback: LayoutBlock[]
}) {
  const t = await getT(lang)
  const tone = section(variant.tone, 'coral')
  const href = variant.ctaHref || cta.href
  const label = variant.ctaLabel || cta.label
  const ends = validTo ? new Date(validTo) : null
  return (
    <div id="landing" data-campaign={campaign} data-variant={variant.key}>
      <LandingTracker campaign={campaign} variant={variant.key} promoCode={promoCode} tested={variantCount > 1} />
      <section aria-labelledby="lp-h" className={`relative overflow-hidden ${tone.bg}`}>
        {variant.image && (
          <div aria-hidden="true" className="absolute inset-0 scale-110 opacity-30 blur-2xl">
            <Img media={variant.image} fill sizes="40vw" alt="" />
          </div>
        )}
        {tone.dots && <div aria-hidden="true" className={`dots pointer-events-none absolute inset-0 ${tone.dots}`} />}
        <div className="wrap relative grid items-center gap-8 py-10 md:grid-cols-[1.1fr_0.9fr] md:py-16">
          <div>
            {kicker && <p className={`eyebrow ${tone.eyebrow}`}>{t(kicker)}</p>}
            <h1 id="lp-h" className="display mt-2 text-[clamp(44px,9vw,104px)] leading-[0.88] [font-stretch:80%]">
              {t(variant.headline)}
            </h1>
            {variant.subhead && <p className={`mt-4 max-w-[560px] text-lg leading-relaxed md:text-xl ${tone.muted}`}>{t(variant.subhead)}</p>}
            <div className="mt-5 flex flex-wrap gap-2">
              {when && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 text-sm font-bold text-ink">
                  <CalendarDays size={15} aria-hidden="true" /> {t(when)}
                </span>
              )}
              {ends && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 text-sm font-bold text-ink">
                  <Clock size={15} aria-hidden="true" /> {t('Ends {date}', { date: dateYearL(lang, ends) })}
                </span>
              )}
              {promoCode && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-sm font-bold text-yellow">
                  <Tag size={15} aria-hidden="true" /> {t('Offer code: {code}', { code: promoCode })}
                </span>
              )}
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <SiteLink
                href={href}
                data-track="cta"
                className="inline-flex min-h-15 items-center gap-2.5 rounded-2xl bg-yellow px-7 text-lg font-bold text-ink shadow-[6px_6px_0_0_var(--ink)] transition hover:-translate-y-0.5 motion-reduce:transform-none"
              >
                <Ticket size={20} aria-hidden="true" />
                {t(label)}
              </SiteLink>
            </div>
            <ShareButtons title={t(variant.headline)} dark={tone.dark} className="mt-6" />
          </div>
          <div className="relative">
            {variant.image && (
              <div className="relative mx-auto aspect-[16/10] w-full max-w-[560px] overflow-hidden rounded-[26px] border-4 border-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] md:rotate-2">
                <Img media={variant.image} fill priority sizes="(min-width: 768px) 560px, 92vw" />
              </div>
            )}
            {deal && (
              <p className="absolute -bottom-5 left-2 max-w-[70%] -rotate-3 rounded-2xl border-2 border-ink bg-yellow px-4 py-3 text-lg leading-tight font-extrabold text-ink shadow-lg md:-left-4 md:text-xl">
                {t(deal)}
              </p>
            )}
          </div>
        </div>
        {terms && terms !== variant.subhead && (
          <div className="relative border-t border-current/15">
            <p className={`wrap py-4 text-sm ${tone.muted}`}>
              <strong>{t('The small print')}:</strong> {t(terms)}
            </p>
          </div>
        )}
      </section>
      <RenderBlocks blocks={blocks?.length ? blocks : fallback} lang={lang} source={campaign} field={blocks?.length ? 'landing.layout' : 'fallback'} />
    </div>
  )
}
