// Constantes y branding del bot
export const BRANDING = {
  footer: "AOTR Values • Bot v3",
  designer: "Diseñado por melevengo",
  colors: {
    official: 0x22c55e, // verde — lista oficial AOTR
    trade: 0x3b82f6, // azul — API de tradeo
    info: 0x6366f1,
    purple: 0x9b59b6,
    gold: 0xffd700,
    success: 0x2ecc71,
    danger: 0xe74c3c,
    warn: 0xf1c40f,
    wiki: 0x3498db
  },
  emoji: {
    keys: "🔑",
    scrolls: "📜",
    vizard: "🎭",
    taxGems: "💎",
    taxGold: "🪙",
    official: "🟢",
    trade: "🔵"
  }
};

export const DEFAULTS = {
  prefix: "!",
  syncTradeMinutes: 30, // minutos entre sincronización de la API de tradeo
  syncOfficialMinutes: 30, // minutos entre sincronización de la lista oficial
  historyRetentionDays: 60, // días de histórico que se conservan (alineado con lo que muestra la web)
  historyOnSync: true,
  channelRoleOfficial: "official",
  channelRoleTrade: "trade"
};

export const CURRENCY_CONFIG = {
  keys: { names: ["key", "keys", "llave", "llaves"], value: 1 },
  scrolls: { names: ["scroll", "scrolls", "pergamino", "pergaminos"], value: 3 }
};
