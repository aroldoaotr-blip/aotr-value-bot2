"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { cn, formatCompact, formatVizard, midOf } from "@/lib/format";
import { usePriceSource } from "@/lib/price-source";
import type { PriceSource } from "@/lib/price-source";

// Límite de sugerencias visibles en el dropdown
const MAX_SUGGESTIONS = 3;
import { Avatar } from "./Avatar";
import { SourceBadge } from "./Badges";
import type { Item } from "@/lib/types";

export function SearchBar({
  autoFocus = false,
  big = false,
  placeholder = "Buscar objetos, precios, historiales…",
}: {
  autoFocus?: boolean;
  big?: boolean;
  placeholder?: string;
}) {
  const router = useRouter();
  const { source: listSource } = usePriceSource();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    if (query.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    setLoading(true);
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.items ?? []);
        setOpen(true);
        setActive(0);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 200);
  }, [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const goTo = (slug: string) => {
    setOpen(false);
    setQuery("");
    router.push(`/item/${slug}`);
  };

  const submit = () => {
    if (results[active]) {
      goTo(results[active].slug);
    } else if (query.trim()) {
      router.push(`/precios?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const preview = results[0];

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="glass-panel group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl p-2 transition-colors duration-500 hover:border-primary/50 sm:flex-row">
        {/* Glow sweep on hover */}
        <div className="pointer-events-none absolute inset-0 -translate-x-[100%] bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 transition-transform duration-1000 ease-in-out group-hover:translate-x-[100%]" />

        {/* Input con borde inferior neón */}
        <div className="flex w-full flex-1 items-center bg-surface/50 px-4 py-3 rounded-xl border-b-2 border-primary/20 transition-all focus-within:border-primary focus-within:shadow-[0_4px_20px_rgba(207,188,255,0.15)]">
          <Search
            className={cn(
              "mr-3 shrink-0 text-primary",
              big ? "h-6 w-6" : "h-4 w-4",
            )}
          />
          <input
            autoFocus={autoFocus}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
              if (e.key === "ArrowDown")
                setActive((a) =>
                  Math.min(a + 1, Math.min(MAX_SUGGESTIONS, results.length) - 1),
                );
              if (e.key === "ArrowUp") setActive((a) => Math.max(a - 1, 0));
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder={placeholder}
            className={cn(
              "w-full bg-transparent text-on-surface outline-none placeholder:text-on-surface-variant/50",
              big ? "text-base sm:text-lg" : "text-sm",
            )}
          />
          {loading && (
            <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          )}
        </div>

        {/* Live preview (primer resultado) o botón Ir */}
        {preview && !loading ? (
          <button
            onClick={() => goTo(preview.slug)}
            className="flex w-full shrink-0 cursor-pointer items-center justify-between gap-3 whitespace-nowrap rounded-xl border border-white/5 bg-surface-high/80 px-4 py-3 transition-colors hover:bg-surface-highest sm:w-auto sm:justify-start"
          >
            <span className="flex items-center gap-2">
              <span className="text-xl">🔮</span>
              <span className="text-sm font-medium text-on-surface">
                {preview.name}
              </span>
            </span>
            <span className="flex flex-col items-end">
              <span className="font-data-tabular text-sm font-bold text-primary">
                {searchPriceLine(preview, listSource)}
              </span>
              <span className="text-neon-green flex items-center gap-0.5 font-data-tabular text-[10px]">
                <ArrowRight className="h-3 w-3" /> ir
              </span>
            </span>
          </button>
        ) : query && !loading ? (
          <button
            onClick={submit}
            className={cn(
              "flex shrink-0 items-center gap-1 rounded-xl bg-gradient-to-r from-[#cfbcff] to-[#b7a1e8] font-semibold text-[#1e1b19] shadow-[0_0_20px_-6px_rgba(207,188,255,0.6)] transition-all hover:brightness-110",
              big ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs",
            )}
          >
            Ir <ArrowRight className={big ? "h-4 w-4" : "h-3 w-3"} />
          </button>
        ) : null}
      </div>

      {open && results.length > 0 && (
        <div className="glass-strong absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl shadow-card">
          <p className="border-b border-white/[0.06] px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-on-surface-variant/60">
            Sugerencias
          </p>
          <ul className="max-h-80 overflow-y-auto py-1">
            {results.slice(0, MAX_SUGGESTIONS).map((item, i) => (
              <li key={item.id}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => goTo(item.slug)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                    i === active ? "bg-white/[0.07]" : "hover:bg-white/[0.04]",
                  )}
                >
                  <Avatar name={item.name} officialImage={item.officialImage} emoji={item.emoji} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-on-surface">
                      {item.name}
                    </p>
                    <p className="truncate text-xs text-on-surface-variant/70">
                      {item.category ?? "—"}
                      {searchPriceLine(item, listSource)}
                    </p>
                  </div>
                  <SourceBadge source={item.source} />
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              router.push(`/precios?q=${encodeURIComponent(query)}`);
              setOpen(false);
            }}
            className="block w-full border-t border-white/[0.06] px-4 py-2.5 text-center text-xs font-medium text-primary transition-colors hover:bg-white/[0.04]"
          >
            Ver todos los resultados → /precios
          </button>
        </div>
      )}
    </div>
  );
}

// Precio de la lista activa para la línea del dropdown / preview.
function searchPriceLine(item: Item, source: PriceSource): string {
  if (source === "trade") {
    return item.apiValue !== null ? `${formatCompact(item.apiValue)} viz` : "";
  }

  const vo = item.valueOfficial;
  if (!vo) return "";
  if (vo.vizards != null) {
    const viz = typeof vo.vizards === "number" ? vo.vizards : midOf(vo.vizards);
    if (viz != null) return `${formatVizard(viz)}`;
  }
  if (vo.keys != null) {
    const keys = typeof vo.keys === "number" ? vo.keys : midOf(vo.keys);
    if (keys != null) return `${formatCompact(keys)} 🔑`;
  }
  return "";
}
