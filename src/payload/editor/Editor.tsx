'use client'

import {
  ArrowLeft,
  Bookmark,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  GripVertical,
  Layers,
  LoaderCircle,
  Maximize2,
  Minimize2,
  Monitor,
  MousePointer2,
  MoreHorizontal,
  Plus,
  Redo2,
  Settings2,
  Smartphone,
  Tablet,
  Trash2,
  Undo2,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './editor.css'
import { Ctx, Fields, type FormCtx, type MediaDoc } from './Form'
import { blockIcon, MediaPicker, Modal, SectionPicker } from './pickers'
import { SeoPanel } from './SeoPanel'
import type { DocKind, EBlock, EditorSchema, EField } from './schema'
import { api, type Data, defaults, forSave, getIn, type Lang, LANGS, newId, reId, sectionTitle, setIn } from './util'

type Kind = DocKind & { canEdit: boolean; canPublish: boolean }
type Props = {
  schema: Omit<EditorSchema, 'kinds'> & { kinds: Kind[] }
  previewSecret: string
  initial: { kind: string; id: string | null; lang: Lang }
  canMedia: boolean
  canSaveSections: boolean
  userName: string
}
type Device = 'phone' | 'tablet' | 'desktop'
const WIDTH: Record<Device, number> = { phone: 390, tablet: 768, desktop: 1280 }
type Save = 'idle' | 'loading' | 'dirty' | 'saving' | 'saved' | 'error'

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/** Upload ids anywhere in a document, so their thumbnails can be fetched in one go. */
function collectUploads(fields: EField[], v: unknown, blocks: Record<string, EBlock>, out: Set<string>) {
  if (!v || typeof v !== 'object') return
  for (const f of fields) {
    if (f.type === 'tabs') {
      for (const tb of f.tabs ?? []) collectUploads(tb.fields, tb.name ? (v as Data)[tb.name] : v, blocks, out)
      continue
    }
    if (!f.name) {
      collectUploads(f.fields ?? [], v, blocks, out)
      continue
    }
    const x = (v as Data)[f.name]
    if (f.type === 'upload' && x != null) for (const one of Array.isArray(x) ? x : [x]) out.add(String(typeof one === 'object' && one ? (one as Data).id : one))
    else if (f.type === 'group') collectUploads(f.fields ?? [], x, blocks, out)
    else if (f.type === 'array' && Array.isArray(x)) for (const r of x) collectUploads(f.fields ?? [], r, blocks, out)
    else if (f.type === 'blocks' && Array.isArray(x)) for (const r of x as Data[]) collectUploads(f.blocks?.find((b) => b.slug === r.blockType)?.fields ?? [], r, blocks, out)
  }
}

export function Editor({ schema, previewSecret, initial, canMedia, canSaveSections, userName }: Props) {
  const [kindSlug, setKindSlug] = useState(schema.kinds.some((k) => k.slug === initial.kind) ? initial.kind : schema.kinds[0]?.slug)
  const kind = schema.kinds.find((k) => k.slug === kindSlug) as Kind | undefined
  const [docId, setDocId] = useState<string | null>(initial.id)
  const [lang, setLang] = useState<Lang>(initial.lang)
  const [list, setList] = useState<{ id: string; title: string; slug?: string }[]>([])
  const [doc, setDoc] = useState<Data | null>(null)
  const [enDoc, setEnDoc] = useState<Data | null>(null)
  const [published, setPublished] = useState<boolean>(true)
  const [save, setSave] = useState<Save>('loading')
  const [error, setError] = useState('')
  const [errPaths, setErrPaths] = useState<string[]>([])
  const [selected, setSelected] = useState<number | 'settings' | null>(null)
  const [device, setDevice] = useState<Device>('desktop')
  const [full, setFull] = useState(false)
  const [inspect, setInspect] = useState(true)
  const [media, setMedia] = useState<Record<string, MediaDoc>>({})
  const [adding, setAdding] = useState<number | null>(null)
  const [mediaReq, setMediaReq] = useState<{ accept: 'image' | 'video' | 'any'; resolve: (m: MediaDoc | null) => void } | null>(null)
  const [newDoc, setNewDoc] = useState(false)
  const [saveAs, setSaveAs] = useState<number | null>(null)
  const [menu, setMenu] = useState<number | null>(null)
  const [toast, setToast] = useState<{ text: string; undo?: boolean } | null>(null)
  const [hist, setHist] = useState<{ past: Data[]; future: Data[] }>({ past: [], future: [] })
  const lastEdit = useRef<{ key: string; at: number }>({ key: '', at: 0 })
  const histRef = useRef<{ past: Data[]; future: Data[] }>({ past: [], future: [] })
  const saveTimer = useRef<number | null>(null)
  const docRef = useRef<Data | null>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const pane = useRef<HTMLDivElement>(null)
  const [paneSize, setPaneSize] = useState({ w: 1000, h: 800 })
  const relCache = useRef<Record<string, Promise<{ value: string | number; label: string }[]>>>({})
  const [frameKey, setFrameKey] = useState(0)
  const dragFrom = useRef<number | null>(null)
  const [dragOver, setDragOver] = useState<number | null>(null)

  const blocks = useMemo(() => Object.fromEntries((kind?.blockSet ? schema.blocks[kind.blockSet] : []).map((b) => [b.slug, b])), [kind, schema.blocks])
  const sections = (kind?.sections && doc ? (getIn(doc, kind.sections) as Data[] | undefined) : undefined) ?? []
  const readOnly = !kind?.canEdit
  docRef.current = doc

  /* ---------------- loading ---------------- */

  const docUrl = useCallback(
    (l: Lang, extra = '') => (kind?.kind === 'global' ? `/api/globals/${kind.slug}?draft=true&depth=0&locale=${l}${extra}` : `/api/${kind?.slug}/${docId}?draft=true&depth=0&locale=${l}${extra}`),
    [kind, docId],
  )

  // The list of documents of this kind.
  useEffect(() => {
    if (!kind || kind.kind === 'global') {
      setList([])
      return
    }
    const p = new URLSearchParams({ limit: '300', depth: '0', draft: 'true', locale: lang, sort: kind.titleField })
    p.set(`select[${kind.titleField}]`, 'true')
    p.set('select[slug]', 'true')
    api<{ docs: Data[] }>(`/api/${kind.slug}?${p}`)
      .then((r) => {
        const items = r.docs.map((d) => ({ id: String(d.id), title: String(d[kind.titleField] || d.slug || `#${d.id}`), slug: d.slug as string | undefined }))
        setList(items)
        if (!docId && items.length) setDocId((items.find((x) => x.slug === 'home') ?? items[0]).id)
      })
      .catch((e) => setError((e as Error).message))
  }, [kind, lang, docId])

  // The document itself, in the chosen language (no English fallback, so empty means "not translated yet").
  useEffect(() => {
    if (!kind || (kind.kind === 'collection' && !docId)) return
    let live = true
    setSave('loading')
    setError('')
    setErrPaths([])
    Promise.all([api<Data>(docUrl(lang, '&fallback-locale=none')), lang === 'en' ? Promise.resolve(null) : api<Data>(docUrl('en'))])
      .then(([d, en]) => {
        if (!live) return
        setDoc(d)
        setEnDoc(en)
        setPublished(d._status !== 'draft')
        histRef.current = { past: [], future: [] }
        setHist({ past: [], future: [] })
        setSave('idle')
        setSelected((s) => (kind.sections ? (typeof s === 'number' ? s : null) : 'settings'))
        const ids = new Set<string>()
        collectUploads(kind.fields, d, blocks, ids)
        for (const b of (kind.sections ? (getIn(d, kind.sections) as Data[]) : []) ?? []) collectUploads(blocks[b.blockType as string]?.fields ?? [], b, blocks, ids)
        loadMedia([...ids])
      })
      .catch((e) => {
        if (!live) return
        setError((e as Error).message)
        setSave('error')
      })
    return () => {
      live = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, docId, lang])

  const loadMedia = useCallback((ids: string[]) => {
    const want = ids.filter((x) => /^[\w-]+$/.test(x) && x !== 'undefined' && x !== 'null')
    if (!want.length) return
    api<{ docs: MediaDoc[] }>(`/api/media?limit=200&depth=0&where[id][in]=${want.join(',')}`)
      .then((r) => setMedia((m) => ({ ...m, ...Object.fromEntries(r.docs.map((d) => [String(d.id), d])) })))
      .catch(() => {})
  }, [])

  // Keep the address bar in step so a reload (or a shared link) opens the same thing.
  useEffect(() => {
    const p = new URLSearchParams({ kind: kindSlug ?? '', lang })
    if (docId && kind?.kind === 'collection') p.set('id', docId)
    window.history.replaceState(null, '', `${window.location.pathname}?${p}`)
  }, [kindSlug, docId, lang, kind])

  /* ---------------- saving ---------------- */

  const persist = useCallback(
    async (mode: 'draft' | 'publish') => {
      const d = docRef.current
      if (!kind || !d) return
      if (saveTimer.current) window.clearTimeout(saveTimer.current)
      setSave('saving')
      setError('')
      try {
        const body = mode === 'publish' ? { ...forSave(d), _status: 'published' } : forSave(d)
        const q = mode === 'publish' ? `?locale=${lang}&depth=0` : `?draft=true&autosave=true&locale=${lang}&depth=0`
        const url = kind.kind === 'global' ? `/api/globals/${kind.slug}${q}` : `/api/${kind.slug}/${docId}${q}`
        await api(url, { method: kind.kind === 'global' ? 'POST' : 'PATCH', json: body })
        setSave('saved')
        setErrPaths([])
        setPublished(mode === 'publish')
        if (mode === 'publish') setToast({ text: 'Published. It is live on the site.' })
        frame.current?.contentWindow?.postMessage({ type: 'np:refresh' }, window.location.origin)
      } catch (e) {
        setSave('error')
        setError((e as Error).message)
        setErrPaths((e as { paths?: string[] }).paths ?? [])
      }
    },
    [kind, docId, lang],
  )

  const queueSave = useCallback(() => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current)
    setSave('dirty')
    saveTimer.current = window.setTimeout(() => void persist('draft'), 700)
  }, [persist])

  // History lives in a ref (state updaters must stay pure: React may run them twice).
  const syncHist = () => setHist({ ...histRef.current })

  /** Every edit goes through here: history, then autosave. */
  const change = useCallback(
    (next: Data, key = '') => {
      if (readOnly) return
      const now = Date.now()
      const prev = docRef.current
      const coalesce = key && lastEdit.current.key === key && now - lastEdit.current.at < 1200
      if (prev && !coalesce) histRef.current = { past: [...histRef.current.past.slice(-80), prev], future: [] }
      else histRef.current = { ...histRef.current, future: [] }
      syncHist()
      lastEdit.current = { key, at: now }
      setDoc(next)
      docRef.current = next
      queueSave()
    },
    [queueSave, readOnly],
  )

  const step = useCallback(
    (dir: -1 | 1) => {
      const h = histRef.current
      const cur = docRef.current
      if (!cur) return
      if (dir < 0 && h.past.length) {
        const prev = h.past[h.past.length - 1]
        histRef.current = { past: h.past.slice(0, -1), future: [cur, ...h.future] }
        setDoc(prev)
        docRef.current = prev
      } else if (dir > 0 && h.future.length) {
        const [next, ...rest] = h.future
        histRef.current = { past: [...h.past, cur], future: rest }
        setDoc(next)
        docRef.current = next
      } else return
      syncHist()
      lastEdit.current = { key: '', at: 0 }
      queueSave()
    },
    [queueSave],
  )
  const undo = useCallback(() => step(-1), [step])
  const redo = useCallback(() => step(1), [step])

  // Before switching document/language or leaving, write what's pending.
  const flush = useCallback(async () => {
    if (saveTimer.current && (save === 'dirty' || save === 'saving')) await persist('draft')
  }, [persist, save])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey
      if (!mod) return
      const typing = /INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement)?.tagName)
      if (e.key.toLowerCase() === 's') {
        e.preventDefault()
        void persist('draft')
      } else if (!typing && e.key.toLowerCase() === 'z') {
        e.preventDefault()
        if (e.shiftKey) redo()
        else undo()
      } else if (!typing && e.key.toLowerCase() === 'y') {
        e.preventDefault()
        redo()
      }
    }
    const onLeave = (e: BeforeUnloadEvent) => {
      if (save === 'dirty' || save === 'saving') e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('beforeunload', onLeave)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('beforeunload', onLeave)
    }
  }, [persist, undo, redo, save])

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), toast.undo ? 7000 : 3500)
    return () => window.clearTimeout(t)
  }, [toast])

  /* ---------------- sections ---------------- */

  const setSections = (next: Data[], key = '') => doc && kind?.sections && change(setIn(doc, kind.sections, next), key)
  const addSection = (b: EBlock, at: number) => {
    const block = { id: newId(), blockType: b.slug, ...defaults(b.fields) }
    setSections([...sections.slice(0, at), block, ...sections.slice(at)])
    setSelected(at)
    setAdding(null)
  }
  const addSaved = (sectionId: string | number, at: number) => {
    setSections([...sections.slice(0, at), { id: newId(), blockType: 'reusable', section: sectionId }, ...sections.slice(at)])
    setSelected(at)
    setAdding(null)
  }
  const move = (from: number, to: number) => {
    if (to < 0 || to >= sections.length || from === to) return
    const next = [...sections]
    const [b] = next.splice(from, 1)
    next.splice(to, 0, b)
    setSections(next)
    setSelected(to)
  }
  const remove = (i: number) => {
    setSections(sections.filter((_, k) => k !== i))
    setSelected(null)
    setToast({ text: 'Section removed.', undo: true })
  }
  const duplicate = (i: number) => {
    setSections([...sections.slice(0, i + 1), reId(structuredClone(sections[i])), ...sections.slice(i + 1)])
    setSelected(i + 1)
  }
  const toggleHidden = (i: number) => {
    const b = sections[i]
    const display = { ...((b.display as Data) ?? {}), hidden: !(b.display as Data | undefined)?.hidden }
    setSections(sections.map((x, k) => (k === i ? { ...x, display } : x)))
  }

  /* ---------------- preview frame ---------------- */

  const sitePath = useMemo(() => {
    if (!kind || !kind.path) return `/${lang}`
    const slug = (doc?.slug as string) ?? list.find((x) => x.id === docId)?.slug ?? ''
    if (kind.slug === 'pages' && slug === 'home') return `/${lang}`
    return `/${lang}${kind.path.replace('{slug}', slug).replace('{id}', String(docId ?? ''))}`
  }, [kind, doc?.slug, list, docId, lang])
  const [frameSrc, setFrameSrc] = useState('')
  useEffect(() => {
    if (!doc) return
    const t = window.setTimeout(() => setFrameSrc(`/next/preview?${new URLSearchParams({ path: sitePath, previewSecret })}`), 300)
    return () => window.clearTimeout(t)
  }, [sitePath, previewSecret, doc])

  const post = useCallback((msg: Data) => frame.current?.contentWindow?.postMessage(msg, window.location.origin), [])
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.source !== frame.current?.contentWindow) return
      const m = e.data as { type?: string; index?: number; field?: string }
      if (m.type === 'np:ready') {
        post({ type: 'np:inspect', on: inspect })
        if (typeof selected === 'number') post({ type: 'np:select', index: selected, field: kind?.sections, scroll: false })
      }
      if (m.type === 'np:select' && typeof m.index === 'number' && m.field === kind?.sections) setSelected(m.index)
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [post, inspect, selected, kind])
  useEffect(() => post({ type: 'np:inspect', on: inspect }), [inspect, post])
  useEffect(() => {
    if (typeof selected === 'number') post({ type: 'np:select', index: selected, field: kind?.sections, scroll: true })
    else post({ type: 'np:select', index: -1 })
  }, [selected, post, kind])

  useEffect(() => {
    const el = pane.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setPaneSize({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  useEffect(() => {
    if (!full) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && !adding && !mediaReq && setFull(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [full, adding, mediaReq])

  const devW = WIDTH[device]
  const scale = Math.min(1, (paneSize.w - 24) / devW)
  const frameStyle = { width: devW, height: (paneSize.h - 24) / scale, transform: `scale(${scale})` }

  /* ---------------- form context ---------------- */

  const ctx: FormCtx = useMemo(
    () => ({
      lang,
      media,
      readOnly,
      fullEditorUrl: kind?.kind === 'global' ? `/admin/globals/${kind.slug}?locale=${lang}` : `/admin/collections/${kind?.slug}/${docId}?locale=${lang}`,
      pickMedia: (accept = 'image') =>
        new Promise<MediaDoc | null>((resolve) =>
          setMediaReq({
            accept,
            resolve: (m) => {
              if (m) setMedia((x) => ({ ...x, [String(m.id)]: m }))
              resolve(m)
            },
          }),
        ),
      relOptions: (rel) => {
        const key = `${rel}:${lang}`
        if (!relCache.current[key]) {
          const title = schema.titles[rel] ?? 'id'
          const p = new URLSearchParams({ limit: '300', depth: '0', draft: 'true', locale: lang, sort: title })
          p.set(`select[${title}]`, 'true')
          relCache.current[key] = api<{ docs: Data[] }>(`/api/${rel}?${p}`)
            .then((r) => r.docs.map((d) => ({ value: d.id as string | number, label: String(d[title] ?? d.id) })))
            .catch(() => [])
        }
        return relCache.current[key]
      },
    }),
    [lang, media, readOnly, kind, docId, schema.titles],
  )

  /* ---------------- switching ---------------- */

  const switchTo = async (next: { kind?: string; id?: string | null; lang?: Lang }) => {
    await flush()
    if (next.kind && next.kind !== kindSlug) {
      setKindSlug(next.kind)
      setDocId(next.id ?? null)
      setDoc(null)
      setSelected(null)
    } else if (next.id !== undefined && next.id !== docId) {
      setDocId(next.id)
      setDoc(null)
      setSelected(null)
    }
    if (next.lang) setLang(next.lang)
    relCache.current = {}
  }

  const createDoc = async (title: string) => {
    if (!kind) return
    const data: Data = { [kind.titleField]: title, _status: 'draft' }
    if (kind.slug !== 'sections') data.slug = slugify(title)
    if (kind.sections) Object.assign(data, setIn({}, kind.sections, []))
    try {
      const r = await api<{ doc: Data }>(`/api/${kind.slug}?draft=true&locale=${lang}&depth=0`, { method: 'POST', json: data })
      setNewDoc(false)
      setList((l) => [...l, { id: String(r.doc.id), title, slug: r.doc.slug as string }])
      await switchTo({ id: String(r.doc.id) })
    } catch (e) {
      setError((e as Error).message)
    }
  }

  /** A draft copy with "(copy)" in its title and its own web address; the original is untouched. */
  const duplicateDoc = async () => {
    if (!kind || !docId) return
    await flush()
    try {
      const r = await api<{ doc: Data }>(`/api/${kind.slug}/${docId}/duplicate?draft=true&depth=0`, { method: 'POST', json: {} })
      const id = String(r.doc.id)
      setList((l) => [...l, { id, title: String(r.doc[kind.titleField] ?? 'Copy'), slug: r.doc.slug as string }])
      await switchTo({ id })
      setToast({ text: 'Copy made as a draft. Change it, then Publish when ready.' })
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const saveAsSaved = async (i: number, name: string) => {
    const b = sections[i]
    try {
      const r = await api<{ doc: Data }>(`/api/sections?locale=${lang}&depth=0`, { method: 'POST', json: { name, layout: [reId(structuredClone(b))], _status: 'published' } })
      setSections(sections.map((x, k) => (k === i ? { id: newId(), blockType: 'reusable', section: r.doc.id } : x)))
      setSaveAs(null)
      setToast({ text: `Saved as "${name}". Add it to any page from Add section → Saved sections.` })
    } catch (e) {
      setError((e as Error).message)
    }
  }

  /* ---------------- render ---------------- */

  const sel = typeof selected === 'number' ? sections[selected] : null
  const selBlock = sel ? blocks[sel.blockType as string] : undefined
  const enSections = (kind?.sections && enDoc ? (getIn(enDoc, kind.sections) as Data[]) : null) ?? []
  const statusText =
    save === 'loading' ? 'Loading…' : save === 'saving' ? 'Saving…' : save === 'dirty' ? 'Unsaved' : save === 'error' ? 'Not saved' : published ? 'Published' : 'Draft saved · not live yet'
  const blockErrs = (i: number) => errPaths.filter((p) => kind?.sections && p.startsWith(`${kind.sections}.${i}.`)).map((p) => p.slice(`${kind!.sections}.${i}.`.length))

  if (!kind) return <div className="npe-root npe-empty">Your role can&apos;t edit pages. Ask an Admin.</div>

  return (
    <Ctx.Provider value={ctx}>
      <div className={'npe-root' + (full ? ' is-full' : '')}>
        <header className="npe-top">
          <a className="npe-icon npe-back" href="/admin" aria-label="Back to the CMS" title="Back to the CMS">
            <ArrowLeft size={18} />
          </a>
          <div className="npe-doc">
            <select className="npe-input npe-input-sm" aria-label="What to edit" value={kindSlug} onChange={(e) => void switchTo({ kind: e.target.value, id: null })}>
              {schema.kinds.map((k) => (
                <option key={k.slug} value={k.slug}>
                  {k.label}
                </option>
              ))}
            </select>
            {kind.kind === 'collection' && (
              <>
                <select className="npe-input npe-input-sm npe-doc-select" aria-label="Document" value={docId ?? ''} onChange={(e) => void switchTo({ id: e.target.value })}>
                  {list.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title}
                    </option>
                  ))}
                </select>
                {kind.canEdit && kind.slug !== 'worlds' && (
                  <>
                    <button type="button" className="npe-btn npe-btn-sm" onClick={() => setNewDoc(true)}>
                      <Plus size={14} aria-hidden="true" /> New
                    </button>
                    <button type="button" className="npe-btn npe-btn-sm" disabled={!docId} onClick={() => void duplicateDoc()} title="Make a draft copy of this, to change and publish separately">
                      <Copy size={14} aria-hidden="true" /> Duplicate
                    </button>
                  </>
                )}
              </>
            )}
          </div>
          <div className="npe-seg npe-langs" role="group" aria-label="Language">
            {LANGS.map((l) => (
              <button key={l.code} type="button" className={lang === l.code ? 'is-on' : ''} aria-pressed={lang === l.code} onClick={() => void switchTo({ lang: l.code })} lang={l.code}>
                {l.label}
              </button>
            ))}
          </div>
          <div className="npe-seg" role="group" aria-label="Preview size">
            {(
              [
                ['phone', Smartphone, 'Phone'],
                ['tablet', Tablet, 'Tablet'],
                ['desktop', Monitor, 'Desktop'],
              ] as const
            ).map(([d, Icon, label]) => (
              <button key={d} type="button" className={device === d ? 'is-on' : ''} aria-pressed={device === d} onClick={() => setDevice(d)} title={`${label} (${WIDTH[d]} px)`} aria-label={label}>
                <Icon size={16} />
              </button>
            ))}
            <button type="button" className={full ? 'is-on' : ''} aria-pressed={full} onClick={() => setFull(!full)} title={full ? 'Exit full screen (Esc)' : 'Full screen preview'} aria-label="Full screen preview">
              {full ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
          <button type="button" className={'npe-icon' + (inspect ? ' is-on' : '')} aria-pressed={inspect} onClick={() => setInspect(!inspect)} title="Click sections in the preview to select them">
            <MousePointer2 size={17} />
          </button>
          <div className="npe-spacer" />
          <button type="button" className="npe-icon" onClick={undo} disabled={!hist.past.length} aria-label="Undo" title={`Undo (Ctrl+Z)${hist.past.length ? ` · ${hist.past.length} step${hist.past.length > 1 ? "s" : ""}` : ""}`}>
            <Undo2 size={17} />
          </button>
          <button type="button" className="npe-icon" onClick={redo} disabled={!hist.future.length} aria-label="Redo" title="Redo (Ctrl+Shift+Z)">
            <Redo2 size={17} />
          </button>
          <span className={'npe-status is-' + (save === 'idle' || save === 'saved' ? (published ? 'live' : 'draft') : save)} role="status">
            {save === 'saving' || save === 'loading' ? <LoaderCircle size={14} className="npe-spin" aria-hidden="true" /> : save === 'idle' || save === 'saved' ? <Check size={14} aria-hidden="true" /> : null}
            {statusText}
          </span>
          <a className="npe-icon" href={sitePath} target="_blank" rel="noreferrer" title="Open the preview in a new tab" aria-label="Open preview in a new tab">
            <ExternalLink size={17} />
          </a>
          <button
            type="button"
            className="npe-btn npe-btn-primary"
            disabled={!kind.canPublish || save === 'loading' || save === 'saving'}
            title={kind.canPublish ? 'Put these changes live' : 'Your role can save drafts. Someone with publish rights puts them live.'}
            onClick={() => void persist('publish')}
          >
            {published && save !== 'dirty' ? 'Published' : 'Publish'}
          </button>
        </header>

        {error && (
          <div className="npe-alert" role="alert">
            {error}
            <button type="button" className="npe-icon" onClick={() => setError('')} aria-label="Dismiss">
              ×
            </button>
          </div>
        )}

        <div className="npe-main">
          {/* ---------- left: section tree ---------- */}
          <aside className="npe-left" aria-label="Sections">
            {readOnly && <p className="npe-note">You can look but not change this. Your role has view-only access here.</p>}
            <button type="button" className={'npe-tree-item npe-tree-settings' + (selected === 'settings' ? ' is-on' : '')} onClick={() => setSelected('settings')}>
              <Settings2 size={16} aria-hidden="true" />
              <span>{kind.kind === 'global' ? kind.label : kind.slug === 'posts' ? 'Post details & SEO' : 'Page settings & SEO'}</span>
            </button>
            {kind.sections && (
              <>
                <h2 className="npe-h">
                  <Layers size={14} aria-hidden="true" /> {kind.slug === 'posts' ? 'Article' : 'Sections'}
                  {kind.slug === 'offers' || kind.slug === 'events' ? <span className="npe-desc-inline"> · under the banner</span> : null}
                </h2>
                <ol className="npe-tree">
                  {sections.map((b, i) => {
                    const def = blocks[b.blockType as string]
                    const Icon = blockIcon(def)
                    const hidden = !!(b.display as Data | undefined)?.hidden
                    const title = sectionTitle(b)
                    return (
                      <li
                        key={(b.id as string) ?? i}
                        className={(dragOver === i ? 'is-over ' : '') + (blockErrs(i).length ? 'has-error' : '')}
                        draggable={!readOnly}
                        onDragStart={(e) => {
                          dragFrom.current = i
                          e.dataTransfer.effectAllowed = 'move'
                        }}
                        onDragOver={(e) => {
                          e.preventDefault()
                          setDragOver(i)
                        }}
                        onDragLeave={() => setDragOver((x) => (x === i ? null : x))}
                        onDrop={(e) => {
                          e.preventDefault()
                          if (dragFrom.current !== null) move(dragFrom.current, i)
                          dragFrom.current = null
                          setDragOver(null)
                        }}
                        onDragEnd={() => setDragOver(null)}
                      >
                        <div className={'npe-tree-item' + (selected === i ? ' is-on' : '') + (hidden ? ' is-hidden' : '')}>
                          <GripVertical size={14} className="npe-grip" aria-hidden="true" />
                          <button
                            type="button"
                            className="npe-tree-label"
                            onClick={() => setSelected(i)}
                            onKeyDown={(e) => {
                              if (e.altKey && e.key === 'ArrowUp') {
                                e.preventDefault()
                                move(i, i - 1)
                              }
                              if (e.altKey && e.key === 'ArrowDown') {
                                e.preventDefault()
                                move(i, i + 1)
                              }
                            }}
                            title="Alt + ↑/↓ to move"
                          >
                            <Icon size={15} aria-hidden="true" />
                            <span>
                              <b>{def?.label ?? (b.blockType as string)}</b>
                              {title && <small>{title}</small>}
                            </span>
                          </button>
                          <button type="button" className="npe-icon npe-hover" disabled={readOnly} onClick={() => toggleHidden(i)} aria-label={hidden ? 'Show section' : 'Hide section'} title={hidden ? 'Hidden — click to show' : 'Hide (keeps it, but visitors won’t see it)'}>
                            {hidden ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                          <div className="npe-menu-wrap">
                            <button type="button" className="npe-icon npe-hover" aria-label="More actions" aria-expanded={menu === i} onClick={() => setMenu(menu === i ? null : i)}>
                              <MoreHorizontal size={15} />
                            </button>
                            {menu === i && (
                              <div className="npe-menu" role="menu" onMouseLeave={() => setMenu(null)}>
                                <button type="button" role="menuitem" disabled={readOnly || i === 0} onClick={() => (setMenu(null), move(i, i - 1))}>
                                  <ChevronUp size={14} /> Move up
                                </button>
                                <button type="button" role="menuitem" disabled={readOnly || i === sections.length - 1} onClick={() => (setMenu(null), move(i, i + 1))}>
                                  <ChevronDown size={14} /> Move down
                                </button>
                                <button type="button" role="menuitem" disabled={readOnly} onClick={() => (setMenu(null), duplicate(i))}>
                                  <Copy size={14} /> Duplicate
                                </button>
                                {kind.blockSet === 'page' && kind.slug !== 'sections' && b.blockType !== 'reusable' && (
                                  <button type="button" role="menuitem" disabled={readOnly || !canSaveSections} onClick={() => (setMenu(null), setSaveAs(i))}>
                                    <Bookmark size={14} /> Save as saved section
                                  </button>
                                )}
                                <button type="button" role="menuitem" className="is-danger" disabled={readOnly} onClick={() => (setMenu(null), remove(i))}>
                                  <Trash2 size={14} /> Remove
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        {!readOnly && (
                          <button type="button" className="npe-insert" onClick={() => setAdding(i + 1)} aria-label={`Add a section after ${def?.label ?? 'this'}`}>
                            <Plus size={12} />
                          </button>
                        )}
                      </li>
                    )
                  })}
                </ol>
                {!sections.length && <p className="npe-note">No sections yet.</p>}
                {!readOnly && (
                  <button type="button" className="npe-btn npe-add" onClick={() => setAdding(sections.length)}>
                    <Plus size={16} aria-hidden="true" /> Add {kind.slug === 'posts' ? 'block' : 'section'}
                  </button>
                )}
              </>
            )}
            <p className="npe-foot">
              Signed in as {userName}. Changes save as a draft while you work; <b>Publish</b> puts them live.{' '}
              <a href={ctx.fullEditorUrl} target="_blank" rel="noreferrer">
                Versions & scheduling ↗
              </a>
            </p>
          </aside>

          {/* ---------- centre: the real page ---------- */}
          <div className={'npe-stage is-' + device} ref={pane}>
            {frameSrc ? (
              <div className="npe-device" style={{ width: devW * scale, height: paneSize.h - 24 }}>
                <iframe key={frameKey} ref={frame} title="Page preview" src={frameSrc} style={frameStyle} onLoad={() => post({ type: 'np:inspect', on: inspect })} />
              </div>
            ) : (
              <div className="npe-loading">
                <LoaderCircle className="npe-spin" aria-hidden="true" /> Loading preview…
              </div>
            )}
            <button type="button" className="npe-reload" onClick={() => setFrameKey((k) => k + 1)} title="Reload preview">
              ↻
            </button>
          </div>

          {/* ---------- right: settings ---------- */}
          <aside className="npe-right" aria-label="Settings">
            {selected === 'settings' && doc ? (
              <>
                <h2 className="npe-panel-title">
                  <Settings2 size={16} aria-hidden="true" /> {kind.kind === 'global' ? kind.label : 'Settings & SEO'}
                </h2>
                {kind.kind === 'collection' && kind.slug !== 'sections' && <SeoPanel kind={kind.slug} doc={doc} media={media} sections={sections} siteHost="niccoparks.com" path={sitePath} />}
                {lang !== 'en' && <p className="npe-note">Editing the {LANGS.find((l) => l.code === lang)?.label} version. Fields marked {lang.toUpperCase()} are per language; grey text shows the English to translate.</p>}
                <Fields fields={kind.fields} value={doc} en={enDoc ?? undefined} onChange={(v) => change(v, 'settings')} errors={errPaths} />
              </>
            ) : sel && selBlock ? (
              <>
                <h2 className="npe-panel-title">
                  {(() => {
                    const Icon = blockIcon(selBlock)
                    return <Icon size={16} aria-hidden="true" />
                  })()}
                  {selBlock.label}
                </h2>
                {selBlock.description && <p className="npe-desc">{selBlock.description}</p>}
                {sel.blockType === 'reusable' && sel.section ? (
                  <p className="npe-note">
                    This is a saved section, shared by every page that uses it.{' '}
                    <button type="button" className="npe-linkbtn" onClick={() => void switchTo({ kind: 'sections', id: String(typeof sel.section === 'object' ? (sel.section as Data).id : sel.section) })}>
                      Edit the saved section →
                    </button>
                  </p>
                ) : null}
                <Fields
                  key={(sel.id as string) ?? String(selected)}
                  fields={selBlock.fields}
                  value={sel}
                  en={enSections.find((x) => x.id === sel.id)}
                  onChange={(v) => setSections(sections.map((x, k) => (k === selected ? v : x)), `s${String(sel.id)}`)}
                  errors={blockErrs(selected as number)}
                />
                {!readOnly && (
                  <button type="button" className="npe-btn npe-btn-ghost npe-danger" onClick={() => remove(selected as number)}>
                    <Trash2 size={14} aria-hidden="true" /> Remove section
                  </button>
                )}
              </>
            ) : (
              <div className="npe-hint">
                <MousePointer2 size={28} aria-hidden="true" />
                <p>
                  <b>Pick a section</b> on the left, or click one in the preview, to change its text, photos, colours and visibility.
                </p>
                <p className="npe-desc">Edits show in the preview in about a second. Nothing is live until you press Publish.</p>
              </div>
            )}
          </aside>
        </div>

        {toast && (
          <div className="npe-toast" role="status">
            {toast.text}
            {toast.undo && (
              <button
                type="button"
                className="npe-linkbtn"
                onClick={() => {
                  undo()
                  setToast(null)
                }}
              >
                Undo
              </button>
            )}
          </div>
        )}

        {adding !== null && kind.blockSet && (
          <SectionPicker blocks={schema.blocks[kind.blockSet]} allowSaved={kind.blockSet === 'page' && kind.slug !== 'sections'} onClose={() => setAdding(null)} onPick={(b) => addSection(b, adding)} onPickSaved={(id) => addSaved(id, adding)} />
        )}
        {mediaReq && (
          <MediaPicker
            accept={mediaReq.accept}
            canUpload={canMedia}
            onClose={() => {
              mediaReq.resolve(null)
              setMediaReq(null)
            }}
            onPick={(m) => {
              mediaReq.resolve(m)
              setMediaReq(null)
            }}
          />
        )}
        {newDoc && <NameDialog title={`New ${kind.label.replace(/s(\b|$)/, '').toLowerCase()}`} label="Title" onClose={() => setNewDoc(false)} onSubmit={createDoc} />}
        {saveAs !== null && (
          <NameDialog
            title="Save as saved section"
            label="Name (only staff see this)"
            initial={sectionTitle(sections[saveAs]) || blocks[sections[saveAs]?.blockType as string]?.label}
            note="It becomes one shared section: edit it once and it changes on every page that uses it."
            onClose={() => setSaveAs(null)}
            onSubmit={(name) => saveAsSaved(saveAs, name)}
          />
        )}
      </div>
    </Ctx.Provider>
  )
}

function NameDialog({ title, label, initial = '', note, onClose, onSubmit }: { title: string; label: string; initial?: string; note?: string; onClose: () => void; onSubmit: (v: string) => void }) {
  const [v, setV] = useState(initial)
  return (
    <Modal title={title} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (v.trim()) onSubmit(v.trim())
        }}
        className="npe-form"
      >
        <label className="npe-field">
          <span className="npe-label">{label}</span>
          <input className="npe-input" value={v} onChange={(e) => setV(e.target.value)} required />
        </label>
        {note && <p className="npe-desc">{note}</p>}
        <div className="npe-row">
          <button type="button" className="npe-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="npe-btn npe-btn-primary">
            Create
          </button>
        </div>
      </form>
    </Modal>
  )
}
