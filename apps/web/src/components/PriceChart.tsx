"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { formatCompact, formatDate } from "@/lib/format";

interface Point {
  ts: string;
  value: number;
}

type Pt = Point & { x: number; y: number };

export function PriceChart({
  data,
  color = "#818cf8",
  height = 240
}: {
  data: Point[];
  color?: string;
  height?: number;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const W = 640;
  const H = height;
  const PAD_X = 8;
  const PAD_TOP = 18;
  const PAD_BOTTOM = 26;

  const { linePath, areaPath, min, max, points } = useMemo(() => {
    if (!data.length) return { linePath: "", areaPath: "", min: 0, max: 0, points: [] as Pt[] };

    const values = data.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const pts: Pt[] = data.map((d, i) => {
      const x = (i / (data.length - 1)) * (W - PAD_X * 2) + PAD_X;
      const y = H - PAD_BOTTOM - ((d.value - min) / range) * (H - PAD_TOP - PAD_BOTTOM);
      return { ...d, x, y };
    });

    const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    const area = `${line} L${pts[pts.length - 1].x},${H - PAD_BOTTOM} L${pts[0].x},${H - PAD_BOTTOM} Z`;

    return { linePath: line, areaPath: area, min, max, points: pts };
  }, [data, H]);

  const handleMove = (e: React.MouseEvent) => {
    if (!wrapRef.current || !points.length) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const idx = Math.max(0, Math.min(points.length - 1, Math.round(ratio * (points.length - 1))));
    setHover(idx);
  };

  if (!data.length || !linePath) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-white/40">
        Sin histórico disponible
      </div>
    );
  }

  const up = data[data.length - 1].value >= data[0].value;
  const change = data[data.length - 1].value - data[0].value;

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-2xl font-bold text-white">
            {formatCompact(data[data.length - 1].value)}
            <span className="ml-1 text-sm font-medium text-white/40">viz</span>
          </p>
          <p className={`text-xs font-semibold ${up ? "text-emerald-400" : "text-rose-400"}`}>
            {up ? "▲" : "▼"} {formatCompact(Math.abs(change))} viz en {data.length} días
          </p>
        </div>
        <div className="flex gap-3 text-[10px] text-white/40">
          <span>Mín: {formatCompact(min)}</span>
          <span>Máx: {formatCompact(max)}</span>
        </div>
      </div>

      <div
        ref={wrapRef}
        className="relative w-full cursor-crosshair"
        style={{ height: H }}
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
      >
        <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="chart-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>

          {/* Grid */}
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1={PAD_X}
              x2={W - PAD_X}
              y1={H * f}
              y2={H * f}
              stroke="rgba(255,255,255,0.05)"
              strokeDasharray="4 6"
            />
          ))}

          {/* Área + línea animadas */}
          <motion.path
            d={areaPath}
            fill="url(#chart-fill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.path
            d={linePath}
            fill="none"
            stroke="url(#chart-line)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />

          {/* Hover */}
          {hover !== null && points[hover] && (
            <>
              <line
                x1={points[hover].x}
                x2={points[hover].x}
                y1={PAD_TOP}
                y2={H - PAD_BOTTOM}
                stroke="rgba(255,255,255,0.25)"
                strokeDasharray="3 4"
              />
              <circle
                cx={points[hover].x}
                cy={points[hover].y}
                r="5"
                fill={color}
                stroke="#05060f"
                strokeWidth="2"
              />
            </>
          )}
        </svg>

        {/* Tooltip */}
        {hover !== null && points[hover] && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-lg border border-white/10 bg-[#0b0d1f]/95 px-3 py-1.5 text-center shadow-card backdrop-blur"
            style={{
              left: `${(points[hover].x / W) * 100}%`,
              top: `${(points[hover].y / H) * 100}%`
            }}
          >
            <p className="text-xs font-bold text-white">{formatCompact(points[hover].value)} viz</p>
            <p className="text-[10px] text-white/45">{formatDate(points[hover].ts)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
