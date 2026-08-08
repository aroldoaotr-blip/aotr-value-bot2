// Tasas para componentes servidor: lee RateConfig de la BD (Supabase vía
// @aotr/db) si está configurada; si no, usa el default alineado con la API/bot.
// ⚠️ Solo debe importarse desde server components / API routes: @aotr/db usa
// módulos nativos de Node (node:module) y no puede bundlearse para el cliente.
import { DEFAULT_RATES, type Rates } from "./rates";

export async function getServerRates(): Promise<Rates> {
  if (process.env.DATABASE_URL) {
    try {
      const { getRates } = await import("@aotr/db");
      const rates = await getRates();
      if (
        rates &&
        Number.isFinite(rates.keysPerVizard) &&
        Number.isFinite(rates.keysPerScroll)
      ) {
        return rates;
      }
    } catch (error) {
      console.warn("⚠️ getServerRates: no se pudo leer la BD, usando default:", error);
    }
  }
  return DEFAULT_RATES;
}
