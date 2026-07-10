import axios from 'axios';
import config from '../config/index.js';
import { registerRefresher } from '../cache/cache.js';
import { extractUsernameFromUrl } from '../utils/helpers.js';

const LEETCODE_API = 'https://leetcode.com/graphql';

const profileQuery = `query userProfile($username: String!) {
  matchedUser(username: $username) {
    username
    profile {
      userAvatar
      reputation
      ranking
      aboutMe
    }
    submitStats {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
      totalSubmissionNum {
        difficulty
        count
        submissions
      }
    }
    languageProblemCount {
      languageName
      problemsSolved
    }
    userCalendar {
      streak
    }
  }
}`;

export async function getLeetCodeProfile(username = undefined) {
  let user = username || config.leetcodeUsername;
  if (user && typeof user === 'string' && user.includes('http')) user = extractUsernameFromUrl(user);
  if (!user) throw Object.assign(new Error('LEETCODE_USERNAME not configured'), { status: 500 });
  try {
    const resp = await axios.post(LEETCODE_API, { query: profileQuery, variables: { username: user } }, { headers: { 'Content-Type': 'application/json' } });
    const data = resp.data;
    if (data.errors) throw Object.assign(new Error('LeetCode error'), { details: data.errors, status: 502 });
    const m = data.data.matchedUser;
    if (!m) throw Object.assign(new Error('LeetCode user not found'), { status: 404 });

    const easy = (m.submitStats.acSubmissionNum.find(s => s.difficulty === 'Easy') || {}).count || 0;
    const medium = (m.submitStats.acSubmissionNum.find(s => s.difficulty === 'Medium') || {}).count || 0;
    const hard = (m.submitStats.acSubmissionNum.find(s => s.difficulty === 'Hard') || {}).count || 0;
    const total = easy + medium + hard;

    return {
      username: m.username,
      avatar: m.profile.userAvatar,
      reputation: m.profile.reputation,
      ranking: m.profile.ranking,
      easy_solved: easy,
      medium_solved: medium,
      hard_solved: hard,
      total_solved: total,
      calendar: transformCalendar(m.calendar),
      streak: { current: m.calendar ? (m.calendar.currentStreak || 0) : 0, longest: m.calendar ? (m.calendar.longestStreak || 0) : 0 }
    };
  } catch (err) {
    if (err.response && err.response.status === 429) throw Object.assign(new Error('LeetCode rate limit'), { status: 429 });
    throw err;
  }
}

function transformCalendar(cal) {
  if (!cal) return [];
  // LeetCode returns an object; not always consistent — best-effort
  if (Array.isArray(cal)) return cal.map(c => ({ date: c.date, count: c.contributionCount }));
  return [];
}

export async function getHeatmap(username) {
  const profile = await getLeetCodeProfile(username);
  return profile.calendar || [];
}

try {
  registerRefresher('leetcode', async () => {
    try { return await getLeetCodeProfile(); } catch (e) { return undefined; }
  });
} catch (e) {}
