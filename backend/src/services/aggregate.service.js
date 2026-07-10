import config from '../config/index.js';
import * as GithubService from './github.service.js';
import * as LeetService from './leetcode.service.js';
import * as CodeChefService from './codechef.service.js';
import * as GFGService from './gfg.service.js';

const AggregateService = {
  aggregateAll({ github, leet, codechef, gfg }) {
    const totalSolved = (leet && leet.total_solved || 0) + (codechef && codechef.problems_solved || 0) + (gfg && gfg.problems_solved || 0);
    const totalContests = (leet && (leet.contest_count || 0)) + (codechef && (codechef.contests || 0)) + (gfg && (gfg.contests || 0));
    const totalRepositories = (github && github.public_repositories) || 0;
    const totalStars = (github && github.stars_received) || 0;

    const platforms = [];
    if (github) platforms.push({ platform: 'github', stats: { repositories: github.public_repositories, stars: github.stars_received } });
    if (leet) platforms.push({ platform: 'leetcode', stats: { total_solved: leet.total_solved } });
    if (codechef) platforms.push({ platform: 'codechef', stats: { problems_solved: codechef.problems_solved } });
    if (gfg) platforms.push({ platform: 'gfg', stats: { problems_solved: gfg.problems_solved } });

    const recentActivity = []; // placeholder: clients can fetch each platform's recent activity

    const combinedHeatmap = this.mergeHeatmaps([ (leet && leet.calendar) || [], (codechef && codechef.heatmap) || [], (gfg && gfg.heatmap) || [] ]);
    const fallbackHeatmap = this.mergeHeatmaps([ (leet && leet.calendar) || [], (codechef && codechef.heatmap) || [], (gfg && gfg.heatmap) || [] ]);

    const skillBreakdown = github && github.languages ? github.languages.map(l => ({ language: l, weight: 1 })) : [];

    const achievements = [];

    return {
      totalSolved,
      totalContests,
      totalRepositories,
      totalStars,
      overallStreak: Math.max((leet && leet.streak && leet.streak.current) || 0),
      platforms,
      recentActivity,
      combinedHeatmap,
      skillBreakdown,
      achievements
    };
  },

  mergeHeatmaps(listOfHeatmaps = []) {
    // each heatmap is array of {date, count}
    const map = new Map();
    listOfHeatmaps.forEach((hm, idx) => {
      (hm || []).forEach(item => {
        const key = item.date;
        const existing = map.get(key) || { date: key, count: 0, details: [] };
        existing.count += item.count || 0;
        existing.details.push(Object.assign({ platform: `p${idx}` }, item));
        map.set(key, existing);
      });
    });
    return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
  },

  async getActivityTimeline() {
    // fetch recent activity from each platform if available
    const github = await GithubService.getGithubProfile().catch(() => null);
    const leet = await LeetService.getLeetCodeProfile().catch(() => null);
    const codechef = await CodeChefService.getCodeChefProfile().catch(() => null);
    const gfg = await GFGService.getGFGProfile().catch(() => null);

    const timeline = [];
    if (github && github.recent_repositories) {
      github.recent_repositories.forEach(r => timeline.push({ date: r.updatedAt, platform: 'github', type: 'repo_update', details: r }));
    }
    if (leet && leet.calendar) {
      leet.calendar.slice(-30).forEach(d => { if (d.count) timeline.push({ date: d.date, platform: 'leetcode', type: 'submission', count: d.count }); });
    }

    return timeline.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
};

export default AggregateService;
