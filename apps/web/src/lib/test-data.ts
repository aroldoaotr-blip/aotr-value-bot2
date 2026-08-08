// ─────────────────────────────────────────────────────────────
// test-data.ts — Helper del servidor para la página /test
//
// Ejecuta los loaders REALES del bot (los mismos que usa la
// sincronización) para mostrar en la web los datos crudos tal
// como llegan de cada fuente, sin la fusión del seed:
//   • Hoja oficial AOTR  → sheetLoader.loadItems()   (Excel)
//   • API de tradeo      → tradeApi.fetchExternalItems()
//                         + tradeApi.parseApiItem()
//
// Se usa un caché TTL a nivel de módulo para no golpear a
// Google Sheets / la API externa en cada visita de la página.
// Cada fuente es tolerante a fallos: si una cae, la otra y el
// resto de la página siguen funcionando (error visible).
// ─────────────────────────────────────────────────────────────

// Valor de la hoja: número o rango { min, max } (o null)
export type NumOrRange = number | { min: number; max: number } | null;

// Item oficial tal como lo devuelve sheetLoader.loadItems()
export interface RawOfficialItem {
  name: string;
  sheet: string;
  category: string;
  rarity: string | null;
  demand: string | null;
  value: { raw: string; keys: NumOrRange; scrolls: NumOrRange; vizards: NumOrRange };
  rateOfChange: string | null;
  taxGems: number | null;
  taxGold: number | null;
  existingAmount: string | null;
}

// Item de la API tal como lo devuelve parseApiItem()
export interface RawApiItem {
  id: string;
  name: string;
  value: number | null;
  demand: number | null;
  rateOfChange: string | null;
  prestige: number | null;
  status: string | null;
  obtainedFrom: string | null;
  gemTax: number | null;
  goldTax: number | null;
  category: string | null;
  rarityPct: number | null;
  emoji: string | null;
  updatedAt: string | null;
}

export interface SourceResult<T> {
  count: number;
  sample: T[];
  error: string | null;
}

export interface TestData {
  fetchedAt: string;
  official: SourceResult<RawOfficialItem>;
  api: SourceResult<RawApiItem>;
}

// ── Caché TTL (10 min): la página /test no debe ser agresiva ──
let cache: { at: number; data: TestData } | null = null;
const TTL = 10 * 60 * 1000;

const errMsg = (e: unknown) => (e instanceof Error ? e.message : String(e));

// ── Oficial: hoja AOTR (Excel exportado de Google Sheets) ────
async function loadOfficialSample(): Promise<SourceResult<RawOfficialItem>> {
  try {
    // Import dinámico: los loaders viven en el paquete del bot y
    // solo se cargan cuando la página /test los necesita.
    const { loadItems } = await import("../../../bot/src/data/sheetLoader.js");
    const items = (await loadItems()) as RawOfficialItem[];

    // Muestra: 2 items que tengan los datos más completos
    // (valor en llaves + rareza + demanda) para que el test sea útil.
    const complete = items.filter(
      (i) => i.value?.keys != null && i.rarity && i.demand
    );
    const pool = (complete.length >= 2 ? complete : items)
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));

    return { count: items.length, sample: pool.slice(0, 2), error: null };
  } catch (e) {
    return { count: 0, sample: [], error: errMsg(e) };
  }
}

// ── Trade: API externa (Supabase de solo lectura) ────────────
async function loadApiSample(): Promise<SourceResult<RawApiItem>> {
  try {
    const { fetchExternalItems, parseApiItem } = await import(
      "../../../bot/src/services/tradeApi.js"
    );
    const rows = await fetchExternalItems();
    const items = rows.map(parseApiItem) as RawApiItem[];

    // Muestra: 2 items con valor + procedencia (obtained_from)
    const complete = items.filter((i) => i.value != null && i.obtainedFrom);
    const pool = (complete.length >= 2 ? complete : items)
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));

    return { count: items.length, sample: pool.slice(0, 2), error: null };
  } catch (e) {
    return { count: 0, sample: [], error: errMsg(e) };
  }
}

// Punto de entrada: carga ambas fuentes (en paralelo) con caché
export async function getTestData(): Promise<TestData> {
  if (cache && Date.now() - cache.at < TTL) return cache.data;

  // Promise.all: las dos fuentes se descargan en paralelo
  const [official, api] = await Promise.all([loadOfficialSample(), loadApiSample()]);

  const data: TestData = { fetchedAt: new Date().toISOString(), official, api };
  cache = { at: Date.now(), data };
  return data;
}
