import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BookFlow } from '@/components/booking/BookFlow'
import { isLang } from '@/i18n/config'
import { alternates } from '@/lib/seo'
import { getT } from '@/lib/cms'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const t = await getT(isLang(lang) ? lang : 'en')
  return {
    alternates: alternates('/book', isLang(lang) ? lang : 'en'), title: t('Book tickets'), description: t('Pick a date, choose tickets and add extras. Live availability for the next 90 days.') }
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-ground" />}>
      <BookFlow />
    </Suspense>
  )
}
