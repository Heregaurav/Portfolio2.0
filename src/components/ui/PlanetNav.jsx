import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const NAV_ITEMS = [
  { id: 0, label: 'WEB.DEV', icon: '⚡', color: '#00d4ff' },
  { id: 1, label: 'CYBER.SEC', icon: '🛡', color: '#00ff88' },
  { id: 2, label: 'CLOUD.AWS', icon: '☁', color: '#b44fff' },
  { id: 3, label: 'ELEC.IOT', icon: '⚙', color: '#ff6b35' },
  { id: 4, label: 'LEADERSHIP', icon: '🌟', color: '#ffd700' },
];

export default function PlanetNav({ activePlanet, onSelect, onPrev, onNext, onRetreat }) {
  const containerRef = useRef();

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  return (
    <div ref={containerRef} style={{
      position: 'absolute',
      bottom: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
    }}>
      {/* Planets nav */}
      <div style={{
        display: 'flex',
        gap: '12px',
        padding: '12px 20px',
        background: 'rgba(5,10,20,0.85)',
        border: '1px solid rgba(0,212,255,0.15)',
        borderRadius: '40px',
        backdropFilter: 'blur(20px)',
      }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(activePlanet === item.id ? null : item.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '8px 14px',
              background: activePlanet === item.id ? `${item.color}22` : 'transparent',
              border: `1px solid ${activePlanet === item.id ? item.color : 'transparent'}`,
              borderRadius: '20px',
              cursor: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              if (activePlanet !== item.id) {
                e.currentTarget.style.background = `${item.color}11`;
                e.currentTarget.style.borderColor = `${item.color}44`;
              }
            }}
            onMouseLeave={e => {
              if (activePlanet !== item.id) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
              }
            }}
          >
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '8px',
              letterSpacing: '1px',
              color: activePlanet === item.id ? item.color : 'rgba(255,255,255,0.3)',
              transition: 'color 0.3s',
            }}>
              {item.label}
            </span>
            {activePlanet === item.id && (
              <div style={{
                width: '4px', height: '4px',
                borderRadius: '50%',
                background: item.color,
                boxShadow: `0 0 6px ${item.color}`,
              }} />
            )}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button
          onClick={onPrev}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '2px',
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '18px',
            color: '#b4d4ff',
            cursor: 'none',
            transition: 'all 0.25s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          }}
        >
          ← PREVIOUS
        </button>

        <button
          onClick={onRetreat}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '2px',
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '18px',
            color: 'rgba(255,255,255,0.3)',
            cursor: 'none',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.3)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}
        >
          RETREAT
        </button>

        <button
          onClick={onNext}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '2px',
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '18px',
            color: '#d0ffb4',
            cursor: 'none',
            transition: 'all 0.25s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.16)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
          }}
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}
