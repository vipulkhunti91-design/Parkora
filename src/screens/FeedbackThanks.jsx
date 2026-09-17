import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { PrimaryButton } from '../components/Button';
import { useApp } from '../context/AppContext';

export default function FeedbackThanks() {
  const navigate = useNavigate();
  const { booking } = useApp();
  const spotName = booking?.spot?.name || 'MK Car Parking';

  return (
    <PhoneShell bg={false} className="items-center justify-center px-8 text-center">
      {/* Tree / plant illustration */}
      <div className="flex items-center justify-center mb-4">
        <span style={{ fontSize: 72 }}>🌳</span>
      </div>

      <h2 className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>
        Thank Screen
      </h2>

      <h1 className="font-display font-bold text-xl mt-3" style={{ color: 'var(--color-navy-900)' }}>
        {spotName}
      </h1>

      <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
        Thank you for helping us improve parking experience.
      </p>
      <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
        We'll use your feedback to make parking easier for you.
      </p>

      <div className="w-full mt-10">
        <PrimaryButton
          style={{ background: 'var(--color-navy-900)', color: '#fff' }}
          onClick={() => navigate('/home')}
        >
          Continue
        </PrimaryButton>
      </div>
    </PhoneShell>
  );
}
