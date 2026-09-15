# 🎟️ Event Management Platform — Rails 7 API Backend

A production-grade RESTful API backend for event discovery, ticketing, geospatial radius search, and secure payment processing built with **Ruby on Rails 7 (API mode)**, **PostgreSQL**, **JWT Authentication**, **Stripe API**, and **Google Maps / Geocoder**.

---

## 🚀 Key Features

1. **Architecture & Standards**:
   - Lightweight Rails 7 API mode with fast JSON responses.
   - Decoupled service architecture (`JwtService`, `GoogleMapsService`, `StripePaymentService`).
   - Strong parameter validation and comprehensive error rescue handlers.

2. **Authentication & Authorization**:
   - Stateless JWT authentication with Bearer tokens in the `Authorization` header.
   - Role-based access control (`attendee`, `organizer`, `admin`).
   - Secure password hashing with `bcrypt` and `has_secure_password`.

3. **Event Management & Geospatial Search**:
   - Complete event lifecycles: `draft`, `published`, `cancelled`.
   - Automatic geocoding via Google Maps API when creating/updating events.
   - High-performance spatial search (`near_coordinates`) using the spherical Haversine formula to find events within a dynamic radius (in kilometers) from given latitude/longitude coordinates.
   - Multi-parameter filtering by categories, cities, date ranges, and keyword searches.

4. **Tiered Ticketing & Inventory Concurrency**:
   - Support for multiple ticket tiers (Early Bird, General Admission, VIP) with independent capacities, price schedules, and sales windows.
   - Pessimistic locking (`lock`) during registration creation to prevent race conditions and overbooking.

5. **Stripe Payment Processing & Webhooks**:
   - Generates Stripe `PaymentIntent` with registration metadata.
   - Secure webhook receiver (`/api/v1/payments/webhook`) with cryptographic signature verification (`Stripe::Webhook.construct_event`).
   - Automated registration confirmation and instant ticket code / QR payload generation upon `payment_intent.succeeded`.

---

## 🛠 Tech Stack

- **Framework**: Ruby on Rails 7.0+ (API mode)
- **Language**: Ruby 3.1+
- **Database**: PostgreSQL 14+
- **Authentication**: JWT (JSON Web Tokens) + Bcrypt
- **Payments**: Stripe Ruby SDK
- **Geocoding & Maps**: Geocoder Gem & Google Maps Geocoding API
- **Server**: Puma

---

## 📦 Local Setup & Installation

### 1. Prerequisites
- Ruby 3.1+ installed
- PostgreSQL running locally or accessible remotely
- Bundler (`gem install bundler`)

---

### 2. Environment Configuration

Copy the example environment configuration:
```bash
cp .env.example .env
```

Update `.env` with your local database credentials, JWT secret, Stripe keys, and Google Maps API key:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=event_management_development
DB_USERNAME=postgres
DB_PASSWORD=postgres
JWT_SECRET=replace_with_secure_random_key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
GOOGLE_MAPS_API_KEY=AIzaSy...
```

---

### 3. Install Gems & Initialize Database

```bash
# Install ruby dependencies
bundle install

# Create database, run migrations, and load rich seed data
rails db:create
rails db:migrate
rails db:seed
```

---

### 4. Start the Rails API Server

```bash
rails server -p 3000
```
Or start via Puma:
```bash
bundle exec puma -C config/puma.rb
```

Verify server status:
```bash
curl http://localhost:3000/health
# Response: {"status":"ok","timestamp":"..."}
```

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Register new user (`attendee` or `organizer`) | No |
| `POST` | `/api/v1/auth/login` | Login and receive JWT token | No |
| `GET` | `/api/v1/auth/me` | Fetch authenticated user profile | Bearer JWT |
| `GET` | `/api/v1/categories` | List all event categories | No |
| `GET` | `/api/v1/events` | Browse events (filters: `q`, `category_id`, `city`, `latitude`, `longitude`, `radius_km`) | No |
| `GET` | `/api/v1/events/nearby` | Find events near coordinate location | No |
| `GET` | `/api/v1/events/:id` | Event details with ticket tiers and organizer info | No |
| `POST` | `/api/v1/events` | Create new event with automatic address geocoding | Organizer / Admin |
| `PUT` | `/api/v1/events/:id` | Update event details | Organizer / Admin |
| `DELETE` | `/api/v1/events/:id` | Delete event | Organizer / Admin |
| `POST` | `/api/v1/events/:event_id/ticket_tiers` | Add ticket tier to event | Organizer / Admin |
| `POST` | `/api/v1/registrations` | Create registration with ticket reservations | Bearer JWT |
| `GET` | `/api/v1/registrations` | View user's registration and ticket history | Bearer JWT |
| `POST` | `/api/v1/payments/create_intent` | Generate Stripe PaymentIntent for registration | Bearer JWT |
| `POST` | `/api/v1/payments/webhook` | Stripe webhook listener for payment fulfillment | Stripe Signature |

---

## 💳 Stripe Webhook Testing with Stripe CLI

To test Stripe payment fulfillment locally without deploying to a public domain:

1. [Install Stripe CLI](https://stripe.com/docs/stripe-cli).
2. Authenticate the CLI:
   ```bash
   stripe login
   ```
3. Forward webhook events to your local Rails endpoint:
   ```bash
   stripe listen --forward-to localhost:3000/api/v1/payments/webhook
   ```
4. Copy the webhook signing secret printed by the CLI (`whsec_...`) and update `STRIPE_WEBHOOK_SECRET` in your `.env`.
5. Trigger a test payment event:
   ```bash
   stripe trigger payment_intent.succeeded
   ```
