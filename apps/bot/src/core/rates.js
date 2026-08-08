// Detección del ratio Vizard a partir de la hoja oficial

export function getNumberValue(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return value;
  if (typeof value === "object") {
    const min = Number(value.min ?? 0);
    const max = Number(value.max ?? min);
    return (min + max) / 2;
  }
  return null;
}

// Lee las tasas configuradas por el admin (RateConfig en la BD).
// Devuelve null si la BD no está disponible para que el caller use la detección.
export async function loadConfiguredRates() {
  try {
    const { getRates } = await import("@aotr/db");
    const rates = await getRates();
    if (rates && rates.keysPerVizard > 0 && rates.keysPerScroll > 0) return rates;
  } catch {
    /* sin BD → detección */
  }
  return null;
}

export function findVizardRate(items, rates = null) {
  const possibleNames = ["vizard", "vizard mask", "vizard masks"];

  // Prioridad 1: tasas configuradas por admin (web /administrador)
  if (rates) {
    return {
      item: null,
      keysPerVizard: rates.keysPerVizard,
      keysPerScroll: rates.keysPerScroll,
      scrollsPerVizard: rates.keysPerVizard / rates.keysPerScroll,
      keyToVizard: 1 / rates.keysPerVizard,
      scrollToVizard: rates.keysPerScroll / rates.keysPerVizard
    };
  }

  // Prioridad 2: detectar Vizard de la hoja oficial (comportamiento histórico)
  const vizardItem = items.find((item) => {
    const name = item.name.toLowerCase();
    return possibleNames.some(
      (possibleName) => name === possibleName || name.includes(possibleName)
    );
  });

  if (!vizardItem) {
    console.warn("⚠️ No se encontró Vizard en la lista oficial.");
    return null;
  }

  const keys = getNumberValue(vizardItem.value.keys);
  if (!keys) {
    console.warn("⚠️ Vizard fue encontrado, pero no tiene valor en llaves.");
    return null;
  }

  return {
    item: vizardItem,
    keysPerVizard: keys,
    keysPerScroll: 3,
    scrollsPerVizard: keys / 3,
    keyToVizard: 1 / keys,
    scrollToVizard: 3 / keys
  };
}

// Completa valores faltantes usando el ratio de Vizard detectado
export function applyVizardConversion(items, vizardRate) {
  if (!vizardRate) return items;

  return items.map((item) => {
    const value = { ...item.value };

    const keysPerScroll = vizardRate.keysPerScroll ?? 3;

    if ((value.keys === null || value.keys === undefined) && value.scrolls != null) {
      value.keys = value.scrolls * keysPerScroll;
    }

    if ((value.scrolls === null || value.scrolls === undefined) && value.keys != null) {
      value.scrolls = value.keys / keysPerScroll;
    }

    if ((value.vizards === null || value.vizards === undefined) && value.keys != null) {
      value.vizards = value.keys / vizardRate.keysPerVizard;
    }

    return { ...item, value };
  });
}
