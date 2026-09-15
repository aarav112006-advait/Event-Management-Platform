import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { PlusIcon, CalendarIcon, MapPinIcon, TicketIcon, ShieldCheckIcon } from './Icons';

const OrganizerDashboard = () => {
  const { events, addEvent } = useEvents();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technology');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('2026-10-30');
  const [time, setTime] = useState('10:00 AM - 05:00 PM');
  const [venue, setVenue] = useState('Co-Working Hub, Baner');
  const [city, setCity] = useState('Pune');
  const [country, setCountry] = useState('India');
  const [lat, setLat] = useState('18.5590');
  const [lng, setLng] = useState('73.7868');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80');
  const [earlyBirdPrice, setEarlyBirdPrice] = useState('499');
  const [gaPrice, setGaPrice] = useState('1299');
  const [vipPrice, setVipPrice] = useState('2999');
  const [capacity, setCapacity] = useState('300');
  const [submittedMessage, setSubmittedMessage] = useState('');

  const handleCreateEvent = (e) => {
    e.preventDefault();

    const newEvent = {
      title,
      category,
      description,
      date,
      time,
      venue,
      city,
      country,
      location: {
        lat: parseFloat(lat) || 18.5590,
        lng: parseFloat(lng) || 73.7868,
        address: `${venue}, ${city}, ${country}`
      },
      image,
      organizer: {
        name: user?.name || 'Tech Hub Organizers',
        email: user?.email || 'organizer@eventsphere.io',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
        rating: 5.0,
        eventsCount: 1
      },
      ticketTiers: [
        { id: 'tier-1', name: 'Early Bird Pass', price: parseInt(earlyBirdPrice, 10) || 499, available: 50, perks: ['Keynote access', 'Coffee break'] },
        { id: 'tier-2', name: 'General Admission', price: parseInt(gaPrice, 10) || 1299, available: 150, perks: ['All sessions', 'Buffet lunch', 'Networking'] },
        { id: 'tier-3', name: 'VIP Pass', price: parseInt(vipPrice, 10) || 2999, available: 20, perks: ['Front row', 'Speakers lounge', 'Dinner pass'] }
      ],
      capacity: parseInt(capacity, 10) || 300
    };

    const created = addEvent(newEvent);
    setSubmittedMessage('✅ Event published successfully to live discovery directory!');
    setTimeout(() => {
      navigate(`/events/${created.id}`);
    }, 1500);
  };

  const totalAttendees = events.reduce((sum, e) => sum + (e.attendeesCount || 0), 0);
  const totalGrossRevenue = events.reduce((sum, e) => {
    const avgPrice = e.ticketTiers[0]?.price || 500;
    return sum + (e.attendeesCount || 0) * avgPrice;
  }, 0);

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-header-row">
        <div>
          <h1 className="page-headline">Organizer Studio</h1>
          <p className="page-subtitle">
            Publish experiences, manage ticket inventory, and view sales performance.
          </p>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="kpi-metrics-grid">
        <div className="kpi-metric-card">
          <span className="kpi-label">Total Events Listed</span>
          <h3 className="kpi-value">{events.length}</h3>
        </div>
        <div className="kpi-metric-card">
          <span className="kpi-label">Total Attendees Registered</span>
          <h3 className="kpi-value text-primary">{totalAttendees.toLocaleString()}</h3>
        </div>
        <div className="kpi-metric-card">
          <span className="kpi-label">Gross Ticket Sales Volume</span>
          <h3 className="kpi-value text-success">₹{totalGrossRevenue.toLocaleString()}</h3>
        </div>
      </div>

      {submittedMessage && (
        <div className="success-banner-box mb-4">{submittedMessage}</div>
      )}

      {/* Create New Event Card */}
      <div className="create-event-card-box">
        <h2 className="section-heading mb-3">Publish New Event</h2>

        <form onSubmit={handleCreateEvent} className="event-creation-form">
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Event Title</label>
              <input
                type="text"
                placeholder="e.g. Pune Tech Innovations Summit"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
              >
                <option value="Technology">Technology</option>
                <option value="Music">Music</option>
                <option value="Business">Business</option>
                <option value="Food & Drink">Food & Drink</option>
                <option value="Sports">Sports</option>
                <option value="Arts & Culture">Arts & Culture</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Detailed Description</label>
            <textarea
              rows={3}
              placeholder="Highlight the speakers, activities, agenda, and target audience..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              required
            />
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Time</label>
              <input
                type="text"
                placeholder="e.g. 10:00 AM - 05:00 PM"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Max Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Location & Google Maps Geopoint */}
          <div className="form-row-3">
            <div className="form-group">
              <label className="form-label">Venue Name</label>
              <input
                type="text"
                placeholder="e.g. Westin Grand Ballroom"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                placeholder="e.g. Pune"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Map Coordinates */}
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Latitude (Google Maps)</label>
              <input
                type="text"
                placeholder="18.5204"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="form-input font-mono"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Longitude (Google Maps)</label>
              <input
                type="text"
                placeholder="73.8567"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="form-input font-mono"
              />
            </div>
          </div>

          {/* Ticket Tier Pricing */}
          <div className="form-row-3">
            <div className="form-group">
              <label className="form-label">Early Bird Ticket (₹)</label>
              <input
                type="number"
                value={earlyBirdPrice}
                onChange={(e) => setEarlyBirdPrice(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">General Admission (₹)</label>
              <input
                type="number"
                value={gaPrice}
                onChange={(e) => setGaPrice(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">VIP Pass (₹)</label>
              <input
                type="number"
                value={vipPrice}
                onChange={(e) => setVipPrice(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Cover Banner Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="btn-publish-event">
            <PlusIcon className="w-4 h-4 mr-1" />
            Publish Event Immediately
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
