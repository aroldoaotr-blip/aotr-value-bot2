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
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
          ⚖️ Trade checker
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
          Comparador de <span className="text-gradient">trades</span>
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-white/50">
          El mismo cálculo que hace el bot de Discord con <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs">/trade</code>:
          arma tus dos ofertas, elige la fuente de precios y descubre si el intercambio te conviene.
        </p>
      </Reveal>

      <div className="mt-8">
        <CompareTool />
      </div>
    </div>
  );
}
