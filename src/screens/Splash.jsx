import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';

export default function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate('/onboarding'), 1600);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <PhoneShell className="items-center justify-center">
      <div className="flex flex-col items-center animate-[fadeIn_0.8s_ease]">
        <h1 className="text-white font-bold tracking-wide" style={{ fontFamily: 'var(--font-display)', fontSize: 32 }}>
          PARK <span className="brand-underline">ORAA</span>
        </h1>
        <p className="text-white/60 text-xs mt-2 tracking-[0.3em]">FIND. BOOK. PARK.</p>
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px);} to { opacity:1; transform: translateY(0);} }`}</style>
    </PhoneShell>
  );
}
