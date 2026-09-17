import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import BottomNav from '../components/BottomNav';
import { PrimaryButton } from '../components/Button';
import { useApp } from '../context/AppContext';

export default function FeedbackThanks() {
  const navigate = useNavigate();
  const { booking } = useApp();
  const spotName = booking?.spot?.name || 'MK Car Parking';

  return (
    <PhoneShell className="flex flex-col justify-between pt-16 pb-0">
      <div className="text-center px-4">
        <h1 className="text-white font-display font-semibold text-lg">Thank Screen</h1>
      </div>

      {/* Central Feedback Thank You Card matching Screen 56 */}
      <div className="px-6 my-auto">
        <div
          className="rounded-3xl p-6 text-center shadow-xl border border-white/10"
          style={{ background: 'var(--color-panel)' }}
        >
          <h2 className="text-white font-display font-bold text-lg">{spotName}</h2>
          <p className="text-white/80 text-xs mt-3 leading-relaxed">
            Thank you for helping us improve parking experience
          </p>
          <p className="text-white/60 text-xs mt-2 leading-relaxed">
            We&apos;ll use your feedback to make parking easier for you.
          </p>

          <div className="mt-8">
            <PrimaryButton onClick={() => navigate('/home')}>Continue</PrimaryButton>
          </div>
        </div>
      </div>

      <BottomNav active="home" />
    </PhoneShell>
  );
}
