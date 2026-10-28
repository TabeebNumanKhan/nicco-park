import { Check, Lightbulb, Ticket } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Slideshow } from '@/components/cms/Slideshow'
import { ShareButtons } from '@/components/ui/ShareButtons'
import { VideoPlayer } from '@/components/cms/VideoPlayer'
import { PostCard, PostMeta } from '@/components/journal/PostCard'
import { Img } from '@/components/ui/Img'
import { SiteLink } from '@/components/ui/SiteLink'
import type { JournalBlock } from '@/content/journal'
import { isLang, LANGS, type Lang } from '@/i18n/config'
import type { T } from '@/i18n/translate'
import { getOffers, getPost, getPosts, getT, getTickets, isPreview } from '@/lib/cms'
import { inr } from '@/lib/format'
import { absUrl, alternates, jsonLd, SITE_URL } from '@/lib/seo'

type Props = { params: Promise<{ lang: string; slug: string }> }

export const dynamicParams = true

export async function generateStaticParams() {
  const posts = await getPosts()
  return LANGS.flatMap((lang) => posts.map((p) => ({ lang, slug: p.slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const l: Lang = isLang(lang) ? lang : 'en'
  const post = await getPost(slug, lang as Lang)
  if (!post) return {}
  const t = await getT(l)
  const path = `/journal/${post.slug}`
  return {
    title: t(post.title),
    description: t(post.excerpt),
    keywords: post.keywords,
    alternates: alternates(path, l),
    openGraph: {
      type: 'article',
      title: t(post.title),
      description: t(post.excerpt),
      url: absUrl(path, l),
      publishedTime: post.published,
      modifiedTime: post.updated ?? post.published,
      images: [{ url: SITE_URL + post.hero.url, width: post.hero.width, height: post.hero.height, alt: t(post.hero.alt) }],
    },
  }
}

type OfferLite = Awaited<ReturnType<typeof getOffers>>[number]

function Block({ b, t, offers }: { b: JournalBlock; t: T; offers: OfferLite[] }) {
  switch (b.type) {
    case 'h2':
      return (
        <h2 id={b.anchor ? b.anchor.replace(/^#/, '') : undefined} className="display mt-10 scroll-mt-32 text-[30px] leading-[0.98] [overflow-wrap:anywhere] md:text-[38px]">
          {t(b.text)}
        </h2>
      )
    case 'h3':
      return <h3 className="mt-7 text-[22px] leading-tight font-bold [overflow-wrap:anywhere] md:text-[24px]">{t(b.text)}</h3>
    case 'p':
      return <p className="mt-4 text-[18px] leading-[1.7] text-ink-2">{t(b.text)}</p>
    case 'list': {
      const List = b.style === 'numbered' ? 'ol' : 'ul'
      return (
        <List className="mt-4 flex list-none flex-col gap-2.5 p-0">
          {b.items.map((i, k) => (
            <li key={i + k} className="flex gap-3 text-[18px] leading-[1.55] text-ink-2">
              {b.style === 'numbered' ? (
                <span aria-hidden="true" className="grid size-7 flex-none place-items-center rounded-full bg-ink text-sm font-bold text-white">
                  {k + 1}
                </span>
              ) : b.style === 'bullet' ? (
                <span aria-hidden="true" className="mt-2.5 size-2 flex-none rounded-full bg-coral" />
              ) : (
                <Check size={20} strokeWidth={2.8} aria-hidden="true" className="mt-1 flex-none text-dry" />
              )}
              <span>{t(i)}</span>
            </li>
          ))}
        </List>
      )
    }
    case 'tip':
      return (
        <aside className="mt-6 flex gap-3 rounded-[20px] bg-yellow-soft p-4 md:p-5">
          <Lightbulb size={22} aria-hidden="true" className="mt-0.5 flex-none" />
          <p className="leading-relaxed">
            <strong>{t('Good to know')}: </strong>
            {t(b.text)}
          </p>
        </aside>
      )
    case 'quote':
      return (
        <blockquote className="mt-8 border-l-4 border-coral pl-5">
          <p className="text-[21px] leading-snug font-semibold">“{t(b.text)}”</p>
          {b.name && <footer className="mt-2 text-muted">— {b.name}</footer>}
        </blockquote>
      )
    case 'image':
      return (
        <figure className={'m-0 mt-6 ' + (b.size === 'right' ? 'sm:float-right sm:mb-3 sm:ml-6 sm:w-[46%]' : b.size === 'left' ? 'sm:float-left sm:mr-6 sm:mb-3 sm:w-[46%]' : '')}>
          {/* Shown at its real proportions, never stretched past its own width. */}
          <Img media={b.image} className="h-auto w-full rounded-[18px]" sizes="(min-width: 1024px) 680px, 92vw" />
          {b.caption && <figcaption className="mt-2 text-sm text-muted">{t(b.caption)}</figcaption>}
        </figure>
      )
    case 'gallery':
      return (
        <figure className="m-0 mt-6 clear-both">
          {b.style === 'slideshow' ? (
            <Slideshow slides={b.images.map((m, k) => ({ id: String(k), image: m }))} style="cards" seconds={0} label={b.caption ? t(b.caption) : t('Photos')} />
          ) : (
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {b.images.map((m, k) => (
                <div key={m.url + k} className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
                  <Img media={m} fill sizes="(min-width: 640px) 220px, 46vw" />
                </div>
              ))}
            </div>
          )}
          {b.caption && <figcaption className="mt-2 text-sm text-muted">{t(b.caption)}</figcaption>}
        </figure>
      )
    case 'video':
      return (
        <figure className="m-0 mt-6 clear-both">
          <div className="relative aspect-video overflow-hidden rounded-[18px]">
            <VideoPlayer source={b.source} url={b.url} file={b.file} poster={b.poster} title={b.caption ? t(b.caption) : t('Video')} />
          </div>
          {b.caption && <figcaption className="mt-2 text-sm text-muted">{t(b.caption)}</figcaption>}
        </figure>
      )
    case 'imageText':
      return (
        <div className={'mt-8 grid clear-both items-center gap-5 sm:grid-cols-2 ' + (b.side === 'right' ? '' : '')}>
          <div className={'relative aspect-[4/3] overflow-hidden rounded-[18px] ' + (b.side === 'right' ? 'sm:order-last' : '')}>
            <Img media={b.image} fill sizes="(min-width: 640px) 340px, 92vw" />
          </div>
          <div className="min-w-0">
            {b.heading && <h3 className="text-[22px] leading-tight font-bold">{t(b.heading)}</h3>}
            <p className="mt-2 text-[18px] leading-[1.65] text-ink-2">{t(b.text)}</p>
          </div>
        </div>
      )
    case 'offer': {
      const o = offers.find((x) => x.slug === b.offer)
      if (!o) return null
      return (
        <aside className="mt-8 clear-both flex flex-col gap-4 rounded-[22px] border-2 border-ink bg-cream p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
          <div className="min-w-0">
            <p className="eyebrow text-coral-ink">{t(o.tag)}</p>
            <p className="mt-1 text-xl font-bold">{t(o.name)}</p>
            <p className="font-semibold text-ink-2">{t(o.deal)}</p>
          </div>
          <SiteLink href={o.hasLanding ? `/offers/${o.slug}` : o.cta.href} className="inline-flex min-h-13 flex-none items-center justify-center gap-2 rounded-2xl bg-yellow px-6 text-center leading-tight font-bold text-ink">
            <Ticket size={18} aria-hidden="true" className="flex-none" />
            {t(o.cta.label)}
          </SiteLink>
        </aside>
      )
    }
    case 'divider':
      return <hr className="my-10 clear-both border-0 border-t-2 border-dashed border-line" />
    case 'cta':
      return (
        <div className="mt-8 clear-both flex flex-col gap-4 rounded-[22px] bg-ink p-5 text-white sm:flex-row sm:items-center sm:justify-between md:p-6">
          <p className="text-lg font-semibold">{t(b.text)}</p>
          <SiteLink href={b.href} className="inline-flex min-h-13 flex-none items-center justify-center gap-2 rounded-2xl bg-yellow px-6 text-center leading-tight font-bold text-ink">
            <Ticket size={18} aria-hidden="true" className="flex-none" />
            {t(b.label)}
          </SiteLink>
        </div>
      )
  }
}

export default async function PostPage({ params }: Props) {
  const { lang: l, slug } = await params
  const lang = l as Lang
  const post = await getPost(slug, lang as Lang)
  if (!post) notFound()
  const t = await getT(lang)
  const [all, tickets, offers, editing] = await Promise.all([getPosts(lang), getTickets(lang), getOffers(lang), isPreview()])
  const toc = post.body.filter((b): b is Extract<JournalBlock, { type: 'h2' }> => b.type === 'h2' && !!b.anchor)
  const related = [...all.filter((p) => p.slug !== post.slug && p.category === post.category), ...all.filter((p) => p.slug !== post.slug && p.category !== post.category)].slice(0, 3)
  const url = absUrl(`/journal/${post.slug}`, lang)

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: t(post.title),
      description: t(post.excerpt),
      inLanguage: lang,
      url,
      mainEntityOfPage: url,
      datePublished: post.published,
      dateModified: post.updated ?? post.published,
      image: SITE_URL + post.hero.url,
      keywords: post.keywords.join(', '),
      author: { '@type': 'Organization', name: 'Team Nicco Park', url: absUrl('/', lang) },
      publisher: { '@type': 'Organization', name: 'Nicco Park', logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.png` } },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faqs.map((f) => ({ '@type': 'Question', name: t(f.q), acceptedAnswer: { '@type': 'Answer', text: t(f.a) } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Nicco Park', item: absUrl('/', lang) },
        { '@type': 'ListItem', position: 2, name: 'Joyride Journal', item: absUrl('/journal', lang) },
        { '@type': 'ListItem', position: 3, name: t(post.title), item: url },
      ],
    },
  ]

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <div className="wrap pt-5 md:pt-8">
        <nav aria-label={t('Breadcrumb')} className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <SiteLink href="/" className="hover:underline">
                {t('Home')}
              </SiteLink>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <SiteLink href="/journal" className="font-semibold text-ink hover:underline">
                {t('Joyride Journal')}
              </SiteLink>
            </li>
          </ol>
        </nav>
      </div>

      <article>
        <header className="relative mt-4 overflow-hidden bg-cream md:mt-6">
          <div aria-hidden="true" className="dots pointer-events-none absolute inset-0 text-coral/10" />
          <div className="wrap relative grid items-center gap-6 py-7 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-10 md:py-12">
            <div>
              <p className="eyebrow text-coral-ink">{t(post.category)}</p>
              <h1 className="display mt-3 text-[clamp(38px,6.5vw,72px)] leading-[0.94] [font-stretch:82%]">{t(post.title)}</h1>
              <p className="mt-4 max-w-[640px] text-lg leading-relaxed text-ink-2 md:text-xl">{t(post.excerpt)}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                <span className="font-semibold text-ink">{t('By Team Nicco Park')}</span>
                <span aria-hidden="true">·</span>
                <PostMeta post={post} />
              </div>
              <ShareButtons title={t(post.title)} className="mt-5" />
            </div>
            {/* Shown near the photo's real size, so park photos stay sharp. */}
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[520px] overflow-hidden rounded-[24px] border-4 border-white shadow-[0_24px_50px_-24px_rgba(16,20,24,0.6)] md:rotate-1">
              <Img media={post.hero} fill priority sizes="(min-width: 768px) 520px, 92vw" />
            </div>
          </div>
        </header>

        <div className="wrap grid gap-10 pt-6 pb-12 md:pt-8 lg:grid-cols-[minmax(0,68ch)_340px] lg:justify-between lg:gap-12 lg:pb-20">
          <div className="min-w-0">
            {toc.length >= 2 && (
              <nav aria-labelledby="toc-h" className="mb-2 rounded-[18px] bg-ground p-4 md:p-5">
                <p id="toc-h" className="eyebrow text-muted">
                  {t('On this page')}
                </p>
                <ol className="mt-2 flex list-none flex-col gap-1.5 p-0">
                  {toc.map((h) => (
                    <li key={h.anchor}>
                      <a href={`#${h.anchor!.replace(/^#/, '')}`} className="font-semibold underline-offset-4 hover:underline">
                        {t(h.text)}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            {post.body.map((b, i) =>
              editing ? (
                // In the visual editor, each block can be outlined and clicked.
                <div key={i} className="relative" data-np-section={i} data-np-field="body" data-np-type={b.type}>
                  <Block b={b} t={t} offers={offers} />
                </div>
              ) : (
                <Block key={i} b={b} t={t} offers={offers} />
              ),
            )}
            <div className="clear-both" />

            <section aria-labelledby="pfaq-h" className="mt-12">
              <h2 id="pfaq-h" className="display text-[30px] md:text-[38px]">
                {t('Quick answers')}
              </h2>
              <div className="mt-4 flex flex-col gap-2.5">
                {post.faqs.map((f, i) => (
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
          </div>

          {/* Sticky "buy" card: the article earns attention, this turns it into a visit. */}
          <aside aria-labelledby="buy-h" className="lg:sticky lg:top-32 lg:self-start">
            <div className="overflow-hidden rounded-[24px] border-2 border-ink">
              <div className="bg-ink px-5 py-4 text-white">
                <p id="buy-h" className="display text-[28px]">
                  {t('Plan your visit')}
                </p>
                <p className="text-sm text-subtle">{t('Prices per person, incl. taxes')}</p>
              </div>
              <ul className="divide-y divide-line">
                {tickets.map((tk) => (
                  <li key={tk.id}>
                    <SiteLink href={`/book?ticket=${tk.id}`} className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-ground">
                      <span className="min-w-0">
                        <strong className="block">{t(tk.name)}</strong>
                        <span className="text-sm text-muted">{t(tk.summary)}</span>
                      </span>
                      <span className="flex-none text-lg font-bold">{inr(tk.price)}</span>
                    </SiteLink>
                  </li>
                ))}
              </ul>
              <div className="p-4">
                <SiteLink href="/book" className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-yellow font-bold text-ink">
                  <Ticket size={18} aria-hidden="true" />
                  {t('Buy tickets')}
                </SiteLink>
                <p className="mt-2.5 text-center text-sm text-muted">{t('Little ones under 80 cm go free')}</p>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="rel-h" className="bg-ground py-12 md:py-16">
          <div className="wrap">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <h2 id="rel-h" className="h2">
                {t('Keep reading')}
              </h2>
              <SiteLink href="/journal" className="font-bold underline">
                {t('All guides')} →
              </SiteLink>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
