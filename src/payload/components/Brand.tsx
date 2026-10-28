import Link from 'next/link'
import { StaffFlag } from './StaffFlag'

/* Admin branding: the park logo on the login screen and in the nav. */

export function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo.png" alt="Nicco Park" width={70} height={62} style={{ borderRadius: 12 }} />
      <div>
        <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1 }}>Nicco Park</div>
        <div style={{ opacity: 0.7, fontSize: 14 }}>Website CMS</div>
      </div>
    </div>
  )
}

export function Icon() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/images/logo.png" alt="Nicco Park" width={28} height={25} />
}

export function OpsNavLink() {
  return (
    <div style={{ padding: '8px 0 4px' }}>
      <StaffFlag />
      <Link href="/admin/editor" className="nav__link" style={{ fontWeight: 600 }}>
        🧩 Visual editor
      </Link>
      <Link href="/admin/leads" className="nav__link" style={{ fontWeight: 600 }}>
        📥 Leads inbox
      </Link>
      <Link href="/admin/ops" className="nav__link" style={{ fontWeight: 600 }}>
        📊 Operations dashboard
      </Link>
      <Link href="/en/hero-options" target="_blank" className="nav__link">
        🎨 Home banner styles ↗
      </Link>
      <Link href="/en" target="_blank" className="nav__link">
        🌐 Open the website ↗
      </Link>
    </div>
  )
}
