"use client";

import type { ReactNode } from "react";
import { usePriceSource } from "@/lib/price-source";
import { cn } from "@/lib/format";

// Resalta la lista de precios activa (contexto global) sobre las dos
// tarjetas de la página de item, sin tocar el contenido server-side.
export function ItemSourcePanel({
  official,
  trade,
}: {
  official: ReactNode;
  trade: ReactNode;
}) {
  const { source } = usePriceSource();

  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-2">
      <div
        className={cn(
          "rounded-3xl transition-all duration-300",
          source === "official"
            ? "ring-2 ring-emerald-400/60 shadow-glow"
            : "opacity-90",
        )}
      >
        {official}
      </div>
      <div
        className={cn(
          "rounded-3xl transition-all duration-300",
          source === "trade"
            ? "ring-2 ring-blue-400/60 shadow-glow"
            : "opacity-90",
        )}
      >
        {trade}
      </div>
    </div>
  );
}
