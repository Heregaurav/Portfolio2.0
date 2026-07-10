import { COLORS } from './theme';

/**
 * Fixed, full-viewport dotted starfield. Pure CSS (no canvas) — cheap
 * enough to sit behind every scroll section without hurting scroll perf.
 * position: fixed on purpose: distant stars should feel stationary while
 * the foreground content scrolls past them, same parallax logic as real
 * space rather than a background that scrolls 1:1 with the page.
 */
export default function StarfieldBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: COLORS.bg,
        overflow: 'hidden',
      }}
    >
      {/* layer 1 — dense, tiny, dim stars */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(1px 1px at 8% 12%, rgba(255,255,255,0.55) 0%, transparent 100%),
            radial-gradient(1px 1px at 22% 64%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 38% 28%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 54% 82%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 68% 14%, rgba(255,255,255,0.45) 0%, transparent 100%),
            radial-gradient(1px 1px at 81% 58%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 92% 36%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 15% 90%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 47% 6%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 73% 92%, rgba(255,255,255,0.35) 0%, transparent 100%)
          `,
          backgroundSize: '260px 260px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* layer 2 — sparser, slightly larger stars, offset tile for depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 18% 40%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 44% 70%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 63% 22%, rgba(255,255,255,0.55) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 86% 78%, rgba(255,255,255,0.45) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 96% 12%, rgba(255,255,255,0.5) 0%, transparent 100%)
          `,
          backgroundSize: '420px 420px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* layer 3 — a few brighter stars that gently twinkle */}
      <div
        className="starfield-twinkle"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(2px 2px at 30% 20%, rgba(0,212,255,0.7) 0%, transparent 100%),
            radial-gradient(2px 2px at 70% 55%, rgba(255,255,255,0.75) 0%, transparent 100%),
            radial-gradient(2px 2px at 12% 75%, rgba(180,79,255,0.6) 0%, transparent 100%),
            radial-gradient(2px 2px at 88% 30%, rgba(255,255,255,0.7) 0%, transparent 100%)
          `,
          backgroundSize: '600px 600px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* faint signal-color glow, same language as the hero's hex-grid backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 25% 15%, rgba(0,212,255,0.05) 0%, transparent 55%),
            radial-gradient(ellipse at 78% 85%, rgba(180,79,255,0.04) 0%, transparent 55%)
          `,
        }}
      />

      <style>{`
        @keyframes starfield-twinkle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .starfield-twinkle {
          animation: starfield-twinkle 4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .starfield-twinkle { animation: none; }
        }
      `}</style>
    </div>
  );
}
