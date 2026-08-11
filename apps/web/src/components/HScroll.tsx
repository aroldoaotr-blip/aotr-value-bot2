"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/format";

// Carrusel horizontal con flechas laterales (estilo glass-panel).
// Cada flecha se oculta cuando no hay más contenido en esa dirección,
// así nunca tapa las cards del borde (ej: la primera del carrusel).
export function HScroll({
  children,
  trackClassName,
  className
}: {
  children: ReactNode;
  trackClassName?: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir * Math.max(320, el.clientWidth * 0.7),
      behavior: "smooth"
    });
  };

  const arrowCls =
    "absolute top-1/2 z-10 -translate-y-1/2 glass-panel rounded-full p-2 text-on-surface-variant transition-all duration-300 hover:scale-110 hover:text-on-surface active:scale-95";

  return (
    <div className={cn("group relative", className)}>
      <button
        onClick={() => scrollBy(-1)}
        aria-label="Desplazar hacia la izquierda"
        className={cn(
          arrowCls,
          "left-0",
          canLeft
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div
        ref={trackRef}
        className={cn(
          "hide-scrollbar flex snap-x gap-6 overflow-x-auto pb-6",
          trackClassName
        )}
      >
        {children}
      </div>

      <button
        onClick={() => scrollBy(1)}
        aria-label="Desplazar hacia la derecha"
        className={cn(
          arrowCls,
          "right-0",
          canRight
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
