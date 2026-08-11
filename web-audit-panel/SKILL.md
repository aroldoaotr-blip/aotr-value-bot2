---
name: web-audit-panel
description: >-
  Usar esta skill cuando el usuario pida auditar, revisar o evaluar un sitio
  web o una app que ya construyó — sobre todo después de trabajar el diseño
  o antes de mostrárselo a alguien — y quiera una evaluación simulada tipo
  "panel de expertos" que cubra producto y contenido, diseño y UX,
  seguridad, e ingeniería/calidad de código; y/o quiera detectar y limpiar
  archivos residuales, código muerto o dependencias sin usar. Conviene
  activarla incluso si el usuario no dice literalmente "panel de expertos":
  cualquier pedido de revisión integral de un proyecto propio (diseño +
  seguridad + código, no solo un bug puntual) encaja acá. Frases típicas:
  "auditá mi sitio", "revisá esto como si fueran expertos", "evaluación de
  seguridad y diseño", "limpiá archivos que no se usan", "dejá el proyecto
  limpio", "site audit", "code review completo".
---

# Auditoría de sitio web — panel de expertos + limpieza

## ⚠️ Regla #1: PLAN PRIMERO, EJECUCIÓN DESPUÉS

**Esta skill NO ejecuta nada sin aprobación previa.**

El flujo SIEMPRE es:

```
1. INVENTARIO (solo lectura, sin tocar nada)
2. PLAN de auditoría → se lo mostramos al usuario
3. APROBACIÓN explícita del usuario (sí/no/cambios)
4. EJECUCIÓN de la auditoría + reporte
5. LIMPIEZA solo con confirmación aparte
```

### Paso 2 — El plan que se presenta antes de aprobar

Antes de escribir un solo hallazgo o borrar un solo archivo, presentá un
**plan concreto y accionable** con esta estructura mínima:

```
# 📋 Plan de auditoría — [nombre del proyecto]

## 1. Alcance (qué voy a inventariar)
- Rutas/páginas de la app: [lista las que existen]
- package.json (deps y scripts) — [n] dependencias directas
- Variables de entorno esperadas (.env.example vs .env)
- Esquema de base de datos (si existe)
- Assets públicos y carpetas de build
- [cualquier cosa específica del proyecto que aplique]

## 2. Qué va a revisar cada experto
- 🧭 Producto y contenido → [qué puntos concretos]
- 🎨 Diseño y UX/UI → [qué puntos concretos]
- 🔐 Seguridad → [qué puntos concretos]
- ⚙️ Ingeniería → [qué puntos concretos]

## 3. Limpieza (todavía NO borro nada)
- Voy a BUSCAR: código muerto, imports sin usar, archivos .bak/-copy/-old,
  assets sin referencia, console.log/debugger, código comentado,
  dependencias sin usar.
- Cada candidato a borrar se confirma con un grep ANTES de listarlo.
- NADA se elimina en esta fase: solo se detecta y lista.

## 4. Entregable
- Reporte con: resumen ejecutivo + top 3 prioridades + hallazgos por
  experto (🔴 Crítico / 🟠 Alto / 🟡 Medio / 🟢 Pulido) + lista de limpieza.

❓ Pregunta al usuario: ¿apruebo este plan y ejecuto la auditoría?
```

**Reglas del plan:**
- El inventario del paso 1 es de **solo lectura** (leer archivos, correr
  `grep`/`npm audit`/`npm ls` si hace falta). Prohibido modificar, borrar
  o mover cualquier cosa durante el plan.
- Si el usuario pide cambios al plan, iterar hasta que apruebe.
- Sin "sí" explícito (o "dale", "aprobado", etc.) NO se ejecuta la
  auditoría ni se toca un archivo.

## Antes de escribir un solo hallazgo: inventariar

Recorré el proyecto real — rutas/páginas, `package.json`, variables de
entorno esperadas (`.env.example`), esquema de base de datos si existe —
antes de opinar sobre nada. Un hallazgo que no se pudo verificar en el
código no va en el reporte; mejor marcarlo como "no se pudo confirmar,
revisar manualmente" que inventarlo.

Si no hay ningún proyecto real disponible en la conversación (el usuario
solo quiere ver cómo funciona la skill, o pide el enfoque en abstracto),
decilo explícitamente y ofrecé correrla apenas tengas acceso al código.

## Los 4 expertos

Cada uno evalúa por su cuenta y con su propio criterio — no mezclar todo
en una lista única hasta el plan final. Estas son las cosas que cada
experto típicamente revisa; usalas como punto de partida, no como
checklist cerrada — si el proyecto tiene algo particular que no está
listado acá pero un experto real lo señalaría, incluilo.

**Producto y contenido** — ¿se entiende qué es el sitio y para quién en
los primeros segundos? ¿falta alguna página esperable (404, contacto,
términos)? ¿hay texto placeholder o secciones a medio terminar? ¿la
navegación y los CTA son claros? SEO básico: title/description por
página, favicon, sitemap.xml, robots.txt.

**Diseño y UX/UI** — consistencia real (paleta, tipografía, espaciados)
vs. improvisación; contraste y legibilidad (WCAG AA, 4.5:1 en texto
normal); responsive de verdad en mobile/tablet/desktop; estados cubiertos
(hover, focus, disabled, loading, vacío, error); accesibilidad básica
(teclado, alt text, aria-labels en botones-ícono); feedback al usuario
ante sus acciones.

**Seguridad** — esta es la que más vale la pena hacer bien, porque un
sitio hecho con ayuda de IA suele arrastrar descuidos típicos: secrets
hardcodeados o commiteados, `.env` sin estar en `.gitignore`, rutas admin
protegidas solo en el frontend (sin chequeo server-side real), inputs de
API sin validar ni sanitizar, un archivo de base de datos (ej. SQLite)
accesible por URL si quedó dentro de `/public`, dependencias con
vulnerabilidades conocidas (`npm audit`), falta de headers de seguridad
(CSP, X-Frame-Options, Strict-Transport-Security), falta de rate limiting
en login/formularios/checkout, CORS abierto de más, cookies de sesión sin
`Secure`/`HttpOnly`/`SameSite`.

**Ingeniería y métodos** — arquitectura y organización de carpetas;
código duplicado; manejo de errores (try/catch, páginas de error, estados
de loading); performance (bundle size, imágenes sin optimizar, Core Web
Vitals); tipado real si es TypeScript (no `any` de relleno); algo de
testing en las partes críticas (pagos, auth, cálculos); alguna forma de
enterarse si algo se rompe en producción.

## Limpieza de archivos residuales

Esto es tan parte del trabajo como los hallazgos de los expertos, no un
extra al final — PERO siempre después del plan aprobado, y con una
confirmación extra antes de borrar:

- Imports, componentes y funciones sin usar — buscar con grep, o con
  herramientas como `knip`, `ts-prune` o `depcheck` si el entorno lo
  permite.
- Dependencias en `package.json` que no aparecen en ningún import.
- Archivos sueltos de iteraciones anteriores (`.bak`, `-copy`, `-old`,
  `Button2.jsx`, componentes de prueba).
- Assets en `/public` que ningún componente referencia.
- `console.log`, `debugger`, bloques de código comentado.
- Variables de entorno definidas y nunca usadas, o usadas pero ausentes
  en `.env.example`.
- Carpetas de build (`.next`, `dist`, `node_modules`) que no deberían
  estar versionadas — revisar `.gitignore`.

Para cada cosa a borrar, confirmá primero que de verdad no se usa en
ningún lado (un grep rápido antes de recomendar borrar algo evita falsos
positivos) y listala aparte del resto del reporte, no mezclada con los
hallazgos de los expertos.

**Regla de borrado:** la lista de limpieza va DENTRO del reporte final.
El usuario aprueba el reporte y, si acepta la limpieza, se borra SOLO lo
que él confirme — nunca borres en la misma pasada del reporte.

## Formato del reporte final

Usá esta estructura para el resultado:

```
# Auditoría de [nombre del proyecto]

## Resumen ejecutivo
(veredicto de cada experto en 1-2 líneas + top 3 prioridades de la semana)

## Producto y contenido
## Diseño y UX/UI
## Seguridad
## Ingeniería y métodos

Para cada hallazgo dentro de estas secciones: qué es → por qué importa →
cómo se arregla (con ejemplo de código o config si aplica). Agrupalos por
severidad dentro de cada sección:
🔴 Crítico · 🟠 Alto · 🟡 Medio · 🟢 Pulido

## Limpieza
Lista de archivos/dependencias a borrar, separada de todo lo demás.
```

Un reporte con 40 hallazgos sin prioridad es inútil — el objetivo es que
el usuario sepa qué hacer primero, no que se sienta abrumado.
