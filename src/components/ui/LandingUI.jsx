import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const ROLES = [
  'Full Stack Developer',
  'Cybersecurity Enthusiast',
  'ECE Engineer',
  'Cloud Explorer',
  'Team Leader',
];

/* ─────────────────────────────────────────────
   TYPED TEXT COMPONENT
───────────────────────────────────────────── */
function TypedText({ texts }) {
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;
    const text = texts[current];
    let timeout;

    if (!isDeleting && displayed.length < text.length) {
      timeout = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), 70);
    } else if (!isDeleting && displayed.length === text.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(text.slice(0, displayed.length - 1)), 35);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setCurrent((c) => (c + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, current, texts]);

  return (
    <span style={{ color: 'var(--neon-blue, #00d4ff)', fontWeight: 600, textShadow: '0 0 8px rgba(0,212,255,0.3)' }}>
      {displayed}
      <span className="typing-cursor" style={{
        marginLeft: '4px',
        paddingLeft: '2px',
        borderLeft: '2px solid var(--neon-blue, #00d4ff)',
        animation: 'blink-cursor 0.75s infinite steps(2)',
      }} />
    </span>
  );
}

/* ─────────────────────────────────────────────
   DECORATIVE HEX GRID
───────────────────────────────────────────── */
function HexGrid() {
  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundImage: `
        radial-gradient(circle at 25% 30%, rgba(0,212,255,0.04) 0%, transparent 60%),
        radial-gradient(circle at 80% 70%, rgba(180,79,255,0.04) 0%, transparent 60%)
      `,
      pointerEvents: 'none',
    }} />
  );
}

/* ─────────────────────────────────────────────
   MAIN UI LAYER
───────────────────────────────────────────── */
export default function LandingUI({ onLaunch, onResume, onContact }) {
  const containerRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const buttonsRef = useRef();
  const statsRef = useRef();
  const telemetryRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();

    const buttonElements = buttonsRef.current ? gsap.utils.toArray(buttonsRef.current.children) : [];
    const statElements = statsRef.current ? gsap.utils.toArray(statsRef.current.children) : [];

    tl.fromTo(titleRef.current,
      { opacity: 0, y: -30, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power4.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6'
    )
    .fromTo(buttonElements,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'back.out(1.1)' }, '-=0.3'
    )
    .fromTo(statElements,
      { opacity: 0, scale: 0.85, filter: 'blur(4px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5, stagger: 0.08, ease: 'back.out(1.4)' }, '-=0.4'
    )
    .fromTo(telemetryRef.current,
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }, '-=0.5'
    );
  }, []);

  const stats = [
    { label: 'Projects', value: '15+' },
    { label: 'Hackathons', value: '8' },
    { label: 'CTFs', value: '12' },
    { label: 'GPA', value: '8.7' },
  ];

  return (
    <div ref={containerRef} style={{
      position: 'absolute', inset: 0,
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none',
      zIndex: 10,
    }}>
      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @media (max-width: 990px) {
          .system-status-panel { display: none !important; }
          .bottom-status-bar { font-size: 8px !important; width: 90% !important; text-align: center; }
        }
      `}</style>

      <HexGrid />

      {/* Left Interface Content Panel */}
      <div style={{
        marginLeft: 'clamp(24px, 7vw, 90px)',
        /* 💡 TUNED WIDTH: Frames the avatar on the left instead of overlapping him */
        maxWidth: '460px', 
        pointerEvents: 'all',
        display: 'flex',
        flexDirection: 'column',
      }}>
        
        {/* 💡 RELOCATED TELEMETRY HUD: Now sits neatly above the headline on the left side */}
        <div ref={telemetryRef} className="system-status-panel" style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '10px',
          letterSpacing: '1px',
          color: 'rgba(0,212,255,0.45)',
          lineHeight: 1.8,
          marginBottom: '30px',
          borderLeft: '2px solid rgba(0,212,255,0.2)',
          paddingLeft: '14px'
        }}>
          <div>SYS.STATUS: <span style={{ color: 'var(--neon-green, #39ff14)', textShadow: '0 0 8px rgba(57,255,20,0.4)' }}>ONLINE</span></div>
          <div>LOCATION: INDIA • ECE DEPT</div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
            {['REACT', 'NODE', 'AWS', 'CYBER'].map((t, i) => (
              <span key={i} style={{
                padding: '1px 6px',
                border: '1px solid rgba(0,212,255,0.15)',
                borderRadius: '3px',
                background: 'rgba(0,212,255,0.02)',
                color: 'rgba(0,212,255,0.5)',
                fontSize: '8px'
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Subtitle Mission Badge */}
        <div style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '11px',
          color: 'var(--neon-blue, #00d4ff)',
          letterSpacing: '4px',
          marginBottom: '18px',
          opacity: 0.85,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <span style={{ display: 'inline-block', width: '30px', height: '1px', background: 'var(--neon-blue, #00d4ff)' }} />
          MISSION BRIEFING: PORTFOLIO v2.0
        </div>

        {/* Cinematic Header Text Block */}
        <div ref={titleRef} style={{ opacity: 0 }}>
          <h1 style={{
            fontFamily: 'var(--font-display, sans-serif)',
            fontSize: 'clamp(42px, 5.5vw, 68px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-1.5px',
            marginBottom: '4px',
            color: '#ffffff'
          }}>
            GAURAV
          </h1>
          <h1 style={{
            fontFamily: 'var(--font-display, sans-serif)',
            fontSize: 'clamp(42px, 5.5vw, 68px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-1.5px',
            marginBottom: '24px',
            WebkitTextStroke: '1.5px rgba(0,212,255,0.8)',
            color: 'transparent',
            textShadow: '0 0 20px rgba(0,212,255,0.15)'
          }}>
            KUMAR
          </h1>
        </div>

        {/* Typed Dynamic Status String Indicator */}
        <div ref={subtitleRef} style={{
          fontFamily: 'var(--font-body, sans-serif)',
          fontSize: 'clamp(15px, 1.6vw, 19px)',
          marginBottom: '36px',
          opacity: 0,
          minHeight: '30px',
        }}>
          <TypedText texts={ROLES} />
        </div>

        {/* Core Operational Statistics Matrix */}
        <div ref={statsRef} style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '44px',
          flexWrap: 'wrap',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: '12px 16px',
              background: 'rgba(0,212,255,0.03)',
              border: '1px solid rgba(0,212,255,0.14)',
              borderRadius: '8px',
              textAlign: 'center',
              backdropFilter: 'blur(4px)',
              flex: '1 1 80px',
              minWidth: '80px',
              opacity: 0,
              boxShadow: 'inset 0 0 10px rgba(0,212,255,0.01)'
            }}>
              <div style={{
                fontFamily: 'var(--font-display, sans-serif)',
                fontSize: '22px',
                color: 'var(--neon-blue, #00d4ff)',
                fontWeight: 800,
                textShadow: '0 0 12px rgba(0,212,255,0.5)',
              }}>{s.value}</div>
              <div style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '9px',
                letterSpacing: '1px',
                color: 'rgba(255,255,255,0.45)',
                marginTop: '4px',
                textTransform: 'uppercase'
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Action Controls Matrix */}
        <div ref={buttonsRef} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <button
            onClick={onLaunch}
            style={{
              fontFamily: 'var(--font-display, sans-serif)',
              fontSize: '13px',
              letterSpacing: '3px',
              padding: '18px 36px',
              background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(180,79,255,0.15))',
              border: '1px solid rgba(0,212,255,0.5)',
              borderRadius: '6px',
              color: '#ffffff',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              opacity: 0,
              fontWeight: 700,
              transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
              width: 'fit-content',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.35), rgba(180,79,255,0.3))';
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.9)';
              e.currentTarget.style.boxShadow = '0 0 35px rgba(0,212,255,0.45), inset 0 0 15px rgba(0,212,255,0.2)';
              e.currentTarget.style.transform = 'translateX(6px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(180,79,255,0.15))';
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <span style={{ marginRight: '12px' }}>🚀</span>
            LAUNCH JOURNEY
          </button>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={onResume}
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                letterSpacing: '2px',
                padding: '12px 26px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '4px',
                color: 'rgba(255,255,255,0.65)',
                cursor: 'pointer',
                opacity: 0,
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
              }}
            >
              📄 RESUME
            </button>
            <button
              onClick={onContact}
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                letterSpacing: '2px',
                padding: '12px 26px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '4px',
                color: 'rgba(255,255,255,0.65)',
                cursor: 'pointer',
                opacity: 0,
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(180,79,255,0.6)';
                e.currentTarget.style.color = 'var(--neon-purple, #b44fff)';
                e.currentTarget.style.background = 'rgba(180,79,255,0.08)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(180,79,255,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              📡 CONTACT
            </button>
          </div>
        </div>

        {/* Links */}
        <div style={{
          marginTop: '44px',
          display: 'flex',
          gap: '20px',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '10px',
          letterSpacing: '2px',
          color: 'rgba(255,255,255,0.3)',
        }}>
          {['GITHUB', 'LINKEDIN', 'EMAIL'].map((s, i) => (
            <a key={i} href="#" style={{
              color: 'rgba(255,255,255,0.3)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--neon-blue, #00d4ff)';
              e.currentTarget.style.textShadow = '0 0 8px rgba(0,212,255,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.textShadow = 'none';
            }}
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Global Frame Status Ticker */}
      <div className="bottom-status-bar" style={{
        position: 'absolute',
        bottom: '22px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '10px',
        letterSpacing: '3px',
        color: 'rgba(255,255,255,0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        whiteSpace: 'nowrap'
      }}>
        <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
        CLICK LAUNCH TO BEGIN YOUR JOURNEY
        <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
      </div>
    </div>
  );
}