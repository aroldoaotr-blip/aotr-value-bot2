import Link from "next/link";
import type { ItemMover } from "@/lib/types";
import { cn, formatCompact, midOf } from "@/lib/format";
import { Avatar } from "./Avatar";
import { Sparkline } from "./Sparkline";
import { SourceBadge } from "./Badges";

export function MoverCard({
  mover,
  kind,
  rank,
  className
}: {
  mover: ItemMover;
  kind: "up" | "down";
  rank: number;
  className?: string;
}) {
  const { item, changePct } = mover;
  const up = kind === "up";
  const sparkData = item.history.map((h) => ({ value: h.value }));

  return (
    <Link
      href={`/item/${item.slug}`}
      className={cn(
        "glass-panel glass-card-hover flex min-w-[280px] shrink-0 snap-start flex-col gap-4 rounded-xl border-t-2 p-6 sm:min-w-[320px]",
        up ? "border-t-[#4ade80]/30" : "border-t-[#f87171]/30",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={item.name} emoji={item.emoji} size="sm" />
          <div>
            <h4 className="font-medium text-on-surface">{item.name}</h4>
            <p className="font-label-caps text-[10px] text-on-surface-variant">
              {item.rarityLabel ?? item.category ?? ""}
            </p>
          </div>
        </div>
        <div
          className={cn(
            "flex items-center gap-1 rounded px-2 py-1 font-data-tabular text-[12px] font-bold",
            up
              ? "text-neon-green bg-[#4ade80]/10"
              : "text-neon-red bg-[#f87171]/10"
          )}
        >
          {up ? "▲" : "▼"} {Math.abs(changePct).toFixed(1)}%
        </div>
      </div>

      <div className="mt-2 flex items-end justify-between">
        <div>
          <p className="font-label-caps mb-1 text-[10px] text-on-surface-variant">
            Precio Actual
          </p>
          <p className="font-data-tabular text-xl font-bold text-on-surface">
            {item.apiValue !== null
              ? `${formatCompact(item.apiValue)} viz`
              : `${formatCompact(midOf(item.valueOfficial?.keys ?? null))} 🔑`}
          </p>
          <div className="mt-1">
            <SourceBadge source={item.source} />
          </div>
        </div>
        {sparkData.length > 1 && (
          <Sparkline data={sparkData} className="h-8 w-24 opacity-80" />
        )}
      </div>
    </Link>
  );
}
