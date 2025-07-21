import { Metadata } from 'next';
import { LogoutButton, BackButton, WagonPassportSearch } from "@/components";

export const metadata: Metadata = {
  title: 'Паспортные данные вагонов | SG-Trans',
  description: 'Поиск и просмотр паспортных данных железнодорожных цистерн. Система управления транспортом SG-Trans.',
  keywords: ['вагоны', 'цистерны', 'паспортные данные', 'железнодорожный транспорт'],
};

export default function WagonPassports() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <BackButton>← Назад</BackButton>
          <LogoutButton />
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Паспортные данные вагонов</h1>
          <p className="text-lg text-gray-600">Поиск и просмотр паспортных данных железнодорожных цистерн</p>
        </div>

        <WagonPassportSearch />
      </div>
    </div>
  );
}
