"use client";

import dynamic from "next/dynamic";
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

export function Hero() {
  return (
    <section className="hero-dark relative flex min-h-[100vh] w-full items-center overflow-hidden pt-24">
      {/* Fondo 3D */}
      <div className="absolute inset-0">
        <Hero3D />
      </div>
      <div className="grid-bg absolute inset-0" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/70"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
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
            className="mt-6 font-display text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Valores de AOTR
            <br />
            <span className="shimmer-text">en tiempo real.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
          >
            Consulta el{" "}
            <strong className="text-white/80">precio oficial</strong> de la hoja
            AOTR y el{" "}
            <strong className="text-white/80">precio de tradeo</strong> de la
            comunidad, con histórico y tendencias. Todo sincronizado
            automáticamente.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.44 }}
            className="mt-8 max-w-2xl"
          >
            <SearchBar big autoFocus />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/40"
          >
            <span>⚡ Respuesta instantánea</span>
            <span>📈 Histórico de precios</span>
            <span>🤖 Bot + Web sincronizados</span>
          </motion.div>
        </div>
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
            className="h-1.5 w-1 rounded-full bg-indigo-300"
          />
        </div>
      </motion.div>
    </section>
  );
}
