"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, Lock, ShieldCheck, User } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Si ya hay sesión activa, ir directo al panel
  useEffect(() => {
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((data) => {
        if (data.authed) router.replace("/administrador");
        else setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user.trim() || !password) {
      setError("Ingresá usuario y contraseña.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: user.trim(), password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error de autenticación");
      router.replace("/administrador");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesión.");
      setSubmitting(false);
    }
  }

  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 py-24">
      {/* Halo de fondo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="flex flex-col items-center text-center">
        <div className="orb h-14 w-14 animate-pulse-slow" />
        <h1 className="mt-4 font-display text-2xl font-bold tracking-widest text-white">
          AOTR <span className="text-gradient">ADMIN</span>
        </h1>
        <p className="mt-2 text-sm text-white/50">
          Acceso restringido — solo el administrador puede gestionar las tasas.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="glass mt-8 w-full rounded-3xl p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-center gap-2 text-white/70">
          <ShieldCheck className="h-4 w-4 text-indigo-300" />
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
            Iniciar sesión
          </span>
        </div>

        <label className="mt-5 block">
          <span className="mb-1.5 block text-xs font-medium text-white/60">Usuario</span>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              autoComplete="username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="admin"
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-3 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-indigo-400/60 focus:bg-white/[0.08]"
            />
          </div>
        </label>

        <label className="mt-4 block">
          <span className="mb-1.5 block text-xs font-medium text-white/60">Contraseña</span>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              type={showPass ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-3 pl-10 pr-11 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-indigo-400/60 focus:bg-white/[0.08]"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/70"
              aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </label>

        {error && (
          <p className="mt-4 rounded-xl border border-rose-400/20 bg-rose-500/10 px-3 py-2.5 text-xs text-rose-300">
            ⚠️ {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 py-3 text-sm font-bold text-white transition-all hover:brightness-110 disabled:opacity-40"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Verificando…
            </>
          ) : (
            "Entrar al panel"
          )}
        </button>
      </form>

      {loading && (
        <p className="mt-6 flex items-center gap-2 text-xs text-white/40">
          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Verificando sesión…
        </p>
      )}
    </div>
  );
}
