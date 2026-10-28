'use client'

import { useEffect, useState } from 'react'

type S = { mode: string; bookingUrl: string; semnoxConfigured: boolean; semnox: { ok: boolean; reason?: string } | null; envOverride: string | null }

/** Integrations → Ticketing: what is live right now, checked against the server. */
export function TicketingStatus() {
  const [s, setS] = useState<S | null>(null)
  const [err, setErr] = useState('')
  useEffect(() => {
    fetch('/api/ticketing/status', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then(setS)
      .catch((e) => setErr(e.message))
  }, [])
  const box: React.CSSProperties = { border: '1px solid var(--theme-elevation-150)', borderRadius: 10, padding: '12px 14px', margin: '0 0 20px', fontSize: 14, lineHeight: 1.6 }
  if (err) return <div style={box}>Could not check the ticketing status ({err}).</div>
  if (!s) return <div style={box}>Checking ticketing…</div>
  const label = { demo: 'Demo checkout on this site (no payment taken)', linkout: `Visitors finish on ${s.bookingUrl}`, semnox: 'Semnox' }[s.mode] ?? s.mode
  return (
    <div style={box}>
      <strong>Live now (saved setting):</strong> {label}
      {s.envOverride && <div>⚠️ The server forces this with TICKETING_MODE={s.envOverride} in .env.</div>}
      <div>
        Semnox credentials in .env: <b>{s.semnoxConfigured ? 'yes' : 'not yet'}</b>
        {s.semnox && <> · connection: <b style={{ color: s.semnox.ok ? 'var(--theme-success-500)' : 'var(--theme-error-500)' }}>{s.semnox.ok ? 'working' : s.semnox.reason}</b></>}
      </div>
      {s.mode === 'semnox' && !s.semnoxConfigured && <div>Until the credentials are added, the calendar uses this site's own capacity and the last step sends visitors to the booking site.</div>}
    </div>
  )
}
