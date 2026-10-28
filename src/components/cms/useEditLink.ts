'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export type EditLink = { url: string; label: string; previewUrl: string }

/**
 * For signed-in CMS users: where to edit the page they're looking at.
 * Visitors never trigger the lookup — it only runs after someone has opened
 * the admin in this browser (the admin sets `np-staff`), or in preview.
 */
export function useEditLink(force = false) {
  const pathname = usePathname()
  const [link, setLink] = useState<EditLink | null>(null)
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_STATIC === '1') return
    let staff = force
    try {
      staff = staff || localStorage.getItem('np-staff') === '1'
    } catch {}
    if (!staff) return
    const ctrl = new AbortController()
    fetch(`/api/cms/edit-link?path=${encodeURIComponent(pathname)}`, { credentials: 'include', signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: EditLink | null) => setLink(d?.url ? d : null))
      .catch(() => {})
    return () => ctrl.abort()
  }, [pathname, force])
  return link
}
