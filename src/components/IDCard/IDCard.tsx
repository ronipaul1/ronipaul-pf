import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile, experience } from "../../data/profile";

// Deterministic pseudo-barcode bars derived from the name, so it's a stable
// decorative motif rather than random noise on every render.
const BARCODE_SEED = "RONI-PAUL-FRONTEND-DEV-2026";
const barWidths = BARCODE_SEED.split("").map((ch) => (ch.charCodeAt(0) % 3) + 1);

export function IDCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full max-w-[340px] mx-auto select-none" style={{ perspective: "1200px" }}>
      {/* Lanyard clip + cable */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-4 h-4 rounded-full surface border-2 border-accent" aria-hidden="true" />
        <svg width="2" height="34" aria-hidden="true">
          <line x1="1" y1="0" x2="1" y2="34" stroke="var(--border-c)" strokeWidth="2" />
        </svg>
        <div
          className="w-10 h-4 rounded-t-md rounded-b-sm surface border border-border relative -mt-0.5"
          aria-hidden="true"
        >
          <div className="absolute inset-x-2 top-1 h-1 rounded-full bg-accent/40" />
        </div>
      </div>

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setExpanded((v) => !v)}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        aria-label="Developer ID card. Activate to reveal additional metadata."
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setExpanded((v) => !v);
          }
        }}
        initial={{ opacity: 0, y: -16, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-[26px] surface-glass border border-border overflow-hidden cursor-pointer shadow-2xl -mt-1"
      >
        {/* Holographic sheen following the cursor */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx} ${gy}, rgba(var(--accent-rgb),0.25), rgba(var(--accent-2-rgb),0.12) 40%, transparent 70%)`
            ),
          }}
        />

        {/* Scan line */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-accent/10 to-transparent"
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
        />

        <div className="relative p-6 flex flex-col gap-5" style={{ transform: "translateZ(30px)" }}>
          {/* Top row: system label + status */}
          <div className="flex items-center justify-between">
            <span className="mono text-[10px] tracking-widest text-muted uppercase">Access ID // RP-2026</span>
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-2 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-2" />
              </span>
              <span className="mono text-[10px] tracking-widest text-accent-2 uppercase">Online</span>
            </span>
          </div>

          {/* Identity block */}
          <div className="grain-dots relative w-14 h-14 rounded-full border-2 border-accent shadow-[0_0_12px_rgba(var(--accent-rgb),0.2)] overflow-hidden flex items-center justify-center bg-accent-soft shrink-0">
            {!imageError && profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover rounded-full select-none"
                loading="eager"
                decoding="async"
              />
            ) : (
              <span className="section-heading text-lg text-accent select-none">{profile.initials}</span>
            )}
          </div>

          <div>
            <h3 className="section-heading text-2xl text-fg leading-tight">{profile.name}</h3>
            <p className="text-accent font-medium text-sm mt-1">{profile.role}</p>
            <p className="text-muted text-xs mt-0.5">{profile.specialty}</p>
          </div>

          <div className="h-px bg-border" />

          <dl className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
            <div>
              <dt className="mono text-muted uppercase tracking-wider text-[10px]">Location</dt>
              <dd className="text-fg mt-0.5">{profile.location}</dd>
            </div>
            <div>
              <dt className="mono text-muted uppercase tracking-wider text-[10px]">Status</dt>
              <dd className="text-accent-2 font-medium mt-0.5">● {profile.status}</dd>
            </div>
            <div className="col-span-2">
              <dt className="mono text-muted uppercase tracking-wider text-[10px]">Currently</dt>
              <dd className="text-fg mt-0.5">
                {experience.title} @ {experience.company}
              </dd>
            </div>
          </dl>

          {/* Expandable metadata */}
          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="h-px bg-border mb-3" />
            <p className="mono text-[10px] text-muted leading-relaxed">
              Focus: Frontend Dev · AI-assisted Dev · Vibe Coding
              <br />
              Education: BCA (Hons.), Brainware University
            </p>
          </motion.div>

          {/* Barcode footer */}
          <div className="flex items-end gap-[2px] h-8 mt-1" aria-hidden="true">
            {barWidths.map((w, i) => (
              <div
                key={i}
                className="bg-fg/70 dark:bg-fg/60"
                style={{ width: `${w}px`, height: `${18 + (i % 4) * 3}px` }}
              />
            ))}
          </div>
          <p className="text-center mono text-[9px] text-muted -mt-3 tracking-[0.2em]">
            {expanded ? "TAP TO COLLAPSE" : "TAP FOR MORE"}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
