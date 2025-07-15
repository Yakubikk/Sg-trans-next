import LogoutButton from "@/components/LogoutButton";
import { BackButton } from "@/components/BackButton";

export default function References() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <BackButton>← Назад</BackButton>
          <LogoutButton />
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Справочники</h1>
          <p className="text-lg text-gray-600">Управление справочными данными системы</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Раздел в разработке</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Здесь будут размещены справочники системы управления транспортом.
          </p>
        </div>
      </div>
    </div>
  );
}
