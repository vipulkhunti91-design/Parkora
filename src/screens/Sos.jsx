import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { IconArrowLeft } from '../components/icons';
import { PrimaryButton } from '../components/Button';

export default function Sos() {
  const navigate = useNavigate();

  return (
    <PhoneShell className="px-6 pt-14 pb-8 items-center text-center">
      <button
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="self-start flex items-center justify-center rounded-2xl"
        style={{ width: 37, height: 37, background: 'var(--color-panel)' }}
      >
        <IconArrowLeft className="text-white" />
      </button>

      <div
        className="flex items-center justify-center rounded-full mt-10"
        style={{ width: 100, height: 100, background: 'rgba(255,80,80,0.15)' }}
      >
        <span style={{ fontSize: 40 }}>🆘</span>
      </div>
      <h1 className="font-display text-white text-xl font-bold mt-5">Emergency Assistance</h1>
      <p className="text-white/60 text-sm mt-2 max-w-[260px]">
        Alert the nearest parking security guard or call for help right away.
      </p>

      <div className="w-full mt-auto pt-10 flex flex-col gap-3">
        <PrimaryButton style={{ background: 'var(--color-bad)', color: '#fff' }}>Call Security Guard</PrimaryButton>
        <button onClick={() => navigate(-1)} className="text-white/70 text-sm">
          Cancel
        </button>
      </div>
    </PhoneShell>
  );
}
