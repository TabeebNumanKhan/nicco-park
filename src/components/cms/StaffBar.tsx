'use client'

import { Eye, PencilLine, X } from 'lucide-react'
import { useState } from 'react'
import { useLang } from '@/i18n/LangProvider'
import { useEditLink } from './useEditLink'

/**
 * A small floating "Edit this page" button for people signed in to the CMS.
 * One click opens the right document in the admin, where the live preview
 * shows changes as they type; "Preview drafts" shows unpublished edits here.
 */
export function StaffBar() {
  const { t } = useLang()
  const edit = useEditLink()
  const [hidden, setHidden] = useState(false)
  if (!edit || hidden) return null
  return (
    <div className="fixed left-3 bottom-24 z-50 flex items-center gap-1 rounded-2xl bg-ink p-1.5 text-sm text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)] md:bottom-5">
      <a href={edit.url} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-yellow px-3 font-bold text-ink">
        <PencilLine size={16} aria-hidden="true" />
        {t('Edit this page')}
      </a>
      <a href={edit.previewUrl} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl px-3 font-bold hover:bg-white/10">
        <Eye size={16} aria-hidden="true" />
        {t('Preview drafts')}
      </a>
      <button type="button" aria-label={t('Hide')} onClick={() => setHidden(true)} className="grid size-10 place-items-center rounded-xl hover:bg-white/10">
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  )
}
