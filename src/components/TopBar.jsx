import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconSearch, IconBell } from './icons';

// Search + back + notification bell header used on Home / Details / etc.
export default function TopBar({
  onBack,
  showSearch = true,
  searchValue = '',
  onSearchFocus,
  placeholder = 'Search',
  onBell,
}) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3 px-4 pt-4 pb-2">
      {onBack !== null && (
        <button
          onClick={onBack || (() => navigate(-1))}
          aria-label="Go back"
          className="flex items-center justify-center rounded-2xl shrink-0"
          style={{ width: 37, height: 37, background: 'var(--color-panel)' }}
        >
          <IconArrowLeft className="text-white" />
        </button>
      )}
      {showSearch && (
        <button
          onClick={onSearchFocus}
          className="flex-1 flex items-center gap-2 rounded-2xl px-4 text-left"
          style={{ height: 42, background: 'var(--color-panel)' }}
        >
          <span className="flex-1 text-sm text-white/70 truncate">{searchValue || placeholder}</span>
          <IconSearch className="text-white/80 shrink-0" />
        </button>
      )}
      <button
        onClick={onBell}
        aria-label="Notifications"
        className="flex items-center justify-center rounded-full shrink-0"
        style={{ width: 37, height: 37, background: 'var(--color-panel)' }}
      >
        <IconBell className="text-white" />
      </button>
    </div>
  );
}
