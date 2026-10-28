/**
 * Shopify-style section design settings, upload guidance, and the two
 * free-form sections (Custom section with sub-blocks, Slideshow).
 */
import type { Block, Field } from 'payload'
import { linkField, toneField } from '../fields/common'

/* ------------------------------------------------------------------ */
/*  Upload guidance: every image/video field says what to upload       */
/* ------------------------------------------------------------------ */

export const HINT = {
  banner: 'Landscape photo, 1600 × 1000 px or larger (16:10). JPG or WebP, under 500 KB. Keep faces away from the edges.',
  wide: 'Landscape photo, 1600 × 900 px or larger (16:9). JPG or WebP, under 500 KB.',
  photo: 'Photo, 1200 × 900 px or larger (4:3). JPG or WebP, under 400 KB.',
  square: 'Square photo, 800 × 800 px or larger. JPG or WebP, under 300 KB.',
  card: 'Photo, 1200 × 750 px or larger (16:10). JPG or WebP, under 400 KB.',
  icon: 'Small picture or icon, 400 × 400 px. PNG with a transparent background, or SVG.',
  logo: 'Logo, PNG with a transparent background (at least 400 px wide) or SVG.',
  share: 'Share image for WhatsApp, Facebook and Google: exactly 1200 × 630 px, JPG, under 600 KB, text large and centred.',
  poster: 'Cover image shown before the video plays: 1280 × 720 px (16:9), JPG or WebP, under 300 KB.',
  video: 'MP4 (H.264) or WebM, 1280 × 720 or 1920 × 1080, 10–60 seconds, under 20 MB. No sound needed for "silent loop".',
  font: 'Font file: WOFF2 (best), WOFF or TTF. Check the font licence allows use on websites.',
  gallery: 'Photos, 1200 × 900 px or larger (4:3). JPG or WebP, under 400 KB each. Add them in the order you want.',
} as const

const NAME_HINT: [RegExp, string][] = [
  [/font/i, HINT.font],
  [/^(og|share|meta)?image$|ogImage|defaultOgImage/i, HINT.share],
  [/poster|cover/i, HINT.poster],
  [/^video$|^file$/i, HINT.video],
  [/logo|favicon/i, HINT.logo],
  [/mosaic|images|gallery/i, HINT.gallery],
  [/hero|banner|slide/i, HINT.banner],
]

/**
 * Adds an upload guide to any upload field that has no description of its
 * own, so editors always know what size and format to use. Context helps:
 * a field inside "slides" gets the banner advice, inside "meta" the share
 * image advice.
 */
export function withUploadHints(fields: Field[], context = ''): Field[] {
  return fields.map((f) => {
    if (f.type === 'upload') {
      const a = (f.admin ?? {}) as { description?: unknown }
      if (a.description) return f
      const key = `${context}.${f.name}`
      const hint =
        context.endsWith('meta') ? HINT.share : (NAME_HINT.find(([re]) => re.test(f.name))?.[1] ?? (/slides|hero/i.test(key) ? HINT.banner : /icon/i.test(key) ? HINT.icon : HINT.photo))
      return { ...f, admin: { ...f.admin, description: hint } } as Field
    }
    if (f.type === 'tabs') return { ...f, tabs: f.tabs.map((tb) => ({ ...tb, fields: withUploadHints(tb.fields, 'name' in tb && tb.name ? `${context}.${tb.name}` : context) })) }
    if ('fields' in f && Array.isArray(f.fields)) return { ...f, fields: withUploadHints(f.fields, 'name' in f && f.name ? `${context}.${f.name}` : context) } as Field
    if (f.type === 'blocks') return { ...f, blocks: f.blocks.map((b) => ({ ...b, fields: withUploadHints(b.fields, `${context}.${b.slug}`) })) }
    return f
  })
}

/* ------------------------------------------------------------------ */
/*  Design: the same settings on every section                         */
/* ------------------------------------------------------------------ */

const SPACE = [
  { label: 'As designed', value: 'auto' },
  { label: 'None', value: '0' },
  { label: 'Extra small', value: 'xs' },
  { label: 'Small', value: 's' },
  { label: 'Medium', value: 'm' },
  { label: 'Large', value: 'l' },
  { label: 'Extra large', value: 'xl' },
]

/** Sections whose text can be centred or right-aligned without breaking their layout. */
export const ALIGNABLE = new Set(['ctaBand', 'imageText', 'richText', 'video', 'columns', 'testimonials', 'faq', 'gallery', 'logoStrip', 'countdown', 'leadForm', 'custom', 'slideshow', 'map', 'journalTeaser', 'stats', 'offerSpotlight'])

export const designField = (slug: string): Field => ({
  name: 'design',
  label: 'Design',
  type: 'group',
  admin: { description: 'Size, colour, spacing and frame for this section only. "As designed" keeps the house style.' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'headingSize',
          label: 'Heading size',
          type: 'select',
          defaultValue: 'auto',
          admin: { width: '34%' },
          options: [
            { label: 'As designed', value: 'auto' },
            { label: 'Small (like H3)', value: 's' },
            { label: 'Medium (like H2)', value: 'm' },
            { label: 'Large', value: 'l' },
            { label: 'Huge (like H1)', value: 'xl' },
          ],
        },
        { name: 'headingFont', label: 'Heading font', type: 'select', defaultValue: 'auto', admin: { width: '33%' }, options: [{ label: 'Brand (bold display)', value: 'auto' }, { label: 'Plain (body font)', value: 'plain' }] },
        { name: 'textSize', label: 'Text size', type: 'select', defaultValue: 'auto', admin: { width: '33%' }, options: [{ label: 'As designed', value: 'auto' }, { label: 'Smaller', value: 's' }, { label: 'Larger', value: 'l' }] },
      ],
    },
    ...(ALIGNABLE.has(slug)
      ? [
          {
            name: 'align',
            label: 'Text alignment',
            type: 'select',
            defaultValue: 'auto',
            options: [
              { label: 'As designed', value: 'auto' },
              { label: 'Left', value: 'left' },
              { label: 'Centre', value: 'center' },
              { label: 'Right', value: 'right' },
            ],
          } as Field,
        ]
      : []),
    {
      type: 'row',
      fields: [
        { name: 'background', label: 'Custom background', type: 'text', admin: { width: '50%', description: 'Optional colour like #FFF8E6. Overrides the section colour. Text turns dark or light to stay readable.', components: { Field: '@/payload/components/ColorField#ColorField' } }, validate: (v: unknown) => (!v || /^#[0-9a-fA-F]{6}$/.test(String(v)) ? true : 'Use a colour like #FFF8E6') },
        {
          name: 'frame',
          label: 'Border / frame',
          type: 'select',
          defaultValue: 'none',
          admin: { width: '50%' },
          options: [
            { label: 'None', value: 'none' },
            { label: 'Thin lines above and below', value: 'line' },
            { label: 'Rounded box with outline', value: 'box' },
            { label: 'Rounded box with bold shadow', value: 'shadow' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'paddingTop', label: 'Space inside, top', type: 'select', defaultValue: 'auto', options: SPACE, admin: { width: '33%' } },
        { name: 'paddingBottom', label: 'Space inside, bottom', type: 'select', defaultValue: 'auto', options: SPACE, admin: { width: '33%' } },
        { name: 'marginBottom', label: 'Gap below section', type: 'select', defaultValue: 'auto', options: SPACE, admin: { width: '34%' } },
      ],
    },
    {
      name: 'width',
      label: 'Content width',
      type: 'select',
      defaultValue: 'auto',
      options: [
        { label: 'As designed', value: 'auto' },
        { label: 'Narrow (reading width)', value: 'narrow' },
        { label: 'Wide', value: 'wide' },
        { label: 'Full screen width', value: 'full' },
      ],
    },
  ],
})

/* ------------------------------------------------------------------ */
/*  Custom section: build your own from sub-blocks                     */
/* ------------------------------------------------------------------ */

const span: Field = {
  name: 'span',
  label: 'Width in the grid',
  type: 'select',
  defaultValue: '1',
  options: [
    { label: 'One column', value: '1' },
    { label: 'Two columns', value: '2' },
    { label: 'Whole row', value: 'full' },
  ],
}

export const subBlocks: Block[] = [
  { slug: 'subHeading', labels: { singular: 'Heading', plural: 'Headings' }, fields: [{ name: 'text', type: 'text', localized: true, required: true }, { name: 'size', type: 'select', defaultValue: 'm', options: [{ label: 'Small', value: 's' }, { label: 'Medium', value: 'm' }, { label: 'Large', value: 'l' }] }, span] },
  { slug: 'subText', labels: { singular: 'Text', plural: 'Texts' }, fields: [{ name: 'text', type: 'textarea', localized: true, required: true }, span] },
  {
    slug: 'subImage',
    labels: { singular: 'Image', plural: 'Images' },
    fields: [
      { name: 'image', type: 'upload', relationTo: 'media', required: true, admin: { description: HINT.photo } },
      { name: 'ratio', label: 'Shape', type: 'select', defaultValue: '4/3', options: [{ label: 'Landscape 4:3', value: '4/3' }, { label: 'Wide 16:9', value: '16/9' }, { label: 'Square', value: '1/1' }, { label: 'Portrait 4:5', value: '4/5' }] },
      { name: 'caption', type: 'text', localized: true },
      { name: 'href', label: 'Link (optional)', type: 'text' },
      span,
    ],
  },
  {
    slug: 'subCard',
    labels: { singular: 'Image + text card', plural: 'Image + text cards' },
    fields: [
      { name: 'image', type: 'upload', relationTo: 'media', admin: { description: HINT.card } },
      { name: 'title', type: 'text', localized: true, required: true },
      { name: 'text', type: 'textarea', localized: true },
      linkField('link', 'Link'),
      span,
    ],
  },
  {
    slug: 'subButton',
    labels: { singular: 'Button', plural: 'Buttons' },
    fields: [
      { type: 'row', fields: [{ name: 'label', type: 'text', localized: true, required: true, admin: { width: '50%' } }, { name: 'href', type: 'text', required: true, admin: { width: '50%', description: '/book, /offers or https://…' } }] },
      { name: 'style', type: 'select', defaultValue: 'primary', options: [{ label: 'Yellow (buy)', value: 'primary' }, { label: 'Outline', value: 'outline' }, { label: 'Dark', value: 'dark' }] },
      span,
    ],
  },
  {
    slug: 'subVideo',
    labels: { singular: 'Video', plural: 'Videos' },
    fields: [
      { name: 'source', type: 'select', defaultValue: 'upload', options: [{ label: 'Video file', value: 'upload' }, { label: 'YouTube', value: 'youtube' }, { label: 'Vimeo', value: 'vimeo' }] },
      { name: 'file', type: 'upload', relationTo: 'media', custom: { showIf: { source: 'upload' } }, admin: { condition: (_, s) => s?.source === 'upload', description: HINT.video } },
      { name: 'url', type: 'text', custom: { showIf: { source: ['youtube', 'vimeo'] } }, admin: { condition: (_, s) => s?.source !== 'upload' } },
      { name: 'poster', label: 'Cover image', type: 'upload', relationTo: 'media', admin: { description: HINT.poster } },
      { name: 'autoplay', type: 'checkbox', label: 'Silent loop' },
      span,
    ],
  },
  {
    slug: 'subQuote',
    labels: { singular: 'Quote', plural: 'Quotes' },
    fields: [{ name: 'quote', type: 'textarea', localized: true, required: true }, { name: 'name', type: 'text' }, span],
  },
  {
    slug: 'subList',
    labels: { singular: 'Tick list', plural: 'Tick lists' },
    fields: [{ name: 'items', type: 'array', fields: [{ name: 'text', type: 'text', localized: true, required: true }] }, span],
  },
  { slug: 'subGap', labels: { singular: 'Empty space', plural: 'Empty spaces' }, fields: [{ name: 'size', type: 'select', defaultValue: 'm', options: [{ label: 'Small', value: 's' }, { label: 'Medium', value: 'm' }, { label: 'Large', value: 'l' }] }, span] },
]

export const CustomBlock: Block = {
  slug: 'custom',
  labels: { singular: 'Custom section', plural: 'Custom sections' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, admin: { description: 'Small line above the heading.' } },
    { name: 'heading', type: 'text', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
    toneField('tone', 'white'),
    {
      name: 'columns',
      label: 'Columns on computers',
      type: 'select',
      defaultValue: '2',
      admin: { description: 'Phones always show one column; tablets show up to two.' },
      options: [
        { label: '1 (stacked)', value: '1' },
        { label: '2 (half and half)', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
    },
    { name: 'verticalAlign', label: 'Line items up', type: 'select', defaultValue: 'start', options: [{ label: 'Top', value: 'start' }, { label: 'Middle', value: 'center' }] },
    {
      name: 'items',
      label: 'Blocks inside this section',
      type: 'blocks',
      blocks: subBlocks,
      admin: { description: 'Add headings, text, images, image + text cards, buttons, videos, quotes and lists, then arrange them.' },
    },
  ],
}

/* ------------------------------------------------------------------ */
/*  Slideshow / image carousel                                         */
/* ------------------------------------------------------------------ */

export const SlideshowBlock: Block = {
  slug: 'slideshow',
  labels: { singular: 'Slideshow / carousel', plural: 'Slideshows' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'framed',
      options: [
        { label: 'One photo at a time, framed (best for the park photos)', value: 'framed' },
        { label: 'Carousel of cards (several in view)', value: 'cards' },
        { label: 'Edge to edge (only for large photos, 1920 px+)', value: 'full' },
      ],
    },
    { name: 'autoplaySeconds', label: 'Change every (seconds)', type: 'number', defaultValue: 5, min: 0, max: 30, admin: { description: '0 = only when the visitor swipes or presses the arrows. Never moves for visitors who prefer reduced motion.' } },
    toneField('tone', 'cream'),
    {
      name: 'slides',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Slide', plural: 'Slides' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true, admin: { description: `${HINT.wide} For "Edge to edge": 1920 × 900 px or larger.` } },
        { name: 'heading', type: 'text', localized: true },
        { name: 'text', type: 'textarea', localized: true },
        linkField('link', 'Button'),
      ],
    },
  ],
}
