import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { Reveal } from "@/components/Reveal";
import { DemandBar } from "@/components/DemandBar";
import { SourceBadge, StatusBadge, RateBadge } from "@/components/Badges";
import { PriceChart } from "@/components/PriceChart";
import { ItemSourcePanel } from "@/components/ItemSourcePanel";
import { getItems } from "@/lib/data";
import { formatCompact, formatRange, roundValue } from "@/lib/format";
import { sourceValue } from "@/lib/rates";
import { getServerRates } from "@/lib/server-rates";
import type { ValueOrRange } from "@/lib/types";

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
// Muestra un dato de la lista oficial o de la API solo si existe.
function Detail({ label, value }: { label: string; value: ReactNode }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div className="flex items-start justify-between gap-3 rounded-lg bg-white/[0.03] px-3 py-2">
      <span className="text-xs text-white/45">{label}</span>
      <span className="text-right text-xs font-medium text-white/85">{value}</span>
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
    <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3">
      <span className="text-sm text-white/55">
        {icon} {label}
      </span>
      <span className="font-display text-lg font-bold text-white">
        {formatRange(value, digits)}
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
  // Sirven para derivar los 3 precios cuando la fuente solo trae uno.
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

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6">
      <Link
        href="/precios"
        className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white/60 transition-all hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Volver a precios
      </Link>

      <Reveal>
        <div className="mt-6 flex flex-wrap items-center gap-5">
          <Avatar name={item.name} emoji={item.emoji} size="xl" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
                {item.name}
              </h1>
              <SourceBadge source={item.source} />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <StatusBadge status={item.status} />
              <RateBadge rate={item.rateOfChange} />
            </div>
            <p className="mt-1.5 text-sm text-white/45">
              {item.category ?? "—"}
              {item.rarityLabel ? ` · ${item.rarityLabel}` : ""}
              {item.rarityPct ? ` · ${item.rarityPct.toFixed(2)}% de probabilidad` : ""}
            </p>
          </div>
        </div>
      </Reveal>

      {/* Precios duales: todos los datos de cada lista */}
      <Reveal delay={0.1}>
        <ItemSourcePanel
          official={
            <div className="gradient-border h-full rounded-3xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
                🟢 Precio oficial (hoja AOTR)
              </p>
              {item.sheet && (
                <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                  📄 {item.sheet}
                </span>
              )}
            </div>
            {!item.valueOfficial && (
              <p className="mt-3 rounded-xl bg-white/[0.03] p-3 text-xs leading-relaxed text-white/45">
                Este item no aparece en la hoja oficial AOTR — su precio solo proviene de la API de
                tradeo (🔵).
              </p>
            )}

            <div className="mt-4 space-y-2.5">
              <PriceRow icon="🔑" label="Llaves" value={oKeys} />
              <PriceRow icon="📜" label="Pergaminos" value={oScrolls} />
              <PriceRow icon="🎭" label="Vizard" value={oVizards} />
            </div>

            <div className="mt-4 space-y-1.5">
              <Detail label="Hoja" value={item.sheet} />
              <Detail label="Categoría" value={item.category} />
              <Detail label="Rareza" value={item.rarityLabel} />
              <Detail label="Demanda" value={item.demandOfficial} />
              <Detail label="Tendencia (hoja)" value={item.officialRate} />
              <Detail
                label="Cantidad existente"
                value={item.existingAmount}
              />
              <Detail
                label="💎 Tax gemas"
                value={
                  item.officialTaxGems !== null
                    ? formatCompact(item.officialTaxGems)
                    : null
                }
              />
              <Detail
                label="🪙 Tax oro"
                value={
                  item.officialTaxGold !== null
                    ? formatCompact(item.officialTaxGold)
                    : null
                }
              />
            </div>
          </div>

          }
          trade={
            <div className="gradient-border h-full rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">
              🔵 Precio de tradeo (API)
            </p>
            {item.apiValue === null && (
              <p className="mt-3 rounded-xl bg-white/[0.03] p-3 text-xs leading-relaxed text-white/45">
                Este item todavía no tiene precio en la API de tradeo — su precio solo proviene de
                la hoja oficial (🟢).
              </p>
            )}

            <div className="mt-4 space-y-2.5">
              <PriceRow icon="🎭" label="Valor (viz)" value={apiVizards} />
              <PriceRow icon="🔑" label="Llaves" value={apiKeys} />
              <PriceRow icon="📜" label="Pergaminos" value={apiScrolls} />
            </div>

            <div className="mt-4 space-y-1.5">
              <Detail
                label="Demanda"
                value={item.demandApi !== null ? `${item.demandApi}/10` : null}
              />
              <Detail label="Tendencia (API)" value={item.rateOfChange} />
              <Detail
                label="Prestigio"
                value={item.prestige !== null ? `Nivel ${item.prestige}` : null}
              />
              <Detail label="Status" value={item.status} />
              <Detail label="Categoría" value={item.category} />
              <Detail
                label="Probabilidad"
                value={
                  item.rarityPct !== null ? `${item.rarityPct.toFixed(2)}%` : null
                }
              />
              <Detail
                label="Imagen"
                value={item.emoji ? `aotrvalue.com${item.emoji}` : null}
              />
              <Detail label="Actualizado" value={updatedAt} />
              <Detail
                label="💎 Tax gemas"
                value={
                  item.apiTaxGems !== null ? formatCompact(item.apiTaxGems) : null
                }
              />
              <Detail
                label="🪙 Tax oro"
                value={
                  item.apiTaxGold !== null ? formatCompact(item.apiTaxGold) : null
                }
              />
            </div>

            {item.obtainedFrom && (
              <p className="mt-4 rounded-xl bg-white/[0.03] p-3 text-xs leading-relaxed text-white/45">
                📦 Se obtiene de: {item.obtainedFrom}
              </p>
            )}
            </div>
          }
        />
      </Reveal>

      {/* Demanda */}
      <Reveal delay={0.15}>
        <div className="mt-4">
          <div className="glass inline-block rounded-2xl px-5 py-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
              Demanda
            </p>
            <DemandBar item={item} />
          </div>
        </div>
      </Reveal>

      {/* Histórico */}
      <Reveal delay={0.2}>
        <div className="glass mt-6 rounded-3xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
            📈 Histórico de precio (tradeo)
          </p>
          <div className="mt-4">
            {item.history.length > 1 ? (
              <PriceChart data={item.history} height={260} />
            ) : (
              <p className="py-12 text-center text-sm text-white/40">
                El histórico real se acumula con cada sincronización del bot.
              </p>
            )}
          </div>
        </div>
      </Reveal>

      {/* Similares */}
      {similar.length > 0 && (
        <Reveal delay={0.25}>
          <div className="mt-10">
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              🔍 Items con valor similar
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((s) => (
                <Link
                  key={s.id}
                  href={`/item/${s.slug}`}
                  className="glass flex items-center gap-3 rounded-2xl p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/40"
                >
                  <Avatar name={s.name} emoji={s.emoji} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{s.name}</p>
                    <p className="text-xs text-white/40">
                      🔵 {formatCompact(s.apiValue)} viz · 🟢 {formatRange(roundValue(s.valueOfficial?.keys ?? null))} llaves
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}
