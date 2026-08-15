import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

// Últimas 30 sincronizaciones registradas en SyncLog (las escriben el bot en
// cada sync programado y POST /api/sync al forzarlas). La retención de 30
// registros la aplica el propio sync (apps/bot/src/services/sync.js).
export async function GET() {
  // Solo el admin autenticado ve el historial de sincronizaciones
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

  try {
    const { prisma } = await import("@aotr/db");
    const logs = await prisma.syncLog.findMany({
      orderBy: { id: "desc" },
      take: 30,
      select: {
        id: true,
        source: true,
        status: true,
        rows: true,
        error: true,
        durationMs: true,
        startedAt: true
      }
    });
    return NextResponse.json({ logs });
  } catch (error) {
    // Si la BD no responde, devolvemos lista vacía para que el admin lo vea
    // sin romper la página (el aviso de "sin BD" ya se muestra aparte).
    console.warn("⚠️ api/sync-log:", error);
    return NextResponse.json({ logs: [], error: "No se pudo leer la BD" });
  }
}
