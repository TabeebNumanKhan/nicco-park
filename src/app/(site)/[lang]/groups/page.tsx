import type { Metadata } from 'next'
import { Enquiry, OccasionTabs } from '@/components/groups/GroupsBoard'
import { Img } from '@/components/ui/Img'
import { media } from '@/content/media'
import { getOccasions, getVenues, getT } from '@/lib/cms'
import { isLang, type Lang } from '@/i18n/config'
import { alternates } from '@/lib/seo'
import { PageSections } from '@/blocks/PageSections'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const t = await getT(isLang(lang) ? lang : 'en')
  return {
    alternates: alternates('/groups', isLang(lang) ? lang : 'en'),
  title: t('Groups & events'),
  description: t('Office day-outs, school trips, birthdays, weddings and brand activations. Venues for 50 to 5,000 guests.'),
}
}

export default async function GroupsPage({ params }: Props) {
  const lang = (await params).lang as Lang
  const t = await getT(lang)
  const [occasions, venues] = await Promise.all([getOccasions(lang), getVenues(lang)])
  return (
    <>
      <section aria-labelledby="g-h" className="relative overflow-hidden bg-bowl-ink text-white">
        <div aria-hidden="true" className="absolute inset-0 scale-110 opacity-40 blur-2xl">
          <Img media={media('event2', '')} fill sizes="40vw" alt="" />
        </div>
        <div aria-hidden="true" className="dots pointer-events-none absolute inset-0 text-white/10" />
        <div className="wrap relative grid items-center gap-7 py-9 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:py-16">
          <div className="max-w-[620px]">
            <h1 id="g-h" className="display text-[clamp(48px,10vw,100px)] leading-[0.86] [font-stretch:78%]">
              {t("Bring the whole crew")}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/85 md:text-xl">
              {t("Office day-outs, school trips, birthdays, weddings and brand launches. Venues for 50 to 5,000 guests, with the rides, the food and the parking sorted.")}
            </p>
            <dl className="mt-7 grid grid-cols-3 gap-3">
              {[
                ['5,000', 'guests at the biggest events'],
                ['6', 'venues on one site'],
                ['1.5M', 'visitors a year for brand activations'],
              ].map(([v, l]) => (
                <div key={v}>
                  <dd className="display text-[34px] text-yellow md:text-[44px]">{v}</dd>
                  <dt className="mt-1 text-sm text-white/75">{t(l)}</dt>
                </div>
              ))}
            </dl>
            <a href="#enquire" className="mt-7 inline-flex min-h-14 items-center rounded-2xl bg-yellow px-6 font-bold text-ink">
              {t("Get a quote")}
            </a>
          </div>
          <div className="relative mx-auto aspect-[16/10] w-full max-w-[540px] overflow-hidden rounded-[24px] border-4 border-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] md:rotate-2">
            <Img media={media('event2', 'Evening event on the lawns')} fill priority sizes="(min-width: 768px) 540px, 92vw" />
          </div>
        </div>
      </section>

      <OccasionTabs occasions={occasions} />

      <section aria-labelledby="ven-h" className="wrap pt-12 md:pt-16">
        <h2 id="ven-h" className="h2 mb-5">
          {t("Venues")}
        </h2>
        <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-3">
          {venues.map((v) => (
            <article key={v.name} className="flex flex-col overflow-hidden rounded-[22px] border border-line sm:flex-row md:flex-col">
              <div className="relative h-44 flex-none sm:h-auto sm:w-48 md:h-48 md:w-auto">
                <Img media={v.image} fill sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" />
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-5">
                <h3 className="text-xl font-bold">{t(v.name)}</h3>
                <p className="leading-snug text-muted">{t(v.description)}</p>
                <p className="mt-auto pt-2 font-bold">{t(v.capacity)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Enquiry occasions={occasions} />
      <PageSections slug="groups" lang={lang} />
    </>
  )
}
