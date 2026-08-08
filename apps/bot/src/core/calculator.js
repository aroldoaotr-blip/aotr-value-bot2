// Cálculo de totales y comparación de trades

function getNumberValue(value) {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return value;
  if (typeof value === "object") {
    const min = Number(value.min ?? 0);
    const max = Number(value.max ?? min);
    return (min + max) / 2;
  }
  return 0;
}

export function getItemMainValue(item) {
  return getNumberValue(item?.value?.vizards);
}

export function calculateItems(items) {
  return {
    items,
    totalVizards: items.reduce(
      (sum, item) => sum + getNumberValue(item.value.vizards),
      0
    ),
    totalKeys: items.reduce(
      (sum, item) => sum + getNumberValue(item.value.keys),
      0
    ),
    totalScrolls: items.reduce(
      (sum, item) => sum + getNumberValue(item.value.scrolls),
      0
    ),
    totalTaxGems: items.reduce(
      (sum, item) => sum + Number(item.taxGems ?? 0),
      0
    ),
    totalTaxGold: items.reduce(
      (sum, item) => sum + Number(item.taxGold ?? 0),
      0
    )
  };
}

export function compareTrades(leftItems, rightItems) {
  const left = calculateItems(leftItems);
  const right = calculateItems(rightItems);

  const leftValue = left.totalVizards;
  const rightValue = right.totalVizards;

  const difference = rightValue - leftValue;
  const percentage =
    leftValue > 0 ? (difference / leftValue) * 100 : 0;

  let result = "Fair";
  if (percentage > 10) result = "W";
  if (percentage < -10) result = "L";

  return {
    left,
    right,
    difference,
    percentage,
    result,
    keysDifference: right.totalKeys - left.totalKeys,
    scrollsDifference: right.totalScrolls - left.totalScrolls,
    vizardsDifference: right.totalVizards - left.totalVizards
  };
}
