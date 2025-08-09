// Тесты для схем валидации
// Этот файл демонстрирует тестирование схем валидации

import { z } from "zod";
import { 
  loginSchema, 
  registerSchema
} from "./auth";
import { 
  wagonSearchSchema, 
  quickSearchSchema,
  cisternSearchSchema 
} from "./search";
import { 
  filterValueSchema, 
  saveFilterSchema
} from "./filters";

// Тесты для схемы входа
export function testLoginSchema() {
  console.log("Тестирование loginSchema...");
  
  // Валидные данные
  const validLoginData = {
    email: "user@example.com",
    password: "password123"
  };
  
  try {
    const result = loginSchema.parse(validLoginData);
    console.log("✅ Валидные данные прошли проверку:", result);
  } catch (error) {
    console.error("❌ Ошибка с валидными данными:", error);
  }
  
  // Невалидные данные
  const invalidLoginData = {
    email: "invalid-email",
    password: ""
  };
  
  try {
    loginSchema.parse(invalidLoginData);
    console.error("❌ Невалидные данные прошли проверку!");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("✅ Невалидные данные корректно отклонены:", 
        error.issues.map(issue => issue.message));
    }
  }
}

// Тесты для схемы регистрации
export function testRegisterSchema() {
  console.log("Тестирование registerSchema...");
  
  // Валидные данные
  const validRegisterData = {
    email: "user@example.com",
    password: "StrongPass123!",
    confirmPassword: "StrongPass123!",
    firstName: "Иван",
    lastName: "Иванов",
    patronymic: "Иванович",
    phoneNumber: "+375291234567",
    roleIds: [1, 2]
  };
  
  try {
    const result = registerSchema.parse(validRegisterData);
    console.log("✅ Валидные данные регистрации прошли проверку:", result);
  } catch (error) {
    console.error("❌ Ошибка с валидными данными регистрации:", error);
  }
  
  // Невалидные данные - пароли не совпадают
  const invalidRegisterData = {
    email: "user@example.com",
    password: "StrongPass123!",
    confirmPassword: "DifferentPass123!",
    roleIds: [1]
  };
  
  try {
    registerSchema.parse(invalidRegisterData);
    console.error("❌ Данные с несовпадающими паролями прошли проверку!");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("✅ Данные с несовпадающими паролями корректно отклонены:", 
        error.issues.map(issue => issue.message));
    }
  }
}

// Тесты для схем поиска
export function testSearchSchemas() {
  console.log("Тестирование схем поиска...");
  
  // Тест поиска вагонов
  try {
    const validWagonSearch = wagonSearchSchema.parse({ query: "12345678" });
    console.log("✅ Поиск вагонов - валидные данные:", validWagonSearch);
  } catch (error) {
    console.error("❌ Ошибка поиска вагонов:", error);
  }
  
  // Тест быстрого поиска
  try {
    const validQuickSearch = quickSearchSchema.parse({ query: "  поиск  " });
    console.log("✅ Быстрый поиск - валидные данные (с обрезкой пробелов):", validQuickSearch);
  } catch (error) {
    console.error("❌ Ошибка быстрого поиска:", error);
  }
  
  // Тест поиска цистерн
  try {
    const validCisternSearch = cisternSearchSchema.parse({ number: "СЦ123456" });
    console.log("✅ Поиск цистерн - валидные данные:", validCisternSearch);
  } catch (error) {
    console.error("❌ Ошибка поиска цистерн:", error);
  }
  
  // Тест с пустым запросом
  try {
    quickSearchSchema.parse({ query: "" });
    console.error("❌ Пустой запрос прошел проверку!");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("✅ Пустой запрос корректно отклонен");
    }
  }
}

// Тесты для схем фильтров
export function testFilterSchemas() {
  console.log("Тестирование схем фильтров...");
  
  // Тест валидного фильтра
  const validFilter = {
    column: "number",
    operator: "contains" as const,
    value: "12345",
    values: [],
    date: undefined
  };
  
  try {
    const result = filterValueSchema.parse(validFilter);
    console.log("✅ Валидный фильтр прошел проверку:", result);
  } catch (error) {
    console.error("❌ Ошибка с валидным фильтром:", error);
  }
  
  // Тест сохранения фильтра
  const validSaveFilter = {
    name: "Мой фильтр",
    filterJson: JSON.stringify([validFilter]),
    sortFieldsJson: JSON.stringify([{ field: "number", direction: "asc" }]),
    userId: "123e4567-e89b-12d3-a456-426614174000"
  };
  
  try {
    const result = saveFilterSchema.parse(validSaveFilter);
    console.log("✅ Валидное сохранение фильтра прошло проверку:", result);
  } catch (error) {
    console.error("❌ Ошибка с валидным сохранением фильтра:", error);
  }
  
  // Тест невалидного оператора
  const invalidFilter = {
    column: "number",
    operator: "invalid_operator",
    value: "12345"
  };
  
  try {
    filterValueSchema.parse(invalidFilter);
    console.error("❌ Невалидный оператор прошел проверку!");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("✅ Невалидный оператор корректно отклонен");
    }
  }
}

// Тест производительности
export function testPerformance() {
  console.log("Тестирование производительности...");
  
  const testData = {
    email: "user@example.com",
    password: "password123"
  };
  
  const startTime = performance.now();
  const iterations = 10000;
  
  for (let i = 0; i < iterations; i++) {
    try {
      loginSchema.parse(testData);
    } catch {
      // Игнорируем ошибки в тесте производительности
    }
  }
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  console.log(`✅ Производительность: ${iterations} валидаций за ${duration.toFixed(2)}мс 
    (${(duration / iterations).toFixed(4)}мс на валидацию)`);
}

// Тест трансформации данных
export function testTransformations() {
  console.log("Тестирование трансформации данных...");
  
  // Тест обрезки пробелов
  const dataWithSpaces = {
    query: "  12345  "
  };
  
  try {
    const result = quickSearchSchema.parse(dataWithSpaces);
    console.log("✅ Трансформация (обрезка пробелов):", 
      `"${dataWithSpaces.query}" -> "${result.query}"`);
  } catch (error) {
    console.error("❌ Ошибка трансформации:", error);
  }
}

// Функция для запуска всех тестов
export function runAllTests() {
  console.log("🧪 Запуск всех тестов валидации...\n");
  
  testLoginSchema();
  console.log();
  
  testRegisterSchema();
  console.log();
  
  testSearchSchemas();
  console.log();
  
  testFilterSchemas();
  console.log();
  
  testTransformations();
  console.log();
  
  testPerformance();
  console.log();
  
  console.log("✅ Все тесты завершены!");
}

// Экспорт для использования в других файлах
const validationTests = {
  testLoginSchema,
  testRegisterSchema,
  testSearchSchemas,
  testFilterSchemas,
  testPerformance,
  testTransformations,
  runAllTests
};

export default validationTests;
