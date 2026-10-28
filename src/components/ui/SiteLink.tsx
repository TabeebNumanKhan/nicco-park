'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { withLang } from '@/i18n/config'
import { useLang } from '@/i18n/LangProvider'

const STATIC = process.env.NEXT_PUBLIC_STATIC === '1'

/**
 * Static preview build only: every page is a plain .html file on a simple
 * file host, so "/bn/book" becomes "/bn/book.html" and navigation is a normal
 * page load. Everywhere else hrefs are left as they are.
 */
export function staticHref(href: string) {
  if (!STATIC || !href.startsWith('/') || href.startsWith('//')) return href
  const [pathAndQuery, hash] = href.split('#')
  const [path, query] = pathAndQuery.split('?')
  const file = path === '/' ? '/en.html' : `${path.replace(/\/$/, '')}.html`
  return `${file}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`
}

/** Full href for an internal path in the current language. */
export function useHref() {
  const { lang } = useLang()
  return (href: string) => staticHref(withLang(href, lang))
}

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string }

/** Internal link: adds the current language prefix ("/book" → "/bn/book"). */
export function SiteLink({ href, ...rest }: Props) {
  const { lang } = useLang()
  const full = withLang(href, lang)
  if (STATIC) {
    const { prefetch: _p, replace: _r, scroll: _s, shallow: _sh, ...a } = rest as Props & { shallow?: boolean }
    return <a href={staticHref(full)} {...(a as ComponentProps<'a'>)} />
  }
  return <Link href={full} {...rest} />
}
