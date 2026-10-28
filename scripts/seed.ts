/**
 * `pnpm seed`        load the park's content into an empty CMS database
 * `pnpm seed:fresh`  wipe the CMS database and media first, then load it
 */
export {}
process.env.AUTO_SEED = '0'
const { getPayload } = await import('payload')
const { default: config } = await import('../src/payload.config')
const payload = await getPayload({ config })
const { seed } = await import('../src/payload/seed')
await seed(payload, { log: (m) => console.log('seed:', m) })
process.exit(0)
