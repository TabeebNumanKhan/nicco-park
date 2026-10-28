import type { MetadataRoute } from 'next'
import { getTracking } from '@/lib/cms'
import { SITE_URL } from '@/lib/seo'

export const dynamic = 'force-static'
export const revalidate = 600

const PRIVATE = ['/admin', '/api', '/next', ...['en', 'bn', 'hi'].flatMap((l) => [`/${l}/hero-options`, `/${l}/book/pay`, `/${l}/my-nicco`, `/${l}/section-preview`, `/${l}/section-library`])]

/** AI assistants that fetch pages to answer people's questions (they cite and link). */
const AI_SEARCH = ['OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Meta-ExternalFetcher']
/** Crawlers that collect pages to train AI models. */
const AI_TRAINING = ['GPTBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended', 'Meta-ExternalAgent', 'CCBot', 'Bytespider', 'Amazonbot']

/**
 * robots.txt, following CMS → Tracking → Search & AI. Google and Bing are
 * always welcome; AI crawlers follow the chosen policy.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const { aiCrawlers } = await getTracking()
  const rules: MetadataRoute.Robots['rules'] = [{ userAgent: '*', allow: '/', disallow: PRIVATE }]
  if (aiCrawlers !== 'all') rules.push({ userAgent: AI_TRAINING, disallow: '/' })
  if (aiCrawlers === 'none') rules.push({ userAgent: AI_SEARCH, disallow: '/' })
  else rules.push({ userAgent: AI_SEARCH, allow: '/', disallow: PRIVATE })
  return { rules, sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL }
}
