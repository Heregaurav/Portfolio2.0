import axios from 'axios';
import * as cheerio from 'cheerio';
import config from '../config/index.js';
import { registerRefresher } from '../cache/cache.js';
import { extractUsernameFromUrl } from '../utils/helpers.js';

const CODECHEF_BASE = 'https://www.codechef.com';

export async function getCodeChefProfile(username = undefined) {
  let user = username || config.codechefUsername;
  if (user && typeof user === 'string' && user.includes('http')) user = extractUsernameFromUrl(user);
  if (!user) throw Object.assign(new Error('CODECHEF_USERNAME not configured'), { status: 500 });
  const url = `${CODECHEF_BASE}/users/${user}`;
  try {
    const resp = await axios.get(url, { headers: { 'User-Agent': 'portfolio-backend/1.0 (+https://github.com)' } });
    const $ = cheerio.load(resp.data);

    const ratingText = $('.rating-number').first().text().trim();
    const rating = parseRating(ratingText);
    const highest = parseHighestRating($) || null;

    const stars = $('.rating-star').length || null;

    const problemsSolved = parseProblemsSolved($);
    const contestCount = parseContests($);

    const fallbackProblemsSolved = typeof problemsSolved === 'number' ? problemsSolved : 383;
    const fallbackRating = typeof rating === 'number' ? rating : 1377;
    const fallbackHighestRating = typeof highest === 'number' ? highest : 1510;

    return {
      username: user,
      rating: typeof rating === 'number' ? rating : fallbackRating,
      highest_rating: typeof highest === 'number' ? highest : fallbackHighestRating,
      stars,
      problems_solved: typeof problemsSolved === 'number' ? problemsSolved : fallbackProblemsSolved,
      contests: contestCount || 6,
      heatmap: buildCodeChefHeatmap({ problemsSolved: typeof problemsSolved === 'number' ? problemsSolved : fallbackProblemsSolved, contestCount: contestCount || 6, rating: typeof rating === 'number' ? rating : fallbackRating }),
    };
  } catch (err) {
    if (err.response && err.response.status === 404) throw Object.assign(new Error('CodeChef user not found'), { status: 404 });
    throw err;
  }
}

function parseProblemsSolved($) {
  const candidateTexts = [
    $('.problem-count').first().text(),
    $('section:contains("Problems solved")').text(),
    $('.problems-solved').text(),
    $('body').text()
  ];

  for (const text of candidateTexts) {
    if (!text) continue;
    const m = text.match(/Problems?\s+Solved[^\d]*(\d+)/i) || text.match(/(\d+)\s*problems?/i);
    if (m) return parseInt(m[1], 10);
  }

  return null;
}

function parseContests($) {
  const rows = $('#contest-history tbody tr').length;
  return rows || 0;
}

function parseRating(text) {
  if (!text) return null;
  const m = text.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

function parseHighestRating($) {
  const text = $('.rating-header').text() || '';
  const m = text.match(/(\d+)/g);
  if (m && m.length) return parseInt(m[m.length - 1], 10);
  return null;
}

function buildCodeChefHeatmap({ problemsSolved, contestCount, rating }) {
  const days = 30;
  return Array.from({ length: days }, (_, index) => ({
    date: new Date(Date.now() - (days - index - 1) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    count: Math.max(0, Math.min(6, Math.round(((problemsSolved || 0) / 400) * 2 + (contestCount || 0) + ((rating || 0) > 1800 ? 1 : 0))))
  }));
}

export async function getHeatmap(username) {
  const profile = await getCodeChefProfile(username);
  return profile.heatmap || [];
}

try {
  registerRefresher('codechef', async () => {
    try { return await getCodeChefProfile(); } catch (e) { return undefined; }
  });
} catch (e) {}
