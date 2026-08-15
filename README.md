# ⚡ AOTR Value Platform

Plataforma profesional de valores de **AOTR**: bot de Discord + web (Next.js) compartiendo la misma base de datos (Supabase/PostgreSQL via Prisma), con **dos fuentes de precio**:

- 🟢 **Oficial** — lista oficial de AOT Revolution (`data.js`), sincronizada por el bot.
- 🔵 **Trade** — API de precios de tradeo (379 items), sincronizada cada 6 h.
- 📈 **Histórico** — instantánea de precios con cada sincronización, con gráficas.

```
┌────────────────────────── aotr-value-platform ──────────────────────────┐
│  apps/bot  → Discord bot (Node.js) · Railway · cron 6h/15min sync      │
│  apps/web  → Next.js 15 + Tailwind + Three.js (3D) · Vercel            │
│  packages/db → Prisma schema + cliente compartido (Supabase)           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Stack

| Capa      | Tecnología                                   |
| --------- | -------------------------------------------- |
| Bot       | Node.js 22 · discord.js 14 · Fuse.js          |
| Web       | Next.js 15 (App Router) · React 19 · TS      |
| Diseño    | Tailwind · Framer Motion · Three.js (3D)     |
| Datos     | Supabase (PostgreSQL) · Prisma 5             |
| Hosting   | Railway (bot) · Vercel (web)                 |

---

## 🗄️ 1. Base de datos (Supabase)

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Copia `packages/db/.env.example` → `packages/db/.env` y pega la **connection string** de PostgreSQL (Project Settings → Database → Connection string).
3. Empuja el esquema:

```bash
npm install
npm run push:db        # prisma db push
```

4. (Opcional) Siembra con datos reales iniciales:

```bash
npm run seed:db
```

> Sin `DATABASE_URL`, **todo funciona igual**: la web usa el seed local
> (`apps/web/src/lib/seed/items.json`, generado con datos reales) y el bot
> corre en modo básico.

---

## 🤖 2. Bot de Discord (local y Railway)

### Comandos

| Comando                | Descripción                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| `/valor <item>`        | Valor del item (🟢 oficial + 🔵 trade) + botones 💱📈🔍            |
| `/suma a + b + c`      | Suma de items                                                      |
| `/trade X for Y`       | Comparación justa (botones para alternar fuente oficial/trade)     |
| `/similares <item> [%]`| Items con valor similar                                             |
| `/wiki <perk>`         | Wiki de perks (con autocompletado)                                 |
| `/sorteo` /participantes| Sorteos con botones (admin)                                       |
| `/config canal <#canal> <oficial\|trade>` | **Asigna canales de precios**                  |
| `/config prefijo <p> [canal]`             | **Prefijos únicos por canal**                   |
| `/sync` · `/stats`    | Sincronizar manualmente / estado del bot (admin)                   |

También funcionan con **prefijo** (`!valor`, `!trade … for …`) y en modo
*canal mágico*: en los canales configurados, cualquier mensaje se interpreta
como consulta de precios. Cada canal puede tener **su propio prefijo**.

### Local

```bash
cp apps/bot/.env.example apps/bot/.env   # pega DISCORD_TOKEN y DATABASE_URL
npm run dev:bot
```

### Railway

1. Crea un proyecto en [railway.app](https://railway.app).
2. Conecta el repo (usa el `Dockerfile` incluido, config en `railway.json`).
3. Añade las variables: `DISCORD_TOKEN`, `DATABASE_URL`,
   `EXTERNAL_SUPABASE_URL`, `EXTERNAL_SUPABASE_ANON_KEY`.
4. Deploy 🚀. El bot registra comandos y arranca la sincronización.

También puedes lanzar sincronizaciones manuales desde un cron de Railway:
`node apps/bot/scripts/manual-sync.js trade`

---

## 🌐 3. Web (Vercel)

```bash
npm run dev:web     # http://localhost:3000
npm run build:web
```

En **Vercel**: importa el repo, **Root Directory = `apps/web`**. Si defines
`DATABASE_URL` la web lee Supabase en vivo; si no, usa el seed real local
(mismas rutas, misma API).

Rutas:
- `/` — hero 3D temático (titán colosal + vapor + líneas ODM) + buscador + tendencias
- `/precios` — explorador completo (filtros, orden, modal con histórico)
- `/trade` — **comparador de trades** (la misma lógica del bot: GANAS/PIERDES/JUSTO ±10%, con precios oficiales o de tradeo y botón ✨ sugerir)
- `/historico` — subidas/caídas/volatilidad
- `/item/[slug]` — página de item con precios duales + gráfica + similares
- `/api/items`, `/api/search`, `/api/meta`

### 🎨 Temas
- **Espacio** (oscuro, por defecto) y **Rojo ceniza** (claro/cálido).
  El toggle está en la barra superior y la elección se guarda en el navegador.

### 🖼️ Imágenes de items
Cada item usa su imagen real de `https://www.aotrvalue.com` + el `emoji` de la API
(ej: `/quincyhat.png`). Si la imagen no carga o el item no tiene, se muestra un
avatar con las iniciales.

---

## 🔄 Sincronización (cómo fluye la data)

```
Google Sheets (oficial) ──► bot: syncOfficial (cada 15 min) ──► Supabase
API de tradeo (379) ──────► bot: syncTrade (cada 6 h) ────────► Supabase
                                    └─► PriceHistory (cambios) ─► Supabase
Bot lee Supabase (cache en memoria)      Web lee Supabase (o seed)
```

Regenerar el seed local con datos reales:

```bash
npm run seed:data      # apps/bot/scripts/generate-seed.mjs
```

---

## 🧪 Tests

```bash
npm test               # 24 tests (parser, calculadora, monedas, valores)
```

## 📁 Estructura

```
apps/bot/src/
  bot/        eventos, comandos, embeds, botones, estado
  core/       parser, calculadora, resolver, monedas, normalización
  data/       sheetLoader, aliases, wiki
  services/   sync (oficial+trade+histórico), tradeApi, giveaways, prefijos
apps/web/src/
  app/        páginas (home, precios, historico, item/[slug]) + rutas API
  components/ Hero3D, SearchBar, PriceExplorer, PriceChart, UI
  lib/        data-source (Prisma/seed), tipos, formato, búsqueda
packages/db/  schema.prisma + cliente + seed
```

## ⚠️ Notas

- La key externa es `anon` (solo lectura) y vive en el servidor (nunca en el cliente).
- Las imágenes de items se sirven desde `aotrvalue.com` (lazy-load + fallback a iniciales).
- El histórico de la web es determinístico (demo) hasta que el bot acumule datos reales en Supabase.
- Los precios son referenciales.
