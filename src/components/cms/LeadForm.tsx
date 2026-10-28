'use client'

import { useId, useState } from 'react'
import { useLang } from '@/i18n/LangProvider'
import { gaEvent, setUserData } from '@/lib/analytics'
import { attribution, track } from '@/lib/attribution'

const DEFAULT_BUTTON = { offers: 'Send me offers', waitlist: 'Join the waitlist', callback: 'Call me back', groups: 'Get a quote', contact: 'Send message' }

/**
 * Sign-up form used by the "Sign-up form" section. Sends to /api/leads, which
 * stores the person and their consent in the operations database (never the
 * CMS). The consent box is required and unticked by default.
 */
export function LeadForm({ type, buttonLabel, dark, source }: { type: keyof typeof DEFAULT_BUTTON; buttonLabel?: string; dark?: boolean; source: string }) {
  const { lang, t } = useLang()
  const uid = useId()
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [consent, setConsent] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const long = type === 'groups' || type === 'contact'
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (mobile.replace(/\D/g, '').length < 10) return setError(t('Enter a 10-digit mobile number.'))
    if (!consent) return setError(t('Please tick the box so we can message you.'))
    setError('')
    setState('busy')
    const a = attribution()
    // One id for this lead, shared by the browser tag and the server copy (counted once).
    const eventId = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now())
    const website = (e.currentTarget as HTMLFormElement).elements.namedItem('website') as HTMLInputElement | null
    try {
      if (process.env.NEXT_PUBLIC_STATIC !== '1') {
        const res = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, name, mobile, email: email || undefined, source, lang, consent, website: website?.value || undefined, details: { message: message || undefined, campaign: a.campaign, variant: a.variant, utm: a.utmLast, eventId } }),
        })
        if (!res.ok) throw new Error()
      }
      track('lead', { campaign: a.campaign, variant: a.variant, props: { type, source } })
      setUserData({ email, phone: mobile })
      gaEvent('generate_lead', { lead_type: type, form_location: source, currency: 'INR', value: 0 }, eventId)
      setState('done')
    } catch {
      setState('error')
      setError(t('Sorry, that did not send. Please try again.'))
    }
  }

  if (state === 'done')
    return (
      <p role="status" className="rounded-2xl bg-white p-5 text-lg font-bold text-ink">
        {type === 'callback' || long ? t('Thanks! We will get back to you soon.') : t('Done. Watch WhatsApp for your first offer.')}
      </p>
    )

  const field = 'h-14 w-full rounded-2xl border-2 border-ink bg-white px-4 text-ink placeholder:text-muted'
  return (
    <form onSubmit={submit} noValidate className={'grid gap-3 rounded-[24px] p-4 md:p-5 ' + (dark ? 'bg-white/10' : 'bg-white/70')}>
      {/* Left empty by people; bots fill it in. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold">
          {t('Your name')}
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          {t('WhatsApp number')}
          <input value={mobile} onChange={(e) => setMobile(e.target.value)} type="tel" inputMode="numeric" autoComplete="tel" required className={field} />
        </label>
      </div>
      {long && (
        <>
          <label className="grid gap-1 text-sm font-semibold">
            {t('Email (optional)')}
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" className={field} />
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            {type === 'groups' ? t('Tell us about your group: date, number of guests, what you have in mind') : t('Your message')}
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full rounded-2xl border-2 border-ink bg-white px-4 py-3 text-ink" />
          </label>
        </>
      )}
      <label htmlFor={uid} className="flex items-start gap-2.5 text-sm leading-snug">
        <input id={uid} type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 size-5 flex-none accent-ink" />
        <span>{long || type === 'callback' ? t('Nicco Park may contact me about this request.') : t('Yes, Nicco Park may send me offers and updates on WhatsApp. I can stop them any time.')}</span>
      </label>
      {error && (
        <p role="alert" className="font-semibold text-alert-ink">
          {error}
        </p>
      )}
      <button disabled={state === 'busy'} className="min-h-14 rounded-2xl bg-ink px-6 font-bold text-white disabled:opacity-60">
        {t(buttonLabel || DEFAULT_BUTTON[type])}
      </button>
    </form>
  )
}
