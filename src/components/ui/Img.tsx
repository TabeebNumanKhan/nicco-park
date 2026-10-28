'use client'

import Image from 'next/image'
import { useLang } from '@/i18n/LangProvider'
import type { Media } from '@/content/types'
import { staticAsset } from '@/lib/static-path'

type Props = {
  media: Media
  className?: string
  sizes?: string
  /** The banner image: load straight away (Next 16 replaced `priority` with eager loading). */
  priority?: boolean
  /** Fill the nearest positioned parent (object-fit: cover). */
  fill?: boolean
  alt?: string
}

/** Image from a Payload-shaped media object. */
export function Img({ media, className, sizes = '100vw', priority, fill, alt }: Props) {
  const { t } = useLang()
  const src = staticAsset(media.url)
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt ?? t(media.alt)}
        fill
        sizes={sizes}
        {...(priority ? { loading: 'eager' as const, fetchPriority: 'high' as const } : {})}
        className={['object-cover', className].filter(Boolean).join(' ')}
      />
    )
  }
  return (
    <Image
      src={src}
      alt={alt ?? t(media.alt)}
      width={media.width ?? 1200}
      height={media.height ?? 800}
      sizes={sizes}
      {...(priority ? { loading: 'eager' as const, fetchPriority: 'high' as const } : {})}
      className={className}
    />
  )
}
