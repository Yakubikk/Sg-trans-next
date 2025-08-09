import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getSession } from "@/server/auth";

/**
 * @swagger
 * /api/railway-cisterns/{id}:
 *   get:
 *     summary: Получить цистерну по ID
 *     description: Возвращает подробную информацию о конкретной цистерне по её идентификатору
 *     tags:
 *       - Railway Cisterns
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Уникальный идентификатор цистерны
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Информация о цистерне получена успешно
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/RailwayCistern'
 *                 - type: object
 *                   properties:
 *                     manufacturer:
 *                       $ref: '#/components/schemas/Manufacturer'
 *                     wagonType:
 *                       $ref: '#/components/schemas/WagonType'
 *                     wagonModel:
 *                       $ref: '#/components/schemas/WagonType'
 *                     registrar:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                         name:
 *                           type: string
 *                     affiliation:
 *                       $ref: '#/components/schemas/Affiliation'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const cistern = await prisma.railwayCistern.findUnique({
      where: { id },
      include: {
        manufacturer: true,
        wagonType: true,
        wagonModel: true,
        registrar: true,
        affiliation: true,
      },
    });

    if (!cistern) {
      return NextResponse.json({ error: "Cistern not found" }, { status: 404 });
    }

    return NextResponse.json(cistern);
  } catch (error) {
    console.error("Error fetching cistern:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
