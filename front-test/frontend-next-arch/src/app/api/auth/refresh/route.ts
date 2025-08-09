import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { verifyRefreshToken, issueAccessToken, getUserRolesAndPerms } from "@/server/auth";

export async function POST(req: Request) {
  const cookiesHeader = req.headers.get("cookie") || "";
  const refresh = cookiesHeader.split(/;\s*/).map((c) => c.split("=")).find(([k]) => k === "refresh_token")?.[1];
  
  if (!refresh) {
    console.log("No refresh token provided");
    return NextResponse.json({ error: "no refresh" }, { status: 401 });
  }
  
  try {
    const payload = await verifyRefreshToken(refresh);
    const dbUser = await prisma.users.findUnique({ where: { id: payload.sub } });
    
    if (!dbUser) {
      console.log("User not found for refresh token");
      return NextResponse.json({ error: "user not found" }, { status: 401 });
    }
    
    if (dbUser.refreshToken !== refresh) {
      console.log("Refresh token mismatch");
      return NextResponse.json({ error: "invalid refresh" }, { status: 401 });
    }
    
    if (!dbUser.refreshTokenExpiry || dbUser.refreshTokenExpiry < new Date()) {
      console.log("Refresh token expired");
      return NextResponse.json({ error: "refresh token expired" }, { status: 401 });
    }
    
    const { roles, perms } = await getUserRolesAndPerms(dbUser.id);
    const access = await issueAccessToken({ sub: dbUser.id, email: dbUser.email, roles, perms });
    
    console.log(`Token refreshed successfully for user ${dbUser.email}`);
    
    const res = NextResponse.json({ ok: true });
    res.cookies.set("access_token", access, { 
      httpOnly: true, 
      sameSite: "lax", 
      path: "/",
      maxAge: 60 * 15 // 15 minutes
    });
    return res;
  } catch (error) {
    console.error("Error verifying refresh token:", error);
    return NextResponse.json({ error: "invalid refresh" }, { status: 401 });
  }
}
