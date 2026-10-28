import { createClient, type Client, type InValue } from '@libsql/client'
import fs from 'node:fs'
import path from 'node:path'

/**
 * The operations database: orders, tickets, gate scans, capacity, campaign
 * events and leads. Deliberately separate from the CMS database:
 *
 *  - different load (bursty checkouts and gate scans vs rare edits),
 *  - personal data lives only here (DPDP Act: notice, consent, retention),
 *  - a CMS schema change can never touch an order.
 *
 * Locally it is a SQLite file (data/ops.db). In production point
 * OPS_DATABASE_URL at Turso/libSQL, or port the schema below to Postgres.
 * Money is stored in paise (integers). Semnox stays the system of record
 * for prices, capacity, barcodes and redemptions; this is the website's
 * mirror for reporting, support and attribution.
 */
const SCHEMA = /* sql */ `
CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  phone TEXT, name TEXT, email TEXT,
  wa_optin INTEGER DEFAULT 0, email_optin INTEGER DEFAULT 0, consent_at TEXT, notice_version TEXT,
  created_at TEXT NOT NULL, anonymised_at TEXT
);
CREATE INDEX IF NOT EXISTS customers_phone ON customers(phone);

CREATE TABLE IF NOT EXISTS consent_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id TEXT, purpose TEXT NOT NULL, granted INTEGER NOT NULL, notice_version TEXT, channel TEXT, at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,                 -- client-generated UUID = idempotency key
  booking_ref TEXT UNIQUE NOT NULL,    -- NP-XXXXXX shown to the visitor
  channel TEXT NOT NULL DEFAULT 'web', -- web | gate | district | yatri_sathi | whatsapp
  status TEXT NOT NULL,                -- held | paid | confirmed | cancelled | refunded | amended
  visit_date TEXT NOT NULL,
  customer_id TEXT,
  guests INTEGER NOT NULL DEFAULT 0, little_ones INTEGER NOT NULL DEFAULT 0,
  subtotal INTEGER NOT NULL, discount INTEGER NOT NULL DEFAULT 0, tax INTEGER NOT NULL DEFAULT 0, total INTEGER NOT NULL,
  payment_method TEXT, semnox_txn TEXT,
  visitor_id TEXT, campaign TEXT, variant TEXT, promo_code TEXT,
  utm_first TEXT, utm_last TEXT, lang TEXT,
  created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS orders_visit ON orders(visit_date);
CREATE INDEX IF NOT EXISTS orders_created ON orders(created_at);
CREATE INDEX IF NOT EXISTS orders_campaign ON orders(campaign, variant);

CREATE TABLE IF NOT EXISTS order_lines (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT NOT NULL,
  kind TEXT NOT NULL,            -- ticket | extra
  product_code TEXT NOT NULL,    -- dry | meal | pkg | bowl | pool | meal
  unit_type TEXT NOT NULL,       -- standard | student | child_free
  qty INTEGER NOT NULL, unit_price INTEGER NOT NULL, discount INTEGER NOT NULL DEFAULT 0, tax_rate REAL NOT NULL DEFAULT 0.18,
  slot TEXT
);
CREATE INDEX IF NOT EXISTS lines_order ON order_lines(order_id);

CREATE TABLE IF NOT EXISTS tickets (
  id TEXT PRIMARY KEY, order_id TEXT NOT NULL, barcode TEXT UNIQUE NOT NULL,
  guests INTEGER NOT NULL, valid_on TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'issued', -- issued | redeemed | void
  delivered_via TEXT, delivered_at TEXT
);

CREATE TABLE IF NOT EXISTS redemptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id TEXT NOT NULL, point TEXT NOT NULL, device TEXT, result TEXT NOT NULL, scanned_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS redemptions_at ON redemptions(scanned_at);

CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY, order_id TEXT NOT NULL, gateway TEXT NOT NULL, gateway_payment_id TEXT,
  status TEXT NOT NULL, amount INTEGER NOT NULL, method TEXT, captured_at TEXT
);

CREATE TABLE IF NOT EXISTS refunds (
  id TEXT PRIMARY KEY, payment_id TEXT NOT NULL, amount INTEGER NOT NULL, reason TEXT, status TEXT NOT NULL, at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS amendments (
  id INTEGER PRIMARY KEY AUTOINCREMENT, order_id TEXT NOT NULL, type TEXT NOT NULL,
  old_date TEXT, new_date TEXT, price_diff INTEGER DEFAULT 0, actor TEXT, at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS promo_redemptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT, code TEXT NOT NULL, order_id TEXT NOT NULL, discount INTEGER NOT NULL, at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS capacity (
  date TEXT NOT NULL, pool TEXT NOT NULL, capacity INTEGER NOT NULL, sold INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (date, pool)
);

CREATE TABLE IF NOT EXISTS webhook_events (
  provider TEXT NOT NULL, event_id TEXT NOT NULL, payload TEXT, received_at TEXT NOT NULL, processed_at TEXT, error TEXT,
  PRIMARY KEY (provider, event_id)
);

CREATE TABLE IF NOT EXISTS analytics_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitor_id TEXT, session_id TEXT, name TEXT NOT NULL,
  campaign TEXT, variant TEXT, path TEXT, props TEXT, at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS events_campaign ON analytics_events(campaign, variant, name);

CREATE TABLE IF NOT EXISTS experiment_assignments (
  visitor_id TEXT NOT NULL, campaign TEXT NOT NULL, variant TEXT NOT NULL, assigned_at TEXT NOT NULL,
  PRIMARY KEY (visitor_id, campaign)
);

CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'new',
  name TEXT, mobile TEXT, email TEXT, details TEXT, source TEXT, lang TEXT, consent INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);
`

let client: Client | null = null
let ready: Promise<void> | null = null

function url() {
  if (process.env.OPS_DATABASE_URL) return process.env.OPS_DATABASE_URL
  const dir = path.join(process.cwd(), 'data')
  fs.mkdirSync(dir, { recursive: true })
  return `file:${path.join(dir, 'ops.db')}`
}

/** The ops database, with its tables created on first use. */
export async function ops(): Promise<Client> {
  if (!client) {
    client = createClient({ url: url(), authToken: process.env.OPS_DATABASE_TOKEN })
    const c = client
    ready = c.executeMultiple(SCHEMA).then(() => upgrade(c))
  }
  await ready
  return client
}

/** Columns added after the first release. Each runs once; "duplicate column" means it's already there. */
const UPGRADES = [
  'ALTER TABLE leads ADD COLUMN notes TEXT',
  'ALTER TABLE leads ADD COLUMN updated_at TEXT',
  'ALTER TABLE leads ADD COLUMN updated_by TEXT',
  'CREATE INDEX IF NOT EXISTS leads_created ON leads(created_at)',
  'CREATE TABLE IF NOT EXISTS ticketing_events (id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT NOT NULL, ref TEXT, payload TEXT, at TEXT NOT NULL)',
]
async function upgrade(c: Client) {
  for (const sql of UPGRADES) {
    try {
      await c.execute(sql)
    } catch (e) {
      if (!/duplicate column/i.test(String(e))) throw e
    }
  }
}

export async function q<T = Record<string, unknown>>(sql: string, args: InValue[] = []): Promise<T[]> {
  const db = await ops()
  const r = await db.execute({ sql, args })
  return r.rows as unknown as T[]
}

export async function run(sql: string, args: InValue[] = []) {
  const db = await ops()
  return db.execute({ sql, args })
}

export const nowISO = () => new Date().toISOString()
