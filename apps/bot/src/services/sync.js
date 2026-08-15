// Sincronización de datos → base de datos (Supabase via Prisma)
// Dos listas de precios independientes, cada una con SU propio script,
// SU tabla y SU histórico:
//   - official: hoja AOTR (valores oficiales)   → OfficialPrice
//   - trade:    API externa (valores de tradeo) → TradePrice
//
// Ambas listas guardan los 3 precios (llaves · pergaminos · vizard):
//   - official: la hoja trae los que existan y se completan los faltantes
//               con las tasas del admin (RateConfig) via applyVizardConversion
//   - trade:    la API trae viz y el script calcula llaves/pergaminos
//               con las mismas tasas del admin
//
// Cada ejecución actualiza TODA la lista (upsert) y borra los items que
// ya no existen en la fuente → la lista refleja exactamente el origen.

import { prisma } from "@aotr/db";
import { loadItems } from "../data/sheetLoader.js";
import { fetchExternalItems, parseApiItem, findApiKeyRatio } from "./tradeApi.js";
import { normalizeSearchText, compactKey, stableId } from "../core/normalize.js";
import { midValue } from "../core/parseValue.js";
import { loadConfiguredRates, findVizardRate, applyVizardConversion } from "../core/rates.js";
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

    // Retención: mantener solo los últimos 30 registros (el admin muestra hasta 30)
    const keep = await prisma.syncLog.findMany({
      orderBy: { id: "desc" },
      take: 30,
      select: { id: true }
    });
    const keepIds = keep.map((k) => k.id);
    await prisma.syncLog.deleteMany({ where: { id: { notIn: keepIds } } });
  } catch (e) {
    console.error("⚠️ No se pudo registrar el sync_log:", e.message);
  }
}

const UPDATE_BATCH_SIZE = 25;
const UPDATE_MAX_RETRIES = 3;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function isStatementTimeout(error) {
  const message = String(error?.message ?? error);
  return message.includes("57014") || message.includes("statement timeout");
}

function valuesMatch(left, right) {
  if (left === right) return true;
  if (left == null || right == null) return false;
  if (typeof left === "number" && typeof right === "number") {
    // PostgreSQL/JSON puede devolver una precisión binaria apenas distinta
    // de la división hecha en JavaScript (p. ej. 10 / 3).
    return Math.abs(left - right) <= Math.max(Math.abs(left), Math.abs(right), 1) * 1e-12;
  }
  if (Array.isArray(left) && Array.isArray(right)) {
    return left.length === right.length && left.every((value, index) => valuesMatch(value, right[index]));
  }
  if (typeof left === "object" && typeof right === "object") {
    const leftKeys = Object.keys(left);
    const rightKeys = Object.keys(right);
    return (
      leftKeys.length === rightKeys.length &&
      leftKeys.every((key) => Object.hasOwn(right, key) && valuesMatch(left[key], right[key]))
    );
  }
  return false;
}

function rowChanged(existing, next) {
  return Object.entries(next).some(([key, value]) => !valuesMatch(existing[key], value));
}

// Upsert completo de una lista: crea los nuevos, actualiza los existentes
// y borra los que ya no vienen en la fuente (la lista = espejo del origen).
// Las actualizaciones se hacen en bloques pequeños: un lote de cientos de
// updates puede exceder el timeout del pooler de Supabase.
async function upsertAll(model, rows) {
  // Algunos nombres del origen normalizan a la misma clave. Conservamos la
  // última versión, igual que hacía el loop original, sin actualizar esa fila
  // varias veces dentro del mismo sync.
  const rowsById = new Map(rows.map((row) => [row.id, row]));
  const freshRows = [...rowsById.values()];
  if (freshRows.length !== rows.length) {
    console.warn(`⚠️ ${model.name}: ${rows.length - freshRows.length} duplicados por clave normalizada`);
  }

  const existing = await model.findMany();
  const existingById = new Map(existing.map((row) => [row.id, row]));
  const existingIds = new Set(existingById.keys());

  const creates = [];
  const updates = [];
  for (const row of freshRows) {
    if (existingIds.has(row.id)) {
      if (rowChanged(existingById.get(row.id), row)) updates.push(row);
    } else {
      creates.push(row);
    }
  }

  if (creates.length) {
    await model.createMany({ data: creates, skipDuplicates: true });
  }
  if (updates.length) {
    console.log(`📝 ${model.name}: ${updates.length} items modificados de ${freshRows.length}`);
  }
  for (let index = 0; index < updates.length; index += UPDATE_BATCH_SIZE) {
    const batch = updates.slice(index, index + UPDATE_BATCH_SIZE);
    for (let attempt = 0; attempt < UPDATE_MAX_RETRIES; attempt++) {
      try {
        await prisma.$transaction(
          batch.map((row) => model.update({ where: { id: row.id }, data: row }))
        );
        break;
      } catch (error) {
        const lastAttempt = attempt === UPDATE_MAX_RETRIES - 1;
        if (!isStatementTimeout(error) || lastAttempt) throw error;
        const delay = 500 * (attempt + 1);
        console.warn(
          `⏳ ${model.name}: timeout en lote ${index / UPDATE_BATCH_SIZE + 1}; reintentando en ${delay}ms`
        );
        await sleep(delay);
      }
    }
  }

  // Prune: items que ya no están en la fuente
  const freshIds = new Set(freshRows.map((r) => r.id));
  const stale = [...existingIds].filter((id) => !freshIds.has(id));
  if (stale.length) {
    await model.deleteMany({ where: { id: { in: stale } } });
    console.log(`🧹 ${model.name}: ${stale.length} items eliminados (ya no existen en la fuente)`);
  }

  return freshRows.length;
}

// ── Oficial (hoja AOTR) ─────────────────────────────────
export const syncOfficial = withLock(async () => {
  const started = now();
  try {
    const rawItems = await loadItems();

    // Completar los 3 precios con las tasas del admin (o detectadas)
    const configured = await loadConfiguredRates();
    const vizardRate = findVizardRate(rawItems, configured);
    const items = applyVizardConversion(rawItems, vizardRate);

    const rows = items.map((item) => ({
      id: stableId(compactKey(item.name)),
      name: item.name,
      normalized: normalizeSearchText(item.name),
      slug: normalizeSearchText(item.name).replace(/\s+/g, "-"),
      category: item.category ?? null,
      rarityLabel: item.rarity ?? null,
      demand: item.demand ?? null,
      keys: item.value.keys ?? null,
      scrolls: item.value.scrolls ?? null,
      vizards: item.value.vizards ?? null,
      rateOfChange: item.rateOfChange ?? null,
      taxGems: item.taxGems,
      taxGold: item.taxGold,
      sheet: item.sheet ?? null,
      existingAmount: item.existingAmount ?? null,
      image: item.image ?? null
    }));

    await upsertAll(prisma.officialPrice, rows);

    if (DEFAULTS.historyOnSync) {
      await recordOfficialHistory(items);
    }

    console.log(`✅ Sync oficial: ${rows.length} items (${now() - started}ms)`);
    await logSync("official", "ok", rows.length, null, now() - started);
    return { rows: rows.length };
  } catch (error) {
    console.error("❌ Error en sync oficial:", error.message);
    await logSync("official", "error", null, error.message, now() - started);
    throw error;
  }
});

// ── Histórico oficial (las 3 monedas por sync) ───────────
export async function recordOfficialHistory(items) {
  try {
    const nowDate = new Date();
    const data = items
      .filter((item) => item.value.keys != null || item.value.vizards != null)
      .map((item) => ({
        itemId: stableId(compactKey(item.name)),
        keys: midValue(item.value.keys),
        scrolls: midValue(item.value.scrolls),
        vizards: midValue(item.value.vizards),
        recordedAt: nowDate
      }));

    if (!data.length) return;

    const result = await prisma.officialPriceHistory.createMany({ data, skipDuplicates: true });
    if (result.count > 0) {
      console.log(`📈 Histórico oficial: ${result.count} registros nuevos`);
    }
  } catch (error) {
    console.error("⚠️ Error registrando histórico oficial:", error.message);
  }
}

// ── Trade (API externa) ─────────────────────────────────
export const syncTrade = withLock(async () => {
  const started = now();
  try {
    const rawRows = await fetchExternalItems();
    const rows = rawRows.map(parseApiItem);

    // Ratio llave→vizard de la propia API (item "Key")
    apiKeyRatio.value = findApiKeyRatio(rows);
    apiKeyRatio.at = started;

    // Tasas del admin para normalizar la API (viz → llaves → pergaminos)
    const rates = (await loadConfiguredRates()) ?? { keysPerVizard: 900.9, keysPerScroll: 3 };
    const keysPerVizard = rates.keysPerVizard;
    const keysPerScroll = rates.keysPerScroll;

    const dbRows = rows.map((item) => {
      const keys = item.value != null ? item.value * keysPerVizard : null;
      const scrolls = keys != null ? keys / keysPerScroll : null;

      return {
        id: stableId(compactKey(item.name)),
        name: item.name,
        normalized: normalizeSearchText(item.name),
        slug: normalizeSearchText(item.name).replace(/\s+/g, "-"),
        category: item.category ?? null,
        rarityPct: item.rarityPct,
        emoji: item.emoji,
        value: item.value, // viz original de la API
        keys, // calculado
        scrolls, // calculado
        demand: item.demand,
        rateOfChange: item.rateOfChange,
        prestige: item.prestige,
        status: item.status,
        obtainedFrom: item.obtainedFrom,
        taxGems: item.gemTax,
        taxGold: item.goldTax,
        apiId: item.id ?? null,
        apiUpdatedAt: item.updatedAt ? new Date(item.updatedAt) : null
      };
    });

    await upsertAll(prisma.tradePrice, dbRows);

    if (DEFAULTS.historyOnSync) {
      await recordTradeHistory(rows);
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

// ── Histórico de tradeo (una instantánea por item por sync) ──
export async function recordTradeHistory(apiRows) {
  try {
    const nowDate = new Date();
    const data = apiRows
      .filter((item) => item.value !== null)
      .map((item) => ({
        itemId: stableId(compactKey(item.name)),
        value: item.value,
        demand: item.demand,
        recordedAt: nowDate
      }));

    if (!data.length) return;

    const result = await prisma.tradePriceHistory.createMany({ data, skipDuplicates: true });
    if (result.count > 0) {
      console.log(`📈 Histórico trade: ${result.count} registros nuevos`);
    }
  } catch (error) {
    console.error("⚠️ Error registrando histórico trade:", error.message);
  }
}

// ── Limpieza de histórico (ambas listas) ─────────────────
export async function cleanupHistory(days = DEFAULTS.historyRetentionDays) {
  try {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const [officialResult, tradeResult] = await Promise.all([
      prisma.officialPriceHistory.deleteMany({ where: { recordedAt: { lt: cutoff } } }),
      prisma.tradePriceHistory.deleteMany({ where: { recordedAt: { lt: cutoff } } })
    ]);
    const total = officialResult.count + tradeResult.count;
    if (total > 0) {
      console.log(`🧹 Histórico: ${total} registros antiguos eliminados`);
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
