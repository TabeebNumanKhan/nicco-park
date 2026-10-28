import type { Metadata } from 'next'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import type { Lang } from '@/i18n/config'
import { getPage, getT } from '@/lib/cms'
import { parkSchema } from '@/lib/schema'
import { alternates, jsonLd, pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = (await params).lang as Lang
  const [t, page] = await Promise.all([getT(lang), getPage('home', lang)])
  return {
    alternates: alternates('/', lang),
    title: { absolute: page?.meta?.title || `Nicco Park — ${t('Ride. Splash. Strike.')}` },
    description: page?.meta?.description || t("Kolkata's biggest day out: the Dry Park, Wet-O-Wild water park, Super Bowl bowling and, soon, Snow Park. Book tickets online from ₹400."),
    ...pageMetadata(page?.meta),
  }
}

/**
 * The home page is the CMS page "home": a stack of sections (banner, ticker,
 * tickets, events…) that editors reorder and edit in Pages → Home.
 */
export default async function HomePage({ params }: Props) {
  const lang = (await params).lang as Lang
  const [page, t] = await Promise.all([getPage('home', lang), getT(lang)])
  const schema = await parkSchema(lang, t)
  return (
    <>
      {/* Who and what the park is, for Google, Gemini, ChatGPT, Meta AI. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <RenderBlocks blocks={page?.layout} lang={lang} source="page:home" />
    </>
  )
}
