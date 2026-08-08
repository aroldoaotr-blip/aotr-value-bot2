import { useMemo } from "react";

export function Sparkline({
  data,
  className = "h-8 w-24"
}: {
  data: { value: number }[];
  className?: string;
}) {
  const path = useMemo(() => {
    // Solo valores finitos: un dato null/undefined/NaN rompería el path
    const values = data.map((d) => d.value).filter((v) => Number.isFinite(v));
    // Con 0 o 1 punto no se puede dibujar una línea (1 punto daría i/0 = NaN)
    if (values.length < 2) return "";
    const w = 96;
    const h = 32;
    const pad = 3;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    return values
      .map((v, i) => {
        const x = (i / (values.length - 1)) * (w - pad * 2) + pad;
        const y = h - pad - ((v - min) / range) * (h - pad * 2);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }, [data]);

  if (!path) return <div className={className} />;

  const up = data.length > 1 && data[data.length - 1].value >= data[0].value;
  const color = up ? "#34d399" : "#fb7185";

  return (
    <svg viewBox="0 0 96 32" className={className} aria-hidden>
      <path d={path} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
