'use client'

import { Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Media } from '@/content/types'
import { useLang } from '@/i18n/LangProvider'
import { gaEvent } from '@/lib/analytics'
import { track } from '@/lib/attribution'
import { staticAsset } from '@/lib/static-path'
import { Img } from '../ui/Img'

/** YouTube/Vimeo link → privacy-friendly embed URL. */
export function embedUrl(source: string, url?: string | null) {
  if (!url) return null
  if (source === 'youtube') {
    const id = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)?.[1]
    return id ? { src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`, thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` } : null
  }
  if (source === 'vimeo') {
    const id = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1]
    return id ? { src: `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1`, thumb: null } : null
  }
  return null
}

/**
 * A video that costs nothing until it's wanted: a cover image with a play
 * button. Uploaded files play in place; YouTube/Vimeo load only when pressed.
 * "Silent loop" videos start by themselves, except for visitors who prefer
 * reduced motion.
 */
export function VideoPlayer({
  source,
  file,
  url,
  poster,
  title,
  autoplay,
  className = '',
}: {
  source: 'upload' | 'youtube' | 'vimeo'
  file?: string
  url?: string | null
  poster?: Media
  title: string
  autoplay?: boolean
  className?: string
}) {
  const { t } = useLang()
  const [playing, setPlaying] = useState(false)
  const [reduced, setReduced] = useState(true)
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches), [])
  const embed = source === 'upload' ? null : embedUrl(source, url)
  const loop = source === 'upload' && autoplay && !reduced

  const start = () => {
    setPlaying(true)
    track('video_play', { props: { title, source } })
    gaEvent('video_start', { video_title: title, video_provider: source })
    if (source === 'upload') requestAnimationFrame(() => ref.current?.play())
  }

  if (source === 'upload' && file && (loop || playing)) {
    return (
      <video
        ref={ref}
        className={`h-full w-full object-cover ${className}`}
        src={staticAsset(file)}
        poster={poster ? staticAsset(poster.url) : undefined}
        autoPlay
        muted={loop}
        loop={loop}
        playsInline
        controls={!loop}
        aria-label={title}
      />
    )
  }
  if (embed && playing) {
    return <iframe className={`h-full w-full ${className}`} src={embed.src} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
  }
  if (!(source === 'upload' ? file : embed)) {
    // No video chosen yet: show the cover with a note instead of a dead play button.
    return (
      <div className={`relative h-full w-full overflow-hidden bg-ink text-white ${className}`}>
        {poster && <Img media={poster} fill sizes="(min-width: 1024px) 900px, 100vw" alt="" />}
        <span aria-hidden="true" className="absolute inset-0 bg-ink/45" />
        <span className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold whitespace-nowrap text-ink">
          <Play size={16} aria-hidden="true" />
          {t('Video coming soon')}
        </span>
      </div>
    )
  }
  return (
    <button type="button" onClick={start} className={`group relative block h-full w-full overflow-hidden bg-ink text-white ${className}`} aria-label={t('Play video: {title}', { title })}>
      {poster ? (
        <Img media={poster} fill sizes="(min-width: 1024px) 900px, 100vw" alt="" />
      ) : embed?.thumb ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={embed.thumb} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      ) : null}
      <span aria-hidden="true" className="absolute inset-0 bg-ink/25 transition group-hover:bg-ink/10" />
      <span className="absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-yellow text-ink shadow-xl transition group-hover:scale-105 motion-reduce:transition-none md:size-24">
        <Play size={34} fill="currentColor" aria-hidden="true" className="ml-1" />
      </span>
    </button>
  )
}
