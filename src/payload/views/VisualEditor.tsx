import type { AdminViewServerProps } from 'payload'
import { redirect } from 'next/navigation'
import { can, type Area } from '../access'
import { Editor } from '../editor/Editor'
import { editorSchema } from '../editor/schema'

/**
 * /admin/editor — the Shopify-style visual editor: sections on the left,
 * the real page in the middle (phone, tablet, desktop or full screen), and
 * the selected section's settings on the right. Saves drafts as you type;
 * Publish puts them live.
 */
export async function VisualEditorView({ initPageResult, searchParams }: AdminViewServerProps) {
  const { req } = initPageResult
  if (!req.user) redirect('/admin/login?redirect=%2Fadmin%2Feditor')
  const schema = editorSchema(req.payload.config as never)
  const kinds = schema.kinds
    .map((k) => ({ ...k, canEdit: can(req.user, k.area as Area, 'edit'), canPublish: can(req.user, k.area as Area, 'publish') }))
    .filter((k) => can(req.user, k.area as Area, 'view'))
  const sp = (searchParams ?? {}) as Record<string, string | undefined>
  return (
    <Editor
      schema={{ ...schema, kinds }}
      previewSecret={process.env.PREVIEW_SECRET || ''}
      initial={{ kind: sp.kind ?? 'pages', id: sp.id ?? null, lang: (['en', 'bn', 'hi'].includes(sp.lang ?? '') ? sp.lang : 'en') as 'en' | 'bn' | 'hi' }}
      canMedia={can(req.user, 'media', 'edit')}
      canSaveSections={can(req.user, 'design', 'edit')}
      userName={(req.user as { name?: string; email?: string }).name || (req.user as { email?: string }).email || ''}
    />
  )
}
