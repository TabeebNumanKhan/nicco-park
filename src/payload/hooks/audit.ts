import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionBeforeChangeHook } from 'payload'
import { APIError } from 'payload'
import { can, type Area } from '../access'

const titleOf = (doc: Record<string, unknown>) =>
  String(doc?.title ?? doc?.name ?? doc?.label ?? doc?.handle ?? doc?.en ?? doc?.q ?? doc?.filename ?? doc?.id ?? '').slice(0, 80)

/** Records who changed what in the "Change log" collection. Autosaves are skipped. */
export const auditAfterChange: CollectionAfterChangeHook = async ({ doc, previousDoc, operation, req, collection }) => {
  if (!req.user || req.context?.skipAudit || collection.slug === 'audit-log') return doc
  const publishing = doc?._status === 'published' && previousDoc?._status !== 'published'
  if (operation === 'update' && doc?._status === 'draft' && !publishing) return doc // autosave noise
  const action = publishing ? 'publish' : operation
  try {
    await req.payload.create({
      collection: 'audit-log',
      overrideAccess: true,
      req,
      context: { skipAudit: true },
      data: {
        summary: `${action} ${collection.labels?.singular ?? collection.slug}: ${titleOf(doc)}`,
        action,
        collection: collection.slug,
        docId: String(doc.id),
        user: req.user.id,
      },
    })
  } catch (e) {
    req.payload.logger.warn({ err: e }, 'audit log write failed')
  }
  return doc
}

export const auditAfterDelete: CollectionAfterDeleteHook = async ({ doc, req, collection }) => {
  if (!req.user || collection.slug === 'audit-log') return doc
  try {
    await req.payload.create({
      collection: 'audit-log',
      overrideAccess: true,
      req,
      context: { skipAudit: true },
      data: { summary: `delete ${collection.slug}: ${titleOf(doc)}`, action: 'delete', collection: collection.slug, docId: String(doc.id), user: req.user.id },
    })
  } catch {}
  return doc
}

/** People who may edit but not publish in an area save drafts only. */
export const publishGuard: CollectionBeforeChangeHook = ({ data, req, collection }) => {
  const area = (collection.custom as { area?: Area } | undefined)?.area
  if (req.user && area && data?._status === 'published' && !can(req.user, area, 'publish')) {
    throw new APIError('Your role can save drafts here. Ask someone with publish rights to put it live.', 403, undefined, true)
  }
  return data
}
