import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import ParkingCard from '../components/ParkingCard';
import { IconSOS } from '../components/icons';
import { parkingSpots } from '../data/mockData';

export default function Home() {
  const navigate = useNavigate();
  const [ticketIdx, setTicketIdx] = useState(0);

  // Mock active ticket data
  const tickets = [
    {
      id: 'P-123',
      name: 'Free Public Parking, Sola, Ahmedabad, Gujarat 580050',
      time: '3 Mar / Ti: 2hrs',
      rating: '5.2K',
    },
  ];

  const ticket = tickets[ticketIdx];

  return (
    <PhoneShell>
      <TopBar onBack={null} onSearchFocus={() => navigate('/search')} onBell={() => navigate('/notifications')} />

      {/* Scrollable main content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-2">

        {/* ── Parking Ticket Section ── */}
        <div className="px-4 mt-2">
          <h2 className="text-white font-display font-semibold text-base">Parking ticket</h2>
        </div>

        {/* Ticket Card */}
        <div className="px-4 mt-2">
          <div
            className="rounded-2xl p-3 flex gap-3"
            style={{ background: 'var(--color-panel)', boxShadow: '0px 4px 10.5px 0px rgba(255,255,255,0.15)' }}
          >
            {/* QR Code placeholder */}
            <div className="shrink-0 w-[80px] h-[80px] rounded-xl bg-white flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 100 100" width="70" height="70">
                {/* QR code pattern */}
                <rect x="5" y="5" width="25" height="25" fill="#000"/>
                <rect x="70" y="5" width="25" height="25" fill="#000"/>
                <rect x="5" y="70" width="25" height="25" fill="#000"/>
                <rect x="10" y="10" width="15" height="15" fill="#fff"/>
                <rect x="75" y="10" width="15" height="15" fill="#fff"/>
                <rect x="10" y="75" width="15" height="15" fill="#fff"/>
                <rect x="14" y="14" width="7" height="7" fill="#000"/>
                <rect x="79" y="14" width="7" height="7" fill="#000"/>
                <rect x="14" y="79" width="7" height="7" fill="#000"/>
                {/* inner random blocks */}
                <rect x="35" y="5" width="5" height="5" fill="#000"/>
                <rect x="45" y="5" width="5" height="5" fill="#000"/>
                <rect x="55" y="10" width="5" height="5" fill="#000"/>
                <rect x="35" y="15" width="5" height="5" fill="#000"/>
                <rect x="50" y="20" width="5" height="5" fill="#000"/>
                <rect x="40" y="25" width="5" height="5" fill="#000"/>
                <rect x="35" y="35" width="5" height="5" fill="#000"/>
                <rect x="45" y="40" width="5" height="5" fill="#000"/>
                <rect x="55" y="35" width="5" height="5" fill="#000"/>
                <rect x="60" y="45" width="5" height="5" fill="#000"/>
                <rect x="70" y="35" width="5" height="5" fill="#000"/>
                <rect x="80" y="40" width="5" height="5" fill="#000"/>
                <rect x="35" y="50" width="5" height="5" fill="#000"/>
                <rect x="50" y="55" width="5" height="5" fill="#000"/>
                <rect x="60" y="60" width="5" height="5" fill="#000"/>
                <rect x="75" y="55" width="5" height="5" fill="#000"/>
                <rect x="40" y="65" width="5" height="5" fill="#000"/>
                <rect x="55" y="70" width="5" height="5" fill="#000"/>
                <rect x="70" y="70" width="5" height="5" fill="#000"/>
                <rect x="80" y="75" width="5" height="5" fill="#000"/>
                <rect x="90" y="80" width="5" height="5" fill="#000"/>
                <rect x="40" y="80" width="5" height="5" fill="#000"/>
                <rect x="55" y="85" width="5" height="5" fill="#000"/>
                <rect x="70" y="85" width="5" height="5" fill="#000"/>
                <rect x="85" y="90" width="5" height="5" fill="#000"/>
              </svg>
            </div>

            {/* Ticket Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-white text-[11px] leading-snug line-clamp-2">{ticket.name}</p>
                <span
                  className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-md text-white"
                  style={{ background: 'var(--color-blue-700)' }}
                >
                  {ticket.id}
                </span>
              </div>

              <div className="flex items-center justify-between mt-1.5">
                <button
                  onClick={() => navigate(`/direction/${parkingSpots[0].id}`)}
                  className="rounded-lg bg-white text-[10px] font-semibold px-3 py-1"
                  style={{ color: 'var(--color-navy-900)' }}
                >
                  Direction
                </button>
              </div>

              <div className="flex items-center justify-between mt-1.5">
                <span className="text-white/80 text-[10px]">⏱ {ticket.time}</span>
                <span className="text-white/80 text-[10px]">Rating: ⭐ {ticket.rating}</span>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-2">
            {tickets.map((_, i) => (
              <button
                key={i}
                onClick={() => setTicketIdx(i)}
                className={`rounded-full transition-all ${i === ticketIdx ? 'w-6 h-2' : 'w-2 h-2'}`}
                style={{ background: i === ticketIdx ? 'var(--color-blue-accent)' : 'rgba(255,255,255,0.3)' }}
                aria-label={`Ticket ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── Map Section ── */}
        <div className="px-4 mt-4">
          <h2 className="text-white font-display font-semibold text-sm mb-2">Map with all parking location</h2>
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: 150 }}>
            <button
              onClick={() => navigate('/search')}
              className="w-full h-full block"
              aria-label="Open map with all parking locations"
            >
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&q=60"
                alt="Map showing nearby parking locations"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, rgba(3,27,50,0.1), rgba(3,27,50,0.45))' }}
              />
            </button>

            {/* SOS floating button on map */}
            <button
              onClick={() => navigate('/sos')}
              aria-label="SOS emergency assistance"
              className="absolute flex items-center justify-center rounded-full text-white font-bold"
              style={{
                right: 10,
                bottom: 10,
                width: 48,
                height: 48,
                background: 'var(--color-bad)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
                zIndex: 10,
              }}
            >
              <span className="flex flex-col items-center leading-none">
                <IconSOS />
                <span className="text-[8px] mt-0.5">SOS</span>
              </span>
            </button>
          </div>
        </div>

        {/* ── Help For Parking ── */}
        <div className="px-4 mt-4">
          <h2 className="text-white font-display font-semibold text-sm mb-2">📞 Help For Parking</h2>
          <div className="flex flex-col gap-2">
            <div
              className="flex items-center justify-between rounded-2xl px-4 py-3"
              style={{ background: 'var(--color-panel)' }}
            >
              <span className="text-white text-xs font-medium">Office</span>
              <a
                href="tel:8741265980"
                className="flex items-center gap-1.5 rounded-lg bg-white text-[11px] font-semibold px-3 py-1.5"
                style={{ color: 'var(--color-navy-900)' }}
              >
                📞 CALL
              </a>
            </div>
            <div
              className="flex items-center justify-between rounded-2xl px-4 py-3"
              style={{ background: 'var(--color-panel)' }}
            >
              <span className="text-white text-xs font-medium">Security Guards</span>
              <a
                href="tel:9876543210"
                className="flex items-center gap-1.5 rounded-lg bg-white text-[11px] font-semibold px-3 py-1.5"
                style={{ color: 'var(--color-navy-900)' }}
              >
                📞 CALL
              </a>
            </div>
          </div>
        </div>

        {/* ── Nearby Parking Section ── */}
        <div className="px-4 mt-4">
          <h2 className="text-white font-display font-semibold text-base">Nearby Parking</h2>
        </div>

        <div className="px-4 mt-2 flex flex-col gap-3 pb-4">
          {parkingSpots.map((spot) => (
            <ParkingCard key={spot.id} spot={spot} />
          ))}
        </div>
      </div>

      <BottomNav active="home" />
    </PhoneShell>
  );
}
