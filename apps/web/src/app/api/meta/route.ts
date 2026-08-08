import { NextResponse } from "next/server";
import { getMeta } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const meta = getMeta();

  let lastSyncs: { source: string; status: string; rows: number; startedAt: string }[] = [];

  if (process.env.DATABASE_URL) {
    try {
      const { prisma } = await import("@aotr/db");
      lastSyncs = await prisma.syncLog.findMany({
        orderBy: { startedAt: "desc" },
        take: 3,
        select: { source: true, status: true, rows: true, startedAt: true }
      });
    } catch {
      // DB no disponible
    }
  }

  return NextResponse.json({
    generatedAt: meta.generatedAt,
    apiKeyValue: meta.apiKeyValue,
    counts: meta.counts,
    lastSyncs,
    live: process.env.DATABASE_URL ? true : false
  });
}
