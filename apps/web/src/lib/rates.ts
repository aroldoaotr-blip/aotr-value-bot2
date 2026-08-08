import type { Item, ValueOrRange } from "./types";

// ── Tasas de conversión (fuente de verdad editable por admin) ──
export type Rates = { keysPerVizard: number; keysPerScroll: number };

// Default alineado con la API de tradeo y el bot: la API define Key = 0.00111 viz
// → 1 viz = 900.9 llaves (el bot usa el mismo fallback). El admin puede cambiarlo.
export const DEFAULT_RATES: Rates = { keysPerVizard: 900.9, keysPerScroll: 3 };

export type Currency = "keys" | "scrolls" | "vizards";

const LS_KEY = "aotr_rates_v1";

export function getLocalRates(): Rates | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Number.isFinite(parsed.keysPerVizard) && Number.isFinite(parsed.keysPerScroll)) {
      return { keysPerVizard: Number(parsed.keysPerVizard), keysPerScroll: Number(parsed.keysPerScroll) };
    }
  } catch {
    /* ignorar */
  }
  return null;
}

export function setLocalRates(rates: Rates) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(rates));
  } catch {
    /* almacenamiento no disponible */
  }
}

export function clearLocalRates() {
  try {
    localStorage.removeItem(LS_KEY);
  } catch {
    /* ignorar */
  }
}

// ── Conversión de valores (soporta rangos {min,max}) ─────
function scale(value: ValueOrRange, factor: number): ValueOrRange {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return value * factor;
  return { min: value.min * factor, max: value.max * factor };
}

export function convertValue(
  value: ValueOrRange,
  from: Currency,
  to: Currency,
  rates: Rates
): ValueOrRange {
  if (value === null || value === undefined) return null;
  if (from === to) return value;

  // Llevar todo a llaves primero y luego a la moneda destino
  let keys: ValueOrRange = value;
  if (from === "scrolls") keys = scale(value, rates.keysPerScroll);
  else if (from === "vizards") keys = scale(value, rates.keysPerVizard);

  if (to === "keys") return keys;
  if (to === "scrolls") return scale(keys, 1 / rates.keysPerScroll);
  return scale(keys, 1 / rates.keysPerVizard);
}

// Valor canónico de una fuente: usa la moneda que la fuente ofrece y la convierte.
export function sourceValue(
  item: Item,
  source: "official" | "api",
  currency: Currency,
  rates: Rates
): ValueOrRange {
  if (source === "api") {
    if (item.apiValue === null || item.apiValue === undefined) return null;
    return convertValue(item.apiValue, "vizards", currency, rates);
  }

  const vo = item.valueOfficial;
  if (!vo) return null;
  // La hoja oficial suele traer llaves; si faltan, usa pergaminos o vizard.
  if (vo.keys !== null && vo.keys !== undefined) return convertValue(vo.keys, "keys", currency, rates);
  if (vo.scrolls !== null && vo.scrolls !== undefined)
    return convertValue(vo.scrolls, "scrolls", currency, rates);
  if (vo.vizards !== null && vo.vizards !== undefined)
    return convertValue(vo.vizards, "vizards", currency, rates);
  return null;
}
