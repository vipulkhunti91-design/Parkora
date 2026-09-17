import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { IconCheck, IconClose } from '../components/icons';
import { PrimaryButton, OutlineButton } from '../components/Button';
import { useApp } from '../context/AppContext';

// Success/failure confirmation, driven by the `success` prop (see App routes).
export default function PaymentResult({ success }) {
  const navigate = useNavigate();
  const { booking, setBooking } = useApp();

  return (
    <PhoneShell bg={false} className="items-center justify-center px-8 text-center">
      {success ? (
        <>
          <IconCheck style={{ width: 84, height: 84, color: 'var(--color-good)' }} />
          <h1 className="font-display font-bold text-xl mt-4" style={{ color: 'var(--color-navy-900)' }}>
            Payment Successful
          </h1>
          <p className="text-[#606060] text-sm mt-2">
            Your slot at {booking?.spot?.name || 'the parking spot'} is confirmed.
            {booking ? ` ₹${booking.total} paid.` : ''}
          </p>
        </>
      ) : (
        <>
          <IconClose style={{ width: 84, height: 84, color: 'var(--color-bad)' }} />
          <h1 className="font-display font-bold text-xl mt-4" style={{ color: 'var(--color-navy-900)' }}>
            Payment Failed
          </h1>
          <p className="text-[#606060] text-sm mt-2">
            We couldn&apos;t process your payment. Please check your details and try again.
          </p>
        </>
      )}

      <div className="w-full mt-10 flex flex-col gap-3">
        {success ? (
          <PrimaryButton
            style={{ background: 'var(--color-navy-900)', color: '#fff' }}
            onClick={() => {
              setBooking(null);
              navigate('/history');
            }}
          >
            View Booking
          </PrimaryButton>
        ) : (
          <PrimaryButton style={{ background: 'var(--color-navy-900)', color: '#fff' }} onClick={() => navigate('/payment')}>
            Try Again
          </PrimaryButton>
        )}
        <OutlineButton style={{ color: 'var(--color-navy-900)', borderColor: 'var(--color-navy-900)' }} onClick={() => navigate('/home')}>
          Back to Home
        </OutlineButton>
      </div>
    </PhoneShell>
  );
}
