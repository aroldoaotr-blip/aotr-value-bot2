import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DEFAULT_RATES, type Rates } from "@/lib/rates";

export const dynamic = "force-dynamic";

async function dbRates(): Promise<Rates | null> {
  if (!process.env.DATABASE_URL) return null;
  try {
    const { getRates } = await import("@aotr/db");
    return await getRates();
  } catch (error) {
    console.warn("⚠️ api/rates: no se pudo leer la BD:", error);
    return null;
  }
}

export async function GET() {
  const fromDb = await dbRates();
  return NextResponse.json({ rates: fromDb ?? DEFAULT_RATES, persisted: !!fromDb });
}

export async function POST(request: Request) {
  // Solo el admin autenticado puede modificar las tasas
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

  let body: Partial<Rates>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const keysPerVizard = Number(body.keysPerVizard);
  const keysPerScroll = Number(body.keysPerScroll);
  if (
    !Number.isFinite(keysPerVizard) ||
    keysPerVizard <= 0 ||
    !Number.isFinite(keysPerScroll) ||
    keysPerScroll <= 0
  ) {
    return NextResponse.json(
      { error: "Las tasas deben ser números positivos" },
      { status: 400 }
    );
  }

  const rates: Rates = { keysPerVizard, keysPerScroll };

  // Persistir en BD si está configurada; el cliente también guarda en localStorage
  if (process.env.DATABASE_URL) {
    try {
      const { setRates } = await import("@aotr/db");
      const saved = await setRates(rates);
      return NextResponse.json({ rates: saved, persisted: true });
    } catch (error) {
      console.warn("⚠️ api/rates: no se pudo guardar en BD:", error);
      return NextResponse.json(
        { error: "No se pudo guardar en la base de datos" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ rates, persisted: false });
}
