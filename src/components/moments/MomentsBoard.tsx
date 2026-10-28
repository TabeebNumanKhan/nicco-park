'use client'

import { ImagePlus, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Moment } from '@/content/types'
import { useLang } from '@/i18n/LangProvider'
import { Img } from '../ui/Img'
import { SiteLink } from '../ui/SiteLink'

const WORLD = { dry: { name: 'Dry Park', c: 'bg-dry' }, wet: { name: 'Wet-O-Wild', c: 'bg-wet' }, bowl: { name: 'Super Bowl', c: 'bg-bowl' } }
const RIDES: Record<string, string[]> = {
  'Wet-O-Wild': ['Crazy River', 'Tornado Funnel', 'Wave Pool', 'Rain Dance', 'Pirates Bay'],
  'Dry Park': ['Cyclone', 'Sky Diver', 'Pirate Ship', 'Toy Train', 'Eiffel Tower'],
  'Super Bowl': ['Bowling lanes', 'Pool tables', 'Air hockey'],
}

export function UploadPanel() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [world, setWorld] = useState('Wet-O-Wild')
  const [sent, setSent] = useState(false)
  const [consent, setConsent] = useState([false, false])
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const check = () => window.location.hash === '#share' && setOpen(true)
    check()
    window.addEventListener('hashchange', check)
    return () => window.removeEventListener('hashchange', check)
  }, [])
  useEffect(() => () => void (preview && URL.revokeObjectURL(preview)), [preview])

  // Closed until someone taps "Share your moment" (a link to #share) above.
  if (!open) return <div id="share" className="scroll-mt-32" />

  return (
    <section id="share" aria-labelledby="up-h" className="wrap scroll-mt-32 pb-4">
      <div className="grid overflow-hidden rounded-[24px] bg-white text-ink md:grid-cols-[1fr_1.1fr] md:rounded-[28px]">
        <div className="flex flex-col gap-4 bg-ground p-4 md:p-7">
          <div className="flex items-center justify-between">
            <h2 id="up-h" className="display text-[30px] md:text-[36px]">
              {t("Share your moment")}
            </h2>
            <button type="button" aria-label={t("Close")} onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-xl border border-line-2 bg-white">
              <X size={20} />
            </button>
          </div>
          {preview ? (
            <div className="relative overflow-hidden rounded-[20px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt={t("Your selected photo")} className="max-h-[420px] w-full object-cover" />
              <button type="button" onClick={() => setPreview(null)} className="absolute top-2.5 right-2.5 rounded-full bg-white px-3 py-1.5 text-sm font-bold">
                {t("Change")}
              </button>
            </div>
          ) : (
            <label
              htmlFor="u-file"
              className="flex min-h-[240px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[20px] border-2 border-dashed border-[#B8C0C9] bg-white p-6 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                const f = e.dataTransfer.files?.[0]
                if (f) setPreview(URL.createObjectURL(f))
              }}
            >
              <ImagePlus size={36} aria-hidden="true" className="text-muted" />
              <strong className="text-lg">{t("Drop a photo or video here")}</strong>
              <span className="text-sm text-muted">{t("JPG, PNG or MP4, up to 50 MB")}</span>
              <span className="mt-2 inline-flex min-h-12 items-center rounded-xl bg-ink px-5 font-bold text-white">{t("Choose from my phone")}</span>
            </label>
          )}
          <input
            ref={fileRef}
            id="u-file"
            type="file"
            accept="image/*,video/mp4"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) setPreview(URL.createObjectURL(f))
            }}
          />
        </div>
        <div className="p-4 md:p-7">
          {sent ? (
            <div role="status" className="flex h-full flex-col justify-center gap-3">
              <h3 className="display text-[32px]">{t("Thank you! You're in this month's draw.")}</h3>
              <p className="text-muted">{t("We'll WhatsApp you when your moment goes live, and again if you win.")}</p>
              <button type="button" onClick={() => setOpen(false)} className="min-h-12 self-start rounded-xl bg-ink px-5 font-bold text-white">
                {t("Back to the wall")}
              </button>
            </div>
          ) : (
            <form
              aria-labelledby="up-h"
              className="grid gap-3.5 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault()
                if (consent.every(Boolean)) setSent(true)
              }}
            >
              <div>
                <label htmlFor="u-world" className="mb-1.5 block font-semibold">
                  {t("Where was this?")}
                </label>
                <select id="u-world" value={world} onChange={(e) => setWorld(e.target.value)} className="h-13 w-full rounded-2xl border border-[#C9CFD6] bg-white px-3.5">
                  {Object.keys(RIDES).map((w) => (
                    <option key={w} value={w}>
                      {t(w)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="u-ride" className="mb-1.5 block font-semibold">
                  {t("Ride or spot")}
                </label>
                <select id="u-ride" className="h-13 w-full rounded-2xl border border-[#C9CFD6] bg-white px-3.5">
                  {RIDES[world].map((r) => (
                    <option key={r} value={r}>
                      {t(r)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="u-cap" className="mb-1.5 block font-semibold">
                  {t("Caption")} <span className="font-normal text-muted">{t("(optional)")}</span>
                </label>
                <input id="u-cap" placeholder={t("Best day of the holidays!")} className="h-13 w-full rounded-2xl border border-[#C9CFD6] px-4" />
              </div>
              <div>
                <label htmlFor="u-name" className="mb-1.5 block font-semibold">
                  {t("Credit me as")}
                </label>
                <input id="u-name" placeholder={t("@yourhandle or your name")} className="h-13 w-full rounded-2xl border border-[#C9CFD6] px-4" />
              </div>
              <div>
                <label htmlFor="u-mob" className="mb-1.5 block font-semibold">
                  {t("Mobile, if you win")}
                </label>
                <input id="u-mob" type="tel" inputMode="numeric" className="h-13 w-full rounded-2xl border border-[#C9CFD6] px-4" />
              </div>
              <div className="flex flex-col gap-2.5 rounded-2xl bg-ground p-4 sm:col-span-2">
                {[
                  'I took this photo, and Nicco Park may feature it on its website and social media with credit to me.',
                  "Everyone in it is happy to be shown. For children, I'm their parent or guardian.",
                ].map((c, i) => (
                  <label key={i} className="flex gap-3 leading-snug">
                    <input
                      type="checkbox"
                      checked={consent[i]}
                      onChange={(e) => setConsent((c) => c.map((v, j) => (j === i ? e.target.checked : v)))}
                      className="mt-0.5 size-5 flex-none accent-ink"
                    />
                    <span>{t(c)}</span>
                  </label>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
                <button disabled={!consent.every(Boolean)} className="min-h-14 w-full rounded-2xl bg-yellow px-7 font-bold text-ink disabled:opacity-50 sm:w-auto">
                  {t("Send for review")}
                </button>
                <span className="text-sm text-muted">{t("Every photo is checked by our team before it appears.")}</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export function MomentWall({ moments }: { moments: Moment[] }) {
  const { t } = useLang()
  const [f, setF] = useState<'all' | Moment['world']>('all')
  const shown = moments.filter((m) => f === 'all' || m.world === f)
  return (
    <section aria-labelledby="wall-h" className="wrap pt-10 pb-12 md:pt-14 md:pb-16">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <h2 id="wall-h" className="text-[24px] font-bold md:text-[28px]">
          {t("The wall")} <span className="font-medium text-subtle">{t("· tap any photo to book that ride")}</span>
        </h2>
        <div role="group" aria-label={t("Filter by world")} className="scroll-x -mx-4 w-[calc(100%+32px)] gap-1.5 px-4 sm:mx-0 sm:w-auto sm:px-0">
          {(['all', 'dry', 'wet', 'bowl'] as const).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={f === k}
              onClick={() => setF(k)}
              className={'min-h-11 rounded-full px-4 ' + (f === k ? 'bg-white font-bold text-ink' : 'border border-white/30 font-semibold text-white')}
            >
              {k === 'all' ? t('All') : t(WORLD[k].name)}
            </button>
          ))}
        </div>
      </div>
      <div className="columns-2 gap-2.5 md:columns-3 md:gap-3 lg:columns-4">
        {shown.map((m) => (
          <figure key={m.handle} className={'relative m-0 mb-2.5 break-inside-avoid overflow-hidden rounded-[18px] md:mb-3 ' + (m.tall ? 'h-[290px] md:h-[330px]' : 'h-[140px] md:h-[160px]')}>
            <Img media={m.image} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" alt={`${t(m.caption)}, ${t(WORLD[m.world].name)}`} />
            <span className={`absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-xs font-bold text-white ${WORLD[m.world].c}`}>{t(WORLD[m.world].name)}</span>
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-ink/85 to-transparent p-2.5 pt-8 md:p-3">
              <span className="min-w-0 text-[13px] leading-tight">
                <strong className="block truncate">{m.handle}</strong>
                <span className="line-clamp-2">{t(m.caption)}</span>
              </span>
              <SiteLink href="/book" className="hidden flex-none rounded-full bg-yellow px-3 py-1.5 text-[13px] font-bold text-ink md:inline-block">
                {t('Book {ride}', { ride: t(m.ride) })}
              </SiteLink>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
