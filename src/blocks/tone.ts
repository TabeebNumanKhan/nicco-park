/** Section colours used by every CMS block ("tone" fields). */
export type SectionTone = 'white' | 'cream' | 'yellow' | 'ink' | 'coral' | 'dry' | 'wet' | 'bowl' | 'snow' | 'lilac'

export const SECTION: Record<SectionTone, { bg: string; eyebrow: string; muted: string; dark: boolean; dots?: string }> = {
  white: { bg: 'bg-white text-ink', eyebrow: 'text-coral-ink', muted: 'text-ink-2', dark: false },
  cream: { bg: 'bg-cream text-ink', eyebrow: 'text-coral-ink', muted: 'text-ink-2', dark: false },
  yellow: { bg: 'bg-yellow text-ink', eyebrow: 'text-ink', muted: 'text-ink-2', dark: false, dots: 'text-ink/10' },
  ink: { bg: 'bg-ink text-white', eyebrow: 'text-yellow', muted: 'text-subtle', dark: true },
  coral: { bg: 'bg-coral text-white', eyebrow: 'text-[#FFF0A0]', muted: 'text-white/90', dark: true, dots: 'text-white/15' },
  dry: { bg: 'bg-dry text-white', eyebrow: 'text-[#BFF0D2]', muted: 'text-white/85', dark: true, dots: 'text-white/10' },
  wet: { bg: 'bg-gradient-to-br from-wet to-sea text-white', eyebrow: 'text-[#FFF0A0]', muted: 'text-white/85', dark: true, dots: 'text-white/15' },
  bowl: { bg: 'bg-bowl text-white', eyebrow: 'text-[#E2D3FF]', muted: 'text-white/85', dark: true, dots: 'text-white/10' },
  snow: { bg: 'bg-snow-soft text-snow-ink', eyebrow: 'text-snow', muted: 'text-snow-ink', dark: false },
  lilac: { bg: 'bg-lilac text-ink', eyebrow: 'text-bowl-ink', muted: 'text-bowl-ink', dark: false, dots: 'text-bowl/15' },
}

export const section = (tone?: string | null, fallback: SectionTone = 'white') => SECTION[(tone as SectionTone) in SECTION ? (tone as SectionTone) : fallback]
