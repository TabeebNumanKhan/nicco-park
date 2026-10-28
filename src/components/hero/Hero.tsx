import type { Media } from '@/content/types'
import { BookingWidget } from '../home/BookingWidget'
import { HeroFramed } from './HeroFramed'
import { HeroCards, HeroFullbleed, HeroMosaic, HeroSplit, HeroTicket, HeroVideo } from './HeroStyles'
import type { Slide } from './shared'

export type HeroStyle = 'framed' | 'split' | 'cards' | 'mosaic' | 'ticket' | 'fullbleed' | 'video'

/** Every banner style, in the order the CMS and /hero-options list them. */
export const HERO_STYLES: { id: HeroStyle; name: string; note: string }[] = [
  { id: 'framed', name: 'Framed photo on colour', note: 'Default. Park photos stay sharp in a tilted frame over a colour wash. Best for the current photos.' },
  { id: 'split', name: 'Split: colour panel + photo', note: 'Big words on a solid brand colour, the photo beside. Very readable, strong on phones.' },
  { id: 'cards', name: 'Offer cards', note: 'One headline and a swipeable row of cards, so three deals show at once on a laptop.' },
  { id: 'mosaic', name: 'Photo mosaic', note: 'No sliding: one message over a collage of small photos. Calm, and shows the variety of the park.' },
  { id: 'ticket', name: 'Booking first', note: 'Yellow banner, a changing deal card and the date picker straight underneath. Most direct route to buying.' },
  { id: 'fullbleed', name: 'Full-screen photo', note: 'Edge-to-edge picture. Only use with large, sharp photos (1600 px wide or more).' },
  { id: 'video', name: 'Video background', note: 'A silent looping clip behind the words. Upload an MP4 under 10 MB; without one it slowly pans a photo.' },
]

/**
 * The home-page banner in any style, plus the booking box under it.
 * The "Booking first" style puts the booking box directly below instead of
 * overlapping the banner.
 */
export function Hero({
  style,
  slides,
  autoplaySeconds = 6.5,
  showBookingBox = true,
  mosaic = [],
  video,
}: {
  style: HeroStyle
  slides: Slide[]
  autoplaySeconds?: number
  showBookingBox?: boolean
  mosaic?: Media[]
  video?: string
}) {
  if (!slides.length) return null
  const ms = Math.max(0, autoplaySeconds) * 1000
  const banner =
    style === 'split' ? (
      <HeroSplit slides={slides} autoplayMs={ms} />
    ) : style === 'cards' ? (
      <HeroCards slides={slides} autoplayMs={ms} />
    ) : style === 'mosaic' ? (
      <HeroMosaic slides={slides} mosaic={mosaic} />
    ) : style === 'ticket' ? (
      <HeroTicket slides={slides} autoplayMs={ms} />
    ) : style === 'fullbleed' ? (
      <HeroFullbleed slides={slides} autoplayMs={ms} />
    ) : style === 'video' ? (
      <HeroVideo slides={slides} autoplayMs={ms} video={video} />
    ) : (
      <HeroFramed slides={slides} autoplayMs={ms} />
    )
  return (
    <>
      {banner}
      {showBookingBox && <BookingWidget overlap={style !== 'ticket'} />}
    </>
  )
}
