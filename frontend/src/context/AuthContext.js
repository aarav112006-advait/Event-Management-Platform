import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('event_auth_token');
    const savedUser = localStorage.getItem('event_auth_user');

    if (savedToken && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user:', e);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role = 'attendee') => {
    // Simulated / API login
    const mockUser = {
      id: 'usr-' + Date.now().toString().slice(-4),
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      role: role || 'attendee',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    };
    const mockToken = 'jwt_mock_token_' + Date.now();

    localStorage.setItem('event_auth_token', mockToken);
    localStorage.setItem('event_auth_user', JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const register = async (name, email, password, role = 'attendee') => {
    const mockUser = {
      id: 'usr-' + Date.now().toString().slice(-4),
      name,
      email,
      role: role || 'attendee',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    };
    const mockToken = 'jwt_mock_token_' + Date.now();

    localStorage.setItem('event_auth_token', mockToken);
    localStorage.setItem('event_auth_user', JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const logout = () => {
    localStorage.removeItem('event_auth_token');
    localStorage.removeItem('event_auth_user');
    setUser(null);
  };

  const switchRole = (newRole) => {
    if (user) {
      const updated = { ...user, role: newRole };
      setUser(updated);
      localStorage.setItem('event_auth_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
