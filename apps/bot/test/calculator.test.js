import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateItems, compareTrades } from "../src/core/calculator.js";

function makeItem(name, keys) {
  return {
    name,
    value: { keys, scrolls: keys / 3, vizards: keys / 100 },
    taxGems: 0,
    taxGold: 0
  };
}

test("calculateItems: totaliza correctamente", () => {
  const total = calculateItems([makeItem("A", 100), makeItem("B", 200)]);
  assert.equal(total.totalKeys, 300);
  assert.equal(total.totalScrolls, 100);
  assert.equal(total.totalVizards, 3);
});

test("compareTrades: resultado W cuando ganas (su oferta vale más)", () => {
  const comparison = compareTrades([makeItem("Mio", 100)], [makeItem("Suyo", 300)]);
  assert.equal(comparison.result, "W");
});

test("compareTrades: resultado L cuando pierdes (tu oferta vale más)", () => {
  const comparison = compareTrades([makeItem("Mio", 300)], [makeItem("Suyo", 100)]);
  assert.equal(comparison.result, "L");
});

test("compareTrades: fair en ±10%", () => {
  const comparison = compareTrades([makeItem("Mio", 100)], [makeItem("Suyo", 105)]);
  assert.equal(comparison.result, "Fair");
});

test("compareTrades: porcentaje calculado", () => {
  const comparison = compareTrades([makeItem("Mio", 100)], [makeItem("Suyo", 120)]);
  assert.ok(Math.abs(comparison.percentage - 20) < 0.001);
});

test("compareTrades: W con un 15% de ventaja", () => {
  const comparison = compareTrades([makeItem("Mio", 100)], [makeItem("Suyo", 115)]);
  assert.equal(comparison.result, "W");
});
