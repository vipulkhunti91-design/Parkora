import { useNavigate, useLocation } from 'react-router-dom';
import { IconHome, IconBooking, IconHistory, IconProfile } from './icons';

const TABS = [
  { key: 'home', label: 'Home', path: '/home', Icon: IconHome },
  { key: 'booking', label: 'Booking', path: '/booking', Icon: IconBooking },
  { key: 'history', label: 'History', path: '/history', Icon: IconHistory },
  { key: 'profile', label: 'Profile', path: '/profile', Icon: IconProfile },
];

export default function BottomNav({ active }) {
  const navigate = useNavigate();
  const location = useLocation();
  const activeKey = active || TABS.find((t) => location.pathname.startsWith(t.path))?.key || 'home';

  return (
    <nav
      className="sticky bottom-0 left-0 right-0 z-30 shrink-0"
      style={{ background: 'var(--color-navbar)', boxShadow: '5px 8px 10px 0px rgba(255,255,255,0.1)' }}
      aria-label="Primary"
    >
      <div className="flex items-center justify-around py-3">
        {TABS.map(({ key, label, path, Icon }) => {
          const isActive = key === activeKey;
          return (
            <button
              key={key}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-1 px-2 py-1 text-white"
              aria-current={isActive ? 'page' : undefined}
            >
              <span
                className="flex items-center justify-center rounded-[13px] transition-colors"
                style={{
                  width: 46,
                  height: 38,
                  background: isActive ? 'var(--color-blue-700)' : 'transparent',
                }}
              >
                <Icon />
              </span>
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
