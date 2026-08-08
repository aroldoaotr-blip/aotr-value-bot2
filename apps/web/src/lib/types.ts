export type ValueOrRange = number | { min: number; max: number } | null;

export interface ItemValue {
  keys: ValueOrRange;
  scrolls: ValueOrRange;
  vizards: ValueOrRange;
}

export type ItemSource = "official" | "api" | "both";

export interface HistoryPoint {
  ts: string;
  value: number;
}

export interface Item {
  id: string;
  name: string;
  normalized: string;
  slug: string;
  category: string | null;
  rarityLabel: string | null;
  rarityPct: number | null;
  status: string | null;
  obtainedFrom: string | null;
  emoji: string | null;
  demandApi: number | null;
  demandOfficial: string | null;
  valueOfficial: ItemValue | null;
  apiValue: number | null;
  apiKeys: number | null;
  apiScrolls: number | null;
  rateOfChange: string | null;
  taxGems: number | null;
  taxGold: number | null;
  source: ItemSource;
  history: HistoryPoint[];

  // ── Fuente oficial (hoja AOTR) ─────────────────────────
  sheet: string | null; // Hoja de Excel de donde salió el item
  existingAmount: string | null; // Cantidad existente registrada en la hoja
  officialRate: string | null; // Rate of change según la hoja oficial
  officialTaxGems: number | null; // Tax en gemas según la hoja
  officialTaxGold: number | null; // Tax en oro según la hoja

  // ── Fuente trade (API externa) ────────────────────────
  apiId: string | null; // id del item en la API externa
  prestige: number | null; // Nivel de prestigio en el juego
  updatedAt: string | null; // Última actualización según la API
  apiTaxGems: number | null; // Tax en gemas según la API
  apiTaxGold: number | null; // Tax en oro según la API
}

export interface SeedData {
  generatedAt: string;
  apiKeyValue: number;
  counts: { total: number; official: number; api: number; both: number };
  items: Item[];
}

export interface ItemMover {
  item: Item;
  changePct: number;
  changeAbs: number;
  direction: "up" | "down";
  volatility: number;
}

export interface Meta {
  generatedAt: string;
  apiKeyValue: number;
  counts: { total: number; official: number; api: number; both: number };
}
