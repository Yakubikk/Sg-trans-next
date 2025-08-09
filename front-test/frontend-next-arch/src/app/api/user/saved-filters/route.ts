import { NextRequest, NextResponse } from "next/server";
import { savedFilterService } from "@/lib/saved-filters";
import { requireAuth } from "@/server/auth";
import { saveFilterSchema } from "@/lib/validations";
import { z } from "zod";

/**
 * @swagger
 * /api/user/saved-filters:
 *   get:
 *     summary: Получить сохраненные фильтры пользователя
 *     description: Возвращает все сохраненные фильтры текущего пользователя
 *     tags:
 *       - User Saved Filters
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список сохраненных фильтров получен успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   name:
 *                     type: string
 *                     description: Название фильтра
 *                   filterJson:
 *                     type: string
 *                     description: JSON строка с параметрами фильтра
 *                   sortFieldsJson:
 *                     type: string
 *                     description: JSON строка с параметрами сортировки
 *                   userId:
 *                     type: string
 *                     format: uuid
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         description: Внутренняя ошибка сервера
 *   post:
 *     summary: Создать новый сохраненный фильтр
 *     description: Создает новый сохраненный фильтр для текущего пользователя
 *     tags:
 *       - User Saved Filters
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - filterJson
 *               - sortFieldsJson
 *             properties:
 *               name:
 *                 type: string
 *                 description: Название фильтра
 *                 example: "Мой фильтр"
 *               filterJson:
 *                 type: string
 *                 description: JSON строка с параметрами фильтра
 *                 example: '{"manufacturer": "УРАЛВАГОНЗАВОД"}'
 *               sortFieldsJson:
 *                 type: string
 *                 description: JSON строка с параметрами сортировки
 *                 example: '[{"field": "number", "direction": "asc"}]'
 *     responses:
 *       201:
 *         description: Фильтр успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                 filterJson:
 *                   type: string
 *                 sortFieldsJson:
 *                   type: string
 *                 userId:
 *                   type: string
 *                   format: uuid
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         description: Внутренняя ошибка сервера
 */
// GET - получить все сохраненные фильтры пользователя
export async function GET() {
  try {
    const session = await requireAuth();
    const userId = session.sub;

    const savedFilters = await savedFilterService.getByUserId(userId);
    return NextResponse.json(savedFilters);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    console.error("Error fetching saved filters:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - создать новый сохраненный фильтр
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    const userId = session.sub;

    const body = await request.json();
    
    // Валидация входных данных
    const validatedData = saveFilterSchema.parse({
      ...body,
      userId,
    });

    const savedFilter = await savedFilterService.create({
      userId: validatedData.userId!,
      name: validatedData.name,
      filterJson: validatedData.filterJson,
      sortFieldsJson: validatedData.sortFieldsJson,
    });

    if (!savedFilter) {
      return NextResponse.json(
        { error: "Failed to create saved filter" },
        { status: 500 }
      );
    }

    return NextResponse.json(savedFilter, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Некорректные данные", details: error.issues },
        { status: 400 }
      );
    }
    
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    console.error("Error creating saved filter:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
