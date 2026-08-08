// Pobla la base de datos (Supabase) desde el seed generado por el bot.
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
  console.log(`🌱 Sembrando ${items.length} items en la base de datos...`);

  for (const item of items) {
    await prisma.item.upsert({
      where: { normalized: item.normalized },
      create: {
        id: item.id,
        name: item.name,
        normalized: item.normalized,
        slug: item.slug,
        category: item.category,
        rarityLabel: item.rarityLabel,
        rarityPct: item.rarityPct,
        status: item.status,
        obtainedFrom: item.obtainedFrom,
        emoji: item.emoji,
        officialKeys: item.valueOfficial?.keys ?? undefined,
        officialScrolls: item.valueOfficial?.scrolls ?? undefined,
        officialVizards: item.valueOfficial?.vizards ?? undefined,
        officialDemand: item.demandOfficial,
        officialRate: item.officialRate ?? undefined,
        officialTaxGems: item.officialTaxGems ?? undefined,
        officialTaxGold: item.officialTaxGold ?? undefined,
        sheet: item.sheet ?? undefined,
        existingAmount: item.existingAmount ?? undefined,
        apiValue: item.apiValue,
        apiDemand: item.demandApi,
        apiRateOfChange: item.rateOfChange,
        apiPrestige: item.prestige ?? undefined,
        apiTaxGems: item.apiTaxGems ?? undefined,
        apiTaxGold: item.apiTaxGold ?? undefined,
        apiUpdatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
        apiId: item.apiId ?? undefined,
        source: item.source
      },
      update: {
        name: item.name,
        category: item.category,
        rarityLabel: item.rarityLabel,
        rarityPct: item.rarityPct,
        status: item.status,
        obtainedFrom: item.obtainedFrom,
        emoji: item.emoji,
        officialKeys: item.valueOfficial?.keys ?? null,
        officialScrolls: item.valueOfficial?.scrolls ?? null,
        officialVizards: item.valueOfficial?.vizards ?? null,
        officialDemand: item.demandOfficial,
        officialRate: item.officialRate ?? null,
        officialTaxGems: item.officialTaxGems ?? null,
        officialTaxGold: item.officialTaxGold ?? null,
        sheet: item.sheet ?? null,
        existingAmount: item.existingAmount ?? null,
        apiValue: item.apiValue,
        apiDemand: item.demandApi,
        apiRateOfChange: item.rateOfChange,
        apiPrestige: item.prestige ?? null,
        apiTaxGems: item.apiTaxGems ?? null,
        apiTaxGold: item.apiTaxGold ?? null,
        apiUpdatedAt: item.updatedAt ? new Date(item.updatedAt) : null,
        apiId: item.apiId ?? null,
        source: item.source
      }
    });
  }

  await prisma.$disconnect();
  console.log("✅ Seed completado.");
}

main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
