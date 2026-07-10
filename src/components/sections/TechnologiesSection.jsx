import {
  Code2,
  Server,
  Cloud,
  ShieldHalf,
  Cpu,
  Wrench,
  Sparkles,
} from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { COLORS, FONT, glassPanel } from "./theme";

const CATEGORIES = [
  {
    icon: Code2,
    label: "Frontend",
    subtitle: "Building responsive user interfaces",
    items: ["React.js", "Next.js"],
  },
  {
    icon: Server,
    label: "Backend",
    subtitle: "APIs, databases & real-time systems",
    items: [
      "Node.js",
      "Express.js",
      "Flask",
      "WebSockets",
      "MongoDB",
      "PostgreSQL",
      "SQL",
      "Prisma",
    ],
  },
  {
    icon: Cloud,
    label: "Cloud & DevOps",
    subtitle: "Deployment & infrastructure",
    items: [
      "AWS",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
    ],
  },
  {
    icon: ShieldHalf,
    label: "Cybersecurity",
    subtitle: "Security tools & practices",
    items: [
      "Burp Suite",
      "Wireshark",
      "Nmap",
      "Metasploit",
      "Splunk",
      "OSINT",
      "Web Hacking",
    ],
  },
  {
    icon: Cpu,
    label: "AI / ML",
    subtitle: "Models & intelligent systems",
    items: [
      "Isolation Forest",
      "Autoencoder",
      "RoBERTa",
      "NLP",
    ],
  },
  {
    icon: Wrench,
    label: "Languages",
    subtitle: "Programming languages I use",
    items: [
      "C++",
      "Python",
      "TypeScript",
      "Go",
      "Bash",
      "PowerShell",
    ],
  },
];

export default function TechnologiesSection() {
  return (
    <SectionWrapper
      id="technologies"
      index="04"
      eyebrow="Toolkit"
      title="Technologies I Work With"
      description="A collection of technologies I've explored through projects, coursework, and continuous learning."
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))",
          gap: 22,
        }}
      >
        {CATEGORIES.map(({ icon: Icon, label, subtitle, items }) => (
          <div
            key={label}
            data-reveal
            style={{
              ...glassPanel,
              padding: 24,
              background: "rgba(10,12,18,.62)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,.08)",
              transition: ".35s ease",
              cursor: "default",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-6px)";
              e.currentTarget.style.borderColor =
                "rgba(0,212,255,.25)";
              e.currentTarget.style.boxShadow =
                "0 20px 40px rgba(0,0,0,.35),0 0 30px rgba(0,212,255,.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor =
                "rgba(255,255,255,.08)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Header */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    background:
                      "rgba(0,212,255,.08)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border:
                      "1px solid rgba(0,212,255,.15)",
                  }}
                >
                  <Icon
                    size={20}
                    color={COLORS.neonBlue}
                  />
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: FONT.display,
                      fontSize: 18,
                      color: COLORS.textPrimary,
                      fontWeight: 700,
                    }}
                  >
                    {label}
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      color: COLORS.textFaint,
                      marginTop: 4,
                      lineHeight: 1.5,
                    }}
                  >
                    {subtitle}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: COLORS.neonBlue,
                  fontFamily: FONT.mono,
                  fontSize: 11,
                }}
              >
                <Sparkles size={12} />
                {items.length} Skills
              </div>
            </div>

            {/* Skills */}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              {items.map((item) => (
                <span
                  key={item}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 999,
                    background:
                      "rgba(255,255,255,.03)",
                    border:
                      "1px solid rgba(255,255,255,.08)",
                    color: "rgba(255,255,255,.82)",
                    fontSize: 12,
                    fontFamily: FONT.mono,
                    transition: ".3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(0,212,255,.12)";
                    e.currentTarget.style.borderColor =
                      "rgba(0,212,255,.4)";
                    e.currentTarget.style.color =
                      COLORS.neonBlue;
                    e.currentTarget.style.transform =
                      "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255,255,255,.03)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,.08)";
                    e.currentTarget.style.color =
                      "rgba(255,255,255,.82)";
                    e.currentTarget.style.transform =
                      "translateY(0)";
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}