import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { PrimaryButton } from '../components/Button';
import { useApp } from '../context/AppContext';

// Matches Figma "login 19" — 4-digit OTP verification screen.
export default function Otp() {
  const navigate = useNavigate();
  const { setIsAuthed } = useApp();
  const [digits, setDigits] = useState(['', '', '', '']);

  // Four stable refs — must NOT be constructed inside an array literal to satisfy Rules of Hooks.
  const ref0 = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const refs = [ref0, ref1, ref2, ref3];

  const onChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 3) refs[i + 1].current?.focus();
  };

  const onKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs[i - 1].current?.focus();
  };

  const complete = digits.every((d) => d !== '');

  const handleVerify = () => {
    setIsAuthed(true);
    navigate('/loading?next=/home&status=success&message=Verified', { replace: true });
  };

  return (
    <PhoneShell className="px-6 pt-14 pb-8 items-center text-center">
      <h1 className="font-display text-white text-2xl font-bold">Verify your number</h1>
      <p className="text-white/60 text-sm mt-2 max-w-[280px]">
        Enter the 4-digit code we sent to your phone number.
      </p>

      <div className="flex gap-3 mt-10">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={refs[i]}
            value={d}
            onChange={(e) => onChange(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            inputMode="numeric"
            maxLength={1}
            className="text-center text-white text-xl font-semibold rounded-2xl outline-none focus:ring-2 focus:ring-white/40"
            style={{ width: 52, height: 58, background: 'var(--color-panel)' }}
          />
        ))}
      </div>

      <button className="text-white/70 text-sm mt-6 brand-underline">Resend code</button>

      <div className="w-full mt-auto pt-10">
        <PrimaryButton disabled={!complete} onClick={handleVerify}>
          Verify
        </PrimaryButton>
      </div>
    </PhoneShell>
  );
}
