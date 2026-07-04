import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PLANET_DATA = {
  webdev: {
    title: 'WEB DEVELOPMENT',
    subtitle: 'Full Stack Engineering',
    color: '#00d4ff',
    icon: '⚡',
    description: 'Crafting high-performance web applications with modern stack. From pixel-perfect UIs to scalable backends.',
    skills: [
      { name: 'React / Next.js', level: 90 },
      { name: 'Node.js / Express', level: 85 },
      { name: 'MongoDB / PostgreSQL', level: 80 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'TypeScript', level: 75 },
    ],
    projects: [
      { name: 'DevCollab Platform', desc: 'Real-time collaboration tool', tech: ['React', 'Socket.io', 'Node'], link: '#' },
      { name: 'EcoTrack Dashboard', desc: 'Environmental monitoring app', tech: ['Next.js', 'MongoDB', 'Chart.js'], link: '#' },
      { name: 'CampusConnect', desc: 'College social network', tech: ['React', 'Express', 'PostgreSQL'], link: '#' },
    ],
  },
  cybersec: {
    title: 'CYBERSECURITY',
    subtitle: 'Ethical Hacking & Defense',
    color: '#00ff88',
    icon: '🛡',
    description: 'Securing digital infrastructure through offensive and defensive security practices. CTF competitor and security researcher.',
    skills: [
      { name: 'Network Security', level: 85 },
      { name: 'Linux / Bash', level: 88 },
      { name: 'Wireshark / Nmap', level: 82 },
      { name: 'Burp Suite', level: 78 },
      { name: 'OWASP / CTF', level: 80 },
    ],
    projects: [
      { name: 'VulnScanner', desc: 'Automated vulnerability scanner', tech: ['Python', 'Nmap', 'SQLMap'], link: '#' },
      { name: 'CTF Framework', desc: 'Personal CTF toolkit', tech: ['Python', 'Bash', 'Pwntools'], link: '#' },
      { name: 'IDS System', desc: 'Intrusion detection proof-of-concept', tech: ['Snort', 'Python', 'Wireshark'], link: '#' },
    ],
  },
  cloud: {
    title: 'CLOUD & AWS',
    subtitle: 'Infrastructure & DevOps',
    color: '#b44fff',
    icon: '☁',
    description: 'Building scalable cloud infrastructure and automating deployments. AWS certified practices with CI/CD expertise.',
    skills: [
      { name: 'AWS (EC2, S3, Lambda)', level: 78 },
      { name: 'Docker / Containers', level: 82 },
      { name: 'CI/CD Pipelines', level: 75 },
      { name: 'Linux Server Admin', level: 85 },
      { name: 'Terraform / IaC', level: 65 },
    ],
    projects: [
      { name: 'Auto-Deploy Pipeline', desc: 'GitHub Actions to AWS', tech: ['AWS', 'GitHub Actions', 'Docker'], link: '#' },
      { name: 'Serverless API', desc: 'Lambda-powered REST API', tech: ['AWS Lambda', 'API Gateway', 'DynamoDB'], link: '#' },
      { name: 'Container Cluster', desc: 'Microservices orchestration', tech: ['Docker', 'ECS', 'ECR'], link: '#' },
    ],
  },
  electronics: {
    title: 'ELECTRONICS & IoT',
    subtitle: 'ECE Engineering',
    color: '#ff6b35',
    icon: '⚙',
    description: 'Bridging hardware and software with embedded systems and IoT solutions. ECE student building real-world prototypes.',
    skills: [
      { name: 'Arduino / ESP32', level: 85 },
      { name: 'Raspberry Pi', level: 80 },
      { name: 'Circuit Design', level: 75 },
      { name: 'VHDL / Verilog', level: 65 },
      { name: 'MQTT / IoT Protocols', level: 72 },
    ],
    projects: [
      { name: 'Smart Irrigation', desc: 'IoT-powered water management', tech: ['ESP32', 'MQTT', 'React'], link: '#' },
      { name: 'Home Automation', desc: 'Voice-controlled smart home', tech: ['Raspberry Pi', 'Python', 'MQTT'], link: '#' },
      { name: 'Motion Detector', desc: 'CV-based security system', tech: ['OpenCV', 'Python', 'Pi Camera'], link: '#' },
    ],
  },
  leadership: {
    title: 'LEADERSHIP',
    subtitle: 'Community & Impact',
    color: '#ffd700',
    icon: '🌟',
    description: 'Leading teams, organizing events, and building communities. Co-lead of dance club and active in multiple technical bodies.',
    skills: [
      { name: 'Team Management', level: 88 },
      { name: 'Event Organization', level: 85 },
      { name: 'Public Speaking', level: 78 },
      { name: 'Technical Mentoring', level: 82 },
      { name: 'Project Planning', level: 80 },
    ],
    projects: [
      { name: 'Dance Club Co-Lead', desc: 'Led 40-member performing team', tech: ['Leadership', 'Choreography', 'Events'], link: '#' },
      { name: 'MLSA Cyber Team', desc: 'Microsoft Learn Student Ambassador', tech: ['Security', 'Community', 'Workshops'], link: '#' },
      { name: 'CTF Organizer', desc: 'Organized college CTF competition', tech: ['Event Management', 'CTF', 'Security'], link: '#' },
    ],
  },
};

function SkillBar({ name, level, color, delay }) {
  const barRef = useRef();

  useEffect(() => {
    gsap.fromTo(barRef.current,
      { width: '0%' },
      { width: `${level}%`, duration: 1.2, delay, ease: 'power3.out' }
    );
  }, [level, delay]);

  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.8)', letterSpacing: '1px' }}>
          {name}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color, letterSpacing: '1px' }}>
          {level}%
        </span>
      </div>
      <div style={{
        height: '4px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '2px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div ref={barRef} style={{
          height: '100%',
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          borderRadius: '2px',
          boxShadow: `0 0 8px ${color}`,
          width: '0%',
        }} />
      </div>
    </div>
  );
}

export default function PlanetPanel({ planetIndex, onClose }) {
  const panelRef = useRef();
  const types = ['webdev', 'cybersec', 'cloud', 'electronics', 'leadership'];
  const type = types[planetIndex];
  const data = PLANET_DATA[type] || PLANET_DATA.webdev;

  useEffect(() => {
    gsap.fromTo(panelRef.current,
      { opacity: 0, x: 64, filter: 'blur(10px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' }
    );
  }, [planetIndex]);

  const handleClose = () => {
    gsap.to(panelRef.current, {
      opacity: 0, x: 60, filter: 'blur(10px)',
      duration: 0.4, ease: 'power2.in',
      onComplete: onClose,
    });
  };

  return (
    <div ref={panelRef} style={{
      position: 'fixed',
      right: '26px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 'min(420px, 92vw)',
      maxHeight: '88vh',
      overflowY: 'auto',
      background: 'rgba(8, 12, 24, 0.78)',
      border: `1px solid rgba(255,255,255,0.12)`,
      borderRadius: '28px',
      padding: '30px',
      zIndex: 120,
      backdropFilter: 'blur(32px)',
      boxShadow: `0 30px 80px rgba(0,0,0,0.35), inset 0 0 50px rgba(255,255,255,0.04)`,
      scrollbarWidth: 'none',
      WebkitBackdropFilter: 'blur(32px)',
    }}>
      <div style={{ position: 'absolute', inset: '12px', border: `1px solid ${data.color}16`, borderRadius: '16px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '6px', background: `linear-gradient(90deg, ${data.color}, transparent)` }} />
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '2px',
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            {data.subtitle}
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            letterSpacing: '2px',
            color: 'rgba(255,255,255,0.94)',
            lineHeight: 1.05,
            marginBottom: '10px',
          }}>
            {data.title}
          </h2>
        </div>
        <button onClick={handleClose} style={{
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px', color: 'rgba(255,255,255,0.65)',
          width: '36px', height: '36px', cursor: 'none',
          fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
          flexShrink: 0,
          boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = data.color; e.currentTarget.style.color = data.color; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
        >✕</button>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        lineHeight: 1.8,
        color: 'rgba(255,255,255,0.86)',
        marginBottom: '24px',
        borderLeft: `3px solid ${data.color}40`,
        paddingLeft: '12px',
      }}>
        {data.description}
      </p>

      {/* Divider */}
      <div style={{ height: '1px', background: `linear-gradient(90deg, ${data.color}44, transparent)`, marginBottom: '20px' }} />

      {/* Skills */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '3px',
          color: 'rgba(255,255,255,0.32)',
          marginBottom: '16px',
        }}>
          CORE COMPETENCIES
        </h3>
        {data.skills.map((skill, i) => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} color={data.color} delay={i * 0.1} />
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: `linear-gradient(90deg, ${data.color}44, transparent)`, marginBottom: '20px' }} />

      {/* Highlights */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '3px',
          color: 'rgba(255,255,255,0.32)',
          marginBottom: '16px',
        }}>
          SELECTED HIGHLIGHTS
        </h3>
        {data.projects.map((project, i) => (
          <div key={i} style={{
            marginBottom: '12px',
            padding: '14px',
            background: `${data.color}08`,
            border: `1px solid ${data.color}22`,
            borderRadius: '6px',
            transition: 'all 0.3s ease',
            cursor: 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = `${data.color}12`;
            e.currentTarget.style.borderColor = `${data.color}55`;
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = `${data.color}08`;
            e.currentTarget.style.borderColor = `${data.color}22`;
            e.currentTarget.style.transform = 'translateX(0)';
          }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', color: 'white', letterSpacing: '1px' }}>
                {project.name}
              </span>
              <a href={project.link} style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: data.color, textDecoration: 'none', letterSpacing: '1px' }}>
                VIEW →
              </a>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>
              {project.desc}
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {project.tech.map((t, j) => (
                <span key={j} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '1px',
                  padding: '2px 8px',
                  border: `1px solid ${data.color}44`,
                  borderRadius: '2px',
                  color: `${data.color}99`,
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
