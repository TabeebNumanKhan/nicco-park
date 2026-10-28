import type { Metadata } from 'next'
import { PayFlow } from '@/components/booking/PayFlow'
import { isLang } from '@/i18n/config'
import { getT } from '@/lib/cms'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const t = await getT(isLang(lang) ? lang : 'en')
  return { title: t('Checkout'), robots: { index: false } }
}

export default function PayPage() {
  return <PayFlow />
}
