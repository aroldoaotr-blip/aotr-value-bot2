import { BOT_CONFIG } from "../config/botConfig.js";

export function resolveCurrency(input = "") {
    const text = String(input).toLowerCase().trim();

    const match = text.match(/^(\d+(?:\.\d+)?)\s+(.+)$/);

    if (!match) return null;

    const amount = Number(match[1]);
    const currencyName = match[2].trim();

    const { keys, scrolls } = BOT_CONFIG.currencies;

    if (keys.names.includes(currencyName)) {
        return createCurrencyItem({
            name: `${amount} Llaves`,
            keys: amount,
            scrolls: amount / scrolls.value
        });
    }

    if (scrolls.names.includes(currencyName)) {
        return createCurrencyItem({
            name: `${amount} Pergaminos`,
            keys: amount * scrolls.value,
            scrolls: amount
        });
    }

    return null;
}

function createCurrencyItem({ name, keys, scrolls }) {
    return {
        name,
        rarity: "Moneda",
        demand: "N/A",
        value: {
            raw: "Moneda",
            keys,
            scrolls,
            vizards: null
        },
        rateOfChange: "Fijo",
        taxGems: null,
        taxGold: null,
        category: "MONEDA",
        sheet: "Config",
        isCurrency: true
    };
}