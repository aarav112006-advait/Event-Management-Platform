import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { CalendarIcon, MapPinIcon, TicketIcon, ShieldCheckIcon, ShareIcon } from './Icons';

const EventDetail = ({ onOpenAuth }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events } = useEvents();
  const { user } = useAuth();

  const event = events.find((e) => e.id === id);

  const [selectedTierId, setSelectedTierId] = useState(
    event?.ticketTiers[0]?.id || ''
  );
  const [ticketCount, setTicketCount] = useState(1);

  if (!event) {
    return (
      <div className="not-found-container">
        <h2>Event Not Found</h2>
        <p>The event you are looking for may have concluded or been relocated.</p>
        <button onClick={() => navigate('/')} className="btn-primary-sm mt-3">
          Back to Events
        </button>
      </div>
    );
  }

  const selectedTier = event.ticketTiers.find((t) => t.id === selectedTierId) || event.ticketTiers[0];
  const totalPrice = selectedTier ? selectedTier.price * ticketCount : 0;

  const handleProceedToCheckout = () => {
    navigate(`/checkout/${event.id}`, {
      state: {
        tierId: selectedTier.id,
        tierName: selectedTier.name,
        quantity: ticketCount,
        pricePerTicket: selectedTier.price,
        totalAmount: totalPrice
      }
    });
  };

  return (
    <div className="detail-page-container">
      {/* Hero Banner */}
      <div className="detail-hero-banner">
        <img src={event.image} alt={event.title} className="detail-hero-img" />
        <div className="detail-hero-overlay">
          <div className="detail-hero-tags">
            <span className="event-category-badge">{event.category}</span>
            <span className="detail-status-badge">Verified Event</span>
          </div>
          <h1 className="detail-title">{event.title}</h1>
          <div className="detail-quick-meta">
            <span className="flex-align mr-4">
              <CalendarIcon className="w-4 h-4 mr-1 text-primary" />
              {event.date} • {event.time}
            </span>
            <span className="flex-align">
              <MapPinIcon className="w-4 h-4 mr-1 text-primary" />
              {event.venue}, {event.city}
            </span>
          </div>
        </div>
      </div>

      <div className="detail-layout-grid">
        {/* Left: Description & Venue Details */}
        <div className="detail-main-content">
          <section className="detail-card-box">
            <h2 className="section-heading">About This Experience</h2>
            <p className="detail-description-text">{event.description}</p>

            <div className="perks-list-box mt-4">
              <h3 className="sub-heading">What's Included:</h3>
              <ul className="perks-bullet-grid">
                {selectedTier?.perks?.map((perk, idx) => (
                  <li key={idx} className="perk-bullet-item">
                    <ShieldCheckIcon className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Venue & Location Preview */}
          <section className="detail-card-box mt-4">
            <h2 className="section-heading">Venue & Location</h2>
            <p className="venue-address-text">
              <strong>{event.venue}</strong>
              <br />
              {event.location?.address}
            </p>
            <div className="venue-map-preview-box">
              <div className="map-pin-centered">
                <MapPinIcon className="w-8 h-8 text-primary animate-bounce" />
                <span className="text-xs font-bold text-white bg-dark px-2 py-1 rounded shadow">
                  {event.venue}
                </span>
              </div>
            </div>
          </section>

          {/* Organizer Card */}
          <section className="detail-card-box mt-4">
            <h2 className="section-heading">Hosted By</h2>
            <div className="organizer-profile-row">
              <img src={event.organizer?.avatar} alt={event.organizer?.name} className="organizer-avatar" />
              <div className="organizer-meta">
                <h3 className="organizer-name">{event.organizer?.name}</h3>
                <p className="text-xs text-muted">
                  ★ {event.organizer?.rating} rating • {event.organizer?.eventsCount} events hosted
                </p>
                <p className="text-xs text-muted">{event.organizer?.email}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right: Ticket Selection Sticky Box */}
        <aside className="detail-sidebar">
          <div className="ticket-selection-card">
            <h3 className="ticket-card-title">Select Tickets</h3>

            <div className="ticket-tiers-stack">
              {event.ticketTiers.map((tier) => {
                const isSelected = selectedTierId === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`ticket-tier-row ${isSelected ? 'active-tier' : ''}`}
                  >
                    <div className="tier-info">
                      <h4 className="tier-name">{tier.name}</h4>
                      <p className="tier-perks-brief">{tier.perks.slice(0, 2).join(' • ')}</p>
                      <span className="tier-availability-text">{tier.available} spots left</span>
                    </div>
                    <div className="tier-price-tag">
                      ₹{tier.price}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quantity Stepper */}
            <div className="quantity-selector-box">
              <span className="text-sm font-semibold">Quantity:</span>
              <div className="stepper-controls">
                <button
                  type="button"
                  onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                  className="stepper-btn"
                >
                  -
                </button>
                <span className="stepper-value">{ticketCount}</span>
                <button
                  type="button"
                  onClick={() => setTicketCount(Math.min(10, ticketCount + 1))}
                  className="stepper-btn"
                >
                  +
                </button>
              </div>
            </div>

            <div className="subtotal-breakdown-box">
              <div className="breakdown-row">
                <span>Subtotal ({ticketCount} {ticketCount > 1 ? 'tickets' : 'ticket'}):</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="breakdown-row text-xs text-muted">
                <span>Booking & GST:</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="breakdown-total-row">
                <span>Estimated Total:</span>
                <span className="total-amount-large">₹{totalPrice}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="btn-checkout-cta"
            >
              <TicketIcon className="w-4 h-4 mr-2" />
              Proceed to Booking
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EventDetail;
