import { BackButton } from "@/components";
import { AbsorberDevicesPageClient } from "@/components/pages";

export default function AbsorberDevicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <BackButton className="mb-4">
                ← Назад к справочникам
              </BackButton>
              <h1 className="text-2xl font-bold text-gray-900">Справочник поглощающих аппаратов</h1>
              <p className="mt-2 text-sm text-gray-600">
                Управление данными о поглощающих аппаратах и их учете
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <div className="bg-white shadow rounded-lg p-6">
              <AbsorberDevicesPageClient />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
