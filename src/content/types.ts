/**
 * Content types for the Nicco Park site.
 *
 * The shapes components work with. `src/lib/cms.ts` reads Payload CMS and
 * maps each document into one of these, so components never depend on the
 * CMS's raw format. The data files next to this one are only the starter
 * content loaded into an empty CMS (src/payload/seed).
 */

/** Payload `media` collection (upload). */
export type Media = {
  url: string
  alt: string
  width?: number
  height?: number
}

export type WorldSlug = 'dry-park' | 'wet-o-wild' | 'super-bowl' | 'snow-park'
export type WorldKey = 'dry' | 'wet' | 'bowl' | 'snow'

/** Payload global `site-settings`. */
export type SiteSettings = {
  name: string
  legalName: string
  tagline: string
  address: string[]
  phone: { display: string; tel: string }
  whatsapp: string
  hours: { label: string; value: string; tone?: 'dry' | 'wet' | 'bowl' | 'neutral' }[]
  todayHours: string
  alerts: { title: string; detail: string; href?: string }[]
  socials: { label: 'Instagram' | 'Facebook' | 'YouTube' | 'X'; href: string }[]
  stats: { value: string; label: string }[]
  trust: { label: string; icon: 'shield' | 'star' | 'ban' }[]
  officialChannels: string
}

/** Payload collection `tickets`. */
export type Ticket = {
  id: 'dry' | 'meal' | 'pkg'
  name: string
  shortName: string
  price: number
  studentPrice?: number
  funFestPrice?: number
  summary: string
  description: string
  includes: string[]
  excludes: string[]
  popular?: boolean
  fastTrack?: string
}

/** Payload collection `extras` (add-ons sold in the same cart). */
export type Extra = {
  id: 'bowl' | 'pool' | 'meal'
  name: string
  note: string
  price: number
  image: Media
  needsLaneSlot?: boolean
}

export type RideKind = 'thrill' | 'family' | 'little' | 'sights'

/** Payload collection `rides`. */
export type Ride = {
  name: string
  slug: string
  world: WorldKey
  kind: RideKind
  line: string
  image?: Media
  access: 'day' | 'package' | 'pay'
  status?: 'open' | 'maintenance'
}

/** Payload collection `worlds`. */
export type World = {
  key: WorldKey
  slug: WorldSlug
  name: string
  kicker: string
  pitch: string
  lede: string
  hero?: Media
  card: { image?: Media; blurb: string; priceLine: string }
  cta: { label: string; href: string }
  tabCta: { label: string; sub: string; href: string }
  facts: { k: string; v: string }[]
  ridesTitle?: string
  comingSoon?: boolean
}

/** Colour names a section or card can use (CMS "tone" fields). */
export type Tone = 'white' | 'cream' | 'yellow' | 'ink' | 'coral' | 'dry' | 'wet' | 'bowl' | 'snow' | 'lilac' | 'mint'

/** Payload collection `offers`. */
export type Offer = {
  name: string
  tag: string
  category: 'families' | 'students' | 'id' | 'season'
  deal: string
  terms: string
  status: 'Live' | 'Always' | 'Coming' | 'Ended'
  theme: Tone
  cta: { label: string; href: string }
  /** Landing page address, /offers/<slug>, when the offer has one. */
  slug?: string
  hasLanding?: boolean
}

/** Payload collection `events` (the calendar). */
export type ParkEvent = {
  months: number[]
  when: string
  name: string
  blurb: string
  image: Media
  tone: 'alert' | 'dry' | 'wet' | 'bowl'
  /** Landing page address, /whats-on/<slug>, when the event has one. */
  slug?: string
  hasLanding?: boolean
  cta?: { label: string; href: string }
}

/** Payload collection `venues`. */
export type Venue = { name: string; description: string; capacity: string; image: Media }

/** Payload collection `occasions` (Groups page tabs). */
export type Occasion = {
  id: string
  label: string
  title: string
  pitch: string
  points: string[]
  image: Media
}

/** Payload collection `moments` (approved UGC). */
export type Moment = {
  world: Exclude<WorldKey, 'snow'>
  image: Media
  handle: string
  caption: string
  ride: string
  tall?: boolean
}

/** Payload collection `crews` (Home "Who's coming?"). */
export type Crew = {
  id: string
  label: string
  title: string
  image: Media
  ticket: string
  cta: { label: string; href: string }
  steps: { time: string; what: string }[]
}

export type Faq = { q: string; a: string }
export type FoodOutlet = { name: string; where: string; blurb: string; tone: 'yellow' | 'wet' | 'neutral' | 'bowl' }
export type Tip = { title: string; body: string }
export type Route = { title: string; body: string }
