import { PrismaClient } from "../generated/index.js";

// Singleton compartido
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.__aotrPrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__aotrPrisma = prisma;
}

// ── Tasas de conversión (fuente de verdad) ───────────────
// Fallback alineado con la API de tradeo (Key = 0.00111 viz → 1 viz = 900.9 llaves)
// y con la web (apps/web/src/lib/rates.ts). El admin puede cambiarlo vía RateConfig.
export const DEFAULT_RATES = { keysPerVizard: 900.9, keysPerScroll: 3 };

let ratesCache = null;
let ratesAt = 0;
const RATES_TTL = 60_000; // 1 min

export async function getRates({ force = false } = {}) {
  if (!force && ratesCache && Date.now() - ratesAt < RATES_TTL) {
    return ratesCache;
  }
  try {
    const row = await prisma.rateConfig.findUnique({
      where: { id: "default" },
    });
    const rates = row
      ? { keysPerVizard: row.keysPerVizard, keysPerScroll: row.keysPerScroll }
      : { ...DEFAULT_RATES };
    ratesCache = rates;
    ratesAt = Date.now();
    return rates;
  } catch (error) {
    console.warn(
      "⚠️ No se pudo leer RateConfig, usando tasas por defecto:",
      error?.message,
    );
    return { ...DEFAULT_RATES };
  }
}

export async function setRates({ keysPerVizard, keysPerScroll }) {
  const keysPerV = Number(keysPerVizard);
  const keysPerS = Number(keysPerScroll);
  if (
    !Number.isFinite(keysPerV) ||
    keysPerV <= 0 ||
    !Number.isFinite(keysPerS) ||
    keysPerS <= 0
  ) {
    throw new Error("Las tasas deben ser números positivos");
  }
  const row = await prisma.rateConfig.upsert({
    where: { id: "default" },
    create: { id: "default", keysPerVizard: keysPerV, keysPerScroll: keysPerS },
    update: { keysPerVizard: keysPerV, keysPerScroll: keysPerS },
  });
  ratesCache = {
    keysPerVizard: row.keysPerVizard,
    keysPerScroll: row.keysPerScroll,
  };
  ratesAt = Date.now();
  return ratesCache;
}

// ── Configuración global del sitio (web) ─────────────────
// Hero del Home para TODOS los visitantes ("video" | "shader").
export const DEFAULT_SITE_CONFIG = { heroMode: "video" };

let siteCache = null;
let siteAt = 0;
const SITE_TTL = 30_000; // 30 s

export async function getSiteConfig({ force = false } = {}) {
  if (!force && siteCache && Date.now() - siteAt < SITE_TTL) {
    return siteCache;
  }
  try {
    const row = await prisma.siteConfig.findUnique({
      where: { id: "default" },
    });
    const config = row
      ? { heroMode: row.heroMode }
      : { ...DEFAULT_SITE_CONFIG };
    siteCache = config;
    siteAt = Date.now();
    return config;
  } catch (error) {
    console.warn(
      "⚠️ No se pudo leer SiteConfig, usando config por defecto:",
      error?.message,
    );
    return { ...DEFAULT_SITE_CONFIG };
  }
}

export async function setSiteConfig({ heroMode }) {
  const mode = String(heroMode ?? "video");
  if (mode !== "video" && mode !== "shader") {
    throw new Error("heroMode debe ser \"video\" o \"shader\"");
  }
  const row = await prisma.siteConfig.upsert({
    where: { id: "default" },
    create: { id: "default", heroMode: mode },
    update: { heroMode: mode },
  });
  siteCache = { heroMode: row.heroMode };
  siteAt = Date.now();
  return siteCache;
}
