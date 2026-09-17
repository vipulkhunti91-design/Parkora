import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { PrimaryButton, TextField } from '../components/Button';
import { IconGoogle, IconApple, IconTwitter } from '../components/icons';
import { useApp } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, loginWithGoogle, loginWithApple, loginWithTwitter, skipAsGuest, rememberMe, setRememberMe } = useApp();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      setError('Please enter your email and password to continue.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      await login(identifier, password);
      navigate('/home', { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      // Clean up common Firebase error codes into user-friendly messages
      let msg = err.message || 'Login failed. Please check your credentials.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        msg = 'Invalid email or password. Please verify your credentials.';
      } else if (err.code === 'auth/invalid-email') {
        msg = 'Please enter a valid email address.';
      } else if (err.code === 'auth/too-many-requests') {
        msg = 'Too many attempts. Please wait a few moments and try again.';
      }
      setError(msg);
      setSubmitting(false);
    }
  };

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
      console.error(`${provider} OAuth error:`, err);
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
        Welcome back
      </h1>
      <p className="text-white/70 text-sm mt-2 mb-8">Log in to continue booking parking with PARK ORAA.</p>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <TextField
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-xs leading-relaxed -mt-1">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-white/80 -mt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-white"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="font-semibold text-white hover:underline">
            Forgot password?
          </Link>
        </div>

        <PrimaryButton type="submit" disabled={submitting || oauthLoading} className="mt-2">
          {submitting ? 'Logging in…' : 'Log In'}
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

      <p className="text-center text-white/70 text-sm mt-8">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="text-white font-semibold brand-underline">
          Sign up
        </Link>
      </p>
    </PhoneShell>
  );
}
