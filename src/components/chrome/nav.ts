import { usePathname } from 'next/navigation'
import { stripLang } from '@/i18n/config'

export function isActive(pathname: string, match: string[]) {
  return match.some((m) => pathname === m || pathname.startsWith(m + '/'))
}

/** Path without the language prefix, ".html" suffix or trailing slash: "/bn/book.html" → "/book". */
export function cleanPath(p: string | null) {
  if (!p) return '/'
  const s = stripLang(p.replace(/\.html$/, '')).replace(/(.)\/$/, '$1')
  return s || '/'
}

/** Current route without the language prefix. */
export function useRoute() {
  return cleanPath(usePathname())
}
