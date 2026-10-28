'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Runs inside the visual editor's preview frame. Talks to the editor (same
 * origin only): re-renders after each save, outlines the section under the
 * pointer, and tells the editor which section was clicked.
 */
export function EditorBridge() {
  const router = useRouter()
  useEffect(() => {
    if (window.self === window.top) return
    const origin = window.location.origin
    let inspect = true
    let selected = -1
    let pendingScroll = false
    const hover = box('rgba(26,109,255,.9)', 2, true)
    const sel = box('#1a6dff', 3, false)
    const sections = () => Array.from(document.querySelectorAll<HTMLElement>('[data-np-section]')).filter((el) => !el.parentElement?.closest('[data-np-section]'))
    const find = (i: number) => sections().find((el) => Number(el.dataset.npSection) === i)
    const place = (b: ReturnType<typeof box>, el?: HTMLElement | null) => {
      if (!el) return b.hide()
      const r = el.getBoundingClientRect()
      if (!r.height) return b.hide()
      b.show(r, el.dataset.npType ?? '')
    }
    const redraw = () => place(sel, selected >= 0 ? find(selected) : null)
    // A section added in the editor only exists here after the next refresh, so keep trying.
    const reveal = () => {
      if (!pendingScroll) return
      const el = find(selected)
      if (!el) return
      pendingScroll = false
      const r = el.getBoundingClientRect()
      if (r.top < 0 || r.top > window.innerHeight * 0.6) el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
    }

    const onOver = (e: MouseEvent) => {
      if (!inspect) return hover.hide()
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-np-section]')
      place(hover, el && Number(el.dataset.npSection) !== selected ? el : null)
    }
    const onClick = (e: MouseEvent) => {
      if (!inspect) return
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-np-section]')
      if (!el) return
      e.preventDefault()
      e.stopPropagation()
      window.parent.postMessage({ type: 'np:select', index: Number(el.dataset.npSection), field: el.dataset.npField }, origin)
    }
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== origin || e.source !== window.parent) return
      const m = e.data as { type?: string; on?: boolean; index?: number; scroll?: boolean }
      if (m.type === 'np:refresh') router.refresh()
      if (m.type === 'np:inspect') {
        inspect = !!m.on
        if (!inspect) hover.hide()
      }
      if (m.type === 'np:select') {
        selected = typeof m.index === 'number' ? m.index : -1
        pendingScroll = !!m.scroll && selected >= 0
        reveal()
        redraw()
      }
    }
    document.addEventListener('mouseover', onOver)
    document.addEventListener('click', onClick, true)
    window.addEventListener('message', onMsg)
    window.addEventListener('scroll', redraw, { passive: true })
    window.addEventListener('resize', redraw)
    const mo = new MutationObserver(() => requestAnimationFrame(() => (reveal(), redraw())))
    mo.observe(document.body, { childList: true, subtree: true })
    window.parent.postMessage({ type: 'np:ready' }, origin)
    return () => {
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('message', onMsg)
      window.removeEventListener('scroll', redraw)
      window.removeEventListener('resize', redraw)
      mo.disconnect()
      hover.remove()
      sel.remove()
    }
  }, [router])
  return null
}

/** A fixed outline with a name tag, drawn over the page without touching its layout. */
function box(color: string, width: number, dashed: boolean) {
  const el = document.createElement('div')
  const tag = document.createElement('span')
  el.setAttribute('aria-hidden', 'true')
  Object.assign(el.style, { position: 'fixed', zIndex: '2147483646', pointerEvents: 'none', border: `${width}px ${dashed ? 'dashed' : 'solid'} ${color}`, borderRadius: '6px', display: 'none' })
  Object.assign(tag.style, { position: 'absolute', left: '-2px', top: '-24px', padding: '2px 8px', borderRadius: '6px 6px 6px 0', background: color, color: '#fff', font: '600 12px/18px system-ui,sans-serif', whiteSpace: 'nowrap' })
  el.appendChild(tag)
  document.body.appendChild(el)
  return {
    show(r: DOMRect, label: string) {
      Object.assign(el.style, { display: 'block', left: `${r.left}px`, top: `${Math.max(r.top, 0)}px`, width: `${r.width}px`, height: `${Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0)}px` })
      tag.textContent = label
      tag.style.top = r.top < 24 ? '0' : '-24px'
    },
    hide() {
      el.style.display = 'none'
    },
    remove() {
      el.remove()
    },
  }
}
