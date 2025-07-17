import { BackButton } from "@/components";
import { RepairTypesPageClient } from "@/components/pages";

export default function RepairTypesPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <BackButton className="mb-4">
                ← Назад к справочникам
              </BackButton>
              <h1 className="text-2xl font-bold text-gray-900">Справочник типов ремонта</h1>
              <p className="mt-2 text-sm text-gray-600">
                Управление типами и категориями ремонтных работ
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <RepairTypesPageClient />
          </div>
        </div>
      </div>
    </div>
  );
}
