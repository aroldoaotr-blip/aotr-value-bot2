// Pobla la base de datos (Supabase) desde el seed generado por el bot.
// Ahora escribe en las 2 tablas de precios independientes:
//   - OfficialPrice (items con valor oficial / hoja)
//   - TradePrice    (items con valor de la API)
// más la fila RateConfig por defecto (900.9 / 3).
// Uso:  DATABASE_URL=postgres://... npm run seed -w @aotr/db
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

dotenv.config();

const require = createRequire(import.meta.url);
const { PrismaClient } = require("../generated");
const prisma = new PrismaClient();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEED_FILE =
  process.env.SEED_FILE ||
  path.resolve(__dirname, "../../../apps/web/src/lib/seed/items.json");

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("❌ Falta DATABASE_URL (variable de entorno).");
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(SEED_FILE, "utf8"));
  const { items } = raw;
  console.log(`🌱 Sembrando ${items.length} items en las tablas de precios...`);

  const officialRows = [];
  const tradeRows = [];

  for (const item of items) {
    if (item.valueOfficial) {
      officialRows.push({
        id: item.id,
        name: item.name,
        normalized: item.normalized,
        slug: item.slug,
        category: item.category,
        rarityLabel: item.rarityLabel,
        demand: item.demandOfficial,
        keys: item.valueOfficial.keys ?? null,
        scrolls: item.valueOfficial.scrolls ?? null,
        vizards: item.valueOfficial.vizards ?? null,
        rateOfChange: item.officialRate ?? null,
        taxGems: item.officialTaxGems ?? null,
        taxGold: item.officialTaxGold ?? null,
        sheet: item.sheet ?? null,
        existingAmount: item.existingAmount ?? null
      });
    }

    if (item.apiValue != null) {
      tradeRows.push({
        id: item.id,
        name: item.name,
        normalized: item.normalized,
        slug: item.slug,
        category: item.category,
        rarityPct: item.rarityPct ?? null,
        emoji: item.emoji ?? null,
        value: item.apiValue,
        keys: item.apiKeys ?? null,
        scrolls: item.apiScrolls ?? null,
        demand: item.demandApi,
        rateOfChange: item.rateOfChange,
        prestige: item.prestige ?? null,
        status: item.status,
        obtainedFrom: item.obtainedFrom,
        taxGems: item.apiTaxGems ?? null,
        taxGold: item.apiTaxGold ?? null,
        apiId: item.apiId ?? null,
        apiUpdatedAt: item.updatedAt ? new Date(item.updatedAt) : null
      });
    }
  }

  if (officialRows.length) {
    await prisma.officialPrice.createMany({ data: officialRows, skipDuplicates: true });
  }
  if (tradeRows.length) {
    await prisma.tradePrice.createMany({ data: tradeRows, skipDuplicates: true });
  }

  // Tasas por defecto (1 viz = 900.9 llaves, 1 pergamino = 3 llaves)
  await prisma.rateConfig.upsert({
    where: { id: "default" },
    create: { id: "default", keysPerVizard: 900.9, keysPerScroll: 3 },
    update: {}
  });

  await prisma.$disconnect();
  console.log(
    `✅ Seed completado: ${officialRows.length} oficiales · ${tradeRows.length} trade · RateConfig listo.`
  );
}

main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
