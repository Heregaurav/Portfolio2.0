export function toISO(date) {
  return new Date(date).toISOString().split('T')[0];
}

export function daysBetween(a, b) {
  const ad = new Date(a).setHours(0,0,0,0);
  const bd = new Date(b).setHours(0,0,0,0);
  return Math.round((bd - ad) / (1000 * 60 * 60 * 24));
}

export default { toISO, daysBetween };
