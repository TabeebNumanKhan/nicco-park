'use client'

import { useEffect } from 'react'

/** Remembers that this browser belongs to CMS staff, so the website shows "Edit this page". */
export function StaffFlag() {
  useEffect(() => {
    try {
      localStorage.setItem('np-staff', '1')
    } catch {}
  }, [])
  return null
}
