import type { Field } from 'payload'

/** URL-safe slug, filled from `from` when left empty. */
export const slugField = (from = 'title', opts: { unique?: boolean } = { unique: true }): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: opts.unique,
  required: true,
  admin: { position: 'sidebar', description: 'Part of the web address. Lowercase, words joined with hyphens.' },
  hooks: {
    // A duplicate gets its own web address (the original keeps its own and its links).
    beforeDuplicate: [({ value }) => (typeof value === 'string' && value ? `${value.replace(/-copy(-[a-z0-9]+)?$/, '')}-copy-${Math.random().toString(36).slice(2, 6)}` : value)],
    beforeValidate: [
      ({ value, data }) => {
        const src = (value as string) || (data?.[from] as string) || ''
        return src
          .toString()
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      },
    ],
  },
})

/** Brand colour for a section or card. */
export const toneField = (name = 'tone', defaultValue = 'cream'): Field => ({
  name,
  type: 'select',
  defaultValue,
  options: [
    { label: 'White', value: 'white' },
    { label: 'Cream', value: 'cream' },
    { label: 'Yellow', value: 'yellow' },
    { label: 'Ink (dark)', value: 'ink' },
    { label: 'Coral', value: 'coral' },
    { label: 'Green (Dry Park)', value: 'dry' },
    { label: 'Blue (Wet-O-Wild)', value: 'wet' },
    { label: 'Purple (Super Bowl)', value: 'bowl' },
    { label: 'Ice blue (Snow Park)', value: 'snow' },
    { label: 'Lilac', value: 'lilac' },
  ],
})

/** A button: text, where it goes, and how it looks. */
export const linkField = (name = 'cta', label = 'Button', required = false): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'label', type: 'text', localized: true, required, admin: { width: '50%' } },
        {
          name: 'href',
          type: 'text',
          required,
          admin: { width: '50%', description: 'A site path like /book or /offers, or a full https:// link.' },
        },
      ],
    },
  ],
})

/** Search and social preview text. Falls back to the title and summary when empty. */
export const seoField: Field = {
  name: 'meta',
  label: 'SEO & sharing',
  type: 'group',
  admin: { description: 'What Google and WhatsApp/Facebook previews show. Leave empty to use the title and summary.' },
  fields: [
    { name: 'title', type: 'text', localized: true, admin: { description: 'Under 60 characters.' } },
    { name: 'description', type: 'textarea', localized: true, admin: { description: 'Under 160 characters.' } },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'noindex', type: 'checkbox', label: 'Hide from search engines' },
  ],
}

export const orderField: Field = {
  name: 'order',
  type: 'number',
  defaultValue: 0,
  admin: { position: 'sidebar', description: 'Lower numbers show first.' },
}
