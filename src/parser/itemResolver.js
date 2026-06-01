import Fuse from "fuse.js";

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

function createSearchEntries(items) {
    const entries = [];

    for (const item of items) {
        const normalizedName = normalizeText(item.name);
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
    const query = normalizeText(input);

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
    const query = normalizeText(input);

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
    const query = normalizeText(input);

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
