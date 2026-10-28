import { media } from './media'
import type { Extra, Ticket } from './types'

export const tickets: Ticket[] = [
  {
    id: 'dry',
    name: 'Dry Park Day',
    shortName: 'Dry Park',
    price: 500,
    studentPrice: 400,
    funFestPrice: 425,
    summary: 'Entry + 16 rides',
    description:
      '16 rides included: Moon Racker, Pirate Ship, Spider Wheel, Toy Train, Mirror Maze and more. Fast Track entry at the gate.',
    includes: ['Entry + 16 rides, incl. Moon Racker and Pirate Ship', 'Fast Track entry at the gate'],
    excludes: ['Wet-O-Wild, Bull Ride, games'],
    fastTrack: 'Fast Track entry at the gate',
  },
  {
    id: 'meal',
    name: 'Dry Park + Meal',
    shortName: 'Dry Park + Meal',
    price: 750,
    summary: 'Entry + 16 rides + Chinese combo',
    description: 'Everything in Dry Park Day, plus a Chinese combo meal, veg or non-veg.',
    includes: ['Entry + 16 rides', 'Chinese combo meal, veg or non-veg'],
    excludes: ['Wet-O-Wild'],
  },
  {
    id: 'pkg',
    name: 'Parks Package',
    shortName: 'Parks Package',
    price: 1300,
    studentPrice: 1040,
    funFestPrice: 1105,
    popular: true,
    summary: 'All dry rides + Wet-O-Wild',
    description:
      'Every Dry Park ride plus a full day at Wet-O-Wild. Fast Track on Sky Loop, Sky Diver, Striking Car, Cable Car and River Cave.',
    includes: [
      'Every Dry Park ride',
      'Full day at Wet-O-Wild',
      'Fast Track: gate, Sky Loop, Sky Diver, Striking Car, Cable Car, River Cave',
    ],
    excludes: ['Bull Ride, Shoot the Bhoot, VR theatre, games'],
  },
]

export const extras: Extra[] = [
  {
    id: 'bowl',
    name: 'Super Bowl: entry + 1 game',
    note: 'Pick a lane time after adding. Booked in the same cart.',
    price: 350,
    image: media('bowl15', 'Neon-lit bowling lanes'),
    needsLaneSlot: true,
  },
  {
    id: 'pool',
    name: 'Pool table, 20 minutes',
    note: 'For two players, at Super Bowl.',
    price: 150,
    image: media('bowl3', 'Pool tables at Super Bowl'),
  },
  {
    id: 'meal',
    name: 'Chinese combo meal',
    note: 'Veg or non-veg, at the food court.',
    price: 250,
    image: media('event2', 'Evening lawn at the park'),
  },
]

export const bowlRates = [
  { item: 'Entry', price: '₹100' },
  { item: 'Bowling, one game', price: '₹250' },
  { item: 'Pool table, 20 min for two', price: '₹150' },
  { item: 'Air hockey, one game', price: '₹60 · two for ₹150' },
  { item: 'Coin-operated games, per coin', price: '₹80' },
]

export const laneTimes = ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM']

export const MIN_PRICE = 400
