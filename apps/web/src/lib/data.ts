import type { HistoryPoint, Item, ItemMover, Meta } from "./types";
import seed from "./seed/items.json";
import metaSeed from "./seed/meta.json";

// ═════════════════════════════════════════════════════════
// Fuente de datos: si DATABASE_URL está configurada usa Supabase
// (vía Prisma) con caché TTL; si no, usa el seed local real.
// ═════════════════════════════════════════════════════════

const CACHE_TTL = 5 * 60 * 1000; // 5 min (alineado con revalidate)
const HISTORY_DAYS = 60;

let dbCache: { items: Item[]; at: number } | null = null;
let dbFailedAt = 0; // marca el último fallo de BD para no reintentar en cada request

function toVal(json: any): any {
  return json === null || json === undefined ? null : json;
}

function mapDbRow(row: any): Item {
  const keyRatio = seed.apiKeyValue;
  return {
    id: row.id,
    name: row.name,
    normalized: row.normalized,
    slug: row.slug,
    category: row.category,
    rarityLabel: row.rarityLabel,
    rarityPct: row.rarityPct,
    status: row.status,
    obtainedFrom: row.obtainedFrom,
    emoji: row.emoji,
    demandApi: row.apiDemand,
    demandOfficial: row.officialDemand,
    valueOfficial: {
      keys: toVal(row.officialKeys),
      scrolls: toVal(row.officialScrolls),
      vizards: toVal(row.officialVizards)
    },
    apiValue: row.apiValue,
    apiKeys: row.apiValue != null && keyRatio ? row.apiValue / keyRatio : null,
    apiScrolls:
      row.apiValue != null && keyRatio ? row.apiValue / keyRatio / 3 : null,
    rateOfChange: row.apiRateOfChange,
    taxGems: row.apiTaxGems ?? row.officialTaxGems,
    taxGold: row.apiTaxGold ?? row.officialTaxGold,
    source: row.source,
    history: [],

    // Fuente oficial (hoja AOTR)
    sheet: toVal(row.sheet),
    existingAmount: toVal(row.existingAmount),
    officialRate: toVal(row.officialRate),
    officialTaxGems: toVal(row.officialTaxGems),
    officialTaxGold: toVal(row.officialTaxGold),

    // Fuente trade (API externa)
    apiId: toVal(row.apiId),
    prestige: toVal(row.apiPrestige),
    updatedAt: row.apiUpdatedAt ? row.apiUpdatedAt.toISOString() : null,
    apiTaxGems: toVal(row.apiTaxGems),
    apiTaxGold: toVal(row.apiTaxGold)
  };
}

async function loadFromDb(): Promise<Item[]> {
  const { prisma } = await import("@aotr/db");

  const [rows, historyRows] = await Promise.all([
    prisma.item.findMany({ orderBy: { name: "asc" } }),
    prisma.priceHistory.findMany({
      where: { recordedAt: { gte: new Date(Date.now() - HISTORY_DAYS * 86400000) } },
      orderBy: { recordedAt: "asc" },
      select: { itemId: true, apiValue: true, recordedAt: true }
    })
  ]);

  const items = rows.map(mapDbRow);

  // Agrupar histórico por item (una sola consulta para todo)
  if (historyRows.length) {
    const historyByItem = new Map<string, HistoryPoint[]>();
    for (const h of historyRows) {
      if (h.apiValue === null) continue;
      const list = historyByItem.get(h.itemId) ?? [];
      list.push({ ts: h.recordedAt.toISOString(), value: h.apiValue });
      historyByItem.set(h.itemId, list);
    }

    for (const item of items) {
      item.history = historyByItem.get(item.id) ?? [];
    }
  }

  return items;
}

export async function getItems(): Promise<Item[]> {
  if (process.env.DATABASE_URL) {
    // Reintenta solo si pasó el TTL desde el último fallo (evita esperar
    // el timeout de Prisma en cada request cuando la BD no tiene tablas).
    if (Date.now() - dbFailedAt > CACHE_TTL && (!dbCache || Date.now() - dbCache.at > CACHE_TTL)) {
      try {
        const items = await loadFromDb();
        dbCache = { items, at: Date.now() };
      } catch (error) {
        console.warn("⚠️ No se pudo leer la BD, usando seed local:", error);
        dbCache = null;
        dbFailedAt = Date.now();
      }
    }
    if (dbCache && dbCache.items.length > 0) return dbCache.items;
  }
  return (seed as any).items as Item[];
}

export function getMeta(): Meta {
  return metaSeed as Meta;
}

// ── Movimientos (tendencias) ─────────────────────────────
export function computeMovers(
  items: Item[],
  limit = 8
): { gainers: ItemMover[]; losers: ItemMover[]; volatile: ItemMover[] } {
  const withChange: ItemMover[] = [];

  for (const item of items) {
    if (!item.history || item.history.length < 2) continue;

    const first = item.history[0].value;
    const last = item.history[item.history.length - 1].value;
    if (!first || !last) continue;

    const changeAbs = last - first;
    const changePct = (changeAbs / Math.abs(first)) * 100;

    const volatility =
      Math.max(
        ...item.history.map(
          (p) => Math.abs((p.value - first) / Math.abs(first || 1)) * 100
        )
      );

    withChange.push({ item, changePct, changeAbs, direction: changeAbs >= 0 ? "up" : "down", volatility });
  }

  const sorted = [...withChange].sort((a, b) => b.changePct - a.changePct);

  return {
    gainers: sorted.filter((m) => m.direction === "up").slice(0, limit),
    losers: sorted.filter((m) => m.direction === "down").slice(0, limit),
    volatile: [...withChange].sort((a, b) => b.volatility - a.volatility).slice(0, limit)
  };
}
