import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getSession } from "@/server/auth";

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Получить информацию о текущем пользователе
 *     description: Возвращает информацию о текущем авторизованном пользователе, его роли и права
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Информация о пользователе получена успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   oneOf:
 *                     - $ref: '#/components/schemas/User'
 *                     - type: 'null'
 *                   description: Информация о пользователе или null если не авторизован
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
 */
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ user: null }, { status: 200 });
  const user = await prisma.users.findUnique({
    where: { id: session.sub },
    select: { id: true, email: true, firstName: true, lastName: true, patronymic: true, phoneNumber: true },
  });
  return NextResponse.json({ user, roles: session.roles, perms: session.perms });
}
