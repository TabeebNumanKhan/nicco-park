import type { Metadata } from 'next'
import { JournalGrid } from '@/components/journal/JournalGrid'
import { PostCard } from '@/components/journal/PostCard'
import { SiteLink } from '@/components/ui/SiteLink'
import { journalCategories } from '@/content/journal'
import { isLang, type Lang } from '@/i18n/config'
import { getPosts, getSiteData, getT } from '@/lib/cms'
import { absUrl, alternates, jsonLd } from '@/lib/seo'
import { PageSections } from '@/blocks/PageSections'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const l: Lang = isLang(lang) ? lang : 'en'
  const t = await getT(l)
  const title = t('Joyride Journal: Nicco Park guides and tips')
  const description = t('Ticket prices, the best time to visit, Wet-O-Wild packing lists, school trips and bowling tips. Local guides to the best day out in Kolkata.')
  return { title, description, alternates: alternates('/journal', l), openGraph: { title, description, type: 'website', url: absUrl('/journal', l) } }
}

export default async function JournalPage({ params }: Props) {
  const lang = (await params).lang as Lang
  const t = await getT(lang)
  const [posts, site] = await Promise.all([getPosts(lang), getSiteData(lang)])
  const MIN_PRICE = site.minPrice
  const [featured, ...rest] = posts

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Joyride Journal',
    url: absUrl('/journal', lang),
    inLanguage: lang,
    publisher: { '@type': 'Organization', name: 'Nicco Park', url: absUrl('/', lang) },
    blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: t(p.title), url: absUrl(`/journal/${p.slug}`, lang), datePublished: p.published })),
  }

  return (
    <div className="bg-ground pb-16 md:pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <section aria-labelledby="j-h" className="relative overflow-hidden bg-ink text-white">
        {/* Ride-track doodle: decorative only. */}
        <svg aria-hidden="true" viewBox="0 0 1200 220" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-28 w-full text-yellow opacity-25 md:h-40">
          <path d="M0 180 C 150 40, 260 40, 360 150 S 560 250, 660 110 S 880 0, 980 120 S 1140 210, 1200 90" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="2 16" strokeLinecap="round" />
        </svg>
        <div className="wrap relative grid gap-6 pt-9 pb-12 md:grid-cols-[1.3fr_1fr] md:items-end md:pt-16 md:pb-20">
          <div>
            <p className="eyebrow text-yellow">{t('Guides · tips · stories')}</p>
            <h1 id="j-h" className="display mt-3 text-[clamp(52px,13vw,128px)] leading-[0.84] [font-stretch:76%]">
              Joyride
              <br />
              <span className="text-yellow">Journal</span>
            </h1>
          </div>
          <p className="max-w-[460px] text-lg leading-relaxed text-subtle md:text-xl">
            {t('Everything we know about the best day out in Kolkata, written by the people who run it. Plan smarter, queue less and ride more.')}
          </p>
        </div>
      </section>

      {featured && (
        <section aria-label={t('Latest guide')} className="wrap -mt-6 md:-mt-10">
          <PostCard post={featured} size="lg" headingLevel={2} />
        </section>
      )}

      <JournalGrid posts={rest} categories={journalCategories} />

      <section aria-labelledby="jcta-h" className="wrap pt-12 md:pt-16">
        <div className="grid items-center gap-5 rounded-[28px] bg-yellow p-6 md:grid-cols-[1.4fr_1fr] md:p-10">
          <div>
            <h2 id="jcta-h" className="display text-[36px] leading-[0.95] md:text-[52px]">
              {t('Done reading? Go riding.')}
            </h2>
            <p className="mt-2 text-lg">{t('Tickets from ₹{price}. Little ones under 80 cm go free.', { price: MIN_PRICE })}</p>
          </div>
          <SiteLink href="/book" className="flex min-h-15 items-center justify-center rounded-2xl bg-ink px-7 text-lg font-bold text-white">
            {t('Buy tickets')}
          </SiteLink>
        </div>
      </section>
      <PageSections slug="journal" lang={lang} />
    </div>
  )
}
