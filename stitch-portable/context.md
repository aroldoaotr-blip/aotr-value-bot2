# 🎯 [NOMBRE DEL PROYECTO] — Contexto del proyecto para prompts de Stitch

> ⚠️ **PLANTILLA** — completá TODAS las secciones con `[CORCHETES]` con los datos
> reales de TU proyecto antes de usar la skill. Este archivo es la fuente de verdad
> que se inyecta en los prompts de Stitch: si no lo completás, los diseños saldrán
> genéricos o con la identidad del proyecto de ejemplo.
> (Referencia completa de ejemplo en `context-aotr-example.md`.)

---

## Qué es la app

**[NOMBRE]** — [en una línea: qué hace y para quién].

- [Característica 1 clave]
- [Característica 2 clave]
- [Característica 3 clave]

Idioma de la UI: **[español / inglés / …]**. Público: [quiénes lo usan].

---

## Stack (para que el diseño sea adaptable)

- **[Framework]** (Next.js 15 / Vite / …) + **[Lenguaje]** + **[CSS]** (Tailwind / …)
- Fuentes: **[título/display]** + **[cuerpo]** + **[datos/mono]** — cargadas desde [Google Fonts / local]
- Efectos visuales que ya usa el proyecto: [glassmorphism, glows, gradientes, 3D, partículas…]
- Temas: [cómo se cambia el tema claro/oscuro — ej: `data-theme` en `<html>`]
- Componentes/patrones propios: [componentes clave a conservar]

---

## 🎨 Tema 1 — "[NOMBRE TEMA OSCURO]" (oscuro, por defecto)

| Token | Hex |
|---|---|
| Fondo base | `#000000` ← completá |
| Fondo suave / navbar | `#000000` |
| Superficies (cards) | `#000000` |
| Acento principal | `#000000` |
| Acento secundario | `#000000` |
| Texto principal | `#000000` |
| Texto secundario | `#000000` |
| [Color de éxito/positivo] | `#000000` |
| [Color de error/negativo] | `#000000` |

- **Fondo del body**: [gradientes/efectos del fondo oscuro]
- **Gradiente de texto** (`text-gradient`): [de → a]
- **Glass**: [ej: `bg-white/[0.04]`, borde, `backdrop-blur-xl`]
- **Animaciones**: [float, glow, shimmer… con duraciones]

## 🎨 Tema 2 — "[NOMBRE TEMA CLARO]" (claro/cálido)

| Token | Hex |
|---|---|
| Tinta (texto fuerte) | `#000000` |
| Tinta suave | `#000000` |
| Superficie (fondo) | `#000000` |
| Superficie 2 (cards) | `#000000` |
| Líneas/bordes | `rgba(0,0,0,0.12)` |
| Primario | `#000000` |
| Secundario | `#000000` |
| [Color de éxito/positivo] | `#000000` |

- **Fondo del body**: [gradientes del tema claro]
- **Gradiente de texto**: [de → a]
- **Reglas especiales**: [ej: texto sobre fondos oscuros NO se sobreescribe]

---

## 📄 Páginas / pantallas (para que Stitch diseñe el sistema completo)

| Ruta | Qué muestra | Notas |
|---|---|---|
| `/` | [home: qué tiene] | |
| `/precios` | [listado de precios] | |
| `/[item]` | [detalle] | |
| `/comparar` | [comparador] | |
| `/admin` | [panel] | |

---

## ✅ Reglas de montaje (lo que la skill debe conservar SIEMPRE)

- [Funcionalidad crítica 1 — ej: el toggle entre listas]
- [Funcionalidad crítica 2 — ej: los datos reales de la API]
- [Funcionalidad crítica 3 — ej: los 2 temas funcionando con tokens]
- Solo se rediseña la capa visual; el "motor" (datos, lógica, estado) NO se toca.
- Los diseños de Stitch se exportan a `stitch/exports/` y se muestran en el Preview
  para aprobación ANTES de montar.
