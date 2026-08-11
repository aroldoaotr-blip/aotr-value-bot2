/* // Loading de streaming: se muestra mientras el servidor ejecuta
// los loaders reales (hoja oficial + API externa) en /test.
export default function TestLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
        🧪 Laboratorio de datos
      </p>
      <h1 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
        Consultando <span className="text-gradient">fuentes en vivo…</span>
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-white/50">
        Descargando la hoja oficial AOTR y la API de tradeo (los loaders reales del bot).
      </p>

      <div className="glass mt-8 max-w-md rounded-2xl p-6">
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
        </div>
        <div className="mt-4 space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-10 animate-pulse rounded-xl bg-white/[0.04]" />
          ))}
        </div>
      </div>
    </div>
  );
} */
