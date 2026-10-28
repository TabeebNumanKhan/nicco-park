import type { Page } from '@/payload-types'

/** Any section on a page (Pages → Sections, and the landing pages of offers and events). */
export type LayoutBlock = NonNullable<Page['layout']>[number]
export type BlockOf<K extends LayoutBlock['blockType']> = Extract<LayoutBlock, { blockType: K }>
