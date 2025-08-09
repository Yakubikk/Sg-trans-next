import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { verifyPassword, issueAccessToken, issueRefreshToken, getUserRolesAndPerms } from "@/server/auth";

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Авторизация пользователя
 *     description: Выполняет вход пользователя в систему и возвращает токены доступа
 *     tags:
 *       - Authentication
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email пользователя
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль пользователя
 *                 example: password123
 *     responses:
 *       200:
 *         description: Успешная авторизация
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
 *             description: Токены доступа устанавливаются как HTTP-only cookies
 *             schema:
 *               type: string
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
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
