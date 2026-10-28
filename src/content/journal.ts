import { media } from './media'
import type { Faq, Media } from './types'

/**
 * The Joyride Journal — Nicco Park's guides and stories.
 *
 * Payload collection `posts` (drafts on, localized fields). Every string here
 * is an English source string; the Bengali and Hindi pages translate each
 * block through the same dictionary as the rest of the site, so a post is
 * written once and shows in all three languages.
 *
 * Facts in these posts come only from the park's own content in this repo
 * (tickets.ts, editorial.ts, worlds.ts, site.ts). Anything the park still has
 * to confirm is left out rather than guessed. When prices change in the CMS,
 * update the posts that quote them (search for ₹).
 */

export type JournalBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; anchor?: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[]; style?: 'tick' | 'numbered' | 'bullet' }
  | { type: 'tip'; text: string }
  | { type: 'cta'; text: string; label: string; href: string }
  | { type: 'quote'; text: string; name?: string }
  | { type: 'image'; image: Media; caption?: string; size?: 'column' | 'left' | 'right' }
  | { type: 'gallery'; images: Media[]; style?: 'grid' | 'slideshow'; caption?: string }
  | { type: 'video'; source: 'youtube' | 'vimeo' | 'upload'; url?: string; file?: string; poster?: Media; caption?: string }
  | { type: 'imageText'; image: Media; heading?: string; text: string; side?: 'left' | 'right' }
  | { type: 'offer'; offer: string }
  | { type: 'divider' }

export type JournalCategory = 'Plan your day' | 'Tickets & offers' | 'Families' | 'Schools & groups' | 'Super Bowl'

export type JournalPost = {
  slug: string
  title: string
  /** Under 160 characters: used as the meta description. */
  excerpt: string
  category: JournalCategory
  published: string // YYYY-MM-DD
  updated?: string
  readMins: number
  hero: Media
  keywords: string[]
  body: JournalBlock[]
  faqs: Faq[]
}

export const journalCategories: JournalCategory[] = ['Plan your day', 'Tickets & offers', 'Families', 'Schools & groups', 'Super Bowl']

export const journal: JournalPost[] = [
  {
    slug: 'best-time-to-visit-nicco-park',
    title: 'The best time to visit Nicco Park: by season, day and hour',
    excerpt: 'Winter for short queues, summer for Wet-O-Wild, weekday mornings for the big rides. A local guide to timing your Nicco Park day.',
    category: 'Plan your day',
    published: '2026-10-20',
    readMins: 5,
    hero: media('cyclone', 'Riders on the Cyclone wooden roller coaster'),
    keywords: ['best time to visit Nicco Park', 'Nicco Park timings', 'Nicco Park crowd', 'Nicco Park winter'],
    body: [
      { type: 'p', text: 'Nicco Park is open 364 days a year, so the real question is not when it is open but when it is at its best for you. The answer changes with the season, the day of the week and even the hour you walk through the gate.' },
      { type: 'h2', text: 'The best season: November to February' },
      { type: 'p', text: 'Kolkata’s winter is the park’s sweet spot. Clear skies, mild afternoons and the shortest queues of the year make it perfect for the Cyclone, the Sky Diver and the rest of the Dry Park.' },
      { type: 'p', text: 'Christmas week and New Year’s Day are the exceptions. They are among the busiest days of the year, so book ahead and arrive early if you are coming then.' },
      { type: 'h2', text: 'For the water park: April to June' },
      { type: 'p', text: 'Summer is Wet-O-Wild season. The wave pool, the rain dance and the new Aqua Drop are at their best when the city is at its hottest. Watch for the Summer offer, which usually returns in April.' },
      { type: 'p', text: 'In the monsoon, from July to September, you get wet either way. Monsoon Masti brings rainy-season prices on the Parks Package.' },
      { type: 'h2', text: 'The best day of the week' },
      { type: 'p', text: 'Weekdays are quieter than weekends, and Tuesdays to Thursdays are usually the calmest of all. Saturdays and Sundays are livelier, and Super Bowl stays open till 10 PM with DJ music.' },
      { type: 'h2', text: 'The best hour' },
      { type: 'list', items: [
        '10:30 AM: gates open. Be here for the shortest queues of the day.',
        '10:45 AM: rides start. Head straight for the biggest thrills.',
        'Around 1 PM: move to Wet-O-Wild after lunch, when the water feels best.',
        '5 PM: last entry to Wet-O-Wild. Plan your swim before this.',
        'Evening: rides run till 7:30 PM and the food court till 8 PM.',
      ] },
      { type: 'tip', text: 'The park is closed only on Dol Yatra (Holi). Colours are not allowed in the park around Holi.' },
      { type: 'h2', text: 'When to book' },
      { type: 'p', text: 'Online booking closes the night before your visit, so book by then. You can still buy at the gate on the day, but you will skip the counter queue with a QR ticket.' },
      { type: 'cta', text: 'Found your day? See live availability for the next three months.', label: 'Pick a date', href: '/book' },
    ],
    faqs: [
      { q: 'What is the least crowded time at Nicco Park?', a: 'Weekday mornings, right when the gates open at 10:30 AM, especially from November to February outside Christmas week.' },
      { q: 'Is Nicco Park open every day?', a: 'Yes, every day including Sundays and public holidays. The only closure is Dol Yatra (Holi).' },
      { q: 'What time does Wet-O-Wild close?', a: 'Wet-O-Wild is open from 11 AM to 6 PM, with last entry at 5 PM.' },
    ],
  },
  {
    slug: 'nicco-park-ticket-prices',
    title: 'Nicco Park ticket prices, explained',
    excerpt: 'Dry Park Day, Dry Park + Meal or the Parks Package? What each Nicco Park ticket includes, who gets a discount and how to pay less.',
    category: 'Tickets & offers',
    published: '2026-10-18',
    readMins: 4,
    hero: media('skydiver', 'The Sky Diver tower'),
    keywords: ['Nicco Park ticket price', 'Nicco Park entry fee', 'Parks Package price', 'Nicco Park student offer'],
    body: [
      { type: 'p', text: 'There are three tickets at Nicco Park, and little ones under 80 cm go free on all of them. Prices are per person and include taxes.' },
      { type: 'h2', text: 'Dry Park Day: ₹500' },
      { type: 'p', text: 'Entry plus 16 rides, including the Moon Racker, the Pirate Ship, the Spider Wheel, the Toy Train and the Mirror Maze, with Fast Track entry at the gate. It does not include Wet-O-Wild, the Bull Ride or games.' },
      { type: 'h2', text: 'Dry Park + Meal: ₹750' },
      { type: 'p', text: 'Everything in Dry Park Day, plus a Chinese combo meal, veg or non-veg. A good pick if you want lunch sorted before you arrive.' },
      { type: 'h2', text: 'Parks Package: ₹1,300' },
      { type: 'p', text: 'The full day. Every Dry Park ride plus a full day at Wet-O-Wild, with Fast Track on the Sky Loop, the Sky Diver, the Striking Car, the Cable Car and the River Cave. The Bull Ride, Shoot the Bhoot, the VR theatre and coin games are paid separately.' },
      { type: 'h2', text: 'Ways to pay less' },
      { type: 'list', items: [
        'Students: 20% off with a valid college ID. ₹400 for Dry Park Day, ₹1,040 for the Parks Package.',
        'Fun Fest: 15% off on selected dates. ₹425 for Dry Park Day, ₹1,105 for the Parks Package.',
        'Government employees: a special price with valid ID at the gate.',
        'Little ones under 80 cm: free on every ticket, every day.',
      ] },
      { type: 'h2', text: 'Super Bowl prices' },
      { type: 'p', text: 'Super Bowl is priced separately. Entry is ₹100 and a game of bowling is ₹250. You can add a lane to any ticket in the same booking.' },
      { type: 'tip', text: 'Buy only from official channels: this site, the park gate, District or Yatri Sathi. Never buy from touts outside the gate.' },
      { type: 'cta', text: 'Ready to choose? Compare all three tickets side by side.', label: 'See tickets & offers', href: '/offers' },
    ],
    faqs: [
      { q: 'How much is the Nicco Park entry ticket?', a: 'The Dry Park Day ticket is ₹500 per person and includes entry plus 16 rides. The Parks Package with Wet-O-Wild is ₹1,300.' },
      { q: 'Is there a student discount at Nicco Park?', a: 'Yes. Students get 20% off with a valid college ID: ₹400 for Dry Park Day and ₹1,040 for the Parks Package.' },
      { q: 'Do children need a ticket?', a: 'Children under 80 cm tall enter free. Anyone 80 cm or taller needs a ticket at the standard price.' },
    ],
  },
  {
    slug: 'wet-o-wild-first-timer-guide',
    title: 'Wet-O-Wild for first-timers: what to pack and what to ride',
    excerpt: 'Your first day at Nicco Park’s water park: what to bring, which slides to start with and the timings that matter.',
    category: 'Plan your day',
    published: '2026-10-15',
    readMins: 5,
    hero: media('funnel', 'The Tornado Funnel water ride'),
    keywords: ['Wet-O-Wild', 'Nicco Park water park', 'Wet-O-Wild timings', 'water park Kolkata'],
    body: [
      { type: 'p', text: 'Wet-O-Wild is six landscaped acres of slides, a wave pool, a waterfall and an artificial beach, right inside Nicco Park. It comes with the Parks Package, and here is how to make your first visit a good one.' },
      { type: 'h2', text: 'Know the timings' },
      { type: 'p', text: 'Wet-O-Wild opens at 11 AM and closes at 6 PM, with last entry at 5 PM. Many families do the Dry Park in the morning and move to the water after lunch.' },
      { type: 'h2', text: 'What to pack' },
      { type: 'list', items: [
        'Swimwear, or rent it inside',
        'A towel and a change of clothes',
        'Sunscreen for the walk between pools',
        'A small bag for valuables. Lockers are available to rent inside.',
        'Your QR ticket on your phone',
      ] },
      { type: 'tip', text: 'Re-entry isn’t allowed, so bring everything you need for the whole day.' },
      { type: 'h2', text: 'Start gentle' },
      { type: 'p', text: 'Warm up on Crazy River with a tube and a friend, then try the Family Squirl, a raft slide the whole family can ride together. The wave pool and the rain dance are easy wins for every age.' },
      { type: 'h2', text: 'Then go big' },
      { type: 'list', items: [
        'Tornado Funnel: a 260-foot tunnel into a 40-foot cone, with a moment of zero gravity.',
        'Thunder Bowl: rafts drop from a 40-foot tower through 195 feet of tunnel into a giant bowl.',
        'Aqua Drop: new, with steep drops and sudden turns in a closed tube.',
        'Aqua Curl: new, with twists all the way down.',
      ] },
      { type: 'h2', text: 'With little ones' },
      { type: 'p', text: 'Pirates Bay is the splash zone for younger children. Children under 80 cm tall enter free.' },
      { type: 'h2', text: 'Eat between slides' },
      { type: 'p', text: 'Beach Café sits right by the pools and serves quick bites from 11 AM to 6 PM.' },
      { type: 'cta', text: 'Wet-O-Wild is included in the Parks Package.', label: 'Book the Parks Package', href: '/book?ticket=pkg' },
    ],
    faqs: [
      { q: 'Is Wet-O-Wild included in the Nicco Park ticket?', a: 'Wet-O-Wild is included in the Parks Package (₹1,300). The Dry Park Day ticket does not include it.' },
      { q: 'Can I rent swimwear at Wet-O-Wild?', a: 'Yes. Lockers and swimwear are available to rent inside.' },
      { q: 'What is the last entry time for Wet-O-Wild?', a: 'Last entry is at 5 PM. The water park closes at 6 PM.' },
    ],
  },
  {
    slug: 'things-to-do-in-kolkata-with-kids',
    title: 'Things to do in Kolkata with kids: a Nicco Park day by age',
    excerpt: 'From the Toy Train to the Cyclone: which Nicco Park rides suit toddlers, younger children and teens, plus a simple plan for the day.',
    category: 'Families',
    published: '2026-10-12',
    readMins: 5,
    hero: media('piratesbay', 'Children playing at Pirates Bay splash zone'),
    keywords: ['things to do in Kolkata with kids', 'Nicco Park for kids', 'family day out Kolkata', 'Salt Lake things to do'],
    body: [
      { type: 'p', text: 'Nicco Park has entertained three generations of Kolkata families since 1991. Here is how to plan a day that works for every age in your group.' },
      { type: 'h2', text: 'Toddlers and the littlest riders' },
      { type: 'p', text: 'Children under 80 cm tall enter free. The Toy Train, the Caterpillar, the Family Carousel and the Crazy Tea Party are gentle, colourful and close together, so you won’t spend the morning walking.' },
      { type: 'h2', text: 'Younger children' },
      { type: 'list', items: [
        'Spider Wheel: eight gondolas on a 36-foot wheel',
        'Octopus: tentacle arms that lift, spin and twirl',
        'Water Chute: a boat ride that ends in one giant splash',
        'Mirror Maze: find your way out before your friends do',
        'Pirates Bay: the splash zone at Wet-O-Wild',
      ] },
      { type: 'h2', text: 'Teens and thrill-seekers' },
      { type: 'p', text: 'The Cyclone is India’s biggest wooden roller coaster, with 750 m of loops, turns and drops. Pair it with the 80-foot Sky Diver, the Pirate Ship and the Tornado Funnel at Wet-O-Wild.' },
      { type: 'h2', text: 'A little history on the side' },
      { type: 'p', text: 'The MiG-21 is a real fighter jet from the Indian Air Force, and the Eiffel Tower replica gives panoramic views across the park.' },
      { type: 'h2', text: 'A simple plan' },
      { type: 'list', items: [
        '10:45 AM: Toy Train, Caterpillar and the Crazy Tea Party while queues are short',
        '12:30 PM: lunch at the food court, then a sunscreen top-up',
        '1:30 PM: Pirates Bay and the wave pool at Wet-O-Wild',
        'Late afternoon: a slow paddle boat loop across the lake',
      ] },
      { type: 'tip', text: 'The food court serves Indian thalis, Chinese, South Indian and snacks, with thalis from ₹190.' },
      { type: 'cta', text: 'The Parks Package covers every ride above, and little ones go free.', label: 'Book a family day', href: '/book?ticket=pkg' },
    ],
    faqs: [
      { q: 'Is Nicco Park good for toddlers?', a: 'Yes. Children under 80 cm enter free, and the Toy Train, Caterpillar, Family Carousel and Crazy Tea Party are made for the littlest riders.' },
      { q: 'Where is Nicco Park?', a: 'Jheel Meel, Sector IV, Salt Lake City, Kolkata 700 106. Salt Lake Sector V on the Metro Green Line is the closest station.' },
      { q: 'Is there food inside Nicco Park?', a: 'Yes. The food court is open from 11 AM to 8 PM, and Beach Café serves Wet-O-Wild.' },
    ],
  },
  {
    slug: 'school-trip-to-nicco-park',
    title: 'Planning a school trip to Nicco Park: a teacher’s checklist',
    excerpt: 'Group pricing, meals, parking and a plan that keeps every class together. Everything a school needs to organise a Nicco Park trip.',
    category: 'Schools & groups',
    published: '2026-10-08',
    readMins: 4,
    hero: media('toytrain', 'The Toy Train'),
    keywords: ['school trip Kolkata', 'Nicco Park school picnic', 'Nicco Park group booking', 'school excursion Kolkata'],
    body: [
      { type: 'p', text: 'A school trip to Nicco Park gives students a safe, supervised day with rides for every age, and the MiG-21 and the Toy Train as a bonus history lesson. This checklist covers what to sort out before the day.' },
      { type: 'h2', text: 'Before you book' },
      { type: 'list', items: [
        'Pick a weekday. They are quieter than weekends.',
        'Count students and staff, and note any children under 80 cm, who enter free.',
        'Decide whether the trip includes Wet-O-Wild, which needs the Parks Package.',
        'Ask our events team for group pricing. It is available on request.',
      ] },
      { type: 'h2', text: 'Food' },
      { type: 'p', text: 'Meal packages are available from the food court, with veg and non-veg menus from the park kitchens. Sorting meals in advance keeps the lunch break short.' },
      { type: 'h2', text: 'Getting there' },
      { type: 'p', text: 'Parking is available on site for buses and cars. Search “Nicco Park, Jheel Meel, Sector IV” in your maps app.' },
      { type: 'h2', text: 'On the day' },
      { type: 'list', items: [
        'Arrive for gate opening at 10:30 AM.',
        'Keep one QR for the whole group, so everyone gets in with a single scan.',
        'Agree a meeting point, such as the main gate or the food court.',
        'Remind students that re-entry isn’t allowed, and that colours aren’t allowed in the park.',
      ] },
      { type: 'tip', text: 'Bigger plans? The park has venues for 50 to 5,000 guests, including halls for prize days and annual functions.' },
      { type: 'cta', text: 'Tell us your dates and numbers, and we’ll send options and a quote on WhatsApp.', label: 'Get a group quote', href: '/groups#enquire' },
    ],
    faqs: [
      { q: 'Does Nicco Park offer group discounts for schools?', a: 'Yes. Group pricing for schools is available on request from the events team.' },
      { q: 'Can schools book meals at Nicco Park?', a: 'Yes. Meal packages are available from the food court, with veg and non-veg options.' },
      { q: 'Is there bus parking at Nicco Park?', a: 'Parking is available on site.' },
    ],
  },
  {
    slug: 'bowling-in-kolkata-super-bowl',
    title: 'Bowling in Kolkata: a beginner’s guide to Super Bowl',
    excerpt: 'Never bowled before? How Super Bowl at Nicco Park works, what it costs, when to go and how to book a lane.',
    category: 'Super Bowl',
    published: '2026-10-05',
    readMins: 4,
    hero: media('bowl15', 'Neon-lit bowling lanes at Nicco Super Bowl'),
    keywords: ['bowling in Kolkata', 'Nicco Super Bowl', 'bowling alley Salt Lake', 'Super Bowl price'],
    body: [
      { type: 'p', text: 'Super Bowl is Kolkata’s bowling alley, inside Nicco Park. Four lanes, four pool tables, two air hockey tables and coin games, with DJ music and food. Here is what a first-timer needs to know.' },
      { type: 'h2', text: 'What it costs' },
      { type: 'list', items: [
        'Entry: ₹100',
        'Bowling, one game: ₹250',
        'Pool table, 20 minutes for two: ₹150',
        'Air hockey, one game: ₹60, or two for ₹150',
        'Coin-operated games: ₹80 per coin',
      ] },
      { type: 'h2', text: 'When to go' },
      { type: 'p', text: 'Super Bowl opens at 1 PM. It runs till 9 PM on weekdays and till 10 PM on weekends and holidays, when the DJ nights make it a party.' },
      { type: 'h2', text: 'Bowling basics' },
      { type: 'list', items: [
        'Each game is ten frames, and you get two rolls per frame.',
        'Knock all ten pins down with your first roll for a strike.',
        'Knock the rest down with your second roll for a spare.',
        'Pick a lighter ball than you think. Control beats power.',
        'Aim for the arrows on the lane, not the pins.',
      ] },
      { type: 'h2', text: 'Book your lane' },
      { type: 'p', text: 'Pick a start time online and skip the wait at the counter. You can add a lane to any Nicco Park ticket in the same booking.' },
      { type: 'tip', text: 'Super Bowl has hosted the Merchant’s Cup, the Cyber Cup, The Telegraph inter-school tournament and the Kolkata Bowling Championship.' },
      { type: 'cta', text: 'Lanes go fast on weekend evenings.', label: 'Book a lane', href: '/worlds/super-bowl#lane' },
    ],
    faqs: [
      { q: 'How much does bowling cost at Nicco Park?', a: 'Entry to Super Bowl is ₹100 and one game of bowling is ₹250.' },
      { q: 'What are Super Bowl’s timings?', a: '1 PM to 9 PM on weekdays and 1 PM to 10 PM on weekends and holidays.' },
      { q: 'Can I book a bowling lane online?', a: 'Yes. Pick a start time online and skip the wait at the counter.' },
    ],
  },
]
