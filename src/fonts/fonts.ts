import localFont from 'next/font/local'

/** Self-hosted (OFL) so the site never depends on Google Fonts at runtime. */
export const bricolage = localFont({
  src: [{ path: './BricolageGrotesque-Latin-wdth-wght.woff2', weight: '200 800', style: 'normal' }],
  variable: '--font-bricolage',
  display: 'swap',
  declarations: [{ prop: 'font-stretch', value: '75% 100%' }],
})

export const instrument = localFont({
  src: [{ path: './InstrumentSans-Latin-wght.woff2', weight: '400 700', style: 'normal' }],
  variable: '--font-instrument',
  display: 'swap',
})

/** Bengali script (বাংলা). */
export const hind = localFont({
  src: [
    { path: './HindSiliguri-Bengali-400.woff2', weight: '400', style: 'normal' },
    { path: './HindSiliguri-Bengali-500.woff2', weight: '500', style: 'normal' },
    { path: './HindSiliguri-Bengali-600.woff2', weight: '600', style: 'normal' },
    { path: './HindSiliguri-Bengali-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-hind',
  display: 'swap',
})

/** Devanagari script (हिन्दी). */
export const hindDeva = localFont({
  src: [
    { path: './Hind-Devanagari-400.woff2', weight: '400', style: 'normal' },
    { path: './Hind-Devanagari-500.woff2', weight: '500', style: 'normal' },
    { path: './Hind-Devanagari-600.woff2', weight: '600', style: 'normal' },
    { path: './Hind-Devanagari-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-hind-deva',
  display: 'swap',
})
