'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { Eye, LogOut, PencilLine } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLang } from '@/i18n/LangProvider'
import { EditorBridge } from './EditorBridge'
import { useEditLink } from './useEditLink'

/**
 * Shown while an editor is previewing unpublished changes (draft mode).
 * Re-renders the page after each CMS save and autosave, which is what makes
 * the admin's live preview update as you type. Inside the admin's preview frame
 * only the refresher runs; the bar itself shows when the page is opened in
 * its own tab.
 */
export function PreviewBar() {
  const router = useRouter()
  const { t } = useLang()
  const [origin, setOrigin] = useState<string | null>(null)
  const [framed, setFramed] = useState(true)
  const edit = useEditLink(true)

  useEffect(() => {
    setOrigin(window.location.origin)
    setFramed(window.self !== window.top)
  }, [])

  // Drafts autosave while the editor types. Check every 1.5 s whether
  // anything in the CMS changed and, if so, re-render with the new content.
  useEffect(() => {
    let last = ''
    let busy = false
    const tick = async () => {
      if (busy || document.hidden) return
      busy = true
      try {
        const r = await fetch('/api/cms/stamp', { credentials: 'include', cache: 'no-store' })
        const { stamp } = (await r.json()) as { stamp?: string }
        if (stamp && last && stamp !== last) router.refresh()
        if (stamp) last = stamp
      } catch {}
      busy = false
    }
    void tick()
    const id = window.setInterval(tick, 1500)
    return () => window.clearInterval(id)
  }, [router])

  return (
    <>
      {origin && <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={origin} />}
      <EditorBridge />
      {!framed && (
        <div role="status" className="sticky top-0 z-50 bg-bowl text-white">
          <div className="wrap flex min-h-11 flex-wrap items-center justify-between gap-2 py-1.5 text-sm">
            <span className="inline-flex items-center gap-2 font-bold">
              <Eye size={16} aria-hidden="true" />
              {t('Preview: you are seeing unpublished changes.')}
            </span>
            <span className="flex gap-2">
              {edit && (
                <a href={edit.url} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-white/15 px-3 font-bold hover:bg-white/25">
                  <PencilLine size={15} aria-hidden="true" />
                  {t('Edit this page')}
                </a>
              )}
              <a
                href={`/next/exit-preview?path=${encodeURIComponent(typeof window === 'undefined' ? '/' : window.location.pathname)}`}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-yellow px-3 font-bold text-ink"
              >
                <LogOut size={15} aria-hidden="true" />
                {t('Exit preview')}
              </a>
            </span>
          </div>
        </div>
      )}
    </>
  )
}
