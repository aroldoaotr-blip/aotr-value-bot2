"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/format";

// ── Lista de precios activa (global) ─────────────────────
// La web tiene 2 listas de precios independientes (oficial = hoja AOTR,
// tradeo = API). Este contexto decide cuál se muestra, se persiste en
// localStorage y lo usan todas las páginas.

export type PriceSource = "official" | "trade";

const LS_KEY = "aotr-price-list-v1";

type Ctx = {
  source: PriceSource;
  setSource: (s: PriceSource) => void;
};

const PriceSourceContext = createContext<Ctx>({
  source: "official",
  setSource: () => {}
});

export function PriceSourceProvider({ children }: { children: ReactNode }) {
  const [source, setSourceState] = useState<PriceSource>("official");

  // Restaurar la lista guardada (default: oficial)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved === "official" || saved === "trade") setSourceState(saved);
    } catch {
      /* almacenamiento no disponible */
    }
  }, []);

  const setSource = useCallback((s: PriceSource) => {
    setSourceState(s);
    try {
      localStorage.setItem(LS_KEY, s);
    } catch {
      /* ignorar */
    }
  }, []);

  const value = useMemo(() => ({ source, setSource }), [source, setSource]);
  return (
    <PriceSourceContext.Provider value={value}>
      {children}
    </PriceSourceContext.Provider>
  );
}

export function usePriceSource() {
  return useContext(PriceSourceContext);
}

// ── Toggle deslizable 🟢 Oficial ── 🔵 Tradeo ────────────
export function PriceSourceToggle({ className }: { className?: string }) {
  const { source, setSource } = usePriceSource();
  const isOfficial = source === "official";

  return (
    <div
      role="tablist"
      aria-label="Lista de precios"
      className={cn("glass relative flex items-center rounded-full p-1", className)}
    >
      {/* Cursor deslizante */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-out",
          isOfficial
            ? "left-1 bg-emerald-500/25 ring-1 ring-emerald-400/40"
            : "left-[calc(50%)] bg-blue-500/25 ring-1 ring-blue-400/40"
        )}
      />
      {(
        [
          ["official", "🟢 Oficial"],
          ["trade", "🔵 Tradeo"],
        ] as const
      ).map(([key, label]) => (
        <button
          key={key}
          role="tab"
          aria-selected={source === key}
          onClick={() => setSource(key)}
          className={cn(
            "relative z-10 flex-1 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors duration-200",
            source === key
              ? isOfficial
                ? "text-emerald-300"
                : "text-blue-300"
              : "text-white/45 hover:text-white"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
