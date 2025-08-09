import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { verifyRefreshToken, issueAccessToken, getUserRolesAndPerms } from "@/server/auth";

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Обновление токена доступа
 *     description: Обновляет access token используя refresh token из cookies
 *     tags:
 *       - Authentication
 *     security: []
 *     responses:
 *       200:
 *         description: Токен успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   description: ID пользователя
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Email пользователя
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Роли пользователя
 *                 perms:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Права пользователя
 *         headers:
 *           Set-Cookie:
 *             description: Новый access token устанавливается как HTTP-only cookie
 *             schema:
 *               type: string
 *       401:
 *         description: Недействительный или отсутствующий refresh token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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
