import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { CATEGORIES } from '../data/mockEvents';
import EventMap from './EventMap';
import { SearchIcon, MapPinIcon, CalendarIcon, GridIcon, MapIcon, TicketIcon } from './Icons';

const EventDiscovery = () => {
  const navigate = useNavigate();
  const {
    filteredEvents,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedCity,
    setSelectedCity,
    selectedDate,
    setSelectedDate,
    isMapView,
    setIsMapView,
    setSelectedEvent
  } = useEvents();

  const cities = ['All', 'Mumbai', 'Pune', 'Bengaluru', 'San Francisco'];

  return (
    <div className="discovery-container">
      {/* Hero Header */}
      <header className="hero-section">
        <div className="hero-content">
          <span className="hero-pill">Live Experiences & Summits</span>
          <h1 className="hero-headline">Discover Events Around You</h1>
          <p className="hero-subtitle">
            Explore conferences, musical symphonies, tech meetups, and food festivals with live venue maps and instant verified tickets.
          </p>

          {/* Search & Filter Bar */}
          <div className="filter-bar-card">
            <div className="filter-input-group">
              <SearchIcon className="filter-icon" />
              <input
                type="text"
                placeholder="Search by event, artist, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-divider" />

            <div className="filter-input-group">
              <MapPinIcon className="filter-icon" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="filter-select"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city === 'All' ? 'All Locations' : city}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-divider" />

            <div className="filter-input-group">
              <CalendarIcon className="filter-icon" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="filter-input filter-date"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Category Chips and View Toggle */}
      <section className="filter-controls-row">
        <div className="category-chips-list">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-chip ${selectedCategory === cat ? 'active-chip' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="view-mode-toggle">
          <button
            onClick={() => setIsMapView(false)}
            className={`toggle-btn ${!isMapView ? 'active' : ''}`}
            title="Grid View"
          >
            <GridIcon className="w-4 h-4" />
            <span>Grid</span>
          </button>
          <button
            onClick={() => setIsMapView(true)}
            className={`toggle-btn ${isMapView ? 'active' : ''}`}
            title="Interactive Map View"
          >
            <MapIcon className="w-4 h-4" />
            <span>Map</span>
          </button>
        </div>
      </section>

      {/* Main Content Area: Grid vs Map Split */}
      <main className="events-display-area">
        {isMapView ? (
          <div className="split-view-layout">
            <div className="split-sidebar-list">
              <p className="text-xs text-muted uppercase font-bold mb-3">
                Showing {filteredEvents.length} events on map
              </p>
              <div className="split-cards-scroll">
                {filteredEvents.map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => setSelectedEvent(evt)}
                    className="mini-event-card"
                  >
                    <img src={evt.image} alt={evt.title} className="mini-card-img" />
                    <div className="mini-card-body">
                      <span className="event-category-badge-xs">{evt.category}</span>
                      <h4 className="mini-card-title">{evt.title}</h4>
                      <p className="mini-card-meta">{evt.date} • {evt.city}</p>
                      <span className="mini-card-price">From ₹{evt.ticketTiers[0]?.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="split-map-panel">
              <EventMap
                events={filteredEvents}
                onSelectEvent={(evt) => setSelectedEvent(evt)}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="results-summary-row">
              <h3 className="results-count-heading">
                Upcoming Events <span className="count-highlight">({filteredEvents.length})</span>
              </h3>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="empty-results-box">
                <p className="empty-title">No events match your search criteria</p>
                <p className="empty-text">Try clearing your filters or searching in a different city.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedCity('All');
                    setSelectedDate('');
                  }}
                  className="btn-secondary-sm mt-3"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="events-grid">
                {filteredEvents.map((evt) => (
                  <article key={evt.id} className="event-card">
                    <div className="card-image-wrap">
                      <img src={evt.image} alt={evt.title} className="card-image" />
                      <span className="card-category-tag">{evt.category}</span>
                      {evt.isFeatured && <span className="featured-tag">Featured</span>}
                    </div>

                    <div className="card-body">
                      <div className="card-date-badge">
                        <CalendarIcon className="w-4 h-4 text-primary mr-1" />
                        <span>{evt.date}</span>
                        <span className="meta-dot">•</span>
                        <span>{evt.time.split('-')[0]}</span>
                      </div>

                      <h3 className="card-title">{evt.title}</h3>
                      <p className="card-venue flex-align">
                        <MapPinIcon className="w-4 h-4 text-muted mr-1" />
                        {evt.venue}, {evt.city}
                      </p>

                      <p className="card-snippet">{evt.description.slice(0, 105)}...</p>

                      <div className="card-footer">
                        <div className="card-price-box">
                          <span className="price-label">Tickets from</span>
                          <span className="price-amount">₹{evt.ticketTiers[0]?.price}</span>
                        </div>

                        <button
                          onClick={() => navigate(`/events/${evt.id}`)}
                          className="btn-get-tickets"
                        >
                          <TicketIcon className="w-4 h-4 mr-1" />
                          Get Tickets
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default EventDiscovery;
