import { media } from './media'
import type { Ride, World } from './types'

export const worlds: World[] = [
  {
    key: 'dry',
    slug: 'dry-park',
    name: 'Dry Park',
    kicker: 'Ride · Amusement park',
    pitch: 'Coasters and classics',
    lede: 'Kolkata’s favourite rides since 1991, from India’s biggest wooden roller coaster to the Toy Train.',
    hero: media('cyclone', 'Riders on the Cyclone wooden roller coaster'),
    card: {
      image: media('skydiver', 'The Sky Diver tower'),
      blurb: 'The Cyclone, an 80-foot Sky Diver, a pirate ship and gentle rides for little ones.',
      priceLine: 'From ₹500',
    },
    cta: { label: 'Book from ₹500', href: '/book' },
    tabCta: { label: 'Buy tickets', sub: 'from ₹500', href: '/book' },
    facts: [
      { k: 'Rides open', v: '10:45 AM – 7:30 PM' },
      { k: 'Included with entry', v: '16 rides' },
      { k: 'Biggest thrill', v: '750 m Cyclone' },
      { k: 'Food court', v: 'Till 8:00 PM' },
    ],
    ridesTitle: 'Every ride, in one place',
  },
  {
    key: 'wet',
    slug: 'wet-o-wild',
    name: 'Wet-O-Wild',
    kicker: 'Splash · Water park',
    pitch: 'Slides and the wave pool',
    lede: 'Six landscaped acres of slides, a wave pool, a waterfall and an artificial beach, plus the new Aqua Drop and Aqua Curl.',
    hero: media('funnel', 'The Tornado Funnel water ride'),
    card: {
      image: media('funnel', 'The Tornado Funnel water ride'),
      blurb: 'Tornado Funnel, Thunder Bowl, a wave pool and the new Aqua Drop on six acres.',
      priceLine: 'In the Parks Package',
    },
    cta: { label: 'Book the Parks Package · ₹1,300', href: '/book?ticket=pkg' },
    tabCta: { label: 'Buy tickets', sub: 'Package ₹1,300', href: '/book?ticket=pkg' },
    facts: [
      { k: 'Last entry', v: '5:00 PM' },
      { k: 'Facilities open', v: '11:00 AM – 6:00 PM' },
      { k: 'Beach Café', v: '11:00 AM – 6:00 PM' },
      { k: 'Lockers & swimwear', v: 'Rent inside' },
    ],
    ridesTitle: 'Slides, pools and splash zones',
  },
  {
    key: 'bowl',
    slug: 'super-bowl',
    name: 'Super Bowl',
    kicker: 'Strike · Bowling & games',
    pitch: 'Lanes, pool and DJ nights',
    lede: 'Four lanes, four pool tables, two air hockey tables and coin games, with DJ music and food. Kolkata’s bowling alley.',
    hero: media('bowl26', 'Neon-lit bowling lanes at Nicco Super Bowl'),
    card: {
      image: media('bowl22', 'Friends bowling at Super Bowl'),
      blurb: 'Four lanes, four pool tables, air hockey and DJ nights. Open till 10 PM at weekends.',
      priceLine: '₹250 a game',
    },
    cta: { label: 'Book a lane', href: '#lane' },
    tabCta: { label: 'Book a lane', sub: '₹250 a game', href: '/worlds/super-bowl#lane' },
    facts: [
      { k: 'Weekdays', v: '1:00 – 9:00 PM' },
      { k: 'Weekends & holidays', v: '1:00 – 10:00 PM' },
      { k: 'Bowling lanes', v: '4' },
      { k: 'Pool tables', v: '4' },
    ],
  },
  {
    key: 'snow',
    slug: 'snow-park',
    name: 'Snow Park',
    kicker: 'Freeze · Coming soon',
    pitch: 'Coming soon: join the waitlist',
    lede: 'Real snow, all year round, right next to the rides. The fourth world at Nicco Park is on its way.',
    card: {
      blurb: 'Real snow in Kolkata, all year round. Gear included in every slot.',
      priceLine: 'Join the waitlist',
    },
    cta: { label: 'Join the waitlist', href: '#waitlist' },
    tabCta: { label: 'Join waitlist', sub: 'Snow Park', href: '/worlds/snow-park#waitlist' },
    facts: [
      { k: 'Opening', v: 'Date to be announced' },
      { k: 'Gear', v: 'Included in every slot' },
      { k: 'Booking', v: 'Timed slots online' },
      { k: 'Combos', v: 'With any Nicco ticket' },
    ],
    comingSoon: true,
  },
]

const r = (
  world: Ride['world'],
  name: string,
  kind: Ride['kind'],
  img: string | null,
  line: string,
  access: Ride['access'],
  status: Ride['status'] = 'open',
): Ride => ({
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  world,
  kind,
  line,
  image: img ? media(img, name) : undefined,
  access,
  status,
})

export const rides: Ride[] = [
  r('dry', 'Cyclone', 'thrill', 'cyclone', 'India’s biggest wooden roller coaster: 750 m of loops, turns and drops.', 'package'),
  r('dry', 'Sky Diver', 'thrill', 'skydiver', 'Up 80 feet on a colourful tower, then the drop.', 'package'),
  r('dry', 'Moon Racker', 'thrill', 'moon', 'A rollicking coaster with thrills round every bend.', 'day'),
  r('dry', 'Pirate Ship', 'thrill', 'pirate', 'A pendulum that swings higher with every pass.', 'day'),
  r('dry', 'Bull Ride', 'thrill', 'bull', 'Take the bull by the horns. How long can you last?', 'pay'),
  r('dry', 'Water Coaster', 'thrill', 'watercoaster', 'Climb, plunge and splash: a coaster that finishes in the water.', 'package'),
  r('dry', 'Water Chute', 'family', 'waterchute', 'A boat ride that ends in one giant splash.', 'package'),
  r('dry', 'Twist & Turn', 'family', 'twist', 'Spinning pods for a dizzy family giggle.', 'package'),
  r('dry', 'Spider Wheel', 'family', 'spider', 'New: eight gondolas on a 36-foot wheel.', 'day'),
  r('dry', 'Octopus', 'family', 'octopus', 'Tentacle arms that lift, spin and twirl.', 'day'),
  r('dry', 'Crazy Tea Party', 'little', 'teaparty', 'Spinning teacups for the whole family.', 'day'),
  r('dry', 'Toy Train', 'little', 'toytrain', 'Eight carriages and a musical tour of the park.', 'day'),
  r('dry', 'Caterpillar', 'little', 'caterpillar', 'A smiling train for first-time riders.', 'day'),
  r('dry', 'Family Carousel', 'little', 'carousel', 'Horses, music and lights for the littlest riders.', 'day'),
  r('dry', 'MiG-21', 'sights', 'mig', 'A real fighter jet from the Indian Air Force.', 'day'),
  r('dry', 'Eiffel Tower', 'sights', 'eiffel', 'Panoramic views across the park.', 'day'),
  r('dry', 'Mirror Maze', 'sights', 'mirror', 'Find your way out before your friends do.', 'day'),
  r('dry', 'Paddle Boat', 'sights', 'paddle', 'A slow loop across the lake.', 'day'),
  r('wet', 'Tornado Funnel', 'thrill', 'funnel', 'A 260-foot tunnel into a 40-foot cone, with a moment of zero gravity.', 'package'),
  r('wet', 'Thunder Bowl', 'thrill', null, 'Rafts drop from a 40-foot tower through 195 feet of tunnel into a giant bowl.', 'package'),
  r('wet', 'Aqua Drop', 'thrill', 'aquadrop', 'New: steep drops and sudden turns in a closed tube.', 'package'),
  r('wet', 'Aqua Curl', 'thrill', 'newrides', 'New: twists all the way down.', 'package'),
  r('wet', 'Crazy River', 'family', 'crazyriver', 'Grab a tube and a friend and go with the flow.', 'package'),
  r('wet', 'Family Squirl', 'family', 'squirl', 'A raft slide the whole family can ride together.', 'package'),
  r('wet', 'Tube Slide', 'family', 'tubeslide', 'Classic tube twists into a big pool.', 'package'),
  r('wet', 'Wave Pool', 'family', 'wavepool', 'Waves, a waterfall and an artificial beach.', 'package'),
  r('wet', 'Rain Dance', 'family', 'raindance', 'Music, sprinklers and the best party in the park.', 'package'),
  r('wet', 'Pirates Bay', 'little', 'piratesbay', 'A splash playground with buckets, sprays and slides.', 'package'),
  r('wet', 'Niagara', 'sights', 'niagara', 'Our rock waterfall, the classic photo spot.', 'package'),
  r('wet', 'Lazy River', 'family', null, 'A slow float around the Crusader island.', 'package', 'maintenance'),
]

export const rideKindLabel: Record<Ride['kind'], string> = {
  thrill: 'Thrill',
  family: 'Family',
  little: 'Little ones',
  sights: 'Sights',
}

export const rideAccessLabel: Record<Ride['access'], string> = {
  day: 'In Dry Park Day',
  package: 'Parks Package',
  pay: 'Pay at the ride',
}

export const snowPlans = [
  { title: 'Real snow, every day', body: 'An indoor snow zone that runs all year, monsoon and summer included.' },
  { title: 'Everything included', body: 'Jacket, boots, gloves and socks in every slot. No surprise extras at the counter.' },
  { title: 'Timed slots', body: 'Book a time, skip the wait. Add it to any Nicco ticket.' },
  { title: 'One cart, four worlds', body: 'Ride, splash, freeze and strike in one day, on one QR.' },
]
