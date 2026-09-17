import { useNavigate } from 'react-router-dom';
import { IconPin, IconStar, IconRupee } from './icons';

// Parking spot card matching Figma Home reference
export default function ParkingCard({ spot, onDirection }) {
  const navigate = useNavigate();
  return (
    <div
      className="rounded-2xl p-3 flex gap-3 border border-white/10"
      style={{
        background: 'var(--color-panel)',
        boxShadow: '0px 4px 12px 0px rgba(0,0,0,0.25)',
      }}
    >
      <button
        type="button"
        onClick={() => navigate(`/details/${spot.id}`)}
        className="shrink-0 rounded-2xl overflow-hidden shadow-sm"
        style={{ width: 92, height: 96 }}
        aria-label={`View details for ${spot.name}`}
      >
        <img
          src={spot.photo}
          alt={spot.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </button>

      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex items-start justify-between gap-1">
            <button
              type="button"
              onClick={() => navigate(`/details/${spot.id}`)}
              className="text-left min-w-0 flex-1 truncate"
            >
              <p className="font-bold text-white text-xs leading-tight truncate">{spot.name}</p>
            </button>
            <span className="flex items-center gap-0.5 text-white text-[10px] shrink-0 font-medium">
              <IconStar className="text-yellow-400 w-3 h-3" />
              <span>{spot.reviews}</span>
            </span>
          </div>

          <div className="flex items-center justify-between mt-1 text-[11px]">
            <span className="text-white/80 font-medium flex items-center gap-1">
              <IconPin className="w-3 h-3 text-white/60 shrink-0" />
              <span>{spot.distance} / Time: {spot.time}</span>
            </span>
            <span className="flex items-center text-white font-bold text-xs">
              <IconRupee className="w-3 h-3" />
              <span>{spot.price.toFixed(2)}</span>
            </span>
          </div>

          <p className="flex items-start gap-1 text-white/70 text-[10px] mt-1 leading-snug">
            <span className="shrink-0 text-white/50">🏢</span>
            <span className="truncate">{spot.shortAddress}</span>
          </p>
        </div>

        <div className="flex gap-2 mt-2 pt-0.5">
          <button
            type="button"
            onClick={() => navigate(`/booking/${spot.id}`)}
            className="flex-1 rounded-xl bg-white text-[11px] font-bold py-1.5 shadow-sm transition active:scale-95"
            style={{ color: 'var(--color-navy-900)' }}
          >
            Booking
          </button>
          <button
            type="button"
            onClick={() => (onDirection ? onDirection(spot) : navigate(`/direction/${spot.id}`))}
            className="flex-1 rounded-xl bg-white text-[11px] font-bold py-1.5 shadow-sm transition active:scale-95"
            style={{ color: 'var(--color-navy-900)' }}
          >
            Direction
          </button>
        </div>
      </div>
    </div>
  );
}
