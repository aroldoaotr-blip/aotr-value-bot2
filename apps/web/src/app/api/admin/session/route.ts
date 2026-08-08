import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = (await cookies()).get("aotr_admin")?.value ?? null;
  const user = token ? verifySessionToken(token) : null;
  return NextResponse.json({ authed: !!user, user });
}
