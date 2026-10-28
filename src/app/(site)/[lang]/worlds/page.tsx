import WorldPage, { generateMetadata as worldMeta } from './[slug]/page'

/** /worlds shows the Dry Park, the first world. */
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return worldMeta({ params: Promise.resolve({ lang, slug: 'dry-park' }) })
}

export default async function WorldsIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return <WorldPage params={Promise.resolve({ lang, slug: 'dry-park' })} />
}
