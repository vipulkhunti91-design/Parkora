// Wraps every screen in the app-shell (mobile frame that centers on desktop).
// bg=true -> brand navy/blue gradient (default, matches most screens).
// bg=false -> solid white (matches success/error/feedback screens in Figma).
export default function PhoneShell({ children, className = '', bg = true, style, ...rest }) {
  return (
    <div
      className={`min-h-dvh flex flex-col relative overflow-x-hidden mx-auto ${className}`}
      style={{
        maxWidth: 430,
        boxShadow: '0 0 60px rgba(0,0,0,0.5)',
        background: bg
          ? 'linear-gradient(180deg, var(--color-navy-950) 8%, var(--color-blue-700) 92%)'
          : '#ffffff',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
