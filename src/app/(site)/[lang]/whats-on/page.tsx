import { CalendarDays, Clock, Music, PartyPopper, Ticket } from 'lucide-react'
import type { Metadata } from 'next'
import { YearCalendar } from '@/components/offers/OfferBoard'
import { Img } from '@/components/ui/Img'
import { SiteLink } from '@/components/ui/SiteLink'
import { isLang, type Lang } from '@/i18n/config'
import { getEvents, getOffers, getT } from '@/lib/cms'
import { alternates } from '@/lib/seo'
import { PageSections } from '@/blocks/PageSections'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const l: Lang = isLang(lang) ? lang : 'en'
  const t = await getT(l)
  return {
    alternates: alternates('/whats-on', l),
    title: t("What's on at Nicco Park"),
    description: t('Festivals, seasons and weekend nights at Nicco Park: Durga Puja Fun Express, Christmas and New Year, Summer Splash, Monsoon Masti and Super Bowl DJ nights.'),
  }
}

const TONE_BG = { alert: 'bg-coral', dry: 'bg-dry', wet: 'bg-wet', bowl: 'bg-bowl' } as const

export default async function WhatsOnPage({ params }: Props) {
  const lang = (await params).lang as Lang
  const t = await getT(lang)
  const [events, offers] = await Promise.all([getEvents(lang), getOffers(lang)])
  // Big-ticket moments first, the closure last; "every weekend" gets its own band.
  const weekly = events.find((e) => e.kind === 'weekly')
  // Soonest first, counted from the month the page was built (rebuilt on every content change).
  const now = new Date().getMonth()
  const until = (ms: number[]) => Math.min(...ms.map((m) => (m - now + 12) % 12))
  const seasonal = events.filter((e) => e !== weekly && e.kind !== 'closure').sort((a, b) => until(a.months) - until(b.months))
  const closure = events.find((e) => e.kind === 'closure')
  const live = offers.filter((o) => o.status === 'Live').slice(0, 3)

  return (
    <>
      <section aria-labelledby="wo-h" className="relative overflow-hidden bg-coral text-white">
        <div aria-hidden="true" className="dots pointer-events-none absolute inset-0 text-white/15" />
        <PartyPopper aria-hidden="true" strokeWidth={1} className="absolute -right-6 -bottom-8 size-56 text-white/15 md:right-[6%] md:size-80" />
        <div className="wrap relative py-10 md:py-16">
          <p className="eyebrow text-[#FFF0A0]">{t('Festivals · seasons · weekend nights')}</p>
          <h1 id="wo-h" className="display mt-3 text-[clamp(52px,12vw,120px)] leading-[0.86] [font-stretch:76%]">
            {t("What's on")}
          </h1>
          <p className="mt-4 max-w-[600px] text-lg leading-relaxed text-white/90 md:text-xl">
            {t('Every season brings something new to Nicco Park. Find your occasion, pick a date and walk in with one QR.')}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <SiteLink href="/book" className="inline-flex min-h-14 items-center gap-2.5 rounded-2xl bg-yellow px-6 text-[17px] font-bold text-ink shadow-[6px_6px_0_0_var(--ink)]">
              <Ticket size={20} aria-hidden="true" />
              {t('Buy tickets')}
            </SiteLink>
            <a href="#calendar" className="inline-flex min-h-14 items-center gap-2 rounded-2xl border-2 border-white px-5 font-bold hover:bg-white hover:text-coral-ink">
              <CalendarDays size={20} aria-hidden="true" />
              {t('Browse by month')}
            </a>
          </div>
        </div>
      </section>

      {/* Seasonal highlights, in calendar order */}
      <section aria-labelledby="season-h" className="bg-cream">
        <div className="wrap py-12 md:py-16">
          <h2 id="season-h" className="h2">
            {t('The big ones')}
          </h2>
          <p className="mt-2.5 mb-7 text-lg text-ink-2">{t('The days Kolkata plans around. Book early: these are our busiest dates.')}</p>
          <div className="rail -mx-4 px-4 md:mx-0 md:grid md:grid-flow-row md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-4">
            {seasonal.map((e, i) => (
              <article key={e.name} className={'flex flex-col overflow-hidden rounded-[24px] border-2 border-ink bg-white ' + (i === 0 ? 'md:col-span-2 md:shadow-[8px_8px_0_0_var(--coral)]' : '')}>
                <div className={'relative flex-none ' + (i === 0 ? 'h-[200px] md:h-[260px]' : 'h-[200px]')}>
                  {i === 0 && <span className="absolute top-3 right-3 z-10 rounded-full bg-yellow px-3 py-1 text-sm font-bold text-ink">{t('Next up')}</span>}
                  <Img media={e.image} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" alt="" />
                  <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold text-white ${TONE_BG[e.tone]}`}>
                    <CalendarDays size={14} aria-hidden="true" />
                    {t(e.when)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
                  <h3 className="text-[24px] leading-tight font-bold">
                    {e.hasLanding ? (
                      <SiteLink href={`/whats-on/${e.slug}`} className="hover:underline">
                        {t(e.name)}
                      </SiteLink>
                    ) : (
                      t(e.name)
                    )}
                  </h3>
                  <p className="mt-1.5 leading-snug text-muted">{t(e.blurb)}</p>
                  <div className="mt-auto flex flex-col gap-2 pt-4">
                    <SiteLink href="/book" className="flex min-h-13 items-center justify-center gap-2 rounded-xl bg-yellow px-4 font-bold text-ink hover:brightness-95">
                      <Ticket size={17} aria-hidden="true" />
                      {t('Book your date')}
                    </SiteLink>
                    {e.hasLanding && (
                      <SiteLink href={`/whats-on/${e.slug}`} className="text-center text-sm font-bold underline underline-offset-4">
                        {t('Event details')}
                      </SiteLink>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Every weekend */}
      {weekly && (
        <section aria-labelledby="wk-h" className="relative overflow-hidden bg-bowl text-white">
          <div aria-hidden="true" className="dots pointer-events-none absolute inset-0 text-white/10" />
          <div className="wrap relative grid items-center gap-6 py-12 md:grid-cols-2 md:py-16">
            <div className="relative h-[240px] overflow-hidden rounded-[24px] md:h-[340px]">
              <Img media={weekly.image} fill sizes="(min-width: 768px) 50vw, 100vw" alt="" />
            </div>
            <div>
              <p className="eyebrow inline-flex items-center gap-2 text-[#E2D3FF]">
                <Music size={16} aria-hidden="true" />
                {t(weekly.when)}
              </p>
              <h2 id="wk-h" className="display mt-2 text-[clamp(40px,7vw,72px)] leading-[0.9]">
                {t(weekly.name)}
              </h2>
              <p className="mt-3 text-lg text-white/90">{t(weekly.blurb)}</p>
              <p className="mt-3 inline-flex items-center gap-2 text-white/85">
                <Clock size={16} aria-hidden="true" />
                {t('Open 1–9 PM weekdays, till 10 PM weekends')}
              </p>
              <div className="mt-5">
                <SiteLink href={weekly.cta?.href ?? '/worlds/super-bowl#lane'} className="inline-flex min-h-14 items-center gap-2 rounded-2xl bg-yellow px-6 font-bold text-ink">
                  <Ticket size={18} aria-hidden="true" />
                  {t(weekly.cta?.label ?? 'Book a lane')}
                </SiteLink>
              </div>
            </div>
          </div>
        </section>
      )}

      <YearCalendar events={events} />

      {/* Offers that pair with an occasion */}
      <section aria-labelledby="pair-h" className="bg-ground">
        <div className="wrap py-12 md:py-16">
          <h2 id="pair-h" className="h2 mb-6">
            {t('Make it cheaper')}
          </h2>
          <div className="grid gap-3 md:grid-cols-3">
            {live.map((o) => (
              <SiteLink key={o.name} href={o.hasLanding ? `/offers/${o.slug}` : o.cta.href} className="flex flex-col gap-1.5 rounded-[22px] border-2 border-ink bg-white p-5 hover:bg-yellow-soft">
                <span className="eyebrow text-dry">{t(o.tag)}</span>
                <strong className="text-xl">{t(o.name)}</strong>
                <span className="font-bold">{t(o.deal)}</span>
                <span className="text-sm text-muted">{t(o.terms)}</span>
              </SiteLink>
            ))}
          </div>
          {closure && (
            <p className="mt-6 rounded-2xl bg-alert-soft px-4 py-3 font-semibold text-alert-ink">
              {t(closure.name)} ({t(closure.when)}). {t(closure.blurb)}
            </p>
          )}
        </div>
      </section>
      <PageSections slug="whats-on" lang={lang} />
    </>
  )
}
