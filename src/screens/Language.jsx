import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { IconArrowLeft } from '../components/icons';
import { languages } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function Language() {
  const navigate = useNavigate();
  const { language, setLanguage } = useApp();

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
        <h1 className="text-white font-display font-bold text-lg">Language</h1>
      </div>

      <div className="flex flex-col gap-2 mt-6">
        {languages.map((l) => {
          const active = language === l.code;
          return (
            <button
              key={l.code}
              onClick={() => setLanguage(l.code)}
              className="flex items-center justify-between rounded-2xl px-4 py-3.5"
              style={{ background: active ? '#fff' : 'var(--color-panel)' }}
            >
              <span className="text-sm font-medium" style={{ color: active ? 'var(--color-navy-900)' : '#fff' }}>
                {l.label}
              </span>
              {active && <span style={{ color: 'var(--color-navy-900)' }}>✓</span>}
            </button>
          );
        })}
      </div>
    </PhoneShell>
  );
}
