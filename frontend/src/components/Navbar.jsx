import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { CalendarIcon, MapPinIcon, TicketIcon, UserIcon, PlusIcon } from './Icons';

const Navbar = ({ onOpenAuth }) => {
  const { user, logout, switchRole } = useAuth();
  const { userTickets } = useEvents();
  const navigate = useNavigate();
  const [profileDropdown, setProfileDropdown] = useState(false);

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-brand">
          <Link to="/" className="brand-logo">
            <div className="logo-icon-bg">
              <CalendarIcon className="logo-icon" />
            </div>
            <span className="brand-title">EventSphere</span>
          </Link>
          <div className="nav-links-left">
            <Link to="/" className="nav-link">Explore Events</Link>
            <Link to="/my-tickets" className="nav-link flex-align">
              <TicketIcon className="nav-icon-sm" />
              My Tickets
              {userTickets.length > 0 && (
                <span className="ticket-badge">{userTickets.length}</span>
              )}
            </Link>
          </div>
        </div>

        <div className="navbar-actions">
          <button
            onClick={() => {
              if (!user) {
                onOpenAuth('organizer');
              } else {
                navigate('/organizer/dashboard');
              }
            }}
            className="btn-create-event"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Create Event</span>
          </button>

          {user ? (
            <div className="profile-menu-wrapper">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="user-profile-btn"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                  alt={user.name}
                  className="user-avatar"
                />
                <div className="user-info-text">
                  <span className="user-name-text">{user.name}</span>
                  <span className="user-role-badge">{user.role}</span>
                </div>
              </button>

              {profileDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <p className="dropdown-user-email">{user.email}</p>
                    <div className="role-toggle-box">
                      <span className="text-xs text-muted">Role: </span>
                      <button
                        onClick={() => switchRole(user.role === 'attendee' ? 'organizer' : 'attendee')}
                        className="role-switch-link"
                      >
                        Switch to {user.role === 'attendee' ? 'Organizer' : 'Attendee'}
                      </button>
                    </div>
                  </div>
                  <div className="dropdown-divider" />
                  <Link
                    to="/my-tickets"
                    onClick={() => setProfileDropdown(false)}
                    className="dropdown-item"
                  >
                    My Bookings ({userTickets.length})
                  </Link>
                  <Link
                    to="/organizer/dashboard"
                    onClick={() => setProfileDropdown(false)}
                    className="dropdown-item"
                  >
                    Organizer Studio
                  </Link>
                  <div className="dropdown-divider" />
                  <button
                    onClick={() => {
                      logout();
                      setProfileDropdown(false);
                      navigate('/');
                    }}
                    className="dropdown-item text-danger"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button
                onClick={() => onOpenAuth('attendee')}
                className="btn-sign-in"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
