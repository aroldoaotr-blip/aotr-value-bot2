// Normalización de texto compartida (búsqueda, matching, slugs)

export function normalizeText(text = "") {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ø/g, "o")
    .replace(/ö/g, "o")
    .replace(/ä/g, "a")
    .replace(/ü/g, "u")
    .replace(/ñ/g, "n")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasVowel(word) {
  return /[aeiou]/.test(word);
}

// Stemming de plurales: solo si el resultado sigue siendo una palabra plausible
// (contiene vocal). Evita romper tokens como "fps" → "fp" ("12FPS").
function normalizeWord(word = "") {
  if (word.endsWith("ies")) {
    const stem = word.slice(0, -3) + "y";
    return hasVowel(stem) ? stem : word;
  }
  if (word.endsWith("es")) {
    const stem = word.slice(0, -2);
    return hasVowel(stem) ? stem : word;
  }
  if (word.endsWith("s") && word.length > 3) {
    const stem = word.slice(0, -1);
    return hasVowel(stem) ? stem : word;
  }
  return word;
}

export function normalizeSearchText(text = "") {
  return normalizeText(text)
    .split(" ")
    .map(normalizeWord)
    .join(" ")
    .trim();
}

// Clave de unión entre fuentes (oficial ↔ API)
// ej: "12 FPS" → "12fps", "Vizard's Masks" → "vizardmask"
export function compactKey(text = "") {
  return normalizeSearchText(text).replace(/\s+/g, "");
}

export function slugify(text = "") {
  return normalizeText(text).replace(/\s+/g, "-");
}

export function stableId(seed) {
  // id determinístico y estable a partir de un texto normalizado
  let hash = 5381;
  const str = String(seed);
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return "it_" + (hash >>> 0).toString(36).padStart(8, "0");
}
