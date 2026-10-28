'use client'

import { Check, Link2, Share2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLang } from '@/i18n/LangProvider'
import { gaEvent } from '@/lib/analytics'
import { track } from '@/lib/attribution'
import { FacebookIcon, WhatsappIcon, XIcon } from './icons'

/**
 * Share this page: WhatsApp first (how Kolkata shares), then Facebook, X and
 * copy link; the phone's own share sheet where there is one. Shared links
 * carry utm tags so the dashboard can see what sharing brings in.
 */
export function ShareButtons({ title, dark = false, className = '' }: { title: string; dark?: boolean; className?: string }) {
  const { t } = useLang()
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [native, setNative] = useState(false)
  useEffect(() => {
    const u = new URL(window.location.href)
    u.search = ''
    setUrl(u.toString())
    setNative(typeof navigator.share === 'function')
  }, [])
  const tagged = (source: string) => `${url}?utm_source=${source}&utm_medium=social&utm_campaign=share`
  const done = (method: string) => {
    track('share', { props: { method } })
    gaEvent('share', { method, content_type: 'page', item_id: url })
  }
  const btn = 'inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-xl border-2 px-2.5 text-sm font-bold sm:px-3 ' + (dark ? 'border-white/40 hover:bg-white/10' : 'border-ink/20 hover:bg-ink/5')
  if (!url) return null
  return (
    <div className={'flex flex-wrap items-center gap-2 ' + className}>
      <span className="text-sm font-bold max-sm:sr-only">{t('Share')}:</span>
      <a className={btn} href={`https://wa.me/?text=${encodeURIComponent(`${title} ${tagged('whatsapp')}`)}`} target="_blank" rel="noopener" onClick={() => done('whatsapp')}>
        <WhatsappIcon size={16} className={dark ? '' : 'text-wa'} /> WhatsApp
      </a>
      <a className={btn} href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(tagged('facebook'))}`} target="_blank" rel="noopener" aria-label="Facebook" onClick={() => done('facebook')}>
        <FacebookIcon size={16} />
      </a>
      <a className={btn} href={`https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(tagged('x'))}`} target="_blank" rel="noopener" aria-label="X" onClick={() => done('x')}>
        <XIcon size={15} />
      </a>
      <button
        type="button"
        className={btn}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(tagged('copy'))
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
            done('copy')
          } catch {}
        }}
      >
        {copied ? <Check size={16} aria-hidden="true" /> : <Link2 size={16} aria-hidden="true" />}
        <span aria-live="polite">{copied ? t('Copied') : t('Copy link')}</span>
      </button>
      {native && (
        <button
          type="button"
          className={btn}
          aria-label={t('More ways to share')}
          onClick={async () => {
            try {
              await navigator.share({ title, url: tagged('native') })
              done('native')
            } catch {}
          }}
        >
          <Share2 size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
