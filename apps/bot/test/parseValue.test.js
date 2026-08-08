import { test } from "node:test";
import assert from "node:assert/strict";
import { parseValue, midValue } from "../src/core/parseValue.js";

test("parseValue: valores completos", () => {
  const value = parseValue("🔑 250k / 📜 83.3k / 🎭 viz 1.2k");
  assert.equal(value.keys, 250000);
  assert.equal(value.scrolls, 83300);
  assert.equal(value.vizards, 1200);
});

test("parseValue: solo llaves, infiere pergaminos", () => {
  const value = parseValue("🔑 900");
  assert.equal(value.keys, 900);
  assert.equal(value.scrolls, 300);
});

test("parseValue: rango min-max", () => {
  const value = parseValue("🔑 180-220");
  assert.deepEqual(value.keys, { min: 180, max: 220 });
});

test("parseValue: N/A", () => {
  const value = parseValue("N/A");
  assert.equal(value.keys, null);
  assert.equal(value.scrolls, null);
  assert.equal(value.vizards, null);
});

test("parseValue: vacío", () => {
  const value = parseValue("");
  assert.equal(value.keys, null);
});

test("midValue: número y rango", () => {
  assert.equal(midValue(180), 180);
  assert.equal(midValue({ min: 180, max: 220 }), 200);
  assert.equal(midValue(null), null);
});
