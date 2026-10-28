'use client'

import { createContext, useContext } from 'react'
import type { SiteData } from './cms'

/**
 * The CMS data the browser needs on every page (settings, menus, prices).
 * Filled once by the language layout, read with `useSiteData()`.
 */
const Ctx = createContext<SiteData | null>(null)

export function SiteDataProvider({ value, children }: { value: SiteData; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useSiteData() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useSiteData must be used inside <SiteDataProvider>')
  return v
}
