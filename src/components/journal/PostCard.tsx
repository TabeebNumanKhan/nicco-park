'use client'

import type { JournalPost } from '@/content/journal'
import { useLang } from '@/i18n/LangProvider'
import { dateYearL } from '@/i18n/translate'
import { fromISODate } from '@/lib/format'
import { Img } from '../ui/Img'
import { SiteLink } from '../ui/SiteLink'

export const CATEGORY_TONE: Record<JournalPost['category'], string> = {
  'Plan your day': 'bg-dry text-white',
  'Tickets & offers': 'bg-yellow text-ink',
  Families: 'bg-wet text-white',
  'Schools & groups': 'bg-ink text-white',
  'Super Bowl': 'bg-bowl text-white',
}

export function PostMeta({ post, className = '' }: { post: JournalPost; className?: string }) {
  const { lang, t } = useLang()
  return (
    <p className={'text-sm ' + className}>
      <time dateTime={post.published}>{dateYearL(lang, fromISODate(post.published))}</time>
      <span aria-hidden="true"> · </span>
      {t('{n} min read', { n: post.readMins })}
    </p>
  )
}

export function PostCard({ post, size = 'md', headingLevel = 3 }: { post: JournalPost; size?: 'md' | 'lg'; headingLevel?: 2 | 3 }) {
  const { t } = useLang()
  const H = `h${headingLevel}` as 'h2' | 'h3'
  const lg = size === 'lg'
  return (
    <article className={'group relative flex flex-col overflow-hidden rounded-[24px] border border-line bg-white ' + (lg ? 'md:grid md:grid-cols-[1.25fr_1fr]' : '')}>
      <div className={'relative overflow-hidden ' + (lg ? 'h-56 md:h-auto md:min-h-[380px]' : 'h-48 md:h-52')}>
        <Img
          media={post.hero}
          fill
          sizes={lg ? '(min-width: 768px) 55vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
          className="transition duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
        />
        <span className={'absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold ' + CATEGORY_TONE[post.category]}>{t(post.category)}</span>
      </div>
      <div className={'flex flex-1 flex-col gap-2 ' + (lg ? 'p-5 md:justify-center md:p-9' : 'p-5')}>
        <H className={lg ? 'display text-[30px] leading-[0.98] md:text-[44px]' : 'text-[21px] leading-snug font-bold'}>
          {/* The whole card is clickable through this link's ::after overlay. */}
          <SiteLink href={`/journal/${post.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {t(post.title)}
          </SiteLink>
        </H>
        <p className={'text-ink-2 ' + (lg ? 'text-lg leading-relaxed' : 'leading-snug')}>{t(post.excerpt)}</p>
        <PostMeta post={post} className="mt-auto pt-2 text-muted" />
        {lg && (
          <span aria-hidden="true" className="mt-3 inline-flex min-h-12 items-center self-start rounded-2xl bg-ink px-5 font-bold text-white">
            {t('Read the guide')} →
          </span>
        )}
      </div>
    </article>
  )
}
