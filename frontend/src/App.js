import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import Navbar from './components/Navbar';
import EventDiscovery from './components/EventDiscovery';
import EventDetail from './components/EventDetail';
import TicketCheckout from './components/TicketCheckout';
import MyTickets from './components/MyTickets';
import OrganizerDashboard from './components/OrganizerDashboard';
import AuthModal from './components/AuthModal';
import './App.css';

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState('attendee');

  const handleOpenAuth = (role = 'attendee') => {
    setAuthRole(role);
    setAuthModalOpen(true);
  };

  return (
    <AuthProvider>
      <EventProvider>
        <Router>
          <div className="app-root-layout">
            <Navbar onOpenAuth={handleOpenAuth} />

            <div className="app-main-content">
              <Routes>
                <Route path="/" element={<EventDiscovery />} />
                <Route path="/events/:id" element={<EventDetail onOpenAuth={handleOpenAuth} />} />
                <Route path="/checkout/:id" element={<TicketCheckout />} />
                <Route path="/my-tickets" element={<MyTickets />} />
                <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
              </Routes>
            </div>

            <footer className="app-footer">
              <div className="footer-content-inner">
                <div className="footer-brand-column">
                  <span className="footer-logo-title">EventSphere</span>
                  <p className="footer-tagline">
                    The all-in-one platform for live conferences, concerts, and tech summits with interactive venue maps and verified ticketing.
                  </p>
                </div>
                <div className="footer-meta-column">
                  <p className="text-xs text-muted">© 2026 EventSphere Inc. All rights reserved.</p>
                  <p className="text-xs text-muted">Integrated with Google Maps API & Stripe Checkout.</p>
                </div>
              </div>
            </footer>

            <AuthModal
              isOpen={authModalOpen}
              onClose={() => setAuthModalOpen(false)}
              initialRole={authRole}
            />
          </div>
        </Router>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
