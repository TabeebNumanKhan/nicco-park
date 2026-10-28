import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'
import { fireWebhooks } from '../notify'

/**
 * After any published change, refresh every cached page so the site shows it
 * straight away. The site is small, so refreshing it all is simpler and safer
 * than tracking which pages use which document.
 */
async function refreshSite() {
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/', 'layout')
  } catch {
    // Outside a running Next.js server (seed script, CLI): nothing to refresh.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc, req, collection }) => {
  if (!req.context?.disableRevalidate && (doc?._status === undefined || doc._status === 'published')) {
    await refreshSite()
    if (collection.versions) void fireWebhooks(req.payload, 'content.published', { collection: collection.slug, id: doc.id, slug: doc.slug }).catch(() => {})
  }
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, req }) => {
  if (!req.context?.disableRevalidate) await refreshSite()
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc, req, collection }) => {
  if (!req.context?.disableRevalidate) await refreshSite()
  if (!req.context?.disableRevalidate && collection.slug !== 'webhooks') void fireWebhooks(req.payload, 'content.deleted', { collection: collection.slug, id: doc?.id, slug: doc?.slug }).catch(() => {})
  return doc
}
