import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { Reveal } from "@/components/Reveal";
import { SourceBadge, StatusBadge, RateBadge } from "@/components/Badges";
import { PriceChart } from "@/components/PriceChart";
import { ItemSourcePanel } from "@/components/ItemSourcePanel";
import { getItems } from "@/lib/data";
import { cn, formatCompact, formatRange, roundValue } from "@/lib/format";
import { sourceValue } from "@/lib/rates";
import { getServerRates } from "@/lib/server-rates";
import type { Item, ValueOrRange } from "@/lib/types";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const items = await getItems();
  return items.slice(0, 200).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const items = await getItems();
  const item = items.find((i) => i.slug === slug);

  if (!item) return { title: "Item no encontrado — AOTR Values" };

  return {
    title: `${item.name} — Precio AOTR`,
    description: `Precio oficial y de tradeo de ${item.name}. Histórico y tendencias.`
  };
}

// ── Fila de detalle de una fuente ────────────────────────
function Detail({ label, value }: { label: string; value: ReactNode }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-surface-container/40 px-3 py-2">
      <span className="text-xs text-on-surface-variant">{label}</span>
      <span className="text-right text-xs font-medium text-on-surface">{value}</span>
    </div>
  );
}

// ── Fila de precio en una moneda ─────────────────────────
function PriceRow({
  icon,
  label,
  value,
  digits = 2
}: {
  icon: string;
  label: string;
  value: ValueOrRange;
  digits?: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-surface-container/40 px-4 py-2.5">
      <span className="text-sm text-on-surface-variant">
        {icon} {label}
      </span>
      <span className="font-data-tabular text-base font-bold text-on-surface">
        {formatRange(value, digits)}
      </span>
    </div>
  );
}

function rarityChipClass(rarity: string | null) {
  const r = (rarity ?? "").toLowerCase();
  if (/mythic/i.test(r))
    return "border border-mythic-red/30 bg-mythic-red/20 text-mythic-red";
  if (/legendary/i.test(r))
    return "border border-legendary-orange/30 bg-legendary-orange/20 text-legendary-orange";
  if (/epic/i.test(r))
    return "border border-epic-violet/30 bg-epic-violet/20 text-epic-violet";
  if (/rare/i.test(r))
    return "border border-rare-blue/30 bg-rare-blue/20 text-rare-blue";
  return "border border-outline-variant/50 bg-surface-variant text-on-surface-variant";
}

function demandDots(item: Item) {
  const demand = item.demandApi;
  if (demand === null || demand === undefined) return null;
  const filled = Math.max(0, Math.min(6, Math.round((demand / 10) * 6)));
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1 w-4 rounded-full",
            i < filled ? "bg-primary" : "bg-surface-variant"
          )}
        />
      ))}
      <span className="ml-2 font-data-tabular text-xs text-on-surface-variant">
        {filled}/6 Demanda
      </span>
    </div>
  );
}

export default async function ItemPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const items = await getItems();
  const item = items.find((i) => i.slug === slug);

  if (!item) notFound();

  // Tasas del admin (RateConfig en BD, o default alineado con el bot).
  const rates = await getServerRates();
  const oKeys = roundValue(sourceValue(item, "official", "keys", rates));
  const oScrolls = roundValue(sourceValue(item, "official", "scrolls", rates));
  const oVizards = sourceValue(item, "official", "vizards", rates);
  const apiKeys = roundValue(sourceValue(item, "api", "keys", rates));
  const apiScrolls = roundValue(sourceValue(item, "api", "scrolls", rates));
  const apiVizards = sourceValue(item, "api", "vizards", rates);

  const updatedAt = item.updatedAt
    ? new Date(item.updatedAt).toLocaleString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    : null;

  const similar = items
    .filter(
      (i) =>
        i.id !== item.id &&
        i.apiValue !== null &&
        i.apiValue > 0 &&
        i.apiValue >= (item.apiValue ?? 0) * 0.75 &&
        i.apiValue <= (item.apiValue ?? 0) * 1.25
    )
    .slice(0, 6);

  // Monedas para la caja del hero: prioriza la hoja oficial, cae a la API.
  const heroKeys = oKeys ?? apiKeys;
  const heroScrolls = oScrolls ?? apiScrolls;
  const heroVizards = oVizards ?? apiVizards;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 font-label-caps text-xs font-bold uppercase tracking-wider text-on-surface-variant">
        <Link href="/precios" className="transition-colors hover:text-primary">
          Precios
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-primary">{item.name}</span>
      </nav>

      {/* ── Panel Hero ─────────────────────────────────── */}
      <Reveal>
        <section className="glass-panel relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-xl p-6 md:flex-row md:items-center">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary-container/20 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-secondary-container/20 blur-[80px]" />

          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {item.rarityLabel && (
                <span
                  className={cn(
                    "rounded-full px-3 py-1 font-label-caps text-xs font-bold",
                    rarityChipClass(item.rarityLabel)
                  )}
                >
                  VENTAJA {item.rarityLabel.toUpperCase()}
                </span>
              )}
              {demandDots(item)}
            </div>
            <div className="flex items-center gap-3">
              <Avatar name={item.name} officialImage={item.officialImage} emoji={item.emoji} size="lg" />
              <div>
                <h1 className="font-display-lg text-3xl font-bold tracking-tight text-on-surface sm:text-5xl">
                  {item.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <SourceBadge source={item.source} />
                  <StatusBadge status={item.status} />
                  <RateBadge rate={item.rateOfChange} />
                  <span className="font-label-caps text-xs text-on-surface-variant">
                    {item.category ?? "—"}
                    {item.rarityPct ? ` · ${item.rarityPct.toFixed(2)}%` : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Caja de precios en 3 monedas */}
          <div className="relative z-10 flex items-center gap-6 rounded-lg border border-outline-variant/30 bg-surface-container/50 p-6">
            <div className="flex flex-col items-center">
              <span className="mb-1 text-2xl text-tertiary">🔑</span>
              <span className="font-data-tabular text-2xl font-bold text-on-surface">
                {formatRange(heroKeys, 0)}
              </span>
              <span className="font-label-caps text-xs text-on-surface-variant">Llaves</span>
            </div>
            <div className="h-12 w-px bg-outline-variant/30" />
            <div className="flex flex-col items-center">
              <span className="mb-1 text-2xl text-primary">📜</span>
              <span className="font-data-tabular text-2xl font-bold text-on-surface">
                {formatRange(heroScrolls, 0)}
              </span>
              <span className="font-label-caps text-xs text-on-surface-variant">Pergaminos</span>
            </div>
            <div className="h-12 w-px bg-outline-variant/30" />
            <div className="flex flex-col items-center">
              <span className="mb-1 text-2xl text-error">🎭</span>
              <span className="font-data-tabular text-2xl font-bold text-on-surface">
                {formatRange(heroVizards)}
              </span>
              <span className="font-label-caps text-xs text-on-surface-variant">Vizard</span>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Paneles duales (oficial / tradeo) ──────────── */}
      <Reveal delay={0.1}>
        <ItemSourcePanel
          official={
            <div className="glass-panel glow-border-active h-full rounded-xl p-6">
              <div className="mb-6 flex items-center justify-between border-b border-outline-variant/30 pb-4">
                <p className="flex items-center gap-2 font-headline-lg text-lg font-semibold text-primary">
                  ✅ Oficial
                </p>
                <span className="rounded bg-surface-variant px-2 py-1 font-label-caps text-xs text-neon-green">
                  {item.officialRate ?? "ESTABLE"}
                </span>
              </div>
              {!item.valueOfficial && (
                <p className="mb-3 rounded-lg bg-surface-container/40 p-3 text-xs leading-relaxed text-on-surface-variant">
                  Este item no aparece en la hoja oficial AOTR — su precio solo proviene de la API de
                  tradeo (🔵).
                </p>
              )}
              <div className="space-y-2.5">
                <PriceRow icon="🔑" label="Llaves" value={oKeys} digits={0} />
                <PriceRow icon="📜" label="Pergaminos" value={oScrolls} digits={0} />
                <PriceRow icon="🎭" label="Vizard" value={oVizards} />
              </div>
              <div className="mt-4 space-y-1.5">
                <Detail label="Hoja" value={item.sheet} />
                <Detail label="Categoría" value={item.category} />
                <Detail label="Rareza" value={item.rarityLabel} />
                <Detail label="Demanda" value={item.demandOfficial} />
                <Detail label="Tendencia (hoja)" value={item.officialRate} />
                <Detail label="Cantidad existente" value={item.existingAmount} />
                <Detail
                  label="💎 Tax gemas"
                  value={item.officialTaxGems !== null ? formatCompact(item.officialTaxGems) : null}
                />
                <Detail
                  label="🪙 Tax oro"
                  value={item.officialTaxGold !== null ? formatCompact(item.officialTaxGold) : null}
                />
              </div>
            </div>
          }
          trade={
            <div className="glass-panel h-full rounded-xl border-t-2 border-t-trade-blue/30 p-6">
              <div className="mb-6 flex items-center justify-between border-b border-outline-variant/30 pb-4">
                <p className="flex items-center gap-2 font-headline-lg text-lg font-semibold text-trade-blue">
                  ⇄ Tradeo
                </p>
                <span className="rounded bg-surface-variant px-2 py-1 font-label-caps text-xs text-error">
                  {item.rateOfChange ?? "VOLÁTIL"}
                </span>
              </div>
              {item.apiValue === null && (
                <p className="mb-3 rounded-lg bg-surface-container/40 p-3 text-xs leading-relaxed text-on-surface-variant">
                  Este item todavía no tiene precio en la API de tradeo — su precio solo proviene de
                  la hoja oficial (🟢).
                </p>
              )}
              <div className="space-y-2.5">
                <PriceRow icon="🎭" label="Valor (viz)" value={apiVizards} />
                <PriceRow icon="🔑" label="Llaves" value={apiKeys} digits={0} />
                <PriceRow icon="📜" label="Pergaminos" value={apiScrolls} digits={0} />
              </div>
              <div className="mt-4 space-y-1.5">
                <Detail
                  label="Demanda"
                  value={item.demandApi !== null ? `${item.demandApi}/10` : null}
                />
                <Detail label="Tendencia (API)" value={item.rateOfChange} />
                <Detail label="Prestigio" value={item.prestige !== null ? `Nivel ${item.prestige}` : null} />
                <Detail label="Status" value={item.status} />
                <Detail label="Categoría" value={item.category} />
                <Detail label="Probabilidad" value={item.rarityPct !== null ? `${item.rarityPct.toFixed(2)}%` : null} />
                <Detail label="Imagen" value={item.emoji ? `aotrvalue.com${item.emoji}` : null} />
                <Detail label="Actualizado" value={updatedAt} />
                <Detail label="💎 Tax gemas" value={item.apiTaxGems !== null ? formatCompact(item.apiTaxGems) : null} />
                <Detail label="🪙 Tax oro" value={item.apiTaxGold !== null ? formatCompact(item.apiTaxGold) : null} />
              </div>
              {item.obtainedFrom && (
                <p className="mt-4 rounded-lg bg-surface-container/40 p-3 text-xs leading-relaxed text-on-surface-variant">
                  📦 Se obtiene de: {item.obtainedFrom}
                </p>
              )}
            </div>
          }
        />
      </Reveal>

      {/* ── Histórico ──────────────────────────────────── */}
      <Reveal delay={0.2}>
        <div className="glass-panel mt-6 rounded-xl p-6">
          <div className="mb-6 flex items-center justify-between">
            <p className="font-headline-lg text-lg font-semibold text-on-surface">
              📈 Histórico de precios
            </p>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 font-label-caps text-xs text-on-surface-variant">
                <span className="h-3 w-3 rounded-full bg-tertiary" /> Llaves
              </span>
              <span className="flex items-center gap-1 font-label-caps text-xs text-on-surface-variant">
                <span className="h-3 w-3 rounded-full bg-primary" /> Pergaminos
              </span>
              <span className="flex items-center gap-1 font-label-caps text-xs text-on-surface-variant">
                <span className="h-3 w-3 rounded-full bg-error" /> Vizard
              </span>
            </div>
          </div>
          {item.history.length > 1 ? (
            <PriceChart data={item.history} height={280} />
          ) : (
            <p className="py-12 text-center text-sm text-on-surface-variant">
              El histórico real se acumula con cada sincronización del bot.
            </p>
          )}
        </div>
      </Reveal>

      {/* ── Similares ──────────────────────────────────── */}
      {similar.length > 0 && (
        <Reveal delay={0.25}>
          <div className="mt-10">
            <h2 className="font-headline-lg text-xl font-semibold text-on-surface sm:text-2xl">
              🔍 Artículos similares
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((s) => (
                <Link
                  key={s.id}
                  href={`/item/${s.slug}`}
                  className="glass-panel glass-card-hover flex items-center gap-3 rounded-lg p-4"
                >
                  <Avatar name={s.name} officialImage={s.officialImage} emoji={s.emoji} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-on-surface">{s.name}</p>
                    <p className="font-data-tabular text-xs text-primary">
                      🔵 {formatCompact(s.apiValue)} viz · 🟢 {formatRange(roundValue(s.valueOfficial?.keys ?? null), 0)} llaves
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      <div className="mt-10">
        <Link
          href="/precios"
          className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-on-surface-variant transition-all hover:text-on-surface"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a precios
        </Link>
      </div>
    </div>
  );
}
