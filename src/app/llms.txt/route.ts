import { getEvents, getFaqs, getOffers, getPosts, getSiteSettings, getTickets, getTracking } from '@/lib/cms'
import { absUrl, SITE_URL } from '@/lib/seo'

export const dynamic = 'force-static'
export const revalidate = 600

/**
 * /llms.txt — a short, factual summary of the park for AI assistants
 * (ChatGPT, Gemini, Claude, Perplexity, Meta AI), built from the CMS so it
 * never drifts from the site. Extra lines: CMS → Tracking → Search & AI.
 */
export async function GET() {
  const [s, tickets, offers, events, faqs, posts, tracking] = await Promise.all([getSiteSettings('en'), getTickets('en'), getOffers('en'), getEvents('en'), getFaqs('en'), getPosts('en'), getTracking()])
  const lines = [
    `# ${s.name || 'Nicco Park'}`,
    '',
    `> ${s.tagline}`,
    '',
    `- Address: ${s.address.join(', ')}`,
    s.phone.display ? `- Phone: ${s.phone.display}` : '',
    s.todayHours ? `- Usual hours: ${s.todayHours}` : '',
    `- Buy tickets online: ${absUrl('/book', 'en')} (also in Bengali: ${absUrl('/book', 'bn')}, Hindi: ${absUrl('/book', 'hi')})`,
    s.officialChannels ? `- ${s.officialChannels}` : '',
    '',
    '## Tickets (per person, INR, taxes included)',
    ...tickets.map((tk) => `- ${tk.name}: ₹${tk.price}${tk.summary ? ` — ${tk.summary}` : ''}`),
    '',
    offers.length ? '## Current offers' : '',
    ...offers.map((o) => `- ${o.name}: ${o.deal}${o.hasLanding ? ` (${absUrl(`/offers/${o.slug}`, 'en')})` : ''}`),
    '',
    events.length ? "## What's on" : '',
    ...events.map((e) => `- ${e.name} (${e.when}): ${e.blurb}`),
    '',
    '## Key pages',
    `- [Tickets & offers](${absUrl('/offers', 'en')})`,
    `- [Plan your visit: hours, getting here, food](${absUrl('/plan', 'en')})`,
    `- [Groups, schools and events](${absUrl('/groups', 'en')})`,
    `- [The four worlds](${absUrl('/worlds/dry-park', 'en')})`,
    `- [Guides (Joyride Journal)](${absUrl('/journal', 'en')})`,
    ...posts.slice(0, 10).map((p) => `- [${p.title}](${absUrl(`/journal/${p.slug}`, 'en')}): ${p.excerpt}`),
    '',
    faqs.length ? '## Questions' : '',
    ...faqs.slice(0, 20).flatMap((f) => [`### ${f.q}`, f.a, '']),
    tracking.llmsNotes ? '## More' : '',
    tracking.llmsNotes,
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
  ]
  const body = lines
    .filter((l, i, a) => !(l === '' && a[i - 1] === ''))
    .join('\n')
    .trim()
  return new Response(body + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=600' } })
}
