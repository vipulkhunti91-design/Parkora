import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

import Splash from './screens/Splash';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Otp from './screens/Otp';
import ForgotPassword from './screens/ForgotPassword';
import Loading from './screens/Loading';

import Home from './screens/Home';
import BookingHome from './screens/BookingHome';
import Search from './screens/Search';
import Details from './screens/Details';
import Booking from './screens/Booking';
import PaymentMethod from './screens/PaymentMethod';
import PaymentResult from './screens/PaymentResult';
import Direction from './screens/Direction';
import Sos from './screens/Sos';

import Notifications from './screens/Notifications';
import Profile from './screens/Profile';
import ProfileEdit from './screens/ProfileEdit';
import VehicleProfile from './screens/VehicleProfile';
import History from './screens/History';
import Language from './screens/Language';
import Feedback from './screens/Feedback';
import FeedbackThanks from './screens/FeedbackThanks';
import Help from './screens/Help';

function RequireAuth({ children }) {
  const { isAuthed } = useApp();
  if (!isAuthed) return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Onboarding / auth flow */}
      <Route path="/" element={<Splash />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/loading" element={<Loading />} />

      {/* Core app (behind auth) */}
      <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
      <Route path="/search" element={<RequireAuth><Search /></RequireAuth>} />
      <Route path="/details/:id" element={<RequireAuth><Details /></RequireAuth>} />
      <Route path="/booking" element={<RequireAuth><BookingHome /></RequireAuth>} />
      <Route path="/booking/:id" element={<RequireAuth><Booking /></RequireAuth>} />
      <Route path="/payment" element={<RequireAuth><PaymentMethod /></RequireAuth>} />
      <Route path="/payment/success" element={<RequireAuth><PaymentResult success /></RequireAuth>} />
      <Route path="/payment/failed" element={<RequireAuth><PaymentResult success={false} /></RequireAuth>} />
      <Route path="/direction/:id" element={<RequireAuth><Direction /></RequireAuth>} />
      <Route path="/sos" element={<RequireAuth><Sos /></RequireAuth>} />

      <Route path="/notifications" element={<RequireAuth><Notifications /></RequireAuth>} />
      <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
      <Route path="/profile/edit" element={<RequireAuth><ProfileEdit /></RequireAuth>} />
      <Route path="/profile/vehicle" element={<RequireAuth><VehicleProfile /></RequireAuth>} />
      <Route path="/history" element={<RequireAuth><History /></RequireAuth>} />
      <Route path="/language" element={<RequireAuth><Language /></RequireAuth>} />
      <Route path="/feedback/thanks" element={<RequireAuth><FeedbackThanks /></RequireAuth>} />
      <Route path="/feedback/:id" element={<RequireAuth><Feedback /></RequireAuth>} />
      <Route path="/help" element={<RequireAuth><Help /></RequireAuth>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
