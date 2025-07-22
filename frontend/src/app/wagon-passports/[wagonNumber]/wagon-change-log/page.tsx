import type { Metadata } from 'next';
import { BackButton, LogoutButton } from '@/components';
import UnderDevelopmentPage from '@/components/pages/UnderDevelopmentPage';

interface WagonChangeLogPageProps {
  params: Promise<{
    wagonNumber: string;
  }>;
}

export async function generateMetadata({ params }: WagonChangeLogPageProps): Promise<Metadata> {
  const { wagonNumber } = await params;
  const decodedNumber = decodeURIComponent(wagonNumber);
  
  return {
    title: `Журнал изменений - Вагон ${decodedNumber} | SG Trans`,
    description: `Журнал изменений железнодорожной цистерны номер ${decodedNumber}`,
  };
}

export default async function WagonChangeLogPage({ params }: WagonChangeLogPageProps) {
  const { wagonNumber } = await params;
  const decodedWagonNumber = decodeURIComponent(wagonNumber);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <BackButton>← Назад</BackButton>
              <h1 className="text-2xl font-bold text-gray-900">
                Журнал изменений - Вагон {decodedWagonNumber}
              </h1>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UnderDevelopmentPage
          title="Журнал изменений"
          description="В данном разделе будет отображаться подробный журнал всех изменений, внесенных в данные вагона."
          wagonNumber={decodedWagonNumber}
          iconColor="text-red-500"
        />
      </main>
    </div>
  );
}
