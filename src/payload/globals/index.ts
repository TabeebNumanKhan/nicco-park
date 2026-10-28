import type { GlobalConfig } from 'payload'
import { allow, anyone, hiddenUnless, type Area } from '../access'
import { revalidateGlobal } from '../hooks/revalidate'
import { linkField } from '../fields/common'
import { previewUrl } from '../preview'

const live = (path: string) => ({ url: ({ locale, req }: { locale: { code: string }; req: Parameters<typeof previewUrl>[2] }) => previewUrl(path, locale?.code, req) })

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  admin: { group: 'Settings', description: 'Contact details, opening hours, ride alerts and the trust badges used across the site.', livePreview: live(''), hidden: hiddenUnless('settings') },
  access: { read: anyone, update: allow('settings', 'publish') },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Park',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'name', type: 'text', required: true, defaultValue: 'Nicco Park', admin: { width: '50%' } },
                { name: 'legalName', type: 'text', admin: { width: '50%' } },
              ],
            },
            { name: 'tagline', type: 'text', localized: true },
            { name: 'address', type: 'array', fields: [{ name: 'line', type: 'text', localized: true }] },
            {
              type: 'row',
              fields: [
                { name: 'phoneDisplay', type: 'text', admin: { width: '33%' } },
                { name: 'phoneTel', type: 'text', admin: { width: '33%' } },
                { name: 'whatsapp', type: 'text', admin: { width: '33%', description: 'Full wa.me link. Empty = phone dialer.' } },
              ],
            },
            { name: 'officialChannels', type: 'textarea', localized: true },
          ],
        },
        {
          label: 'Today',
          description: 'Shown in the top bar, the home page and Plan your visit.',
          fields: [
            { name: 'todayHours', type: 'text', defaultValue: '10:30 AM – 6:45 PM' },
            {
              name: 'hours',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', localized: true },
                { name: 'value', type: 'text' },
                { name: 'tone', type: 'select', options: ['dry', 'wet', 'bowl', 'neutral'] },
              ],
            },
            {
              name: 'alerts',
              label: 'Ride alerts',
              type: 'array',
              admin: { description: 'A closure here shows in the top bar and on Plan your visit until you remove it.' },
              fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'detail', type: 'text', localized: true },
                { name: 'href', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Numbers & trust',
          fields: [
            { name: 'stats', type: 'array', fields: [{ name: 'value', type: 'text', localized: true }, { name: 'label', type: 'text', localized: true }] },
            {
              name: 'trust',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', localized: true },
                { name: 'icon', type: 'select', options: ['shield', 'star', 'ban'] },
              ],
            },
          ],
        },
        {
          label: 'Social',
          fields: [{ name: 'socials', type: 'array', fields: [{ name: 'label', type: 'select', options: ['Instagram', 'Facebook', 'YouTube', 'X'] }, { name: 'href', type: 'text' }] }],
        },
        {
          label: 'Sharing',
          fields: [
            { name: 'defaultOgImage', label: 'Default share image', type: 'upload', relationTo: 'media', admin: { description: 'Shown when a page is shared on WhatsApp, Facebook or X and has no image of its own. 1200 × 630 px works best.' } },
            {
              name: 'geo',
              label: 'Map position (for Google)',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'lat', type: 'number', defaultValue: 22.5714, admin: { width: '50%' } },
                    { name: 'lng', type: 'number', defaultValue: 88.4223, admin: { width: '50%' } },
                  ],
                },
              ],
            },
            { name: 'sameAs', label: 'Official profiles elsewhere', type: 'array', admin: { description: 'Wikipedia, Wikidata, TripAdvisor, Google Business Profile… helps Google and AI assistants recognise the park.' }, fields: [{ name: 'url', type: 'text', required: true }] },
          ],
        },
      ],
    },
  ],
}

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header, menus & announcement bar',
  admin: { group: 'Design', livePreview: live(''), hidden: hiddenUnless('design') },
  versions: { drafts: true, max: 20 },
  access: { read: anyone, update: allow('design', 'edit') },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'nav',
      label: 'Main menu',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', localized: true, required: true, admin: { width: '40%' } },
            { name: 'href', type: 'text', required: true, admin: { width: '40%' } },
            { name: 'wideOnly', type: 'checkbox', label: 'Wide screens only', admin: { width: '20%' } },
          ],
        },
      ],
    },
    {
      name: 'moreSheet',
      label: 'Phone "More" menu',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true, required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'badge', type: 'text', localized: true },
      ],
    },
    linkField('buy', 'Buy button', true),
    {
      name: 'announcements',
      label: 'Announcement bar',
      type: 'array',
      admin: { description: 'Short messages in a coloured bar above the header, e.g. "Durga Puja Fun Express: book now". Several rotate. Leave empty to hide the bar.' },
      fields: [
        { name: 'text', type: 'text', localized: true, required: true },
        { name: 'href', type: 'text', admin: { description: 'Optional link, e.g. /offers/fun-fest' } },
        {
          type: 'row',
          fields: [
            { name: 'tone', type: 'select', defaultValue: 'yellow', options: ['yellow', 'coral', 'ink', 'dry', 'wet', 'bowl'], admin: { width: '33%' } },
            { name: 'showFrom', type: 'date', admin: { width: '33%', date: { pickerAppearance: 'dayAndTime' } } },
            { name: 'showUntil', type: 'date', admin: { width: '33%', date: { pickerAppearance: 'dayAndTime' } } },
          ],
        },
      ],
    },
  ],
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Design', livePreview: live(''), hidden: hiddenUnless('design') },
  versions: { drafts: true, max: 20 },
  access: { read: anyone, update: allow('design', 'edit') },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: 'signupHeading', type: 'text', localized: true },
    {
      name: 'columns',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text', localized: true },
        { name: 'links', type: 'array', fields: [{ name: 'label', type: 'text', localized: true }, { name: 'href', type: 'text' }] },
      ],
    },
    { name: 'legal', type: 'array', fields: [{ name: 'label', type: 'text', localized: true }, { name: 'href', type: 'text' }] },
  ],
}

export const Visit: GlobalConfig = {
  slug: 'visit',
  label: 'Plan your visit',
  admin: { group: 'The park', description: 'Getting here, food and good-to-know tips on the Plan your visit page.', livePreview: live('/plan'), hidden: hiddenUnless('settings') },
  access: { read: anyone, update: allow('settings', 'edit') },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: 'routes', label: 'Getting here', type: 'array', fields: [{ name: 'title', type: 'text', localized: true }, { name: 'body', type: 'textarea', localized: true }] },
    {
      name: 'food',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', localized: true },
        { name: 'where', type: 'text', localized: true },
        { name: 'blurb', type: 'textarea', localized: true },
        { name: 'tone', type: 'select', options: ['yellow', 'wet', 'neutral', 'bowl'] },
      ],
    },
    { name: 'tips', label: 'Good to know', type: 'array', fields: [{ name: 'title', type: 'text', localized: true }, { name: 'body', type: 'textarea', localized: true }] },
    { name: 'mapPdf', label: 'Park map (PDF)', type: 'upload', relationTo: 'media' },
  ],
}

export const Bowling: GlobalConfig = {
  slug: 'bowling',
  label: 'Super Bowl rates & lanes',
  admin: { group: 'Tickets & products', livePreview: live('/worlds/super-bowl'), hidden: hiddenUnless('products') },
  access: { read: anyone, update: allow('products', 'publish') },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: 'rates', type: 'array', fields: [{ name: 'item', type: 'text', localized: true }, { name: 'price', type: 'text', localized: true }] },
    { name: 'laneTimes', type: 'array', fields: [{ name: 'time', type: 'text' }] },
  ],
}

const hex = (name: string, label: string, defaultValue: string, description?: string) => ({
  name,
  label,
  type: 'text' as const,
  defaultValue,
  admin: { width: '33%', description, components: { Field: '@/payload/components/ColorField#ColorField' } },
  validate: (v: unknown) => (!v || /^#[0-9a-fA-F]{6}$/.test(String(v)) ? true : 'Use a colour like #FFD400'),
})

/** Logo, colours and fonts for the whole site — Shopify's "Theme settings". */
export const Theme: GlobalConfig = {
  slug: 'theme',
  label: 'Theme: logo, colours, fonts',
  admin: { group: 'Design', livePreview: live(''), hidden: hiddenUnless('design'), description: 'Changes preview on the right; press Publish to put them live.' },
  versions: { drafts: true, max: 20 },
  access: { read: anyone, update: allow('design', 'publish') },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Logo & icon',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'logo', type: 'upload', relationTo: 'media', admin: { width: '33%', description: 'Header logo. PNG or SVG with a transparent background.' } },
                { name: 'logoFooter', label: 'Logo on dark', type: 'upload', relationTo: 'media', admin: { width: '33%', description: 'Footer. Leave empty to use the header logo.' } },
                { name: 'favicon', label: 'Browser tab icon', type: 'upload', relationTo: 'media', admin: { width: '33%', description: 'Square PNG, at least 192 × 192 px.' } },
              ],
            },
            { name: 'logoHeight', label: 'Logo height on computers (px)', type: 'number', defaultValue: 56, min: 32, max: 96 },
          ],
        },
        {
          label: 'Colours',
          description: 'Brand colours used across the site. Keep enough contrast: dark text on yellow, white text on the others.',
          fields: [
            {
              type: 'row',
              fields: [
                hex('yellow', 'Buy buttons & price stickers', '#FFD400'),
                hex('ink', 'Text & dark bands', '#101418'),
                hex('coral', 'Festive / offers', '#D93A26'),
              ],
            },
            {
              type: 'row',
              fields: [hex('dry', 'Dry Park green', '#0E7C3A'), hex('wet', 'Wet-O-Wild blue', '#0067C5'), hex('bowl', 'Super Bowl purple', '#6D28D9')],
            },
            { type: 'row', fields: [hex('cream', 'Soft section background', '#FFF8E6'), hex('snow', 'Snow Park blue', '#2F5DCC'), hex('sea', 'Sea (gradients)', '#007EA0')] },
          ],
        },
        {
          label: 'Fonts',
          description: 'Bengali and Hindi always use Hind (designed for those scripts); these settings change the English letters.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'displayFont',
                  label: 'Headings',
                  type: 'select',
                  defaultValue: 'bricolage',
                  admin: { width: '50%' },
                  options: [
                    { label: 'Bricolage Grotesque (default)', value: 'bricolage' },
                    { label: 'Instrument Sans', value: 'instrument' },
                    { label: 'System font', value: 'system' },
                    { label: 'Uploaded font file…', value: 'custom' },
                  ],
                },
                {
                  name: 'bodyFont',
                  label: 'Body text',
                  type: 'select',
                  defaultValue: 'instrument',
                  admin: { width: '50%' },
                  options: [
                    { label: 'Instrument Sans (default)', value: 'instrument' },
                    { label: 'Bricolage Grotesque', value: 'bricolage' },
                    { label: 'System font', value: 'system' },
                    { label: 'Uploaded font file…', value: 'custom' },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'displayFontFile', label: 'Heading font file (.woff2)', type: 'upload', relationTo: 'media', admin: { width: '50%', condition: (d) => d?.displayFont === 'custom' }, custom: { showIf: { displayFont: 'custom' } } },
                { name: 'bodyFontFile', label: 'Body font file (.woff2)', type: 'upload', relationTo: 'media', admin: { width: '50%', condition: (d) => d?.bodyFont === 'custom' }, custom: { showIf: { bodyFont: 'custom' } } },
              ],
            },
            { name: 'headingScale', label: 'Heading size (%)', type: 'number', defaultValue: 100, min: 80, max: 130 },
          ],
        },
        {
          label: 'Custom CSS',
          fields: [
            {
              name: 'customCss',
              type: 'code',
              admin: { language: 'css', description: 'For small tweaks only. Admins only.' },
              access: { update: ({ req }) => (req.user as { role?: string } | null)?.role === 'admin' },
            },
          ],
        },
      ],
    },
  ],
}

/** Analytics, ads tags, consent and search/AI crawler rules. */
export const Tracking: GlobalConfig = {
  slug: 'tracking',
  label: 'Tracking, consent & SEO',
  admin: { group: 'Marketing', hidden: hiddenUnless('marketing'), description: 'Google Analytics 4, Google Ads, Meta Pixel, consent banner, and what search engines and AI assistants may read.' },
  access: { read: anyone, update: allow('marketing', 'publish') },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Tags',
          description: 'Recommended: put GA4, Google Ads and Meta Pixel inside Google Tag Manager and enter only the GTM ID. Or enter the IDs directly. Nothing loads until the visitor accepts cookies.',
          fields: [
            { name: 'gtmId', label: 'Google Tag Manager ID', type: 'text', admin: { placeholder: 'GTM-XXXXXXX' } },
            {
              type: 'row',
              fields: [
                { name: 'ga4Id', label: 'GA4 Measurement ID', type: 'text', admin: { width: '50%', placeholder: 'G-XXXXXXXXXX' } },
                { name: 'metaPixelId', label: 'Meta Pixel ID', type: 'text', admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'adsId', label: 'Google Ads ID', type: 'text', admin: { width: '50%', placeholder: 'AW-XXXXXXXXX' } },
                { name: 'adsPurchaseLabel', label: 'Google Ads purchase conversion label', type: 'text', admin: { width: '50%' } },
              ],
            },
            { name: 'adsLeadLabel', label: 'Google Ads lead conversion label', type: 'text' },
            {
              name: 'serverSide',
              label: 'Server-side conversions',
              type: 'checkbox',
              admin: { description: 'Also send purchases and leads from the server (GA4 Measurement Protocol, Meta Conversions API) for accuracy when browsers block tags. Needs the secrets in the server settings (.env): GA4_API_SECRET, META_CAPI_TOKEN.' },
            },
          ],
        },
        {
          label: 'Consent',
          fields: [
            { name: 'consentBanner', type: 'checkbox', defaultValue: true, label: 'Show the cookie consent banner' },
            {
              name: 'consentMode',
              type: 'select',
              defaultValue: 'basic',
              options: [
                { label: 'Basic: load no tags until the visitor accepts (safest)', value: 'basic' },
                { label: 'Advanced: cookieless pings before consent (Google modelling)', value: 'advanced' },
              ],
            },
            { name: 'privacyUrl', type: 'text', defaultValue: '/privacy' },
          ],
        },
        {
          label: 'Search & AI',
          fields: [
            {
              name: 'aiCrawlers',
              label: 'AI assistants (ChatGPT, Gemini, Claude, Perplexity, Meta AI)',
              type: 'select',
              defaultValue: 'all',
              options: [
                { label: 'Allow search and training (be known and recommended)', value: 'all' },
                { label: 'Allow AI search, block AI training', value: 'search' },
                { label: 'Block AI crawlers (not recommended)', value: 'none' },
              ],
            },
            { name: 'llmsNotes', label: 'Extra facts for AI assistants (llms.txt)', type: 'textarea', admin: { description: 'Short, factual lines added to /llms.txt, e.g. policies or how to book groups.' } },
            { name: 'googleVerification', label: 'Google Search Console verification code', type: 'text' },
            { name: 'bingVerification', label: 'Bing Webmaster verification code', type: 'text' },
            { name: 'metaVerification', label: 'Meta domain verification code', type: 'text' },
          ],
        },
      ],
    },
  ],
}

/** Ticketing (Semnox) and other systems. Secrets stay in the server's .env, never here. */
export const Integrations: GlobalConfig = {
  slug: 'integrations',
  label: 'Integrations (Semnox & apps)',
  admin: { group: 'Integrations', hidden: hiddenUnless('integrations'), description: 'How the site talks to the ticketing system and other apps. Passwords and keys go in the server settings (.env), not here.' },
  access: { read: allow('integrations', 'view'), update: allow('integrations', 'edit') },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Ticketing',
          fields: [
            { name: 'ticketingStatus', type: 'ui', admin: { components: { Field: '@/payload/components/TicketingStatus#TicketingStatus' } } },
            {
              name: 'ticketingMode',
              label: 'How visitors buy',
              type: 'select',
              defaultValue: 'demo',
              options: [
                { label: 'Demo checkout on this site (no payment taken)', value: 'demo' },
                { label: 'Send visitors to the existing booking site', value: 'linkout' },
                { label: 'Semnox API (when credentials are ready)', value: 'semnox' },
              ],
            },
            { name: 'bookingUrl', label: 'Existing booking site', type: 'text', defaultValue: 'https://bookings.niccoparks.com', admin: { description: 'Used when "How visitors buy" is "Send visitors…".' } },
            {
              type: 'row',
              fields: [
                { name: 'bookingWindowDays', label: 'Book up to (days ahead)', type: 'number', defaultValue: 90, admin: { width: '33%' } },
                { name: 'sameDayCutoff', label: 'Online sales close (day before, 24h)', type: 'text', defaultValue: '23:59', admin: { width: '33%' } },
                { name: 'maxPerOrder', label: 'Max guests per order', type: 'number', defaultValue: 20, admin: { width: '33%' } },
              ],
            },
            {
              name: 'semnox',
              label: 'Semnox (non-secret settings)',
              type: 'group',
              admin: { description: 'Ask Semnox for: API documentation, a test (UAT) site, the site ID, a POS/channel for the website, product IDs, and whether they send webhooks. Put the base URL, user and key in .env (SEMNOX_API_BASE_URL, SEMNOX_API_USER, SEMNOX_API_KEY).' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'siteId', label: 'Site ID', type: 'text', admin: { width: '33%' } },
                    { name: 'channel', label: 'Website channel / POS ID', type: 'text', admin: { width: '33%' } },
                    { name: 'environment', type: 'select', defaultValue: 'test', options: ['test', 'live'], admin: { width: '33%' } },
                  ],
                },
                { name: 'notes', type: 'textarea' },
              ],
            },
          ],
        },
        {
          label: 'API & webhooks',
          fields: [
            {
              name: 'apiHelp',
              type: 'ui',
              admin: { components: { Field: '@/payload/components/ApiHelp#ApiHelp' } },
            },
          ],
        },
      ],
    },
  ],
}

/** Who gets emails when forms are sent, and who they come from. */
export const Email: GlobalConfig = {
  slug: 'email',
  label: 'Email & notifications',
  admin: { group: 'Integrations', hidden: hiddenUnless('integrations'), description: 'Where enquiries and sign-ups are emailed. Sending uses the mail server set in .env (SMTP_HOST, SMTP_USER, SMTP_PASS) — until then emails are written to the server log.' },
  access: { read: allow('integrations', 'view'), update: allow('integrations', 'edit') },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'fromName', label: 'From name', type: 'text', defaultValue: 'Nicco Park', admin: { width: '50%' } },
        { name: 'fromAddress', label: 'From address', type: 'email', defaultValue: 'no-reply@niccoparks.com', admin: { width: '50%' } },
      ],
    },
    { name: 'replyTo', label: 'Reply-to address', type: 'email' },
    {
      name: 'routes',
      label: 'Who receives each kind of message',
      type: 'array',
      admin: { description: 'One row per form type. Several addresses: separate with commas.' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'select',
              required: true,
              admin: { width: '35%' },
              options: [
                { label: 'Group / event enquiry', value: 'groups' },
                { label: 'Call me back', value: 'callback' },
                { label: 'Contact form', value: 'contact' },
                { label: 'Offers sign-up', value: 'offers' },
                { label: 'Snow Park waitlist', value: 'waitlist' },
                { label: 'Chat assistant hand-off', value: 'chat' },
                { label: 'New booking (copy)', value: 'booking' },
              ],
            },
            { name: 'to', label: 'Send to', type: 'text', required: true, admin: { width: '65%', placeholder: 'events@niccoparks.com, sales@niccoparks.com' } },
          ],
        },
      ],
    },
    { name: 'dailyDigest', label: 'Daily leads summary', type: 'checkbox', defaultValue: true, admin: { description: 'One email each morning with yesterday\'s leads, to the "Group / event enquiry" addresses.' } },
  ],
}

/** The chat assistant on the website. */
export const Assistant: GlobalConfig = {
  slug: 'assistant',
  label: 'Chat assistant',
  admin: { group: 'Integrations', hidden: hiddenUnless('integrations'), livePreview: live(''), description: 'A chat bubble that answers visitor questions from this CMS (hours, prices, FAQs, offers) and hands over to WhatsApp or a call-back.' },
  access: { read: anyone, update: allow('integrations', 'edit') },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Show the chat bubble' },
    {
      name: 'provider',
      label: 'Answers come from',
      type: 'select',
      defaultValue: 'faq',
      options: [
        { label: 'Built-in: FAQs and park facts from this CMS (no AI)', value: 'faq' },
        { label: 'AI (Claude) using this CMS as its knowledge — needs ANTHROPIC_API_KEY in .env', value: 'ai' },
        { label: 'Another chat service (paste its embed code below)', value: 'embed' },
      ],
    },
    { name: 'name', label: 'Assistant name', type: 'text', localized: true, defaultValue: 'Nicco Park helper' },
    { name: 'greeting', type: 'textarea', localized: true, defaultValue: 'Hi! Ask me about tickets, timings, rides or offers.' },
    { name: 'suggestions', label: 'Quick questions', type: 'array', fields: [{ name: 'text', type: 'text', localized: true, required: true }] },
    { name: 'instructions', label: 'Extra guidance for the AI', type: 'textarea', admin: { description: 'Tone and rules, e.g. "Always offer the WhatsApp link for group bookings."', condition: (d) => d?.provider === 'ai' }, custom: { showIf: { provider: 'ai' } } },
    {
      name: 'embedCode',
      label: 'Embed code',
      type: 'code',
      admin: { language: 'html', condition: (d) => d?.provider === 'embed', description: 'From the chat service (e.g. Tidio, Intercom, Gupshup, Yellow.ai). Admins only.' },
      custom: { showIf: { provider: 'embed' } },
      access: { update: ({ req }) => (req.user as { role?: string } | null)?.role === 'admin' },
    },
  ],
}

export const globals: GlobalConfig[] = [SiteSettings, Theme, Header, Footer, Visit, Bowling, Tracking, Integrations, Email, Assistant]
