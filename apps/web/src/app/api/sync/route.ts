import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// La sincronización real puede tardar ~1 min (hoja Excel + API externa + upserts).
// Vercel Hobby permite hasta 300s por función.
export const dynamic = "force-dynamic";
export const maxDuration = 300;

// Fuerza la actualización de las 2 listas de precios en la BD usando los
// MISMOS scripts del bot (apps/bot/src/services/sync.js), así el admin puede
// refrescar sin esperar los 30 min y aunque el bot esté caído.
export async function POST() {
  // Solo el admin autenticado puede forzar la sincronización
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
    // Import dinámico (mismo patrón que la página /test): los loaders viven
    // en el paquete del bot y solo se cargan cuando se necesitan.
    const { syncAll } = await import("../../../../../bot/src/services/sync.js");
    const results = await syncAll();

    const summary = Object.entries(results).map(([source, r]) => {
      if (r.skipped) {
        // El lock anti-concurrencia del sync ignoró esta fuente (otra
        // sincronización en curso) — no es un error, pero hay que decirlo.
        return { source, status: "skipped", rows: null, error: null };
      }
      if (r.error) {
        return { source, status: "error", rows: null, error: String(r.error).slice(0, 300) };
      }
      return { source, status: "ok", rows: r.rows, error: null };
    });

    const failed = summary.some((s) => s.status === "error");
    return NextResponse.json(
      { results: summary },
      { status: failed ? 500 : 200 }
    );
  } catch (error) {
    console.warn("⚠️ api/sync:", error);
    return NextResponse.json(
      { error: "No se pudo completar la sincronización" },
      { status: 500 }
    );
  }
}
