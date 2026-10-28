import { BadgeCheck } from 'lucide-react'
import type { Metadata } from 'next'
import { OfferList } from '@/components/offers/OfferBoard'
import { SiteLink } from '@/components/ui/SiteLink'
import { getOffers, getTickets, getT } from '@/lib/cms'
import { inr } from '@/lib/format'
import { isLang, type Lang } from '@/i18n/config'
import { alternates } from '@/lib/seo'
import { PageSections } from '@/blocks/PageSections'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const t = await getT(isLang(lang) ? lang : 'en')
  return {
    alternates: alternates('/offers', isLang(lang) ? lang : 'en'),
  title: t("Tickets, offers & what's on"),
  description: t('Three simple tickets from ₹400, live offers for students, families and government staff, and a year of events at Nicco Park.'),
}
}

export default async function OffersPage({ params }: Props) {
  const lang = (await params).lang as Lang
  const t = await getT(lang)
  const [tickets, offers] = await Promise.all([getTickets(lang), getOffers(lang)])
  return (
    <>
      <section aria-labelledby="o-h" className="bg-yellow">
        <div className="wrap flex flex-wrap items-end justify-between gap-6 py-9 md:py-14">
          <div className="max-w-[640px]">
            <h1 id="o-h" className="display text-[clamp(48px,11vw,104px)] leading-[0.86] [font-stretch:78%]">
              {t('Tickets & offers')}
            </h1>
            <p className="mt-4 text-lg leading-relaxed md:text-xl">
              {t("Three simple tickets, offers that are actually live, and the best price on any channel. Prices include taxes.")}
            </p>
          </div>
          <SiteLink href="/book" className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-ink px-7 font-bold text-white sm:w-auto">
            {t("Pick a date")}
          </SiteLink>
        </div>
      </section>

      <section aria-labelledby="m-h" className="wrap pt-12 md:pt-16">
        <h2 id="m-h" className="h2 mb-5">
          {t("Prices at a glance")}
        </h2>
        {/* Table from tablet up; one card per ticket on phones. */}
        <div className="hidden overflow-hidden rounded-[22px] border-2 border-ink md:block">
          <table className="w-full border-collapse text-[17px]">
            <caption className="sr-only">{t("Ticket prices per person by visitor type")}</caption>
            <thead>
              <tr className="bg-ink text-left text-white">
                <th scope="col" className="px-5 py-4">{t("Per person")}</th>
                <th scope="col" className="px-5 py-4">{t("Standard")}</th>
                <th scope="col" className="px-5 py-4">
                  {t("Student")} <span className="font-normal text-subtle">{t("· college ID")}</span>
                </th>
                <th scope="col" className="px-5 py-4">
                  {t("Fun Fest")} <span className="font-normal text-subtle">{t("· limited dates")}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((tk) => (
                <tr key={tk.id} className={'border-t border-line ' + (tk.popular ? 'bg-yellow-soft' : '')}>
                  <th scope="row" className="px-5 py-4.5 text-left">
                    <strong className="block">{t(tk.name)}</strong>
                    <span className="text-sm font-normal text-muted">{t(tk.summary)}</span>
                  </th>
                  <td className="px-5 py-4.5 font-bold">{inr(tk.price)}</td>
                  <td className={'px-5 py-4.5 ' + (tk.studentPrice ? 'font-bold text-dry' : 'text-muted')}>{tk.studentPrice ? inr(tk.studentPrice) : '—'}</td>
                  <td className={'px-5 py-4.5 ' + (tk.funFestPrice ? 'font-bold text-dry' : 'text-muted')}>{tk.funFestPrice ? inr(tk.funFestPrice) : '—'}</td>
                </tr>
              ))}
              <tr className="border-t border-line">
                <th scope="row" className="px-5 py-4.5 text-left">
                  <strong className="block">{t("Little ones")}</strong>
                  <span className="text-sm font-normal text-muted">{t("Under 80 cm tall")}</span>
                </th>
                <td colSpan={3} className="px-5 py-4.5 font-bold text-dry">
                  {t("Free on every ticket")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grid gap-2.5 md:hidden">
          {tickets.map((tk) => (
            <div key={tk.id} className={'rounded-[18px] border p-4 ' + (tk.popular ? 'border-2 border-ink bg-yellow-soft' : 'border-line')}>
              <strong className="block text-lg">{t(tk.name)}</strong>
              <span className="text-sm text-muted">{t(tk.summary)}</span>
              <dl className="mt-3 grid grid-cols-3 gap-2">
                {[
                  ['Standard', tk.price],
                  ['Student', tk.studentPrice],
                  ['Fun Fest', tk.funFestPrice],
                ].map(([k, v]) => (
                  <div key={k as string}>
                    <dt className="text-xs text-muted">{t(k as string)}</dt>
                    <dd className={'font-bold ' + (v && k !== 'Standard' ? 'text-dry' : '')}>{v ? inr(v as number) : '—'}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
          <div className="rounded-[18px] border border-line p-4">
            <strong className="block text-lg">{t("Little ones")}</strong>
            <span className="text-sm text-muted">{t("Under 80 cm tall")}</span>
            <p className="mt-2 font-bold text-dry">{t("Free on every ticket")}</p>
          </div>
        </div>
        <p className="mt-4 flex items-center gap-2.5 rounded-2xl bg-dry-soft px-4 py-3.5 font-semibold text-dry-ink">
          <BadgeCheck size={20} aria-hidden="true" className="flex-none" />
          {t("Best price promise: you'll never find a Nicco ticket cheaper anywhere else.")}
        </p>
      </section>

      <OfferList offers={offers} />
      <section aria-label={t("What's on")} className="wrap pt-6 pb-16 md:pb-24">
        <SiteLink href="/whats-on" className="flex flex-wrap items-center justify-between gap-4 rounded-[24px] bg-coral p-6 text-white md:p-8">
          <span>
            <strong className="display block text-[32px] md:text-[44px]">{t('Planning around an occasion?')}</strong>
            <span className="text-lg text-white/90">{t('Durga Puja, Christmas, Summer Splash and weekend nights: see the calendar.')}</span>
          </span>
          <span className="inline-flex min-h-13 items-center rounded-2xl bg-yellow px-6 font-bold text-ink">{t("See what's on")} →</span>
        </SiteLink>
      </section>
      <PageSections slug="offers" lang={lang} />
    </>
  )
}
