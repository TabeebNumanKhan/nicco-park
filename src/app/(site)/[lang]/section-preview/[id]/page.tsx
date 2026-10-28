import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import type { LayoutBlock } from '@/blocks/types'
import type { Lang } from '@/i18n/config'
import { getSavedSection, isPreview } from '@/lib/cms'

type Props = { params: Promise<{ lang: string; id: string }> }

export const dynamicParams = true
export const metadata: Metadata = { title: 'Saved section', robots: { index: false, follow: false } }

/**
 * Where the visual editor previews a saved section on its own. Only works in
 * draft mode (signed-in staff); everyone else gets a 404. Left out of the
 * static export.
 */
export default async function SectionPreview({ params }: Props) {
  const { lang, id } = await params
  if (!(await isPreview())) notFound()
  const saved = await getSavedSection(id, lang as Lang)
  if (!saved) notFound()
  return (
    <>
      <h1 className="sr-only">Saved section</h1>
      <RenderBlocks blocks={(saved.layout ?? []) as LayoutBlock[]} lang={lang as Lang} source={`section:${id}`} />
    </>
  )
}
