'use client'

import { MapPin } from 'lucide-react'
import { useState } from 'react'
import { useLang } from '@/i18n/LangProvider'

/**
 * Google Maps loads only when the visitor asks for it, so the page stays
 * fast and no Google cookies are set before that.
 */
export function MapEmbed({ query }: { query: string }) {
  const { lang, t } = useLang()
  const [show, setShow] = useState(false)
  const q = encodeURIComponent(query)
  if (show)
    return (
      <iframe
        title={t('Map: {place}', { place: query })}
        src={`https://www.google.com/maps?q=${q}&hl=${lang}&output=embed`}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    )
  return (
    <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_30%,var(--mint),var(--sky))] p-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <MapPin size={40} aria-hidden="true" className="text-coral" />
        <button type="button" onClick={() => setShow(true)} className="min-h-12 rounded-2xl bg-ink px-5 font-bold text-white">
          {t('Show the map')}
        </button>
        <a href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noopener" className="font-bold underline">
          {t('Open directions in Google Maps')}
        </a>
      </div>
    </div>
  )
}
