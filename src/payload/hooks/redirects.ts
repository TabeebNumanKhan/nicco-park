import type { CollectionBeforeChangeHook } from 'payload'

const LANGS = ['en', 'bn', 'hi']

/**
 * Like Shopify's "create a URL redirect" box: when a published page's web
 * address changes, old links (Google, WhatsApp shares, other sites) are sent
 * to the new address in all three languages. Only on publish, so autosaved
 * drafts typed letter by letter don't leave a trail of redirects.
 */
export const slugRedirect =
  (prefix: string): CollectionBeforeChangeHook =>
  async ({ data, req, operation, originalDoc, collection }) => {
    if (operation !== 'update' || data?._status === 'draft' || !data?.slug || !originalDoc?.id) return data
    let published: { slug?: string; _status?: string | null } | null = null
    try {
      published = (await req.payload.findByID({ collection: collection.slug as 'pages', id: originalDoc.id, draft: false, depth: 0, req, overrideAccess: true })) as unknown as { slug?: string; _status?: string | null }
    } catch {
      return data
    }
    const old = published?.slug
    if (!old || old === data.slug || old === 'home' || (published?._status && published._status !== 'published')) return data
    for (const lang of LANGS) {
      const from = `/${lang}${prefix}/${old}`
      const to = `/${lang}${prefix}/${data.slug}`
      // Never leave a redirect that points at itself or loops back.
      await req.payload.delete({ collection: 'redirects', where: { from: { in: [from, to] } }, req, overrideAccess: true, context: { disableRevalidate: true } })
      await req.payload.create({
        collection: 'redirects',
        data: { from, to, type: '301', note: `Automatic: ${collection.slug} renamed from "${old}"` },
        req,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
    }
    return data
  }
