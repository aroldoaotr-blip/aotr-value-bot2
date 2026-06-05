export function parseTradeMessage(content = "") {
    const text = String(content).trim();

    const tradeMatch = text.match(/^(.+?)\s+(for|por)\s+(.+)$/i);

    if (tradeMatch) {
        return {
            type: "compare",
            left: splitItems(tradeMatch[1]),
            right: splitItems(tradeMatch[3])
        };
    }

    const items = splitItems(text);

    if (items.length > 1) {
        return {
            type: "sum",
            items
        };
    }

    return {
        type: "single",
        item: text
    };
}

function splitItems(text = "") {

const parts = String(text)
    .split("+")
    .map(item => item.trim().replace(/^(and|y)\s+/i, ""))
    .filter(Boolean);
        
    const expandedItems = [];

    const currencyWords = [
        "key",
        "keys",
        "llave",
        "llaves",
        "scroll",
        "scrolls",
        "pergamino",
        "pergaminos"
    ];

    for (const part of parts) {
        const match = part.match(/^(\d+(?:\.\d+)?)\s+(.+)$/);

        if (match) {
            const quantity = Number(match[1]);
            const itemName = match[2].trim();
            const normalizedItemName = itemName.toLowerCase();

            if (currencyWords.includes(normalizedItemName)) {
                expandedItems.push(part);
                continue;
            }

            for (let i = 0; i < quantity; i++) {
                expandedItems.push(itemName);
            }
        } else {
            expandedItems.push(part);
        }
    }

    return expandedItems;
}