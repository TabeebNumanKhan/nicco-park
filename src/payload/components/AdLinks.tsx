'use client'

import { useDocumentInfo, useFormFields } from '@payloadcms/ui'
import { useMemo, useState } from 'react'

const SOURCES: [string, string, string][] = [
  ['Google Ads', 'google', 'cpc'],
  ['Facebook / Instagram ads', 'meta', 'paid_social'],
  ['WhatsApp broadcast', 'whatsapp', 'messaging'],
  ['Instagram bio / story', 'instagram', 'social'],
  ['SMS', 'sms', 'sms'],
  ['Email newsletter', 'newsletter', 'email'],
  ['Poster QR code', 'poster', 'offline'],
]

/**
 * Ready-made links for ads and posts, with UTM tags so the Operations
 * dashboard and GA4 show which channel sold tickets. Add ?v=b to force an
 * A/B variant (handy for checking each version before an ad goes live).
 */
export function AdLinks() {
  const { collectionSlug } = useDocumentInfo()
  const slug = useFormFields(([f]) => f.slug?.value as string | undefined)
  const [lang, setLang] = useState('en')
  const [campaign, setCampaign] = useState('')
  const [copied, setCopied] = useState('')
  const base = typeof window !== 'undefined' ? window.location.origin : ''
  const path = collectionSlug === 'events' ? 'whats-on' : 'offers'
  const camp = (campaign || slug || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const links = useMemo(() => SOURCES.map(([label, src, med]) => [label, `${base}/${lang}/${path}/${slug}?utm_source=${src}&utm_medium=${med}&utm_campaign=${camp}`] as const), [base, lang, path, slug, camp])
  if (!slug) return <p style={{ opacity: 0.7 }}>Save this first to get its ad links.</p>
  const box: React.CSSProperties = { border: '1px solid var(--theme-elevation-150)', borderRadius: 10, padding: 14, margin: '8px 0 20px' }
  return (
    <div style={box}>
      <strong style={{ display: 'block', marginBottom: 4 }}>Links for ads and posts</strong>
      <p style={{ margin: '0 0 10px', opacity: 0.75, fontSize: 13 }}>Use these instead of the plain address, so you can see which channel brought each booking (Operations dashboard and Google Analytics).</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
        <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Page language">
          <option value="en">English page</option>
          <option value="bn">Bengali page</option>
          <option value="hi">Hindi page</option>
        </select>
        <input value={campaign} onChange={(e) => setCampaign(e.target.value)} placeholder={`Campaign name (default: ${slug})`} aria-label="Campaign name" style={{ flex: 1, minWidth: 200 }} />
      </div>
      {links.map(([label, url]) => (
        <div key={label} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
          <span style={{ width: 190, fontWeight: 600, fontSize: 13 }}>{label}</span>
          <code style={{ flex: 1, minWidth: 220, fontSize: 12, wordBreak: 'break-all', opacity: 0.85 }}>{url}</code>
          <button
            type="button"
            className="btn btn--style-secondary btn--size-small"
            style={{ margin: 0 }}
            onClick={async () => {
              await navigator.clipboard.writeText(url)
              setCopied(label)
              setTimeout(() => setCopied(''), 1500)
            }}
          >
            {copied === label ? 'Copied' : 'Copy'}
          </button>
        </div>
      ))}
      <p style={{ margin: '8px 0 0', opacity: 0.7, fontSize: 12 }}>Add &amp;v=b to any link to see variant B. Google and Meta add their own click ids (gclid, fbclid); the site keeps them.</p>
    </div>
  )
}
