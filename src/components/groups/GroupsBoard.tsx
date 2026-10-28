'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'
import type { Occasion } from '@/content/types'
import { useLang } from '@/i18n/LangProvider'
import { useSiteData } from '@/lib/site-data'
import { Img } from '../ui/Img'

export function OccasionTabs({ occasions }: { occasions: Occasion[] }) {
  const { t } = useLang()
  const [id, setId] = useState(occasions[0].id)
  const cur = occasions.find((o) => o.id === id) ?? occasions[0]
  return (
    <section aria-labelledby="occ-h" className="wrap pt-12 md:pt-16">
      <h2 id="occ-h" className="h2 mb-5">
        {t("What are you planning?")}
      </h2>
      <div role="tablist" aria-label={t("Occasion")} className="scroll-x -mx-4 mb-5 gap-2 px-4 md:mx-0 md:flex-wrap md:px-0">
        {occasions.map((o) => (
          <button
            key={o.id}
            type="button"
            role="tab"
            aria-selected={o.id === id}
            onClick={() => setId(o.id)}
            className={'min-h-12 rounded-full px-5 ' + (o.id === id ? 'bg-ink font-bold text-white' : 'border border-[#C9CFD6] font-semibold')}
          >
            {t(o.label)}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="grid overflow-hidden rounded-[24px] bg-ground md:grid-cols-2 md:rounded-[28px]">
        <div className="relative min-h-[220px] md:min-h-[400px]">
          <Img media={cur.image} fill sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
        <div className="flex flex-col gap-4 p-5 md:p-9">
          <h3 className="display text-[32px] md:text-[44px]">{t(cur.title)}</h3>
          <p className="text-lg leading-relaxed text-ink-2">{t(cur.pitch)}</p>
          <ul className="flex flex-col gap-2">
            {cur.points.map((p) => (
              <li key={p} className="flex gap-2.5 text-[17px]">
                <Check size={20} strokeWidth={2.6} aria-hidden="true" className="mt-0.5 flex-none text-dry" />
                {t(p)}
              </li>
            ))}
          </ul>
          <a href="#enquire" className="mt-auto inline-flex min-h-13 items-center justify-center self-stretch rounded-2xl bg-yellow px-6 font-bold sm:self-start">
            {t("Get a quote")}
          </a>
        </div>
      </div>
    </section>
  )
}

export function Enquiry({ occasions }: { occasions: Occasion[] }) {
  const { settings: siteSettings } = useSiteData()
  const { t } = useLang()
  const [step, setStep] = useState(1)
  const [pick, setPick] = useState(occasions[0].id)
  const field = 'h-13 w-full rounded-2xl border border-[#C9CFD6] bg-white px-4'
  return (
    <section id="enquire" aria-labelledby="eq-h" className="wrap scroll-mt-32 pt-12 pb-16 md:pt-16 md:pb-24">
      <div className="grid overflow-hidden rounded-[24px] border-2 border-ink md:grid-cols-[1fr_1.3fr] md:rounded-[28px]">
        <div className="flex flex-col gap-4 bg-yellow p-5 md:p-9">
          <h2 id="eq-h" className="display text-[34px] md:text-[48px]">
            {t("Get a quote in three taps")}
          </h2>
          <p className="text-lg leading-relaxed">
            {t('Our events team replies with venue options, menus and a price. Prefer to talk? WhatsApp us or call {phone}.', { phone: siteSettings.phone.display })}
          </p>
          <ol aria-label={t("Progress")} className="mt-auto grid grid-cols-3 gap-2">
            {[1, 2, 3].map((n) => (
              <li key={n} aria-current={n === Math.min(step, 3) ? 'step' : undefined} className={'h-2 rounded-full ' + (n <= Math.min(step, 3) ? 'bg-ink' : 'bg-ink/20')}>
                <span className="sr-only">Step {n}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="p-5 md:p-9">
          {step === 1 && (
            <>
              <fieldset>
                <legend className="mb-3 text-[22px] font-bold">{t("1. What's the occasion?")}</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {occasions.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      aria-pressed={pick === o.id}
                      onClick={() => setPick(o.id)}
                      className={'min-h-14 rounded-2xl px-4 font-bold ' + (pick === o.id ? 'border-2 border-ink bg-yellow-soft' : 'border border-[#C9CFD6]')}
                    >
                      {t(o.label)}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="mt-5 flex justify-end">
                <button type="button" onClick={() => setStep(2)} className="min-h-14 w-full rounded-2xl bg-ink px-8 font-bold text-white sm:w-auto">
                  {t("Next")}
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <fieldset className="grid gap-3.5 sm:grid-cols-2">
                <legend className="mb-3 text-[22px] font-bold">{t("2. How many, and when?")}</legend>
                <div>
                  <label htmlFor="gq" className="mb-1.5 block font-semibold">
                    {t("Guests")}
                  </label>
                  <select id="gq" defaultValue="100 – 300" className={field}>
                    {['Under 50', '50 – 100', '100 – 300', '300 – 1,000', '1,000 – 5,000'].map((g) => (
                      <option key={g} value={g}>
                        {t(g)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="dq" className="mb-1.5 block font-semibold">
                    {t("Preferred date")}
                  </label>
                  <input id="dq" type="date" className={field} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="nq" className="mb-1.5 block font-semibold">
                    {t("Anything we should know?")} <span className="font-normal text-muted">{t("(optional)")}</span>
                  </label>
                  <textarea id="nq" rows={3} className="w-full rounded-2xl border border-[#C9CFD6] p-4" />
                </div>
              </fieldset>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:justify-end">
                <button type="button" onClick={() => setStep(1)} className="min-h-14 rounded-2xl border-2 border-ink px-6 font-bold">
                  {t("Back")}
                </button>
                <button type="button" onClick={() => setStep(3)} className="min-h-14 rounded-2xl bg-ink px-8 font-bold text-white">
                  {t("Next")}
                </button>
              </div>
            </>
          )}
          {step === 3 && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setStep(4)
              }}
            >
              <fieldset className="grid gap-3.5 sm:grid-cols-2">
                <legend className="mb-3 text-[22px] font-bold">{t("3. Where do we send the quote?")}</legend>
                <div>
                  <label htmlFor="cn" className="mb-1.5 block font-semibold">
                    {t("Your name")}
                  </label>
                  <input id="cn" autoComplete="name" required className={field} />
                </div>
                <div>
                  <label htmlFor="cm" className="mb-1.5 block font-semibold">
                    Mobile (WhatsApp)
                  </label>
                  <input id="cm" type="tel" autoComplete="tel" required className={field} />
                </div>
                <div>
                  <label htmlFor="ce" className="mb-1.5 block font-semibold">
                    {t("Email")}
                  </label>
                  <input id="ce" type="email" autoComplete="email" className={field} />
                </div>
                <div>
                  <label htmlFor="co" className="mb-1.5 block font-semibold">
                    {t("Company or school")} <span className="font-normal text-muted">{t("(optional)")}</span>
                  </label>
                  <input id="co" autoComplete="organization" className={field} />
                </div>
              </fieldset>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:justify-end">
                <button type="button" onClick={() => setStep(2)} className="min-h-14 rounded-2xl border-2 border-ink px-6 font-bold">
                  {t("Back")}
                </button>
                <button className="min-h-14 rounded-2xl bg-yellow px-8 font-bold">{t("Send enquiry")}</button>
              </div>
            </form>
          )}
          {step === 4 && (
            <div role="status" className="flex h-full flex-col justify-center gap-3">
              <h3 className="display text-[34px]">{t("Got it. Let's make it a big one.")}</h3>
              <p className="text-lg text-muted">{t("Our events team will reach you on WhatsApp with options and a quote.")}</p>
              <button type="button" onClick={() => setStep(1)} className="min-h-12 self-start rounded-xl border-2 border-ink px-5 font-bold">
                {t("Start another enquiry")}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
