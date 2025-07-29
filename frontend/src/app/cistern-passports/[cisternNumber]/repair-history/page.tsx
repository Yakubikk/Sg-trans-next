import type { Metadata } from 'next';
import { BackButton, LogoutButton } from '@/components';
import UnderDevelopmentPage from '@/components/pages/UnderDevelopmentPage';

interface RepairHistoryPageProps {
  params: Promise<{
    cisternNumber: string;
  }>;
}

export async function generateMetadata({ params }: RepairHistoryPageProps): Promise<Metadata> {
  const { cisternNumber } = await params;
  const decodedNumber = decodeURIComponent(cisternNumber);
  
  return {
    title: `Сведения о ремонтах - Вагон ${decodedNumber} | SG Trans`,
    description: `История ремонтов железнодорожной цистерны номер ${decodedNumber}`,
  };
}

export default async function RepairHistoryPage({ params }: RepairHistoryPageProps) {
  const { cisternNumber } = await params;
  const decodedCisternNumber = decodeURIComponent(cisternNumber);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <BackButton>← Назад</BackButton>
              <h1 className="text-2xl font-bold text-gray-900">
                Сведения о ремонтах - Вагон {decodedCisternNumber}
              </h1>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UnderDevelopmentPage
          title="Сведения о ремонтах"
          description="В данном разделе будет отображаться полная история ремонтов и технического обслуживания вагона."
          wagonNumber={decodedCisternNumber}
          iconColor="text-orange-500"
        />
      </main>
    </div>
  );
}
