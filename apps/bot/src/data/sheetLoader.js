// Carga la hoja oficial AOTR (Excel exportado de Google Sheets)

import XLSX from "xlsx";
import { parseValue } from "../core/parseValue.js";

const DEFAULT_SHEET_ID = "1kpAy0dLgjmRe52oWKft7GrDLSssN6wEt9C09hx_eRqs";
const SHEET_URL =
  process.env.SHEET_URL ||
  `https://docs.google.com/spreadsheets/d/${DEFAULT_SHEET_ID}/export?format=xlsx`;

const SKIP_SHEETS = ["Overview"];

function normalizeCell(value) {
  if (value === undefined || value === null) return null;
  return String(value).trim();
}

function isCategoryRow(row) {
  const itemName = normalizeCell(row["Item Name"]);
  const rarity = normalizeCell(row["Rarity"]);
  const value = normalizeCell(row["Value"]);
  return itemName && !rarity && !value;
}

function isValidItemRow(row) {
  return normalizeCell(row["Item Name"]) && normalizeCell(row["Value"]);
}

function parseTax(rawTax) {
  if (!rawTax || rawTax === "N/A") return null;

  const clean = String(rawTax)
    .replace(/[💎🪙, ]/g, "")
    .toLowerCase();

  const match = clean.match(/([\d.]+)(k|m)?/);
  if (!match) return null;

  let number = Number(match[1]);
  if (match[2] === "k") number *= 1000;
  if (match[2] === "m") number *= 1000000;

  return number;
}

export async function loadItems() {
  console.log("📥 Descargando hoja oficial AOTR...");

  const response = await fetch(SHEET_URL);
  if (!response.ok) {
    throw new Error(`No se pudo descargar la hoja: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });

  const items = [];

  for (const sheetName of workbook.SheetNames) {
    if (SKIP_SHEETS.includes(sheetName)) continue;

    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });

    let currentCategory = sheetName;

    for (const row of rows) {
      if (isCategoryRow(row)) {
        currentCategory = normalizeCell(row["Item Name"]);
        continue;
      }

      if (!isValidItemRow(row)) continue;

      items.push({
        name: normalizeCell(row["Item Name"]),
        sheet: sheetName,
        category: currentCategory,
        rarity: normalizeCell(row["Rarity"]),
        demand: normalizeCell(row["Demand"]),
        value: parseValue(row["Value"]),
        rateOfChange: normalizeCell(row["Rate Of Change"]),
        taxGems: parseTax(row["Tax (Gems)"]),
        taxGold: parseTax(row["Tax (Gold)"]),
        existingAmount: normalizeCell(row["Existing Amount"])
      });
    }
  }

  console.log(`📦 Items oficiales cargados: ${items.length}`);
  return items;
}
