import type { MetadataRoute } from 'next'
import { LANG_META, LANGS } from '@/i18n/config'
import { getEvents, getOffers, getIndexablePageSlugs, getPosts, getWorlds } from '@/lib/cms'
import { absUrl } from '@/lib/seo'

export const dynamic = 'force-static'

const BUILT_IN = new Set(['book', 'offers', 'whats-on', 'plan', 'groups', 'moments', 'journal', 'my-nicco', 'worlds', 'hero-options', 'section-library'])

/** Every public page in all three languages, each listing its translations. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [worlds, posts, offers, events, cmsPages] = await Promise.all([getWorlds(), getPosts(), getOffers(), getEvents(), getIndexablePageSlugs()])
  const pages: { path: string; priority: number; lastModified?: string }[] = [
    { path: '/', priority: 1 },
    { path: '/book', priority: 0.9 },
    { path: '/offers', priority: 0.9 },
    { path: '/whats-on', priority: 0.8 },
    { path: '/plan', priority: 0.8 },
    { path: '/groups', priority: 0.7 },
    { path: '/moments', priority: 0.6 },
    { path: '/journal', priority: 0.8 },
    ...worlds.map((w) => ({ path: `/worlds/${w.slug}`, priority: 0.8 })),
    ...posts.map((p) => ({ path: `/journal/${p.slug}`, priority: 0.7, lastModified: p.updated ?? p.published })),
    ...offers.filter((o) => o.hasLanding).map((o) => ({ path: `/offers/${o.slug}`, priority: 0.7 })),
    ...events.filter((e) => e.hasLanding).map((e) => ({ path: `/whats-on/${e.slug}`, priority: 0.6 })),
    ...cmsPages.filter((s) => s !== 'home' && !BUILT_IN.has(s)).map((s) => ({ path: `/${s}`, priority: 0.6 })),
  ]
  return pages.flatMap(({ path, priority, lastModified }) =>
    LANGS.map((lang) => ({
      url: absUrl(path, lang),
      lastModified,
      priority,
      alternates: { languages: Object.fromEntries(LANGS.map((l) => [LANG_META[l].intl, absUrl(path, l)])) },
    })),
  )
}
