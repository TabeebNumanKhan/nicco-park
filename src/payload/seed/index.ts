/**
 * First-run content for the CMS.
 *
 * Loads everything the site showed before the CMS existed (src/content/*)
 * into Payload, in English, Bengali and Hindi (from src/i18n/messages), so a
 * fresh database gives exactly the same website. Runs automatically the first
 * time the app starts with an empty database (see payload.config.ts), or by
 * hand with `pnpm seed`.
 *
 * Safe to re-run: it stops if the home page already exists. Use
 * `pnpm seed --fresh` to wipe the CMS database and start again.
 */
import fs from 'node:fs'
import path from 'node:path'
import type { Field, Payload } from 'payload'
import { crews, events, faqs, food, heroSlides, homeHighlights, moments, occasions, offers, routes, tips, venues } from '../../content/editorial'
import { journal } from '../../content/journal'
import type { Media as M } from '../../content/types'
import { siteSettings } from '../../content/site'
import { bowlRates, extras, laneTimes, tickets } from '../../content/tickets'
import { rides, worlds } from '../../content/worlds'
import bnJson from '../../i18n/messages/bn.json'
import hiJson from '../../i18n/messages/hi.json'
import { aboutLayout, defaultFooter, defaultHeader, eventSlug, homeLayout, offerSlug, showcaseLayout, TICKER } from './defaults'

type Dict = Record<string, string>
const DICTS: { locale: 'bn' | 'hi'; dict: Dict }[] = [
  { locale: 'bn', dict: bnJson as Dict },
  { locale: 'hi', dict: hiJson as Dict },
]
const CTX = { disableRevalidate: true, skipAudit: true }

/* ------------------------------------------------------------------ */
/*  Translating a document into bn/hi using the field config          */
/* ------------------------------------------------------------------ */

type AnyObj = Record<string, unknown>

/** Copy of `data` where every localized text field is swapped for its dictionary entry. */
function translate(fields: Field[], data: unknown, dict: Dict): unknown {
  if (!data || typeof data !== 'object') return data
  const src = data as AnyObj
  let out: AnyObj = { ...src }
  for (const f of fields) {
    if (f.type === 'tabs') {
      for (const tab of f.tabs) {
        if ('name' in tab && tab.name) out[tab.name] = translate(tab.fields, src[tab.name], dict)
        else out = { ...out, ...(translate(tab.fields, out, dict) as AnyObj) }
      }
      continue
    }
    if (f.type === 'row' || f.type === 'collapsible') {
      out = { ...out, ...(translate(f.fields, out, dict) as AnyObj) }
      continue
    }
    if (!('name' in f) || !f.name) continue
    const v = src[f.name]
    if (v == null) continue
    if (f.type === 'group') out[f.name] = translate(f.fields, v, dict)
    else if (f.type === 'array' && Array.isArray(v)) out[f.name] = v.map((row) => translate(f.fields, row, dict))
    else if (f.type === 'blocks' && Array.isArray(v))
      out[f.name] = v.map((row: AnyObj) => {
        const block = (f.blocks ?? []).find((b) => b.slug === row.blockType)
        return block ? translate(block.fields, row, dict) : row
      })
    else if ((f.type === 'text' || f.type === 'textarea') && f.localized && typeof v === 'string') out[f.name] = dict[v] ?? v
  }
  return out
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export async function seed(payload: Payload, opts: { log?: (m: string) => void } = {}) {
  const log = opts.log ?? ((m: string) => payload.logger.info(`[seed] ${m}`))
  const existing = await payload.count({ collection: 'pages', where: { slug: { equals: 'home' } } })
  if (existing.totalDocs > 0) {
    log('home page already exists — nothing to do')
    return
  }
  const started = Date.now()
  const imagesDir = path.resolve(process.cwd(), 'public/images')

  /* Media: one document per photo, created on first use. */
  const mediaIds = new Map<string, number | string>()
  async function mediaId(m?: M | null) {
    if (!m?.url) return null
    const file = m.url.split('/').pop() as string
    if (mediaIds.has(file)) return mediaIds.get(file)!
    const filePath = path.join(imagesDir, file)
    if (!fs.existsSync(filePath)) return null
    const doc = await payload.create({ collection: 'media', data: { alt: m.alt }, filePath, context: CTX })
    for (const { locale, dict } of DICTS) {
      if (dict[m.alt]) await payload.update({ collection: 'media', id: doc.id, locale, data: { alt: dict[m.alt] }, context: CTX })
    }
    mediaIds.set(file, doc.id)
    return doc.id
  }

  /** Create in English, then add the Bengali and Hindi versions. */
  async function create(collection: string, data: AnyObj) {
    const coll = payload.collections[collection as 'pages']
    const drafted = !!coll.config.versions?.drafts
    const doc = await payload.create({
      collection: collection as 'pages',
      locale: 'en',
      data: (drafted ? { ...data, _status: 'published' } : data) as never,
      context: CTX,
    })
    const enDoc = await payload.findByID({ collection: collection as 'pages', id: doc.id, locale: 'en', depth: 0, draft: false, context: CTX })
    for (const { locale, dict } of DICTS) {
      const tr = translate(coll.config.fields, enDoc, dict) as AnyObj
      delete tr.id
      delete tr.createdAt
      delete tr.updatedAt
      await payload.update({ collection: collection as 'pages', id: doc.id, locale, data: tr as never, context: CTX })
    }
    return doc
  }

  async function updateGlobal(slug: string, data: AnyObj) {
    const g = payload.globals.config.find((x) => x.slug === slug)!
    const drafted = !!(g.versions as { drafts?: unknown } | undefined)?.drafts
    await payload.updateGlobal({ slug: slug as 'header', locale: 'en', data: (drafted ? { ...data, _status: 'published' } : data) as never, context: CTX })
    const enDoc = await payload.findGlobal({ slug: slug as 'header', locale: 'en', depth: 0, context: CTX })
    for (const { locale, dict } of DICTS) {
      const tr = translate(g.fields, enDoc, dict) as AnyObj
      delete tr.id
      delete tr.createdAt
      delete tr.updatedAt
      delete tr.globalType
      await payload.updateGlobal({ slug: slug as 'header', locale, data: (drafted ? { ...tr, _status: 'published' } : tr) as never, context: CTX })
    }
  }

  const link = (l?: { label: string; href: string } | null) => (l ? { label: l.label, href: l.href } : undefined)

  /* ------------------------------------------------------------------ */
  /*  Products                                                           */
  /* ------------------------------------------------------------------ */
  log('tickets and add-ons')
  const ticketIds: Record<string, number | string> = {}
  for (const [i, tk] of tickets.entries()) {
    const doc = await create('tickets', {
      code: tk.id,
      popular: !!tk.popular,
      name: tk.name,
      shortName: tk.shortName,
      price: tk.price,
      studentPrice: tk.studentPrice,
      funFestPrice: tk.funFestPrice,
      summary: tk.summary,
      description: tk.description,
      includes: tk.includes.map((text) => ({ text })),
      excludes: tk.excludes.map((text) => ({ text })),
      fastTrack: tk.fastTrack,
      order: i,
    })
    ticketIds[tk.id] = doc.id
  }
  for (const [i, x] of extras.entries()) {
    await create('extras', { code: x.id, price: x.price, name: x.name, note: x.note, image: await mediaId(x.image), needsLaneSlot: !!x.needsLaneSlot, order: i })
  }

  /* ------------------------------------------------------------------ */
  /*  The park                                                           */
  /* ------------------------------------------------------------------ */
  log('worlds and rides')
  for (const [i, w] of worlds.entries()) {
    await create('worlds', {
      key: w.key,
      name: w.name,
      slug: w.slug,
      comingSoon: !!w.comingSoon,
      kicker: w.kicker,
      pitch: w.pitch,
      lede: w.lede,
      hero: await mediaId(w.hero),
      card: { image: await mediaId(w.card.image), blurb: w.card.blurb, priceLine: w.card.priceLine },
      cta: link(w.cta),
      tabCta: w.tabCta,
      facts: w.facts,
      ridesTitle: w.ridesTitle,
      order: i,
    })
  }
  for (const [i, r] of rides.entries()) {
    await create('rides', { name: r.name, slug: r.slug, world: r.world, kind: r.kind, access: r.access, status: r.status ?? 'open', line: r.line, image: await mediaId(r.image), order: i })
  }
  for (const [i, f] of faqs.entries()) await create('faqs', { q: f.q, a: f.a, order: i })
  const crewIds: (number | string)[] = []
  for (const [i, c] of crews.entries()) {
    const doc = await create('crews', { code: c.id, label: c.label, title: c.title, image: await mediaId(c.image), ticket: c.ticket, cta: link(c.cta), steps: c.steps, order: i })
    crewIds.push(doc.id)
  }
  for (const [i, m] of moments.entries()) {
    await create('moments', { handle: m.handle, world: m.world, status: 'approved', image: await mediaId(m.image), caption: m.caption, ride: m.ride, tall: !!m.tall, consent: true, order: i })
  }
  for (const [i, v] of venues.entries()) await create('venues', { name: v.name, description: v.description, capacity: v.capacity, image: await mediaId(v.image), order: i })
  for (const [i, o] of occasions.entries()) {
    await create('occasions', { code: o.id, label: o.label, title: o.title, pitch: o.pitch, points: o.points.map((text) => ({ text })), image: await mediaId(o.image), order: i })
  }

  /* ------------------------------------------------------------------ */
  /*  Campaigns: offers and events, each with a landing page            */
  /* ------------------------------------------------------------------ */
  log('offers and events')
  const OFFER_IMAGE: Record<string, M> = {
    students: { url: '/images/watercoaster.jpg', alt: 'Rider on the Water Coaster' },
    season: { url: '/images/wavepool.jpg', alt: 'The wave pool' },
    id: { url: '/images/eiffel.jpg', alt: 'Eiffel Tower replica' },
    families: { url: '/images/piratesbay.jpg', alt: 'Kids at Pirates Bay' },
  }
  const offerIds: (number | string)[] = []
  for (const [i, o] of offers.entries()) {
    const image = await mediaId(OFFER_IMAGE[o.category])
    const variants = [{ key: 'a', name: 'Offer name as headline', weight: 50, headline: o.name, subhead: o.terms, image, tone: 'coral', ctaLabel: o.cta.label, ctaHref: o.cta.href }]
    // Two live offers start with an A/B test so the dashboard has something to show.
    if (o.name === 'Student offer' || o.name === 'Fun Fest')
      variants.push({ key: 'b', name: 'Deal as headline', weight: 50, headline: o.deal, subhead: o.terms, image, tone: 'yellow', ctaLabel: o.cta.label, ctaHref: o.cta.href })
    const offerDoc = await create('offers', {
      name: o.name,
      slug: offerSlug(o.name),
      tag: o.tag,
      category: o.category,
      status: o.status,
      deal: o.deal,
      terms: o.terms,
      theme: o.theme === 'mint' ? 'dry' : o.theme,
      image,
      cta: link(o.cta),
      showOnHome: o.status === 'Live',
      order: i,
      landing: { enabled: true, goal: o.status === 'Coming' ? 'signup' : 'book', variants, layout: [] },
    })
    offerIds.push((offerDoc as { id: number | string }).id)
  }
  const eventIds: (number | string)[] = []
  const highlightNames = new Set(homeHighlights.map((e) => e.name))
  for (const [i, e] of events.entries()) {
    const image = await mediaId(e.image)
    const kind = e.name.startsWith('Park closed') ? 'closure' : e.when === 'Every weekend' ? 'weekly' : 'seasonal'
    const cta = kind === 'closure' ? { label: 'Plan your visit', href: '/plan' } : e.tone === 'bowl' ? { label: 'Book a lane', href: '/worlds/super-bowl#lane' } : { label: 'Book this', href: '/book' }
    const doc = await create('events', {
      name: e.name,
      slug: eventSlug(e.name),
      when: e.when,
      months: e.months.map(String),
      blurb: e.blurb,
      image,
      tone: e.tone,
      kind,
      highlight: highlightNames.has(e.name),
      cta,
      order: i,
      landing: {
        enabled: kind !== 'closure',
        goal: 'book',
        variants: [{ key: 'a', name: 'Default', weight: 100, headline: e.name, subhead: e.blurb, image, tone: e.tone === 'alert' ? 'coral' : e.tone, ctaLabel: cta.label, ctaHref: cta.href }],
        layout: [],
      },
    })
    eventIds.push(doc.id)
  }

  /* ------------------------------------------------------------------ */
  /*  Joyride Journal                                                    */
  /* ------------------------------------------------------------------ */
  log('journal posts')
  for (const p of journal) {
    await create('posts', {
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      category: p.category,
      published: new Date(p.published + 'T09:00:00+05:30').toISOString(),
      readMins: p.readMins,
      hero: await mediaId(p.hero),
      keywords: p.keywords,
      body: p.body.map((b) => {
        if (b.type === 'list') return { blockType: 'list', items: b.items.map((text) => ({ text })) }
        if (b.type === 'cta') return { blockType: 'cta', text: b.text, label: b.label, href: b.href }
        // Sub-headings get jump links, so posts show "On this page" (and Google can link to a part).
        if (b.type === 'h2') return { blockType: 'h2', text: b.text, anchor: b.text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 40) }
        return { blockType: b.type, text: 'text' in b ? b.text : '' }
      }),
      faqs: p.faqs,
    })
  }

  /* ------------------------------------------------------------------ */
  /*  Globals                                                            */
  /* ------------------------------------------------------------------ */
  log('settings, menus and footer')
  await updateGlobal('site-settings', {
    name: siteSettings.name,
    legalName: siteSettings.legalName,
    tagline: siteSettings.tagline,
    address: siteSettings.address.map((line) => ({ line })),
    phoneDisplay: siteSettings.phone.display,
    phoneTel: siteSettings.phone.tel,
    whatsapp: siteSettings.whatsapp,
    officialChannels: siteSettings.officialChannels,
    todayHours: siteSettings.todayHours,
    hours: siteSettings.hours,
    alerts: siteSettings.alerts,
    stats: siteSettings.stats,
    trust: siteSettings.trust,
    socials: siteSettings.socials,
    defaultOgImage: await mediaId({ url: '/images/hero.jpg', alt: 'Aerial view of the park' }),
  })
  await updateGlobal('header', { ...defaultHeader, announcements: [{ text: 'Fun Fest 15% off', href: '/offers/fun-fest', tone: 'yellow' }, { text: 'QR ticket on WhatsApp in seconds', href: '/book', tone: 'yellow' }] })
  await updateGlobal('footer', defaultFooter)
  await updateGlobal('visit', { routes, food, tips })
  await updateGlobal('theme', { logo: await mediaId({ url: '/images/logo.png', alt: 'Nicco Park logo' }), favicon: await mediaId({ url: '/images/logo.png', alt: 'Nicco Park logo' }) })
  await updateGlobal('assistant', {
    enabled: true,
    provider: 'faq',
    suggestions: [{ text: 'What are the opening hours?' }, { text: 'What does the Parks Package include?' }, { text: 'Do children need a ticket?' }, { text: 'Can I change my date?' }],
  })
  await updateGlobal('bowling', { rates: bowlRates, laneTimes: laneTimes.map((time) => ({ time })) })

  /* ------------------------------------------------------------------ */
  /*  Pages                                                              */
  /* ------------------------------------------------------------------ */
  log('home page')
  const slides = []
  for (const [i, s] of heroSlides.entries()) {
    slides.push({
      tab: s.tab,
      tone: s.tone,
      badge: s.badge,
      eyebrow: s.eyebrow,
      title: s.title,
      body: s.body,
      image: await mediaId(s.image),
      price: s.price,
      cta: link(s.cta),
      secondary: link(s.secondary),
      isBrandHeadline: i === 0,
    })
  }
  const mosaic = []
  for (const f of ['cyclone', 'funnel', 'bowl15', 'crazyriver', 'skydiver', 'raindance']) {
    const id = await mediaId({ url: `/images/${f}.jpg`, alt: f })
    if (id) mosaic.push(id)
  }
  await create('pages', {
    title: 'Home',
    slug: 'home',
    layout: homeLayout({ slides, mosaic, videoPoster: (await mediaId({ url: '/images/hero.jpg', alt: 'Aerial view of the park' })) ?? undefined, ticker: TICKER, highlights: eventIds.filter((_, i) => highlightNames.has(events[i].name)), crews: crewIds }),
    meta: {
      title: 'Nicco Park — Ride. Splash. Strike.',
      description: "Kolkata's biggest day out: the Dry Park, Wet-O-Wild water park, Super Bowl bowling and, soon, Snow Park. Book tickets online from ₹400.",
    },
  })

  await seedAbout(payload, slides[0] as AnyObj, create)

  // An internal page (hidden from Google) showing every kind of section, to copy from.
  const pic = async (f: string, alt: string) => (await mediaId({ url: `/images/${f}.jpg`, alt })) ?? undefined
  await create('pages', {
    title: 'Section library',
    slug: 'section-library',
    meta: { noindex: true, description: 'Every kind of section, for the Nicco Park team to copy from.' },
    layout: showcaseLayout({
      photos: [await pic('family', 'Family at the park'), await pic('cyclone', 'The Cyclone roller coaster'), await pic('wavepool', 'The wave pool'), await pic('bowl22', 'Neon bowling lanes at Super Bowl'), await pic('toytrain', 'The toy train')],
      offer: offerIds[0],
    }),
  })

  /* ------------------------------------------------------------------ */
  /*  Interface text (buttons, labels, small print)                     */
  /* ------------------------------------------------------------------ */
  log('interface text')
  const added = await syncTranslations(payload)

  log(`done in ${Math.round((Date.now() - started) / 1000)}s — ${mediaIds.size} photos, ${added} interface strings`)
}

/**
 * Makes sure every built-in interface string (src/i18n/messages) has a row in
 * Settings → Interface text, so new buttons and labels added by developers
 * become editable. Never overwrites a row editors have changed.
 * Runs on every start; returns how many rows it added.
 */
export async function syncTranslations(payload: Payload) {
  const bn = bnJson as Dict
  const hi = hiJson as Dict
  const keys = Array.from(new Set([...Object.keys(bn), ...Object.keys(hi)]))
  const have = await payload.find({ collection: 'translations', limit: 10000, pagination: false, depth: 0, select: { en: true } as never })
  const known = new Set((have.docs as unknown as { en: string }[]).map((d) => d.en))
  const now = new Date().toISOString()
  const rows = keys.filter((en) => !known.has(en)).map((en) => ({ en, bn: bn[en] ?? null, hi: hi[en] ?? null, updatedAt: now, createdAt: now }))
  if (!rows.length) return 0
  const db = payload.db as unknown as { drizzle?: { insert: (t: unknown) => { values: (v: unknown[]) => Promise<unknown> } }; tables?: Record<string, unknown> }
  if (db.drizzle && db.tables?.translations) {
    for (let i = 0; i < rows.length; i += 100) await db.drizzle.insert(db.tables.translations).values(rows.slice(i, i + 100))
  } else {
    for (const r of rows) await payload.create({ collection: 'translations', data: r, context: CTX })
  }
  return rows.length
}

/** The /about page: an example of a page made only of CMS sections. */
export async function seedAbout(payload: Payload, brandSlide: AnyObj, create?: (c: string, d: AnyObj) => Promise<unknown>) {
  const exists = await payload.count({ collection: 'pages', where: { slug: { equals: 'about' } } })
  if (exists.totalDocs) return
  const slide = { ...brandSlide, tab: 'Nicco Park', title: 'About us', isBrandHeadline: false, price: undefined, badge: undefined, secondary: { label: 'Plan your visit', href: '/plan' }, cta: { label: 'Buy tickets', href: '/book' } }
  delete (slide as AnyObj).id
  const data = { title: 'About us', slug: 'about', layout: aboutLayout({ slide }) }
  if (create) await create('pages', data)
  else await payload.create({ collection: 'pages', data: { ...data, _status: 'published' } as never, context: CTX })
}
