import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * LaunchSequence
 * 
 * @param {Object} props
 * @param {function} props.onComplete - called after the whole sequence finishes
 * @param {function} [props.onPhaseChange] - optional callback to sync external animations:
 *        receives { phase, elapsed } at every tick
 */
export default function LaunchSequence({ onComplete, onPhaseChange }) {
  const [phase, setPhase] = useState('prelaunch'); // prelaunch | ignition | launch | warp
  const containerRef = useRef();
  const labelRef = useRef();

  useEffect(() => {
    const sequence = [
      { phase: 'prelaunch', delay: 600 },
      { phase: 'ignition', delay: 900 },
      { phase: 'launch', delay: 900 },
      { phase: 'warp', delay: 900 },
    ];

    const timeouts = [];
    let totalDelay = 0;

    sequence.forEach((entry, index) => {
      const timeout = window.setTimeout(() => {
        setPhase(entry.phase);
        if (onPhaseChange) onPhaseChange({ phase: entry.phase, elapsed: totalDelay });

        if (labelRef.current) {
          gsap.fromTo(
            labelRef.current,
            { scale: 1.2, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }
          );
        }

        if (index === sequence.length - 1) {
          window.setTimeout(onComplete, 900);
        }
      }, totalDelay);

      timeouts.push(timeout);
      totalDelay += entry.delay;
    });

    return () => timeouts.forEach((id) => window.clearTimeout(id));
  }, [onComplete, onPhaseChange]);

  // ── Data for each phase ──
  const messages = {
    prelaunch: ['HOLDING SHORT', 'SYSTEMS CHECKED', 'READY TO IGNITE'],
    ignition: ['IGNITION', 'FIRE SEQUENCE', 'ENGINES SPINNING'],
    launch: ['LIFT OFF', 'BREAKING ORBIT', 'ACCELERATING'],
    warp: ['WARP DRIVE', 'SPACEFOLD ENGAGED', 'NEXT DESTINATION'],
  };

  const colors = {
    prelaunch: 'var(--neon-blue)',
    ignition: 'var(--neon-orange)',
    launch: 'var(--neon-green)',
    warp: 'var(--neon-purple)',
  };

  const color = colors[phase];

  // ── Render ──
  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
        background:
          'radial-gradient(circle at center, rgba(0,0,20,0.85) 0%, rgba(0,0,0,0.96) 100%)',
        animation: phase === 'launch' ? 'launch-shake 0.08s infinite' : 'none',
      }}
    >
      {/* ⚪ Radar circles (better opacity and size) */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${i * 180}px`,
            height: `${i * 180}px`,
            border: `1px solid ${color}18`,
            borderRadius: '50%',
            animation: `rotate-slow ${3 + i * 1.5}s linear infinite`,
            opacity: 0.6,
          }}
        />
      ))}

      {/* ⭕ Progress arc – now a perfect ring indicator */}
      <svg width="240" height="240" style={{ position: 'absolute' }}>
        {/* Background ring */}
        <circle
          cx="120"
          cy="120"
          r="105"
          fill="none"
          stroke={`${color}22`}
          strokeWidth="3"
        />
        {/* Foreground progress ring – active only during prelaunch */}
        {phase === 'prelaunch' && (
          <circle
            cx="120"
            cy="120"
            r="105"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={`${2 * Math.PI * 105}`}
            strokeDashoffset={`${2 * Math.PI * 105 * 0.44}`}
            strokeLinecap="round"
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: '120px 120px',
              transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1), stroke 0.4s',
            }}
          />
        )}
        {/* Animated glow ring for ignition/launch */}
        {(phase === 'ignition' || phase === 'launch') && (
          <circle
            cx="120"
            cy="120"
            r="105"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="20 40"
            opacity={0.8}
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: '120px 120px',
              animation: 'dash-march 1s linear infinite',
            }}
          />
        )}
      </svg>

      {/* ⚡ Main display */}
      <div
        ref={labelRef}
        style={{
          fontFamily: 'var(--font-display), monospace',
          fontSize: 'clamp(48px, 8vw, 96px)',
          fontWeight: 900,
          color: color,
          textShadow: `0 0 30px ${color}, 0 0 60px ${color}66`,
          letterSpacing: '-2px',
          lineHeight: 1,
          transition: 'all 0.3s ease',
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        {phase === 'prelaunch'
          ? 'PRE-LAUNCH'
          : phase === 'ignition'
          ? 'IGNITION'
          : phase === 'launch'
          ? 'LIFT OFF'
          : 'WARP'}
      </div>

      {/* 📡 Status messages with staggered entrance */}
      <div
        style={{
          marginTop: '36px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {messages[phase].map((msg, i) => (
          <div
            key={`${phase}-${i}`}
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: i === 0 ? '14px' : '10px',
              letterSpacing: i === 0 ? '4px' : '3px',
              color: i === 0 ? color : `${color}aa`,
              opacity: 1,
              animation: `fadeIn 0.4s ease ${i * 0.1}s both`,
            }}
          >
            {msg}
          </div>
        ))}
      </div>

      {/* 📊 Bottom telemetry */}
      <div
        style={{
          position: 'absolute',
          bottom: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '48px',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '10px',
          letterSpacing: '2px',
          color: `${color}77`,
          whiteSpace: 'nowrap',
        }}
      >
        {[
          ['THRUST',
            phase === 'launch' || phase === 'warp'
              ? '100%'
              : phase === 'ignition'
              ? '72%'
              : '45%',
          ],
          ['FUEL', '98.4%'],
          ['TRAJECTORY', 'NOMINAL'],
        ].map(([label, val]) => (
          <div key={label}>
            {label}:{' '}
            <span style={{ color: color, fontWeight: 700 }}>{val}</span>
          </div>
        ))}
      </div>

      {/* 🔹 Subtle particle overlay (simulates floating dust / stars) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: color,
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
              animation: `float-up ${2 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* 🔍 Scan line – now a sleek moving bar */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(transparent, ${color}0a, transparent)`,
          height: '2px',
          width: '100%',
          animation: 'scan-line 4s linear infinite',
          pointerEvents: 'none',
        }}
      />

      {/* CSS animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes launch-shake {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(1px, -1px); }
          50% { transform: translate(-1px, 1px); }
          75% { transform: translate(0.5px, 0.5px); }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes dash-march {
          to { stroke-dashoffset: -100; }
        }
        @keyframes scan-line {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        @keyframes float-up {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}