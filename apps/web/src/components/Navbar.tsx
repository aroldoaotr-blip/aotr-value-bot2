"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Activity, Flame, Menu, Moon, X } from "lucide-react";
import { cn, formatRelative } from "@/lib/format";
import { PriceSourceToggle } from "@/lib/price-source";
import { Logo } from "./Logo";

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-outline-variant/30 bg-surface/80 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <Logo className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
          <div className="leading-tight">
            <span className="font-display-lg text-lg font-bold tracking-tighter text-on-surface drop-shadow-[0_0_8px_rgba(207,188,255,0.6)]">
              AOTR <span className="text-gradient">VALUES</span>
            </span>
            <span className="block text-[10px] font-medium text-on-surface-variant/60">
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
                "rounded-lg px-3 py-1.5 font-label-caps text-xs font-bold tracking-wider transition-all duration-200",
                isActive(link.href)
                  ? "border-b-2 border-primary text-primary"
                  : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface",
              )}
            >
              {link.label}
            </Link>
          ))}
          <PriceSourceToggle className="ml-3 hidden lg:flex" />

          <button
            onClick={toggleTheme}
            className="ml-2 flex items-center gap-1.5 rounded-full border border-outline-variant/50 bg-surface-container px-3 py-1.5 text-xs font-medium text-on-surface-variant transition-all hover:border-primary/40 hover:text-on-surface"
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
          </button>

          <div className="ml-3 flex items-center gap-2 rounded-full border border-[#4ade80]/20 bg-[#4ade80]/[0.07] px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="flex items-center gap-1 font-data-tabular text-[11px] font-medium text-neon-green">
              <Activity className="h-3 w-3" />
              {lastSync ? `Sincronizado: ${formatRelative(lastSync)}` : "sync"}
            </span>
          </div>
        </div>

        <button
          className="rounded-lg p-2 text-on-surface-variant hover:bg-white/10 hover:text-on-surface md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-outline-variant/30 bg-surface-low/95 px-4 py-3 backdrop-blur-xl md:hidden">
          <div className="mb-3">
            <PriceSourceToggle className="w-full" />
          </div>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-sm font-medium",
                isActive(link.href)
                  ? "bg-primary/10 text-primary"
                  : "text-on-surface-variant hover:bg-white/5",
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
                ? "bg-primary/10 text-primary"
                : "text-on-surface-variant hover:bg-white/5",
            )}
          >
            🧪 Test de datos
          </Link>
        </div>
      )}
    </header>
  );
}
