import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import ParkingCard from '../components/ParkingCard';
import { IconSOS, IconCar, IconBike } from '../components/icons';
import { parkingSpots } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function Home() {
  const navigate = useNavigate();
  const { vehicleType, setVehicleType } = useApp();
  const [ticketIdx, setTicketIdx] = useState(0);

  // Mock active ticket data matching Figma screen 79
  const tickets = [
    {
      id: 'P:123',
      name: 'Free Public Parking, Sola, Ahmedabad, Gujarat 380060',
      time: '12.3 KM / Ti: 21 min',
      rating: '5.2K',
    },
    {
      id: 'P:124',
      name: 'MK Car Parking, Gujarat 382115',
      time: '56 M / Ti: 1 min',
      rating: '4.8K',
    },
  ];

  const ticket = tickets[ticketIdx];

  return (
    <PhoneShell>
      <TopBar
        onBack={null}
        onSearchFocus={() => navigate('/search')}
        onBell={() => navigate('/notifications')}
      />

      {/* Scrollable main content matching original Figma layout */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-3">

        {/* ── Parking Ticket Section ── */}
        <div className="px-4 mt-2">
          <h2 className="text-white font-display font-semibold text-base">Parking ticket</h2>
        </div>

        {/* Ticket Card with QR Code */}
        <div className="px-4 mt-2">
          <div
            className="rounded-3xl p-3.5 flex gap-3 border border-white/10"
            style={{
              background: 'var(--color-panel)',
              boxShadow: '0px 4px 10.5px 0px rgba(255,255,255,0.15)',
            }}
          >
            {/* QR Code */}
            <div className="shrink-0 w-[84px] h-[84px] rounded-2xl bg-white flex items-center justify-center overflow-hidden p-1.5 shadow-sm">
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <rect x="5" y="5" width="25" height="25" fill="#000" />
                <rect x="70" y="5" width="25" height="25" fill="#000" />
                <rect x="5" y="70" width="25" height="25" fill="#000" />
                <rect x="10" y="10" width="15" height="15" fill="#fff" />
                <rect x="75" y="10" width="15" height="15" fill="#fff" />
                <rect x="10" y="75" width="15" height="15" fill="#fff" />
                <rect x="14" y="14" width="7" height="7" fill="#000" />
                <rect x="79" y="14" width="7" height="7" fill="#000" />
                <rect x="14" y="79" width="7" height="7" fill="#000" />
                <rect x="35" y="5" width="5" height="5" fill="#000" />
                <rect x="45" y="5" width="5" height="5" fill="#000" />
                <rect x="55" y="10" width="5" height="5" fill="#000" />
                <rect x="35" y="15" width="5" height="5" fill="#000" />
                <rect x="50" y="20" width="5" height="5" fill="#000" />
                <rect x="40" y="25" width="5" height="5" fill="#000" />
                <rect x="35" y="35" width="5" height="5" fill="#000" />
                <rect x="45" y="40" width="5" height="5" fill="#000" />
                <rect x="55" y="35" width="5" height="5" fill="#000" />
                <rect x="60" y="45" width="5" height="5" fill="#000" />
                <rect x="70" y="35" width="5" height="5" fill="#000" />
                <rect x="80" y="40" width="5" height="5" fill="#000" />
                <rect x="35" y="50" width="5" height="5" fill="#000" />
                <rect x="50" y="55" width="5" height="5" fill="#000" />
                <rect x="60" y="60" width="5" height="5" fill="#000" />
                <rect x="75" y="55" width="5" height="5" fill="#000" />
                <rect x="40" y="65" width="5" height="5" fill="#000" />
                <rect x="55" y="70" width="5" height="5" fill="#000" />
                <rect x="70" y="70" width="5" height="5" fill="#000" />
                <rect x="80" y="75" width="5" height="5" fill="#000" />
                <rect x="90" y="80" width="5" height="5" fill="#000" />
                <rect x="40" y="80" width="5" height="5" fill="#000" />
                <rect x="55" y="85" width="5" height="5" fill="#000" />
                <rect x="70" y="85" width="5" height="5" fill="#000" />
              </svg>
            </div>

            {/* Ticket Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-white text-[11px] leading-snug line-clamp-2">{ticket.name}</p>
                <span
                  className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-md text-white shadow-sm"
                  style={{ background: 'var(--color-blue-700)' }}
                >
                  {ticket.id}
                </span>
              </div>

              <div className="flex items-center justify-between mt-1">
                <button
                  onClick={() => navigate(`/direction/${parkingSpots[0].id}`)}
                  className="rounded-lg bg-white text-[10px] font-bold px-3 py-1 text-gray-900 shadow-sm transition active:scale-95"
                >
                  Direction
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-white/80 mt-1">
                <span>{ticket.time}</span>
                <span>Rating: ⭐ {ticket.rating}</span>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {tickets.map((_, i) => (
              <button
                key={i}
                onClick={() => setTicketIdx(i)}
                className={`rounded-full transition-all ${i === ticketIdx ? 'w-5 h-1.5' : 'w-1.5 h-1.5'}`}
                style={{
                  background: i === ticketIdx ? 'var(--color-blue-accent)' : 'rgba(255,255,255,0.3)',
                }}
                aria-label={`Ticket ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── Map Section ── */}
        <div className="px-4 mt-4">
          <h2 className="text-white font-display font-semibold text-sm mb-2">
            Map with all parking location
          </h2>
          <div className="relative w-full rounded-2xl overflow-hidden shadow-md" style={{ height: 160 }}>
            <button
              onClick={() => navigate(`/direction/${parkingSpots[0].id}`)}
              className="w-full h-full block text-left"
              aria-label="Open interactive map"
            >
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&q=80"
                alt="Map showing nearby parking locations"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, rgba(3,27,50,0.1), rgba(3,27,50,0.45))',
                }}
              />
            </button>

            {/* Floating SOS button */}
            <button
              onClick={() => navigate('/sos')}
              aria-label="SOS emergency assistance"
              className="absolute flex items-center justify-center rounded-full text-white font-bold shadow-xl transition active:scale-95"
              style={{
                right: 12,
                bottom: 12,
                width: 46,
                height: 46,
                background: 'var(--color-bad)',
                zIndex: 10,
              }}
            >
              <span className="flex flex-col items-center leading-none">
                <IconSOS />
                <span className="text-[8px] mt-0.5 tracking-wider">SOS</span>
              </span>
            </button>
          </div>
        </div>

        {/* ── Help For Parking (Screen 79) ── */}
        <div className="px-4 mt-4">
          <h2 className="text-white font-display font-semibold text-sm mb-2">📞 Help For Parking</h2>
          <div className="flex flex-col gap-2">
            <div
              className="flex items-center justify-between rounded-2xl px-4 py-2.5 border border-white/10"
              style={{ background: 'var(--color-panel)' }}
            >
              <span className="text-white text-xs font-medium">Office</span>
              <a
                href="tel:8741265980"
                className="flex items-center gap-1 rounded-lg bg-white text-[11px] font-bold px-3 py-1.5 transition active:scale-95"
                style={{ color: 'var(--color-navy-900)' }}
              >
                📞 CALL
              </a>
            </div>
            <div
              className="flex items-center justify-between rounded-2xl px-4 py-2.5 border border-white/10"
              style={{ background: 'var(--color-panel)' }}
            >
              <span className="text-white text-xs font-medium">Security Guards</span>
              <a
                href="tel:9876543210"
                className="flex items-center gap-1 rounded-lg bg-white text-[11px] font-bold px-3 py-1.5 transition active:scale-95"
                style={{ color: 'var(--color-navy-900)' }}
              >
                📞 CALL
              </a>
            </div>
          </div>
        </div>

        {/* ── Vehicle Selector Toggle ── */}
        <div className="px-4 mt-4 flex items-center justify-between">
          <h2 className="text-white font-display font-semibold text-base">Nearby Parking</h2>
          <div
            className="flex items-center rounded-xl p-1 border border-white/10"
            style={{ background: 'var(--color-panel)' }}
          >
            <button
              type="button"
              onClick={() => setVehicleType('car')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                vehicleType === 'car' ? 'bg-white text-gray-900 shadow-sm' : 'text-white/70 hover:text-white'
              }`}
            >
              <IconCar className="w-3.5 h-3.5" />
              <span>Car</span>
            </button>
            <button
              type="button"
              onClick={() => setVehicleType('bike')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                vehicleType === 'bike' ? 'bg-white text-gray-900 shadow-sm' : 'text-white/70 hover:text-white'
              }`}
            >
              <IconBike className="w-3.5 h-3.5" />
              <span>Bike</span>
            </button>
          </div>
        </div>

        {/* Parking Spot Cards */}
        <div className="px-4 mt-2.5 flex flex-col gap-3">
          {parkingSpots.map((spot) => (
            <ParkingCard key={spot.id} spot={spot} />
          ))}
        </div>
      </div>

      <BottomNav active="home" />
    </PhoneShell>
  );
}
