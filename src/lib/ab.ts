import 'server-only'
import { cookies } from 'next/headers'

/**
 * A/B variant choice for campaign landing pages, on the server, so the
 * visitor's first paint is already their variant (no flicker).
 *
 * Order of precedence:
 *  1. `?v=b` in the link (one ad set per variant). src/proxy.ts also stores
 *     it in a cookie, so the visitor keeps seeing "b" on later visits.
 *  2. that cookie, `np_ab_<campaign>`
 *  3. a stable hash of the visitor id (`np_vid`) and the campaign, split by
 *     the variants' weights. Same visitor → same variant, every time.
 */
export type Variant = { key: string; weight?: number | null }

function fnv1a(s: string) {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

export const abCookie = (campaign: string) => `np_ab_${campaign.replace(/[^a-z0-9]+/gi, '_')}`

export function pickByWeight<V extends Variant>(variants: V[], seed: string): V {
  const total = variants.reduce((n, v) => n + Math.max(0, v.weight ?? 50), 0)
  if (!total) return variants[0]
  let x = (fnv1a(seed) % 10000) / 10000 * total
  for (const v of variants) {
    x -= Math.max(0, v.weight ?? 50)
    if (x < 0) return v
  }
  return variants[variants.length - 1]
}

export async function chooseVariant<V extends Variant>(variants: V[], campaign: string, forced?: string | null): Promise<V | undefined> {
  if (!variants.length) return undefined
  if (variants.length === 1 || process.env.NEXT_PUBLIC_STATIC === '1') return variants[0]
  const byKey = (k?: string | null) => (k ? variants.find((v) => v.key.toLowerCase() === k.toLowerCase()) : undefined)
  const jar = await cookies()
  const fromLink = byKey(forced)
  if (fromLink) return fromLink
  const fromCookie = byKey(jar.get(abCookie(campaign))?.value)
  if (fromCookie) return fromCookie
  const vid = jar.get('np_vid')?.value ?? ''
  return pickByWeight(variants, `${vid}:${campaign}`)
}
