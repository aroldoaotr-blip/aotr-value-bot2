// Conexión de eventos del cliente Discord

import { loadItems } from "../data/sheetLoader.js";
import { findVizardRate, applyVizardConversion, loadConfiguredRates } from "../core/rates.js";
import { createItemResolver } from "../core/resolver.js";
import { parseTradeMessage, splitItems } from "../core/parser.js";
import { state } from "./state.js";
import { registerCommands } from "./commands.js";
import { handleAutocomplete, handleButton } from "./buttons.js";
import { cmdValor, cmdSuma, cmdTrade, cmdSimilares, cmdWiki, cmdSorteo, cmdParticipantes, cmdConfig, cmdSync, cmdStats, cmdAyuda } from "./handlers.js";
import { syncOfficial, syncTrade, cleanupHistory } from "../services/sync.js";
import { prisma } from "@aotr/db";
import { DEFAULTS } from "../config/constants.js";
import {
  getGuildConfig,
  prefixFromConfig,
  channelRoleOf
} from "../services/prefixService.js";

const WIKI_CHANNEL_ID = process.env.WIKI_CHANNEL_ID ?? null;
const WELCOME_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID ?? null;
const AUTO_ROLE_ID = process.env.AUTO_ROLE_ID ?? null;
const MEMBER_COUNT_CHANNEL_ID = process.env.MEMBER_COUNT_CHANNEL_ID ?? null;

const PREFIX_COMMANDS = {
  valor: cmdValor,
  v: cmdValor,
  suma: cmdSuma,
  s: cmdSuma,
  trade: cmdTrade,
  t: cmdTrade,
  comparar: cmdTrade,
  similares: cmdSimilares,
  similar: cmdSimilares,
  sim: cmdSimilares,
  wiki: cmdWiki,
  w: cmdWiki,
  sorteo: cmdSorteo,
  participantes: cmdParticipantes,
  config: cmdConfig,
  sync: cmdSync,
  stats: cmdStats,
  ayuda: cmdAyuda,
  help: cmdAyuda,
  h: cmdAyuda
};

// ── Cache de datos en memoria ────────────────────────────
async function refreshOfficialCache() {
  // 1) Persistir la hoja oficial en la BD (la web la lee desde ahí)
  await syncOfficial();

  // 2) Cache en memoria para los comandos del bot
  const items = await loadItems();
  // Tasas configuradas por admin (web /administrador) con fallback a detección
  const configured = await loadConfiguredRates();
  const vizardRate = findVizardRate(items, configured);
  const converted = applyVizardConversion(items, vizardRate);

  state.setItems(converted, vizardRate);
  state.resolveItem = createItemResolver(converted);

  if (vizardRate) {
    const source = configured ? "configurado por admin" : "detectado de la hoja";
    console.log(
      `🎭 Ratio Vizard (${source}): 1 viz = ${vizardRate.keysPerVizard} llaves · ` +
        `1 pergamino = ${vizardRate.keysPerScroll ?? 3} llaves`
    );
  }
  console.log(`🟢 Cache oficial: ${converted.length} items`);
}

async function refreshTradeCache() {
  const result = await syncTrade();
  const { data } = result;

  const rows = data.map((row) => ({
    ...row,
    normalized: typeof row.normalized === "string" ? row.normalized : row.name
  }));

  // Tasas del admin para normalizar la API (viz → llaves/pergaminos)
  const configured = await loadConfiguredRates();
  const rates = configured ?? { keysPerVizard: 900.9, keysPerScroll: 3 };

  const { upsertApiRows } = await import("./state.js");
  upsertApiRows(rows, rates);
  console.log(`🔵 Cache trade: ${rows.length} items (1 viz = ${rates.keysPerVizard} llaves)`);
}

const LEGACY_VALUES_CHANNEL_ID = process.env.LEGACY_VALUES_CHANNEL_ID ?? null;

// ── Config de canal desde la BD (con fallback) ───────────
async function getChannelContext(guildId, channelId) {
  try {
    if (!state.dbReady) return { prefix: DEFAULTS.prefix, role: null };

    const config = await getGuildConfig(guildId);
    return { prefix: prefixFromConfig(config, channelId), role: channelRoleOf(config, channelId) };
  } catch {
    return { prefix: DEFAULTS.prefix, role: null };
  }
}

async function updateMemberCount(client, guild) {
  if (!MEMBER_COUNT_CHANNEL_ID) return;
  try {
    const channel = guild.channels.cache.get(MEMBER_COUNT_CHANNEL_ID);
    if (!channel) return;
    await channel.setName(`👥・Miembros: ${guild.memberCount}`);
  } catch (error) {
    console.error("Error actualizando contador de miembros:", error.message);
  }
}

export function registerEvents(client) {
  // ── Listo ──────────────────────────────────────────────
  client.once("clientReady", async () => {
    console.log(`✅ Bot conectado como ${client.user.tag}`);

    // Verificar BD
    try {
      await prisma.$queryRaw`SELECT 1`;
      state.dbReady = true;
      console.log("🗄️  Base de datos conectada");
    } catch (error) {
      state.dbReady = false;
      console.warn("⚠️  Base de datos no disponible:", error.message);
      console.warn("   El bot funcionará en modo básico (sin config persistente ni histórico).");
    }

    // Cargar cache oficial (hoja)
    try {
      await refreshOfficialCache();
    } catch (error) {
      console.error("❌ Error cargando hoja oficial:", error.message);
    }

    // Sincronizar trade en el arranque (si está habilitado)
    if (process.env.SYNC_ON_BOOT !== "false") {
      try {
        await refreshTradeCache();
      } catch (error) {
        console.error("❌ Error sincronizando trade al arranque:", error.message);
      }
    }

    await registerCommands(client);

    for (const guild of client.guilds.cache.values()) {
      await updateMemberCount(client, guild);
    }

    // Sincronizaciones programadas
    // Ambos orígenes se sincronizan cada 30 minutos (por defecto)
    const officialMs = (Number(process.env.SYNC_OFFICIAL_MINUTES) || DEFAULTS.syncOfficialMinutes) * 60 * 1000;
    const tradeMs = (Number(process.env.SYNC_TRADE_MINUTES) || DEFAULTS.syncTradeMinutes) * 60 * 1000;

    setInterval(() => refreshOfficialCache().catch(console.error), officialMs);
    setInterval(() => refreshTradeCache().catch(console.error), tradeMs);
    setInterval(() => cleanupHistory().catch(console.error), 24 * 60 * 60 * 1000);

    console.log(`🔄 Sync oficial cada ${officialMs / 60000} min · Sync trade cada ${tradeMs / 60000} min`);
    console.log("🎉 Bot listo.");
  });

  // ── Mensajes ───────────────────────────────────────────
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const { prefix, role } = await getChannelContext(message.guild?.id, message.channel.id);

    // Canal de wiki dedicado (env)
    if (WIKI_CHANNEL_ID && message.channel.id === WIKI_CHANNEL_ID) {
      return cmdWiki(messageCtx(message, prefix, null), message.content.trim());
    }

    const isCommand = message.content.startsWith(prefix);

    // Comandos con prefijo
    if (isCommand) {
      const args = message.content.slice(prefix.length).trim();
      const [command, ...rest] = args.split(/\s+/);
      const cmd = command?.toLowerCase();
      const handler = PREFIX_COMMANDS[cmd];

      if (handler) {
        try {
          const ctx = messageCtx(message, prefix, role);

          if (cmd === "valor" || cmd === "v") return await cmdValor(ctx, rest.join(" "));
          if (cmd === "suma" || cmd === "s") return await cmdSuma(ctx, rest.join(" "));
          if (cmd === "trade" || cmd === "t" || cmd === "comparar") {
            const [left, right] = parseTradeArgs(rest);
            return await cmdTrade(ctx, left, right);
          }
          if (cmd === "similares" || cmd === "similar" || cmd === "sim") {
            const [q, pct] = parseSimilarArgs(rest);
            return await cmdSimilares(ctx, q, pct);
          }
          if (cmd === "wiki" || cmd === "w") return await cmdWiki(ctx, rest.join(" "));
          if (cmd === "sorteo") {
            const [duration, ...prizeParts] = rest;
            return await cmdSorteo(ctx, duration ?? "", prizeParts.join(" "), 1);
          }
          if (cmd === "participantes") return await cmdParticipantes(ctx);
          if (cmd === "config") {
            return await cmdConfig(ctx, rest[0] ?? "ver", parseConfigArgs(rest.slice(1)));
          }
          if (cmd === "sync") return await cmdSync(ctx, rest[0] ?? "all");
          if (cmd === "stats") return await cmdStats(ctx);
          if (cmd === "ayuda" || cmd === "help" || cmd === "h") return await cmdAyuda(ctx);
        } catch (error) {
          console.error(`Error en comando ${cmd}:`, error);
          await message.reply("❌ Ocurrió un error procesando el comando.");
        }
      }
      return;
    }

    // Modo "canal mágico": responder mensajes sueltos solo en canales de precios.
    // Con BD: canales configurados vía /config. Sin BD: canal legacy (env) o todos.
    const magicChannel =
      role !== null ||
      (LEGACY_VALUES_CHANNEL_ID
        ? message.channel.id === LEGACY_VALUES_CHANNEL_ID
        : !state.dbReady) ||
      !(await hasConfiguredChannels(message.guild?.id));

    if (!magicChannel) return;

    const parsed = parseTradeMessage(message.content);

    try {
      if (parsed.type === "single") {
        return await cmdValor(messageCtx(message, prefix, role), parsed.item);
      }
      if (parsed.type === "sum") {
        return await cmdSuma(messageCtx(message, prefix, role), parsed.items.join(" + "));
      }
      if (parsed.type === "compare") {
        return await cmdTrade(messageCtx(message, prefix, role), parsed.left.join(" + "), parsed.right.join(" + "));
      }
    } catch (error) {
      console.error("Error procesando mensaje:", error);
    }
  });

  // ── Interacciones ──────────────────────────────────────
  client.on("interactionCreate", async (interaction) => {
    if (interaction.isAutocomplete()) {
      return handleAutocomplete(interaction).catch((e) =>
        console.error("Error en autocompletado:", e)
      );
    }

    if (interaction.isButton()) {
      return handleButton(interaction).catch((e) =>
        console.error("Error en botón:", e)
      );
    }

    if (!interaction.isChatInputCommand()) return;

    const { prefix, role } = await getChannelContext(
      interaction.guild?.id,
      interaction.channel?.id
    );

    const ctx = interactionCtx(interaction, prefix, role);
    const name = interaction.commandName;

    try {
      if (name === "valor") return await cmdValor(ctx, interaction.options.getString("item", true));
      if (name === "suma") return await cmdSuma(ctx, interaction.options.getString("items", true));
      if (name === "trade") {
        return await cmdTrade(
          ctx,
          interaction.options.getString("oferta", true),
          interaction.options.getString("peticion", true)
        );
      }
      if (name === "similares") {
        return await cmdSimilares(
          ctx,
          interaction.options.getString("item", true),
          interaction.options.getInteger("porcentaje") ?? 10
        );
      }
      if (name === "wiki") return await cmdWiki(ctx, interaction.options.getString("perk", true));
      if (name === "sorteo") {
        return await cmdSorteo(
          ctx,
          interaction.options.getString("duracion", true),
          interaction.options.getString("premio", true),
          interaction.options.getInteger("ganadores") ?? 1
        );
      }
      if (name === "participantes") return await cmdParticipantes(ctx);
      if (name === "config") {
        const sub = interaction.options.getSubcommand();
        const args = {
          channel: interaction.options.getChannel("canal"),
          role: interaction.options.getString("rol"),
          prefix: interaction.options.getString("prefijo")
        };
        return await cmdConfig(ctx, sub, args);
      }
      if (name === "sync") {
        return await cmdSync(ctx, interaction.options.getString("fuente") ?? "all");
      }
      if (name === "stats") return await cmdStats(ctx);
      if (name === "ayuda") return await cmdAyuda(ctx);
    } catch (error) {
      console.error(`Error en /${name}:`, error);
      await ctx.reply({ content: "❌ Ocurrió un error procesando el comando.", ephemeral: true });
    }
  });

  // ── Miembros ───────────────────────────────────────────
  client.on("guildMemberAdd", async (member) => {
    try {
      const role = AUTO_ROLE_ID && member.guild.roles.cache.get(AUTO_ROLE_ID);
      if (role) await member.roles.add(role);

      const welcomeChannel = WELCOME_CHANNEL_ID && member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
      if (welcomeChannel) {
        const { EmbedBuilder } = await import("discord.js");
        const embed = new EmbedBuilder()
          .setColor(0x2ecc71)
          .setTitle("🎉 ¡Nuevo miembro!")
          .setDescription(
            `Bienvenido/a ${member} a **${member.guild.name}**.\n\n` +
              `📌 No molestes y disfruta de la comunidad.\n` +
              `🔍 Usa el bot para consultar valores, wiki y sorteos.`
          )
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
          .setFooter({ text: `Ahora somos ${member.guild.memberCount} miembros` })
          .setTimestamp();

        await welcomeChannel.send({ embeds: [embed] });
      }

      await updateMemberCount(client, member.guild);
    } catch (error) {
      console.error("Error en guildMemberAdd:", error.message);
    }
  });

  client.on("guildMemberRemove", async (member) => {
    await updateMemberCount(client, member.guild);
  });
}

// ── Contextos unificados ─────────────────────────────────
function messageCtx(message, prefix, role) {
  return {
    kind: "message",
    author: message.author,
    guild: message.guild,
    channel: message.channel,
    member: message.member,
    prefix,
    channelRole: role,
    reply: (payload) => message.reply(payload)
  };
}

function interactionCtx(interaction, prefix, role) {
  return {
    kind: "interaction",
    author: interaction.user,
    guild: interaction.guild,
    channel: interaction.channel,
    member: interaction.member,
    prefix,
    channelRole: role,
    defer: async () => {
      if (!interaction.deferred && !interaction.replied) await interaction.deferReply();
    },
    reply: (payload) =>
      interaction.deferred || interaction.replied
        ? interaction.editReply(payload)
        : interaction.reply(payload)
  };
}

function parseTradeArgs(rest) {
  const text = rest.join(" ");
  const match = text.match(/^(.+?)\s+(?:for|por)\s+(.+)$/i);
  return match ? [match[1].trim(), match[2].trim()] : [text, ""];
}

function parseSimilarArgs(rest) {
  const text = rest.join(" ");
  const match = text.match(/^(.+?)\s+(\d{1,2})%?$/i);
  return match ? [match[1].trim(), Number(match[2])] : [text, 10];
}

function parseConfigArgs(args) {
  const joined = args.join(" ");

  const channelMatch = joined.match(/<#(\d+)>\s*(\w+)/i);
  if (channelMatch) {
    return { channel: { id: channelMatch[1] }, role: channelMatch[2] };
  }

  const prefixMatch = joined.match(/^([^<#]+)$/);
  if (prefixMatch) {
    return { prefix: prefixMatch[1].trim() };
  }

  return {};
}

async function hasConfiguredChannels(guildId) {
  if (!guildId || !state.dbReady) return false;
  try {
    const config = await getGuildConfig(guildId);
    return config.channels.length > 0;
  } catch {
    return false;
  }
}
