import type { Field } from 'payload'
import { pageBlocks } from '../blocks'
import { toneField } from './common'

/**
 * A campaign landing page attached to an offer or event, with A/B variants.
 *
 * Paid ads link to /<lang>/offers/<slug> (or /whats-on/<slug>). Each visitor
 * is given one variant and keeps it (cookie). Add ?v=b to an ad's link to force
 * a variant, e.g. one ad set per variant. Results: Operations → Campaigns.
 */
export const landingField: Field = {
  name: 'landing',
  label: 'Landing page & A/B test',
  type: 'group',
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Publish a dedicated page for this' },
    { name: 'adLinks', type: 'ui', admin: { components: { Field: '@/payload/components/AdLinks#AdLinks' } } },
    {
      name: 'goal',
      type: 'select',
      defaultValue: 'book',
      admin: { description: 'What counts as a conversion for the A/B results.' },
      options: [
        { label: 'Ticket purchase', value: 'book' },
        { label: 'Group enquiry', value: 'enquire' },
        { label: 'Waitlist / WhatsApp sign-up', value: 'signup' },
      ],
    },
    {
      name: 'variants',
      type: 'array',
      labels: { singular: 'Variant', plural: 'Variants' },
      admin: {
        description: 'The banner people see. One variant = no test. Two or more = an A/B test; traffic is split by weight.',
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'key', type: 'text', required: true, defaultValue: 'a', admin: { width: '20%', description: 'a, b, c… (used in ?v=)' } },
            { name: 'name', type: 'text', admin: { width: '50%', description: 'Internal, e.g. "Price-led headline"' } },
            { name: 'weight', type: 'number', defaultValue: 50, admin: { width: '30%', description: 'Share of traffic' } },
          ],
        },
        { name: 'headline', type: 'text', localized: true, required: true },
        { name: 'subhead', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        toneField('tone', 'coral'),
        {
          type: 'row',
          fields: [
            { name: 'ctaLabel', type: 'text', localized: true, admin: { width: '50%' } },
            { name: 'ctaHref', type: 'text', admin: { width: '50%', description: 'Defaults to the offer/event button.' } },
          ],
        },
      ],
    },
    {
      name: 'layout',
      label: 'Sections under the banner',
      type: 'blocks',
      blocks: pageBlocks,
      admin: { initCollapsed: true },
    },
  ],
}
