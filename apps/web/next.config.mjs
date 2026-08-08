/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // La base de datos es opcional (fallback a seed local) — sin static optimization estricta
  experimental: {
    optimizePackageImports: ["lucide-react"]
  },
  webpack: (config, { isServer }) => {
    // xlsx es CJS y su interop rompe el bundling ESM de Next (server build).
    // Externalizado: se resuelve en runtime por Node (igual que en generate-seed.mjs),
    // que es donde la página /test ejecuta los loaders reales del bot.
    if (isServer) {
      config.externals = [...(config.externals ?? []), "xlsx"];
    }
    return config;
  }
};

export default nextConfig;
