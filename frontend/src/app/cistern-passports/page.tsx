import { Metadata } from 'next';
import { Suspense } from 'react';
import { LogoutButton, BackButton, CisternPassport } from "@/components";
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Паспортные данные вагонов | SG-Trans',
  description: 'Поиск и просмотр паспортных данных железнодорожных цистерн. Система управления транспортом SG-Trans.',
  keywords: ['вагоны', 'цистерны', 'паспортные данные', 'железнодорожный транспорт'],
};

function SearchFallback() {
  return (
    <div className="animate-pulse">
      <div className="h-32 bg-gray-200 rounded mb-4"></div>
      <div className="h-64 bg-gray-200 rounded"></div>
    </div>
  );
}

export default function CisternPassportPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <BackButton>← Назад</BackButton>
            <div>|</div>
            <Link href="/">На главную</Link>
          </div>
          <LogoutButton />
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Паспортные данные вагонов</h1>
          <p className="text-lg text-gray-600">Поиск и просмотр паспортных данных железнодорожных цистерн</p>
        </div>

        <Suspense fallback={<SearchFallback />}>
          <CisternPassport />
        </Suspense>
      </div>
    </div>
  );
}
