// Wiki de perks — carga desde el JSON local
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let wikiCache = null;

export function getWikiEntries() {
  if (wikiCache) return wikiCache;
  const file = path.resolve(__dirname, "wiki.json");
  wikiCache = JSON.parse(fs.readFileSync(file, "utf8"));
  return wikiCache;
}
