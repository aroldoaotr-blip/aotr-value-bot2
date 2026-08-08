import type { ValueOrRange } from "./types";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(value: number | null | undefined, digits = 2): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return Number(value).toLocaleString("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0
  });
}

export function formatCompact(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  if (Math.abs(value) < 1 && value !== 0) return value.toFixed(value < 0.01 ? 4 : 2);
  return Number(value.toFixed(2)).toString();
}

export function formatRange(value: ValueOrRange, digits = 2): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "number") return formatNumber(value, digits);
  return `${formatNumber(value.min, digits)} – ${formatNumber(value.max, digits)}`;
}

// Redondeo de llaves/pergaminos a enteros (sin decimales):
// sube cuando la parte decimal es >= 0.45 (5.45 → 6, 6.67 → 7)
// y se queda abajo cuando es menor (5.29 → 5, 5.01 → 5).
export function roundValue(value: ValueOrRange): ValueOrRange {
  if (value === null || value === undefined) return null;
  const round = (n: number) =>
    n - Math.floor(n) >= 0.45 ? Math.ceil(n) : Math.floor(n);
  if (typeof value === "number") return round(value);
  return { min: round(value.min), max: round(value.max) };
}

export function formatVizard(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return `${formatCompact(value)} viz`;
}

export function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60_000);

  if (minutes < 1) return "hace un momento";
  if (minutes < 60) return `hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours} h`;
  const days = Math.floor(hours / 24);
  return `hace ${days} d`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short"
  });
}

export function midOf(value: ValueOrRange): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return value;
  return (value.min + value.max) / 2;
}

// Derivar demanda numérica (0-10) priorizando API
export function effectiveDemand(item: {
  demandApi: number | null;
  demandOfficial: string | null;
}): number | null {
  if (item.demandApi !== null) return item.demandApi;
  const parsed = parseInt(String(item.demandOfficial ?? ""));
  return Number.isNaN(parsed) ? null : parsed;
}
