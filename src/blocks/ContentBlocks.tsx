/**
 * General-purpose sections for building any page: call-to-action band, text,
 * image + text, FAQs, offers grid, countdown, gallery and sign-up form.
 */
import { RichText } from '@payloadcms/richtext-lexical/react'
import { CalendarDays, ChevronDown, Ticket } from 'lucide-react'
import { Countdown } from '@/components/cms/Countdown'
import { LeadForm } from '@/components/cms/LeadForm'
import { VideoPlayer } from '@/components/cms/VideoPlayer'
import { OfferList } from '@/components/offers/OfferBoard'
import { Img } from '@/components/ui/Img'
import { SiteLink } from '@/components/ui/SiteLink'
import type { Lang } from '@/i18n/config'
import type { T } from '@/i18n/translate'
import { getFaqs, getOffers, toMedia } from '@/lib/cms'
import { jsonLd } from '@/lib/seo'
import { pick } from './SiteBlocks'
import { section } from './tone'
import type { BlockOf } from './types'

const Dots = ({ cls }: { cls?: string }) => (cls ? <div aria-hidden="true" className={`dots pointer-events-none absolute inset-0 ${cls}`} /> : null)

export function CtaBandSection({ block, t, id }: { block: BlockOf<'ctaBand'>; t: T; id: string }) {
  const tone = section(block.tone, 'coral')
  return (
    <section aria-labelledby={id} className={`relative overflow-hidden ${tone.bg}`}>
      <Dots cls={tone.dots} />
      <div className="wrap relative grid items-center gap-6 py-12 md:grid-cols-[1.4fr_1fr] md:py-16">
        <div>
          <h2 id={id} className="display text-[clamp(40px,8vw,84px)] leading-[0.9]">
            {t(block.heading)}
          </h2>
          {block.body && <p className={`mt-3 max-w-[520px] text-lg ${tone.muted}`}>{t(block.body)}</p>}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
          <SiteLink href={block.primary.href} className="inline-flex min-h-15 flex-1 items-center justify-center gap-2.5 rounded-2xl bg-yellow px-7 text-lg font-bold text-ink shadow-[6px_6px_0_0_var(--ink)]">
            <Ticket size={20} aria-hidden="true" />
            {t(block.primary.label)}
          </SiteLink>
          {block.secondary?.label && block.secondary.href && (
            <SiteLink
              href={block.secondary.href}
              className={'inline-flex min-h-15 flex-1 items-center justify-center gap-2 rounded-2xl border-2 px-6 font-bold ' + (tone.dark ? 'border-white hover:bg-white hover:text-ink' : 'border-ink hover:bg-ink hover:text-white')}
            >
              <CalendarDays size={20} aria-hidden="true" />
              {t(block.secondary.label)}
            </SiteLink>
          )}
        </div>
      </div>
    </section>
  )
}

export function RichTextSection({ block }: { block: BlockOf<'richText'> }) {
  if (!block.content) return null
  const tone = section(block.tone, 'white')
  return (
    <section className={tone.bg}>
      <div className={'wrap py-10 md:py-14 ' + (block.width === 'wide' ? '' : 'max-w-[760px]')}>
        <div className="prose-np">
          <RichText data={block.content} />
        </div>
      </div>
    </section>
  )
}

export function ImageTextSection({ block, t, id }: { block: BlockOf<'imageText'>; t: T; id: string }) {
  const tone = section(block.tone, 'white')
  const img = toMedia(block.image)
  const kind = block.media ?? 'image'
  const fill = block.imageStyle === 'fill'
  const left = block.imageSide === 'left'
  // Half and half by default; 60/40 either way on computers. Phones always stack: photo first.
  const cols = { '50': 'md:grid-cols-2', '40': left ? 'md:grid-cols-[2fr_3fr]' : 'md:grid-cols-[3fr_2fr]', '60': left ? 'md:grid-cols-[3fr_2fr]' : 'md:grid-cols-[2fr_3fr]' }[block.split ?? '50'] ?? 'md:grid-cols-2'
  const frame = block.imageStyle === 'rounded' ? 'rounded-[24px]' : fill ? 'md:rounded-none rounded-[20px]' : 'rounded-[24px] border-4 border-white shadow-[0_24px_50px_-24px_rgba(0,0,0,0.5)]'
  const media =
    kind === 'image' ? (
      img ? (
        <Img media={img} fill sizes="(min-width: 768px) 50vw, 92vw" />
      ) : null
    ) : (
      <VideoPlayer source={kind === 'video' ? 'upload' : /vimeo/.test(block.videoUrl ?? '') ? 'vimeo' : 'youtube'} file={toMedia(block.video)?.url} url={block.videoUrl} poster={img} title={block.heading ? t(block.heading) : t('Video')} autoplay={!!block.autoplay} />
    )
  return (
    <section aria-labelledby={block.heading ? id : undefined} className={`relative overflow-hidden ${tone.bg}`}>
      <Dots cls={tone.dots} />
      <div className={`relative grid items-center gap-6 md:gap-10 ${cols} ` + (fill ? 'md:min-h-[440px]' : 'wrap py-12 md:py-16')}>
        {media && (
          <div className={'relative min-w-0 ' + (left ? 'md:order-first' : 'md:order-last') + (fill ? ' px-4 pt-10 md:self-stretch md:p-0' : '')}>
            <div className={`relative mx-auto w-full overflow-hidden ${frame} ` + (fill ? 'aspect-[16/10] md:absolute md:inset-0 md:aspect-auto md:h-full' : 'aspect-[16/10] max-w-[640px]')}>{media}</div>
          </div>
        )}
        <div className={'min-w-0 ' + (fill ? 'px-4 pb-12 md:px-10 md:py-16 lg:px-16' : '')}>
          {block.eyebrow && <p className={`eyebrow ${tone.eyebrow}`}>{t(block.eyebrow)}</p>}
          {block.heading && (
            <h2 id={id} className="h2 mt-1 [overflow-wrap:anywhere]">
              {t(block.heading)}
            </h2>
          )}
          {block.body && <p className={`mt-3 text-lg leading-relaxed whitespace-pre-line ${tone.muted}`}>{t(block.body)}</p>}
          {(block.cta?.label || block.secondary?.label) && (
            <div className="mt-5 flex flex-wrap gap-3">
              {block.cta?.label && block.cta.href && (
                <SiteLink href={block.cta.href} className="inline-flex min-h-14 max-w-full items-center gap-2 rounded-2xl bg-yellow px-6 text-center leading-tight font-bold text-ink">
                  <Ticket size={18} aria-hidden="true" className="flex-none" />
                  {t(block.cta.label)}
                </SiteLink>
              )}
              {block.secondary?.label && block.secondary.href && (
                <SiteLink href={block.secondary.href} className={'inline-flex min-h-14 max-w-full items-center rounded-2xl border-2 px-6 text-center leading-tight font-bold ' + (tone.dark ? 'border-white' : 'border-ink')}>
                  {t(block.secondary.label)}
                </SiteLink>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export async function FaqSection({ block, lang, t, id }: { block: BlockOf<'faq'>; lang: Lang; t: T; id: string }) {
  const own = (block.items ?? []).map((f, i) => ({ id: `own-${f.id ?? i}`, q: f.q, a: f.a }))
  const picked = pick(block.faqs, 'id')
  const shared = picked.length ? (await getFaqs(lang)).filter((f) => picked.includes(f.id)) : own.length ? [] : await getFaqs(lang)
  const faqs = [...shared, ...own]
  if (!faqs.length) return null
  return (
    <section aria-labelledby={id} className="wrap max-w-[860px] py-12 md:py-16">
      <h2 id={id} className="h2 mb-5">
        {t(block.heading || 'Good to know')}
      </h2>
      <div className="divide-y divide-line rounded-[22px] border-2 border-ink bg-white">
        {faqs.map((f) => (
          <details key={f.id} className="group px-5 py-1 md:px-6">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 text-lg font-bold">
              {t(f.q)}
              <ChevronDown size={20} aria-hidden="true" className="flex-none transition group-open:rotate-180 motion-reduce:transition-none" />
            </summary>
            <p className="pb-4 text-[17px] leading-relaxed text-ink-2">{t(f.a)}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: t(f.q), acceptedAnswer: { '@type': 'Answer', text: t(f.a) } })) })} />
    </section>
  )
}

export async function OfferGridSection({ block, lang, t }: { block: BlockOf<'offerGrid'>; lang: Lang; t: T }) {
  const all = await getOffers(lang)
  const want = pick(block.offers, 'slug')
  const offers = want.length ? want.map((s) => all.find((o) => o.slug === s)).filter((o) => !!o) : all.filter((o) => o.status === 'Live' || o.status === 'Always')
  if (!offers.length) return null
  const tone = section(block.tone, 'white')
  return (
    <div className={`${tone.bg} pb-12 md:pb-16`}>
      <OfferList offers={offers} heading={block.heading ? t(block.heading) : undefined} filters={offers.length > 4} />
    </div>
  )
}

export function CountdownSection({ block, t, id }: { block: BlockOf<'countdown'>; t: T; id: string }) {
  const tone = section(block.tone, 'ink')
  return (
    <section aria-labelledby={id} className={`relative overflow-hidden ${tone.bg}`}>
      <Dots cls={tone.dots} />
      <div className="wrap relative flex flex-wrap items-center justify-between gap-6 py-10 md:py-14">
        <div className="max-w-[560px]">
          {block.heading && (
            <h2 id={id} className="display text-[clamp(34px,6vw,60px)] leading-[0.92]">
              {t(block.heading)}
            </h2>
          )}
          {block.body && <p className={`mt-3 text-lg ${tone.muted}`}>{t(block.body)}</p>}
        </div>
        <div className="flex flex-col items-start gap-4">
          <Countdown endsAt={block.endsAt} dark={tone.dark} />
          {block.cta?.label && block.cta.href && (
            <SiteLink href={block.cta.href} className="inline-flex min-h-14 items-center gap-2 rounded-2xl bg-yellow px-6 font-bold text-ink">
              <Ticket size={18} aria-hidden="true" />
              {t(block.cta.label)}
            </SiteLink>
          )}
        </div>
      </div>
    </section>
  )
}

export function GallerySection({ block, t, id }: { block: BlockOf<'gallery'>; t: T; id: string }) {
  const images = (block.images ?? []).map(toMedia).filter((m) => !!m)
  if (!images.length) return null
  return (
    <section aria-labelledby={block.heading ? id : undefined} className="wrap py-12 md:py-16">
      {block.heading && (
        <h2 id={id} className="h2 mb-6">
          {t(block.heading)}
        </h2>
      )}
      <div className={'grid grid-cols-2 gap-2.5 md:gap-3 ' + ((({ '2': 'md:grid-cols-2', '4': 'md:grid-cols-3 lg:grid-cols-4' }) as Record<string, string>)[block.columns ?? '3'] ?? 'md:grid-cols-3')}>
        {images.map((m, i) => (
          <figure key={m.url + i} className="relative m-0 aspect-[4/3] overflow-hidden rounded-[18px]">
            <Img media={m} fill sizes="(min-width: 768px) 33vw, 50vw" />
          </figure>
        ))}
      </div>
    </section>
  )
}

export function LeadFormSection({ block, t, id, source }: { block: BlockOf<'leadForm'>; t: T; id: string; source: string }) {
  const tone = section(block.tone, 'yellow')
  return (
    <section aria-labelledby={id} className={`relative overflow-hidden ${tone.bg}`}>
      <Dots cls={tone.dots} />
      <div className="wrap relative grid items-center gap-6 py-12 md:grid-cols-[1fr_1.1fr] md:py-16">
        <div>
          <h2 id={id} className="display text-[clamp(34px,6vw,60px)] leading-[0.92]">
            {t(block.heading || 'Get offers before everyone else.')}
          </h2>
          {block.body && <p className={`mt-3 text-lg ${tone.muted}`}>{t(block.body)}</p>}
        </div>
        <LeadForm type={(block.formType as 'offers' | 'waitlist' | 'callback' | 'groups' | 'contact') ?? 'offers'} buttonLabel={block.buttonLabel ?? undefined} dark={tone.dark} source={source} />
      </div>
    </section>
  )
}
