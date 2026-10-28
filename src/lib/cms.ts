/**
 * The content seam: every page reads content through these functions.
 *
 * They read Payload CMS through its Local API (no HTTP), in the visitor's
 * language, and shape documents into the types in `src/content/types.ts`, so
 * components don't care that the data comes from a CMS.
 *
 * Drafts: when an editor is previewing (Next.js draft mode, switched on by
 * /next/preview), the latest unpublished edits are returned instead of the
 * published version. That is what powers live preview in the admin.
 */
import 'server-only'
import config from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload, type Where } from 'payload'
import { cache } from 'react'
import { snowPlans } from '@/content/worlds'
import type { Crew, Extra, Faq, FoodOutlet, Media, Moment, Occasion, Offer, ParkEvent, Ride, Route, SiteSettings, Ticket, Tip, Venue, World, WorldKey, WorldSlug } from '@/content/types'
import type { JournalBlock, JournalPost } from '@/content/journal'
import type { Lang } from '@/i18n/config'
import { mergeOverrides } from '@/i18n/translate'
import { defaultFooter, defaultHeader } from '@/payload/seed/defaults'
import type { Event as EventDoc, Media as MediaDoc, Offer as OfferDoc, Page } from '@/payload-types'

const STATIC = process.env.NEXT_PUBLIC_STATIC === '1'

export const payload = cache(() => getPayload({ config }))

/** True while an editor is previewing unpublished changes. */
export const isPreview = cache(async () => {
  if (STATIC) return false
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
})

/* eslint-disable @typescript-eslint/no-explicit-any */
type Doc = Record<string, any>

export function toMedia(m: unknown): Media | undefined {
  if (!m || typeof m !== 'object') return undefined
  const d = m as MediaDoc
  if (!d.url) return undefined
  return { url: d.url, alt: d.alt ?? '', width: d.width ?? undefined, height: d.height ?? undefined }
}
const need = (m: unknown): Media => toMedia(m) ?? { url: '/images/hero.jpg', alt: '', width: 1024, height: 576 }
const texts = (rows?: { text?: string | null }[] | null) => (rows ?? []).map((r) => r.text ?? '').filter(Boolean)
const linkOf = (l?: { label?: string | null; href?: string | null } | null) => (l?.label && l?.href ? { label: l.label, href: l.href } : undefined)

/** Find published documents (or the latest drafts while previewing). */
async function find(collection: string, lang: Lang, opts: { where?: Where; sort?: string; limit?: number; depth?: number; versioned?: boolean } = {}) {
  const p = await payload()
  const draft = opts.versioned ? await isPreview() : false
  const where: Where = { ...(opts.where ?? {}) }
  if (opts.versioned && !draft) where._status = { equals: 'published' }
  const res = await p.find({
    collection: collection as 'pages',
    locale: lang,
    fallbackLocale: 'en',
    draft,
    where,
    sort: opts.sort ?? 'order',
    limit: opts.limit ?? 200,
    depth: opts.depth ?? 1,
    pagination: false,
  })
  return res.docs as Doc[]
}

const global = cache(async (slug: string, lang: Lang) => {
  const p = await payload()
  // Drafted globals (header, footer, theme) show unpublished changes only while previewing.
  return (await p.findGlobal({ slug: slug as 'header', locale: lang, fallbackLocale: 'en', depth: 1, draft: await isPreview() })) as Doc
})

export type Announcement = { text: string; href?: string; tone: string }
export type Theme = {
  logo?: Media
  logoFooter?: Media
  favicon?: Media
  logoHeight: number
  colors: Record<string, string>
  displayFont: string
  bodyFont: string
  displayFontUrl?: string
  bodyFontUrl?: string
  headingScale: number
  customCss: string
}

const THEME_DEFAULTS: Record<string, string> = { yellow: '#FFD400', ink: '#101418', coral: '#D93A26', dry: '#0E7C3A', wet: '#0067C5', bowl: '#6D28D9', cream: '#FFF8E6', snow: '#2F5DCC', sea: '#007EA0' }

/** Logo, colours and fonts from CMS → Theme. Only changed colours are returned. */
export const getTheme = cache(async (): Promise<Theme> => {
  let g: Doc = {}
  try {
    g = await global('theme', 'en')
  } catch {}
  const colors: Record<string, string> = {}
  for (const [k, def] of Object.entries(THEME_DEFAULTS)) {
    const v = typeof g[k] === 'string' ? g[k].trim() : ''
    if (/^#[0-9a-fA-F]{6}$/.test(v) && v.toUpperCase() !== def) colors[k] = v
  }
  return {
    logo: toMedia(g.logo),
    logoFooter: toMedia(g.logoFooter),
    favicon: toMedia(g.favicon),
    logoHeight: Math.min(96, Math.max(32, Number(g.logoHeight) || 56)),
    colors,
    displayFont: g.displayFont ?? 'bricolage',
    bodyFont: g.bodyFont ?? 'instrument',
    displayFontUrl: toMedia(g.displayFontFile)?.url,
    bodyFontUrl: toMedia(g.bodyFontFile)?.url,
    headingScale: Math.min(130, Math.max(80, Number(g.headingScale) || 100)),
    customCss: typeof g.customCss === 'string' ? g.customCss : '',
  }
})

export type Tracking = {
  tags: { gtmId?: string; ga4Id?: string; metaPixelId?: string; adsId?: string; adsPurchaseLabel?: string; adsLeadLabel?: string; consentMode: 'basic' | 'advanced' }
  banner: boolean
  privacyUrl: string
  aiCrawlers: 'all' | 'search' | 'none'
  llmsNotes: string
  verification: { google?: string; bing?: string; meta?: string }
}

/** CMS → Tracking: tag IDs (public by design), consent, AI crawler policy, verification codes. */
export const getTracking = cache(async (): Promise<Tracking> => {
  let g: Doc = {}
  try {
    g = await global('tracking', 'en')
  } catch {}
  const id = (v: unknown, re: RegExp) => (typeof v === 'string' && re.test(v.trim()) ? v.trim() : undefined)
  return {
    tags: {
      gtmId: id(g.gtmId, /^GTM-[A-Z0-9]+$/i),
      ga4Id: id(g.ga4Id, /^G-[A-Z0-9]+$/i),
      metaPixelId: id(g.metaPixelId, /^\d{6,20}$/),
      adsId: id(g.adsId, /^AW-\d+$/i),
      adsPurchaseLabel: id(g.adsPurchaseLabel, /^[\w-]{4,40}$/),
      adsLeadLabel: id(g.adsLeadLabel, /^[\w-]{4,40}$/),
      consentMode: g.consentMode === 'advanced' ? 'advanced' : 'basic',
    },
    banner: g.consentBanner !== false,
    privacyUrl: g.privacyUrl || '/privacy',
    aiCrawlers: g.aiCrawlers === 'search' || g.aiCrawlers === 'none' ? g.aiCrawlers : 'all',
    llmsNotes: g.llmsNotes ?? '',
    verification: { google: g.googleVerification || undefined, bing: g.bingVerification || undefined, meta: g.metaVerification || undefined },
  }
})

/** Announcement bar messages that are live right now. */
export const getAnnouncements = cache(async (lang: Lang): Promise<Announcement[]> => {
  const g = await global('header', lang)
  const now = Date.now()
  return ((g.announcements ?? []) as Doc[])
    .filter((a) => a.text && (!a.showFrom || new Date(a.showFrom).getTime() <= now) && (!a.showUntil || new Date(a.showUntil).getTime() >= now))
    .map((a) => ({ text: a.text, href: a.href ?? undefined, tone: a.tone ?? 'yellow' }))
})

/* ------------------------------------------------------------------ */
/*  Settings, menus, interface text                                    */
/* ------------------------------------------------------------------ */

export const getSiteSettings = cache(async (lang: Lang = 'en'): Promise<SiteSettings & { defaultOgImage?: Media; geo?: { lat: number; lng: number }; sameAs: string[] }> => {
  const g = await global('site-settings', lang)
  return {
    name: g.name ?? 'Nicco Park',
    legalName: g.legalName ?? '',
    tagline: g.tagline ?? '',
    address: (g.address ?? []).map((a: Doc) => a.line).filter(Boolean),
    phone: { display: g.phoneDisplay ?? '', tel: g.phoneTel ?? '' },
    whatsapp: g.whatsapp ?? '',
    todayHours: g.todayHours ?? '',
    hours: (g.hours ?? []).map((h: Doc) => ({ label: h.label ?? '', value: h.value ?? '', tone: h.tone ?? 'neutral' })),
    alerts: (g.alerts ?? []).filter((a: Doc) => a.title).map((a: Doc) => ({ title: a.title, detail: a.detail ?? '', href: a.href ?? undefined })),
    socials: (g.socials ?? []).filter((s: Doc) => s.label && s.href),
    stats: (g.stats ?? []).map((s: Doc) => ({ value: s.value ?? '', label: s.label ?? '' })),
    trust: (g.trust ?? []).map((s: Doc) => ({ label: s.label ?? '', icon: s.icon ?? 'shield' })),
    officialChannels: g.officialChannels ?? '',
    defaultOgImage: toMedia(g.defaultOgImage),
    geo: typeof g.geo?.lat === 'number' && typeof g.geo?.lng === 'number' ? { lat: g.geo.lat, lng: g.geo.lng } : undefined,
    sameAs: ((g.sameAs ?? []) as Doc[]).map((x) => x.url).filter((u: unknown): u is string => typeof u === 'string' && /^https:\/\//.test(u)),
  }
})

export function whatsappHref(site: Pick<SiteSettings, 'whatsapp' | 'phone'>) {
  return site.whatsapp || `tel:${site.phone.tel}`
}

export type NavItem = { id: string; label: string; href: string; match: string[]; wideOnly?: boolean }
export type HeaderData = { nav: NavItem[]; moreSheet: { label: string; href: string; badge?: string; tone?: string }[]; buy: { label: string; href: string } }
export type FooterData = { signupHeading: string; columns: { heading: string; links: { label: string; href: string }[] }[]; legal: { label: string; href: string }[] }

const firstSegment = (href: string) => '/' + (href.split(/[?#]/)[0].split('/')[1] ?? '')

export const getHeader = cache(async (lang: Lang): Promise<HeaderData> => {
  const g = await global('header', lang)
  const nav = (g.nav?.length ? g.nav : defaultHeader.nav) as Doc[]
  const more = (g.moreSheet?.length ? g.moreSheet : defaultHeader.moreSheet) as Doc[]
  return {
    nav: nav.map((n, i) => ({ id: `${i}-${n.href}`, label: n.label, href: n.href, match: [firstSegment(n.href)], wideOnly: !!n.wideOnly })),
    moreSheet: more.map((m) => ({ label: m.label, href: m.href, badge: m.badge ?? undefined, tone: m.href.includes('snow') ? 'snow' : 'yellow' })),
    buy: linkOf(g.buy) ?? defaultHeader.buy,
  }
})

export const getFooter = cache(async (lang: Lang): Promise<FooterData> => {
  const g = await global('footer', lang)
  return {
    signupHeading: g.signupHeading || defaultFooter.signupHeading,
    columns: g.columns?.length ? g.columns.map((c: Doc) => ({ heading: c.heading ?? '', links: (c.links ?? []).filter((l: Doc) => l.label && l.href) })) : defaultFooter.columns,
    legal: g.legal?.length ? g.legal.filter((l: Doc) => l.label && l.href) : defaultFooter.legal,
  }
})

/**
 * Interface-text edits made in the CMS ("Interface text"), for one language.
 * Only rows that differ from the built-in dictionary are returned, so the
 * browser gets a tiny object.
 */
export const getTextOverrides = cache(async (lang: Lang): Promise<Record<string, string>> => {
  if (lang === 'en') return {}
  const p = await payload()
  const res = await p.find({ collection: 'translations', limit: 5000, pagination: false, depth: 0, select: { en: true, [lang]: true } as never })
  const rows: Record<string, string> = {}
  for (const r of res.docs as Doc[]) if (r[lang]) rows[r.en] = r[lang]
  return mergeOverrides(lang, rows)
})

/** Server-side `t()` that includes the CMS's interface-text edits. */
export async function getT(lang: Lang) {
  const { makeT } = await import('@/i18n/translate')
  return makeT(lang, await getTextOverrides(lang))
}

/* ------------------------------------------------------------------ */
/*  Products                                                           */
/* ------------------------------------------------------------------ */

const mapTicket = (d: Doc): Ticket => ({
  id: d.code,
  name: d.name,
  shortName: d.shortName,
  price: d.price,
  studentPrice: d.studentPrice ?? undefined,
  funFestPrice: d.funFestPrice ?? undefined,
  summary: d.summary ?? '',
  description: d.description ?? '',
  includes: texts(d.includes),
  excludes: texts(d.excludes),
  popular: !!d.popular,
  fastTrack: d.fastTrack ?? undefined,
})

export const getTickets = cache(async (lang: Lang = 'en') => (await find('tickets', lang, { depth: 0 })).map(mapTicket))
export const getExtras = cache(async (lang: Lang = 'en') =>
  (await find('extras', lang)).map(
    (d): Extra => ({ id: d.code, name: d.name, note: d.note ?? '', price: d.price, image: need(d.image), needsLaneSlot: !!d.needsLaneSlot }),
  ),
)
export const getBowlRates = cache(async (lang: Lang = 'en') => ((await global('bowling', lang)).rates ?? []).map((r: Doc) => ({ item: r.item ?? '', price: r.price ?? '' })) as { item: string; price: string }[])
export const getLaneTimes = cache(async () => ((await global('bowling', 'en')).laneTimes ?? []).map((r: Doc) => r.time).filter(Boolean) as string[])

/** Everything checkout needs to price a cart. */
export const getCatalog = cache(async (lang: Lang) => {
  const [tickets, extras, laneTimes] = await Promise.all([getTickets(lang), getExtras(lang), getLaneTimes()])
  return { tickets, extras, laneTimes }
})

/* ------------------------------------------------------------------ */
/*  The park                                                           */
/* ------------------------------------------------------------------ */

export type WorldDoc = World & { layout: Page['layout'] }
const mapWorld = (d: Doc): WorldDoc => ({
  key: d.key,
  slug: d.slug,
  name: d.name,
  kicker: d.kicker ?? '',
  pitch: d.pitch ?? '',
  lede: d.lede ?? '',
  hero: toMedia(d.hero),
  card: { image: toMedia(d.card?.image), blurb: d.card?.blurb ?? '', priceLine: d.card?.priceLine ?? '' },
  cta: linkOf(d.cta) ?? { label: 'Buy tickets', href: '/book' },
  tabCta: { label: d.tabCta?.label ?? 'Buy tickets', sub: d.tabCta?.sub ?? '', href: d.tabCta?.href ?? '/book' },
  facts: (d.facts ?? []).map((f: Doc) => ({ k: f.k ?? '', v: f.v ?? '' })),
  ridesTitle: d.ridesTitle ?? undefined,
  comingSoon: !!d.comingSoon,
  layout: d.layout ?? [],
})

export const getWorlds = cache(async (lang: Lang = 'en') => (await find('worlds', lang, { depth: 2 })).map(mapWorld))
export async function getWorld(slug: WorldSlug, lang: Lang = 'en') {
  return (await getWorlds(lang)).find((w) => w.slug === slug)
}
export const getRides = cache(async (world: WorldKey, lang: Lang = 'en') =>
  (await find('rides', lang, { where: { world: { equals: world } } })).map(
    (d): Ride => ({ name: d.name, slug: d.slug, world: d.world, kind: d.kind, line: d.line ?? '', image: toMedia(d.image), access: d.access, status: d.status ?? 'open' }),
  ),
)
export async function getSnowPlans() {
  return snowPlans
}

export const getFaqs = cache(async (lang: Lang = 'en') => (await find('faqs', lang, { depth: 0 })).map((d): Faq & { id: string } => ({ id: String(d.id), q: d.q, a: d.a })))
const mapCrew = (d: Doc): Crew => ({
  id: d.code,
  label: d.label,
  title: d.title ?? '',
  image: need(d.image),
  ticket: d.ticket ?? '',
  cta: linkOf(d.cta) ?? { label: 'Buy tickets', href: '/book' },
  steps: (d.steps ?? []).map((s: Doc) => ({ time: s.time ?? '', what: s.what ?? '' })),
})
export const getCrews = cache(async (lang: Lang = 'en') => (await find('crews', lang)).map(mapCrew))
export const getMoments = cache(async (lang: Lang = 'en') =>
  (await find('moments', lang, { where: { status: { equals: 'approved' } } })).map(
    (d): Moment => ({ world: d.world, image: need(d.image), handle: d.handle, caption: d.caption ?? '', ride: d.ride ?? '', tall: !!d.tall }),
  ),
)
export const getOccasions = cache(async (lang: Lang = 'en') =>
  (await find('occasions', lang)).map((d): Occasion => ({ id: d.code, label: d.label, title: d.title ?? '', pitch: d.pitch ?? '', points: texts(d.points), image: need(d.image) })),
)
export const getVenues = cache(async (lang: Lang = 'en') =>
  (await find('venues', lang)).map((d): Venue => ({ name: d.name, description: d.description ?? '', capacity: d.capacity ?? '', image: need(d.image) })),
)

const visit = (lang: Lang) => global('visit', lang)
export async function getFood(lang: Lang = 'en'): Promise<FoodOutlet[]> {
  return ((await visit(lang)).food ?? []).map((f: Doc) => ({ name: f.name ?? '', where: f.where ?? '', blurb: f.blurb ?? '', tone: f.tone ?? 'neutral' }))
}
export async function getTips(lang: Lang = 'en'): Promise<Tip[]> {
  return ((await visit(lang)).tips ?? []).map((f: Doc) => ({ title: f.title ?? '', body: f.body ?? '' }))
}
export async function getRoutes(lang: Lang = 'en'): Promise<Route[]> {
  return ((await visit(lang)).routes ?? []).map((f: Doc) => ({ title: f.title ?? '', body: f.body ?? '' }))
}
export async function getMapPdf(lang: Lang = 'en') {
  const m = (await visit(lang)).mapPdf as MediaDoc | undefined
  return m?.url ?? null
}

/* ------------------------------------------------------------------ */
/*  Campaigns                                                          */
/* ------------------------------------------------------------------ */

export type OfferItem = Offer & { slug: string; image?: Media; validFrom?: string; validTo?: string; promoCode?: string; showOnHome: boolean; hasLanding: boolean }
const mapOffer = (d: Doc): OfferItem => ({
  name: d.name,
  slug: d.slug,
  tag: d.tag ?? '',
  category: d.category ?? 'season',
  deal: d.deal,
  terms: d.terms ?? '',
  status: d.status ?? 'Live',
  theme: d.theme ?? 'dry',
  cta: linkOf(d.cta) ?? { label: 'Buy tickets', href: '/book' },
  image: toMedia(d.image),
  validFrom: d.validFrom ?? undefined,
  validTo: d.validTo ?? undefined,
  promoCode: d.promoCode ?? undefined,
  showOnHome: !!d.showOnHome,
  hasLanding: d.landing?.enabled !== false,
})

/** Offers people can see: not ended and not past their end date. */
export const getOffers = cache(async (lang: Lang = 'en') => {
  const now = new Date().toISOString()
  return (await find('offers', lang, { versioned: true })).map(mapOffer).filter((o) => o.status !== 'Ended' && (!o.validTo || o.validTo >= now))
})

export type EventItem = ParkEvent & { slug: string; kind: 'seasonal' | 'weekly' | 'closure'; highlight: boolean; cta?: { label: string; href: string }; hasLanding: boolean }
const mapEvent = (d: Doc): EventItem => ({
  name: d.name,
  slug: d.slug,
  when: d.when,
  months: (d.months ?? []).map(Number),
  blurb: d.blurb,
  image: need(d.image),
  tone: d.tone ?? 'dry',
  kind: d.kind ?? 'seasonal',
  highlight: !!d.highlight,
  cta: linkOf(d.cta),
  hasLanding: d.landing?.enabled !== false,
})
export const getEvents = cache(async (lang: Lang = 'en') => (await find('events', lang, { versioned: true })).map(mapEvent))
export async function getHomeHighlights(lang: Lang = 'en') {
  return (await getEvents(lang)).filter((e) => e.highlight)
}

/** One offer or event with its landing page, for /offers/<slug> and /whats-on/<slug>. */
export const getOfferDoc = cache(async (slug: string, lang: Lang) => (await find('offers', lang, { versioned: true, depth: 2, where: { slug: { equals: slug } }, limit: 1 }))[0] as OfferDoc | undefined)
export const getEventDoc = cache(async (slug: string, lang: Lang) => (await find('events', lang, { versioned: true, depth: 2, where: { slug: { equals: slug } }, limit: 1 }))[0] as EventDoc | undefined)
export { mapEvent as eventFromDoc, mapOffer as offerFromDoc }

/* ------------------------------------------------------------------ */
/*  Pages                                                              */
/* ------------------------------------------------------------------ */

export const getPage = cache(async (slug: string, lang: Lang) => (await find('pages', lang, { versioned: true, depth: 2, where: { slug: { equals: slug } }, limit: 1 }))[0] as Page | undefined)
export const getSavedSection = cache(async (id: string, lang: Lang) => (await find('sections', lang, { versioned: true, depth: 2, where: { id: { equals: id } }, limit: 1, sort: 'createdAt' }))[0] as { layout?: Page['layout'] } | undefined)
export const getPageSlugs = cache(async () => (await find('pages', 'en', { versioned: true, depth: 0 })).map((d) => d.slug as string))
/** Pages Google should list: everything except those marked "Hide from search engines". */
export const getIndexablePageSlugs = cache(async () => (await find('pages', 'en', { versioned: true, depth: 0 })).filter((d) => !d.meta?.noindex).map((d) => d.slug as string))

/* ------------------------------------------------------------------ */
/*  Joyride Journal                                                    */
/* ------------------------------------------------------------------ */

const mapPost = (d: Doc): JournalPost => ({
  slug: d.slug,
  title: d.title,
  excerpt: d.excerpt,
  category: d.category,
  published: String(d.published ?? d.createdAt).slice(0, 10),
  updated: d.updatedAt ? String(d.updatedAt).slice(0, 10) : undefined,
  readMins: d.readMins ?? 4,
  hero: need(d.hero),
  keywords: d.keywords ?? [],
  body: (d.body ?? [])
    .map((b: Doc): JournalBlock | null => {
      switch (b.blockType) {
        case 'list':
          return { type: 'list', items: texts(b.items), style: b.style ?? 'tick' }
        case 'cta':
          return { type: 'cta', text: b.text, label: b.label, href: b.href }
        case 'h2':
          return { type: 'h2', text: b.text, anchor: b.anchor ?? undefined }
        case 'quote':
          return { type: 'quote', text: b.text, name: b.name ?? undefined }
        case 'image': {
          const image = toMedia(b.image)
          return image ? { type: 'image', image, caption: b.caption ?? undefined, size: b.size ?? 'column' } : null
        }
        case 'gallery': {
          const images = ((b.images ?? []) as unknown[]).map(toMedia).filter((m): m is NonNullable<typeof m> => !!m)
          return images.length ? { type: 'gallery', images, style: b.style ?? 'grid', caption: b.caption ?? undefined } : null
        }
        case 'video':
          return { type: 'video', source: b.source ?? 'youtube', url: b.url ?? undefined, file: toMedia(b.file)?.url, poster: toMedia(b.poster), caption: b.caption ?? undefined }
        case 'imageText': {
          const image = toMedia(b.image)
          return image ? { type: 'imageText', image, heading: b.heading ?? undefined, text: b.text, side: b.side ?? 'left' } : null
        }
        case 'offer':
          return b.offer ? { type: 'offer', offer: typeof b.offer === 'object' ? b.offer.slug : String(b.offer) } : null
        case 'divider':
          return { type: 'divider' }
        default:
          return { type: b.blockType, text: b.text }
      }
    })
    .filter((b: JournalBlock | null): b is JournalBlock => !!b),
  faqs: (d.faqs ?? []).filter((f: Doc) => f.q).map((f: Doc) => ({ q: f.q, a: f.a ?? '' })),
})

/** Journal posts, newest first. */
export const getPosts = cache(async (lang: Lang = 'en') => (await find('posts', lang, { versioned: true, sort: '-published' })).map(mapPost))
export async function getPost(slug: string, lang: Lang = 'en') {
  return (await getPosts(lang)).find((p) => p.slug === slug)
}

/* ------------------------------------------------------------------ */
/*  What every page needs in the browser                               */
/* ------------------------------------------------------------------ */

export type SiteData = Awaited<ReturnType<typeof getSiteData>>
export const getSiteData = cache(async (lang: Lang) => {
  const [settings, catalog, worlds, header, footer, theme, announcements, integrations, assistant] = await Promise.all([
    getSiteSettings(lang),
    getCatalog(lang),
    getWorlds(lang),
    getHeader(lang),
    getFooter(lang),
    getTheme(),
    getAnnouncements(lang),
    global('integrations', 'en').catch(() => ({}) as Doc),
    global('assistant', lang).catch(() => ({}) as Doc),
  ])
  const mode = (['demo', 'linkout', 'semnox'].includes(process.env.TICKETING_MODE ?? '') ? process.env.TICKETING_MODE : integrations.ticketingMode) ?? 'demo'
  const prices = catalog.tickets.flatMap((tk) => [tk.price, tk.studentPrice ?? tk.price])
  const { defaultOgImage, geo, sameAs, ...publicSettings } = settings
  void defaultOgImage
  void geo
  void sameAs
  return {
    settings: publicSettings,
    catalog,
    worlds: worlds.map((w) => ({ slug: w.slug, key: w.key, name: w.name, tabCta: w.tabCta })),
    header,
    footer,
    brand: { logo: theme.logo, logoFooter: theme.logoFooter ?? theme.logo, logoHeight: theme.logoHeight },
    assistant: {
      enabled: assistant.enabled !== false,
      provider: (assistant.provider ?? 'faq') as 'faq' | 'ai' | 'embed',
      name: assistant.name || 'Nicco Park helper',
      greeting: assistant.greeting || 'Hi! Ask me about tickets, timings, rides or offers.',
      suggestions: ((assistant.suggestions ?? []) as Doc[]).map((x) => x.text).filter(Boolean) as string[],
      embedCode: assistant.provider === 'embed' && typeof assistant.embedCode === 'string' ? assistant.embedCode : '',
    },
    // How the final step works: this site's checkout (demo) or the official ticketing site.
    ticketing: { mode: mode as 'demo' | 'linkout' | 'semnox', bookingUrl: typeof integrations.bookingUrl === 'string' && /^https:\/\//.test(integrations.bookingUrl) ? integrations.bookingUrl : 'https://bookings.niccoparks.com' },
    announcements,
    minPrice: prices.length ? Math.min(...prices) : 0,
    whatsapp: whatsappHref(settings),
  }
})
