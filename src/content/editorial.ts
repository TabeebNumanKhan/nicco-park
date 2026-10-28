import { media } from './media'
import type { Crew, Faq, FoodOutlet, Moment, Occasion, Offer, ParkEvent, Route, Tip, Venue } from './types'

export const offers: Offer[] = [
  { tag: 'Students', category: 'students', name: 'Student offer', deal: '20% off · ₹400 / ₹1,040', terms: 'Dry Park Day or Parks Package. Show a valid college ID at the gate.', status: 'Live', theme: 'dry', cta: { label: 'Book student tickets', href: '/book?student=1' } },
  { tag: 'Everyone', category: 'season', name: 'Fun Fest', deal: '15% off · ₹425 / ₹1,105', terms: 'On selected dates through the season. Watch WhatsApp for the next window.', status: 'Live', theme: 'yellow', cta: { label: 'See Fun Fest dates', href: '/book' } },
  { tag: 'Government staff', category: 'id', name: 'Government employees', deal: 'Special price with ID', terms: 'For government employees. Bring valid ID to the gate.', status: 'Live', theme: 'ink', cta: { label: 'Book with ID offer', href: '/book' } },
  { tag: 'Families', category: 'families', name: 'Little ones go free', deal: 'Under 80 cm: free', terms: 'On every ticket, every day. No ticket needed, we measure at the gate.', status: 'Always', theme: 'mint', cta: { label: 'Book a family day', href: '/book' } },
  { tag: 'Seasonal', category: 'season', name: 'Summer offer', deal: 'Returns in April', terms: 'Beat the heat at Wet-O-Wild. Join the WhatsApp list to hear first.', status: 'Coming', theme: 'wet', cta: { label: 'Get notified', href: '#offers-signup' } },
  { tag: 'Seasonal', category: 'season', name: 'Monsoon Masti', deal: 'Returns in July', terms: 'Rainy-season prices on the Parks Package.', status: 'Coming', theme: 'wet', cta: { label: 'Get notified', href: '#offers-signup' } },
  { tag: 'Regulars', category: 'families', name: 'Annual Fun Ticket', deal: 'Come back all year', terms: 'One pass for repeat visits to the Dry Park and Wet-O-Wild. [Price and visit rules to confirm]', status: 'Live', theme: 'bowl', cta: { label: 'See the pass', href: '/offers' } },
]

export const events: ParkEvent[] = [
  { months: [0], when: '1 Jan', name: 'New Year’s Day', blurb: 'Start the year with a ride. One of our busiest days, so book ahead.', image: media('event2', 'Evening event on the lawns'), tone: 'alert' },
  { months: [10, 11, 0, 1], when: 'Nov – Feb', name: 'Winter season', blurb: 'Clear skies, the shortest queues and perfect weather for the Cyclone and the Sky Diver.', image: media('eiffel', 'The Eiffel Tower replica'), tone: 'dry' },
  { months: [2], when: 'Dol Yatra', name: 'Park closed for Holi', blurb: 'Our one day off a year. Colours are not allowed in the park around Holi.', image: media('niagara', 'The Niagara waterfall'), tone: 'alert' },
  { months: [3], when: 'Mid-April', name: 'Poila Baisakh', blurb: 'Celebrate Bengali New Year with a family day out.', image: media('carousel', 'The family carousel'), tone: 'dry' },
  { months: [3, 4, 5], when: 'Apr – Jun', name: 'Summer Splash', blurb: 'Wet-O-Wild season. Wave pool, rain dance, the new Aqua Drop and the Summer offer.', image: media('wavepool', 'The wave pool'), tone: 'wet' },
  { months: [6, 7, 8], when: 'Jul – Sep', name: 'Monsoon Masti', blurb: 'Get wet either way. Rainy-season prices on the Parks Package.', image: media('crazyriver', 'Friends on a tube at Crazy River'), tone: 'wet' },
  { months: [8, 9], when: 'Sep – Oct', name: 'Durga Puja: Fun Express', blurb: 'Fast-track entry so pandal-hoppers skip the queues, all rides included.', image: media('waterchute', 'The Water Chute splashing down'), tone: 'alert' },
  { months: [11], when: '25 Dec – 1 Jan', name: 'Christmas & New Year', blurb: 'Festive days at the park. Our busiest week, so book early.', image: media('event2', 'Evening event on the lawns'), tone: 'alert' },
  { months: [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9], when: 'Every weekend', name: 'Super Bowl nights', blurb: 'Lanes and DJ music till 10 PM on Saturdays and Sundays.', image: media('bowl15', 'Neon bowling lanes'), tone: 'bowl' },
]

export const homeHighlights: ParkEvent[] = [events[1], events[7], events[4], events[8]]

export const crews: Crew[] = [
  { id: 'kids', label: 'Family with little ones', title: 'A splashy day with little ones', image: media('piratesbay', 'Children playing at Pirates Bay splash zone'), ticket: 'Parks Package · ₹1,300 (under 80 cm free)', cta: { label: 'Book this day', href: '/book?ticket=pkg' },
    steps: [{ time: '10:45 AM', what: 'Toy Train, Caterpillar and the Crazy Tea Party while queues are short' }, { time: '12:30 PM', what: 'Lunch at the food court, then sunscreen top-up' }, { time: '1:30 PM', what: 'Pirates Bay splash zone and the wave pool at Wet-O-Wild' }] },
  { id: 'college', label: 'College gang', title: 'Scream, splash, strike', image: media('watercoaster', 'Rider on the Water Coaster'), ticket: 'Student Parks Package · ₹1,040 with college ID', cta: { label: 'Book with student offer', href: '/book?ticket=pkg&student=1' },
    steps: [{ time: '10:45 AM', what: 'Cyclone, Sky Diver and the Bull Ride, back to back' }, { time: '1:00 PM', what: 'Tornado Funnel, Thunder Bowl and Aqua Drop at Wet-O-Wild' }, { time: '5:30 PM', what: 'Bowling and air hockey at Super Bowl till close' }] },
  { id: 'couples', label: 'Couples', title: 'Slow afternoon, neon evening', image: media('paddle', 'A paddle boat on the lake'), ticket: 'Dry Park · ₹500 + bowling ₹250', cta: { label: 'Book this day', href: '/book?ticket=dry' },
    steps: [{ time: '2:00 PM', what: 'Paddle boat across the lake and the Eiffel Tower views' }, { time: '4:30 PM', what: 'Pirate Ship and Moon Racker for a little adrenaline' }, { time: '6:30 PM', what: 'A lane for two at Super Bowl, with DJ music' }] },
  { id: 'groups', label: 'Birthday or office', title: 'Birthdays, offices and schools', image: media('bowl3', 'Seating lounge at Super Bowl'), ticket: 'Venues for 50 to 5,000 guests', cta: { label: 'Plan a group day', href: '/groups' },
    steps: [{ time: 'Venue', what: 'Halls, lawns or the whole water park, with parking on site' }, { time: 'Food', what: 'Menus from the park kitchens, veg and non-veg' }, { time: 'Fun', what: 'Ride wristbands for every guest, or a bowling tournament' }] },
]

export const moments: Moment[] = [
  { world: 'wet', image: media('crazyriver', 'Two friends on a tube at Crazy River'), handle: '@riya.and.tia', caption: 'Best friends, one tube', ride: 'Crazy River', tall: true },
  { world: 'dry', image: media('cyclone', 'Front row on the Cyclone'), handle: '@arjun_screams', caption: 'Front row on the Cyclone', ride: 'Cyclone', tall: true },
  { world: 'bowl', image: media('bowl22', 'Friends bowling at Super Bowl'), handle: '@saltlake_squad', caption: 'Office team night', ride: 'a lane' },
  { world: 'wet', image: media('tubeslide', 'Boy on the tube slide'), handle: '@aarav_rides', caption: 'His first big slide', ride: 'Tube Slide', tall: true },
  { world: 'dry', image: media('teaparty', 'Spinning teacups'), handle: '@mom.of.two.kol', caption: 'Dizzy and delighted', ride: 'Tea Party' },
  { world: 'wet', image: media('raindance', 'Crowd at Rain Dance'), handle: '@puja_dance_crew', caption: 'Rain dance, full volume', ride: 'Rain Dance' },
  { world: 'dry', image: media('bull', 'Man on the Bull Ride'), handle: '@rohan.vs.bull', caption: 'Lasted 9 seconds', ride: 'Bull Ride', tall: true },
  { world: 'wet', image: media('waterchute', 'Boat splashing down the Water Chute'), handle: '@the.dasguptas', caption: 'Everyone got soaked', ride: 'Water Chute' },
  { world: 'dry', image: media('eiffel', 'Eiffel Tower replica'), handle: '@kolkata.weekends', caption: 'Paris, Salt Lake edition', ride: 'Eiffel Tower' },
  { world: 'bowl', image: media('bowl15', 'Neon bowling lanes'), handle: '@neon.nights.kol', caption: 'Strike under the lights', ride: 'a lane', tall: true },
  { world: 'wet', image: media('piratesbay', 'Kids at Pirates Bay'), handle: '@little.splashers', caption: 'Pirates Bay crew', ride: 'Pirates Bay' },
  { world: 'dry', image: media('skydiver', 'The Sky Diver tower'), handle: '@heightsnotfears', caption: '80 feet, eyes open', ride: 'Sky Diver' },
]

export const occasions: Occasion[] = [
  { id: 'corp', label: 'Office day-out', title: 'Office day-outs & conferences', image: media('eastside', 'Eastside Pavilion lit up for an event'), pitch: 'Hold the meeting in an air-conditioned hall, then let the team loose on the rides. Companies have run their own bowling tournaments here too.', points: ['Pillarless AC halls for 80 to 300 people', 'Lawns and the water park for 2,000+', 'Ride access and meals for every guest'] },
  { id: 'school', label: 'School trip', title: 'School trips', image: media('corner', 'Children’s Corner playground'), pitch: 'A safe, supervised day with rides for every age, plus the MiG-21 and the Toy Train as a bonus history lesson.', points: ['Group pricing on request', 'Meal packages from the food court', 'Parking on site'] },
  { id: 'bday', label: 'Birthday', title: 'Birthday parties', image: media('bowl15', 'Neon bowling lanes'), pitch: 'Bowling and pool at Super Bowl, a party hall or a whole day on the rides. You bring the cake.', points: ['Private party space at Super Bowl', 'Food and drinks from Bowlers’ Den', 'Add ride tickets for every guest'] },
  { id: 'wedding', label: 'Wedding', title: 'Weddings & receptions', image: media('waterside', 'Waterside hall decorated for a reception'), pitch: 'Lawns, courtyards and halls by the water, with kitchens on site and space for every relative.', points: ['Eastside Pavilion: 10,000 sq ft hall + 25,000 sq ft lawn', 'Kitchen space and a green room', 'Exclusive car parking'] },
  { id: 'brand', label: 'Brand activation', title: 'Brand activations', image: media('hero', 'Aerial view of the park'), pitch: 'Around 1.5 million visitors a year means sampling, launches and joint promotions with real reach.', points: ['Product sampling and launch events', 'Glow-sign advertising at Super Bowl', 'Joint sales promotions on tickets'] },
]

export const venues: Venue[] = [
  { name: 'Eastside Pavilion', image: media('eastside', 'Eastside Pavilion'), description: '10,000 sq ft pillarless AC hall with a 25,000 sq ft lawn and themed entrance.', capacity: '2,000 – 2,500 guests' },
  { name: 'Wet-O-Wild', image: media('water', 'Wet-O-Wild walkway'), description: 'The whole water park: wave pool, waterfall and artificial beach on six acres.', capacity: '2,000 – 2,500 guests' },
  { name: 'Waterside I', image: media('waterside', 'Waterside I hall'), description: '3,500 sq ft AC hall, green room, 2,500 sq ft kitchen and an 8,000 sq ft terrace.', capacity: 'Conference 200 · party 300' },
  { name: 'Waterside II', image: media('waterside', 'Waterside II hall'), description: '1,500 sq ft circular AC hall beside the water park.', capacity: 'Conference 80 · party 100' },
  { name: 'Royal Courtyard', image: media('royal', 'Royal Courtyard'), description: 'A decorated courtyard for receptions and evening events.', capacity: '[Capacity to confirm]' },
  { name: 'Nicco Super Bowl', image: media('bowl3', 'Nicco Super Bowl lounge'), description: 'Four lanes, pool tables and air hockey for private parties and tournaments.', capacity: 'Private parties' },
]

export const faqs: Faq[] = [
  { q: 'What are the opening hours?', a: 'Gates open at 10:30 AM and rides start at 10:45 AM. Ticket counters close at 6:45 PM, rides run till 7:30 PM and the food court till 8 PM. Wet-O-Wild takes its last entry at 5 PM.' },
  { q: 'Is the park open on holidays?', a: 'Yes, every day including Sundays and public holidays. The only closure is Dol Yatra (Holi).' },
  { q: 'Do children need a ticket?', a: 'Children under 80 cm tall enter free. Anyone 80 cm or taller needs a ticket at the standard price.' },
  { q: 'What does the Parks Package include?', a: 'Every Dry Park ride plus a full day at Wet-O-Wild. The Bull Ride, Shoot the Bhoot, VR theatre and coin games are paid separately.' },
  { q: 'Can I change my date?', a: 'Yes, free of charge until the day before your visit, from Manage booking or on WhatsApp. Tickets are not refundable.' },
  { q: 'Can I book for today?', a: 'Online booking closes the night before. You can still buy at the gate on the day.' },
  { q: 'Where do I show my ticket?', a: 'Show the QR from WhatsApp, SMS or email at the gate. One QR lets your whole group in.' },
]

export const food: FoodOutlet[] = [
  { name: 'Food court', where: 'Dry Park · 11 AM – 8 PM', blurb: 'Indian thalis, Chinese, South Indian and snacks. Thalis from ₹190.', tone: 'yellow' },
  { name: 'Beach Café', where: 'Wet-O-Wild · 11 AM – 6 PM', blurb: 'Quick bites between slides, right by the pools.', tone: 'wet' },
  { name: 'Burger Corner', where: 'Dry Park', blurb: 'Burgers and fries for the walk out.', tone: 'neutral' },
  { name: 'Bowlers’ Den', where: 'Super Bowl · from 1 PM', blurb: 'Food and drinks served at the lanes.', tone: 'bowl' },
]

export const tips: Tip[] = [
  { title: 'Book by the day before', body: 'Online booking closes the night before. Same-day tickets are sold at the gate.' },
  { title: 'Under 80 cm go free', body: '80 cm and taller pay the standard price. We measure at the gate.' },
  { title: 'One entry per ticket', body: 'Re-entry isn’t allowed, so bring everything you need.' },
  { title: 'For Wet-O-Wild', body: 'Lockers and swimwear are available to rent inside.' },
  { title: 'No colours', body: 'Carrying or wearing colours isn’t allowed in the park.' },
  { title: 'Buy only official tickets', body: 'This site, our gate, District or Yatri Sathi. Never from touts outside.' },
]

export const routes: Route[] = [
  { title: 'By Metro', body: 'Salt Lake Sector V (Green Line) is closest: about 20 minutes on foot or a short auto ride. Karunamoyee is around 2 km away.' },
  { title: 'By car', body: 'Parking is available on site. Search "Nicco Park, Jheel Meel, Sector IV" in your maps app.' },
  { title: 'By cab or Yatri Sathi', body: 'Ask for the Nicco Park main gate. Yatri Sathi users can book park tickets in the same app.' },
]

/** Home hero slides (Payload collection `hero-slides`, ordered). Each one sells something. */
export type HeroSlide = {
  id: string
  /** Short label for the slide tabs. */
  tab: string
  eyebrow: string
  title: string
  body: string
  image?: ReturnType<typeof media>
  tone: 'ink' | 'dry' | 'wet' | 'bowl' | 'snow' | 'alert'
  badge?: string
  price?: string
  cta: { label: string; href: string }
  secondary?: { label: string; href: string }
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'brand',
    tab: 'Nicco Park',
    eyebrow: 'Salt Lake, Kolkata · Since 1991',
    title: 'Ride. Splash. Strike.',
    body: "Kolkata's biggest day out. India's biggest wooden roller coaster, a six-acre water park and neon bowling lanes, all through one gate.",
    image: media('cyclone', 'Riders on the Cyclone wooden roller coaster'),
    tone: 'ink',
    price: 'Tickets from ₹400',
    cta: { label: 'Pick your date', href: '/book' },
    secondary: { label: 'Explore the worlds', href: '/worlds/dry-park' },
  },
  {
    id: 'funfest',
    tab: 'Fun Fest',
    eyebrow: 'Offer · Live now',
    title: 'Fun Fest: 15% off',
    body: 'The Parks Package for ₹1,105 and Dry Park Day for ₹425 on selected dates. Rides and Wet-O-Wild in one ticket.',
    image: media('crazyriver', 'Friends on a tube at Crazy River'),
    tone: 'wet',
    badge: 'Limited dates',
    price: 'Parks Package from ₹1,105',
    cta: { label: 'Grab the offer', href: '/book?ticket=pkg' },
    secondary: { label: 'All offers', href: '/offers' },
  },
  {
    id: 'newyear',
    tab: 'New Year',
    eyebrow: 'Coming up · 25 Dec – 1 Jan',
    title: 'Christmas & New Year at Nicco',
    body: 'Festive days at the park and our busiest week of the year. Book your date now and walk straight in with your QR.',
    image: media('event2', 'Evening celebration on the park lawns'),
    tone: 'alert',
    badge: 'Book early',
    price: 'From ₹500',
    cta: { label: 'Book your date', href: '/book' },
    secondary: { label: "What's on", href: '/whats-on' },
  },
  {
    id: 'wet',
    tab: 'Wet-O-Wild',
    eyebrow: 'Wet-O-Wild water park',
    title: 'Six acres of splash',
    body: 'Tornado Funnel, the wave pool and the new Aqua Drop. Every slide is in the Parks Package, with all the Dry Park rides.',
    image: media('funnel', 'The Tornado Funnel water ride'),
    tone: 'wet',
    price: 'Parks Package ₹1,300',
    cta: { label: 'Book the Parks Package', href: '/book?ticket=pkg' },
    secondary: { label: 'See the slides', href: '/worlds/wet-o-wild' },
  },
  {
    id: 'bowl',
    tab: 'Super Bowl',
    eyebrow: 'Super Bowl nights',
    title: 'Strike under the neon',
    body: 'Four lanes, pool tables and air hockey, with DJ music till 10 PM at weekends.',
    image: media('bowl15', 'Neon-lit bowling lanes at Nicco Super Bowl'),
    tone: 'bowl',
    price: '₹250 a game',
    cta: { label: 'Book a lane', href: '/worlds/super-bowl#lane' },
    secondary: { label: 'Rate card', href: '/worlds/super-bowl' },
  },
  {
    id: 'snow',
    tab: 'Snow Park',
    eyebrow: 'Coming soon',
    title: 'Snow Park is on its way',
    body: 'Real snow in Kolkata, all year round. Join the waitlist for the opening date and early-bird tickets.',
    tone: 'snow',
    badge: 'New',
    cta: { label: 'Join the waitlist', href: '/worlds/snow-park#waitlist' },
    secondary: { label: 'What we are planning', href: '/worlds/snow-park' },
  },
]
