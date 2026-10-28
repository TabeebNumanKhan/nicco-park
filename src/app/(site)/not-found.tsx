import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-ink px-4 text-center text-white">
      <div>
        <p className="display text-[96px] text-yellow">404</p>
        <h1 className="display text-[40px]">This ride doesn&apos;t exist.</h1>
        <Link href="/" className="mt-6 inline-flex min-h-13 items-center rounded-2xl bg-yellow px-6 font-bold text-ink">
          Back to Nicco Park
        </Link>
      </div>
    </main>
  )
}
