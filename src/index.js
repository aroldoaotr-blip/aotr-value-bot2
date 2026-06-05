import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import { parseValue } from './utils/parseValue.js';
import { loadItems } from "./data/sheetLoader.js";
import { createItemResolver } from "./parser/itemResolver.js";
import { parseTradeMessage } from "./parser/tradeParser.js";
import { calculateItems, compareTrades } from "./services/calculator.js";
import dotenv from 'dotenv';
import { resolveCurrency } from "./parser/currencyResolver.js";
import { findVizardRate } from "./services/currencyRates.js";

dotenv.config();


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

let resolveItem = null;
let itemsCache = [];
let lastUpdate = null;
let vizardRate = null;

const VALUES_CHANNEL_ID = "1510408304046768248";


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

client.once("clientReady", async () => {
    console.log(`Bot conectado como ${client.user.tag}`);

    await refreshItems();

    setInterval(refreshItems, 5 * 60 * 1000);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!resolveItem) return;

    if (message.channel.id !== VALUES_CHANNEL_ID) return;

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
