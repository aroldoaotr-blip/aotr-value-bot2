// Test: ¿qué viene de la API vs qué calcula el bot/web?
// Corre: node scripts/test-api-vs-bot.mjs (desde apps/web)
//
// Reglas del negocio:
//   - La API externa expresa TODOS los valores en vizard (Vizard's Mask = 1, Key = 0.0011)
//   - Bot (state.js): keys = viz × keysPerVizard (default 900.9, admin puede poner 900)
//   - Web (rates.ts): DEFAULT_RATES.keysPerVizard = 900
//   - Pergaminos = llaves ÷ keysPerScroll (3)

const EXTERNAL_URL = "https://kcxzghpcfobpnlvlvtib.supabase.co";
const EXTERNAL_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjeHpnaHBjZm9icG5sdmx2dGliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NjQ5ODgsImV4cCI6MjA2NzE0MDk4OH0.frunhRobCUlKGCz1IgnuXtoGyMBUKwQQ3xQc_iFyEMg";

// Items a testear (5 ejemplos + anclas de ratio)
const TEST_NAMES = [
  "Key", // ancla: 1 llave = 0.00111 viz
  "Ackerman",
  "Ad Astra",
  "Adaptation",
  "Aincrad Blade",
  "Kazeshini"
];

const RATES = { keysPerVizard: 900, keysPerScroll: 3 }; // web (admin default)
const RATES_BOT = { keysPerVizard: 900.9, keysPerScroll: 3 }; // bot sin admin (1/0.00111)

const fmt = (n) => (n === null || n === undefined ? "—" : Number(n).toLocaleString("en-US", { maximumFractionDigits: 3 }));
const mid = (v) => (typeof v === "object" ? (v.min + v.max) / 2 : v);

async function main() {
  const res = await fetch(`${EXTERNAL_URL}/rest/v1/items?select=name,value,demand,obtained_from&limit=1000`, {
    headers: { apikey: EXTERNAL_KEY, Authorization: `Bearer ${EXTERNAL_KEY}` }
  });
  if (!res.ok) throw new Error(`API respondió ${res.status}`);
  const rows = await res.json();
  console.log(`✅ API respondió: ${rows.length} items\n`);

  // Ancla de ratio real: item "Key"
  const keyRow = rows.find((r) => r.name?.toLowerCase() === "key" || r.name?.toLowerCase() === "keys");
  console.log(`🔑 Ancla "Key" en la API: value = ${keyRow?.value} viz  →  1 llave = ${fmt(keyRow?.value)} viz  →  1 viz = ${fmt(keyRow?.value ? 1 / keyRow.value : null)} llaves\n`);

  console.log("=".repeat(120));
  console.log("ITEM                     | API crudo (viz) | BOT keys(900.9) | BOT scrolls | WEB keys(900) | WEB scrolls | WEB viz");
  console.log("=".repeat(120));

  // Cargar el seed de la web para comparar con lo que guarda (apiValue, apiKeys, oficial)
  const seed = await import("../src/lib/seed/items.json", { with: { type: "json" } }).then((m) => m.default);
  const seedMap = new Map(seed.items.map((i) => [i.name.toLowerCase(), i]));

  for (const name of TEST_NAMES) {
    const row = rows.find((r) => r.name?.toLowerCase() === name.toLowerCase());
    if (!row) {
      console.log(`${name.padEnd(24)} | NO ENCONTRADO en la API`);
      continue;
    }
    const s = seedMap.get(name.toLowerCase());
    if (s) {
      console.log(`   🗄️ Seed web: apiValue=${fmt(s.apiValue)} · officialKeys=${s.valueOfficial ? fmt(mid(s.valueOfficial.keys)) : "—"}`);
    }
    const viz = Number(row.value);
    const botKeys = viz * RATES_BOT.keysPerVizard;
    const webKeys = viz * RATES.keysPerVizard;
    console.log(
      `${name.padEnd(24)} | ${String(fmt(viz)).padStart(13)} | ${String(fmt(botKeys)).padStart(13)} | ${String(fmt(botKeys / 3)).padStart(10)} | ${String(fmt(webKeys)).padStart(12)} | ${String(fmt(webKeys / 3)).padStart(10)} | ${String(fmt(viz)).padStart(7)}`
    );
  }

  console.log("=".repeat(120));
  console.log("\n⚠️ NOTA: con tasas del admin (900 en vez de 900.9), la diferencia es <0.1%.");
  console.log("⚠️ El seed de la web guarda apiKeyValue=0.00111 (900.9), pero rates.ts usa 900 por defecto.");
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
