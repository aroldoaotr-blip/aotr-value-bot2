import { Reveal } from "@/components/Reveal";
import { MoverCard } from "@/components/TopMovers";
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
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
          Tendencias
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
          Histórico de <span className="text-gradient">precios</span>
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-white/50">
          El bot registra el precio de tradeo de cada item con cada sincronización (cada 30 minutos).
          Estos son los movimientos de los últimos 60 días. Última actualización del dataset:{" "}
          <span className="text-white/80">{formatRelative(meta.generatedAt)}</span>.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-400">
              ▲ Top subidas (60 días)
            </h2>
            {gainers.map((m, i) => (
              <MoverCard key={m.item.id} mover={m} kind="up" rank={i} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-rose-400">
              ▼ Top caídas (60 días)
            </h2>
            {losers.map((m, i) => (
              <MoverCard key={m.item.id} mover={m} kind="down" rank={i} />
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="mt-16">
          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
            🌪️ Más volátiles
          </h2>
          <p className="mt-1 text-sm text-white/45">
            Items con mayores oscilaciones dentro del período.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {volatile.map((m, i) => (
              <MoverCard key={m.item.id} mover={m} kind="up" rank={i} />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="gradient-border mt-16 rounded-3xl p-8 text-center">
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/55">
            💡 <strong className="text-white">El histórico se alimenta solo:</strong> cada
            sincronización del bot guarda una instantánea del precio de cada item en la base de
            datos. Con el tiempo podrás ver tendencias reales de semanas y meses.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
