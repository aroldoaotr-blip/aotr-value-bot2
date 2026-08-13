# 🎯 AOTR Values — Contexto del proyecto para prompts de Stitch

Este archivo es la **fuente de verdad** que se inyecta en los prompts de Stitch.
Cada vez que se pida un diseño/rediseño, completar el prompt del usuario con
esta información (o la parte relevante a la página objetivo).

---

## Qué es la app

**AOTR Values** — plataforma de **precios de trading** para el juego *Attack on
Titan Revolution* (Roblox). Muestra precios de ítems en 3 monedas (🔑 llaves,
📜 pergaminos, 🎭 vizard) desde **2 fuentes**:

- 🟢 **Oficial** (hoja de Google oficial de AOTR, ~398 ítems)
- 🔵 **Tradeo** (API externa de valores, ~379 ítems)

Los precios se sincronizan cada 30 min a una BD (Supabase/Postgres con Prisma).
El usuario puede cambiar entre listas con un **toggle Oficial | Tradeo** global,
y entre 2 temas visuales: **Espacio** (oscuro) y **Ceniza** (claro cálido).

UI en **español**. Íconos de ítems: imágenes de `https://www.aotrvalue.com/<emoji>.png`.

---

## Stack (para que el diseño sea adaptable)

- **Next.js 15** (App Router) + **TypeScript** + **Tailwind CSS**
- Fuentes: **Space Grotesk** (títulos/display) + **Inter** (cuerpo) + **JetBrains Mono** (datos) — cargadas desde Google Fonts
- Efectos: glassmorphism (`backdrop-blur`), **glow lavanda** (`box-shadow` con color de acento),
  gradientes de texto, grid 3D animada (Hero3D con video de AoT), partículas flotantes,
  animaciones suaves (`float`, `pulse-glow`, `shimmer`)
- Las clases usan `data-theme="ember"` en `<html>` para el tema claro (ceniza)
- Identidad dual: `.text-lavender` (lavanda en oscuro ↔ ember red en claro), `text-gradient`,
  `.orb`, `.gradient-border` cambian de paleta según el tema
- Componentes: Server/Client components de React, Tailwind con tokens CSS

---

## 🎨 Tema 1 — "ESPACIO" (oscuro, por defecto) — REDISEÑO v4

| Token | Hex |
|---|---|
| Fondo base | `#141218` (negro violeta) |
| Fondo suave / navbar | `#0f0d13` / `#1d1b20` |
| Superficies (cards) | `#211f24` / `#2b292f` / `#36343a` |
| Acento principal (lavanda) | `#cfbcff` |
| Acento secundario (dorado) | `#e7c365` |
| Violeta profundo (botones) | `#6750a4` / `#4f378a` |
| 🟢 Precios oficiales | `#22c55e` |
| 🔵 Precios tradeo | `#3b82f6` |
| Rosa (rareza legendaria) | `#f43f5e` |
| Texto principal | `#e6e0e9` |
| Texto secundario | `#948e9c` |

- **Fondo del body**: radial-gradients lavanda `rgba(207,188,255,0.14)`, dorado
  `rgba(231,195,101,0.07)` y violeta `rgba(103,80,164,0.16)` sobre `#141218`, fijos.
- **Gradiente de texto** (`text-gradient`): `#e0d2ff → #cfbcff 45% → #e7c365`.
- **Orb (logo)**: radial `#e9ddff → #cfbcff 45% → #6750a4` con glow `rgba(207,188,255,0.7)`.
- **Glass**: `bg-white/[0.04]`, borde `white/[0.09]`, `backdrop-blur-xl`.
- **Glow de cards** (`shadow-glow`): `0 0 40px -8px rgba(207,188,255,0.35)`.
- **Scrollbar**: gradiente `#6750a4 → #4f378a`.
- **Animaciones**: `float` (7s/12s), `spin-slow` (24s), `pulse-glow` (4s), `shimmer` (2.5s).
- Los hex viejos hardcodeados (`#05060f`, `#0b0d1f`, `#07081a`, `#111430`) se remapean en CSS.

## 🎨 Tema 2 — "CENIZA" (rojo ceniza ember, claro/cálido) — REDISEÑO v4

Se activa con `<html data-theme="ember">`.

| Token | Hex |
|---|---|
| Tinta (texto fuerte) | `#1e1b19` |
| Tinta suave | `#5c403c` |
| Superficie (fondo) | `#fff8f5` |
| Superficie baja | `#faf2ee` |
| Superficie 2 (cards) | `#f4ece8` / `#eee7e3` |
| Líneas/bordes | `rgba(30,27,25,0.12)` |
| Rojo ember (primario) | `#dc2626` / `#b70011` |
| Naranja quemado | `#ea580c` |
| Dorado cálido | `#e7c365` |

- **Fondo del body**: radial-gradients rojo `rgba(220,38,38,0.1)`, naranja
  `rgba(234,88,12,0.07)` y dorado `rgba(231,195,101,0.1)` sobre `#fff8f5`.
- **Gradiente de texto** (`text-gradient` ceniza): `#dc2626 → #ea580c 45% → #e7c365`.
- **Bordes degradados** (`gradient-border`): `rgba(220,38,38,0.55) → rgba(234,88,12,0.4) → rgba(231,195,101,0.5)`.
- **Orb (logo) ceniza**: radial `#ffb4ab → #dc2626 45% → #93000b` con glow `rgba(220,38,38,0.6)`.
- **Identidad dual**: `.text-lavender` = `#cfbcff` en oscuro ↔ `#b70011` en ceniza; `.text-gold` ↔ `#b45309`.
- **Glass ceniza**: superficie `#fff8f5` al 72-92% translúcida, borde tinta al 12-14%.
- Los botones con **gradiente mantienen texto blanco** (regla fija del tema).
- El texto sobre fondos oscuros NO se sobrescribe (se mantiene oscuro).

---

## 📄 Páginas (rutas de la app)

| Ruta | Página | Elementos clave |
|---|---|---|
| `/` | **Home** | Hero con **video de fondo + grid 3D animada** (líneas móviles, cuadros flotantes), título con gradiente, **buscador** con preview del item (icono + nombre + valor de la lista activa), stats animadas, top movers, "cómo funciona" (2 scripts / 2 listas / 2 históricos) |
| `/precios` | **Explorador de precios** | **Toggle Oficial|Tradeo arriba de todo**, buscador + filtro por categoría (deslizable), grid/tabla de items con **los 3 precios** (🔑📜🎭), demanda, tendencia, orden por valor de la lista activa |
| `/item/[slug]` | **Detalle de item** | Las **2 tarjetas** (oficial y tradeo) con la lista activa resaltada, los 3 precios, demanda, rareza, taxes 💎🪙, gráfico de histórico |
| `/trade` | **Comparador** | "Tu oferta" vs "Mi oferta", diferencia, ¿justo/ganas/pierdes?, sincronizado con el toggle global |
| `/historico` | **Histórico** | Gráficas de precios a lo largo del tiempo (PriceChart), filtros |
| `/administrador` | **Admin** (login propio) | Tasas de conversión (1 viz = 900 llaves, 1 pergamino = 3 llaves), botón "Forzar actualización de las 2 listas", lista de últimas 30 syncs |
| `/test` | **Laboratorio** | Comparación de datos: items del excel vs items de la API, arquitectura de BD |
| `/admin` | alias → `/administrador` | — |

## 🧩 Componentes compartidos

`Navbar` (logo orb + links + toggle lista + toggle tema + indicador de último sync) · `Footer`
(links de páginas + info) · `Hero`/`Hero3D` (video + grid + partículas) · `SplashScreen`
(loader de carga con barra) · `SearchBar` (dropdown con límite, letras según tema) ·
`PriceExplorer` (toggle + filtros + grid/tabla) · `CompareTool` · `PriceChart` (Sparkline) ·
`DemandBar` (barra ▰▰▰▰▱▱) · `StatCards` · `TopMovers` · `ItemSourcePanel` ·
`Badges` (rareza) · `Reveal` (animación al hacer scroll) · `Avatar` · `Providers` (contextos).

## ⚠️ Reglas de diseño que hay que respetar siempre

1. **Los 2 temas deben verse bien** — el diseño debe contemplar variante oscura y clara cálida.
2. **Texto legible en ambos temas** (el bug recurrente es texto claro sobre fondo claro).
3. **Los 3 precios por item siempre visibles** (llaves, pergaminos, vizard).
4. **Toggle Oficial|Tradeo presente** en navbar y /precios.
5. **Estética**: sci-fi espacial con glow, glassmorphism, grid 3D, pero sin sacrificar legibilidad.
6. Íconos/emoji de items: `https://www.aotrvalue.com/<emoji>.png`.
7. Todo el texto de UI en **español**.
