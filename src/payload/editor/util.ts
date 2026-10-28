import type { EField } from './schema'

export type Data = Record<string, unknown>
export type Lang = 'en' | 'bn' | 'hi'

export const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'bn', label: 'বাং' },
  { code: 'hi', label: 'हिं' },
]

export const newId = () => {
  const b = new Uint8Array(12)
  crypto.getRandomValues(b)
  return Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('')
}

export function getIn(obj: unknown, path: string): unknown {
  if (!path) return obj
  return path.split('.').reduce<unknown>((o, k) => (o && typeof o === 'object' ? (o as Data)[k] : undefined), obj)
}

/** Immutable set: copies only the objects/arrays along the path. */
export function setIn<T>(obj: T, path: string, value: unknown): T {
  const [k, ...rest] = path.split('.')
  const src = (obj ?? (/^\d+$/.test(k) ? [] : {})) as Data | unknown[]
  const copy = (Array.isArray(src) ? [...src] : { ...src }) as Data
  copy[k] = rest.length ? setIn(copy[k], rest.join('.'), value) : value
  return copy as T
}

/** Default values for a new block or array row, from the field config. */
export function defaults(fields: EField[]): Data {
  const out: Data = {}
  for (const f of fields) {
    if (f.type === 'tabs') {
      for (const tb of f.tabs ?? []) {
        if (tb.name) out[tb.name] = defaults(tb.fields)
        else Object.assign(out, defaults(tb.fields))
      }
      continue
    }
    if (!f.name) {
      if (f.fields) Object.assign(out, defaults(f.fields))
      continue
    }
    if (f.type === 'group') out[f.name] = defaults(f.fields ?? [])
    else if (f.type === 'array') out[f.name] = Array.from({ length: f.minRows ?? 0 }, () => ({ id: newId(), ...defaults(f.fields ?? []) }))
    else if (f.type === 'blocks') out[f.name] = []
    else if (f.defaultValue !== undefined) out[f.name] = structuredClone(f.defaultValue)
  }
  return out
}

/** Give every block and array row a fresh id (for duplicating). */
export function reId<T>(v: T): T {
  if (Array.isArray(v)) return v.map(reId) as T
  if (v && typeof v === 'object') {
    const o: Data = {}
    for (const [k, x] of Object.entries(v)) o[k] = k === 'id' ? newId() : reId(x)
    return o as T
  }
  return v
}

/** showIf: { style: 'video' } or { source: ['youtube', 'vimeo'] } against sibling data. */
export function visible(f: EField, siblings: Data) {
  if (!f.showIf) return true
  return Object.entries(f.showIf).every(([k, want]) => (Array.isArray(want) ? want.includes(siblings[k]) : siblings[k] === want))
}

/** A short, human label for a section in the list: its own heading if it has one. */
export function sectionTitle(b: Data): string {
  const pick = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : '')
  const slides = b.slides as Data[] | undefined
  return (
    pick(b.heading) ||
    pick(b.title) ||
    pick(b.text) ||
    pick(slides?.[0]?.title) ||
    pick((b.primary as Data | undefined)?.label) ||
    pick(b.blockName) ||
    ''
  )
}

export async function api<T = Data>(url: string, init?: RequestInit & { json?: unknown }): Promise<T> {
  const r = await fetch(url, {
    credentials: 'include',
    ...init,
    headers: { ...(init?.json !== undefined ? { 'Content-Type': 'application/json' } : {}), ...init?.headers },
    body: init?.json !== undefined ? JSON.stringify(init.json) : init?.body,
  })
  const text = await r.text()
  let data: unknown = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = { message: text.slice(0, 200) }
  }
  if (!r.ok) {
    const d = data as { errors?: { message?: string; data?: { errors?: { path?: string; message?: string }[] } }[]; message?: string } | null
    const first = d?.errors?.[0]
    const fieldErrors = first?.data?.errors?.map((e) => `${e.path}: ${e.message}`).join(' · ')
    const err = new Error(fieldErrors || first?.message || d?.message || `Request failed (${r.status})`) as Error & { status: number; paths: string[] }
    err.status = r.status
    err.paths = first?.data?.errors?.map((e) => e.path ?? '').filter(Boolean) ?? []
    throw err
  }
  return data as T
}

/** Values the editor sends back: drop what the server computes. */
export function forSave(doc: Data): Data {
  const { id: _id, createdAt: _c, updatedAt: _u, _status: _s, globalType: _g, ...rest } = doc as Data & { id?: unknown }
  void _id
  void _c
  void _u
  void _s
  void _g
  return rest
}
