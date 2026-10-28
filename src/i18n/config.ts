export const LANGS = ['en', 'bn', 'hi'] as const
export type Lang = (typeof LANGS)[number]
export const DEFAULT_LANG: Lang = 'en'

export const LANG_META: Record<Lang, { label: string; name: string; intl: string }> = {
  en: { label: 'EN', name: 'English', intl: 'en-IN' },
  bn: { label: 'বাংলা', name: 'বাংলা (Bengali)', intl: 'bn-IN' },
  hi: { label: 'हिन्दी', name: 'हिन्दी (Hindi)', intl: 'hi-IN' },
}

export function isLang(v: string | undefined | null): v is Lang {
  return !!v && (LANGS as readonly string[]).includes(v)
}

/** "/bn/book" → "/book"; "/en" → "/". */
export function stripLang(path: string) {
  const m = path.match(/^\/(en|bn|hi)(?=\/|$|\.)/)
  if (!m) return path || '/'
  const rest = path.slice(m[0].length).replace(/^\.html$/, '')
  return rest || '/'
}

/** "/book" + "bn" → "/bn/book". Leaves external, hash and already-prefixed links alone. */
export function withLang(href: string, lang: Lang) {
  if (!href.startsWith('/') || href.startsWith('//')) return href
  if (/^\/(en|bn|hi)(\/|$|[?#])/.test(href)) return href
  if (href === '/') return `/${lang}`
  if (href.startsWith('/?') || href.startsWith('/#')) return `/${lang}${href.slice(1)}`
  return `/${lang}${href}`
}
