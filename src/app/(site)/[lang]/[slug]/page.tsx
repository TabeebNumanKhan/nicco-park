import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LANGS, type Lang } from '@/i18n/config'
import { getPage, getPageSlugs } from '@/lib/cms'
import { alternates, pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ lang: string; slug: string }> }

/**
 * Any page built in the CMS (Pages → Add new), at /<lang>/<slug>.
 * Built-in pages such as /offers or /plan take precedence over this route;
 * a CMS page with one of those slugs adds its sections to that page instead.
 */
export async function generateStaticParams() {
  const slugs = (await getPageSlugs()).filter((s) => s !== 'home')
  return LANGS.flatMap((lang) => slugs.map((slug) => ({ lang, slug })))
}
export const dynamicParams = true

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const page = await getPage(slug, lang as Lang)
  if (!page) return {}
  return {
    alternates: alternates(`/${slug}`, lang as Lang),
    title: page.meta?.title || page.title,
    description: page.meta?.description || undefined,
    ...pageMetadata(page.meta),
  }
}

export default async function CmsPage({ params }: Props) {
  const { lang, slug } = await params
  if (slug === 'home') notFound()
  const page = await getPage(slug, lang as Lang)
  if (!page) notFound()
  const hasH1 = page.layout?.some((b) => b.blockType === 'hero')
  return (
    <>
      {!hasH1 && (
        <section className="bg-cream">
          <div className="wrap py-10 md:py-14">
            <h1 className="display text-[clamp(44px,9vw,96px)] leading-[0.9]">{page.title}</h1>
          </div>
        </section>
      )}
      <RenderBlocks blocks={page.layout} lang={lang as Lang} source={`page:${slug}`} />
    </>
  )
}
