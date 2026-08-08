import { createHmac, timingSafeEqual } from "crypto";

// Credenciales del admin desde variables de entorno.
// En producción NO hay fallbacks: si faltan, la autenticación falla siempre
// (un fallback hardcodeado sería un bypass de seguridad trivial).
// Se evalúan de forma perezosa para no romper el build (NODE_ENV=production durante `next build`).

const SESSION_DAYS = 7;

function b64url(data: string): string {
  return Buffer.from(data).toString("base64url");
}

function adminConfig(): { user: string; password: string; secret: string } {
  const isProd = process.env.NODE_ENV === "production";
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.AUTH_SECRET;

  if (isProd && (!user || !password || !secret)) {
    throw new Error(
      "Configuración de admin incompleta: ADMIN_USER, ADMIN_PASSWORD y AUTH_SECRET son obligatorias en producción."
    );
  }
  return {
    user: user ?? "admin",
    password: password ?? "aotr-admin-2024",
    secret: secret ?? "dev-only-secret-change-me"
  };
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

/** Firma un token de sesión con expiración. */
export function createSessionToken(user: string): string {
  const { secret } = adminConfig();
  const payload = b64url(
    JSON.stringify({ user, exp: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000 })
  );
  return `${payload}.${sign(payload, secret)}`;
}

/** Valida el token y devuelve el usuario si es válido, o null. */
export function verifySessionToken(token: string): string | null {
  try {
    const { secret, user: adminUser } = adminConfig();
    const [payload, sig] = token.split(".");
    if (!payload || !sig) return null;
    const expected = sign(payload, secret);
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      user: string;
      exp: number;
    };
    if (typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return data.user === adminUser ? data.user : null;
  } catch {
    return null;
  }
}

/** Compara credenciales de forma segura contra las variables de entorno. */
export function checkCredentials(user: string, password: string): boolean {
  const { user: adminUser, password: adminPassword } = adminConfig();
  const u = Buffer.from(String(user ?? ""));
  const p = Buffer.from(String(password ?? ""));
  const cu = Buffer.from(adminUser);
  const cp = Buffer.from(adminPassword);
  return (
    u.length === cu.length &&
    p.length === cp.length &&
    timingSafeEqual(u, cu) &&
    timingSafeEqual(p, cp)
  );
}
