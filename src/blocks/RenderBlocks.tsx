import { Hero, type HeroStyle } from '@/components/hero/Hero'
import { SectionBoundary } from '@/components/cms/SectionBoundary'
import type { Slide } from '@/components/hero/shared'
import type { Lang } from '@/i18n/config'
import { getSavedSection, getT, isPreview, toMedia } from '@/lib/cms'
import { CountdownSection, CtaBandSection, FaqSection, GallerySection, ImageTextSection, LeadFormSection, OfferGridSection, RichTextSection } from './ContentBlocks'
import {
  CrewPlannerSection,
  EventsRailSection,
  JournalTeaserSection,
  MomentsWallSection,
  StatsSection,
  TicketCardsSection,
  TickerSection,
  TodayStatusSection,
  WorldsGridSection,
} from './SiteBlocks'
import {
  ColumnsSection,
  EmbedSection,
  LogoStripSection,
  MapSection,
  OfferSpotlightSection,
  RidesListSection,
  SpacerSection,
  TestimonialsSection,
  VenuesGridSection,
  VideoSection,
} from './MoreBlocks'
import { CustomSection, SlideshowSection } from './LayoutBlocks'
import type { BlockOf, LayoutBlock } from './types'

/** CMS hero block → the props every banner style takes. */
export function heroProps(block: BlockOf<'hero'>) {
  const slides: Slide[] = (block.slides ?? []).map((s, i) => ({
    id: s.id ?? String(i),
    tab: s.tab,
    eyebrow: s.eyebrow ?? undefined,
    title: s.title,
    body: s.body ?? undefined,
    image: toMedia(s.image),
    tone: s.tone ?? 'ink',
    badge: s.badge ?? undefined,
    price: s.price ?? undefined,
    cta: { label: s.cta.label, href: s.cta.href },
    secondary: s.secondary?.label && s.secondary.href ? { label: s.secondary.label, href: s.secondary.href } : undefined,
    brand: !!s.isBrandHeadline,
  }))
  return {
    style: (block.style ?? 'framed') as HeroStyle,
    slides,
    autoplaySeconds: block.autoplaySeconds ?? 6.5,
    showBookingBox: block.showBookingBox !== false,
    mosaic: (block.mosaic ?? []).map(toMedia).filter((m) => !!m),
    video: toMedia(block.video)?.url,
  }
}

type Design = { headingSize?: string | null; headingFont?: string | null; textSize?: string | null; align?: string | null; background?: string | null; frame?: string | null; paddingTop?: string | null; paddingBottom?: string | null; marginBottom?: string | null; width?: string | null }

const SPACE: Record<string, string> = { '0': '0px', xs: '12px', s: 'clamp(16px, 3vw, 28px)', m: 'clamp(32px, 5vw, 56px)', l: 'clamp(48px, 8vw, 88px)', xl: 'clamp(64px, 11vw, 128px)' }
const HEADING: Record<string, string> = { s: 'clamp(24px, 4vw, 34px)', m: 'clamp(30px, 5.5vw, 52px)', l: 'clamp(38px, 7vw, 72px)', xl: 'clamp(46px, 9.5vw, 104px)' }

/** Dark backgrounds get light text, light ones dark text (WCAG relative luminance). */
function textOn(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4 ? 'var(--ink)' : '#fff'
}

/** The section's Design settings as data attributes + custom properties (see globals.css). */
function designProps(d?: Design | null) {
  const attrs: Record<string, string> = {}
  const style: Record<string, string> = {}
  if (!d) return { attrs, style, any: false }
  const pick = (v?: string | null) => (v && v !== 'auto' ? v : null)
  if (pick(d.paddingTop) && SPACE[d.paddingTop!]) (attrs['data-pt'] = d.paddingTop!, (style['--sec-pt'] = SPACE[d.paddingTop!]))
  if (pick(d.paddingBottom) && SPACE[d.paddingBottom!]) (attrs['data-pb'] = d.paddingBottom!, (style['--sec-pb'] = SPACE[d.paddingBottom!]))
  if (pick(d.marginBottom) && SPACE[d.marginBottom!]) (attrs['data-mb'] = d.marginBottom!, (style['--sec-mb'] = SPACE[d.marginBottom!]))
  if (pick(d.headingSize) && HEADING[d.headingSize!]) (attrs['data-hs'] = d.headingSize!, (style['--sec-hs'] = HEADING[d.headingSize!]))
  if (d.headingFont === 'plain') attrs['data-hf'] = 'plain'
  if (pick(d.textSize)) attrs['data-ts'] = d.textSize!
  if (pick(d.align)) attrs['data-align'] = d.align!
  if (pick(d.width)) attrs['data-w'] = d.width!
  if (d.frame && d.frame !== 'none') attrs['data-frame'] = d.frame
  if (d.background && /^#[0-9a-f]{6}$/i.test(d.background)) {
    attrs['data-bg'] = ''
    style['--sec-bg'] = d.background
    style['--sec-fg'] = textOn(d.background)
  }
  return { attrs, style, any: Object.keys(attrs).length > 0 }
}

type Display = { hidden?: boolean | null; showOn?: string | null; anchor?: string | null; showFrom?: string | null; showUntil?: string | null }

/** Hidden, or outside its scheduled dates. */
function isShown(d: Display | undefined | null, now: number) {
  if (!d) return true
  if (d.hidden) return false
  if (d.showFrom && now < new Date(d.showFrom).getTime()) return false
  if (d.showUntil && now > new Date(d.showUntil).getTime()) return false
  return true
}

/**
 * Renders a page's sections in order. `source` names the page for lead
 * forms and tracking (e.g. "page:home", "offer:fun-fest").
 *
 * Each section's Visibility settings apply here: hidden, scheduled, phones
 * or computers only, and its #anchor. While an editor previews (draft mode)
 * every section is marked with data-np-section so the visual editor can
 * outline it and select it with a click.
 */
export async function RenderBlocks({ blocks, lang, source, field = 'layout', nested = false }: { blocks?: LayoutBlock[] | null; lang: Lang; source: string; field?: string; nested?: boolean }) {
  if (!blocks?.length) return null
  const [t, editing] = await Promise.all([getT(lang), nested ? Promise.resolve(false) : isPreview()])
  const now = Date.now()
  return (
    <>
      {blocks.map((b, i) => {
        const display = (b as { display?: Display }).display
        if (!isShown(display, now)) return null
        const id = `s${i}-${b.blockType}`
        const key = b.id ?? id
        const el = renderOne(b, { i, id, lang, t, source })
        if (!el) return null
        const showOn = display?.showOn === 'mobile' ? 'md:hidden' : display?.showOn === 'desktop' ? 'max-md:hidden' : ''
        const design = designProps((b as { design?: Design }).design)
        // A real box when the editor needs to outline it or Design needs one; otherwise layout-neutral.
        const boxed = editing || design.any
        return (
          <div
            key={key}
            className={`np-sec ${boxed ? 'relative' : 'contents'} ${showOn}`}
            style={design.style as React.CSSProperties}
            {...design.attrs}
            {...(editing ? { 'data-np-section': i, 'data-np-field': field, 'data-np-type': b.blockType } : {})}
          >
            {display?.anchor && <span id={display.anchor.replace(/^#/, '')} className="np-anchor block scroll-mt-32" />}
            <SectionBoundary editing={editing} label={b.blockType}>
              {el}
            </SectionBoundary>
          </div>
        )
      })}
    </>
  )
}

function renderOne(b: LayoutBlock, x: { i: number; id: string; lang: Lang; t: Awaited<ReturnType<typeof getT>>; source: string }) {
  const { id, lang, t, source } = x
  switch (b.blockType) {
    case 'hero':
      return <Hero {...heroProps(b)} />
    case 'ticker':
      return <TickerSection block={b} t={t} />
    case 'ticketCards':
      return <TicketCardsSection block={b} lang={lang} t={t} id={id} />
    case 'eventsRail':
      return <EventsRailSection block={b} lang={lang} t={t} id={id} />
    case 'offerGrid':
      return <OfferGridSection block={b} lang={lang} t={t} />
    case 'offerSpotlight':
      return <OfferSpotlightSection block={b} lang={lang} t={t} id={id} />
    case 'worldsGrid':
      return <WorldsGridSection block={b} lang={lang} t={t} id={id} />
    case 'ridesList':
      return <RidesListSection block={b} lang={lang} t={t} id={id} />
    case 'venuesGrid':
      return <VenuesGridSection block={b} lang={lang} t={t} id={id} />
    case 'map':
      return <MapSection block={b} lang={lang} t={t} id={id} />
    case 'stats':
      return <StatsSection block={b} lang={lang} t={t} id={id} />
    case 'crewPlanner':
      return <CrewPlannerSection block={b} lang={lang} t={t} />
    case 'momentsWall':
      return <MomentsWallSection block={b} lang={lang} t={t} id={id} />
    case 'journalTeaser':
      return <JournalTeaserSection block={b} lang={lang} t={t} id={id} />
    case 'todayStatus':
      return <TodayStatusSection block={b} lang={lang} t={t} id={id} />
    case 'countdown':
      return <CountdownSection block={b} t={t} id={id} />
    case 'imageText':
      return <ImageTextSection block={b} t={t} id={id} />
    case 'columns':
      return <ColumnsSection block={b} t={t} id={id} />
    case 'custom':
      return <CustomSection block={b} t={t} id={id} />
    case 'slideshow':
      return <SlideshowSection block={b} t={t} id={id} />
    case 'richText':
      return <RichTextSection block={b} />
    case 'video':
      return <VideoSection block={b} t={t} id={id} />
    case 'gallery':
      return <GallerySection block={b} t={t} id={id} />
    case 'testimonials':
      return <TestimonialsSection block={b} t={t} id={id} />
    case 'logoStrip':
      return <LogoStripSection block={b} t={t} id={id} />
    case 'faq':
      return <FaqSection block={b} lang={lang} t={t} id={id} />
    case 'leadForm':
      return <LeadFormSection block={b} t={t} id={id} source={source} />
    case 'ctaBand':
      return <CtaBandSection block={b} t={t} id={id} />
    case 'embed':
      return <EmbedSection block={b} t={t} id={id} />
    case 'spacer':
      return <SpacerSection block={b} />
    case 'reusable':
      return <SavedSection block={b} lang={lang} source={source} />
    default:
      return null
  }
}

/** A saved section: the same sections on many pages, edited in one place. */
async function SavedSection({ block, lang, source }: { block: BlockOf<'reusable'>; lang: Lang; source: string }) {
  const ref = block.section
  const id = typeof ref === 'object' && ref ? ref.id : ref
  if (!id) return null
  const saved = await getSavedSection(String(id), lang)
  if (!saved?.layout?.length) return null
  return <RenderBlocks blocks={saved.layout as LayoutBlock[]} lang={lang} source={source} nested />
}
