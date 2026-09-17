import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { IconArrowLeft } from '../components/icons';
import { PrimaryButton } from '../components/Button';
import { paymentMethods } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function PaymentMethod() {
  const navigate = useNavigate();
  const { booking, setHistory } = useApp();
  const [selected, setSelected] = useState('phonepe');

  useEffect(() => {
    if (!booking) navigate('/home', { replace: true });
  }, [booking, navigate]);

  if (!booking) return null;

  const handlePay = () => {
    // Randomised outcome kept deterministic-ish for demo: 85% success.
    const success = Math.random() > 0.15;
    if (success) {
      setHistory((h) => [
        {
          id: `h_${Date.now()}`,
          spotName: booking.spot.name,
          time: booking.timeIn,
          pay: Number(booking.total),
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          slot: 'A' + Math.floor(Math.random() * 20 + 1),
          filter: 'Last 7 Days',
        },
        ...h,
      ]);
    }
    navigate(`/loading?next=${success ? '/payment/success' : '/payment/failed'}&status=${success ? 'success' : 'error'}&message=${success ? 'Payment successful' : 'Payment failed'}`);
  };

  return (
    <PhoneShell className="px-4 pt-4 pb-6 flex flex-col">
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex items-center justify-center rounded-2xl shrink-0"
          style={{ width: 37, height: 37, background: 'var(--color-panel)' }}
        >
          <IconArrowLeft className="text-white" />
        </button>
        <h1 className="text-white font-display font-bold text-lg">Payment</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="rounded-2xl px-4 py-3 mt-5" style={{ background: 'var(--color-panel)' }}>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">{booking.spot.name}</span>
            <span className="text-white font-semibold">₹{booking.total}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-white/60 mt-1">
            <span>{booking.timeIn} · {booking.duration} hr{booking.duration > 1 ? 's' : ''}</span>
            <span className="capitalize">{booking.vehicleType}</span>
          </div>
        </div>

        <h2 className="text-white font-display font-bold text-lg mt-5">Which Way Used For Pay</h2>
        <p className="text-white/60 text-xs mt-1 mb-4">Choose the payment you'd like to use</p>
        <div className="flex flex-col gap-2">
          {paymentMethods.map((m) => {
            const active = selected === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelected(m.id)}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5"
                style={{ background: active ? '#fff' : 'var(--color-panel)' }}
              >
                <span className="text-sm font-medium" style={{ color: active ? 'var(--color-navy-900)' : '#fff' }}>
                  {m.label}
                </span>
                <span
                  className="rounded-full border flex items-center justify-center"
                  style={{
                    width: 18,
                    height: 18,
                    borderColor: active ? 'var(--color-navy-900)' : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {active && <span className="rounded-full" style={{ width: 10, height: 10, background: 'var(--color-navy-900)' }} />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-6 shrink-0">
        <PrimaryButton onClick={handlePay}>Continue</PrimaryButton>
      </div>
    </PhoneShell>
  );
}
