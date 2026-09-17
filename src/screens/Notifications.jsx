import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import BottomNav from '../components/BottomNav';
import { IconArrowLeft, IconBell } from '../components/icons';
import { notifications } from '../data/mockData';

export default function Notifications() {
  const navigate = useNavigate();

  const allNotifications = [
    ...notifications,
    {
      id: 'n_4',
      kind: 'alert',
      title: 'Near by Parking Alerts',
      body: 'Get Alerts When Parking is Available Near You',
    },
    {
      id: 'n_5',
      kind: 'feedback',
      title: 'Feedback Submitted',
      body: 'Thank You For Sharing Your Thoughts',
    },
  ];

  return (
    <PhoneShell className="px-4 pt-4 pb-0 flex flex-col">
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex items-center justify-center rounded-2xl shrink-0"
          style={{ width: 37, height: 37, background: 'var(--color-panel)' }}
        >
          <IconArrowLeft className="text-white" />
        </button>
        <h1 className="text-white font-display font-bold text-lg">Notification</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar mt-4 pb-4 flex flex-col gap-2.5">
        {allNotifications.map((n) => (
          <div
            key={n.id}
            className="flex gap-3 rounded-2xl px-4 py-3.5"
            style={{ background: 'var(--color-panel)' }}
          >
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

      <BottomNav active="home" />
    </PhoneShell>
  );
}
