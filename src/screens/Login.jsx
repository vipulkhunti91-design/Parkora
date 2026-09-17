import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { PrimaryButton, TextField } from '../components/Button';
import { IconGoogle, IconApple, IconTwitter } from '../components/icons';
import { useApp } from '../context/AppContext';
import { signInWithGoogle } from '../utils/googleAuth';

export default function Login() {
  const navigate = useNavigate();
  const { login, loginWithGoogle, setIsAuthed, rememberMe, setRememberMe } = useApp();
  const [phone, setPhone] = useState('9876543210');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!phone.trim() || !password) {
      setError('Enter your phone number/email and password to continue.');
      return;
    }
    setError('');
    setSubmitting(true);

    const res = login(phone, password);
    if (!res.success) {
      setError(res.message || 'Invalid credentials. Please try again.');
      setSubmitting(false);
      return;
    }

    navigate('/home', { replace: true });
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      const googleUser = await signInWithGoogle();
      if (googleUser) {
        loginWithGoogle(googleUser);
        navigate('/home', { replace: true });
      }
    } catch (err) {
      console.error('Google Sign In Error:', err);
      setError(err.message || 'Google sign-in was cancelled or failed.');
    } finally {
      setGoogleLoading(false);
    }
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
        Welcome back
      </h1>
      <p className="text-white/70 text-sm mt-2 mb-8">Log in to continue booking parking with PARK ORAA.</p>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <TextField
          label="Phone number or Email"
          type="text"
          placeholder="Enter phone number or email"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-[13px] text-red-300 -mt-1">{error}</p>}

        <div className="flex items-center justify-between text-xs text-white/80 -mt-1">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-white"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="font-semibold text-white">
            Forgot password?
          </Link>
        </div>

        <PrimaryButton type="submit" disabled={submitting || googleLoading} className="mt-2">
          {submitting ? 'Logging in…' : 'Log In'}
        </PrimaryButton>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-white/20" />
        <span className="text-white/60 text-xs">or continue with</span>
        <div className="h-px flex-1 bg-white/20" />
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white transition active:scale-95 disabled:opacity-50"
          aria-label="Continue with Google"
        >
          <IconGoogle className="text-black" />
        </button>

        <button
          type="button"
          onClick={() => {
            setIsAuthed(true);
            navigate('/home', { replace: true });
          }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white transition active:scale-95"
          aria-label="Continue with Apple"
        >
          <IconApple className="text-black" />
        </button>

        <button
          type="button"
          onClick={() => {
            setIsAuthed(true);
            navigate('/home', { replace: true });
          }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white transition active:scale-95"
          aria-label="Continue with Twitter"
        >
          <IconTwitter className="text-black" />
        </button>
      </div>

      <p className="text-center text-white/70 text-sm mt-8">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="text-white font-semibold brand-underline">
          Sign up
        </Link>
      </p>
    </PhoneShell>
  );
}
