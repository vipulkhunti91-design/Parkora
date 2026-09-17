import { useNavigate } from 'react-router-dom';
import { IconPin, IconStar, IconRupee } from './icons';

// The repeating parking-spot card used on Home, Search results and Details/Suggestion.
export default function ParkingCard({ spot, onDirection }) {
  const navigate = useNavigate();
  return (
    <div
      className="rounded-2xl p-3 flex gap-3"
      style={{ background: 'var(--color-panel)', boxShadow: '0px 4px 10.5px 0px rgba(255,255,255,0.2)' }}
    >
      <button
        onClick={() => navigate(`/details/${spot.id}`)}
        className="shrink-0 rounded-2xl overflow-hidden"
        style={{ width: 96, height: 100 }}
        aria-label={`View details for ${spot.name}`}
      >
        <img src={spot.photo} alt="" className="w-full h-full object-cover" loading="lazy" />
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <button onClick={() => navigate(`/details/${spot.id}`)} className="text-left min-w-0">
            <p className="font-bold text-white text-[13px] leading-tight truncate">{spot.name}</p>
          </button>
          <span className="flex items-center gap-1 text-white text-[10px] shrink-0">
            <IconStar className="text-yellow-400" />
            {spot.reviews}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <span className="text-white text-[12px]">
            {spot.distance} / Time: {spot.time}
          </span>
          <span className="flex items-center text-white text-[11px]">
            <IconRupee />
            {spot.price.toFixed(2)}
          </span>
        </div>

        <p className="flex items-start gap-1 text-white/90 text-[10px] mt-1 leading-snug">
          <IconPin className="shrink-0 mt-[1px]" />
          <span className="line-clamp-2">{spot.shortAddress}</span>
        </p>

        <div className="flex gap-2 mt-2">
          <button
            onClick={() => navigate(`/booking/${spot.id}`)}
            className="flex-1 rounded-[10px] bg-white text-[12px] font-medium py-1.5"
            style={{ color: 'var(--color-navy-900)' }}
          >
            Booking
          </button>
          <button
            onClick={() => (onDirection ? onDirection(spot) : navigate(`/direction/${spot.id}`))}
            className="flex-1 rounded-[10px] bg-white text-[12px] font-medium py-1.5"
            style={{ color: 'var(--color-navy-900)' }}
          >
            Direction
          </button>
        </div>
      </div>
    </div>
  );
}
