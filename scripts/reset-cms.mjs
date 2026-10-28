// Deletes the CMS database and uploaded media so `pnpm seed:fresh` starts clean.
// Runs before Payload starts, because a running Payload keeps the old file open.
import fs from 'node:fs'
for (const f of ['data/cms.db', 'data/cms.db-shm', 'data/cms.db-wal']) fs.rmSync(f, { force: true })
fs.rmSync('public/media', { recursive: true, force: true })
console.log('Wiped data/cms.db and public/media')
