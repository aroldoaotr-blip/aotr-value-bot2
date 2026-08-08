import { NextResponse } from "next/server";
import { checkCredentials, createSessionToken } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { user?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!checkCredentials(body.user ?? "", body.password ?? "")) {
    // Retardo fijo para frenar fuerza bruta (aunque sea pequeño, encarece cada intento)
    await new Promise((r) => setTimeout(r, 450));
    return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 });
  }

  const token = createSessionToken(body.user!);
  const res = NextResponse.json({ ok: true });

  res.cookies.set("aotr_admin", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7 // 7 días
  });

  return res;
}
