import type { Metadata } from 'next'
import { Account } from '@/components/account/Account'
import { isLang } from '@/i18n/config'
import { getT } from '@/lib/cms'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const t = await getT(isLang(lang) ? lang : 'en')
  return { title: t('My Nicco'), robots: { index: false } }
}

export default function MyNiccoPage() {
  return <Account />
}
