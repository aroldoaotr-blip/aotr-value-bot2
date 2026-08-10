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
import { Avatar } from "@/components/Avatar";
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
  const [example, setExample] = useState<{ name: string; emoji: string | null } | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);
  const [syncLog, setSyncLog] = useState<SyncLogEntry[]>([]);

  const rates: Rates = useMemo(() => {
    const kv = Number(keysPerVizard);
    const ks = Number(keysPerScroll);
    return {
      keysPerVizard: Number.isFinite(kv) && kv > 0 ? kv : DEFAULT_RATES.keysPerVizard,
      keysPerScroll: Number.isFinite(ks) && ks > 0 ? ks : DEFAULT_RATES.keysPerScroll
    };
  }, [keysPerVizard, keysPerScroll]);

  // Cargar tasas actuales. localStorage del admin tiene prioridad para los
  // VALORES, pero SIEMPRE consultamos /api/rates para saber si la BD responde
  // (persisted) — así el aviso "sin BD" solo aparece cuando realmente falla.
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
          // La BD es la fuente compartida con el bot: si responde, sus valores
          // ganan; si no, se mantienen los del navegador.
          if (data.persisted) {
            setKeysPerVizard(String(data.rates.keysPerVizard));
            setKeysPerScroll(String(data.rates.keysPerScroll));
          }
          setPersisted(!!data.persisted);
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

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
          <p className="text-sm text-white/50">Verificando acceso…</p>
        </div>
      </div>
    );
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
      // Siempre guardar localmente también (modo sin BD)
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
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-28 sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="orb flex h-12 w-12 items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Administración de tasas
            </h1>
            <p className="mt-1 text-sm text-white/50">
              Estas tasas normalizan los precios en <strong className="text-white/80">llaves</strong>,{" "}
              <strong className="text-white/80">pergaminos</strong> y{" "}
              <strong className="text-white/80">vizard</strong> en toda la plataforma (web + bot).
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="glass flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-white/60 transition-all hover:border-rose-400/30 hover:text-rose-300"
          title="Cerrar sesión"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>

      {/* Tasas */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="gradient-border block rounded-2xl p-5">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-indigo-300">
            🎭 1 Vizard =
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <input
              type="number"
              min={1}
              step="any"
              value={keysPerVizard}
              onChange={(e) => setKeysPerVizard(e.target.value)}
              className="w-24 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-2xl font-bold text-white outline-none transition-all focus:border-indigo-400/60"
            />
            <span className="text-sm text-white/60">llaves</span>
          </div>
          <p className="mt-2 text-xs text-white/40">
            = {vizInKeys.toLocaleString("en-US")} llaves · ≈ {vizInScrolls.toLocaleString("en-US")} pergaminos
          </p>
        </label>

        <label className="gradient-border block rounded-2xl p-5">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-300">
            📜 1 Pergamino =
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <input
              type="number"
              min={1}
              step="any"
              value={keysPerScroll}
              onChange={(e) => setKeysPerScroll(e.target.value)}
              className="w-24 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-2xl font-bold text-white outline-none transition-all focus:border-amber-400/60"
            />
            <span className="text-sm text-white/60">llaves</span>
          </div>
          <p className="mt-2 text-xs text-white/40">
            1 llave = {keyInScrolls.toLocaleString("en-US", { maximumFractionDigits: 4 })} pergaminos
          </p>
        </label>
      </div>

      {/* Ejemplo en vivo */}
      <div className="glass mt-4 rounded-2xl p-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
          🔍 Ejemplo en vivo — item de 2 viz en la API
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
          <span className="text-white/70">🎭 2 viz</span>
          <span className="text-white/25">→</span>
          <span className="text-emerald-300">🔑 {(2 * rates.keysPerVizard).toLocaleString("en-US")} llaves</span>
          <span className="text-white/25">→</span>
          <span className="text-amber-300">
            📜 {((2 * rates.keysPerVizard) / rates.keysPerScroll).toLocaleString("en-US")} pergaminos
          </span>
        </div>
      </div>

      {/* Acciones */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={save}
          disabled={!valid || status === "saving"}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110 disabled:opacity-40"
        >
          <Save className="h-4 w-4" />
          {status === "saving" ? "Guardando…" : "Guardar tasas"}
        </button>
        <button
          onClick={reset}
          className="glass flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white/70 transition-all hover:text-white"
        >
          <RotateCcw className="h-4 w-4" />
          Restaurar por defecto (900.9 / 3)
        </button>

        {status === "saved" && (
          <span className="flex items-center gap-1.5 text-sm text-emerald-400">
            <CheckCircle2 className="h-4 w-4" /> {message}
          </span>
        )}
        {status === "error" && (
          <span className="text-sm text-rose-400">⚠️ {message}</span>
        )}
      </div>

      {/* Sincronización de precios */}
      <div className="glass mt-6 rounded-2xl p-5">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4 text-indigo-300" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-white/70">
            Sincronización de precios
          </h2>
        </div>
        <p className="mt-1 text-xs text-white/50">
          Fuerza la actualización de las 2 listas (hoja oficial + API de tradeo) en la base de
          datos. Usa los mismos scripts del bot; puede tardar hasta 1 minuto.
        </p>

        <button
          onClick={forceSync}
          disabled={syncing}
          className="mt-3 flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110 disabled:opacity-40"
        >
          {syncing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          {syncing ? "Sincronizando…" : "Forzar actualización de las 2 listas"}
        </button>

        {syncMsg && (
          <p
            className={cn(
              "mt-3 text-sm",
              syncMsg.startsWith("✅") ? "text-emerald-400" : "text-rose-400"
            )}
          >
            {syncMsg}
          </p>
        )}

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
              📋 Últimas actualizaciones
            </p>
            <span className="text-[10px] text-white/30">se conservan las últimas 30</span>
          </div>
          <div className="mt-2 max-h-72 space-y-1 overflow-y-auto pr-1">
            {syncLog.length === 0 && (
              <p className="text-xs text-white/40">
                Todavía no hay sincronizaciones registradas.
              </p>
            )}
            {syncLog.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5 text-xs"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span>{log.source === "official" ? "🟢" : "🔵"}</span>
                  <span className="font-medium text-white/80">
                    {log.source === "official" ? "Oficial (hoja)" : "Trade (API)"}
                  </span>
                  {log.status === "ok" ? (
                    <span className="text-emerald-400">✓ {log.rows ?? 0} items</span>
                  ) : (
                    <span className="text-rose-400">✗ error</span>
                  )}
                </span>
                <span className="shrink-0 text-white/35">{timeAgo(log.startedAt)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!persisted && (
        <p className="mt-4 rounded-xl border border-amber-400/20 bg-amber-500/10 p-3 text-xs text-amber-300">
          Sin base de datos configurada: las tasas se guardan en este navegador. Para que bot y web
          compartan los mismos valores, configurá <code className="font-mono">DATABASE_URL</code>.
        </p>
      )}

      {/* Items de ejemplo */}
      {example && (
        <div className="mt-6 flex items-center gap-3">
          <Avatar name={example.name} emoji={example.emoji} size="md" />
          <span className="text-sm text-white/60">{example.name}</span>
        </div>
      )}
    </div>
  );
}
