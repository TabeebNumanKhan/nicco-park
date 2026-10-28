/**
 * Renderers for the sections that show the park's own data (tickets, events,
 * worlds, numbers, moments, guides). The CMS block sets the headings, colour
 * and which items to show; the items themselves come from their collections.
 */
import { ArrowRight, Ban, CalendarDays, Check, ShieldCheck, Snowflake, Sparkles, Star, Ticket, TriangleAlert, Upload } from 'lucide-react'
import { CrewPlanner } from '@/components/home/CrewPlanner'
import { PostCard } from '@/components/journal/PostCard'
import { WhatsappIcon } from '@/components/ui/icons'
import { Img } from '@/components/ui/Img'
import { SiteLink } from '@/components/ui/SiteLink'
import type { Lang } from '@/i18n/config'
import type { T } from '@/i18n/translate'
import { getCrews, getEvents, getMoments, getPosts, getSiteSettings, getTickets, getWorlds, whatsappHref } from '@/lib/cms'
import { inr } from '@/lib/format'
import { section } from './tone'
import type { BlockOf } from './types'

/** One field from each chosen document in a relationship (populated) field, e.g. the ticket codes. */
export function pick(v: unknown, key: string): string[] {
  if (!Array.isArray(v)) return []
  return v.map((x) => (typeof x === 'object' && x ? String((x as Record<string, unknown>)[key] ?? '') : '')).filter(Boolean)
}

function Head({ eyebrow, heading, intro, id, tone, link }: { eyebrow?: string | null; heading?: string | null; intro?: string | null; id: string; tone: ReturnType<typeof section>; link?: React.ReactNode }) {
  if (!eyebrow && !heading && !intro && !link) return null
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && <p className={`eyebrow ${tone.eyebrow}`}>{eyebrow}</p>}
        {heading && (
          <h2 id={id} className="h2 mt-1">
            {heading}
          </h2>
        )}
        {intro && <p className={`mt-2.5 text-lg md:text-[19px] ${tone.muted}`}>{intro}</p>}
      </div>
      {link}
    </div>
  )
}

const Dots = ({ cls }: { cls?: string }) => (cls ? <div aria-hidden="true" className={`dots pointer-events-none absolute inset-0 ${cls}`} /> : null)

/* ------------------------------------------------------------------ */

export function TickerSection({ block, t }: { block: BlockOf<'ticker'>; t: T }) {
  const items = (block.items ?? []).filter((x) => x.label)
  if (!items.length) return null
  const tone = section(block.tone, 'yellow')
  return (
    <section aria-label={t('Deals live today')} className={`mt-6 overflow-hidden border-y-2 border-ink md:mt-8 ${tone.bg}`}>
      <div className="marquee py-3">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex flex-none items-center">
            {items.map((x) => (
              <li key={x.id ?? x.label} className="flex items-center">
                <SiteLink href={x.href || '/offers'} tabIndex={copy === 1 ? -1 : undefined} className="px-5 text-[15px] font-bold whitespace-nowrap hover:underline md:text-base">
                  {t(x.label)}
                </SiteLink>
                <Sparkles size={16} aria-hidden="true" className="flex-none" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}

const TICKET_BAND: Record<string, string> = { dry: 'bg-dry text-white', meal: 'bg-coral text-white', pkg: 'bg-ink text-yellow' }

export async function TicketCardsSection({ block, lang, t, id }: { block: BlockOf<'ticketCards'>; lang: Lang; t: T; id: string }) {
  const all = await getTickets(lang)
  const want = pick(block.tickets, 'code')
  const chosen = want.length ? all.filter((tk) => want.includes(tk.id)) : all
  const shown = chosen.length ? chosen : all
  const tone = section(block.tone, 'cream')
  return (
    <section aria-labelledby={id} className={`${tone.bg} [--notch:var(--cream)]`}>
      <div className="wrap pt-12 pb-14 md:pt-16 md:pb-20">
        <Head
          id={id}
          tone={tone}
          eyebrow={block.eyebrow && t(block.eyebrow)}
          heading={block.heading && t(block.heading)}
          intro={block.intro && t(block.intro)}
          link={
            <SiteLink href="/offers" className="inline-flex items-center gap-1.5 font-bold underline">
              {t('All offers')} <ArrowRight size={16} aria-hidden="true" />
            </SiteLink>
          }
        />
        {/* Phones and tablets swipe; three columns only once there is room for the big prices. */}
        <div className="rail -mx-4 px-4 pt-3 md:[grid-auto-columns:46%] lg:mx-0 lg:grid lg:grid-flow-row lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0">
          {shown.map((x) => (
            <article
              key={x.id}
              className={'relative flex flex-col overflow-hidden rounded-[24px] border-2 border-ink text-ink ' + (x.popular ? 'bg-yellow shadow-[8px_8px_0_0_var(--ink)] lg:-translate-y-2' : 'bg-white')}
            >
              <div className={`flex min-h-14 items-center justify-between gap-2 px-6 py-3 ${TICKET_BAND[x.id] ?? 'bg-ink text-white'}`}>
                <h3 className="text-lg leading-tight font-bold">{t(x.name)}</h3>
                {x.popular && <span className="flex-none rounded-full bg-yellow px-2.5 py-0.5 text-xs font-bold whitespace-nowrap text-ink">{t('Most popular')}</span>}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="display text-[52px] leading-none md:text-[60px]">{inr(x.price)}</p>
                  {x.studentPrice && <span className="text-sm font-semibold text-ink-2">{t('Students {price}', { price: inr(x.studentPrice) })}</span>}
                </div>
                {/* The perforation: notches sit on the dashed line, wherever it falls. */}
                <div className={'relative border-t-2 border-dashed pt-4 ' + (x.popular ? 'border-ink' : 'border-[#C9CFD6]')}>
                  <span aria-hidden="true" className="ticket-notch -top-3.5 -left-[38px] border-r-2 border-ink" />
                  <span aria-hidden="true" className="ticket-notch -top-3.5 -right-[38px] border-l-2 border-ink" />
                  <ul className="flex flex-col gap-2">
                    {x.includes.map((inc) => (
                      <li key={inc} className="flex gap-2 leading-snug">
                        <Check size={18} strokeWidth={2.8} aria-hidden="true" className={'mt-0.5 flex-none ' + (x.popular ? 'text-ink' : 'text-dry')} />
                        {t(inc)}
                      </li>
                    ))}
                  </ul>
                </div>
                <SiteLink
                  href={`/book?ticket=${x.id}`}
                  className={'mt-auto flex min-h-14 items-center justify-center gap-2 rounded-2xl px-4 text-center leading-tight font-bold transition ' + (x.popular ? 'bg-ink text-white hover:bg-black' : 'bg-yellow text-ink hover:brightness-95')}
                >
                  <Ticket size={18} aria-hidden="true" className="flex-none" />
                  {t('Buy {name}', { name: t(x.shortName) })}
                </SiteLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const EVENT_TONE = { alert: 'bg-coral text-white', dry: 'bg-dry text-white', wet: 'bg-wet text-white', bowl: 'bg-bowl text-white' } as const

export async function EventsRailSection({ block, lang, t, id }: { block: BlockOf<'eventsRail'>; lang: Lang; t: T; id: string }) {
  const all = await getEvents(lang)
  const want = pick(block.events, 'slug')
  const events = want.length ? want.map((s) => all.find((e) => e.slug === s)).filter((e) => !!e) : all.filter((e) => e.highlight)
  if (!events.length) return null
  const tone = section(block.tone, 'wet')
  return (
    <section aria-labelledby={id} className={`relative overflow-hidden ${tone.bg}`}>
      <Dots cls={tone.dots} />
      <div className="wrap relative py-12 md:py-16">
        <Head
          id={id}
          tone={tone}
          eyebrow={block.eyebrow && t(block.eyebrow)}
          heading={block.heading && t(block.heading)}
          intro={block.intro && t(block.intro)}
          link={
            <SiteLink
              href="/whats-on"
              className={'inline-flex min-h-12 items-center gap-2 rounded-2xl border-2 px-5 font-bold ' + (tone.dark ? 'border-white hover:bg-white hover:text-wet' : 'border-ink hover:bg-ink hover:text-white')}
            >
              <CalendarDays size={18} aria-hidden="true" />
              {t('Full calendar')}
            </SiteLink>
          }
        />
        <div className="rail -mx-4 px-4 md:mx-0 md:grid md:grid-flow-row md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-4">
          {events.map((e) => (
            <article key={e.slug} className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white text-ink shadow-[0_20px_40px_-24px_rgba(0,0,0,0.5)]">
              <div className="relative h-[180px] flex-none md:h-[200px]">
                <Img media={e.image} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 82vw" alt="" />
                <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold ${EVENT_TONE[e.tone]}`}>{t(e.when)}</span>
              </div>
              <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
                <h3 className="text-[22px] leading-tight font-bold">
                  {e.hasLanding ? (
                    <SiteLink href={`/whats-on/${e.slug}`} className="hover:underline">
                      {t(e.name)}
                    </SiteLink>
                  ) : (
                    t(e.name)
                  )}
                </h3>
                <p className="mt-1.5 line-clamp-3 leading-snug text-muted">{t(e.blurb)}</p>
                {e.cta && (
                  <div className="mt-auto pt-4">
                    <SiteLink href={e.cta.href} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-yellow px-4 font-bold text-ink hover:brightness-95">
                      <Ticket size={16} aria-hidden="true" />
                      {t(e.cta.label)}
                    </SiteLink>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const WORLD_BG = { dry: 'bg-dry', wet: 'bg-wet', bowl: 'bg-bowl', snow: 'bg-snow-soft' } as const
const WORLD_SUB = { dry: 'text-[#BFF0D2]', wet: 'text-[#CDE6FF]', bowl: 'text-[#E2D3FF]', snow: 'text-snow' } as const

export async function WorldsGridSection({ block, lang, t, id }: { block: BlockOf<'worldsGrid'>; lang: Lang; t: T; id: string }) {
  const worlds = await getWorlds(lang)
  return (
    <section aria-labelledby={id} className="py-12 md:py-18">
      <div className="wrap">
        <Head
          id={id}
          tone={section('white')}
          eyebrow={block.eyebrow && t(block.eyebrow)}
          heading={block.heading && t(block.heading)}
          link={
            <SiteLink href="/worlds/dry-park" className="inline-flex items-center gap-1.5 font-bold underline">
              {t('Compare the worlds')} <ArrowRight size={16} aria-hidden="true" />
            </SiteLink>
          }
        />
      </div>
      <div className="wrap">
        <div className="rail -mx-4 px-4 md:mx-0 md:grid md:grid-flow-row md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-4">
          {worlds.map((w) => (
            <SiteLink
              key={w.key}
              href={`/worlds/${w.slug}`}
              className={`group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[24px] md:min-h-[480px] md:rounded-[28px] ${WORLD_BG[w.key]} ${w.key === 'snow' ? 'text-snow-ink' : 'text-white'}`}
            >
              {w.card.image ? (
                <div className="absolute inset-x-0 top-0 h-[58%] overflow-hidden">
                  <Img media={w.card.image} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 82vw" alt="" className="transition duration-500 group-hover:scale-105 motion-reduce:transition-none" />
                </div>
              ) : (
                <Snowflake aria-hidden="true" strokeWidth={1.1} className="absolute top-6 right-6 size-32 text-snow md:size-36" />
              )}
              <div className={`relative flex flex-col gap-2 p-5 md:p-6 ${w.key === 'snow' ? '' : WORLD_BG[w.key]}`}>
                {w.comingSoon && <span className="eyebrow self-start rounded-full bg-snow px-2.5 py-1 text-white">{t('Coming soon')}</span>}
                <span className={`eyebrow ${WORLD_SUB[w.key]}`}>{t(w.kicker.replace(' · Coming soon', ' · Snow park'))}</span>
                <h3 className="display text-[36px] md:text-[40px]">{t(w.name)}</h3>
                <p className="leading-snug opacity-90">{t(w.card.blurb)}</p>
                <span className="mt-1.5 inline-flex items-center gap-1.5 font-bold">
                  {t(w.card.priceLine)} <ArrowRight size={18} aria-hidden="true" className="transition group-hover:translate-x-1 motion-reduce:transition-none" />
                </span>
              </div>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  )
}

const TRUST_ICON = { shield: ShieldCheck, star: Star, ban: Ban }

export async function StatsSection({ block, lang, t, id }: { block: BlockOf<'stats'>; lang: Lang; t: T; id: string }) {
  const site = await getSiteSettings(lang)
  const stats = block.items?.length ? block.items.map((s) => ({ value: s.value ?? '', label: s.label ?? '' })) : site.stats
  const tone = section(block.tone, 'dry')
  return (
    <section aria-labelledby={id} className={`relative overflow-hidden ${tone.bg}`}>
      <Dots cls={tone.dots} />
      <div className="wrap relative py-12 md:py-16">
        {block.heading && (
          <h2 id={id} className="h2 mb-7 max-w-[760px]">
            {t(block.heading)}
          </h2>
        )}
        <dl className={'grid grid-cols-2 gap-x-6 border-t-2 md:grid-cols-3 lg:grid-cols-5 ' + (tone.dark ? 'border-white/40' : 'border-ink/30')}>
          {stats.map((s, i) => (
            <div key={s.value + i} className={'border-b py-4 md:py-5 ' + (tone.dark ? 'border-white/20 ' : 'border-ink/15 ') + (i === stats.length - 1 && stats.length % 2 ? 'col-span-2 md:col-span-1' : '')}>
              <dd className={'display text-[44px] md:text-[64px] ' + (tone.dark ? 'text-yellow' : 'text-coral-ink')}>{t(s.value)}</dd>
              <dt className={'mt-2 ' + tone.muted}>{t(s.label)}</dt>
            </div>
          ))}
        </dl>
        {block.showTrust !== false && (
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {site.trust.map((x) => {
              const Icon = TRUST_ICON[x.icon] ?? ShieldCheck
              return (
                <li key={x.label} className={'inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold ' + (tone.dark ? 'bg-white/12' : 'bg-ink/6')}>
                  <Icon size={16} aria-hidden="true" className={x.icon === 'star' ? 'fill-yellow text-yellow' : tone.dark ? 'text-yellow' : 'text-coral-ink'} />
                  {t(x.label)}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}

export async function CrewPlannerSection({ block, lang, t }: { block: BlockOf<'crewPlanner'>; lang: Lang; t: T }) {
  const all = await getCrews(lang)
  const want = pick(block.crews, 'code')
  const crews = want.length ? all.filter((c) => want.includes(c.id)) : all
  if (!crews.length) return null
  return <CrewPlanner crews={crews} heading={block.heading ? t(block.heading) : undefined} intro={block.intro ? t(block.intro) : undefined} />
}

export async function MomentsWallSection({ block, lang, t, id }: { block: BlockOf<'momentsWall'>; lang: Lang; t: T; id: string }) {
  const ugc = (await getMoments(lang)).slice(0, block.count ?? 8)
  const heading = block.heading ?? '#NiccoMoments'
  return (
    <section aria-labelledby={id} className="bg-ink text-white">
      <div className="wrap py-12 md:py-20">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h2 id={id} className="display text-[clamp(34px,11vw,44px)] [overflow-wrap:anywhere] md:text-[64px]">
              {heading === '#NiccoMoments' ? (
                <>
                  #Nicco<span className="text-yellow">Moments</span>
                </>
              ) : (
                t(heading)
              )}
            </h2>
            {block.intro && <p className="mt-3 max-w-[560px] text-lg text-subtle md:text-[19px]">{t(block.intro)}</p>}
          </div>
          <SiteLink href="/moments#share" className="inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-yellow px-6 font-bold text-ink sm:w-auto">
            <Upload size={20} aria-hidden="true" />
            {t('Share your moment')}
          </SiteLink>
        </div>
        <div className="columns-2 gap-2.5 md:columns-4 md:gap-3">
          {ugc.map((u) => (
            <figure key={u.handle} className={'group relative m-0 mb-2.5 break-inside-avoid overflow-hidden rounded-[18px] md:mb-3 md:rounded-[20px] ' + (u.tall ? 'h-[270px] md:h-[340px]' : 'h-[150px] md:h-[200px]')}>
              <Img media={u.image} fill sizes="(min-width: 768px) 25vw, 50vw" alt={t(u.caption)} className="transition duration-500 group-hover:scale-105 motion-reduce:transition-none" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-ink/85 to-transparent p-2.5 pt-8 md:p-3">
                <span className="min-w-0 text-[13px] leading-tight">
                  <strong className="block truncate">{u.handle}</strong>
                  {t(u.ride)}
                </span>
                <SiteLink href="/book" className="hidden flex-none rounded-full bg-yellow px-3 py-1.5 text-[13px] font-bold text-ink md:inline-block">
                  {t('Book this')}
                </SiteLink>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3.5 border-t border-white/15 pt-5">
          <p className="text-[17px]">
            <strong className="text-yellow">{t('Moment of the month')}</strong> {t('wins a free family day out. Tag #NiccoMoments or upload here.')}
          </p>
          <SiteLink href="/moments" className="font-bold underline">
            {t('See all moments')}
          </SiteLink>
        </div>
      </div>
    </section>
  )
}

export async function TodayStatusSection({ block, lang, t, id }: { block: BlockOf<'todayStatus'>; lang: Lang; t: T; id: string }) {
  const site = await getSiteSettings(lang)
  const h = (i: number) => site.hours[i]?.value ?? ''
  return (
    <section aria-labelledby={id} className={'wrap grid gap-4 py-12 md:py-16 ' + (block.showWhatsapp !== false ? 'md:grid-cols-[2fr_1fr]' : '')}>
      <div className="rounded-[24px] border-2 border-ink p-5 md:rounded-[28px] md:p-8">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2.5">
          <h2 id={id} className="display text-[34px] md:text-[40px]">
            {t(block.heading || 'Today at the park')}
          </h2>
          <span className="inline-flex items-center gap-2 font-bold text-dry">
            <span aria-hidden="true" className="size-2.5 animate-pulse rounded-full bg-[#20B464] motion-reduce:animate-none" />
            {t('Open now')}
          </span>
        </div>
        <dl className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: 'Gates', v: h(0), c: 'bg-cream', x: 'text-muted' },
            { k: 'Rides', v: h(1), c: 'bg-mint', x: 'text-dry-ink' },
            { k: 'Wet-O-Wild entry', v: '11:00 AM – 5:00 PM', c: 'bg-wet-soft', x: 'text-wet-ink' },
            { k: 'Super Bowl', v: h(3), c: 'bg-bowl-soft', x: 'text-bowl-ink' },
          ].map((row) => (
            <div key={row.k} className={`rounded-2xl px-4 py-3.5 ${row.c}`}>
              <dt className={`text-[13px] ${row.x}`}>{t(row.k)}</dt>
              <dd className="mt-0.5 font-bold">{row.v}</dd>
            </div>
          ))}
        </dl>
        {site.alerts.map((a) => (
          <p key={a.title} className="mt-4 flex items-center gap-2.5 rounded-2xl bg-alert-soft px-4 py-3 font-semibold text-alert-ink">
            <TriangleAlert size={18} aria-hidden="true" className="flex-none" />
            {t(a.detail)}
          </p>
        ))}
        <SiteLink href="/book" className="mt-4 inline-flex min-h-13 items-center gap-2 rounded-2xl bg-yellow px-6 font-bold">
          <Ticket size={18} aria-hidden="true" />
          {t('Book for tomorrow or later')}
        </SiteLink>
      </div>
      {block.showWhatsapp !== false && (
        <div className="flex flex-col gap-3.5 rounded-[24px] bg-dry-soft p-5 md:rounded-[28px] md:p-8">
          <span aria-hidden="true" className="grid size-13 place-items-center rounded-2xl bg-wa text-white">
            <WhatsappIcon size={28} />
          </span>
          <h2 className="display text-[32px] md:text-[36px]">{t('Book on WhatsApp')}</h2>
          <p className="text-[17px] leading-relaxed">{t('Buy tickets, change a date or ask anything, in English, বাংলা or हिन्दी. Your QR ticket arrives in the same chat.')}</p>
          <a href={whatsappHref(site)} className="mt-auto inline-flex min-h-14 items-center justify-center rounded-2xl bg-wa-ink font-bold text-white">
            {t('Chat with Nicco Park')}
          </a>
        </div>
      )}
    </section>
  )
}

export async function JournalTeaserSection({ block, lang, t, id }: { block: BlockOf<'journalTeaser'>; lang: Lang; t: T; id: string }) {
  const posts = (await getPosts(lang)).slice(0, block.count ?? 3)
  if (!posts.length) return null
  const tone = section(block.tone, 'cream')
  return (
    <section aria-labelledby={id} className={tone.bg}>
      <div className="wrap py-12 md:py-16">
        <Head
          id={id}
          tone={tone}
          eyebrow={block.eyebrow && t(block.eyebrow)}
          heading={block.heading && t(block.heading)}
          link={
            <SiteLink href="/journal" className="inline-flex items-center gap-1.5 font-bold underline">
              {t('All guides')} <ArrowRight size={16} aria-hidden="true" />
            </SiteLink>
          }
        />
        <div className="rail -mx-4 px-4 md:mx-0 md:grid md:grid-flow-row md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
