import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GitBranch, Users, Mail, ArrowLeft, Send } from 'lucide-react';

const TERMINAL_LINES = [
  { delay: 0, text: '> initializing_contact_protocol...', color: '#00ff88' },
  { delay: 0.4, text: '> loading_communication_channels...', color: '#00d4ff' },
  { delay: 0.8, text: '> STATUS: GAURAV IS AVAILABLE FOR', color: '#b44fff' },
  { delay: 1.1, text: '  [INTERNSHIPS] [PROJECTS] [COLLABS]', color: '#ffd700' },
  { delay: 1.4, text: '> awaiting_input...', color: '#00ff88' },
];

function TerminalLine({ text, color, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      let i = 0;
      const type = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(type);
      }, 19);
      return () => clearInterval(type);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [text, delay]);

  if (!visible) return null;
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color, lineHeight: 1.8 }}>
      {displayed}
    </div>
  );
}

export default function MissionControl({ onBack }) {
  const containerRef = useRef();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0, y: 10, scale: 0.995 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' });
  }, []);

  function handleSubmit() {
    setSent(true);
    // keep simple: mimic send
    setTimeout(() => setSent(false), 2200);
  }

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60, pointerEvents: 'auto' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(2,4,8,0.6)', backdropFilter: 'blur(8px) saturate(1.05)' }} />

      <div ref={containerRef} style={{ width: 'min(980px,96vw)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, padding: 22, background: 'linear-gradient(180deg, rgba(8,12,18,0.86), rgba(6,8,12,0.7))', border: '1px solid rgba(0,212,255,0.06)', borderRadius: 14, boxShadow: '0 20px 50px rgba(0,0,0,0.6)', maxHeight: '90vh', overflowY: 'auto' }}>

        {/* Left: Terminal + Links */}
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: 4, color: 'rgba(0,212,255,0.65)', marginBottom: 6 }}>MISSION CONTROL</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, letterSpacing: 1, lineHeight: 1.05, marginBottom: 14, color: 'rgba(255,255,255,0.95)' }}>
            ESTABLISH<br />
            <span style={{ color: 'var(--neon-blue)', textShadow: '0 0 28px rgba(0,212,255,0.12)' }}>CONNECTION</span>
          </h2>

          <div style={{ background: 'linear-gradient(180deg, rgba(0,8,12,0.6), rgba(0,6,8,0.4))', border: '1px solid rgba(0,212,255,0.04)', borderRadius: 10, padding: 14, marginBottom: 12, minHeight: 140 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 6, background: '#ff5f57' }} />
                <div style={{ width: 10, height: 10, borderRadius: 6, background: '#febc2e' }} />
                <div style={{ width: 10, height: 10, borderRadius: 6, background: '#28c840' }} />
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.32)' }}>mission_control.sh</div>
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.85)', display: 'grid', gap: 6 }}>
              {TERMINAL_LINES.map((l, i) => <TerminalLine key={i} {...l} />)}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[{ icon: GitBranch, label: 'GITHUB', value: 'github.com/gauravkumar', color: '#00d4ff' }, { icon: Users, label: 'LINKEDIN', value: 'linkedin.com/in/gauravkumar', color: '#0077b5' }, { icon: Mail, label: 'EMAIL', value: 'gaurav@example.com', color: '#b44fff' }].map((it, i) => (
              <a key={i} href="#" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: `${it.color}0f`, border: `1px solid ${it.color}22`, borderRadius: 10, textDecoration: 'none', color: 'inherit', transition: 'transform 0.18s, background 0.18s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.background = `${it.color}20`; e.currentTarget.style.borderColor = `${it.color}55`; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.background = `${it.color}0f`; e.currentTarget.style.borderColor = `${it.color}22`; }}>
                <it.icon size={18} color={it.color} />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: it.color, letterSpacing: 2 }}>{it.label}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>{it.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right: Form / Transmit */}
        <div>
          {!sent ? (
            <>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14, letterSpacing: 3, color: 'rgba(255,255,255,0.55)', marginBottom: 18 }}>SEND.TRANSMISSION</h3>

              {[{ key: 'name', label: 'YOUR NAME', placeholder: 'Astronaut X' }, { key: 'email', label: 'COMM CHANNEL', placeholder: 'email@station.com' }].map(({ key, label, placeholder }) => (
                <div key={key} style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'rgba(0,212,255,0.55)', marginBottom: 6 }}>{label}</label>
                  <input value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} placeholder={placeholder} style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 6, padding: '10px 12px', color: 'white', fontFamily: 'var(--font-mono)', fontSize: 13, outline: 'none', transition: 'border-color 0.18s' }} onFocus={e => e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'} onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'} />
                </div>
              ))}

              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'rgba(0,212,255,0.55)', marginBottom: 6 }}>MESSAGE</label>
                <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Your mission proposal..." rows={5} style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 6, padding: '10px 12px', color: 'white', fontFamily: 'var(--font-mono)', fontSize: 13, outline: 'none', resize: 'none', transition: 'border-color 0.18s' }} onFocus={e => e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'} onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'} />
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={handleSubmit} style={{ flex: 1, padding: '12px 14px', background: 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(180,79,255,0.08))', border: '1px solid rgba(0,212,255,0.3)', borderRadius: 8, color: 'white', fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: 2, cursor: 'pointer', transition: 'all 0.18s' }} onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(0,212,255,0.18)'; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}>
                  <Send size={16} style={{ marginRight: 8 }} /> TRANSMIT
                </button>

                <button onClick={onBack} style={{ padding: '12px 14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-mono)', cursor: 'pointer' }}>
                  <ArrowLeft size={14} style={{ marginRight: 8 }} /> RETURN
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 60 }}>🚀</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--neon-green)', letterSpacing: 2 }}>TRANSMISSION SENT</h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.44)', lineHeight: 1.6 }}>Signal received at HQ.<br />Gaurav will respond soon.</p>
            </div>
          )}
        </div>

      </div>

      {/* Tiny close/back floating */}
      <button onClick={onBack} style={{ position: 'absolute', top: 18, left: 18, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
        <ArrowLeft size={14} style={{ marginRight: 8 }} /> BACK TO HUD
      </button>
    </div>
  );
}
