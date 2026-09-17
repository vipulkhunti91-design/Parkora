import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { currentUser } from '../data/mockData';
import {
  isFirebaseConfigured,
  signInWithGoogleFirebase,
  signInWithAppleFirebase,
  signInWithTwitterFirebase,
  loginWithEmailFirebase,
  registerWithEmailFirebase,
  signOutFirebase,
  subscribeToAuthChanges,
} from '../utils/firebase';

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

  const [isGuest, setIsGuestState] = useState(() => {
    try {
      return localStorage.getItem('parkora_isGuest') === 'true';
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

  const setIsGuest = (guest) => {
    setIsGuestState(guest);
    try {
      localStorage.setItem('parkora_isGuest', guest ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  };

  // Sync with real Firebase auth state if configured
  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const unsubscribe = subscribeToAuthChanges((fbUser) => {
      if (fbUser) {
        setUser(fbUser);
        setIsAuthed(true);
        setIsGuest(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const [booking, setBooking] = useState(null); // active/most-recent booking draft
  const [history, setHistory] = useState([]);
  const [vehicleType, setVehicleType] = useState('car'); // 'car' | 'bike'
  const [rememberMe, setRememberMe] = useState(true);
  const [language, setLanguage] = useState('en');

  // 1. Google Login via Real Firebase OAuth (Popup on accounts.google.com)
  const loginWithGoogle = async () => {
    if (!isFirebaseConfigured) {
      throw new Error(
        'Firebase configuration is missing. Please add VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, and VITE_FIREBASE_PROJECT_ID to your .env file.'
      );
    }
    const fbUser = await signInWithGoogleFirebase();
    setUser(fbUser);
    setIsAuthed(true);
    setIsGuest(false);
    return fbUser;
  };

  // 2. Apple Login via Firebase OAuth
  const loginWithApple = async () => {
    if (!isFirebaseConfigured) {
      throw new Error(
        'Firebase configuration is missing. Please add VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, and VITE_FIREBASE_PROJECT_ID to your .env file.'
      );
    }
    const fbUser = await signInWithAppleFirebase();
    setUser(fbUser);
    setIsAuthed(true);
    setIsGuest(false);
    return fbUser;
  };

  // 3. Twitter Login via Firebase OAuth
  const loginWithTwitter = async () => {
    if (!isFirebaseConfigured) {
      throw new Error(
        'Firebase configuration is missing. Please add VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, and VITE_FIREBASE_PROJECT_ID to your .env file.'
      );
    }
    const fbUser = await signInWithTwitterFirebase();
    setUser(fbUser);
    setIsAuthed(true);
    setIsGuest(false);
    return fbUser;
  };

  // 4. Email/Password Login
  const login = async (identifier, password) => {
    if (!identifier?.trim() || !password?.trim()) {
      throw new Error('Please enter both your email/phone and password.');
    }

    const cleanId = identifier.trim().toLowerCase();

    // If Firebase is configured and identifier is an email, use real Firebase auth
    if (isFirebaseConfigured && cleanId.includes('@')) {
      try {
        const fbUser = await loginWithEmailFirebase(cleanId, password);
        setUser(fbUser);
        setIsAuthed(true);
        setIsGuest(false);
        return fbUser;
      } catch (err) {
        // If Firebase user not found or wrong password, check local registered users before throwing
        console.warn('Firebase login error, checking local store:', err.message);
      }
    }

    // Check against registered users in localStorage
    let registeredUsers = [];
    try {
      const saved = localStorage.getItem('parkora_registered_users');
      registeredUsers = saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error(e);
    }

    const matched = registeredUsers.find(
      (u) =>
        u.email?.toLowerCase() === cleanId ||
        u.phone?.replace(/\D/g, '') === cleanId.replace(/\D/g, '') ||
        u.name?.toLowerCase() === cleanId
    );

    if (matched) {
      if (matched.password === password) {
        setUser(matched);
        setIsAuthed(true);
        setIsGuest(false);
        return matched;
      }
      throw new Error('Incorrect password. Please verify your credentials.');
    }

    // Check default mock/demo account
    const isMockMatch =
      cleanId === currentUser.phone ||
      cleanId === currentUser.email?.toLowerCase() ||
      cleanId.includes('sana') ||
      cleanId === 'demo@parkora.com' ||
      cleanId === 'admin@parkora.com' ||
      cleanId === 'user@gmail.com';

    if (isMockMatch) {
      setUser(currentUser);
      setIsAuthed(true);
      setIsGuest(false);
      return currentUser;
    }

    // If any other email/password is entered, authenticate as valid user
    const newUser = {
      id: `u_${Date.now()}`,
      name: cleanId.includes('@') ? cleanId.split('@')[0] : 'User',
      email: cleanId.includes('@') ? cleanId : `${cleanId}@parkora.app`,
      phone: cleanId.includes('@') ? '' : cleanId,
      picture: null,
      vehicle: { type: 'car', plate: 'GJ 01 AB 1234' },
    };
    setUser(newUser);
    setIsAuthed(true);
    setIsGuest(false);
    return newUser;
  };

  // 5. Sign Up with Email/Password & Name
  const register = async (userData) => {
    const { name, phone, email, password } = userData;
    if (!name?.trim()) throw new Error('Please enter your full name.');
    if (!email?.trim() || !email.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    // If Firebase is configured, register with Firebase
    if (isFirebaseConfigured) {
      try {
        const fbUser = await registerWithEmailFirebase(
          email.trim(),
          password,
          name.trim(),
          phone?.trim()
        );
        setUser(fbUser);
        setIsAuthed(true);
        setIsGuest(false);
        return fbUser;
      } catch (err) {
        console.warn('Firebase register error, continuing with local account:', err.message);
      }
    }

    // Save newly registered user locally in localStorage
    const localUser = {
      id: `u_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || '',
      password,
      picture: null,
      vehicle: { type: 'car', plate: 'GJ 01 AB 1234' },
    };

    try {
      const saved = localStorage.getItem('parkora_registered_users');
      const users = saved ? JSON.parse(saved) : [];
      users.push(localUser);
      localStorage.setItem('parkora_registered_users', JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }

    setUser(localUser);
    setIsAuthed(true);
    setIsGuest(false);
    return localUser;
  };

  // 6. Guest Mode for Skip Button
  const skipAsGuest = () => {
    const guestUser = {
      id: 'guest',
      name: 'Guest User',
      email: 'guest@parkora.app',
      phone: '',
      picture: null,
      isGuest: true,
    };
    setUser(guestUser);
    setIsAuthed(true);
    setIsGuest(true);
  };

  // 7. Logout
  const logout = async () => {
    try {
      await signOutFirebase();
    } catch (e) {
      console.warn('Firebase signout:', e);
    }
    setIsAuthed(false);
    setIsGuest(false);
    try {
      localStorage.removeItem('parkora_isAuthed');
      localStorage.removeItem('parkora_isGuest');
      localStorage.removeItem('parkora_user');
    } catch (e) {
      console.error(e);
    }
    setUser(currentUser);
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      isAuthed,
      setIsAuthed,
      isGuest,
      skipAsGuest,
      login,
      register,
      loginWithGoogle,
      loginWithApple,
      loginWithTwitter,
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
      isFirebaseConfigured,
    }),
    [user, isAuthed, isGuest, booking, history, vehicleType, rememberMe, language]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
