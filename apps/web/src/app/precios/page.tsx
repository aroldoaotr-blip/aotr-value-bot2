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
      <PriceExplorer items={items} />
    </div>
  );
}
