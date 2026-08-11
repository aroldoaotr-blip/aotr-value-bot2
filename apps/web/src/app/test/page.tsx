/* import fs from "node:fs";
import path from "node:path";
import { Reveal } from "@/components/Reveal";
import { getTestData } from "@/lib/test-data";
import type { NumOrRange, RawApiItem, RawOfficialItem } from "@/lib/test-data";

// Página de diagnóstico: siempre se renderiza en el servidor (nada de caché estática),
// porque ejecuta los loaders reales del bot en cada visita (con TTL interno).
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Test de datos — AOTR Values",
  description:
    "Laboratorio de datos: items crudos de la hoja oficial AOTR y de la API de tradeo, con la arquitectura de la base de datos."
};

// ── Utilidades de presentación ────────────────────────────────

// Formatea cualquier valor (número, rango {min,max}, null, string) para la tabla
const fmt = (v: unknown): string => {
  if (v === null || v === undefined || v === "") return "—";
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
};

// JSON completo del item tal cual lo entrega la fuente (fidelidad total)
const json = (v: unknown) => JSON.stringify(v, null, 2);

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="max-h-96 overflow-auto rounded-xl border border-white/[0.07] bg-[#07081a] p-4 text-[11px] leading-relaxed text-emerald-200/80">
      {children}
    </pre>
  );
}

function FieldTable({ rows }: { rows: [string, unknown][] }) {
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-white/[0.07]">
      <table className="w-full text-left text-xs">
        <tbody>
          {rows.map(([label, value], i) => (
            <tr
              key={label}
              className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"}
            >
              <td className="w-44 border-r border-white/[0.06] px-3 py-1.5 font-mono text-[11px] text-indigo-300/90">
                {label}
              </td>
              <td className="px-3 py-1.5 text-white/80">{fmt(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Pipeline: funciones del proyecto explicadas con comentarios ──
interface PipelineStep {
  fn: string;
  file: string;
  source: "oficial" | "api" | "bd" | "web";
  comments: string[];
  code?: string;
}

const PIPELINE: PipelineStep[] = [
  {
    fn: "loadItems()",
    file: "apps/bot/src/data/sheetLoader.js",
    source: "oficial",
    comments: [
      "Descarga la hoja oficial AOTR (Google Sheets exportada a xlsx) con fetch.",
      "Itera cada hoja del libro (salta 'Overview').",
      "Las filas con solo 'Item Name' (sin Rarity ni Value) son cabeceras de categoría.",
      "Cada fila válida se convierte a un item con nombre, categoría, rareza, demanda, valor parseado y taxes."
    ]
  },
  {
    fn: "parseValue(rawValue)",
    file: "apps/bot/src/core/parseValue.js",
    source: "oficial",
    comments: [
      "Convierte el texto de la celda 'Value' → { keys, scrolls, vizards }.",
      "Ej: '🔑 250k / 📜 83.3k / 🎭 viz 1.2k' → keys=250000, scrolls=83300, vizards=1200.",
      "Soporta sufijos k/m y rangos '150-200' → { min, max }.",
      "Deriva lo que falta: scrolls = keys ÷ 3, o keys = scrolls × 3."
    ],
    code: "const parts = clean.split(\"/\");\nfor (const part of parts) {\n  if (part.includes(\"🔑\")) result.keys = parseRange(part.replace(\"🔑\", \"\"));\n  if (part.includes(\"📜\")) result.scrolls = parseRange(part.replace(\"📜\", \"\"));\n  if (part.includes(\"viz\")) result.vizards = parseRange(part.replace(\"viz\", \"\"));\n}"
  },
  {
    fn: "fetchExternalItems()",
    file: "apps/bot/src/services/tradeApi.js",
    source: "api",
    comments: [
      "Trae todas las filas de la tabla 'items' de la API externa (Supabase de solo lectura).",
      "Paginación de 1000 por página (offset) hasta que una página venga vacía.",
      "Usa la anon key pública; solo lectura."
    ]
  },
  {
    fn: "parseApiItem(raw)",
    file: "apps/bot/src/services/tradeApi.js",
    source: "api",
    comments: [
      "Mapea la fila cruda de la API (snake_case) a camelCase.",
      "Convierte a Number() con null-safe: null/undefined → null (nunca NaN).",
      "Ej: obtained_from → obtainedFrom, gem_tax → gemTax, rarity → rarityPct."
    ],
    code: "return {\n  id: String(raw.id),\n  name: raw.name,\n  value: raw.value == null ? null : Number(raw.value),\n  demand: raw.demand == null ? null : Number(raw.demand),\n  prestige: raw.prestige == null ? null : Number(raw.prestige),\n  // ...obtainedFrom, gemTax, goldTax, category, rarityPct, emoji, updatedAt\n};"
  },
  {
    fn: "findApiKeyRatio(rows)",
    file: "apps/bot/src/services/tradeApi.js",
    source: "api",
    comments: [
      "Encuentra el item 'Key'/'keys' en la API → el ratio ancla (0.00111 viz por llave).",
      "Con ese ratio: 1 viz = 900.9 llaves (el resto de items se convierte).",
      "Si no existe, devuelve null y se usa la tasa configurada o el default."
    ]
  },
  {
    fn: "syncOfficial() / syncTrade()",
    file: "apps/bot/src/services/sync.js",
    source: "bd",
    comments: [
      "Upsert de items en la tabla Item de la BD (Supabase vía Prisma).",
      "La clave es stableId(compactKey(name)) — determinística y estable entre fuentes.",
      "source pasa a 'both' si el item ya existía con la otra fuente.",
      "Registra cada corrida en SyncLog y (trade) guarda una instantánea en PriceHistory."
    ]
  },
  {
    fn: "upsertApiRows(rows, rates)",
    file: "apps/bot/src/bot/state.js",
    source: "bd",
    comments: [
      "Caché en memoria del bot para responder al instante en Discord.",
      "El valor de la API viene en vizard → keys = viz × keysPerVizard → scrolls = keys ÷ keysPerScroll.",
      "Las tasas vienen de RateConfig (admin) o del default (900.9 / 3)."
    ],
    code: "const keys = row.value != null ? row.value * keysPerVizard : null;\nstate.apiMap.set(row.normalized, {\n  value: row.value,\n  keys,\n  scrolls: keys != null ? keys / keysPerScroll : null,\n  demand: row.demand, status: row.status, rateOfChange: row.rateOfChange\n});"
  },
  {
    fn: "getRates() / setRates()",
    file: "packages/db/src/index.js",
    source: "bd",
    comments: [
      "Fuente de verdad única de tasas de conversión (tabla RateConfig).",
      "El admin las edita en /administrador; bot y web leen el mismo registro.",
      "Caché TTL de 1 min; fallback a DEFAULT_RATES si la BD no responde."
    ]
  },
  {
    fn: "generate-seed.mjs",
    file: "apps/bot/scripts/generate-seed.mjs",
    source: "web",
    comments: [
      "Fusiona ambas fuentes por compactKey(name) y genera items.json + meta.json.",
      "Un item 'both' combina valueOfficial (hoja) + apiValue/apiKeys (API).",
      "La web lee la BD si hay DATABASE_URL; si no, usa este seed (misma estructura)."
    ]
  }
];

const SOURCE_STYLE: Record<PipelineStep["source"], { label: string; cls: string }> = {
  oficial: { label: "📄 Hoja oficial", cls: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
  api: { label: "🔵 API tradeo", cls: "bg-sky-500/15 text-sky-300 border-sky-400/30" },
  bd: { label: "🗄️ Base de datos", cls: "bg-violet-500/15 text-violet-300 border-violet-400/30" },
  web: { label: "🌐 Web", cls: "bg-indigo-500/15 text-indigo-300 border-indigo-400/30" }
};

function OfficialCard({ item }: { item: RawOfficialItem }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-display text-base font-bold text-white">{item.name}</h3>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
          {item.rarity ?? "sin rareza"}
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/50">
          hoja: {item.sheet} · cat: {item.category}
        </span>
      </div>

      <FieldTable
        rows={[
          ["name", item.name],
          ["sheet", item.sheet],
          ["category", item.category],
          ["rarity", item.rarity],
          ["demand", item.demand],
          ["value.raw", item.value?.raw],
          ["value.keys", item.value?.keys],
          ["value.scrolls", item.value?.scrolls],
          ["value.vizards", item.value?.vizards],
          ["rateOfChange", item.rateOfChange],
          ["taxGems", item.taxGems],
          ["taxGold", item.taxGold],
          ["existingAmount", item.existingAmount]
        ]}
      />

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-white/40">
        JSON crudo (tal cual lo devuelve loadItems)
      </p>
      <div className="mt-2">
        <CodeBlock>{json(item)}</CodeBlock>
      </div>
    </div>
  );
}

function ApiCard({ item }: { item: RawApiItem }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-display text-base font-bold text-white">{item.name}</h3>
        {item.status && (
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/50">
            {item.status}
          </span>
        )}
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/50">
          id: {item.id}
        </span>
      </div>

      <FieldTable
        rows={[
          ["id", item.id],
          ["name", item.name],
          ["value (viz)", item.value],
          ["demand", item.demand],
          ["rateOfChange", item.rateOfChange],
          ["prestige", item.prestige],
          ["status", item.status],
          ["obtainedFrom", item.obtainedFrom],
          ["gemTax", item.gemTax],
          ["goldTax", item.goldTax],
          ["category", item.category],
          ["rarityPct", item.rarityPct],
          ["emoji", item.emoji],
          ["updatedAt", item.updatedAt]
        ]}
      />

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-white/40">
        JSON crudo (tal cual lo devuelve parseApiItem)
      </p>
      <div className="mt-2">
        <CodeBlock>{json(item)}</CodeBlock>
      </div>
    </div>
  );
}

// ── Arquitectura de la BD (schema.prisma leído en vivo) ───────

// Lee el schema real del paquete @aotr/db para que esta sección
// nunca se desincronice del modelo de datos actual.
function readSchema(): string {
  try {
    const p = path.join(process.cwd(), "../../packages/db/prisma/schema.prisma");
    return fs.readFileSync(p, "utf8");
  } catch {
    return "No se pudo leer packages/db/prisma/schema.prisma (revisa la ruta).";
  }
}

// 2 listas de precios independientes, cada una con SU histórico.
// Solo comparten: id = stableId(nombre) (llave de join) y la imagen
// (emoji de la API → se aplica al item oficial en la web).
const TABLES: { model: string; accent: string; groups: { group: string; fields: [string, string, string][] }[] }[] = [
  {
    model: "OfficialPrice",
    accent: "text-emerald-300",
    groups: [
      {
        group: "Identidad",
        fields: [
          ["id", "String @id", "stableId(compactKey(name)) — llave compartida"],
          ["name / normalized / slug", "String", "Nombre, búsqueda y URL"],
          ["category", "String?", "Categoría de la HOJA (ya no pelea con la API)"]
        ]
      },
      {
        group: "Precios (3 monedas)",
        fields: [
          ["keys", "Json?", "number | {min,max} | null"],
          ["scrolls", "Json?", "derivado: keys ÷ 3"],
          ["vizards", "Json?", "derivado: keys ÷ ratio"]
        ]
      },
      {
        group: "Detalle de la hoja",
        fields: [
          ["rarityLabel / demand", "String?", "Rareza y demanda de la hoja"],
          ["rateOfChange", "String?", "Tendencia (Stable, Rising…)"],
          ["taxGems / taxGold", "Float?", "Taxes de la hoja"],
          ["sheet / existingAmount", "String?", "Hoja de origen y cantidad existente"]
        ]
      }
    ]
  },
  {
    model: "TradePrice",
    accent: "text-sky-300",
    groups: [
      {
        group: "Identidad + imagen",
        fields: [
          ["id", "String @id", "stableId(nombre) — MISMA llave que OfficialPrice"],
          ["name / normalized / slug", "String", "Nombre, búsqueda y URL"],
          ["emoji", "String?", "Imagen compartida → aotrvalue.com + emoji"],
          ["category", "String?", "Categoría de la API"]
        ]
      },
      {
        group: "Precios (3 monedas)",
        fields: [
          ["value", "Float?", "Valor crudo en VIZARD (de la API)"],
          ["keys", "Float?", "calculado: viz × keysPerVizard"],
          ["scrolls", "Float?", "calculado: keys ÷ keysPerScroll"]
        ]
      },
      {
        group: "Detalle de la API",
        fields: [
          ["demand / rateOfChange", "Int? / String?", "Demanda y tendencia"],
          ["prestige / status", "Int? / String?", "Prestigio y disponibilidad"],
          ["obtainedFrom", "String?", "Cómo se obtiene"],
          ["taxGems / taxGold", "Float?", "Taxes de la API"],
          ["apiId / apiUpdatedAt", "String? / DateTime?", "Id y fecha de la API"]
        ]
      }
    ]
  },
  {
    model: "Históricos",
    accent: "text-violet-300",
    groups: [
      {
        group: "Cada lista tiene el suyo",
        fields: [
          ["OfficialPriceHistory", "model", "keys · scrolls · vizards por sync (30 min)"],
          ["TradePriceHistory", "model", "value (viz) por sync (30 min)"],
          ["itemId + recordedAt", "@unique", "una instantánea por item por sync"]
        ]
      }
    ]
  }
];

// ── Página ────────────────────────────────────────────────────
export default async function TestPage() {
  const data = await getTestData();
  const schema = readSchema();
  const nRange = (v: NumOrRange) => (typeof v === "object" && v !== null ? "rango" : "número");

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6">
      
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
          🧪 Laboratorio de datos
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
          Test de <span className="text-gradient">fuentes de datos</span>
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-white/50">
          Esta página ejecuta los <span className="text-white/80">loaders reales del bot</span> para
          mostrarte los items crudos tal como llegan de cada fuente — sin la fusión del seed — más la
          arquitectura de la base de datos.
        </p>
      </Reveal>


      <Reveal delay={0.05}>
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="glass rounded-2xl px-4 py-3">
            <p className="text-[11px] uppercase tracking-widest text-white/40">Hoja oficial (Excel)</p>
            <p className="mt-0.5 font-display text-xl font-bold text-emerald-300">
              {data.official.count} items
            </p>
          </div>
          <div className="glass rounded-2xl px-4 py-3">
            <p className="text-[11px] uppercase tracking-widest text-white/40">API de tradeo</p>
            <p className="mt-0.5 font-display text-xl font-bold text-sky-300">
              {data.api.count} items
            </p>
          </div>
          <div className="glass rounded-2xl px-4 py-3">
            <p className="text-[11px] uppercase tracking-widest text-white/40">Consulta en vivo</p>
            <p className="mt-0.5 text-sm font-semibold text-white/70">
              {new Date(data.fetchedAt).toLocaleString("es")}
            </p>
          </div>
        </div>
        {data.official.error && (
          <p className="mt-3 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-xs text-rose-300">
            ⚠️ Error cargando la hoja oficial: {data.official.error}
          </p>
        )}
        {data.api.error && (
          <p className="mt-2 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-xs text-rose-300">
            ⚠️ Error cargando la API de tradeo: {data.api.error}
          </p>
        )}
      </Reveal>

      
      <section className="mt-16">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-white">
            Pipeline: <span className="text-gradient">qué hace cada función</span>
          </h2>
          <p className="mt-1 text-sm text-white/45">
            El camino de los datos: hoja AOTR y API externa → bot → base de datos → web. Cada tarjeta
            explica una función con comentarios.
          </p>
        </Reveal>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {PIPELINE.map((step, i) => {
            const tag = SOURCE_STYLE[step.source];
            return (
              <Reveal key={step.fn} delay={0.04 * i}>
                <div className="glass h-full rounded-2xl p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-mono text-sm font-bold text-white">{step.fn}</h3>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${tag.cls}`}>
                      {tag.label}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-white/35">{step.file}</p>
                  <ul className="mt-3 space-y-1.5">
                    {step.comments.map((c) => (
                      <li key={c} className="flex gap-2 text-xs leading-relaxed text-white/60">
                        <span className="mt-0.5 font-mono text-indigo-400/70">//</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                  {step.code && (
                    <div className="mt-3">
                      <CodeBlock>{step.code}</CodeBlock>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      
      <section className="mt-20">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <div className="orb flex h-11 w-11 items-center justify-center text-lg">📄</div>
            <div>
              <h2 className="font-display text-2xl font-bold text-white">
                Items desde el <span className="text-emerald-300">Excel (hoja oficial)</span>
              </h2>
              <p className="mt-1 text-sm text-white/45">
                2 ejemplos de <code className="text-emerald-300/80">loadItems()</code> — datos crudos de la
                hoja AOTR: valor parseado ({nRange(data.official.sample[0]?.value?.keys ?? null)}), rareza,
                demanda, taxes…
              </p>
            </div>
          </div>
        </Reveal>

        {data.official.sample.length > 0 ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {data.official.sample.map((item, i) => (
              <Reveal key={item.name} delay={0.05 * i}>
                <OfficialCard item={item} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/50">
            No se pudieron cargar items oficiales (ver error arriba).
          </p>
        )}
      </section>

    
      <section className="mt-20">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <div className="orb flex h-11 w-11 items-center justify-center text-lg">🔵</div>
            <div>
              <h2 className="font-display text-2xl font-bold text-white">
                Items desde la <span className="text-sky-300">API de tradeo</span>
              </h2>
              <p className="mt-1 text-sm text-white/45">
                2 ejemplos de <code className="text-sky-300/80">fetchExternalItems() + parseApiItem()</code> —
                datos crudos de la API: valor en vizard, demanda, prestige, procedencia…
              </p>
            </div>
          </div>
        </Reveal>

        {data.api.sample.length > 0 ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {data.api.sample.map((item, i) => (
              <Reveal key={item.id} delay={0.05 * i}>
                <ApiCard item={item} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/50">
            No se pudieron cargar items de la API (ver error arriba).
          </p>
        )}
      </section>

      <section className="mt-20">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <div className="orb flex h-11 w-11 items-center justify-center text-lg">🗄️</div>
            <div>
              <h2 className="font-display text-2xl font-bold text-white">
                Arquitectura de <span className="text-violet-300">la base de datos</span>
              </h2>
              <p className="mt-1 text-sm text-white/45">
                <strong className="text-white/80">2 listas de precios independientes</strong> en
                Supabase/PostgreSQL (Prisma): <code className="text-emerald-300/80">OfficialPrice</code>{" "}
                (hoja AOTR) y <code className="text-sky-300/80">TradePrice</code> (API), cada una con su
                histórico. Comparten el <code className="text-white/60">id = stableId(nombre)</code> (join) y
                la imagen.{" "}
                <code className="text-white/60">schema.prisma</code> leído en vivo del paquete{" "}
                <code className="text-white/60">@aotr/db</code>.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
       
          <Reveal>
            <div className="glass rounded-2xl p-5">
              <h3 className="font-mono text-sm font-bold text-white">2 tablas de precios</h3>
              {TABLES.map((table) => (
                <div key={table.model} className="mt-5">
                  <p className={`font-mono text-xs font-bold ${table.accent}`}>
                    model {table.model}
                  </p>
                  {table.groups.map((group) => (
                    <div key={group.group} className="mt-3">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-300/80">
                        {group.group}
                      </p>
                      <div className="mt-2 space-y-1">
                        {group.fields.map(([name, type, desc]) => (
                          <div
                            key={name}
                            className="flex items-baseline justify-between gap-3 rounded-lg bg-white/[0.02] px-3 py-1.5"
                          >
                            <div className="min-w-0">
                              <p className="truncate font-mono text-[11px] text-white/85">{name}</p>
                              <p className="text-[10px] text-white/35">{desc}</p>
                            </div>
                            <span className="shrink-0 font-mono text-[10px] text-violet-300/80">{type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-white/60">
                  🔗 Ambos id = stableId(nombre) — join + imagen compartida
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-white/60">
                  🪵 SyncLog (bitácora de sincronizaciones)
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-white/60">
                  ⚙️ RateConfig (tasas del admin: 1 viz = N llaves)
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-white/60">
                  📢 GuildConfig 1—N ChannelConfig (canales del bot)
                </span>
              </div>
            </div>
          </Reveal>

  
          <Reveal delay={0.08}>
            <div className="glass h-full rounded-2xl p-5">
              <h3 className="font-mono text-sm font-bold text-white">
                packages/db/prisma/schema.prisma
              </h3>
              <p className="mt-1 text-[11px] text-white/40">
                El archivo real, leído en cada visita — siempre sincronizado con la BD.
              </p>
              <div className="mt-3">
                <CodeBlock>{schema}</CodeBlock>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
 */
