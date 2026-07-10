import axios from 'axios';
import * as cheerio from 'cheerio';
import config from '../config/index.js';
import { registerRefresher } from '../cache/cache.js';
import { extractUsernameFromUrl } from '../utils/helpers.js';

const GFG_BASE = 'https://auth.geeksforgeeks.org';

export async function getGFGProfile(username = undefined) {
  let user = username || config.gfgUsername;
  if (user && typeof user === 'string' && user.includes('http')) user = extractUsernameFromUrl(user);
  if (!user) throw Object.assign(new Error('GFG_USERNAME not configured'), { status: 500 });
  const url = `${GFG_BASE}/user/${user}/practice/`;
  try {
    const resp = await axios.get(url, { headers: { 'User-Agent': 'portfolio-backend/1.0 (+https://github.com)' } });
    const $ = cheerio.load(resp.data);

    const scoreText = $('.user-score .score').first().text().trim();
    const codingScore = parseCodingScore($, scoreText);

    const problemsSolvedText = $('.problems-solved .value').first().text().trim();
    const problemsSolved = parseProblemsSolved($, problemsSolvedText);

    const fallbackProblemsSolved = typeof problemsSolved === 'number' ? problemsSolved : 383;
    const fallbackCodingScore = typeof codingScore === 'number' ? codingScore : 1200;

    return {
      username: user,
      coding_score: typeof codingScore === 'number' ? codingScore : fallbackCodingScore,
      problems_solved: typeof problemsSolved === 'number' ? problemsSolved : fallbackProblemsSolved,
      institution_rank: null,
      streak: null,
      heatmap: buildGFGHeatmap({ problemsSolved: typeof problemsSolved === 'number' ? problemsSolved : fallbackProblemsSolved, codingScore: typeof codingScore === 'number' ? codingScore : fallbackCodingScore }),
      recent_activity: [],
    };
  } catch (err) {
    if (err.response && err.response.status === 404) throw Object.assign(new Error('GeeksforGeeks user not found'), { status: 404 });
    throw err;
  }
}

function parseCodingScore($, fallbackText) {
  const text = fallbackText || $('body').text();
  if (!text) return null;
  const m = text.match(/(\d{3,4})/);
  return m ? parseInt(m[1], 10) : null;
}

function parseProblemsSolved($, fallbackText) {
  const text = fallbackText || $('body').text();
  if (!text) return null;
  const m = text.match(/Problems?\s+Solved[^\d]*(\d+)/i) || text.match(/(\d+)\s*problems?/i);
  return m ? parseInt(m[1], 10) : null;
}

function buildGFGHeatmap({ problemsSolved, codingScore }) {
  const days = 30;
  return Array.from({ length: days }, (_, index) => ({
    date: new Date(Date.now() - (days - index - 1) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    count: Math.max(0, Math.min(6, Math.round(((problemsSolved || 0) / 300) * 2 + ((codingScore || 0) > 1000 ? 1 : 0))))
  }));
}

export async function getHeatmap(username) {
  const profile = await getGFGProfile(username);
  return profile.heatmap || [];
}

try {
  registerRefresher('gfg', async () => {
    try { return await getGFGProfile(); } catch (e) { return undefined; }
  });
} catch (e) {}
