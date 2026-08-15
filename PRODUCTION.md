# 🚀 Guía de producción — AOTR Value Platform

Despliegue completo del **bot de Discord** (Railway) y la **web** (Vercel) contra la misma
base de datos **Supabase (PostgreSQL)**.

---

## 1. Cómo fluyen los precios (para entender qué se actualiza)

```
Lista oficial AOT Revolution ──┐
                    ├──> Bot de Discord (Railway) ──sync cada 30 min──> Supabase ──> Web (Vercel)
API de tradeo ──────┘                                                    ▲
                                                          (la web lee de la BD, caché ≤ 5 min)
```

- El **bot** sincroniza **ambos orígenes** (lista oficial + API de tradeo) a la BD **cada
  30 minutos** por defecto (`SYNC_OFFICIAL_MINUTES=30` y `SYNC_TRADE_MINUTES=30`) y también
  al arrancar (`SYNC_ON_BOOT=true`).
- La **web** lee de Supabase y refresca su caché cada ≤5 min (`revalidate` + TTL interno).
  ⇒ **Los precios en la web y en el bot quedan actualizados cada 30 minutos** (la web refleja
  el sync con hasta 5 min de retraso por su caché).
- La BD tiene **2 listas de precios independientes** (`OfficialPrice` de la lista oficial y `TradePrice` de la API),
cada una con **su propio histórico** (`OfficialPriceHistory` con las 3 monedas y `TradePriceHistory` con viz),
registrado en cada sync y limpio a los 60 días (alineado con lo que muestra la web). Las listas solo
comparten el `id = stableId(nombre)` (join) y la imagen (emoji de la API → item oficial en la web).
- El **valor de las monedas** (1 viz = 900.9 llaves, 1 pergamino = 3 llaves) vive en la tabla
  `RateConfig` y se edita desde `/administrador` (afecta a bot + web al instante).

---

## 2. Requisitos previos

- [ ] Repo subido a GitHub (git push).
- [ ] Base de datos **Supabase** creada (Project → Settings → Database → Connection string).
- [ ] Dos URL de conexión de Supabase:
  - `DATABASE_URL` → **pooler de transacción** (puerto 5432, `...pooler.supabase.com:5432`).
  - `DIRECT_URL` → conexión directa (puerto 5432 sin pooler, para migraciones).
- [ ] **Token del bot de Discord** (https://discord.com/developers/applications → tu app →
      Bot → Reset Token). Activa `MESSAGE CONTENT INTENT` en la pestaña Bot.

> La API externa de tradeo y la lista oficial ya vienen configuradas por código
> (no requieren variables), pero puedes sobrescribirlas con `EXTERNAL_SUPABASE_URL`,
> `EXTERNAL_SUPABASE_ANON_KEY` y `OFFICIAL_DATA_URL`.

---

## 3. Desplegar el bot en Railway

1. En Railway → **New Project** → **Deploy from GitHub repo** → selecciona el repo.
2. Railway detecta `railway.json` (build con `apps/bot/Dockerfile`, restart automático).
3. Configura el servicio para que use ese Dockerfile (si no lo detecta solo:
   Build → Dockerfile → `apps/bot/Dockerfile`).
4. En **Variables**, agrega:

   | Variable | Ejemplo / valor |
   |---|---|
   | `DISCORD_TOKEN` | el token real de tu bot |
   | `DATABASE_URL` | `postgresql://postgres.xxxx:password@aws-0-xxx.pooler.supabase.com:5432/postgres` |
   | `DIRECT_URL` | la conexión directa de Supabase |
   | `EXTERNAL_SUPABASE_URL` | `https://kcxzghpcfobpnlvlvtib.supabase.co` (opcional) |
   | `EXTERNAL_SUPABASE_ANON_KEY` | la anon key pública (opcional) |
   | `SYNC_OFFICIAL_MINUTES` | `30` |
   | `SYNC_TRADE_MINUTES` | `30` |
   | `SYNC_ON_BOOT` | `true` |

5. **Deploy**. En los logs deberías ver:
   ```
   ✅ Bot conectado como AOTR Values#0000
   🗄️  Base de datos conectada
   🟢 Cache oficial: N items
   🔵 Cache trade: N items (1 viz = 900.9 llaves)
   🔄 Sync oficial cada 30 min · Sync trade cada 30 min
   🎉 Bot listo.
   ```

> Si la BD aún no tiene tablas, ejecútalas antes (una vez, local o en Railway):
> ```bash
> npm run generate:db
> cd apps/bot && set -a && . ./.env && set +a && cd ../.. && \
>   npx prisma db push --schema packages/db/prisma/schema.prisma
> cd apps/bot && node scripts/manual-sync.js all
> ```

---

## 4. Desplegar la web en Vercel

1. En Vercel → **Add New Project** → importa el repo.
2. **Root Directory**: `apps/web` (la web vive ahí; el resto es monorepo).
3. **Framework**: Next.js (se autodetecta; `build = next build`, `start = next start`).
4. En **Environment Variables**, agrega:

   | Variable | Valor |
   |---|---|
   | `DATABASE_URL` | la misma de Supabase (pooler) |
   | `DIRECT_URL` | la conexión directa |
   | `ADMIN_USER` | usuario admin de la web (obligatorio en prod) |
   | `ADMIN_PASSWORD` | contraseña admin (obligatorio) |
   | `AUTH_SECRET` | secreto largo y aleatorio para firmar sesiones (obligatorio) |

   > Sin `ADMIN_USER`/`ADMIN_PASSWORD`/`AUTH_SECRET` la auth del panel **falla a propósito**
   > (no hay fallbacks en producción).

5. **Deploy**. Verifica:
   - `https://tu-dominio/` → home con hero y buscador.
   - `https://tu-dominio/precios` → items con las dos listas de precios (oficial ≈ 398 · trade ≈ 379).
   - `https://tu-dominio/item/12-fps` → detalle con datos oficiales + API.
   - `https://tu-dominio/admin` → redirige al login.

---

## 5. Después del primer deploy (verificaciones)

```bash
# 1) La BD responde desde fuera (bot y web usan la misma)
curl https://tu-dominio/api/rates
# → {"rates":{"keysPerVizard":900.9,"keysPerScroll":3},"persisted":true}

# 2) El bot responde en Discord
!valor susano        # o el prefijo configurado
!sync                # sincronización manual (ambos orígenes)
!stats               # conteos y estado de la BD
```

- **Cambiar el valor del viz/scroll**: `/administrador` → guarda → se aplica a bot + web
  (se escribe en `RateConfig`).
- **Forzar sync desde el admin**: `/administrador` → botón **"Forzar actualización de las 2 listas"**
  → ejecuta los mismos scripts del bot (`POST /api/sync`, hasta 300s). Funciona aunque el bot esté caído.
- **Ver últimas actualizaciones**: el admin muestra las últimas 30 sincronizaciones
  (`SyncLog` — bot + web las escriben; se borran las más viejas automáticamente).

---

## 6. Operación diaria y solución de problemas

| Problema | Causa probable | Fix |
|---|---|---|
| La web muestra el seed (no la BD) | `DATABASE_URL` mal puesta o tablas ausentes | Revisar env de Vercel; correr `db push` + sync |
| Admin: "No se pudo guardar en la BD" + "Sin base de datos configurada" en Vercel | Vercel NO incluye el motor binario de Prisma en las funciones serverless (output custom) — build-time conecta, runtime falla | `outputFileTracingIncludes: { "/*": ["../../packages/db/generated/libquery_engine-*.so.node"] }` en `apps/web/next.config.mjs` + `prebuild` con `prisma generate` |
| El bot no conecta | `DISCORD_TOKEN` inválido o faltan intents | Resetear token; activar Message Content Intent |
| `prisma:error table ... does not exist` | BD vacía | `prisma db push` + `manual-sync.js all` |
| Precios viejos en la web | El bot está caído (nadie sincroniza) | Revisar logs de Railway; el bot es quien refresca la BD |
| Panel admin no acepta login | Faltan `ADMIN_USER/PASSWORD/AUTH_SECRET` | Definirlas en Vercel y re-deploy |

**Regla de oro**: el **bot debe estar corriendo** en Railway — es el proceso que sincroniza
la BD cada 30 min. La web solo lee. Si el bot se cae, los precios se congelan en el último sync.

---

## 7. Resumen de variables por plataforma

| Variable | Railway (bot) | Vercel (web) |
|---|---|---|
| `DATABASE_URL` | ✅ | ✅ |
| `DIRECT_URL` | ✅ | ✅ |
| `DISCORD_TOKEN` | ✅ | — |
| `EXTERNAL_SUPABASE_URL` | ✅ (opcional) | — |
| `EXTERNAL_SUPABASE_ANON_KEY` | ✅ (opcional) | — |
| `SYNC_OFFICIAL_MINUTES` | ✅ (30) | — |
| `SYNC_TRADE_MINUTES` | ✅ (30) | — |
| `SYNC_ON_BOOT` | ✅ (true) | — |
| `ADMIN_USER` | — | ✅ |
| `ADMIN_PASSWORD` | — | ✅ |
| `AUTH_SECRET` | — | ✅ |
