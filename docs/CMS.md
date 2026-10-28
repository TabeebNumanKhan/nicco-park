# Nicco Park CMS — how it works and how to use it

The website and its content system run as **one app**. The public site is at
`/en`, `/bn`, `/hi`; the CMS is at **`/admin`** (Payload CMS 3). Bookings,
gate scans, campaign results and leads live in a **separate operations
database**, shown at **`/admin/ops`**.

```
             ┌──────────────── one Next.js app ────────────────┐
 visitors →  │  public site (/en /bn /hi)   ←─ reads ─┐         │
             │  landing pages + A/B (proxy.ts cookies) │         │
 editors  →  │  /admin  (Payload CMS) ── writes ──→ data/cms.db  │  pages, offers, events, prices, text, photos
             │  /admin/ops  ←─ reads ─┐                          │
 checkout →  │  /api/booking/* ───────┴── writes ──→ data/ops.db │  orders, tickets, scans, events, leads, consent
             └────────────────────────────────────────────────────┘
                                                   ↕ later: Semnox (tickets, capacity, gate)
```

## First run

```powershell
pnpm install
pnpm dev
```

The first start creates `data/cms.db`, loads all the park's content (in
English, Bengali and Hindi) and fills `data/ops.db` with **demo** bookings so
the dashboard has something to show. It takes about a minute. Then open
http://localhost:3000/admin and create the first account — it is always an
**Admin**.

## Everyday jobs

| I want to… | Go to |
| --- | --- |
| Edit any page the Shopify way: sections on the left, the real page in the middle, settings on the right | **🧩 Visual editor** in the menu (`/admin/editor`) |
| Add a page (e.g. a Diwali campaign) | Visual editor → Pages → **New**. Add sections, Publish. It appears at `/en/<web address>` |
| Copy an existing page, offer, event or post and change it | Visual editor → open it → **Duplicate** (a draft "(copy)" with its own address). Also ⋯ → Duplicate in the normal editor |
| Write or edit a journal post, with photos, videos and galleries between paragraphs | Visual editor → **Journal posts**; the **SEO check** shows what to improve |
| Change logo, colours or fonts | Visual editor → **Theme**, or Design → Theme |
| Show a message bar above the header ("Fun Fest 15% off") | Visual editor → **Header & announcement bar** → Announcement bar |
| Upload photos, videos, logos, fonts | **Media library** (folders, focal point, alt text). Or straight from any image field |
| Reuse one section on many pages | Section ⋯ → **Save as saved section**, then Add section → **Saved sections** |
| Put an offer on a page | Add section → **Offer spotlight** (banner, card or strip) or **Offers grid**; in posts, the **Offer card** block |
| Check enquiries and sign-ups every day | **📥 Leads inbox** (`/admin/leads`): by day, filters, status, notes, export to Excel |
| Choose who gets enquiry emails | Integrations → **Email & notifications** |
| Give someone access | Settings → **Staff accounts** (role) or **Roles** (a custom role, area by area) |
| Change a price | Tickets & products → Tickets |
| Close a ride for the day / change hours | Settings → Site settings → **Today** |
| Fix a Bengali or Hindi word on a button | Settings → **Interface text** → search the English |
| Approve visitor photos | The park → #NiccoMoments → set **Approved** (tick "Permission to feature" first) |
| Old web address → new one | Marketing → **Redirects** (made automatically when you change a page's address) |
| Google Analytics, Ads, Meta Pixel, cookie banner | Marketing → **Tracking** |
| See sales, scans, A/B results | **📊 Operations dashboard** (`/admin/ops`) |
| See who changed what | Settings → **Change log** |
| See every kind of section in one place | `/en/section-library` (hidden from Google) |

### Languages

Every text field has an English, বাংলা and हिन्दी version. In the visual
editor use **EN / বাং / हिं** at the top; fields marked with the language
are per-language, and the grey text in an empty field is the English to
translate. In the normal editor switch with **Locale**. A field left empty
in Bengali or Hindi shows the English (or the built-in dictionary
translation) instead.

The **admin itself** can be in English, বাংলা or हिन्दी: each person picks
theirs under **Account → Language**.

### The visual editor (`/admin/editor`)

Like Shopify's theme editor:

- **Left:** the page's sections. Click one to edit it; drag (or Alt + ↑/↓)
  to reorder; the eye hides it without deleting; ⋯ for move, duplicate,
  save as saved section, remove. **+** between sections or **Add section**
  at the bottom opens the section picker (grouped, searchable).
- **Middle:** the real page. **Phone / Tablet / Desktop** sizes and **full
  screen** (Esc to leave). With the **pointer** button on, click any section
  in the preview to select it.
- **Right:** the selected section's settings, including **Design** and
  **Visibility** (below). With nothing selected: **Page settings & SEO**,
  with a Google preview and an SEO check.
- Changes **save as a draft as you type** and show in the preview in about a
  second. **Undo / Redo** (Ctrl+Z / Ctrl+Shift+Z). Nothing is public until
  **Publish**. Editors without publish rights can save drafts only.
- It edits Pages, Offers and Events (sections under the banner), Worlds,
  Journal posts, Saved sections, the Header & announcement bar, the Footer
  and the Theme. **Versions & scheduling ↗** opens the same document in the
  normal editor (version history, schedule publish).

Signed-in staff also see an **Edit this page** button on the website itself,
which opens that page in the visual editor.

### Section settings: Design and Visibility

Every section has, at the bottom of its settings:

- **Design:** heading size (small/H3 → huge/H1) and font (brand or plain),
  text size, text alignment (left / centre / right, where it suits the
  section), a custom background colour (text turns dark or light by
  itself), a border or frame (lines, outlined box, box with bold shadow),
  **space inside top and bottom**, **gap below the section**, and content
  width (narrow, wide, full screen). "As designed" keeps the house style.
- **Visibility:** hide; show on phones only or computers only; show from /
  until a date and time; a jump-link name (#anchor).

Every page keeps a single H1 (the banner's title): "Heading size" changes
how big a heading looks, not its level.

### Photos and videos: what to upload

Every image and video field says what it needs. In short:

| Where | Size | Format |
| --- | --- | --- |
| Banner / slideshow | 1600 × 1000 px or larger (edge-to-edge slideshow: 1920 × 900+) | JPG or WebP, under 500 KB |
| Photo, image + text, cards | 1200 × 900 (4:3) or 1200 × 750 (16:10) | JPG or WebP, under 400 KB |
| Share image (WhatsApp, Facebook, Google) | exactly 1200 × 630 | JPG, under 600 KB |
| Video cover | 1280 × 720 | JPG or WebP, under 300 KB |
| Video | 1280 × 720 or 1920 × 1080, 10–60 s | MP4 (H.264) or WebM, under 20 MB |
| Logo | 400 px wide or more | PNG with transparent background, or SVG |
| Font | — | WOFF2 (best), WOFF or TTF, licensed for web use |

Always fill in the **description (alt text)**: screen readers and Google
read it. Set the **focal point** on a photo so crops keep the important part.

### Roles and permissions

Each person has a role. The four presets, and **Custom role…** for anything
in between (Settings → **Roles**: for each area — pages, campaigns,
journal, park, products, media, design, settings, interface text,
marketing, leads, operations, integrations, staff accounts — choose none,
view, edit, publish or full):

| Role | Can |
| --- | --- |
| Admin | Everything |
| Marketing | Pages, campaigns, journal, media, marketing, leads: publish/full; park, prices, design, settings, text: publish; sees Operations |
| Editor | Write and save **drafts** of pages, posts, campaigns, park, media; cannot publish |
| Operations | Read the CMS; moderate #NiccoMoments; settings (hours, ride status); leads; Operations dashboard |

Accounts for other systems (a CRM, a booking partner) are Staff accounts
with a custom role and **Enable API key** ticked.

## Campaign landing pages and A/B tests

Every offer and event has a page made for ads:

- `/en/offers/student-offer`, `/bn/offers/fun-fest`, `/hi/whats-on/durga-puja-fun-express` …

In **Landing page & A/B** add **variants** (a, b, c…): each has its own
headline, sub-heading, photo, colour and button. Weights split the traffic
(50/50 by default).

- A visitor is put in one variant on their first visit and **keeps it** (a
  random anonymous id in the `np_vid` cookie, set by `src/proxy.ts`).
- To run one ad set per variant, add `?v=b` to that ad's link. It is
  remembered for that visitor.
- Ad tags (`utm_source`, `utm_campaign`, `gclid`, `fbclid`…) are saved
  (first and latest) and attached to any booking made in the next 30 days.
- The page reports **views** and **button clicks**; checkout reports
  **bookings and revenue**, all per variant.
- **Operations → Campaign A/B tests** shows visitors, clicks, orders,
  conversion and whether a variant is better than A with 95% confidence
  (two-proportion z-test). Rule of thumb: wait for about **200 orders per
  variant and a full week** (both weekend days) before choosing a winner,
  then set the loser's weight to 0 or delete it.
- Leave **Sections under the banner** empty and the page shows the ticket
  cards and FAQs (offers) or upcoming events (events) automatically.

## Page sections (blocks)

**Banners:** Hero banner (7 styles) · Offer ticker · Countdown ·
Call-to-action band.
**Tickets & offers:** Ticket cards · Offer spotlight · Offers grid.
**The park:** Worlds grid · Rides list · Events row · Today at the park ·
"Who's coming?" planner · Venues grid · Map & directions.
**Text & media:** Big numbers · Image + text (half and half: photo or video,
side, 50/50 or 60/40, framed or filling its half) · Columns (icons /
features) · **Custom section** (build your own from headings, text, images,
image + text cards, buttons, videos, quotes, lists, in 1–4 columns) · Text ·
Video (upload, YouTube or Vimeo, with cover; or a silent loop) ·
**Slideshow / carousel** · Photo gallery · Visitor quotes · Logo strip.
**Engage:** FAQ · Sign-up / enquiry form · #NiccoMoments wall · Journal
guides · Embed (admins only, safely boxed).
**Layout:** Spacer / divider · Saved section.

Each has a colour ("tone"), its own headings, **Design** and **Visibility**.
Sections that show the park's data (tickets, events, worlds, moments, guides,
offers) pull it from their collections, so a price changed once changes
everywhere. Every section is built mobile first: one column on phones, more
on tablets and computers.

**Journal posts** are made of their own blocks: paragraph, sub-heading
(with a jump link — posts list them in "On this page"), small heading, list
(ticks, numbers, bullets), photo (text width or wrapped), gallery or
slideshow, video, photo beside text, quote, good-to-know box, offer card,
booking prompt, divider. The **SEO check** in the visual editor scores the
post (title and description length, focus phrase, words, sub-headings,
quick answers, links, photo descriptions) and shows the Google result.

### Hero banner styles

| Style | Best for |
| --- | --- |
| Framed photo on colour *(live)* | The park's current small photos — they stay sharp |
| Split: colour panel + photo | Strong, simple message; very readable on phones |
| Offer cards | Several deals at once on a laptop |
| Photo mosaic | No sliding; shows the variety of the park |
| Booking first | Straight to buying: yellow banner, deal card, date picker right under it |
| Full-screen photo | Only with large (1600 px+) professional photos |
| Video background | A silent MP4 under 10 MB; falls back to a slow photo pan |

## Leads, email and the daily summary

- Every form (enquiry, call-back, contact, offers sign-up, waitlist, chat
  hand-off, footer sign-up) goes to the **operations database** and shows
  in the **Leads inbox** (`/admin/leads`), grouped by day (India time).
  Filter by date, kind, status, page or campaign, search, set a status
  (new, contacted, booked/won, not interested, spam), add notes, export to
  Excel (CSV). Spam bots are caught by a hidden field.
- **Integrations → Email & notifications:** the "from" name and address,
  reply-to, and **who receives each kind of message** (several addresses,
  comma-separated). Each new lead is emailed as it arrives; a **summary of
  yesterday** goes to the group-enquiry addresses every morning at 9:00.
  Sending needs a mail server in `.env` (`SMTP_HOST`, `SMTP_USER`,
  `SMTP_PASS`, `EMAIL_FROM`); until then emails are written to the server log.

## Chat assistant

Integrations → **Chat assistant**: a "Questions?" bubble (it appears once a
visitor scrolls). Three modes:

1. **Built-in** (default): answers only from this CMS — FAQs, ticket prices,
   hours, offers, events, address — in the visitor's language. No AI, never
   invents anything.
2. **AI (Claude)**: the same CMS facts are its only knowledge; add tone
   and rules under "Extra guidance". Needs `ANTHROPIC_API_KEY` in `.env`;
   falls back to built-in if unavailable. Limited per visitor.
3. **Another chat service** (Tidio, Intercom, Gupshup, Yellow.ai…): paste
   its embed code (admins only).

Whatever it can't answer goes to WhatsApp or a **call-back request**, which
lands in the Leads inbox.

## SEO, AI search, ads and tracking

- Every page: translated title and description, canonical + hreflang for
  en/bn/hi, Open Graph with `en_IN` / `bn_IN` / `hi_IN`, share image.
- Structured data: Organization, WebSite and AmusementPark (with ticket
  Offers in ₹) on the home page; BlogPosting, FAQPage and BreadcrumbList on
  posts; FAQPage wherever FAQs show; Event on event pages.
- `sitemap.xml` (pages hidden from search are left out), `robots.txt`,
  and **`/llms.txt`** — a factual summary for ChatGPT, Gemini, Claude,
  Perplexity and Meta AI, built from the CMS. **Tracking → Search & AI**
  chooses whether AI assistants may read the site (search only, or also
  training) and holds Google/Bing/Meta verification codes.
- **Tracking:** Google Tag Manager, or GA4 + Google Ads directly, and the
  Meta Pixel. Nothing loads until a visitor accepts the cookie banner
  (Consent Mode v2; "Basic" by default). Events follow GA4's ecommerce
  names: `view_promotion`, `select_promotion`, `begin_checkout`,
  `add_payment_info`, `purchase` (₹, booking id as transaction id),
  `generate_lead`, `video_start`, `share`. Google Ads conversion labels and
  enhanced conversions (phone/email, hashed by Google) are supported;
  **server-side conversions** (GA4 Measurement Protocol, Meta Conversions
  API) can be switched on with the secrets in `.env`.
- Ad click ids (`gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`) and UTM
  tags survive redirects and are credited to bookings. Offers and events
  have **ready-made ad links** (Landing page tab) for Google, Meta,
  WhatsApp, Instagram, SMS, email and posters. Posts and landing pages have
  **share buttons** (WhatsApp first) that tag their links.
- **Redirects:** changing a page's web address adds a 301 automatically;
  add the old site's addresses in Marketing → Redirects.

## Connecting other systems (APIs, webhooks, Semnox)

- **Read content:** `/api/pages`, `/api/offers`, `/api/events`,
  `/api/posts`… (`?locale=bn`). **Write** with an API key (Staff account
  with "Enable API key").
- **Webhooks** (Integrations → Webhooks): we POST `{ event, at, data }` on
  `order.created`, `lead.created`, `content.published`, `content.deleted`,
  signed with `X-Nicco-Signature: sha256=<HMAC>`.
- **Ticketing** (Integrations → Ticketing): **Demo** (this site's checkout,
  no payment), **Send visitors to the booking site** (the last step hands
  over to bookings.niccoparks.com with the date), or **Semnox API**. The
  Semnox adapter (`src/ops/semnox.ts`) covers catalogue, availability, lane
  slots, quote with GST and coupons, hold, confirm, release, booking lookup,
  date change, cancel, and a signed webhook for gate scans. Semnox has no
  public API: ask them for documentation, a UAT site, credentials, product
  IDs, the website channel/POS, webhooks and written permission. The status
  box on that tab shows whether the connection works.

## What is stored where (and why)

The research behind this design: theme parks and ticketing systems
(Semnox, the OCTO standard used by Viator/GetYourGuide, Shopify-style
checkouts) all keep **content** and **transactions** apart, and keep
transactions **append-only and auditable**.

**CMS database (`data/cms.db`)** — things editors change:

- Pages and their sections; offers and events with their landing variants;
  journal posts; worlds, rides, FAQs, day plans, venues, occasions; tickets
  and add-ons with prices; photos (files in `public/media`); interface text;
  site settings, menus, footer, visit info, bowling rates.
- **Versions**: every save of a page, offer, event or post is kept (up to 50)
  — restore from the **Versions** tab. Drafts never reach the public site.
- **Change log**: who created, edited, published or deleted what.

**Operations database (`data/ops.db`)** — things that happen:

| Table | Holds | Notes |
| --- | --- | --- |
| `orders` | one row per booking | **idempotency key** as the id (a double-click never charges twice); money in **paise**; GST 18% included and stored; campaign, variant, UTM first/last touch, language |
| `order_lines` | what was bought | ticket type × qty, student/standard/child-free, add-ons and lane time |
| `tickets` | the QR code(s) | barcode, valid date, issued → redeemed / void |
| `redemptions` | every gate scan | gate, device, ok / rejected, time — this is "how many people actually came" |
| `payments`, `refunds`, `amendments` | money and date changes | never edited in place; changes are new rows |
| `capacity` | sold vs limit per day | drives the green/amber/red calendar |
| `customers`, `consent_log` | name, mobile, WhatsApp opt-in | opt-in is separate from the booking and logged with the notice version (India's DPDP rules) |
| `analytics_events` | page views, clicks, checkout, purchase, leads | per campaign and variant |
| `leads` | group enquiries, sign-ups, call-backs | with consent |
| `promo_redemptions`, `webhook_events` | codes used; payment-gateway callbacks | webhook ids are unique so a retried callback is processed once |

Why separate: the CMS can be restored, re-seeded or edited without ever
touching a booking; personal data stays in one place with its own backups
and access; and when **Semnox** is connected it becomes the system of record
for tickets, capacity and gate scans, while this database keeps the website's
side (campaign attribution, leads, consent) and mirrors Semnox's booking
references.

Before launch: keep orders for at least **6 years** (GST), then anonymise;
never store card numbers or ID numbers (the payment gateway and the gate
check them).

## For developers

| | |
| --- | --- |
| CMS config | `src/payload.config.ts`, collections `src/payload/collections`, globals `src/payload/globals`, blocks `src/payload/blocks` |
| Block renderers | `src/blocks/` (`RenderBlocks.tsx` switches on `blockType`) |
| Banner styles | `src/components/hero/` |
| Content seam | `src/lib/cms.ts` — every page reads through it (Local API, draft-aware) |
| Landing pages / A/B | `src/app/(site)/[lang]/offers/[slug]`, `…/whats-on/[slug]`, `src/lib/ab.ts`, `src/proxy.ts`, `src/lib/attribution.ts` |
| Operations | `src/ops/db.ts` (schema), `src/ops/service.ts` (orders, reports), `src/payload/views/OpsDashboard.tsx` |
| Website API | `src/payload/endpoints.ts` → `/api/booking/*`, `/api/track`, `/api/leads`, `/api/ops/leads*`, `/api/assistant`, `/api/ticketing/*`, `/api/cms/*` |
| First-run content | `src/payload/seed/` (from `src/content/*`) |
| Visual editor | `src/payload/views/VisualEditor.tsx` (server) → `src/payload/editor/` (Editor, Form, pickers, SeoPanel, schema serialiser); preview bridge `src/components/cms/EditorBridge.tsx` |
| Section design / sub-blocks / slideshow / upload hints | `src/payload/blocks/design.ts`; renderers `src/blocks/LayoutBlocks.tsx`, `MoreBlocks.tsx`; CSS "Section design settings" in `globals.css` |
| Leads inbox, email, webhooks | `src/payload/views/LeadsInbox.tsx`, `src/payload/leads/`, `src/payload/notify.ts` |
| Roles | `src/payload/access.ts` (areas × levels, presets, custom roles) |
| Theme, tracking, consent | `src/components/cms/ThemeStyle.tsx`, `src/components/tracking/Tags.tsx`, `src/lib/analytics.ts`, `src/lib/consent-script.ts` |
| SEO / AI | `src/lib/seo.ts`, `src/lib/schema.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/llms.txt/route.ts` |
| Ticketing | `src/ops/ticketing.ts` (modes), `src/ops/semnox.ts` (adapter) |
| Chat assistant | `src/payload/assistant.ts`, `src/components/cms/ChatAssistant.tsx` |

Commands:

```bash
pnpm generate:types        # after changing any collection/field
pnpm migrate:create name   # after changing the database shape — commit the file in src/migrations
pnpm generate:importmap    # after adding an admin component
pnpm seed:fresh          # wipe the CMS database and reload the starter content
pnpm ops:demo --reset      # wipe the operations database and regenerate demo data
```

The schema is always built from `src/migrations` (also in development), and
migrations run automatically on start.

**Production:** SQLite files are fine on a single server with a persistent
disk (back up `data/` nightly). For serverless hosting (Vercel), point
`DATABASE_URL` / `OPS_DATABASE_URL` at **Turso** (libSQL), or switch the CMS
to Postgres with `@payloadcms/db-postgres`; store uploads in S3/R2 with
`@payloadcms/storage-s3`.
