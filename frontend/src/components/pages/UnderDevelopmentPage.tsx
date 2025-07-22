'use client';

import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import { Settings, Construction, ArrowLeft, ClipboardList, Wrench, MapPin, FileText } from 'lucide-react';
import Link from 'next/link';

interface UnderDevelopmentPageProps {
  title: string;
  description: string;
  wagonNumber: string;
  iconColor?: string;
}

function getPageIcon(title: string, iconColor: string) {
  const iconClass = `w-5 h-5 ${iconColor}`;
  
  switch (title.toLowerCase()) {
    case 'лист комплектации':
      return <ClipboardList className={iconClass} />;
    case 'сведения о ремонтах':
      return <Wrench className={iconClass} />;
    case 'локализация вагона':
      return <MapPin className={iconClass} />;
    case 'журнал изменений':
      return <FileText className={iconClass} />;
    default:
      return <Settings className={iconClass} />;
  }
}

export default function UnderDevelopmentPage({ 
  title, 
  description, 
  wagonNumber,
  iconColor = "text-blue-500" 
}: UnderDevelopmentPageProps) {
  return (
    <div className="space-y-6">
      {/* Хлебные крошки */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600">
        <Link href="/wagon-passports" className="hover:text-blue-600">
          Паспорта вагонов
        </Link>
        <span>/</span>
        <span className="text-gray-900">Вагон {wagonNumber}</span>
        <span>/</span>
        <span className="text-gray-900">{title}</span>
      </nav>

      {/* Основная карточка */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${iconColor.replace('text-', 'bg-').replace('500', '100')} flex items-center justify-center`}>
              {getPageIcon(title, iconColor)}
            </div>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-yellow-100 mb-6">
              <Construction className="h-12 w-12 text-yellow-600" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Раздел в разработке</h3>
            
            <div className="max-w-md mx-auto space-y-4">
              <p className="text-gray-600 mb-2">
                {description}
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">№</span>
                  </div>
                  <span className="text-sm font-medium text-blue-900">Номер вагона:</span>
                </div>
                <p className="text-lg font-bold text-blue-800">{wagonNumber}</p>
              </div>
              
              <p className="text-sm text-gray-500">
                Функционал будет доступен в следующих версиях системы.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Кнопки навигации */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <Link href="/wagon-passports">
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Назад к поиску
              </Button>
            </Link>
            
            <div className="flex gap-3">
              <Link href={`/wagon-passports/${encodeURIComponent(wagonNumber)}/complectation-list`}>
                <Button variant="outline" size="sm" className="bg-blue-500 text-white hover:bg-blue-700 hover:text-white flex items-center gap-1">
                  <ClipboardList className="w-4 h-4" />
                  Лист комплектации
                </Button>
              </Link>
              <Link href={`/wagon-passports/${encodeURIComponent(wagonNumber)}/repair-history`}>
                <Button variant="outline" size="sm" className="bg-orange-500 text-white hover:bg-orange-600 hover:text-white flex items-center gap-1">
                  <Wrench className="w-4 h-4" />
                  Ремонты
                </Button>
              </Link>
              <Link href={`/wagon-passports/${encodeURIComponent(wagonNumber)}/wagon-location`}>
                <Button variant="outline" size="sm" className="bg-green-600 text-white hover:bg-green-700 hover:text-white flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Локализация
                </Button>
              </Link>
              <Link href={`/wagon-passports/${encodeURIComponent(wagonNumber)}/wagon-change-log`}>
                <Button variant="outline" size="sm" className="bg-red-600 text-white hover:bg-red-700 hover:text-white flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  Журнал изменений
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
