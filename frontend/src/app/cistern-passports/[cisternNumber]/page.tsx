import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BackButton, CisternPassportClient, LogoutButton } from "@/components";

interface PageProps {
  params: Promise<{
    cisternNumber: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cisternNumber } = await params;
  const decodedCisternNumber = decodeURIComponent(cisternNumber);

  return {
    title: `Паспорт цистерны №${decodedCisternNumber} | SG-Trans`,
    description: `Детальная информация о железнодорожной цистерне №${decodedCisternNumber}. Технические характеристики, сроки обслуживания, эксплуатационные данные.`,
    keywords: ["цистерна", "паспорт", "железнодорожный транспорт", "технические характеристики"],
  };
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <BackButton>← Назад к паспортам</BackButton>
          <LogoutButton />
        </div>

        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="h-48 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default async function CisternPassportDetailPage({ params }: PageProps) {
  const { cisternNumber } = await params;
  const decodedCisternNumber = decodeURIComponent(cisternNumber);

  if (!decodedCisternNumber) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <BackButton>← Назад к паспортам</BackButton>
          <LogoutButton />
        </div>

        <Suspense fallback={<LoadingFallback />}>
          <CisternPassportClient cisternNumber={decodedCisternNumber} />
        </Suspense>
      </div>
    </div>
  );
}
