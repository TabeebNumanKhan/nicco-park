import path from 'node:path'
import type { CollectionConfig, Field } from 'payload'
import { AREAS, LEVELS, allow, anyone, approvedOrStaff, isAdminField, loggedIn, publishedOr, reqCan, ROLES, type Area } from '../access'
import { articleBlocks, pageBlocks, reusableBlocks } from '../blocks'
import { linkField, orderField, seoField, slugField, toneField } from '../fields/common'
import { landingField } from '../fields/landing'
import { previewUrl } from '../preview'
import { revalidateAfterChange } from '../hooks/revalidate'
import { slugRedirect } from '../hooks/redirects'

/** Standard access for a content area: public read (or published only), staff by level. */
const areaAccess = (area: Area, read: 'public' | 'published' | 'staff' = 'public') => ({
  read: read === 'public' ? anyone : read === 'published' ? publishedOr(area) : allow(area, 'view'),
  create: allow(area, 'edit'),
  update: allow(area, 'edit'),
  delete: allow(area, 'full'),
})

/* ------------------------------------------------------------------ */
/*  People and files                                                   */
/* ------------------------------------------------------------------ */

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Staff account', plural: 'Staff accounts' },
  // depth 1 brings the custom role's permissions onto every request.
  // API keys: tick "Enable API key" on an account to let another system (Semnox, a chatbot,
  // a reporting tool) call /api/* as that account, with that account's role.
  auth: { tokenExpiration: 60 * 60 * 12, maxLoginAttempts: 8, lockTime: 15 * 60 * 1000, depth: 1, useAPIKey: true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'customRole'],
    group: 'Settings',
    description: 'Everyone who can sign in to the CMS, and what they may do. For another system that needs API access, make an account for it and tick "Enable API key".',
  },
  custom: { area: 'users' },
  hooks: {
    // The very first account (made on the "Create first user" screen) is always an Admin.
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === 'create' && (await req.payload.count({ collection: 'users', req, overrideAccess: true })).totalDocs === 0) data.role = 'admin'
        return data
      },
    ],
  },
  access: {
    read: ({ req }) => (reqCan(req, 'users', 'view') ? true : req.user ? { id: { equals: req.user.id } } : false),
    create: allow('users', 'edit'),
    update: ({ req, id }) => reqCan(req, 'users', 'edit') || (!!req.user && req.user.id === id),
    delete: allow('users', 'full'),
    unlock: allow('users', 'edit'),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'role',
          type: 'select',
          required: true,
          defaultValue: 'editor',
          options: ROLES,
          access: { update: isAdminField, create: isAdminField },
          saveToJWT: true,
          admin: { width: '50%', description: 'Admin: everything. Marketing: content, campaigns, publishing. Editor: drafts only. Operations: hours, alerts, leads, dashboard.' },
        },
        {
          name: 'customRole',
          label: 'Custom role',
          type: 'relationship',
          relationTo: 'roles',
          access: { update: isAdminField, create: isAdminField },
          admin: { width: '50%', condition: (data) => data?.role === 'custom', description: 'Make roles in Settings → Roles.' },
        },
      ],
    },
    { name: 'phone', type: 'text', admin: { description: 'Optional. For WhatsApp alerts about leads.' } },
  ],
}

export const Roles: CollectionConfig = {
  slug: 'roles',
  labels: { singular: 'Role', plural: 'Roles' },
  admin: {
    group: 'Settings',
    useAsTitle: 'name',
    description: 'Custom roles: choose what people with this role can see and do in each part of the CMS. The four built-in roles (Admin, Marketing, Editor, Operations) are fixed.',
  },
  custom: { area: 'users' },
  access: { read: loggedIn, create: allow('users', 'full'), update: allow('users', 'full'), delete: allow('users', 'full') },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'permissions',
      type: 'group',
      admin: { description: 'View = can look. Edit = drafts only. Edit & publish = can put changes live. Full = can also delete.' },
      fields: AREAS.map((a) => ({ name: a.value, label: a.label, type: 'select' as const, defaultValue: 'none', options: LEVELS.map((l) => ({ ...l })) })),
    },
  ],
}

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'File', plural: 'Media library' },
  admin: {
    group: 'Content',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize', 'updatedAt'],
    description: 'Photos, videos, logos, fonts and PDFs. Drag files in to upload; organise them in folders. Set the focal point on a photo so crops keep the important part.',
  },
  folders: true,
  custom: { area: 'media' },
  access: areaAccess('media'),
  upload: {
    // Files land in public/media and are served straight from /media/…, so
    // the static copy of the site and next/image both read them as plain files.
    staticDir: path.resolve(process.cwd(), 'public/media'),
    mimeTypes: ['image/*', 'video/mp4', 'video/webm', 'application/pdf', 'font/woff2', 'font/woff', 'font/ttf', 'font/otf', 'application/font-woff', 'application/font-woff2'],
    focalPoint: true,
    crop: true,
    imageSizes: [{ name: 'thumbnail', width: 480, withoutEnlargement: true }],
    adminThumbnail: ({ doc }) => {
      const mt = String(doc?.mimeType ?? '')
      if (!doc?.filename || !mt.startsWith('image/')) return null
      const thumb = (doc.sizes as { thumbnail?: { filename?: string } } | undefined)?.thumbnail?.filename
      return `/media/${thumb || doc.filename}`
    },
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (doc?.filename) doc.url = `/media/${encodeURIComponent(doc.filename as string)}`
        const sizes = doc?.sizes as Record<string, { filename?: string; url?: string }> | undefined
        if (sizes) for (const sz of Object.values(sizes)) if (sz?.filename) sz.url = `/media/${encodeURIComponent(sz.filename)}`
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt text',
      type: 'text',
      localized: true,
      admin: { description: 'Describe the photo for screen readers and Google (required for images).' },
      validate: (v: unknown, { data }: { data: Partial<{ mimeType: string }> }) => (!data?.mimeType?.startsWith('image/') || !!v ? true : 'Describe the image in a few words.'),
    },
    { name: 'credit', type: 'text', admin: { description: 'Photographer or source, if it must be shown.' } },
  ],
}

/* ------------------------------------------------------------------ */
/*  Pages and campaigns                                                */
/* ------------------------------------------------------------------ */

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    group: 'Pages & campaigns',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description: 'Every page is a stack of sections. "home" is the home page. A page whose web address matches a built-in page (offers, plan, groups…) adds its sections under that page.',
    livePreview: { url: ({ data, locale, req }) => previewUrl(data?.slug === 'home' ? '' : `/${data?.slug}`, locale?.code, req) },
    preview: (data, { locale, req }) => previewUrl(data?.slug === 'home' ? '' : `/${data?.slug as string}`, locale, req),
  },
  versions: { drafts: { autosave: { interval: 400 }, schedulePublish: true }, maxPerDoc: 50 },
  custom: { area: 'pages' },
  access: areaAccess('pages', 'published'),
  hooks: { beforeChange: [slugRedirect('')], afterChange: [revalidateAfterChange] },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    slugField('title'),
    {
      type: 'tabs',
      tabs: [
        { label: 'Sections', fields: [{ name: 'layout', type: 'blocks', blocks: pageBlocks, admin: { initCollapsed: true } }] },
        { label: 'SEO', fields: [seoField] },
      ],
    },
  ],
}

const offerCategories = [
  { label: 'Families', value: 'families' },
  { label: 'Students', value: 'students' },
  { label: 'With ID', value: 'id' },
  { label: 'Seasonal', value: 'season' },
]

export const Offers: CollectionConfig = {
  slug: 'offers',
  admin: {
    group: 'Pages & campaigns',
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'validTo', '_status'],
    description: 'Each offer gets a card on Tickets & offers and, if switched on, its own landing page for ads.',
    livePreview: { url: ({ data, locale, req }) => previewUrl(`/offers/${data?.slug}`, locale?.code, req) },
    preview: (data, { locale, req }) => previewUrl(`/offers/${data?.slug as string}`, locale, req),
  },
  versions: { drafts: { autosave: { interval: 400 }, schedulePublish: true }, maxPerDoc: 50 },
  custom: { area: 'campaigns' },
  access: areaAccess('campaigns', 'published'),
  hooks: { beforeChange: [slugRedirect('/offers')], afterChange: [revalidateAfterChange] },
  fields: [
    { name: 'name', type: 'text', localized: true, required: true },
    slugField('name'),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Offer',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'tag', type: 'text', localized: true, admin: { width: '33%' } },
                { name: 'category', type: 'select', options: offerCategories, admin: { width: '33%' } },
                {
                  name: 'status',
                  type: 'select',
                  defaultValue: 'Live',
                  admin: { width: '33%' },
                  options: [
                    { label: 'Live', value: 'Live' },
                    { label: 'Always', value: 'Always' },
                    { label: 'Coming', value: 'Coming' },
                    { label: 'Ended', value: 'Ended' },
                  ],
                },
              ],
            },
            { name: 'deal', type: 'text', localized: true, required: true, admin: { description: 'The headline deal, e.g. "20% off · ₹400 / ₹1,040".' } },
            { name: 'terms', type: 'textarea', localized: true },
            {
              type: 'row',
              fields: [
                { name: 'validFrom', type: 'date', admin: { width: '33%' } },
                { name: 'validTo', type: 'date', admin: { width: '33%' } },
                { name: 'promoCode', type: 'text', admin: { width: '33%', description: 'Optional. Applied automatically from the landing page.' } },
              ],
            },
            { ...toneField('theme', 'dry'), admin: { description: 'Card colour.' } } as Field,
            { name: 'image', type: 'upload', relationTo: 'media' },
            linkField('cta', 'Button', true),
            { name: 'showOnHome', type: 'checkbox', label: 'Show in the home page deals ticker' },
            orderField,
          ],
        },
        { label: 'Landing page & A/B', fields: [landingField] },
        { label: 'SEO', fields: [seoField] },
      ],
    },
  ],
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((label, i) => ({ label, value: String(i) }))

export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Event', plural: "Events (What's on)" },
  admin: {
    group: 'Pages & campaigns',
    useAsTitle: 'name',
    defaultColumns: ['name', 'when', 'highlight', '_status'],
    livePreview: { url: ({ data, locale, req }) => previewUrl(`/whats-on/${data?.slug}`, locale?.code, req) },
    preview: (data, { locale, req }) => previewUrl(`/whats-on/${data?.slug as string}`, locale, req),
  },
  versions: { drafts: { autosave: { interval: 400 }, schedulePublish: true }, maxPerDoc: 50 },
  custom: { area: 'campaigns' },
  access: areaAccess('campaigns', 'published'),
  hooks: { beforeChange: [slugRedirect('/whats-on')], afterChange: [revalidateAfterChange] },
  fields: [
    { name: 'name', type: 'text', localized: true, required: true },
    slugField('name'),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Event',
          fields: [
            { name: 'when', type: 'text', localized: true, required: true, admin: { description: 'As shown on the badge, e.g. "Sep – Oct" or "25 Dec – 1 Jan".' } },
            { name: 'months', type: 'select', hasMany: true, options: MONTHS, admin: { description: 'Months it appears in on the calendar.' } },
            {
              type: 'row',
              fields: [
                { name: 'startDate', type: 'date', admin: { width: '50%' } },
                { name: 'endDate', type: 'date', admin: { width: '50%' } },
              ],
            },
            { name: 'blurb', type: 'textarea', localized: true, required: true },
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            {
              name: 'tone',
              type: 'select',
              defaultValue: 'dry',
              options: [
                { label: 'Red (festive / closure)', value: 'alert' },
                { label: 'Green', value: 'dry' },
                { label: 'Blue', value: 'wet' },
                { label: 'Purple', value: 'bowl' },
              ],
            },
            { name: 'kind', type: 'select', defaultValue: 'seasonal', options: ['seasonal', 'weekly', 'closure'] },
            { name: 'highlight', type: 'checkbox', label: 'Highlight on home' },
            linkField('cta', 'Button'),
            orderField,
          ],
        },
        { label: 'Landing page & A/B', fields: [landingField] },
        { label: 'SEO', fields: [seoField] },
      ],
    },
  ],
}

/* ------------------------------------------------------------------ */
/*  What we sell                                                       */
/* ------------------------------------------------------------------ */

export const Tickets: CollectionConfig = {
  slug: 'tickets',
  labels: { singular: 'Ticket', plural: 'Tickets' },
  admin: {
    group: 'Tickets & products',
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'studentPrice', 'popular'],
    description: 'Prices here show on the site. Checkout charges the price from the ticketing system (Semnox) when it is connected.',
  },
  custom: { area: 'products' },
  access: { ...areaAccess('products'), create: allow('products', 'full') },
  hooks: { afterChange: [revalidateAfterChange] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'code', type: 'text', required: true, unique: true, admin: { width: '33%', description: 'Short id used in links: dry, meal, pkg.' } },
        { name: 'semnoxProductId', type: 'text', admin: { width: '33%', description: 'Product id in Semnox.' } },
        { name: 'popular', type: 'checkbox', admin: { width: '33%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', localized: true, required: true, admin: { width: '50%' } },
        { name: 'shortName', type: 'text', localized: true, required: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'price', type: 'number', required: true, admin: { width: '33%', description: '₹ per person, incl. taxes' } },
        { name: 'studentPrice', type: 'number', admin: { width: '33%' } },
        { name: 'funFestPrice', type: 'number', admin: { width: '33%' } },
      ],
    },
    { name: 'summary', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'includes', type: 'array', fields: [{ name: 'text', type: 'text', localized: true, required: true }] },
    { name: 'excludes', type: 'array', fields: [{ name: 'text', type: 'text', localized: true, required: true }] },
    { name: 'fastTrack', type: 'text', localized: true },
    orderField,
  ],
}

export const Extras: CollectionConfig = {
  slug: 'extras',
  labels: { singular: 'Add-on', plural: 'Add-ons' },
  admin: { group: 'Tickets & products', useAsTitle: 'name', defaultColumns: ['name', 'price'] },
  custom: { area: 'products' },
  access: { ...areaAccess('products'), create: allow('products', 'full') },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'code', type: 'text', required: true, unique: true, admin: { width: '33%' } },
        { name: 'semnoxProductId', type: 'text', admin: { width: '33%' } },
        { name: 'price', type: 'number', required: true, admin: { width: '33%' } },
      ],
    },
    { name: 'name', type: 'text', localized: true, required: true },
    { name: 'note', type: 'text', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'needsLaneSlot', type: 'checkbox', label: 'Needs a lane time (bowling)' },
    orderField,
  ],
}

/* ------------------------------------------------------------------ */
/*  The park                                                           */
/* ------------------------------------------------------------------ */

const WORLD_KEYS = [
  { label: 'Dry Park', value: 'dry' },
  { label: 'Wet-O-Wild', value: 'wet' },
  { label: 'Super Bowl', value: 'bowl' },
  { label: 'Snow Park', value: 'snow' },
]

export const Worlds: CollectionConfig = {
  slug: 'worlds',
  admin: {
    group: 'The park',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'comingSoon'],
    livePreview: { url: ({ data, locale, req }) => previewUrl(`/worlds/${data?.slug}`, locale?.code, req) },
  },
  custom: { area: 'park' },
  access: { ...areaAccess('park'), create: allow('park', 'full') },
  hooks: { beforeChange: [slugRedirect('/worlds')], afterChange: [revalidateAfterChange] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'key', type: 'select', options: WORLD_KEYS, required: true, unique: true, admin: { width: '33%' } },
        { name: 'name', type: 'text', localized: true, required: true, admin: { width: '33%' } },
        { name: 'comingSoon', type: 'checkbox', admin: { width: '33%' } },
      ],
    },
    slugField('name'),
    { name: 'kicker', type: 'text', localized: true },
    { name: 'pitch', type: 'text', localized: true },
    { name: 'lede', type: 'textarea', localized: true },
    { name: 'hero', type: 'upload', relationTo: 'media' },
    {
      name: 'card',
      type: 'group',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'blurb', type: 'textarea', localized: true },
        { name: 'priceLine', type: 'text', localized: true },
      ],
    },
    linkField('cta', 'Button', true),
    {
      name: 'tabCta',
      label: 'Phone tab-bar button on this world',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'sub', type: 'text', localized: true },
        { name: 'href', type: 'text' },
      ],
    },
    { name: 'facts', type: 'array', fields: [{ name: 'k', label: 'Label', type: 'text', localized: true }, { name: 'v', label: 'Value', type: 'text', localized: true }] },
    { name: 'ridesTitle', type: 'text', localized: true },
    { name: 'layout', label: 'Extra sections', type: 'blocks', blocks: pageBlocks, admin: { initCollapsed: true } },
    orderField,
    seoField,
  ],
}

export const Rides: CollectionConfig = {
  slug: 'rides',
  admin: { group: 'The park', useAsTitle: 'name', defaultColumns: ['name', 'world', 'kind', 'status'], listSearchableFields: ['name'] },
  custom: { area: 'park' },
  access: areaAccess('park'),
  hooks: { afterChange: [revalidateAfterChange] },
  fields: [
    { name: 'name', type: 'text', localized: true, required: true },
    slugField('name'),
    {
      type: 'row',
      fields: [
        { name: 'world', type: 'select', options: WORLD_KEYS, required: true, admin: { width: '25%' } },
        {
          name: 'kind',
          type: 'select',
          required: true,
          admin: { width: '25%' },
          options: [
            { label: 'Thrill', value: 'thrill' },
            { label: 'Family', value: 'family' },
            { label: 'Little ones', value: 'little' },
            { label: 'Sights', value: 'sights' },
          ],
        },
        {
          name: 'access',
          type: 'select',
          required: true,
          admin: { width: '25%' },
          options: [
            { label: 'In Dry Park Day', value: 'day' },
            { label: 'Parks Package', value: 'package' },
            { label: 'Paid at the ride', value: 'pay' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'open',
          admin: { width: '25%', description: 'Closed rides show a banner.' },
          options: [
            { label: 'Open', value: 'open' },
            { label: 'Closed for maintenance', value: 'maintenance' },
          ],
        },
      ],
    },
    { name: 'line', type: 'text', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    orderField,
  ],
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Journal post', plural: 'Joyride Journal' },
  admin: {
    group: 'Pages & campaigns',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'published', '_status'],
    livePreview: { url: ({ data, locale, req }) => previewUrl(`/journal/${data?.slug}`, locale?.code, req) },
    preview: (data, { locale, req }) => previewUrl(`/journal/${data?.slug as string}`, locale, req),
  },
  versions: { drafts: { autosave: { interval: 400 }, schedulePublish: true }, maxPerDoc: 50 },
  custom: { area: 'journal' },
  access: areaAccess('journal', 'published'),
  hooks: { beforeChange: [slugRedirect('/journal')], afterChange: [revalidateAfterChange] },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    slugField('title'),
    { name: 'excerpt', type: 'textarea', localized: true, required: true, admin: { description: 'Under 160 characters. Also the Google description.' } },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          admin: { width: '33%' },
          options: ['Plan your day', 'Tickets & offers', 'Families', 'Schools & groups', 'Super Bowl'],
        },
        { name: 'published', type: 'date', required: true, admin: { width: '33%' } },
        { name: 'readMins', type: 'number', defaultValue: 4, admin: { width: '33%' } },
      ],
    },
    { name: 'hero', type: 'upload', relationTo: 'media', required: true },
    { name: 'keywords', type: 'text', hasMany: true },
    { name: 'body', type: 'blocks', blocks: articleBlocks },
    { name: 'faqs', label: 'Quick answers', type: 'array', fields: [{ name: 'q', type: 'text', localized: true }, { name: 'a', type: 'textarea', localized: true }] },
    seoField,
  ],
}

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: { group: 'The park', useAsTitle: 'q' },
  custom: { area: 'park' },
  access: areaAccess('park'),
  fields: [{ name: 'q', label: 'Question', type: 'text', localized: true, required: true }, { name: 'a', label: 'Answer', type: 'textarea', localized: true, required: true }, orderField],
}

export const Venues: CollectionConfig = {
  slug: 'venues',
  admin: { group: 'Groups & events', useAsTitle: 'name' },
  custom: { area: 'park' },
  access: areaAccess('park'),
  fields: [
    { name: 'name', type: 'text', localized: true, required: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'capacity', type: 'text', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    orderField,
  ],
}

export const Occasions: CollectionConfig = {
  slug: 'occasions',
  admin: { group: 'Groups & events', useAsTitle: 'label' },
  custom: { area: 'park' },
  access: areaAccess('park'),
  fields: [
    { name: 'code', type: 'text', required: true },
    { name: 'label', type: 'text', localized: true, required: true },
    { name: 'title', type: 'text', localized: true },
    { name: 'pitch', type: 'textarea', localized: true },
    { name: 'points', type: 'array', fields: [{ name: 'text', type: 'text', localized: true }] },
    { name: 'image', type: 'upload', relationTo: 'media' },
    orderField,
  ],
}

export const Crews: CollectionConfig = {
  slug: 'crews',
  labels: { singular: 'Day plan', plural: '"Who\'s coming?" day plans' },
  admin: { group: 'The park', useAsTitle: 'label' },
  custom: { area: 'park' },
  access: areaAccess('park'),
  fields: [
    { name: 'code', type: 'text', required: true },
    { name: 'label', type: 'text', localized: true, required: true },
    { name: 'title', type: 'text', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'ticket', type: 'text', localized: true, admin: { description: 'Best ticket line, e.g. "Parks Package · ₹1,300".' } },
    linkField('cta', 'Button', true),
    { name: 'steps', type: 'array', fields: [{ name: 'time', type: 'text', localized: true }, { name: 'what', type: 'text', localized: true }] },
    orderField,
  ],
}

export const Moments: CollectionConfig = {
  slug: 'moments',
  labels: { singular: 'Moment', plural: '#NiccoMoments' },
  admin: {
    group: 'The park',
    useAsTitle: 'handle',
    defaultColumns: ['handle', 'world', 'status', 'createdAt'],
    description: 'Visitor photos. Only "Approved" ones appear on the site.',
  },
  custom: { area: 'moments' },
  access: { ...areaAccess('moments'), read: approvedOrStaff },
  hooks: { afterChange: [revalidateAfterChange] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'handle', type: 'text', required: true, admin: { width: '40%' } },
        { name: 'world', type: 'select', options: WORLD_KEYS.slice(0, 3), required: true, admin: { width: '30%' } },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'pending',
          admin: { width: '30%' },
          options: [
            { label: 'Waiting for review', value: 'pending' },
            { label: 'Approved', value: 'approved' },
            { label: 'Rejected', value: 'rejected' },
          ],
        },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text', localized: true },
    { name: 'ride', type: 'text', localized: true },
    { name: 'tall', type: 'checkbox', label: 'Tall tile' },
    { name: 'consent', type: 'checkbox', label: 'Permission to feature confirmed', admin: { description: 'Required before approving.' } },
    orderField,
  ],
}

/* ------------------------------------------------------------------ */
/*  Words on buttons and labels                                        */
/* ------------------------------------------------------------------ */

export const Translations: CollectionConfig = {
  slug: 'translations',
  labels: { singular: 'Interface text', plural: 'Interface text' },
  admin: {
    group: 'Settings',
    useAsTitle: 'en',
    defaultColumns: ['en', 'bn', 'hi', 'updatedAt'],
    listSearchableFields: ['en', 'bn', 'hi'],
    description: 'Buttons, labels and small print in all three languages. Search for the English text, change the Bengali or Hindi.',
    pagination: { defaultLimit: 50 },
  },
  custom: { area: 'text' },
  access: areaAccess('text'),
  hooks: { afterChange: [revalidateAfterChange] },
  fields: [
    { name: 'en', label: 'English', type: 'textarea', required: true, unique: true, index: true },
    { name: 'bn', label: 'বাংলা (Bengali)', type: 'textarea' },
    { name: 'hi', label: 'हिन्दी (Hindi)', type: 'textarea' },
  ],
}

export const AuditLog: CollectionConfig = {
  slug: 'audit-log',
  labels: { singular: 'Change', plural: 'Change log' },
  admin: { group: 'Settings', useAsTitle: 'summary', defaultColumns: ['summary', 'user', 'createdAt'], description: 'Who changed what, across the whole CMS. Read-only.' },
  custom: { area: 'marketing' },
  access: { read: allow('marketing', 'view'), create: () => false, update: () => false, delete: () => false },
  fields: [
    { name: 'summary', type: 'text' },
    { name: 'action', type: 'select', options: ['create', 'update', 'publish', 'delete', 'login'] },
    { name: 'collection', type: 'text' },
    { name: 'docId', type: 'text' },
    { name: 'user', type: 'relationship', relationTo: 'users' },
  ],
}

/* ------------------------------------------------------------------ */
/*  Building blocks, marketing and integrations                        */
/* ------------------------------------------------------------------ */

export const SavedSections: CollectionConfig = {
  slug: 'sections',
  labels: { singular: 'Saved section', plural: 'Saved sections' },
  admin: {
    group: 'Pages & campaigns',
    useAsTitle: 'name',
    defaultColumns: ['name', 'updatedAt', '_status'],
    description: 'Sections you build once and use on many pages (e.g. a festive offer band). Add one to a page with the "Saved section" block; change it here and every page updates.',
  },
  versions: { drafts: { autosave: { interval: 400 } }, maxPerDoc: 30 },
  custom: { area: 'design' },
  access: areaAccess('design', 'published'),
  hooks: { afterChange: [revalidateAfterChange] },
  fields: [
    { name: 'name', type: 'text', required: true, admin: { description: 'Only staff see this name.' } },
    { name: 'layout', label: 'Sections', type: 'blocks', blocks: reusableBlocks, admin: { initCollapsed: true } },
  ],
}

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  labels: { singular: 'Redirect', plural: 'Redirects' },
  admin: {
    group: 'Marketing',
    useAsTitle: 'from',
    defaultColumns: ['from', 'to', 'type', 'updatedAt'],
    description: 'Send old addresses to new ones so Google rankings and links from other sites keep working (e.g. pages of the old niccoparks.com). Made automatically when you change a page\'s web address.',
  },
  custom: { area: 'marketing' },
  access: { read: anyone, create: allow('marketing', 'edit'), update: allow('marketing', 'edit'), delete: allow('marketing', 'full') },
  hooks: { afterChange: [revalidateAfterChange] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'from', type: 'text', required: true, unique: true, index: true, admin: { width: '45%', description: 'Old path, e.g. /ticket-booking.aspx or /en/offers/old-name' } },
        { name: 'to', type: 'text', required: true, admin: { width: '40%', description: 'New path (/en/offers) or full URL' } },
        { name: 'type', type: 'select', defaultValue: '301', options: [{ label: 'Permanent (301)', value: '301' }, { label: 'Temporary (302)', value: '302' }], admin: { width: '15%' } },
      ],
    },
    { name: 'note', type: 'text' },
  ],
}

export const Webhooks: CollectionConfig = {
  slug: 'webhooks',
  labels: { singular: 'Webhook', plural: 'Webhooks' },
  admin: {
    group: 'Integrations',
    useAsTitle: 'name',
    defaultColumns: ['name', 'url', 'active', 'lastStatus'],
    description: 'Tell other systems (CRM, WhatsApp tool, accounting, Semnox middleware) when something happens on the website. Each call is a POST with JSON and an X-NiccoPark-Signature header (HMAC-SHA256 of the body with your secret).',
  },
  custom: { area: 'integrations' },
  access: { read: allow('integrations', 'view'), create: allow('integrations', 'edit'), update: allow('integrations', 'edit'), delete: allow('integrations', 'full') },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'url', type: 'text', required: true, admin: { description: 'https:// address that receives the event' } },
    {
      name: 'events',
      type: 'select',
      hasMany: true,
      required: true,
      options: [
        { label: 'Booking made (order.created)', value: 'order.created' },
        { label: 'Lead / enquiry received (lead.created)', value: 'lead.created' },
        { label: 'Content published (content.published)', value: 'content.published' },
        { label: 'Content deleted (content.deleted)', value: 'content.deleted' },
      ],
    },
    { name: 'secret', type: 'text', admin: { description: 'Shared secret used to sign each call. Keep it private.' }, access: { read: ({ req }) => reqCan(req, 'integrations', 'edit') } },
    { name: 'active', type: 'checkbox', defaultValue: true },
    {
      type: 'row',
      fields: [
        { name: 'lastStatus', type: 'text', admin: { readOnly: true, width: '50%' } },
        { name: 'lastCalledAt', type: 'date', admin: { readOnly: true, width: '50%', date: { pickerAppearance: 'dayAndTime' } } },
      ],
    },
  ],
}

export const collections: CollectionConfig[] = [
  Pages,
  Offers,
  Events,
  Posts,
  Tickets,
  Extras,
  Worlds,
  Rides,
  Faqs,
  Crews,
  Moments,
  Venues,
  Occasions,
  AuditLog,
  SavedSections,
  Redirects,
  Webhooks,
  Media,
  Translations,
  Users,
  Roles,
]
