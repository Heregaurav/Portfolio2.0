import { useEffect, useRef, useState } from 'react';

export default function AudioManager({ phase }) {
  const [muted, setMuted] = useState(true);
  const ctxRef = useRef(null);
  const nodesRef = useRef({});

  const createAmbient = (ctx) => {
    // Deep space drone
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();
    const masterGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55, ctx.currentTime);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(82.5, ctx.currentTime);

    gain1.gain.setValueAtTime(0.3, ctx.currentTime);
    gain2.gain.setValueAtTime(0.15, ctx.currentTime);
    masterGain.gain.setValueAtTime(0, ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, ctx.currentTime);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(filter);
    gain2.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    osc1.start();
    osc2.start();

    // Slow frequency modulation
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
    lfoGain.gain.setValueAtTime(5, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    lfo.start();

    return { masterGain, osc1, osc2, lfo };
  };

  const toggleMute = () => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      nodesRef.current = createAmbient(ctxRef.current);
    }
    const ctx = ctxRef.current;
    const { masterGain } = nodesRef.current;

    if (muted) {
      masterGain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 1);
      setMuted(false);
    } else {
      masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      setMuted(true);
    }
  };

  return (
    <button
      onClick={toggleMute}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 1000,
        background: 'rgba(0,212,255,0.1)',
        border: '1px solid rgba(0,212,255,0.3)',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'none',
        fontSize: '18px',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
      }}
      title={muted ? "Enable sound" : "Mute"}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,212,255,0.2)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,212,255,0.1)'}
    >
      {muted ? '🔇' : '🔊'}
    </button>
  );
}
