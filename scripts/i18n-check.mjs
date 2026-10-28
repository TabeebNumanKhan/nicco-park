#!/usr/bin/env node
/**
 * Finds every English string the site can show and reports the ones that
 * have no Bengali or Hindi translation yet.
 *
 *   pnpm i18n:check            report missing keys, exit 1 if any
 *   pnpm i18n:check --write    also write the missing keys to i18n-missing.json
 *
 * Where strings come from:
 *   1. t('…') / t("…") calls anywhere in src/
 *   2. every human-readable string literal in src/content/ (the CMS seed),
 *      because components render those fields through t(field)
 *   3. capitalised string literals in components and pages that are passed
 *      through t() indirectly, e.g. [['#map', 'Park map']].map(([h, l]) => t(l))
 *
 * (3) over-collects a little. A translation nobody looks up costs nothing;
 * a missing one shows English on a Bengali page, so we err that way.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const src = join(root, 'src')

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (/\.(tsx?|mjs)$/.test(name)) out.push(p)
  }
  return out
}

const LIT = /(['"`])((?:\\.|(?!\1)[^\\\n])*)\1/g
const unescape = (s) => s.replace(/\\(['"`\\])/g, '$1').replace(/\\n/g, '\n')

/** Looks like something a person reads, not a class list, id, path or URL. */
function readable(s) {
  if (!/[A-Za-z]/.test(s) || s.length < 2) return false
  if (s.includes('${')) return false
  if (/^(\/|#|https?:|mailto:|tel:|\.\/|\.\.\/|@\/|use |--)/.test(s)) return false
  if (/\.(jpe?g|png|webp|avif|svg|woff2?|mp4|json|css|tsx?)\b/.test(s)) return false
  if (/^[a-z0-9_-]+$/.test(s)) return false // ids, slugs, single lowercase tokens
  if (/^[a-z]+[A-Z]\w*$/.test(s)) return false // camelCase identifiers
  const tokens = s.split(/\s+/)
  // Tailwind / CSS class lists: every token is lowercase utility-ish.
  if (tokens.every((t) => /^[a-z0-9!:[\]()/.%#,_+-]*$/.test(t) && /[-:[]/.test(t))) return false
  if (tokens.some((t) => /^(md|sm|lg|xl|hover|focus|group-open|disabled):/.test(t))) return false
  if (/^\(min-width|^\d+(px|vw)/.test(s)) return false // sizes attributes
  return true
}

const keys = new Set()
const files = walk(src).filter((f) => !f.includes(join('i18n', 'messages')))
for (const file of files) {
  const text = readFileSync(file, 'utf8')
  const rel = relative(src, file)
  // 1. explicit t('…') calls
  for (const m of text.matchAll(/\bt\(\s*(['"`])((?:\\.|(?!\1)[^\\])*)\1/g)) keys.add(unescape(m[2]))
  // 2 + 3. literals in content files, and capitalised literals elsewhere
  const isContent = rel.startsWith('content')
  if (!isContent && !/^(components|app)/.test(rel)) continue
  for (const line of text.split('\n')) {
    const l = line.trim()
    if (l.startsWith('import ') || l.startsWith('//') || l.startsWith('*') || /className=|sizes=|href=/.test(l) && !/label|title|name|alt/.test(l)) continue
    for (const m of l.matchAll(LIT)) {
      const s = unescape(m[2])
      if (!readable(s)) continue
      // Outside content files: capitalised strings, or lowercase phrases (2+ words) such as stat labels.
      if (!isContent && !/^[A-Z₹#0-9]/.test(s) && !(/^[a-z]/.test(s) && /\s/.test(s) && !/[-:[]/.test(s))) continue
      keys.add(s)
    }
  }
}

const sorted = [...keys].sort((a, b) => a.localeCompare(b))
const report = {}
let missingTotal = 0
for (const lang of ['bn', 'hi']) {
  const dict = JSON.parse(readFileSync(join(src, 'i18n', 'messages', `${lang}.json`), 'utf8'))
  const missing = sorted.filter((k) => !(k in dict))
  report[lang] = missing
  missingTotal += missing.length
  console.log(`${lang}: ${sorted.length - missing.length}/${sorted.length} translated, ${missing.length} missing`)
}

if (process.argv.includes('--write')) {
  writeFileSync(join(root, 'i18n-missing.json'), JSON.stringify(report, null, 2) + '\n')
  console.log('wrote i18n-missing.json')
}
if (process.argv.includes('--keys')) {
  writeFileSync(join(root, 'i18n-keys.json'), JSON.stringify(sorted, null, 2) + '\n')
  console.log(`wrote i18n-keys.json (${sorted.length} keys)`)
}
process.exit(missingTotal && !process.argv.includes('--keys') ? 1 : 0)
