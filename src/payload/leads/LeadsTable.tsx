'use client'

import { Download, MessageCircle, Phone, RefreshCw, Search, Send } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import './leads.css'

type Lead = {
  id: number
  type: string
  status: string
  name: string | null
  mobile: string | null
  email: string | null
  details: string | null
  source: string | null
  lang: string | null
  notes: string | null
  created_at: string
  updated_by: string | null
}
type Resp = { rows: Lead[]; total: number; byType: { k: string; n: number }[]; byStatus: { k: string; n: number }[]; sources: { k: string | null; n: number }[] }

const TYPES: Record<string, string> = { groups: 'Group / event', callback: 'Call back', contact: 'Contact', offers: 'Offers sign-up', waitlist: 'Snow Park waitlist', chat: 'Chat' }
const STATUSES: Record<string, string> = { new: 'New', contacted: 'Contacted', won: 'Booked / won', lost: 'Not interested', spam: 'Spam' }
const RANGES = [
  ['today', 'Today'],
  ['yesterday', 'Yesterday'],
  ['7', 'Last 7 days'],
  ['30', 'Last 30 days'],
  ['all', 'All time'],
  ['custom', 'Pick dates'],
] as const

/** India time: the park's day starts at midnight IST, whatever the browser says. */
const IST = 5.5 * 3600e3
const istDay = (iso: string) => new Date(new Date(iso).getTime() + IST).toISOString().slice(0, 10)
const istMidnight = (daysAgo: number) => {
  const n = new Date(Date.now() + IST)
  return new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate() - daysAgo) - IST).toISOString()
}
const dayLabel = (d: string) => {
  const today = istDay(new Date().toISOString())
  const y = istDay(new Date(Date.now() - 864e5).toISOString())
  const nice = new Date(d + 'T00:00:00Z').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', timeZone: 'UTC' })
  return d === today ? `Today · ${nice}` : d === y ? `Yesterday · ${nice}` : nice
}
const time = (iso: string) => new Date(iso).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' })

function detailsText(d: string | null) {
  if (!d) return ''
  try {
    const o = JSON.parse(d) as Record<string, unknown>
    return Object.entries(o)
      .filter(([, v]) => v !== null && v !== '' && v !== undefined)
      .map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`)
      .join(' · ')
  } catch {
    return d
  }
}

export function LeadsTable({ canEdit, canDigest, canEmail }: { canEdit: boolean; canDigest: boolean; canEmail: boolean }) {
  const [range, setRange] = useState<(typeof RANGES)[number][0]>('7')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [source, setSource] = useState('')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(0)
  const [data, setData] = useState<Resp | null>(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const per = 50

  const params = useMemo(() => {
    const p = new URLSearchParams()
    if (range === 'today') p.set('from', istMidnight(0))
    else if (range === 'yesterday') (p.set('from', istMidnight(1)), p.set('to', istMidnight(0)))
    else if (range === '7') p.set('from', istMidnight(6))
    else if (range === '30') p.set('from', istMidnight(29))
    else if (range === 'custom') {
      if (from) p.set('from', new Date(new Date(from + 'T00:00:00Z').getTime() - IST).toISOString())
      if (to) p.set('to', new Date(new Date(to + 'T00:00:00Z').getTime() + 864e5 - IST).toISOString())
    }
    if (type) p.set('type', type)
    if (status) p.set('status', status)
    if (source) p.set('source', source)
    if (q) p.set('q', q)
    return p
  }, [range, from, to, type, status, source, q])

  const load = useCallback(async () => {
    setBusy(true)
    const p = new URLSearchParams(params)
    p.set('limit', String(per))
    p.set('offset', String(page * per))
    try {
      const r = await fetch(`/api/ops/leads?${p}`, { credentials: 'include', cache: 'no-store' })
      if (!r.ok) throw new Error((await r.json()).error ?? r.statusText)
      setData(await r.json())
    } catch (e) {
      setMsg((e as Error).message)
    }
    setBusy(false)
  }, [params, page])

  useEffect(() => {
    const t = setTimeout(load, q ? 300 : 0)
    return () => clearTimeout(t)
  }, [load, q])
  useEffect(() => setPage(0), [params])

  const patch = async (id: number, body: { status?: string; notes?: string }) => {
    const r = await fetch(`/api/ops/leads/${id}`, { method: 'PATCH', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (!r.ok) return setMsg('Could not save. ' + ((await r.json()).error ?? ''))
    const lead = (await r.json()) as Lead
    setData((d) => (d ? { ...d, rows: d.rows.map((x) => (x.id === id ? lead : x)) } : d))
  }

  const digest = async () => {
    const r = await fetch('/api/ops/leads/digest', { method: 'POST', credentials: 'include' })
    const j = await r.json()
    setMsg(j.sent ? `Summary of yesterday sent to ${j.to} address(es).` : `Not sent: ${j.reason ?? j.error}. Set addresses in Integrations → Email & notifications.`)
  }

  const groups = useMemo(() => {
    const m = new Map<string, Lead[]>()
    for (const l of data?.rows ?? []) {
      const d = istDay(l.created_at)
      m.set(d, [...(m.get(d) ?? []), l])
    }
    return [...m.entries()]
  }, [data])
  const count = (list: { k: string | null; n: number }[] | undefined, k: string) => list?.find((x) => x.k === k)?.n ?? 0

  return (
    <div className="nl">
      <div className="nl-head">
        <div>
          <h1>Leads inbox</h1>
          <p>Every enquiry and sign-up from the website, newest first. Times are India time.</p>
        </div>
        <div className="nl-actions">
          <button type="button" className="nl-btn" onClick={load} disabled={busy}>
            <RefreshCw size={15} aria-hidden="true" /> Refresh
          </button>
          <a className="nl-btn" href={`/api/ops/leads?${params}&format=csv`}>
            <Download size={15} aria-hidden="true" /> Export to Excel (CSV)
          </a>
          {canDigest && (
            <button type="button" className="nl-btn" onClick={digest} title="Emails yesterday's leads to the Group / event enquiry addresses">
              <Send size={15} aria-hidden="true" /> Email yesterday&apos;s summary
            </button>
          )}
        </div>
      </div>
      {canEmail && (
        <p className="nl-hint">
          Where new leads are emailed: <a href="/admin/globals/email">Integrations → Email & notifications</a>. A summary goes out every morning at 9:00.
        </p>
      )}
      {msg && (
        <p className="nl-msg" role="status">
          {msg}{' '}
          <button type="button" onClick={() => setMsg('')} aria-label="Dismiss">
            ×
          </button>
        </p>
      )}

      <div className="nl-filters">
        <div className="nl-seg" role="group" aria-label="Dates">
          {RANGES.map(([k, label]) => (
            <button key={k} type="button" aria-pressed={range === k} className={range === k ? 'is-on' : ''} onClick={() => setRange(k)}>
              {label}
            </button>
          ))}
        </div>
        {range === 'custom' && (
          <span className="nl-dates">
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From" /> –
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} aria-label="To" />
          </span>
        )}
        <label className="nl-search">
          <Search size={15} aria-hidden="true" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, mobile, email, message…" aria-label="Search leads" />
        </label>
      </div>
      <div className="nl-filters">
        <div className="nl-chips" role="group" aria-label="Kind">
          <button type="button" className={!type ? 'is-on' : ''} onClick={() => setType('')}>
            All kinds <b>{data?.total ?? 0}</b>
          </button>
          {Object.entries(TYPES).map(([k, label]) => (
            <button key={k} type="button" className={type === k ? 'is-on' : ''} onClick={() => setType(type === k ? '' : k)}>
              {label} <b>{count(data?.byType, k)}</b>
            </button>
          ))}
        </div>
      </div>
      <div className="nl-filters">
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
          <option value="">Any status</option>
          {Object.entries(STATUSES).map(([k, label]) => (
            <option key={k} value={k}>
              {label} ({count(data?.byStatus, k)})
            </option>
          ))}
        </select>
        <select value={source} onChange={(e) => setSource(e.target.value)} aria-label="From page or campaign">
          <option value="">Any page / campaign</option>
          {data?.sources
            .filter((s) => s.k)
            .map((s) => (
              <option key={s.k} value={s.k!}>
                {s.k} ({s.n})
              </option>
            ))}
        </select>
      </div>

      {data && !data.rows.length && <p className="nl-empty">No leads for these filters.</p>}
      {groups.map(([day, rows]) => (
        <section key={day} className="nl-day">
          <h2>
            {dayLabel(day)} <span>{rows.length}</span>
          </h2>
          <div className="nl-table-wrap">
            <table className="nl-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Kind</th>
                  <th>Person</th>
                  <th>Message / details</th>
                  <th>From</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((l) => {
                  const wa = l.mobile ? l.mobile.replace(/\D/g, '').replace(/^(?=[6-9]\d{9}$)/, '91') : ''
                  return (
                    <tr key={l.id} className={'is-' + l.status}>
                      <td className="nl-nowrap">{time(l.created_at)}</td>
                      <td>
                        <span className={'nl-type t-' + l.type}>{TYPES[l.type] ?? l.type}</span>
                      </td>
                      <td>
                        <b>{l.name || '—'}</b>
                        {l.mobile && (
                          <span className="nl-contact">
                            <a href={`tel:${l.mobile}`}>
                              <Phone size={13} aria-hidden="true" /> {l.mobile}
                            </a>
                            <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${l.name ?? l.mobile}`}>
                              <MessageCircle size={13} aria-hidden="true" /> WhatsApp
                            </a>
                          </span>
                        )}
                        {l.email && (
                          <a className="nl-contact" href={`mailto:${l.email}`}>
                            {l.email}
                          </a>
                        )}
                      </td>
                      <td className="nl-details">{detailsText(l.details)}</td>
                      <td className="nl-src">
                        {l.source}
                        {l.lang && l.lang !== 'en' ? <span className="nl-lang">{l.lang.toUpperCase()}</span> : null}
                      </td>
                      <td>
                        <select value={l.status} disabled={!canEdit} onChange={(e) => patch(l.id, { status: e.target.value })} aria-label="Status">
                          {Object.entries(STATUSES).map(([k, label]) => (
                            <option key={k} value={k}>
                              {label}
                            </option>
                          ))}
                        </select>
                        {l.updated_by && <small className="nl-by">by {l.updated_by}</small>}
                      </td>
                      <td>
                        <textarea
                          defaultValue={l.notes ?? ''}
                          disabled={!canEdit}
                          rows={2}
                          placeholder="Called, will book Sat…"
                          aria-label="Notes"
                          onBlur={(e) => e.target.value !== (l.notes ?? '') && patch(l.id, { notes: e.target.value })}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}
      {data && data.total > per && (
        <div className="nl-pager">
          <button type="button" className="nl-btn" disabled={page === 0} onClick={() => setPage(page - 1)}>
            ← Newer
          </button>
          <span>
            {page * per + 1}–{Math.min(data.total, (page + 1) * per)} of {data.total}
          </span>
          <button type="button" className="nl-btn" disabled={(page + 1) * per >= data.total} onClick={() => setPage(page + 1)}>
            Older →
          </button>
        </div>
      )}
    </div>
  )
}
