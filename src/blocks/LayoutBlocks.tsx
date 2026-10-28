/**
 * Free-form sections: the Custom section (sub-blocks in a grid) and the
 * Slideshow. Both are mobile first: one column on phones, two on tablets,
 * the chosen number on computers.
 */
import { Check, Quote, Ticket } from 'lucide-react'
import { Slideshow } from '@/components/cms/Slideshow'
import { VideoPlayer } from '@/components/cms/VideoPlayer'
import { Img } from '@/components/ui/Img'
import { SiteLink } from '@/components/ui/SiteLink'
import type { T } from '@/i18n/translate'
import { toMedia } from '@/lib/cms'
import { section } from './tone'
import type { BlockOf } from './types'

const Dots = ({ cls }: { cls?: string }) => (cls ? <div aria-hidden="true" className={`dots pointer-events-none absolute inset-0 ${cls}`} /> : null)

type Sub = NonNullable<BlockOf<'custom'>['items']>[number]

const COLS: Record<string, string> = { '1': '', '2': 'md:grid-cols-2', '3': 'md:grid-cols-2 lg:grid-cols-3', '4': 'md:grid-cols-2 lg:grid-cols-4' }
const SPAN: Record<string, Record<string, string>> = {
  '1': {},
  '2': { '2': 'md:col-span-2', full: 'md:col-span-full' },
  '3': { '2': 'md:col-span-2', full: 'md:col-span-full' },
  '4': { '2': 'md:col-span-2', full: 'md:col-span-full' },
}

export function CustomSection({ block, t, id }: { block: BlockOf<'custom'>; t: T; id: string }) {
  const tone = section(block.tone, 'white')
  const cols = block.columns ?? '2'
  const items = block.items ?? []
  return (
    <section aria-labelledby={block.heading ? id : undefined} className={`relative overflow-hidden ${tone.bg}`}>
      <Dots cls={tone.dots} />
      <div className="wrap relative py-12 md:py-16">
        {(block.eyebrow || block.heading || block.intro) && (
          <div className="mb-8 max-w-[760px]">
            {block.eyebrow && <p className={`eyebrow ${tone.eyebrow}`}>{t(block.eyebrow)}</p>}
            {block.heading && (
              <h2 id={id} className="h2 mt-1 [overflow-wrap:anywhere]">
                {t(block.heading)}
              </h2>
            )}
            {block.intro && <p className={`mt-2.5 text-lg ${tone.muted}`}>{t(block.intro)}</p>}
          </div>
        )}
        <div className={`grid gap-5 md:gap-7 ${COLS[cols] ?? COLS['2']} ${block.verticalAlign === 'center' ? 'items-center' : 'items-start'}`}>
          {items.map((it, k) => (
            <div key={it.id ?? k} className={'min-w-0 ' + (SPAN[cols]?.[(it as { span?: string }).span ?? '1'] ?? '')}>
              <SubBlock it={it} t={t} dark={tone.dark} muted={tone.muted} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SubBlock({ it, t, dark, muted }: { it: Sub; t: T; dark: boolean; muted: string }) {
  switch (it.blockType) {
    case 'subHeading': {
      const size = { s: 'text-[clamp(22px,3vw,28px)]', m: 'text-[clamp(26px,4vw,40px)]', l: 'text-[clamp(32px,5.5vw,60px)]' }[it.size ?? 'm']
      return <h3 className={`display leading-[0.98] [overflow-wrap:anywhere] ${size}`}>{t(it.text)}</h3>
    }
    case 'subText':
      return <p className={`text-lg leading-relaxed whitespace-pre-line ${muted}`}>{t(it.text)}</p>
    case 'subImage': {
      const m = toMedia(it.image)
      if (!m) return null
      const fig = (
        <figure className="m-0">
          <div className="relative overflow-hidden rounded-[20px]" style={{ aspectRatio: it.ratio ?? '4/3' }}>
            <Img media={m} fill sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 92vw" />
          </div>
          {it.caption && <figcaption className={`mt-2 text-sm ${muted}`}>{t(it.caption)}</figcaption>}
        </figure>
      )
      return it.href ? (
        <SiteLink href={it.href} className="block">
          {fig}
        </SiteLink>
      ) : (
        fig
      )
    }
    case 'subCard': {
      const m = toMedia(it.image)
      return (
        <article className={'flex h-full flex-col overflow-hidden rounded-[22px] ' + (dark ? 'bg-white/10' : 'border border-line bg-white text-ink')}>
          {m && (
            <div className="relative aspect-[16/10]">
              <Img media={m} fill sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 92vw" />
            </div>
          )}
          <div className="flex flex-1 flex-col gap-2 p-5">
            <h3 className="text-xl leading-tight font-bold [overflow-wrap:anywhere]">{t(it.title)}</h3>
            {it.text && <p className={dark ? 'text-white/85' : 'text-ink-2'}>{t(it.text)}</p>}
            {it.link?.label && it.link.href && (
              <SiteLink href={it.link.href} className="mt-auto inline-flex min-h-11 items-center self-start pt-1 font-bold underline">
                {t(it.link.label)} →
              </SiteLink>
            )}
          </div>
        </article>
      )
    }
    case 'subButton': {
      const cls =
        it.style === 'outline' ? (dark ? 'border-2 border-white' : 'border-2 border-ink') : it.style === 'dark' ? (dark ? 'bg-white text-ink' : 'bg-ink text-white') : 'bg-yellow text-ink shadow-[4px_4px_0_0_var(--ink)]'
      return (
        <SiteLink href={it.href} className={`inline-flex min-h-14 max-w-full items-center justify-center gap-2 rounded-2xl px-6 text-center leading-tight font-bold ${cls}`}>
          {it.style !== 'outline' && <Ticket size={18} aria-hidden="true" className="flex-none" />}
          {t(it.label)}
        </SiteLink>
      )
    }
    case 'subVideo': {
      const poster = toMedia(it.poster)
      return (
        <div className="relative aspect-video overflow-hidden rounded-[20px]">
          <VideoPlayer source={(it.source ?? 'upload') as 'upload' | 'youtube' | 'vimeo'} file={toMedia(it.file)?.url} url={it.url} poster={poster} title={t('Video')} autoplay={!!it.autoplay} />
        </div>
      )
    }
    case 'subQuote':
      return (
        <blockquote className={'m-0 rounded-[22px] p-5 md:p-6 ' + (dark ? 'bg-white/10' : 'bg-cream text-ink')}>
          <Quote size={26} aria-hidden="true" className="text-coral" />
          <p className="mt-2 text-lg leading-relaxed">{t(it.quote)}</p>
          {it.name && <footer className="mt-3 font-bold">— {it.name}</footer>}
        </blockquote>
      )
    case 'subList':
      return (
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
          {(it.items ?? []).map((x, k) => (
            <li key={x.id ?? k} className="flex gap-3 text-lg leading-snug">
              <Check size={20} strokeWidth={2.8} aria-hidden="true" className={'mt-0.5 flex-none ' + (dark ? 'text-yellow' : 'text-dry')} />
              <span>{t(x.text)}</span>
            </li>
          ))}
        </ul>
      )
    case 'subGap':
      return <div aria-hidden="true" className={{ s: 'h-4', m: 'h-10', l: 'h-20' }[it.size ?? 'm']} />
    default:
      return null
  }
}

export function SlideshowSection({ block, t, id }: { block: BlockOf<'slideshow'>; t: T; id: string }) {
  const tone = section(block.tone, 'cream')
  const slides = (block.slides ?? [])
    .map((s, k) => {
      const image = toMedia(s.image)
      return image ? { id: s.id ?? String(k), image, heading: s.heading ?? undefined, text: s.text ?? undefined, link: s.link?.label && s.link.href ? { label: s.link.label, href: s.link.href } : undefined } : null
    })
    .filter((s) => !!s)
  if (!slides.length) return null
  const style = (block.style ?? 'framed') as 'framed' | 'cards' | 'full'
  const label = block.heading ? t(block.heading) : t('Photos')
  return (
    <section aria-labelledby={block.heading ? id : undefined} aria-label={block.heading ? undefined : label} className={`relative overflow-hidden ${tone.bg} ${style === 'full' ? 'pb-10 md:pb-14' : ''}`}>
      <Dots cls={tone.dots} />
      {block.heading && (
        <div className="wrap relative pt-12 md:pt-16">
          <h2 id={id} className="h2 [overflow-wrap:anywhere]">
            {t(block.heading)}
          </h2>
        </div>
      )}
      <div className={style === 'full' ? 'relative mt-6' : 'wrap relative py-8 md:py-12'}>
        <Slideshow slides={slides} style={style} seconds={block.autoplaySeconds ?? 5} dark={tone.dark} label={label} />
      </div>
    </section>
  )
}
