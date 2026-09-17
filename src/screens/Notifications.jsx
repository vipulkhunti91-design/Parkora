import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { IconArrowLeft, IconBell } from '../components/icons';
import { notifications } from '../data/mockData';

export default function Notifications() {
  const navigate = useNavigate();

  return (
    <PhoneShell className="px-4 pt-4 pb-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex items-center justify-center rounded-2xl shrink-0"
          style={{ width: 37, height: 37, background: 'var(--color-panel)' }}
        >
          <IconArrowLeft className="text-white" />
        </button>
        <h1 className="text-white font-display font-bold text-lg">Notifications</h1>
      </div>

      {notifications.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 px-8">
          <IconBell style={{ width: 40, height: 40 }} className="text-white/50" />
          <p className="text-white font-medium">No notifications yet</p>
          <p className="text-white/60 text-sm">We&apos;ll let you know when there&apos;s something new.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 mt-5">
          {notifications.map((n) => (
            <div key={n.id} className="flex gap-3 rounded-2xl px-4 py-3.5" style={{ background: 'var(--color-panel)' }}>
              <span
                className="flex items-center justify-center rounded-full shrink-0"
                style={{ width: 38, height: 38, background: 'rgba(255,255,255,0.15)' }}
              >
                <IconBell className="text-white" />
              </span>
              <div>
                <p className="text-white text-sm font-semibold">{n.title}</p>
                <p className="text-white/60 text-xs mt-0.5">{n.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </PhoneShell>
  );
}
