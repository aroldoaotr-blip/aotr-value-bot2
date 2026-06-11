import Fuse from "fuse.js";
import { SEARCH_ALIASES } from "../data/searchAliases.js";


function normalizeText(text = "") {
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

function normalizeWord(word = "") {
    if (word.endsWith("ies")) return word.slice(0, -3) + "y";
    if (word.endsWith("es")) return word.slice(0, -2);
    if (word.endsWith("s") && word.length > 3) return word.slice(0, -1);

    return word;
}

function normalizeSearchText(text = "") {
    return normalizeText(text)
        .split(" ")
        .map(normalizeWord)
        .join(" ")
        .trim();
}

function applySearchAliases(text = "") {
    let normalized = normalizeText(text);

    // 1. Primero revisar si la frase completa existe como alias
    if (SEARCH_ALIASES[normalized]) {
        return normalizeText(SEARCH_ALIASES[normalized]);
    }

    // 2. Luego reemplazar frases largas dentro del texto
    const aliasEntries = Object.entries(SEARCH_ALIASES)
        .sort((a, b) => b[0].length - a[0].length);

    for (const [alias, replacement] of aliasEntries) {
        const normalizedAlias = normalizeText(alias);
        const normalizedReplacement = normalizeText(replacement);

        const regex = new RegExp(`\\b${normalizedAlias}\\b`, "g");

        normalized = normalized.replace(regex, normalizedReplacement);
    }

    // 3. Limpiar espacios
    return normalized
        .replace(/\s+/g, " ")
        .trim();
}

function tokenSearch(items, query) {
    const COMMON_TOKENS = [
        "wing",
        "wings",
        "attire",
        "aura",
        "mask",
        "set",
        "gear",
        "equipment",
        "sword",
        "blade",
        "cloak",
        "scarf",
        "hat"
    ];

    const queryTokens = query
        .split(" ")
        .filter(Boolean);

    const importantTokens = queryTokens.filter(token =>
        !COMMON_TOKENS.includes(token)
    );

    if (!queryTokens.length) return null;

    const matches = items
        .map(item => {
            const itemName = normalizeText(item.name);
            const itemTokens = itemName.split(" ");

            let score = 0;
            let matchedImportant = 0;
            let matchedTotal = 0;

            for (const token of queryTokens) {
                const exactMatch = itemTokens.includes(token);
                const partialMatch = itemName.includes(token);

                if (exactMatch) {
                    score += COMMON_TOKENS.includes(token) ? 1 : 5;
                    matchedTotal++;

                    if (!COMMON_TOKENS.includes(token)) {
                        matchedImportant++;
                    }
                } else if (partialMatch) {
                    score += COMMON_TOKENS.includes(token) ? 0.5 : 2;
                    matchedTotal++;

                    if (!COMMON_TOKENS.includes(token)) {
                        matchedImportant++;
                    }
                }
            }

            return {
                item,
                score,
                matchedImportant,
                matchedTotal
            };
        })
        .filter(result => {
            if (result.score <= 0) return false;

            if (importantTokens.length > 0 && result.matchedImportant === 0) {
                return false;
            }

            if (queryTokens.length >= 2 && result.matchedTotal < 2) {
                return false;
            }

            return true;
        })
        .sort((a, b) => b.score - a.score);

    if (!matches.length) return null;

    return matches[0].item;
}

function createSearchEntries(items) {
    const entries = [];

    for (const item of items) {
        const normalizedName = normalizeSearchText(item.name);
        const words = normalizedName.split(" ");

        entries.push({
            query: normalizedName,
            item
        });

        for (const word of words) {
            if (word.length >= 3) {
                entries.push({
                    query: word,
                    item
                });
            }
        }

        const initials = words.map(word => word[0]).join("");
        if (initials.length >= 2) {
            entries.push({
                query: initials,
                item
            });
        }
    }

    return entries;
}

export function createItemResolver(items) {
    const entries = createSearchEntries(items);

    const exactMap = new Map();

    for (const entry of entries) {
        if (!exactMap.has(entry.query)) {
            exactMap.set(entry.query, entry.item);
        }
    }

const fuse = new Fuse(entries, {
    keys: ["query"],
    threshold: 0.20,
    includeScore: true
});

const suggestionFuse = new Fuse(entries, {
    keys: ["query"],
    threshold: 0.60,
    includeScore: true
})

function suggestItems(input, limit = 5) {
    const query = normalizeSearchText(applySearchAliases(input));

    if (!query) return [];

    const results = suggestionFuse.search(query);

    const uniqueItems = [];

    for (const result of results) {
        const item = result.item.item;

        if (!uniqueItems.some(existing => existing.name === item.name)) {
            uniqueItems.push(item);
        }

        if (uniqueItems.length >= limit) break;
    }

    return uniqueItems;
}

function resolvePerk(input) {
    const query = normalizeSearchText(normalizeText(input));

    const wantsLevel10 = /\b10\b/.test(query);

    const cleanQuery = query
        .replace(/\b10\b/g, "")
        .replace(/\s+/g, " ")
        .trim();

    const perkItems = items.filter(item =>
        item.sheet?.toLowerCase().includes("perk") ||
        item.category?.toLowerCase().includes("perk")
    );

    const targetCategory = wantsLevel10 ? "PERKS +10" : "PERKS +0";

    const categoryPerks = perkItems.filter(item =>
        item.category?.toUpperCase() === targetCategory
    );

    const found = categoryPerks.find(item =>
        normalizeText(item.name) === cleanQuery
    );

    if (found) return found;

    const perkFuse = new Fuse(categoryPerks, {
        keys: ["name"],
        threshold: 0.25,
        includeScore: true
    });

    const results = perkFuse.search(cleanQuery);

    if (!results.length) return null;

    if (results[0].score > 0.25) return null;

    return results[0].item;
}

    function resolveItem(input) {

        console.log("INPUT:", input);

    const query = normalizeSearchText(applySearchAliases(input));

    console.log("ALIAS RESULT:", query);

    const wantsPerk10 =
    /\b10\b/.test(query) ||
    query.includes("plus 10") ||
    query.includes("+10");

const cleanPerkQuery = query
    .replace(/\b10\b/g, "")
    .replace(/plus 10/g, "")
    .replace(/\+10/g, "")
    .replace(/\s+/g, " ")
    .trim();

    if (!query) return null;
    
    const perkResult = resolvePerk(input);

if (perkResult) {
    return perkResult;
}

if (exactMap.has(query)) {
    return exactMap.get(query);
}

const tokenResult = tokenSearch(items, query);

if (tokenResult) {
    return tokenResult;
}

const results = fuse.search(query);

    if (!results.length) return null;

    const best = results[0];

    if (best.score > 0.20) {
        return null;
    }

    return best.item.item;
}

resolveItem.suggest = suggestItems;

return resolveItem;
}
