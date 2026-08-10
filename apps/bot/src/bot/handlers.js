// Handlers de comandos — funcionan igual con slash commands o prefijo

import {
  createItemEmbed,
  createSumEmbed,
  createTradeEmbed,
  createSimilarEmbed,
  createNotFoundEmbed,
  createWikiEmbed,
  createStatsEmbed,
  createGiveawayEmbed,
  createGiveawayResultEmbed,
  itemEmbedButtons,
  similarEmbedButtons,
  tradeEmbedButtons,
  giveawayButton,
} from "./embeds.js";
import { resolveCurrency } from "../core/currency.js";
import { parseTradeMessage, splitItems } from "../core/parser.js";
import {
  calculateItems,
  compareTrades,
  getItemMainValue,
} from "../core/calculator.js";
import { state } from "./state.js";
import { prisma } from "@aotr/db";
import { compactKey } from "../core/normalize.js";
import {
  getGuildConfig,
  setChannelRole,
  setChannelPrefix,
  setDefaultPrefix,
  channelRoleOf,
} from "../services/prefixService.js";
import { syncAll } from "../services/sync.js";
import { getWikiEntries } from "../data/wiki.js";

const PARSE_DURATION = /^(\d+)(s|m|h|d)$/i;

function parseDuration(durationText) {
  const match = durationText.match(PARSE_DURATION);
  if (!match) return null;

  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();

  if (unit === "s") return amount * 1000;
  if (unit === "m") return amount * 60 * 1000;
  if (unit === "h") return amount * 60 * 60 * 1000;
  if (unit === "d") return amount * 24 * 60 * 60 * 1000;
  return null;
}

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds} segundos`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutos`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} horas`;
  return `${Math.floor(seconds / 86400)} días`;
}

function formatLastUpdate(date) {
  if (!date) return null;
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "hace un momento";
  if (minutes < 60) return `hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours} h`;
  return `hace ${Math.floor(hours / 24)} d`;
}

function isAdmin(ctx) {
  return ctx.member?.permissions?.has("Administrator") ?? false;
}

// Id de contexto SIN guiones bajos (los botones se parsean por "_") — fix A1
function newCtxId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export function resolveItems(inputItems) {
  const found = [];
  const notFound = [];

  for (const input of inputItems) {
    const currencyItem = resolveCurrency(input, state.vizardRate);
    if (currencyItem) {
      found.push(currencyItem);
      continue;
    }

    const item = state.resolveItem(input);
    if (item) found.push(item);
    else notFound.push(input);
  }

  return { found, notFound };
}

function groupItems(items) {
  const map = new Map();
  for (const item of items) {
    if (!map.has(item.name)) map.set(item.name, { item, quantity: 1 });
    else map.get(item.name).quantity++;
  }
  return Array.from(map.values());
}

function groupTextItems(items) {
  const map = new Map();
  for (const item of items) {
    const key = item.toLowerCase().trim();
    if (!map.has(key)) map.set(key, { name: item, quantity: 1 });
    else map.get(key).quantity++;
  }
  return Array.from(map.values());
}

function notFoundText(items) {
  return groupTextItems(items)
    .map(({ name, quantity }) => {
      const suggestions = state.resolveItem.suggest(name, 3);
      const suggestionText = suggestions.length
        ? `\n🔎 Quizás quisiste decir:\n${suggestions
            .map((item) => `   • ${item.name}`)
            .join("\n")}`
        : "";
      return `• ${name}${quantity > 1 ? ` x${quantity}` : ""}${suggestionText}`;
    })
    .join("\n\n");
}

export function findSimilarItems(targetItem, items, limit = 10, percent = 10) {
  const targetValue = Number(targetItem.value.vizards);
  if (!targetValue || targetValue <= 0) return [];

  const min = targetValue * (1 - percent / 100);
  const max = targetValue * (1 + percent / 100);

  const uniqueItems = new Map();
  for (const item of items) {
    if (!uniqueItems.has(item.name)) uniqueItems.set(item.name, item);
  }

  return [...uniqueItems.values()]
    .filter((item) => {
      if (item.name === targetItem.name) return false;
      const value = Number(item.value?.vizards);
      if (!value || value <= 0) return false;
      return value >= min && value <= max;
    })
    .map((item) => {
      const value = Number(item.value.vizards);
      return { item, value, absDifference: Math.abs(value - targetValue) };
    })
    .sort((a, b) => a.absDifference - b.absDifference)
    .slice(0, limit);
}

// ── Histórico sparkline desde la BD ──────────────────────
export async function getHistorySpark(itemName) {
  try {
    if (!state.dbReady) return null;
    const { stableId } = await import("../core/normalize.js");
    const normalized = compactKey(itemName);
    void normalized;
    const rows = await prisma.tradePriceHistory.findMany({
      where: { itemId: stableId(normalized) },
      orderBy: { recordedAt: "asc" },
      take: 30,
      select: { value: true },
    });

    if (rows.length < 2) return null;

    const values = rows.map((r) => r.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const bars = "▁▂▃▄▅▆▇█";

    const spark = values
      .map(
        (v) =>
          bars[Math.max(0, Math.min(7, Math.round(((v - min) / range) * 7)))],
      )
      .join("");

    const change = values[values.length - 1] - values[0];
    const arrow = change > 0 ? "📈" : change < 0 ? "📉" : "➖";
    return `${spark}  ${arrow} ${change >= 0 ? "+" : ""}${change.toFixed(3)} viz (30 días)`;
  } catch {
    return null;
  }
}

// ── Valor ────────────────────────────────────────────────
// El canal decide la lista visible: canal trade → solo API, canal oficial
// → solo hoja, sin canal configurado → ambas. Los botones permiten cambiar.
export async function cmdValor(ctx, input) {
  const item =
    resolveCurrency(input, state.vizardRate) || state.resolveItem(input);

  if (!item) {
    const suggestions = state.resolveItem.suggest(input, 5);
    return ctx.reply({ embeds: [createNotFoundEmbed(input, suggestions)] });
  }

  const apiRow = state.getApiRow(compactKey(item.name));
  const ctxId = newCtxId();
  const visible =
    ctx.channelRole === "trade"
      ? "trade"
      : ctx.channelRole === "official"
        ? "official"
        : "both";

  state.activeCurrency.set(ctxId, { name: item.name, visible });
  state.activeSimilar.set(ctxId, item.name);

  const historySpark = await getHistorySpark(item.name);

  const primary = visible === "trade" ? "trade" : "official";
  const embed = createItemEmbed(item, {
    apiRow,
    keyRatio: state.apiKeyRatio,
    historySpark,
    primary,
    visible,
    lastUpdate: formatLastUpdate(state.lastUpdate),
  });

  return ctx.reply({
    embeds: [embed],
    components: itemEmbedButtons(ctxId, item, apiRow, visible),
  });
}

// ── Suma ─────────────────────────────────────────────────
// En un canal de tradeo suma con precios de la API; en uno oficial (o sin
// configurar) con la hoja oficial.
export async function cmdSuma(ctx, input) {
  const { found: foundItems, notFound } = resolveItems(splitItems(input));

  if (!foundItems.length) {
    return ctx.reply({
      embeds: [
        createNotFoundEmbed(
          notFound.join(" + "),
          state.resolveItem.suggest(notFound[0] ?? "", 5),
        ),
      ],
    });
  }

  let items = foundItems;
  let source = "official";
  if (ctx.channelRole === "trade") {
    source = "trade";
    items = foundItems.map((item) => {
      if (item.isCurrency) return item;
      const apiRow = state.getApiRow(compactKey(item.name));
      if (!apiRow?.value) return item;
      return {
        ...item,
        value: { keys: apiRow.keys, scrolls: apiRow.scrolls, vizards: apiRow.value },
        __source: "api",
      };
    });
  }

  const total = calculateItems(items);
  const notFoundTextValue = notFound.length
    ? `❌ **No encontrados:**\n${notFoundText(notFound)}`
    : "";

  return ctx.reply({
    embeds: [
      createSumEmbed(
        groupItems(items),
        total,
        notFoundTextValue,
        state.apiKeyRatio,
        source,
      ),
    ],
  });
}

// ── Trade ────────────────────────────────────────────────
export async function cmdTrade(ctx, leftText, rightText) {
  const leftResolved = resolveItems(splitItems(leftText));
  const rightResolved = resolveItems(splitItems(rightText));

  const notFound = [...leftResolved.notFound, ...rightResolved.notFound];

  // Resolver con fuente trade (API) si el canal es de tradeo
  const source = ctx.channelRole === "trade" ? "trade" : "official";
  const comparison = buildComparison(leftResolved, rightResolved, source);

  const ctxId = newCtxId();
  state.activeTrades.set(ctxId, { leftText, rightText });

  return ctx.reply({
    embeds: [createTradeEmbed(comparison, notFoundText(notFound), source)],
    components: [tradeEmbedButtons(ctxId)],
  });
}

export function buildComparison(leftResolved, rightResolved, source) {
  if (source === "trade") {
    const withApi = (resolved) =>
      resolved.found.map((item) => {
        if (item.isCurrency) return item;

        const apiRow = state.getApiRow(compactKey(item.name));
        if (!apiRow?.value) return item;

        const value = {
          keys: apiRow.keys,
          scrolls: apiRow.scrolls,
          vizards: apiRow.value,
        };

        return { ...item, value, __source: "api" };
      });

    return compareTrades(withApi(leftResolved), withApi(rightResolved));
  }

  return compareTrades(leftResolved.found, rightResolved.found);
}

// ── Similares ────────────────────────────────────────────
export async function cmdSimilares(ctx, input, percent = 10) {
  const targetItem =
    resolveCurrency(input, state.vizardRate) || state.resolveItem(input);

  if (!targetItem) {
    return ctx.reply({ embeds: [createNotFoundEmbed(input)] });
  }

  const similarItems = findSimilarItems(
    targetItem,
    state.itemsCache,
    10,
    percent,
  );
  const ctxId = newCtxId();
  state.activeSimilar.set(ctxId, targetItem.name);

  return ctx.reply({
    embeds: [createSimilarEmbed(targetItem, similarItems, percent)],
    components: [similarEmbedButtons(ctxId)],
  });
}

// ── Wiki ─────────────────────────────────────────────────
export async function cmdWiki(ctx, query) {
  const entries = Object.values(getWikiEntries());
  const normalizedQuery = String(query).toLowerCase().trim();

  const entry = entries.find((e) => {
    if (!e || !e.name) return false;
    const name = e.name.toLowerCase();
    const aliases = Array.isArray(e.aliases)
      ? e.aliases.map((a) => String(a).toLowerCase())
      : [];
    return (
      name === normalizedQuery ||
      name.includes(normalizedQuery) ||
      aliases.includes(normalizedQuery)
    );
  });

  if (!entry) return ctx.reply({ embeds: [createNotFoundEmbed(query)] });

  return ctx.reply({ embeds: [createWikiEmbed(entry)] });
}

// ── Sorteo ───────────────────────────────────────────────
export async function cmdSorteo(ctx, durationText, prize, winnerCount = 1) {
  if (!isAdmin(ctx)) {
    return ctx.reply("❌ Solo un administrador puede crear sorteos.");
  }

  const durationMs = parseDuration(durationText);

  if (!durationMs || !prize) {
    return ctx.reply(
      "❌ Uso correcto:\n`!sorteo 10m Premio del sorteo`\nEjemplo:\n`!sorteo 1h 1000 llaves AOTR`",
    );
  }

  const endTime = Date.now() + durationMs;
  const giveawayId = newCtxId();

  const giveaway = {
    prize: String(prize).replace(/\s+/g, " ").trim(),
    winnerCount: Math.max(1, winnerCount),
    participants: new Set(),
    endTime,
    durationText: formatDuration(durationMs),
    creator: ctx.author.username,
    channelId: ctx.channel.id,
    ended: false,
  };

  state.giveaways.create(giveawayId, giveaway);

  const message = await ctx.channel.send({
    content: "@everyone 🎉 **¡NUEVO SORTEO ACTIVO!**",
    embeds: [createGiveawayEmbed(giveaway, giveawayId)],
    components: [giveawayButton(giveawayId)],
    allowedMentions: { parse: ["everyone"] },
  });

  giveaway.messageId = message.id;

  setTimeout(async () => {
    const result = state.giveaways.end(giveawayId);
    if (!result) return;

    try {
      if (result.none) {
        await ctx.channel.send(
          "❌ El sorteo terminó, pero no hubo participantes.",
        );
        return;
      }
      await ctx.channel.send({
        embeds: [createGiveawayResultEmbed(giveaway.prize, result.winners)],
      });
    } catch (error) {
      console.error("Error finalizando sorteo:", error);
    }
  }, durationMs);

  return ctx.reply(
    `✅ Sorteo creado: **${giveaway.prize}** (termina ${formatDuration(durationMs)}).`,
  );
}

// ── Participantes ────────────────────────────────────────
export async function cmdParticipantes(ctx) {
  if (!isAdmin(ctx)) return;

  const giveaways = state.giveaways.list();

  if (!giveaways.length) {
    return ctx.reply("❌ No hay sorteos activos guardados en memoria.");
  }

  const giveaway = giveaways[0];
  const ids = [...giveaway.participants];

  return ctx.reply(
    ids.length
      ? `👥 **Participantes guardados:**\n${ids.map((id) => `<@${id}>`).join("\n")}`
      : "❌ Todavía no hay participantes guardados.",
  );
}

// ── Config ───────────────────────────────────────────────
export async function cmdConfig(ctx, sub, args) {
  if (!isAdmin(ctx)) {
    return ctx.reply("❌ Solo administradores pueden usar /config.");
  }

  if (!state.dbReady) {
    return ctx.reply(
      "❌ La base de datos no está configurada (falta DATABASE_URL).",
    );
  }

  if (sub === "canal") {
    const channel = args.channel;
    const role = args.role;

    if (!channel || !role) {
      return ctx.reply("❌ Uso: /config canal <canal> <oficial|trade>");
    }

    await setChannelRole(ctx.guild.id, channel.id, role);
    return ctx.reply(
      `✅ Canal ${channel} configurado como **${role === "official" ? "🟢 Oficial (hoja AOTR)" : "🔵 Precios recomendados"}**.`,
    );
  }

  if (sub === "prefijo") {
    const prefix = args.prefix;
    const channel = args.channel;

    if (!prefix)
      return ctx.reply("❌ Indica un prefijo (ej: `!`, `.`, `aotr!`).");

    if (channel) {
      await setChannelPrefix(ctx.guild.id, channel.id, prefix);
      return ctx.reply(
        `✅ Prefijo \`${prefix}\` asignado al canal ${channel}.`,
      );
    }

    await setDefaultPrefix(ctx.guild.id, prefix);
    return ctx.reply(
      `✅ Prefijo global \`${prefix}\` configurado para este servidor.`,
    );
  }

  if (sub === "ver") {
    const config = await getGuildConfig(ctx.guild.id, { force: true });
    const channels =
      config.channels
        .map(
          (c) =>
            `<#${c.channelId}> → **${c.role === "official" ? "🟢 oficial" : "🔵 trade"}**${c.prefix ? ` (prefijo \`${c.prefix}\`)` : ""}`,
        )
        .join("\n") || "Ninguno configurado";

    return ctx.reply(
      `⚙️ **Configuración de ${ctx.guild.name}**\n\n` +
        `**Prefijo global:** \`${config.defaultPrefix}\`\n\n` +
        `**Canales:**\n${channels}`,
    );
  }

  return ctx.reply("❌ Subcomando inválido.");
}

// ── Sync ─────────────────────────────────────────────────
export async function cmdSync(ctx, which = "all") {
  if (!isAdmin(ctx)) {
    return ctx.reply("❌ Solo administradores pueden sincronizar.");
  }

  await ctx.defer?.();

  const results = await syncAll({
    official: which === "all" || which === "official",
    trade: which === "all" || which === "trade",
  });

  const lines = Object.entries(results)
    .map(([source, r]) => {
      if (r.error) return `❌ **${source}:** ${r.error}`;
      return `✅ **${source}:** ${r.rows} items`;
    })
    .join("\n");

  return ctx.reply(`🔄 **Sincronización completada**\n${lines}`);
}

// ── Stats ────────────────────────────────────────────────
export async function cmdStats(ctx) {
  let counts = null;
  let lastSyncs = [];
  let config = null;

  if (state.dbReady) {
    try {
      const [officialRows, tradeRows, syncLogs] = await Promise.all([
        prisma.officialPrice.findMany({ select: { id: true } }),
        prisma.tradePrice.findMany({ select: { id: true } }),
        prisma.syncLog.findMany({
          orderBy: { startedAt: "desc" },
          take: 5,
          select: { source: true, status: true, rows: true, startedAt: true },
        }),
      ]);
      const officialIds = new Set(officialRows.map((r) => r.id));
      const tradeIds = new Set(tradeRows.map((r) => r.id));
      counts = {
        official: officialIds.size,
        api: tradeIds.size,
        both: [...officialIds].filter((id) => tradeIds.has(id)).length,
      };
      lastSyncs = syncLogs;
      config = await getGuildConfig(ctx.guild.id, { force: true });
    } catch {
      // DB temporalmente caída — seguir con lo que haya
    }
  }

  const uptime = formatDuration(Date.now() - state.startedAt);

  return ctx.reply({
    embeds: [
      createStatsEmbed({
        counts,
        lastSyncs,
        vizardRate: state.vizardRate,
        keyRatio: state.apiKeyRatio,
        uptime,
        config,
      }),
    ],
  });
}

// ── Ayuda ────────────────────────────────────────────────
export async function cmdAyuda(ctx) {
  const prefix = ctx.prefix ?? "!";

  return ctx.reply({
    embeds: [
      {
        color: 0x6366f1,
        title: "🤖 AOTR Values — Ayuda",
        description:
          `Prefijo de este servidor: \`${prefix}\`\n` +
          (ctx.channelRole === "trade"
            ? "Este canal usa **precios de tradeo (API)**.\n"
            : ctx.channelRole === "official"
              ? "Este canal usa **la hoja oficial AOTR**.\n"
              : "") +
          "\n━━━━━━━━━━━━━━\n\n" +
          `**📦 Consultar valor**\n\`${prefix}valor <item>\` o escribe el nombre directo\n\n` +
          `**➕ Sumar items**\n\`${prefix}suma item1 + item2 + item3\`\n\n` +
          `**⚖️ Comparar trade**\n\`${prefix}trade mi item for su item\`\n\n` +
          `**🔍 Similares**\n\`${prefix}similares <item>\`\n\n` +
          `**📚 Wiki**\n\`${prefix}wiki <perk>\`\n\n` +
          `**🎉 Sorteos** (admin)\n\`${prefix}sorteo 10m premio\`\n\n` +
          `**⚙️ Config** (admin)\n\`${prefix}config canal <#canal> <oficial|trade>\`\n\`${prefix}config prefijo <prefijo> [canal]\`\n\n` +
          `**🔄 Sync** (admin)\n\`${prefix}sync all|official|trade\`\n\n` +
          `**📊 Stats**\n\`${prefix}stats\``,
      },
    ],
  });
}
