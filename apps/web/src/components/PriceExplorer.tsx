"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Search,
  Table2,
  X,
} from "lucide-react";
import type { Item } from "@/lib/types";
import { cn, formatCompact, formatRange, midOf, roundValue } from "@/lib/format";
import {
  DEFAULT_RATES,
  getLocalRates,
  sourceValue,
  type Rates,
} from "@/lib/rates";
import { searchItems } from "@/lib/search";
import { Avatar } from "./Avatar";
import { DemandBar } from "./DemandBar";
import { SourceBadge, StatusBadge, RateBadge } from "./Badges";
import { Sparkline } from "./Sparkline";
import { PriceChart } from "./PriceChart";

const PAGE_SIZE = 40;

type ViewMode = "cards" | "table";

type SortKey = "name" | "api-desc" | "official-desc" | "demand-desc";

// Filtro de valores: "all" muestra los 3 precios por fuente; una moneda
// específica muestra solo ese precio (sin conversión).
type PriceCurrency = "all" | "keys" | "scrolls" | "vizards";

const CURRENCY_ICONS: Record<Exclude<PriceCurrency, "all">, string> = {
  keys: "🔑",
  scrolls: "📜",
  vizards: "🎭",
};

function sortItems(items: Item[], sort: SortKey): Item[] {
  const sorted = [...items];
  switch (sort) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "api-desc":
      return sorted.sort((a, b) => (b.apiValue ?? -1) - (a.apiValue ?? -1));
    case "official-desc":
      return sorted.sort(
        (a, b) =>
          (midOf(a.valueOfficial?.keys ?? null) ?? -1) -
          (midOf(b.valueOfficial?.keys ?? null) ?? -1),
      );
    case "demand-desc":
      return sorted.sort(
        (a, b) =>
          (b.demandApi ?? 0) - (a.demandApi ?? 0) ||
          a.name.localeCompare(b.name),
      );
  }
}

export function PriceExplorer({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [source, setSource] = useState<"all" | "official" | "api" | "both">(
    "all",
  );
  const [sort, setSort] = useState<SortKey>("name");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<Item | null>(null);
  const [rates, setRates] = useState<Rates>(DEFAULT_RATES);
  const [currency, setCurrency] = useState<PriceCurrency>("all");

  // Cargar tasas de conversión (localStorage del admin primero, luego BD vía API)
  useEffect(() => {
    const local = getLocalRates();
    if (local) {
      setRates(local);
      return;
    }
    (async () => {
      try {
        const res = await fetch("/api/rates");
        const data = await res.json();
        if (data.rates) setRates(data.rates);
      } catch {
        /* mantener por defecto */
      }
    })();
  }, []);
  const [view, setView] = useState<ViewMode>("cards");

  // Restaurar vista guardada (tarjetas / detalle)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aotr-view");
      if (saved === "cards" || saved === "table") setView(saved);
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("aotr-view", view);
    } catch {
      /* noop */
    }
  }, [view]);

  // Restaurar búsqueda/filtro desde ?q= y ?cat=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) setQuery(q);
    const c = params.get("cat");
    if (c) setCategory(c);
  }, []);

  // Reflejar búsqueda y categoría en la URL (para compartir / refrescar)
  useEffect(() => {
    const url = new URL(window.location.href);
    if (query.trim()) url.searchParams.set("q", query);
    else url.searchParams.delete("q");
    if (category !== "all") url.searchParams.set("cat", category);
    else url.searchParams.delete("cat");
    window.history.replaceState(null, "", url.toString());
  }, [query, category]);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      const cat = item.category ?? "Sin categoría";
      counts.set(cat, (counts.get(cat) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 14);
  }, [items]);

  const filtered = useMemo(() => {
    let list = items;

    if (query.trim()) {
      list = searchItems(items, query, 500);
    }

    if (category !== "all") {
      list = list.filter((i) => (i.category ?? "Sin categoría") === category);
    }
    if (source !== "all") {
      list = list.filter((i) => i.source === source);
    }

    return sortItems(list, sort);
  }, [items, query, category, source, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  useEffect(() => {
    setPage(1);
  }, [query, category, source, sort]);

  return (
    <div>
      {/* ── Controles ─────────────────────────────────── */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Buscar en ${items.length} items…`}
            className="glass w-full rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/35 outline-none transition-all focus:border-indigo-400/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-white/40">
            Lista de precios:
          </span>
          <div className="glass flex rounded-xl p-1">
            {(
              [
                ["all", "Todos"],
                ["both", "Doble"],
                ["official", "🟢 Oficial"],
                ["api", "🔵 Trade"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSource(key)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                  source === key
                    ? "bg-indigo-500/30 text-white"
                    : "text-white/45 hover:text-white",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="glass flex items-center gap-2 rounded-xl px-3 py-2">
            <ArrowUpDown className="h-3.5 w-3.5 text-white/35" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-transparent text-xs font-medium text-white/80 outline-none [&>option]:bg-[#0b0d1f]"
            >
              <option value="name">Nombre</option>
              <option value="api-desc">Valor API (mayor)</option>
              <option value="official-desc">Valor oficial (mayor)</option>
              <option value="demand-desc">Demanda</option>
            </select>
          </div>

          <div className="glass flex rounded-xl p-1" aria-label="Cambiar vista">
            {(
              [
                ["cards", LayoutGrid, "Tarjetas"],
                ["table", Table2, "Detalle"],
              ] as const
            ).map(([key, Icon, label]) => (
              <button
                key={key}
                onClick={() => setView(key)}
                aria-pressed={view === key}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                  view === key
                    ? "bg-indigo-500/30 text-white"
                    : "text-white/45 hover:text-white",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filtro de valores (todos / una moneda) ─────── */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-xs font-medium text-white/40">Mostrar precios:</span>
        <div className="glass flex rounded-xl p-1">
          {(
            [
              ["all", "Todos"],
              ["keys", "🔑 Llaves"],
              ["scrolls", "📜 Pergaminos"],
              ["vizards", "🎭 Vizard"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCurrency(key)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                currency === key
                  ? "bg-indigo-500/30 text-white"
                  : "text-white/45 hover:text-white",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Categorías: carrusel deslizable ───────────── */}
      <CategoryCarousel
        categories={categories}
        total={items.length}
        active={category}
        onSelect={setCategory}
      />
      {/* ── Resultado ─────────────────────────────────── */}
      <p className="mt-5 text-xs text-white/40">
        {filtered.length} items encontrados
        {source !== "all" ? " · filtro por fuente activo" : ""}
        {category !== "all" ? ` · ${category}` : ""}
      </p>
      {view === "cards" ? (
        /* Grilla de tarjetas grandes (imagen completa y centrada) */
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-5">
          {pageItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setModal(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setModal(item);
                }
              }}
              role="button"
              aria-label={`Ver detalle de ${item.name}`}
              className="group glass flex flex-col items-center rounded-2xl p-3 pb-4 text-center outline-none transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-400/40 hover:shadow-glow focus-visible:border-indigo-400/50"
            >
              {/* Imagen grande, completa y centrada */}
              <div className="relative w-full overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.02] p-2 transition-transform duration-300 group-hover:scale-[1.02]">
                <Avatar
                  name={item.name}
                  emoji={item.emoji}
                  size="card"
                  className="mx-auto"
                />
              </div>

              <p className="mt-2.5 w-full truncate text-sm font-semibold text-white transition-colors group-hover:text-indigo-200">
                {item.name}
              </p>

              <div className="mt-1 flex flex-wrap items-center justify-center gap-1.5">
                <SourceBadge source={item.source} />
                {item.category && (
                  <span className="truncate text-[10px] text-white/35">
                    {item.category}
                  </span>
                )}
              </div>

              <div
                className={cn(
                  "mt-2.5",
                  currency === "all"
                    ? "w-full space-y-1.5"
                    : "flex flex-wrap items-center justify-center gap-1.5",
                )}
              >
                <SourcePrices
                  item={item}
                  source="official"
                  rates={rates}
                  currency={currency}
                />
                <SourcePrices item={item} source="api" rates={rates} currency={currency} />
              </div>

              <div className="mt-2 flex w-full items-center justify-center">
                <DemandBar item={item} />
              </div>

              <div className="mt-2 flex w-full items-center justify-between gap-1.5">
                <RateBadge
                  rate={item.rateOfChange}
                  className="max-w-[55%] truncate"
                />
                <Sparkline
                  data={item.history.map((h) => ({ value: h.value }))}
                  className="h-7 w-16 shrink-0"
                />
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* Vista detalle: tabla completa con todas las métricas */
        <div className="glass mt-3 overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.07] text-[11px] uppercase tracking-wider text-white/40">
                  <th className="px-4 py-3 font-medium">Item</th>
                  <th className="px-3 py-3 font-medium">Categoría</th>
                  <th className="px-3 py-3 font-medium">Demanda</th>
                  <th className="px-3 py-3 text-right font-medium">
                    🟢 Oficial
                  </th>
                  <th className="px-3 py-3 text-right font-medium">🔵 Trade</th>
                  <th className="px-3 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium">Tendencia</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setModal(item)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setModal(item);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Ver detalle de ${item.name}`}
                    className="group cursor-pointer border-b border-white/[0.04] outline-none transition-colors last:border-0 hover:bg-white/[0.05] focus-visible:bg-white/[0.06]"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={item.name} emoji={item.emoji} size="sm" />
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-white group-hover:text-indigo-200">
                            {item.name}
                          </p>
                          <div className="mt-0.5 flex items-center gap-1.5">
                            <SourceBadge source={item.source} />
                            {item.rarityLabel && (
                              <span className="text-[10px] text-white/35">
                                {item.rarityLabel}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs text-white/50">
                      {item.category ?? "—"}
                    </td>
                    <td className="px-3 py-3">
                      <DemandBar item={item} />
                    </td>
                    <td className="px-3 py-3 text-right">
                  <SourcePricesCell
                    item={item}
                    source="official"
                    rates={rates}
                    currency={currency}
                  />
                </td>
                <td className="px-3 py-3 text-right">
                  <SourcePricesCell
                    item={item}
                    source="api"
                    rates={rates}
                    currency={currency}
                  />
                </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={item.status} />
                      <RateBadge rate={item.rateOfChange} className="mt-1" />
                    </td>
                    <td className="px-4 py-3">
                      <Sparkline
                        data={item.history.map((h) => ({ value: h.value }))}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* ── Paginación ────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage <= 1}
            className="glass rounded-xl p-2 text-white/70 transition-all hover:text-white disabled:opacity-30"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs text-white/50">
            Página <strong className="text-white">{safePage}</strong> de{" "}
            {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage >= totalPages}
            className="glass rounded-xl p-2 text-white/70 transition-all hover:text-white disabled:opacity-30"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
      {filtered.length === 0 && (
        <div className="glass mt-6 rounded-2xl p-10 text-center">
          <p className="text-3xl">🔍</p>
          <p className="mt-2 font-semibold text-white">Sin resultados</p>
          <p className="mt-1 text-sm text-white/45">
            Prueba con otro nombre, categoría o quita los filtros.
          </p>
        </div>
      )}{" "}
      <AnimatePresence>
        {modal && (
          <ItemModal
            item={modal}
            items={items}
            rates={rates}
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Precios de una fuente en las 3 monedas ──────────────
// Muestra 🔑 llaves · 📜 pergaminos · 🎭 vizard de una lista
// (oficial o trade). Si la fuente solo trae un precio, deriva
// los demás con las tasas del admin (RateConfig).
function SourcePrices({
  item,
  source,
  rates,
  currency,
}: {
  item: Item;
  source: "official" | "api";
  rates: Rates;
  currency: PriceCurrency;
}) {
  const keys = roundValue(sourceValue(item, source, "keys", rates));
  const scrolls = roundValue(sourceValue(item, source, "scrolls", rates));
  const vizards = sourceValue(item, source, "vizards", rates);
  if (keys === null && scrolls === null && vizards === null) return null;

  const isOfficial = source === "official";

  // Filtro por moneda: una sola línea compacta, sin conversión
  if (currency !== "all") {
    const value =
      currency === "keys" ? keys : currency === "scrolls" ? scrolls : vizards;
    if (value === null || value === undefined) return null;
    return (
      <span
        className={cn(
          "rounded-lg border px-2 py-1 text-xs font-bold",
          isOfficial
            ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
            : "border-blue-400/20 bg-blue-500/10 text-blue-300",
        )}
      >
        {isOfficial ? "🟢" : "🔵"} {formatRange(value)}{" "}
        {CURRENCY_ICONS[currency]}
      </span>
    );
  }

  return (
    <div
      className={cn(
        "rounded-lg border px-2 py-1.5 text-center",
        isOfficial
          ? "border-emerald-400/20 bg-emerald-500/10"
          : "border-blue-400/20 bg-blue-500/10",
      )}
    >
      <p
        className={cn(
          "text-[10px] font-bold uppercase tracking-wider",
          isOfficial ? "text-emerald-300" : "text-blue-300",
        )}
      >
        {isOfficial ? "🟢 Oficial" : "🔵 Trade"}
      </p>
      <p
        className={cn(
          "mt-0.5 text-xs font-semibold leading-snug",
          isOfficial ? "text-emerald-200" : "text-blue-200",
        )}
      >
        🔑 {formatRange(keys)} · 📜 {formatRange(scrolls)} · 🎭{" "}
        {formatRange(vizards)}
      </p>
    </div>
  );
}

// Variante para la tabla: 3 filas alineadas a la derecha
function SourcePricesCell({
  item,
  source,
  rates,
  currency,
}: {
  item: Item;
  source: "official" | "api";
  rates: Rates;
  currency: PriceCurrency;
}) {
  const keys = roundValue(sourceValue(item, source, "keys", rates));
  const scrolls = roundValue(sourceValue(item, source, "scrolls", rates));
  const vizards = sourceValue(item, source, "vizards", rates);
  if (keys === null && scrolls === null && vizards === null) {
    return <span className="text-xs text-white/25">—</span>;
  }

  const isOfficial = source === "official";
  const tone = isOfficial ? "text-emerald-300" : "text-blue-300";
  const toneSub = isOfficial ? "text-emerald-300/70" : "text-blue-300/70";

  // Filtro por moneda: un solo valor alineado a la derecha
  if (currency !== "all") {
    const value =
      currency === "keys" ? keys : currency === "scrolls" ? scrolls : vizards;
    if (value === null || value === undefined) {
      return <span className="text-xs text-white/25">—</span>;
    }
    return (
      <span className={cn("whitespace-nowrap font-semibold", tone)}>
        {CURRENCY_ICONS[currency]} {formatRange(value)}
      </span>
    );
  }

  return (
    <div className="space-y-1 text-xs">
      <p className="whitespace-nowrap">
        <span className="text-white/40">🔑</span>{" "}
        <span className={cn("font-semibold", tone)}>{formatRange(keys)}</span>
      </p>
      <p className="whitespace-nowrap">
        <span className="text-white/40">📜</span>{" "}
        <span className={cn("font-semibold", toneSub)}>{formatRange(scrolls)}</span>
      </p>
      <p className="whitespace-nowrap">
        <span className="text-white/40">🎭</span>{" "}
        <span className={cn("font-semibold", toneSub)}>{formatRange(vizards)}</span>
      </p>
    </div>
  );
}

// ── Carrusel de categorías (deslizable con flechas) ─────
function CategoryCarousel({
  categories,
  total,
  active,
  onSelect,
}: {
  categories: [string, number][];
  total: number;
  active: string;
  onSelect: (cat: string) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const start = el.scrollLeft;
    const target = start + dir * Math.max(240, el.clientWidth * 0.6);
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: Math.max(0, Math.min(max, target)), behavior: "auto" });
  };

  const chip = (key: string, label: string) => (
    <button
      key={key}
      onClick={() => onSelect(active === key ? "all" : key)}
      className={cn(
        "shrink-0 snap-start scroll-ml-1 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
        active === key
          ? "border-indigo-400/50 bg-indigo-500/20 text-white"
          : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/25 hover:text-white",
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="relative mt-4 flex items-center gap-2">
      <button
        onClick={() => scrollBy(-1)}
        aria-label="Ver categorías anteriores"
        className="shrink-0 rounded-full border border-white/10 bg-[#0b0d1f]/80 p-1.5 text-white/60 backdrop-blur transition-all hover:scale-105 hover:text-white active:scale-95"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div
        ref={trackRef}
        className="flex flex-1 gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {chip("all", `Todas (${total})`)}
        {categories.map(([cat, count]) => chip(cat, `${cat} (${count})`))}
      </div>

      <button
        onClick={() => scrollBy(1)}
        aria-label="Ver más categorías"
        className="shrink-0 rounded-full border border-white/10 bg-[#0b0d1f]/80 p-1.5 text-white/60 backdrop-blur transition-all hover:scale-105 hover:text-white active:scale-95"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

// ── Modal de detalle ─────────────────────────────────────
function ItemModal({
  item,
  items,
  rates,
  onClose,
}: {
  item: Item;
  items: Item[];
  rates: Rates;
  onClose: () => void;
}) {
  const similar = useMemo(() => {
    if (item.apiValue === null) return [];
    return items
      .filter(
        (i) =>
          i.id !== item.id &&
          i.apiValue !== null &&
          i.apiValue > 0 &&
          i.apiValue >= item.apiValue! * 0.8 &&
          i.apiValue <= item.apiValue! * 1.2,
      )
      .slice(0, 5);
  }, [item, items]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[82vh] mt-28 w-full max-w-3xl overflow-y-auto border border-white/10 bg-[#0b0d1f]/95 shadow-card backdrop-blur-2xl sm:rounded-s-3xl"
      >
        <div className="bg-[#0b0d1f] sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/[0.07] p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <Avatar
              name={item.name}
              emoji={item.emoji}
              size="xl"
              className="rounded-2xl"
            />
            <div>
              <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                {item.name}
              </h3>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <SourceBadge source={item.source} />
                <StatusBadge status={item.status} />
                <RateBadge rate={item.rateOfChange} />
              </div>
              <p className="mt-1.5 text-xs text-white/40">
                {item.category ?? "—"}
                {item.rarityLabel ? ` · ${item.rarityLabel}` : ""}
                {item.rarityPct ? ` · ${item.rarityPct.toFixed(2)}%` : ""}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          {/* Precios duales */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="gradient-border rounded-2xl p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                🟢 Precio oficial AOTR
              </p>
              {!item.valueOfficial && (
                <p className="mt-3 rounded-xl bg-white/[0.03] p-3 text-xs leading-relaxed text-white/45">
                  Este item no aparece en la hoja oficial AOTR — solo existe en
                  la API de tradeo (🔵).
                </p>
              )}
              <div className="mt-3 space-y-1.5 text-sm">
                <p className="flex justify-between">
                  <span className="text-white/50">🔑 Llaves</span>
                  <span className="font-bold text-white">
                    {formatRange(roundValue(sourceValue(item, "official", "keys", rates)))}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-white/50">📜 Pergaminos</span>
                  <span className="font-bold text-white">
                    {formatRange(roundValue(sourceValue(item, "official", "scrolls", rates)))}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-white/50">🎭 Vizard</span>
                  <span className="font-bold text-white">
                    {formatRange(sourceValue(item, "official", "vizards", rates))}
                  </span>
                </p>
              </div>
              {item.demandOfficial && (
                <p className="mt-3 text-xs text-white/40">
                  Demanda: {item.demandOfficial}
                </p>
              )}
            </div>

            <div className="gradient-border rounded-2xl p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-300">
                🔵 Precio de tradeo (API)
              </p>
              {item.apiValue === null && (
                <p className="mt-3 rounded-xl bg-white/[0.03] p-3 text-xs leading-relaxed text-white/45">
                  Este item todavía no tiene precio en la API de tradeo — solo
                  está en la hoja oficial (🟢).
                </p>
              )}
              <div className="mt-3 space-y-1.5 text-sm">
                <p className="flex justify-between">
                  <span className="text-white/50">🎭 Valor (viz)</span>
                  <span className="font-bold text-white">
                    {formatRange(sourceValue(item, "api", "vizards", rates))}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-white/50">🔑 Llaves</span>
                  <span className="font-bold text-white">
                    {formatRange(roundValue(sourceValue(item, "api", "keys", rates)))}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-white/50">📜 Pergaminos</span>
                  <span className="font-bold text-white">
                    {formatRange(roundValue(sourceValue(item, "api", "scrolls", rates)))}
                  </span>
                </p>
              </div>
              {item.obtainedFrom && (
                <p className="mt-3 text-xs text-white/40">
                  Fuente: {item.obtainedFrom}
                </p>
              )}
            </div>
          </div>

          <DemandBar item={item} />

          {/* Tax */}
          {(item.taxGems !== null || item.taxGold !== null) && (
            <div className="flex flex-wrap gap-3 text-xs text-white/55">
              {item.taxGems !== null && (
                <span className="glass rounded-lg px-3 py-1.5">
                  💎 Tax gemas: {formatCompact(item.taxGems)}
                </span>
              )}
              {item.taxGold !== null && (
                <span className="glass rounded-lg px-3 py-1.5">
                  🪙 Tax oro: {formatCompact(item.taxGold)}
                </span>
              )}
            </div>
          )}

          {/* Histórico */}
          <div className="glass rounded-2xl p-4">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
              📈 Histórico de precio
            </p>
            {item.history.length > 1 ? (
              <PriceChart data={item.history} height={190} />
            ) : (
              <p className="py-8 text-center text-sm text-white/40">
                Sin histórico disponible aún
              </p>
            )}
          </div>

          {/* Similares */}
          {similar.length > 0 && (
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                🔍 Similares (±20%)
              </p>
              <div className="flex flex-wrap gap-2">
                {similar.map((s) => (
                  <Link
                    key={s.id}
                    href={`/item/${s.slug}`}
                    onClick={onClose}
                    className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/80 transition-all hover:border-indigo-400/40 hover:text-white"
                  >
                    <Avatar name={s.name} emoji={s.emoji} size="sm" />
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <Link
            href={`/item/${item.slug}`}
            onClick={onClose}
            className="block w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 py-3 text-center text-sm font-bold text-white transition-all hover:brightness-110"
          >
            Ver página completa →
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
