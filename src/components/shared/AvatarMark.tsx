// A deliberately abstract, geometric "developer" avatar mark — not a photograph.
// Built from layered polygons + a code-bracket motif so it reads as a crafted
// part of the visual identity rather than a generic placeholder icon.
export function AvatarMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Abstract geometric avatar representing Roni Paul"
    >
      <defs>
        <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="none" stroke="var(--border-c)" strokeWidth="1.5" />
      <polygon points="60,14 100,38 100,86 60,110 20,86 20,38" fill="url(#avatarGrad)" opacity="0.14" />
      <polygon
        points="60,14 100,38 100,86 60,110 20,86 20,38"
        fill="none"
        stroke="url(#avatarGrad)"
        strokeWidth="1.5"
      />
      {/* Code bracket motif standing in for a face */}
      <path
        d="M46 46 L34 60 L46 74"
        fill="none"
        stroke="var(--fg)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M74 46 L86 60 L74 74"
        fill="none"
        stroke="var(--fg)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="60" cy="60" r="4.5" fill="var(--accent)" />
    </svg>
  );
}
