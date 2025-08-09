import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getSession } from "@/server/auth";

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Выход из системы
 *     description: Завершает сеанс пользователя, удаляет refresh token и очищает cookies
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Выход выполнен успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *         headers:
 *           Set-Cookie:
 *             description: Cookies с токенами очищаются
 *             schema:
 *               type: string
 */
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
