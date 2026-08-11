#!/usr/bin/env node
/**
 * stitch/preview.mjs — Genera una galería HTML de preview a partir de un export.
 *
 * Uso:
 *   node stitch/preview.mjs stitch/exports/rediseno-total
 *
 * Escanea la carpeta del export:
 *   - cada subcarpeta con design.html → se INCORPORA el diseño completo renderizado
 *     (iframe srcdoc: el servidor estático del preview no sirve archivos hermanos,
 *     así que los diseños van embebidos en la misma página)
 *   - design-system.json (raíz y por pantalla) → swatches de color de las paletas
 * Escribe <export>/index.html (autocontenido, sirve con register_preview htmlPath).
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, "..");

const arg = process.argv[2];
if (!arg) {
  console.error("Uso: node stitch/preview.mjs <carpeta-de-export>");
  process.exit(1);
}
const outDir = resolve(REPO_ROOT, arg);
if (!existsSync(outDir)) {
  console.error(`❌ No existe: ${outDir}`);
  process.exit(1);
}

// 1) Design system(s) → paletas (raíz + las de cada subcarpeta de pantalla)
function loadPalette(path, label) {
  try {
    const ds = JSON.parse(readFileSync(path, "utf8"));
    const colors = ds.namedColors ?? ds.colors ?? {};
    if (!Object.keys(colors).length) return null;
    return { label, colors, colorMode: ds.colorMode ?? "?", headline: ds.headlineFont ?? ds.headlineFontFamily ?? "?", body: ds.bodyFont ?? ds.bodyFontFamily ?? "?" };
  } catch {
    return null;
  }
}
const palettes = [];
const rootDs = loadPalette(join(outDir, "design-system.json"), "Design system raíz");
if (rootDs) palettes.push(rootDs);
for (const entry of readdirSync(outDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const p = loadPalette(join(outDir, entry.name, "design-system.json"), entry.name);
  if (p) palettes.push(p);
}
const colorMode = rootDs?.colorMode ?? "DARK";

function colorSwatches(obj, limit = 16) {
  const entries = Object.entries(obj).filter(([, v]) => typeof v === "string" && /^#([0-9a-fA-F]{6})$/.test(v));
  return entries
    .slice(0, limit)
    .map(
      ([name, hex]) =>
        `<div class="sw" title="${name}: ${hex}"><span class="swatch" style="background:${hex}"></span><code>${name}<br>${hex}</code></div>`
    )
    .join("");
}

// 2) Pantallas: incrustar cada design.html completo (srcdoc) para verlo renderizado
const screens = [];
for (const entry of readdirSync(outDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const dir = join(outDir, entry.name);
  const htmlPath = join(dir, "design.html");
  if (!existsSync(htmlPath)) continue;
  let title = entry.name;
  try {
    const meta = JSON.parse(readFileSync(join(dir, "screen.json"), "utf8"));
    if (meta.title) title = meta.title;
  } catch {}
  let html = readFileSync(htmlPath, "utf8");
  // quitar doctype para poder incrustarlo dentro del iframe (srcdoc acepta el doc completo,
  // pero normalizamos igual para evitar Doctype duplicado en el documento padre)
  html = html.replace(/^\s*<!DOCTYPE[^>]*>/i, "");
  screens.push({ title, dir: entry.name, html });
}

function srcdocEscape(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const screenCards = screens
  .map(
    (s, i) => `
  <section class="card" id="screen-${i + 1}">
    <div class="meta"><h2>${i + 1}. ${s.title}</h2><span class="dim">${s.dir}</span></div>
    <div class="frame-wrap">
      <iframe class="design-frame" title="${s.title}" srcdoc="${srcdocEscape(s.html)}" loading="lazy"></iframe>
      <div class="frame-note">↓ scrolleá dentro del diseño para verlo completo ↓</div>
    </div>
  </section>`
  )
  .join("\n");

const nav = screens.map((s, i) => `<a href="#screen-${i + 1}">${i + 1}. ${s.title.split(" - ")[0].split(" | ")[0].slice(0, 22)}</a>`).join("\n");

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Preview de diseños Stitch — AOTR Values</title>
<style>
  :root { --bg: #0a0c1a; --card: #12152b; --line: rgba(255,255,255,.09); --text: #e5e7eb; --muted: #9aa0b5; --acc: #22d3ee; }
  * { box-sizing: border-box; }
  body { margin: 0; background: radial-gradient(1000px 500px at 80% -10%, rgba(139,92,246,.15), transparent 60%), var(--bg); color: var(--text); font-family: Inter, system-ui, sans-serif; min-height: 100vh; padding: 40px 24px 80px; }
  .wrap { max-width: 1280px; margin: 0 auto; }
  header h1 { font-family: Orbitron, sans-serif; font-size: 28px; letter-spacing: .04em; margin: 0 0 6px; background: linear-gradient(120deg, #818cf8, #22d3ee 45%, #a78bfa); -webkit-background-clip: text; background-clip: text; color: transparent; }
  header p { color: var(--muted); margin: 0 0 14px; }
  .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; border: 1px solid var(--line); color: var(--muted); font-size: 12px; margin-right: 8px; }
  h2 { font-size: 16px; margin: 0 0 12px; color: var(--muted); text-transform: uppercase; letter-spacing: .08em; }
  .index { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0 32px; }
  .index a { color: var(--acc); text-decoration: none; font-size: 12px; border: 1px solid rgba(34,211,238,.3); padding: 5px 10px; border-radius: 999px; }
  .index a:hover { background: rgba(34,211,238,.1); }
  .palettes { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 16px; margin: 24px 0 40px; }
  .palette { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 18px; }
  .palette h3 { margin: 0 0 12px; font-size: 14px; }
  .palette h3 span { font-weight: 400; opacity: .6; }
  .sw { display: flex; align-items: center; gap: 10px; padding: 4px 0; }
  .swatch { width: 34px; height: 34px; border-radius: 8px; border: 1px solid rgba(255,255,255,.15); flex: none; }
  .sw code { color: var(--muted); font-size: 11px; line-height: 1.4; }
  .card { background: var(--card); border: 1px solid var(--line); border-radius: 16px; overflow: hidden; margin-bottom: 28px; }
  .card .meta { padding: 14px 18px 12px; display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; }
  .card h2 { margin: 0; color: var(--text); text-transform: none; letter-spacing: 0; font-size: 15px; }
  .dim { color: var(--muted); font-size: 11px; font-family: monospace; }
  .frame-wrap { padding: 0 14px 14px; }
  .design-frame { width: 100%; height: 980px; border: 1px solid var(--line); border-radius: 12px; background: #05060f; }
  .frame-note { text-align: center; color: var(--muted); font-size: 11px; padding-top: 8px; }
</style>
</head>
<body>
<div class="wrap">
  <header>
    <h1>🖼️ Diseños Stitch — AOTR Values</h1>
    <p><span class="badge">Export: ${basename(outDir)}</span><span class="badge">Mode principal: ${colorMode}</span><span class="badge">${screens.length} pantalla(s) renderizadas</span></p>
  </header>

  ${nav ? `<div class="index">${nav}</div>` : ""}

  ${palettes.length ? `
  <h2>🎨 Paletas del design system (${palettes.length})</h2>
  <div class="palettes">
    ${palettes
      .map(
        (p) => `<div class="palette"><h3>${p.label} <span>· ${p.colorMode} · ${p.headline}/${p.body}</span></h3><div class="sws">${colorSwatches(p.colors)}</div></div>`
      )
      .join("\n")}
  </div>
  ` : ""}

  <h2>📱 Pantallas</h2>
  ${screens.length ? screenCards : `<p class="dim">No hay pantallas con design.html en esta carpeta.</p>`}
</div>
</body>
</html>`;

writeFileSync(join(outDir, "index.html"), html);
console.log(`✅ Galería creada: ${join(outDir, "index.html")} (${screens.length} pantallas renderizadas inline)`);
