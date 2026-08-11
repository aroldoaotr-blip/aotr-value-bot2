import { Reveal } from "@/components/Reveal";
import { MoverCard } from "@/components/TopMovers";
import { ExpandableList } from "@/components/ExpandableList";
import { HScroll } from "@/components/HScroll";
import { PriceSourceToggle } from "@/lib/price-source";
import { getItems, computeMovers, getMeta } from "@/lib/data";
import { formatRelative } from "@/lib/format";

export const revalidate = 300;

export const metadata = {
  title: "Histórico — AOTR Values",
  description: "Tendencias de precios de AOTR: subidas, caídas y volatilidad."
};

export default async function HistoricoPage() {
  const items = await getItems();
  const meta = getMeta();
  const { gainers, losers, volatile } = computeMovers(items, 10);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6">
      {/* ── Header + toggle ────────────────────────────── */}
      <Reveal>
        <div className="fade-up mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-label-caps text-xs font-bold uppercase tracking-widest text-primary">
              Tendencias
            </p>
            <h1 className="mt-2 font-display-lg text-3xl font-bold tracking-tight text-on-surface sm:text-5xl">
              Histórico de Precios
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-on-surface-variant">
              El bot registra el precio de tradeo de cada item con cada sincronización (cada 30
              minutos). Estos son los movimientos de los últimos 60 días. Última actualización del
              dataset: <span className="font-semibold text-on-surface">{formatRelative(meta.generatedAt)}</span>.
            </p>
          </div>
          <PriceSourceToggle className="w-64" />
        </div>
      </Reveal>

      {/* ── Stats strip ────────────────────────────────── */}
      <Reveal delay={0.1}>
        <div className="mb-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {[
            { label: "Items rastreados", value: meta.counts.total.toLocaleString("en-US") },
            { label: "Fuentes", value: "2" },
            { label: "Días de historial", value: "60" },
            { label: "Intervalo", value: "30 min" }
          ].map((s) => (
            <div key={s.label} className="glass-panel flex flex-col gap-2 rounded-xl p-6">
              <span className="font-label-caps text-xs font-bold uppercase tracking-wider text-outline">
                {s.label}
              </span>
              <span className="font-data-tabular text-xl font-bold text-on-surface">
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── Top subidas / caídas ───────────────────────── */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div>
            <h2 className="mb-3 font-label-caps text-sm font-bold uppercase tracking-widest text-neon-green">
              ▲ Top subidas (60 días)
            </h2>
            <ExpandableList
              items={gainers.map((m, i) => (
                <MoverCard key={m.item.id} mover={m} kind="up" rank={i} />
              ))}
              initial={5}
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <h2 className="mb-3 font-label-caps text-sm font-bold uppercase tracking-widest text-neon-red">
              ▼ Top caídas (60 días)
            </h2>
            <ExpandableList
              items={losers.map((m, i) => (
                <MoverCard key={m.item.id} mover={m} kind="down" rank={i} />
              ))}
              initial={5}
            />
          </div>
        </Reveal>
      </div>

      {/* ── Más volátiles ──────────────────────────────── */}
      <Reveal delay={0.15}>
        <div className="mt-16">
          <h2 className="font-headline-lg text-xl font-semibold text-on-surface sm:text-2xl">
            🌪️ Más volátiles
          </h2>
          <p className="mt-1 text-sm text-on-surface-variant">
            Items con mayores oscilaciones dentro del período.
          </p>
          <HScroll className="mt-6" trackClassName="pb-2">
            {volatile.map((m, i) => (
              <MoverCard key={m.item.id} mover={m} kind="up" rank={i} />
            ))}
          </HScroll>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="glass-panel mt-16 rounded-xl p-8 text-center">
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-on-surface-variant">
            💡 <strong className="text-on-surface">El histórico se alimenta solo:</strong> cada
            sincronización del bot guarda una instantánea del precio de cada item en la base de
            datos. Con el tiempo podrás ver tendencias reales de semanas y meses.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
