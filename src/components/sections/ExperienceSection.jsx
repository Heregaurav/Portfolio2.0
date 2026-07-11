import { useRef } from 'react';
import { Briefcase } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { COLORS, FONT, glassPanel } from './theme';
import TimelineScrollProgress, { TimelineScrollProgressStyles } from './TimelineScrollProgress';

const TIMELINE = [
  {
    period: '2024 — Present',
    title: 'B.Tech, Computer Science',
    org: 'IIIT Dharwad',
    description:
      'Coursework and independent projects spanning systems, security, and full-stack development, alongside sustained competitive programming practice.',
  },
  {
    period: '2024',
    title: 'Hackathon — Behavioral Authentication System',
    org: 'Team Lead',
    description:
      'Designed and led the build of a continuous authentication engine for digital banking fraud prevention, from ML risk scoring to the mobile client.',
  },
  {
    period: 'Ongoing',
    title: '3D Portfolio Engine',
    org: 'Independent Project',
    description:
      'Building and iterating a React Three Fiber space scene — solving real problems in asset normalization, camera choreography, and interaction design.',
  },
];

export default function ExperienceSection() {
  const containerRef = useRef(null);
  // One ref per timeline row, created up front so the array identity is
  // stable across renders (avoids re-creating refs / re-running effects).
  const itemRefs = useRef(TIMELINE.map(() => ({ current: null }))).current;

  return (
    <SectionWrapper
      id="experience"
      index="06"
      eyebrow="Timeline"
      title="Experience"
      description="A real chronological path — school, teams, and shipped work."
    >
      <TimelineScrollProgressStyles />
      <div ref={containerRef} style={{ position: 'relative', maxWidth: '720px' }}>
        {/* Glowy scroll progress rail (replaces the old static base line —
            having both caused two nearly-overlapping lines to visually merge) */}
        <TimelineScrollProgress containerRef={containerRef} itemRefs={itemRefs} />

        {TIMELINE.map((item, i) => (
          <div
            key={item.title}
            ref={itemRefs[i]}
            data-reveal
            className="exp-row"
            style={{ display: 'flex', gap: '22px', marginBottom: i === TIMELINE.length - 1 ? 0 : '32px' }}
          >
            <div
              className="exp-dot"
              style={{
                flexShrink: 0,
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: COLORS.bgPanel,
                border: `1px solid ${COLORS.line}`,
                zIndex: 1,
              }}
            >
              <Briefcase size={16} color={COLORS.neonBlue} strokeWidth={1.75} />
            </div>
            <div className="exp-panel" style={{ ...glassPanel, padding: '18px 22px', flexGrow: 1 }}>
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: '10px',
                  letterSpacing: '1.5px',
                  color: COLORS.neonBlue,
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                {item.period}
              </div>
              <h3
                style={{
                  fontFamily: FONT.display,
                  fontWeight: 800,
                  fontSize: '16px',
                  color: COLORS.textPrimary,
                  margin: '0 0 2px',
                }}
              >
                {item.title}
              </h3>
              <div
                style={{
                  fontFamily: FONT.body,
                  fontSize: '12.5px',
                  color: COLORS.textFaint,
                  marginBottom: '10px',
                }}
              >
                {item.org}
              </div>
              <p
                style={{
                  fontFamily: FONT.body,
                  fontSize: '13.5px',
                  lineHeight: 1.7,
                  color: COLORS.textDim,
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}