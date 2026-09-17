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

  // 1. Google Login via Real Firebase OAuth
  const loginWithGoogle = async () => {
    const fbUser = await signInWithGoogleFirebase();
    setUser(fbUser);
    setIsAuthed(true);
    setIsGuest(false);
    return fbUser;
  };

  // 2. Apple Login via Real Firebase OAuth
  const loginWithApple = async () => {
    const fbUser = await signInWithAppleFirebase();
    setUser(fbUser);
    setIsAuthed(true);
    setIsGuest(false);
    return fbUser;
  };

  // 3. Twitter Login via Real Firebase OAuth
  const loginWithTwitter = async () => {
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

    const cleanId = identifier.trim();

    // If Firebase is configured and identifier is an email, use real Firebase auth
    if (isFirebaseConfigured && cleanId.includes('@')) {
      const fbUser = await loginWithEmailFirebase(cleanId, password);
      setUser(fbUser);
      setIsAuthed(true);
      setIsGuest(false);
      return fbUser;
    }

    // Otherwise, if phone number or Firebase not yet connected, validate credentials
    if (!isFirebaseConfigured) {
      throw new Error(
        'Firebase Authentication is not configured. Please add your VITE_FIREBASE_API_KEY in .env, or use "Skip" to continue as a guest.'
      );
    }

    // Phone / identifier check
    throw new Error('Please enter a valid email address registered with Firebase.');
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

    if (!isFirebaseConfigured) {
      throw new Error(
        'Firebase Authentication is not configured. Please add your VITE_FIREBASE_API_KEY in .env, or use "Skip" to continue as a guest.'
      );
    }

    const fbUser = await registerWithEmailFirebase(email.trim(), password, name.trim(), phone?.trim());
    setUser(fbUser);
    setIsAuthed(true);
    setIsGuest(false);
    return fbUser;
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

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
