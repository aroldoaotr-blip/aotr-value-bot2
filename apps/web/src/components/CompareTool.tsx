"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Scale, Search, X, Zap } from "lucide-react";
import type { ItemSource, ValueOrRange } from "@/lib/types";
import { cn, formatCompact, midOf } from "@/lib/format";
import { DEFAULT_RATES, getLocalRates, type Rates } from "@/lib/rates";
import { usePriceSource } from "@/lib/price-source";
import { Avatar } from "./Avatar";

type LightItem = {
  id: string;
  name: string;
  slug: string;
  officialImage?: string | null;
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
  placeholder,
  totals,
  winner = false
}: {
  title: string;
  subtitle: string;
  entries: Entry[];
  query: string;
  suggestions: LightItem[];
  accent: "primary" | "tertiary";
  onQuery: (q: string) => void;
  onAdd: (item: LightItem) => void;
  onRemove: (id: string) => void;
  onQty: (id: string, delta: number) => void;
  onSuggest: () => void;
  currencies?: LightItem[];
  placeholder: string;
  totals: { keys: number; scrolls: number; vizards: number };
  winner?: boolean;
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

  const accentCls =
    accent === "primary"
      ? { header: "text-primary", icon: "text-primary", focus: "focus:border-primary" }
      : { header: "text-tertiary", icon: "text-tertiary", focus: "focus:border-tertiary" };

  // El lado ganador se marca con borde DORADO; el perdedor queda neutro.
  const borderCls = winner
    ? "neon-border-tertiary neon-glow-primary"
    : accent === "primary"
      ? "neon-border-primary"
      : "neon-border-tertiary";

  return (
    <section
      className={cn(
        "glass-panel relative flex flex-col gap-6 rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.5),0_0_20px_rgba(207,188,255,0.05)] transition-all duration-500",
        borderCls
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className={cn("font-label-caps text-xs font-bold uppercase tracking-widest", accentCls.header)}>
            {title}
          </h2>
          <p className="mt-0.5 text-[11px] text-on-surface-variant/80">{subtitle}</p>
        </div>
        <button
          onClick={onSuggest}
          title="Sugerir items similares"
          className="glass-panel rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-on-surface-variant transition-all hover:text-on-surface"
        >
          ✨ Sugerir
        </button>
      </div>

      {/* Buscador con borde inferior neón */}
      <div ref={wrapRef} className="relative">
        <div className="relative">
          <Search className={cn("absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline", accentCls.icon)} />
          <input
            value={query}
            onChange={(e) => {
              onQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className={cn(
              "input-neon w-full rounded-t-md border-0 border-b-2 bg-surface-container/50 py-3 pl-10 pr-4 text-sm text-on-surface outline-none placeholder:text-outline",
              accentCls.focus
            )}
          />
        </div>
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
                    <Avatar name={item.name} officialImage={item.officialImage} emoji={item.emoji} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-on-surface">{item.name}</p>
                      <p className="text-[10px] text-on-surface-variant/70">
                        🔵 {formatCompact(item.apiValue)} viz · 🟢 {formatCompact(mid(item.valueOfficial?.keys ?? null))} llaves
                      </p>
                    </div>
                    <Plus className="h-3.5 w-3.5 text-outline" />
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Items agregados */}
      <div className="flex min-h-[200px] max-h-[300px] flex-col gap-3 overflow-y-auto pr-2">
        {entries.length === 0 && (
          <p className="rounded-xl bg-surface-container/40 py-6 text-center text-xs text-on-surface-variant/70">
            Agrega items con el buscador
          </p>
        )}

        {currencies && currencies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {currencies.map((c) => (
              <button
                key={c.id}
                onClick={() => onAdd(c)}
                className="rounded-full border border-outline-variant/40 bg-surface-container px-2.5 py-1 text-[11px] font-medium text-on-surface-variant transition-all hover:border-primary/40 hover:text-on-surface"
              >
                ＋{c.name}
              </button>
            ))}
          </div>
        )}

        {entries.map(({ item, qty }) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border border-outline-variant/10 bg-surface-low p-3 transition-colors hover:bg-surface-container"
          >
            <div className="flex items-center gap-3">
              <Link href={`/item/${item.slug}`} onClick={(e) => e.stopPropagation()}>
                <Avatar name={item.name} officialImage={item.officialImage} emoji={item.emoji} size="sm" />
              </Link>
              <div>
                <div className="font-medium text-on-surface">{item.name}</div>
                <div className="text-xs text-on-surface-variant/80">
                  {item.category ?? ""}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end gap-0.5 font-data-tabular text-sm">
                <span className="flex items-center gap-1"><span className="text-[10px]">🔑</span> {formatCompact(item.apiKeys ?? mid(item.valueOfficial?.keys ?? null))}</span>
                <span className="flex items-center gap-1 text-[10px] text-on-surface-variant/70"><span>🎭</span> {formatCompact(item.apiValue)}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onQty(item.id, -1)}
                  className="rounded-md bg-surface-variant p-1 text-on-surface-variant transition-colors hover:text-on-surface"
                  aria-label="Quitar unidad"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-6 text-center font-data-tabular text-sm font-bold text-on-surface">×{qty}</span>
                <button
                  onClick={() => onQty(item.id, 1)}
                  className="rounded-md bg-surface-variant p-1 text-on-surface-variant transition-colors hover:text-on-surface"
                  aria-label="Añadir unidad"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="rounded-md p-1 text-outline transition-colors hover:text-error"
                aria-label="Quitar item"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Totales */}
      <div className="mt-auto border-t border-outline-variant/20 pt-4">
        <div className="mb-2 text-[10px] font-label-caps font-bold tracking-wider text-on-surface-variant">
          VALOR TOTAL (referencia 🔑)
        </div>
        <div className="flex items-center gap-4 font-data-tabular text-lg">
          <span className="flex items-center gap-1 text-on-surface">
            <span className="text-sm">🔑</span>{" "}
            <span className={cn("font-bold", accent === "primary" ? "text-primary" : "text-tertiary")}>
              {formatCompact(Math.round(totals.keys))}
            </span>
          </span>
          <span className="flex items-center gap-1 text-on-surface">
            <span className="text-sm">📜</span>{" "}
            <span className="font-bold text-on-surface-variant">{formatCompact(Math.round(totals.scrolls))}</span>
          </span>
          <span className="flex items-center gap-1 text-on-surface">
            <span className="text-sm">🎭</span>{" "}
            <span className="font-bold text-on-surface-variant">{formatCompact(Number(totals.vizards.toFixed(2)))}</span>
          </span>
        </div>
      </div>
    </section>
  );
}

export function CompareTool() {
  const [items, setItems] = useState<LightItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [leftQ, setLeftQ] = useState("");
  const [rightQ, setRightQ] = useState("");
  const [left, setLeft] = useState<Entry[]>([]);
  const [right, setRight] = useState<Entry[]>([]);
  const { source: ctxSource, setSource: setCtxSource } = usePriceSource();
  const [source, setSource] = useState<"official" | "trade">("official");
  const [rates, setRates] = useState<Rates>(DEFAULT_RATES);

  // Sigue el deslizable global (navbar / precios) cuando cambia
  useEffect(() => {
    setSource(ctxSource);
  }, [ctxSource]);

  const changeSource = (s: "official" | "trade") => {
    setSource(s);
    setCtxSource(s);
  };

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
      ? { label: "GANAS", color: "text-neon-green", border: "border-[#4ade80]/50", bg: "bg-[#4ade80]/10", msg: "Su oferta vale más que la tuya. ¡Estás ganando el trade!" }
      : result?.result === "L"
        ? { label: "PIERDES", color: "text-neon-red", border: "border-[#f87171]/50", bg: "bg-[#f87171]/10", msg: "Tu oferta vale más que la suya. Estás perdiendo valor en este trade." }
        : { label: "JUSTO", color: "text-[#a3e635] drop-shadow-[0_0_10px_rgba(163,230,53,0.5)]", border: "border-[#a3e635]/50", bg: "bg-[#a3e635]/10", msg: "Ambas ofertas tienen un valor muy parecido. Es un trade justo." };

  // Lado ganador (borde dorado) y ángulo de la balanza.
  const winner: "left" | "right" | null =
    result && !result.empty
      ? result.result === "W"
        ? "right"
        : result.result === "L"
          ? "left"
          : null
      : null;
  const tilt =
    result && !result.empty
      ? result.percentage === Number.POSITIVE_INFINITY
        ? 16
        : Math.max(-16, Math.min(16, (result.percentage ?? 0) * 0.4))
      : -3;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      /* sin clipboard */
    }
  };

  const sign = (v: number) => (v > 0 ? "+" : v < 0 ? "−" : "");
  const toneDiff = (v: number) => (v > 0 ? "text-neon-green" : v < 0 ? "text-error" : "text-on-surface");

  return (
    <div>
      {/* Selector de fuente */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-on-surface-variant/80">
          <Scale className="h-4 w-4 text-primary" />
          Misma mecánica que el bot de Discord: compara dos ofertas y te dice si ganas, pierdes o es justo.
        </div>
        <div className="glass-panel flex rounded-full p-1">
          {(
            [
              ["official", "🟢 Oficial"],
              ["trade", "🔵 Tradeo"]
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => changeSource(key)}
              className={cn(
                "rounded-full px-3.5 py-1.5 font-label-caps text-xs font-bold transition-all",
                source === key
                  ? key === "official"
                    ? "bg-[#4ade80]/20 text-neon-green"
                    : "bg-[#60a5fa]/20 text-[#60a5fa]"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Balanza de dos lados */}
      <div className="relative grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
        <div className="pointer-events-none absolute left-0 right-0 top-[40%] z-[-1] hidden h-[2px] bg-surface-high lg:block" />

        <SidePanel
          title="TU OFERTA"
          subtitle="Lo que vas a entregar"
          entries={left}
          query={leftQ}
          suggestions={suggestionsFor(leftQ, left.map((e) => e.item.id))}
          accent="primary"
          currencies={currencyChips}
          onQuery={setLeftQ}
          onAdd={add("left")}
          onRemove={remove("left")}
          onQty={qty("left")}
          onSuggest={() => {
            const s = similarTo(left);
            s.forEach((item) => add("left")(item));
          }}
          placeholder="Añadir ítem…"
          totals={leftT}
          winner={winner === "left"}
        />

        {/* VS central */}
        <div className="flex flex-col items-center justify-center self-center py-4 lg:py-0">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-outline-variant/30 bg-surface-high shadow-lg">
            <span className="font-headline-lg text-lg font-bold italic text-on-surface">VS</span>
          </div>
          <div className="relative hidden h-20 w-32 items-center justify-center lg:flex">
            <div className="absolute bottom-0 z-10 h-4 w-4 rounded-full bg-surface-variant" />
            <div className="absolute bottom-2 z-10 h-0 w-0 border-b-[15px] border-l-[10px] border-r-[10px] border-b-surface-variant border-l-transparent border-r-transparent" />
            {/* Balanza: se inclina según quién gana (transición suave) */}
            <div
              className="absolute top-8 h-1 w-full origin-center bg-gradient-to-r from-primary via-surface-variant to-tertiary transition-transform duration-700 ease-out"
              style={{ transform: `rotate(${tilt}deg)` }}
            />
          </div>
        </div>

        <SidePanel
          title="SU OFERTA"
          subtitle="Lo que te ofrecen a cambio"
          entries={right}
          query={rightQ}
          suggestions={suggestionsFor(rightQ, right.map((e) => e.item.id))}
          accent="tertiary"
          currencies={currencyChips}
          onQuery={setRightQ}
          onAdd={add("right")}
          onRemove={remove("right")}
          onQty={qty("right")}
          onSuggest={() => {
            const s = similarTo(right);
            s.forEach((item) => add("right")(item));
          }}
          placeholder="Añadir ítem…"
          totals={rightT}
          winner={winner === "right"}
        />
      </div>

      {/* Veredicto */}
      {result?.empty ? (
        <div className="glass-panel mt-6 rounded-xl p-8 text-center">
          <p className="text-2xl">🔀</p>
          <p className="mt-2 font-semibold text-on-surface">
            Ninguno de estos items tiene precio en esta fuente
          </p>
          <p className="mx-auto mt-1 max-w-md text-sm text-on-surface-variant">
            Cambia a la otra fuente de precios (🟢 oficial / 🔵 tradeo) para calcular la
            comparación.
          </p>
        </div>
      ) : result ? (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel relative mt-6 flex flex-col items-center overflow-hidden rounded-xl p-6 text-center md:p-8"
        >
          <div className="absolute left-0 top-0 h-16 w-16 rounded-tl-xl border-l-2 border-t-2 border-primary/50" />
          <h3 className="mb-6 font-label-caps text-xs font-bold tracking-[0.2em] text-outline">
            VEREDICTO DE EQUIDAD
          </h3>
          <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
            {/* Diferencia por moneda */}
            <div className="w-full text-left md:w-auto">
              <div className="mb-1 border-b border-outline-variant/30 pb-2 text-sm font-medium text-on-surface-variant">
                DIFERENCIA (Su oferta − Tu oferta)
              </div>
              <div className="mt-2 space-y-2 font-data-tabular text-sm">
                <div className="flex items-center justify-between gap-8">
                  <span className="flex items-center gap-2 text-on-surface"><span className="text-xs">🔑</span> Keys</span>
                  <span className={toneDiff(diffT.keys)}>{sign(diffT.keys)}{formatCompact(Math.abs(diffT.keys))}</span>
                </div>
                <div className="flex items-center justify-between gap-8">
                  <span className="flex items-center gap-2 text-on-surface"><span className="text-xs">📜</span> Scrolls</span>
                  <span className={toneDiff(diffT.scrolls)}>{sign(diffT.scrolls)}{formatCompact(Math.abs(diffT.scrolls))}</span>
                </div>
                <div className="flex items-center justify-between gap-8">
                  <span className="flex items-center gap-2 text-on-surface"><span className="text-xs">🎭</span> Vizards</span>
                  <span className={toneDiff(diffT.vizards)}>{sign(diffT.vizards)}{formatCompact(Math.abs(diffT.vizards))}</span>
                </div>
              </div>
            </div>
            <div className="hidden h-24 w-px bg-outline-variant/30 md:block" />

            {/* Veredicto */}
            <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
              <div className={cn("inline-flex items-center justify-center rounded border px-6 py-2 backdrop-blur-sm", resultMeta.border, resultMeta.bg)}>
                <span className={cn("font-display-lg text-3xl font-bold tracking-tight", resultMeta.color)}>
                  {resultMeta.label}
                </span>
              </div>
              <p className="max-w-md text-sm text-on-surface-variant md:text-base">
                {result.percentage === Number.POSITIVE_INFINITY
                  ? "¡Su oferta tiene valor y la tuya no!"
                  : `Diferencia de ${(result.percentage ?? 0) >= 0 ? "+" : ""}${(result.percentage ?? 0).toFixed(2)}% sobre tu oferta. `}
                {resultMeta.msg}
              </p>
              <span className="font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant/60">
                {source === "official" ? "Según precios oficiales AOTR" : "Según precios de tradeo (API)"}
              </span>
            </div>
          </div>
          <button
            onClick={copyLink}
            className="mt-8 rounded-md bg-gradient-to-r from-primary to-primary-container px-8 py-3 font-medium text-on-primary shadow-[inset_0_2px_0_rgba(255,255,255,0.2),0_4px_12px_rgba(103,80,164,0.4)] transition-all active:translate-y-px active:shadow-none"
          >
            Copiar Enlace de Oferta
          </button>
        </motion.section>
      ) : (
        <div className="glass-panel mt-6 rounded-xl p-8 text-center">
          <p className="text-3xl">⚖️</p>
          <p className="mt-2 font-semibold text-on-surface">Agrega items a ambas ofertas</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-on-surface-variant">
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
                className="glass-panel rounded-full px-3 py-1.5 font-medium text-on-surface-variant transition-all hover:text-on-surface"
              >
                <Zap className="mr-1 inline h-3 w-3 text-primary" />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="mt-6 text-center font-data-tabular text-sm text-on-surface-variant">
          Cargando items…
        </div>
      )}
    </div>
  );
}
