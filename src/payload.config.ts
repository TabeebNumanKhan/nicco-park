import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { bnIn } from '@payloadcms/translations/languages/bnIn'
import { en } from 'payload/i18n/en'
import { hi } from './payload/i18n/hi'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import fs from 'node:fs'
import path from 'node:path'
import { buildConfig, type CollectionConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { collections } from './payload/collections'
import { endpoints } from './payload/endpoints'
import { globals } from './payload/globals'
import { migrations } from './migrations'
import { auditAfterChange, auditAfterDelete, publishGuard } from './payload/hooks/audit'
import { hiddenUnless, type Area } from './payload/access'
import { revalidateAfterDelete } from './payload/hooks/revalidate'
import { withUploadHints } from './payload/blocks/design'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const dataDir = path.resolve(dirname, '..', 'data')
fs.mkdirSync(dataDir, { recursive: true })

/**
 * Every collection gets the change log; drafted ones also get the publish
 * check, and each is hidden from staff whose role can't see its area.
 */
/** Duplicating a document names the copy "… (copy)" so it's easy to tell apart. */
const withCopyTitle = (c: CollectionConfig): CollectionConfig => {
  const title = c.admin?.useAsTitle
  if (!title || !c.fields.some((f) => 'name' in f && f.name === 'slug')) return c
  return {
    ...c,
    fields: c.fields.map((f) =>
      'name' in f && f.name === title && (f.type === 'text' || f.type === 'textarea')
        ? { ...f, hooks: { ...f.hooks, beforeDuplicate: [({ value }: { value?: unknown }) => (typeof value === 'string' && value ? `${value} (copy)` : value)] } }
        : f,
    ),
  }
}

const withAudit = (c: CollectionConfig): CollectionConfig => {
  const area = (c.custom as { area?: Area } | undefined)?.area
  const admin = area ? { ...c.admin, hidden: c.admin?.hidden ?? hiddenUnless(area) } : c.admin
  return c.slug === 'audit-log'
    ? { ...c, admin }
    : {
        ...c,
        admin,
        hooks: {
          ...c.hooks,
          beforeChange: [...(c.hooks?.beforeChange ?? []), ...(c.versions ? [publishGuard] : [])],
          afterChange: [...(c.hooks?.afterChange ?? []), auditAfterChange],
          afterDelete: [...(c.hooks?.afterDelete ?? []), auditAfterDelete, ...(c.slug === 'users' ? [] : [revalidateAfterDelete])],
        },
      }
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  secret: process.env.PAYLOAD_SECRET || 'dev-only-change-me-in-.env',
  admin: {
    user: 'users',
    avatar: 'default',
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · Nicco Park CMS', icons: [{ url: '/images/logo.png' }] },
    components: {
      graphics: { Logo: '@/payload/components/Brand#Logo', Icon: '@/payload/components/Brand#Icon' },
      beforeDashboard: ['@/payload/components/Welcome#Welcome'],
      afterNavLinks: ['@/payload/components/Brand#OpsNavLink'],
      views: {
        ops: { Component: '@/payload/views/OpsDashboard#OpsDashboard', path: '/ops', meta: { title: 'Operations' } },
        leads: { Component: '@/payload/views/LeadsInbox#LeadsInbox', path: '/leads', meta: { title: 'Leads' } },
        editor: { Component: '@/payload/views/VisualEditor#VisualEditorView', path: '/editor', meta: { title: 'Visual editor' } },
      },
    },
    livePreview: {
      breakpoints: [
        { label: 'Phone', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1280, height: 860 },
      ],
    },
  },
  // The admin itself in English, Bengali or Hindi: each person picks theirs under Account.
  i18n: {
    supportedLanguages: { en, bn: bnIn, hi } as never,
    fallbackLanguage: 'en',
  },
  // Outgoing email (form notifications, password resets). Configure SMTP in .env;
  // without it, emails are printed to the server log instead of sent.
  email: process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromAddress: process.env.EMAIL_FROM || 'no-reply@niccoparks.com',
        defaultFromName: 'Nicco Park',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_PORT === '465',
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        },
      })
    : undefined,
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'বাংলা (Bengali)', code: 'bn' },
      { label: 'हिन्दी (Hindi)', code: 'hi' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  collections: collections.map(withCopyTitle).map(withAudit).map((c) => ({ ...c, fields: withUploadHints(c.fields, c.slug) })),
  globals: globals.map((g) => ({ ...g, fields: withUploadHints(g.fields, g.slug) })),
  endpoints,
  editor: lexicalEditor(),
  // CMS content only. Orders, scans, campaign events and leads live in the
  // separate operations database (src/ops/db.ts).
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URL || `file:${path.join(dataDir, 'cms.db')}`, authToken: process.env.DATABASE_AUTH_TOKEN },
    migrationDir: path.resolve(dirname, 'migrations'),
    // The schema is always built from migrations (dev and production alike),
    // so one database file works with `pnpm dev`, `pnpm build` and `pnpm start`.
    push: false,
  }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  graphQL: { disable: true },
  // Runs "Schedule publish" (e.g. a sale going live at midnight). Checks every minute.
  // On serverless hosting, call /api/payload-jobs/run from a cron instead.
  jobs: {
    autoRun: [{ cron: '* * * * *', queue: 'default' }],
    shouldAutoRun: () => process.env.STATIC_EXPORT !== '1',
    tasks: [
      {
        // Yesterday's leads by email, every morning at 9:00 India time (03:30 UTC).
        slug: 'leadsDigest',
        schedule: [{ cron: '0 30 3 * * *', queue: 'default' }],
        handler: async ({ req }) => {
          const { sendDigest } = await import('./payload/endpoints')
          await sendDigest(req.payload)
          return { output: {} }
        },
      },
    ],
  },
  async onInit(payload) {
    // Bring the database schema up to date (creates it on the first run).
    await payload.db.migrate({ migrations: migrations as never })
    // First run on a fresh database: load the park's content so the site works immediately.
    if (process.env.AUTO_SEED === '0') return
    const { totalDocs } = await payload.count({ collection: 'pages' })
    if (totalDocs === 0) {
      const { seed } = await import('./payload/seed')
      await seed(payload)
    }
    // New interface strings from developers become editable in Settings → Interface text.
    if (totalDocs > 0) {
      const { syncTranslations } = await import('./payload/seed')
      const added = await syncTranslations(payload)
      if (added) payload.logger.info(`[cms] added ${added} new interface strings`)
    }
    // Demo bookings, scans and A/B traffic for the Operations dashboard (OPS_DEMO_DATA=0 to skip).
    if (process.env.OPS_DEMO_DATA !== '0') {
      const [{ seedOpsDemo }, { getCatalog }] = await Promise.all([import('./ops/demo'), import('./payload/endpoints')])
      seedOpsDemo(await getCatalog(payload), (m) => payload.logger.info(`[ops demo] ${m}`)).catch((e) => payload.logger.error(e))
    }
  },
})
