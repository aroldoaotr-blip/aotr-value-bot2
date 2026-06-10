import {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    Partials,
    PermissionsBitField,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from "discord.js";import { parseValue } from './utils/parseValue.js';
import { loadItems } from "./data/sheetLoader.js";
import { createItemResolver } from "./parser/itemResolver.js";
import { parseTradeMessage } from "./parser/tradeParser.js";
import { calculateItems, compareTrades } from "./services/calculator.js";
import dotenv from 'dotenv';
import { resolveCurrency } from "./parser/currencyResolver.js";
import { findVizardRate } from "./services/currencyRates.js";
import fs from "fs";


dotenv.config();

const perksWiki = JSON.parse(
    fs.readFileSync("./src/wiki/wiki.json", "utf8")
);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction
    ]
});

const activeGiveaways = new Map();
let resolveItem = null;
let itemsCache = [];
let lastUpdate = null;
let vizardRate = null;


const activeSimilarSearches = new Map();


const GIVEAWAY_CHANNEL_ID = "1512586769760124928";
const VALUES_CHANNEL_ID = "1510408304046768248";
const WIKI_CHANNEL_ID = "1513808128674627616";

const WELCOME_CHANNEL_ID = "1510406708541788251";
const AUTO_ROLE_ID = "1511093689378672670";
const MEMBER_COUNT_CHANNEL_ID = "1514128931169501305";



function resolveItems(inputItems) {
    const found = [];
    const notFound = [];

    for (const input of inputItems) {
        const currencyItem = resolveCurrency(input, vizardRate);

        if (currencyItem) {
            found.push(currencyItem);
            continue;
        }

        const item = resolveItem(input);

        if (item) {
            found.push(item);
        } else {
            notFound.push(input);
        }
    }

    return {
        found,
        notFound
    };
}

async function refreshItems() {
    try {
        console.log("Actualizando items...");

itemsCache = await loadItems();

vizardRate = findVizardRate(itemsCache);

itemsCache = applyVizardConversion(itemsCache, vizardRate);

resolveItem = createItemResolver(itemsCache);

function applyVizardConversion(items, vizardRate) {
    if (!vizardRate) return items;

    return items.map(item => {
        const value = { ...item.value };

        if ((value.keys === null || value.keys === undefined) && value.scrolls != null) {
            value.keys = value.scrolls * 3;
        }

        if ((value.scrolls === null || value.scrolls === undefined) && value.keys != null) {
            value.scrolls = value.keys / 3;
        }

        if ((value.vizards === null || value.vizards === undefined) && value.keys != null) {
            value.vizards = value.keys / vizardRate.keysPerVizard;
        }

        return {
            ...item,
            value
        };
    });
}

if (vizardRate) {
    console.log(`Vizard detectado: 1 Vizard = ${vizardRate.keysPerVizard} llaves`);
}

resolveItem = createItemResolver(itemsCache);
lastUpdate = new Date();

        console.log(`Items actualizados: ${itemsCache.length}`);
         console.log(`El bot esta encendido correctamente.`);
    } catch (error) {
        console.error("Error actualizando items:", error);
    }
}


function formatValue(value) {
    if (value === null || value === undefined || value === 0) return "N/A";

    const formatNumber = (number) => {
        return Number(number).toLocaleString("en-US", {
            maximumFractionDigits: 2
        });
    };

    if (typeof value === "object") {
        return `${formatNumber(value.min)} - ${formatNumber(value.max)}`;
    }

    return formatNumber(value);
}

function formatDemand(demand) {
    const value = parseInt(demand);

    if (isNaN(value)) {
        return `❔ ${demand ?? "UNKNOWN"}`;
    }

    const filled = "⭐".repeat(value);
    const empty = "☆".repeat(10 - value);

    let status = "Baja";

    if (value >= 8) status = "🔥 Muy Alta";
    else if (value >= 5) status = "📈 Alta";
    else if (value >= 3) status = "📊 Media";

    return `${filled}${empty}\n${status} (${value}/10)`;
}

function createNotFoundEmbed(input) {
    const suggestions = resolveItem.suggest(input, 5);

    
    const suggestionText = suggestions.length
        ? suggestions.map(item => `• ${item.name}`).join("\n")
        : "No encontré sugerencias cercanas.";

    return new EmbedBuilder()
        .setColor(0xe74c3c)
        .setTitle("❌ Item no encontrado")
        .setDescription(
            `No encontré ningún item llamado:\n\n` +
            `**${input}**\n\n` +
            `🔎 **Quizás quisiste decir:**\n` +
            suggestionText
        );
}

function createItemEmbed(item) {
    return new EmbedBuilder()
        .setColor(0x2f81f7)
        .setTitle(`❓ ${item.name}`)
        .setDescription(
            `**Rareza:** ${item.rarity ?? "N/A"}\n` +
            `**Demanda:** ${formatDemand(item.demand)}\n` +
            `**Estado:** ${item.rateOfChange ?? "N/A"}\n` +
            `**Categoría:** ${item.category ?? "N/A"}`
        )
        .addFields(
            {
                name: "💰 Valores",
                value:
                    `🔑 **Llaves:** ${formatValue(item.value.keys)}\n` +
                    `📜 **Pergaminos:** ${formatValue(item.value.scrolls)}\n` +
                    `🎭 **Vizard:** ${formatValue(item.value.vizards)}`,
                inline: false
            },
            {
                name: "🧾 Tax",
                value:
                    `💎 **Gemas:** ${formatValue(item.taxGems)}\n` +
                    `🪙 **Oro:** ${formatValue(item.taxGold)}`,
                inline: false
            }
        )
        .setFooter({
            text: `Valores tomados de la hoja oficial AOTR\n` +
                        `Diseñado por melevengo`
        });
}

function findSimilarItems(targetItem, items, limit = 10, percent = 10) {
    const targetValue = Number(targetItem.value.vizards);

    if (!targetValue || targetValue <= 0) return [];

    const min = targetValue * (1 - percent / 100);
    const max = targetValue * (1 + percent / 100);

    const uniqueItems = new Map();

    for (const item of items) {
        if (!uniqueItems.has(item.name)) {
            uniqueItems.set(item.name, item);
        }
    }

    return [...uniqueItems.values()]
        .filter(item => {
            if (item.name === targetItem.name) return false;

            const value = Number(item.value?.vizards);

            if (!value || value <= 0) return false;

            return value >= min && value <= max;
        })
        .map(item => {
            const value = Number(item.value.vizards);
            const difference = value - targetValue;

            return {
                item,
                value,
                difference,
                absDifference: Math.abs(difference)
            };
        })
        .sort((a, b) => a.absDifference - b.absDifference)
        .slice(0, limit);
}

function groupItems(items) {
    const map = new Map();

    for (const item of items) {
        if (!map.has(item.name)) {
            map.set(item.name, {
                item,
                quantity: 1
            });
        } else {
            map.get(item.name).quantity++;
        }
    }

    return Array.from(map.values());
}

function groupTextItems(items) {
    const map = new Map();

    for (const item of items) {
        const key = item.toLowerCase().trim();

        if (!map.has(key)) {
            map.set(key, {
                name: item,
                quantity: 1
            });
        } else {
            map.get(key).quantity++;
        }
    }

    return Array.from(map.values());
}

function findWikiEntry(query) {
    const normalizedQuery = String(query).toLowerCase().trim();

    for (const entry of Object.values(perksWiki)) {
        if (!entry || !entry.name) continue;

        const name = entry.name.toLowerCase();

        const aliases = Array.isArray(entry.aliases)
            ? entry.aliases.map(alias => String(alias).toLowerCase())
            : [];

        if (
            name === normalizedQuery ||
            name.includes(normalizedQuery) ||
            aliases.includes(normalizedQuery)
        ) {
            return entry;
        }
    }

    return null;
}

function createWikiEmbed(entry) {
    const slot = entry.slot || "Body";
    const rarity = entry.rarity || "Unknown";

    const effects =
        Array.isArray(entry.effects) && entry.effects.length
            ? entry.effects.map(effect => `• ${effect}`).join("\n")
            : "No hay información disponible.";

    return new EmbedBuilder()
        .setColor(0x3498db)
        .setTitle(`📚 ${entry.name || "Wiki"}`)
        .addFields(
            {
                name: "🎯 Tipo",
                value: String(slot),
                inline: true
            },
            {
                name: "⭐ Rareza",
                value: String(rarity),
                inline: true
            }
        )
        .setDescription(effects)
        .setFooter({
            text: "AOTR Wiki • Creado por Melevengo"
        });
}

function createSumEmbed(foundItems, total, notFound = []) {
const groupedItems = groupItems(foundItems);

const itemsText = groupedItems.map(({ item, quantity }) => {

    const totalKeys =
        item.value.keys != null
            ? item.value.keys * quantity
            : null;

    const totalScrolls =
        item.value.scrolls != null
            ? item.value.scrolls * quantity
            : null;

    const totalVizards =
        item.value.vizards != null
            ? item.value.vizards * quantity
            : null;

    return (
        `**${item.name} x${quantity}**\n` +
        `🔑 Llaves: ${formatValue(totalKeys)}\n` +
        `📜 Pergaminos: ${formatValue(totalScrolls)}\n` +
        `🎭 Vizard: ${formatValue(totalVizards)}\n` +
        `**Demanda:** ${formatDemand(item.demand)}`
    );
}).join("\n\n");

const groupedNotFound = groupTextItems(notFound);

const notFoundText = groupedNotFound.length
    ? `\n\n❌ **Items no encontrados:**\n${groupedNotFound
        .map(({ name, quantity }) => `• ${name}${quantity > 1 ? ` x${quantity}` : ""}`)
        .join("\n")}`
    : "";

    return new EmbedBuilder()
        .setColor(0x2ecc71)
        .setTitle("📦 Resumen de Items")
        .setDescription(itemsText + notFoundText)
        .addFields(
    {
        name: "\u200B",
        value: "━━━━━━━━━━━━━━",
        inline: false
    },
    {
        name: "📊 Totales",
        value:
            `🔑 **Llaves:** ${formatValue(total.totalKeys)}\n` +
            `📜 **Pergaminos:** ${formatValue(total.totalScrolls)}\n` +
            `🎭 **Vizard:** ${formatValue(total.totalVizards)}`,
        inline: false
    }
)
        .setFooter({
            text: `Valores tomados de la hoja oficial\n` +
                        `Diseñado por melevengo`
        });
}

function createSimilarItemsEmbed(targetItem, similarItems, percent = 10) {
    const targetValue = Number(targetItem.value.vizards);

const description = similarItems.length
    ? similarItems.map((result, index) => {
        return (
            `**${index + 1}. ${result.item.name}**\n` +
            `🎭 **${formatValue(result.value)} Vizard**`
        );
    }).join("\n\n")
        : `📊 No encontré items dentro del rango de ±${percent}%`;

    return new EmbedBuilder()
        .setColor(0x9b59b6)
        .setTitle(`🔍 Similares a ${targetItem.name}`)
        .setDescription(
            `🎯 **Valor objetivo:** ${formatValue(targetValue)} Vizard\n` +
           `📊 **Rango:** ±${percent}%\n\n` +
            `━━━━━━━━━━━━━━\n\n` +
            description
        )
        .setFooter({
            text: "Búsqueda basada en valores de Hoja oficial AOTR solo para referencias"
        });
}

function createTradeEmbed(comparison, notFound = []) {
const formatItems = (items) => {
    const groupedItems = groupItems(items);

    return groupedItems.map(({ item, quantity }) => {
        const totalKeys =
            item.value.keys != null
                ? item.value.keys * quantity
                : null;

        const totalScrolls =
            item.value.scrolls != null
                ? item.value.scrolls * quantity
                : null;

        const totalVizards =
            item.value.vizards != null
                ? item.value.vizards * quantity
                : null;

        return (
            `**${item.name} x${quantity}**\n` +
            `🔑 Llaves: ${formatValue(totalKeys)}\n` +
            `📜 Pergaminos: ${formatValue(totalScrolls)}\n` +
            `🎭 Vizard: ${formatValue(totalVizards)}\n`
        );
    }).join("\n");
};

    const resultEmoji =
        comparison.result === "W" ? "🟢" :
        comparison.result === "L" ? "🔴" :
        "🟡";

    const resultText =
        comparison.result === "W" ? "GANAS" :
        comparison.result === "L" ? "PIERDES" :
        "JUSTO";

    const color =
        comparison.result === "W" ? 0x2ecc71 :
        comparison.result === "L" ? 0xe74c3c :
        0xf1c40f;

 const groupedNotFound = groupTextItems(notFound);

const notFoundText = groupedNotFound.length
    ? `\n\n❌ **Items no encontrados:**\n${groupedNotFound
        .map(({ name, quantity }) => `• ${name}${quantity > 1 ? ` x${quantity}` : ""}`)
        .join("\n")}`
    : "";

    return new EmbedBuilder()
        .setColor(color)
        .setTitle("⚖️ Comparación de Trade")
        .addFields(
            {
                name: "📤 Tu oferta",
                value: formatItems(comparison.left.items) || "N/A",
                inline: false
            },
            {
                name: "📊 Total de tu oferta",
                value:
                    `🔑 **Llaves:** ${formatValue(comparison.left.totalKeys)}\n` +
                    `📜 **Pergaminos:** ${formatValue(comparison.left.totalScrolls)}\n` +
                    `🎭 **Vizard:** ${formatValue(comparison.left.totalVizards)}`,
                inline: false
            },
            {
                name: "\u200B",
                value: "━━━━━━━━━━━━━━",
                inline: false
            },
            {
                name: "📥 Su oferta",
                value: formatItems(comparison.right.items) || "N/A",
                inline: false
            },
            {
                name: "📊 Total de su oferta",
                value:
                    `🔑 **Llaves:** ${formatValue(comparison.right.totalKeys)}\n` +
                    `📜 **Pergaminos:** ${formatValue(comparison.right.totalScrolls)}\n` +
                    `🎭 **Vizard:** ${formatValue(comparison.right.totalVizards)}`,
                inline: false
            },
            {
                name: "\u200B",
                value: "━━━━━━━━━━━━━━",
                inline: false
            },
            {
                name: `${resultEmoji} Resultado`,
                value:
    `**${resultText}**\n\n` +

    `🔑 Llaves: **${comparison.keysDifference >= 0 ? "+" : ""}${formatValue(comparison.keysDifference)}**\n` +

    `📜 Pergaminos: **${comparison.scrollsDifference >= 0 ? "+" : ""}${formatValue(comparison.scrollsDifference)}**\n` +

    `🎭 Vizard: **${comparison.vizardsDifference >= 0 ? "+" : ""}${formatValue(comparison.vizardsDifference)}**\n\n` +

    `📈 Porcentaje: **${comparison.percentage.toFixed(2)}%**` +
                    notFoundText,
                inline: false
            }
        )
        .setFooter({
            text:
                `Valores tomados de la hoja oficial\n` +
                `Diseñado por melevengo`
        });
}

// Función para actualizar el contador de miembros en el canal designado

async function updateMemberCount(guild) {
    try {
        const channel = guild.channels.cache.get(MEMBER_COUNT_CHANNEL_ID);

        if (!channel) return;

        await channel.setName(`👥・Miembros: ${guild.memberCount}`);
    } catch (error) {
        console.error("Error actualizando contador de miembros:", error);
    }
}

client.once("clientReady", async () => {
    console.log(`Bot conectado como ${client.user.tag}`);

    await refreshItems();

    for (const guild of client.guilds.cache.values()) {
    await updateMemberCount(guild);
}

    setInterval(refreshItems, 5 * 60 * 1000);
});

function parseDuration(durationText) {
    const match = durationText.match(/^(\d+)(s|m|h|d)$/i);

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

async function handleGiveaway(message) {

    if (message.channel.id !== GIVEAWAY_CHANNEL_ID) {
    await message.reply(
        `❌ Los sorteos solo pueden crearse en <#${GIVEAWAY_CHANNEL_ID}>`
    );
    return true;
}

    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        await message.reply("❌ Solo un administrador puede crear sorteos.");
        return true;
    }

const args = message.content.split(" ").slice(1);

const durationText = args.shift();

let winnerCount = 1;

if (!isNaN(args[0])) {
    winnerCount = Math.max(1, parseInt(args.shift()));
}
    const prize = args.join(" ").replace(/\s+/g, " ").trim();

    if (!durationText || !prize) {
        await message.reply(
            "❌ Uso correcto:\n`!sorteo 10m Premio del sorteo`\n\nEjemplo:\n`!sorteo 1h 1000 llaves AOTR`"
        );
        return true;
    }

    const durationMs = parseDuration(durationText);

    if (!durationMs) {
        await message.reply(
            "❌ Duración inválida. Usa `s`, `m`, `h` o `d`.\nEjemplos: `30s`, `10m`, `2h`, `1d`"
        );
        return true;
    }

    const endTime = Date.now() + durationMs;

const giveawayId = `${Date.now()}_${message.id}`;

const participants = new Set();

const createGiveawayEmbed = () => {
    return new EmbedBuilder()
        .setColor(0xffd700)
        .setTitle("🎉┃SORTEO ACTIVO")
.setDescription(
    `🎁 **Premio**\n` +
    `**${prize}**\n\n` +
    `━━━━━━━━━━━━━━\n\n` +
    `⏱️ **Duración:** ${formatDuration(durationMs)}\n` +
    `🏁 **Finaliza:** <t:${Math.floor(endTime / 1000)}:R>\n\n` +
    `🎊 **¿Cómo participar?**\n` +
    `Presiona el botón **Participar**.\n\n` +
    `🍀 ¡Mucha suerte a todos!`
)
        .addFields(
            {
                name: "👥 Participantes",
                value: `${participants.size}`,
                inline: true
            },
           {
    name: "🏆 Ganadores",
    value: String(winnerCount),
    inline: true
}
        )
        .setFooter({
            text: `Creado por ${message.author.username}`
        })
        .setTimestamp();
};

const buttonRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
        .setCustomId(`giveaway_join_${giveawayId}`)
        .setLabel("Participar")
        .setEmoji("🎉")
        .setStyle(ButtonStyle.Success)
);

const giveawayMessage = await message.channel.send({
    content: "@everyone 🎉 **¡NUEVO SORTEO ACTIVO!**",
    embeds: [createGiveawayEmbed()],
    components: [buttonRow],
    allowedMentions: {
        parse: ["everyone"]
    }
});

activeGiveaways.set(giveawayId, {
    prize,
    winnerCount,
    participants,
    messageId: giveawayMessage.id,
    channelId: message.channel.id,
    createGiveawayEmbed,
     ended: false
});

setTimeout(async () => {
    try {
        const giveaway = activeGiveaways.get(giveawayId);

        if (!giveaway || giveaway.ended) return;

        giveaway.ended = true;

        if (giveaway.participants.size === 0) {
            await message.channel.send(
                "❌ El sorteo terminó, pero no hubo participantes."
            );

            activeGiveaways.delete(giveawayId);
            return;
        }

const participantIds = [...giveaway.participants];

const winners = [];

const totalWinners = Math.min(
    giveaway.winnerCount,
    participantIds.length
);

for (let i = 0; i < totalWinners; i++) {
    const randomIndex = Math.floor(
        Math.random() * participantIds.length
    );

    winners.push(`<@${participantIds[randomIndex]}>`);

    participantIds.splice(randomIndex, 1);
}

            const resultEmbed = new EmbedBuilder()
                .setColor(0x2ecc71)
                .setTitle("🏆┃SORTEO FINALIZADO")
.setDescription(
    `🎁 **Premio**\n${prize}\n\n` +
    `━━━━━━━━━━━━━━\n\n` +
    `🏆 **Ganadores**\n${winners.join("\n")}\n\n` +
    `🎉 ¡Felicidades!`
)

            await message.channel.send({
                embeds: [resultEmbed]
            });
        } catch (error) {
            console.error("Error finalizando sorteo:", error);
            await message.channel.send("❌ Ocurrió un error al finalizar el sorteo.");
        }
        activeGiveaways.delete(giveawayId);
    }, durationMs);

    return true;
}

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.isButton() && interaction.customId.startsWith("similar_20_")) {
    const searchId = interaction.customId.replace("similar_20_", "");
    const searchData = activeSimilarSearches.get(searchId);

    if (!searchData) {
        await interaction.reply({
            content: "❌ Esta búsqueda ya no está disponible.",
            ephemeral: true
        });
        return;
    }

    const targetItem = resolveItem(searchData.targetItemName);

    if (!targetItem) {
        await interaction.reply({
            content: "❌ No pude volver a encontrar el item original.",
            ephemeral: true
        });
        return;
    }

    const similarItems = findSimilarItems(targetItem, itemsCache, 10, 20);

    await interaction.update({
        embeds: [createSimilarItemsEmbed(targetItem, similarItems, 20)],
        components: []
    });

    activeSimilarSearches.delete(searchId);
    return;
}

    if (!interaction.customId.startsWith("giveaway_join_")) return;

    const giveawayId = interaction.customId.replace("giveaway_join_", "");
    const giveaway = activeGiveaways.get(giveawayId);

    if (!giveaway) {
        await interaction.reply({
            content: "❌ Este sorteo ya terminó o no está disponible.",
            ephemeral: true
        });
        return;
    }

    if (giveaway.participants.has(interaction.user.id)) {
        await interaction.reply({
            content: "✅ Ya estás participando en este sorteo.",
            ephemeral: true
        });
        return;
    }

    giveaway.participants.add(interaction.user.id);

    const channel = await client.channels.fetch(giveaway.channelId);
    const msg = await channel.messages.fetch(giveaway.messageId);

    await msg.edit({
        embeds: [giveaway.createGiveawayEmbed()]
    });

    await interaction.reply({
        content: "🎉 Entraste al sorteo correctamente.",
        ephemeral: true
    });
});

// Evento para asignar rol automático y enviar mensaje de bienvenida

client.on("guildMemberAdd", async (member) => {
    try {
        const role = member.guild.roles.cache.get(AUTO_ROLE_ID);

        if (role) {
            await member.roles.add(role);
        }

        const welcomeChannel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);

        if (welcomeChannel) {
            const embed = new EmbedBuilder()
                .setColor(0x2ecc71)
                .setTitle("🎉 ¡Nuevo miembro!")
                .setDescription(
                    `Bienvenido/a ${member} a **${member.guild.name}**.\n\n` +
                    `📌 Revisa las reglas y disfruta la comunidad.\n` +
                    `🔍 Usa el bot para consultar valores, wiki y sorteos.`
                )
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setFooter({
                    text: `Ahora somos ${member.guild.memberCount} miembros`
                })
                .setTimestamp();

            await welcomeChannel.send({
                embeds: [embed]
            });
        }

        await updateMemberCount(member.guild);
    } catch (error) {
        console.error("Error en guildMemberAdd:", error);
    }
});

// Evento para actualizar el contador de miembros cuando alguien se va

client.on("guildMemberRemove", async (member) => {
    await updateMemberCount(member.guild);
});

client.on("messageCreate", async (message) => {
    
    if (message.author.bot) return;
    if (message.content.toLowerCase() === "!participantes") {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;

    const giveaways = [...activeGiveaways.values()];

    if (!giveaways.length) {
        await message.reply("❌ No hay sorteos activos guardados en memoria.");
        return;
    }

    const giveaway = giveaways[0];
    const ids = [...giveaway.participants];

    await message.reply(
        ids.length
            ? `👥 **Participantes guardados:**\n${ids.map(id => `<@${id}>`).join("\n")}`
            : "❌ Todavía no hay participantes guardados."
    );

    return;
}

    if (message.channel.id === WIKI_CHANNEL_ID) {

    const query = message.content.trim();

    const entry = findWikiEntry(query);

    if (!entry) {
        await message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(0xe74c3c)
                    .setTitle("❌ Entrada no encontrada")
                    .setDescription(
                        "No encontré información para esa perk."
                    )
            ]
        });

        return;
    }

    await message.reply({
        embeds: [createWikiEmbed(entry)]
    });

    return;
}
    if (!resolveItem) return;

if (message.content.toLowerCase().startsWith("!sorteo")) {
    const handled = await handleGiveaway(message);
    if (handled) return;
}

    if (message.channel.id !== VALUES_CHANNEL_ID) return;

const similarMatch = message.content.match(/^(similares a|similar a|similares|similar)\s+(.+)$/i);

if (similarMatch) {
    const query = similarMatch[2].trim();
    const targetItem = resolveCurrency(query, vizardRate) || resolveItem(query);

    if (!targetItem) {
        await message.reply({
            embeds: [createNotFoundEmbed(query)]
        });
        return;
    }

const similarItems = findSimilarItems(targetItem, itemsCache, 10, 10);

const searchId = `${Date.now()}_${message.id}`;

activeSimilarSearches.set(searchId, {
    targetItemName: targetItem.name
});

const buttonRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
        .setCustomId(`similar_20_${searchId}`)
        .setLabel("Ampliar al 20%")
        .setEmoji("🔎")
        .setStyle(ButtonStyle.Primary)
);

await message.reply({
    embeds: [createSimilarItemsEmbed(targetItem, similarItems)],
    components: [buttonRow]
});

return;
}

    const parsed = parseTradeMessage(message.content);

if (parsed.type === "single") {
    const item = resolveCurrency(parsed.item, vizardRate) || resolveItem(parsed.item);

    if (!item) {

await message.reply({
    embeds: [createNotFoundEmbed(parsed.item)]
});
        return;
    }

       await message.reply({
    embeds: [createItemEmbed(item)]
});
    }

if (parsed.type === "sum") {
    const { found: foundItems, notFound } = resolveItems(parsed.items);

    if (!foundItems.length) {
        await message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(0xe74c3c)
                    .setTitle("❌ Items no encontrados")
                   .setDescription(
    groupTextItems(notFound)
        .map(({ name, quantity }) => {
            const suggestions = resolveItem.suggest(name, 3);

            const suggestionText = suggestions.length
                ? `\n🔎 Quizás quisiste decir:\n${suggestions.map(item => `   • ${item.name}`).join("\n")}`
                : "";

            return `• ${name}${quantity > 1 ? ` x${quantity}` : ""}${suggestionText}`;
        })
        .join("\n\n")
)
            ]
        });

        return;
    }

    const total = calculateItems(foundItems);

    await message.reply({
        embeds: [createSumEmbed(foundItems, total, notFound)]
    });
}

    if (parsed.type === "compare") {
        const leftResolved = resolveItems(parsed.left);
const rightResolved = resolveItems(parsed.right);

const leftItems = leftResolved.found;
const rightItems = rightResolved.found;

if (!leftItems.length || !rightItems.length) {
    const notFound = [
        ...leftResolved.notFound,
        ...rightResolved.notFound
    ];


    const comparison = compareTrades(leftItems, rightItems);

    await message.reply({
        embeds: [createTradeEmbed(comparison, notFound)]
    });

    return;
}


const notFound = [
    ...leftResolved.notFound,
    ...rightResolved.notFound
];

const comparison = compareTrades(leftItems, rightItems);

await message.reply({
    embeds: [createTradeEmbed(comparison, notFound)]
});
    }
});

client.login(process.env.DISCORD_TOKEN);
