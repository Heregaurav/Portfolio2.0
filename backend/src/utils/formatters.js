export function mergeMapsByDate(arrays) {
  const map = new Map();
  arrays.forEach(arr => (arr || []).forEach(item => {
    const d = item.date;
    const existing = map.get(d) || { date: d, count: 0, items: [] };
    existing.count += item.count || 0;
    existing.items.push(item);
    map.set(d, existing);
  }));
  return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
}
