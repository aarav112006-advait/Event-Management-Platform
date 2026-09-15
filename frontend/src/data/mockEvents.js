export const INITIAL_EVENTS = [
  {
    id: 'evt-101',
    title: 'Global AI & Web3 Summit 2026',
    category: 'Technology',
    description: 'Join over 2,500 industry leaders, software architects, and founders discussing autonomous agents, generative models, and decentralized compute protocols. Keynotes, technical workshops, and VIP networking mixer.',
    date: '2026-10-15',
    time: '09:30 AM - 06:00 PM',
    venue: 'Jio World Convention Centre, BKC',
    city: 'Mumbai',
    country: 'India',
    location: {
      lat: 19.0657,
      lng: 72.8682,
      address: 'G Block BKC, Bandra Kurla Complex, Mumbai, Maharashtra 400051'
    },
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    organizer: {
      name: 'TechForward Labs',
      email: 'events@techforward.io',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      rating: 4.9,
      eventsCount: 14
    },
    ticketTiers: [
      { id: 'tier-1', name: 'Early Bird Student', price: 499, available: 45, perks: ['Keynote access', 'Expo floor entry', 'Digital certificate'] },
      { id: 'tier-2', name: 'General Admission', price: 1499, available: 120, perks: ['All sessions', 'Lunch & refreshments', 'Networking lounge'] },
      { id: 'tier-3', name: 'VIP Executive Pass', price: 4999, available: 18, perks: ['VIP front-row seating', 'Speakers dinner', 'Investor speed dating', 'Swag kit'] }
    ],
    capacity: 2500,
    attendeesCount: 1840,
    isFeatured: true
  },
  {
    id: 'evt-102',
    title: 'Pune Symphony Under the Stars',
    category: 'Music',
    description: 'An open-air twilight orchestral experience featuring timeless classics from Mozart, Beethoven, and contemporary cinematic scores performed by the Western Ghats Philharmonic Ensemble.',
    date: '2026-10-22',
    time: '06:30 PM - 10:00 PM',
    venue: 'Amanora The Fern Outdoor Amphitheatre',
    city: 'Pune',
    country: 'India',
    location: {
      lat: 18.5168,
      lng: 73.9348,
      address: 'Magarpatta Road, Hadapsar, Pune, Maharashtra 411028'
    },
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80',
    organizer: {
      name: 'Aura Classical Arts',
      email: 'contact@auraclassical.org',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      rating: 4.8,
      eventsCount: 9
    },
    ticketTiers: [
      { id: 'tier-1', name: 'Lawn Seating', price: 799, available: 80, perks: ['Picnic lawn space', 'Complimentary hot beverage'] },
      { id: 'tier-2', name: 'Reserved Silver Seats', price: 1799, available: 50, perks: ['Cushioned seating', 'Best acoustics zone'] },
      { id: 'tier-3', name: 'Conductor Box VIP', price: 3499, available: 12, perks: ['Front riser box', 'Backstage artist meet', 'Gourmet dinner buffet'] }
    ],
    capacity: 1200,
    attendeesCount: 960,
    isFeatured: true
  },
  {
    id: 'evt-103',
    title: 'Silicon Plateau Founders Meetup',
    category: 'Business',
    description: 'An intimate evening gathering of Series A/B startup founders, venture capitalists, and product pioneers discussing B2B SaaS scaling, unit economics, and outbound enterprise growth.',
    date: '2026-11-05',
    time: '05:00 PM - 09:00 PM',
    venue: 'WeWork Galaxy, Residency Road',
    city: 'Bengaluru',
    country: 'India',
    location: {
      lat: 12.9738,
      lng: 77.6087,
      address: 'Residency Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025'
    },
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80',
    organizer: {
      name: 'VentureCraft India',
      email: 'hello@venturecraft.co',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      rating: 4.95,
      eventsCount: 22
    },
    ticketTiers: [
      { id: 'tier-1', name: 'Founder Entry', price: 999, available: 35, perks: ['Networking session', 'Startup pitch deck review', 'Craft cocktails'] },
      { id: 'tier-2', name: 'Investor & Partner Pass', price: 2999, available: 15, perks: ['Access to dealflow directory', 'Private founder lounge'] }
    ],
    capacity: 250,
    attendeesCount: 210,
    isFeatured: false
  },
  {
    id: 'evt-104',
    title: 'Pacific Cloud & Edge Developer Forum',
    category: 'Technology',
    description: 'Two days of deep-dive workshops on Kubernetes, distributed tracing, eBPF telemetry, and serverless edge databases with live code labs and hands-on demonstrations.',
    date: '2026-11-12',
    time: '08:30 AM - 05:30 PM',
    venue: 'Moscone West Convention Center',
    city: 'San Francisco',
    country: 'United States',
    location: {
      lat: 37.7840,
      lng: -122.4014,
      address: '747 Howard St, San Francisco, CA 94103, United States'
    },
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    organizer: {
      name: 'CloudNative Guild',
      email: 'info@cloudnativeguild.org',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      rating: 4.88,
      eventsCount: 31
    },
    ticketTiers: [
      { id: 'tier-1', name: 'Standard Developer', price: 3499, available: 60, perks: ['Keynotes', 'Technical breakout tracks', 'Lunch & Expo'] },
      { id: 'tier-2', name: 'All-Access Pass + Workshops', price: 7999, available: 25, perks: ['Hands-on lab access', 'Certification voucher', 'VIP Afterparty'] }
    ],
    capacity: 1500,
    attendeesCount: 1140,
    isFeatured: true
  },
  {
    id: 'evt-105',
    title: 'Maharashtra Craft Food & Brew Festival',
    category: 'Food & Drink',
    description: 'Celebrate artisanal regional cuisine, organic sourdough bakes, bean-to-bar chocolates, and microbrewery masterclasses with over 50 gourmet culinary pop-ups and live acoustic music.',
    date: '2026-11-28',
    time: '12:00 PM - 11:00 PM',
    venue: 'Mahalakshmi Race Course Grounds',
    city: 'Mumbai',
    country: 'India',
    location: {
      lat: 18.9834,
      lng: 72.8228,
      address: 'Dr. E Moses Rd, Mahalaxmi, Mumbai, Maharashtra 400034'
    },
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
    organizer: {
      name: 'Bombay Epicurean Society',
      email: 'tastings@bombayepicurean.com',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
      rating: 4.75,
      eventsCount: 16
    },
    ticketTiers: [
      { id: 'tier-1', name: 'General Taster Pass', price: 599, available: 150, perks: ['Entry pass', '3 tasting tokens', 'Event tasting glass'] },
      { id: 'tier-2', name: 'Gourmet Unlimited Pass', price: 1999, available: 40, perks: ['Express entry', 'Unlimited artisanal tastings', 'Chef masterclass pass'] }
    ],
    capacity: 3000,
    attendeesCount: 2200,
    isFeatured: false
  },
  {
    id: 'evt-106',
    title: 'Deccan Half Marathon & 10K Run',
    category: 'Sports',
    description: 'Lace up for the scenic Deccan sunrise route through lush university avenues and heritage city landmarks. Electronic RFID timing chip, finisher medal, breakfast, and medical support included.',
    date: '2026-12-06',
    time: '05:30 AM - 10:30 AM',
    venue: 'Savitribai Phule Pune University Campus',
    city: 'Pune',
    country: 'India',
    location: {
      lat: 18.5530,
      lng: 73.8247,
      address: 'Ganeshkhind, Pune, Maharashtra 411007'
    },
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&auto=format&fit=crop&q=80',
    organizer: {
      name: 'Runners Alliance Maharashtra',
      email: 'support@runnersalliance.org',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      rating: 4.92,
      eventsCount: 28
    },
    ticketTiers: [
      { id: 'tier-1', name: '10K Challenge', price: 850, available: 95, perks: ['RFID timing bib', 'Finisher dry-fit tee', 'Medal & breakfast'] },
      { id: 'tier-2', name: '21K Half Marathon', price: 1250, available: 60, perks: ['All 10K perks', 'Custom engraved finisher medal', 'Recovery zone access'] }
    ],
    capacity: 2000,
    attendeesCount: 1650,
    isFeatured: false
  }
];

export const CATEGORIES = [
  'All',
  'Technology',
  'Music',
  'Business',
  'Food & Drink',
  'Sports',
  'Arts & Culture'
];
