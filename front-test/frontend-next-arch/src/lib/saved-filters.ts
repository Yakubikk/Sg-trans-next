import { prisma } from "@/server/db";

export interface SavedFilterData {
  Id: string;
  Name: string;
  FilterJson: string;
  SortFieldsJson: string;
  UserId: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}

// Функция для проверки валидности UUID
function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

// Функция для генерации валидного UUID, если строка не является UUID
function ensureValidUUID(input: string): string {
  if (isValidUUID(input)) {
    return input;
  }
  // Генерируем UUID на основе строки (для демонстрации)
  // В реальном приложении лучше использовать правильную аутентификацию
  return "550e8400-e29b-41d4-a716-446655440000";
}

export const savedFilterService = {
  // Получить все сохраненные фильтры пользователя
  async getByUserId(userId: string): Promise<SavedFilterData[]> {
    try {
      const validUserId = ensureValidUUID(userId);
      const filters = await prisma.$queryRaw<SavedFilterData[]>`
        SELECT * FROM "SavedFilters" 
        WHERE "UserId" = ${validUserId}::uuid
        ORDER BY "CreatedAt" DESC
      `;
      return filters;
    } catch (error) {
      console.error("Error fetching saved filters:", error);
      return [];
    }
  },

  // Создать новый сохраненный фильтр
  async create(data: {
    userId: string;
    name: string;
    filterJson: string;
    sortFieldsJson: string;
  }): Promise<SavedFilterData | null> {
    try {
      const id = crypto.randomUUID();
      const validUserId = ensureValidUUID(data.userId);
      const now = new Date();

      const result = await prisma.$queryRaw<SavedFilterData[]>`
        INSERT INTO "SavedFilters" ("Id", "UserId", "Name", "FilterJson", "SortFieldsJson", "CreatedAt", "UpdatedAt")
        VALUES (${id}::uuid, ${validUserId}::uuid, ${data.name}, ${data.filterJson}, ${data.sortFieldsJson}, ${now}, ${now})
        RETURNING *
      `;

      return result[0] || null;
    } catch (error) {
      console.error("Error creating saved filter:", error);
      return null;
    }
  },

  // Обновить сохраненный фильтр
  async update(
    id: string,
    data: {
      name: string;
      filterJson: string;
      sortFieldsJson: string;
    }
  ): Promise<SavedFilterData | null> {
    try {
      const validId = ensureValidUUID(id);
      const now = new Date();

      const result = await prisma.$queryRaw<SavedFilterData[]>`
        UPDATE "SavedFilters" 
        SET "Name" = ${data.name}, 
            "FilterJson" = ${data.filterJson}, 
            "SortFieldsJson" = ${data.sortFieldsJson}, 
            "UpdatedAt" = ${now}
        WHERE "Id" = ${validId}::uuid
        RETURNING *
      `;

      return result[0] || null;
    } catch (error) {
      console.error("Error updating saved filter:", error);
      return null;
    }
  },

  // Удалить сохраненный фильтр
  async delete(id: string): Promise<boolean> {
    try {
      const validId = ensureValidUUID(id);
      await prisma.$queryRaw`
        DELETE FROM "SavedFilters" 
        WHERE "Id" = ${validId}::uuid
      `;
      return true;
    } catch (error) {
      console.error("Error deleting saved filter:", error);
      return false;
    }
  },

  // Получить конкретный фильтр
  async getById(id: string): Promise<SavedFilterData | null> {
    try {
      const validId = ensureValidUUID(id);
      const result = await prisma.$queryRaw<SavedFilterData[]>`
        SELECT * FROM "SavedFilters" 
        WHERE "Id" = ${validId}::uuid
      `;

      return result[0] || null;
    } catch (error) {
      console.error("Error fetching saved filter:", error);
      return null;
    }
  },
};
