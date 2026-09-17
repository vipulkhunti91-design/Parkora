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

  // Active parking ticket data matching Figma reference
  const tickets = [
    {
      id: 'P:123',
      title: 'Free Public Parking, Sola,',
      subtitle: 'Ahmedabad, Gujarat 380060',
      time: '12.3 KM / Ti: 21 min',
      rating: '5.2K',
    },
    {
      id: 'P:124',
      title: 'MK Car Parking, Sola,',
      subtitle: 'Ahmedabad, Gujarat 382115',
      time: '56 M / Ti: 1 min',
      rating: '4.8K',
    },
  ];

  const ticket = tickets[ticketIdx];

  return (
    <PhoneShell className="flex flex-col">
      {/* Top Search Bar with Bell Notification matching Figma */}
      <TopBar
        onBack={null}
        onSearchFocus={() => navigate('/search')}
        onBell={() => navigate('/notifications')}
      />

      {/* Main Scrollable Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-4">
        {/* ── 1. Parking Ticket Section ── */}
        <h2 className="text-white font-display font-bold text-center text-sm mt-2 mb-2 tracking-wide">
          Parking ticket
        </h2>

        {/* Ticket Card */}
        <div
          className="rounded-2xl p-3 border border-white/10"
          style={{
            background: 'var(--color-panel)',
            boxShadow: '0px 4px 14px 0px rgba(0,0,0,0.25)',
          }}
        >
          <div className="flex items-start gap-3">
            {/* Square QR Code */}
            <div className="shrink-0 w-20 h-20 rounded-xl bg-white p-1.5 flex items-center justify-center overflow-hidden shadow-sm">
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
                <rect x="40" y="80" width="5" height="5" fill="#000" />
                <rect x="70" y="85" width="5" height="5" fill="#000" />
              </svg>
            </div>

            {/* Ticket Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1">
                <div className="min-w-0 flex-1">
                  <p className="text-white text-[11px] font-bold leading-tight truncate">{ticket.title}</p>
                  <p className="text-white/80 text-[10px] leading-tight truncate">{ticket.subtitle}</p>
                </div>
                <span className="shrink-0 text-white font-bold text-xs">
                  {ticket.id}
                </span>
              </div>

              {/* Direction Button */}
              <div className="mt-1.5">
                <button
                  type="button"
                  onClick={() => navigate(`/direction/${parkingSpots[0].id}`)}
                  className="rounded-lg bg-white text-[11px] font-bold px-3 py-1 shadow-sm transition active:scale-95"
                  style={{ color: 'var(--color-navy-900)' }}
                >
                  Direction
                </button>
              </div>

              {/* Time & Rating */}
              <div className="flex items-center justify-between text-[10px] text-white/80 mt-1.5 pt-0.5">
                <span>{ticket.time}</span>
                <span className="font-medium">Rating: <span className="text-yellow-400">★</span> {ticket.rating}</span>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {tickets.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setTicketIdx(i)}
                className={`rounded-full transition-all ${
                  i === ticketIdx ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30'
                }`}
                aria-label={`Ticket ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── 2. Map Section ── */}
        <h2 className="text-white font-display font-bold text-center text-sm mt-4 mb-2 tracking-wide">
          Map with all parking location
        </h2>

        <div className="relative w-full rounded-2xl overflow-hidden shadow-md" style={{ height: 165 }}>
          <button
            type="button"
            onClick={() => navigate(`/direction/${parkingSpots[0].id}`)}
            className="w-full h-full block relative text-left select-none cursor-pointer"
            aria-label="Open interactive map"
          >
            {/* High-fidelity city street map matching Figma Screen 79 */}
            <svg viewBox="0 0 360 165" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              {/* Land base */}
              <rect width="360" height="165" fill="#f4f1ea" />

              {/* Green zones / Parks */}
              <path d="M 0,0 L 90,0 L 75,45 L 30,55 L 0,35 Z" fill="#dbeef0" opacity="0.7" />
              <path d="M 120,0 L 220,0 L 210,32 L 140,28 Z" fill="#e2f0d9" />
              <path d="M 0,110 L 60,95 L 85,135 L 0,165 Z" fill="#e0ebd9" />
              <path d="M 260,90 L 360,85 L 360,165 L 240,165 Z" fill="#d9ebd0" />

              {/* Highways */}
              <path d="M -10,65 Q 160,50 370,80" fill="none" stroke="#fbdba6" strokeWidth="8" />
              <path d="M 230,-10 L 210,175" fill="none" stroke="#fbdba6" strokeWidth="7" />

              {/* City Secondary Roads */}
              <path d="M -10,35 L 370,40" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
              <path d="M -10,115 L 370,110" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
              <path d="M 85,-10 L 105,175" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
              <path d="M 155,-10 L 145,175" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
              <path d="M 290,-10 L 295,175" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />

              {/* Local Streets */}
              <path d="M 20,35 L 45,115 M 105,40 L 150,75 L 145,112 M 215,65 L 290,60" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <path d="M 190,110 L 240,165 M 310,40 L 360,65" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

              {/* Parking Pins Matching Figma */}
              <g transform="translate(68, 38)">
                <circle cx="0" cy="0" r="8" fill="#ffffff" stroke="#1d4ed8" strokeWidth="2" filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.2))" />
                <text x="0" y="3" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontWeight="bold" fontFamily="sans-serif">P</text>
                <text x="11" y="3" fill="#334155" fontSize="6.5" fontWeight="600" fontFamily="sans-serif">Science City</text>
              </g>

              <g transform="translate(175, 48)">
                <circle cx="0" cy="0" r="9.5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.3))" />
                <text x="0" y="3.5" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">P</text>
                <rect x="-2" y="13" width="56" height="12" rx="3" fill="#1e293b" opacity="0.85" />
                <text x="26" y="21.5" textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="bold" fontFamily="sans-serif">Sola P:123</text>
              </g>

              <g transform="translate(118, 92)">
                <circle cx="0" cy="0" r="8" fill="#ffffff" stroke="#1d4ed8" strokeWidth="2" filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.2))" />
                <text x="0" y="3" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontWeight="bold" fontFamily="sans-serif">P</text>
                <text x="11" y="3" fill="#334155" fontSize="6.5" fontWeight="600" fontFamily="sans-serif">MK Parking</text>
              </g>

              <g transform="translate(235, 125)">
                <circle cx="0" cy="0" r="8" fill="#ffffff" stroke="#1d4ed8" strokeWidth="2" filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.2))" />
                <text x="0" y="3" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontWeight="bold" fontFamily="sans-serif">P</text>
                <text x="11" y="3" fill="#334155" fontSize="6.5" fontWeight="600" fontFamily="sans-serif">AMC Parking</text>
              </g>

              <g transform="translate(305, 52)">
                <circle cx="0" cy="0" r="8" fill="#ffffff" stroke="#1d4ed8" strokeWidth="2" filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.2))" />
                <text x="0" y="3" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontWeight="bold" fontFamily="sans-serif">P</text>
                <text x="-4" y="13" textAnchor="end" fill="#334155" fontSize="6.5" fontWeight="600" fontFamily="sans-serif">Atal Bridge</text>
              </g>
            </svg>
          </button>

          {/* Floating SOS Button */}
          <button
            type="button"
            onClick={() => navigate('/sos')}
            aria-label="SOS emergency assistance"
            className="absolute flex items-center justify-center rounded-full text-white font-bold shadow-xl transition active:scale-95"
            style={{
              right: 10,
              bottom: 10,
              width: 44,
              height: 44,
              background: 'var(--color-bad)',
              zIndex: 10,
            }}
          >
            <span className="flex flex-col items-center leading-none">
              <IconSOS className="w-4 h-4" />
              <span className="text-[7.5px] mt-0.5 font-black tracking-wider">SOS</span>
            </span>
          </button>
        </div>

        {/* ── 3. Nearby Parking Section Header & Vehicle Selector ── */}
        <div className="flex items-center justify-between mt-5 mb-2.5">
          <h2 className="text-white font-display font-bold text-sm tracking-wide">
            Nearby Parking
          </h2>

          {/* Vehicle Selector (Car / Bike) */}
          <div
            className="flex items-center rounded-xl p-1 border border-white/15"
            style={{ background: 'var(--color-panel)' }}
          >
            <button
              type="button"
              onClick={() => setVehicleType('car')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                vehicleType === 'car'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <IconCar className="w-3.5 h-3.5" />
              <span>Car</span>
            </button>
            <button
              type="button"
              onClick={() => setVehicleType('bike')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                vehicleType === 'bike'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <IconBike className="w-3.5 h-3.5" />
              <span>Bike</span>
            </button>
          </div>
        </div>

        {/* ── 4. Parking Spot Cards List matching Figma ── */}
        <div className="flex flex-col gap-3">
          {parkingSpots.map((spot) => (
            <ParkingCard key={spot.id} spot={spot} />
          ))}
        </div>
      </div>

      {/* Bottom Navigation matching Figma */}
      <BottomNav active="home" />
    </PhoneShell>
  );
}
