import { useNavigate, useParams } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { parkingSpots } from '../data/mockData';

// Figma represents this as a static screenshot of native map turn-by-turn
// navigation (pasted image asset) with a floating close button — the actual
// navigation is expected to hand off to the device's maps app.
export default function Direction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const spot = parkingSpots.find((s) => s.id === id);

  return (
    <PhoneShell bg={false} className="relative">
      <img
        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=60"
        alt="Turn-by-turn map navigation"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.45))' }} />

      <button
        onClick={() => navigate(-1)}
        aria-label="Close directions"
        className="absolute flex items-center justify-center rounded-full text-white text-xl"
        style={{ left: 16, bottom: 24, width: 44, height: 44, background: 'rgba(0,0,0,0.5)' }}
      >
        ✕
      </button>

      {spot && (
        <div className="absolute left-4 right-4 bottom-24 rounded-2xl px-4 py-3 text-white" style={{ background: 'rgba(5,33,61,0.85)' }}>
          <p className="font-semibold text-sm">{spot.name}</p>
          <p className="text-xs text-white/70 mt-1">{spot.distance} away · {spot.time}</p>
        </div>
      )}
    </PhoneShell>
  );
}
