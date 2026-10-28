import { notFound } from 'next/navigation'
import { Announcements } from '@/components/chrome/AnnouncementBar'
import { Footer } from '@/components/chrome/Footer'
import { Header } from '@/components/chrome/Header'
import { MobileTabBar } from '@/components/chrome/MobileTabBar'
import { PreviewBar } from '@/components/cms/PreviewBar'
import { StaffBar } from '@/components/cms/StaffBar'
import { isLang, LANGS } from '@/i18n/config'
import { LangProvider } from '@/i18n/LangProvider'
import { CartProvider } from '@/lib/booking/cart-context'
import { ChatAssistant } from '@/components/cms/ChatAssistant'
import { ThemeStyle } from '@/components/cms/ThemeStyle'
import { Tags } from '@/components/tracking/Tags'
import { getSiteData, getT, getTextOverrides, getTheme, getTracking, isPreview } from '@/lib/cms'
import { consentDefaults } from '@/lib/consent-script'
import { staticAsset } from '@/lib/static-path'
import type { Metadata } from 'next'
import { SiteDataProvider } from '@/lib/site-data'

export const dynamicParams = true

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }))
}

/** The browser-tab icon from CMS → Theme. */
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const [theme, tracking] = await Promise.all([getTheme(), getTracking()])
  const v = tracking.verification
  const locale = { en: 'en_IN', bn: 'bn_IN', hi: 'hi_IN' }[lang as 'en'] ?? 'en_IN'
  return {
    ...(theme.favicon ? { icons: { icon: staticAsset(theme.favicon.url), apple: staticAsset(theme.favicon.url) } } : {}),
    openGraph: { siteName: 'Nicco Park', locale, alternateLocale: ['en_IN', 'bn_IN', 'hi_IN'].filter((l) => l !== locale), type: 'website' },
    twitter: { card: 'summary_large_image' },
    verification: { google: v.google, other: { ...(v.bing ? { 'msvalidate.01': v.bing } : {}), ...(v.meta ? { 'facebook-domain-verification': v.meta } : {}) } },
  }
}

export default async function SiteLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const [t, overrides, site, preview, theme, tracking] = await Promise.all([getT(lang), getTextOverrides(lang), getSiteData(lang), isPreview(), getTheme(), getTracking()])
  const tagsOn = !!(tracking.tags.gtmId || tracking.tags.ga4Id || tracking.tags.adsId || tracking.tags.metaPixelId)
  return (
    <LangProvider lang={lang} overrides={overrides}>
      <SiteDataProvider value={site}>
        <CartProvider>
          <div lang={lang} data-lang={lang}>
            <ThemeStyle theme={theme} />
            {/* Consent Mode v2 defaults must run before any tag loads. */}
            {tagsOn && !preview && <script dangerouslySetInnerHTML={{ __html: consentDefaults(tracking.tags) }} />}
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-lg focus:bg-yellow focus:px-4 focus:py-2 focus:font-bold"
            >
              {t('Skip to content')}
            </a>
            {preview ? <PreviewBar /> : <StaffBar />}
            <Announcements />
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <MobileTabBar />
            {!preview && <ChatAssistant />}
            {tagsOn && !preview && <Tags cfg={tracking.tags} banner={tracking.banner} privacyUrl={tracking.privacyUrl} />}
          </div>
        </CartProvider>
      </SiteDataProvider>
    </LangProvider>
  )
}
