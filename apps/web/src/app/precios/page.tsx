import { Reveal } from "@/components/Reveal";
import { PriceExplorer } from "@/components/PriceExplorer";
import { getItems } from "@/lib/data";

export const revalidate = 300;

export const metadata = {
  title: "Precios — AOTR Values",
  description: "Todos los precios de AOTR: oficiales y de tradeo, con filtros y búsqueda."
};

export default async function PreciosPage() {
  const items = await getItems();

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
              Explorador
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
              Precios de <span className="text-gradient">AOTR</span>
            </h1>
            <p className="mt-2 max-w-xl text-sm text-white/50">
              Compara el precio oficial de la hoja con el precio de tradeo de la API. Haz clic en
              cualquier item para ver su histórico completo.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-8">
        <PriceExplorer items={items} />
      </div>
    </div>
  );
}
