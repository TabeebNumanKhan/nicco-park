import { withPayload } from '@payloadcms/next/withPayload'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Nicco Park — Next.js config. The website and the Payload CMS (/admin) run
 * as one Next.js app.
 *
 * Static mode (`STATIC_EXPORT=1`, used by `pnpm export`): writes a plain HTML
 * copy of the public site to `out/` for a shareable preview link. Content is
 * read from the CMS at build time; the CMS itself is not part of that copy.
 */
const isStatic = process.env.STATIC_EXPORT === '1'
const dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // A separate build folder for `pnpm export`, so it never clashes with a running `pnpm dev`.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // The export build skips its own type check: the CMS routes are moved aside for it,
  // and `pnpm typecheck` / `pnpm build` check the full app.
  ...(isStatic ? { output: 'export', trailingSlash: false, typescript: { ignoreBuildErrors: true } } : {}),
  images: { unoptimized: isStatic, localPatterns: [{ pathname: '/media/**' }, { pathname: '/images/**' }] },
  env: { NEXT_PUBLIC_STATIC: isStatic ? '1' : '0' },
  turbopack: { root: dirname },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
