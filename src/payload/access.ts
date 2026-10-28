import type { Access, FieldAccess, PayloadRequest, TypedUser } from 'payload'

/**
 * Who can do what in the CMS — areas × levels, like Shopify staff permissions.
 *
 * Every staff account has a role. The four built-in roles are presets; an
 * Admin can also make custom roles (Settings → Roles) with a level per area.
 *
 *   none     the area is hidden from them
 *   view     can look, can't change
 *   edit     can create and change, saves drafts only
 *   publish  can also put changes live
 *   full     can also delete
 */
export const AREAS = [
  { value: 'pages', label: 'Pages & home page' },
  { value: 'campaigns', label: 'Offers & events (ad landing pages, A/B tests)' },
  { value: 'journal', label: 'Joyride Journal' },
  { value: 'park', label: 'Worlds, rides, FAQs, venues, day plans' },
  { value: 'moments', label: '#NiccoMoments (visitor photos)' },
  { value: 'products', label: 'Ticket prices & add-ons' },
  { value: 'media', label: 'Media library' },
  { value: 'design', label: 'Theme, header, footer, saved sections' },
  { value: 'settings', label: 'Park info, hours & ride alerts, visit info' },
  { value: 'text', label: 'Interface text (button & label translations)' },
  { value: 'marketing', label: 'Tracking, SEO, redirects' },
  { value: 'leads', label: 'Leads & enquiries' },
  { value: 'ops', label: 'Operations dashboard (sales, scans, A/B results)' },
  { value: 'integrations', label: 'Integrations, API keys, webhooks, email, chat' },
  { value: 'users', label: 'Staff accounts & roles' },
] as const
export type Area = (typeof AREAS)[number]['value']

export const LEVELS = [
  { value: 'none', label: 'No access' },
  { value: 'view', label: 'View' },
  { value: 'edit', label: 'Edit (drafts)' },
  { value: 'publish', label: 'Edit & publish' },
  { value: 'full', label: 'Full (incl. delete)' },
] as const
export type Level = (typeof LEVELS)[number]['value']
const RANK: Record<Level, number> = { none: 0, view: 1, edit: 2, publish: 3, full: 4 }

export type Role = 'admin' | 'marketing' | 'editor' | 'ops' | 'custom'
export const ROLES: { label: string; value: Role }[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Editor', value: 'editor' },
  { label: 'Operations', value: 'ops' },
  { label: 'Custom role…', value: 'custom' },
]

const all = (l: Level) => Object.fromEntries(AREAS.map((a) => [a.value, l])) as Record<Area, Level>

/** The built-in roles. Shown read-only on Settings → Roles for reference. */
export const PRESETS: Record<Exclude<Role, 'custom'>, Record<Area, Level>> = {
  admin: all('full'),
  marketing: {
    ...all('full'),
    park: 'publish',
    products: 'publish',
    design: 'publish',
    settings: 'publish',
    text: 'publish',
    ops: 'view',
    integrations: 'none',
    users: 'none',
  },
  editor: {
    ...all('edit'),
    products: 'view',
    design: 'view',
    settings: 'view',
    marketing: 'none',
    leads: 'none',
    ops: 'none',
    integrations: 'none',
    users: 'none',
  },
  ops: {
    ...all('view'),
    moments: 'publish',
    settings: 'publish',
    leads: 'full',
    design: 'none',
    marketing: 'none',
    integrations: 'none',
    users: 'none',
  },
}

type StaffUser = TypedUser & { role?: Role; customRole?: { permissions?: Partial<Record<Area, Level>> } | number | string | null; collection?: string }

/** The level a user has in an area. */
export function levelOf(user: unknown, area: Area): number {
  const u = user as StaffUser | null
  if (!u || (u.collection && u.collection !== 'users')) return 0
  const role = (u.role ?? 'editor') as Role
  if (role === 'custom') {
    const perms = typeof u.customRole === 'object' && u.customRole ? u.customRole.permissions : undefined
    return RANK[(perms?.[area] as Level) ?? 'none']
  }
  return RANK[PRESETS[role as Exclude<Role, 'custom'>]?.[area] ?? 'none']
}

export const can = (user: unknown, area: Area, at: Level) => levelOf(user, area) >= RANK[at]

/** Access function: signed-in staff with at least `at` in `area`. */
export const allow =
  (area: Area, at: Level): Access =>
  ({ req }) =>
    can(req.user, area, at)

/** Hide a collection or global from staff without at least view rights. */
export const hiddenUnless =
  (area: Area) =>
  ({ user }: { user: unknown }) =>
    !can(user, area, 'view')

export const isAdmin: Access = ({ req }) => (req.user as StaffUser | null)?.role === 'admin'
export const isAdminField: FieldAccess = ({ req }) => (req.user as StaffUser | null)?.role === 'admin'
export const loggedIn: Access = ({ req }) => !!req.user

/** Public can read published documents; staff who may view the area also see drafts. */
export const publishedOr =
  (area: Area): Access =>
  ({ req }) =>
    can(req.user, area, 'view') ? true : { _status: { equals: 'published' } }

/** Anyone can read (media, prices, settings — public by nature). */
export const anyone: Access = () => true

/** Moments: public sees approved only. */
export const approvedOrStaff: Access = ({ req }) => (can(req.user, 'moments', 'view') ? true : { status: { equals: 'approved' } })

/** For hooks and endpoints that only have the request. */
export const reqCan = (req: PayloadRequest, area: Area, at: Level) => can(req.user, area, at)
