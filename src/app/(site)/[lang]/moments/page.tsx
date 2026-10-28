import type { Metadata } from 'next'
import { MomentWall, UploadPanel } from '@/components/moments/MomentsBoard'
import { getMoments, getT } from '@/lib/cms'
import { isLang, type Lang } from '@/i18n/config'
import { alternates } from '@/lib/seo'
import { PageSections } from '@/blocks/PageSections'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const t = await getT(isLang(lang) ? lang : 'en')
  return {
    alternates: alternates('/moments', isLang(lang) ? lang : 'en'),
  title: t('#NiccoMoments'),
  description: t('Share your day at Nicco Park. Every month, one moment wins a free family day out.'),
}
}

const HOW = [
  { h: 'Post or upload', s: 'Tag #NiccoMoments on Instagram, or upload here straight from your phone.' },
  { h: 'We ask, then feature', s: 'For Instagram posts we ask your permission in a reply first. Every photo is reviewed by a person.' },
  { h: 'Always credited', s: 'Your name or handle stays on your photo, wherever we use it.' },
  { h: 'Win the next day out', s: 'One Moment of the month wins four Parks Package tickets.' },
]

export default async function MomentsPage({ params }: Props) {
  const lang = (await params).lang as Lang
  const t = await getT(lang)
  const moments = await getMoments(lang)
  return (
    <div className="bg-ink text-white">
      <section aria-labelledby="m-h" className="wrap grid items-end gap-6 pt-9 pb-8 md:grid-cols-[1.4fr_1fr] md:pt-14">
        <div>
          <h1 id="m-h" className="display text-[clamp(56px,16vw,140px)] leading-[0.84] [font-stretch:76%]">
            #Nicco
            <br />
            {t("Moments")}
          </h1>
          <p className="mt-5 max-w-[580px] text-lg leading-relaxed text-subtle md:text-xl">
            {t("Thirty-five years of Kolkata memories, now shared by you. Post your day, inspire someone else's, and you could win the next one.")}
          </p>
        </div>
        <div className="rounded-[24px] bg-yellow p-5 text-ink md:p-7">
          <span className="eyebrow">{t("Moment of the month")}</span>
          <p className="display mt-2 text-[32px]">{t("Theme: Winter thrills")}</p>
          <p className="mt-2">{t("Best photo wins a free family day out: four Parks Package tickets.")}</p>
          <a href="#share" className="mt-4 flex min-h-13 items-center justify-center rounded-2xl bg-ink font-bold text-white">
            {t("Share your moment")}
          </a>
        </div>
      </section>

      <UploadPanel />
      <MomentWall moments={moments} />

      <section aria-labelledby="how-h" className="bg-white text-ink">
        <div className="wrap py-12 md:py-20">
          <h2 id="how-h" className="h2 mb-6">
            {t("How it works")}
          </h2>
          <ol className="grid gap-0 border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
            {HOW.map((x, i) => (
              <li key={x.h} className="flex flex-col gap-1.5 border-b-2 border-ink py-5 sm:pr-6">
                <span className="display text-[48px]">{i + 1}</span>
                <strong className="text-xl">{t(x.h)}</strong>
                <span className="text-muted">{t(x.s)}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-muted">{t("Want a photo taken down? Message us on WhatsApp and we'll remove it.")}</p>
        </div>
      </section>
      <PageSections slug="moments" lang={lang} />
    </div>
  )
}
