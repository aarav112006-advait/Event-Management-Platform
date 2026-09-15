import React from 'react';
import { useEvents } from '../context/EventContext';
import { CalendarIcon, MapPinIcon, QrCodeIcon, TicketIcon } from './Icons';

const MyTickets = () => {
  const { userTickets } = useEvents();

  return (
    <div className="my-tickets-container">
      <div className="tickets-header-row">
        <div>
          <h1 className="page-headline">My Event Passes</h1>
          <p className="page-subtitle">
            Present your digital QR code passes at the venue gate for instant check-in.
          </p>
        </div>
        <span className="active-tickets-counter">
          {userTickets.length} Active {userTickets.length === 1 ? 'Pass' : 'Passes'}
        </span>
      </div>

      {userTickets.length === 0 ? (
        <div className="empty-tickets-card">
          <TicketIcon className="w-12 h-12 text-muted mx-auto mb-3" />
          <h3>No booked tickets yet</h3>
          <p className="text-muted text-sm">
            Browse upcoming conferences and events to reserve your passes.
          </p>
        </div>
      ) : (
        <div className="tickets-stack">
          {userTickets.map((tck) => (
            <div key={tck.id} className="ticket-pass-card">
              <div className="pass-left-stub">
                <span className="pass-status-pill">Confirmed & Valid</span>
                <h3 className="pass-event-title">{tck.eventTitle}</h3>

                <div className="pass-meta-grid">
                  <div>
                    <span className="meta-label">Date & Time</span>
                    <p className="meta-val flex-align">
                      <CalendarIcon className="w-3 h-3 text-primary mr-1" />
                      {tck.eventDate}
                    </p>
                    <p className="text-xs text-muted">{tck.eventTime}</p>
                  </div>

                  <div>
                    <span className="meta-label">Venue</span>
                    <p className="meta-val flex-align">
                      <MapPinIcon className="w-3 h-3 text-primary mr-1" />
                      {tck.venue}
                    </p>
                  </div>

                  <div>
                    <span className="meta-label">Pass Holder</span>
                    <p className="meta-val">{tck.attendeeName}</p>
                    <p className="text-xs text-muted">{tck.attendeeEmail}</p>
                  </div>

                  <div>
                    <span className="meta-label">Ticket Tier</span>
                    <p className="meta-val font-semibold text-primary">
                      {tck.tierName} (Qty: {tck.quantity})
                    </p>
                  </div>
                </div>

                <div className="pass-bottom-details">
                  <span className="text-xs text-muted">Pass Reference: <strong>{tck.id}</strong></span>
                  <span className="text-xs text-muted">Total Paid: ₹{tck.totalPaid}</span>
                </div>
              </div>

              {/* Dotted Cut Line */}
              <div className="pass-tear-line" />

              {/* Right QR Stub */}
              <div className="pass-right-qr-stub">
                <div className="qr-code-box">
                  <QrCodeIcon className="w-24 h-24 text-dark" />
                </div>
                <span className="qr-label">Scan at Door</span>
                <button
                  onClick={() => window.print()}
                  className="btn-download-pass"
                >
                  Print / PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
