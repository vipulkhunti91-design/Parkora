import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { PrimaryButton } from '../components/Button';

export default function Onboarding() {
  const navigate = useNavigate();
  return (
    <PhoneShell bg={false} className="relative flex flex-col p-0 overflow-hidden" style={{ background: 'var(--color-navy-950)' }}>
      {/* Top Half: Logo Container */}
      <div className="flex-1 flex items-center justify-center relative z-10 pt-4">
        <div className="w-[140px] h-[140px] rounded-[32px] flex items-center shadow-2xl relative" style={{ background: '#2977DC' }}>
          {/* Rotated Text */}
          <div className="absolute left-[29px] bottom-[25px] origin-top-left -rotate-90">
            <span className="text-white font-display font-bold text-[11px] tracking-[0.25em] whitespace-nowrap">
              PARK ORAA
            </span>
          </div>
          {/* P Logo SVG */}
          <div className="absolute left-[56px] top-[30px]">
            <svg width="55" height="80" viewBox="0 0 55 80">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="
                  M 0 0
                  L 32 0
                  C 55 0, 55 45, 32 45
                  L 16 45
                  L 16 64
                  L 0 80
                  Z
                  M 16 16
                  L 16 29
                  L 32 29
                  C 40 29, 40 16, 32 16
                  Z
                "
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Half: Panel */}
      <div
        className="w-full flex flex-col items-center px-8 pt-14 pb-12 relative z-20 mt-auto"
        style={{
          background: 'var(--color-blue-700)',
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          boxShadow: '0 -10px 40px rgba(0,0,0,0.15)'
        }}
      >
        <h1 className="text-white font-display font-bold text-[22px] tracking-wider mb-8">
          WELCOME
        </h1>
        
        <p className="text-white/90 text-[13px] text-center max-w-[220px] leading-relaxed mb-10">
          Find parking quickly and park without stress.
        </p>

        <PrimaryButton onClick={() => navigate('/signup')} className="mb-8">
          Get Started
        </PrimaryButton>

        <p className="text-white text-[13px] tracking-wide mt-2">
          Find • Book • Park
        </p>
      </div>
    </PhoneShell>
  );
}
