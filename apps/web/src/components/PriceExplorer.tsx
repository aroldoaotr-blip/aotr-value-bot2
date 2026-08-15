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
import {
  cn,
  formatCompact,
  formatRange,
  midOf,
  roundValue,
} from "@/lib/format";
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
import {
  usePriceSource,
  PriceSourceToggle,
  type PriceSource,
} from "@/lib/price-source";

const PAGE_SIZE = 40;

type ViewMode = "cards" | "table";

type SortKey = "name" | "value-desc" | "demand-desc";

// Valor comparable de la lista activa (para ordenar)
function activeValue(item: Item, source: PriceSource): number {
  if (source === "trade") return item.apiValue ?? -1;
  const vo = item.valueOfficial;
  const viz = midOf(vo?.vizards ?? null);
  if (viz != null) return viz;
  const keys = midOf(vo?.keys ?? null);
  return keys != null ? keys / DEFAULT_RATES.keysPerVizard : -1;
}

function activeDemand(item: Item, source: PriceSource): number {
  if (source === "trade") return item.demandApi ?? -1;
  const parsed = parseInt(String(item.demandOfficial ?? ""));
  return Number.isNaN(parsed) ? -1 : parsed;
}

function sortItems(items: Item[], sort: SortKey, source: PriceSource): Item[] {
  const sorted = [...items];
  switch (sort) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "value-desc":
      return sorted.sort(
        (a, b) => activeValue(b, source) - activeValue(a, source),
      );
    case "demand-desc":
      return sorted.sort(
        (a, b) =>
          activeDemand(b, source) - activeDemand(a, source) ||
          a.name.localeCompare(b.name),
      );
  }
}

// ── Chip de rareza (colores por tier) ────────────────────
function rarityChip(item: Item) {
  const rarity = (item.rarityLabel ?? "").toLowerCase();
  if (/mythic/i.test(rarity))
    return {
      label: item.rarityLabel!,
      cls: "bg-mythic-red/20 text-mythic-red border border-mythic-red/30 shadow-[0_0_8px_rgba(239,68,68,0.2)]",
    };
  if (/legendary/i.test(rarity))
    return {
      label: item.rarityLabel!,
      cls: "bg-legendary-orange/20 text-legendary-orange border border-legendary-orange/30 shadow-[0_0_8px_rgba(249,115,22,0.2)]",
    };
  if (/epic/i.test(rarity))
    return {
      label: item.rarityLabel!,
      cls: "bg-epic-violet/20 text-epic-violet border border-epic-violet/30 shadow-[0_0_8px_rgba(139,92,246,0.2)]",
    };
  if (/rare/i.test(rarity))
    return {
      label: item.rarityLabel!,
      cls: "bg-rare-blue/20 text-rare-blue border border-rare-blue/30 shadow-[0_0_8px_rgba(59,130,246,0.2)]",
    };
  if (item.rarityLabel)
    return {
      label: item.rarityLabel,
      cls: "bg-surface-variant text-on-surface-variant border border-outline-variant/50",
    };
  return null;
}

// ── Barras de demanda (▰▰▰▱▱) ────────────────────────────
function DemandBlocks({ demand }: { demand: number | null }) {
  if (demand === null)
    return <span className="text-xs text-on-surface-variant/60">—</span>;
  const filled = Math.max(0, Math.min(5, Math.round(demand / 2)));
  const label =
    demand >= 8
      ? "Muy Alta"
      : demand >= 5
        ? "Alta"
        : demand >= 3
          ? "Media"
          : "Baja";
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-label-caps text-on-surface-variant">
        {label}
      </span>
      <span className="font-label-caps text-sm tracking-widest text-primary">
        {"▰".repeat(filled)}
        {"▱".repeat(5 - filled)}
      </span>
    </div>
  );
}

export function PriceExplorer({ items }: { items: Item[] }) {
  const { source: listSource } = usePriceSource();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortKey>("name");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<Item | null>(null);
  const [rates, setRates] = useState<Rates>(DEFAULT_RATES);
  const [view, setView] = useState<ViewMode>("cards");

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

  // La lista activa: solo items que existen en esa fuente
  const listItems = useMemo(() => {
    return listSource === "official"
      ? items.filter((i) => i.source !== "api")
      : items.filter((i) => i.source !== "official");
  }, [items, listSource]);

  const filtered = useMemo(() => {
    let list = listItems;

    if (query.trim()) {
      list = searchItems(listItems, query, 500);
    }

    if (category !== "all") {
      list = list.filter((i) => (i.category ?? "Sin categoría") === category);
    }

    return sortItems(list, sort, listSource);
  }, [listItems, query, category, sort, listSource]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  useEffect(() => {
    setPage(1);
  }, [query, category, sort, listSource]);

  return (
    <div>
      {/* ── Encabezado: título + contador + toggle ─────── */}
      <div className="fade-up mb-8 flex flex-col items-center gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col items-center gap-3 md:flex-row md:items-baseline">
          <h1 className="font-display-lg text-3xl font-bold tracking-tight text-on-surface drop-shadow-[0_0_12px_rgba(207,188,255,0.3)] md:text-5xl">
            Explorar Precios
          </h1>
          <div className="glass-panel flex items-center gap-2 rounded-full border border-primary/30 px-4 py-1.5 shadow-[0_0_10px_rgba(207,188,255,0.2)]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="font-data-tabular text-sm text-primary">
              {listItems.length} ítems
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <PriceSourceToggle />
          <div
            className="glass-panel flex rounded-full p-1"
            aria-label="Cambiar vista"
          >
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
                  "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-label-caps text-xs font-bold transition-all",
                  view === key
                    ? "bg-surface-variant text-on-surface"
                    : "text-on-surface-variant hover:text-on-surface",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="fade-up mb-6 max-w-2xl text-sm text-on-surface-variant">
        Compara el precio oficial de la hoja con el precio de tradeo de la API.
        Haz clic en cualquier item para ver su histórico completo.
      </p>
      {/* ── Toolbar de filtros (cristal) ───────────────── */}
      <div className="glass-panel flex flex-col gap-4 rounded-xl p-4 lg:flex-row lg:items-center">
        {/* Búsqueda con foco neón */}
        <div className="group relative w-full lg:w-1/3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar ítem…"
            className="input-neon w-full rounded-t-lg border-0 border-b-2 bg-surface-high/50 py-3 pl-10 pr-4 text-sm text-on-surface outline-none placeholder:text-on-surface-variant/70"
          />
        </div>

        {/* Orden */}
        <div className="flex items-center gap-2">
          <div className="glass-panel flex items-center gap-2 rounded-lg px-3 py-2">
            <ArrowUpDown className="h-3.5 w-3.5 text-outline" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-transparent font-label-caps text-xs font-bold text-on-surface-variant outline-none [&>option]:bg-surface-low"
            >
              <option value="name">Nombre</option>
              <option value="value-desc">
                Valor ({listSource === "official" ? "🟢 oficial" : "🔵 tradeo"}{" "}
                mayor)
              </option>
              <option value="demand-desc">Demanda</option>
            </select>
          </div>
        </div>

        <p className="ml-auto shrink-0 font-data-tabular text-xs text-on-surface-variant/80">
          {filtered.length} items ·{" "}
          {listSource === "official" ? "🟢 oficial" : "🔵 tradeo"}
          {category !== "all" ? ` · ${category}` : ""}
        </p>
      </div>
      {/* ── Categorías: carrusel deslizable ───────────── */}
      <CategoryCarousel
        categories={categories}
        total={listItems.length}
        active={category}
        onSelect={setCategory}
      />
      {view === "cards" ? (
        /* Grilla de tarjetas Stitch */
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pageItems.map((item, i) => (
            <StitchCard
              key={item.id}
              item={item}
              source={listSource}
              rates={rates}
              delay={0.2 + (i % 8) * 0.05}
              onOpen={() => setModal(item)}
            />
          ))}
        </div>
      ) : (
        /* Vista detalle: tabla completa con todas las métricas */
        <div className="glass-panel mt-8 overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-outline-variant/30 bg-surface-container/50 font-label-caps text-[11px] uppercase tracking-wider text-outline">
                  <th className="px-4 py-3 font-medium">Item</th>
                  <th className="px-3 py-3 font-medium">Categoría</th>
                  <th className="px-3 py-3 font-medium">Demanda</th>
                  <th className="px-3 py-3 text-right font-medium">
                    {listSource === "official"
                      ? "🟢 Precio oficial"
                      : "🔵 Precio de tradeo"}
                  </th>
                  <th className="px-3 py-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody className="font-data-tabular text-sm">
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
                    className="group cursor-pointer border-b border-outline-variant/20 outline-none transition-colors last:border-0 hover:bg-surface-variant/30 focus-visible:bg-surface-variant/40"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar
                          name={item.name}
                          officialImage={item.officialImage}
                          emoji={item.emoji}
                          size="sm"
                        />
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-on-surface group-hover:text-primary">
                            {item.name}
                          </p>
                          <div className="mt-0.5 flex items-center gap-1.5">
                            <SourceBadge source={item.source} />
                            {item.rarityLabel && (
                              <span className="text-[10px] text-on-surface-variant/70">
                                {item.rarityLabel}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs text-on-surface-variant">
                      {item.category ?? "—"}
                    </td>
                    <td className="px-3 py-3">
                      <DemandBar item={item} source={listSource} />
                    </td>
                    <td className="px-3 py-3 text-right">
                      <SourcePricesCell
                        item={item}
                        source={listSource}
                        rates={rates}
                      />
                    </td>
                    <td className="px-3 py-3">
                      {listSource === "official" ? (
                        <RateBadge rate={item.officialRate} />
                      ) : (
                        <>
                          <StatusBadge status={item.status} />
                          <RateBadge
                            rate={item.rateOfChange}
                            className="mt-1"
                          />
                        </>
                      )}
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
            className="glass-panel rounded-xl p-2 text-on-surface-variant transition-all hover:text-on-surface disabled:opacity-30"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="font-data-tabular text-xs text-on-surface-variant">
            Página <strong className="text-on-surface">{safePage}</strong> de{" "}
            {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage >= totalPages}
            className="glass-panel rounded-xl p-2 text-on-surface-variant transition-all hover:text-on-surface disabled:opacity-30"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
      {filtered.length === 0 && (
        <div className="glass-panel mt-6 rounded-2xl p-10 text-center">
          <p className="text-3xl">🔍</p>
          <p className="mt-2 font-semibold text-on-surface">Sin resultados</p>
          <p className="mt-1 text-sm text-on-surface-variant">
            Prueba con otro nombre, categoría o cambia de lista con el
            deslizable.
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

// ── Tarjeta Stitch (icono + rareza + demanda + 3 precios) ─
function StitchCard({
  item,
  source,
  rates,
  delay,
  onOpen,
}: {
  item: Item;
  source: PriceSource;
  rates: Rates;
  delay: number;
  onOpen: () => void;
}) {
  const src = source === "official" ? "official" : "api";
  const keys = roundValue(sourceValue(item, src, "keys", rates));
  const scrolls = roundValue(sourceValue(item, src, "scrolls", rates));
  const vizards = sourceValue(item, src, "vizards", rates);
  const demand =
    source === "official"
      ? (() => {
          const parsed = parseInt(String(item.demandOfficial ?? ""));
          return Number.isNaN(parsed) ? null : parsed;
        })()
      : item.demandApi;
  const chip = rarityChip(item);

  const glowColor = /mythic/i.test(item.rarityLabel ?? "")
    ? "rgba(239,68,68,0.2)"
    : /legendary/i.test(item.rarityLabel ?? "")
      ? "rgba(249,115,22,0.2)"
      : /epic/i.test(item.rarityLabel ?? "")
        ? "rgba(139,92,246,0.2)"
        : "rgba(207,188,255,0.15)";

  return (
    <article
      className="glass-panel glass-card-hover fade-up group relative flex flex-col gap-4 overflow-hidden rounded-xl p-5"
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-50 blur-3xl transition-opacity group-hover:opacity-100"
        style={{ background: glowColor }}
      />
      <div className="flex items-start justify-between">
        <div
          className="flex p-2 h-36 w-36 items-center justify-center overflow-hidden rounded-lg border border-outline-variant/30 "
          style={{
            backgroundImage: `linear-gradient(to bottom, rgb(52, 52, 52), ${glowColor})`,
          }}
        >
          <Avatar
            name={item.name}
            officialImage={item.officialImage}
            emoji={item.emoji}
            size="sm"
          />
        </div>
        {chip && (
          <span
            className={cn(
              "rounded px-2 py-0.5 font-label-caps text-[10px] font-bold",
              chip.cls,
            )}
          >
            {chip.label.toUpperCase()}
          </span>
        )}
      </div>
      <div>
        <h3 className="font-headline-lg text-xl font-semibold text-on-surface">
          {item.name}
        </h3>
        <p className="font-label-caps text-xs text-on-surface-variant">
          {item.category ?? "—"}
        </p>
      </div>
      <div className="mt-1">
        <div className="mb-1 flex justify-between font-label-caps text-[10px] text-on-surface-variant">
          <span>Demanda</span>
        </div>
        <DemandBlocks demand={demand} />
      </div>
      <div className="mt-auto flex flex-col gap-2 border-t border-outline-variant/30 pt-4 font-data-tabular text-sm">
        <div className="flex items-center justify-between">
          <span className="text-on-surface-variant">🔑 Keys</span>
          <span className="font-bold text-on-surface">
            {formatRange(keys, 0)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-on-surface-variant">📜 Scrolls</span>
          <span className="font-bold text-on-surface">
            {formatRange(scrolls, 0)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-on-surface-variant">🎭 Vizard</span>
          <span className="font-bold text-on-surface">
            {formatRange(vizards)}
          </span>
        </div>
      </div>
      <button
        onClick={onOpen}
        aria-label={`Ver detalle de ${item.name}`}
        className="absolute inset-0 z-10"
      />
    </article>
  );
}

// ── Precios de una fuente en las 3 monedas ──────────────
// (variante legacy usada por la tabla y el modal)
function SourcePricesCell({
  item,
  source,
  rates,
}: {
  item: Item;
  source: PriceSource;
  rates: Rates;
}) {
  const src = source === "official" ? "official" : "api";
  const keys = roundValue(sourceValue(item, src, "keys", rates));
  const scrolls = roundValue(sourceValue(item, src, "scrolls", rates));
  const vizards = sourceValue(item, src, "vizards", rates);
  if (keys === null && scrolls === null && vizards === null) {
    return <span className="text-xs text-on-surface-variant/40">—</span>;
  }

  const isOfficial = source === "official";
  const tone = isOfficial ? "text-official-green" : "text-trade-blue";
  const toneSub = isOfficial ? "text-official-green/70" : "text-trade-blue/70";

  return (
    <div className="space-y-1 text-xs">
      <p className="whitespace-nowrap">
        <span className="text-on-surface-variant/50">🔑</span>{" "}
        <span className={cn("font-semibold", tone)}>
          {formatRange(keys, 0)}
        </span>
      </p>
      <p className="whitespace-nowrap">
        <span className="text-on-surface-variant/50">📜</span>{" "}
        <span className={cn("font-semibold", toneSub)}>
          {formatRange(scrolls, 0)}
        </span>
      </p>
      <p className="whitespace-nowrap">
        <span className="text-on-surface-variant/50">🎭</span>{" "}
        <span className={cn("font-semibold", toneSub)}>
          {formatRange(vizards)}
        </span>
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
        "shrink-0 snap-start rounded-full border px-4 py-1.5 font-label-caps text-xs font-bold transition-all",
        active === key
          ? "border-primary/20 bg-primary-container text-on-primary-container"
          : "glass-panel text-on-surface-variant hover:bg-surface-highest hover:text-on-surface",
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="relative mt-6 flex items-center gap-2">
      <button
        onClick={() => scrollBy(-1)}
        aria-label="Ver categorías anteriores"
        className="glass-panel shrink-0 rounded-full p-1.5 text-on-surface-variant transition-all hover:scale-105 hover:text-on-surface active:scale-95"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div
        ref={trackRef}
        className="hide-scrollbar flex flex-1 gap-2 overflow-x-auto pb-1"
      >
        {chip("all", `Todas (${total})`)}
        {categories.map(([cat, count]) => chip(cat, `${cat} (${count})`))}
      </div>

      <button
        onClick={() => scrollBy(1)}
        aria-label="Ver más categorías"
        className="glass-panel shrink-0 rounded-full p-1.5 text-on-surface-variant transition-all hover:scale-105 hover:text-on-surface active:scale-95"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

// ── Modal de detalle (muestra AMBAS listas — comparación) ─
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
        className="max-h-[82vh] mt-28 w-full max-w-3xl overflow-y-auto border border-outline-variant/30 bg-surface-low/95 shadow-card backdrop-blur-2xl sm:rounded-s-3xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-outline-variant/30 bg-surface-low p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <Avatar
              name={item.name}
              officialImage={item.officialImage}
              emoji={item.emoji}
              size="xl"
              className="rounded-2xl"
            />
            <div>
              <h3 className="font-display-lg text-lg font-bold text-on-surface sm:text-xl">
                {item.name}
              </h3>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <SourceBadge source={item.source} />
                <StatusBadge status={item.status} />
                <RateBadge rate={item.rateOfChange} />
              </div>
              <p className="mt-1.5 text-xs text-on-surface-variant">
                {item.category ?? "—"}
                {item.rarityLabel ? ` · ${item.rarityLabel}` : ""}
                {item.rarityPct ? ` · ${item.rarityPct.toFixed(2)}%` : ""}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-on-surface-variant transition-colors hover:bg-white/10 hover:text-on-surface"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          {/* Precios duales */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="glass-panel rounded-2xl p-4">
              <p className="font-label-caps text-xs font-bold uppercase tracking-wider text-official-green">
                🟢 Precio oficial (hoja AOTR)
              </p>
              <div className="mt-3 space-y-1.5">
                <ModalPrice
                  icon="🔑"
                  label="Llaves"
                  value={roundValue(
                    sourceValue(item, "official", "keys", rates),
                  )}
                />
                <ModalPrice
                  icon="📜"
                  label="Pergaminos"
                  value={roundValue(
                    sourceValue(item, "official", "scrolls", rates),
                  )}
                />
                <ModalPrice
                  icon="🎭"
                  label="Vizard"
                  value={sourceValue(item, "official", "vizards", rates)}
                />
              </div>
            </div>
            <div className="glass-panel rounded-2xl p-4">
              <p className="font-label-caps text-xs font-bold uppercase tracking-wider text-trade-blue">
                🔵 Precio de tradeo (API)
              </p>
              <div className="mt-3 space-y-1.5">
                <ModalPrice
                  icon="🎭"
                  label="Valor (viz)"
                  value={sourceValue(item, "api", "vizards", rates)}
                />
                <ModalPrice
                  icon="🔑"
                  label="Llaves"
                  value={roundValue(sourceValue(item, "api", "keys", rates))}
                />
                <ModalPrice
                  icon="📜"
                  label="Pergaminos"
                  value={roundValue(sourceValue(item, "api", "scrolls", rates))}
                />
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/item/${item.slug}`}
              onClick={onClose}
              className="rounded-xl bg-gradient-to-r from-primary to-primary-container px-5 py-2.5 text-sm font-bold text-on-primary shadow-[0_2px_0_rgba(255,255,255,0.2)_inset,0_4px_12px_rgba(103,80,164,0.4)] transition-all hover:brightness-110"
            >
              Ver página completa →
            </Link>
            <Link
              href={`/trade?item=${item.slug}`}
              onClick={onClose}
              className="glass-panel rounded-xl px-5 py-2.5 text-sm font-bold text-on-surface transition-all hover:border-primary/40"
            >
              ⚖️ Comparar en trade
            </Link>
          </div>

          {/* Similares */}
          {similar.length > 0 && (
            <div>
              <h4 className="font-label-caps mb-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Similares
              </h4>
              <div className="flex flex-wrap gap-2">
                {similar.map((s) => (
                  <Link
                    key={s.id}
                    href={`/item/${s.slug}`}
                    onClick={onClose}
                    className="glass-panel flex items-center gap-2 rounded-full px-3 py-1.5 text-xs transition-all hover:border-primary/40"
                  >
                    <span className="font-medium text-on-surface">
                      {s.name}
                    </span>
                    <span className="font-data-tabular text-on-surface-variant">
                      {formatCompact(s.apiValue)} viz
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ModalPrice({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: ReturnType<typeof sourceValue>;
}) {
  if (value === null || value === undefined) return null;
  return (
    <div className="flex items-center justify-between rounded-lg bg-surface-container/50 px-3 py-2">
      <span className="text-xs text-on-surface-variant">
        {icon} {label}
      </span>
      <span className="font-data-tabular text-sm font-bold text-on-surface">
        {formatRange(value)}
      </span>
    </div>
  );
}
