import type { Theme } from '@/lib/cms'
import { staticAsset } from '@/lib/static-path'

const FONT: Record<string, string> = {
  bricolage: 'var(--font-bricolage)',
  instrument: 'var(--font-instrument)',
  system: 'system-ui, -apple-system, "Segoe UI", Roboto',
}
const SCRIPTS = 'var(--font-hind), var(--font-hind-deva), system-ui, sans-serif'

/**
 * CMS → Theme applied to the site: brand colours, heading and body fonts
 * (including uploaded font files), heading size and the admin-only custom
 * CSS. Only what differs from the built-in design is written out.
 */
export function ThemeStyle({ theme }: { theme: Theme }) {
  const lines: string[] = []
  const face = (family: string, url?: string) => (url ? `@font-face{font-family:"${family}";src:url("${staticAsset(url)}");font-display:swap;font-weight:100 900}` : '')
  const font = (key: string, custom: string, url?: string) => (key === 'custom' && url ? `"${custom}"` : FONT[key])
  const display = theme.displayFont !== 'bricolage' ? font(theme.displayFont, 'NP Display', theme.displayFontUrl) : null
  const body = theme.bodyFont !== 'instrument' ? font(theme.bodyFont, 'NP Body', theme.bodyFontUrl) : null
  if (theme.displayFont === 'custom') lines.push(face('NP Display', theme.displayFontUrl))
  if (theme.bodyFont === 'custom') lines.push(face('NP Body', theme.bodyFontUrl))
  const vars = [
    ...Object.entries(theme.colors).map(([k, v]) => `--${k}:${v}`),
    display ? `--np-display:${display}, ${SCRIPTS}` : '',
    body ? `--np-sans:${body}, ${SCRIPTS}` : '',
  ].filter(Boolean)
  if (vars.length) lines.push(`:root:root{${vars.join(';')}}`)
  if (theme.headingScale !== 100) lines.push(`.display,.h2{zoom:${theme.headingScale / 100}}`)
  if (theme.customCss.trim()) lines.push(theme.customCss)
  const css = lines.filter(Boolean).join('\n').replace(/<\/?style/gi, '')
  if (!css) return null
  return <style id="np-theme" dangerouslySetInnerHTML={{ __html: css }} />
}
