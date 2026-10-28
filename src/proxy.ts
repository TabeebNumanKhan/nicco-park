import { NextResponse, type NextRequest } from 'next/server'

/**
 * Runs before every public page (not /admin, /api or files):
 *
 *  - gives each visitor a random, anonymous id (`np_vid`, 1 year) so A/B
 *    variants stay the same across visits and bookings can be credited to a
 *    campaign;
 *  - sends old web addresses to their new place (CMS → Redirects), keeping
 *    ad tags on the way;
 *  - remembers ad tags (utm_*, gclid, gbraid, wbraid, fbclid, msclkid): the first set ever seen (90 days) and the latest
 *    (30 days);
 *  - on a campaign landing page, `?v=b` pins that variant for this visitor.
 *
 * No personal data is stored in these cookies.
 */
const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid']
const YEAR = 60 * 60 * 24 * 365
const LANDING = /^\/(en|bn|hi)\/(offers|whats-on)\/([a-z0-9-]+)\/?$/

/* Redirects (CMS → Redirects, plus automatic ones when a web address changes), cached for a minute. */
type Rule = { from: string; to: string; type: number }
let rules: { at: number; map: Map<string, Rule> } | null = null
async function redirectFor(req: NextRequest): Promise<Rule | undefined> {
  if (!rules || Date.now() - rules.at > 60_000) {
    try {
      const r = await fetch(new URL('/api/cms/redirects', req.url), { headers: { 'x-np-internal': '1' } })
      const list = r.ok ? ((await r.json()) as Rule[]) : []
      rules = { at: Date.now(), map: new Map(list.map((x) => [norm(x.from), x])) }
    } catch {
      rules = { at: Date.now(), map: rules?.map ?? new Map() }
    }
  }
  const p = norm(req.nextUrl.pathname)
  return rules.map.get(p) ?? rules.map.get(p.replace(/^\/(en|bn|hi)(?=\/|$)/, '') || '/')
}
const norm = (p: string) => {
  try {
    p = decodeURI(p)
  } catch {}
  return (p.replace(/\/+$/, '') || '/').toLowerCase()
}

export async function proxy(req: NextRequest) {
  const url = req.nextUrl
  const set: [string, string, number][] = []

  const rule = await redirectFor(req)
  if (rule && norm(rule.to) !== norm(url.pathname)) {
    // Keep ad and tracking tags (gclid, utm_…) through the redirect.
    const dest = new URL(rule.to, req.url)
    url.searchParams.forEach((v, k) => dest.searchParams.has(k) || dest.searchParams.set(k, v))
    return NextResponse.redirect(dest, rule.type)
  }

  let vid = req.cookies.get('np_vid')?.value
  if (!vid) {
    vid = crypto.randomUUID()
    set.push(['np_vid', vid, YEAR])
  }

  const tags: Record<string, string> = {}
  for (const k of UTM) {
    const v = url.searchParams.get(k)
    if (v) tags[k] = v.slice(0, 120)
  }
  if (Object.keys(tags).length) {
    const json = JSON.stringify({ ...tags, at: new Date().toISOString().slice(0, 10) })
    set.push(['np_utm_last', json, 60 * 60 * 24 * 30])
    if (!req.cookies.get('np_utm_first')) set.push(['np_utm_first', json, 60 * 60 * 24 * 90])
  }

  const m = url.pathname.match(LANDING)
  const forced = url.searchParams.get('v')
  if (m && forced && /^[a-z0-9]{1,8}$/i.test(forced)) {
    const campaign = `${m[2] === 'offers' ? 'offer' : 'event'}:${m[3]}`
    set.push([`np_ab_${campaign.replace(/[^a-z0-9]+/gi, '_')}`, forced.toLowerCase(), 60 * 60 * 24 * 60])
  }

  if (!set.length) return NextResponse.next()

  // Make the new cookies visible to this very render, not just the next one.
  const headers = new Headers(req.headers)
  const extra = set.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('; ')
  headers.set('cookie', [req.headers.get('cookie'), extra].filter(Boolean).join('; '))
  const res = NextResponse.next({ request: { headers } })
  for (const [k, v, maxAge] of set) res.cookies.set(k, v, { maxAge, path: '/', sameSite: 'lax', secure: url.protocol === 'https:' })
  return res
}

export const config = {
  // Old site addresses (.html, .php, .aspx) come through too, so they can be redirected.
  matcher: ['/((?!admin|api|next|_next|media|images|fonts|favicon|robots.txt|llms.txt|sitemap.xml|.*\\.(?:png|jpe?g|gif|webp|avif|svg|ico|css|js|map|woff2?|ttf|otf|txt|xml|mp4|webm|pdf|json)$).*)'],
}
