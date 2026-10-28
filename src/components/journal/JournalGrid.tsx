'use client'

import { useState } from 'react'
import type { JournalCategory, JournalPost } from '@/content/journal'
import { useLang } from '@/i18n/LangProvider'
import { useSiteData } from '@/lib/site-data'
import { PostCard } from './PostCard'

/** Every post is in the server HTML; the chips only hide cards once JS runs. */
export function JournalGrid({ posts, categories }: { posts: JournalPost[]; categories: JournalCategory[] }) {
  const { t } = useLang()
  const { whatsapp } = useSiteData()
  const [cat, setCat] = useState<'all' | JournalCategory>('all')
  const used = categories.filter((c) => posts.some((p) => p.category === c))
  const shown = cat === 'all' ? posts : posts.filter((p) => p.category === cat)
  return (
    <section aria-labelledby="all-h" className="wrap pt-12 md:pt-16">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <h2 id="all-h" className="h2">
          {t('All guides')}
        </h2>
        <div role="group" aria-label={t('Filter guides')} className="scroll-x -mx-4 w-[calc(100%+32px)] gap-1.5 px-4 sm:mx-0 sm:w-auto sm:flex-wrap sm:px-0">
          {(['all', ...used] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={'min-h-11 flex-none rounded-full px-4 ' + (cat === c ? 'bg-ink font-bold text-white' : 'border border-[#C9CFD6] bg-white font-semibold')}
            >
              {c === 'all' ? t('All') : t(c)}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
        {cat === 'all' && (
          <a href={whatsapp} className="flex min-h-[280px] flex-col justify-between gap-4 rounded-[24px] bg-yellow p-6 sm:col-span-2 lg:col-span-1">
            <span className="eyebrow">{t('Your turn')}</span>
            <span className="display text-[34px] leading-[0.95]">{t('What should we write about next?')}</span>
            <span className="leading-snug">{t('Ask us anything about your visit on WhatsApp. The best questions become the next guide.')}</span>
            <span className="inline-flex min-h-12 items-center self-start rounded-2xl bg-ink px-5 font-bold text-white">{t('Ask on WhatsApp')} →</span>
          </a>
        )}
      </div>
    </section>
  )
}
