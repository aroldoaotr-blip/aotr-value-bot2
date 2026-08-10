"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, LogOut, RotateCcw, Save, ShieldCheck } from "lucide-react";
import {
  clearLocalRates,
  DEFAULT_RATES,
  getLocalRates,
  setLocalRates,
  type Rates
} from "@/lib/rates";
import { Avatar } from "@/components/Avatar";
import { cn } from "@/lib/format";

export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [keysPerVizard, setKeysPerVizard] = useState(String(DEFAULT_RATES.keysPerVizard));
  const [keysPerScroll, setKeysPerScroll] = useState(String(DEFAULT_RATES.keysPerScroll));
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");
  const [persisted, setPersisted] = useState(false);
  const [example, setExample] = useState<{ name: string; emoji: string | null } | null>(null);

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
