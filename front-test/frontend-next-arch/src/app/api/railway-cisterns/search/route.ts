import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getSession } from "@/server/auth";
import { quickSearchSchema } from "@/lib/validations";
import { z } from "zod";

/**
 * @swagger
 * /api/railway-cisterns/search:
 *   get:
 *     summary: Поиск железнодорожных цистерн
 *     description: Выполняет поиск цистерн по номеру (частичное совпадение, до 20 результатов)
 *     tags:
 *       - Railway Cisterns
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *         description: Строка поиска для номера цистерны
 *         example: "12345"
 *     responses:
 *       200:
 *         description: Результаты поиска получены успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/RailwayCistern'
 *                   - type: object
 *                     properties:
 *                       manufacturer:
 *                         $ref: '#/components/schemas/Manufacturer'
 *                       wagonType:
 *                         $ref: '#/components/schemas/WagonType'
 *                       wagonModel:
 *                         $ref: '#/components/schemas/WagonType'
 *                       affiliation:
 *                         $ref: '#/components/schemas/Affiliation'
 *       400:
 *         description: Отсутствует обязательный параметр query
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    // Валидация параметра поиска
    const validatedData = quickSearchSchema.parse({ query });

    // Поиск по номеру вагона (частичное совпадение)
    const cisterns = await prisma.railwayCistern.findMany({
      where: {
        number: {
          startsWith: validatedData.query,
          mode: 'insensitive',
        },
      },
      include: {
        manufacturer: true,
        wagonType: true,
        wagonModel: true,
        affiliation: true,
      },
      orderBy: {
        number: 'asc',
      }
    });

    return NextResponse.json(cisterns);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Некорректные параметры поиска", details: error.issues },
        { status: 400 }
      );
    }
    
    console.error("Error searching cisterns:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
