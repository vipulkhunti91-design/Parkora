import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { PrimaryButton, TextField } from '../components/Button';
import { IconGoogle, IconApple, IconTwitter } from '../components/icons';
import { useApp } from '../context/AppContext';

export default function Signup() {
  const navigate = useNavigate();
  const { register, loginWithGoogle, loginWithApple, loginWithTwitter, skipAsGuest } = useApp();
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', confirm: '' });
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleOAuth = async (provider) => {
    setError('');
    setOauthLoading(true);
    try {
      if (provider === 'google') {
        await loginWithGoogle();
      } else if (provider === 'apple') {
        await loginWithApple();
      } else if (provider === 'twitter') {
        await loginWithTwitter();
      }
      navigate('/home', { replace: true });
    } catch (err) {
      console.error(`${provider} sign-in error:`, err);
      let msg = err.message || `${provider} sign-in was cancelled or failed.`;
      if (err.code === 'auth/popup-closed-by-user') {
        msg = 'Sign-in popup was closed before completing.';
      } else if (err.code === 'auth/popup-blocked') {
        msg = 'Sign-in popup was blocked by your browser. Please allow popups for this site.';
      } else if (err.code === 'auth/unauthorized-domain') {
        msg = 'This domain is not authorized in Firebase. Please add it to Authorized Domains in the Firebase Console.';
      } else if (err.code === 'auth/operation-not-allowed') {
        msg = `${provider} sign-in is not enabled in Firebase Console. Please enable it under Authentication > Sign-in method.`;
      } else if (err.code === 'auth/cancelled-popup-request') {
        msg = 'Only one sign-in window can be open at a time.';
      }
      setError(msg);
    } finally {
      setOauthLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.password) {
      setError('Please fill in all required fields to continue.');
      return;
    }
    if (!form.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
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
    setSubmitting(true);

    try {
      // Register with Firebase authentication
      await register(form);
      // Navigate to OTP verification step as required
      navigate('/otp', { state: { phone: form.phone, name: form.name } });
    } catch (err) {
      console.error('Registration error:', err);
      let msg = err.message || 'Could not complete registration. Please try again.';
      if (err.code === 'auth/email-already-in-use') {
        msg = 'This email is already registered. Please log in instead.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password is too weak. Use at least 6 letters and numbers.';
      }
      setError(msg);
      setSubmitting(false);
    }
  };

  return (
    <PhoneShell className="px-6 pt-10 pb-8 overflow-y-auto no-scrollbar">
      {/* Skip button — takes user directly to Home as a guest */}
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={() => {
            skipAsGuest();
            navigate('/home', { replace: true });
          }}
          className="text-white/80 text-sm font-semibold px-4 py-1.5 rounded-full border border-white/30 hover:bg-white/10 transition active:scale-95"
        >
          Skip →
        </button>
      </div>

      <h1 className="text-white font-bold text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
        Create your account
      </h1>
      <p className="text-white/70 text-sm mt-2 mb-6">It only takes a minute to start booking parking.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <TextField
          label="Full name"
          placeholder="Enter full name"
          value={form.name}
          onChange={update('name')}
        />
        <TextField
          label="Phone number"
          type="tel"
          inputMode="numeric"
          placeholder="Enter phone number"
          value={form.phone}
          onChange={update('phone')}
        />
        <TextField
          label="Email address"
          type="email"
          placeholder="Enter email address"
          value={form.email}
          onChange={update('email')}
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Create password"
          value={form.password}
          onChange={update('password')}
        />
        <TextField
          label="Confirm password"
          type="password"
          placeholder="Re-enter password"
          value={form.confirm}
          onChange={update('confirm')}
        />

        {error && (
          <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-xs leading-relaxed">
            {error}
          </div>
        )}

        <label className="flex items-start gap-2 text-xs text-white/80 mt-1 cursor-pointer">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="accent-white mt-0.5"
          />
          I agree to the Terms of Service and Privacy Policy
        </label>

        <PrimaryButton type="submit" disabled={submitting || oauthLoading} className="mt-2">
          {submitting ? 'Creating account…' : 'Sign Up'}
        </PrimaryButton>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-white/20" />
        <span className="text-white/60 text-xs">or continue with</span>
        <div className="h-px flex-1 bg-white/20" />
      </div>

      <div className="flex items-center justify-center gap-4">
        {/* Google OAuth */}
        <button
          type="button"
          onClick={() => handleOAuth('google')}
          disabled={oauthLoading || submitting}
          className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white transition active:scale-95 disabled:opacity-50"
          aria-label="Continue with Google"
        >
          <IconGoogle className="text-black" />
        </button>

        {/* Apple OAuth */}
        <button
          type="button"
          onClick={() => handleOAuth('apple')}
          disabled={oauthLoading || submitting}
          className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white transition active:scale-95 disabled:opacity-50"
          aria-label="Continue with Apple"
        >
          <IconApple className="text-black" />
        </button>

        {/* Twitter / X OAuth */}
        <button
          type="button"
          onClick={() => handleOAuth('twitter')}
          disabled={oauthLoading || submitting}
          className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white transition active:scale-95 disabled:opacity-50"
          aria-label="Continue with Twitter"
        >
          <IconTwitter className="text-black" />
        </button>
      </div>

      <p className="text-center text-white/70 text-sm mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-white font-semibold brand-underline">
          Log in
        </Link>
      </p>
    </PhoneShell>
  );
}
