/**
 * Renderers for the Shopify-style sections: video, columns, offer
 * spotlight, visitor quotes, logo strip, map, spacer, rides, venues and
 * custom embeds.
 */
import {
  Accessibility,
  ArrowRight,
  Bus,
  Cake,
  Camera,
  CircleParking,
  Clock,
  CookingPot,
  FerrisWheel,
  Gift,
  MapPin,
  Phone,
  Quote,
  School,
  Shield,
  Snowflake,
  Sparkles,
  Star,
  Ticket,
  Users,
  Waves,
  type LucideIcon,
} from 'lucide-react'
import { MapEmbed } from '@/components/cms/MapEmbed'
import { VideoPlayer } from '@/components/cms/VideoPlayer'
import { Img } from '@/components/ui/Img'
import { SiteLink } from '@/components/ui/SiteLink'
import { RideGrid } from '@/components/worlds/RideGrid'
import type { Lang } from '@/i18n/config'
import { dateYearL, type T } from '@/i18n/translate'
import { getOffers, getRides, getRoutes, getVenues, toMedia } from '@/lib/cms'
import { section } from './tone'
import type { BlockOf } from './types'

const Dots = ({ cls }: { cls?: string }) => (cls ? <div aria-hidden="true" className={`dots pointer-events-none absolute inset-0 ${cls}`} /> : null)

const ICON: Record<string, LucideIcon> = {
  ticket: Ticket,
  ride: FerrisWheel,
  water: Waves,
  bowling: Sparkles,
  snow: Snowflake,
  food: CookingPot,
  bus: Bus,
  clock: Clock,
  star: Star,
  shield: Shield,
  gift: Gift,
  users: Users,
  map: MapPin,
  parking: CircleParking,
  camera: Camera,
  accessibility: Accessibility,
  school: School,
  cake: Cake,
  sparkles: Sparkles,
  phone: Phone,
}

export function VideoSection({ block, t, id }: { block: BlockOf<'video'>; t: T; id: string }) {
  const tone = section(block.tone, 'ink')
  const file = toMedia(block.file)
  const poster = toMedia(block.poster)
  const source = (block.source ?? 'upload') as 'upload' | 'youtube' | 'vimeo'
  const title = block.heading ? t(block.heading) : t('Video')
  const player = (
    <VideoPlayer source={source} file={file?.url} url={block.url} poster={poster} title={title} autoplay={!!block.autoplay} />
  )
  const text = (block.heading || block.body || block.cta?.label) && (
    <div>
      {block.eyebrow && <p className={`eyebrow ${tone.eyebrow}`}>{t(block.eyebrow)}</p>}
      {block.heading && (
        <h2 id={id} className="h2 mt-1">
          {t(block.heading)}
        </h2>
      )}
      {block.body && <p className={`mt-3 text-lg leading-relaxed ${tone.muted}`}>{t(block.body)}</p>}
      {block.cta?.label && block.cta.href && (
        <SiteLink href={block.cta.href} className="mt-5 inline-flex min-h-14 items-center gap-2 rounded-2xl bg-yellow px-6 font-bold text-ink">
          <Ticket size={18} aria-hidden="true" />
          {t(block.cta.label)}
        </SiteLink>
      )}
    </div>
  )
  const layout = block.layout ?? 'framed'
  return (
    <section aria-labelledby={block.heading ? id : undefined} aria-label={block.heading ? undefined : title} className={`relative overflow-hidden ${tone.bg}`}>
      <Dots cls={tone.dots} />
      <div className={'wrap relative py-12 md:py-16 ' + (layout === 'split' ? 'grid items-center gap-8 md:grid-cols-[1fr_1.2fr]' : '')}>
        {layout !== 'split' && text && <div className="mb-7 max-w-[760px]">{text}</div>}
        {layout === 'split' && text}
        <div
          className={
            'relative aspect-video w-full overflow-hidden ' +
            (layout === 'framed' ? 'mx-auto max-w-[900px] rounded-[26px] border-4 border-white shadow-[0_30px_60px_-24px_rgba(0,0,0,0.55)]' : 'rounded-[22px]')
          }
        >
          {player}
        </div>
      </div>
    </section>
  )
}

export function ColumnsSection({ block, t, id }: { block: BlockOf<'columns'>; t: T; id: string }) {
  const tone = section(block.tone, 'white')
  const cols = { '2': 'md:grid-cols-2', '3': 'md:grid-cols-3', '4': 'md:grid-cols-2 lg:grid-cols-4' }[block.perRow ?? '3'] ?? 'md:grid-cols-3'
  return (
    <section aria-labelledby={block.heading ? id : undefined} className={`relative overflow-hidden ${tone.bg}`}>
      <Dots cls={tone.dots} />
      <div className="wrap relative py-12 md:py-16">
        {(block.eyebrow || block.heading || block.intro) && (
          <div className="mb-8 max-w-[760px]">
            {block.eyebrow && <p className={`eyebrow ${tone.eyebrow}`}>{t(block.eyebrow)}</p>}
            {block.heading && (
              <h2 id={id} className="h2 mt-1">
                {t(block.heading)}
              </h2>
            )}
            {block.intro && <p className={`mt-2.5 text-lg ${tone.muted}`}>{t(block.intro)}</p>}
          </div>
        )}
        <ul className={`grid gap-4 sm:grid-cols-2 ${cols}`}>
          {(block.items ?? []).map((c, i) => {
            const Icon = ICON[c.icon ?? ''] ?? Sparkles
            const img = toMedia(c.image)
            return (
              <li key={c.id ?? i} className={'flex flex-col gap-3 rounded-[22px] p-5 md:p-6 ' + (tone.dark ? 'bg-white/10' : 'border border-line bg-white text-ink')}>
                {img ? (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                    <Img media={img} fill sizes="(min-width: 768px) 33vw, 100vw" />
                  </div>
                ) : (
                  <span className={'grid size-12 place-items-center rounded-2xl ' + (tone.dark ? 'bg-yellow text-ink' : 'bg-yellow-soft text-ink')}>
                    <Icon size={24} aria-hidden="true" />
                  </span>
                )}
                <h3 className="text-xl leading-tight font-bold">{t(c.title)}</h3>
                {c.text && <p className={'leading-relaxed ' + (tone.dark ? 'text-white/85' : 'text-muted')}>{t(c.text)}</p>}
                {c.link?.label && c.link.href && (
                  <SiteLink href={c.link.href} className="mt-auto inline-flex items-center gap-1.5 font-bold underline underline-offset-4">
                    {t(c.link.label)} <ArrowRight size={16} aria-hidden="true" />
                  </SiteLink>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export async function OfferSpotlightSection({ block, lang, t, id }: { block: BlockOf<'offerSpotlight'>; lang: Lang; t: T; id: string }) {
  const slug = typeof block.offer === 'object' && block.offer ? block.offer.slug : null
  const offer = slug ? (await getOffers(lang)).find((o) => o.slug === slug) : undefined
  if (!offer) return null
  const tone = section(block.tone, 'coral')
  const ends = block.showEnds !== false && offer.validTo ? new Date(offer.validTo) : null
  const href = offer.hasLanding ? `/offers/${offer.slug}` : offer.cta.href
  const title = block.heading ? t(block.heading) : t(offer.name)
  const buttons = (
    <div className="flex flex-wrap items-center gap-3">
      <SiteLink href={offer.cta.href} className="inline-flex min-h-14 items-center gap-2 rounded-2xl bg-yellow px-6 font-bold text-ink shadow-[4px_4px_0_0_var(--ink)]">
        <Ticket size={18} aria-hidden="true" />
        {t(offer.cta.label)}
      </SiteLink>
      {offer.hasLanding && (
        <SiteLink href={href} className="inline-flex min-h-12 items-center font-bold underline underline-offset-4">
          {t('Offer details')}
        </SiteLink>
      )}
    </div>
  )
  if (block.layout === 'strip')
    return (
      <section aria-labelledby={id} className={tone.bg}>
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-5">
          <p className="min-w-0">
            <span className={`eyebrow mr-2 ${tone.eyebrow}`}>{t(offer.tag)}</span>
            <strong id={id} className="text-xl">
              {title}
            </strong>{' '}
            <span className="font-bold">· {t(offer.deal)}</span>
            {ends && <span className={`ml-2 text-sm ${tone.muted}`}>{t('Ends {date}', { date: dateYearL(lang, ends) })}</span>}
          </p>
          {buttons}
        </div>
      </section>
    )
  return (
    <section aria-labelledby={id} className={`relative overflow-hidden ${tone.bg}`}>
      <Dots cls={tone.dots} />
      <div className={'wrap relative grid items-center gap-8 py-12 md:py-16 ' + (offer.image ? 'md:grid-cols-[1.1fr_0.9fr]' : '')}>
        <div>
          <p className={`eyebrow ${tone.eyebrow}`}>{t(offer.tag)}</p>
          <h2 id={id} className="display mt-2 text-[clamp(40px,7vw,80px)] leading-[0.9]">
            {title}
          </h2>
          <p className="mt-3 text-2xl font-bold">{t(offer.deal)}</p>
          <p className={`mt-2 max-w-[560px] text-lg ${tone.muted}`}>{t(offer.terms)}</p>
          {ends && <p className="mt-3 inline-flex rounded-full bg-white/90 px-3.5 py-1.5 text-sm font-bold text-ink">{t('Ends {date}', { date: dateYearL(lang, ends) })}</p>}
          <div className="mt-6">{buttons}</div>
        </div>
        {offer.image && (
          <div className={'relative mx-auto aspect-[16/10] w-full max-w-[540px] overflow-hidden rounded-[24px] border-4 border-white shadow-[0_30px_60px_-24px_rgba(0,0,0,0.5)] ' + (block.layout === 'card' ? '' : 'md:rotate-2')}>
            <Img media={offer.image} fill sizes="(min-width: 768px) 540px, 92vw" />
          </div>
        )}
      </div>
    </section>
  )
}

export function TestimonialsSection({ block, t, id }: { block: BlockOf<'testimonials'>; t: T; id: string }) {
  const items = block.items ?? []
  if (!items.length) return null
  const tone = section(block.tone, 'cream')
  return (
    <section aria-labelledby={block.heading ? id : undefined} className={tone.bg}>
      <div className="wrap py-12 md:py-16">
        {block.heading && (
          <h2 id={id} className="h2 mb-7">
            {t(block.heading)}
          </h2>
        )}
        <ul className="rail -mx-4 px-4 md:mx-0 md:grid md:grid-flow-row md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0">
          {items.map((q, i) => (
            <li key={q.id ?? i}>
              <figure className="flex h-full flex-col gap-4 rounded-[22px] border-2 border-ink bg-white p-6 text-ink">
                <Quote size={28} aria-hidden="true" className="text-coral" />
                <blockquote className="text-lg leading-relaxed">{t(q.quote)}</blockquote>
                <figcaption className="mt-auto text-sm">
                  <strong className="block text-base">{q.name}</strong>
                  {q.detail && <span className="text-muted">{t(q.detail)}</span>}
                  {q.source && <span className="block text-xs text-muted">{q.source}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function LogoStripSection({ block, t, id }: { block: BlockOf<'logoStrip'>; t: T; id: string }) {
  const logos = block.logos ?? []
  if (!logos.length) return null
  return (
    <section aria-labelledby={block.heading ? id : undefined} className="border-y border-line bg-white">
      <div className="wrap py-8">
        {block.heading && (
          <h2 id={id} className="mb-5 text-center text-sm font-bold tracking-wide text-muted uppercase">
            {t(block.heading)}
          </h2>
        )}
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {logos.map((l, i) => {
            const img = toMedia(l.image)
            const inner = img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={img.url} alt={l.name} width={img.width} height={img.height} className="h-10 w-auto object-contain md:h-12" loading="lazy" />
            ) : (
              <span className="text-lg font-bold">{l.name}</span>
            )
            return (
              <li key={l.id ?? i}>
                {l.href ? (
                  <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener" className="block opacity-80 transition hover:opacity-100">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export async function MapSection({ block, lang, t, id }: { block: BlockOf<'map'>; lang: Lang; t: T; id: string }) {
  const routes = block.showRoutes !== false ? await getRoutes(lang) : []
  return (
    <section aria-labelledby={id} className="wrap py-12 md:py-16">
      <h2 id={id} className="h2">
        {t(block.heading || 'Getting here')}
      </h2>
      {block.intro && <p className="mt-2.5 text-lg text-ink-2">{t(block.intro)}</p>}
      <div className={'mt-6 grid gap-4 ' + (routes.length ? 'lg:grid-cols-[1.4fr_1fr]' : '')}>
        <div className="relative h-[360px] overflow-hidden rounded-[24px] border-2 border-ink md:h-[440px]">
          <MapEmbed query={block.query || 'Nicco Park, Salt Lake, Kolkata'} />
        </div>
        {routes.length > 0 && (
          <ul className="flex flex-col gap-3">
            {routes.map((r) => (
              <li key={r.title} className="rounded-[20px] border border-line p-5">
                <h3 className="text-lg font-bold">{t(r.title)}</h3>
                <p className="mt-1 leading-relaxed text-muted">{t(r.body)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export function SpacerSection({ block }: { block: BlockOf<'spacer'> }) {
  const h = { s: 'h-6 md:h-8', m: 'h-12 md:h-16', l: 'h-20 md:h-28' }[block.size ?? 'm']
  return (
    <div aria-hidden="true" className={`wrap flex items-center ${h}`}>
      {block.divider && <hr className="w-full border-t-2 border-dashed border-line-2" />}
    </div>
  )
}

const WORLD_COLOR = { dry: { tint: '#E5F3EA', color: '#0E7C3A' }, wet: { tint: '#E3EFFB', color: '#0067C5' }, bowl: { tint: '#EFE7FC', color: '#6D28D9' } } as const

export async function RidesListSection({ block, lang, t, id }: { block: BlockOf<'ridesList'>; lang: Lang; t: T; id: string }) {
  const world = (block.world ?? 'dry') as keyof typeof WORLD_COLOR
  const rides = await getRides(world, lang)
  if (!rides.length) return null
  const c = WORLD_COLOR[world]
  return (
    <section aria-labelledby={id} className="wrap py-12 md:py-16">
      <h2 id={id} className="h2 mb-5">
        {t(block.heading || 'Every ride, in one place')}
      </h2>
      <RideGrid rides={rides} tint={c.tint} color={c.color} />
    </section>
  )
}

export async function VenuesGridSection({ block, lang, t, id }: { block: BlockOf<'venuesGrid'>; lang: Lang; t: T; id: string }) {
  const venues = await getVenues(lang)
  return (
    <section aria-labelledby={id} className="wrap py-12 md:py-16">
      <h2 id={id} className="h2">
        {t(block.heading || 'Venues')}
      </h2>
      {block.intro && <p className="mt-2.5 text-lg text-ink-2">{t(block.intro)}</p>}
      <div className="mt-6 grid gap-3.5 md:grid-cols-2 xl:grid-cols-3">
        {venues.map((v) => (
          <article key={v.name} className="flex flex-col overflow-hidden rounded-[22px] border border-line sm:flex-row md:flex-col">
            <div className="relative h-44 flex-none sm:h-auto sm:w-48 md:h-48 md:w-auto">
              <Img media={v.image} fill sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" />
            </div>
            <div className="flex flex-1 flex-col gap-1.5 p-5">
              <h3 className="text-xl font-bold">{t(v.name)}</h3>
              <p className="leading-snug text-muted">{t(v.description)}</p>
              <p className="mt-auto pt-2 font-bold">{t(v.capacity)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/** Third-party embed code, run in a sandboxed frame with no access to the site or its cookies. */
export function EmbedSection({ block, t, id }: { block: BlockOf<'embed'>; t: T; id: string }) {
  if (!block.code) return null
  const doc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;font-family:system-ui,sans-serif}</style></head><body>${block.code}</body></html>`
  return (
    <section aria-labelledby={block.heading ? id : undefined} className="wrap py-10 md:py-14">
      {block.heading && (
        <h2 id={id} className="h2 mb-5">
          {t(block.heading)}
        </h2>
      )}
      <iframe
        title={block.heading ? t(block.heading) : t('Embedded content')}
        srcDoc={doc}
        sandbox="allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox"
        className="w-full rounded-[20px] border border-line bg-white"
        style={{ height: Math.max(120, Math.min(2000, block.height ?? 480)) }}
        loading="lazy"
      />
    </section>
  )
}
