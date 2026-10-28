'use client'

import { CircleAlert, CircleCheck, CircleX, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { MediaDoc } from './Form'
import type { Data } from './util'

type Check = { ok: 'pass' | 'warn' | 'fail'; label: string; tip?: string }

/** Every string under an object (for word counts and keyword checks). */
function strings(v: unknown, out: string[] = [], skip = new Set(['id', 'blockType', 'href', 'slug', 'url', 'style', 'tone', 'layout', 'source', '_status'])): string[] {
  if (typeof v === 'string') out.push(v)
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out, skip))
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (!skip.has(k) && k !== 'design' && k !== 'display') strings(x, out, skip)
  return out
}
function hrefs(v: unknown, out: string[] = []): string[] {
  if (Array.isArray(v)) v.forEach((x) => hrefs(x, out))
  else if (v && typeof v === 'object')
    for (const [k, x] of Object.entries(v)) {
      if ((k === 'href' || k === 'ctaHref') && typeof x === 'string') out.push(x)
      else hrefs(x, out)
    }
  return out
}

/**
 * A plain-language SEO check for the page being edited, with a Google result
 * preview. Like Yoast/Shopify's: each line says what to fix and why. It
 * checks the language being edited.
 */
export function SeoPanel({ kind, doc, media, sections, siteHost, path }: { kind: string; doc: Data; media: Record<string, MediaDoc>; sections: Data[]; siteHost: string; path: string }) {
  const [phraseInput, setPhrase] = useState('')
  const meta = (doc.meta as Data | undefined) ?? {}
  const titleField = (doc.title ?? doc.name ?? '') as string
  const title = ((meta.title as string) || titleField || '').trim()
  const desc = ((meta.description as string) || (doc.excerpt as string) || (doc.blurb as string) || (doc.terms as string) || '').trim()
  const keywords = (doc.keywords as string[] | undefined) ?? []
  const phrase = (kind === 'posts' ? keywords[0] : phraseInput) ?? ''
  const slug = (doc.slug as string) ?? ''
  const shareImg = meta.image ?? doc.hero ?? doc.image

  const checks = useMemo<Check[]>(() => {
    const text = strings(sections).join(' ')
    const words = text.split(/\s+/).filter(Boolean).length
    const h2s = kind === 'posts' ? sections.filter((b) => b.blockType === 'h2').length : sections.filter((b) => typeof b.heading === 'string' && b.heading).length
    const internal = hrefs([sections, doc]).filter((h) => h.startsWith('/')).length
    const images: string[] = []
    const walk = (v: unknown, k = '') => {
      if (Array.isArray(v)) v.forEach((x) => walk(x, k))
      else if (v && typeof v === 'object') Object.entries(v).forEach(([kk, x]) => walk(x, kk))
      else if ((typeof v === 'number' || typeof v === 'string') && /^(image|images|hero|poster|mosaic)$/.test(k)) images.push(String(v))
    }
    walk(sections)
    const noAlt = images.filter((id) => media[id] && !media[id].alt?.trim()).length
    const p = phrase.toLowerCase().trim()
    const has = (s: string) => !!p && s.toLowerCase().includes(p)
    const faqs = kind === 'posts' ? ((doc.faqs as unknown[]) ?? []).length : sections.some((b) => b.blockType === 'faq') ? 2 : 0
    const out: Check[] = [
      !title ? { ok: 'fail', label: 'No title', tip: 'Add a title (SEO & sharing → Title, or the page title).' } : title.length > 60 ? { ok: 'warn', label: `Title is ${title.length} characters`, tip: 'Google cuts titles after about 60 characters. Put the important words first.' } : title.length < 25 ? { ok: 'warn', label: 'Title is short', tip: 'Aim for 35–60 characters that say what the page is about and where (Kolkata).' } : { ok: 'pass', label: `Title length is good (${title.length})` },
      !desc ? { ok: 'fail', label: 'No description', tip: 'Write 120–160 characters for Google and WhatsApp previews (SEO & sharing → Description).' } : desc.length > 160 ? { ok: 'warn', label: `Description is ${desc.length} characters`, tip: 'Google shows about 160. Shorten it.' } : desc.length < 70 ? { ok: 'warn', label: 'Description is short', tip: 'Aim for 120–160 characters: what, where, price or time, and a reason to click.' } : { ok: 'pass', label: `Description length is good (${desc.length})` },
      !slug ? { ok: 'warn', label: 'No web address yet' } : slug.split('-').length > 6 ? { ok: 'warn', label: 'Web address is long', tip: 'Short addresses (3–5 words) are easier to share. Changing it later is safe: a redirect is made automatically.' } : { ok: 'pass', label: 'Web address is short and readable' },
      shareImg ? { ok: 'pass', label: 'Has a share image' } : { ok: 'warn', label: 'No share image', tip: 'Add one (1200 × 630 px) so WhatsApp and Facebook show a picture.' },
      meta.noindex ? { ok: 'fail', label: 'Hidden from search engines', tip: 'Untick "Hide from search engines" unless this page must stay out of Google.' } : { ok: 'pass', label: 'Visible to search engines' },
    ]
    if (kind === 'posts' || p) {
      const more = [
        !p ? { ok: 'warn', label: 'No focus phrase', tip: kind === 'posts' ? 'Add the main search phrase as the first keyword (e.g. "things to do in Kolkata with kids").' : 'Type the phrase people search for, above.' } : has(title) ? { ok: 'pass', label: 'Focus phrase is in the title' } : { ok: 'warn', label: 'Focus phrase is not in the title' },
        p && (has(desc) ? { ok: 'pass', label: 'Focus phrase is in the description' } : { ok: 'warn', label: 'Focus phrase is not in the description' }),
        p && (has(text.slice(0, 600)) ? { ok: 'pass', label: 'Focus phrase is near the start' } : { ok: 'warn', label: 'Focus phrase is not in the first paragraph', tip: 'Use it naturally in the first two sentences.' }),
      ]
      out.push(...(more.filter(Boolean) as Check[]))
    }
    if (kind === 'posts') {
      out.push(
        words >= 600 ? { ok: 'pass', label: `${words} words` } : words >= 300 ? { ok: 'warn', label: `${words} words`, tip: 'Guides that rank usually have 600+ words that answer the question fully.' } : { ok: 'fail', label: `Only ${words} words`, tip: 'Write at least 300 words.' },
        h2s >= 2 ? { ok: 'pass', label: `${h2s} sub-headings` } : { ok: 'warn', label: 'Add sub-headings', tip: 'Break the article into parts with Sub-headings. Google and AI assistants use them to find answers.' },
        faqs >= 2 ? { ok: 'pass', label: `${faqs} quick answers (FAQ)` } : { ok: 'warn', label: 'Add quick answers', tip: 'Two or more short questions and answers help Google, Gemini and ChatGPT quote this page.' },
      )
    } else {
      out.push(h2s >= 2 ? { ok: 'pass', label: `${h2s} sections with headings` } : { ok: 'warn', label: 'Few headings', tip: 'Give sections a heading: it tells Google what each part is about.' })
    }
    out.push(
      internal >= 1 ? { ok: 'pass', label: `${internal} link${internal > 1 ? 's' : ''} to other pages on the site` } : { ok: 'warn', label: 'No links to other pages', tip: 'Link to /book, an offer or a related guide. It helps visitors and Google.' },
      noAlt ? { ok: 'warn', label: `${noAlt} photo${noAlt > 1 ? 's have' : ' has'} no description (alt text)`, tip: 'Add it in the Media library: describe the photo in a few words.' } : { ok: 'pass', label: images.length ? 'Photos are described (alt text)' : 'No photos to describe' },
    )
    return out
  }, [sections, doc, media, phrase, title, desc, slug, shareImg, meta.noindex, kind])

  const score = Math.round((checks.filter((c) => c.ok === 'pass').length / checks.length) * 100)
  const crumbs = [siteHost, ...path.split('/').filter(Boolean)].join(' › ')
  return (
    <section className="npe-seo" aria-label="SEO check">
      <div className="npe-seo-head">
        <h3>
          <Search size={15} aria-hidden="true" /> Google preview
        </h3>
        <span className={'npe-score ' + (score >= 80 ? 'is-good' : score >= 50 ? 'is-ok' : 'is-bad')}>{score}/100</span>
      </div>
      <div className="npe-serp">
        <span className="npe-serp-url">{crumbs}</span>
        <span className="npe-serp-title">{title ? (title.length > 60 ? title.slice(0, 58) + '…' : title) : 'Add a title'}</span>
        <span className="npe-serp-desc">{desc ? (desc.length > 160 ? desc.slice(0, 157) + '…' : desc) : 'Add a description: this is the grey text under the link on Google.'}</span>
      </div>
      {kind !== 'posts' && (
        <label className="npe-field">
          <span className="npe-label">Focus phrase (only for this check)</span>
          <input className="npe-input" value={phraseInput} onChange={(e) => setPhrase(e.target.value)} placeholder="e.g. water park in Kolkata" />
        </label>
      )}
      <ul className="npe-checks">
        {checks.map((c, i) => (
          <li key={i} className={'is-' + c.ok}>
            {c.ok === 'pass' ? <CircleCheck size={15} aria-hidden="true" /> : c.ok === 'warn' ? <CircleAlert size={15} aria-hidden="true" /> : <CircleX size={15} aria-hidden="true" />}
            <span>
              <b>{c.label}</b>
              {c.ok !== 'pass' && c.tip && <small>{c.tip}</small>}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
