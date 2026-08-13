# 🧵 Skill portable: Diseñar con Stitch

Skill de diseño/rediseño con **Google Stitch** (stitch.withgoogle.com) lista para
copiar a **cualquier proyecto**. Sin dependencias npm — solo Node + fetch.

## Contenido

```
stitch/
├── SKILL.md            ← disparadores ("diseña con stitch") y el flujo completo
├── cli.mjs             ← CLI: create_project, generate, edit, export
├── preview.mjs         ← genera la galería de previews autocontenida (HTML)
├── context.md          ← ⚠️ PLANTILLA — completala con la identidad de TU proyecto
└── context-aotr-example.md  ← ejemplo real (AOTR Values) para usar de referencia
```

## Cómo instalarla en un proyecto nuevo

1. **Copiá la carpeta `stitch/`** a la raíz del proyecto:
   ```bash
   cp -r stitch/ /ruta/al/otro/proyecto/
   ```

2. **Configurá la API key** — `cli.mjs` busca `STITCH_API_KEY` en este orden:
   - Variable de entorno: `export STITCH_API_KEY="tu-key"`
   - O el archivo `apps/web/.env` del proyecto (si no existe, ajustá el path en
     `cli.mjs`, función `getApiKey`, línea ~50).

3. **Completá `context.md`** (la plantilla): reemplazá cada `[CORCHETE]` con los
   datos reales de tu proyecto — nombre, stack, las 2 paletas de temas, páginas y
   las reglas de funcionalidad que hay que conservar. Sin esto, Stitch diseña
   genérico o con la identidad del ejemplo. Usá `context-aotr-example.md` como
   referencia de cómo se ve un contexto completo.

4. **Usala en el chat del proyecto**: decile al agente **"diseña con stitch"** o
   **"rediseña con stitch"**. El agente lee `SKILL.md`, enriquece tu prompt con
   `context.md`, genera en Stitch, exporta a `stitch/exports/`, te muestra la
   galería en el Preview y espera tu aprobación antes de montar el diseño en la app.

## Comandos del CLI (si querés usarlo a mano)

```bash
# Generar una pantalla desde un prompt
node stitch/cli.mjs generate "prompt..." 

# Editar una pantalla existente (id de la respuesta de generate)
node stitch/cli.mjs edit <screenId> "cambio..."

# Exportar todas las pantallas del proyecto (PNG + HTML + design-system)
node stitch/cli.mjs export

# Reconstruir la galería de previews autocontenida
node stitch/preview.mjs
```

## Notas

- El proyecto se guarda bajo el id que devuelve `create_project` (persistido en
  `stitch/projects.json`); reutilizás la misma instancia entre sesiones.
- Los artefactos de `exports/` y `prompts/` se generan al usar la skill — se pueden
  borrar sin afectar nada.
- La key de Stitch se obtiene en stitch.withgoogle.com → API / Generate API key.
