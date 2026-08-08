import Link from "next/link";

const EXPLORE_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/precios", label: "Precios" },
  { href: "/trade", label: "Comparar" },
  { href: "/historico", label: "Histórico" },
  { href: "/test", label: "Test de datos" },
  { href: "/administrador", label: "Panel admin" },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-white/[0.06] bg-[#05060f]/80">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="orb h-7 w-7" />
              <span className="font-display text-sm font-bold tracking-widest text-white">
                AOTR <span className="text-gradient">VALUES</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/45">
              Plataforma profesional de valores de AOTR. Consulta precios oficiales
              y de tradeo, y comparativas justas en segundos.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-emerald-400/20 bg-emerald-500/[0.07] px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                🟢 Hoja oficial
              </span>
              <span className="rounded-full border border-blue-400/20 bg-blue-500/[0.07] px-2.5 py-1 text-[10px] font-semibold text-blue-300">
                🔵 API de tradeo
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold text-white/60">
                ⏱️ Actualizado cada 30 min
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Explora
            </h4>
            <ul className="mt-3 space-y-2.5 text-sm">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-white/55 transition-colors hover:text-white"
                  >
                    <span className="h-px w-3 bg-white/25 transition-all group-hover:w-5 group-hover:bg-emerald-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Fuentes de datos
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-white/55">
              <li>
                🟢{" "}
                <strong className="font-semibold text-white/80">
                  Hoja oficial AOTR
                </strong>{" "}
                — 679 items sincronizados por el bot
              </li>
              <li>
                🔵{" "}
                <strong className="font-semibold text-white/80">
                  API de tradeo
                </strong>{" "}
                — 379 items, actualizados cada 30 min
              </li>
              <li>
                📈{" "}
                <strong className="font-semibold text-white/80">
                  Histórico
                </strong>{" "}
                — 60 días de tendencias por item
              </li>
              <li>
                ⚖️{" "}
                <strong className="font-semibold text-white/80">
                  Comparador
                </strong>{" "}
                — oferta vs. demanda con ganancia o pérdida
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-white/35 sm:flex-row">
          <span>© {new Date().getFullYear()} AOTR Values — Diseñado por melevengo</span>
          <span className="flex items-center gap-4">
            <span>Los precios son referenciales y pueden variar.</span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Sincronización activa
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
