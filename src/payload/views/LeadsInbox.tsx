import type { AdminViewServerProps } from 'payload'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import { redirect } from 'next/navigation'
import { can } from '../access'
import { LeadsTable } from '../leads/LeadsTable'

/**
 * /admin/leads — every enquiry and sign-up from the website, newest first,
 * grouped by day. Filter, change status, add notes, export to Excel.
 * Leads live in the operations database, not the CMS.
 */
export async function LeadsInbox({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { req, permissions, visibleEntities, locale } = initPageResult
  if (!req.user) redirect('/admin/login?redirect=%2Fadmin%2Fleads')
  const allowed = can(req.user, 'leads', 'view')
  return (
    <DefaultTemplate
      i18n={req.i18n}
      locale={locale}
      params={params}
      payload={req.payload}
      permissions={permissions}
      searchParams={searchParams}
      user={req.user ?? undefined}
      visibleEntities={visibleEntities}
    >
      <Gutter>
        {allowed ? (
          <LeadsTable canEdit={can(req.user, 'leads', 'edit')} canDigest={can(req.user, 'leads', 'full')} canEmail={can(req.user, 'integrations', 'view')} />
        ) : (
          <p style={{ marginTop: 40 }}>Your role can’t see leads. Ask an Admin.</p>
        )}
      </Gutter>
    </DefaultTemplate>
  )
}
