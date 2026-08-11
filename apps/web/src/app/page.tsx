import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { StatCards } from "@/components/StatCards";
import { HScroll } from "@/components/HScroll";
import { MoverCard } from "@/components/TopMovers";
import { getItems, computeMovers, getMeta } from "@/lib/data";

export const revalidate = 300;

export default async function HomePage() {
  const items = await getItems();
  const meta = getMeta();
  const { gainers, losers } = computeMovers(items, 4);

  const categories = [...items.reduce((map, item) => {
    const cat = item.category ?? "Otros";
    map.set(cat, (map.get(cat) ?? 0) + 1);
    return map;
  }, new Map<string, number>())]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <div>
      <Hero />

      {/* ── Stats (strips de cristal, solapa al hero) ─── */}
      <section className="relative z-20 mx-auto -mt-24 max-w-7xl px-4 sm:px-6">
        <Reveal>
          <StatCards
            stats={[
              { label: "Objetos Indexados", value: meta.counts.total, icon: "📦", sub: "+" },
              { label: "Fuentes de Datos", value: 2, icon: "🔄", sub: "Sincronizadas" },
              { label: "Frecuencia", value: 48, icon: "⏱️", sub: "/Día" }
            ]}
          />
        </Reveal>
      </section>

      {/* ── Movimientos destacados (carrusel horizontal) ── */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-3 font-headline-lg text-2xl font-semibold text-on-surface sm:text-3xl">
                📈 Movimientos Destacados
              </h2>
              <p className="mt-1 text-sm text-on-surface-variant">
                Variaciones de precio en los últimos 60 días.
              </p>
            </div>
            <Link
              href="/historico"
              className="flex shrink-0 items-center gap-1 font-label-caps text-xs font-bold tracking-wider text-primary transition-colors hover:text-on-surface"
            >
              VER TODOS →
            </Link>
          </div>
        </Reveal>

        <div className="space-y-8">
          <Reveal>
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-neon-green">
                ▲ Mayores subidas
              </h3>
              {/* Podio 3D: las primeras 3 giran sobre sí mismas (autoSpinLoop) */}
              <HScroll trackClassName="rankingList">
                {gainers.map((m, i) => (
                  <MoverCard
                    key={m.item.id}
                    mover={m}
                    kind="up"
                    rank={i}
                    className={i < 3 ? "podiumHoverCard" : undefined}
                  />
                ))}
              </HScroll>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-neon-red">
                ▼ Mayores caídas
              </h3>
              <HScroll>
                {losers.map((m, i) => (
                  <MoverCard key={m.item.id} mover={m} kind="down" rank={i} />
                ))}
              </HScroll>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Categorías ────────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-headline-lg text-2xl font-semibold text-on-surface sm:text-3xl">
            Explora por categoría
          </h2>
          <p className="mt-1 text-sm text-on-surface-variant">
            Encuentra rápido lo que buscas.
          </p>
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map(([cat, count], i) => (
            <Reveal key={cat} delay={i * 0.04}>
              <Link
                href={`/precios?cat=${encodeURIComponent(cat)}`}
                className="glass-panel glass-card-hover group flex items-center gap-2 rounded-2xl px-4 py-3"
              >
                <span className="text-lg">{["⚔️", "👹", "✨", "🎭", "🗡️", "🛡️", "🔥", "💎", "🧊", "🌪️"][i % 10]}</span>
                <div>
                  <p className="text-sm font-semibold text-on-surface group-hover:text-primary">
                    {cat}
                  </p>
                  <p className="text-[11px] text-on-surface-variant/70">{count} items</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Arquitectura de datos (3 pasos) ────────────── */}
      <section className="relative mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
        <Reveal>
          <div className="relative z-10 mb-12 text-center">
            <h2 className="font-headline-lg text-2xl font-semibold text-on-surface sm:text-3xl">
              La Arquitectura de Datos
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-on-surface-variant sm:text-base">
              Nuestro sistema procesa y cruza información de múltiples fuentes para garantizar el
              valor más preciso del mercado.
            </p>
          </div>
        </Reveal>
        <div className="relative z-10 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: "🤖",
              title: "Sincronización de Scripts",
              text: "Cada 30 minutos descarga los precios de tradeo de la API y refresca la hoja oficial AOTR: 2 scripts, 2 listas, 2 históricos.",
              highlight: false
            },
            {
              icon: "🗄️",
              title: "Listas de Precios",
              text: "Una tabla para precios oficiales (hoja) y otra para precios de tradeo (API), cada una con su histórico. Bot y web leen la misma base de datos.",
              highlight: true
            },
            {
              icon: "🌐",
              title: "Historial de Comercio",
              text: "Registro inmutable de fluctuaciones para generar tendencias predictivas y análisis técnico del mercado.",
              highlight: false
            }
          ].map((step, i) => (
            <Reveal key={step.title} delay={i * 0.12}>
              <div
                className={
                  "glass-panel glass-card-hover relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl p-8 text-center" +
                  (step.highlight ? " border-t-2 border-t-primary/50" : "")
                }
              >
                <div
                  className={
                    "mb-2 flex h-16 w-16 items-center justify-center rounded-full text-2xl transition-transform duration-500 group-hover:scale-110 " +
                    (step.highlight
                      ? "border border-primary bg-primary/20 shadow-[0_0_20px_rgba(207,188,255,0.4)]"
                      : "border border-primary/30 bg-surface-container shadow-[0_0_15px_rgba(207,188,255,0.2)]")
                  }
                >
                  {step.icon}
                </div>
                <h3 className={"font-headline-lg text-xl font-semibold " + (step.highlight ? "text-primary" : "text-on-surface")}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-on-surface-variant">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="glass-panel relative overflow-hidden rounded-3xl p-8 text-center sm:p-12">
            <div className="pointer-events-none absolute inset-0 animate-aurora bg-[radial-gradient(40%_60%_at_50%_0%,rgba(207,188,255,0.2),transparent)]" />
            <div className="relative">
              <h2 className="font-headline-lg text-2xl font-semibold text-on-surface sm:text-3xl">
                ¿Listo para saber cuánto valen tus items?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-on-surface-variant sm:text-base">
                Explora el listado completo, compara precios y sigue las tendencias del mercado.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/precios"
                  className="rounded-xl bg-gradient-to-r from-primary to-primary-container px-6 py-3 text-sm font-bold text-on-primary shadow-[inset_0_2px_0_rgba(255,255,255,0.2),0_4px_12px_rgba(103,80,164,0.4)] transition-all hover:brightness-110"
                >
                  Explorar precios
                </Link>
                <Link
                  href="/historico"
                  className="glass-panel rounded-xl px-6 py-3 text-sm font-bold text-on-surface transition-all hover:border-primary/40"
                >
                  Ver histórico
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
