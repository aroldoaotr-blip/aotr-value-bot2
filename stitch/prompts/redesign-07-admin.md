Design the ADMIN PANEL PAGE ("/administrador") of "AOTR Values", a premium trading-price platform for the game "Attack on Titan Revolution" (Roblox). Desktop 1440px, high-fidelity. Same design system as the approved home: deep-space dark theme, lavender primary (#cfbcff) and gold accents (#e7c365), surface #141218, glassmorphism, 3D depth, subtle animated grid, Space Grotesk headings, Inter body, JetBrains Mono data.

## CONTEXT
Admin-only page. The admin configures the conversion rates that normalize prices across the platform (web + bot): 1 VIZARD = 900 keys (editable), 1 PERGAMINO = 3 keys (editable). There's also a button to force-sync the 2 price lists (official sheet + trade API) and a log of the last 30 syncs.

## LAYOUT (top to bottom)
1. Compact admin navbar (logo, links, logout button "Salir").
2. Header: title "Administración de tasas" + subtitle + logout.
3. TWO RATE CARDS side by side: "1 VIZARD =" with input (e.g. 900) + "llaves" suffix, and "1 PERGAMINO =" with input (e.g. 3) + "llaves" suffix. Each shows a derived hint (e.g. "≈ 300 pergaminos" / "1 llave = 0.3333 pergaminos"). Editable inputs with glow focus.
4. LIVE EXAMPLE strip: a small glass bar showing "Item de 2 viz → 🔑 1.800 · 📜 600" updating as the inputs change (animated).
5. ACTIONS: primary button "💾 Guardar tasas" + secondary "↻ Restaurar por defecto (900 / 3)".
6. SYNC PANEL: "Sincronización de precios" — description, big teal/cyan button "Forzar actualización de las 2 listas" (with loading state), and a "Últimas actualizaciones" list (max 30, ~10 visible with scroll) — each row: source badge (🟢 Oficial / 🔵 Tradeo), item count, relative time, ✓ ok / ✗ error. Retention note "se conservan las últimas 30".
7. Footer.

## STYLE
Dark sci-fi admin: dense but elegant, glass panels, glow accents, animated loading state on the sync button, high legibility. Feels like a command console, not a boring dashboard.

## RULES
- ALL UI text in SPANISH.
- Numbers with thousand separators (1.800).
