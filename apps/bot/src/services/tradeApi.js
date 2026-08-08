// Cliente de la API externa de precios de tradeo (Supabase de solo lectura)

const EXTERNAL_URL =
  process.env.EXTERNAL_SUPABASE_URL ||
  "https://kcxzghpcfobpnlvlvtib.supabase.co";
const EXTERNAL_KEY =
  process.env.EXTERNAL_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjeHpnaHBjZm9icG5sdmx2dGliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NjQ5ODgsImV4cCI6MjA2NzE0MDk4OH0.frunhRobCUlKGCz1IgnuXtoGyMBUKwQQ3xQc_iFyEMg";

const TABLE = "items";
const PAGE_SIZE = 1000;

export async function fetchExternalItems() {
  const all = [];
  let from = 0;

  for (;;) {
    const url = `${EXTERNAL_URL}/rest/v1/${TABLE}?select=*&limit=${PAGE_SIZE}&offset=${from}`;

    const response = await fetch(url, {
      headers: {
        apikey: EXTERNAL_KEY,
        Authorization: `Bearer ${EXTERNAL_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(
        `API externa respondió ${response.status}: ${response.statusText}`
      );
    }

    const page = await response.json();
    all.push(...page);

    if (page.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return all;
}

export function parseApiItem(raw) {
  return {
    id: String(raw.id),
    name: raw.name,
    value: raw.value === null || raw.value === undefined ? null : Number(raw.value),
    demand: raw.demand === null || raw.demand === undefined ? null : Number(raw.demand),
    rateOfChange: raw.rate_of_change ?? null,
    prestige: raw.prestige === null || raw.prestige === undefined ? null : Number(raw.prestige),
    status: raw.status ?? null,
    obtainedFrom: raw.obtained_from ?? null,
    gemTax: raw.gem_tax === null || raw.gem_tax === undefined ? null : Number(raw.gem_tax),
    goldTax: raw.gold_tax === null || raw.gold_tax === undefined ? null : Number(raw.gold_tax),
    category: raw.category ?? null,
    rarityPct: raw.rarity === null || raw.rarity === undefined ? null : Number(raw.rarity),
    emoji: raw.emoji ?? null,
    updatedAt: raw.updated_at ?? null
  };
}

export function findApiKeyRatio(rows) {
  const key = rows.find(
    (r) => r.name?.toLowerCase() === "key" || r.name?.toLowerCase() === "keys"
  );
  const value = key ? Number(key.value) : null;
  return value && value > 0 ? value : null;
}
