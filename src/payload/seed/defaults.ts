/**
 * Default menus, footer and home-page sections. Used by the seed and as the
 * fallback when a global has never been saved.
 */

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/** Landing-page addresses that read well in an ad: /offers/student-offer, /whats-on/durga-puja-fun-express. */
export const offerSlug = (name: string) => slugify(name)
export const eventSlug = (name: string) =>
  ({ 'New Year’s Day': 'new-years-day', 'Christmas & New Year': 'christmas-and-new-year', 'Park closed for Holi': 'holi-closure' })[name] ?? slugify(name)

export const TICKER = [
  { label: 'Students 20% off', href: '/book?student=1' },
  { label: 'Fun Fest 15% off', href: '/offers/fun-fest' },
  { label: 'Under 80 cm go free', href: '/offers' },
  { label: 'Government staff price with ID', href: '/offers' },
  { label: 'QR ticket on WhatsApp in seconds', href: '/book' },
  { label: 'Free date change until the day before', href: '/book' },
  { label: 'Best price only on niccoparks.com', href: '/offers' },
]

export const defaultHeader = {
  nav: [
    { label: 'Tickets & offers', href: '/offers' },
    { label: 'Worlds', href: '/worlds/dry-park' },
    { label: "What's on", href: '/whats-on' },
    { label: '#NiccoMoments', href: '/moments', wideOnly: true },
    { label: 'Plan your visit', href: '/plan' },
    { label: 'Groups & events', href: '/groups' },
    { label: 'Journal', href: '/journal' },
  ],
  moreSheet: [
    { href: '/offers', label: 'Tickets & offers', badge: 'Student 20% off' },
    { href: '/whats-on', label: "What's on" },
    { href: '/moments', label: '#NiccoMoments' },
    { href: '/groups', label: 'Groups & events' },
    { href: '/journal', label: 'Joyride Journal', badge: 'Guides' },
    { href: '/worlds/snow-park', label: 'Snow Park waitlist', badge: 'Soon' },
    { href: '/my-nicco', label: 'My Nicco · manage booking' },
  ],
  buy: { label: 'Buy tickets', href: '/book' },
}

export const defaultFooter = {
  signupHeading: 'Get offers before everyone else.',
  columns: [
    { heading: 'Tickets', links: [{ label: 'Day tickets', href: '/book' }, { label: 'Offers', href: '/offers' }, { label: 'Annual Fun Ticket', href: '/offers/annual-fun-ticket' }, { label: 'Manage booking', href: '/my-nicco' }] },
    { heading: 'Worlds', links: [{ label: 'Dry Park', href: '/worlds/dry-park' }, { label: 'Wet-O-Wild', href: '/worlds/wet-o-wild' }, { label: 'Super Bowl', href: '/worlds/super-bowl' }, { label: 'Snow Park', href: '/worlds/snow-park' }] },
    {
      heading: 'Visit',
      links: [
        { label: "What's on", href: '/whats-on' },
        { label: 'Timings & ride status', href: '/plan#status' },
        { label: 'Getting here', href: '/plan#reach' },
        { label: 'Food & drink', href: '/plan#food' },
        { label: 'FAQ', href: '/plan#faq' },
        { label: 'Joyride Journal', href: '/journal' },
      ],
    },
    { heading: 'Nicco Park', links: [{ label: 'Groups & events', href: '/groups' }, { label: '#NiccoMoments', href: '/moments' }, { label: 'About us', href: '/about' }, { label: 'Investors', href: '/' }] },
  ],
  legal: [
    { label: 'Privacy', href: '/' },
    { label: 'Cancellation & refund', href: '/' },
    { label: 'Terms', href: '/' },
  ],
}

type Id = number | string

/** The home page as a stack of sections, in the order the site had before the CMS. */
export function homeLayout(x: { slides: unknown[]; mosaic: Id[]; ticker: typeof TICKER; highlights: Id[]; crews: Id[]; videoPoster?: Id }) {
  return [
    { blockType: 'hero', style: 'framed', autoplaySeconds: 6.5, showBookingBox: true, slides: x.slides, mosaic: x.mosaic },
    { blockType: 'ticker', tone: 'yellow', items: x.ticker },
    { blockType: 'ticketCards', eyebrow: 'Tickets', heading: "Three tickets. That's it.", intro: 'Prices include taxes. Children under 80 cm go free.', tone: 'cream' },
    { blockType: 'eventsRail', eyebrow: "What's on", heading: 'Coming up at Nicco', intro: 'Pick an event, pick your day, and you are in.', tone: 'wet', events: x.highlights },
    { blockType: 'worldsGrid', eyebrow: 'Ride · Splash · Strike · Freeze', heading: 'Four worlds. One gate.' },
    {
      blockType: 'video',
      eyebrow: 'Watch',
      heading: 'A day at Nicco Park',
      body: 'Rides, splashes and strikes, in under a minute.',
      source: 'upload',
      poster: x.videoPoster,
      layout: 'framed',
      autoplay: false,
      tone: 'ink',
      cta: { label: 'Buy tickets', href: '/book' },
    },
    { blockType: 'stats', heading: 'Why Kolkata keeps coming back', tone: 'dry', showTrust: true },
    { blockType: 'crewPlanner', heading: "Who's coming?", intro: "Pick your crew. We'll plan the day and the ticket.", crews: x.crews },
    { blockType: 'momentsWall', heading: '#NiccoMoments', intro: 'Real days, shared by visitors. Tap a photo to book the same ride.', count: 8 },
    { blockType: 'todayStatus', heading: 'Today at the park', showWhatsapp: true },
    { blockType: 'journalTeaser', eyebrow: 'Joyride Journal', heading: 'Plan like a local', tone: 'cream', count: 3 },
    {
      blockType: 'ctaBand',
      heading: 'Your best day out starts here.',
      body: 'Pick a date, show one QR at the gate and go. Little ones under 80 cm are free.',
      tone: 'coral',
      primary: { label: 'Buy tickets', href: '/book' },
      secondary: { label: "See what's on", href: '/whats-on' },
    },
  ]
}

/** A second CMS page, built only from sections, to show how new pages work (/about). */
export function aboutLayout(x: { slide: unknown }) {
  return [
    { blockType: 'hero', style: 'split', autoplaySeconds: 0, showBookingBox: false, slides: [x.slide] },
    { blockType: 'stats', heading: 'Why Kolkata keeps coming back', tone: 'dry', showTrust: true },
    { blockType: 'worldsGrid', eyebrow: 'Ride · Splash · Strike · Freeze', heading: 'Four worlds. One gate.' },
    { blockType: 'faq', heading: 'Good to know' },
    {
      blockType: 'ctaBand',
      heading: 'Your best day out starts here.',
      body: 'Pick a date, show one QR at the gate and go. Little ones under 80 cm are free.',
      tone: 'coral',
      primary: { label: 'Buy tickets', href: '/book' },
      secondary: { label: "See what's on", href: '/whats-on' },
    },
  ]
}

/**
 * The "Section library" page: one of each section, with Design settings
 * used, so the team can see what's possible and copy from it.
 */
export function showcaseLayout(x: { photos: (Id | undefined)[]; offer?: Id }) {
  const [a, b, c, d, e] = x.photos
  return [
    {
      blockType: 'ctaBand',
      heading: 'Copy any of these',
      body: 'For the Nicco Park team: every kind of section, ready to copy. This page is hidden from Google.',
      tone: 'ink',
      primary: { label: 'Open the visual editor', href: '/admin/editor' },
      design: { paddingTop: 'm', paddingBottom: 'm', headingSize: 'l' },
    },
    {
      blockType: 'imageText',
      eyebrow: 'Image + text',
      heading: 'Half and half',
      body: 'A photo or video beside text. Choose the side, the split (50/50 or 60/40) and the photo style.',
      image: a,
      imageSide: 'left',
      split: '50',
      imageStyle: 'framed',
      tone: 'cream',
      cta: { label: 'Buy tickets', href: '/book' },
      secondary: { label: 'See offers', href: '/offers' },
    },
    {
      blockType: 'imageText',
      eyebrow: 'Image + text',
      heading: 'Photo that fills its half',
      body: 'The same section with "Fills its half" and the photo on the right.',
      image: c,
      imageSide: 'right',
      split: '50',
      imageStyle: 'fill',
      tone: 'wet',
    },
    {
      blockType: 'slideshow',
      heading: 'Slideshow',
      style: 'framed',
      autoplaySeconds: 6,
      tone: 'cream',
      slides: [
        { image: b, heading: 'One photo at a time', text: 'Framed near its real size, so smaller photos stay sharp.', link: { label: 'Buy tickets', href: '/book' } },
        { image: c, heading: 'Captions and buttons', text: 'Each slide can have its own heading, text and button.' },
        { image: e, heading: 'Swipe on phones', text: 'Arrows and dots on computers; it pauses when someone hovers.' },
      ],
    },
    {
      blockType: 'slideshow',
      heading: 'Carousel of cards',
      style: 'cards',
      autoplaySeconds: 0,
      tone: 'white',
      slides: [
        { image: a, heading: 'Families', text: 'Rides for every age.' },
        { image: b, heading: 'Thrill seekers', text: 'India’s biggest wooden roller coaster.' },
        { image: c, heading: 'Water park', text: 'Wave pool, slides and Rain Dance.' },
        { image: d, heading: 'Super Bowl', text: 'Neon bowling lanes.' },
      ],
    },
    {
      blockType: 'custom',
      eyebrow: 'Custom section',
      heading: 'Build your own',
      intro: 'Headings, text, images, image + text cards, buttons, videos, quotes and lists, in 1 to 4 columns.',
      tone: 'lilac',
      columns: '3',
      items: [
        { blockType: 'subCard', image: a, title: 'Image + text card', text: 'A photo, a title, a line of text and a link.', link: { label: 'Plan your visit', href: '/plan' } },
        { blockType: 'subCard', image: d, title: 'Another card', text: 'Cards line up in a grid and stack on phones.', link: { label: 'Super Bowl', href: '/worlds/super-bowl' } },
        { blockType: 'subQuote', quote: 'Use real words from visitors, with their permission.', name: 'Team Nicco Park' },
        { blockType: 'subHeading', text: 'A heading across the whole row', size: 'm', span: 'full' },
        { blockType: 'subText', text: 'Plain text. Set "Width in the grid" to make any block span two columns or the whole row.', span: '2' },
        { blockType: 'subList', items: [{ text: 'Ticks for quick facts' }, { text: 'One line each' }, { text: 'Easy to scan' }] },
        { blockType: 'subButton', label: 'Buy tickets', href: '/book', style: 'primary' },
      ],
    },
    {
      blockType: 'columns',
      heading: 'Columns with icons',
      intro: 'Short features with an icon each.',
      tone: 'white',
      perRow: '4',
      items: [
        { icon: 'ride', title: 'Rides', text: 'For every age.' },
        { icon: 'water', title: 'Water park', text: 'Open in season.' },
        { icon: 'bowling', title: 'Bowling', text: 'Super Bowl lanes.' },
        { icon: 'bus', title: 'Easy to reach', text: 'Salt Lake Sector V.' },
      ],
      design: { align: 'center', frame: 'box', marginBottom: 's' },
    },
    ...(x.offer ? [{ blockType: 'offerSpotlight', offer: x.offer, layout: 'banner', tone: 'coral', showEnds: true }] : []),
    { blockType: 'video', eyebrow: 'Video', heading: 'Video with a cover', body: 'Upload an MP4 in the Media library or paste a YouTube link.', source: 'upload', poster: e, layout: 'split', tone: 'ink' },
    { blockType: 'gallery', heading: 'Photo gallery', images: [a, b, c, d].filter(Boolean), columns: '4' },
    { blockType: 'spacer', size: 's', divider: true },
    {
      blockType: 'ctaBand',
      heading: 'Design settings',
      body: 'This band uses a custom background, a plain heading font, centred text and a bold-shadow frame. Find them under Design in any section.',
      tone: 'yellow',
      primary: { label: 'Buy tickets', href: '/book' },
      design: { background: '#DDEEFF', headingFont: 'plain', headingSize: 'm', frame: 'shadow', align: 'center', paddingTop: 's', paddingBottom: 's', marginBottom: 'l' },
    },
  ]
}
