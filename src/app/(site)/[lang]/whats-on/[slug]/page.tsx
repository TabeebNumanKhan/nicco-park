import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { LayoutBlock } from '@/blocks/types'
import { Landing } from '@/components/landing/Landing'
import { LANGS, type Lang } from '@/i18n/config'
import { chooseVariant } from '@/lib/ab'
import { eventFromDoc, getEventDoc, getEvents, getSiteSettings, getT, toMedia } from '@/lib/cms'
import { absUrl, alternates, jsonLd, pageMetadata, SITE_URL } from '@/lib/seo'

type Props = { params: Promise<{ lang: string; slug: string }>; searchParams: Promise<{ v?: string }> }
const STATIC = process.env.NEXT_PUBLIC_STATIC === '1'

/** Landing page for one event or season: /<lang>/whats-on/<slug>. */
export async function generateStaticParams() {
  const events = await getEvents('en')
  return LANGS.flatMap((lang) => events.filter((e) => e.hasLanding).map((e) => ({ lang, slug: e.slug })))
}
export const dynamicParams = true

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const [t, doc] = await Promise.all([getT(lang as Lang), getEventDoc(slug, lang as Lang)])
  if (!doc) return {}
  return {
    alternates: alternates(`/whats-on/${slug}`, lang as Lang),
    title: doc.meta?.title || `${t(doc.name)} · ${t(doc.when)}`,
    description: doc.meta?.description || t(doc.blurb),
    ...pageMetadata(doc.meta?.image ? doc.meta : { ...doc.meta, image: doc.image }),
  }
}

const FALLBACK: LayoutBlock[] = [
  { blockType: 'ticketCards', eyebrow: 'Tickets', heading: "Three tickets. That's it.", intro: 'Prices include taxes. Children under 80 cm go free.', tone: 'cream' },
  { blockType: 'eventsRail', eyebrow: "What's on", heading: 'Coming up at Nicco', tone: 'wet' },
]

export default async function EventLanding({ params, searchParams }: Props) {
  const { lang, slug } = await params
  const doc = await getEventDoc(slug, lang as Lang)
  if (!doc || doc.landing?.enabled === false) notFound()
  const event = eventFromDoc(doc as never)
  const campaign = `event:${slug}`
  const variants = (doc.landing?.variants ?? []).map((v) => ({ ...v, key: v.key || 'a' }))
  const forced = STATIC ? null : (await searchParams).v
  const v = (await chooseVariant(variants, campaign, forced)) ?? { key: 'a', headline: event.name, subhead: event.blurb }
  const cta = event.cta ?? { label: 'Book your date', href: '/book' }
  const site = await getSiteSettings(lang as Lang)
  const ld =
    doc.startDate &&
    jsonLd({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: doc.name,
      description: doc.blurb,
      startDate: doc.startDate,
      endDate: doc.endDate ?? doc.startDate,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      image: event.image ? [SITE_URL + event.image.url] : undefined,
      url: absUrl(`/whats-on/${slug}`, lang as Lang),
      location: { '@type': 'Place', name: site.name, address: site.address.join(', ') },
      organizer: { '@type': 'Organization', name: site.legalName || site.name, url: SITE_URL },
    })
  return (
    <>
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={ld} />}
      <Landing
        lang={lang as Lang}
        campaign={campaign}
        variantCount={variants.length}
        variant={{
          key: v.key,
          headline: v.headline,
          subhead: v.subhead ?? undefined,
          image: toMedia('image' in v ? v.image : undefined) ?? event.image,
          tone: ('tone' in v ? v.tone : undefined) ?? (event.tone === 'alert' ? 'coral' : event.tone),
          ctaLabel: ('ctaLabel' in v ? v.ctaLabel : undefined) ?? undefined,
          ctaHref: ('ctaHref' in v ? v.ctaHref : undefined) ?? undefined,
        }}
        kicker="What's on"
        when={event.when}
        cta={cta}
        blocks={doc.landing?.layout}
        fallback={FALLBACK}
      />
    </>
  )
}
