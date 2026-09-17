import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { PrimaryButton, GhostButton } from '../components/Button';
import { IconPin } from '../components/icons';

export default function Onboarding() {
  const navigate = useNavigate();
  return (
    <PhoneShell className="justify-between px-6 pb-10 pt-16">
      <div className="flex flex-col items-center text-center mt-10">
        <div
          className="w-40 h-40 rounded-full flex items-center justify-center mb-8"
          style={{ background: 'var(--color-panel)' }}
        >
          <IconPin className="text-white" width={64} height={64} />
        </div>
        <h1 className="text-white font-bold text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
          Find parking in seconds
        </h1>
        <p className="text-white/70 text-sm mt-3 max-w-[280px]">
          PARK ORAA shows nearby parking spots in real time, so you always know where to park.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <PrimaryButton onClick={() => navigate('/signup')}>Get Started</PrimaryButton>
        <GhostButton onClick={() => navigate('/login')}>I already have an account</GhostButton>
      </div>
    </PhoneShell>
  );
}
