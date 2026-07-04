import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const TERMINAL_LINES = [
  { delay: 0, text: '> initializing_contact_protocol...', color: '#00ff88' },
  { delay: 0.4, text: '> loading_communication_channels...', color: '#00d4ff' },
  { delay: 0.8, text: '> STATUS: GAURAV IS AVAILABLE FOR', color: '#b44fff' },
  { delay: 1.1, text: '  [INTERNSHIPS] [PROJECTS] [COLLABS]', color: '#ffd700' },
  { delay: 1.4, text: '> awaiting_input...', color: '#00ff88' },
];

function TerminalLine({ text, color, delay }) {
  const [visible, setVisible] = useState(false);
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      let i = 0;
      const type = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(type);
      }, 25);
      return () => clearInterval(type);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [text, delay]);

  if (!visible) return null;
  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      color,
      lineHeight: 2,
      letterSpacing: '1px',
    }}>
      {displayed}
    </div>
  );
}

export default function MissionControl({ onBack }) {
  const containerRef = useRef();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
    }
  };

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 50,
      background: 'rgba(2,4,8,0.9)',
      backdropFilter: 'blur(10px)',
    }}>
      <div ref={containerRef} style={{
        width: 'min(900px, 95vw)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        padding: '40px',
        background: 'rgba(5,10,20,0.95)',
        border: '1px solid rgba(0,212,255,0.2)',
        borderRadius: '16px',
        boxShadow: '0 0 60px rgba(0,212,255,0.1), 0 0 120px rgba(180,79,255,0.05)',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        {/* Left: Terminal */}
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '10px',
            letterSpacing: '4px',
            color: 'rgba(0,212,255,0.5)',
            marginBottom: '8px',
          }}>
            MISSION CONTROL
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            letterSpacing: '2px',
            lineHeight: 1.1,
            marginBottom: '24px',
          }}>
            ESTABLISH<br />
            <span style={{ color: 'var(--neon-blue)', textShadow: '0 0 20px var(--neon-blue)' }}>CONNECTION</span>
          </h2>

          {/* Terminal */}
          <div style={{
            background: 'rgba(0,10,0,0.8)',
            border: '1px solid rgba(0,255,136,0.2)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            minHeight: '160px',
          }}>
            <div style={{
              display: 'flex', gap: '6px', marginBottom: '12px',
            }}>
              {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
              ))}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.2)', marginLeft: '8px' }}>
                mission_control.sh
              </span>
            </div>
            {TERMINAL_LINES.map((line, i) => (
              <TerminalLine key={i} {...line} />
            ))}
          </div>

          {/* Contact links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { icon: '🐙', label: 'GITHUB', value: 'github.com/gauravkumar', color: '#00d4ff' },
              { icon: '💼', label: 'LINKEDIN', value: 'linkedin.com/in/gauravkumar', color: '#0077b5' },
              { icon: '📧', label: 'EMAIL', value: 'gaurav@example.com', color: '#b44fff' },
            ].map(({ icon, label, value, color }, i) => (
              <a key={i} href="#" style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 14px',
                background: `${color}08`,
                border: `1px solid ${color}22`,
                borderRadius: '6px',
                textDecoration: 'none',
                cursor: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${color}14`;
                e.currentTarget.style.borderColor = `${color}55`;
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = `${color}08`;
                e.currentTarget.style.borderColor = `${color}22`;
                e.currentTarget.style.transform = 'translateX(0)';
              }}
              >
                <span>{icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: `${color}88`, letterSpacing: '2px' }}>{label}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>{value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div>
          {!sent ? (
            <>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                letterSpacing: '3px',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '24px',
              }}>
                SEND.TRANSMISSION
              </h3>

              {[
                { key: 'name', label: 'YOUR NAME', placeholder: 'Astronaut X' },
                { key: 'email', label: 'COMM CHANNEL', placeholder: 'email@station.com' },
              ].map(({ key, label, placeholder }) => (
                <div key={key} style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    letterSpacing: '3px',
                    color: 'rgba(0,212,255,0.5)',
                    marginBottom: '6px',
                  }}>
                    {label}
                  </label>
                  <input
                    value={form[key]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    placeholder={placeholder}
                    style={{
                      width: '100%',
                      background: 'rgba(0,212,255,0.04)',
                      border: '1px solid rgba(0,212,255,0.2)',
                      borderRadius: '4px',
                      padding: '10px 12px',
                      color: 'white',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      outline: 'none',
                      cursor: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(0,212,255,0.6)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(0,212,255,0.2)'}
                  />
                </div>
              ))}

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '3px',
                  color: 'rgba(0,212,255,0.5)',
                  marginBottom: '6px',
                }}>
                  MESSAGE
                </label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="Your mission proposal..."
                  rows={5}
                  style={{
                    width: '100%',
                    background: 'rgba(0,212,255,0.04)',
                    border: '1px solid rgba(0,212,255,0.2)',
                    borderRadius: '4px',
                    padding: '10px 12px',
                    color: 'white',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    outline: 'none',
                    resize: 'none',
                    cursor: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,212,255,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(0,212,255,0.2)'}
                />
              </div>

              <button onClick={handleSubmit} style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(180,79,255,0.15))',
                border: '1px solid rgba(0,212,255,0.4)',
                borderRadius: '4px',
                color: 'white',
                fontFamily: 'var(--font-display)',
                fontSize: '12px',
                letterSpacing: '3px',
                cursor: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(180,79,255,0.3))';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0,212,255,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(180,79,255,0.15))';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                📡 TRANSMIT MESSAGE
              </button>
            </>
          ) : (
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              height: '100%', gap: '16px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '60px' }}>🚀</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--neon-green)', letterSpacing: '2px' }}>
                TRANSMISSION SENT
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
                Signal received at HQ.<br />Gaurav will respond soon.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Back button */}
      <button onClick={onBack} style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '3px',
        padding: '10px 20px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '4px',
        color: 'rgba(255,255,255,0.4)',
        cursor: 'none',
        transition: 'all 0.3s',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
      >
        ← BACK TO SPACE
      </button>
    </div>
  );
}
