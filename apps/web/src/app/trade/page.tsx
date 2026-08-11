import { Reveal } from "@/components/Reveal";
import { CompareTool } from "@/components/CompareTool";

export const metadata = {
  title: "Comparador de Trades — AOTR Values",
  description:
    "Compara dos ofertas de AOTR y descubre si el trade es justo, con precios oficiales o de tradeo."
};

export default function TradePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-28 sm:px-6">
      <Reveal>
        <div className="mb-8 border-b border-outline-variant/20 pb-6">
          <p className="font-label-caps text-xs font-bold uppercase tracking-widest text-primary">
            ⚖️ Trade checker
          </p>
          <h1 className="mt-2 font-display-lg text-3xl font-bold tracking-tight text-on-surface sm:text-5xl">
            Comparador de Ofertas
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-on-surface-variant">
            El mismo cálculo que hace el bot de Discord con{" "}
            <code className="rounded bg-surface-container px-1.5 py-0.5 font-data-tabular text-xs">/trade</code>:
            arma tus dos ofertas, elige la fuente de precios y descubre si el intercambio te conviene.
          </p>
        </div>
      </Reveal>

      <div className="mt-8">
        <CompareTool />
      </div>
    </div>
  );
}
