import type { PayloadRequest } from 'payload'

/**
 * Where the CMS opens a document for live preview: a short-lived draft-mode
 * link that lands on the real page in the right language.
 *
 * Must be an absolute URL: the admin talks to the preview frame with
 * postMessage, which needs a full origin (a relative link silently breaks
 * the "update as you type" refresh).
 */
export function previewUrl(path: string, locale?: string | null, req?: PayloadRequest | null) {
  const lang = locale && ['en', 'bn', 'hi'].includes(locale) ? locale : 'en'
  const params = new URLSearchParams({ path: `/${lang}${path || ''}`, previewSecret: process.env.PREVIEW_SECRET || '' })
  return `${origin(req)}/next/preview?${params.toString()}`
}

function origin(req?: PayloadRequest | null) {
  if (process.env.NEXT_PUBLIC_SERVER_URL) return process.env.NEXT_PUBLIC_SERVER_URL.replace(/\/$/, '')
  const h = req?.headers
  const host = h?.get('x-forwarded-host') || h?.get('host')
  if (!host) return ''
  const proto = h?.get('x-forwarded-proto') || (host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https')
  return `${proto}://${host}`
}
