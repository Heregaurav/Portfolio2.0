// theme.js — shared design tokens for all scroll sections.
// Mirrors the CSS vars already used in LandingUI so the hero and the
// scroll sections read as one continuous system (dark / grayscale hull
// with a single cyan signal color, occasional green "online" pings and
// purple used only for secondary/hover accents).

export const COLORS = {
  bg: '#050607',          // near-black hull
  bgPanel: '#0a0c0e',     // slightly lifted panel bg
  line: 'rgba(255,255,255,0.08)',
  lineStrong: 'rgba(255,255,255,0.16)',
  textPrimary: '#f2f3f4',
  textDim: 'rgba(255,255,255,0.5)',
  textFaint: 'rgba(255,255,255,0.3)',
  neonBlue: 'var(--neon-blue, #00d4ff)',
  neonGreen: 'var(--neon-green, #39ff14)',
  neonPurple: 'var(--neon-purple, #b44fff)',
};

export const FONT = {
  display: 'var(--font-display, sans-serif)',
  body: 'var(--font-body, sans-serif)',
  mono: 'var(--font-mono, monospace)',
};

// Reusable style fragments so every section stays visually identical
// without copy-pasting raw numbers everywhere.
export const glassPanel = {
  background: 'rgba(255,255,255,0.02)',
  border: `1px solid ${COLORS.line}`,
  borderRadius: '10px',
  backdropFilter: 'blur(6px)',
};

export const eyebrowStyle = {
  fontFamily: FONT.mono,
  fontSize: '11px',
  letterSpacing: '4px',
  color: COLORS.neonBlue,
  opacity: 0.85,
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '18px',
  textTransform: 'uppercase',
};

export const sectionTitleStyle = {
  fontFamily: FONT.display,
  fontWeight: 900,
  fontSize: 'clamp(28px, 4vw, 42px)',
  letterSpacing: '-1px',
  color: COLORS.textPrimary,
  marginBottom: '10px',
  lineHeight: 1.05,
};
