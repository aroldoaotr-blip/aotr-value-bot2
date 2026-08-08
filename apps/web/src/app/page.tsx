import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { StatCards } from "@/components/StatCards";
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

      {/* ── Stats ─────────────────────────────────────── */}
      <section className="relative z-10 mx-auto mt-12 max-w-7xl px-4 sm:px-6">
        <Reveal>
          <StatCards
            stats={[
              { label: "Items totales", value: meta.counts.total, icon: "📦", sub: "oficial + tradeo" },
              { label: "Con ambas fuentes", value: meta.counts.both, icon: "🔄", sub: "oficial + API" },
              { label: "Solo tradeo (API)", value: meta.counts.api - meta.counts.both, icon: "🔵", sub: "nuevos de la comunidad" },
              { label: "Solo hoja oficial", value: meta.counts.official - meta.counts.both, icon: "🟢", sub: "sets, perks y más" }
            ]}
          />
        </Reveal>
      </section>

      {/* ── Movimientos ───────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Movimientos de la semana
              </h2>
              <p className="mt-1 text-sm text-white/45">
                Items con mayor subida y caída en los últimos 60 días.
              </p>
            </div>
            <Link
              href="/historico"
              className="shrink-0 text-sm font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
            >
              Ver histórico completo →
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-400">
                ▲ Mayores subidas
              </h3>
              {gainers.map((m, i) => (
                <MoverCard key={m.item.id} mover={m} kind="up" rank={i} />
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-widest text-rose-400">
                ▼ Mayores caídas
              </h3>
              {losers.map((m, i) => (
                <MoverCard key={m.item.id} mover={m} kind="down" rank={i} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Categorías ────────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Explora por categoría
          </h2>
          <p className="mt-1 text-sm text-white/45">Encuentra rápido lo que buscas.</p>
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map(([cat, count], i) => (
            <Reveal key={cat} delay={i * 0.04}>
              <Link
                href={`/precios?cat=${encodeURIComponent(cat)}`}
                className="glass group flex items-center gap-2 rounded-2xl px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/40 hover:shadow-glow"
              >
                <span className="text-lg">{["⚔️", "👹", "✨", "🎭", "🗡️", "🛡️", "🔥", "💎", "🧊", "🌪️"][i % 10]}</span>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-indigo-200">{cat}</p>
                  <p className="text-[11px] text-white/40">{count} items</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Cómo funciona ──────────────────────────────── */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="gradient-border rounded-3xl p-8 sm:p-12">
            <h2 className="font-display text-center text-2xl font-bold text-white sm:text-3xl">
              Cómo funciona
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: "🤖",
                  title: "El bot sincroniza",
                  text: "Cada 30 minutos descarga los 379 precios de tradeo de la API y refresca la hoja oficial AOTR."
                },
                {
                  icon: "🗄️",
                  title: "Se almacena en Supabase",
                  text: "Items unificados + histórico de precios por item. Bot y web leen la misma base de datos."
                },
                {
                  icon: "🌐",
                  title: "Tú consultas en la web o Discord",
                  text: "La web muestra ambos precios lado a lado; el bot responde en tus canales con los mismos datos."
                }
              ].map((step, i) => (
                <Reveal key={step.title} delay={i * 0.12}>
                  <div className="text-center">
                    <div className="orb mx-auto flex h-16 w-16 items-center justify-center text-2xl">
                      {step.icon}
                    </div>
                    <h3 className="mt-4 font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600/30 via-violet-600/20 to-cyan-500/20 p-8 text-center sm:p-12">
            <div className="animate-aurora absolute inset-0 bg-[radial-gradient(40%_60%_at_50%_0%,rgba(99,102,241,0.25),transparent)]" />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                ¿Listo para saber cuánto valen tus items?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/60 sm:text-base">
                Explora el listado completo, compara precios y sigue las tendencias del mercado.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/precios"
                  className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#0b0d1f] shadow-lg transition-all hover:scale-105"
                >
                  Explorar precios
                </Link>
                <Link
                  href="/historico"
                  className="glass rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:scale-105 hover:border-white/25"
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
