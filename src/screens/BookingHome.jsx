import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import BottomNav from '../components/BottomNav';
import ParkingCard from '../components/ParkingCard';
import { useApp } from '../context/AppContext';
import { parkingSpots } from '../data/mockData';

// "Booking" bottom-nav tab: pick a spot to start a new booking, or jump back
// into the booking currently in progress.
export default function BookingHome() {
  const navigate = useNavigate();
  const { booking } = useApp();

  return (
    <PhoneShell>
      <div className="px-4 pt-6 pb-2">
        <h1 className="text-white font-display font-bold text-lg">Booking</h1>
        <p className="text-white/60 text-sm mt-1">Pick a parking spot to reserve a slot.</p>
      </div>

      {booking && (
        <button
          onClick={() => navigate('/payment')}
          className="mx-4 mt-2 rounded-2xl px-4 py-3 text-left"
          style={{ background: '#fff' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-navy-900)' }}>
            Continue booking
          </p>
          <p className="text-sm font-semibold" style={{ color: 'var(--color-navy-900)' }}>
            {booking.spot.name} · {booking.timeIn}
          </p>
        </button>
      )}

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 mt-3 pb-4 flex flex-col gap-3">
        {parkingSpots.map((spot) => (
          <ParkingCard key={spot.id} spot={spot} />
        ))}
      </div>

      <BottomNav active="booking" />
    </PhoneShell>
  );
}
