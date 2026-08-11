#!/usr/bin/env node
/**
 * stitch/cli.mjs — Cliente MCP de Google Stitch (stitch.withgoogle.com)
 * =====================================================================
 * Habla con https://stitch.googleapis.com/mcp usando la STITCH_API_KEY
 * (se lee de la env o de apps/web/.env, sin dependencias externas).
 *
 * Comandos:
 *   node stitch/cli.mjs tools                          → lista las herramientas MCP disponibles (diagnóstico)
 *   node stitch/cli.mjs project create --name "X"      → crea un proyecto y devuelve su id
 *   node stitch/cli.mjs project list                   → lista los proyectos de la cuenta
 *   node stitch/cli.mjs project get <id>               → detalle de un proyecto (acepta id pelado o projects/<id>)
 *   node stitch/cli.mjs screen list <projectId>        → lista las pantallas de un proyecto
 *   node stitch/cli.mjs screen generate <projectId> --prompt "..." [--model GEMINI_3_PRO|GEMINI_3_FLASH] [--name "X"]
 *   node stitch/cli.mjs screen get <projectId> <screenId>
 *   node stitch/cli.mjs screen export <projectId> <screenId> [--out stitch/exports/<carpeta>]
 *                                                      → descarga imagen PNG + código HTML a la carpeta de salida
 *
 * El script normaliza los IDs: internamente todo es "projects/<id>", pero al
 * llamar generate_screen_from_text pasa el id pelado (así lo espera Google).
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, "..");
const MCP_URL = "https://stitch.googleapis.com/mcp";

/* ── API key: env primero, después apps/web/.env ───────────── */
function loadEnvFile(path) {
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[m[1]] = val;
  }
  return out;
}

function getApiKey() {
  if (process.env.STITCH_API_KEY) return process.env.STITCH_API_KEY.trim();
  const env = loadEnvFile(join(REPO_ROOT, "apps", "web", ".env"));
  if (env.STITCH_API_KEY) return env.STITCH_API_KEY.trim();
  throw new Error(
    "❌ No encontré STITCH_API_KEY.\n" +
      "   Agrégala a la env (STITCH_API_KEY=...) o a apps/web/.env (como ya la tenés).\n" +
      "   Se genera en https://stitch.withgoogle.com/settings → API Keys."
  );
}

/* ── Cliente MCP (JSON-RPC 2.0 sobre HTTP streamable) ─────── */
let sessionId = null;

async function rpc(message, { timeoutMs = 600000 } = {}) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json, text/event-stream",
    "X-Goog-Api-Key": getApiKey(),
  };
  if (sessionId) headers["Mcp-Session-Id"] = sessionId;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let res;
  try {
    res = await fetch(MCP_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(message),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timer);
    throw new Error(`❌ No pude conectar con Stitch (${err.cause?.code ?? err.message}). ¿Hay internet?`);
  }
  clearTimeout(timer);

  const session = res.headers.get("mcp-session-id");
  if (session) sessionId = session;

  const ctype = res.headers.get("content-type") ?? "";
  const raw = await res.text();

  // Respuesta SSE (event-stream): cada bloque empieza con "data: {json}"
  if (ctype.includes("text/event-stream")) {
    for (const block of raw.split("\n\n")) {
      const line = block.split("\n").find((l) => l.startsWith("data:"));
      if (!line) continue;
      return JSON.parse(line.slice(5).trim());
    }
    return {};
  }

  // Respuesta JSON directa (o vacía para notificaciones)
  if (!raw.trim()) return {};
  return JSON.parse(raw);
}

async function call(name, args) {
  const res = await rpc({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name, arguments: args } });
  if (res.error) throw new Error(`❌ Stitch devolvió error [${res.error.code}]: ${res.error.message}`);
  return res.result ?? res;
}

/** Extrae el texto útil del resultado de un tools/call (content: [{type, text|data}...]) */
function extractContent(result) {
  const parts = [];
  for (const item of result?.content ?? []) {
    if (item.type === "image") parts.push({ kind: "image", mimeType: item.mimeType, data: item.data });
    else if (item.type === "text" && item.text) parts.push({ kind: "text", text: item.text });
  }
  return parts;
}

function parseText(text) {
  try {
    return { json: JSON.parse(text) };
  } catch {
    return { json: null };
  }
}

/* ── Detección de herramientas (para adaptarse a la versión del servidor) ── */
let toolsCache = null;
async function listTools() {
  if (toolsCache) return toolsCache;
  const res = await rpc({ jsonrpc: "2.0", id: 1, method: "tools/list", params: {} });
  toolsCache = res.result?.tools ?? [];
  return toolsCache;
}

function findTool(...keywords) {
  return (tools) => {
    const lower = (t) => t.name.toLowerCase();
    for (const kw of keywords) {
      const hit = tools.find((t) => lower(t).includes(kw));
      if (hit) return hit;
    }
    return null;
  };
}

/* ── Normalización de IDs ─────────────────────────────────── */
const toFull = (id) => (String(id).startsWith("projects/") ? String(id) : `projects/${id}`);
const toBare = (id) => String(id).replace(/^projects\//, "");

/* ── Utilidades de salida ─────────────────────────────────── */
function log(msg) {
  console.log(msg);
}
function pretty(obj) {
  return JSON.stringify(obj, null, 2);
}

/* ── Comandos ─────────────────────────────────────────────── */
async function cmdTools() {
  const tools = await listTools();
  log(pretty(tools.map((t) => ({ name: t.name, description: (t.description ?? "").slice(0, 160), inputSchema: t.inputSchema ?? null }))));
}

async function cmdProjectCreate(name) {
  const tools = await listTools();
  const tool = findTool("create_project")(tools);
  if (!tool) throw new Error("❌ El servidor MCP no expone create_project.");
  const args = {};
  const schemaProps = tool.inputSchema?.properties ?? {};
  const key = Object.keys(schemaProps).find((k) => /name|title/i.test(k)) ?? "name";
  args[key] = name;

  const result = await call(tool.name, args);
  const content = extractContent(result);
  let id = null;
  for (const part of content) {
    const { json } = parseText(part.text);
    if (json) {
      log("📦 Proyecto creado:");
      log(pretty(json));
      id = json.project?.id ?? json.project_id ?? json.id ?? null;
      if (!id) id = JSON.stringify(json).match(/projects\/(\d+)/)?.[1] ?? null;
    } else {
      log(part.text);
    }
  }
  if (id) log(`\n✅ projectId (pelado): ${toBare(id)}`);
  return id ? toBare(id) : null;
}

async function cmdProjectList() {
  const tools = await listTools();
  const tool = findTool("list_projects")(tools);
  if (!tool) throw new Error("❌ El servidor MCP no expone list_projects.");
  const result = await call(tool.name, {});
  for (const part of extractContent(result)) {
    const { json } = parseText(part.text);
    log(json ? pretty(json) : part.text);
  }
}

async function cmdProjectGet(id) {
  const tools = await listTools();
  const tool = findTool("get_project")(tools);
  if (!tool) throw new Error("❌ El servidor MCP no expone get_project.");
  const schemaProps = tool.inputSchema?.properties ?? {};
  const args = {};
  if ("name" in schemaProps) args.name = toFull(id); // get_project quiere "projects/<id>"
  else {
    const key = Object.keys(schemaProps).find((k) => /project/i.test(k)) ?? "project_id";
    args[key] = toFull(id);
  }
  const result = await call(tool.name, args);
  for (const part of extractContent(result)) {
    const { json } = parseText(part.text);
    log(json ? pretty(json) : part.text);
  }
}

async function cmdScreenList(projectId) {
  const tools = await listTools();
  const tool = findTool("list_screens")(tools);
  if (!tool) throw new Error("❌ El servidor MCP no expone list_screens.");
  const schemaProps = tool.inputSchema?.properties ?? {};
  const args = {};
  // list_screens quiere el id pelado (sin projects/)
  const key = Object.keys(schemaProps).find((k) => /project/i.test(k)) ?? "projectId";
  args[key] = toBare(projectId);
  const result = await call(tool.name, args);
  for (const part of extractContent(result)) {
    const { json } = parseText(part.text);
    log(json ? pretty(json) : part.text);
  }
}

async function cmdScreenGet(projectId, screenId) {
  const tools = await listTools();
  const tool = findTool("get_screen")(tools);
  if (!tool) throw new Error("❌ El servidor MCP no expone get_screen.");
  const schemaProps = tool.inputSchema?.properties ?? {};
  const args = {};
  // get_screen quiere el name completo: projects/<p>/screens/<s> (+ campos deprecados que aun son required)
  if ("name" in schemaProps) args.name = `${toFull(projectId)}/screens/${toBare(screenId)}`;
  for (const k of Object.keys(schemaProps)) {
    if (/project/i.test(k) && !args[k]) args[k] = toBare(projectId);
    else if (/screen/i.test(k) && !args[k] && k !== "screenId") args[k] = toBare(screenId);
  }
  if ("screenId" in schemaProps) args.screenId = toBare(screenId);
  if ("projectId" in schemaProps && !args.projectId) args.projectId = toBare(projectId);
  const result = await call(tool.name, args);
  for (const part of extractContent(result)) {
    const { json } = parseText(part.text);
    log(json ? pretty(json) : part.text);
  }
}

async function cmdScreenGenerate(projectId, prompt, model, name) {
  const tools = await listTools();
  const tool = findTool("generate_screen_from_text", "generate_screen")(tools);
  if (!tool) throw new Error("❌ El servidor MCP no expone generate_screen_from_text.");
  const schemaProps = tool.inputSchema?.properties ?? {};
  const args = { prompt };
  for (const k of Object.keys(schemaProps)) {
    if (/project/i.test(k)) args[k] = toBare(projectId); // generate quiere el id pelado
    else if (/model/i.test(k) && model) args[k] = model;
    else if (/screen_name|name/i.test(k) && name) args[k] = name;
  }
  log(`🎨 Generando pantalla en Stitch (${tool.name})… (puede tardar 30-90s)`);
  const result = await call(tool.name, args);
  const content = extractContent(result);

  // Guardamos la respuesta completa (proyecto + design system) para no perder info
  mkdirSync(join(REPO_ROOT, "stitch", "prompts"), { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const rawPath = join(REPO_ROOT, "stitch", "prompts", `generate-${stamp}.json`);
  writeFileSync(rawPath, pretty({ prompt, args, result }));
  log(`📄 Respuesta completa guardada en: ${rawPath}`);

  if (content.length === 0) {
    log("⚠️ Respuesta vacía. Resultado crudo:");
    log(pretty(result));
    return;
  }
  for (const part of content) {
    const { json } = parseText(part.text);
    log(json ? pretty(json) : part.text);
  }
}

async function downloadTo(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`❌ Descarga fallida ${res.status} para ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(dest, buf);
  return dest;
}

async function cmdScreenEdit(projectId, screenIds, prompt, model) {
  const tools = await listTools();
  const tool = findTool("edit_screens")(tools);
  if (!tool) throw new Error("❌ El servidor MCP no expone edit_screens.");
  const schemaProps = tool.inputSchema?.properties ?? {};
  const args = { prompt, selectedScreenIds: screenIds.map(toBare) };
  for (const k of Object.keys(schemaProps)) {
    if (/project/i.test(k)) args[k] = toBare(projectId);
    else if (/model/i.test(k) && model) args[k] = model;
  }
  log(`✏️  Editando ${screenIds.length} pantalla(s) en Stitch… (puede tardar 30-120s)`);
  const result = await call(tool.name, args);

  // guardamos la respuesta (contiene los IDs de las pantallas nuevas/editadas)
  mkdirSync(join(REPO_ROOT, "stitch", "prompts"), { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const rawPath = join(REPO_ROOT, "stitch", "prompts", `edit-${stamp}.json`);
  writeFileSync(rawPath, pretty({ prompt, args, result }));
  log(`📄 Respuesta guardada en: ${rawPath}`);

  for (const part of extractContent(result)) {
    const { json } = parseText(part.text);
    log(json ? pretty(json) : part.text);
  }
}

async function cmdScreenVariants(projectId, screenIds, prompt, count, range) {
  const tools = await listTools();
  const tool = findTool("generate_variants")(tools);
  if (!tool) throw new Error("❌ El servidor MCP no expone generate_variants.");
  const schemaProps = tool.inputSchema?.properties ?? {};
  const args = {
    prompt,
    selectedScreenIds: screenIds.map(toBare),
    variantOptions: { variantCount: count, creativeRange: range },
  };
  for (const k of Object.keys(schemaProps)) {
    if (/project/i.test(k)) args[k] = toBare(projectId);
    else if (/model/i.test(k)) args[k] = "GEMINI_3_1_PRO";
  }
  log(`🔀 Generando ${count} variante(s) (${range})… (puede tardar 30-120s)`);
  const result = await call(tool.name, args);
  for (const part of extractContent(result)) {
    const { json } = parseText(part.text);
    log(json ? pretty(json) : part.text);
  }
}

async function cmdScreenExport(projectId, screenId, outDir) {
  mkdirSync(outDir, { recursive: true });
  const manifest = { projectId, screenId: screenId ?? null, files: [], exportedAt: new Date().toISOString() };
  const tools = await listTools();
  const projTool = findTool("get_project")(tools);
  const screenTool = findTool("get_screen")(tools);

  // 1) get_project → design system + pantallas del proyecto
  let project = null;
  if (projTool) {
    const schemaProps = projTool.inputSchema?.properties ?? {};
    const args = "name" in schemaProps ? { name: toFull(projectId) } : { project_id: toFull(projectId) };
    const result = await call(projTool.name, args);
    for (const part of extractContent(result)) {
      const { json } = parseText(part.text);
      if (json && (json.name || json.thumbnailScreenshot || json.designTheme)) project = json;
    }
  }
  if (!project) {
    log("   ⚠️ No pude leer el proyecto (get_project no devolvió JSON util).");
    return;
  }

  // 2) Design system (colores, tipografías, tokens) — insumo para montar
  if (project.designTheme) {
    const dest = join(outDir, "design-system.json");
    writeFileSync(dest, pretty(project.designTheme));
    manifest.files.push({ kind: "design-system", path: dest });
    log(`🎨   ✓ design-system.json (tokens de color/tipografía)`);
  }
  writeFileSync(join(outDir, "project.json"), pretty({ name: project.name, title: project.title, deviceType: project.deviceType, updateTime: project.updateTime }));

  // 3) Pantallas: imagen + código HTML de cada una
  const instances = (project.screenInstances ?? project.screens ?? []).filter((s) => s.type !== "DESIGN_SYSTEM_INSTANCE");
  const targets = [];
  if (screenId) {
    targets.push({ id: screenId });
  } else {
    // a) instancias del proyecto
    targets.push(...instances.map((s) => ({ id: toBare(s.sourceScreen?.split("/").pop() ?? s.id ?? s.sourceAsset ?? "") })));
    // b) fallback: screens que aparecen en las respuestas guardadas (generate-*.json) —
    //    get_project a veces no lista todas las pantallas generadas
    const promptsDir = join(REPO_ROOT, "stitch", "prompts");
    if (existsSync(promptsDir)) {
      for (const f of readdirSync(promptsDir)) {
        if (!f.startsWith("generate-")) continue;
        try {
          const d = JSON.parse(readFileSync(join(promptsDir, f), "utf8"));
          const comps = (d.result?.content ?? []).flatMap((c) => {
            try {
              return JSON.parse(c.text)?.outputComponents ?? [];
            } catch {
              return [];
            }
          });
          for (const s of comps.flatMap((c) => c.design?.screens ?? [])) {
            const id = toBare((s.name ?? "").split("/").pop());
            if (id) targets.push({ id, title: s.title });
          }
        } catch {}
      }
    }
  }
  // dedup conservando el orden
  const seen = new Set();
  const dedup = [];
  for (const t of targets) {
    if (!t.id || seen.has(t.id)) continue;
    seen.add(t.id);
    dedup.push(t);
  }
  targets.length = 0;
  targets.push(...dedup);
  writeFileSync(join(outDir, "screens.json"), pretty(instances));

  if (screenTool && targets.length) {
    for (const [i, t] of targets.entries()) {
      if (!t.id) continue;
      const schemaProps = screenTool.inputSchema?.properties ?? {};
      const args = { name: `${toFull(projectId)}/screens/${toBare(t.id)}` };
      for (const k of Object.keys(schemaProps)) {
        if (/project/i.test(k) && !args[k]) args[k] = toBare(projectId);
        else if (/screen/i.test(k) && !args[k] && k !== "screenId") args[k] = toBare(t.id);
      }
      if ("screenId" in schemaProps) args.screenId = toBare(t.id);
      if ("projectId" in schemaProps && !args.projectId) args.projectId = toBare(projectId);
      try {
        const result = await call(screenTool.name, args);
        let screen = null;
        for (const part of extractContent(result)) {
          const { json } = parseText(part.text);
          if (json && (json.screenshot || json.htmlCode || json.title)) screen = json;
        }
        if (!screen) {
          log(`   ⚠️ Pantalla ${t.id}: respuesta sin datos útiles`);
          continue;
        }
        const label = (screen.title ?? `screen-${i + 1}`).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        const dir = join(outDir, label || `screen-${i + 1}`);
        mkdirSync(dir, { recursive: true });
        if (screen.screenshot?.downloadUrl) {
          const dest = join(dir, "preview.png");
          await downloadTo(screen.screenshot.downloadUrl, dest);
          manifest.files.push({ kind: "image", path: dest, screen: t.id });
          log(`🖼️   ✓ ${dest}`);
        }
        if (screen.htmlCode?.downloadUrl) {
          const dest = join(dir, "design.html");
          await downloadTo(screen.htmlCode.downloadUrl, dest);
          manifest.files.push({ kind: "code", path: dest, screen: t.id });
          log(`💻   ✓ ${dest}`);
        }
        writeFileSync(join(dir, "screen.json"), pretty({ title: screen.title, deviceType: screen.deviceType, width: screen.width, height: screen.height, name: screen.name }));
      } catch (err) {
        log(`   ⚠️ Pantalla ${t.id}: ${err.message}`);
      }
    }
  }

  // 4) Thumbnail del proyecto (vista general)
  if (project.thumbnailScreenshot?.downloadUrl) {
    try {
      const dest = join(outDir, "preview.png");
      await downloadTo(project.thumbnailScreenshot.downloadUrl, dest);
      manifest.files.push({ kind: "thumbnail", path: dest });
      log(`🖼️   ✓ ${dest} (thumbnail del proyecto)`);
    } catch {
      /* el thumbnail es opcional */
    }
  }

  writeFileSync(join(outDir, "manifest.json"), pretty(manifest));
  log(`\n📁 Export listo en: ${outDir}`);
}

/* ── Main ─────────────────────────────────────────────────── */
function usage() {
  console.log(`
stitch/cli.mjs — cliente MCP de Google Stitch

Uso:
  node stitch/cli.mjs tools
  node stitch/cli.mjs project create --name "AOTR v3"
  node stitch/cli.mjs project list
  node stitch/cli.mjs project get <id>
  node stitch/cli.mjs screen list <projectId>
  node stitch/cli.mjs screen generate <projectId> --prompt "..." | --prompt-file stitch/prompts/x.md [--model GEMINI_3_1_PRO|GEMINI_3_FLASH] [--name "Home"]
  node stitch/cli.mjs screen get <projectId> <screenId>
  node stitch/cli.mjs screen edit <projectId> <screenId1,screenId2> --prompt "feedback..."
  node stitch/cli.mjs screen variants <projectId> <screenId1> --prompt "variar..." [--count 3] [--range EXPLORE]
  node stitch/cli.mjs screen export <projectId> [--out stitch/exports/mi-diseno]
`);
}

const [cmd, sub, ...rest] = process.argv.slice(2);

async function main() {
  const argVal = (flag) => {
    const i = rest.indexOf(flag);
    return i >= 0 && i + 1 < rest.length ? rest[i + 1] : null;
  };

  try {
    if (cmd === "tools") return await cmdTools();
    if (cmd === "project" && sub === "create") {
      return await cmdProjectCreate(argVal("--name") ?? `AOTR ${new Date().toISOString().slice(0, 10)}`);
    }
    if (cmd === "project" && sub === "list") return await cmdProjectList();
    if (cmd === "project" && sub === "get") return await cmdProjectGet(rest[0]);
    if (cmd === "screen" && sub === "list") return await cmdScreenList(rest[0]);
    if (cmd === "screen" && sub === "generate") {
      const projectId = rest[0];
      let prompt = argVal("--prompt");
      const promptFile = argVal("--prompt-file");
      if (promptFile) {
        if (!existsSync(promptFile)) throw new Error(`No existe el archivo de prompt: ${promptFile}`);
        prompt = readFileSync(promptFile, "utf8").trim();
      }
      if (!projectId || !prompt) throw new Error('screen generate <projectId> --prompt "..." | --prompt-file <archivo>');
      return await cmdScreenGenerate(projectId, prompt, argVal("--model") ?? "GEMINI_3_1_PRO", argVal("--name"));
    }
    if (cmd === "screen" && sub === "get") return await cmdScreenGet(rest[0], rest[1]);
    if (cmd === "screen" && sub === "export") {
      // argumentos posicionales sin flags ni sus valores
      const positional = [];
      for (let i = 0; i < rest.length; i++) {
        if (rest[i].startsWith("--")) {
          i++;
          continue;
        }
        positional.push(rest[i]);
      }
      const projectId = positional[0];
      const screenId = positional[1] ?? null;
      const out = argVal("--out") ?? join(REPO_ROOT, "stitch", "exports", `project-${toBare(projectId)}`);
      if (!projectId) throw new Error("screen export <projectId> [--out dir]");
      return await cmdScreenExport(projectId, screenId, out);
    }
    if (cmd === "screen" && sub === "edit") {
      const positional = [];
      for (let i = 0; i < rest.length; i++) {
        if (rest[i].startsWith("--")) {
          i++;
          continue;
        }
        positional.push(rest[i]);
      }
      const projectId = positional[0];
      const ids = (positional[1] ?? "").split(",").filter(Boolean);
      const prompt = argVal("--prompt");
      if (!projectId || !ids.length || !prompt) throw new Error('screen edit <projectId> <screenId1,screenId2> --prompt "feedback..."');
      return await cmdScreenEdit(projectId, ids, prompt, argVal("--model"));
    }
    if (cmd === "screen" && sub === "variants") {
      const positional = [];
      for (let i = 0; i < rest.length; i++) {
        if (rest[i].startsWith("--")) {
          i++;
          continue;
        }
        positional.push(rest[i]);
      }
      const projectId = positional[0];
      const ids = (positional[1] ?? "").split(",").filter(Boolean);
      const prompt = argVal("--prompt") ?? "Generate visual variants";
      if (!projectId || !ids.length) throw new Error("screen variants <projectId> <screenId1,screenId2> [--prompt \"...\"] [--count N] [--range REFINE|EXPLORE|REIMAGINE]");
      const count = Math.min(5, Math.max(1, Number(argVal("--count") ?? 3)));
      const range = argVal("--range") ?? "EXPLORE";
      return await cmdScreenVariants(projectId, ids, prompt, count, range);
    }
    usage();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

main();
