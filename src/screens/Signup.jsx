import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { PrimaryButton, TextField } from '../components/Button';
import { useApp } from '../context/AppContext';

export default function Signup() {
  const navigate = useNavigate();
  const { setIsAuthed } = useApp();
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', confirm: '' });
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.password) {
      setError('Fill in your name, phone number and password to continue.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (!agree) {
      setError('Please accept the Terms & Privacy Policy to continue.');
      return;
    }
    setError('');
    navigate('/loading?next=/otp&mode=signup');
  };

  return (
    <PhoneShell className="px-6 pt-10 pb-8 overflow-y-auto no-scrollbar">
      {/* Skip button */}
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={() => { setIsAuthed(true); navigate('/home', { replace: true }); }}
          className="text-white/80 text-sm font-semibold px-4 py-1.5 rounded-full border border-white/30 hover:bg-white/10 transition"
        >
          Skip →
        </button>
      </div>

      <h1 className="text-white font-bold text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
        Create your account
      </h1>
      <p className="text-white/70 text-sm mt-2 mb-6">It only takes a minute to start booking parking.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <TextField label="Full name" placeholder="Enter full name" value={form.name} onChange={update('name')} />
        <TextField
          label="Phone number"
          type="tel"
          inputMode="numeric"
          placeholder="Enter phone number"
          value={form.phone}
          onChange={update('phone')}
        />
        <TextField label="Email (optional)" type="email" placeholder="Enter email" value={form.email} onChange={update('email')} />
        <TextField label="Password" type="password" placeholder="Create password" value={form.password} onChange={update('password')} />
        <TextField
          label="Confirm password"
          type="password"
          placeholder="Re-enter password"
          value={form.confirm}
          onChange={update('confirm')}
        />

        {error && <p className="text-[13px] text-red-300">{error}</p>}

        <label className="flex items-start gap-2 text-xs text-white/80 mt-1">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="accent-white mt-0.5" />
          I agree to the Terms of Service and Privacy Policy
        </label>

        <PrimaryButton type="submit" className="mt-2">
          Sign Up
        </PrimaryButton>
      </form>

      <p className="text-center text-white/70 text-sm mt-8">
        Already have an account?{' '}
        <Link to="/login" className="text-white font-semibold brand-underline">
          Log in
        </Link>
      </p>
    </PhoneShell>
  );
}
