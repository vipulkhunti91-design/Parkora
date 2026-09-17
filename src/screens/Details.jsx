import { useNavigate, useParams } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import ParkingCard from '../components/ParkingCard';
import { IconPin, IconStar, IconRupee } from '../components/icons';
import { parkingSpots } from '../data/mockData';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const spot = parkingSpots.find((s) => s.id === id) || parkingSpots[0];
  const suggestion = parkingSpots.find((s) => s.id !== spot.id);

  return (
    <PhoneShell>
      <TopBar onSearchFocus={() => navigate('/search')} onBell={() => navigate('/notifications')} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-4">
        <h1 className="text-white font-display font-bold text-lg mt-1 mb-3">Details</h1>

        <div className="rounded-2xl overflow-hidden relative" style={{ height: 170 }}>
          <img src={spot.photo} alt="" className="w-full h-full object-cover" />
          <span
            className="absolute top-3 left-3 text-[10px] font-semibold px-2 py-1 rounded-full text-white"
            style={{ background: 'var(--color-good)' }}
          >
            {spot.status}
          </span>
        </div>

        <div className="mt-3 flex items-start justify-between">
          <div>
            <p className="text-white font-bold text-base">{spot.name}</p>
            <p className="flex items-start gap-1 text-white/70 text-xs mt-1 max-w-[220px]">
              <IconPin className="shrink-0 mt-[1px]" />
              {spot.address}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="flex items-center justify-end gap-1 text-white text-sm font-semibold">
              <IconRupee />
              {spot.price.toFixed(2)}
            </span>
            <span className="flex items-center justify-end gap-1 text-white/70 text-xs mt-1">
              <IconStar className="text-yellow-400" />
              {spot.rating} ({spot.reviews})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 rounded-xl px-3 py-2" style={{ background: 'var(--color-panel)' }}>
          <span className="text-white/80 text-xs">Open Time</span>
          <span className="text-white text-xs font-medium">{spot.hours}</span>
        </div>

        {/* Security and Office Info matching Figma Screen 27 */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="rounded-xl p-2.5" style={{ background: 'var(--color-panel)' }}>
            <p className="text-[10px] text-white/60">Security Guard</p>
            <p className="text-white text-xs font-semibold mt-0.5 truncate">{spot.security?.guard || 'Raj Singh'}</p>
            <a href={`tel:${spot.security?.guardPhone || '9876543210'}`} className="text-[10px] text-blue-300 hover:underline block mt-0.5">
              {spot.security?.guardPhone || '9876543210'}
            </a>
          </div>
          <div className="rounded-xl p-2.5" style={{ background: 'var(--color-panel)' }}>
            <p className="text-[10px] text-white/60">Parking Office</p>
            <p className="text-white text-xs font-semibold mt-0.5">Control Desk</p>
            <a href={`tel:${spot.security?.officeNumber || '8741265980'}`} className="text-[10px] text-blue-300 hover:underline block mt-0.5">
              {spot.security?.officeNumber || '8741265980'}
            </a>
          </div>
        </div>

        <h2 className="text-white font-semibold text-sm mt-4 mb-2">Amenities</h2>
        <div className="grid grid-cols-2 gap-2">
          {spot.amenities.map((a) => (
            <div key={a.label} className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: 'var(--color-panel)' }}>
              <span
                className="rounded-full shrink-0"
                style={{ width: 8, height: 8, background: a.ok ? 'var(--color-good)' : 'var(--color-bad)' }}
              />
              <span className="text-white/90 text-xs">{a.label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate(`/feedback/${spot.id}`)}
          className="w-full rounded-2xl py-3 text-white text-sm font-medium mt-5 border"
          style={{ borderColor: 'rgba(255,255,255,0.5)' }}
        >
          Give Feedback
        </button>

        <div className="flex gap-3 mt-3">
          <button
            onClick={() => navigate(`/booking/${spot.id}`)}
            className="flex-1 rounded-2xl py-3 font-semibold text-sm"
            style={{ background: '#fff', color: 'var(--color-navy-900)' }}
          >
            Book
          </button>
          <button
            onClick={() => navigate(`/direction/${spot.id}`)}
            className="flex-1 rounded-2xl py-3 font-semibold text-sm"
            style={{ background: '#fff', color: 'var(--color-navy-900)' }}
          >
            Direction
          </button>
        </div>

        {suggestion && (
          <>
            <h2 className="text-white font-semibold text-sm mt-6 mb-2">Suggestion</h2>
            <ParkingCard spot={suggestion} />
          </>
        )}
      </div>

      <BottomNav active="home" />
    </PhoneShell>
  );
}
