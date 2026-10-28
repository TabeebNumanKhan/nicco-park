# Nicco Park — website

The full, responsive Nicco Park site built from the V2 redesign: Home, Book
(date → tickets → extras), Pay, My Nicco, the four Worlds (Dry Park,
Wet-O-Wild, Super Bowl, Snow Park), Offers & what's on, #NiccoMoments (UGC
upload), What's on (events and a month calendar), Plan your visit, Groups &
events and the **Joyride Journal** (SEO
guides) — in **English, Bengali and Hindi**.

Stack: **Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Payload CMS 3
· pnpm**. Everything on the site — pages and their sections, the home banner,
offers and their ad landing pages with A/B tests, events, prices, menus and
every button label in all three languages — is edited in the CMS at
**`/admin`**, with live preview. Bookings, gate scans, campaign results and
leads go to a separate operations database, shown at **`/admin/ops`**.
**How to use the CMS: [`docs/CMS.md`](docs/CMS.md).**

## Run it

You need **Node.js 22 or newer** and **pnpm** (`npm i -g pnpm` if you don't have it).

```bash
cd NiccoPark-Site
pnpm install
pnpm dev
```

The first start takes about a minute: it creates the CMS database
(`data/cms.db`), loads all the park's content in three languages, and fills
the operations database with demo bookings. Then:

- **Website:** http://localhost:3000 — it opens the English site at `/en`.
- **CMS:** http://localhost:3000/admin — create your account on the first
  visit (the first account is always an Admin).

 The Bengali
site is at http://localhost:3000/bn and Hindi at http://localhost:3000/hi, or
use the EN · বাংলা · हिन्दी switch in the header. Edits to any file show up
instantly.

> **OneDrive:** if the project sits inside OneDrive, right-click the folder →
> *Always keep on this device*, and keep `node_modules` out of sync if you can.
> OneDrive locking files mid-install is the most common cause of odd
> `pnpm install` errors on Windows.

**See it on your phone:** run `pnpm dev:lan`, then open
`http://<your-laptop-ip>:3000` on a phone connected to the same Wi-Fi
(`ipconfig` on Windows shows the IP, e.g. 192.168.1.23).

Other commands:

| Command | What it does |
| --- | --- |
| `pnpm build` then `pnpm start` | Production build and server |
| `pnpm export` | Static HTML copy in `out/` (for a preview link or any file host) — preview with `npx serve out` |
| `pnpm typecheck` | TypeScript check |
| `pnpm seed:fresh` | Wipe the CMS database and reload the starter content |
| `pnpm ops:demo --reset` | Wipe the operations database and regenerate demo bookings |
| `pnpm generate:types` / `pnpm migrate:create <name>` | After changing CMS fields (developers) |
| `pnpm i18n:check` | Lists every English string that still has no Bengali or Hindi translation |

## Screens and layout

| Screen | Phone (< 768px) | Tablet (768–1023px) | Desktop (1024px +) |
| --- | --- | --- | --- |
| Header | Logo, account, language | + menu button, Buy tickets | Full navigation, Buy tickets |
| Navigation | Bottom bar: Home · Worlds · **Buy tickets** · Plan · More | Menu panel | Header links |
| Booking pages | Own total + continue bar (no bottom bar) | Same | Summary sidebar |

There is only ever one "Buy tickets" on screen.

## Where things live

```
src/
  app/(site)/[lang]/   public pages under /en /bn /hi
    [slug]/            any page built in the CMS (e.g. /en/about)
    offers/[slug]/     offer landing pages (ads, A/B)
    whats-on/[slug]/   event landing pages
    hero-options/      every home-banner style side by side (staff only, not indexed)
  app/(payload)/       the CMS (/admin, /api) and live-preview routes — generated, keep as is
  payload.config.ts    CMS setup: languages, collections, roles, database
  payload/             collections, globals, page sections (blocks), access rules, seed
  blocks/              how each page section renders on the site
  components/hero/     the seven home-banner styles
  ops/                 operations database: orders, scans, campaigns, leads, dashboard data
  proxy.ts             visitor id, ad tags (UTM) and A/B variant cookies
  i18n/                languages: config, t(), and messages/bn.json + hi.json
  components/          chrome (header, tab bar, footer), booking, landing, cms …
  content/             the starter content the CMS is filled with on first run
  lib/
    cms.ts             the ONE file pages read content through (CMS Local API)
    booking/           cart, pricing, live API provider, demo provider, Semnox stub
  styles/globals.css   colour tokens, type, helpers
data/                  cms.db and ops.db (created on first run, not in git)
public/media/          photos uploaded to the CMS
```

## Change content

Use the CMS at http://localhost:3000/admin — see [`docs/CMS.md`](docs/CMS.md)
for the everyday jobs. The quickest way to edit is the **visual editor**
(http://localhost:3000/admin/editor): sections on the left, the real page in
the middle at phone, tablet or desktop size, settings on the right — like
Shopify. Changes save as drafts while you type; **Publish** puts them live.

Also in the admin menu: **Leads inbox** (every enquiry, by day, with
filters and Excel export) and the **Operations dashboard**.

## Languages

Every page exists at `/en/…`, `/bn/…` and `/hi/…`. Copy is written once, in
English, and translated through two dictionaries keyed by the English text:
`src/i18n/messages/bn.json` and `hi.json`.

- **Fix a translation:** in the CMS, Settings → Interface text (buttons and
  labels), or switch a document's Locale to বাংলা / हिन्दी (page content).
  Developers can also edit `bn.json` / `hi.json`; CMS edits win.
- **Add or change English copy:** add the new sentence to both files too.
  Anything missing simply shows in English, and `pnpm i18n:check` lists it.
- Dates and weekday names (the date picker, "Tomorrow", "Sat") come out in
  the right language automatically; numbers and prices stay in 0–9 digits.

## Joyride Journal (blog)

Guides at `/en/journal` written for search: best time to visit, ticket
prices, Wet-O-Wild first-timers, things to do with kids, school trips and
bowling. Each post has its own title and description, `BlogPosting` +
`FAQPage` structured data (so answers can show directly in Google), and
links back to booking. Write or edit posts in the visual editor (Journal
posts): paragraphs, sub-headings, photos, galleries, videos, quotes and
offer cards, with an SEO check and a Google preview. Posts appear on the
Journal page, the home page teaser and the sitemap.

Before launch, set `NEXT_PUBLIC_SITE_URL` to the real domain (canonical URLs,
hreflang and the sitemap use it) and submit `/sitemap.xml` in Google Search
Console.

## Keep building in Claude Code

Open this folder in Claude Code (the Claude desktop app's Code tab, the VS
Code extension, or `claude` in a terminal inside the folder). `CLAUDE.md`
at the root tells it how the project is put together, the language rules and
the commands to check its work, so you can ask for changes directly.

## Demo-only parts (to wire before launch)

- **Payment** is simulated: orders are priced on the server, saved to the
  operations database with a QR ticket and appear on the dashboard, but no
  money is taken. Connect the payment gateway and Semnox
  (`src/ops/semnox.ts` is the server-side adapter) before launch.
- **Operations data** on `/admin/ops` is generated demo data until real
  bookings arrive. To start clean: stop the app, set `OPS_DEMO_DATA=0` in
  `.env` and delete `data/ops.db`.
- **Capacity** per day uses defaults (4,000 weekdays, 6,000 weekends) until
  Semnox supplies the real numbers.
- **My Nicco** shows your latest booking from this browser, otherwise a sample account.
- **UGC upload** on #NiccoMoments doesn't upload yet (approval in the CMS works).
- **Translations** were drafted for the demo and should be read by a native
  Bengali and a native Hindi speaker at the park before launch.
- **To confirm with Nicco Park:** WhatsApp Business number (Site settings;
  links fall back to the toll-free number), Annual Fun Ticket price, Royal
  Courtyard capacity, the real park map PDF, and higher-resolution photos
  (current ones are the sizes published on niccoparks.com).
- **Hosting:** see "Production" at the end of `docs/CMS.md`.
