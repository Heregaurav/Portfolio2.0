import axios from 'axios';

export async function fetchJson(url, opts = {}) {
  try {
    const res = await axios({ url, method: opts.method || 'GET', headers: opts.headers || {}, data: opts.body || undefined, timeout: opts.timeout || 30_000 });
    return res.data;
  } catch (err) {
    const e = new Error('Network request failed');
    e.original = err;
    e.status = err.response ? err.response.status : 500;
    throw e;
  }
}

export default fetchJson;
