"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import { SearchBar } from "./SearchBar";

const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="orb h-32 w-32 animate-pulse-glow" />
    </div>
  ),
});

const HeroShader = dynamic(() => import("./HeroShader"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="orb h-32 w-32 animate-pulse-glow" />
    </div>
  ),
});

// Modo del hero: "video" (batalla, default) | "shader" (grid 3D de Stitch).
// Lo elige el admin desde /administrador (localStorage "aotr-hero").
export type HeroMode = "video" | "shader";

export function getHeroMode(): HeroMode {
  try {
    const v = localStorage.getItem("aotr-hero");
    if (v === "shader" || v === "video") return v;
  } catch {
    /* sin storage */
  }
  return "video";
}

export function Hero() {
  const [mode, setMode] = useState<HeroMode>("video");

  useEffect(() => {
    // Preferencia local instantánea (fallback si la BD no responde)
    setMode(getHeroMode());
    // Config GLOBAL: el admin la guarda en SiteConfig (/administrador) y
    // se aplica a TODOS los visitantes — el servidor manda.
    fetch("/api/config")
      .then((r) => r.json())
      .then((data) => {
        const v = data?.config?.heroMode;
        if (v === "shader" || v === "video") setMode(v);
      })
      .catch(() => {
        /* mantener lo local */
      });
    // Reacciona a cambios desde /administrador en otra pestaña
    const onStorage = (e: StorageEvent) => {
      if (e.key === "aotr-hero") setMode(getHeroMode());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <section className="hero-dark relative flex min-h-[100vh] w-full items-center pt-24">
      {/* Fondo: video de batalla (default) o shader 3D de Stitch */}
      <div className="absolute inset-0">
        {mode === "shader" ? <HeroShader /> : <Hero3D />}
      </div>
      <div className="grid-bg absolute inset-0" />

      {/* Vignette para legibilidad del texto */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      {/* Contenido centrado (hero Stitch) */}
      {/* Sin z-index acá: si el contenedor creara un stacking context (z-10),
          el dropdown del buscador (z-50) quedaría atrapado dentro y las cards
          de abajo (z-20) lo taparían. El video/vignette ya quedan detrás por
          orden de DOM. */}
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 pb-24 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/70"
        >
          <Sparkles className="h-3.5 w-3.5 text-lavender" />
          Sincronizado con el bot de Discord
          <span className="text-white/30">•</span>
          <span className="flex items-center gap-1 text-emerald-300">
            <Zap className="h-3 w-3" /> 2 fuentes de precio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 bg-gradient-to-b from-white via-[#e9ddff] to-[#cfbcff]/50 bg-clip-text font-display-lg text-6xl font-black leading-none tracking-tighter text-transparent drop-shadow-[0_0_40px_rgba(207,188,255,0.3)] sm:text-8xl lg:text-[96px]"
        >
          AOTR VALUES
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-white/55 sm:text-2xl"
        >
          La plataforma de precios premium para Attack on Titan Revolution.
          <br className="hidden md:block" />{" "}
          <span className="font-medium text-lavender drop-shadow-[0_0_8px_rgba(207,188,255,0.4)]">
            Datos en tiempo real, sincronizados cada 30 minutos.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.44 }}
          className="mt-10 w-full max-w-2xl"
        >
          <SearchBar big autoFocus />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/40"
        >
          <span>⚡ Respuesta instantánea</span>
          <span>📈 Histórico de precios</span>
          <span>🤖 Bot + Web sincronizados</span>
        </motion.div>
      </div>

      {/* Fade inferior: funde el video con el fondo de la página (theme-aware) */}
      <div
        aria-hidden
        className="hero-fade pointer-events-none absolute inset-x-0 bottom-0 h-40 sm:h-56"
      />

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-1.5 w-1 rounded-full bg-lavender"
          />
        </div>
      </motion.div>
    </section>
  );
}
