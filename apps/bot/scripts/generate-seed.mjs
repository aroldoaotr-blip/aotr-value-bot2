// Genera el seed de datos para la web fusionando:
//  1) Hoja oficial AOTR (valores oficiales en llaves/pergaminos/vizard)
//  2) API externa de tradeo (379 items, valores normalizados + histórico demo)
// Salida: apps/web/lib/data/items.json + meta.json

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadItems } from "../src/data/sheetLoader.js";
import {
  fetchExternalItems,
  parseApiItem,
  findApiKeyRatio
} from "../src/services/tradeApi.js";
import { normalizeSearchText, compactKey, stableId } from "../src/core/normalize.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../../web/src/lib/seed");

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const round = (n, d = 4) => (n === null || n === undefined ? null : Number(n.toFixed(d)));

// Histórico determinístico (demo) — el histórico real lo genera el bot en DB
// Camina hacia atrás desde el valor actual y luego invierte a orden cronológico,
// de modo que el punto más antiguo difiera del más reciente (tendencia ≠ 0).
function makeHistory(value, seedStr, points = 60) {
  if (value === null || value === undefined) return [];
  const rng = mulberry32(hashString(seedStr));
  const rev = [];
  let v = value;
  for (let i = points - 1; i >= 0; i--) {
    const ts = Date.now() - i * 24 * 3600 * 1000;
    rev.push({ ts: new Date(ts).toISOString(), value: round(v) });
    v = (v || 0) / (1 + (rng() - 0.42) * 0.05);
  }
  const pts = rev.reverse();
  pts[pts.length - 1].value = round(value);
  return pts;
}

async function main() {
  console.log("🚀 Generando seed de datos...");

  // 1. Oficial (hoja AOTR) — tolerante a fallos
  let officialItems = [];
  try {
    officialItems = await loadItems();
  } catch (err) {
    console.warn("⚠️ No se pudo cargar la hoja oficial:", err.message);
  }

  // 2. Trade (API externa)
  const raw = await fetchExternalItems();
  const apiItems = raw.map(parseApiItem);
  console.log(`📡 API externa: ${apiItems.length} items`);

  const apiKeyValue = findApiKeyRatio(apiItems);
  console.log(`🔑 Ratio API (1 llave = ${apiKeyValue} valor): ${apiKeyValue}`);

  // Índices por nombre normalizado
  const byNorm = new Map();
  const officialMap = new Map();
  const apiMap = new Map();

  for (const it of officialItems) {
    const key = compactKey(it.name);
    if (!officialMap.has(key)) officialMap.set(key, it);
  }
  for (const it of apiItems) {
    const key = compactKey(it.name);
    apiMap.set(key, it);
    if (!byNorm.has(key)) byNorm.set(key, []);
    byNorm.get(key).push(it);
  }

  const allNorms = new Set([...officialMap.keys(), ...apiMap.keys()]);
  const items = [];

  for (const key of allNorms) {
    const off = officialMap.get(key);
    const api = apiMap.get(key);
    const norm = normalizeSearchText(off?.name ?? api.name);

    const valueOfficial = off
      ? {
          keys: off.value.keys ?? null,
          scrolls: off.value.scrolls ?? null,
          vizards: off.value.vizards ?? null
        }
      : null;

    const apiValue = api ? round(api.value) : null;
    const apiKeys = apiValue !== null && apiKeyValue ? round(apiValue / apiKeyValue, 2) : null;
    const apiScrolls = apiKeys !== null ? round(apiKeys / 3, 2) : null;

    const source = off && api ? "both" : off ? "official" : "api";

    items.push({
      id: stableId(key),
      name: off?.name ?? api.name,
      normalized: norm,
      slug: norm.replace(/\s+/g, "-"),
      category: api?.category ?? off?.category ?? null,
      rarityLabel: off?.rarity ?? null,
      rarityPct: api?.rarityPct ?? null,
      status: api?.status ?? null,
      obtainedFrom: api?.obtainedFrom ?? null,
      emoji: api?.emoji ?? null,
      demandApi: api?.demand ?? null,
      demandOfficial: off?.demand ?? null,
      valueOfficial,
      apiValue,
      apiKeys,
      apiScrolls,
      rateOfChange: api?.rateOfChange ?? null,
      taxGems: api?.gemTax ?? off?.taxGems ?? null,
      taxGold: api?.goldTax ?? off?.taxGold ?? null,
      source,
      history: makeHistory(apiValue, key),

      // Fuente oficial (hoja AOTR)
      sheet: off?.sheet ?? null,
      existingAmount: off?.existingAmount ?? null,
      officialRate: off?.rateOfChange ?? null,
      officialTaxGems: off?.taxGems ?? null,
      officialTaxGold: off?.taxGold ?? null,

      // Fuente trade (API externa)
      apiId: api?.id ?? null,
      prestige: api?.prestige ?? null,
      updatedAt: api?.updatedAt ?? null,
      apiTaxGems: api?.gemTax ?? null,
      apiTaxGold: api?.goldTax ?? null
    });
  }

  items.sort((a, b) => a.name.localeCompare(b.name));

  const counts = {
    total: items.length,
    official: items.filter((i) => i.source !== "api").length,
    api: items.filter((i) => i.source !== "official").length,
    both: items.filter((i) => i.source === "both").length
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });

  fs.writeFileSync(
    path.join(OUT_DIR, "items.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), apiKeyValue, counts, items })
  );

  fs.writeFileSync(
    path.join(OUT_DIR, "meta.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        apiKeyValue,
        counts,
        note: "Seed generado a partir de la hoja oficial AOTR y la API de tradeo. El histórico es determinístico (demo); el bot registra el histórico real en la base de datos."
      },
      null,
      2
    )
  );

  console.log(`✅ Seed listo: ${counts.total} items (oficial: ${counts.official}, api: ${counts.api}, ambos: ${counts.both})`);
  console.log(`📁 ${path.relative(process.cwd(), OUT_DIR)}/items.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
