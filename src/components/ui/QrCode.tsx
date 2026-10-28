/** Decorative stand-in QR (17×17 with finder squares). Real QRs come from the ticketing system. */
export function QrCode({ seed = 7, label, className }: { seed?: number; label: string; className?: string }) {
  const finder = (r: number, c: number, r0: number, c0: number) => {
    const y = r - r0
    const x = c - c0
    if (y < 0 || x < 0 || y > 4 || x > 4) return null
    return y === 0 || y === 4 || x === 0 || x === 4 || (y === 2 && x === 2)
  }
  const cells: boolean[] = []
  for (let r = 0; r < 17; r++)
    for (let c = 0; c < 17; c++) {
      let v = finder(r, c, 0, 0)
      if (v === null) v = finder(r, c, 0, 12)
      if (v === null) v = finder(r, c, 12, 0)
      if (v === null) v = (r * 5 + c * seed + r * c) % 7 < 3
      cells.push(v)
    }
  return (
    <div role="img" aria-label={label} className={['grid grid-cols-[repeat(17,1fr)] gap-0 rounded-xl bg-white p-3', className].filter(Boolean).join(' ')}>
      {cells.map((on, i) => (
        <span key={i} className={`aspect-square ${on ? 'bg-ink' : ''}`} />
      ))}
    </div>
  )
}
