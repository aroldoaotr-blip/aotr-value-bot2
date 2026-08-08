"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Scale, Search, Trash2, X, Zap } from "lucide-react";
import type { ItemSource, ValueOrRange } from "@/lib/types";
import { cn, formatCompact, midOf } from "@/lib/format";
import { DEFAULT_RATES, getLocalRates, type Rates } from "@/lib/rates";
import { Avatar } from "./Avatar";

type LightItem = {
  id: string;
  name: string;
  slug: string;
  emoji: string | null;
  category: string | null;
  source: ItemSource;
  apiValue: number | null;
  apiKeys: number | null;
  valueOfficial: { keys: ValueOrRange; scrolls: ValueOrRange; vizards: ValueOrRange } | null;
};

type Entry = { item: LightItem; qty: number };

const mid = (v: ValueOrRange): number | null => midOf(v);

function totalsFor(entries: Entry[], source: "official" | "trade", rates: Rates) {
  let keys = 0;
  let scrolls = 0;
  let vizards = 0;
  const { keysPerVizard, keysPerScroll } = rates;

  for (const { item, qty } of entries) {
    if (source === "trade") {
      const v = item.apiValue ?? 0;
      vizards += v * qty;
      keys += v * keysPerVizard * qty;
    } else {
      const k = mid(item.valueOfficial?.keys ?? null) ?? 0;
      const s = mid(item.valueOfficial?.scrolls ?? null) ?? (k > 0 ? k / keysPerScroll : 0);
      const vz =
        mid(item.valueOfficial?.vizards ?? null) ??
        (k > 0 ? k / keysPerVizard : 0);
      keys += k * qty;
      scrolls += s * qty;
      vizards += vz * qty;
    }
  }

  scrolls = scrolls || keys / keysPerScroll;
  return { keys, scrolls, vizards };
}

function SidePanel({
  title,
  subtitle,
  entries,
  query,
  suggestions,
  accent,
  onQuery,
  onAdd,
  onRemove,
  onQty,
  onSuggest,
  currencies,
  placeholder
}: {
  title: string;
  subtitle: string;
  entries: Entry[];
  query: string;
  suggestions: LightItem[];
  accent: "emerald" | "rose";
  onQuery: (q: string) => void;
  onAdd: (item: LightItem) => void;
  onRemove: (id: string) => void;
  onQty: (id: string, delta: number) => void;
  onSuggest: () => void;
  currencies?: LightItem[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const input = (
    <div className="glass flex items-center gap-2 rounded-xl px-3 py-2">
      <Search className="h-4 w-4 shrink-0 text-white/35" />
      <input
        value={query}
        onChange={(e) => {
          onQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-white placeholder-white/35 outline-none"
      />
    </div>
  );

  return (
    <div className="gradient-border flex flex-col rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={cn("font-display text-sm font-bold uppercase tracking-widest", accent === "emerald" ? "text-emerald-300" : "text-rose-300")}>
            {title}
          </h3>
          <p className="mt-0.5 text-[11px] text-white/40">{subtitle}</p>
        </div>
        <button
          onClick={onSuggest}
          title="Sugerir items similares"
          className="glass rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-white/60 transition-all hover:text-white"
        >
          ✨ Sugerir
        </button>
      </div>

      <div ref={wrapRef} className="relative mt-3">
        {input}
        <AnimatePresence>
          {open && suggestions.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="glass-strong absolute left-0 right-0 top-full z-30 mt-2 max-h-60 overflow-y-auto rounded-xl py-1 shadow-card"
            >
              {suggestions.slice(0, 7).map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onAdd(item);
                      onQuery("");
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-left transition-colors hover:bg-white/[0.07]"
                  >
                    <Avatar name={item.name} emoji={item.emoji} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{item.name}</p>
                      <p className="text-[10px] text-white/40">
                        🔵 {formatCompact(item.apiValue)} viz · 🟢 {formatCompact(mid(item.valueOfficial?.keys ?? null))} llaves
                      </p>
                    </div>
                    <Plus className="h-3.5 w-3.5 text-white/40" />
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 space-y-2">
        {entries.length === 0 && (
          <p className="rounded-xl bg-white/[0.03] py-4 text-center text-xs text-white/35">
            Agrega items con el buscador
          </p>
        )}

        {currencies && currencies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {currencies.map((c) => (
              <button
                key={c.id}
                onClick={() => onAdd(c)}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/60 transition-all hover:border-white/25 hover:text-white"
              >
                ＋{c.name}
              </button>
            ))}
          </div>
        )}
        {entries.map(({ item, qty }) => (
          <div key={item.id} className="glass flex items-center gap-2.5 rounded-xl p-2.5">
            <Link href={`/item/${item.slug}`}>
              <Avatar name={item.name} emoji={item.emoji} size="sm" />
            </Link>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{item.name}</p>
              <p className="text-[10px] text-white/40">
                🔵 {formatCompact(item.apiValue)} viz · 🟢 {formatCompact(mid(item.valueOfficial?.keys ?? null))} llaves
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onQty(item.id, -1)}
                className="rounded-md bg-white/[0.06] p-1 text-white/60 transition-colors hover:text-white"
                aria-label="Quitar unidad"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-6 text-center text-sm font-bold text-white">×{qty}</span>
              <button
                onClick={() => onQty(item.id, 1)}
                className="rounded-md bg-white/[0.06] p-1 text-white/60 transition-colors hover:text-white"
                aria-label="Añadir unidad"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="rounded-md p-1 text-white/30 transition-colors hover:text-rose-300"
              aria-label="Quitar item"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CompareTool() {
  const [items, setItems] = useState<LightItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [leftQ, setLeftQ] = useState("");
  const [rightQ, setRightQ] = useState("");
  const [left, setLeft] = useState<Entry[]>([]);
  const [right, setRight] = useState<Entry[]>([]);
  const [source, setSource] = useState<"official" | "trade">("official");
  const [rates, setRates] = useState<Rates>(DEFAULT_RATES);

  useEffect(() => {
    fetch("/api/items?light=1")
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items ?? []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Tasas del admin (localStorage primero, luego BD vía API)
  useEffect(() => {
    const local = getLocalRates();
    if (local) {
      setRates(local);
      return;
    }
    fetch("/api/rates")
      .then((r) => r.json())
      .then((data) => {
        if (data.rates) setRates(data.rates);
      })
      .catch(() => {});
  }, []);

  const vizardRate = useMemo(
    () => rates.keysPerVizard,
    [rates]
  );

  const suggestionsFor = (q: string, exclude: string[]): LightItem[] => {
    const query = q.trim().toLowerCase();
    if (query.length < 2) return items.slice(0, 5);
    return items
      .filter((i) => !exclude.includes(i.id))
      .filter(
        (i) => i.name.toLowerCase().includes(query) || i.category?.toLowerCase().includes(query)
      )
      .slice(0, 7);
  };

  // Valor comparable: usa trade (viz) o, si no hay, el oficial convertido
  const comparableValue = (item: LightItem): number =>
    item.apiValue ?? (mid(item.valueOfficial?.keys ?? null) ?? 0) / vizardRate;

  const similarTo = (entries: Entry[]): LightItem[] => {
    const mostValuable = [...entries].sort(
      (a, b) => comparableValue(b.item) - comparableValue(a.item)
    )[0];
    if (!mostValuable) return [];
    const v = comparableValue(mostValuable.item);
    if (!v) return [];

    return items
      .filter(
        (i) =>
          !entries.some((e) => e.item.id === i.id) &&
          comparableValue(i) > 0 &&
          comparableValue(i) >= v * 0.8 &&
          comparableValue(i) <= v * 1.2
      )
      .slice(0, 4);
  };

  // Monedas como items sintéticos (paridad con el bot: "500 llaves")
  const currencyChips = useMemo<LightItem[]>(() => {
    const mk = (label: string, keys: number): LightItem => ({
      id: `cur-${label}`,
      name: label,
      slug: "",
      emoji: null,
      category: "Moneda",
      source: "both",
      apiValue: Number((keys / rates.keysPerVizard).toFixed(6)),
      apiKeys: keys,
      valueOfficial: {
        keys,
        scrolls: keys / rates.keysPerScroll,
        vizards: keys / rates.keysPerVizard
      }
    });
    return [mk("100 llaves", 100), mk("500 llaves", 500), mk("50 pergaminos", 150)];
  }, [rates]);

  const add = (side: "left" | "right") => (item: LightItem) => {
    const setter = side === "left" ? setLeft : setRight;
    setter((prev) => {
      const existing = prev.find((e) => e.item.id === item.id);
      if (existing) {
        return prev.map((e) => (e.item.id === item.id ? { ...e, qty: e.qty + 1 } : e));
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const remove = (side: "left" | "right") => (id: string) => {
    (side === "left" ? setLeft : setRight)((prev) => prev.filter((e) => e.item.id !== id));
  };

  const qty = (side: "left" | "right") => (id: string, delta: number) => {
    (side === "left" ? setLeft : setRight)((prev) =>
      prev
        .map((e) => (e.item.id === id ? { ...e, qty: Math.max(1, e.qty + delta) } : e))
        .filter((e) => e.qty > 0)
    );
  };

  const leftT = totalsFor(left, source, rates);
  const rightT = totalsFor(right, source, rates);
  const diffT = {
    keys: rightT.keys - leftT.keys,
    scrolls: rightT.scrolls - leftT.scrolls,
    vizards: rightT.vizards - leftT.vizards
  };

  const result = useMemo(() => {
    if (!left.length || !right.length) return null;
    const leftV = leftT.vizards;
    const rightV = rightT.vizards;
    if (!leftV && !rightV) return { empty: true };
    // Oferta izquierda sin valor pero derecha con valor → victoria total
    if (!leftV && rightV > 0) return { empty: false, difference: rightV, percentage: Number.POSITIVE_INFINITY, result: "W" as const };

    const difference = rightV - leftV;
    const percentage = leftV > 0 ? (difference / leftV) * 100 : 0;

    let r: "W" | "L" | "Fair" = "Fair";
    if (percentage > 10) r = "W";
    if (percentage < -10) r = "L";

    return { empty: false, difference, percentage, result: r };
  }, [leftT, rightT, left.length, right.length]);

  const resultMeta =
    result?.result === "W"
      ? { label: "GANAS", color: "text-emerald-400", bg: "from-emerald-500/10", emoji: "🟢" }
      : result?.result === "L"
        ? { label: "PIERDES", color: "text-rose-400", bg: "from-rose-500/10", emoji: "🔴" }
        : { label: "JUSTO", color: "text-amber-400", bg: "from-amber-500/10", emoji: "🟡" };

  return (
    <div>
      {/* Selector de fuente */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-white/45">
          <Scale className="h-4 w-4 text-indigo-300" />
          Misma mecánica que el bot de Discord: compara dos ofertas y te dice si ganas, pierdes o es justo.
        </div>
        <div className="glass flex rounded-xl p-1">
          {(
            [
              ["official", "🟢 Precios oficiales"],
              ["trade", "🔵 Precios de tradeo"]
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSource(key)}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all",
                source === key ? "bg-indigo-500/30 text-white" : "text-white/45 hover:text-white"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <SidePanel
          title="📤 Tu oferta"
          subtitle="Lo que vas a entregar"
          entries={left}
          query={leftQ}
          suggestions={suggestionsFor(leftQ, left.map((e) => e.item.id))}
          accent="emerald"
          currencies={currencyChips}
          onQuery={setLeftQ}
          onAdd={add("left")}
          onRemove={remove("left")}
          onQty={qty("left")}
          onSuggest={() => {
            const s = similarTo(left);
            s.forEach((item) => add("left")(item));
          }}
          placeholder="Busca items… ej: susano"
        />
        <SidePanel
          title="📥 Su oferta"
          subtitle="Lo que te ofrecen a cambio"
          entries={right}
          query={rightQ}
          suggestions={suggestionsFor(rightQ, right.map((e) => e.item.id))}
          accent="rose"
          currencies={currencyChips}
          onQuery={setRightQ}
          onAdd={add("right")}
          onRemove={remove("right")}
          onQty={qty("right")}
          onSuggest={() => {
            const s = similarTo(right);
            s.forEach((item) => add("right")(item));
          }}
          placeholder="Busca items… ej: vizard"
        />
      </div>

      {/* Resultado */}
      {result?.empty ? (
        <div className="glass mt-6 rounded-3xl p-8 text-center">
          <p className="text-2xl">🔀</p>
          <p className="mt-2 font-semibold text-white">
            Ninguno de estos items tiene precio en esta fuente
          </p>
          <p className="mx-auto mt-1 max-w-md text-sm text-white/45">
            Cambia a la otra fuente de precios (🟢 oficial / 🔵 tradeo) para calcular la
            comparación.
          </p>
        </div>
      ) : result ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={cn("gradient-border mt-6 overflow-hidden rounded-3xl bg-gradient-to-r to-transparent", resultMeta.bg)}
        >
          <div className="grid gap-4 p-6 lg:grid-cols-[1fr_auto_1fr_auto]">
            <Totals title="Tu oferta" totals={leftT} />
            <Totals title="Diferencia" totals={diffT} accent="auto" highlight />
            <Totals title="Su oferta" totals={rightT} />
            <div className="flex flex-col items-center justify-center gap-1 border-t border-white/10 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <span className={cn("font-display text-4xl font-black", resultMeta.color)}>
                {resultMeta.emoji} {resultMeta.label}
              </span>
              <span className="text-sm text-white/50">
                {result.percentage === Number.POSITIVE_INFINITY
                  ? "¡Desde cero!"
                  : `${(result.percentage ?? 0) >= 0 ? "+" : ""}${(result.percentage ?? 0).toFixed(2)}% de diferencia`}
              </span>
              <span className="text-xs text-white/35">
                {source === "official" ? "Según precios oficiales AOTR" : "Según precios de tradeo (API)"}
              </span>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="glass mt-6 rounded-3xl p-8 text-center">
          <p className="text-3xl">⚖️</p>
          <p className="mt-2 font-semibold text-white">Agrega items a ambas ofertas</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-white/45">
            El comparador usa la misma lógica del bot: si el valor de su oferta supera el tuyo en más
            de un 10%, ¡estás ganando el trade!
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
            {[
              ["Susanoo", "susano"],
              ["Vizard", "vizard"],
              ["Azure Flames", "azure"],
              ["Deus Ex Machina", "deus"],
              ["Mahoraga", "maho"]
            ].map(([label, q]) => (
              <button
                key={q}
                onClick={() => {
                  const found = items.find((i) => i.name.toLowerCase().includes(q));
                  if (found) {
                    if (!left.length) add("left")(found);
                    else if (!right.length) add("right")(found);
                    else add("right")(found);
                  }
                }}
                className="glass rounded-full px-3 py-1.5 font-medium text-white/60 transition-all hover:text-white"
              >
                <Zap className="mr-1 inline h-3 w-3 text-indigo-300" />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="mt-6 text-center text-sm text-white/40">Cargando items…</div>
      )}
    </div>
  );
}

function Totals({
  title,
  totals,
  accent,
  highlight
}: {
  title: string;
  totals: { keys: number; scrolls: number; vizards: number };
  accent?: "auto";
  highlight?: boolean;
}) {
  const sign = (v: number) => (v > 0 ? "+" : v < 0 ? "−" : "");
  const tone = (v: number) =>
    accent === "auto" ? (v > 0 ? "text-emerald-400" : v < 0 ? "text-rose-400" : "text-white") : "text-white";

  return (
    <div className={cn("rounded-2xl px-3 py-2.5", highlight && "bg-white/[0.06] ring-1 ring-white/10")}>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40">{title}</p>
      <div className="mt-2 space-y-1 text-sm">
        <p className="flex justify-between">
          <span className="text-white/50">🔑 Llaves</span>
          <span className={cn("font-bold", tone(totals.keys))}>
            {sign(totals.keys)}{formatCompact(Math.abs(totals.keys))}
          </span>
        </p>
        <p className="flex justify-between">
          <span className="text-white/50">📜 Pergaminos</span>
          <span className={cn("font-bold", tone(totals.scrolls))}>
            {sign(totals.scrolls)}{formatCompact(Math.abs(totals.scrolls))}
          </span>
        </p>
        <p className="flex justify-between">
          <span className="text-white/50">🎭 Vizard</span>
          <span className={cn("font-bold", tone(totals.vizards))}>
            {sign(totals.vizards)}{formatCompact(Math.abs(totals.vizards))}
          </span>
        </p>
      </div>
    </div>
  );
}
