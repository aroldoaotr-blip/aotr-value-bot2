import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveCurrency } from "../src/core/currency.js";

const RATE = { keyToVizard: 1 / 900, scrollToVizard: 3 / 900 };

test("resolveCurrency: llaves", () => {
  const item = resolveCurrency("500 llaves", RATE);
  assert.equal(item.name, "500 Llaves");
  assert.equal(item.value.keys, 500);
  assert.equal(item.value.scrolls, 166.66666666666666);
});

test("resolveCurrency: pergaminos", () => {
  const item = resolveCurrency("30 pergaminos", RATE);
  assert.equal(item.value.keys, 90);
  assert.equal(item.value.scrolls, 30);
});

test("resolveCurrency: vizard con ratio", () => {
  const item = resolveCurrency("900 llaves", RATE);
  assert.ok(Math.abs(item.value.vizards - 1) < 0.001);
});

test("resolveCurrency: texto sin número → null", () => {
  assert.equal(resolveCurrency("llaves"), null);
});

test("resolveCurrency: vizard sin ratio → vizards null", () => {
  const item = resolveCurrency("500 keys", null);
  assert.equal(item.value.vizards, null);
});
