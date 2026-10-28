import type { AdminViewServerProps } from 'payload'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import { can } from '../access'
import { campaignResults, recentLeads, recentOrders, redemptionsSummary, salesSummary, upcomingCapacity } from '@/ops/service'

const rupees = (paise: number) => '₹' + Math.round(Number(paise) / 100).toLocaleString('en-IN')
const PRODUCT: Record<string, string> = { dry: 'Dry Park Day', meal: 'Dry Park + Meal', pkg: 'Parks Package', bowl: 'Super Bowl lane', pool: 'Pool table', 'meal-extra': 'Combo meal' }
const CROWD_COLOR: Record<string, string> = { plenty: '#20B464', filling: '#F5A300', few: '#E0452B', soldout: '#9AA3AD' }

/**
 * /admin/ops — the website's operations view. Reads the separate operations
 * database (orders, tickets, scans, capacity, campaign events, leads).
 * Visible to Admin, Marketing and Operations roles.
 */
export async function OpsDashboard({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { req, permissions, visibleEntities, locale } = initPageResult
  const allowed = can(req.user, 'ops', 'view')

  const template = (children: React.ReactNode) => (
    <DefaultTemplate
      i18n={req.i18n}
      locale={locale}
      params={params}
      payload={req.payload}
      permissions={permissions}
      searchParams={searchParams}
      user={req.user ?? undefined}
      visibleEntities={visibleEntities}
    >
      <Gutter>{children}</Gutter>
    </DefaultTemplate>
  )

  if (!req.user) return template(<p>Please log in.</p>)
  if (!allowed) return template(<p>Your role can’t see operations data. Ask an Admin.</p>)

  const range = Number(searchParams?.range ?? 30) || 30
  const [s, s7, cap, ab, orders, leads, scans] = await Promise.all([
    salesSummary(range),
    salesSummary(7),
    upcomingCapacity(14),
    campaignResults(),
    recentOrders(15),
    recentLeads(10),
    redemptionsSummary(7),
  ])
  const maxDay = Math.max(1, ...s.byDay.map((d) => Number(d.revenue)))
  const aov = Number(s.orders) ? Number(s.revenue) / Number(s.orders) : 0

  return template(
    <div className="np-ops">
      <header className="np-ops__head">
        <div>
          <h1>Operations</h1>
          <p>Bookings, capacity, campaign tests and leads from the website. Separate database from the CMS; personal data stays here.</p>
        </div>
        <nav className="np-ops__range">
          {[7, 30, 90].map((r) => (
            <a key={r} href={`/admin/ops?range=${r}`} className={r === range ? 'is-on' : ''}>
              {r} days
            </a>
          ))}
        </nav>
      </header>
      {process.env.OPS_DEMO_DATA !== '0' && (
        <p className="np-ops__note">Demo data: generated orders, scans and A/B traffic so the dashboard can be reviewed. Real bookings appear here once checkout is connected.</p>
      )}

      <section className="np-ops__kpis">
        <Kpi label={`Revenue · ${range} days`} value={rupees(Number(s.revenue))} sub={`Last 7 days ${rupees(Number(s7.revenue))}`} />
        <Kpi label="Orders" value={Number(s.orders).toLocaleString('en-IN')} sub={`Avg ${rupees(aov)} per order`} />
        <Kpi label="Guests booked" value={Number(s.guests).toLocaleString('en-IN')} sub={`+ ${Number(s.little).toLocaleString('en-IN')} little ones free`} />
        <Kpi label="Student tickets" value={Number(s.students).toLocaleString('en-IN')} sub={Number(s.guests) ? `${Math.round((Number(s.students) / Number(s.guests)) * 100)}% of guests` : ''} />
      </section>

      <div className="np-ops__grid">
        <section className="np-ops__card np-ops__wide">
          <h2>Revenue by day</h2>
          <div className="np-ops__bars" role="img" aria-label="Revenue by day">
            {s.byDay.map((d) => (
              <div key={d.day} className="np-ops__bar" title={`${d.day}: ${rupees(Number(d.revenue))} · ${d.orders} orders`}>
                <span style={{ height: `${(Number(d.revenue) / maxDay) * 100}%` }} />
              </div>
            ))}
          </div>
          <p className="np-ops__muted">{s.byDay[0]?.day} → {s.byDay[s.byDay.length - 1]?.day}</p>
        </section>

        <section className="np-ops__card">
          <h2>Tickets & add-ons sold</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {s.byProduct.map((p) => (
                <tr key={p.product_code}>
                  <td>{PRODUCT[p.product_code] ?? p.product_code}</td>
                  <td>{Number(p.qty).toLocaleString('en-IN')}</td>
                  <td>{rupees(Number(p.revenue))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="np-ops__card">
          <h2>Sales channel</h2>
          <table>
            <tbody>
              {s.byChannel.map((c) => (
                <tr key={c.channel}>
                  <td>{c.channel}</td>
                  <td>{Number(c.orders).toLocaleString('en-IN')} orders</td>
                  <td>{rupees(Number(c.revenue))}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 style={{ marginTop: 20 }}>Gate scans · 7 days</h2>
          <table>
            <tbody>
              {scans.map((d) => (
                <tr key={d.day}>
                  <td>{d.day}</td>
                  <td>{Number(d.scans).toLocaleString('en-IN')} scans</td>
                  <td>{Number(d.ok).toLocaleString('en-IN')} admitted</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="np-ops__card np-ops__wide">
          <h2>Capacity · next 14 days</h2>
          <div className="np-ops__cap">
            {cap.map((d) => (
              <div key={d.date} title={`${d.date}: ${d.sold} of ${d.capacity}`}>
                <div className="np-ops__capbar">
                  <span style={{ height: `${Math.min(100, (d.sold / d.capacity) * 100)}%`, background: CROWD_COLOR[d.crowd] }} />
                </div>
                <small>{d.date.slice(5)}</small>
                <small className="np-ops__muted">
                  {d.sold.toLocaleString('en-IN')} / {d.capacity.toLocaleString('en-IN')}
                </small>
              </div>
            ))}
          </div>
          <p className="np-ops__muted">Green plenty · amber filling (60%+) · red few left (85%+) · grey sold out. Semnox capacity replaces these defaults once connected.</p>
        </section>

        <section className="np-ops__card np-ops__wide">
          <h2>Campaign A/B tests</h2>
          <table>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Variant</th>
                <th>Visitors</th>
                <th>Button clicks</th>
                <th>Orders</th>
                <th>Conversion</th>
                <th>Revenue</th>
                <th>vs A</th>
              </tr>
            </thead>
            <tbody>
              {ab.map((r) => (
                <tr key={r.campaign + r.variant}>
                  <td>{r.campaign}</td>
                  <td>{r.variant.toUpperCase()}</td>
                  <td>{r.visitors.toLocaleString('en-IN')}</td>
                  <td>{r.clicks.toLocaleString('en-IN')}</td>
                  <td>{r.orders.toLocaleString('en-IN')}</td>
                  <td>{(r.rate * 100).toFixed(1)}%</td>
                  <td>{rupees(r.revenue)}</td>
                  <td>{r.variant === 'a' ? '—' : Math.abs(r.z) >= 1.96 ? (r.z > 0 ? '✅ better (95%)' : '⛔ worse (95%)') : 'not significant yet'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="np-ops__muted">Aim for about 200 orders per variant and a full week (both weekends) before calling a winner.</p>
        </section>

        <section className="np-ops__card np-ops__wide">
          <h2>Latest bookings</h2>
          <table>
            <thead>
              <tr>
                <th>Ref</th>
                <th>Name</th>
                <th>Visit</th>
                <th>Guests</th>
                <th>Total</th>
                <th>Channel</th>
                <th>Campaign</th>
                <th>Booked</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.booking_ref}>
                  <td>{o.booking_ref}</td>
                  <td>{o.name}</td>
                  <td>{o.visit_date}</td>
                  <td>{o.guests}</td>
                  <td>{rupees(Number(o.total))}</td>
                  <td>{o.channel}</td>
                  <td>{o.campaign ? `${o.campaign} / ${o.variant?.toUpperCase()}` : '—'}</td>
                  <td>{o.created_at.slice(0, 16).replace('T', ' ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="np-ops__card np-ops__wide">
          <h2>Leads & enquiries</h2>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>From</th>
                <th>Status</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td>{l.type}</td>
                  <td>{l.name}</td>
                  <td>{l.mobile}</td>
                  <td>{l.source}</td>
                  <td>{l.status}</td>
                  <td>{l.created_at.slice(0, 16).replace('T', ' ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>,
  )
}

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="np-ops__kpi">
      <span>{label}</span>
      <strong>{value}</strong>
      {sub && <small>{sub}</small>}
    </div>
  )
}
