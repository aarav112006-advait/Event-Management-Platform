# 🎟️ EventSphere - React Event Management & Ticketing Frontend

A modern, production-grade event discovery, ticketing, and organizer management frontend built with **React 18**, **React Router v6**, **Google Maps JavaScript API**, and **Stripe.js**.

---

## 🚀 Key Features

1. **Event Discovery & Interactive Maps**:
   - Filter by categories (*Technology, Music, Business, Food & Drink, Sports, Arts & Culture*).
   - Filter by major hub cities (*Mumbai, Pune, Bengaluru, San Francisco*).
   - Date range selector and keyword search across title, venue, and descriptions.
   - Dual-view toggle: Responsive Grid View vs. Split View with an interactive Google Map canvas.
   - Built-in geo-radar map simulator that provides visual pin placement and info windows even without an active Google Maps API key.

2. **Event Details & Tiered Ticketing**:
   - Hero cover banner with verified badges, dates, times, and venue location.
   - Interactive tiered ticket selector (*Early Bird, General Admission, VIP Pass*) with live availability counters, perks breakdown, and quantity steppers.
   - Organizer profile card showcasing host rating and event portfolio.

3. **Stripe Checkout & Registration**:
   - Attendee registration form with legal name, email, and phone number for SMS pass delivery.
   - Discount code engine supporting promotional coupons (e.g. `EARLYBIRD20`, `STUDENT50`).
   - 256-bit SSL encrypted Stripe Card Element form simulation for payment authorization.
   - Instant ticket issuance and redirect to pass wallet.

4. **Digital QR Pass Wallet (`MyTickets.jsx`)**:
   - Digital event admission ticket stub with high-contrast QR code for door scanning.
   - Complete booking metadata, reference code, attendee info, and print/PDF export.

5. **Organizer Studio (`OrganizerDashboard.jsx`)**:
   - Executive KPI analytics: Total events listed, registered attendees, and gross sales volume.
   - Event creation studio with title, category, date/time, venue name, city, Google Maps latitude/longitude coordinates, tiered ticket pricing, and cover image.

6. **State Management & Authentication**:
   - `AuthContext`: Role classification between `Attendee` and `Organizer` with instant demo logins.
   - `EventContext`: Centralized event inventory, search/filtering state, map view toggles, and user ticket wallet.

---

## 🛠 Tech Stack

- **Framework**: React 18
- **Routing**: React Router v6
- **Maps**: Google Maps JavaScript API with fallback interactive geo-radar simulator
- **Payments**: Stripe.js & `@stripe/react-stripe-js`
- **Styling**: Custom CSS design system inspired by Eventbrite and Meetup
- **HTTP Client**: Axios with JWT interceptors

---

## 📦 Getting Started

### 1. Install Dependencies

```bash
cd /working_dir/c_205659be1248f238/event-management-platform/frontend
npm install
```

### 2. Configure Environment Variables

Create `.env` based on `.env.example`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_51...your_stripe_publishable_key
```

*Note: If no Google Maps API key is supplied, the application automatically activates its interactive radar simulator, allowing full map interactions, pin clicking, and ticket card overlays.*

### 3. Run Development Server

```bash
npm start
```
The application will launch on `http://localhost:3000`.
