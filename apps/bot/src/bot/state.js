// Estado global del bot (cache en memoria)

import { GiveawayManager } from "../services/giveaways.js";
import { compactKey } from "../core/normalize.js";

const emptyResolver = Object.assign(() => null, { suggest: () => [] });

export const state = {
  itemsCache: [], // items oficiales (hoja AOTR)
  itemsReady: false,
  resolveItem: emptyResolver, // resolver sobre itemsCache (seguro durante el arranque)
  vizardRate: null,
  apiMap: new Map(), // compactKey -> { value, keys, scrolls, demand, status, rateOfChange }
  apiKeyRatio: null,
  lastUpdate: null,
  startedAt: Date.now(),
  giveaways: new GiveawayManager(),
  activeSimilar: new Map(), // ctxId -> targetItemName
  activeCurrency: new Map(), // ctxId -> itemName
  activeHistory: new Map(), // ctxId -> itemName
  activeTrades: new Map(), // ctxId -> { leftText, rightText }
  dbReady: false,
  setItems, // método sobre el estado (eventos/scripts lo llaman como state.setItems)
  getApiRow, // método sobre el estado (handlers/buttons lo llaman como state.getApiRow)
  upsertApiRows // método sobre el estado (sync lo llama como state.upsertApiRows)
};

export function setItems(items, vizardRate) {
  state.itemsCache = items;
  state.vizardRate = vizardRate;
  state.itemsReady = true;
  state.lastUpdate = new Date();
}

export function getApiRow(normalizedName) {
  return state.apiMap.get(normalizedName) ?? null;
}

export function upsertApiRows(rows, rates) {
  // rates: { keysPerVizard, keysPerScroll } (tasas del admin o por defecto)
  const keysPerVizard = rates?.keysPerVizard ?? 900.9;
  const keysPerScroll = rates?.keysPerScroll ?? 3;
  state.apiKeyRatio = 1 / keysPerVizard;
  state.apiMap.clear();
  for (const row of rows) {
    // row.value viene en vizard → llaves = viz × keysPerVizard
    const keys = row.value != null ? row.value * keysPerVizard : null;
    // La clave SIEMPRE es compactKey (sin espacios): es la que usan las
    // búsquedas (state.getApiRow(compactKey(name))). row.normalized viene
    // de normalizeSearchText (con espacios) y NO sirve como llave del mapa.
    const key = compactKey(row.name ?? row.normalized ?? "");
    state.apiMap.set(key, {
      value: row.value,
      keys,
      scrolls: keys != null ? keys / keysPerScroll : null,
      demand: row.demand,
      status: row.status,
      rateOfChange: row.rateOfChange,
      emoji: row.emoji ?? null,
      taxGems: row.gemTax ?? null,
      taxGold: row.goldTax ?? null,
      category: row.category ?? null
    });
  }
}
