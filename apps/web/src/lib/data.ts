import type { HistoryPoint, Item, ItemMover, Meta } from "./types";
import seed from "./seed/items.json";
import metaSeed from "./seed/meta.json";

// ═════════════════════════════════════════════════════════
// Fuente de datos: si DATABASE_URL está configurada usa Supabase
// (vía Prisma) con caché TTL; si no, usa el seed local real.
//
// La BD tiene 2 listas de precios independientes:
//   · OfficialPrice → precios oficiales (hoja AOTR)
//   · TradePrice    → precios de tradeo (API externa)
// Aquí se fusionan por id (stableId del nombre) en el shape plano
// que consumen las páginas. Lo único compartido entre listas es
// la identidad (id/name/slug). Cada fuente conserva su propia imagen.
// ═════════════════════════════════════════════════════════

const CACHE_TTL = 5 * 60 * 1000; // 5 min (alineado con revalidate)
const HISTORY_DAYS = 60;

let dbCache: { items: Item[]; at: number } | null = null;
let dbFailedAt = 0; // marca el último fallo de BD para no reintentar en cada request

function toVal(json: any): any {
  return json === null || json === undefined ? null : json;
}

// Fusiona una fila oficial (o) y una de trade (t) en el Item de la web.
// Si una de las dos no existe (item solo en una lista), la otra queda null.
function mapDbRow(o: any, t: any): Item {
  const official = o ?? null;
  const trade = t ?? null;

  return {
    id: official?.id ?? trade?.id,
    name: official?.name ?? trade?.name,
    normalized: official?.normalized ?? trade?.normalized,
    slug: official?.slug ?? trade?.slug,
    category: official?.category ?? trade?.category,
    rarityLabel: official?.rarityLabel ?? null,
    rarityPct: trade?.rarityPct ?? null,
    status: trade?.status ?? null,
    obtainedFrom: trade?.obtainedFrom ?? null,
    officialImage: official?.image ?? null,
    emoji: trade?.emoji ?? null,
    demandApi: trade?.demand ?? null,
    demandOfficial: official?.demand ?? null,
    valueOfficial: official
      ? {
          keys: toVal(official.keys),
          scrolls: toVal(official.scrolls),
          vizards: toVal(official.vizards)
        }
      : null,
    apiValue: trade?.value ?? null,
    apiKeys: trade?.keys ?? null,
    apiScrolls: trade?.scrolls ?? null,
    rateOfChange: trade?.rateOfChange ?? null,
    taxGems: trade?.taxGems ?? official?.taxGems ?? null,
    taxGold: trade?.taxGold ?? official?.taxGold ?? null,
    source: official && trade ? "both" : official ? "official" : "api",
    history: [],

    // ── Fuente oficial (hoja AOTR) ─────────────────────────
    sheet: toVal(official?.sheet),
    existingAmount: toVal(official?.existingAmount),
    officialRate: toVal(official?.rateOfChange),
    officialTaxGems: toVal(official?.taxGems),
    officialTaxGold: toVal(official?.taxGold),

    // ── Fuente trade (API externa) ────────────────────────
    apiId: toVal(trade?.apiId),
    prestige: toVal(trade?.prestige),
    updatedAt: trade?.apiUpdatedAt ? new Date(trade.apiUpdatedAt).toISOString() : null,
    apiTaxGems: toVal(trade?.taxGems),
    apiTaxGold: toVal(trade?.taxGold)
  };
}

async function loadFromDb(): Promise<Item[]> {
  const { prisma } = await import("@aotr/db");

  const [officialRows, tradeRows, tradeHistoryRows, officialHistoryRows] = await Promise.all([
    prisma.officialPrice.findMany(),
    prisma.tradePrice.findMany(),
    prisma.tradePriceHistory.findMany({
      where: { recordedAt: { gte: new Date(Date.now() - HISTORY_DAYS * 86400000) } },
      orderBy: { recordedAt: "asc" },
      select: { itemId: true, value: true, recordedAt: true }
    }),
    prisma.officialPriceHistory.findMany({
      where: { recordedAt: { gte: new Date(Date.now() - HISTORY_DAYS * 86400000) } },
      orderBy: { recordedAt: "asc" },
      select: { itemId: true, vizards: true, recordedAt: true }
    })
  ]);

  const officialById = new Map(officialRows.map((r: any) => [r.id, r]));
  const tradeById = new Map(tradeRows.map((r: any) => [r.id, r]));

  // Unión de ambas listas: items que existen en cualquiera de las dos
  const ids = new Set([...officialById.keys(), ...tradeById.keys()]);

  const items: Item[] = [...ids].map((id) => mapDbRow(officialById.get(id), tradeById.get(id)));

  // Mapas de histórico real desde Supabase
  const tradeHistoryByItem = new Map<string, HistoryPoint[]>();
  for (const h of tradeHistoryRows) {
    if (h.value === null) continue;
    const list = tradeHistoryByItem.get(h.itemId) ?? [];
    list.push({ ts: h.recordedAt.toISOString(), value: h.value });
    tradeHistoryByItem.set(h.itemId, list);
  }

  const officialHistoryByItem = new Map<string, HistoryPoint[]>();
  for (const h of officialHistoryRows) {
    if (h.vizards === null) continue;
    const list = officialHistoryByItem.get(h.itemId) ?? [];
    list.push({ ts: h.recordedAt.toISOString(), value: h.vizards });
    officialHistoryByItem.set(h.itemId, list);
  }

  for (const item of items) {
    // Si el item tiene historial de tradeo, lo usamos; si no, su historial oficial
    item.history = tradeHistoryByItem.get(item.id) ?? officialHistoryByItem.get(item.id) ?? [];
  }

  items.sort((a, b) => a.name.localeCompare(b.name));
  return items;
}

export async function getItems(): Promise<Item[]> {
  if (process.env.DATABASE_URL) {
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

// ── Movimientos (tendencias) — calcula cambios reales (> 0% o < 0%) ──
export function computeMovers(
  items: Item[],
  limit = 8
): { gainers: ItemMover[]; losers: ItemMover[]; volatile: ItemMover[] } {
  const gainersList: ItemMover[] = [];
  const losersList: ItemMover[] = [];
  const volatileList: ItemMover[] = [];

  for (const item of items) {
    if (!item.history || item.history.length < 2) continue;

    const first = item.history[0].value;
    const last = item.history[item.history.length - 1].value;
    if (first == null || last == null || first <= 0) continue;

    const changeAbs = last - first;
    const changePct = (changeAbs / first) * 100;

    const volatility = Math.max(
      ...item.history.map(
        (p) => Math.abs((p.value - first) / first) * 100
      )
    );

    if (changePct > 0.01) {
      gainersList.push({ item, changePct, changeAbs, direction: "up", volatility });
    } else if (changePct < -0.01) {
      losersList.push({ item, changePct, changeAbs, direction: "down", volatility });
    }

    if (volatility > 0.01) {
      volatileList.push({
        item,
        changePct,
        changeAbs,
        direction: changeAbs >= 0 ? "up" : "down",
        volatility
      });
    }
  }

  return {
    gainers: gainersList.sort((a, b) => b.changePct - a.changePct).slice(0, limit),
    losers: losersList.sort((a, b) => a.changePct - b.changePct).slice(0, limit),
    volatile: volatileList.sort((a, b) => b.volatility - a.volatility).slice(0, limit)
  };
}
