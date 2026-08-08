import Fuse from "fuse.js";
import type { Item } from "./types";

let fuseCache: Fuse<Item> | null = null;

export function getFuse(items: Item[]): Fuse<Item> {
  if (!fuseCache) {
    fuseCache = new Fuse(items, {
      keys: [
        { name: "name", weight: 3 },
        { name: "category", weight: 1 },
        { name: "obtainedFrom", weight: 0.5 }
      ],
      threshold: 0.35,
      ignoreLocation: true,
      minMatchCharLength: 2
    });
  }
  return fuseCache;
}

export function searchItems(
  items: Item[],
  query: string,
  limit = 8
): Item[] {
  const q = query.trim();
  if (!q) return [];

  const exact = items.filter(
    (i) => i.name.toLowerCase() === q.toLowerCase()
  );
  if (exact.length > 0) return exact.slice(0, limit);

  return getFuse(items)
    .search(q)
    .slice(0, limit)
    .map((r) => r.item);
}
