'use client'

import {
  Award,
  BadgePercent,
  BookOpen,
  Bookmark,
  Building2,
  CalendarDays,
  Camera,
  ChartNoAxesColumn,
  CircleHelp,
  Clock,
  Code,
  Columns3,
  Copy,
  FerrisWheel,
  GalleryHorizontal,
  LayoutGrid,
  Heading2,
  Image as ImageIcon,
  Images,
  Lightbulb,
  Link2,
  ListChecks,
  Mail,
  MapPin,
  Megaphone,
  MousePointerClick,
  PanelsLeftBottom,
  Pilcrow,
  Quote,
  Rocket,
  Search,
  SeparatorHorizontal,
  Tags,
  Text,
  Ticket,
  Timer,
  Upload,
  Users,
  Video,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { MediaDoc } from './Form'
import type { EBlock } from './schema'
import { api, type Data } from './util'

export const ICONS: Record<string, LucideIcon> = {
  image: ImageIcon,
  megaphone: Megaphone,
  'badge-percent': BadgePercent,
  timer: Timer,
  'mouse-pointer-click': MousePointerClick,
  ticket: Ticket,
  tags: Tags,
  'ferris-wheel': FerrisWheel,
  rocket: Rocket,
  'calendar-days': CalendarDays,
  clock: Clock,
  users: Users,
  'building-2': Building2,
  'map-pin': MapPin,
  'chart-no-axes-column': ChartNoAxesColumn,
  'panels-left-bottom': PanelsLeftBottom,
  'columns-3': Columns3,
  text: Text,
  video: Video,
  images: Images,
  quote: Quote,
  award: Award,
  'circle-help': CircleHelp,
  mail: Mail,
  camera: Camera,
  'book-open': BookOpen,
  code: Code,
  'separator-horizontal': SeparatorHorizontal,
  copy: Copy,
  'layout-grid': LayoutGrid,
  'gallery-horizontal': GalleryHorizontal,
  subHeading: Heading2,
  subText: Pilcrow,
  subImage: ImageIcon,
  subVideo: Video,
  subQuote: Quote,
  subList: ListChecks,
  subButton: MousePointerClick,
  subCard: PanelsLeftBottom,
  subGap: SeparatorHorizontal,
  divider: SeparatorHorizontal,
  offer: BadgePercent,
  h3: Heading2,
  // article blocks
  p: Pilcrow,
  h2: Heading2,
  list: ListChecks,
  tip: Lightbulb,
  cta: Link2,
}

export const blockIcon = (b?: EBlock) => (b ? (ICONS[b.icon] ?? ICONS[b.slug] ?? Text) : Text)

export function Modal({ title, onClose, children, wide }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    ref.current?.querySelector<HTMLElement>('input, button:not(.npe-modal-close)')?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      prev?.focus()
    }
  }, [onClose])
  return (
    <div className="npe-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} role="dialog" aria-modal="true" aria-label={title} className={'npe-modal' + (wide ? ' is-wide' : '')}>
        <div className="npe-modal-head">
          <h2>{title}</h2>
          <button type="button" className="npe-icon npe-modal-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="npe-modal-body">{children}</div>
      </div>
    </div>
  )
}

/** Shopify's "Add section": grouped, searchable, with saved sections in their own tab. */
export function SectionPicker({ blocks, onPick, onPickSaved, onClose, allowSaved }: { blocks: EBlock[]; onPick: (b: EBlock) => void; onPickSaved: (id: string | number) => void; onClose: () => void; allowSaved: boolean }) {
  const [q, setQ] = useState('')
  const [tab, setTab] = useState<'sections' | 'saved'>('sections')
  const [saved, setSaved] = useState<{ id: string | number; name: string }[] | null>(null)
  useEffect(() => {
    if (tab !== 'saved' || saved) return
    api<{ docs: Data[] }>('/api/sections?limit=100&depth=0&draft=true&sort=name')
      .then((r) => setSaved(r.docs.map((d) => ({ id: d.id as string, name: String(d.name ?? 'Untitled') }))))
      .catch(() => setSaved([]))
  }, [tab, saved])
  const list = blocks.filter((b) => b.slug !== 'reusable' && (!q || (b.label + ' ' + b.description).toLowerCase().includes(q.toLowerCase())))
  const cats = [...new Set(list.map((b) => b.category))]
  return (
    <Modal title="Add section" onClose={onClose} wide>
      <div className="npe-picker-top">
        {allowSaved && (
          <div className="npe-seg" role="tablist">
            <button type="button" role="tab" aria-selected={tab === 'sections'} className={tab === 'sections' ? 'is-on' : ''} onClick={() => setTab('sections')}>
              Sections
            </button>
            <button type="button" role="tab" aria-selected={tab === 'saved'} className={tab === 'saved' ? 'is-on' : ''} onClick={() => setTab('saved')}>
              <Bookmark size={13} aria-hidden="true" /> Saved sections
            </button>
          </div>
        )}
        {tab === 'sections' && (
          <label className="npe-search">
            <Search size={15} aria-hidden="true" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search sections" aria-label="Search sections" />
          </label>
        )}
      </div>
      {tab === 'sections' ? (
        cats.map((c) => (
          <section key={c} className="npe-cat">
            <h3>{c}</h3>
            <div className="npe-cards">
              {list
                .filter((b) => b.category === c)
                .map((b) => {
                  const Icon = blockIcon(b)
                  return (
                    <button key={b.slug} type="button" className="npe-card" onClick={() => onPick(b)}>
                      <Icon size={22} aria-hidden="true" />
                      <strong>{b.label}</strong>
                      <span>{b.description}</span>
                    </button>
                  )
                })}
            </div>
          </section>
        ))
      ) : (
        <div className="npe-cards">
          {saved === null && <p className="npe-desc">Loading…</p>}
          {saved?.length === 0 && (
            <p className="npe-desc">
              No saved sections yet. Open a section&apos;s ⋯ menu and choose <b>Save as saved section</b> to reuse it on other pages.
            </p>
          )}
          {saved?.map((s) => (
            <button key={s.id} type="button" className="npe-card" onClick={() => onPickSaved(s.id)}>
              <Copy size={22} aria-hidden="true" />
              <strong>{s.name}</strong>
              <span>Edit it once, it changes on every page that uses it.</span>
            </button>
          ))}
        </div>
      )}
    </Modal>
  )
}

/** The media library in a dialog: pick a file or upload a new one. */
export function MediaPicker({ accept, onPick, onClose, canUpload }: { accept: 'image' | 'video' | 'any'; onPick: (m: MediaDoc) => void; onClose: () => void; canUpload: boolean }) {
  const [q, setQ] = useState('')
  const [docs, setDocs] = useState<MediaDoc[] | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [alt, setAlt] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  useEffect(() => {
    const p = new URLSearchParams({ limit: '60', depth: '0', sort: '-createdAt' })
    if (accept !== 'any') p.set('where[mimeType][like]', accept === 'video' ? 'video/' : 'image/')
    if (q) {
      p.set('where[or][0][alt][like]', q)
      p.set('where[or][1][filename][like]', q)
    }
    const t = setTimeout(() => {
      api<{ docs: MediaDoc[] }>(`/api/media?${p}`)
        .then((r) => setDocs(r.docs))
        .catch(() => setDocs([]))
    }, q ? 250 : 0)
    return () => clearTimeout(t)
  }, [q, accept])

  const upload = async () => {
    if (!file) return
    setBusy(true)
    setErr('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('_payload', JSON.stringify({ alt: alt || file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ') }))
      const r = await api<{ doc: MediaDoc }>('/api/media', { method: 'POST', body: fd })
      onPick(r.doc)
    } catch (e) {
      setErr((e as Error).message)
    }
    setBusy(false)
  }

  const kind = accept === 'video' ? 'video/mp4,video/webm' : accept === 'image' ? 'image/*' : 'image/*,video/mp4,video/webm,application/pdf'
  return (
    <Modal title={accept === 'video' ? 'Choose a video' : 'Choose from Media'} onClose={onClose} wide>
      <div className="npe-picker-top">
        <label className="npe-search">
          <Search size={15} aria-hidden="true" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by description or file name" aria-label="Search media" />
        </label>
      </div>
      {canUpload && (
        <div className="npe-uploadbox">
          <label className="npe-btn npe-btn-sm">
            <Upload size={15} aria-hidden="true" /> {file ? file.name : 'Upload new…'}
            <input type="file" accept={kind} hidden onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </label>
          {file && (
            <>
              <input className="npe-input" value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Describe it (alt text, for screen readers and Google)" aria-label="Alt text" />
              <button type="button" className="npe-btn npe-btn-primary npe-btn-sm" disabled={busy} onClick={upload}>
                {busy ? 'Uploading…' : 'Upload and use'}
              </button>
            </>
          )}
          {err && <p className="npe-error-text">{err}</p>}
          <p className="npe-desc">Photos: JPG/PNG/WebP. Videos: MP4 or WebM, under 20 MB plays smoothly on phones.</p>
        </div>
      )}
      <div className="npe-media-grid">
        {docs === null && <p className="npe-desc">Loading…</p>}
        {docs?.length === 0 && <p className="npe-desc">Nothing found.</p>}
        {docs?.map((m) => (
          <button key={m.id} type="button" className="npe-media" onClick={() => onPick(m)} title={m.alt || m.filename}>
            {m.mimeType?.startsWith('video/') ? <span className="npe-thumb-video">VIDEO</span> : <img src={m.sizes?.thumbnail?.url || m.url} alt="" loading="lazy" />}
            <span>{m.alt || m.filename}</span>
          </button>
        ))}
      </div>
    </Modal>
  )
}
