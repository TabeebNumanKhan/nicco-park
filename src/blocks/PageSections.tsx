import type { Lang } from '@/i18n/config'
import { getPage } from '@/lib/cms'
import { RenderBlocks } from './RenderBlocks'

/**
 * Extra sections for a built-in page (offers, plan, groups…): create a CMS
 * page with the same web address (e.g. "plan") and its sections appear at
 * the bottom of that page. Lets marketing add a banner, FAQ or sign-up form
 * anywhere without a developer.
 */
export async function PageSections({ slug, lang }: { slug: string; lang: Lang }) {
  const page = await getPage(slug, lang)
  if (!page?.layout?.length) return null
  return <RenderBlocks blocks={page.layout.filter((b) => b.blockType !== 'hero')} lang={lang} source={`page:${slug}`} />
}
