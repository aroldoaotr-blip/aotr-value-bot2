// Carga la lista oficial publicada por AOT Revolution.
// El archivo es JavaScript (`const AOTR_DATA = [...]`), no JSON puro.

const OFFICIAL_DATA_URL =
  process.env.OFFICIAL_DATA_URL ||
  "https://aotrevolution.com/data.js?v=20260814c";

const DEFAULT_RATES = { keysPerVizard: 900, keysPerScroll: 3 };

function extractJsonArray(script, variableName) {
  const declaration = new RegExp(`\\b(?:const|let|var)\\s+${variableName}\\s*=`).exec(script);
  if (!declaration) throw new Error(`No se encontró ${variableName} en data.js`);
  const start = script.indexOf("[", declaration.index + declaration[0].length);
  if (start < 0) throw new Error(`${variableName} no contiene un arreglo`);

  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let i = start; i < script.length; i++) {
    const char = script[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (char === "[") depth++;
    if (char === "]") {
      depth--;
      if (depth === 0) return JSON.parse(script.slice(start, i + 1));
    }
  }
  throw new Error(`${variableName} está incompleto`);
}

function extractJsonObject(script, variableName) {
  const declaration = new RegExp(`\\b(?:const|let|var)\\s+${variableName}\\s*=`).exec(script);
  if (!declaration) return {};
  const start = script.indexOf("{", declaration.index + declaration[0].length);
  if (start < 0) return {};
  let depth = 0;
  for (let i = start; i < script.length; i++) {
    if (script[i] === "{") depth++;
    if (script[i] === "}" && --depth === 0) return JSON.parse(script.slice(start, i + 1));
  }
  return {};
}

function parseTax(rawTax) {
  if (!rawTax || String(rawTax).toLowerCase() === "n/a") return null;
  const match = String(rawTax).replaceAll(",", "").match(/([\d.]+)\s*(k|m)?/i);
  if (!match) return null;
  let value = Number(match[1]);
  if (match[2]?.toLowerCase() === "k") value *= 1_000;
  if (match[2]?.toLowerCase() === "m") value *= 1_000_000;
  return value;
}

function numericValue(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

export function parseOfficialData(script) {
  const rows = extractJsonArray(script, "AOTR_DATA");
  const meta = extractJsonObject(script, "AOTR_META");
  const rates = {
    keysPerVizard: numericValue(meta.vizard_keys) || DEFAULT_RATES.keysPerVizard,
    keysPerScroll: numericValue(meta.scroll_keys) || DEFAULT_RATES.keysPerScroll
  };

  return rows
    .filter((row) => row && typeof row.name === "string" && row.name.trim())
    .map((row) => {
      // `value` es el valor canónico en llaves (AOTR_META.currency = "keys").
      const keys = row.na ? null : numericValue(row.value);
      return {
        name: row.name.trim(),
        sheet: "AOT Revolution",
        category: row.subcat || row.category || null,
        rarity: row.rarity || null,
        demand: row.demand == null ? null : String(row.demand),
        value: {
          keys,
          scrolls: keys == null ? null : keys / rates.keysPerScroll,
          vizards: keys == null ? null : keys / rates.keysPerVizard
        },
        rateOfChange: row.trend || null,
        taxGems: parseTax(row.tax),
        taxGold: null,
        existingAmount: row.supply == null ? null : String(row.supply),
        image: typeof row.img === "string" && row.img.trim() ? row.img.trim() : null
      };
    });
}

export async function loadItems() {
  console.log("📥 Descargando lista oficial de AOT Revolution...");
  const response = await fetch(OFFICIAL_DATA_URL);
  if (!response.ok) throw new Error(`No se pudo descargar data.js: ${response.status}`);
  const items = parseOfficialData(await response.text());
  console.log(`📦 Items oficiales cargados: ${items.length}`);
  return items;
}
