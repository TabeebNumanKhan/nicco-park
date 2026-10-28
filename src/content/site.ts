import type { SiteSettings } from './types'

export const siteSettings: SiteSettings = {
  name: 'Nicco Park',
  legalName: 'Nicco Parks & Resorts Ltd',
  tagline: 'Ride. Splash. Strike.',
  address: ['Jheel Meel, Sector IV, Salt Lake City', 'Kolkata 700 106'],
  phone: { display: '1800 2020 080', tel: '18002020080' },
  // TO CONFIRM: the park's WhatsApp Business number. Until it is set, every
  // "WhatsApp us" button opens the phone dialer instead (see lib/cms.ts).
  whatsapp: '',
  todayHours: '10:30 AM – 6:45 PM',
  hours: [
    { label: 'Gates & ticket counters', value: '10:30 AM – 6:45 PM', tone: 'dry' },
    { label: 'Dry Park rides', value: '10:45 AM – 7:30 PM', tone: 'dry' },
    { label: 'Wet-O-Wild (last entry 5 PM)', value: '11:00 AM – 6:00 PM', tone: 'wet' },
    { label: 'Super Bowl (weekends till 10)', value: '1:00 – 9:00 PM', tone: 'bowl' },
    { label: 'Food court', value: '11:00 AM – 8:00 PM', tone: 'neutral' },
  ],
  alerts: [
    {
      title: 'Lazy River closed today',
      detail: 'Lazy River is closed for maintenance. Every other ride is running.',
      href: '/plan#status',
    },
  ],
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/nicco_park/' },
    { label: 'Facebook', href: 'https://www.facebook.com/niccopark.kolkata' },
    { label: 'YouTube', href: 'https://www.youtube.com/@niccopark890' },
    { label: 'X', href: 'https://www.x.com/Niccopark' },
  ],
  stats: [
    { value: '1.5M', label: 'visitors every year' },
    { value: '750 m', label: "of Cyclone track, India's biggest wooden coaster" },
    { value: '40 acres', label: 'of rides, water and green in Salt Lake' },
    { value: '364', label: 'days open, closed only on Dol Yatra' },
    { value: '1991', label: 'three generations of Kolkata birthdays' },
  ],
  trust: [
    { label: 'Joint sector company with the Government of West Bengal', icon: 'shield' },
    { label: '4.4 on District from 6,900+ ratings', icon: 'star' },
    { label: 'Buy only from official channels, never from touts at the gate', icon: 'ban' },
  ],
  officialChannels: 'Official tickets: this site, our gate and our partners District and Yatri Sathi.',
}
