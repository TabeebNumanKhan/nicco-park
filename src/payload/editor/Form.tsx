'use client'

import { ChevronDown, ChevronUp, Copy, Globe, ImagePlus, Plus, Trash2, X } from 'lucide-react'
import { createContext, useContext, useEffect, useState } from 'react'
import type { EField } from './schema'
import { type Data, defaults, type Lang, newId, reId, visible } from './util'

export type MediaDoc = { id: number | string; url?: string; alt?: string; filename?: string; mimeType?: string; sizes?: { thumbnail?: { url?: string } } }

export type FormCtx = {
  lang: Lang
  media: Record<string, MediaDoc>
  pickMedia: (accept?: 'image' | 'video' | 'any') => Promise<MediaDoc | null>
  relOptions: (relationTo: string) => Promise<{ value: string | number; label: string }[]>
  fullEditorUrl: string
  readOnly: boolean
}

export const Ctx = createContext<FormCtx | null>(null)
const useCtx = () => useContext(Ctx)!

const thumb = (m?: MediaDoc) => m?.sizes?.thumbnail?.url || m?.url

/** One level of fields against one object. */
export function Fields({ fields, value, en, onChange, errors = [], prefix = '' }: { fields: EField[]; value: Data; en?: Data; onChange: (v: Data) => void; errors?: string[]; prefix?: string }) {
  const set = (name: string, v: unknown) => onChange({ ...value, [name]: v })
  return (
    <>
      {fields.map((f, i) => {
        if (!visible(f, value)) return null
        const key = f.name ?? `${f.type}-${i}`
        const path = f.name ? (prefix ? `${prefix}.${f.name}` : f.name) : prefix
        if (f.type === 'row')
          return (
            <div key={key} className="npe-row">
              <Fields fields={f.fields ?? []} value={value} en={en} onChange={onChange} errors={errors} prefix={prefix} />
            </div>
          )
        if (f.type === 'collapsible')
          return (
            <details key={key} className="npe-group">
              <summary>{f.label}</summary>
              <div className="npe-group-body">
                <Fields fields={f.fields ?? []} value={value} en={en} onChange={onChange} errors={errors} prefix={prefix} />
              </div>
            </details>
          )
        if (f.type === 'tabs')
          return (
            <div key={key}>
              {(f.tabs ?? []).map((tb, ti) =>
                tb.name ? (
                  <details key={ti} className="npe-group" open={ti === 0}>
                    <summary>{tb.label}</summary>
                    <div className="npe-group-body">
                      <Fields fields={tb.fields} value={(value[tb.name] as Data) ?? {}} en={en?.[tb.name] as Data} onChange={(v) => set(tb.name!, v)} errors={errors} prefix={prefix ? `${prefix}.${tb.name}` : tb.name} />
                    </div>
                  </details>
                ) : (
                  <details key={ti} className="npe-group" open={ti === 0}>
                    <summary>{tb.label}</summary>
                    <div className="npe-group-body">
                      <Fields fields={tb.fields} value={value} en={en} onChange={onChange} errors={errors} prefix={prefix} />
                    </div>
                  </details>
                ),
              )}
            </div>
          )
        if (!f.name) return null
        return <FieldView key={key} f={f} value={value[f.name]} en={en?.[f.name]} onChange={(v) => set(f.name!, v)} error={errors.includes(path)} errors={errors} path={path} />
      })}
    </>
  )
}

function Label({ f, error }: { f: EField; error?: boolean }) {
  const { lang } = useCtx()
  return (
    <span className="npe-label">
      {f.label}
      {f.required && <span aria-hidden="true"> *</span>}
      {f.localized ? (
        <span className="npe-badge" title="Different in each language. You are editing this language.">
          <Globe size={11} aria-hidden="true" /> {lang.toUpperCase()}
        </span>
      ) : lang !== 'en' && ['text', 'textarea'].includes(f.type) ? (
        <span className="npe-badge npe-badge-muted" title="Same in every language">all</span>
      ) : null}
      {error && <span className="npe-err"> needs a value</span>}
    </span>
  )
}

function FieldView({ f, value, en, onChange, error, errors, path }: { f: EField; value: unknown; en: unknown; onChange: (v: unknown) => void; error: boolean; errors: string[]; path: string }) {
  const ctx = useCtx()
  const ph = ctx.lang !== 'en' && f.localized && typeof en === 'string' ? en : ''
  const desc = f.description ? <span className="npe-desc">{f.description}</span> : null
  const style = f.width ? { flex: `1 1 calc(${f.width} - 8px)`, minWidth: 120 } : undefined
  const ro = ctx.readOnly

  switch (f.type) {
    case 'text':
    case 'email':
    case 'number':
      if (f.hasMany && f.type === 'text') {
        const list = (value as string[] | null) ?? []
        return (
          <label className="npe-field" style={style}>
            <Label f={f} error={error} />
            <input className="npe-input" disabled={ro} value={list.join(', ')} onChange={(e) => onChange(e.target.value.split(',').map((x) => x.trim()).filter(Boolean))} placeholder="Comma, separated" />
            {desc}
          </label>
        )
      }
      if (f.color) {
        const v = (value as string) || ''
        return (
          <label className="npe-field" style={style}>
            <Label f={f} error={error} />
            <span className="npe-color">
              <input type="color" disabled={ro} value={/^#[0-9a-f]{6}$/i.test(v) ? v : String(f.defaultValue ?? '#FFFFFF')} onChange={(e) => onChange(e.target.value.toUpperCase())} aria-label={`${f.label} picker`} />
              <input className="npe-input" disabled={ro} value={v} placeholder={String(f.defaultValue ?? 'None')} onChange={(e) => onChange(e.target.value)} />
              {v && !f.defaultValue && (
                <button type="button" className="npe-icon" disabled={ro} aria-label="Clear colour" onClick={() => onChange(null)}>
                  <X size={14} />
                </button>
              )}
            </span>
            {desc}
          </label>
        )
      }
      return (
        <label className="npe-field" style={style}>
          <Label f={f} error={error} />
          <input
            className="npe-input"
            disabled={ro}
            type={f.type === 'number' ? 'number' : f.type === 'email' ? 'email' : 'text'}
            value={value === null || value === undefined ? '' : String(value)}
            placeholder={ph}
            onChange={(e) => onChange(f.type === 'number' ? (e.target.value === '' ? null : Number(e.target.value)) : e.target.value)}
          />
          {f.name === 'title' && f.description?.includes('60') ? <Count v={value} max={60} /> : null}
          {desc}
        </label>
      )
    case 'textarea':
    case 'code':
    case 'json':
      return (
        <label className="npe-field" style={style}>
          <Label f={f} error={error} />
          <textarea
            className="npe-input npe-textarea"
            disabled={ro}
            rows={f.type === 'textarea' ? 3 : 6}
            value={f.type === 'json' ? JSON.stringify(value ?? null, null, 2) : ((value as string) ?? '')}
            placeholder={ph}
            onChange={(e) => {
              if (f.type !== 'json') return onChange(e.target.value)
              try {
                onChange(JSON.parse(e.target.value))
              } catch {}
            }}
          />
          {f.description?.includes('160') && <Count v={value} max={160} />}
          {desc}
        </label>
      )
    case 'checkbox':
      return (
        <label className="npe-check" style={style}>
          <input type="checkbox" disabled={ro} checked={!!value} onChange={(e) => onChange(e.target.checked)} />
          <span>
            {f.label}
            {desc}
          </span>
        </label>
      )
    case 'select':
    case 'radio': {
      const opts = f.options ?? []
      if (f.hasMany) {
        const list = (value as string[] | null) ?? []
        return (
          <fieldset className="npe-field" style={style}>
            <legend className="npe-label">{f.label}</legend>
            <div className="npe-chips">
              {opts.map((o) => (
                <label key={o.value} className={'npe-chip' + (list.includes(o.value) ? ' is-on' : '')}>
                  <input type="checkbox" disabled={ro} checked={list.includes(o.value)} onChange={(e) => onChange(e.target.checked ? [...list, o.value] : list.filter((x) => x !== o.value))} />
                  {o.label}
                </label>
              ))}
            </div>
            {desc}
          </fieldset>
        )
      }
      if (opts.length <= 4 && f.type === 'select' && opts.every((o) => o.label.length < 26))
        return (
          <fieldset className="npe-field" style={style}>
            <legend className="npe-label">{f.label}</legend>
            <div className="npe-seg">
              {opts.map((o) => (
                <button type="button" disabled={ro} key={o.value} className={(value ?? f.defaultValue) === o.value ? 'is-on' : ''} aria-pressed={(value ?? f.defaultValue) === o.value} onClick={() => onChange(o.value)}>
                  {o.label}
                </button>
              ))}
            </div>
            {desc}
          </fieldset>
        )
      return (
        <label className="npe-field" style={style}>
          <Label f={f} error={error} />
          <select className="npe-input" disabled={ro} value={(value as string) ?? (f.defaultValue as string) ?? ''} onChange={(e) => onChange(e.target.value || null)}>
            {!f.required && <option value="">—</option>}
            {opts.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {desc}
        </label>
      )
    }
    case 'date': {
      const v = typeof value === 'string' && value ? new Date(value) : null
      const local = v ? new Date(v.getTime() - v.getTimezoneOffset() * 60000).toISOString().slice(0, f.dayAndTime ? 16 : 10) : ''
      return (
        <label className="npe-field" style={style}>
          <Label f={f} error={error} />
          <input
            className="npe-input"
            disabled={ro}
            type={f.dayAndTime ? 'datetime-local' : 'date'}
            value={local}
            onChange={(e) => onChange(e.target.value ? new Date(f.dayAndTime ? e.target.value : e.target.value + 'T00:00').toISOString() : null)}
          />
          {desc}
        </label>
      )
    }
    case 'upload':
      return <UploadField f={f} value={value} onChange={onChange} desc={desc} error={error} style={style} />
    case 'relationship':
      return <RelField f={f} value={value} onChange={onChange} desc={desc} error={error} style={style} />
    case 'group':
      if (f.name === 'display' || f.name === 'design')
        return (
          <details className="npe-group" open={f.name === 'display' ? !!(value as Data | undefined)?.hidden : false}>
            <summary>{f.label}</summary>
            <div className="npe-group-body">
              {desc}
              <Fields fields={f.fields ?? []} value={(value as Data) ?? {}} en={en as Data} onChange={onChange} errors={errors} prefix={path} />
            </div>
          </details>
        )
      return (
        <fieldset className="npe-fieldset" style={style}>
          <legend className="npe-label">{f.label}</legend>
          {desc}
          <Fields fields={f.fields ?? []} value={(value as Data) ?? {}} en={en as Data} onChange={onChange} errors={errors} prefix={path} />
        </fieldset>
      )
    case 'blocks':
      return <BlocksField f={f} value={value} en={en} onChange={onChange} errors={errors} path={path} desc={desc} />
    case 'array':
      return <ArrayField f={f} value={value} en={en} onChange={onChange} errors={errors} path={path} desc={desc} />
    case 'richText':
      return (
        <div className="npe-field">
          <span className="npe-label">{f.label}</span>
          <a className="npe-link" href={ctx.fullEditorUrl} target="_blank" rel="noreferrer">
            Edit this text in the full editor ↗
          </a>
        </div>
      )
    default:
      return null
  }
}

function Count({ v, max }: { v: unknown; max: number }) {
  const n = typeof v === 'string' ? v.length : 0
  return <span className={'npe-count' + (n > max ? ' is-over' : '')}>{n} / {max}</span>
}

function UploadField({ f, value, onChange, desc, error, style }: { f: EField; value: unknown; onChange: (v: unknown) => void; desc: React.ReactNode; error: boolean; style?: React.CSSProperties }) {
  const ctx = useCtx()
  if (f.hasMany) return <UploadMany f={f} value={value} onChange={onChange} desc={desc} error={error} />
  const id = value && typeof value === 'object' ? (value as MediaDoc).id : (value as string | number | null)
  const m = id != null ? ctx.media[String(id)] : undefined
  const isVideo = m?.mimeType?.startsWith('video/')
  const accept = /video|file/i.test(f.name ?? '') && !/poster|cover/i.test(f.label ?? '') ? 'video' : f.name === 'video' ? 'video' : 'image'
  return (
    <div className="npe-field" style={style}>
      <Label f={f} error={error} />
      <div className="npe-upload">
        {id != null ? (
          <>
            <span className="npe-thumb">
              {isVideo ? <span className="npe-thumb-video">VIDEO</span> : thumb(m) ? <img src={thumb(m)} alt="" /> : null}
            </span>
            <span className="npe-upload-name">{m?.alt || m?.filename || `#${id}`}</span>
            <button type="button" className="npe-btn npe-btn-sm" disabled={ctx.readOnly} onClick={async () => { const p = await ctx.pickMedia(accept); if (p) onChange(p.id) }}>
              Change
            </button>
            <button type="button" className="npe-icon" disabled={ctx.readOnly} aria-label="Remove" onClick={() => onChange(null)}>
              <X size={15} />
            </button>
          </>
        ) : (
          <button type="button" className="npe-btn npe-btn-sm" disabled={ctx.readOnly} onClick={async () => { const p = await ctx.pickMedia(accept); if (p) onChange(p.id) }}>
            <ImagePlus size={15} aria-hidden="true" /> Choose from Media
          </button>
        )}
      </div>
      {desc}
    </div>
  )
}

function UploadMany({ f, value, onChange, desc, error }: { f: EField; value: unknown; onChange: (v: unknown) => void; desc: React.ReactNode; error: boolean }) {
  const ctx = useCtx()
  const ids = ((value as unknown[]) ?? []).map((v) => (v && typeof v === 'object' ? (v as MediaDoc).id : (v as string | number)))
  const move = (i: number, d: number) => {
    const j = i + d
    if (j < 0 || j >= ids.length) return
    const next = [...ids]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  return (
    <div className="npe-field">
      <Label f={f} error={error} />
      <div className="npe-media-grid npe-media-grid-sm">
        {ids.map((id, i) => {
          const m = ctx.media[String(id)]
          return (
            <div key={`${id}-${i}`} className="npe-media">
              {thumb(m) ? <img src={thumb(m)} alt="" /> : <span className="npe-thumb-video">#{id}</span>}
              <span className="npe-media-actions">
                <button type="button" className="npe-icon" disabled={ctx.readOnly || i === 0} aria-label="Move earlier" onClick={() => move(i, -1)}>
                  <ChevronUp size={13} style={{ transform: 'rotate(-90deg)' }} />
                </button>
                <button type="button" className="npe-icon" disabled={ctx.readOnly || i === ids.length - 1} aria-label="Move later" onClick={() => move(i, 1)}>
                  <ChevronDown size={13} style={{ transform: 'rotate(-90deg)' }} />
                </button>
                <button type="button" className="npe-icon" disabled={ctx.readOnly} aria-label="Remove" onClick={() => onChange(ids.filter((_, k) => k !== i))}>
                  <X size={13} />
                </button>
              </span>
            </div>
          )
        })}
      </div>
      <button type="button" className="npe-btn npe-btn-sm npe-btn-ghost" disabled={ctx.readOnly} onClick={async () => { const p = await ctx.pickMedia('image'); if (p) onChange([...ids, p.id]) }}>
        <ImagePlus size={15} aria-hidden="true" /> Add photo
      </button>
      {desc}
    </div>
  )
}

function RelField({ f, value, onChange, desc, error, style }: { f: EField; value: unknown; onChange: (v: unknown) => void; desc: React.ReactNode; error: boolean; style?: React.CSSProperties }) {
  const ctx = useCtx()
  const [opts, setOpts] = useState<{ value: string | number; label: string }[] | null>(null)
  useEffect(() => {
    let live = true
    ctx.relOptions(f.relationTo!).then((o) => live && setOpts(o))
    return () => {
      live = false
    }
  }, [ctx, f.relationTo])
  const idOf = (v: unknown) => (v && typeof v === 'object' ? (v as { id: string | number }).id : v) as string | number
  if (f.hasMany) {
    const list = ((value as unknown[]) ?? []).map(idOf)
    return (
      <fieldset className="npe-field" style={style}>
        <legend className="npe-label">
          {f.label} {list.length ? `(${list.length})` : ''}
        </legend>
        <div className="npe-chips npe-chips-scroll">
          {(opts ?? []).map((o) => {
            const on = list.some((x) => String(x) === String(o.value))
            return (
              <label key={o.value} className={'npe-chip' + (on ? ' is-on' : '')}>
                <input type="checkbox" disabled={ctx.readOnly} checked={on} onChange={(e) => onChange(e.target.checked ? [...list, o.value] : list.filter((x) => String(x) !== String(o.value)))} />
                {o.label}
              </label>
            )
          })}
          {!opts && <span className="npe-desc">Loading…</span>}
        </div>
        {desc ?? <span className="npe-desc">None ticked = show them all.</span>}
      </fieldset>
    )
  }
  const cur = value == null ? '' : String(idOf(value))
  return (
    <label className="npe-field" style={style}>
      <Label f={f} error={error} />
      <select className="npe-input" disabled={ctx.readOnly} value={cur} onChange={(e) => onChange(e.target.value === '' ? null : (opts?.find((o) => String(o.value) === e.target.value)?.value ?? e.target.value))}>
        <option value="">— Choose —</option>
        {(opts ?? []).map((o) => (
          <option key={o.value} value={String(o.value)}>
            {o.label}
          </option>
        ))}
      </select>
      {desc}
    </label>
  )
}

function ArrayField({ f, value, en, onChange, errors, path, desc }: { f: EField; value: unknown; en: unknown; onChange: (v: unknown) => void; errors: string[]; path: string; desc: React.ReactNode }) {
  const ctx = useCtx()
  const rows = (value as Data[] | null) ?? []
  const enRows = (en as Data[] | null) ?? []
  const [open, setOpen] = useState<number | null>(rows.length === 1 ? 0 : null)
  const titleOf = (r: Data, i: number) => {
    for (const k of ['title', 'tab', 'label', 'name', 'q', 'quote', 'text', 'headline', 'key']) if (typeof r[k] === 'string' && r[k]) return String(r[k]).slice(0, 48)
    return `${f.label} ${i + 1}`
  }
  const move = (i: number, d: number) => {
    const j = i + d
    if (j < 0 || j >= rows.length) return
    const next = [...rows]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
    setOpen(j)
  }
  return (
    <div className="npe-field">
      <span className="npe-label">
        {f.label} <span className="npe-desc-inline">({rows.length})</span>
      </span>
      {desc}
      <ol className="npe-array">
        {rows.map((r, i) => (
          <li key={(r.id as string) ?? i} className={errors.some((e) => e.startsWith(`${path}.${i}.`)) ? 'has-error' : ''}>
            <div className="npe-array-head">
              <button type="button" className="npe-array-title" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                {titleOf(r, i)}
              </button>
              <button type="button" className="npe-icon" disabled={ctx.readOnly || i === 0} aria-label="Move up" onClick={() => move(i, -1)}>
                <ChevronUp size={15} />
              </button>
              <button type="button" className="npe-icon" disabled={ctx.readOnly || i === rows.length - 1} aria-label="Move down" onClick={() => move(i, 1)}>
                <ChevronDown size={15} />
              </button>
              <button type="button" className="npe-icon" disabled={ctx.readOnly || (f.maxRows != null && rows.length >= f.maxRows)} aria-label="Duplicate" onClick={() => onChange([...rows.slice(0, i + 1), reId(structuredClone(r)), ...rows.slice(i + 1)])}>
                <Copy size={14} />
              </button>
              <button type="button" className="npe-icon" disabled={ctx.readOnly || (f.minRows != null && rows.length <= f.minRows)} aria-label="Remove" onClick={() => onChange(rows.filter((_, k) => k !== i))}>
                <Trash2 size={14} />
              </button>
            </div>
            {open === i && (
              <div className="npe-array-body">
                <Fields fields={f.fields ?? []} value={r} en={enRows.find((x) => x.id === r.id) ?? enRows[i]} onChange={(v) => onChange(rows.map((x, k) => (k === i ? v : x)))} errors={errors} prefix={`${path}.${i}`} />
              </div>
            )}
          </li>
        ))}
      </ol>
      {(f.maxRows == null || rows.length < f.maxRows) && (
        <button
          type="button"
          className="npe-btn npe-btn-sm npe-btn-ghost"
          disabled={ctx.readOnly}
          onClick={() => {
            onChange([...rows, { id: newId(), ...defaults(f.fields ?? []) }])
            setOpen(rows.length)
          }}
        >
          <Plus size={14} aria-hidden="true" /> Add {f.label?.replace(/s$/, '').toLowerCase()}
        </button>
      )}
    </div>
  )
}

/** Sub-blocks inside a section (Custom section): add, order and edit different kinds of block. */
function BlocksField({ f, value, en, onChange, errors, path, desc }: { f: EField; value: unknown; en: unknown; onChange: (v: unknown) => void; errors: string[]; path: string; desc: React.ReactNode }) {
  const ctx = useCtx()
  const rows = (value as Data[] | null) ?? []
  const enRows = (en as Data[] | null) ?? []
  const [open, setOpen] = useState<number | null>(null)
  const [adding, setAdding] = useState(false)
  const kinds = f.blocks ?? []
  const def = (slug: unknown) => kinds.find((b) => b.slug === slug)
  const titleOf = (r: Data) => {
    for (const k of ['text', 'title', 'label', 'quote', 'caption']) if (typeof r[k] === 'string' && r[k]) return String(r[k]).slice(0, 40)
    return ''
  }
  const move = (i: number, d: number) => {
    const j = i + d
    if (j < 0 || j >= rows.length) return
    const next = [...rows]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
    setOpen(j)
  }
  return (
    <div className="npe-field">
      <span className="npe-label">
        {f.label} <span className="npe-desc-inline">({rows.length})</span>
      </span>
      {desc}
      <ol className="npe-array">
        {rows.map((r, i) => {
          const b = def(r.blockType)
          return (
            <li key={(r.id as string) ?? i} className={errors.some((e) => e.startsWith(`${path}.${i}.`)) ? 'has-error' : ''}>
              <div className="npe-array-head">
                <button type="button" className="npe-array-title" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                  <b>{b?.label ?? String(r.blockType)}</b> {titleOf(r) && <span className="npe-desc-inline">· {titleOf(r)}</span>}
                </button>
                <button type="button" className="npe-icon" disabled={ctx.readOnly || i === 0} aria-label="Move up" onClick={() => move(i, -1)}>
                  <ChevronUp size={15} />
                </button>
                <button type="button" className="npe-icon" disabled={ctx.readOnly || i === rows.length - 1} aria-label="Move down" onClick={() => move(i, 1)}>
                  <ChevronDown size={15} />
                </button>
                <button type="button" className="npe-icon" disabled={ctx.readOnly} aria-label="Duplicate" onClick={() => onChange([...rows.slice(0, i + 1), reId(structuredClone(r)), ...rows.slice(i + 1)])}>
                  <Copy size={14} />
                </button>
                <button type="button" className="npe-icon" disabled={ctx.readOnly} aria-label="Remove" onClick={() => onChange(rows.filter((_, k) => k !== i))}>
                  <Trash2 size={14} />
                </button>
              </div>
              {open === i && b && (
                <div className="npe-array-body">
                  <Fields fields={b.fields} value={r} en={enRows.find((x) => x.id === r.id)} onChange={(v) => onChange(rows.map((x, k) => (k === i ? v : x)))} errors={errors} prefix={`${path}.${i}`} />
                </div>
              )}
            </li>
          )
        })}
      </ol>
      {adding ? (
        <div className="npe-chips">
          {kinds.map((b) => (
            <button
              key={b.slug}
              type="button"
              className="npe-chip"
              onClick={() => {
                onChange([...rows, { id: newId(), blockType: b.slug, ...defaults(b.fields) }])
                setOpen(rows.length)
                setAdding(false)
              }}
            >
              <Plus size={12} aria-hidden="true" /> {b.label}
            </button>
          ))}
          <button type="button" className="npe-chip" onClick={() => setAdding(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <button type="button" className="npe-btn npe-btn-sm npe-btn-ghost" disabled={ctx.readOnly} onClick={() => setAdding(true)}>
          <Plus size={14} aria-hidden="true" /> Add a block inside
        </button>
      )}
    </div>
  )
}
