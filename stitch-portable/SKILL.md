# 🧵 Skill: Diseñar con Stitch

> **Disparadores**: cuando el usuario diga **"diseña con stitch"**, **"rediseña con stitch"**,
> **"hazme un diseño con stitch"**, o mencione **stitch** pidiendo diseño/rediseño
> (incluida la página o la paleta de temas).

Stitch = **Google Stitch** (stitch.withgoogle.com): genera UI de alta fidelidad
desde prompts de texto vía API MCP. La key vive en `apps/web/.env` como `STITCH_API_KEY`.

---

## 🔁 El flujo (resumen)

```
prompt corto del usuario
   → 1. ENRIQUECER con el contexto de stitch/context.md
   → 2. GENERAR en Stitch (create_project + generate_screen_from_text)
   → 3. EXPORTAR a stitch/exports/ (PNG + HTML + design-system.json)
   → 4. PREVIEW (registrar el HTML en el Preview tab / mostrar el PNG)
   → 5. APROBACIÓN del usuario
         ├─ aprobado → 6. MONTAR en la app (Next.js/Tailwind, los 2 temas)
         └─ rechazado → iterar (edit_screens / generate_variants con el feedback)
```

---

## 📋 Paso 1 — Enriquecer el prompt del usuario

Siempre completar el prompt con estructura `[Contexto][Layout][Componentes][Estilo]`,
usando `stitch/context.md` como fuente de verdad. Plantilla:

```text
Design the <PÁGINA/COMPONENTE> of "AOTR Values", a trading-price platform for the game
"Attack on Titan Revolution". <DEVICE: Desktop 1440px | Mobile 390px>.

CONTEXT: <qué hace la página, para quién, qué listas de precios muestra (Oficial 🟢 / Tradeo 🔵),
los 3 precios por item (🔑 llaves, 📜 pergaminos, 🎭 vizard)>

LAYOUT: <estructura de arriba a abajo, jerarquía visual, densidad>

COMPONENTS: <componentes reales que debe contener, con sus estados — p. ej. toggle Oficial|Tradeo,
buscador con preview, cards de items, gráfica, footer>

STYLE: <tema(s): "Espacio" dark (#05060f, indigo #6366f1, cyan #22d3ee, glow neon, glassmorphism,
grid 3D animada, Orbitron para títulos) y/o "Ceniza" claro cálido (#faf6f0, rojo #dc2626,
naranja #f59e0b)> — respetar los hex exactos de context.md.

RULES: <texto de UI en español, legibilidad en ambos temas, sin relleno genérico (lorem/placeholder)>
```

Reglas de oro:
- **Especificidad**: hex, componentes con nombre, estados (hover/focus/activo), dimensiones.
  Stitch produce mucho mejor con detalles concretos que con adjetivos vagos.
- **Una pantalla por generación**. Para rediseños de varias páginas: un proyecto por rediseño,
  y generar cada pantalla en ese proyecto (comparten design system → consistencia).
- **Modelo**: `GEMINI_3_1_PRO` (calidad) por defecto; `GEMINI_3_FLASH` para iteraciones rápidas
  o borradores. `GEMINI_3_PRO` está **deprecado**, no usarlo.
- **Quota**: ~350 gen Flash / ~50 Pro al mes. No regenerar desde cero para iterar:
  usar `edit_screens` (editar con texto) o `generate_variants` (variantes).

---

## 🔧 Paso 2 — Generar en Stitch (CLI)

```bash
# 1) Crear proyecto (una vez por rediseño; el id queda guardado en la salida)
node stitch/cli.mjs project create --name "AOTR v4 — rediseño"

# 2) Ver proyectos y pantallas existentes (si ya existe, reusar el proyecto)
node stitch/cli.mjs project list
node stitch/cli.mjs screen list <projectId>

# 3) Generar la pantalla (prompt ya enriquecido)
node stitch/cli.mjs screen generate <projectId> \
  --prompt "<prompt enriquecido>" \
  --model GEMINI_3_1_PRO

# La respuesta completa (proyecto + design system) queda en stitch/prompts/generate-<fecha>.json
```

### Trampas de IDs (muy importantes)

| Tool | Formato de ID |
|---|---|
| `create_project` | arg `title` (nombre) |
| `get_project` / `delete_project` | `name: "projects/<id>"` |
| `list_screens` / `generate_screen_from_text` / `edit_screens` / `generate_variants` | `projectId` **pelado** (sin `projects/`) |
| `get_screen` | `name: "projects/<p>/screens/<s>"` (más `projectId`/`screenId` deprecados pero required) |

### Iterar (sin gastar generaciones nuevas desde cero)

```bash
# Editar pantallas existentes con texto (feedback del usuario)
node stitch/cli.mjs screen edit <projectId> <screenId1,screenId2> --prompt "feedback..."

# Variantes (1-5) de una pantalla
node stitch/cli.mjs screen variants <projectId> <screenId> --prompt "variar..." --count 3 --range EXPLORE
```

Los schemas de todos los tools están en `node stitch/cli.mjs tools` si se necesita
invocar algo directamente.

---

## 📦 Paso 3 — Exportar a stitch/exports/

```bash
node stitch/cli.mjs screen export <projectId> --out stitch/exports/<nombre-del-rediseno>
```

Genera:

```
stitch/exports/<nombre>/
├── preview.png                  ← thumbnail del proyecto (vista general)
├── design-system.json           ← tokens de color/tipografía (insumo para montar)
├── screens.json                 ← instancias de pantallas
├── manifest.json                ← índice de archivos
└── <slug-de-pantalla>/
    ├── preview.png              ← imagen PNG del diseño (alta resolución)
    ├── design.html              ← HTML/CSS completo generado por Stitch (autocontenido)
    └── screen.json              ← metadata (título, dispositivo, dimensiones)
```

Nota: en esta versión de la API los exports se obtienen vía `get_project` /
`get_screen` (`screenshot.downloadUrl` + `htmlCode.downloadUrl`), no hay tools de
export directas. El CLI ya lo maneja.

---

## 👀 Paso 4 — Preview y aprobación

1. **Preview del HTML**: registrar `stitch/exports/<nombre>/<slug>/design.html` con
   `register_preview` (htmlPath) — se ve en el Preview tab, renderiza solo.
2. **O captura**: `preview_screenshot` del diseño renderizado y mostrarlo.
3. Describir al usuario qué trae el diseño y **preguntar aprobación**.
   - Aprobado → Paso 5.
   - Rechazado → tomar el feedback, convertirlo en prompt de iteración, volver a
     Paso 2-iterar (editar o variantes). **No regenerar desde cero.**

---

## 🚀 Paso 5 — Montar en la app (solo si el usuario aprueba)

1. Leer `design-system.json` + `design.html` exportados.
2. Convertir a componentes **Next.js 15 + Tailwind** en `apps/web/src/components/` o
   `apps/web/src/app/<ruta>/`.
3. Adaptar a los **2 temas**: usar los tokens CSS existentes (ver `context.md`);
   el tema ceniza se activa con `[data-theme="ember"]` en `globals.css`.
4. Respetar las reglas de diseño (context.md § "Reglas de diseño").
5. Validar: `cd apps/web && npx tsc --noEmit` y correr el dev server para revisar
   en vivo (ambos temas, desktop y mobile).
6. Reportar al usuario qué se montó y cómo probarlo.

---

## 🆘 Troubleshooting

| Problema | Solución |
|---|---|
| `No encontré STITCH_API_KEY` | Está en `apps/web/.env` (`STITCH_API_KEY="..."`); si no, generarla en stitch.withgoogle.com/settings |
| `Invalid argument` en get_screen | Enviar `name` completo + `projectId`/`screenId` pelados (los 3 campos) |
| `generate` tarda | Es normal (30-120s). El CLI espera hasta 10 min |
| Pantalla "sin datos útiles" | Revisar si el proyecto tiene screenInstances; exportar el proyecto entero (no una screen) |
| Quota agotada | Iterar con `edit_screens`/variantes en vez de generar; avisar al usuario del límite mensual |
| El diseño no respeta el tema | Reforzar los hex exactos en el prompt (context.md los tiene) |

---

## ✅ Checklist rápido antes de entregar

- [ ] Prompt enriquecido con contexto real (página + componentes + paleta)
- [ ] Generado con el modelo correcto (PRO para entrega, FLASH para iterar)
- [ ] Exportado a `stitch/exports/` con imagen + HTML + design-system
- [ ] Preview mostrado y **aprobado por el usuario**
- [ ] Montado con los 2 temas y validado (typecheck + preview en vivo)
