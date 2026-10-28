# Nicco Park — website

Read this before changing anything. `README.md` is the human guide; this file
is the working agreement for agents.

## What this is

The public site for Nicco Park (Salt Lake, Kolkata): a Next.js 16 App Router
app with every page in three languages, and **Payload CMS 3 embedded in the
same app** at `/admin` (SQLite via libSQL, `data/cms.db`). Bookings, gate
scans, campaign events and leads live in a **separate operations database**
(`data/ops.db`, `src/ops/`), shown at `/admin/ops`. Payment is simulated
until the gateway and Semnox are wired. The user guide is `docs/CMS.md`.

| Layer | Choice |
|---|---|
| Framework | Next.js 16.3, App Router, React Server Components |
| React | 19 |
| Styling | Tailwind CSS v4 (`@theme inline`) + tokens in `src/styles/globals.css` |
| Icons | lucide-react |
| Fonts | self-hosted in `src/fonts/` (Bricolage Grotesque, Instrument Sans, Hind Siliguri for Bengali, Hind for Devanagari) |
| CMS | Payload 3.90 (`@payloadcms/db-sqlite`, `richtext-lexical`, `live-preview-react`), localized en/bn/hi |
| Package manager | **pnpm** only |
| Node | 22+ |

Next.js 16 differs from older versions you may know: `params` is a
`Promise` and must be awaited, and some APIs changed. Check
`node_modules/next/dist/docs/` before using an API you're not sure about.

## Layout

```
src/
  app/
    (site)/                 public site — its own root layout (html/body, fonts)
      page.tsx              redirect('/en')
      [lang]/               EVERY public page lives here
        layout.tsx          LangProvider(overrides) → SiteDataProvider → CartProvider → chrome
        page.tsx            home = CMS page "home" rendered by RenderBlocks
        [slug]/             any CMS page (/en/about); built-in routes win over it
        offers/[slug]/  whats-on/[slug]/   campaign landing pages with A/B variants
        hero-options/       all banner styles side by side (noindex)
        book/ book/pay/ my-nicco/ offers/ plan/ groups/ moments/ worlds/ whats-on/ journal/
    (payload)/              Payload admin + REST API + /next/preview — generated, don't restructure
    sitemap.ts robots.ts
  payload.config.ts         CMS config (migrations run on start, seed on empty DB)
  payload/
    collections/ globals/ blocks/ fields/   CMS schema
    access.ts               roles: areas × levels (none/view/edit/publish/full), presets + custom roles
    editor/                 the visual editor (/admin/editor): Editor, Form, pickers, SeoPanel, schema serialiser
    leads/ notify.ts        leads inbox UI; emails, webhooks, server-side conversions
    assistant.ts            chat assistant answers (CMS facts only; Claude optional)
    hooks/                  revalidate (whole site on publish/delete), audit log, editors-draft-only
    endpoints.ts            /api/booking/*, /api/track, /api/leads, /api/cms/edit-link, /api/cms/stamp
    seed/                   starter content from src/content + bn/hi dictionaries; syncTranslations
    views/                  OpsDashboard (/admin/ops), LeadsInbox (/admin/leads), VisualEditor (/admin/editor)
    components/             admin branding, Welcome, row labels, StaffFlag
  blocks/                   site renderers for CMS blocks; RenderBlocks switches on blockType
  components/hero/          the 7 banner styles (shared.tsx has the carousel hook)
  components/landing/       Landing + LandingTracker (A/B impressions, clicks)
  components/cms/           PreviewBar (draft mode, live refresh), StaffBar ("Edit this page"), forms
  ops/                      db.ts (schema + UPGRADES), service.ts (orders, leads, reports), demo.ts,
                            ticketing.ts (demo / linkout / semnox), semnox.ts (server-only adapter)
  proxy.ts                  np_vid visitor id, UTM first/last cookies, ?v= variant pin
  lib/
    cms.ts                  the ONLY way pages read content (Local API, locale, draft mode)
    site-data.tsx           CMS data for client components: useSiteData()
    ab.ts attribution.ts    variant choice (server) / attribution + track() (browser)
    booking/                cart, pricing(catalog), api provider, mock provider (static export)
    analytics.ts schema.ts  GA4/Ads/Meta events behind consent; park JSON-LD
  content/                  STARTER CONTENT ONLY (seed). Not read by pages.
  i18n/                     config, translate (makeT + CMS overrides), messages/{bn,hi}.json
scripts/
  export-static.mjs         `pnpm export` → out/ (moves (payload) and proxy aside, patches dynamicParams)
  seed.ts ops-demo.ts       `pnpm seed [--fresh]`, `pnpm ops:demo [--reset]`
docs/CMS.md                 user guide + data model
```

## Rules

### Languages (the thing most likely to go wrong)

1. **Every user-visible string goes through `t()`.** English text is the key;
   `src/i18n/messages/bn.json` and `hi.json` map it to Bengali and Hindi.
   - Client components: `const { lang, t } = useLang()`.
   - Server pages: `const t = makeT((await params).lang as Lang)`.
   - Content fields render as `t(item.name)`, `t(item.blurb)`, etc.
   - Variables use placeholders: `t('Buy {name}', { name })`, never string
     concatenation, so translators can reorder the sentence.
2. **When you add or change English copy, add the translation to BOTH
   `bn.json` and `hi.json` in the same change.** Run `pnpm i18n:check`; it
   must report 0 missing. Missing keys silently show English.
3. Keep brand and ride names in Latin script in translations (Nicco Park,
   Wet-O-Wild, Parks Package, Cyclone…). Keep ₹ amounts, times and `{…}`
   placeholders exactly. Digits stay 0–9 (dates use `-u-nu-latn`).
4. **Internal links use `SiteLink`** (adds `/bn` etc. and handles static
   export). In code that navigates, use `withLang(href, lang)`. Never write a
   bare `<a href="/book">` or `router.push('/book')`.
5. Dates: use the helpers in `src/i18n/translate.ts` (`dateShortL`,
   `dateLongL`, `dateYearL`, `weekdayShort`, `monthShort`…), never
   `toLocaleDateString` or hand-written month arrays.
6. Don't name a local variable `t` (ticket, tip, time) where `t()` is in
   scope — use `tk`, `tip`, `time`. It has caused bugs here.
7. Bengali and Hindi set taller and wider than English. After UI changes,
   check `/bn` and `/hi` at 360 px for overflow and clipped buttons.

### Content and CMS

8. Pages read content only through `src/lib/cms.ts`, always passing `lang`
   (`getOffers(lang)`). Server text: `const t = await getT(lang)` (includes
   CMS "Interface text" edits). Client components get CMS data from
   `useSiteData()` — never import `src/content/*` outside the seed.
9. Don't invent facts (prices, timings, capacities, ride details). Use what
   is in the CMS / `src/content/`. Unknowns are marked `[… to confirm]`.
10. Journal posts quote prices and timings — if prices change, update the
    posts too (search for ₹).
11. **Changing the CMS schema:** edit `src/payload/…`, then
    `pnpm generate:types`, `pnpm migrate:create <name>` (commit the file in
    `src/migrations`), and `pnpm generate:importmap` if you added an admin
    component. `push` is off: the schema only changes through migrations,
    which run on start.
12. A new page section = block config in `src/payload/blocks/index.ts` (or
    `design.ts`) + a `SECTION_INFO` entry (picker category, description,
    icon) + renderer in `src/blocks/` + a `case` in `RenderBlocks.tsx`. It gets
    Design, Visibility and upload size hints automatically. Fields the
    visual editor must show conditionally need `custom.showIf` (functions
    can't reach the browser). Sub-block slugs must not repeat a top-level
    block slug in the same collection (they share table names): prefix them
    (`subImage`). Give every renderer a mobile-first grid and
    `[overflow-wrap:anywhere]` on big headings; text never below 12 px.
13. Public reads filter `_status: published` unless draft mode is on — use
    `find()` in cms.ts with `versioned: true`, never call Payload directly
    from a page.
14. Keep `dynamicParams = true` on `[lang]` and the `[slug]` routes.
    With `false`, `revalidatePath` after a publish makes those pages 404 in
    production. The export script flips it for the static copy only.
15. Personal data (names, mobiles, consent) goes to the operations DB via
    `src/ops/service.ts`, never into a CMS collection.

### UI

16. Mobile first. Phones (<768 px) have the bottom tab bar with the single
    "Buy tickets"; the header shows logo, account and language only. Tablet
    adds a menu; desktop shows full nav. **Only one "Buy tickets" on screen
    at a time.**
17. Colours, type and radii come from the tokens in `globals.css`
    (`bg-ink`, `bg-yellow`, `text-dry`, `bg-wet-soft`, `.display`, `.h2`,
    `.eyebrow`, `.wrap`). Don't add one-off hex colours.
18. Images use `<Img media={…}>` (alt text is translated inside it).
    **The park's own photos are small (480–760 px wide). Never stretch one
    full-screen.** Show it framed near its real size (the hero, Groups,
    world pages and journal posts do this) and, if a big area needs
    filling, use the same photo blurred as a colour wash behind it. Prefer
    Nicco Park photos everywhere; stock is only for things the park has no
    photo of yet (Snow Park).
19b. Colour: section bands use `bg-cream`, `bg-coral`, `bg-lilac`,
    `bg-dry`, the `from-wet to-sea` gradient and `.dots` texture. Yellow is
    reserved for "buy" buttons and price stickers.
19. Every page keeps one `h1`. Content must be readable with JavaScript off
    (filters and tabs only hide things after hydration).
20. Respect `prefers-reduced-motion` (the hero slider and card hovers do).

### SEO

21. Each page's `generateMetadata` returns a translated title/description
    and `alternates: alternates(path, lang)` (canonical + hreflang).
22. JSON-LD goes through `jsonLd()` from `src/lib/seo.ts`, never a raw
    `JSON.stringify` inside `<script>`.
23. New public routes go in `src/app/sitemap.ts`.

## Commands

```bash
pnpm dev            # http://localhost:3000 → /en  (also /bn, /hi)
pnpm dev:lan        # same, reachable from a phone on the same Wi-Fi
pnpm typecheck      # must pass before you finish
pnpm i18n:check     # must report 0 missing for bn and hi
pnpm build          # production build; must pass
pnpm export         # static copy in out/ (preview: npx serve out)
pnpm seed:fresh    # wipe CMS DB and reload starter content
pnpm ops:demo --reset  # wipe ops DB and regenerate demo data
pnpm generate:types && pnpm migrate:create <name>   # after schema changes
```

Windows note: the owner works in PowerShell on Windows and is new to it.
When you give them commands, give PowerShell-ready ones, one per line.

## Definition of done

- `pnpm typecheck`, `pnpm i18n:check` and `pnpm build` pass.
- Checked at 360 px and 1280 px in English **and** Bengali or Hindi.
- New strings translated in both dictionaries.
- No new hard-coded colours; links via `SiteLink` / `withLang`.

## Still demo / to confirm with Nicco Park

- Payment is simulated (orders are real rows in ops.db, no money taken).
  The static export uses `src/lib/booking/mock.ts`. Semnox adapter:
  `src/ops/semnox.ts` (endpoint paths are placeholders until Semnox shares
  docs). Capacity uses defaults until Semnox.
- `/admin/ops` shows generated demo data (`src/ops/demo.ts`) until real orders.
- UGC upload doesn't upload yet. Other forms post to `/api/leads` (Leads inbox).
- Email needs SMTP in `.env`; tracking needs IDs in CMS → Tracking; AI chat
  needs `ANTHROPIC_API_KEY`. Map position (Site settings → geo) to check.
- WhatsApp Business number, Annual Fun Ticket price, Royal Courtyard
  capacity, real park map PDF, production domain (`NEXT_PUBLIC_SITE_URL`).
- Bengali and Hindi translations were machine-drafted; have native speakers
  review them (CMS → Interface text, and each document's bn/hi locale).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
