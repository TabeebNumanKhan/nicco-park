import type { Lang } from '@/i18n/config'
import type { T } from '@/i18n/translate'
import { getSiteSettings, getTickets } from './cms'
import { absUrl, SITE_URL } from './seo'

/**
 * The park as Google and AI assistants should understand it: one
 * Organization, one WebSite and one AmusementPark, linked by @id so every
 * page refers to the same things. Built only from CMS facts (address,
 * phone, ticket prices, official profiles). Prices are INR incl. taxes.
 */
export async function parkSchema(lang: Lang, t: T) {
  const [s, tickets] = await Promise.all([getSiteSettings(lang), getTickets(lang)])
  const org = `${SITE_URL}/#organization`
  const park = `${SITE_URL}/#park`
  const pin = s.address.join(' ').match(/\b\d{3}\s?\d{3}\b/)?.[0]?.replace(/\s/g, '')
  const sameAs = [...s.sameAs, ...s.socials.map((x) => x.href)].filter((u) => /^https:\/\//.test(u))
  const prices = tickets.map((tk) => tk.price).filter((p) => p > 0)
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': org,
      name: s.legalName || 'Nicco Parks & Resorts Ltd',
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      ...(sameAs.length ? { sameAs } : {}),
      contactPoint: s.phone.tel ? [{ '@type': 'ContactPoint', telephone: s.phone.tel, contactType: 'customer service', areaServed: 'IN', availableLanguage: ['English', 'Bengali', 'Hindi'] }] : undefined,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: absUrl('/', lang),
      name: 'Nicco Park',
      inLanguage: lang,
      publisher: { '@id': org },
    },
    {
      '@context': 'https://schema.org',
      '@type': ['AmusementPark', 'TouristAttraction'],
      '@id': park,
      name: s.name || 'Nicco Park',
      description: t(s.tagline),
      url: absUrl('/', lang),
      image: `${SITE_URL}/images/hero.jpg`,
      telephone: s.phone.tel || undefined,
      address: {
        '@type': 'PostalAddress',
        streetAddress: s.address.slice(0, -1).join(', ') || s.address[0],
        addressLocality: 'Kolkata',
        addressRegion: 'West Bengal',
        ...(pin ? { postalCode: pin } : {}),
        addressCountry: 'IN',
      },
      ...(s.geo ? { geo: { '@type': 'GeoCoordinates', latitude: s.geo.lat, longitude: s.geo.lng } } : {}),
      ...(sameAs.length ? { sameAs } : {}),
      publicAccess: true,
      isAccessibleForFree: false,
      ...(prices.length ? { priceRange: `₹${Math.min(...prices)}–₹${Math.max(...prices)}`, currenciesAccepted: 'INR' } : {}),
      parentOrganization: { '@id': org },
      makesOffer: tickets.map((tk) => ({
        '@type': 'Offer',
        name: t(tk.name),
        price: tk.price,
        priceCurrency: 'INR',
        url: absUrl(`/book?ticket=${tk.id}`, lang),
        availability: 'https://schema.org/InStock',
        seller: { '@id': org },
      })),
    },
  ]
}
