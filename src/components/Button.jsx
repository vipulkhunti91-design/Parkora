export function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button
      className={`w-full rounded-2xl py-3.5 font-semibold text-[15px] bg-white disabled:opacity-50 transition-transform active:scale-[0.98] ${className}`}
      style={{ color: 'var(--color-navy-900)' }}
      {...props}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, className = '', ...props }) {
  return (
    <button
      className={`w-full rounded-2xl py-3.5 font-semibold text-[15px] text-white border border-white/40 disabled:opacity-50 transition-transform active:scale-[0.98] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Alias — some screens refer to the outlined variant as OutlineButton.
export const OutlineButton = GhostButton;

export function TextField({ label, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="block text-white/80 text-xs mb-1.5">{label}</span>}
      <input
        className={`w-full rounded-2xl px-4 py-3 text-white text-sm placeholder-white/50 outline-none focus:ring-2 focus:ring-white/60 ${className}`}
        style={{ background: 'var(--color-panel)' }}
        {...props}
      />
    </label>
  );
}
