import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import BottomNav from '../components/BottomNav';
import { IconArrowLeft, IconSearch, IconBell, IconPin } from '../components/icons';
import ParkingCard from '../components/ParkingCard';
import { parkingSpots, recentSearches } from '../data/mockData';

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return parkingSpots.filter((s) => s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q));
  }, [query]);

  const showEmpty = query.trim() && results.length === 0;

  return (
    <PhoneShell className="flex flex-col">
      <div className="flex items-center gap-3 px-4 pt-4 pb-2 shrink-0">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex items-center justify-center rounded-2xl shrink-0"
          style={{ width: 37, height: 37, background: 'var(--color-panel)' }}
        >
          <IconArrowLeft className="text-white" />
        </button>
        <div className="flex-1 flex items-center gap-2 rounded-2xl px-4" style={{ height: 42, background: 'var(--color-panel)' }}>
          <IconSearch className="text-white/80 shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 bg-transparent outline-none text-white placeholder-white/50 text-sm"
          />
        </div>
        <button
          onClick={() => navigate('/notifications')}
          aria-label="Notifications"
          className="flex items-center justify-center rounded-full shrink-0"
          style={{ width: 37, height: 37, background: 'var(--color-panel)' }}
        >
          <IconBell className="text-white" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-4">
        {!query.trim() && (
          <div className="mt-4 rounded-3xl p-4 border border-white/10" style={{ background: 'var(--color-panel)' }}>
            <h2 className="text-white font-display text-sm font-semibold mb-3">Recent history</h2>
            <div className="flex flex-col gap-2">
              {recentSearches.map((r) => (
                <button
                  key={r}
                  onClick={() => setQuery(r)}
                  className="flex items-center gap-3 py-2 text-left text-white/90 text-sm transition hover:text-white"
                >
                  <IconPin className="text-white/60 shrink-0" />
                  <span className="truncate">{r}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {query.trim() && !showEmpty && (
          <div className="flex flex-col gap-3 mt-3">
            <p className="text-white/60 text-xs">{results.length} result{results.length !== 1 ? 's' : ''} found</p>
            {results.map((spot) => (
              <ParkingCard key={spot.id} spot={spot} />
            ))}
          </div>
        )}

        {showEmpty && (
          <div className="flex flex-col items-center text-center gap-2 mt-16">
            <div className="flex items-center justify-center rounded-full" style={{ width: 64, height: 64, background: 'var(--color-panel)' }}>
              <IconSearch className="text-white/70" style={{ width: 26, height: 26 }} />
            </div>
            <p className="text-white font-medium mt-2">No parking found</p>
            <p className="text-white/60 text-sm max-w-[240px]">
              We couldn&apos;t find any parking spot matching &quot;{query}&quot;. Try a different search.
            </p>
          </div>
        )}
      </div>

      <BottomNav active="booking" />
    </PhoneShell>
  );
}
