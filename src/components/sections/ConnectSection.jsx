import { GitBranch, BadgeCheck, Mail, Download } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { COLORS, FONT } from './theme';

const SOCIALS = [
  { icon: GitBranch, label: 'GitHub', href: '#' },
  { icon: BadgeCheck, label: 'LinkedIn', href: '#' },
  { icon: Mail, label: 'Email', href: 'mailto:you@example.com' },
];

export default function ConnectSection({ resumeHref = '/resume.pdf' }) {
  return (
    <SectionWrapper
      id="connect"
      index="07"
      eyebrow="Get In Touch"
      title="Let's build something"
      description="Open to internships, collaborations, and interesting problems. Reach out — the signal's monitored."
      align="center"
    >
      <div
        data-reveal
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '28px',
        }}
      >
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href={resumeHref}
            download
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: FONT.display,
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '2px',
              padding: '16px 32px',
              background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(180,79,255,0.15))',
              border: '1px solid rgba(0,212,255,0.5)',
              borderRadius: '6px',
              color: '#ffffff',
              textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 35px rgba(0,212,255,0.45)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Download size={16} /> DOWNLOAD RESUME
          </a>

          <a
            href="mailto:you@example.com"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: FONT.mono,
              fontSize: '12px',
              letterSpacing: '2px',
              padding: '16px 28px',
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${COLORS.line}`,
              borderRadius: '6px',
              color: 'rgba(255,255,255,0.75)',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = COLORS.line;
              e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
            }}
          >
            <Mail size={15} /> SAY HELLO
          </a>
        </div>

        <div style={{ display: 'flex', gap: '28px' }}>
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: `1px solid ${COLORS.line}`,
                color: 'rgba(255,255,255,0.55)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.6)';
                e.currentTarget.style.color = COLORS.neonBlue;
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = COLORS.line;
                e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Icon size={18} strokeWidth={1.75} />
            </a>
          ))}
        </div>

        <div
          style={{
            marginTop: '20px',
            fontFamily: FONT.mono,
            fontSize: '10px',
            letterSpacing: '2px',
            color: COLORS.textFaint,
          }}
        >
          END OF TRANSMISSION
        </div>
      </div>
    </SectionWrapper>
  );
}
