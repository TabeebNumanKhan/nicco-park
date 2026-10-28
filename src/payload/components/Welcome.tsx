import Link from 'next/link'

/** First thing editors see after logging in: the jobs they do most. */
export function Welcome() {
  const card = { display: 'block', padding: '18px 20px', borderRadius: 14, border: '1px solid var(--theme-elevation-150)', background: 'var(--theme-elevation-50)', textDecoration: 'none' }
  const items: [string, string, string][] = [
    ['🧩 Visual editor', '/admin/editor', 'Like Shopify: add, move and hide sections and see the real page on phone, tablet or desktop as you type.'],
    ['📥 Leads inbox', '/admin/leads', 'Every enquiry and sign-up, by day. Filter, mark as handled, export to Excel.'],
    ['🏷️ Offers & campaign pages', '/admin/collections/offers', 'Each offer has its own landing page with A/B variants for ads.'],
    ["🎉 What's on (events)", '/admin/collections/events', 'Festivals and seasons, each with its own page.'],
    ['➕ Add a new page', '/admin/editor?kind=pages', 'In the visual editor press New, then stack sections, e.g. a summer campaign.'],
    ['🖼️ Media library', '/admin/collections/media', 'Photos, videos, logos, fonts and PDFs, in folders.'],
    ['🎨 Logo, colours & fonts', '/admin/globals/theme', 'Brand settings for the whole site.'],
    ['🎟️ Ticket prices', '/admin/collections/tickets', 'Prices and what each ticket includes.'],
    ['🚧 Ride alerts & hours', '/admin/globals/site-settings', "Today's timings and closures shown across the site."],
    ['🌐 Button & label text', '/admin/collections/translations', 'Every small piece of text in English, Bengali and Hindi.'],
    ['📊 Sales, scans & A/B results', '/admin/ops', 'Bookings, capacity, campaigns and leads (separate database).'],
  ]
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ marginBottom: 6 }}>Welcome to the Nicco Park CMS</h2>
      <p style={{ marginBottom: 18, opacity: 0.8 }}>
        Switch language (English · বাংলা · हिन्दी) at the top of any document, and the admin's own language under Account. Changes save as drafts; press <b>Publish</b> to put them live.
      </p>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {items.map(([h, href, s]) => (
          <Link key={href} href={href} style={card}>
            <strong style={{ display: 'block', fontSize: 16, marginBottom: 4 }}>{h}</strong>
            <span style={{ opacity: 0.75, fontSize: 14 }}>{s}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
