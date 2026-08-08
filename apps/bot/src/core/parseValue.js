// Parseo de valores de la hoja oficial (ej: "🔑 250k / 📜 83.3k / 🎭 viz 1.2k")

export function parseValue(rawValue = "") {
  const raw = String(rawValue).trim();

  const result = { raw, keys: null, scrolls: null, vizards: null };

  if (!raw || raw.toLowerCase() === "n/a") return result;

  const clean = raw
    .replaceAll(",", "")
    .replaceAll(" ", "")
    .toLowerCase();

  const parseNumber = (text) => {
    const match = text.match(/([\d.]+)(k|m)?/i);
    if (!match) return null;
    let number = parseFloat(match[1]);
    const suffix = match[2];
    if (suffix === "k") number *= 1000;
    if (suffix === "m") number *= 1000000;
    return number;
  };

  const parseRange = (text) => {
    if (!text.includes("-")) return parseNumber(text);
    const [minText, maxText] = text.split("-");
    return { min: parseNumber(minText), max: parseNumber(maxText) };
  };

  const divideValue = (value, divisor) => {
    if (value === null || value === undefined) return null;
    if (typeof value === "object") {
      return { min: value.min / divisor, max: value.max / divisor };
    }
    return value / divisor;
  };

  const multiplyValue = (value, multiplier) => {
    if (value === null || value === undefined) return null;
    if (typeof value === "object") {
      return { min: value.min * multiplier, max: value.max * multiplier };
    }
    return value * multiplier;
  };

  const parts = clean.split("/");

  for (const part of parts) {
    if (part.includes("🔑")) result.keys = parseRange(part.replace("🔑", ""));
    if (part.includes("📜")) result.scrolls = parseRange(part.replace("📜", ""));
    if (part.includes("viz")) result.vizards = parseRange(part.replace("viz", ""));
  }

  if (result.keys !== null && result.scrolls === null) {
    result.scrolls = divideValue(result.keys, 3);
  }

  if (result.scrolls !== null && result.keys === null) {
    result.keys = multiplyValue(result.scrolls, 3);
  }

  return result;
}

export function numberOrRangeToJson(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "object") return value; // { min, max }
  return value;
}

export function midValue(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "object") return (value.min + value.max) / 2;
  return Number(value);
}
