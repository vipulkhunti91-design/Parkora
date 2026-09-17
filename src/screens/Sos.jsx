import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { IconArrowLeft } from '../components/icons';

export default function Sos() {
  const navigate = useNavigate();

  return (
    <PhoneShell className="px-5 pt-12 pb-8 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex items-center justify-center rounded-2xl"
          style={{ width: 37, height: 37, background: 'var(--color-panel)' }}
        >
          <IconArrowLeft className="text-white" />
        </button>
        <h1 className="text-white font-display font-bold text-lg">Emergency & SOS</h1>
      </div>

      {/* Hero Badge */}
      <div className="flex flex-col items-center text-center mt-6">
        <div
          className="flex items-center justify-center rounded-full animate-pulse"
          style={{ width: 84, height: 84, background: 'rgba(255,80,80,0.18)' }}
        >
          <span style={{ fontSize: 38 }}>🆘</span>
        </div>
        <h2 className="font-display text-white text-xl font-bold mt-3">Immediate Assistance</h2>
        <p className="text-white/70 text-xs mt-1 max-w-[280px]">
          Choose the type of help you need right now.
        </p>
      </div>

      {/* Main Options: Call for Help & Parking Help */}
      <div className="flex flex-col gap-3 mt-6">
        {/* OPTION 1: Call for Help */}
        <div
          className="rounded-2xl p-4 flex flex-col gap-2 border border-red-500/30"
          style={{ background: 'rgba(255, 80, 80, 0.12)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{ background: 'var(--color-bad)', color: '#fff' }}
            >
              📞
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-bold text-sm">Call for Help</h3>
              <p className="text-white/70 text-[11px] leading-tight mt-0.5">
                Directly call emergency dispatch or facility manager for urgent help.
              </p>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <a
              href="tel:112"
              className="flex-1 rounded-xl py-2.5 text-center text-xs font-bold text-white transition active:scale-98"
              style={{ background: 'var(--color-bad)' }}
            >
              🚨 Emergency (112)
            </a>
            <a
              href="tel:8741265980"
              className="flex-1 rounded-xl py-2.5 text-center text-xs font-semibold bg-white transition active:scale-98"
              style={{ color: 'var(--color-navy-900)' }}
            >
              📞 Facility Manager
            </a>
          </div>
        </div>

        {/* OPTION 2: Parking Help */}
        <div
          className="rounded-2xl p-4 flex flex-col gap-2 border border-blue-400/20"
          style={{ background: 'var(--color-panel)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{ background: 'var(--color-blue-700)', color: '#fff' }}
            >
              🅿️
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-bold text-sm">Parking Help</h3>
              <p className="text-white/70 text-[11px] leading-tight mt-0.5">
                Support for parking-related problems, slot blockages, or gate assistance.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mt-2">
            <a
              href="tel:9876543210"
              className="flex items-center justify-between rounded-xl px-3 py-2 bg-white/10 hover:bg-white/15 text-white text-xs transition"
            >
              <span>👮 Contact Security Guard</span>
              <span className="font-semibold text-green-400">CALL →</span>
            </a>
            <a
              href="tel:8741265980"
              className="flex items-center justify-between rounded-xl px-3 py-2 bg-white/10 hover:bg-white/15 text-white text-xs transition"
            >
              <span>🏢 Parking Control Office</span>
              <span className="font-semibold text-green-400">CALL →</span>
            </a>
            <button
              type="button"
              onClick={() => navigate('/help')}
              className="flex items-center justify-between rounded-xl px-3 py-2 bg-white/5 hover:bg-white/10 text-white/80 text-xs transition text-left"
            >
              <span>❓ View FAQs & Parking Guides</span>
              <span>OPEN →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Cancel / Back */}
      <div className="mt-auto pt-6 flex flex-col gap-2">
        <button
          onClick={() => navigate(-1)}
          className="w-full rounded-2xl py-3 text-sm font-semibold text-white/80 hover:text-white border border-white/20 transition active:scale-98"
        >
          Return to App
        </button>
      </div>
    </PhoneShell>
  );
}
