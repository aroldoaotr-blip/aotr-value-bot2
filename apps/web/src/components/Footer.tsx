import Link from "next/link";
import { Logo } from "./Logo";

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
    <footer className="relative z-10 mt-24 border-t border-outline-variant/20 bg-surface-lowest/90">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-sm text-center md:text-left">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <Logo className="h-7 w-7" />
              <span className="font-display-lg text-xl font-bold tracking-tighter text-on-surface">
                AOTR <span className="text-gradient">VALUES</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
              Plataforma profesional de valores de AOTR. Consulta precios oficiales
              y de tradeo, y comparativas justas en segundos.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
              <span className="rounded-full border border-[#22c55e]/20 bg-[#22c55e]/10 px-2.5 py-1 text-[10px] font-semibold text-official-green">
                🟢 Hoja oficial
              </span>
              <span className="rounded-full border border-[#3b82f6]/20 bg-[#3b82f6]/10 px-2.5 py-1 text-[10px] font-semibold text-trade-blue">
                🔵 API de tradeo
              </span>
              <span className="rounded-full border border-outline-variant/40 bg-surface-container px-2.5 py-1 text-[10px] font-semibold text-on-surface-variant">
                ⏱️ Actualizado cada 30 min
              </span>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-label-caps text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Explora
            </h4>
            <ul className="mt-3 space-y-2.5 text-sm">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-on-surface-variant/80 transition-colors hover:text-primary"
                  >
                    <span className="h-px w-3 bg-outline/40 transition-all group-hover:w-5 group-hover:bg-primary" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-label-caps text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Fuentes de datos
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-on-surface-variant/80">
              <li>
                🟢 <strong className="font-semibold text-on-surface">Hoja oficial AOTR</strong>{" "}
                — 679 items sincronizados por el bot
              </li>
              <li>
                🔵 <strong className="font-semibold text-on-surface">API de tradeo</strong> — 379
                items, actualizados cada 30 min
              </li>
              <li>
                📈 <strong className="font-semibold text-on-surface">Histórico</strong> — 60 días
                de tendencias por item
              </li>
              <li>
                ⚖️ <strong className="font-semibold text-on-surface">Comparador</strong> — oferta
                vs. demanda con ganancia o pérdida
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-outline-variant/20 pt-6 font-data-tabular text-xs text-on-surface-variant/70 sm:flex-row">
          <span>© {new Date().getFullYear()} AOTR Values — Todos los derechos reservados.</span>
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
