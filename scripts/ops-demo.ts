/**
 * `pnpm ops:demo`          fill an empty operations database with demo data
 * `pnpm ops:demo --reset`  delete data/ops.db first
 */
import fs from 'node:fs'
import path from 'node:path'

if (process.argv.includes('--reset')) {
  for (const f of ['ops.db', 'ops.db-shm', 'ops.db-wal']) fs.rmSync(path.resolve('data', f), { force: true })
  console.log('Deleted data/ops.db')
}
process.env.AUTO_SEED = '0'
const { getPayload } = await import('payload')
const { default: config } = await import('../src/payload.config')
const payload = await getPayload({ config })
const { getCatalog } = await import('../src/payload/endpoints')
const { seedOpsDemo } = await import('../src/ops/demo')
await seedOpsDemo(await getCatalog(payload), (m) => console.log('ops:', m))
process.exit(0)
