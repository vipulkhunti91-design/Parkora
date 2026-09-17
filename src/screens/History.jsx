import { useMemo, useState } from 'react';
import PhoneShell from '../components/PhoneShell';
import BottomNav from '../components/BottomNav';
import { historyItems as seedHistory } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { IconHistory, IconRupee } from '../components/icons';

const FILTERS = ['All', 'Last 7 Days', 'Last mon'];

export default function History() {
  const { history } = useApp();
  const [filter, setFilter] = useState('All');
  const items = useMemo(() => [...history, ...seedHistory], [history]);

  const filtered = filter === 'All' ? items : items.filter((i) => i.filter === filter);

  return (
    <PhoneShell>
      <div className="px-4 pt-6 pb-2">
        <h1 className="text-white font-display font-bold text-lg">Booking History</h1>
      </div>

      <div className="flex gap-2 px-4 pb-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="rounded-full px-3.5 py-1.5 text-xs font-medium"
            style={{ background: filter === f ? '#fff' : 'var(--color-panel)', color: filter === f ? 'var(--color-navy-900)' : '#fff' }}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 px-8">
          <IconHistory style={{ width: 40, height: 40 }} className="text-white/50" />
          <p className="text-white font-medium">No bookings yet</p>
          <p className="text-white/60 text-sm">Your completed bookings will show up here.</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-4 flex flex-col gap-2 mt-2">
          {filtered.map((h) => (
            <div key={h.id} className="rounded-2xl px-4 py-3.5" style={{ background: 'var(--color-panel)' }}>
              <div className="flex items-center justify-between">
                <p className="text-white text-sm font-semibold truncate pr-2">{h.spotName}</p>
                <span className="flex items-center text-white text-sm font-semibold shrink-0">
                  <IconRupee />
                  {h.pay.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1.5 text-xs text-white/60">
                <span>{h.date} · {h.time}</span>
                <span>Slot {h.slot}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomNav active="history" />
    </PhoneShell>
  );
}
