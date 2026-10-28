import type { Endpoint, Payload, PayloadRequest } from 'payload'
import type { Extra, Ticket } from '@/content/types'
import type { Catalog } from '@/lib/booking/pricing'
import { semnox, semnoxConfigured, verifySemnoxWebhook } from '@/ops/semnox'
import { addLead, createOrder, leadsCsv, listLeads, track, updateLead } from '@/ops/service'
import { availabilityVia, laneSlotsVia, recordTicketingEvent, ticketingSettings } from '@/ops/ticketing'
import { reqCan } from './access'
import { answer } from './assistant'
import { emailDigest, emailNewLead, fireWebhooks, serverConversion } from './notify'
import { previewUrl } from './preview'

/**
 * Public website endpoints, served by Payload under /api/*. They write to the
 * operations database (src/ops), never to the CMS database.
 *
 *   GET  /api/booking/availability?from=YYYY-MM-DD&days=91
 *   GET  /api/booking/lane-slots?date=YYYY-MM-DD
 *   POST /api/booking/orders          { idempotencyKey, cart, contact, method, lang, attribution }
 *   POST /api/track                   { name, visitorId, campaign, variant, path, props }
 *   POST /api/leads                   { type, name, mobile, email, details, source, lang, consent }
 *   GET  /api/cms/edit-link?path=/bn/offers/fun-fest   (signed-in staff) → where to edit that page
 */

const json = (data: unknown, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } })
const ISO = /^\d{4}-\d{2}-\d{2}$/

export async function getCatalog(payload: Payload, locale = 'en'): Promise<Catalog> {
  const loc = locale as 'en' | 'bn' | 'hi'
  const [t, e, b] = await Promise.all([
    payload.find({ collection: 'tickets', locale: loc, sort: 'order', limit: 50, depth: 0 }),
    payload.find({ collection: 'extras', locale: loc, sort: 'order', limit: 50, depth: 1 }),
    payload.findGlobal({ slug: 'bowling', locale: loc, depth: 0 }),
  ])
  return {
    tickets: t.docs.map((d) => ({ ...d, id: d.code, includes: (d.includes ?? []).map((x) => x.text), excludes: (d.excludes ?? []).map((x) => x.text) })) as unknown as Ticket[],
    extras: e.docs.map((d) => ({ ...d, id: d.code })) as unknown as Extra[],
    laneTimes: (b.laneTimes ?? []).map((x) => x.time as string),
  }
}

async function body(req: PayloadRequest) {
  try {
    return (await req.json?.()) ?? {}
  } catch {
    return {}
  }
}

/** Yesterday (India time) in UTC bounds, and the email for it. */
export async function sendDigest(payload: Payload) {
  const ist = new Date(Date.now() + 5.5 * 3600e3)
  const day = new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate() - 1))
  const from = new Date(day.getTime() - 5.5 * 3600e3).toISOString()
  const to = new Date(day.getTime() + 24 * 3600e3 - 5.5 * 3600e3).toISOString()
  const { rows } = await listLeads({ from, to, limit: 1000 })
  return emailDigest(payload, rows.filter((l) => l.status !== 'spam'), day.toISOString().slice(0, 10))
}

export const endpoints: Endpoint[] = [
  {
    path: '/booking/availability',
    method: 'get',
    handler: async (req) => {
      const from = String(req.query?.from ?? '')
      const days = Math.min(120, Math.max(1, Number(req.query?.days ?? 91)))
      if (!ISO.test(from)) return json({ error: 'from=YYYY-MM-DD required' }, 400)
      return json(await availabilityVia(req.payload, from, days))
    },
  },
  {
    path: '/booking/lane-slots',
    method: 'get',
    handler: async (req) => {
      const date = String(req.query?.date ?? '')
      if (!ISO.test(date)) return json({ error: 'date=YYYY-MM-DD required' }, 400)
      const catalog = await getCatalog(req.payload)
      return json(await laneSlotsVia(req.payload, date, catalog.laneTimes))
    },
  },
  {
    path: '/booking/orders',
    method: 'post',
    handler: async (req) => {
      const b = await body(req)
      const ticketing = await ticketingSettings(req.payload)
      // Orders are taken here only in demo mode, until Semnox and the payment gateway are connected.
      if (ticketing.mode !== 'demo') return json({ error: 'Online booking continues on our ticketing site', bookingUrl: ticketing.bookingUrl }, 409)
      try {
        const catalog = await getCatalog(req.payload, b.lang)
        const order = await createOrder(b, catalog)
        void fireWebhooks(req.payload, 'order.created', order).catch(() => {})
        if (!order.duplicate)
          void serverConversion(req.payload, req.headers, { name: 'purchase', eventId: order.bookingId, value: order.total, phone: b?.contact?.mobile, url: req.headers.get('referer') ?? undefined }).catch(() => {})
        return json(order, 201)
      } catch (e) {
        return json({ error: (e as Error).message }, 400)
      }
    },
  },
  {
    path: '/track',
    method: 'post',
    handler: async (req) => {
      const b = await body(req)
      if (typeof b?.name !== 'string') return json({ ok: false }, 400)
      await track({ name: b.name, visitorId: b.visitorId, sessionId: b.sessionId, campaign: b.campaign, variant: b.variant, path: b.path, props: b.props })
      return json({ ok: true })
    },
  },
  {
    path: '/leads',
    method: 'post',
    handler: async (req) => {
      const b = await body(req)
      if (!['groups', 'offers', 'waitlist', 'callback', 'contact', 'chat'].includes(b?.type)) return json({ error: 'type' }, 400)
      if (!b.consent) return json({ error: 'consent required' }, 400)
      // Bots fill the hidden "website" field; pretend all is well.
      if (b.website) return json({ ok: true }, 201)
      const str = (v: unknown, n: number) => (typeof v === 'string' && v.trim() ? v.trim().slice(0, n) : undefined)
      const mobile = str(b.mobile, 20)?.replace(/[^\d+]/g, '')
      if (mobile && !/^(\+?91)?[6-9]\d{9}$|^\+\d{8,15}$/.test(mobile)) return json({ error: 'mobile' }, 400)
      const details = b.details && typeof b.details === 'object' ? JSON.parse(JSON.stringify(b.details).slice(0, 4000) || '{}') : undefined
      const lead = { type: b.type as string, name: str(b.name, 120), mobile, email: str(b.email, 200), details, source: str(b.source, 200), lang: str(b.lang, 5) }
      const id = await addLead({ ...lead, consent: true })
      const eventId = typeof details?.eventId === 'string' ? details.eventId : String(id)
      void Promise.all([
        emailNewLead(req.payload, { id, ...lead }),
        fireWebhooks(req.payload, 'lead.created', { id, ...lead }),
        serverConversion(req.payload, req.headers, { name: 'generate_lead', eventId, email: lead.email, phone: lead.mobile, url: req.headers.get('referer') ?? undefined }),
      ]).catch(() => {})
      return json({ ok: true }, 201)
    },
  },
  {
    // Leads inbox data. ?format=csv downloads a spreadsheet of the same filter.
    path: '/ops/leads',
    method: 'get',
    handler: async (req) => {
      if (!reqCan(req, 'leads', 'view')) return json({ error: 'not allowed' }, 403)
      const qp = (req.query ?? {}) as Record<string, string | undefined>
      const csv = qp.format === 'csv'
      const r = await listLeads({ from: qp.from, to: qp.to, type: qp.type, status: qp.status, source: qp.source, q: qp.q, limit: csv ? 5000 : Number(qp.limit ?? 50), offset: Number(qp.offset ?? 0) })
      if (!csv) return json(r)
      return new Response(leadsCsv(r.rows), { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="nicco-leads-${new Date().toISOString().slice(0, 10)}.csv"`, 'Cache-Control': 'no-store' } })
    },
  },
  {
    path: '/ops/leads/:id',
    method: 'patch',
    handler: async (req) => {
      if (!reqCan(req, 'leads', 'edit')) return json({ error: 'not allowed' }, 403)
      const b = await body(req)
      const id = Number(req.routeParams?.id)
      if (!id) return json({ error: 'id' }, 400)
      try {
        const u = req.user as { email?: string; name?: string } | null
        return json(await updateLead(id, { status: typeof b.status === 'string' ? b.status : undefined, notes: typeof b.notes === 'string' ? b.notes.slice(0, 2000) : undefined }, u?.name || u?.email || 'staff'))
      } catch (e) {
        return json({ error: (e as Error).message }, 400)
      }
    },
  },
  {
    // The morning summary. Runs by itself at 9:00 IST; staff or a cron (Authorization: Bearer CRON_SECRET) can also call it.
    path: '/ops/leads/digest',
    method: 'post',
    handler: async (req) => {
      const cron = process.env.CRON_SECRET && req.headers.get('authorization') === `Bearer ${process.env.CRON_SECRET}`
      if (!cron && !reqCan(req, 'leads', 'full')) return json({ error: 'not allowed' }, 403)
      return json(await sendDigest(req.payload))
    },
  },
  {
    // The redirect list for src/proxy.ts (public: old web addresses aren't secret).
    path: '/cms/redirects',
    method: 'get',
    handler: async (req) => {
      const r = await req.payload.find({ collection: 'redirects', limit: 2000, depth: 0, pagination: false, overrideAccess: true })
      const rules = (r.docs as unknown as { from: string; to: string; type?: string }[]).map((d) => ({ from: d.from, to: d.to, type: d.type === '302' ? 302 : 301 }))
      return Response.json(rules, { headers: { 'Cache-Control': 'public, max-age=60' } })
    },
  },
  {
    // The chat bubble. Answers only from CMS facts (or Claude limited to them).
    path: '/assistant',
    method: 'post',
    handler: async (req) => {
      const b = await body(req)
      if (typeof b?.message !== 'string') return json({ error: 'message' }, 400)
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
      const history = Array.isArray(b.history) ? b.history.filter((h: { role?: string; text?: unknown }) => (h.role === 'user' || h.role === 'assistant') && typeof h.text === 'string') : []
      void track({ name: 'chat_message', path: typeof b.path === 'string' ? b.path.slice(0, 200) : undefined })
      return json(await answer(req.payload, { message: b.message, lang: b.lang, history, ip }))
    },
  },
  {
    // Integrations → Ticketing: which mode is on and whether Semnox answers.
    path: '/ticketing/status',
    method: 'get',
    handler: async (req) => {
      if (!reqCan(req, 'integrations', 'view')) return json({ error: 'not allowed' }, 403)
      const s = await ticketingSettings(req.payload)
      return json({ mode: s.mode, bookingUrl: s.bookingUrl, semnoxConfigured: semnoxConfigured(), semnox: s.mode === 'semnox' ? await semnox.health(s.semnox) : null, envOverride: process.env.TICKETING_MODE ?? null })
    },
  },
  {
    // Semnox → website (scans, counter changes). Signed; see src/ops/semnox.ts.
    path: '/ticketing/semnox-webhook',
    method: 'post',
    handler: async (req) => {
      const raw = (await req.text?.()) ?? ''
      if (!(await verifySemnoxWebhook(raw, req.headers.get('x-semnox-signature')))) return json({ error: 'bad signature' }, 401)
      let b: { type?: string; reference?: string } = {}
      try {
        b = JSON.parse(raw)
      } catch {}
      await recordTicketingEvent(b.type ?? 'unknown', b.reference ?? '', b)
      return json({ ok: true })
    },
  },
  {
    path: '/cms/edit-link',
    method: 'get',
    handler: async (req) => {
      if (!req.user) return json({ error: 'sign in' }, 401)
      const raw = String(req.query?.path ?? '/')
      const lang = raw.match(/^\/(en|bn|hi)(?=\/|$)/)?.[1] ?? 'en'
      const path = raw.replace(/\.html$/, '').replace(/^\/(en|bn|hi)(?=\/|$)/, '') || '/'
      const seg = path.split('/').filter(Boolean)
      let url = ''
      let label = ''
      const edit = async (collection: 'pages' | 'offers' | 'events' | 'posts' | 'worlds', slug: string, what: string) => {
        const d = (await req.payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, depth: 0, draft: true })).docs[0]
        if (d) {
          url = `/admin/editor?kind=${collection}&id=${d.id}&lang=${lang}`
          label = what
        }
      }
      if (seg.length === 0) await edit('pages', 'home', 'Home page')
      else if (seg[0] === 'offers' && seg[1]) await edit('offers', seg[1], 'Offer')
      else if (seg[0] === 'whats-on' && seg[1]) await edit('events', seg[1], 'Event')
      else if (seg[0] === 'journal' && seg[1]) await edit('posts', seg[1], 'Journal post')
      else if (seg[0] === 'worlds' && seg[1]) await edit('worlds', seg[1], 'World')
      else if (seg.length === 1) {
        await edit('pages', seg[0], 'Page')
        const lists: Record<string, [string, string]> = {
          offers: ['collections/offers', 'Offers'],
          'whats-on': ['collections/events', 'Events'],
          plan: ['globals/visit', 'Plan your visit'],
          groups: ['collections/occasions', 'Groups & events'],
          moments: ['collections/moments', '#NiccoMoments'],
          journal: ['collections/posts', 'Joyride Journal'],
          book: ['collections/tickets', 'Ticket prices'],
          'my-nicco': ['globals/site-settings', 'Site settings'],
        }
        if (!url && lists[seg[0]]) {
          url = `/admin/${lists[seg[0]][0]}?locale=${lang}`
          label = lists[seg[0]][1]
        }
      }
      return json({ url: url || '/admin', label: label || 'CMS', previewUrl: previewUrl(path === '/' ? '' : path, lang) })
    },
  },
  {
    // Live preview: the preview frame polls this while an editor is working and
    // re-renders when anything changes (draft autosaves, saves, settings).
    path: '/cms/stamp',
    method: 'get',
    handler: async (req) => {
      if (!req.user) return json({ error: 'sign in' }, 401)
      const p = req.payload
      const latest = await Promise.all([
        ...(['pages', 'offers', 'events', 'posts'] as const).map((c) =>
          p.find({ collection: c, draft: true, sort: '-updatedAt', limit: 1, depth: 0, pagination: false, select: { updatedAt: true } as never }).then((r) => String((r.docs[0] as { updatedAt?: string } | undefined)?.updatedAt ?? '')),
        ),
        ...(['worlds', 'tickets', 'extras', 'rides', 'faqs', 'crews', 'moments', 'venues', 'occasions', 'translations'] as const).map((c) =>
          p.find({ collection: c, sort: '-updatedAt', limit: 1, depth: 0, pagination: false, select: { updatedAt: true } as never }).then((r) => String((r.docs[0] as { updatedAt?: string } | undefined)?.updatedAt ?? '')),
        ),
        ...(['site-settings', 'header', 'footer', 'visit', 'bowling'] as const).map((g) => p.findGlobal({ slug: g, depth: 0 }).then((d) => String(d?.updatedAt ?? ''))),
      ])
      return json({ stamp: latest.sort().pop() ?? '' })
    },
  },
]
