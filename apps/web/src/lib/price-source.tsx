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
      className={cn(
        "relative flex items-center rounded-full border border-outline-variant/50 bg-surface-container p-1",
        className
      )}
    >
      {/* Cursor deslizante */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-out",
          isOfficial
            ? "left-1 bg-[#4ade80]/20 shadow-[0_0_10px_rgba(74,222,128,0.25)] ring-1 ring-[#4ade80]/40"
            : "left-[calc(50%)] bg-[#60a5fa]/20 shadow-[0_0_10px_rgba(96,165,250,0.25)] ring-1 ring-[#60a5fa]/40"
        )}
      />
      {(
        [
          ["official", "Oficial"],
          ["trade", "Tradeo"],
        ] as const
      ).map(([key, label]) => (
        <button
          key={key}
          role="tab"
          aria-selected={source === key}
          onClick={() => setSource(key)}
          className={cn(
            "relative z-10 flex-1 whitespace-nowrap rounded-full px-3.5 py-1.5 font-label-caps text-xs font-bold tracking-wider transition-colors duration-200",
            source === key
              ? isOfficial
                ? "text-neon-green drop-shadow-[0_0_4px_rgba(74,222,128,0.5)]"
                : "text-[#60a5fa] drop-shadow-[0_0_4px_rgba(96,165,250,0.5)]"
              : "text-on-surface-variant hover:text-on-surface"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
