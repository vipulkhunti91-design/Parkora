import { createContext, useContext, useMemo, useState } from 'react';
import { currentUser } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(currentUser);
  const [isAuthed, setIsAuthed] = useState(false);
  const [booking, setBooking] = useState(null); // active/most-recent booking draft
  const [history, setHistory] = useState([]);
  const [vehicleType, setVehicleType] = useState('car'); // 'car' | 'bike'
  const [rememberMe, setRememberMe] = useState(true);
  const [language, setLanguage] = useState('en');

  const value = useMemo(
    () => ({
      user,
      setUser,
      isAuthed,
      setIsAuthed,
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
