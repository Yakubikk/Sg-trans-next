import type { Metadata } from 'next';
import { BackButton, LogoutButton } from '@/components';
import { UnderDevelopmentPage } from '@/components/pages';

interface ComplectationListPageProps {
  params: Promise<{
    cisternNumber: string;
  }>;
}

export async function generateMetadata({ params }: ComplectationListPageProps): Promise<Metadata> {
  const { cisternNumber } = await params;
  const decodedNumber = decodeURIComponent(cisternNumber);
  
  return {
    title: `Лист комплектации - Вагон ${decodedNumber} | SG Trans`,
    description: `Лист комплектации для железнодорожной цистерны номер ${decodedNumber}`,
  };
}

export default async function ComplectationListPage({ params }: ComplectationListPageProps) {
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
                Лист комплектации - Вагон {decodedCisternNumber}
              </h1>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UnderDevelopmentPage
          title="Лист комплектации"
          description="В данном разделе будет отображаться подробная информация о комплектации вагона, включая все установленные части и узлы."
          wagonNumber={decodedCisternNumber}
          iconColor="text-blue-500"
        />
      </main>
    </div>
  );
}
