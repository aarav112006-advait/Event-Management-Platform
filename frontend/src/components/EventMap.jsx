import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadGoogleMaps } from '../services/googleMapsService';
import { MapPinIcon, TicketIcon } from './Icons';

const EventMap = ({ events, selectedEvent, onSelectEvent }) => {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [activeEvent, setActiveEvent] = useState(selectedEvent || (events.length > 0 ? events[0] : null));

  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    loadGoogleMaps(apiKey).then((maps) => {
      if (maps && mapRef.current) {
        setMapsLoaded(true);
        const center = events[0]?.location || { lat: 19.0760, lng: 72.8777 };
        const mapInstance = new maps.Map(mapRef.current, {
          center,
          zoom: 11,
          styles: [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] }
          ]
        });

        events.forEach((evt) => {
          if (evt.location) {
            const marker = new maps.Marker({
              position: { lat: evt.location.lat, lng: evt.location.lng },
              map: mapInstance,
              title: evt.title
            });

            marker.addListener('click', () => {
              setActiveEvent(evt);
              if (onSelectEvent) onSelectEvent(evt);
            });
          }
        });
      }
    });
  }, [events, onSelectEvent]);

  return (
    <div className="map-wrapper-container">
      {/* Real Google Maps Canvas or Interactive Fallback Radar */}
      <div ref={mapRef} className="map-canvas-area">
        {!mapsLoaded && (
          <div className="interactive-simulator-map">
            <div className="map-grid-overlay">
              <div className="map-radar-pulse" />
              <div className="simulator-badge">
                <span>Interactive Geo-Radar Mode</span>
              </div>

              {/* Pins placed relative to coordinates */}
              {events.map((evt, idx) => {
                const isSelected = activeEvent?.id === evt.id;
                // Compute deterministic relative visual positioning
                const topPct = 20 + ((evt.location?.lat * 7) % 60);
                const leftPct = 15 + ((Math.abs(evt.location?.lng) * 9) % 70);

                return (
                  <button
                    key={evt.id}
                    onClick={() => {
                      setActiveEvent(evt);
                      if (onSelectEvent) onSelectEvent(evt);
                    }}
                    style={{ top: `${topPct}%`, left: `${leftPct}%` }}
                    className={`interactive-map-pin ${isSelected ? 'active-pin' : ''}`}
                    title={evt.title}
                  >
                    <div className="pin-badge-bubble">
                      <span className="pin-price">₹{evt.ticketTiers[0]?.price}</span>
                    </div>
                    <div className="pin-dot-anchor" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Floating Active Event Info Window / Card */}
      {activeEvent && (
        <div className="map-floating-event-card">
          <img src={activeEvent.image} alt={activeEvent.title} className="map-card-thumb" />
          <div className="map-card-details">
            <span className="event-category-badge-sm">{activeEvent.category}</span>
            <h4 className="map-card-title">{activeEvent.title}</h4>
            <p className="map-card-venue flex-align">
              <MapPinIcon className="w-3 h-3 text-primary mr-1" />
              {activeEvent.venue}, {activeEvent.city}
            </p>
            <div className="map-card-footer">
              <span className="map-card-price">
                From <strong>₹{activeEvent.ticketTiers[0]?.price}</strong>
              </span>
              <button
                onClick={() => navigate(`/events/${activeEvent.id}`)}
                className="btn-view-tickets-sm"
              >
                <TicketIcon className="w-3 h-3 mr-1" />
                Tickets
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventMap;
