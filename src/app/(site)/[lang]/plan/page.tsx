import { Car, CarTaxiFront, DoorOpen, Download, TrainFront } from 'lucide-react'
import type { Metadata } from 'next'
import { getFaqs, getFood, getRoutes, getSiteSettings, getTips, getT } from '@/lib/cms'
import { isLang, type Lang } from '@/i18n/config'
import { alternates } from '@/lib/seo'
import { PageSections } from '@/blocks/PageSections'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const t = await getT(isLang(lang) ? lang : 'en')
  return {
    alternates: alternates('/plan', isLang(lang) ? lang : 'en'),
  title: t('Plan your visit'),
  description: t("Today's timings and ride status, the park map, getting here, food and the FAQ."),
}
}

const HOUR_BAR = { dry: 'border-l-[#2BD17E]', wet: 'border-l-[#3FA2FF]', bowl: 'border-l-[#B78BFF]', neutral: 'border-l-yellow' } as const
const FOOD_BG = { yellow: 'bg-yellow-soft', wet: 'bg-wet-soft', neutral: 'bg-ground', bowl: 'bg-bowl-soft' } as const
const ROUTE_ICON = [TrainFront, Car, CarTaxiFront]

export default async function PlanPage({ params }: Props) {
  const lang = (await params).lang as Lang
  const t = await getT(lang)
  const [site, faqs, food, tips, routes] = await Promise.all([getSiteSettings(lang), getFaqs(lang), getFood(lang), getTips(lang), getRoutes(lang)])
  return (
    <>
      <section aria-labelledby="p-h" className="wrap pt-8 pb-6 md:pt-14">
        <h1 id="p-h" className="display text-[clamp(44px,10vw,104px)] leading-[0.88]">
          {t("Plan your visit")}
        </h1>
        <nav aria-label={t("On this page")} className="mt-5 flex flex-wrap gap-2">
          {[
            ['#status', "Today's status"],
            ['#map', 'Park map'],
            ['#reach', 'Getting here'],
            ['#food', 'Food & drink'],
            ['#rules', 'Good to know'],
            ['#faq', 'FAQ'],
          ].map(([h, l]) => (
            <a key={h} href={h} className="inline-flex min-h-11 items-center rounded-full bg-ground px-4 font-semibold hover:bg-line">
              {t(l)}
            </a>
          ))}
        </nav>
      </section>

      <section id="status" aria-labelledby="st-h" className="wrap scroll-mt-32 pt-4">
        <div className="grid gap-6 rounded-[24px] bg-ink p-5 text-white md:grid-cols-[1fr_1.4fr] md:rounded-[28px] md:p-9">
          <div>
            <p className="flex items-center gap-2 font-bold text-[#2BD17E]">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-[#2BD17E]" />
              {t("Open today")}
            </p>
            <h2 id="st-h" className="display mt-2 text-[34px] md:text-[48px]">
              {t("Today's timings & ride status")}
            </h2>
            <p className="mt-3 text-subtle">{t("Open every day except Dol Yatra. Re-entry isn't allowed.")}</p>
          </div>
          <dl className="grid gap-2.5 sm:grid-cols-2">
            {site.hours.map((h) => (
              <div key={h.label} className={`rounded-2xl border-l-4 bg-white/8 px-4 py-3 ${HOUR_BAR[h.tone ?? 'neutral']}`}>
                <dt className="text-[13px] text-subtle">{t(h.label)}</dt>
                <dd className="text-lg font-bold">{t(h.value)}</dd>
              </div>
            ))}
            {site.alerts.map((a) => (
              <div key={a.title} className="rounded-2xl border-l-4 border-l-alert bg-[#3A1A10] px-4 py-3">
                <dt className="text-[13px] text-[#F3B9A6]">{t("Closed for maintenance")}</dt>
                <dd className="text-lg font-bold">{t(a.title.replace(' closed today', ''))}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="map" aria-labelledby="map-h" className="wrap scroll-mt-32 pt-12 md:pt-16">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <h2 id="map-h" className="h2">
            {t("Find your way")}
          </h2>
          <a href="#map" className="inline-flex items-center gap-2 font-bold underline">
            <Download size={18} aria-hidden="true" />
            {t('Download the park map (PDF)')}
          </a>
        </div>
        <div
          role="img"
          aria-label={t("Simplified park map: main gate at the bottom, Dry Park in the centre, Wet-O-Wild on the left, Super Bowl and the planned Snow Park on the right, food court beside the gate, lake at the top")}
          className="grid grid-cols-2 gap-2.5 rounded-[24px] bg-[#E9EEE4] p-3 md:grid-cols-6 md:grid-rows-[70px_150px_110px_70px] md:gap-3 md:rounded-[28px] md:p-5"
        >
          <div className="col-span-2 grid min-h-14 place-items-center rounded-full bg-[#BFE0F5] font-bold text-wet-ink md:col-span-6">{t("Lake · Paddle boats")}</div>
          <div className="col-span-2 rounded-2xl bg-wet p-4 text-white md:col-span-2 md:row-span-2">
            <strong className="display block text-[26px] md:text-[30px]">{t("Wet-O-Wild")}</strong>
            <span className="text-sm">{t("Tornado Funnel · Thunder Bowl · Aqua Drop · Wave Pool · Pirates Bay · Beach Café")}</span>
          </div>
          <div className="col-span-2 rounded-2xl bg-dry p-4 text-white md:col-span-2 md:row-span-2">
            <strong className="display block text-[26px] md:text-[30px]">{t("Dry Park")}</strong>
            <span className="text-sm">{t("Cyclone · Sky Diver · Pirate Ship · Moon Racker · Eiffel Tower · MiG-21 · Children's Corner · Toy Train loop")}</span>
          </div>
          <div className="rounded-2xl bg-bowl p-4 text-white md:col-span-2">
            <strong className="display block text-[24px]">{t("Super Bowl")}</strong>
            <span className="text-sm">{t("Lanes · Pool · Bowlers' Den")}</span>
          </div>
          <div className="rounded-2xl border-2 border-dashed border-snow bg-snow-soft p-4 text-snow-ink md:col-span-2">
            <strong className="display block text-[24px]">{t("Snow Park")}</strong>
            <span className="text-sm">{t("Coming soon")}</span>
          </div>
          <div className="grid min-h-14 place-items-center rounded-2xl bg-yellow p-2 text-center font-bold md:col-span-3">{t("Food court · Burger Corner")}</div>
          <div className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-ink font-bold text-white md:col-span-3">
            <DoorOpen size={18} aria-hidden="true" />
            {t("Main gate")}
          </div>
        </div>
        <p className="mt-2 text-sm text-muted">{t("Illustrative layout for the demo, not the real map.")}</p>
      </section>

      <section id="reach" aria-labelledby="re-h" className="wrap scroll-mt-32 pt-12 md:pt-16">
        <h2 id="re-h" className="h2 mb-5">
          {t("Getting here")}
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          {routes.map((r, i) => {
            const Icon = ROUTE_ICON[i] ?? Car
            return (
              <div key={r.title} className="rounded-[22px] border border-line p-5 md:p-6">
                <Icon size={26} aria-hidden="true" className="mb-3 text-dry" />
                <strong className="block text-xl">{t(r.title)}</strong>
                <span className="mt-1.5 block leading-relaxed text-muted">{t(r.body)}</span>
              </div>
            )
          })}
        </div>
      </section>

      <section id="food" aria-labelledby="fo-h" className="wrap scroll-mt-32 pt-12 md:pt-16">
        <h2 id="fo-h" className="h2 mb-5">
          {t('Food & drink')}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {food.map((f) => (
            <div key={f.name} className={`rounded-[22px] p-5 ${FOOD_BG[f.tone]}`}>
              <strong className="block text-xl">{t(f.name)}</strong>
              <span className="text-sm text-muted">{t(f.where)}</span>
              <p className="mt-2.5 leading-snug">{t(f.blurb)}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="rules" aria-labelledby="ru-h" className="wrap scroll-mt-32 pt-12 md:pt-16">
        <h2 id="ru-h" className="h2 mb-5">
          {t("Good to know")}
        </h2>
        <ul className="grid border-t-2 border-ink md:grid-cols-2 md:gap-x-8">
          {tips.map((tip) => (
            <li key={tip.title} className="border-b border-line py-4">
              <strong className="block text-lg">{t(tip.title)}</strong>
              <span className="text-muted">{t(tip.body)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="faq" aria-labelledby="fq-h" className="wrap grid scroll-mt-32 gap-6 pt-12 pb-16 md:grid-cols-[1fr_1.6fr] md:pt-16 md:pb-24">
        <div>
          <h2 id="fq-h" className="h2">
            {t("Questions")}
          </h2>
          <p className="mt-3 text-lg text-muted">
            {t('Still stuck? WhatsApp us or call')}{' '}
            <a href={`tel:${site.phone.tel}`} className="font-bold text-wet underline">
              {site.phone.display}
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          {faqs.map((f, i) => (
            <details key={f.q} open={i === 0} className="group rounded-[18px] border border-line bg-white">
              <summary className="flex min-h-15 cursor-pointer list-none items-center justify-between gap-3 px-5 py-3.5 text-[17px] font-bold [&::-webkit-details-marker]:hidden">
                {t(f.q)}
                <span aria-hidden="true" className="text-2xl leading-none font-medium transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-ink-2">{t(f.a)}</p>
            </details>
          ))}
        </div>
      </section>
      <PageSections slug="plan" lang={lang} />
    </>
  )
}
