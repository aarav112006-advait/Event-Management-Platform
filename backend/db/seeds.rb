# db/seeds.rb

puts "🌱 Seeding Event Management Platform database..."

Ticket.destroy_all
Registration.destroy_all
TicketTier.destroy_all
Event.destroy_all
Category.destroy_all
User.destroy_all

# Users
admin = User.create!(
  name: "System Administrator",
  email: "admin@eventplatform.com",
  password: "Password123!",
  role: "admin"
)

organizer1 = User.create!(
  name: "TechCon Global",
  email: "organizer@techcon.io",
  password: "Password123!",
  role: "organizer"
)

organizer2 = User.create!(
  name: "Sunburn Festival Group",
  email: "events@sunburn.in",
  password: "Password123!",
  role: "organizer"
)

attendee1 = User.create!(
  name: "Aarav Patel",
  email: "aarav112006@gmail.com",
  password: "Password123!",
  role: "attendee"
)

attendee2 = User.create!(
  name: "Ira Rai",
  email: "ira.rai@example.com",
  password: "Password123!",
  role: "attendee"
)

puts "✅ Users seeded: #{User.count}"

# Categories
cat_tech = Category.create!(name: "Technology & AI", slug: "technology-ai", icon: "cpu")
cat_music = Category.create!(name: "Music & Festivals", slug: "music-festivals", icon: "music")
cat_food = Category.create!(name: "Food & Culinary", slug: "food-culinary", icon: "utensils")
cat_business = Category.create!(name: "Business & Startups", slug: "business-startups", icon: "briefcase")

puts "✅ Categories seeded: #{Category.count}"

# Events
event1 = Event.create!(
  organizer: organizer1,
  category: cat_tech,
  title: "Global AI & Quantum Computing Summit 2026",
  description: "Join international AI researchers, machine learning engineers, and tech founders for keynotes, workshops, and startup pitches.",
  venue_name: "Jio World Convention Centre",
  address: "Bandra Kurla Complex, Bandra East",
  city: "Mumbai",
  state: "Maharashtra",
  country: "India",
  latitude: 19.0657,
  longitude: 72.8687,
  start_time: 14.days.from_now.change(hour: 9, min: 0),
  end_time: 16.days.from_now.change(hour: 18, min: 0),
  banner_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200",
  status: "published"
)

event2 = Event.create!(
  organizer: organizer2,
  category: cat_music,
  title: "Monsoon Beats Electronic Music Festival",
  description: "Three stages featuring over 40 electronic and indie musicians, live visual mapping, and food trucks under the Pune skies.",
  venue_name: "Mahalakshmi Lawns",
  address: "Near Kharadi Bypass, Nagar Road",
  city: "Pune",
  state: "Maharashtra",
  country: "India",
  latitude: 18.5529,
  longitude: 73.9315,
  start_time: 21.days.from_now.change(hour: 16, min: 0),
  end_time: 22.days.from_now.change(hour: 23, min: 30),
  banner_url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200",
  status: "published"
)

event3 = Event.create!(
  organizer: organizer1,
  category: cat_business,
  title: "SaaS Founders & Angel Pitch Night",
  description: "Exclusive investor pitching session with 25 venture capitalists, peer networking, and growth panel discussions.",
  venue_name: "WeWork Galaxy",
  address: "Residency Road, Shanthala Nagar",
  city: "Bengaluru",
  state: "Karnataka",
  country: "India",
  latitude: 12.9716,
  longitude: 77.5946,
  start_time: 30.days.from_now.change(hour: 18, min: 0),
  end_time: 30.days.from_now.change(hour: 21, min: 30),
  banner_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200",
  status: "published"
)

puts "✅ Events seeded: #{Event.count}"

# Ticket Tiers
# Event 1 Tiers
tier1_eb = TicketTier.create!(
  event: event1,
  name: "Early Bird Pass",
  price: 2499.00,
  capacity: 200,
  available_quantity: 185,
  sales_start: 7.days.ago,
  sales_end: 7.days.from_now
)

tier1_ga = TicketTier.create!(
  event: event1,
  name: "General Admission",
  price: 4999.00,
  capacity: 500,
  available_quantity: 490,
  sales_start: 7.days.ago,
  sales_end: 14.days.from_now
)

tier1_vip = TicketTier.create!(
  event: event1,
  name: "VIP Founder Pass",
  price: 12999.00,
  capacity: 50,
  available_quantity: 42,
  sales_start: 7.days.ago,
  sales_end: 14.days.from_now
)

# Event 2 Tiers
tier2_single = TicketTier.create!(
  event: event2,
  name: "Single Day Pass",
  price: 1499.00,
  capacity: 1000,
  available_quantity: 850,
  sales_start: 10.days.ago,
  sales_end: 21.days.from_now
)

tier2_season = TicketTier.create!(
  event: event2,
  name: "Weekend Pass",
  price: 2799.00,
  capacity: 1500,
  available_quantity: 1200,
  sales_start: 10.days.ago,
  sales_end: 21.days.from_now
)

# Event 3 Tiers
tier3_free = TicketTier.create!(
  event: event3,
  name: "Attendee Pass",
  price: 0.00,
  capacity: 100,
  available_quantity: 65,
  sales_start: 5.days.ago,
  sales_end: 29.days.from_now
)

puts "✅ Ticket Tiers seeded: #{TicketTier.count}"

# Sample Registration & Ticket
reg1 = Registration.create!(
  user: attendee1,
  event: event1,
  total_amount: 2499.00,
  status: "confirmed",
  stripe_payment_intent_id: "pi_seed_sample_12345"
)

ticket1 = Ticket.create!(
  registration: reg1,
  ticket_tier: tier1_eb,
  attendee_name: attendee1.name,
  attendee_email: attendee1.email,
  status: "valid"
)

puts "✅ Sample Registrations & Tickets seeded!"
puts "🚀 Database seeding complete!"
