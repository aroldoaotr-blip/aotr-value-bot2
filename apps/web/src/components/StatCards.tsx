"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toLocaleString("en-US");
      }
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>0</span>;
}

const ICONS: Record<number, string> = {
  0: "📦",
  1: "🔄",
  2: "🔵",
  3: "🟢",
};

export function StatCards({
  stats
}: {
  stats: { label: string; value: number; icon: string; sub?: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="glass-panel glass-card-hover group relative overflow-hidden rounded-xl p-6"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          {/* Icono decorativo */}
          <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <span className="text-6xl">{ICONS[i % 4] ?? s.icon}</span>
          </div>
          <div className="relative z-10">
            <h4 className="font-label-caps text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              {s.label}
            </h4>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-display-lg text-4xl font-bold text-on-surface">
                <Counter value={s.value} />
              </span>
              {s.sub && (
                <span className="font-label-caps text-[12px] font-normal text-primary/80">
                  {s.sub}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
