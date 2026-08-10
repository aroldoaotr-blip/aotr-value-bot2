// Interacciones: botones y autocompletado

import { EmbedBuilder } from "discord.js";
import { state } from "./state.js";
import { compactKey } from "../core/normalize.js";
import { splitItems } from "../core/parser.js";
import { resolveCurrency } from "../core/currency.js";
import {
  createItemEmbed,
  createSimilarEmbed,
  createTradeEmbed,
  createGiveawayEmbed,
  itemEmbedButtons,
  tradeEmbedButtons
} from "./embeds.js";
import { findSimilarItems, resolveItems, buildComparison, getHistorySpark } from "./handlers.js";

// ── Similares compartido ─────────────────────────────────
async function handleSimilar(interaction, ctxId, percent) {
  const targetName = state.activeSimilar.get(ctxId);
  state.activeSimilar.delete(ctxId);

  if (!targetName) {
    return interaction.reply({
      content: "❌ Esta búsqueda ya no está disponible.",
      ephemeral: true
    });
  }

  const targetItem = state.resolveItem(targetName);
  if (!targetItem) {
    return interaction.reply({
      content: "❌ No pude volver a encontrar el item.",
      ephemeral: true
    });
  }

  const similarItems = findSimilarItems(targetItem, state.itemsCache, 10, percent);
  return interaction.update({
    embeds: [createSimilarEmbed(targetItem, similarItems, percent)],
    components: []
  });
}

// ── Autocompletado ───────────────────────────────────────
export async function handleAutocomplete(interaction) {
  const focused = interaction.options.getFocused(true);
  const query = String(focused.value ?? "").trim();

  let choices = [];

  if (focused.name === "perk") {
    const { getWikiEntries } = await import("../data/wiki.js");
    choices = Object.values(getWikiEntries())
      .filter((e) => e?.name)
      .filter((e) => e.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 20)
      .map((e) => ({ name: e.name.slice(0, 100), value: e.name.slice(0, 100) }));
  } else {
    choices = state.resolveItem
      .suggest(query || "a", 20)
      .map((item) => ({ name: item.name.slice(0, 100), value: item.name.slice(0, 100) }));
  }

  await interaction.respond(choices);
}

// ── Botones ──────────────────────────────────────────────
export async function handleButton(interaction) {
  const customId = interaction.customId;

  // 🎉 Sorteo: participar
  if (customId.startsWith("giveaway_join_")) {
    const giveawayId = customId.replace("giveaway_join_", "");
    const giveaway = state.giveaways.get(giveawayId);

    if (!giveaway) {
      return interaction.reply({
        content: "❌ Este sorteo ya terminó o no está disponible.",
        ephemeral: true
      });
    }

    const result = state.giveaways.join(giveawayId, interaction.user.id);

    if (result.reason === "already") {
      return interaction.reply({ content: "✅ Ya estás participando en este sorteo.", ephemeral: true });
    }

    if (result.reason === "ended") {
      return interaction.reply({ content: "❌ Este sorteo ya terminó.", ephemeral: true });
    }

    try {
      const channel = await interaction.client.channels.fetch(giveaway.channelId);
      const msg = await channel.messages.fetch(giveaway.messageId);
      await msg.edit({ embeds: [createGiveawayEmbed(giveaway, giveawayId)] });
    } catch {
      // ignorar errores de edición
    }

    return interaction.reply({ content: "🎉 Entraste al sorteo correctamente.", ephemeral: true });
  }

  // 🔄 Cambiar la lista visible del item (oficial ↔ tradeo)
  if (customId.startsWith("item_src_")) {
    const parts = customId.split("_");
    const ctxId = parts[2];
    const target = parts[3]; // "official" | "trade"

    const entry = state.activeCurrency.get(ctxId);
    if (!entry) {
      return interaction.reply({ content: "❌ Esta búsqueda ya no está disponible.", ephemeral: true });
    }
    const itemName = typeof entry === "string" ? entry : entry.name;

    const item = state.resolveItem(itemName);
    if (!item) {
      return interaction.reply({ content: "❌ No pude volver a encontrar el item.", ephemeral: true });
    }

    const apiRow = state.getApiRow(compactKey(item.name));
    const embed = createItemEmbed(item, {
      apiRow,
      keyRatio: state.apiKeyRatio,
      visible: target,
      primary: target,
    });

    state.activeCurrency.set(ctxId, { name: itemName, visible: target });

    return interaction.update({
      embeds: [embed],
      components: itemEmbedButtons(ctxId, item, apiRow, target),
    });
  }

  // 🔍 Similares (±10% desde el embed de valor, ±20% desde el comando)
  if (customId.startsWith("similar20_")) {
    return handleSimilar(interaction, customId.replace("similar20_", ""), 20);
  }

  if (customId.startsWith("similar_")) {
    return handleSimilar(interaction, customId.replace("similar_", ""), 10);
  }

  // ⚖️ Cambiar fuente del trade (oficial ↔ trade)
  if (customId.startsWith("trade_src_")) {
    const parts = customId.split("_");
    const ctxId = parts[2];
    const source = parts[3];

    const tradeCtx = state.activeTrades.get(ctxId);
    if (!tradeCtx) {
      return interaction.reply({ content: "❌ Esta comparación ya no está disponible.", ephemeral: true });
    }

    const leftResolved = resolveItems(splitItems(tradeCtx.leftText));
    const rightResolved = resolveItems(splitItems(tradeCtx.rightText));
    const notFound = [...leftResolved.notFound, ...rightResolved.notFound];
    const comparison = buildComparison(leftResolved, rightResolved, source);

    return interaction.update({
      embeds: [
        createTradeEmbed(
          comparison,
          notFound.length ? `❌ **No encontrados:**\n${notFound.map((n) => `• ${n}`).join("\n")}` : "",
          source
        )
      ],
      components: [tradeEmbedButtons(ctxId)]
    });
  }

  // 📈 Histórico del item
  if (customId.startsWith("history_")) {
    const ctxId = customId.replace("history_", "");
    const entry = state.activeHistory.get(ctxId) ?? state.activeCurrency.get(ctxId);
    const itemName = typeof entry === "string" ? entry : entry?.name;

    if (!itemName) {
      return interaction.reply({ content: "❌ Esta búsqueda ya no está disponible.", ephemeral: true });
    }

    const spark = await getHistorySpark(itemName);

    if (!spark) {
      return interaction.reply({
        content:
          "📈 Todavía no hay histórico registrado para este item (el bot lo registra tras cada sincronización).",
        ephemeral: true
      });
    }

    return interaction.reply({
      embeds: [
        new EmbedBuilder().setColor(0x6366f1).setTitle(`📈 Histórico — ${itemName}`).setDescription(spark)
      ],
      ephemeral: true
    });
  }
}
