import type { Block, Field } from 'payload'
import { linkField, toneField } from '../fields/common'

/**
 * Page sections. Every block here has a renderer in src/blocks/ (switch in
 * RenderBlocks.tsx) and is picked from the "Add section" menu on any Page,
 * World, Offer or Event landing page. Order them by dragging; text fields are
 * translated per language (language switcher at the top of the document).
 */

import { CustomBlock, designField, HINT, SlideshowBlock, withUploadHints } from './design'

const heading = (name = 'heading', label = 'Heading'): Field => ({ name, label, type: 'text', localized: true })
const eyebrow: Field = { name: 'eyebrow', type: 'text', localized: true, admin: { description: 'Small line above the heading.' } }
const intro: Field = { name: 'intro', type: 'textarea', localized: true }

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero banner', plural: 'Hero banners' },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'framed',
      required: true,
      admin: { description: 'How the banner is laid out. Preview every style at /en/hero-options.' },
      options: [
        { label: 'Framed photo on colour (best for the park photos)', value: 'framed' },
        { label: 'Split: colour panel + photo', value: 'split' },
        { label: 'Offer cards (three deals at once)', value: 'cards' },
        { label: 'Photo mosaic (no sliding)', value: 'mosaic' },
        { label: 'Booking first (yellow, date picker under it)', value: 'ticket' },
        { label: 'Full-screen photo (needs large, sharp photos)', value: 'fullbleed' },
        { label: 'Video background', value: 'video' },
      ],
    },
    { name: 'autoplaySeconds', type: 'number', defaultValue: 6.5, admin: { description: 'Seconds per slide. 0 turns autoplay off.' } },
    { name: 'showBookingBox', type: 'checkbox', defaultValue: true, label: 'Show the booking box under the banner' },
    {
      name: 'slides',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Slide', plural: 'Slides' },
      admin: { initCollapsed: true, components: { RowLabel: '@/payload/components/RowLabel#SlideRowLabel' } },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'tab', type: 'text', localized: true, required: true, admin: { width: '33%', description: 'Short name on the slide tabs.' } },
            {
              name: 'tone',
              type: 'select',
              defaultValue: 'ink',
              admin: { width: '33%' },
              options: [
                { label: 'Ink (dark)', value: 'ink' },
                { label: 'Green (Dry Park)', value: 'dry' },
                { label: 'Blue (Wet-O-Wild)', value: 'wet' },
                { label: 'Purple (Super Bowl)', value: 'bowl' },
                { label: 'Ice blue (Snow Park)', value: 'snow' },
                { label: 'Coral (festive)', value: 'alert' },
              ],
            },
            { name: 'badge', type: 'text', localized: true, admin: { width: '33%' } },
          ],
        },
        eyebrow,
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'body', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'price', type: 'text', localized: true, admin: { description: 'Shown on the round sticker, e.g. "Tickets from ₹400".' } },
        linkField('cta', 'Main button', true),
        linkField('secondary', 'Second link'),
        { name: 'isBrandHeadline', type: 'checkbox', label: 'Use the "Ride. Splash. Strike." headline (page H1)' },
      ],
    },
    { name: 'mosaic', type: 'upload', relationTo: 'media', hasMany: true, custom: { showIf: { style: 'mosaic' } }, admin: { condition: (_, s) => s?.style === 'mosaic', description: '4 to 6 photos.' } },
    { name: 'video', type: 'upload', relationTo: 'media', custom: { showIf: { style: 'video' } }, admin: { condition: (_, s) => s?.style === 'video', description: 'MP4 or WebM, under 10 MB, no sound needed. Upload in the Media library.' } },
  ],
}

export const TickerBlock: Block = {
  slug: 'ticker',
  labels: { singular: 'Offer ticker', plural: 'Offer tickers' },
  fields: [
    toneField('tone', 'yellow'),
    { name: 'items', type: 'array', fields: [{ name: 'label', type: 'text', localized: true, required: true }, { name: 'href', type: 'text' }] },
  ],
}

export const TicketCardsBlock: Block = {
  slug: 'ticketCards',
  labels: { singular: 'Ticket cards', plural: 'Ticket cards' },
  fields: [
    eyebrow,
    heading(),
    intro,
    toneField('tone', 'cream'),
    { name: 'tickets', type: 'relationship', relationTo: 'tickets', hasMany: true, admin: { description: 'Leave empty to show every ticket.' } },
  ],
}

export const EventsRailBlock: Block = {
  slug: 'eventsRail',
  labels: { singular: 'Events row', plural: 'Events rows' },
  fields: [
    eyebrow,
    heading(),
    intro,
    toneField('tone', 'wet'),
    { name: 'events', type: 'relationship', relationTo: 'events', hasMany: true, admin: { description: 'Leave empty to show the events marked "Highlight on home".' } },
  ],
}

export const WorldsGridBlock: Block = {
  slug: 'worldsGrid',
  labels: { singular: 'Worlds grid', plural: 'Worlds grids' },
  fields: [eyebrow, heading()],
}

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Big numbers', plural: 'Big numbers' },
  fields: [
    heading(),
    toneField('tone', 'dry'),
    { name: 'items', type: 'array', admin: { description: 'Leave empty to use the numbers in Site settings.' }, fields: [{ name: 'value', type: 'text', localized: true }, { name: 'label', type: 'text', localized: true }] },
    { name: 'showTrust', type: 'checkbox', defaultValue: true, label: 'Show the trust badges' },
  ],
}

export const CrewPlannerBlock: Block = {
  slug: 'crewPlanner',
  labels: { singular: '"Who\'s coming?" planner', plural: '"Who\'s coming?" planners' },
  fields: [heading(), intro, { name: 'crews', type: 'relationship', relationTo: 'crews', hasMany: true }],
}

export const MomentsWallBlock: Block = {
  slug: 'momentsWall',
  labels: { singular: '#NiccoMoments wall', plural: '#NiccoMoments walls' },
  fields: [heading(), intro, { name: 'count', type: 'number', defaultValue: 8 }],
}

export const JournalTeaserBlock: Block = {
  slug: 'journalTeaser',
  labels: { singular: 'Journal guides', plural: 'Journal guides' },
  fields: [eyebrow, heading(), toneField('tone', 'cream'), { name: 'count', type: 'number', defaultValue: 3 }],
}

export const TodayStatusBlock: Block = {
  slug: 'todayStatus',
  labels: { singular: 'Today at the park', plural: 'Today at the park' },
  fields: [heading(), { name: 'showWhatsapp', type: 'checkbox', defaultValue: true }],
}

export const CTABandBlock: Block = {
  slug: 'ctaBand',
  labels: { singular: 'Call-to-action band', plural: 'Call-to-action bands' },
  fields: [heading(), { name: 'body', type: 'textarea', localized: true }, toneField('tone', 'coral'), linkField('primary', 'Main button', true), linkField('secondary', 'Second button')],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Text', plural: 'Text' },
  fields: [
    toneField('tone', 'white'),
    { name: 'width', type: 'select', defaultValue: 'narrow', options: [{ label: 'Reading width', value: 'narrow' }, { label: 'Full width', value: 'wide' }] },
    { name: 'content', type: 'richText', localized: true },
  ],
}

export const ImageTextBlock: Block = {
  slug: 'imageText',
  labels: { singular: 'Image + text', plural: 'Image + text' },
  fields: [
    eyebrow,
    heading(),
    { name: 'body', type: 'textarea', localized: true },
    {
      name: 'media',
      label: 'Show',
      type: 'select',
      defaultValue: 'image',
      options: [
        { label: 'Photo', value: 'image' },
        { label: 'Video file', value: 'video' },
        { label: 'YouTube / Vimeo', value: 'link' },
      ],
    },
    { name: 'image', label: 'Photo (or video cover)', type: 'upload', relationTo: 'media', admin: { description: HINT.photo } },
    { name: 'video', label: 'Video file', type: 'upload', relationTo: 'media', custom: { showIf: { media: 'video' } }, admin: { condition: (_, s) => s?.media === 'video', description: HINT.video } },
    { name: 'videoUrl', label: 'YouTube or Vimeo link', type: 'text', custom: { showIf: { media: 'link' } }, admin: { condition: (_, s) => s?.media === 'link' } },
    { name: 'autoplay', type: 'checkbox', label: 'Video: play silently on loop', custom: { showIf: { media: 'video' } }, admin: { condition: (_, s) => s?.media === 'video' } },
    {
      type: 'row',
      fields: [
        { name: 'imageSide', label: 'Photo side', type: 'select', defaultValue: 'right', options: [{ label: 'Left', value: 'left' }, { label: 'Right', value: 'right' }], admin: { width: '33%' } },
        {
          name: 'split',
          label: 'Split',
          type: 'select',
          defaultValue: '50',
          admin: { width: '33%' },
          options: [
            { label: 'Half and half', value: '50' },
            { label: 'More text (60 / 40)', value: '40' },
            { label: 'More photo (40 / 60)', value: '60' },
          ],
        },
        { name: 'imageStyle', label: 'Photo style', type: 'select', defaultValue: 'framed', admin: { width: '34%' }, options: [{ label: 'Framed card', value: 'framed' }, { label: 'Rounded, no frame', value: 'rounded' }, { label: 'Fills its half', value: 'fill' }] },
      ],
    },
    toneField('tone', 'white'),
    linkField('cta', 'Button'),
    linkField('secondary', 'Second button'),
  ],
}

export const FAQBlock: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    heading(),
    { name: 'faqs', type: 'relationship', relationTo: 'faqs', hasMany: true, admin: { description: 'Pick from the shared FAQs. Leave empty (and add none below) to show them all.' } },
    {
      name: 'items',
      label: 'Extra questions for this page only',
      type: 'array',
      fields: [
        { name: 'q', label: 'Question', type: 'text', localized: true, required: true },
        { name: 'a', label: 'Answer', type: 'textarea', localized: true, required: true },
      ],
    },
  ],
}

export const OfferGridBlock: Block = {
  slug: 'offerGrid',
  labels: { singular: 'Offers grid', plural: 'Offers grids' },
  fields: [heading(), toneField('tone', 'white'), { name: 'offers', type: 'relationship', relationTo: 'offers', hasMany: true, admin: { description: 'Leave empty to show live offers.' } }],
}

export const CountdownBlock: Block = {
  slug: 'countdown',
  labels: { singular: 'Countdown', plural: 'Countdowns' },
  fields: [heading(), { name: 'body', type: 'textarea', localized: true }, { name: 'endsAt', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayAndTime' } } }, toneField('tone', 'ink'), linkField('cta', 'Button')],
}

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: { singular: 'Photo gallery', plural: 'Photo galleries' },
  fields: [
    heading(),
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true, required: true, admin: { description: HINT.gallery } },
    { name: 'columns', label: 'Photos per row on computers', type: 'select', defaultValue: '3', options: ['2', '3', '4'] },
  ],
}

export const LeadFormBlock: Block = {
  slug: 'leadForm',
  labels: { singular: 'Sign-up form', plural: 'Sign-up forms' },
  fields: [
    heading(),
    { name: 'body', type: 'textarea', localized: true },
    {
      name: 'formType',
      type: 'select',
      defaultValue: 'offers',
      options: [
        { label: 'Offers on WhatsApp', value: 'offers' },
        { label: 'Snow Park waitlist', value: 'waitlist' },
        { label: 'Call me back', value: 'callback' },
        { label: 'Group / event enquiry', value: 'groups' },
        { label: 'General message (contact form)', value: 'contact' },
      ],
    },
    { name: 'buttonLabel', type: 'text', localized: true },
    toneField('tone', 'yellow'),
  ],
}

const ICONS = ['ticket', 'ride', 'water', 'bowling', 'snow', 'food', 'bus', 'clock', 'star', 'shield', 'gift', 'users', 'map', 'parking', 'camera', 'accessibility', 'school', 'cake', 'sparkles', 'phone'].map((v) => ({ label: v, value: v }))

export const VideoBlock: Block = {
  slug: 'video',
  labels: { singular: 'Video', plural: 'Videos' },
  fields: [
    eyebrow,
    heading(),
    { name: 'body', type: 'textarea', localized: true },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'upload',
      options: [
        { label: 'Video file from the Media library', value: 'upload' },
        { label: 'YouTube link', value: 'youtube' },
        { label: 'Vimeo link', value: 'vimeo' },
      ],
    },
    { name: 'file', label: 'Video file', type: 'upload', relationTo: 'media', custom: { showIf: { source: 'upload' } }, admin: { condition: (_, s) => s?.source === 'upload', description: 'MP4 or WebM. Under 20 MB plays smoothly on phones.' } },
    { name: 'url', label: 'Video link', type: 'text', custom: { showIf: { source: ['youtube', 'vimeo'] } }, admin: { condition: (_, s) => s?.source !== 'upload', description: 'e.g. https://www.youtube.com/watch?v=…' } },
    { name: 'poster', label: 'Cover image', type: 'upload', relationTo: 'media', admin: { description: 'Shown before the video plays. Recommended.' } },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'framed',
      options: [
        { label: 'Framed (keeps small videos sharp)', value: 'framed' },
        { label: 'Wide', value: 'wide' },
        { label: 'Video beside text', value: 'split' },
      ],
    },
    { name: 'autoplay', type: 'checkbox', label: 'Play silently on loop (no sound, starts by itself)', admin: { description: 'Otherwise visitors press play. Ignored for visitors who prefer reduced motion.' } },
    toneField('tone', 'ink'),
    linkField('cta', 'Button'),
  ],
}

export const ColumnsBlock: Block = {
  slug: 'columns',
  labels: { singular: 'Columns (icons / features)', plural: 'Columns' },
  fields: [
    eyebrow,
    heading(),
    intro,
    toneField('tone', 'white'),
    { name: 'perRow', label: 'Columns on desktop', type: 'select', defaultValue: '3', options: ['2', '3', '4'] },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Column', plural: 'Columns' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'icon', type: 'select', options: ICONS, admin: { width: '30%' } },
            { name: 'title', type: 'text', localized: true, required: true, admin: { width: '70%' } },
          ],
        },
        { name: 'text', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Optional, instead of the icon.' } },
        linkField('link', 'Link'),
      ],
    },
  ],
}

export const OfferSpotlightBlock: Block = {
  slug: 'offerSpotlight',
  labels: { singular: 'Offer spotlight', plural: 'Offer spotlights' },
  fields: [
    { name: 'offer', type: 'relationship', relationTo: 'offers', required: true, admin: { description: 'The offer to feature. Its deal, terms, image and button come from the offer itself.' } },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'banner',
      options: [
        { label: 'Wide banner', value: 'banner' },
        { label: 'Card beside text', value: 'card' },
        { label: 'Slim strip', value: 'strip' },
      ],
    },
    { name: 'heading', type: 'text', localized: true, admin: { description: 'Optional. Defaults to the offer name.' } },
    toneField('tone', 'coral'),
    { name: 'showEnds', type: 'checkbox', defaultValue: true, label: 'Show the end date (if the offer has one)' },
  ],
}

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: { singular: 'Visitor quotes', plural: 'Visitor quotes' },
  fields: [
    heading(),
    toneField('tone', 'cream'),
    {
      name: 'items',
      type: 'array',
      admin: { description: 'Use real visitor words with their permission. Don\'t write reviews yourself.' },
      fields: [
        { name: 'quote', type: 'textarea', localized: true, required: true },
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'detail', type: 'text', localized: true, admin: { width: '50%', description: 'e.g. "Family of four, Howrah"' } },
          ],
        },
        { name: 'source', type: 'text', admin: { description: 'Where it came from (Google review, Instagram…). Shown small.' } },
      ],
    },
  ],
}

export const LogoStripBlock: Block = {
  slug: 'logoStrip',
  labels: { singular: 'Logo strip', plural: 'Logo strips' },
  fields: [
    heading(),
    {
      name: 'logos',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true, admin: { width: '40%' } },
            { name: 'href', type: 'text', admin: { width: '60%' } },
          ],
        },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}

export const MapBlock: Block = {
  slug: 'map',
  labels: { singular: 'Map & directions', plural: 'Maps' },
  fields: [
    heading(),
    intro,
    { name: 'query', type: 'text', defaultValue: 'Nicco Park, Jheel Meel, Sector IV, Salt Lake, Kolkata', admin: { description: 'What the map searches for.' } },
    { name: 'showRoutes', type: 'checkbox', defaultValue: true, label: 'Show "Getting here" (from Plan your visit)' },
  ],
}

export const SpacerBlock: Block = {
  slug: 'spacer',
  labels: { singular: 'Spacer / divider', plural: 'Spacers' },
  fields: [
    { name: 'size', type: 'select', defaultValue: 'm', options: [{ label: 'Small', value: 's' }, { label: 'Medium', value: 'm' }, { label: 'Large', value: 'l' }] },
    { name: 'divider', type: 'checkbox', label: 'Show a line' },
  ],
}

export const RidesListBlock: Block = {
  slug: 'ridesList',
  labels: { singular: 'Rides list', plural: 'Rides lists' },
  fields: [
    heading(),
    {
      name: 'world',
      type: 'select',
      required: true,
      defaultValue: 'dry',
      options: [
        { label: 'Dry Park', value: 'dry' },
        { label: 'Wet-O-Wild', value: 'wet' },
        { label: 'Super Bowl', value: 'bowl' },
      ],
    },
  ],
}

export const VenuesGridBlock: Block = {
  slug: 'venuesGrid',
  labels: { singular: 'Venues grid', plural: 'Venues grids' },
  fields: [heading(), intro],
}

export const EmbedBlock: Block = {
  slug: 'embed',
  labels: { singular: 'Custom embed', plural: 'Custom embeds' },
  fields: [
    heading(),
    {
      name: 'code',
      type: 'code',
      admin: { language: 'html', description: 'Embed code from a trusted service (form, booking widget, Instagram post). It runs in a locked box (sandboxed iframe), so it can\'t read the site or visitors\' data.' },
      access: { update: ({ req }) => (req.user as { role?: string } | null)?.role === 'admin', create: ({ req }) => (req.user as { role?: string } | null)?.role === 'admin' },
    },
    { name: 'height', type: 'number', defaultValue: 480, admin: { description: 'Height in pixels.' } },
  ],
}

export const ReusableBlock: Block = {
  slug: 'reusable',
  labels: { singular: 'Saved section', plural: 'Saved sections' },
  fields: [{ name: 'section', type: 'relationship', relationTo: 'sections', required: true, admin: { description: 'Edit it in Pages & campaigns → Saved sections; every page using it updates.' } }],
}

/* ------------------------------------------------------------------ */
/*  Settings every section has, and how the "Add section" menu groups  */
/* ------------------------------------------------------------------ */

/**
 * Shown, like Shopify, under each section: hide it without deleting it,
 * show it only on phones or only on bigger screens, schedule it, or give it
 * an anchor so a button can jump to it (#anchor).
 */
const displayField: Field = {
  name: 'display',
  label: 'Visibility',
  type: 'group',
  admin: { description: 'Hide, schedule or target this section.' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'hidden', type: 'checkbox', label: 'Hidden', admin: { width: '25%' } },
        {
          name: 'showOn',
          type: 'select',
          defaultValue: 'all',
          admin: { width: '35%' },
          options: [
            { label: 'Phones and computers', value: 'all' },
            { label: 'Phones only', value: 'mobile' },
            { label: 'Tablets & computers only', value: 'desktop' },
          ],
        },
        { name: 'anchor', type: 'text', admin: { width: '40%', description: 'Jump link name, e.g. "summer" → #summer' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'showFrom', type: 'date', admin: { width: '50%', date: { pickerAppearance: 'dayAndTime' }, description: 'Optional: appears from…' } },
        { name: 'showUntil', type: 'date', admin: { width: '50%', date: { pickerAppearance: 'dayAndTime' }, description: '…and disappears after.' } },
      ],
    },
  ],
}

/** Groups and one-line descriptions for the section picker (visual editor and admin). */
export const SECTION_INFO: Record<string, { category: string; description: string; icon: string }> = {
  hero: { category: 'Banners', description: 'The big banner at the top: 7 styles, slides, buttons, booking box.', icon: 'image' },
  ticker: { category: 'Banners', description: 'A moving strip of deals and short messages.', icon: 'megaphone' },
  offerSpotlight: { category: 'Tickets & offers', description: 'Feature one offer: deal, terms, end date and button.', icon: 'badge-percent' },
  countdown: { category: 'Banners', description: 'Days, hours and minutes left, e.g. until a sale ends.', icon: 'timer' },
  ctaBand: { category: 'Banners', description: 'A bold coloured band with a big heading and buttons.', icon: 'mouse-pointer-click' },
  ticketCards: { category: 'Tickets & offers', description: 'The ticket cards with prices and buy buttons.', icon: 'ticket' },
  offerGrid: { category: 'Tickets & offers', description: 'A grid of offers (all live ones, or the ones you pick).', icon: 'tags' },
  worldsGrid: { category: 'The park', description: 'Dry Park, Wet-O-Wild, Super Bowl and Snow Park cards.', icon: 'ferris-wheel' },
  ridesList: { category: 'The park', description: 'Every ride in one world, with filters.', icon: 'rocket' },
  eventsRail: { category: 'The park', description: 'Upcoming events and seasons.', icon: 'calendar-days' },
  todayStatus: { category: 'The park', description: "Today's hours, ride alerts and WhatsApp booking.", icon: 'clock' },
  crewPlanner: { category: 'The park', description: '"Who\'s coming?" — a day plan for each kind of group.', icon: 'users' },
  venuesGrid: { category: 'The park', description: 'Halls and lawns for events, with capacity.', icon: 'building-2' },
  map: { category: 'The park', description: 'Google map of the park and how to get there.', icon: 'map-pin' },
  stats: { category: 'Text & media', description: 'Big numbers and trust badges.', icon: 'chart-no-axes-column' },
  imageText: { category: 'Text & media', description: 'Half and half: a photo or video beside a heading, text and buttons.', icon: 'panels-left-bottom' },
  columns: { category: 'Text & media', description: '2–4 columns with an icon or photo, title and text.', icon: 'columns-3' },
  richText: { category: 'Text & media', description: 'Free text with headings, lists and links.', icon: 'text' },
  custom: { category: 'Text & media', description: 'Build your own: headings, text, images, image + text cards, buttons, videos, quotes, in 1–4 columns.', icon: 'layout-grid' },
  slideshow: { category: 'Text & media', description: 'Photos one after another (or a swipeable carousel), with captions and buttons.', icon: 'gallery-horizontal' },
  video: { category: 'Text & media', description: 'An uploaded video or a YouTube/Vimeo link, with cover image.', icon: 'video' },
  gallery: { category: 'Text & media', description: 'A grid of photos.', icon: 'images' },
  testimonials: { category: 'Text & media', description: 'Real quotes from visitors.', icon: 'quote' },
  logoStrip: { category: 'Text & media', description: 'Partner or sponsor logos.', icon: 'award' },
  faq: { category: 'Engage', description: 'Questions and answers (open and close).', icon: 'circle-help' },
  leadForm: { category: 'Engage', description: 'Sign-up, call-back, group enquiry or contact form.', icon: 'mail' },
  momentsWall: { category: 'Engage', description: 'Visitor photos from #NiccoMoments.', icon: 'camera' },
  journalTeaser: { category: 'Engage', description: 'The latest Joyride Journal guides.', icon: 'book-open' },
  embed: { category: 'Engage', description: 'Embed code from another service, safely boxed (admins only).', icon: 'code' },
  spacer: { category: 'Layout', description: 'Extra space or a dividing line.', icon: 'separator-horizontal' },
  reusable: { category: 'Layout', description: 'A saved section shared by many pages.', icon: 'copy' },
}

const withCommon = (b: Block): Block => ({
  ...b,
  fields: withUploadHints([...b.fields, designField(b.slug), displayField], b.slug),
  custom: { ...b.custom, ...(SECTION_INFO[b.slug] ?? {}) },
  admin: { ...b.admin, components: { ...b.admin?.components, Label: '@/payload/components/RowLabel#BlockRowLabel' } },
})

const allBlocks: Block[] = [
  HeroBlock,
  TickerBlock,
  OfferSpotlightBlock,
  CountdownBlock,
  CTABandBlock,
  TicketCardsBlock,
  OfferGridBlock,
  WorldsGridBlock,
  RidesListBlock,
  EventsRailBlock,
  TodayStatusBlock,
  CrewPlannerBlock,
  VenuesGridBlock,
  MapBlock,
  StatsBlock,
  ImageTextBlock,
  ColumnsBlock,
  CustomBlock,
  RichTextBlock,
  VideoBlock,
  SlideshowBlock,
  GalleryBlock,
  TestimonialsBlock,
  LogoStripBlock,
  FAQBlock,
  LeadFormBlock,
  MomentsWallBlock,
  JournalTeaserBlock,
  EmbedBlock,
  SpacerBlock,
  ReusableBlock,
].map(withCommon)

/** Every section a page can use, in the order of the "Add section" menu. */
export const pageBlocks: Block[] = allBlocks

/** What a saved section may contain (everything except another saved section). */
export const reusableBlocks: Block[] = allBlocks.filter((b) => b.slug !== 'reusable')

/** Journal article body: small, easy blocks that keep the house style. */
const articleBase: Block[] = [
  { slug: 'p', labels: { singular: 'Paragraph', plural: 'Paragraphs' }, fields: [{ name: 'text', type: 'textarea', localized: true, required: true }] },
  { slug: 'h2', labels: { singular: 'Sub-heading', plural: 'Sub-headings' }, fields: [{ name: 'text', type: 'text', localized: true, required: true }, { name: 'anchor', type: 'text', admin: { description: 'Optional jump-link name, e.g. "parking" → #parking. Also listed in "On this page".' } }] },
  { slug: 'h3', labels: { singular: 'Small heading', plural: 'Small headings' }, fields: [{ name: 'text', type: 'text', localized: true, required: true }] },
  {
    slug: 'list',
    labels: { singular: 'List', plural: 'Lists' },
    fields: [
      { name: 'style', type: 'select', defaultValue: 'tick', options: [{ label: 'Ticks', value: 'tick' }, { label: 'Numbered steps', value: 'numbered' }, { label: 'Bullets', value: 'bullet' }] },
      { name: 'items', type: 'array', fields: [{ name: 'text', type: 'text', localized: true, required: true }] },
    ],
  },
  {
    slug: 'image',
    labels: { singular: 'Photo', plural: 'Photos' },
    fields: [
      { name: 'image', type: 'upload', relationTo: 'media', required: true, admin: { description: `${HINT.photo} Describe it well in the Media library (alt text): Google reads it.` } },
      { name: 'caption', type: 'text', localized: true },
      { name: 'size', type: 'select', defaultValue: 'column', options: [{ label: 'Text width', value: 'column' }, { label: 'Small, text wraps on the left', value: 'right' }, { label: 'Small, text wraps on the right', value: 'left' }] },
    ],
  },
  {
    slug: 'gallery',
    labels: { singular: 'Photo gallery / slideshow', plural: 'Photo galleries' },
    fields: [
      { name: 'images', type: 'upload', relationTo: 'media', hasMany: true, required: true, admin: { description: HINT.gallery } },
      { name: 'style', type: 'select', defaultValue: 'grid', options: [{ label: 'Grid', value: 'grid' }, { label: 'Slideshow', value: 'slideshow' }] },
      { name: 'caption', type: 'text', localized: true },
    ],
  },
  {
    slug: 'video',
    labels: { singular: 'Video', plural: 'Videos' },
    fields: [
      { name: 'source', type: 'select', defaultValue: 'youtube', options: [{ label: 'YouTube', value: 'youtube' }, { label: 'Vimeo', value: 'vimeo' }, { label: 'Video file', value: 'upload' }] },
      { name: 'url', type: 'text', custom: { showIf: { source: ['youtube', 'vimeo'] } }, admin: { condition: (_, s) => s?.source !== 'upload' } },
      { name: 'file', type: 'upload', relationTo: 'media', custom: { showIf: { source: 'upload' } }, admin: { condition: (_, s) => s?.source === 'upload', description: HINT.video } },
      { name: 'poster', label: 'Cover image', type: 'upload', relationTo: 'media', admin: { description: HINT.poster } },
      { name: 'caption', type: 'text', localized: true },
    ],
  },
  {
    slug: 'imageText',
    labels: { singular: 'Photo beside text', plural: 'Photos beside text' },
    fields: [
      { name: 'image', type: 'upload', relationTo: 'media', required: true, admin: { description: HINT.photo } },
      { name: 'heading', type: 'text', localized: true },
      { name: 'text', type: 'textarea', localized: true, required: true },
      { name: 'side', label: 'Photo side', type: 'select', defaultValue: 'left', options: ['left', 'right'] },
    ],
  },
  { slug: 'quote', labels: { singular: 'Quote', plural: 'Quotes' }, fields: [{ name: 'text', type: 'textarea', localized: true, required: true }, { name: 'name', type: 'text', admin: { description: 'Who said it. Use real words, with permission.' } }] },
  { slug: 'tip', labels: { singular: 'Good-to-know box', plural: 'Good-to-know boxes' }, fields: [{ name: 'text', type: 'textarea', localized: true, required: true }] },
  {
    slug: 'offer',
    labels: { singular: 'Offer card', plural: 'Offer cards' },
    fields: [{ name: 'offer', type: 'relationship', relationTo: 'offers', required: true, admin: { description: 'Shows the offer with its price, end date and button. Updates itself when the offer changes.' } }],
  },
  {
    slug: 'cta',
    labels: { singular: 'Booking prompt', plural: 'Booking prompts' },
    fields: [{ name: 'text', type: 'text', localized: true, required: true }, { name: 'label', type: 'text', localized: true, required: true }, { name: 'href', type: 'text', required: true }],
  },
  { slug: 'divider', labels: { singular: 'Divider', plural: 'Dividers' }, fields: [{ name: 'note', type: 'text', admin: { description: 'Not shown. Just a line between parts of the article.' } }] },
]

export const ARTICLE_INFO: Record<string, { category: string; description: string; icon: string }> = {
  p: { category: 'Text', description: 'A paragraph of text.', icon: 'p' },
  h2: { category: 'Text', description: 'Starts a new part of the article. Google uses these to understand it.', icon: 'h2' },
  h3: { category: 'Text', description: 'A smaller heading inside a part.', icon: 'h2' },
  list: { category: 'Text', description: 'Ticks, numbered steps or bullets.', icon: 'list' },
  quote: { category: 'Text', description: 'Words from a visitor or the team.', icon: 'quote' },
  tip: { category: 'Text', description: 'A yellow "Good to know" box.', icon: 'tip' },
  image: { category: 'Media', description: 'One photo with a caption.', icon: 'image' },
  gallery: { category: 'Media', description: 'Several photos as a grid or slideshow.', icon: 'images' },
  video: { category: 'Media', description: 'YouTube, Vimeo or an uploaded video.', icon: 'video' },
  imageText: { category: 'Media', description: 'A photo beside a paragraph.', icon: 'panels-left-bottom' },
  offer: { category: 'Selling', description: 'A live offer card with its button.', icon: 'badge-percent' },
  cta: { category: 'Selling', description: 'A dark box with a sentence and a button.', icon: 'cta' },
  divider: { category: 'Layout', description: 'A line between parts.', icon: 'separator-horizontal' },
}

export const articleBlocks: Block[] = articleBase.map((b) => ({ ...b, custom: { ...ARTICLE_INFO[b.slug] } }))
