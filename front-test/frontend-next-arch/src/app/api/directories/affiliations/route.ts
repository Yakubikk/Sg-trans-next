import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/server/auth";
import { affiliationsService } from "@/lib/directories";

/**
 * @swagger
 * /api/directories/affiliations:
 *   get:
 *     summary: Получить список принадлежностей
 *     description: Возвращает все доступные принадлежности из справочника
 *     tags:
 *       - Directories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список принадлежностей успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Affiliation'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         description: Внутренняя ошибка сервера
 *   post:
 *     summary: Создать новую принадлежность
 *     description: Добавляет новую принадлежность в справочник
 *     tags:
 *       - Directories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - value
 *             properties:
 *               value:
 *                 type: string
 *                 description: Значение принадлежности
 *                 example: "РЖД"
 *     responses:
 *       201:
 *         description: Принадлежность успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Affiliation'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const affiliations = await affiliationsService.getAll();
    return NextResponse.json(affiliations);
  } catch (error) {
    console.error("Error fetching affiliations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { value } = body;

    if (!value) {
      return NextResponse.json(
        { error: "Value is required" },
        { status: 400 }
      );
    }

    const affiliation = await affiliationsService.create({
      value,
    });

    return NextResponse.json(affiliation, { status: 201 });
  } catch (error) {
    console.error("Error creating affiliation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
