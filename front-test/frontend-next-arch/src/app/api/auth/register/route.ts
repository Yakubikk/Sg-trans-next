import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { hashPassword, getSession } from "@/server/auth";
import { z } from "zod";

const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  patronymic: z.string().optional(),
  phoneNumber: z.string().optional(),
  roleIds: z.array(z.number()).min(1),
});

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     description: Создает нового пользователя в системе. Доступно только администраторам.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - roleIds
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email пользователя
 *                 example: newuser@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 description: Пароль пользователя (минимум 6 символов)
 *                 example: password123
 *               firstName:
 *                 type: string
 *                 description: Имя пользователя
 *                 example: Иван
 *               lastName:
 *                 type: string
 *                 description: Фамилия пользователя
 *                 example: Иванов
 *               patronymic:
 *                 type: string
 *                 description: Отчество пользователя
 *                 example: Иванович
 *               phoneNumber:
 *                 type: string
 *                 description: Номер телефона
 *                 example: +7 900 123-45-67
 *               roleIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 minItems: 1
 *                 description: Массив ID ролей для пользователя
 *                 example: [1, 2]
 *     responses:
 *       201:
 *         description: Пользователь успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       403:
 *         description: Доступ запрещен (только для администраторов)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Пользователь с таким email уже существует
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function POST(req: Request) {
  try {
    // Проверяем, что запрос идет от авторизованного администратора
    const session = await getSession();
    if (!session || !session.roles.includes("Admin")) {
      return NextResponse.json(
        { error: "Доступ запрещен. Только администраторы могут создавать пользователей." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const validatedData = registerSchema.parse(body);

    // Проверяем, что пользователь с таким email не существует
    const existingUser = await prisma.users.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Пользователь с таким email уже существует" },
        { status: 400 }
      );
    }

    // Проверяем, что все указанные роли существуют
    const roles = await prisma.role.findMany({
      where: { id: { in: validatedData.roleIds } },
    });

    if (roles.length !== validatedData.roleIds.length) {
      return NextResponse.json(
        { error: "Одна или несколько указанных ролей не существуют" },
        { status: 400 }
      );
    }

    // Хешируем пароль
    const passwordHash = await hashPassword(validatedData.password);

    // Создаем пользователя
    const user = await prisma.users.create({
      data: {
        email: validatedData.email,
        passwordHash,
        firstName: validatedData.firstName || null,
        lastName: validatedData.lastName || null,
        patronymic: validatedData.patronymic || null,
        phoneNumber: validatedData.phoneNumber || null,
      },
    });

    // Назначаем роли пользователю
    await prisma.userRole.createMany({
      data: validatedData.roleIds.map(roleId => ({
        userId: user.id,
        roleId,
      })),
    });

    // Возвращаем информацию о созданном пользователе (без пароля)
    const createdUser = await prisma.users.findUnique({
      where: { id: user.id },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Пользователь успешно создан",
      user: {
        id: createdUser!.id,
        email: createdUser!.email,
        firstName: createdUser!.firstName,
        lastName: createdUser!.lastName,
        patronymic: createdUser!.patronymic,
        phoneNumber: createdUser!.phoneNumber,
        roles: createdUser!.roles.map(ur => ur.role.name),
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Некорректные данные", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
