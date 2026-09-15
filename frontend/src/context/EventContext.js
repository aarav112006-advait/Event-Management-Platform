import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_EVENTS } from '../data/mockEvents';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('eventsphere_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isMapView, setIsMapView] = useState(false);

  // User tickets state
  const [userTickets, setUserTickets] = useState(() => {
    const saved = localStorage.getItem('eventsphere_user_tickets');
    if (saved) return JSON.parse(saved);
    // Starter sample ticket
    return [
      {
        id: 'TCK-94821',
        eventId: 'evt-101',
        eventTitle: 'Global AI & Web3 Summit 2026',
        eventDate: '2026-10-15',
        eventTime: '09:30 AM - 06:00 PM',
        venue: 'Jio World Convention Centre, BKC, Mumbai',
        tierName: 'General Admission',
        quantity: 1,
        totalPaid: 1499,
        qrCodeValue: 'ES-TCK-94821-EVT101-CONFIRMED',
        purchasedAt: '2026-09-10T14:22:00Z',
        attendeeName: 'Aarav Patel',
        attendeeEmail: 'aarav@example.com'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('eventsphere_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('eventsphere_user_tickets', JSON.stringify(userTickets));
  }, [userTickets]);

  const addEvent = (newEvent) => {
    const created = {
      ...newEvent,
      id: 'evt-' + Date.now().toString().slice(-4),
      capacity: parseInt(newEvent.capacity, 10) || 500,
      attendeesCount: 0,
      isFeatured: false
    };
    setEvents((prev) => [created, ...prev]);
    return created;
  };

  const bookTickets = (ticketData) => {
    const newTicket = {
      id: 'TCK-' + Math.floor(10000 + Math.random() * 90000),
      ...ticketData,
      qrCodeValue: `ES-${Date.now()}-${ticketData.eventId}`,
      purchasedAt: new Date().toISOString()
    };

    setUserTickets((prev) => [newTicket, ...prev]);

    // Update event attendee count
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === ticketData.eventId) {
          return {
            ...evt,
            attendeesCount: (evt.attendeesCount || 0) + ticketData.quantity
          };
        }
        return evt;
      })
    );

    return newTicket;
  };

  const filteredEvents = events.filter((evt) => {
    const matchesQuery =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || evt.category === selectedCategory;

    const matchesCity =
      selectedCity === 'All' || evt.city.toLowerCase() === selectedCity.toLowerCase();

    const matchesDate =
      !selectedDate || evt.date === selectedDate;

    return matchesQuery && matchesCategory && matchesCity && matchesDate;
  });

  return (
    <EventContext.Provider
      value={{
        events,
        filteredEvents,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedCity,
        setSelectedCity,
        selectedDate,
        setSelectedDate,
        selectedEvent,
        setSelectedEvent,
        isMapView,
        setIsMapView,
        userTickets,
        addEvent,
        bookTickets
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
