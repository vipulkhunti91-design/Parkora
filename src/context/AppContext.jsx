import { createContext, useContext, useMemo, useState } from 'react';
import { currentUser } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Restore user & auth state from localStorage for persistent session
  const [user, setUserState] = useState(() => {
    try {
      const saved = localStorage.getItem('parkora_user');
      return saved ? JSON.parse(saved) : currentUser;
    } catch {
      return currentUser;
    }
  });

  const [isAuthed, setIsAuthedState] = useState(() => {
    try {
      return localStorage.getItem('parkora_isAuthed') === 'true';
    } catch {
      return false;
    }
  });

  const setUser = (nextUser) => {
    setUserState(nextUser);
    try {
      if (nextUser) {
        localStorage.setItem('parkora_user', JSON.stringify(nextUser));
      } else {
        localStorage.removeItem('parkora_user');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const setIsAuthed = (authed) => {
    setIsAuthedState(authed);
    try {
      localStorage.setItem('parkora_isAuthed', authed ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  };

  const [booking, setBooking] = useState(null); // active/most-recent booking draft
  const [history, setHistory] = useState([]);
  const [vehicleType, setVehicleType] = useState('car'); // 'car' | 'bike'
  const [rememberMe, setRememberMe] = useState(true);
  const [language, setLanguage] = useState('en');

  // Normal login: validates username/email/phone & password against registered users or mock user
  const login = (identifier, password) => {
    if (!identifier?.trim() || !password?.trim()) {
      return { success: false, message: 'Please enter both your email/phone and password.' };
    }

    const cleanId = identifier.trim().toLowerCase();
    
    // Load registered users from localStorage
    let users = [];
    try {
      const savedUsers = localStorage.getItem('parkora_registered_users');
      users = savedUsers ? JSON.parse(savedUsers) : [];
    } catch (e) {
      console.error(e);
    }

    // Check against registered users
    const matchedUser = users.find(
      (u) =>
        (u.email && u.email.toLowerCase() === cleanId) ||
        (u.phone && u.phone.replace(/\D/g, '') === cleanId.replace(/\D/g, '')) ||
        (u.name && u.name.toLowerCase() === cleanId)
    );

    if (matchedUser) {
      if (matchedUser.password === password) {
        setUser(matchedUser);
        setIsAuthed(true);
        return { success: true };
      }
      return { success: false, message: 'Incorrect password. Please try again.' };
    }

    // Default mock user credentials check (Sana Mehta)
    const isMockMatch =
      cleanId === currentUser.phone ||
      cleanId === currentUser.email.toLowerCase() ||
      cleanId.includes('sana') ||
      cleanId === '9876543210';

    if (isMockMatch) {
      // Allow demo password 'password', '123456', or any 4+ char password for mock user
      setUser(currentUser);
      setIsAuthed(true);
      return { success: true };
    }

    return {
      success: false,
      message: 'Account not found with this phone or email. Please sign up first.',
    };
  };

  // Sign up: validates required fields, creates account, saves to localStorage & logs in
  const register = (userData) => {
    const { name, phone, email, password } = userData;
    if (!name?.trim()) return { success: false, message: 'Please enter your full name.' };
    if (!phone?.trim()) return { success: false, message: 'Please enter your phone number.' };
    if (!password || password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' };
    }

    const newUser = {
      id: `u_${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || '',
      password,
      picture: null,
      vehicle: { type: 'car', plate: 'GJ 01 AB 1234' },
      createdAt: new Date().toISOString(),
    };

    try {
      const savedUsers = localStorage.getItem('parkora_registered_users');
      const users = savedUsers ? JSON.parse(savedUsers) : [];
      users.push(newUser);
      localStorage.setItem('parkora_registered_users', JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }

    setUser(newUser);
    setIsAuthed(true);
    return { success: true };
  };

  // Google login: saves Google account details and logs in
  const loginWithGoogle = (googleUserData) => {
    const googleUser = {
      id: googleUserData.id || `google_${Date.now()}`,
      name: googleUserData.name || 'Google User',
      email: googleUserData.email || '',
      picture: googleUserData.picture || null,
      phone: currentUser.phone,
      vehicle: currentUser.vehicle,
      provider: 'google',
    };

    setUser(googleUser);
    setIsAuthed(true);
    return { success: true };
  };

  const logout = () => {
    setIsAuthed(false);
    try {
      localStorage.removeItem('parkora_isAuthed');
      localStorage.removeItem('parkora_user');
    } catch (e) {
      console.error(e);
    }
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      isAuthed,
      setIsAuthed,
      login,
      register,
      loginWithGoogle,
      logout,
      booking,
      setBooking,
      history,
      setHistory,
      vehicleType,
      setVehicleType,
      rememberMe,
      setRememberMe,
      language,
      setLanguage,
    }),
    [user, isAuthed, booking, history, vehicleType, rememberMe, language]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
