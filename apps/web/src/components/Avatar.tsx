"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/format";

const LEGACY_IMAGE_BASE = "https://www.aotrvalue.com";
const OFFICIAL_IMAGE_BASE = "https://aotrevolution.com/originals/webp";

function officialImageUrl(image: string): string {
  // data.js puede listar PNG/JPG, pero los originales públicos se sirven como WebP.
  const webpName = image.replace(/\.[a-z0-9]+$/i, ".webp");
  return `${OFFICIAL_IMAGE_BASE}/${encodeURIComponent(webpName)}`;
}

function initialsOf(name: string): string {
  // Array.from es code-point aware: evita partir un emoji en surrogates
  // sueltos (ej: item llamado "🗿"), que causaba mismatch de hidratación.
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => Array.from(w)[0]?.toUpperCase() ?? "")
    .join("")
    .trim();
}

/**
 * Recorta los márgenes transparentes de un sprite (ej: 683×720 donde el item
 * real ocupa una fracción) y devuelve un dataURL "cropeado" + si el fondo es
 * mayormente opaco (sprites con fondo dorado propio) o transparente.
 */
function analyzeSprite(src: string): Promise<{ src: string; opaque: boolean }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const c = document.createElement("canvas");
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext("2d");
        if (!ctx) return reject(new Error("no ctx"));
        ctx.drawImage(img, 0, 0);
        const d = ctx.getImageData(0, 0, img.width, img.height).data;

        // Sample de las 4 esquinas para detectar fondo opaco (dorado/card)
        const at = (x: number, y: number) => d[(y * img.width + x) * 4 + 3];
        const corners = [
          at(2, 2),
          at(img.width - 3, 2),
          at(2, img.height - 3),
          at(img.width - 3, img.height - 3),
        ];
        const fullyOpaque = corners.every((a) => a > 200);

        if (fullyOpaque) {
          // Fondo propio (card dorada): no recortar, mostrar tal cual
          resolve({ src, opaque: true });
          return;
        }

        // Buscar bounds no-transparentes
        let minX = img.width,
          minY = img.height,
          maxX = 0,
          maxY = 0;
        for (let y = 0; y < img.height; y++) {
          for (let x = 0; x < img.width; x++) {
            if (d[(y * img.width + x) * 4 + 3] > 24) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }
        if (maxX <= minX || maxY <= minY) {
          resolve({ src, opaque: false });
          return;
        }
        // Margen de respiro de 4% del tamaño
        const pad = Math.round(Math.max(img.width, img.height) * 0.04);
        const x0 = Math.max(0, minX - pad);
        const y0 = Math.max(0, minY - pad);
        const x1 = Math.min(img.width, maxX + pad);
        const y1 = Math.min(img.height, maxY + pad);

        const c2 = document.createElement("canvas");
        c2.width = x1 - x0;
        c2.height = y1 - y0;
        const ctx2 = c2.getContext("2d");
        if (!ctx2) return reject(new Error("no ctx2"));
        ctx2.drawImage(img, x0, y0, x1 - x0, y1 - y0, 0, 0, x1 - x0, y1 - y0);
        resolve({ src: c2.toDataURL("image/png"), opaque: false });
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = () => reject(new Error("load error"));
    img.src = src;
  });
}

// Caché con límite (evita acumular ~100MB de dataURLs con 483 items)
const cropCache = new Map<string, { src: string; opaque: boolean }>();
const CROP_CACHE_MAX = 200;

function cacheSet(key: string, value: { src: string; opaque: boolean }) {
  if (cropCache.size >= CROP_CACHE_MAX) cropCache.clear();
  cropCache.set(key, value);
}

export function Avatar({
  name,
  officialImage,
  emoji,
  size = "md",
  className,
  rounded = "xl",
  glowColor, // <-- 1. Recibimos el color de brillo
}: {
  name: string;
  officialImage?: string | null;
  emoji?: string | null;
  size?: "sm" | "md" | "lg" | "xl" | "card";
  className?: string;
  rounded?: "xl" | "full";
  glowColor?: string; // <-- Definimos su tipo
}) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [prep, setPrep] = useState<{ src: string; opaque: boolean } | null>(
    null,
  );
  const sources = [
    officialImage ? officialImageUrl(officialImage) : null,
    emoji
      ? `${LEGACY_IMAGE_BASE}${emoji.startsWith("/") ? emoji : `/${emoji}`}`
      : null,
  ].filter((source): source is string => Boolean(source));
  const src = sources[sourceIndex] ?? null;
  const showImg = Boolean(src);

  // Volver a intentar primero la imagen oficial cuando cambia el item.
  useEffect(() => {
    setSourceIndex(0);
    setPrep(null);
  }, [officialImage, emoji]);

  useEffect(() => {
    setPrep(null);
    if (!src) return;
    let alive = true;
    const cached = cropCache.get(src);
    if (cached) {
      setPrep(cached);
      return;
    }
    // Mientras se analiza, mostrar la imagen original con contain neutro (sin fondo claro)
    setPrep({ src, opaque: false });
    analyzeSprite(src)
      .then((r) => {
        if (!alive) return;
        cacheSet(src, r);
        setPrep(r);
      })
      .catch(() => {
        // Si CORS/decodificación falla, la original con contain ya está mostrándose
      });
    return () => {
      alive = false;
    };
  }, [src]);

  const sizes = {
    sm: "h-32 w-32 text-[11px]",
    md: "h-32 w-32 text-sm",
    lg: "h-32 w-32 text-lg",
    xl: "h-36 w-36 text-3xl",
    card: "h-28 w-28 sm:h-36 sm:w-36 text-3xl sm:text-4xl",
  };

  const radius = rounded === "full" ? "rounded-full" : "rounded-xl";

  return (
    <div
      className={cn(
        "avatar-shell p-2 relative flex shrink-0 items-center justify-center overflow-hidden",
        radius,
        sizes[size],
        className,
      )}
      style={{
        // 2. Si hay glowColor, aplicamos el gradiente de negro a glowColor.
        // Si no, lo dejamos limpio o con un fondo por defecto.
        backgroundImage: glowColor
          ? `linear-gradient(to bottom, rgb(80, 80, 80), ${glowColor})`
          : undefined,
      }}
      aria-label={name}
    >
      {showImg && prep ? (
        <img
          src={prep.src}
          alt={name}
          loading="lazy"
          decoding="async"
          onError={() => {
            setPrep(null);
            setSourceIndex((index) => index + 1);
          }}
          className={cn(
            "avatar-img relative h-full w-full object-contain",
            prep.opaque && "avatar-opaque",
            radius,
          )}
        />
      ) : (
        <span className="avatar-fallback relative z-10 font-bold drop-shadow-sm">
          {initialsOf(name) || "?"}
        </span>
      )}
    </div>
  );
}
