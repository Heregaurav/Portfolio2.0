import { useEffect, useState } from 'react';
import { Activity, Award, BarChart3, Code2, ExternalLink, Flame, GitBranch, Layers3, Sparkles, Target, Trophy, Zap } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { COLORS, FONT, glassPanel } from './theme';

const platformIconMap = {
  LeetCode: Code2,
  Codeforces: Trophy,
  TryHackMe: Flame,
  GitHub: GitBranch,
  CodeChef: Trophy,
  GeeksforGeeks: Target,
};

const totalIconMap = {
  Solved: BarChart3,
  Contests: Trophy,
  Awards: Award,
};

const fallbackProfile = {
  platforms: [
    { platform: 'LeetCode', stat: '410+', statLabel: 'Solved', sub: 'Live backend data', href: 'https://leetcode.com/yourgaurav', accent: '#00d4ff' },
    { platform: 'CodeChef', stat: '—', statLabel: 'Rating', sub: 'Live backend data', href: 'https://www.codechef.com/users/spidermango', accent: '#b44fff' },
    { platform: 'GeeksforGeeks', stat: '—', statLabel: 'Solved', sub: 'Live backend data', href: 'https://auth.geeksforgeeks.org/user/gaurabkuma160a/practice/', accent: '#00ff88' },
    { platform: 'GitHub', stat: '46+', statLabel: 'Repositories', sub: 'Live backend data', href: 'https://github.com/heregaurav', accent: '#00d4ff' },
  ],
  totals: [
    { label: 'Solved', value: '410+', accent: '#00d4ff', icon: 'Solved' },
    { label: 'Contests', value: '—', accent: '#b44fff', icon: 'Contests' },
    { label: 'Awards', value: '—', accent: '#00ff88', icon: 'Awards' },
  ],
  heatmap: [],
  solvedBreakdown: { Easy: 150, Medium: 222, Hard: 38 },
  current: { rating: '410 solved', weeklyContest: '—', rank: '—', date: new Date().toLocaleDateString('en-GB') },
};

function Heatmap({ data = [] }) {
  const items = Array.isArray(data) ? data : [];
  const max = items.length ? Math.max(...items.map((item) => Number(item.count) || 0), 1) : 1;

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14, minmax(0, 1fr))', gap: '4px' }}>
        {items.map((item) => {
          const count = Number(item.count) || 0;
          const intensity = Math.min(0.95, count / max + 0.05);
          return (
            <div
              key={item.date}
              title={`${item.date}: ${count} solved`}
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: '4px',
                background: `rgba(0, 212, 255, ${intensity})`,
                boxShadow: intensity > 0.2 ? '0 0 8px rgba(0,212,255,0.12)' : 'none',
              }}
            />
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', color: COLORS.textFaint, fontFamily: FONT.mono, fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
        <span>Low</span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[0.2, 0.45, 0.7, 0.95].map((level) => (
            <div key={level} style={{ width: '12px', height: '12px', borderRadius: '3px', background: `rgba(0, 212, 255, ${level})` }} />
          ))}
        </div>
        <span>High</span>
      </div>
    </div>
  );
}

function formatMetric(value, fallback = '—') {
  if (value === null || value === undefined || value === '') return fallback;
  return value;
}

function normalizeProfile(payload) {
  if (!payload) return fallbackProfile;

  if (Array.isArray(payload.platforms) && Array.isArray(payload.totals)) {
    return {
      ...fallbackProfile,
      ...payload,
      platforms: payload.platforms?.length ? payload.platforms : fallbackProfile.platforms,
      totals: payload.totals?.length ? payload.totals : fallbackProfile.totals,
      heatmap: Array.isArray(payload.heatmap) ? payload.heatmap : fallbackProfile.heatmap,
      solvedBreakdown: payload.solvedBreakdown || fallbackProfile.solvedBreakdown,
      current: payload.current || fallbackProfile.current,
    };
  }

  const { github, leet, codechef, gfg, aggregate } = payload;
  const platforms = [];

  if (github) {
    platforms.push({
      platform: 'GitHub',
      stat: `${github.public_repositories ?? github.repositories ?? 0}`,
      statLabel: 'Repositories',
      sub: `${github.followers ?? 0} followers • ${github.stars_received ?? 0} stars`,
      href: `https://github.com/${github.username || 'heregaurav'}`,
      accent: '#00d4ff',
      details: [
        { label: 'Followers', value: github.followers ?? '—' },
        { label: 'Stars', value: github.stars_received ?? '—' },
        { label: 'Top lang', value: github.languages?.[0] || '—' },
      ],
    });
  }

  if (leet) {
    platforms.push({
      platform: 'LeetCode',
      stat: `${leet.total_solved ?? 0}`,
      statLabel: 'Solved',
      sub: `${leet.streak?.current ?? 0} day streak`,
      href: `https://leetcode.com/${leet.username || 'yourgaurav'}`,
      accent: '#00d4ff',
      details: [
        { label: 'Ranking', value: leet.ranking ? `#${leet.ranking}` : '—' },
        { label: 'Easy', value: leet.easy_solved ?? '—' },
        { label: 'Medium', value: leet.medium_solved ?? '—' },
        { label: 'Hard', value: leet.hard_solved ?? '—' },
      ],
    });
  }

  if (codechef) {
    platforms.push({
      platform: 'CodeChef',
      stat: `${codechef.problems_solved ?? '—'}`,
      statLabel: 'Problems solved',
      sub: `${codechef.rating ?? '—'} rating`,
      href: `https://www.codechef.com/users/${codechef.username || 'spidermango'}`,
      accent: '#b44fff',
      details: [
        { label: 'Current rating', value: codechef.rating ?? '—' },
        { label: 'Highest rating', value: codechef.highest_rating ?? '—' },
        { label: 'Contests', value: codechef.contests ?? '—' },
      ],
    });
  }

  if (gfg) {
    platforms.push({
      platform: 'GeeksforGeeks',
      stat: `${gfg.problems_solved ?? '—'}`,
      statLabel: 'Problems solved',
      sub: `${gfg.coding_score ?? '—'} score`,
      href: `https://auth.geeksforgeeks.org/user/${gfg.username || 'gaurabkuma160a'}/practice/`,
      accent: '#00ff88',
      details: [
        { label: 'Coding score', value: gfg.coding_score ?? '—' },
        { label: 'Institution rank', value: gfg.institution_rank ?? '—' },
        { label: 'Streak', value: gfg.streak ?? '—' },
        { label: 'Problems solved', value: gfg.problems_solved ?? '—' },
      ],
    });
  }

  return {
    ...fallbackProfile,
    platforms: platforms.length ? platforms : fallbackProfile.platforms,
    totals: [
      { label: 'Solved', value: `${aggregate?.totalSolved ?? leet?.total_solved ?? 0}`, accent: '#00d4ff', icon: 'Solved' },
      { label: 'Contests', value: `${aggregate?.totalContests ?? 0}`, accent: '#b44fff', icon: 'Contests' },
      { label: 'Stars', value: `${aggregate?.totalStars ?? github?.stars_received ?? 0}`, accent: '#00ff88', icon: 'Awards' },
    ],
    heatmap: Array.isArray(aggregate?.combinedHeatmap) ? aggregate.combinedHeatmap : fallbackProfile.heatmap,
    solvedBreakdown: leet ? { Easy: leet.easy_solved || 0, Medium: leet.medium_solved || 0, Hard: leet.hard_solved || 0 } : fallbackProfile.solvedBreakdown,
    current: {
      rating: leet ? `${leet.total_solved ?? 0} solved` : fallbackProfile.current.rating,
      weeklyContest: leet?.streak?.current ? `${leet.streak.current} day streak` : fallbackProfile.current.weeklyContest,
      rank: leet?.ranking ? `#${leet.ranking}` : fallbackProfile.current.rank,
      date: new Date().toLocaleDateString('en-GB'),
    },
  };
}

export default function CodingProfileSection() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) throw new Error('Profile endpoint unavailable');
        const data = await response.json();
        if (!cancelled) {
          setProfile(normalizeProfile(data));
        }
      } catch (error) {
        if (!cancelled) {
          setProfile(normalizeProfile(null));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <SectionWrapper
        id="coding"
        index="03"
        eyebrow="Track Record"
        title="Coding profiles"
        description="Where the problem-solving actually happens — competitive programming and security CTFs."
      >
        <div style={{ ...glassPanel, padding: '32px', textAlign: 'center' }}>
          Loading coding profile data...
        </div>
      </SectionWrapper>
    );
  }

  if (!profile) {
    return (
      <SectionWrapper
        id="coding"
        index="03"
        eyebrow="Track Record"
        title="Coding profiles"
        description="Where the problem-solving actually happens — competitive programming and security CTFs."
      >
        <div style={{ ...glassPanel, padding: '32px', textAlign: 'center' }}>
          Unable to load coding profile data. Please try again later.
        </div>
      </SectionWrapper>
    );
  }

  const totalSolvedValue = profile.totals?.find((item) => item.label === 'Solved')?.value || '—';
  const summaryCards = [
    { label: 'Total solved', value: totalSolvedValue, accent: '#00d4ff', icon: Zap },
    { label: 'Combined streak', value: profile.current?.weeklyContest || '—', accent: '#b44fff', icon: Activity },
    { label: 'Repositories', value: profile.platforms?.find((p) => p.platform === 'GitHub')?.stat || '—', accent: '#00ff88', icon: Layers3 },
  ];
  const breakdownEntries = Object.entries(profile.solvedBreakdown || {});
  const totalActivity = (profile.heatmap || []).reduce((sum, item) => sum + (Number(item.count) || 0), 0);

  return (
    <SectionWrapper
      id="coding"
      index="03"
      eyebrow="Track Record"
      title="Coding profiles"
      description="A premium view of your combined coding presence across LeetCode, CodeChef, GeeksforGeeks and GitHub."
    >
      <div style={{ display: 'grid', gap: '18px' }}>
        <div
          style={{
            ...glassPanel,
            padding: '24px 24px 28px',
            background: 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(180,79,255,0.08))',
            border: '1px solid rgba(0,212,255,0.18)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 10px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', fontFamily: FONT.mono, fontSize: '10px', letterSpacing: '1.4px', color: COLORS.textFaint, textTransform: 'uppercase' }}>
                <Sparkles size={12} color="#00d4ff" />
                Combined coding intelligence
              </div>
              <div style={{ fontFamily: FONT.display, fontSize: '26px', fontWeight: 900, color: COLORS.textPrimary, marginTop: '12px' }}>
                Track your problem solving with a clear, unified snapshot.
              </div>
              <div style={{ fontFamily: FONT.body, fontSize: '13px', color: COLORS.textDim, marginTop: '8px', maxWidth: '720px' }}>
                Review your strongest platforms, total activity, and performance trends at a glance in one polished command center.
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '999px', background: 'rgba(0,255,136,0.1)', color: '#7dffb4', fontFamily: FONT.mono, fontSize: '10px', letterSpacing: '1.4px', textTransform: 'uppercase', border: '1px solid rgba(0,255,136,0.18)' }}>
              <Activity size={12} />
              Live profile sync
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '18px' }}>
            {summaryCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.label} style={{ padding: '14px 16px', borderRadius: '14px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${COLORS.line}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontFamily: FONT.mono, fontSize: '10px', letterSpacing: '1.4px', color: COLORS.textFaint, textTransform: 'uppercase' }}>{card.label}</span>
                    <Icon size={15} color={card.accent} />
                  </div>
                  <div style={{ fontFamily: FONT.display, fontSize: '24px', fontWeight: 900, color: COLORS.textPrimary }}>{card.value}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'grid', gap: '18px', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div style={{ ...glassPanel, padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ fontFamily: FONT.display, fontSize: '19px', fontWeight: 900, color: COLORS.textPrimary }}>Combined contribution heatmap</div>
                <div style={{ fontFamily: FONT.body, fontSize: '12px', color: COLORS.textDim, marginTop: '4px' }}>LeetCode, CodeChef and GFG activity blended into one signal.</div>
              </div>
              <div style={{ fontFamily: FONT.mono, fontSize: '10px', letterSpacing: '1.4px', color: COLORS.textFaint, textTransform: 'uppercase' }}>{totalActivity} total activity points</div>
            </div>
            <Heatmap data={profile.heatmap} />
          </div>

          <div style={{ display: 'grid', gap: '18px' }}>
            <div style={{ ...glassPanel, padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ fontFamily: FONT.display, fontSize: '19px', fontWeight: 900, color: COLORS.textPrimary }}>Platform deep dive</div>
                <div style={{ fontFamily: FONT.mono, fontSize: '10px', color: COLORS.textFaint, textTransform: 'uppercase', letterSpacing: '1.4px' }}>Live details</div>
              </div>

              <div style={{ display: 'grid', gap: '10px' }}>
                {profile.platforms.map((platform) => {
                  const Icon = platformIconMap[platform.platform] || Code2;
                  return (
                    <a
                      key={platform.platform}
                      href={platform.href}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        padding: '12px 14px',
                        borderRadius: '14px',
                        background: 'rgba(255,255,255,0.03)',
                        border: `1px solid ${COLORS.line}`,
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'transform 0.2s ease, border-color 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Icon size={16} color={platform.accent} />
                          <div>
                            <div style={{ fontFamily: FONT.display, fontSize: '15px', fontWeight: 800, color: COLORS.textPrimary }}>{platform.platform}</div>
                            <div style={{ fontFamily: FONT.mono, fontSize: '10px', letterSpacing: '1.2px', color: COLORS.textFaint, textTransform: 'uppercase' }}>{platform.statLabel}</div>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontFamily: FONT.display, fontSize: '20px', fontWeight: 900, color: COLORS.textPrimary }}>{platform.stat}</div>
                          <div style={{ fontFamily: FONT.body, fontSize: '11px', color: COLORS.textDim }}>{platform.sub}</div>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(92px, 1fr))', gap: '8px', marginTop: '10px' }}>
                        {(platform.details || []).map((detail) => (
                          <div key={detail.label} style={{ padding: '8px 10px', borderRadius: '10px', background: 'rgba(255,255,255,0.025)', border: `1px solid ${COLORS.line}` }}>
                            <div style={{ fontFamily: FONT.mono, fontSize: '9px', letterSpacing: '1.2px', color: COLORS.textFaint, textTransform: 'uppercase', marginBottom: '4px' }}>{detail.label}</div>
                            <div style={{ fontFamily: FONT.display, fontSize: '13px', fontWeight: 800, color: COLORS.textPrimary }}>{formatMetric(detail.value)}</div>
                          </div>
                        ))}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div style={{ ...glassPanel, padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--neon-blue)' }} />
                <div style={{ fontFamily: FONT.display, fontSize: '19px', fontWeight: 900, color: COLORS.textPrimary }}>Profile snapshot</div>
              </div>
              <div style={{ display: 'grid', gap: '12px' }}>
                {[
                  { label: 'Current rating', value: profile.current.rating },
                  { label: 'Weekly contest', value: profile.current.weeklyContest },
                  { label: 'Rank', value: profile.current.rank },
                  { label: 'Updated', value: profile.current.date },
                ].map((row) => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', paddingBottom: '8px', borderBottom: `1px solid ${COLORS.line}` }}>
                    <span style={{ fontFamily: FONT.mono, fontSize: '10px', letterSpacing: '1.4px', color: COLORS.textFaint, textTransform: 'uppercase' }}>{row.label}</span>
                    <span style={{ fontFamily: FONT.display, fontSize: '16px', fontWeight: 800, color: COLORS.textPrimary }}>{formatMetric(row.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '18px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <div style={{ ...glassPanel, padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <BarChart3 size={16} color="#00d4ff" />
              <div style={{ fontFamily: FONT.display, fontSize: '19px', fontWeight: 900, color: COLORS.textPrimary }}>Solved breakdown</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
              {breakdownEntries.map(([level, value]) => (
                <div key={level} style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: `1px solid ${COLORS.line}` }}>
                  <div style={{ fontFamily: FONT.mono, fontSize: '10px', letterSpacing: '1.4px', color: COLORS.textFaint, textTransform: 'uppercase' }}>{level}</div>
                  <div style={{ fontFamily: FONT.display, fontSize: '24px', fontWeight: 900, color: COLORS.textPrimary, marginTop: '6px' }}>{formatMetric(value)}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...glassPanel, padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Award size={16} color="#b44fff" />
              <div style={{ fontFamily: FONT.display, fontSize: '19px', fontWeight: 900, color: COLORS.textPrimary }}>Overall performance</div>
            </div>
            <div style={{ display: 'grid', gap: '10px' }}>
              {profile.totals.map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: `1px solid ${COLORS.line}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {(() => {
                      const Icon = totalIconMap[item.icon] || BarChart3;
                      return <Icon size={16} color={item.accent} />;
                    })()}
                    <span style={{ fontFamily: FONT.mono, fontSize: '10px', letterSpacing: '1.4px', color: COLORS.textFaint, textTransform: 'uppercase' }}>{item.label}</span>
                  </div>
                  <span style={{ fontFamily: FONT.display, fontSize: '18px', fontWeight: 900, color: COLORS.textPrimary }}>{formatMetric(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
