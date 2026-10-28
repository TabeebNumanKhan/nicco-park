/**
 * Turns the CMS field config into plain data the visual editor (a client
 * component) can draw forms from. Functions (hooks, validation, conditions)
 * can't cross to the browser, so conditions the editor must honour are
 * declared as `custom.showIf` on the field.
 */
import type { Block, Field } from 'payload'
import { articleBlocks, pageBlocks, SECTION_INFO } from '../blocks'

export type EField = {
  type: string
  name?: string
  label?: string
  description?: string
  localized?: boolean
  required?: boolean
  hasMany?: boolean
  options?: { label: string; value: string }[]
  relationTo?: string
  defaultValue?: unknown
  minRows?: number
  maxRows?: number
  width?: string
  color?: boolean
  dayAndTime?: boolean
  showIf?: Record<string, unknown>
  fields?: EField[]
  tabs?: { label: string; name?: string; fields: EField[] }[]
  blocks?: EBlock[]
}

export type EBlock = { slug: string; label: string; category: string; description: string; icon: string; fields: EField[] }

const human = (s: string) => s.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (c) => c.toUpperCase())

function text(v: unknown): string | undefined {
  if (typeof v === 'string') return v
  if (v && typeof v === 'object' && 'en' in v) return String((v as { en: unknown }).en)
  return undefined
}

export function serialiseFields(fields: Field[]): EField[] {
  const out: EField[] = []
  for (const f of fields) {
    const a = (f as { admin?: Record<string, unknown> }).admin ?? {}
    if (a.hidden || (f as { hidden?: boolean }).hidden) continue
    if (f.type === 'ui' || f.type === 'join' || f.type === 'point') continue
    const name = 'name' in f ? f.name : undefined
    if (name === 'id' || name === 'blockName' || name === 'createdAt' || name === 'updatedAt' || name === 'folder' || name?.startsWith('_')) continue
    const custom = (f as { custom?: Record<string, unknown> }).custom
    const e: EField = { type: f.type }
    if (name) e.name = name
    const label = 'label' in f ? text(f.label) : undefined
    if (label !== undefined || name) e.label = label ?? human(name ?? '')
    const d = text(a.description)
    if (d) e.description = d
    if ('localized' in f && f.localized) e.localized = true
    if ('required' in f && f.required) e.required = true
    if ('hasMany' in f && f.hasMany) e.hasMany = true
    if (typeof a.width === 'string') e.width = a.width
    if (custom?.showIf) e.showIf = custom.showIf as Record<string, unknown>
    if ('defaultValue' in f && typeof f.defaultValue !== 'function' && f.defaultValue !== undefined) e.defaultValue = f.defaultValue
    if ('options' in f && Array.isArray(f.options)) e.options = f.options.map((o) => (typeof o === 'string' ? { label: o, value: o } : { label: text(o.label) ?? o.value, value: o.value }))
    if ('relationTo' in f) {
      if (Array.isArray(f.relationTo)) continue // polymorphic: not used by sections
      e.relationTo = f.relationTo
    }
    if ('minRows' in f && typeof f.minRows === 'number') e.minRows = f.minRows
    if ('maxRows' in f && typeof f.maxRows === 'number') e.maxRows = f.maxRows
    const comps = a.components as { Field?: unknown } | undefined
    if (typeof comps?.Field === 'string' && comps.Field.includes('ColorField')) e.color = true
    if ((a.date as { pickerAppearance?: string } | undefined)?.pickerAppearance === 'dayAndTime') e.dayAndTime = true
    if (f.type === 'tabs') e.tabs = f.tabs.map((tb) => ({ label: text(tb.label) ?? ('name' in tb ? human(tb.name as string) : ''), name: 'name' in tb ? (tb.name as string) : undefined, fields: serialiseFields(tb.fields) }))
    else if (f.type === 'blocks') e.blocks = serialiseBlocks(f.blocks)
    else if ('fields' in f && Array.isArray(f.fields)) e.fields = serialiseFields(f.fields)
    if (f.type === 'collapsible' && !e.label) e.label = text((f as { label?: unknown }).label) ?? 'More'
    out.push(e)
  }
  return out
}

export function serialiseBlocks(blocks: Block[]): EBlock[] {
  return blocks.map((b) => {
    const own = b.custom as { category?: string; description?: string; icon?: string } | undefined
    const info = own?.category ? { category: own.category, description: own.description ?? '', icon: own.icon ?? 'text' } : (SECTION_INFO[b.slug] ?? { category: 'Blocks', description: '', icon: b.slug })
    return { slug: b.slug, label: text(b.labels?.singular) ?? human(b.slug), ...info, fields: serialiseFields(b.fields) }
  })
}

/** Which documents the editor opens, where their sections live and where they show on the site. */
export type DocKind = {
  kind: 'collection' | 'global'
  slug: string
  label: string
  area: string
  /** Dotted path of the sections (blocks) field, if any. */
  sections?: string
  blockSet?: 'page' | 'article'
  titleField: string
  /** Site path pattern: {slug} or {id} are filled in. */
  path: string
  /** Settings form: every field except the sections. */
  fields: EField[]
}

/** Every field except the one at `path`, leaving the rest of the tree intact. */
function without(fields: EField[], path?: string): EField[] {
  if (!path) return fields
  const [head, ...rest] = path.split('.')
  const out: EField[] = []
  for (const f of fields) {
    if (f.type === 'tabs' && f.tabs) {
      out.push({ ...f, tabs: f.tabs.map((tb) => ({ ...tb, fields: tb.name === head ? without(tb.fields, rest.join('.')) : tb.name ? tb.fields : without(tb.fields, path) })).filter((tb) => tb.fields.length) })
      continue
    }
    if (!f.name && f.fields) {
      out.push({ ...f, fields: without(f.fields, path) })
      continue
    }
    if (f.name === head) {
      if (!rest.length) continue
      out.push({ ...f, fields: without(f.fields ?? [], rest.join('.')) })
      continue
    }
    out.push(f)
  }
  return out
}

export function editorSchema(config: { collections: { slug: string; fields: Field[] }[]; globals: { slug: string; fields: Field[] }[] }) {
  const coll = (slug: string) => serialiseFields(config.collections.find((c) => c.slug === slug)?.fields ?? [])
  const glob = (slug: string) => serialiseFields(config.globals.find((g) => g.slug === slug)?.fields ?? [])
  const kinds: DocKind[] = [
    { kind: 'collection', slug: 'pages', label: 'Pages', area: 'pages', sections: 'layout', blockSet: 'page', titleField: 'title', path: '/{slug}', fields: without(coll('pages'), 'layout') },
    { kind: 'collection', slug: 'offers', label: 'Offers', area: 'campaigns', sections: 'landing.layout', blockSet: 'page', titleField: 'name', path: '/offers/{slug}', fields: without(coll('offers'), 'landing.layout') },
    { kind: 'collection', slug: 'events', label: "Events (What's on)", area: 'campaigns', sections: 'landing.layout', blockSet: 'page', titleField: 'name', path: '/whats-on/{slug}', fields: without(coll('events'), 'landing.layout') },
    { kind: 'collection', slug: 'worlds', label: 'Worlds', area: 'park', sections: 'layout', blockSet: 'page', titleField: 'name', path: '/worlds/{slug}', fields: without(coll('worlds'), 'layout') },
    { kind: 'collection', slug: 'posts', label: 'Journal posts', area: 'journal', sections: 'body', blockSet: 'article', titleField: 'title', path: '/journal/{slug}', fields: without(coll('posts'), 'body') },
    { kind: 'collection', slug: 'sections', label: 'Saved sections', area: 'design', sections: 'layout', blockSet: 'page', titleField: 'name', path: '/section-preview/{id}', fields: without(coll('sections'), 'layout') },
    { kind: 'global', slug: 'header', label: 'Header & announcement bar', area: 'design', titleField: '', path: '', fields: glob('header') },
    { kind: 'global', slug: 'footer', label: 'Footer', area: 'design', titleField: '', path: '', fields: glob('footer') },
    { kind: 'global', slug: 'theme', label: 'Theme: logo, colours, fonts', area: 'design', titleField: '', path: '', fields: glob('theme') },
  ]
  const titles: Record<string, string> = {}
  for (const c of config.collections) titles[c.slug] = ((c as { admin?: { useAsTitle?: string } }).admin?.useAsTitle as string) ?? 'id'
  return {
    kinds,
    blocks: { page: serialiseBlocks(pageBlocks), article: serialiseBlocks(articleBlocks) },
    titles,
  }
}

export type EditorSchema = ReturnType<typeof editorSchema>
