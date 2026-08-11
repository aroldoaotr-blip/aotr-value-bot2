import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export type SiteConfig = { heroMode: "video" | "shader" };

const DEFAULT_CONFIG: SiteConfig = { heroMode: "video" };

async function dbConfig(): Promise<{ config: SiteConfig | null; error: string | null }> {
  if (!process.env.DATABASE_URL) return { config: null, error: null };
  try {
    const { getSiteConfig } = await import("@aotr/db");
    return { config: await getSiteConfig(), error: null };
  } catch (error) {
    console.warn("⚠️ api/config: no se pudo leer la BD:", error);
    return { config: null, error: error instanceof Error ? error.message : String(error) };
  }
}

// GET — público: cualquier visitante obtiene la config global del sitio.
export async function GET() {
  const { config, error } = await dbConfig();
  return NextResponse.json({
    config: config ?? DEFAULT_CONFIG,
    persisted: !!config,
    error
  });
}

// PUT — solo el admin autenticado puede cambiar la config global.
export async function PUT(request: Request) {
  try {
    const token = (await cookies()).get("aotr_admin")?.value ?? null;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    const { verifySessionToken } = await import("@/lib/admin-auth");
    if (!verifySessionToken(token)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let body: Partial<SiteConfig>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const heroMode = body.heroMode;
  if (heroMode !== "video" && heroMode !== "shader") {
    return NextResponse.json(
      { error: "heroMode debe ser \"video\" o \"shader\"" },
      { status: 400 }
    );
  }

  if (process.env.DATABASE_URL) {
    try {
      const { setSiteConfig } = await import("@aotr/db");
      const saved = await setSiteConfig({ heroMode });
      return NextResponse.json({ config: saved, persisted: true });
    } catch (error) {
      console.warn("⚠️ api/config: no se pudo guardar en BD:", error);
      return NextResponse.json(
        { error: "No se pudo guardar en la base de datos" },
        { status: 500 }
      );
    }
  }

  // Sin BD: el cambio no se puede propagar a todos los visitantes.
  return NextResponse.json(
    { config: { heroMode }, persisted: false, error: "Sin base de datos configurada" },
    { status: 503 }
  );
}
