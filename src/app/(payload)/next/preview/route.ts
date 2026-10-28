import config from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { getPayload, type PayloadRequest } from 'payload'

/**
 * Live preview entry point. The CMS opens /next/preview?path=/en/offers/x
 * inside its preview pane; a logged-in editor gets draft mode switched on and
 * lands on the real page showing unpublished changes as they type.
 */
export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path') || '/en'
  if (searchParams.get('previewSecret') !== (process.env.PREVIEW_SECRET || '')) return new Response('Not allowed', { status: 403 })
  if (!path.startsWith('/') || path.startsWith('//')) return new Response('Bad path', { status: 400 })

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ req: req as unknown as PayloadRequest, headers: req.headers })
  const draft = await draftMode()
  if (!user) {
    draft.disable()
    return new Response('Log in to the CMS to preview', { status: 403 })
  }
  draft.enable()
  redirect(path)
}
