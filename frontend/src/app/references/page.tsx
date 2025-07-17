import LogoutButton from "@/components/LogoutButton";
import { BackButton } from "@/components/BackButton";
import ReferencesButtons from "@/components/ReferencesButtons";

export default function References() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <BackButton>← Назад</BackButton>
          <LogoutButton />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Справочники</h1>
          <p className="text-lg text-gray-600">Управление справочными данными системы</p>
        </div>

        <ReferencesButtons />
      </div>
    </div>
  );
}
