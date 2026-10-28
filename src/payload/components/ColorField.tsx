'use client'

import { FieldLabel, TextInput, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

/** A colour swatch + picker next to the hex code, for Theme → Colours. */
export const ColorField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path: path ?? field.name })
  const label = typeof field.label === 'string' ? field.label : field.name
  return (
    <div className="field-type text" style={{ marginBottom: 20 }}>
      <FieldLabel label={label} path={path} />
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="color"
          aria-label={`${label} colour picker`}
          value={/^#[0-9a-fA-F]{6}$/.test(value ?? '') ? value : '#000000'}
          onChange={(e) => setValue(e.target.value.toUpperCase())}
          style={{ width: 44, height: 40, border: '1px solid var(--theme-elevation-150)', borderRadius: 8, padding: 2, background: 'transparent' }}
        />
        <div style={{ flex: 1 }}>
          <TextInput path={path ?? field.name} value={value ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} placeholder="#FFD400" />
        </div>
      </div>
    </div>
  )
}
