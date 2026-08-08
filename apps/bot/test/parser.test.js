import { test } from "node:test";
import assert from "node:assert/strict";
import { parseTradeMessage, splitItems } from "../src/core/parser.js";

test("parseTradeMessage: detecta trade con 'for'", () => {
  const result = parseTradeMessage("Susanoo's Wings for Vizard Mask");
  assert.equal(result.type, "compare");
  assert.deepEqual(result.left, ["Susanoo's Wings"]);
  assert.deepEqual(result.right, ["Vizard Mask"]);
});

test("parseTradeMessage: detecta trade con 'por'", () => {
  const result = parseTradeMessage("Aura por 500 llaves");
  assert.equal(result.type, "compare");
  assert.equal(result.left[0], "Aura");
  assert.equal(result.right[0], "500 llaves");
});

test("parseTradeMessage: suma con +", () => {
  const result = parseTradeMessage("Espada + Escudo + Aura");
  assert.equal(result.type, "sum");
  assert.deepEqual(result.items, ["Espada", "Escudo", "Aura"]);
});

test("parseTradeMessage: item simple", () => {
  const result = parseTradeMessage("Susanoo's Wings");
  assert.equal(result.type, "single");
  assert.equal(result.item, "Susanoo's Wings");
});

test("splitItems: expande cantidades (excepto monedas)", () => {
  const items = splitItems("3 Espadas + 2 Auras");
  assert.deepEqual(items, ["Espadas", "Espadas", "Espadas", "Auras", "Auras"]);
});

test("splitItems: respeta monedas como cantidad", () => {
  const items = splitItems("500 llaves");
  assert.deepEqual(items, ["500 llaves"]);
});

test("splitItems: une 'y' como separador", () => {
  const items = splitItems("Espada y Escudo");
  assert.deepEqual(items, ["Espada", "Escudo"]);
});
