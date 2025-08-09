import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getSession } from "@/server/auth";

/**
 * @swagger
 * /api/railway-cisterns:
 *   get:
 *     summary: Получить список всех железнодорожных цистерн
 *     description: Возвращает полный список цистерн с информацией о производителе, типе вагона, модели и принадлежности
 *     tags:
 *       - Railway Cisterns
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список цистерн успешно получен
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
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cisterns = await prisma.railwayCistern.findMany({
      include: {
        manufacturer: true,
        wagonType: true,
        wagonModel: true,
        affiliation: true,
      },
      orderBy: {
        number: 'asc',
      },
    });

    return NextResponse.json(cisterns);
  } catch (error) {
    console.error("Error fetching cisterns:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
