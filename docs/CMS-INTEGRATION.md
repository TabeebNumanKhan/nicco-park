# Moving content to Payload CMS

The site is built so the Mast Studios CMS setup (Payload 3 embedded in
Next.js 16, Supabase Postgres, media on Wasabi via `@payloadcms/storage-s3`)
can be added without touching pages or components.

## The seam

Every page reads content through `src/lib/cms.ts`. Each function returns a
type from `src/content/types.ts`. To switch a function to Payload, replace its
body with a Local API call and keep the return type:

```ts
import { getPayload } from 'payload'
import config from '@payload-config'

export async function getRides(world: WorldKey) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'rides',
    where: { world: { equals: world } },
    sort: 'order',
    depth: 1, // populate `image` as a media doc
  })
  return docs as Ride[]
}
```

Media objects are already shaped like Payload uploads (`{ url, alt, width,
height }`), so `<Img media={…} />` works unchanged.

## Collections and globals

| Type in `types.ts` | Payload | Notes |
| --- | --- | --- |
| `SiteSettings` | global `site-settings` | hours, alerts (ride closures), contact, socials, stats, trust chips |
| `Ticket` | collection `tickets` | price, student / Fun Fest prices, includes / excludes |
| `Extra` | collection `extras` | add-ons sold in the cart |
| `World` | collection `worlds` | slug = route; hero, card, facts, CTAs |
| `Ride` | collection `rides` | relationship → worlds; `status` drives "Closed for maintenance" |
| `Offer` | collection `offers` | `status` Live / Always / Coming; theme colour |
| `ParkEvent` | collection `events` | `months` array feeds the year calendar |
| `Crew` | collection `crews` | Home "Who's coming?" day plans |
| `Moment` | collection `moments` | approved UGC only; uploads land in a `moment-submissions` collection with a review status |
| `Occasion`, `Venue` | collections `occasions`, `venues` | Groups page |
| `Faq`, `FoodOutlet`, `Tip`, `Route` | collections or array fields on a `plan-page` global |
| `HeroSlide` | collection `hero-slides` | ordered home slider; each slide has a CTA |
| `JournalPost` | collection `posts` | Joyride Journal; body blocks (p, h2, list, tip, cta) map to Lexical blocks; `faqs` array feeds FAQPage JSON-LD; drafts on |

**Localisation:** the site already routes every page under `/en`, `/bn` and
`/hi` and translates through `src/i18n/messages/{bn,hi}.json`, keyed by the
English text. When Payload lands, enable `localization` with `en`, `bn`, `hi`,
mark copy fields `localized: true`, and pass the route's `lang` as `locale`
to `payload.find`. Payload then returns translated content directly, so the
`t(item.field)` calls around content fields become pass-throughs (the
dictionary keeps covering UI labels). Seed the Bengali and Hindi locales from
the two JSON files so nothing already translated is lost.

**Forms:** the offers signup, Snow Park waitlist, group enquiry and UGC
upload become Payload collections (`leads`, `waitlist`, `enquiries`,
`moment-submissions`) written from Next.js server actions, with Resend for
the confirmation messages — same pattern as the Mast contact form.

## Booking (Semnox)

Booking is separate from the CMS. `src/lib/booking/types.ts` defines a
`BookingProvider`; the demo uses `mockProvider`. `semnox.ts` maps each call to
the Semnox web store endpoints (`GetProductsWithGroups`, `AddCartProduct`,
`GuestLogin`, `CreateTransactionEstimate`, …). Those calls must run
server-side (route handlers / server actions) so credentials never reach the
browser.
