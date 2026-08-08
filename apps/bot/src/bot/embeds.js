// Constructores de embeds — siempre que existan, muestran AMBAS fuentes:
// 🟢 Oficial (hoja AOTR)  ·  🔵 Trade (API externa)

import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from "discord.js";
import { BRANDING } from "../config/constants.js";

// Formato de Vizard — mismo criterio que la web (apps/web/src/lib/format.ts):
// hasta 2 decimales, compacto para miles/millones y 4 decimales si es < 0.01.
export function formatValue(value) {
  if (value === null || value === undefined || value === 0) return "N/A";

  const formatNumber = (number) => {
    if (Math.abs(number) >= 1_000_000) return `${(number / 1_000_000).toFixed(1)}M`;
    if (Math.abs(number) >= 1_000) return `${(number / 1_000).toFixed(1)}k`;
    if (Math.abs(number) < 1) return number.toFixed(number < 0.01 ? 4 : 2);
    return Number(number.toFixed(2)).toString();
  };

  if (typeof value === "object") {
    return `${formatNumber(value.min)} - ${formatNumber(value.max)}`;
  }

  return formatNumber(value);
}

// Redondeo de llaves/pergaminos a enteros — mismo criterio que la web:
// sube cuando la parte decimal >= 0.45 (5.45 → 6, 6.67 → 7) y se queda
// abajo cuando es menor (5.29 → 5, 5.01 → 5).
export function formatRounded(value) {
  if (value === null || value === undefined || value === 0) return "N/A";

  const round = (n) => (n - Math.floor(n) >= 0.45 ? Math.ceil(n) : Math.floor(n));

  if (typeof value === "object") {
    return `${round(value.min)} - ${round(value.max)}`;
  }

  return round(value);
}

export function formatDemand(demand) {
  const value = parseInt(demand);

  if (isNaN(value)) return `❔ ${demand ?? "UNKNOWN"}`;

  const filled = "⭐".repeat(value);
  const empty = "☆".repeat(10 - value);

  let status = "Baja";
  if (value >= 8) status = "🔥 Muy Alta";
  else if (value >= 5) status = "📈 Alta";
  else if (value >= 3) status = "📊 Media";

  return `${filled}${empty}\n${status} (${value}/10)`;
}

function footer() {
  return { text: `${BRANDING.footer} • ${BRANDING.designer}` };
}

// ── Valor de item (doble fuente) ─────────────────────────
export function createItemEmbed(item, { apiRow = null, keyRatio = null, historySpark = null, primary = "official" } = {}) {
  const isOfficial = Boolean(item.value);
  const isApi = Boolean(apiRow);

  const officialSection = isOfficial
    ? `🔑 **Llaves:** ${formatRounded(item.value.keys)}\n` +
      `📜 **Pergaminos:** ${formatRounded(item.value.scrolls)}\n` +
      `🎭 **Vizard:** ${formatValue(item.value.vizards)}\n` +
      `**Demanda:** ${formatDemand(item.demand)}\n` +
      `**Estado:** ${item.rateOfChange ?? "N/A"}`
    : "`No disponible en la hoja oficial`";

  const apiSection = isApi
    ? `🎭 **Valor (viz):** ${formatValue(apiRow.value)}\n` +
      `🔑 **Llaves:** ${formatRounded(apiRow.keys)}\n` +
      `📜 **Pergaminos:** ${formatRounded(apiRow.scrolls)}\n` +
      `**Demanda:** ${formatDemand(apiRow.demand)}\n` +
      `**Estado:** ${apiRow.rateOfChange ?? "N/A"}\n` +
      (apiRow.status ? `**Disponibilidad:** ${apiRow.status}` : "")
    : "`No disponible en la API de tradeo`";

  const highlight = primary === "trade" ? "🔵" : "🟢";

  const embed = new EmbedBuilder()
    .setColor(primary === "trade" ? BRANDING.colors.trade : BRANDING.colors.official)
    .setTitle(`${highlight} ${item.name}`)
    .setDescription(
      `**Rareza:** ${item.rarity ?? "N/A"}\n` +
        `**Categoría:** ${item.category ?? "N/A"}\n` +
        `**Fuente destacada:** ${primary === "trade" ? "Precios de tradeo (API)" : "Hoja oficial AOTR"}`
    )
    .addFields(
      { name: "🟢 Oficial (hoja AOTR)", value: officialSection, inline: true },
      { name: "🔵 Trade (API)", value: apiSection, inline: true }
    )
    .setFooter(footer());

  if (historySpark) {
    embed.addFields({ name: "📈 Tendencia (30 días)", value: historySpark, inline: false });
  }

  return embed;
}

export function itemEmbedButtons(ctxId, item, apiRow) {
  const row = new ActionRowBuilder();

  if (item.value) {
    row.addComponents(
      new ButtonBuilder().setCustomId(`curr_${ctxId}_keys`).setLabel("Llaves").setEmoji("🔑").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId(`curr_${ctxId}_scrolls`).setLabel("Pergaminos").setEmoji("📜").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId(`curr_${ctxId}_vizards`).setLabel("Vizard").setEmoji("🎭").setStyle(ButtonStyle.Primary)
    );
  }

  row.addComponents(
    new ButtonBuilder().setCustomId(`similar_${ctxId}`).setLabel("Similares ±10%").setEmoji("🔍").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(`history_${ctxId}`).setLabel("Histórico").setEmoji("📈").setStyle(ButtonStyle.Secondary)
  );

  return row;
}

// ── No encontrado ────────────────────────────────────────
export function createNotFoundEmbed(input, suggestions = []) {
  const suggestionText = suggestions.length
    ? suggestions.map((item) => `• ${item.name}`).join("\n")
    : "No encontré sugerencias cercanas.";

  return new EmbedBuilder()
    .setColor(BRANDING.colors.danger)
    .setTitle("❌ Item no encontrado")
    .setDescription(
      `No encontré ningún item llamado:\n\n**${input}**\n\n🔎 **Quizás quisiste decir:**\n${suggestionText}`
    )
    .setFooter(footer());
}

// ── Suma ─────────────────────────────────────────────────
export function createSumEmbed(groupedItems, total, notFoundText = "", keyRatio = null) {
  const itemsText = groupedItems
    .map(({ item, quantity }) => {
      const totalKeys = item.value.keys != null ? item.value.keys * quantity : null;
      const totalScrolls = item.value.scrolls != null ? item.value.scrolls * quantity : null;
      const totalVizards = item.value.vizards != null ? item.value.vizards * quantity : null;

      return (
        `**${item.name} x${quantity}**\n` +
        `🔑 Llaves: ${formatRounded(totalKeys)}\n` +
        `📜 Pergaminos: ${formatRounded(totalScrolls)}\n` +
        `🎭 Vizard: ${formatValue(totalVizards)}\n` +
        `**Demanda:** ${formatDemand(item.demand)}`
      );
    })
    .join("\n\n");

  return new EmbedBuilder()
    .setColor(BRANDING.colors.success)
    .setTitle("📦 Resumen de Items")
    .setDescription(itemsText + (notFoundText ? `\n\n${notFoundText}` : ""))
    .addFields(
      { name: "\u200B", value: "━━━━━━━━━━━━━━", inline: false },
      {
        name: "📊 Totales",
        value:
          `🔑 **Llaves:** ${formatRounded(total.totalKeys)}\n` +
          `📜 **Pergaminos:** ${formatRounded(total.totalScrolls)}\n` +
          `🎭 **Vizard:** ${formatValue(total.totalVizards)}`,
        inline: false
      }
    )
    .setFooter(footer());
}

// ── Similares ────────────────────────────────────────────
export function createSimilarEmbed(targetItem, similarItems, percent = 10) {
  const targetValue = Number(targetItem.value.vizards);
  const description = similarItems.length
    ? similarItems
        .map(
          (result, index) =>
            `**${index + 1}. ${result.item.name}**\n🎭 **${formatValue(result.value)} Vizard**`
        )
        .join("\n\n")
    : `📊 No encontré items dentro del rango de ±${percent}%`;

  return new EmbedBuilder()
    .setColor(BRANDING.colors.purple)
    .setTitle(`🔍 Similares a ${targetItem.name}`)
    .setDescription(
      `🎯 **Valor objetivo:** ${formatValue(targetValue)} Vizard\n` +
        `📊 **Rango:** ±${percent}%\n\n━━━━━━━━━━━━━━\n\n${description}`
    )
    .setFooter({ text: "Búsqueda basada en valores de Hoja oficial AOTR • solo referencias" });
}

export function similarEmbedButtons(ctxId) {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`similar20_${ctxId}`)
      .setLabel("Ampliar al 20%")
      .setEmoji("🔎")
      .setStyle(ButtonStyle.Primary)
  );
}

// ── Comparación de trade ─────────────────────────────────
export function createTradeEmbed(comparison, notFoundText = "", primary = "official") {
  const formatItems = (items) => {
    const map = new Map();
    for (const item of items) {
      if (!map.has(item.name)) map.set(item.name, { item, quantity: 1 });
      else map.get(item.name).quantity++;
    }

    return [...map.values()]
      .map(({ item, quantity }) => {
        const totalKeys = item.value.keys != null ? item.value.keys * quantity : null;
        const totalScrolls = item.value.scrolls != null ? item.value.scrolls * quantity : null;
        const totalVizards = item.value.vizards != null ? item.value.vizards * quantity : null;

        return (
          `**${item.name} x${quantity}**\n` +
          `🔑 Llaves: ${formatValue(totalKeys)}\n` +
          `📜 Pergaminos: ${formatValue(totalScrolls)}\n` +
          `🎭 Vizard: ${formatValue(totalVizards)}\n`
        );
      })
      .join("\n");
  };

  const resultEmoji =
    comparison.result === "W" ? "🟢" : comparison.result === "L" ? "🔴" : "🟡";
  const resultText =
    comparison.result === "W" ? "GANAS" : comparison.result === "L" ? "PIERDES" : "JUSTO";
  const color =
    comparison.result === "W"
      ? BRANDING.colors.success
      : comparison.result === "L"
        ? BRANDING.colors.danger
        : BRANDING.colors.warn;

  return new EmbedBuilder()
    .setColor(color)
    .setTitle("⚖️ Comparación de Trade")
    .setDescription(
      `**Fuente:** ${primary === "trade" ? "🔵 Precios de tradeo (API)" : "🟢 Hoja oficial AOTR"}`
    )
    .addFields(
      { name: "📤 Tu oferta", value: formatItems(comparison.left.items) || "N/A", inline: false },
      {
        name: "📊 Total de tu oferta",
        value:
          `🔑 **Llaves:** ${formatRounded(comparison.left.totalKeys)}\n` +
          `📜 **Pergaminos:** ${formatRounded(comparison.left.totalScrolls)}\n` +
          `🎭 **Vizard:** ${formatValue(comparison.left.totalVizards)}`,
        inline: false
      },
      { name: "\u200B", value: "━━━━━━━━━━━━━━", inline: false },
      { name: "📥 Su oferta", value: formatItems(comparison.right.items) || "N/A", inline: false },
      {
        name: "📊 Total de su oferta",
        value:
          `🔑 **Llaves:** ${formatRounded(comparison.right.totalKeys)}\n` +
          `📜 **Pergaminos:** ${formatRounded(comparison.right.totalScrolls)}\n` +
          `🎭 **Vizard:** ${formatValue(comparison.right.totalVizards)}`,
        inline: false
      },
      { name: "\u200B", value: "━━━━━━━━━━━━━━", inline: false },
      {
        name: `${resultEmoji} Resultado`,
        value:
          `**${resultText}**\n\n` +
          `🔑 Llaves: **${comparison.keysDifference >= 0 ? "+" : ""}${formatRounded(comparison.keysDifference)}**\n` +
          `📜 Pergaminos: **${comparison.scrollsDifference >= 0 ? "+" : ""}${formatRounded(comparison.scrollsDifference)}**\n` +
          `🎭 Vizard: **${comparison.vizardsDifference >= 0 ? "+" : ""}${formatValue(comparison.vizardsDifference)}**\n\n` +
          `📈 Porcentaje: **${comparison.percentage.toFixed(2)}%**` +
          (notFoundText ? `\n\n${notFoundText}` : ""),
        inline: false
      }
    )
    .setFooter(footer());
}

export function tradeEmbedButtons(ctxId) {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`trade_src_${ctxId}_official`)
      .setLabel("Oficial")
      .setEmoji("🟢")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId(`trade_src_${ctxId}_trade`)
      .setLabel("Tradeo")
      .setEmoji("🔵")
      .setStyle(ButtonStyle.Primary)
  );
}

// ── Wiki ─────────────────────────────────────────────────
export function createWikiEmbed(entry) {
  const slot = entry.slot || "Body";
  const rarity = entry.rarity || "Unknown";
  const effects =
    Array.isArray(entry.effects) && entry.effects.length
      ? entry.effects.map((effect) => `• ${effect}`).join("\n")
      : "No hay información disponible.";

  return new EmbedBuilder()
    .setColor(BRANDING.colors.wiki)
    .setTitle(`📚 ${entry.name || "Wiki"}`)
    .addFields(
      { name: "🎯 Tipo", value: String(slot), inline: true },
      { name: "⭐ Rareza", value: String(rarity), inline: true }
    )
    .setDescription(effects)
    .setFooter({ text: "AOTR Wiki • Creado por Melevengo" });
}

// ── Sorteo ───────────────────────────────────────────────
export function createGiveawayEmbed(giveaway, giveawayId) {
  return new EmbedBuilder()
    .setColor(BRANDING.colors.gold)
    .setTitle("🎉┃SORTEO ACTIVO")
    .setDescription(
      `🎁 **Premio**\n**${giveaway.prize}**\n\n` +
        `━━━━━━━━━━━━━━\n\n` +
        `⏱️ **Duración:** ${giveaway.durationText}\n` +
        `🏁 **Finaliza:** <t:${Math.floor(giveaway.endTime / 1000)}:R>\n\n` +
        `🎊 **¿Cómo participar?**\nPresiona el botón **Participar**.\n\n🍀 ¡Mucha suerte a todos!`
    )
    .addFields(
      { name: "👥 Participantes", value: `${giveaway.participants.size}`, inline: true },
      { name: "🏆 Ganadores", value: String(giveaway.winnerCount), inline: true }
    )
    .setFooter({ text: `Creado por ${giveaway.creator}` })
    .setTimestamp();
}

export function createGiveawayResultEmbed(prize, winners) {
  return new EmbedBuilder()
    .setColor(BRANDING.colors.success)
    .setTitle("🏆┃SORTEO FINALIZADO")
    .setDescription(
      `🎁 **Premio**\n${prize}\n\n` +
        `━━━━━━━━━━━━━━\n\n` +
        `🏆 **Ganadores**\n${winners.map((id) => `<@${id}>`).join("\n")}\n\n🎉 ¡Felicidades!`
    );
}

export function giveawayButton(giveawayId) {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`giveaway_join_${giveawayId}`)
      .setLabel("Participar")
      .setEmoji("🎉")
      .setStyle(ButtonStyle.Success)
  );
}

// ── Stats ────────────────────────────────────────────────
export function createStatsEmbed({ counts, lastSyncs, vizardRate, keyRatio, uptime, config }) {
  const embed = new EmbedBuilder()
    .setColor(BRANDING.colors.info)
    .setTitle("📊 Estadísticas del Bot")
    .setDescription(
      `🟢 **Items oficiales (hoja AOTR):** ${counts.official ?? "—"}\n` +
        `🔵 **Items de tradeo (API):** ${counts.api ?? "—"}\n` +
        `🤝 **Items en ambas fuentes:** ${counts.both ?? "—"}\n\n` +
        `🎭 **Ratio Vizard (oficial):** ${vizardRate ? `1 viz = ${vizardRate.keysPerVizard} llaves` : "—"}\n` +
        `🔑 **Ratio API (1 llave = ${keyRatio ?? "?"} viz):** ${keyRatio ? `1 viz = ${(1 / keyRatio).toFixed(0)} llaves` : "—"}\n\n` +
        (config
          ? `⚙️ **Prefijo global:** \`${config.defaultPrefix}\`\n` +
            `🟢 **Canal oficial:** ${config.officialChannelId ? `<#${config.officialChannelId}>` : "no configurado"}\n` +
            `🔵 **Canal trade:** ${config.tradeChannelId ? `<#${config.tradeChannelId}>` : "no configurado"}`
          : "⚙️ Base de datos no configurada (prefijo global: `!`)")
    );

  const lines = lastSyncs
    .slice(0, 4)
    .map(
      (s) =>
        `${s.status === "ok" ? "✅" : "❌"} **${s.source}** · ${s.rows ?? 0} filas · <t:${Math.floor(new Date(s.startedAt).getTime() / 1000)}:R>`
    )
    .join("\n");

  embed.addFields({
    name: "🔄 Últimas sincronizaciones",
    value: lines || "Aún no hay registros",
    inline: false
  });

  embed.setFooter({ text: `Bot activo desde hace ${uptime}` });
  return embed;
}
