'use client'

import { createContext, useContext, useEffect, useMemo } from 'react'
import type { Lang } from './config'
import { makeT, type T } from './translate'

const Ctx = createContext<{ lang: Lang; t: T }>({ lang: 'en', t: makeT('en') })

export function LangProvider({ lang, overrides, children }: { lang: Lang; overrides?: Record<string, string>; children: React.ReactNode }) {
  const value = useMemo(() => ({ lang, t: makeT(lang, overrides) }), [lang, overrides])
  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('np-lang', lang)
    } catch {}
  }, [lang])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)
