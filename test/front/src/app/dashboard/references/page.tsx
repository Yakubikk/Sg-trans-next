import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { 
  Building2, 
  Train, 
  FileText, 
  Users, 
  MapPin, 
  Bookmark, 
  Wrench, 
  Settings 
} from 'lucide-react';

const referenceItems = [
  {
    title: 'Производители',
    description: 'Управление справочником производителей вагонов',
    icon: Building2,
    href: '/dashboard/references/manufacturers',
    color: 'bg-blue-500',
  },
  {
    title: 'Типы вагонов',
    description: 'Справочник типов железнодорожных вагонов',
    icon: Train,
    href: '/dashboard/references/wagon-types',
    color: 'bg-green-500',
  },
  {
    title: 'Модели вагонов',
    description: 'Справочник моделей вагонов',
    icon: Train,
    href: '/dashboard/references/wagon-models',
    color: 'bg-indigo-500',
  },
  {
    title: 'Регистраторы',
    description: 'Справочник регистрирующих организаций',
    icon: FileText,
    href: '/dashboard/references/registrars',
    color: 'bg-yellow-500',
  },
  {
    title: 'Владельцы',
    description: 'Справочник владельцев вагонов',
    icon: Users,
    href: '/dashboard/references/owners',
    color: 'bg-purple-500',
  },
  {
    title: 'Депо',
    description: 'Справочник депо и мастерских',
    icon: Building2,
    href: '/dashboard/references/depots',
    color: 'bg-red-500',
  },
  {
    title: 'Местоположения',
    description: 'Справочник географических местоположений',
    icon: MapPin,
    href: '/dashboard/references/locations',
    color: 'bg-teal-500',
  },
  {
    title: 'Принадлежности',
    description: 'Справочник принадлежностей и организаций',
    icon: Bookmark,
    href: '/dashboard/references/affiliations',
    color: 'bg-orange-500',
  },
  {
    title: 'Типы деталей',
    description: 'Справочник типов запасных частей',
    icon: Wrench,
    href: '/dashboard/references/part-types',
    color: 'bg-cyan-500',
  },
  {
    title: 'Статусы деталей',
    description: 'Справочник статусов запасных частей',
    icon: Settings,
    href: '/dashboard/references/part-statuses',
    color: 'bg-pink-500',
  },
  {
    title: 'Типы ремонта',
    description: 'Справочник типов ремонтных работ',
    icon: Wrench,
    href: '/dashboard/references/repair-types',
    color: 'bg-slate-500',
  },
];

export default function ReferencesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Справочники
        </h1>
        <p className="text-gray-500">
          Управление справочными данными системы
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {referenceItems.map((item) => (
          <Link key={item.title} href={item.href}>
            <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <div className={`rounded-full p-2 ${item.color}`}>
                  <item.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
