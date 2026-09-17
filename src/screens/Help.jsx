import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { IconArrowLeft } from '../components/icons';

const FAQS = [
  { q: 'How do I book a parking spot?', a: 'Search or browse nearby parking, open a listing, choose a time and vehicle, then continue to payment.' },
  { q: 'Can I cancel a booking?', a: 'Cancellations aren\u2019t available in this preview — this would connect to a live booking service.' },
  { q: 'How do I contact a parking guard?', a: 'Use the SOS button on the Home screen to reach on-site security.' },
];

export default function Help() {
  const navigate = useNavigate();
  return (
    <PhoneShell className="px-4 pt-4 pb-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex items-center justify-center rounded-2xl shrink-0"
          style={{ width: 37, height: 37, background: 'var(--color-panel)' }}
        >
          <IconArrowLeft className="text-white" />
        </button>
        <h1 className="text-white font-display font-bold text-lg">Help &amp; Support</h1>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        {FAQS.map((f) => (
          <div key={f.q} className="rounded-2xl px-4 py-3.5" style={{ background: 'var(--color-panel)' }}>
            <p className="text-white text-sm font-semibold">{f.q}</p>
            <p className="text-white/70 text-xs mt-1.5 leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </PhoneShell>
  );
}
