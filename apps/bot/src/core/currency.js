// Resolución de monedas (llaves / pergaminos / vizard)

import { CURRENCY_CONFIG } from "../config/constants.js";

export function resolveCurrency(input = "", vizardRate = null) {
  const text = String(input).toLowerCase().trim();

  const match = text.match(/^(\d+(?:\.\d+)?)\s+(.+)$/);
  if (!match) return null;

  const amount = Number(match[1]);
  const currencyName = match[2].trim();

  const { keys, scrolls } = CURRENCY_CONFIG;

  if (keys.names.includes(currencyName)) {
    return createCurrencyItem({
      name: `${amount} Llaves`,
      keys: amount,
      scrolls: amount / scrolls.value,
      vizards: vizardRate ? amount * vizardRate.keyToVizard : null
    });
  }

  if (scrolls.names.includes(currencyName)) {
    return createCurrencyItem({
      name: `${amount} Pergaminos`,
      keys: amount * scrolls.value,
      scrolls: amount,
      vizards: vizardRate ? amount * vizardRate.scrollToVizard : null
    });
  }

  return null;
}

function createCurrencyItem({ name, keys, scrolls, vizards }) {
  return {
    name,
    rarity: "Moneda",
    demand: "N/A",
    value: { raw: "Moneda", keys, scrolls, vizards },
    rateOfChange: "Fijo",
    taxGems: null,
    taxGold: null,
    category: "MONEDA",
    sheet: "Config",
    isCurrency: true
  };
}
