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

export function StatCards({
  stats
}: {
  stats: { label: string; value: number; icon: string; sub?: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="glass group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow sm:p-5"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-indigo-500/10 blur-2xl transition-opacity group-hover:opacity-100" />
          <div className="flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <p className="text-xs font-medium uppercase tracking-wider text-white/40">
              {s.label}
            </p>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
            <Counter value={s.value} />
          </p>
          {s.sub && <p className="mt-1 text-[11px] text-white/35">{s.sub}</p>}
        </div>
      ))}
    </div>
  );
}
