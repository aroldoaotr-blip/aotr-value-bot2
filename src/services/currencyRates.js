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

export function findVizardRate(items) {
    const possibleNames = [
        "vizard",
        "vizard mask",
        "vizard masks"
    ];

    const vizardItem = items.find(item => {
        const name = item.name.toLowerCase();

        return possibleNames.some(possibleName =>
            name === possibleName || name.includes(possibleName)
        );
    });

    if (!vizardItem) {
        console.warn("No se encontró Vizard en la lista oficial.");
        return null;
    }

    const keys = getNumberValue(vizardItem.value.keys);

    if (!keys) {
        console.warn("Vizard fue encontrado, pero no tiene valor en llaves.");
        return null;
    }

    return {
        item: vizardItem,
        keysPerVizard: keys,
        scrollsPerVizard: keys / 3,
        keyToVizard: 1 / keys,
        scrollToVizard: 3 / keys
    };
}