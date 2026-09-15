# 🎟️ EventSphere — Event Management Platform

<p align="center">
  <strong>Discover events. Reserve tickets. Manage experiences.</strong><br>
  A full-stack event discovery, ticketing, and organizer management platform for modern event ecosystems.
</p>

<p align="center">
  <em>Location-aware discovery • Intelligent ticketing • Secure payments • Digital QR passes • Organizer analytics</em>
</p>

### Technology Stack

| Frontend | Backend | Database | Integrations |
|:---:|:---:|:---:|:---:|
| **React 18** | **Ruby on Rails 7** | **PostgreSQL 14+** | **Google Maps** |
| React Router v6 | Rails API Mode | Relational + spatial data | Stripe Payments |
| Context API | JWT Authentication | Indexed queries | Stripe Webhooks |
| Axios | Service Layer | Transactional integrity | Geocoding APIs |

---

## 🌟 Overview

**EventSphere** is a modern event discovery, registration, ticketing,
and organizer platform inspired by the experience patterns of Eventbrite
and Meetup.

The platform connects **attendees** and **organizers** across the
complete event lifecycle --- from discovering nearby experiences and
exploring venues on an interactive map to reserving tiered tickets,
completing Stripe checkout, receiving digital QR passes, and managing
events through an organizer studio.

### Core Value

-   📍 Location-based event discovery
-   🗺️ Interactive Google Maps integration
-   🎫 Tiered ticket inventory
-   ⚡ Concurrency-safe reservations
-   💳 Stripe payment processing
-   🎟️ Digital QR ticket fulfillment
-   📊 Organizer analytics
-   🔐 JWT authentication and role-based access control

The documented full-stack architecture uses **React 18**, **Ruby on
Rails 7 API mode**, **PostgreSQL**, Google Maps, and Stripe.
fileciteturn19file1L19-L27

------------------------------------------------------------------------

# 🎯 Product Vision

``` text
                         EVENTSPHERE
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
          ATTENDEES                       ORGANIZERS
              │                               │
              ▼                               ▼
       Discover Events                 Create Events
              │                               │
              ▼                               ▼
        Explore Maps                    Configure Tiers
              │                               │
              ▼                               ▼
       Select Tickets                  Track Analytics
              │                               │
              └───────────────┬───────────────┘
                              ▼
                     COMPLETE EVENT
                       ECOSYSTEM
```

EventSphere is designed as a comprehensive ecosystem for attendees to
discover experiences and organizers to manage event lifecycles.
fileciteturn19file1L10-L18

------------------------------------------------------------------------

# ✨ Feature Matrix

  Module                Capability
  --------------------- ---------------------------------------------
  🔐 Authentication     JWT-based stateless authentication
  👥 Roles              Attendee, Organizer, Admin
  🔎 Discovery          Keyword, category, city, and date filtering
  📍 Nearby Events      Radius-based geospatial discovery
  🗺️ Maps               Google Maps markers and venue visualization
  🎫 Ticketing          Early Bird, General Admission, VIP
  📦 Inventory          Capacity-aware ticket availability
  ⚡ Reliability        Row-level locking against overselling
  💳 Payments           Stripe PaymentIntent workflow
  🔔 Webhooks           Verified asynchronous payment fulfillment
  🎟️ Digital Tickets    Unique codes and QR payloads
  📄 Export             Print/PDF-oriented ticket workflow
  🧑‍💼 Organizer Studio   Event creation and management
  📊 Analytics          Event, attendee, and sales KPIs
  🎁 Promotions         Promo-code and early-bird support

------------------------------------------------------------------------

# 🧭 Complete User Journey

``` text
┌──────────────────┐
│   LANDING PAGE   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ DISCOVER EVENTS  │
│ Search / Filter  │
└────────┬─────────┘
         │
    ┌────┴─────┐
    ▼          ▼
 Grid View   Map View
    │          │
    └────┬─────┘
         ▼
┌──────────────────┐
│  EVENT DETAILS   │
│ Venue / Time /   │
│ Ticket Tiers     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ TICKET CHECKOUT  │
│ Profile / Coupon │
│ / Stripe         │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ PAYMENT CONFIRMED│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ DIGITAL QR PASS  │
│ My Tickets       │
└──────────────────┘
```

------------------------------------------------------------------------

# 🏗️ High-Level Architecture

``` text
                         ┌───────────────────────┐
                         │       Browser         │
                         │      React 18         │
                         └───────────┬───────────┘
                                     │
                              HTTPS / REST API
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │    Rails 7 API        │
                         │   API-only Backend    │
                         └───────────┬───────────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              ▼                      ▼                      ▼
       ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
       │ PostgreSQL  │       │   Stripe    │       │ Google Maps │
       │ Data / GIS  │       │  Payments   │       │ Geocoding   │
       └─────────────┘       └─────────────┘       └─────────────┘
                                     │
                                     ▼
                              Stripe Webhooks
                                     │
                                     ▼
                              Rails Fulfillment
```

------------------------------------------------------------------------

# 🖥️ Frontend Architecture

The React frontend uses React 18, React Router v6, Context API, Axios,
Google Maps through `@react-google-maps/api`, Stripe.js, and a custom
CSS design system. fileciteturn19file0L11-L17

``` text
frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── App.js
│   ├── index.js
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── EventContext.js
│   ├── services/
│   │   ├── api.js
│   │   └── googleMapsService.js
│   ├── data/
│   │   └── mockEvents.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── EventDiscovery.jsx
│   │   ├── EventMap.jsx
│   │   ├── EventDetail.jsx
│   │   ├── TicketCheckout.jsx
│   │   ├── MyTickets.jsx
│   │   ├── OrganizerDashboard.jsx
│   │   ├── AuthModal.jsx
│   │   └── Icons.jsx
│   ├── index.css
│   └── App.css
│
└── package.json
```

The frontend structure separates authentication, event state, API
services, map services, discovery, event details, checkout, ticket
wallet, and organizer functionality. fileciteturn19file0L23-L52

------------------------------------------------------------------------

# 🧠 State Management

## AuthContext

Handles:

-   JWT persistence
-   User identity
-   Role classification
-   Attendee / Organizer views
-   Role switching for testing
-   Demo login flows

## EventContext

Centralizes:

``` text
Events
 │
 ├── Catalog
 ├── Search
 ├── Category Filters
 ├── City Filters
 ├── Date Filters
 ├── Active Map Event
 └── Ticket Wallet
```

The frontend architecture specifies centralized event/filter state,
map-event synchronization, and local ticket-wallet state.
fileciteturn19file0L53-L72

------------------------------------------------------------------------

# 🗺️ Google Maps & Geospatial Discovery

``` text
                   Event Address
                         │
                         ▼
                  Google Geocoding
                         │
                         ▼
                  Latitude / Longitude
                         │
                         ▼
                    PostgreSQL
                         │
                         ▼
              Haversine Distance Query
                         │
               ┌─────────┴─────────┐
               ▼                   ▼
           Within Radius       Outside Radius
               │
               ▼
          Nearby Events
               │
               ▼
        Google Maps Results
```

The backend provides `/api/v1/events/nearby`, using the spherical
Haversine formula with documented radius options of 5 km, 10 km, 25 km,
and 50 km. fileciteturn19file1L58-L72

The frontend map layer provides custom markers, active-event selection,
price badges, quick previews, and a development fallback simulator when
the Google Maps key is unavailable. fileciteturn19file0L73-L86

------------------------------------------------------------------------

# 🔎 Event Discovery

### Search

Search across:

-   Event titles
-   Venues
-   Descriptions

### Locations

The documented experience includes:

-   Mumbai
-   Pune
-   Bengaluru
-   San Francisco

### Categories

-   Technology
-   Music
-   Business
-   Food & Drink
-   Sports
-   Arts & Culture

### Dual View

``` text
                 EVENT DISCOVERY
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
         GRID VIEW            MAP VIEW
             │                   │
      Responsive cards       50 / 50 split
             │                   │
             └─────────┬─────────┘
                       ▼
                 Event Details
```

The frontend guide specifies keyword search, city filtering, category
chips, responsive grid cards, and a split list/map interface.
fileciteturn19file0L88-L99

------------------------------------------------------------------------

# 🎫 Tiered Ticketing

``` text
EVENT
 │
 ├── 🐦 Early Bird
 │
 ├── 🎟️ General Admission
 │
 └── 👑 VIP Pass
```

Ticket tiers contain pricing, capacity, availability, and sales-window
information. Early Bird can transition to General Admission after the
defined quota or cutoff is reached. fileciteturn19file1L73-L84

------------------------------------------------------------------------

# ⚡ Concurrency-Safe Reservations

``` text
User A ──────┐
User B ──────┼──► TicketTier
User C ──────┘       │
                     ▼
                  Row Lock
                     │
                     ▼
             Check Availability
                     │
              ┌──────┴──────┐
              ▼             ▼
          Available       Sold Out
              │
              ▼
        Reserve Quantity
              │
              ▼
        Update Inventory
```

The Rails implementation uses database row-level locking through
`reserve_tickets!`, preventing race conditions and ticket overselling
during simultaneous checkout attempts. fileciteturn19file1L73-L90

------------------------------------------------------------------------

# 💳 Stripe Payment Flow

``` text
React Checkout
      │
      ▼
Stripe Elements
      │
      ▼
Rails API
      │
      ▼
PaymentIntent
      │
      ▼
Stripe
      │
      ▼
Webhook
      │
      ▼
Signature Verification
      │
      ▼
Registration Update
      │
      ▼
Ticket Issuance
```

The documented payment architecture uses Stripe Elements, backend
PaymentIntent creation, and `/api/v1/payments/webhook` with webhook
signature verification before registration and ticket fulfillment.
fileciteturn19file1L85-L94

------------------------------------------------------------------------

# 🎟️ Digital Ticket Wallet

`MyTickets.jsx` acts as the attendee's digital ticket wallet.

Each ticket can include:

-   Unique ticket code
-   QR-code data
-   Attendee name/email
-   Ticket tier
-   Quantity
-   Venue information
-   Print/PDF-oriented export

The frontend documentation describes unique references, dynamically
generated SVG QR codes, metadata display, and ticket export/printing
triggers. fileciteturn19file0L125-L132

------------------------------------------------------------------------

# 🧑‍💼 Organizer Studio

``` text
                 ORGANIZER DASHBOARD
                         │
       ┌─────────────────┼─────────────────┐
       ▼                 ▼                 ▼
     EVENTS           ATTENDEES          SALES
       │                 │                 │
       ▼                 ▼                 ▼
 Create / Edit       Registrations      Revenue
       │
       ▼
 Ticket Tiers
       │
       ▼
 Venue Coordinates
```

Organizer capabilities include event creation, category selection,
scheduling, venue configuration, city selection, Google Maps
coordinates, tiered pricing, image uploads, and sales/attendee KPIs.
fileciteturn19file0L134-L144

------------------------------------------------------------------------

# 🗄️ PostgreSQL Data Model

``` text
             ┌─────────────┐
             │    Users    │
             └──────┬──────┘
                    │
                    ▼
             ┌─────────────┐
             │   Events    │◄──── Categories
             └──────┬──────┘
                    │
                    ▼
             ┌─────────────┐
             │ TicketTiers │
             └──────┬──────┘
                    │
                    ▼
             ┌──────────────┐
             │ Registrations│
             └──────┬───────┘
                    │
                    ▼
             ┌─────────────┐
             │   Tickets   │
             └─────────────┘
```

### Core Tables

  Table             Responsibility
  ----------------- --------------------------------
  `users`           Identity and roles
  `categories`      Event categories
  `events`          Event metadata and geolocation
  `ticket_tiers`    Pricing and inventory
  `registrations`   Purchase/order records
  `tickets`         Digital ticket records

The documented schema includes roles, event coordinates, ticket
inventory, registration status, Stripe PaymentIntent references, unique
ticket codes, and QR payload data. fileciteturn19file1L33-L60

------------------------------------------------------------------------

# 📡 REST API

## Authentication

``` http
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me
```

## Categories & Discovery

``` http
GET /api/v1/categories
GET /api/v1/events
GET /api/v1/events/nearby
GET /api/v1/events/:id
```

## Event Management

``` http
POST   /api/v1/events
PUT    /api/v1/events/:id
DELETE /api/v1/events/:id
```

## Ticketing

``` http
POST /api/v1/registrations
GET  /api/v1/registrations
```

## Payments

``` http
POST /api/v1/payments/create_intent
POST /api/v1/payments/webhook
```

These endpoints are documented in the Rails backend specification.
fileciteturn19file2L97-L123

------------------------------------------------------------------------

# 🔐 Authentication & RBAC

``` text
                    USER
                     │
                     ▼
              Login / Register
                     │
                     ▼
                  JWT Token
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       Attendee   Organizer    Admin
          │          │          │
          ▼          ▼          ▼
       Tickets     Events     System
```

The Rails architecture defines **attendee**, **organizer**, and
**admin** roles and JWT-based stateless sessions.
fileciteturn19file2L12-L25

------------------------------------------------------------------------

# 🧩 Rails Backend

``` text
backend/
│
├── app/
│   ├── controllers/
│   ├── models/
│   ├── serializers/
│   └── services/
│
├── config/
├── db/
│   ├── migrate/
│   └── seeds.rb
│
├── routes.rb
└── Gemfile
```

### Service Layer

  Service                  Responsibility
  ------------------------ -------------------------------------------
  `JwtService`             JWT encoding/decoding
  `GoogleMapsService`      Geocoding and location operations
  `StripePaymentService`   PaymentIntent and Stripe event processing

These service responsibilities are defined in the backend architecture.
fileciteturn19file2L124-L137

------------------------------------------------------------------------

# 🛠️ Technology Stack

  Layer                        Technology
  ---------------------------- -----------------------------------------
  Frontend                     React 18
  Routing                      React Router v6
  State                        React Context API
  HTTP                         Axios
  Backend                      Ruby on Rails 7 API Mode
  Database                     PostgreSQL 14+
  Authentication               JWT
  Payments                     Stripe API / Stripe.js
  Maps                         Google Maps JavaScript + Geocoding APIs
  Geospatial                   Geocoder + Haversine
  Styling                      Custom CSS design system
  Frontend Hosting Direction   Vercel / Netlify
  Containerization             Docker-supported environments

------------------------------------------------------------------------

# ⚙️ Getting Started

## Prerequisites

Install:

-   Node.js and npm
-   Ruby
-   Bundler
-   Rails 7
-   PostgreSQL 14+
-   Google Maps API credentials
-   Stripe test credentials

## Clone

``` bash
git clone <your-repository-url>
cd event-management-platform
```

## Backend

``` bash
cd backend
bundle install
rails db:create
rails db:migrate
rails db:seed
rails s
```

## Frontend

Open another terminal:

``` bash
cd frontend
npm install
npm start
```

The documented setup uses `bundle install`, database
creation/migration/seeding, Rails startup, and `npm install`/`npm start`
for the React frontend. fileciteturn19file2L138-L146
fileciteturn19file0L145-L152

------------------------------------------------------------------------

# 🔑 Environment Configuration

### Frontend

``` env
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
```

### Backend

``` env
POSTGRESQL_DATABASE=your_database
POSTGRESQL_USERNAME=your_username
POSTGRESQL_PASSWORD=your_password

STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret

GOOGLE_MAPS_API_KEY=your_google_maps_key
JWT_SECRET_KEY=your_jwt_secret
```

The documented configuration requires Google Maps and Stripe frontend
variables plus PostgreSQL, Stripe, Google Maps, and JWT backend
variables. fileciteturn19file0L149-L151
fileciteturn19file1L129-L134

> ⚠️ Never commit real credentials, private keys, database passwords,
> Stripe secrets, or `.env` files to a public repository.

------------------------------------------------------------------------

# 💳 Local Stripe Webhook Testing

``` bash
stripe listen --forward-to localhost:3000/api/v1/payments/webhook
```

The documented Stripe CLI workflow forwards test webhook events to the
local Rails webhook endpoint. fileciteturn19file2L147-L157

------------------------------------------------------------------------

# 📁 Repository Structure

``` text
event-management-platform/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.css
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── serializers/
│   │   └── services/
│   ├── config/
│   ├── db/
│   ├── routes.rb
│   └── Gemfile
│
├── .gitignore
├── LICENSE
└── README.md
```

------------------------------------------------------------------------

# 📈 Performance & Reliability

### Database

-   Spatial indexing for event coordinates
-   Indexed foreign keys
-   Status indexes
-   Unique transactional indexes

### Ticket Inventory

Database row locking protects inventory during concurrent checkout.

### Payments

Webhook-driven fulfillment provides asynchronous payment reconciliation.

### Architecture

The React client, Rails API, PostgreSQL database, payment service, and
mapping service remain separated into focused layers.

The documented PostgreSQL design explicitly includes spatial and
transactional indexes, while ticket reservations use row-level locking.
fileciteturn19file1L53-L57 fileciteturn19file1L73-L94

------------------------------------------------------------------------

# 🧠 Engineering Highlights

``` text
✓ React 18 Component Architecture
✓ React Context State Management
✓ Rails 7 API-only Backend
✓ PostgreSQL Relational Modeling
✓ Spatial Event Discovery
✓ Haversine Distance Calculation
✓ Google Maps Integration
✓ JWT Authentication
✓ Role-Based Access Control
✓ Stripe PaymentIntent Architecture
✓ Stripe Webhook Verification
✓ Concurrency-Safe Ticket Reservations
✓ Tiered Ticket Pricing
✓ Early-Bird Transitions
✓ QR Digital Ticket Fulfillment
✓ Organizer Analytics
✓ Modular Service Layer
✓ Database Indexing Strategy
✓ Development Fallback Systems
```

------------------------------------------------------------------------

# 🚀 Deployment Direction

``` text
                    Git Repository
                          │
                ┌─────────┴─────────┐
                ▼                   ▼
          Frontend Build       Rails Backend
                │                   │
                ▼                   ▼
          Vercel / Netlify      Production API
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
               PostgreSQL        Stripe        Google Maps
```

The frontend documentation identifies Vercel/Netlify as preferred React
hosting options and Docker as an option for containerized environments.
fileciteturn19file0L153-L157

------------------------------------------------------------------------

# 💼 Product & Monetization Concept

The documented go-to-market concept includes:

-   0% platform fees for an organizer's first three events
-   Free community meetup listings
-   Early-bird discounts
-   Group booking incentives
-   Social sharing loops
-   Geo-targeted Instagram/Facebook campaigns

fileciteturn19file1L135-L143

------------------------------------------------------------------------

# 🔮 Future Enhancements

-   [ ] Personalized event recommendations
-   [ ] Attendee reviews and ratings
-   [ ] Saved events
-   [ ] Advanced organizer reporting
-   [ ] Event check-in scanner
-   [ ] Organizer payout management
-   [ ] Multi-currency support
-   [ ] Recurring events
-   [ ] Advanced geospatial ranking
-   [ ] Mobile application
-   [ ] Automated event marketing
-   [ ] Fraud detection
-   [ ] Capacity forecasting

------------------------------------------------------------------------

# 📌 Project at a Glance

  Category              Implementation
  --------------------- --------------------------------------
  Product               EventSphere
  Type                  Full-stack event management platform
  Frontend              React 18
  Backend               Ruby on Rails 7 API
  Database              PostgreSQL 14+
  Authentication        JWT
  Maps                  Google Maps
  Geospatial            Geocoder + Haversine
  Payments              Stripe
  Ticketing             Tiered inventory
  Digital Fulfillment   QR-coded tickets
  Roles                 Attendee / Organizer / Admin
  Discovery             Search + Filters + Map
  Organizer Tools       Event Studio + Analytics
  License               MIT

------------------------------------------------------------------------

# 🏁 Final Architecture

``` text
                              🎟️ EVENTSPHERE
                                     │
                   ┌─────────────────┴─────────────────┐
                   │                                   │
                   ▼                                   ▼
              👤 ATTENDEE                         🧑‍💼 ORGANIZER
                   │                                   │
                   ▼                                   ▼
            Event Discovery                     Event Creation
                   │                                   │
          ┌────────┴────────┐                    Ticket Tiers
          ▼                 ▼                         │
      Grid View          Map View                     ▼
          │                 │                    Venue Mapping
          └────────┬────────┘                         │
                   ▼                                   ▼
             Event Details                       Organizer Studio
                   │                                   │
                   ▼                                   ▼
             Ticket Tiers                         Analytics
                   │
                   ▼
             Stripe Checkout
                   │
                   ▼
             PaymentIntent
                   │
                   ▼
              Webhook API
                   │
                   ▼
          Registration Confirmed
                   │
                   ▼
             QR Digital Ticket
                   │
                   ▼
             🎉 EVENT ACCESS


        ┌────────────────────────────────────────────────────┐
        │                    PLATFORM CORE                    │
        ├────────────────────────────────────────────────────┤
        │ React 18 │ Rails 7 │ PostgreSQL │ Stripe │ Maps   │
        └────────────────────────────────────────────────────┘
```

------------------------------------------------------------------------

# 📜 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for details.

------------------------------------------------------------------------

```{=html}
<p align="center">
```
`<strong>`{=html}🎟️ Discover More. Book Smarter. Experience
Better.`</strong>`{=html}`<br>`{=html}`<br>`{=html}
`<em>`{=html}EventSphere --- Event Management
Platform`</em>`{=html}`<br>`{=html} React 18 • Rails 7 • PostgreSQL •
Stripe • Google Maps
```{=html}
</p>
```
