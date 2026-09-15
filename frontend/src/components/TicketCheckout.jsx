import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { ShieldCheckIcon, CalendarIcon, MapPinIcon } from './Icons';

const TicketCheckout = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { events, bookTickets } = useEvents();
  const { user } = useAuth();

  const event = events.find((e) => e.id === id);
  const checkoutState = location.state || {
    tierId: event?.ticketTiers[0]?.id,
    tierName: event?.ticketTiers[0]?.name || 'General Admission',
    quantity: 1,
    pricePerTicket: event?.ticketTiers[0]?.price || 999,
    totalAmount: event?.ticketTiers[0]?.price || 999
  };

  const [attendeeName, setAttendeeName] = useState(user?.name || 'Aarav Patel');
  const [attendeeEmail, setAttendeeEmail] = useState(user?.email || 'aarav.patel@example.com');
  const [attendeePhone, setAttendeePhone] = useState('+91 98765 43210');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!event) {
    return (
      <div className="not-found-container">
        <h2>Invalid Booking Session</h2>
        <button onClick={() => navigate('/')} className="btn-primary-sm mt-3">
          Return to Events
        </button>
      </div>
    );
  }

  const subtotal = checkoutState.totalAmount;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const platformFee = 49;
  const gstAmount = Math.round((subtotal - discountAmount) * 0.18);
  const finalTotal = subtotal - discountAmount + platformFee + gstAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'EARLYBIRD20') {
      setDiscountPercent(20);
      setPromoMessage('✅ 20% Early Bird Discount applied!');
    } else if (promoCode.trim().toUpperCase() === 'STUDENT50') {
      setDiscountPercent(50);
      setPromoMessage('✅ 50% Student Pass Discount applied!');
    } else {
      setPromoMessage('❌ Invalid promo code');
    }
  };

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const booked = bookTickets({
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        venue: `${event.venue}, ${event.city}`,
        tierName: checkoutState.tierName,
        quantity: checkoutState.quantity,
        totalPaid: finalTotal,
        attendeeName,
        attendeeEmail
      });

      setIsProcessing(false);
      navigate('/my-tickets', { state: { newTicketId: booked.id } });
    }, 1200);
  };

  return (
    <div className="checkout-page-container">
      <h1 className="checkout-page-title">Complete Your Reservation</h1>

      <div className="checkout-grid-layout">
        {/* Left: Attendee Details & Stripe Card Form */}
        <div className="checkout-forms-column">
          {/* Attendee Form */}
          <div className="checkout-card-box">
            <h2 className="checkout-box-title">1. Attendee Information</h2>
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Full Legal Name</label>
                <input
                  type="text"
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email for Ticket Delivery</label>
                <input
                  type="email"
                  value={attendeeEmail}
                  onChange={(e) => setAttendeeEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>
            <div className="form-group mt-2">
              <label className="form-label">Phone Number (SMS QR Pass)</label>
              <input
                type="tel"
                value={attendeePhone}
                onChange={(e) => setAttendeePhone(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Stripe Payment Form */}
          <div className="checkout-card-box mt-4">
            <div className="flex-between mb-2">
              <h2 className="checkout-box-title">2. Payment Information</h2>
              <span className="stripe-badge">
                <ShieldCheckIcon className="w-4 h-4 text-primary mr-1" />
                256-Bit SSL Encrypted
              </span>
            </div>

            <form onSubmit={handleConfirmPayment} className="stripe-payment-form">
              <div className="form-group">
                <label className="form-label">Cardholder Name</label>
                <input
                  type="text"
                  defaultValue={attendeeName}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="form-input font-mono"
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Expiration Date</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="form-input font-mono"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">CVC / CVV</label>
                  <input
                    type="text"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="form-input font-mono"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="btn-confirm-payment"
              >
                {isProcessing ? 'Authorizing with Stripe...' : `Pay ₹${finalTotal} & Confirm Registration`}
              </button>
            </form>
          </div>
        </div>

        {/* Right: Order Summary */}
        <aside className="checkout-summary-column">
          <div className="summary-card-box">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-event-brief">
              <img src={event.image} alt={event.title} className="summary-event-thumb" />
              <div>
                <h4 className="summary-event-name">{event.title}</h4>
                <p className="summary-event-meta flex-align">
                  <CalendarIcon className="w-3 h-3 mr-1 text-primary" />
                  {event.date}
                </p>
                <p className="summary-event-meta flex-align">
                  <MapPinIcon className="w-3 h-3 mr-1 text-primary" />
                  {event.city}
                </p>
              </div>
            </div>

            <div className="summary-tier-badge-row">
              <span className="tier-selected-label">{checkoutState.tierName}</span>
              <span className="tier-selected-qty">x {checkoutState.quantity}</span>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="promo-form-row">
              <input
                type="text"
                placeholder="Discount code (e.g. EARLYBIRD20)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="promo-input"
              />
              <button type="submit" className="btn-apply-promo">
                Apply
              </button>
            </form>
            {promoMessage && <p className="promo-status-msg">{promoMessage}</p>}

            <div className="summary-cost-list">
              <div className="cost-row">
                <span>Tickets Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="cost-row text-success font-semibold">
                  <span>Promo Discount ({discountPercent}%):</span>
                  <span>- ₹{discountAmount}</span>
                </div>
              )}
              <div className="cost-row text-xs text-muted">
                <span>Platform Processing:</span>
                <span>₹{platformFee}</span>
              </div>
              <div className="cost-row text-xs text-muted">
                <span>GST (18%):</span>
                <span>₹{gstAmount}</span>
              </div>
              <div className="cost-total-row">
                <span>Final Total:</span>
                <span className="final-total-highlight">₹{finalTotal}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TicketCheckout;
