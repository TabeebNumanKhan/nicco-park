'use client'

import { useRowLabel } from '@payloadcms/ui'

/** Shows each hero slide's tab name instead of "Slide 01" in the admin list. */
export function SlideRowLabel() {
  const { data, rowNumber } = useRowLabel<{ tab?: string; title?: string }>()
  return <span>{data?.tab || data?.title || `Slide ${String((rowNumber ?? 0) + 1).padStart(2, '0')}`}</span>
}

type BlockData = { blockType?: string; heading?: string; style?: string; slides?: { tab?: string }[]; items?: { label?: string }[]; title?: string; formType?: string }

/** Names each page section after its heading (or slides, or ticker items) instead of "Untitled". */
export function BlockRowLabel() {
  const { data } = useRowLabel<BlockData>()
  if (!data) return null
  const text =
    data.heading ||
    (data.slides?.length ? `${data.slides.length} slides · ${data.style ?? 'framed'} · ${data.slides.map((s) => s.tab).filter(Boolean).join(', ')}` : '') ||
    data.items?.map((x) => x.label).filter(Boolean).slice(0, 3).join(' · ') ||
    data.formType ||
    ''
  return <span style={{ opacity: 0.75 }}>{text.length > 70 ? text.slice(0, 68) + '…' : text}</span>
}
