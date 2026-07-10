import NodeCache from 'node-cache';
import config from '../config/index.js';

const ttlSeconds = config.cacheTtlMinutes * 60;
const cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: 120 });

// map of key -> async refresher function
const refreshers = new Map();

cache.on('expired', async (key, value) => {
  try {
    const refresher = refreshers.get(key);
    if (refresher && typeof refresher === 'function') {
      // attempt to refresh in background
      const newVal = await refresher();
      if (newVal !== undefined) {
        cache.set(key, newVal);
      }
    }
  } catch (err) {
    // ignore refresher errors to avoid crashing
    // logging could be added here
  }
});

export function registerRefresher(key, asyncFn) {
  if (!key || typeof asyncFn !== 'function') return false;
  refreshers.set(key, asyncFn);
  return true;
}

export function getCached(key) {
  return cache.get(key);
}

export function setCached(key, value) {
  return cache.set(key, value);
}

export function delCached(key) {
  return cache.del(key);
}

export default cache;
