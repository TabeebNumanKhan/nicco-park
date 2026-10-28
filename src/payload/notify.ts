/**
 * Outgoing messages: emails to the team (CMS → Email & notifications) and
 * signed webhook calls to other systems (CMS → Webhooks). Both are
 * best-effort and never block or fail the visitor's request.
 */
import { createHmac } from 'node:crypto'
import type { Payload } from 'payload'
import type { Lead } from '@/ops/service'

type EmailSettings = { fromName?: string | null; fromAddress?: string | null; replyTo?: string | null; routes?: { type: string; to: string }[] | null; dailyDigest?: boolean | null }

const TYPE_LABEL: Record<string, string> = {
  groups: 'Group / event enquiry',
  callback: 'Call-back request',
  contact: 'Contact form',
  offers: 'Offers sign-up',
  waitlist: 'Snow Park waitlist',
  chat: 'Chat hand-off',
  booking: 'New booking',
}

const esc = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

async function settings(payload: Payload): Promise<EmailSettings> {
  try {
    return (await payload.findGlobal({ slug: 'email', depth: 0, overrideAccess: true })) as EmailSettings
  } catch {
    return {}
  }
}

const recipients = (s: EmailSettings, type: string) =>
  (s.routes ?? [])
    .filter((r) => r.type === type)
    .flatMap((r) => r.to.split(','))
    .map((x) => x.trim())
    .filter((x) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x))

const from = (s: EmailSettings) => (s.fromAddress ? (s.fromName ? `"${s.fromName.replace(/"/g, '')}" <${s.fromAddress}>` : s.fromAddress) : undefined)
const site = () => (process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '')

function leadRows(l: Partial<Lead> & { details?: unknown }) {
  let details: Record<string, unknown> = {}
  try {
    details = typeof l.details === 'string' ? JSON.parse(l.details) : ((l.details as unknown as Record<string, unknown>) ?? {})
  } catch {}
  const rows: [string, unknown][] = [
    ['Name', l.name],
    ['Mobile / WhatsApp', l.mobile],
    ['Email', l.email],
    ...Object.entries(details).map(([k, v]) => [k[0].toUpperCase() + k.slice(1), typeof v === 'object' ? JSON.stringify(v) : v] as [string, unknown]),
    ['From page', l.source],
    ['Language', l.lang],
  ]
  return rows.filter(([, v]) => v !== null && v !== undefined && v !== '')
}

/** One email per new lead, to the addresses set for that kind of form. */
export async function emailNewLead(payload: Payload, lead: Partial<Lead> & { id?: number; details?: unknown }) {
  const s = await settings(payload)
  const to = recipients(s, lead.type ?? '')
  if (!to.length) return
  const label = TYPE_LABEL[lead.type ?? ''] ?? 'New lead'
  const table = leadRows(lead)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#5b636d">${esc(k)}</td><td style="padding:4px 0"><b>${esc(v)}</b></td></tr>`)
    .join('')
  try {
    await payload.sendEmail({
      to,
      from: from(s),
      replyTo: lead.email || s.replyTo || undefined,
      subject: `${label}: ${lead.name || lead.mobile || 'new'}`,
      html: `<div style="font:15px/1.5 system-ui,sans-serif;color:#101418"><h2 style="margin:0 0 10px">${esc(label)}</h2><table>${table}</table><p style="margin-top:16px"><a href="${site()}/admin/leads">Open the leads inbox</a></p></div>`,
      text: leadRows(lead)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n'),
    })
  } catch (e) {
    payload.logger.error({ err: e }, 'Lead email failed')
  }
}

/** The morning summary: yesterday's leads, to the group-enquiry addresses. */
export async function emailDigest(payload: Payload, leads: Lead[], day: string) {
  const s = await settings(payload)
  if (s.dailyDigest === false) return { sent: false, reason: 'off' }
  const to = recipients(s, 'groups')
  if (!to.length) return { sent: false, reason: 'no recipients' }
  const counts = Object.entries(leads.reduce<Record<string, number>>((m, l) => ((m[l.type] = (m[l.type] ?? 0) + 1), m), {}))
  const rows = leads
    .map((l) => `<tr><td>${esc(l.created_at.slice(11, 16))}</td><td>${esc(TYPE_LABEL[l.type] ?? l.type)}</td><td>${esc(l.name)}</td><td>${esc(l.mobile)}</td><td>${esc(l.source)}</td></tr>`)
    .join('')
  await payload.sendEmail({
    to,
    from: from(s),
    subject: `Nicco Park leads for ${day}: ${leads.length}`,
    html: `<div style="font:14px/1.5 system-ui,sans-serif"><h2>${leads.length} leads on ${esc(day)}</h2><p>${counts.map(([k, n]) => `${esc(TYPE_LABEL[k] ?? k)}: <b>${n}</b>`).join(' · ') || 'None.'}</p><table cellpadding="6" style="border-collapse:collapse">${rows}</table><p><a href="${site()}/admin/leads">Open the leads inbox</a></p></div>`,
  })
  return { sent: true, to: to.length }
}

export type WebhookEvent = 'order.created' | 'lead.created' | 'content.published' | 'content.deleted'

/**
 * POSTs { event, at, data } as JSON to every active webhook listening for
 * the event. The body is signed: X-Nicco-Signature: sha256=<HMAC of body
 * with the webhook's secret>, so the receiver can check it came from us.
 */
export async function fireWebhooks(payload: Payload, event: WebhookEvent, data: unknown) {
  let hooks: { id: string | number; url: string; secret?: string | null }[] = []
  try {
    hooks = (await payload.find({ collection: 'webhooks', where: { active: { equals: true }, events: { contains: event } }, depth: 0, limit: 50, overrideAccess: true })).docs as never
  } catch {
    return
  }
  await Promise.all(
    hooks.map(async (h) => {
      if (!/^https:\/\//.test(h.url) && !(process.env.NODE_ENV !== 'production' && /^http:\/\/localhost/.test(h.url))) return
      const body = JSON.stringify({ event, at: new Date().toISOString(), data })
      const sig = h.secret ? createHmac('sha256', h.secret).update(body).digest('hex') : ''
      let status = ''
      try {
        const r = await fetch(h.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'User-Agent': 'NiccoPark-Webhooks/1', 'X-Nicco-Event': event, ...(sig ? { 'X-Nicco-Signature': `sha256=${sig}` } : {}) },
          body,
          signal: AbortSignal.timeout(8000),
        })
        status = `${r.status} ${r.statusText}`.trim()
      } catch (e) {
        status = `Failed: ${(e as Error).message}`.slice(0, 120)
      }
      try {
        await payload.update({ collection: 'webhooks', id: h.id, data: { lastStatus: status, lastCalledAt: new Date().toISOString() }, overrideAccess: true, context: { disableRevalidate: true, skipAudit: true } })
      } catch {}
    }),
  )
}

/* ------------------------------------------------------------------ */
/*  Server-side conversions (GA4 Measurement Protocol, Meta CAPI)       */
/* ------------------------------------------------------------------ */

const sha256 = async (s: string) => {
  const { createHash } = await import('node:crypto')
  return createHash('sha256').update(s).digest('hex')
}
const cookieOf = (h: Headers, name: string) => h.get('cookie')?.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1]

/**
 * Sends a purchase or lead from the server too, when CMS → Tracking →
 * Server-side conversions is on and the secrets are in .env. Uses the same
 * event id as the browser so GA4 and Meta count it once. Respects the
 * visitor's cookie choice: nothing is sent without consent.
 */
export async function serverConversion(
  payload: Payload,
  headers: Headers,
  e: { name: 'purchase' | 'generate_lead'; eventId: string; value?: number; items?: { item_id: string; item_name: string; price: number; quantity: number }[]; email?: string; phone?: string; url?: string },
) {
  let g: Record<string, unknown> = {}
  try {
    g = (await payload.findGlobal({ slug: 'tracking', depth: 0, overrideAccess: true })) as unknown as Record<string, unknown>
  } catch {
    return
  }
  if (!g.serverSide) return
  const consent = cookieOf(headers, 'np_consent')?.match(/a([01])\.m([01])/)
  const analytics = consent?.[1] === '1'
  const marketing = consent?.[2] === '1'
  const jobs: Promise<unknown>[] = []

  const ga4 = typeof g.ga4Id === 'string' ? g.ga4Id : ''
  if (analytics && ga4 && process.env.GA4_API_SECRET) {
    const clientId = cookieOf(headers, '_ga')?.split('.').slice(-2).join('.')
    if (clientId) {
      const params = { currency: 'INR', value: e.value ?? 0, items: e.items, ...(e.name === 'purchase' ? { transaction_id: e.eventId } : { lead_id: e.eventId }) }
      jobs.push(
        fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(ga4)}&api_secret=${encodeURIComponent(process.env.GA4_API_SECRET)}`, {
          method: 'POST',
          body: JSON.stringify({ client_id: clientId, events: [{ name: e.name, params }] }),
          signal: AbortSignal.timeout(5000),
        }),
      )
    }
  }

  const pixel = typeof g.metaPixelId === 'string' ? g.metaPixelId : ''
  if (marketing && pixel && process.env.META_CAPI_TOKEN) {
    const digits = e.phone?.replace(/\D/g, '') ?? ''
    const phone = digits.length === 10 ? `91${digits}` : digits
    const user_data: Record<string, unknown> = {
      client_ip_address: headers.get('x-forwarded-for')?.split(',')[0]?.trim() || undefined,
      client_user_agent: headers.get('user-agent') || undefined,
      fbp: cookieOf(headers, '_fbp'),
      fbc: cookieOf(headers, '_fbc'),
      ...(e.email ? { em: [await sha256(e.email.trim().toLowerCase())] } : {}),
      ...(phone ? { ph: [await sha256(phone)] } : {}),
    }
    jobs.push(
      fetch(`https://graph.facebook.com/v21.0/${encodeURIComponent(pixel)}/events?access_token=${encodeURIComponent(process.env.META_CAPI_TOKEN)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [
            {
              event_name: e.name === 'purchase' ? 'Purchase' : 'Lead',
              event_time: Math.floor(Date.now() / 1000),
              event_id: e.eventId,
              action_source: 'website',
              event_source_url: e.url,
              user_data,
              custom_data: { currency: 'INR', value: e.value ?? 0, content_ids: e.items?.map((i) => i.item_id), content_type: 'product' },
            },
          ],
        }),
        signal: AbortSignal.timeout(5000),
      }),
    )
  }
  await Promise.allSettled(jobs)
}
