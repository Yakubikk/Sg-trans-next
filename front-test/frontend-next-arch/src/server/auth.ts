import { prisma } from "./db";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const ACCESS_TTL_SEC = 60 * 15; // 15m
const REFRESH_TTL_SEC = 60 * 60 * 24 * 7; // 7d

function getAccessSecret() {
  const s = process.env.JWT_ACCESS_SECRET;
  if (!s) throw new Error("JWT_ACCESS_SECRET not set");
  return new TextEncoder().encode(s);
}
function getRefreshSecret() {
  const s = process.env.JWT_REFRESH_SECRET;
  if (!s) throw new Error("JWT_REFRESH_SECRET not set");
  return new TextEncoder().encode(s);
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export type JwtPayload = {
  sub: string; // userId
  email: string;
  roles: string[];
  perms: string[];
};

export async function issueAccessToken(payload: JwtPayload) {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(now)
    .setExpirationTime(now + ACCESS_TTL_SEC)
    .sign(getAccessSecret());
}

export async function issueRefreshToken(userId: string) {
  const now = Math.floor(Date.now() / 1000);
  const token = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(now)
    .setExpirationTime(now + REFRESH_TTL_SEC)
    .sign(getRefreshSecret());
  const expiry = new Date(Date.now() + REFRESH_TTL_SEC * 1000);
  await prisma.users.update({
    where: { id: userId },
    data: { refreshToken: token, refreshTokenExpiry: expiry },
  });
  return token;
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, getAccessSecret());
  return payload as unknown as JwtPayload & { exp: number; iat: number };
}

export async function verifyRefreshToken(token: string) {
  const { payload } = await jwtVerify(token, getRefreshSecret());
  return payload as unknown as { sub: string; exp: number; iat: number };
}

export async function getUserRolesAndPerms(userId: string) {
  const rolesData = await prisma.userRole.findMany({
    where: { userId },
    include: { role: { include: { permissions: { include: { permission: true } } } } },
  });
  const roleNames = rolesData.map((r) => r.role.name);
  const perms = new Set<string>();
  for (const r of rolesData) {
    for (const rp of r.role.permissions) perms.add(rp.permission.name);
  }
  return { roles: roleNames, perms: Array.from(perms) };
}

export async function getSession() {
  const c = await cookies();
  const access = c.get("access_token")?.value;
  if (!access) return null;
  try {
    const payload = await verifyAccessToken(access);
    return payload;
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) throw new Error("UNAUTHORIZED");
  return session;
}

export function hasRole(session: JwtPayload | null, role: string) {
  return !!session?.roles?.includes(role);
}

export function hasPermission(session: JwtPayload | null, perm: string) {
  return !!session?.perms?.includes(perm);
}
