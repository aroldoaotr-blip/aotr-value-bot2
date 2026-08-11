"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, LogOut, RefreshCw, RotateCcw, Save, ShieldCheck } from "lucide-react";
import {
  clearLocalRates,
  DEFAULT_RATES,
  getLocalRates,
  setLocalRates,
  type Rates
} from "@/lib/rates";
import { cn } from "@/lib/format";

interface SyncLogEntry {
  id: number;
  source: string;
  status: string;
  rows: number | null;
  durationMs: number | null;
  startedAt: string;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "hace un momento";
  if (minutes < 60) return `hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours} h`;
  return `hace ${Math.floor(hours / 24)} d`;
}

export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [keysPerVizard, setKeysPerVizard] = useState(String(DEFAULT_RATES.keysPerVizard));
  const [keysPerScroll, setKeysPerScroll] = useState(String(DEFAULT_RATES.keysPerScroll));
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");
  const [persisted, setPersisted] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);
  const [syncLog, setSyncLog] = useState<SyncLogEntry[]>([]);
  const [dbError, setDbError] = useState<string | null>(null);
  const [heroMode, setHeroMode] = useState<"video" | "shader">("video");

  const rates: Rates = useMemo(() => {
    const kv = Number(keysPerVizard);
    const ks = Number(keysPerScroll);
    return {
      keysPerVizard: Number.isFinite(kv) && kv > 0 ? kv : DEFAULT_RATES.keysPerVizard,
      keysPerScroll: Number.isFinite(ks) && ks > 0 ? ks : DEFAULT_RATES.keysPerScroll
    };
  }, [keysPerVizard, keysPerScroll]);

  // Cargar tasas actuales. localStorage del admin tiene prioridad para los
  // VALORES, pero SIEMPRE consultamos /api/rates para saber si la BD responde.
  useEffect(() => {
    if (authed === null) return;
    const local = getLocalRates();
    if (local) {
      setKeysPerVizard(String(local.keysPerVizard));
      setKeysPerScroll(String(local.keysPerScroll));
    }
    (async () => {
      try {
        const res = await fetch("/api/rates");
        const data = await res.json();
        if (data.rates) {
          if (data.persisted) {
            setKeysPerVizard(String(data.rates.keysPerVizard));
            setKeysPerScroll(String(data.rates.keysPerScroll));
          }
          setPersisted(!!data.persisted);
          setDbError(data.persisted ? null : (data.error ?? "No se pudo conectar a la base de datos"));
        }
      } catch {
        /* mantener lo que haya */
      }
    })();
  }, [authed]);

  // Solo el admin autenticado puede entrar
  useEffect(() => {
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authed) {
          router.replace("/administrador/login");
          return;
        }
        setAuthed(true);
      })
      .catch(() => router.replace("/administrador/login"));
  }, [router]);

  // Historial de sincronizaciones (últimas 30) + auto-refresh cada 15 s
  useEffect(() => {
    if (authed !== true) return;
    loadSyncLog();
    const id = setInterval(loadSyncLog, 15000);
    return () => clearInterval(id);
  }, [authed]);

  // Hero del Home: elige entre el video de batalla y el shader 3D de Stitch.
  // IMPORTANTE: va ANTES del return condicional para respetar las Rules of Hooks.
  useEffect(() => {
    try {
      const v = localStorage.getItem("aotr-hero");
      if (v === "video" || v === "shader") setHeroMode(v);
    } catch {
      /* sin storage */
    }
  }, []);

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-on-surface-variant">Verificando acceso…</p>
        </div>
      </div>
    );
  }

  function setHero(next: "video" | "shader") {
    setHeroMode(next);
    try {
      localStorage.setItem("aotr-hero", next);
    } catch {
      /* sin storage */
    }
  }

  const valid =
    Number.isFinite(Number(keysPerVizard)) &&
    Number(keysPerVizard) > 0 &&
    Number.isFinite(Number(keysPerScroll)) &&
    Number(keysPerScroll) > 0;

  async function logout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/administrador/login");
    }
  }

  async function save() {
    if (!valid) {
      setStatus("error");
      setMessage("Ingresá números positivos válidos.");
      return;
    }
    setStatus("saving");
    try {
      const res = await fetch("/api/rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rates)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al guardar");
      setLocalRates(data.rates ?? rates);
      setPersisted(!!data.persisted);
      setStatus("saved");
      setMessage(
        data.persisted
          ? "Guardado en la base de datos — bot y web usan estas tasas."
          : "Guardado en el navegador (sin base de datos configurada)."
      );
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "No se pudo guardar.");
    }
  }

  function reset() {
    setKeysPerVizard(String(DEFAULT_RATES.keysPerVizard));
    setKeysPerScroll(String(DEFAULT_RATES.keysPerScroll));
    clearLocalRates();
    setMessage("Tasas restauradas a los valores por defecto.");
    setStatus("saved");
  }

  async function loadSyncLog() {
    try {
      const res = await fetch("/api/sync-log");
      const data = await res.json();
      if (Array.isArray(data.logs)) setSyncLog(data.logs);
      if (data.error) setDbError(String(data.error));
    } catch {
      /* mantener lo que haya */
    }
  }

  // Fuerza la actualización de las 2 listas (los mismos scripts del bot)
  async function forceSync() {
    setSyncing(true);
    setSyncMsg(null);
    try {
      const res = await fetch("/api/sync", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al sincronizar");
      const parts = (data.results as { source: string; status: string; rows: number | null }[]).map(
        (r) => {
          const label = r.source === "official" ? "🟢 Oficial" : "🔵 Trade";
          if (r.status === "skipped") return `${label}: ⚠️ omitida (sync en curso)`;
          if (r.status !== "ok") return `${label}: ✗ error`;
          return `${label}: ${r.rows ?? 0} items`;
        }
      );
      setSyncMsg(`✅ Sincronización completada — ${parts.join(" · ")}`);
    } catch (error) {
      setSyncMsg(`❌ ${error instanceof Error ? error.message : "No se pudo sincronizar."}`);
    } finally {
      setSyncing(false);
      loadSyncLog();
    }
  }

  const vizInKeys = 1 * rates.keysPerVizard;
  const vizInScrolls = (1 * rates.keysPerVizard) / rates.keysPerScroll;
  const keyInScrolls = 1 / rates.keysPerScroll;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6">
      {/* ── Header ─────────────────────────────────────── */}
      <header className="mb-8 flex flex-col justify-between gap-6 border-b border-outline-variant/30 pb-6 md:flex-row md:items-end">
        <div className="flex items-center gap-3">
          <div className="orb flex h-12 w-12 items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-display-lg text-2xl font-bold tracking-tight text-on-surface sm:text-4xl">
              Administración de tasas
            </h1>
            <p className="mt-1 text-sm text-on-surface-variant">
              Configura los valores base de conversión para la economía del servidor. Normaliza los
              precios en <strong className="text-on-surface">llaves</strong>,{" "}
              <strong className="text-on-surface">pergaminos</strong> y{" "}
              <strong className="text-on-surface">vizard</strong> en toda la plataforma (web + bot).
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="glass-panel flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 font-data-tabular text-sm text-error transition-colors hover:bg-error/10"
          title="Cerrar sesión"
        >
          <LogOut className="h-4 w-4" />
          Salir
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* ── Columna izquierda: tasas ─────────────────── */}
        <div className="flex flex-col gap-6 lg:col-span-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* 1 VIZARD */}
            <div className="glass-panel group relative overflow-hidden rounded-xl p-6">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />
              <label className="mb-4 flex items-center gap-2 font-label-caps text-xs font-bold uppercase tracking-wider text-primary">
                🎭 1 VIZARD =
              </label>
              <div className="flex items-baseline gap-3 rounded-t-md border-b-2 border-outline-variant bg-surface-low px-3 pb-2 pt-3 transition-colors input-neon">
                <input
                  type="number"
                  min={1}
                  step="any"
                  value={keysPerVizard}
                  onChange={(e) => setKeysPerVizard(e.target.value)}
                  className="w-full bg-transparent p-0 font-display-lg text-2xl font-bold text-on-surface outline-none tabular-nums"
                />
                <span className="whitespace-nowrap font-data-tabular text-sm text-on-surface-variant">
                  llaves
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2 font-data-tabular text-sm text-on-surface-variant">
                <RefreshCw className="h-3.5 w-3.5" />
                <span>≈ {vizInScrolls.toLocaleString("en-US")} pergaminos</span>
              </div>
            </div>

            {/* 1 PERGAMINO */}
            <div className="glass-panel group relative overflow-hidden rounded-xl p-6">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-tertiary/10 blur-2xl transition-all group-hover:bg-tertiary/20" />
              <label className="mb-4 flex items-center gap-2 font-label-caps text-xs font-bold uppercase tracking-wider text-tertiary">
                📜 1 PERGAMINO =
              </label>
              <div className="flex items-baseline gap-3 rounded-t-md border-b-2 border-outline-variant bg-surface-low px-3 pb-2 pt-3 transition-colors input-neon">
                <input
                  type="number"
                  min={1}
                  step="any"
                  value={keysPerScroll}
                  onChange={(e) => setKeysPerScroll(e.target.value)}
                  className="w-full bg-transparent p-0 font-display-lg text-2xl font-bold text-on-surface outline-none tabular-nums"
                />
                <span className="whitespace-nowrap font-data-tabular text-sm text-on-surface-variant">
                  llaves
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2 font-data-tabular text-sm text-on-surface-variant">
                <RefreshCw className="h-3.5 w-3.5" />
                <span>1 llave = {keyInScrolls.toLocaleString("en-US", { maximumFractionDigits: 4 })} pergaminos</span>
              </div>
            </div>
          </div>

          {/* Ejemplo en vivo */}
          <div className="glass-panel flex flex-wrap items-center justify-between gap-3 rounded-lg border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent p-4">
            <div className="flex items-center gap-3">
              <span className="font-label-caps text-xs font-bold tracking-wider text-on-surface-variant">
                EJEMPLO EN VIVO
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 font-data-tabular text-sm text-on-surface">
              <span>Item de 2 viz</span>
              <span className="text-on-surface-variant">→</span>
              <span className="font-bold text-primary">🔑 {(2 * rates.keysPerVizard).toLocaleString("en-US")}</span>
              <span className="text-on-surface-variant">·</span>
              <span className="font-bold text-tertiary">📜 {((2 * rates.keysPerVizard) / rates.keysPerScroll).toLocaleString("en-US")}</span>
            </div>
          </div>

          {/* Acciones */}
          <div className="mt-2 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={save}
              disabled={!valid || status === "saving"}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-container px-6 py-3 font-data-tabular text-sm shadow-lg shadow-primary/20 transition-all hover:brightness-110 active:scale-95 disabled:opacity-40"
            >
              <Save className="h-5 w-5" />
              {status === "saving" ? "Guardando…" : "Guardar tasas"}
            </button>
            <button
              onClick={reset}
              className="glass-panel flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 font-data-tabular text-sm text-on-surface transition-all hover:bg-surface-variant/50 active:scale-95"
            >
              <RotateCcw className="h-5 w-5" />
              Restaurar por defecto (900.9 / 3)
            </button>
          </div>

          {status === "saved" && (
            <p className="flex items-center gap-1.5 text-sm text-neon-green">
              <CheckCircle2 className="h-4 w-4" /> {message}
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-error">⚠️ {message}</p>
          )}
        </div>

        {/* ── Columna derecha: hero + sync + log ──────── */}
        <div className="flex flex-col gap-6 lg:col-span-4">
          {/* Hero del Home */}
          <div className="glass-panel rounded-xl p-6">
            <h2 className="mb-2 flex items-center gap-2 font-headline-lg text-xl font-semibold text-on-surface">
              🎬 Hero del Home
            </h2>
            <p className="mb-4 text-sm text-on-surface-variant">
              Elegí qué fondo muestra la página de inicio. Se guarda en el navegador.
            </p>
            <div className="grid grid-cols-1 gap-3">
              {(
                [
                  ["video", "🎬 Video de batalla", "El hero actual: video de AoT con grid y partículas por encima."],
                  ["shader", "🌌 Shader 3D (Stitch)", "El hero de Stitch: grid 3D en perspectiva con glow lavanda y partículas."],
                ] as const
              ).map(([key, label, desc]) => (
                <button
                  key={key}
                  onClick={() => setHero(key)}
                  className={cn(
                    "rounded-lg border p-4 text-left transition-all active:scale-[0.98]",
                    heroMode === key
                      ? "neon-border-primary bg-primary/5"
                      : "glass-panel text-on-surface-variant hover:border-primary/40"
                  )}
                >
                  <span className="block font-label-caps text-sm font-bold text-on-surface">
                    {label}
                  </span>
                  <span className="mt-1 block text-xs text-on-surface-variant">{desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sync */}
          <div className="glass-panel rounded-xl p-6">
            <h2 className="mb-4 flex items-center gap-2 font-headline-lg text-xl font-semibold text-on-surface">
              <RefreshCw className="h-5 w-5 text-tertiary" />
              Sincronización de precios
            </h2>
            <p className="mb-6 text-sm text-on-surface-variant">
              Actualiza las listas oficiales y de tradeo con las tasas actuales. Usa los mismos
              scripts del bot; puede tardar hasta 1 minuto.
            </p>
            <button
              onClick={forceSync}
              disabled={syncing}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-lg bg-[#14b8a6] py-4 font-data-tabular text-sm text-white shadow-lg shadow-[#14b8a6]/20 transition-all hover:bg-[#0d9488] active:scale-95 disabled:opacity-40"
            >
              <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0" />
              {syncing ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <RefreshCw className="h-5 w-5" />
              )}
              <span className="relative z-10">
                {syncing ? "Sincronizando…" : "Forzar actualización de las 2 listas"}
              </span>
            </button>
            {syncMsg && (
              <p
                className={cn(
                  "mt-3 text-sm",
                  syncMsg.startsWith("✅") ? "text-neon-green" : "text-error"
                )}
              >
                {syncMsg}
              </p>
            )}
          </div>

          {/* Log */}
          <div className="glass-panel flex max-h-[400px] flex-col rounded-xl p-0">
            <div className="rounded-t-xl border-b border-outline-variant/30 bg-surface-low/50 p-4">
              <h3 className="flex items-center justify-between font-label-caps text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                ÚLTIMAS 30 SINCRONIZACIONES
                <span className="text-[10px] font-normal normal-case">se conservan las últimas 30</span>
              </h3>
            </div>
            <div className="scrollbar-hide flex-1 space-y-1 overflow-y-auto p-2">
              {syncLog.length === 0 && (
                <p className="p-4 text-center font-data-tabular text-xs text-on-surface-variant">
                  Todavía no hay sincronizaciones registradas.
                </p>
              )}
              {syncLog.map((log) => {
                const ok = log.status === "ok";
                const dot = log.source === "official" ? "#22c55e" : "#3b82f6";
                return (
                  <div
                    key={log.id}
                    className={cn(
                      "flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-surface-variant/30",
                      !ok && "opacity-60"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: dot, boxShadow: `0 0 8px ${dot}` }}
                      />
                      <div className="flex flex-col">
                        <span className="font-data-tabular text-sm text-on-surface">
                          {log.source === "official" ? "Oficial (hoja)" : "Trade (API)"}
                        </span>
                        <span className="text-[12px] text-on-surface-variant">
                          {ok ? `${log.rows ?? 0} items` : "error"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-data-tabular text-[12px] text-on-surface-variant">
                        {timeAgo(log.startedAt)}
                      </span>
                      <span className={ok ? "text-[#22c55e]" : "text-error"}>
                        {ok ? "✓" : "✗"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {!persisted && (
        <p className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-600">
          ⚠️ Sin base de datos configurada: las tasas se guardan en este navegador. Para que bot y web
          compartan los mismos valores, configurá <code className="font-mono">DATABASE_URL</code>.
        </p>
      )}

      {dbError && (
        <p className="mt-3 break-all rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 font-mono text-[11px] text-rose-600">
          🐛 Error de BD: {dbError}
        </p>
      )}
    </div>
  );
}
