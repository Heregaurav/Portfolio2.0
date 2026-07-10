export function safeNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export function groupBy(arr, keyFn) {
  return (arr || []).reduce((acc, item) => {
    const k = keyFn(item);
    acc[k] = acc[k] || [];
    acc[k].push(item);
    return acc;
  }, {});
}

export default { safeNumber, groupBy };

/**
 * Extract a probable username from a profile URL.
 * Works for common platforms (github, leetcode, codechef, geeksforgeeks).
 * If input is already a plain username, it is returned unchanged.
 */
export function extractUsernameFromUrl(input) {
  if (!input) return null;
  if (!input.includes('http')) return input;
  try {
    const u = new URL(input);
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts.length === 0) return null;
    // For patterns like /users/<username> (codechef) or /user/<username> (gfg)
    const last = parts[parts.length - 1];
    // handle cases where username is preceded by 'users' or 'user' or 'u'
    const idxUser = parts.findIndex(p => ['users', 'user', 'u', 'profile'].includes(p));
    if (idxUser >= 0 && parts[idxUser + 1]) return parts[idxUser + 1];
    // fallback: return last segment
    return last;
  } catch (e) {
    return null;
  }
}
