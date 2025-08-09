import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { verifyPassword, issueAccessToken, issueRefreshToken, getUserRolesAndPerms } from "@/server/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = (await req.json()) as { email: string; password: string };
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "invalid credentials" }, { status: 401 });
    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) return NextResponse.json({ error: "invalid credentials" }, { status: 401 });
    const { roles, perms } = await getUserRolesAndPerms(user.id);
    const access = await issueAccessToken({ sub: user.id, email: user.email, roles, perms });
    const refresh = await issueRefreshToken(user.id);
    const res = NextResponse.json({ id: user.id, email: user.email, roles, perms });
    res.cookies.set("access_token", access, { httpOnly: true, sameSite: "lax", path: "/" });
    res.cookies.set("refresh_token", refresh, { httpOnly: true, sameSite: "lax", path: "/" });
    return res;
  } catch (e) {
    console.error("Login error:", e);
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
}
