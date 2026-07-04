import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';

import CustomCursor from './components/ui/CustomCursor';
import AudioManager from './components/ui/AudioManager';
import LandingUI from './components/ui/LandingUI';
import LaunchSequence from './components/ui/LaunchSequence';
import PlanetNav from './components/ui/PlanetNav';
import PlanetPanel from './components/ui/PlanetPanel';
import MissionControl from './components/ui/MissionControl';
import LandingScene from './scenes/LandingScene';
import PlanetScene from './scenes/PlanetScene';

// Warp transition overlay
function WarpOverlay({ active }) {
  if (!active) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse at center, #ffffff 0%, #00d4ff 20%, #b44fff 50%, transparent 70%)',
      opacity: active ? 1 : 0,
      transition: 'opacity 0.3s',
      zIndex: 40,
      pointerEvents: 'none',
      animation: 'warp-flash 0.8s ease-out forwards',
    }}>
      <style>{`
        @keyframes warp-flash {
          0% { opacity: 0; transform: scaleX(1); }
          30% { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0; transform: scaleX(8); }
        }
      `}</style>
    </div>
  );
}

// Loading screen
function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('BOOTING SYSTEMS...');

  useEffect(() => {
    const messages = [
      'INITIALIZING ENGINE...',
      'LOADING STAR CHARTS...',
      'CALIBRATING THRUSTERS...',
      'SYSTEMS NOMINAL...',
      'READY FOR LAUNCH',
    ];
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 20 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(onDone, 400);
      }
      setProgress(Math.min(p, 100));
      setStatus(messages[Math.min(Math.floor(p / 20), 4)]);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#020408',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 200,
    }}>
      {/* Animated rings */}
      {[1, 2, 3].map(i => (
        <div key={i} style={{
          position: 'absolute',
          width: `${i * 120}px`, height: `${i * 120}px`,
          border: '1px solid rgba(0, 213, 255, 0.1)',
          borderRadius: '50%',
          animation: `rotate-slow ${4 + i * 2}s linear infinite`,
        }} />
      ))}

      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(24px, 4vw, 40px)',
        letterSpacing: '8px',
        marginBottom: '8px',
        background: 'linear-gradient(135deg, #00d4ff, #b44fff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        GAURAV.SPACE
      </div>

      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '4px',
        color: 'rgba(0,212,255,0.5)',
        marginBottom: '48px',
      }}>
        PORTFOLIO UNIVERSE
      </div>

      {/* Progress bar */}
      <div style={{
        width: '280px',
        height: '2px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '1px',
        marginBottom: '16px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #00d4ff, #b44fff)',
          transition: 'width 0.2s ease',
          boxShadow: '0 0 10px #00d4ff',
        }} />
      </div>

      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '3px',
        color: 'rgba(0,212,255,0.4)',
        display: 'flex',
        justifyContent: 'space-between',
        width: '280px',
      }}>
        <span>{status}</span>
        <span>{Math.floor(progress)}%</span>
      </div>
    </div>
  );
}

// PHASES: loading → landing → launching → space → contact
export default function App() {
  const [phase, setPhase] = useState('loading');
  const [activePlanet, setActivePlanet] = useState(null);
  const [warp, setWarp] = useState(false);
  const canvasRef = useRef();

  const handleLaunch = () => {
    setPhase('launching');
  };

  const handleLaunchComplete = () => {
    setWarp(true);
    setTimeout(() => {
      setPhase('space');
      setWarp(false);
    }, 800);
  };

  const handleBackToLanding = () => {
    setWarp(true);
    setTimeout(() => {
      setPhase('landing');
      setActivePlanet(null);
      setWarp(false);
    }, 600);
  };

  const handleRetreat = () => {
    setActivePlanet(null);
  };

  const handlePrevPlanet = () => {
    if (activePlanet === null) return;
    if (activePlanet === 0) {
      setActivePlanet(null);
      return;
    }
    setActivePlanet(activePlanet - 1);
  };

  const handleNextPlanet = () => {
    if (activePlanet === null) {
      setActivePlanet(0);
      return;
    }
    if (activePlanet < 4) {
      setActivePlanet(activePlanet + 1);
    }
  };

  const handleContact = () => {
    setPhase('contact');
  };

  return (
    <>
      <CustomCursor />
      <AudioManager phase={phase} />

      {/* 3D Canvas */}
      {phase !== 'loading' && phase !== 'contact' && (
            <Canvas
              ref={canvasRef}
              onPointerMissed={() => setActivePlanet(null)}
              style={{
                position:'fixed',
                inset:0
              }}

              camera={{
                position:[0,0,10],
                fov:75,
                near:0.1,
                far:2000
              }}

              gl={{
                antialias:true,
                alpha:false,
                powerPreference:'high-performance'
              }}

              dpr={[1,1.5]}
            >
          {phase === 'landing' && (
            <LandingScene onLaunch={handleLaunch} />
          )}
          {phase === 'launching' && (
            <LandingScene launching onLaunch={handleLaunch} />
          )}
          {phase === 'space' && (
            <PlanetScene
              activePlanet={activePlanet}
              onSelectPlanet={setActivePlanet}
              onZoomOut={() => {
                setActivePlanet(null);
              }}
            />
          )}
        </Canvas>
      )}

      {/* Background for non-3D phases */}
      {(phase === 'contact') && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'radial-gradient(ellipse at 30% 30%, #0a0a2a 0%, #020408 60%)',
        }}>
          {/* Static star bg */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              radial-gradient(1px 1px at 10% 10%, rgba(255,255,255,0.6) 0%, transparent 0%),
              radial-gradient(1px 1px at 30% 70%, rgba(255,255,255,0.4) 0%, transparent 0%),
              radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.5) 0%, transparent 0%),
              radial-gradient(1px 1px at 80% 60%, rgba(255,255,255,0.3) 0%, transparent 0%),
              radial-gradient(1px 1px at 50% 90%, rgba(255,255,255,0.5) 0%, transparent 0%)
            `,
            backgroundSize: '200px 200px',
          }} />
        </div>
      )}

      {/* Warp flash */}
      <WarpOverlay active={warp} />

      {/* UI Layers */}
      {phase === 'loading' && (
        <LoadingScreen onDone={() => setPhase('landing')} />
      )}

      {phase === 'landing' && (
        <LandingUI
          onLaunch={handleLaunch}
          onResume={() => window.open('#', '_blank')}
          onContact={handleContact}
        />
      )}

      {phase === 'launching' && (
        <LaunchSequence onComplete={handleLaunchComplete} />
      )}

      {phase === 'space' && (
        <>
          {/* HUD top bar */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50,
            display: 'flex',
            gap: '24px',
            padding: '10px 24px',
            background: 'rgba(5,10,20,0.7)',
            border: '1px solid rgba(0,212,255,0.1)',
            borderRadius: '30px',
            backdropFilter: 'blur(20px)',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '2px',
            color: 'rgba(0,212,255,0.5)',
            pointerEvents: 'none',
          }}>
            <span style={{ color: 'rgba(0,255,136,0.8)' }}>● LIVE</span>
            <span>GAURAV'S UNIVERSE</span>
            <span>{new Date().toLocaleTimeString()}</span>
            <span style={{ color: 'rgba(255,107,53,0.8)' }}>
              {activePlanet !== null ? `ORBITING: PLANET ${activePlanet + 1}` : 'DEEP SPACE NAV'}
            </span>
          </div>

          <PlanetNav
            activePlanet={activePlanet}
            onSelect={setActivePlanet}
            onPrev={handlePrevPlanet}
            onNext={handleNextPlanet}
            onRetreat={handleRetreat}
          />
          {activePlanet !== null && (
                <PlanetPanel
                  planetIndex={activePlanet}
                  onClose={() => setActivePlanet(null)}
                />
              )}
          {/* Contact button */}
          <button
            onClick={handleContact}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 50,
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '3px',
              padding: '10px 18px',
              background: 'rgba(180,79,255,0.1)',
              border: '1px solid rgba(180,79,255,0.3)',
              borderRadius: '20px',
              color: 'var(--neon-purple)',
              cursor: 'none',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(180,79,255,0.2)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(180,79,255,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(180,79,255,0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            📡 MISSION CONTROL
          </button>
        </>
      )}

      {phase === 'contact' && (
        <MissionControl onBack={() => setPhase('space')} />
      )}
    </>
  );
}
