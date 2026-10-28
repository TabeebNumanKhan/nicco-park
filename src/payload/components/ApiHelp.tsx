/** Integrations → API & webhooks: what other systems can connect to. */
export function ApiHelp() {
  const row = { padding: '10px 12px', borderBottom: '1px solid var(--theme-elevation-100)', fontSize: 14 }
  const code = { fontFamily: 'ui-monospace, monospace', fontSize: 13, background: 'var(--theme-elevation-50)', padding: '2px 6px', borderRadius: 4 }
  const items: [string, string][] = [
    ['GET /api/pages, /api/offers, /api/events, /api/posts…', 'Read published content (JSON). Add ?locale=bn or hi.'],
    ['GET /api/booking/availability?from=YYYY-MM-DD&days=30', 'Crowd level per day (from capacity).'],
    ['POST /api/booking/orders', 'Create a booking (server-priced, idempotency key).'],
    ['POST /api/leads', 'Send an enquiry or sign-up (consent required).'],
    ['GET /api/ops/leads?from=…&to=…&format=csv', 'Leads export (needs an account with Leads access).'],
    ['GET /llms.txt', 'Plain-text facts for AI assistants, built from this CMS.'],
    ['GET /api/ticketing/status', 'Which ticketing mode is on and whether Semnox answers (staff only).'],
    ['POST /api/ticketing/semnox-webhook', 'For Semnox: gate scans and counter changes. Signed with SEMNOX_WEBHOOK_SECRET.'],
    ['POST /api/assistant', 'The website chat assistant (answers from this CMS).'],
    ['Webhook calls we send', 'JSON { event, at, data }, header X-Nicco-Signature: sha256=<HMAC of the body with your secret>.'],
  ]
  return (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ marginBottom: 8 }}>Connecting other systems</h3>
      <ol style={{ marginBottom: 16, paddingLeft: 18, lineHeight: 1.6 }}>
        <li>
          <b>API access:</b> Settings → Staff accounts → create an account for the system (e.g. "CRM sync"), give it a role with only the areas it needs, tick <b>Enable API key</b>, save, copy the key.
          It calls the API with the header <span style={code}>Authorization: users API-Key &lt;key&gt;</span>.
        </li>
        <li>
          <b>Push notifications to them:</b> Integrations → <b>Webhooks</b>: add the system's URL and pick events (booking made, lead received, content published).
        </li>
        <li>
          <b>Ticketing:</b> the Ticketing tab above; secrets in the server's <span style={code}>.env</span>.
        </li>
      </ol>
      <div style={{ border: '1px solid var(--theme-elevation-150)', borderRadius: 8, overflow: 'hidden' }}>
        {items.map(([a, b]) => (
          <div key={a} style={row}>
            <span style={code}>{a}</span>
            <div style={{ opacity: 0.75, marginTop: 4 }}>{b}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
