import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import ParkingCard from '../components/ParkingCard';
import { IconSOS } from '../components/icons';
import { parkingSpots } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useApp();

  return (
    <PhoneShell>
      <TopBar onBack={null} onSearchFocus={() => navigate('/search')} onBell={() => navigate('/notifications')} />

      <div className="px-4 flex items-center justify-between mt-1">
        <div>
          <p className="text-white/60 text-xs">Hi {user.name.split(' ')[0]},</p>
          <h1 className="text-white font-display text-lg font-bold">Parking Ticket</h1>
        </div>
      </div>

      {/* Map placeholder — Figma references a live map with all parking locations pinned */}
      <div className="px-4 mt-3">
        <button
          onClick={() => navigate('/search')}
          className="relative w-full rounded-2xl overflow-hidden block"
          style={{ height: 160 }}
          aria-label="Open map with all parking locations"
        >
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&q=60"
            alt="Map showing nearby parking locations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(3,27,50,0.1), rgba(3,27,50,0.55))' }} />
          <span className="absolute bottom-2 left-3 text-white text-xs font-medium">Map with all parking locations</span>
        </button>
      </div>

      <div className="flex items-center justify-between px-4 mt-5">
        <h2 className="text-white font-display font-semibold text-base">Nearby Parking</h2>
        <button onClick={() => navigate('/search')} className="text-white/60 text-xs brand-underline">
          See all
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 mt-3 pb-4 flex flex-col gap-3">
        {parkingSpots.map((spot) => (
          <ParkingCard key={spot.id} spot={spot} />
        ))}
      </div>

      <button
        onClick={() => navigate('/sos')}
        aria-label="SOS emergency assistance"
        className="absolute flex items-center justify-center rounded-full text-white font-bold gap-1 z-40"
        style={{
          right: 16,
          bottom: 92,
          width: 54,
          height: 54,
          background: 'var(--color-bad)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
        }}
      >
        <span className="flex flex-col items-center leading-none">
          <IconSOS />
          <span className="text-[9px] mt-0.5">SOS</span>
        </span>
      </button>

      <BottomNav active="home" />
    </PhoneShell>
  );
}
