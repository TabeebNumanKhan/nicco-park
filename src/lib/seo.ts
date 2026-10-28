import type { Metadata } from 'next'
import { LANG_META, LANGS, type Lang } from '@/i18n/config'

/**
 * The public origin, used for canonical URLs, hreflang, the sitemap and
 * JSON-LD. TO CONFIRM: set NEXT_PUBLIC_SITE_URL to the production domain
 * before launch (no trailing slash).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.niccoparks.com').replace(/\/$/, '')

/** "/journal" in "bn" → "https://…/bn/journal". */
export function absUrl(path: string, lang: Lang) {
  const p = path === '/' ? '' : path
  return `${SITE_URL}/${lang}${p}`
}

/**
 * Canonical + hreflang for one page in all three languages. Search engines
 * then show the Bengali page to Bengali searchers instead of treating the
 * three copies as duplicates.
 */
export function alternates(path: string, lang: Lang): Metadata['alternates'] {
  return {
    canonical: absUrl(path, lang),
    languages: {
      ...Object.fromEntries(LANGS.map((l) => [LANG_META[l].intl, absUrl(path, l)])),
      'x-default': absUrl(path, 'en'),
    },
  }
}

/**
 * JSON-LD for a <script type="application/ld+json"> tag. JSON.stringify is
 * not safe inside <script>: a title containing "</script>" would close the
 * tag. Escaping "<" closes that hole. Never inline raw JSON.stringify.
 */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') }
}

/** The CMS "SEO & sharing" group → share image and the "hide from search engines" switch. */
export function pageMetadata(meta?: { image?: unknown; noindex?: boolean | null } | null): Metadata {
  const img = meta?.image && typeof meta.image === 'object' ? (meta.image as { url?: string; width?: number; height?: number }) : undefined
  return {
    ...(img?.url ? { openGraph: { images: [{ url: SITE_URL + img.url, width: img.width, height: img.height }] } } : {}),
    ...(meta?.noindex ? { robots: { index: false, follow: true } } : {}),
  }
}
