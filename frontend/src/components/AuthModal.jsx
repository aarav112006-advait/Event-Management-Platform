import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose, initialRole = 'attendee' }) => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegister) {
        if (!name || !email || !password) {
          setError('Please fill in all fields.');
          return;
        }
        await register(name, email, password, role);
      } else {
        if (!email || !password) {
          setError('Please provide email and password.');
          return;
        }
        await login(email, password, role);
      }
      onClose();
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  const handleQuickDemo = async (demoRole) => {
    const demoEmail = demoRole === 'organizer' ? 'organizer@eventsphere.io' : 'aarav.patel@example.com';
    await login(demoEmail, 'password123', demoRole);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <h2 className="modal-title">{isRegister ? 'Create an Account' : 'Welcome Back'}</h2>
          <button onClick={onClose} className="modal-close-btn">&times;</button>
        </div>

        <div className="role-selector-pill">
          <button
            type="button"
            onClick={() => setRole('attendee')}
            className={`pill-btn ${role === 'attendee' ? 'active' : ''}`}
          >
            Attendee
          </button>
          <button
            type="button"
            onClick={() => setRole('organizer')}
            className={`pill-btn ${role === 'organizer' ? 'active' : ''}`}
          >
            Organizer
          </button>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {isRegister && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                placeholder="e.g. Aarav Patel"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <button type="submit" className="btn-primary-block">
            {isRegister ? 'Register as ' + (role === 'organizer' ? 'Organizer' : 'Attendee') : 'Sign In'}
          </button>
        </form>

        <div className="demo-bypass-box">
          <p className="text-xs text-muted mb-2">Instant Demo Login:</p>
          <div className="flex-gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('attendee')}
              className="btn-demo-tag"
            >
              Demo Attendee
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('organizer')}
              className="btn-demo-tag"
            >
              Demo Organizer
            </button>
          </div>
        </div>

        <div className="modal-footer-toggle">
          {isRegister ? (
            <p>
              Already have an account?{' '}
              <button onClick={() => setIsRegister(false)} className="link-btn">
                Sign in
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setIsRegister(true)} className="link-btn">
                Register now
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
