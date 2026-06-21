import "server-only";
import crypto from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "eb_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function secret(): string {
  return (
    process.env.ADMIN_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "eight-bridges-dev-secret-change-me"
  );
}

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "changeme";
}

function sign(value: string): string {
  return crypto.createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/** Returns true when the supplied password matches the configured one. */
export function checkPassword(password: string): boolean {
  return safeEqual(password, adminPassword());
}

/** Builds a signed `exp.signature` token valid for the session TTL. */
export function createToken(): string {
  const exp = String(Date.now() + SESSION_TTL_MS);
  return `${exp}.${sign(exp)}`;
}

function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  if (!safeEqual(sig, sign(exp))) return false;
  return Number(exp) > Date.now();
}

/** Reads the session cookie and reports whether the caller is authenticated. */
export function isAuthenticated(): boolean {
  return isValidToken(cookies().get(SESSION_COOKIE)?.value);
}
