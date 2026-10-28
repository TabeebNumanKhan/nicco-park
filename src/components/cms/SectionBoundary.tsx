'use client'

import { Component, type ReactNode } from 'react'

/**
 * Keeps one broken section from taking the whole page down. Visitors see
 * nothing in its place; editors (draft mode) see a note to finish it.
 */
export class SectionBoundary extends Component<{ children: ReactNode; editing?: boolean; label?: string }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: unknown) {
    console.error('Section failed to render', this.props.label, error)
  }
  render() {
    if (!this.state.failed) return this.props.children
    if (!this.props.editing) return null
    return (
      <div className="wrap py-8">
        <p className="rounded-2xl border-2 border-dashed border-coral bg-cream p-5 font-bold text-ink">
          “{this.props.label}” needs more settings before it can show. Fill in its required fields in the editor.
        </p>
      </div>
    )
  }
}
