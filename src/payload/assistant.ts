/**
 * The website chat assistant (CMS → Integrations → Chat assistant).
 *
 * "faq" mode answers from the CMS itself — FAQs, ticket prices, hours,
 * offers, events, address — by matching words, so it never makes anything
 * up. "ai" mode sends the same facts to Claude as its only knowledge (needs
 * ANTHROPIC_API_KEY in .env) and falls back to "faq" if that fails.
 * Either way, anything it can't answer goes to WhatsApp or a call-back.
 */
import type { Payload } from 'payload'

type Lang = 'en' | 'bn' | 'hi'
type Doc = Record<string, unknown> & { [k: string]: never | unknown }
type Fact = { q: string; a: string; link?: string }

const STOP = new Set('a an the is are do does can i you we my of to in on for at and or what how much many with it this that be there any your our me please tell about by kids need'.split(' ').concat('কত কি কী আছে করে এর এ ও আর কেমন হয় হবে'.split(' '), 'है क्या कितना कितने के का की में से हैं और हो होता मुझे'.split(' ')))
const words = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w))

/** Everything the assistant may say, from the CMS, in the visitor's language. */
async function knowledge(payload: Payload, lang: Lang) {
  const find = (collection: string, extra: Record<string, unknown> = {}) =>
    payload
      .find({ collection: collection as 'faqs', locale: lang, fallbackLocale: 'en', limit: 200, depth: 0, pagination: false, overrideAccess: true, ...extra })
      .then((r) => r.docs as unknown as Doc[])
      .catch(() => [] as Doc[])
  const glob = (slug: string) =>
    payload
      .findGlobal({ slug: slug as 'site-settings', locale: lang, fallbackLocale: 'en', depth: 0, overrideAccess: true })
      .then((g) => g as unknown as Doc)
      .catch(() => ({}) as Doc)
  const [faqs, tickets, offers, events, site, assistant] = await Promise.all([
    find('faqs'),
    find('tickets', { sort: 'order' }),
    find('offers', { where: { _status: { equals: 'published' } } }),
    find('events', { where: { _status: { equals: 'published' } } }),
    glob('site-settings'),
    glob('assistant'),
  ])
  const s = site as { name?: string; todayHours?: string; address?: { line?: string }[]; phoneDisplay?: string; whatsapp?: string; hours?: { label?: string; value?: string }[] }
  const facts: Fact[] = [
    // First, so "how much are tickets?" gets every price at once.
    ...(tickets.length ? [{ q: `${SYN.price} all`, a: tickets.map((tk) => `${tk.name}: ₹${tk.price}`).join(' · '), link: '/book' }] : []),
    ...faqs.map((f) => ({ q: String(f.q ?? ''), a: String(f.a ?? '') })),
    ...tickets.map((tk) => ({ q: `${tk.name} ${SYN.price} include`, a: `${tk.name}: ₹${tk.price}. ${tk.summary ?? ''}`.trim(), link: `/book?ticket=${tk.code}` })),
    ...offers.filter((o) => o.status !== 'Ended').map((o) => ({ q: `${o.name} ${SYN.offer} ${o.tag ?? ''}`, a: `${o.name}: ${o.deal}. ${o.terms ?? ''}`.trim(), link: `/offers/${o.slug}` })),
    ...events.map((e) => ({ q: `${e.name} event ${e.when}`, a: `${e.name} (${e.when}): ${e.blurb}`, link: `/whats-on/${e.slug}` })),
    { q: `${SYN.hours} today`, a: [s.todayHours, ...(s.hours ?? []).map((h) => `${h.label}: ${h.value}`)].filter(Boolean).join(' · '), link: '/plan' },
    { q: SYN.where, a: (s.address ?? []).map((a) => a.line).filter(Boolean).join(', '), link: '/plan#getting-here' },
    { q: `${SYN.phone} helpline`, a: s.phoneDisplay ? `Call ${s.phoneDisplay}.` : '', link: '/plan' },
  ].filter((f) => f.a)
  return { facts, assistant: assistant as { provider?: string; instructions?: string; enabled?: boolean }, whatsapp: s.whatsapp || '', name: s.name || 'Nicco Park' }
}

/**
 * Rare words count more (a question about "dogs" must match "dogs", not just
 * "bring"). A fact is used only when it covers most of what was asked.
 */
function bestFacts(facts: Fact[], question: string, n = 3) {
  const q = [...new Set(words(question))]
  if (!q.length) return []
  const bags = facts.map((f) => new Set(words(`${f.q} ${f.a}`)))
  const has = (bag: Set<string>, w: string) => bag.has(w) || (w.length >= 3 && [...bag].some((h) => h.length >= 3 && (h.startsWith(w) || w.startsWith(h))))
  const weight = (w: string) => Math.log((facts.length + 1) / (bags.filter((b) => has(b, w)).length + 0.5))
  const wq = q.map((w) => ({ w, wt: weight(w) }))
  const total = wq.reduce((a, x) => a + x.wt, 0) || 1
  return facts
    .map((f, i) => ({ f, cover: wq.reduce((a, x) => a + (has(bags[i], x.w) ? x.wt : 0), 0) / total }))
    .filter((x) => x.cover >= 0.5)
    .sort((a, b) => b.cover - a.cover)
    .slice(0, n)
    .map((x) => x.f)
}

/** Everyday words in Bengali and Hindi for the questions people ask most. */
const SYN = {
  price: 'price cost rate fee ticket tickets দাম মূল্য টাকা টিকিট कीमत दाम रेट टिकट रुपये',
  hours: 'hours timing time open opening close closing সময় খোলা বন্ধ কখন समय खुलता खुलने बंद कब',
  where: 'address location where reach get go travel directions metro bus cab parking ঠিকানা কোথায় যাব কীভাবে पता कहाँ कैसे पहुँचें',
  phone: 'phone call contact number ফোন নম্বর যোগাযোগ फोन नंबर संपर्क',
  offer: 'offer discount deal অফার ছাড় অফারে ऑफर छूट डिस्काउंट',
}

const FALLBACK: Record<Lang, string> = {
  en: "I'm not sure about that one. Our team can help on WhatsApp, or leave your number and we'll call you back.",
  bn: 'এটা আমি ঠিক জানি না। আমাদের টিম WhatsApp-এ সাহায্য করতে পারে, অথবা নম্বর রেখে যান, আমরা ফোন করব।',
  hi: 'इसके बारे में मुझे पक्का नहीं पता। हमारी टीम WhatsApp पर मदद कर सकती है, या अपना नंबर छोड़ दें, हम कॉल करेंगे।',
}

/* A small per-IP limit so the AI can't be run up as a bill. */
const hits = new Map<string, number[]>()
function limited(ip: string) {
  const now = Date.now()
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 60_000)
  list.push(now)
  hits.set(ip, list)
  if (hits.size > 5000) hits.clear()
  return list.length > 20
}

export async function answer(payload: Payload, input: { message: string; lang: Lang; history?: { role: 'user' | 'assistant'; text: string }[]; ip: string }) {
  const message = input.message.trim().slice(0, 500)
  const lang: Lang = ['en', 'bn', 'hi'].includes(input.lang) ? input.lang : 'en'
  if (!message) return { text: '', links: [] }
  if (limited(input.ip)) return { text: FALLBACK[lang], links: [], handoff: true }
  const k = await knowledge(payload, lang)
  const top = bestFacts(k.facts, message)
  const links = top.filter((f) => f.link).map((f) => f.link!) as string[]

  if (k.assistant.provider === 'ai' && process.env.ANTHROPIC_API_KEY) {
    try {
      const system = [
        `You are the website helper for ${k.name}, an amusement park in Salt Lake, Kolkata, India.`,
        `Reply in ${lang === 'bn' ? 'Bengali' : lang === 'hi' ? 'Hindi' : 'English'}, in 1–3 short sentences, friendly and plain.`,
        'Use ONLY the facts below. If the answer is not in them, say you are not sure and suggest WhatsApp or a call-back. Never invent prices, timings, rules or availability. Prices are in Indian rupees and include taxes.',
        'Do not collect personal details in chat. For bookings, point to the Buy tickets page.',
        k.assistant.instructions ? `Extra guidance from the park: ${k.assistant.instructions}` : '',
        '',
        'FACTS:',
        ...k.facts.map((f) => `- ${f.a}${f.link ? ` (page: ${f.link})` : ''}`),
      ]
        .filter(Boolean)
        .join('\n')
      const history = (input.history ?? []).slice(-6).map((h) => ({ role: h.role, content: h.text.slice(0, 500) }))
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5', max_tokens: 350, system, messages: [...history, { role: 'user', content: message }] }),
        signal: AbortSignal.timeout(15_000),
      })
      if (r.ok) {
        const j = (await r.json()) as { content?: { type: string; text?: string }[] }
        const text = j.content?.find((c) => c.type === 'text')?.text?.trim()
        if (text) return { text, links, ai: true }
      }
    } catch (e) {
      payload.logger.warn({ err: e }, 'Assistant AI failed; using FAQ answers')
    }
  }

  if (!top.length) return { text: FALLBACK[lang], links: [], handoff: true }
  return { text: top[0].a, links, more: top.slice(1).map((f) => f.a) }
}
