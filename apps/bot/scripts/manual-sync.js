// Sincronización manual: node scripts/manual-sync.js [official|trade|all]
import "dotenv/config";
import { syncAll } from "../src/services/sync.js";
import { prisma } from "@aotr/db";

const which = process.argv[2] ?? "all";

if (!process.env.DATABASE_URL) {
  console.error("❌ Falta DATABASE_URL. Configúrala en .env");
  process.exit(1);
}

console.log(`🔄 Sincronizando: ${which}`);
const results = await syncAll({
  official: which === "all" || which === "official",
  trade: which === "all" || which === "trade"
});

console.log("📋 Resultado:", JSON.stringify(results, null, 2));
await prisma.$disconnect();
