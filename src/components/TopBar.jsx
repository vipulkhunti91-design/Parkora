import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconSearch, IconBell } from './icons';

// Search + back + notification bell header exactly matching Figma Home design
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
    <div className="flex items-center gap-3 px-4 pt-3 pb-2 shrink-0">
      {onBack !== null && onBack !== undefined && (
        <button
          type="button"
          onClick={onBack || (() => navigate(-1))}
          aria-label="Go back"
          className="flex items-center justify-center rounded-2xl shrink-0 transition active:scale-95"
          style={{ width: 40, height: 40, background: 'var(--color-panel)' }}
        >
          <IconArrowLeft className="text-white" />
        </button>
      )}

      {showSearch && (
        <button
          type="button"
          onClick={onSearchFocus}
          className="flex-1 flex items-center gap-2.5 rounded-2xl px-4 text-left border border-white/20 transition hover:border-white/40 active:scale-[0.99]"
          style={{ height: 42, background: 'var(--color-panel)' }}
        >
          <IconSearch className="text-white/70 shrink-0 w-4 h-4" />
          <span className="flex-1 text-sm text-white/60 truncate font-medium">
            {searchValue || placeholder}
          </span>
        </button>
      )}

      <button
        type="button"
        onClick={onBell || (() => navigate('/notifications'))}
        aria-label="Notifications"
        className="flex items-center justify-center rounded-2xl shrink-0 border border-white/20 transition active:scale-95"
        style={{ width: 42, height: 42, background: 'var(--color-panel)' }}
      >
        <IconBell className="text-white w-4 h-4" />
      </button>
    </div>
  );
}
