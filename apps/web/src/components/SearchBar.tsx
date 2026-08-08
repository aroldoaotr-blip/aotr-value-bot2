"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { cn, formatVizard } from "@/lib/format";

// Límite de sugerencias visibles en el dropdown
const MAX_SUGGESTIONS = 3;
import { Avatar } from "./Avatar";
import { SourceBadge } from "./Badges";
import type { Item } from "@/lib/types";

export function SearchBar({
  autoFocus = false,
  big = false,
  placeholder = "Busca un item… ej: Susanoo's Wings, Vizard Mask, azure flames…",
}: {
  autoFocus?: boolean;
  big?: boolean;
  placeholder?: string;
}) {
  const router = useRouter();
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

  return (
    <div ref={wrapRef} className="relative w-full">
      <div
        className={cn(
          "group relative flex items-center gap-3 rounded-2xl border transition-all duration-300",
          big
            ? "border-white/10 bg-white/[0.05] px-5 py-4 backdrop-blur-xl focus-within:border-indigo-400/50 focus-within:shadow-glow"
            : "border-white/[0.08] bg-white/[0.04] px-4 py-2.5 backdrop-blur-xl focus-within:border-indigo-400/40",
        )}
      >
        <Search className={cn("text-white/35", big ? "h-6 w-6" : "h-4 w-4")} />
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
            "w-full bg-transparent text-white placeholder-white/35 outline-none",
            big ? "text-base sm:text-lg" : "text-sm",
          )}
        />
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
        )}
        {!loading && query && (
          <button
            onClick={submit}
            className={cn(
              "flex items-center gap-1 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 font-semibold text-white transition-all hover:brightness-110",
              big ? "px-4 py-2 text-sm" : "px-3 py-1.5 text-xs",
            )}
          >
            Ir <ArrowRight className={big ? "h-4 w-4" : "h-3 w-3"} />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="glass-strong absolute bottom-full left-0 right-0 z-50 mb-2 overflow-hidden rounded-2xl shadow-card">
          <p className="border-b border-white/[0.06] px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-white/35">
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
                  <Avatar name={item.name} emoji={item.emoji} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {item.name}
                    </p>
                    <p className="truncate text-xs text-white/40">
                      {item.category ?? "—"}
                      {item.apiValue !== null
                        ? ` · ${formatVizard(item.apiValue)}`
                        : ""}
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
            className="block w-full border-t border-white/[0.06] px-4 py-2.5 text-center text-xs font-medium text-indigo-300 transition-colors hover:bg-white/[0.04]"
          >
            Ver todos los resultados → /precios
          </button>
        </div>
      )}
    </div>
  );
}
