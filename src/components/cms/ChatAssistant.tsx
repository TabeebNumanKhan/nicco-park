'use client'

import { MessageCircle, Phone, Send, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/i18n/LangProvider'
import { gaEvent } from '@/lib/analytics'
import { track } from '@/lib/attribution'
import { useSiteData } from '@/lib/site-data'
import { WhatsappIcon } from '../ui/icons'
import { SiteLink } from '../ui/SiteLink'

type Msg = { role: 'user' | 'assistant'; text: string; links?: string[]; handoff?: boolean }

const LINK_LABEL: Record<string, string> = { '/plan': 'Plan your visit', '/book': 'Buy tickets', '/offers': 'Offers', '/whats-on': "What's on" }
const linkLabel = (href: string) => LINK_LABEL[href.split(/[?#]/)[0]] ?? (href.startsWith('/offers/') ? 'See the offer' : href.startsWith('/whats-on/') ? 'See the event' : href.startsWith('/book') ? 'Buy tickets' : 'Open')

/**
 * The chat bubble (CMS → Integrations → Chat assistant). Answers come from
 * the CMS (or Claude, limited to the CMS facts); anything else goes to
 * WhatsApp or a call-back request in the Leads inbox. "Another chat service"
 * mode runs that service's own widget instead.
 */
export function ChatAssistant() {
  const { assistant, whatsapp } = useSiteData()
  const { lang, t } = useLang()
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const [cb, setCb] = useState<'off' | 'form' | 'sent'>('off')
  const [mobile, setMobile] = useState('')
  const list = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  // Appears once the visitor starts scrolling (or after a few seconds), so it never sits on the banner's buttons.
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const on = () => setShown(true)
    const onScroll = () => window.scrollY > 240 && on()
    const timer = window.setTimeout(on, 12000)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight })
  }, [msgs, busy, cb])
  useEffect(() => {
    if (!open) return
    input.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Not on the booking steps: their own bottom bar and help line are there.
  if (process.env.NEXT_PUBLIC_STATIC === '1' || !assistant.enabled || /^\/(en|bn|hi)\/book/.test(pathname ?? '')) return null
  if (assistant.provider === 'embed') return assistant.embedCode ? <Embed code={assistant.embedCode} /> : null

  const ask = async (q: string) => {
    const message = q.trim()
    if (!message || busy) return
    setText('')
    const next = [...msgs, { role: 'user' as const, text: message }]
    setMsgs(next)
    setBusy(true)
    try {
      const r = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, lang, path: location.pathname, history: msgs.slice(-6).map((m) => ({ role: m.role, text: m.text })) }),
      })
      const j = (await r.json()) as { text?: string; links?: string[]; handoff?: boolean }
      setMsgs([...next, { role: 'assistant', text: j.text || t("Sorry, I couldn't answer that."), links: j.links?.slice(0, 2), handoff: j.handoff }])
    } catch {
      setMsgs([...next, { role: 'assistant', text: t("Sorry, I couldn't answer that."), handoff: true }])
    }
    setBusy(false)
  }

  const callback = async (e: React.FormEvent) => {
    e.preventDefault()
    if (mobile.replace(/\D/g, '').length < 10) return
    const eventId = crypto.randomUUID?.() ?? String(Date.now())
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'chat', mobile, lang, consent: true, source: location.pathname, details: { question: msgs.filter((m) => m.role === 'user').map((m) => m.text).slice(-3).join(' | '), eventId } }),
    }).catch(() => {})
    gaEvent('generate_lead', { lead_type: 'chat', form_location: 'chat' }, eventId)
    setCb('sent')
  }

  return (
    <>
      {!open && shown && (
        <button
          type="button"
          onClick={() => {
            setOpen(true)
            track('chat_open')
          }}
          className="fixed right-3 bottom-[96px] z-50 inline-flex min-h-14 items-center gap-2 rounded-full bg-ink py-2 pr-5 pl-4 font-bold text-white shadow-[0_14px_30px_-10px_rgba(0,0,0,0.6)] md:right-5 md:bottom-5"
          aria-label={t('Questions? Chat with us')}
        >
          <MessageCircle size={22} aria-hidden="true" />
          <span className="max-sm:sr-only">{t('Questions?')}</span>
        </button>
      )}
      {open && (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="chat-h"
          className="fixed inset-x-2 bottom-[92px] z-[60] flex max-h-[min(640px,calc(100dvh-120px))] flex-col overflow-hidden rounded-[24px] border-2 border-ink bg-white text-ink shadow-[6px_6px_0_0_var(--ink)] sm:inset-x-auto sm:right-4 sm:w-[380px] md:bottom-5"
        >
          <header className="flex items-center justify-between gap-2 bg-ink px-4 py-3 text-white">
            <h2 id="chat-h" className="flex min-w-0 items-center gap-2 font-bold">
              <MessageCircle size={18} aria-hidden="true" className="flex-none" />
              <span className="truncate">{t(assistant.name)}</span>
            </h2>
            <button type="button" onClick={() => setOpen(false)} aria-label={t('Close chat')} className="grid size-10 place-items-center rounded-full hover:bg-white/10">
              <X size={20} aria-hidden="true" />
            </button>
          </header>
          <div ref={list} className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto p-4" aria-live="polite">
            <p className="max-w-[88%] self-start rounded-2xl rounded-tl-sm bg-ground px-3.5 py-2.5 leading-snug">{t(assistant.greeting)}</p>
            {!msgs.length && assistant.suggestions.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {assistant.suggestions.map((s) => (
                  <button key={s} type="button" onClick={() => ask(t(s))} className="min-h-10 rounded-full border-2 border-ink/15 px-3 text-left text-sm leading-tight font-semibold hover:border-ink">
                    {t(s)}
                  </button>
                ))}
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={i} className={'max-w-[88%] ' + (m.role === 'user' ? 'self-end' : 'self-start')}>
                <p className={'rounded-2xl px-3.5 py-2.5 leading-snug whitespace-pre-line [overflow-wrap:anywhere] ' + (m.role === 'user' ? 'rounded-tr-sm bg-yellow' : 'rounded-tl-sm bg-ground')}>{m.text}</p>
                {m.links && m.links.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {m.links.map((l) => (
                      <SiteLink key={l} href={l} className="inline-flex min-h-9 items-center rounded-full bg-ink px-3 text-sm font-bold text-white">
                        {t(linkLabel(l))} →
                      </SiteLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {busy && (
              <p className="self-start rounded-2xl bg-ground px-3.5 py-2.5 text-muted" role="status">
                {t('Typing…')}
              </p>
            )}
            {(msgs.some((m) => m.handoff) || msgs.length >= 4) && cb !== 'sent' && (
              <div className="mt-1 rounded-2xl border border-line p-3">
                <p className="text-sm font-bold">{t('Talk to a person')}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <a href={whatsapp} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-wa px-3 text-sm font-bold text-white">
                    <WhatsappIcon size={16} /> WhatsApp
                  </a>
                  <button type="button" onClick={() => setCb('form')} className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border-2 border-ink px-3 text-sm font-bold">
                    <Phone size={15} aria-hidden="true" /> {t('Call me back')}
                  </button>
                </div>
                {cb === 'form' && (
                  <form onSubmit={callback} className="mt-2.5 flex gap-2">
                    <label htmlFor="chat-mobile" className="sr-only">
                      {t('Mobile number')}
                    </label>
                    <input id="chat-mobile" type="tel" inputMode="numeric" autoComplete="tel-national" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder={t('10-digit mobile')} className="h-11 min-w-0 flex-1 rounded-xl border border-[#C9CFD6] px-3" />
                    <button type="submit" className="min-h-11 rounded-xl bg-ink px-4 text-sm font-bold text-white">
                      {t('Send')}
                    </button>
                  </form>
                )}
                {cb === 'form' && <p className="mt-1.5 text-xs text-muted">{t('Nicco Park may call you about this question.')}</p>}
              </div>
            )}
            {cb === 'sent' && <p className="self-start rounded-2xl bg-dry-soft px-3.5 py-2.5 font-semibold">{t('Thanks! We will get back to you soon.')}</p>}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              void ask(text)
            }}
            className="flex gap-2 border-t border-line p-3"
          >
            <label htmlFor="chat-q" className="sr-only">
              {t('Your question')}
            </label>
            <input ref={input} id="chat-q" value={text} onChange={(e) => setText(e.target.value)} maxLength={500} placeholder={t('Ask about tickets, timings, rides…')} className="h-12 min-w-0 flex-1 rounded-xl border border-[#C9CFD6] px-3.5" autoComplete="off" />
            <button type="submit" disabled={busy || !text.trim()} aria-label={t('Send')} className="grid size-12 flex-none place-items-center rounded-xl bg-yellow text-ink disabled:opacity-50">
              <Send size={18} aria-hidden="true" />
            </button>
          </form>
        </section>
      )}
    </>
  )
}

/** A third-party chat widget (admin-supplied embed code), added once after the page loads. */
function Embed({ code }: { code: string }) {
  useEffect(() => {
    if (document.getElementById('np-chat-embed')) return
    const host = document.createElement('div')
    host.id = 'np-chat-embed'
    document.body.appendChild(host)
    // createContextualFragment runs the vendor's <script> tags, like pasting them into the page.
    host.appendChild(document.createRange().createContextualFragment(code))
  }, [code])
  return null
}
