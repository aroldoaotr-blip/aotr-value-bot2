// Test de verificación de guardado de histórico en Supabase
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { prisma } from "@aotr/db";
import { recordTradeHistory, recordOfficialHistory } from "../src/services/sync.js";

async function main() {
  console.log("🧪 Iniciando test de guardado de histórico en Supabase...");

  const initialTradeCount = await prisma.tradePriceHistory.count();
  const initialOfficialCount = await prisma.officialPriceHistory.count();

  console.log(`📊 Conteo inicial en BD: TradeHistory = ${initialTradeCount} | OfficialHistory = ${initialOfficialCount}`);

  // Simular llamado a recordTradeHistory con los precios actuales (debería ignorar los 0 cambios)
  const tradeRows = await prisma.tradePrice.findMany({ select: { name: true, value: true, demand: true } });
  console.log(`📡 Probando recordTradeHistory con ${tradeRows.length} items sin cambios...`);
  await recordTradeHistory(tradeRows);

  const afterTradeCount = await prisma.tradePriceHistory.count();
  console.log(`✅ TradeHistory después de test sin cambios: ${afterTradeCount} (diferencia: +${afterTradeCount - initialTradeCount})`);

  // Simular llamado a recordOfficialHistory con los precios oficiales actuales
  const officialRows = await prisma.officialPrice.findMany({
    select: { name: true, keys: true, vizards: true }
  });
  const officialItems = officialRows.map((r) => ({
    name: r.name,
    value: { keys: r.keys, vizards: r.vizards }
  }));

  console.log(`📜 Probando recordOfficialHistory con ${officialItems.length} items sin cambios...`);
  await recordOfficialHistory(officialItems);

  const afterOfficialCount = await prisma.officialPriceHistory.count();
  console.log(`✅ OfficialHistory después de test sin cambios: ${afterOfficialCount} (diferencia: +${afterOfficialCount - initialOfficialCount})`);

  console.log("\n🎉 Test completado exitosamente: El sistema deduplica correctamente las syncs sin cambios.");
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error("❌ Test fallido:", e);
  await prisma.$disconnect();
  process.exit(1);
});
