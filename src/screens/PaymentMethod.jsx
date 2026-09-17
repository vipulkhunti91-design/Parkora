import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import BottomNav from '../components/BottomNav';
import { IconArrowLeft, IconGoogle } from '../components/icons';
import { PrimaryButton } from '../components/Button';
import { useApp } from '../context/AppContext';

export default function PaymentMethod() {
  const navigate = useNavigate();
  const { booking, setHistory } = useApp();
  const [selected, setSelected] = useState('gpay');

  useEffect(() => {
    if (!booking) navigate('/home', { replace: true });
  }, [booking, navigate]);

  if (!booking) return null;

  const handlePay = () => {
    // 90% success rate for smooth user demo flow
    const success = Math.random() > 0.1;
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
    navigate(
      `/loading?next=${success ? '/payment/success' : '/payment/failed'}&status=${success ? 'success' : 'error'}&message=${success ? 'Payment successful' : 'Payment failed'}`
    );
  };

  const methods = [
    {
      id: 'gpay',
      label: 'Google Pay',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
          <IconGoogle />
        </div>
      ),
    },
    {
      id: 'phonepe',
      label: 'Phone Pe',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-[#5f259f] flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm">
          पे
        </div>
      ),
    },
    {
      id: 'paytm',
      label: 'Pay tm',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-[#00b9f1] flex items-center justify-center text-white text-[10px] font-black shrink-0 shadow-sm">
          Pay
        </div>
      ),
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
        <h1 className="text-white font-display font-bold text-lg">Payment</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Booking Summary Card */}
        <div className="rounded-2xl px-4 py-3 mt-4" style={{ background: 'var(--color-panel)' }}>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/80 font-medium">{booking.spot.name}</span>
            <span className="text-white font-bold text-base">₹{booking.total}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-white/60 mt-1">
            <span>{booking.timeIn} · {booking.duration} hr{booking.duration > 1 ? 's' : ''}</span>
            <span className="capitalize">{booking.vehicleType}</span>
          </div>
        </div>

        {/* Payment Methods Section matching Screen 29 */}
        <h2 className="text-white font-display font-bold text-base mt-6">Which Way Used For Pay</h2>
        <p className="text-white/60 text-xs mt-1 mb-3">Choose the pay method you&apos;d like to use</p>

        <div className="flex flex-col gap-2.5">
          {methods.map((m) => {
            const active = selected === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelected(m.id)}
                className="flex items-center justify-between rounded-2xl px-4 py-3 transition active:scale-[0.99]"
                style={{
                  background: active ? '#ffffff' : 'var(--color-panel)',
                }}
              >
                <div className="flex items-center gap-3">
                  {m.icon}
                  <span
                    className="text-sm font-semibold"
                    style={{ color: active ? 'var(--color-navy-900)' : '#ffffff' }}
                  >
                    {m.label}
                  </span>
                </div>
                <span
                  className="rounded-full border flex items-center justify-center"
                  style={{
                    width: 20,
                    height: 20,
                    borderColor: active ? 'var(--color-navy-900)' : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {active && (
                    <span
                      className="rounded-full"
                      style={{ width: 10, height: 10, background: 'var(--color-navy-900)' }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div className="pt-6 pb-4 shrink-0">
          <PrimaryButton onClick={handlePay}>Continue</PrimaryButton>
        </div>
      </div>

      <BottomNav active="booking" />
    </PhoneShell>
  );
}
