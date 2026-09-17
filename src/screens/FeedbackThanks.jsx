import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { IconCheck } from '../components/icons';
import { PrimaryButton } from '../components/Button';

export default function FeedbackThanks() {
  const navigate = useNavigate();
  return (
    <PhoneShell bg={false} className="items-center justify-center px-8 text-center">
      <IconCheck style={{ width: 72, height: 72, color: 'var(--color-good)' }} />
      <h1 className="font-display font-bold text-xl mt-4" style={{ color: 'var(--color-navy-900)' }}>
        Feedback Submitted
      </h1>
      <p className="text-[#606060] text-sm mt-2">Thank you for sharing your thoughts with us.</p>
      <div className="w-full mt-10">
        <PrimaryButton style={{ background: 'var(--color-navy-900)', color: '#fff' }} onClick={() => navigate('/home')}>
          Back to Home
        </PrimaryButton>
      </div>
    </PhoneShell>
  );
}
