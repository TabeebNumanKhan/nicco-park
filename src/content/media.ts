import sizes from './image-sizes.json'
import type { Media } from './types'

const SIZES = sizes as unknown as Record<string, [number, number]>

/**
 * Local stand-in for a Payload `media` document. When the CMS lands, media
 * comes back from Payload already shaped like this ({ url, alt, width, height }).
 */
export function media(file: string, alt: string): Media {
  const name = file.includes('.') ? file : `${file}.jpg`
  const [width, height] = SIZES[name] ?? [1200, 800]
  return { url: `/images/${name}`, alt, width, height }
}
