import { cn, effectiveDemand } from "@/lib/format";
import type { Item } from "@/lib/types";

// source: "official" usa la demanda de la hoja · "trade" la de la API ·
// sin source usa la mejor disponible (API primero, igual que antes).
export function DemandBar({
  item,
  className,
  source,
}: {
  item: Item;
  className?: string;
  source?: "official" | "trade";
}) {
  const demand =
    source === "official"
      ? (() => {
          const parsed = parseInt(String(item.demandOfficial ?? ""));
          return Number.isNaN(parsed) ? null : parsed;
        })()
      : source === "trade"
        ? item.demandApi
        : effectiveDemand(item);

  if (demand === null) {
    return <span className="text-xs text-white/40">—</span>;
  }

  const label =
    demand >= 8 ? "🔥 Muy alta" : demand >= 5 ? "📈 Alta" : demand >= 3 ? "📊 Media" : "Baja";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex gap-[3px]" aria-label={`Demanda ${demand}/10`}>
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-3 w-1 rounded-full transition-colors",
              i < demand
                ? demand >= 8
                  ? "bg-gradient-to-t from-rose-500 to-amber-400"
                  : demand >= 5
                    ? "bg-gradient-to-t from-emerald-500 to-cyan-400"
                    : "bg-gradient-to-t from-slate-500 to-slate-400"
                : "bg-white/10"
            )}
          />
        ))}
      </div>
      <span className="text-[10px] font-medium text-white/50">{label}</span>
    </div>
  );
}
