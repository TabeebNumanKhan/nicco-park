import bn from './messages/bn.json'
import hi from './messages/hi.json'
import { LANG_META, type Lang } from './config'

/**
 * Translations are keyed by the English text itself (gettext style), so the
 * English copy in components and in `src/content` stays readable and any
 * string without a translation simply shows in English.
 *
 * Add or fix a translation: edit src/i18n/messages/bn.json or hi.json.
 * Find strings that still need one: `pnpm i18n:check`.
 */
const MESSAGES: Record<Lang, Record<string, string>> = {
  en: {},
  bn: bn as Record<string, string>,
  hi: hi as Record<string, string>,
}

export type Vars = Record<string, string | number>
export type T = (text: string | undefined | null, vars?: Vars) => string

/**
 * `overrides` are interface-text edits made in the CMS (Settings → Interface
 * text). They win over the built-in dictionaries.
 */
export function makeT(lang: Lang, overrides?: Record<string, string> | null): T {
  const dict = overrides && Object.keys(overrides).length ? { ...MESSAGES[lang], ...overrides } : MESSAGES[lang]
  return (text, vars) => {
    if (!text) return ''
    let out = dict[text] ?? text
    if (vars) for (const [k, v] of Object.entries(vars)) out = out.replaceAll(`{${k}}`, String(v))
    return out
  }
}

/** The CMS rows that actually change something, so only those reach the browser. */
export function mergeOverrides(lang: Lang, rows: Record<string, string>) {
  const base = MESSAGES[lang]
  const out: Record<string, string> = {}
  for (const [en, v] of Object.entries(rows)) if (v && base[en] !== v) out[en] = v
  return out
}

/* Dates: weekday and month names in the visitor's language, digits kept Latin. */
const fmt = (lang: Lang, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(`${LANG_META[lang].intl}-u-nu-latn`, opts)

export const weekdayShort = (lang: Lang, d: Date) => fmt(lang, { weekday: 'short' }).format(d)
export const weekdayNarrow = (lang: Lang, d: Date) => fmt(lang, { weekday: 'narrow' }).format(d)
export const monthShort = (lang: Lang, d: Date) => fmt(lang, { month: 'short' }).format(d)
export const monthLong = (lang: Lang, d: Date) => fmt(lang, { month: 'long', year: 'numeric' }).format(d)
export const dayMonth = (lang: Lang, d: Date) => fmt(lang, { day: 'numeric', month: 'short' }).format(d)
export const dateShortL = (lang: Lang, d: Date) => fmt(lang, { weekday: 'short', day: 'numeric', month: 'short' }).format(d)
export const dateYearL = (lang: Lang, d: Date) => fmt(lang, { day: 'numeric', month: 'long', year: 'numeric' }).format(d)
export const dateLongL = (lang: Lang, d: Date) => fmt(lang, { weekday: 'long', day: 'numeric', month: 'long' }).format(d)
