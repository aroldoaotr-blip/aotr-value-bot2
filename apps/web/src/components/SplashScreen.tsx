"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "aotr-splash-done";

// Progreso estimado por fases reales de carga (0-100)
const PHASES: { at: number; label: string }[] = [
  { at: 12, label: "Inicializando…" },
  { at: 30, label: "Cargando datos de precios…" },
  { at: 55, label: "Sincronizando con el bot…" },
  { at: 78, label: "Preparando la interfaz…" },
  { at: 96, label: "Listo ✓" }
];

export function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(PHASES[0].label);
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    // Respetar prefers-reduced-motion: sin animaciones de carga
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        sessionStorage.setItem(STORAGE_KEY, "1");
        setHidden(true);
        return;
      }
    } catch {
      /* sin matchMedia */
    }
    // Solo en la primera visita de la sesión (evita el flash en cada navegación)
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        setHidden(true);
        return;
      }
    } catch {
      /* sin storage */
    }

    let raf = 0;
    let cancelled = false;
    const start = performance.now();

    // Avance con progreso suave basado en tiempo real hasta ~85%
    const tick = (now: number) => {
      if (cancelled || doneRef.current) return;
      const elapsed = (now - start) / 1000;
      // Curva de avance: llega a ~85% en ~1.8s, luego espera los eventos reales
      const target = Math.min(85, (elapsed / 1.8) * 85);
      const eased = Math.round(target * (2 - target / 85));
      setProgress((prev) => Math.max(prev, Math.min(85, eased)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Eventos reales que marcan el "app cargada"
    const ready = async () => {
      const windowLoaded = document.readyState === "complete";
      let fontsReady = true;
      try {
        if (document.fonts && "ready" in document.fonts) {
          await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]);
          fontsReady = true;
        }
      } catch {
        fontsReady = true;
      }
      if (cancelled) return;

      // Mínimo de permanencia para que la animación se aprecie (~1.4s)
      const elapsed = (performance.now() - start) / 1000;
      const waitMs = windowLoaded && fontsReady ? Math.max(0, 1400 - elapsed * 1000) : 0;
      await new Promise((r) => setTimeout(r, waitMs));
      if (cancelled) return;

      // 85 → 100 con animación
      doneRef.current = true;
      setProgress(100);
      setPhase("Listo ✓");
      await new Promise((r) => setTimeout(r, 350));
      if (cancelled) return;
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* sin storage */
      }
      setHidden(true);
    };

    // Red de seguridad: nunca quedarse trabado en el splash
    const safety = setTimeout(() => {
      doneRef.current = true;
      setProgress(100);
      setTimeout(() => {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* sin storage */
        }
        setHidden(true);
      }, 300);
    }, 6000);

    void ready();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(safety);
    };
  }, []);

  // El % mostrado sigue a la fase activa
  useEffect(() => {
    let current = PHASES[0].label;
    for (const p of PHASES) {
      if (progress >= p.at) current = p.label;
    }
    setPhase(current);
  }, [progress]);

  if (!mounted || hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05060f] transition-opacity duration-500 ${
        progress >= 100 ? "opacity-0" : "opacity-100"
      }`}
      style={{ pointerEvents: progress >= 100 ? "none" : "auto" }}
      aria-label="Cargando la aplicación"
    >
      {/* Grid de fondo tenue */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
      />

      <div className="relative flex flex-col items-center px-6">
        {/* Orb con pulso */}
        <div className="relative">
          <div className="orb h-16 w-16 animate-pulse-slow" />
          <div className="absolute inset-0 -z-10 rounded-full bg-indigo-500/30 blur-2xl" />
        </div>

        <h1 className="mt-6 font-display text-xl font-bold tracking-widest text-white sm:text-2xl">
          AOTR <span className="text-gradient">VALUES</span>
        </h1>
        <p className="mt-1.5 text-xs font-medium text-white/40">Precios oficiales + tradeo</p>

        {/* Barra de progreso */}
        <div className="mt-8 w-64 sm:w-80">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] font-medium text-white/45 transition-colors">{phase}</span>
            <span className="font-mono text-[11px] font-bold text-indigo-300">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
