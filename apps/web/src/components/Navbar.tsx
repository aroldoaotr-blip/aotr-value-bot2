"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Activity, Flame, Menu, Moon, X } from "lucide-react";
import { cn, formatRelative } from "@/lib/format";
import { PriceSourceToggle } from "@/lib/price-source";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/precios", label: "Precios" },
  { href: "/trade", label: "Comparar" },
  { href: "/historico", label: "Histórico" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [ember, setEmber] = useState(false);

  // Tema: rojo ceniza (ember) / espacio (dark)
  useEffect(() => {
    setEmber(document.documentElement.dataset.theme === "ember");
  }, []);

  const toggleTheme = () => {
    const next = !ember;
    setEmber(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "ember");
      localStorage.setItem("aotr-theme", "ember");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("aotr-theme", "dark");
    }
  };

  useEffect(() => {
    fetch("/api/meta")
      .then((r) => r.json())
      .then((meta) => {
        // Prioridad: el último sync EXITOSO del bot (SyncLog en la BD);
        // fallback a la fecha del seed local (sin BD).
        const lastSyncAt =
          meta.lastSyncs?.find((s: any) => s.status === "ok")?.startedAt ??
          meta.generatedAt;
        setLastSync(lastSyncAt);
      })
      .catch(() => setLastSync(null));
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#05060f]/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="orb h-9 w-9 transition-transform duration-300 group-hover:scale-110" />
          <div className="leading-tight">
            <span className="font-display text-sm font-bold tracking-widest text-white">
              AOTR <span className="text-gradient">VALUES</span>
            </span>
            <span className="block text-[10px] font-medium text-white/40">
              Precios oficiales + tradeo
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                isActive(link.href)
                  ? "bg-white/[0.08] text-white shadow-inner"
                  : "text-white/55 hover:bg-white/[0.05] hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
          <PriceSourceToggle className="ml-2 hidden lg:flex" />

          <button
            onClick={toggleTheme}
            className="ml-2 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/70 transition-all hover:border-white/25 hover:text-white"
            aria-label={
              ember ? "Cambiar a tema oscuro" : "Cambiar a tema rojo ceniza"
            }
            title={ember ? "Tema oscuro" : "Tema rojo ceniza"}
          >
            {ember ? (
              <Moon className="h-3.5 w-3.5" />
            ) : (
              <Flame className="h-3.5 w-3.5 text-orange-400" />
            )}
            <span className="hidden lg:inline">
              {ember ? "Tema espacio" : "Tema ceniza"}
            </span>
          </button>

          {/*           <Link
            href="/administrador"
            className={cn(
              "ml-2 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
              isActive("/administrador")
                ? "border-indigo-400/40 bg-indigo-500/15 text-white"
                : "border-white/10 bg-white/[0.04] text-white/50 hover:border-white/25 hover:text-white"
            )}
            title="Administrar tasas de conversión"
          >
            ⚙️ <span className="hidden lg:inline">Admin</span>
          </Link>

          <Link
            href="/test"
            className={cn(
              "ml-1.5 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
              isActive("/test")
                ? "border-cyan-400/40 bg-cyan-500/15 text-white"
                : "border-white/10 bg-white/[0.04] text-white/50 hover:border-white/25 hover:text-white"
            )}
            title="Página de test: datos crudos de ambas fuentes"
          >
            🧪 <span className="hidden lg:inline">Test</span>
          </Link> */}
          <div className="ml-3 flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/[0.07] px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-300">
              <Activity className="h-3 w-3" />
              {lastSync ? formatRelative(lastSync) : "sync"}
            </span>
          </div>
        </div>

        <button
          className="rounded-lg p-2 text-white/70 hover:bg-white/10 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/[0.06] bg-[#07081a]/95 px-4 py-3 md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-sm font-medium",
                isActive(link.href)
                  ? "bg-white/[0.08] text-white"
                  : "text-white/60 hover:bg-white/5",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/test"
            onClick={() => setOpen(false)}
            className={cn(
              "block rounded-lg px-3 py-2.5 text-sm font-medium",
              isActive("/test")
                ? "bg-white/[0.08] text-white"
                : "text-white/60 hover:bg-white/5",
            )}
          >
            🧪 Test de datos
          </Link>
        </div>
      )}
    </header>
  );
}
