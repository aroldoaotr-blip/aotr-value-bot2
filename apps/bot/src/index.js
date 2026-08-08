// AOTR Values Bot — entry point
import "dotenv/config";
import { Client, GatewayIntentBits, Partials } from "discord.js";
import { registerEvents } from "./bot/events.js";
import { prisma } from "@aotr/db";

if (!process.env.DISCORD_TOKEN) {
  console.error(
    "❌ Falta DISCORD_TOKEN.\n" +
      "   Copia apps/bot/.env.example a apps/bot/.env y pega el token de tu bot " +
      "(https://discord.com/developers/applications)."
  );
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

registerEvents(client);

client
  .login(process.env.DISCORD_TOKEN)
  .then(() => console.log("🔑 Sesión iniciada"))
  .catch((error) => {
    console.error("❌ No se pudo iniciar sesión:", error.message);
    process.exit(1);
  });

// Apagado limpio
async function shutdown() {
  console.log("\n👋 Apagando bot...");
  try {
    await prisma.$disconnect();
  } catch {
    // ignorar
  }
  client.destroy();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
