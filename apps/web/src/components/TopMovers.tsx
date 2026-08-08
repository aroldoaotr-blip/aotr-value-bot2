import Link from "next/link";
import type { ItemMover } from "@/lib/types";
import { cn, formatCompact } from "@/lib/format";
import { Avatar } from "./Avatar";
import { Sparkline } from "./Sparkline";
import { SourceBadge } from "./Badges";

export function MoverCard({
  mover,
  kind,
  rank
}: {
  mover: ItemMover;
  kind: "up" | "down";
  rank: number;
}) {
  const { item } = mover;
  const up = kind === "up";

  return (
    <Link
      href={`/item/${item.slug}`}
      className="glass group flex items-center gap-3 rounded-2xl p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-card"
    >
      <span
        className={cn(
          "font-display w-6 shrink-0 text-center text-sm font-bold",
          up ? "text-emerald-400" : "text-rose-400"
        )}
      >
        {rank + 1}
      </span>
      <Avatar name={item.name} emoji={item.emoji} size="md" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white group-hover:text-indigo-200">
          {item.name}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <SourceBadge source={item.source} />
          <span className="text-[10px] text-white/40">{item.category ?? ""}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <Sparkline data={item.history.map((h) => ({ value: h.value }))} />
        <span
          className={cn(
            "text-xs font-bold",
            up ? "text-emerald-400" : "text-rose-400"
          )}
        >
          {up ? "▲" : "▼"} {Math.abs(mover.changePct).toFixed(1)}%
        </span>
      </div>
    </Link>
  );
}
