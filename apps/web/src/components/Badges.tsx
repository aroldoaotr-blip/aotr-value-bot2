import { cn } from "@/lib/format";
import type { ItemSource } from "@/lib/types";

export function SourceBadge({
  source,
  className
}: {
  source: ItemSource;
  className?: string;
}) {
  if (source === "both") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full border border-white/10 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-white/90",
          className
        )}
      >
        🟢 🔵 Doble
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
        source === "official"
          ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
          : "border-blue-400/20 bg-blue-500/10 text-blue-300",
        className
      )}
    >
      {source === "official" ? "🟢 Oficial" : "🔵 Trade"}
    </span>
  );
}

export function StatusBadge({
  status,
  className
}: {
  status: string | null;
  className?: string;
}) {
  if (!status) return null;
  const obtainable = /obtainable/i.test(status) && !/unobtainable/i.test(status);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
        obtainable
          ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
          : "border-rose-400/20 bg-rose-500/10 text-rose-300",
        className
      )}
    >
      {obtainable ? "●" : "◌"} {status}
    </span>
  );
}

export function RateBadge({
  rate,
  className
}: {
  rate: string | null;
  className?: string;
}) {
  if (!rate) return null;

  const up = /ris|up|grow|hot/i.test(rate);
  const down = /fall|down|drop|cool|crash/i.test(rate);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
        up
          ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
          : down
            ? "border-rose-400/20 bg-rose-500/10 text-rose-300"
            : "border-white/10 bg-white/5 text-white/60",
        className
      )}
    >
      {up ? "📈" : down ? "📉" : "➖"} {rate}
    </span>
  );
}
