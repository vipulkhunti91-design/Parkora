import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { PrimaryButton, TextField } from '../components/Button';
import { IconArrowLeft } from '../components/icons';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone) {
      setError('Enter the phone number linked to your account.');
      return;
    }
    setError('');
    navigate('/loading?next=/otp&mode=reset');
  };

  return (
    <PhoneShell className="px-6 pt-14 pb-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center rounded-2xl mb-8"
        style={{ width: 37, height: 37, background: 'var(--color-panel)' }}
      >
        <IconArrowLeft className="text-white" />
      </button>

      <h1 className="text-white font-bold text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
        Forgot password?
      </h1>
      <p className="text-white/70 text-sm mt-2 mb-8">
        Enter your registered phone number and we&apos;ll send you a code to reset it.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Phone number"
          type="tel"
          inputMode="numeric"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {error && <p className="text-[13px] text-red-300">{error}</p>}
        <PrimaryButton type="submit" className="mt-2">
          Send Code
        </PrimaryButton>
      </form>
    </PhoneShell>
  );
}
