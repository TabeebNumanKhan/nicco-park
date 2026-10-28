import type { Metadata, Viewport } from 'next'
import { bricolage, hind, hindDeva, instrument } from '@/fonts/fonts'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: { default: 'Nicco Park — Ride. Splash. Strike.', template: '%s · Nicco Park' },
  description:
    "Kolkata's biggest day out: the Dry Park, Wet-O-Wild water park, Super Bowl bowling and, soon, Snow Park. Book tickets online from ₹400.",
  icons: { icon: '/images/logo.png' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#101418',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable} ${hind.variable} ${hindDeva.variable}`}>
      <body>{children}</body>
    </html>
  )
}
