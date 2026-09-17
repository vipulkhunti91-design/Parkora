import { useNavigate, useParams } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { parkingSpots } from '../data/mockData';

export default function Direction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const spot = parkingSpots.find((s) => s.id === id) || parkingSpots[0];

  return (
    <PhoneShell bg={false} className="relative bg-[#f4f6f9] text-[#111]">
      {/* Turn-by-turn Navigation Map Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stylized vector GPS navigation map */}
        <svg
          viewBox="0 0 430 932"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Map background blocks */}
          <rect width="430" height="932" fill="#eef1f5" />
          <path d="M 0,120 Q 150,140 280,100 T 430,90 L 430,0 L 0,0 Z" fill="#e4ebf3" />
          <path d="M 50,450 Q 180,480 320,440 T 430,470 L 430,600 L 0,600 Z" fill="#e7edf5" />
          
          {/* Secondary streets */}
          <path d="M -20,280 L 450,220" stroke="#ffffff" strokeWidth="14" strokeLinecap="round" />
          <path d="M -20,380 L 450,330" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" />
          <path d="M -20,520 L 450,560" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" />
          <path d="M -20,680 L 450,640" stroke="#ffffff" strokeWidth="14" strokeLinecap="round" />
          <path d="M 80,100 L 120,850" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" />
          <path d="M 310,80 L 290,850" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" />
          <path d="M 220,100 L 210,850" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />

          {/* Thin grid roads */}
          <path d="M 40,200 L 400,200 M 30,300 L 410,300 M 20,420 L 420,420 M 10,600 L 430,600 M 30,750 L 410,750" stroke="#e0e6ed" strokeWidth="4" />
          <path d="M 150,150 L 150,800 M 260,150 L 260,800 M 370,150 L 370,800" stroke="#e0e6ed" strokeWidth="4" />

          {/* Major Navigation Route Line (Blue/Purple) */}
          <path
            d="M 340,160 L 220,320 L 160,420 L 160,540 L 220,620 L 215,670 L 205,740"
            fill="none"
            stroke="#2f2cb8"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Route casing for contrast */}
          <path
            d="M 340,160 L 220,320 L 160,420 L 160,540 L 220,620 L 215,670 L 205,740"
            fill="none"
            stroke="#4147d5"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Alternate Route branches */}
          <path d="M 160,540 L 130,540 L 130,570" fill="none" stroke="#6871e8" strokeWidth="6" strokeLinecap="round" />
          <path d="M 220,620 L 260,620 L 260,650" fill="none" stroke="#6871e8" strokeWidth="6" strokeLinecap="round" />

          {/* Turn instruction arrows on road */}
          <g transform="translate(130, 540)">
            <rect x="-10" y="-10" width="20" height="20" rx="4" fill="#202494" />
            <path d="M 4,-4 L -4,-4 L -4,4 M -4,-4 L 4,4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          <g transform="translate(260, 620)">
            <rect x="-10" y="-10" width="20" height="20" rx="4" fill="#202494" />
            <path d="M -4,-4 L 4,-4 L 4,4 M 4,-4 L -4,4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* GPS Current Location Arrow */}
          <g transform="translate(205, 735) rotate(-25)">
            <circle cx="0" cy="0" r="22" fill="rgba(37, 99, 235, 0.2)" />
            <circle cx="0" cy="0" r="14" fill="#fff" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.2))" />
            <polygon points="0,-12 8,8 0,4 -8,8" fill="#1d4ed8" />
          </g>

          {/* Destination Marker */}
          <g transform="translate(340, 160)">
            <circle cx="0" cy="0" r="14" fill="#ef4444" />
            <text x="0" y="5" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">P</text>
          </g>
        </svg>
      </div>

      {/* Top Banner — Head East (Green Navigation Card) */}
      <div className="relative z-10 px-4 pt-12">
        <div className="rounded-2xl p-4 bg-[#0a5c36] text-white shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-3xl">⬆</span>
            <div>
              <h2 className="text-lg font-bold leading-tight">Head east</h2>
              <p className="text-xs text-white/80">on Drive toward {spot.name}</p>
            </div>
          </div>
          {/* Sub-turn thumbnail */}
          <div className="rounded-xl px-2.5 py-1.5 bg-[#074226] flex items-center gap-1.5 text-xs font-semibold">
            <span>Then</span>
            <span className="text-base">↰</span>
          </div>
        </div>
      </div>

      {/* Floating Right Controls (Compass, Search, Volume, Hazard) */}
      <div className="absolute right-4 top-44 z-10 flex flex-col gap-3">
        <button
          aria-label="Compass"
          className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-sm font-bold text-red-500"
        >
          🧭
        </button>
        <button
          onClick={() => navigate('/search')}
          aria-label="Search along route"
          className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700"
        >
          🔍
        </button>
        <button
          aria-label="Mute"
          className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700"
        >
          🔊
        </button>
        <button
          aria-label="Report"
          className="rounded-full px-3 py-1.5 bg-white shadow-md flex items-center gap-1 text-xs font-semibold text-gray-800"
        >
          <span>⚠️</span>
          <span>Report</span>
        </button>
      </div>

      {/* Speedometer Floating Pill on Lower Left */}
      <div className="absolute left-4 bottom-28 z-10">
        <div className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex flex-col items-center justify-center">
          <span className="text-sm font-bold text-gray-900 leading-none">0</span>
          <span className="text-[8px] text-gray-500 uppercase font-semibold">km/h</span>
        </div>
      </div>

      {/* Bottom Floating Navigation Status Card */}
      <div className="absolute left-4 right-4 bottom-6 z-10">
        <div className="rounded-3xl bg-white p-4 shadow-2xl flex items-center justify-between">
          {/* Close button */}
          <button
            onClick={() => navigate(-1)}
            aria-label="Exit navigation"
            className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center text-gray-700 text-lg font-bold"
          >
            ✕
          </button>

          {/* Time & Distance Details */}
          <div className="text-center">
            <p className="text-2xl font-bold text-[#16a34a] leading-tight">
              {spot.time || '22 min'}
            </p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {spot.distance || '13 km'} · 12:23 pm arrival
            </p>
          </div>

          {/* Route alternate button */}
          <button
            onClick={() => navigate('/search')}
            aria-label="Alternate routes"
            className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center text-gray-700 text-lg font-bold"
          >
            🔀
          </button>
        </div>
      </div>
    </PhoneShell>
  );
}
