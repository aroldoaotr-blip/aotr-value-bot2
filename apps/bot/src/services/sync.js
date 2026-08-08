// Sincronización de datos → base de datos (Supabase via Prisma)
//  - official: hoja AOTR (valores oficiales)
//  - trade:    API externa (valores de tradeo)
//  - histórico: PriceHistory por item (bulk)

import { prisma } from "@aotr/db";
import { loadItems } from "../data/sheetLoader.js";
import { fetchExternalItems, parseApiItem, findApiKeyRatio } from "./tradeApi.js";
import { normalizeSearchText, compactKey, stableId } from "../core/normalize.js";
import { midValue } from "../core/parseValue.js";
import { DEFAULTS } from "../config/constants.js";

export const apiKeyRatio = { value: null, at: 0 };

const now = () => Date.now();

// ── Semáforo anti concurrencia (interval + manual + reinicios) ──
let syncing = false;
function withLock(fn) {
  return async (...args) => {
    if (syncing) {
      console.warn("⏳ Sincronización ya en curso — ignorando llamada paralela");
      return { skipped: true };
    }
    syncing = true;
    try {
      return await fn(...args);
    } finally {
      syncing = false;
    }
  };
}

async function logSync(source, status, rows = null, error = null, durationMs = null) {
  try {
    await prisma.syncLog.create({
      data: {
        source,
        status,
        rows,
        error: error ? String(error).slice(0, 500) : null,
        durationMs
      }
    });
  } catch (e) {
    console.error("⚠️ No se pudo registrar el sync_log:", e.message);
  }
}

// ── Oficial (hoja AOTR) ─────────────────────────────────
export const syncOfficial = withLock(async () => {
  const started = now();
  try {
    const items = await loadItems();
    const existing = await prisma.item.findMany({
      select: { id: true, source: true }
    });
    const existingMap = new Map(existing.map((e) => [e.id, e.source]));

    const creates = [];
    const updates = [];

    for (const item of items) {
      const id = stableId(compactKey(item.name));
      const normalized = normalizeSearchText(item.name);

      const data = {
        name: item.name,
        normalized,
        slug: normalized.replace(/\s+/g, "-"),
        category: item.category ?? null,
        rarityLabel: item.rarity ?? null,
        officialKeys: item.value.keys ?? null,
        officialScrolls: item.value.scrolls ?? null,
        officialVizards: item.value.vizards ?? null,
        officialDemand: item.demand ?? null,
        officialRate: item.rateOfChange ?? null,
        officialTaxGems: item.taxGems,
        officialTaxGold: item.taxGold,
        sheet: item.sheet ?? null,
        existingAmount: item.existingAmount ?? null
      };

      const current = existingMap.get(id);
      if (current === undefined) {
        creates.push({ id, ...data, source: "official" });
      } else {
        updates.push(prisma.item.update({
          where: { id },
          data: { ...data, source: current === "api" ? "both" : current }
        }));
      }
    }

    if (creates.length) {
      await prisma.item.createMany({ data: creates, skipDuplicates: true });
    }
    if (updates.length) {
      await prisma.$transaction(updates);
    }

    console.log(`✅ Sync oficial: ${items.length} items (${now() - started}ms)`);
    await logSync("official", "ok", items.length, null, now() - started);
    return { rows: items.length };
  } catch (error) {
    console.error("❌ Error en sync oficial:", error.message);
    await logSync("official", "error", null, error.message, now() - started);
    throw error;
  }
});

// ── Trade (API externa) ─────────────────────────────────
export const syncTrade = withLock(async () => {
  const started = now();
  try {
    const rawRows = await fetchExternalItems();
    const rows = rawRows.map(parseApiItem);

    // Ratio llave→vizard de la propia API (item "Key")
    apiKeyRatio.value = findApiKeyRatio(rows);
    apiKeyRatio.at = started;

    const existing = await prisma.item.findMany({
      select: { id: true, source: true }
    });
    const existingMap = new Map(existing.map((e) => [e.id, e.source]));

    const creates = [];
    const updates = [];

    for (const item of rows) {
      const id = stableId(compactKey(item.name));
      const normalized = normalizeSearchText(item.name);

      const data = {
        name: item.name,
        normalized,
        slug: normalized.replace(/\s+/g, "-"),
        category: item.category ?? null,
        rarityPct: item.rarityPct,
        status: item.status ?? null,
        obtainedFrom: item.obtainedFrom,
        emoji: item.emoji,
        apiValue: item.value,
        apiDemand: item.demand,
        apiRateOfChange: item.rateOfChange,
        apiPrestige: item.prestige,
        apiTaxGems: item.gemTax,
        apiTaxGold: item.goldTax,
        apiUpdatedAt: item.updatedAt ? new Date(item.updatedAt) : null,
        apiId: item.id ?? null
      };

      const current = existingMap.get(id);
      if (current === undefined) {
        creates.push({ id, ...data, source: "api" });
      } else {
        updates.push(prisma.item.update({
          where: { id },
          data: { ...data, source: current === "official" ? "both" : current }
        }));
      }
    }

    if (creates.length) {
      await prisma.item.createMany({ data: creates, skipDuplicates: true });
    }
    if (updates.length) {
      await prisma.$transaction(updates);
    }

    if (DEFAULTS.historyOnSync) {
      await recordHistoryBulk(rows);
    }

    console.log(`✅ Sync trade: ${rows.length} items (${now() - started}ms)`);
    await logSync("trade", "ok", rows.length, null, now() - started);
    return {
      rows: rows.length,
      data: rows.map((item) => ({ ...item, normalized: normalizeSearchText(item.name) })),
      keyRatio: apiKeyRatio.value
    };
  } catch (error) {
    console.error("❌ Error en sync trade:", error.message);
    await logSync("trade", "error", null, error.message, now() - started);
    throw error;
  }
});

// ── Histórico de precios (bulk: una instantánea por item por sync) ──
export async function recordHistoryBulk(apiRows) {
  try {
    const nowDate = new Date();
    const data = apiRows
      .filter((item) => item.value !== null)
      .map((item) => ({
        itemId: stableId(compactKey(item.name)),
        apiValue: item.value,
        demand: item.demand,
        recordedAt: nowDate
      }));

    if (!data.length) return;

    const result = await prisma.priceHistory.createMany({ data, skipDuplicates: true });
    if (result.count > 0) {
      console.log(`📈 Histórico: ${result.count} registros nuevos`);
    }
  } catch (error) {
    console.error("⚠️ Error registrando histórico:", error.message);
  }
}

export async function cleanupHistory(days = DEFAULTS.historyRetentionDays) {
  try {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const result = await prisma.priceHistory.deleteMany({
      where: { recordedAt: { lt: cutoff } }
    });
    if (result.count > 0) {
      console.log(`🧹 Histórico: ${result.count} registros antiguos eliminados`);
    }
  } catch (error) {
    console.error("⚠️ Error limpiando histórico:", error.message);
  }
}

export async function syncAll({ official = true, trade = true } = {}) {
  const results = {};
  if (trade) results.trade = await syncTrade().catch((e) => ({ error: e.message }));
  if (official) results.official = await syncOfficial().catch((e) => ({ error: e.message }));
  return results;
}
