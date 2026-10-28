'use client'

import { usePathname, useRouter } from 'next/navigation'
import { LANG_META, LANGS, type Lang } from '@/i18n/config'
import { useLang } from '@/i18n/LangProvider'
import { staticHref } from '../ui/SiteLink'
import { cleanPath } from './nav'

/** EN · বাংলা · हिन्दी — switches the whole site and stays on the same page. */
export function LangToggle({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const { lang } = useLang()
  const router = useRouter()
  const pathname = usePathname()

  const pick = (next: Lang) => {
    if (next === lang) return
    const rest = cleanPath(pathname)
    const target = `/${next}${rest === '/' ? '' : rest}${window.location.search}${window.location.hash}`
    try {
      localStorage.setItem('np-lang', next)
    } catch {}
    if (process.env.NEXT_PUBLIC_STATIC === '1') window.location.href = staticHref(target)
    else router.push(target, { scroll: false })
  }

  return (
    <div role="group" aria-label="Language / ভাষা / भाषा" className={'flex gap-0.5 rounded-full p-0.5 ' + (tone === 'dark' ? 'bg-white/10' : 'bg-ground')}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={lang === l}
          aria-label={LANG_META[l].name}
          onClick={() => pick(l)}
          className={
            'rounded-full px-2.5 py-1 text-[13px] leading-none transition ' +
            (lang === l
              ? 'bg-white font-bold text-ink shadow-sm'
              : tone === 'dark'
                ? 'font-semibold text-[#E6E9ED] hover:bg-white/10'
                : 'font-semibold text-ink-2 hover:bg-white')
          }
        >
          {LANG_META[l].label}
        </button>
      ))}
    </div>
  )
}
