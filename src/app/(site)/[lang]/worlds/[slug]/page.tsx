import { Snowflake } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Img } from '@/components/ui/Img'
import { SiteLink } from '@/components/ui/SiteLink'
import { LaneBooker } from '@/components/worlds/LaneBooker'
import { RideGrid } from '@/components/worlds/RideGrid'
import { Waitlist } from '@/components/worlds/Waitlist'
import type { WorldKey, WorldSlug } from '@/content/types'
import { isLang, LANGS, type Lang } from '@/i18n/config'
import { getBowlRates, getRides, getSnowPlans, getWorld, getWorlds, getT } from '@/lib/cms'
import { alternates } from '@/lib/seo'
import { RenderBlocks } from '@/blocks/RenderBlocks'

const THEME: Record<WorldKey, { bar: string; ink: string; tint: string; color: string; chip: string }> = {
  dry: { bar: 'bg-dry', ink: 'text-dry', tint: '#E5F3EA', color: '#0E7C3A', chip: 'bg-dry' },
  wet: { bar: 'bg-wet', ink: 'text-wet', tint: '#E3EFFB', color: '#0067C5', chip: 'bg-wet' },
  bowl: { bar: 'bg-bowl', ink: 'text-bowl', tint: '#EFE7FC', color: '#6D28D9', chip: 'bg-bowl' },
  snow: { bar: 'bg-snow', ink: 'text-snow', tint: '#DDEEFF', color: '#2F5DCC', chip: 'bg-snow' },
}

export async function generateStaticParams() {
  const worlds = await getWorlds()
  return LANGS.flatMap((lang) => worlds.map((w) => ({ lang, slug: w.slug })))
}

type Params = Promise<{ lang: string; slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params
  const t = await getT(isLang(lang) ? lang : 'en')
  const world = await getWorld(slug as WorldSlug, lang as Lang)
  return world ? { title: t(world.name), description: t(world.lede), alternates: alternates(`/worlds/${world.slug}`, isLang(lang) ? lang : 'en') } : {}
}

export default async function WorldPage({ params }: { params: Params }) {
  const { lang, slug } = await params
  const t = await getT(lang as Lang)
  const world = await getWorld(slug as WorldSlug, lang as Lang)
  if (!world) notFound()
  const [all, rides, rates, plans] = await Promise.all([getWorlds(lang as Lang), getRides(world.key, lang as Lang), getBowlRates(lang as Lang), getSnowPlans()])
  const th = THEME[world.key]

  return (
    <>
      <div className={th.bar}>
        <div className="wrap pt-3.5 md:pt-5">
          <nav aria-label={t("Choose a world")} className="scroll-x gap-1.5">
            {all.map((w) => {
              const on = w.slug === world.slug
              return (
                <SiteLink
                  key={w.slug}
                  href={`/worlds/${w.slug}`}
                  aria-current={on ? 'page' : undefined}
                  className={
                    'inline-flex min-h-12 items-center gap-2 rounded-t-2xl px-4 text-[15px] md:min-h-13 md:px-5.5 md:text-base ' +
                    (on ? 'bg-white font-bold text-ink' : 'bg-white/15 font-semibold text-white hover:bg-white/25')
                  }
                >
                  {on && <span aria-hidden="true" className={`size-2.5 rounded-full ${THEME[w.key].bar}`} />}
                  {t(w.name)}
                  {w.comingSoon && <span className="text-xs opacity-80">{t("· soon")}</span>}
                </SiteLink>
              )
            })}
          </nav>
        </div>
      </div>

      <div style={{ background: th.tint }}>
      <section aria-labelledby="w-h" className="wrap grid items-stretch gap-6 pt-7 pb-8 md:grid-cols-2 md:gap-10 md:pt-11 md:pb-12">
        <div className="flex flex-col justify-center gap-4">
          <p className={`eyebrow ${th.ink}`}>{t(world.kicker)}</p>
          <h1 id="w-h" className="display text-[clamp(48px,11vw,112px)] leading-[0.86] [font-stretch:78%]">
            {t(world.name)}
          </h1>
          <p className="max-w-[560px] text-lg leading-relaxed text-ink-2 md:text-xl">{t(world.lede)}</p>
          <div className="mt-1.5 flex flex-wrap gap-2.5">
            <SiteLink href={world.cta.href} className="inline-flex min-h-14 items-center rounded-2xl bg-yellow px-6 font-bold text-ink">
              {t(world.cta.label)}
            </SiteLink>
            <SiteLink href="/plan" className="inline-flex min-h-14 items-center rounded-2xl border-2 border-ink px-5 font-bold">
              {t('Timings & map')}
            </SiteLink>
          </div>
        </div>
        {world.hero ? (
          <div className="relative min-h-[240px] overflow-hidden rounded-[24px] border-4 border-white shadow-[0_24px_50px_-24px_rgba(16,20,24,0.5)] md:min-h-[400px] md:rounded-[32px]">
            <Img media={world.hero} fill priority sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        ) : (
          <div aria-hidden="true" className="relative flex min-h-[240px] items-center justify-center overflow-hidden rounded-[24px] bg-snow-soft text-snow md:min-h-[440px] md:rounded-[32px]">
            <Snowflake strokeWidth={0.9} className="size-40 md:size-64" />
            <span className="display absolute bottom-6 left-7 text-[36px] md:text-[44px]">{t("Coming soon")}</span>
          </div>
        )}
      </section>
      </div>

      <section aria-label={t("Key facts")} className="wrap pt-6 md:pt-8">
        <dl className="grid grid-cols-2 border-t-2 border-ink lg:grid-cols-4">
          {world.facts.map((f) => (
            <div key={f.k} className="border-b border-line py-3.5 pr-3 md:py-4.5">
              <dt className="text-sm text-muted">{t(f.k)}</dt>
              <dd className="mt-1 text-[17px] font-bold md:text-xl">{t(f.v)}</dd>
            </div>
          ))}
        </dl>
      </section>

      {rides.length > 0 && (
        <section aria-labelledby="rides-h" className="wrap pt-12 md:pt-16">
          <h2 id="rides-h" className="h2 mb-4">
            {t(world.ridesTitle)}
          </h2>
          <RideGrid rides={rides} tint={th.tint} color={th.color} />
        </section>
      )}

      {world.key === 'bowl' && (
        <section aria-labelledby="rate-h" className="wrap grid gap-4 pt-12 md:grid-cols-2 md:pt-16">
          <div className="rounded-[24px] bg-ink p-5 text-white md:rounded-[28px] md:p-8">
            <h2 id="rate-h" className="display mb-4 text-[32px] md:text-[44px]">
              {t("Rate card")}
            </h2>
            <table className="w-full border-collapse text-[16px] md:text-[17px]">
              <caption className="sr-only">{t("Super Bowl prices")}</caption>
              <tbody>
                {rates.map((r) => (
                  <tr key={r.item} className="border-t border-white/15">
                    <th scope="row" className="py-3.5 pr-3 text-left font-medium">
                      {t(r.item)}
                    </th>
                    <td className="text-right font-bold">{r.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <LaneBooker />
        </section>
      )}

      {world.key === 'snow' && (
        <section aria-labelledby="sn-h" className="wrap grid gap-4 pt-12 md:grid-cols-[1.4fr_1fr] md:pt-16">
          <div className="rounded-[24px] bg-snow-soft p-5 text-snow-ink md:rounded-[28px] md:p-8">
            <h2 id="sn-h" className="display mb-4 text-[32px] md:text-[44px]">
              {t("What we're planning")}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {plans.map((p) => (
                <div key={p.title} className="rounded-2xl bg-white p-4">
                  <strong className="block text-lg">{t(p.title)}</strong>
                  <span>{t(p.body)}</span>
                </div>
              ))}
            </div>
          </div>
          <Waitlist />
        </section>
      )}

      <section aria-labelledby="x-h" className="wrap pt-12 pb-16 md:pt-16 md:pb-24">
        <h2 id="x-h" className="h2 mb-5">
          {t("Make it a bigger day")}
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          {all
            .filter((w) => w.slug !== world.slug)
            .map((w) => (
              <SiteLink key={w.slug} href={`/worlds/${w.slug}`} className="flex items-center gap-4 rounded-[20px] p-4 md:p-5" style={{ background: THEME[w.key].tint }}>
                <span aria-hidden="true" className={`relative size-16 flex-none overflow-hidden rounded-2xl ${THEME[w.key].bar}`}>
                  {w.card.image ? <Img media={w.card.image} fill sizes="64px" alt="" /> : w.key === 'snow' ? <Snowflake size={28} className="absolute inset-0 m-auto text-white" /> : null}
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block text-lg">{t(w.name)}</strong>
                  <span className="text-sm text-ink-2">{t(w.pitch)}</span>
                </span>
                <span aria-hidden="true" className="text-xl">
                  →
                </span>
              </SiteLink>
            ))}
        </div>
      </section>
      <RenderBlocks blocks={world.layout} lang={lang as Lang} source={`world:${world.slug}`} />
    </>
  )
}
