import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';

const ROWS = [
  { key: 'edit', label: 'Edit Profile', path: '/profile/edit', icon: '👤' },
  { key: 'vehicle', label: 'My Vehicle', path: '/profile/vehicle', icon: '🚗' },
  { key: 'history', label: 'Booking History', path: '/history', icon: '🕒' },
  { key: 'language', label: 'Language', path: '/language', icon: '🌐' },
  { key: 'notifications', label: 'Notifications', path: '/notifications', icon: '🔔' },
  { key: 'help', label: 'Help & Support', path: '/help', icon: '💬' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, setIsAuthed } = useApp();

  const handleLogout = () => {
    setIsAuthed(false);
    navigate('/login');
  };

  return (
    <PhoneShell>
      <div className="px-4 pt-6 pb-4 flex items-center gap-4">
        <div
          className="rounded-full flex items-center justify-center text-2xl shrink-0"
          style={{ width: 64, height: 64, background: 'var(--color-panel)' }}
        >
          🙂
        </div>
        <div className="min-w-0">
          <p className="text-white font-display font-bold text-lg truncate">{user.name}</p>
          <p className="text-white/60 text-sm truncate">+91 {user.phone}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-4 flex flex-col gap-2">
        {ROWS.map((r) => (
          <button
            key={r.key}
            onClick={() => navigate(r.path)}
            className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left"
            style={{ background: 'var(--color-panel)' }}
          >
            <span className="text-lg shrink-0">{r.icon}</span>
            <span className="flex-1 text-white text-sm font-medium">{r.label}</span>
            <span className="text-white/40">›</span>
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left mt-2"
          style={{ background: 'rgba(255,80,80,0.15)' }}
        >
          <span className="text-lg shrink-0">🚪</span>
          <span className="flex-1 text-sm font-medium" style={{ color: 'var(--color-bad)' }}>
            Log Out
          </span>
        </button>
      </div>

      <BottomNav active="profile" />
    </PhoneShell>
  );
}
