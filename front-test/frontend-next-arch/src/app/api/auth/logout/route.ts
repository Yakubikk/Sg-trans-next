import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getSession } from "@/server/auth";

export async function POST() {
  const session = await getSession();
  if (session) {
    await prisma.users.update({ where: { id: session.sub }, data: { refreshToken: null, refreshTokenExpiry: null } });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("access_token", "", { httpOnly: true, path: "/", maxAge: 0 });
  res.cookies.set("refresh_token", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
