import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

/** Leaves preview mode and returns to the published page. */
export async function GET(req: NextRequest) {
  ;(await draftMode()).disable()
  const to = new URL(req.url).searchParams.get('path') || '/en'
  redirect(to.startsWith('/') && !to.startsWith('//') ? to : '/en')
}
