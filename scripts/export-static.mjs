/**
 * Builds a static HTML copy of the site in `out/` — for a shareable preview
 * link or any plain file host.
 *
 *   pnpm export      → out/en.html, out/bn/book.html, out/hi/worlds/dry-park.html …
 *   npx serve out    → preview it locally
 *
 * In this mode internal links point at "/page.html" and each link is a full
 * page load (see components/ui/SiteLink.tsx). The site must be served from
 * the root of a domain; opening the files with file:// will not load scripts.
 *
 * Content is read from the CMS database at build time. The CMS itself
 * (/admin, /api), live preview, A/B cookies and checkout need a server, so
 * they are left out of this copy: for the build only, the (payload) route
 * group and src/proxy.ts are moved aside and dynamic routes are told to
 * render only the pages that exist. Everything is put back afterwards, even
 * if the build fails.
 */
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url)) // Windows-safe path
const out = join(root, 'out')

rmSync(out, { recursive: true, force: true })

const aside = join(root, '.export-aside')
const moved = [join('src', 'app', '(payload)'), join('src', 'proxy.ts'), join('src', 'app', '(site)', '[lang]', 'section-preview')]
const patchLog = join(aside, 'patched.json')
function walkTs(d, acc = []) {
  for (const f of readdirSync(d)) {
    const p = join(d, f)
    if (statSync(p).isDirectory()) walkTs(p, acc)
    else if (/\.tsx?$/.test(f)) acc.push(p)
  }
  return acc
}
function prepare() {
  mkdirSync(aside, { recursive: true })
  for (const m of moved) if (existsSync(join(root, m))) renameSync(join(root, m), join(aside, m.replaceAll(/[\\/]/g, '__')))
  const patched = []
  for (const f of walkTs(join(root, 'src', 'app'))) {
    const s = readFileSync(f, 'utf8')
    if (s.includes('export const dynamicParams = true')) patched.push([f, s])
  }
  // Originals are written down first, so an interrupted export can still be undone.
  writeFileSync(patchLog, JSON.stringify(patched))
  for (const [f, s] of patched) writeFileSync(f, s.replace('export const dynamicParams = true', 'export const dynamicParams = false'))
}
function restore() {
  for (const m of moved) {
    const from = join(aside, m.replaceAll(/[\\/]/g, '__'))
    if (existsSync(from)) renameSync(from, join(root, m))
  }
  if (existsSync(patchLog)) for (const [f, s] of JSON.parse(readFileSync(patchLog, 'utf8'))) writeFileSync(f, s)
  rmSync(aside, { recursive: true, force: true })
}
if (existsSync(aside)) restore() // a previous export was interrupted
prepare()
try {
  execSync('npx next build', { cwd: root, stdio: 'inherit', env: { ...process.env, STATIC_EXPORT: '1', NEXT_DIST_DIR: 'out', OPS_DEMO_DATA: '0' } })
} finally {
  restore()
}

// RSC payload files are only used for client-side navigation, which the
// static preview does not use. Drop them to keep the upload small.
const prune = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f)
    if (statSync(p).isDirectory()) prune(p)
    else if (p.endsWith('.txt') && !relative(out, p).startsWith('_next') && relative(out, p) !== 'robots.txt' && relative(out, p) !== 'llms.txt') rmSync(p)
  }
  if (d !== out && readdirSync(d).length === 0) rmSync(d, { recursive: true })
}
prune(out)

// Some static hosts reserve names that start with "_" — move Next's asset
// folder to /assets-next/ and point every reference at it.
rmSync(join(out, '_not-found.html'), { force: true })
renameSync(join(out, '_next'), join(out, 'assets-next'))
const rewrite = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f)
    if (statSync(p).isDirectory()) rewrite(p)
    else if (/\.(html|js|css)$/.test(p)) {
      const s = readFileSync(p, 'utf8')
      // Escape literal U+FFFD in JS strings (some uploaders reject the raw character).
      let t = s.replaceAll('/_next/', '/assets-next/')
      if (p.endsWith('.js')) t = t.replaceAll('\uFFFD', '\\uFFFD')
      if (t !== s) writeFileSync(p, t)
    }
  }
}
rewrite(out)

// Pages live under a language: /en.html, /bn.html, /hi.html and /en/book.html…
// index.html forwards to the visitor's last language (English by default),
// so hosts that wrap or rewrite their entry page still land on a real page.
writeFileSync(
  join(out, 'index.html'),
  `<title>Nicco Park Website</title>
<style>:root{--bg:#101418;--fg:#fff;--accent:#ffd400}body{background:var(--bg);color:var(--fg);font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:80vh;padding-inline:max(16px,env(safe-area-inset-left,0px)) max(16px,env(safe-area-inset-right,0px))}a{color:var(--accent);font-weight:700}</style>
<p>Opening Nicco Park… <a href="en.html">English</a> · <a href="bn.html">বাংলা</a> · <a href="hi.html">हिन्दी</a></p>
<script>var l='en';try{l=localStorage.getItem('np-lang')||'en'}catch(e){}if(!/^(en|bn|hi)$/.test(l))l='en';location.replace(l+'.html'+location.hash)</script>
`,
)
console.log('\nStatic site ready in out/. Preview with: npx serve out')
