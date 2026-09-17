import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';

// Transient spinner between steps (Figma "Loading" frames). Reads:
//   next    - route to redirect to once done (required)
//   status  - 'success' | 'error' (defaults to 'success')
//   message - short status line shown under the spinner
//   mode    - optional context label (login/signup/reset/verify) — not shown, just semantic
export default function Loading() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next') || '/home';
  const status = params.get('status') || 'success';
  const message = params.get('message');

  useEffect(() => {
    const t = setTimeout(() => navigate(next, { replace: true }), 1100);
    return () => clearTimeout(t);
  }, [next, navigate]);

  return (
    <PhoneShell bg={false} className="items-center justify-center px-8 text-center">
      <div
        className="w-16 h-16 rounded-full border-4 animate-spin"
        style={{
          borderColor: status === 'error' ? 'rgba(255,80,80,0.2)' : 'rgba(18,84,149,0.15)',
          borderTopColor: status === 'error' ? 'var(--color-bad)' : 'var(--color-blue-700)',
        }}
      />
      <p className="mt-5 font-semibold" style={{ color: 'var(--color-navy-900)' }}>
        {message || 'Please wait…'}
      </p>
    </PhoneShell>
  );
}
