import type { Metadata } from 'next'
import { heroProps } from '@/blocks/RenderBlocks'
import type { BlockOf } from '@/blocks/types'
import { Hero, HERO_STYLES } from '@/components/hero/Hero'
import type { Lang } from '@/i18n/config'
import { getPage, getT } from '@/lib/cms'

type Props = { params: Promise<{ lang: string }> }

export const metadata: Metadata = { title: 'Home banner styles', robots: { index: false, follow: false } }

/**
 * Internal gallery (not in menus or the sitemap): the home page's real slides
 * shown in every banner style, so the team can choose one. To switch: CMS →
 * Pages → Home → Hero banner → Style.
 */
export default async function HeroOptionsPage({ params }: Props) {
  const lang = (await params).lang as Lang
  const [t, page] = await Promise.all([getT(lang), getPage('home', lang)])
  const hero = page?.layout?.find((b): b is BlockOf<'hero'> => b.blockType === 'hero')
  const base = hero ? heroProps(hero) : null
  return (
    <>
      <section className="bg-cream">
        <div className="wrap py-10 md:py-14">
          <p className="eyebrow text-coral-ink">{t('For the Nicco Park team')}</p>
          <h1 className="display mt-2 text-[clamp(40px,8vw,84px)] leading-[0.9]">{t('Home banner styles')}</h1>
          <p className="mt-4 max-w-[720px] text-lg text-ink-2">
            {t('The same slides from the CMS, in every style. To switch the live home page: CMS → Pages → Home → Hero banner → Style, then Publish.')}
          </p>
          <nav aria-label={t('Styles')} className="mt-6 flex flex-wrap gap-2">
            {HERO_STYLES.map((s, i) => (
              <a key={s.id} href={`#style-${s.id}`} className="inline-flex min-h-11 items-center rounded-full border-2 border-ink bg-white px-4 font-bold hover:bg-yellow">
                {i + 1}. {t(s.name)}
              </a>
            ))}
          </nav>
        </div>
      </section>
      {base &&
        HERO_STYLES.map((s, i) => (
          <div key={s.id} id={`style-${s.id}`} className="scroll-mt-24">
            <div className="border-y-2 border-ink bg-yellow">
              <div className="wrap flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                <h2 className="text-xl font-bold">
                  {i + 1}. {t(s.name)}
                  {base.style === s.id && <span className="ml-2 rounded-full bg-ink px-2.5 py-0.5 align-middle text-xs text-white">{t('Live now')}</span>}
                </h2>
                <p className="max-w-[760px] text-ink-2">{t(s.note)}</p>
              </div>
            </div>
            <Hero {...base} style={s.id} showBookingBox={s.id === 'ticket'} />
            <div className="h-10 bg-ground" />
          </div>
        ))}
    </>
  )
}
