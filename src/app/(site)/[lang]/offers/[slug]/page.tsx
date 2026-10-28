import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { LayoutBlock } from '@/blocks/types'
import { Landing } from '@/components/landing/Landing'
import { LANGS, type Lang } from '@/i18n/config'
import { chooseVariant } from '@/lib/ab'
import { getOfferDoc, getOffers, getT, offerFromDoc, toMedia } from '@/lib/cms'
import { alternates, pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ lang: string; slug: string }>; searchParams: Promise<{ v?: string }> }
const STATIC = process.env.NEXT_PUBLIC_STATIC === '1'

/** Campaign landing page for one offer: /<lang>/offers/<slug> (add ?v=b to force a variant). */
export async function generateStaticParams() {
  const offers = await getOffers('en')
  return LANGS.flatMap((lang) => offers.filter((o) => o.hasLanding).map((o) => ({ lang, slug: o.slug })))
}
export const dynamicParams = true

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const [t, doc] = await Promise.all([getT(lang as Lang), getOfferDoc(slug, lang as Lang)])
  if (!doc) return {}
  return {
    alternates: alternates(`/offers/${slug}`, lang as Lang),
    title: doc.meta?.title || `${t(doc.name)} · ${t(doc.deal)}`,
    description: doc.meta?.description || t(doc.terms ?? ''),
    ...pageMetadata(doc.meta?.image ? doc.meta : { ...doc.meta, image: doc.image }),
  }
}

const FALLBACK: LayoutBlock[] = [
  { blockType: 'ticketCards', eyebrow: 'Tickets', heading: "Three tickets. That's it.", intro: 'Prices include taxes. Children under 80 cm go free.', tone: 'cream' },
  { blockType: 'faq', heading: 'Good to know' },
]

export default async function OfferLanding({ params, searchParams }: Props) {
  const { lang, slug } = await params
  const doc = await getOfferDoc(slug, lang as Lang)
  if (!doc || doc.landing?.enabled === false) notFound()
  const offer = offerFromDoc(doc as never)
  const campaign = `offer:${slug}`
  const variants = (doc.landing?.variants ?? []).map((v) => ({ ...v, key: v.key || 'a' }))
  const forced = STATIC ? null : (await searchParams).v
  const v = (await chooseVariant(variants, campaign, forced)) ?? { key: 'a', headline: offer.name, subhead: offer.terms }
  return (
    <Landing
      lang={lang as Lang}
      campaign={campaign}
      variantCount={variants.length}
      variant={{
        key: v.key,
        headline: v.headline,
        subhead: v.subhead ?? undefined,
        image: toMedia('image' in v ? v.image : undefined) ?? offer.image,
        tone: ('tone' in v ? v.tone : undefined) ?? offer.theme,
        ctaLabel: ('ctaLabel' in v ? v.ctaLabel : undefined) ?? undefined,
        ctaHref: ('ctaHref' in v ? v.ctaHref : undefined) ?? undefined,
      }}
      kicker={offer.tag}
      deal={offer.deal}
      terms={offer.terms}
      validTo={offer.validTo}
      promoCode={offer.promoCode}
      cta={offer.cta}
      blocks={doc.landing?.layout}
      fallback={FALLBACK}
    />
  )
}
