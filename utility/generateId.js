export default function generateId(items) {
  const maxId = items.length > 0 ? Math.max(...items.map((n) => n.id)) : 0;
  return maxId + 1;
}
