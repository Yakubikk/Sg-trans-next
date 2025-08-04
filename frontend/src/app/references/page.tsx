import { LogoutButton, BackButton } from "@/components";
import { ReferenceCard } from "@/components/cards";
import { 
  Train,
  Settings,
  Wind,
  Disc,
  Package,
  Users,
  Wrench,
} from "lucide-react";

export default function References() {
  const references = [
    {
      href: "/references/cisterns",
      title: "Вагоны-цистерны",
      subtitle: "Справочник цистерн",
      description: "Просмотр и управление данными о железнодорожных цистернах, их характеристиках и паспортных данных.",
      icon: Train,
      bgColor: "bg-blue-500"
    },
    {
      href: "/references/absorber-devices",
      title: "Поглощающие аппараты",
      subtitle: "Справочник поглощающих аппаратов",
      description: "Каталог поглощающих аппаратов для железнодорожного подвижного состава.",
      icon: Settings,
      bgColor: "bg-green-500"
    },
    {
      href: "/references/air-distributors",
      title: "Воздухораспределители",
      subtitle: "Справочник воздухораспределителей",
      description: "Каталог воздухораспределителей тормозных систем железнодорожного транспорта.",
      icon: Wind,
      bgColor: "bg-cyan-500"
    },
    {
      href: "/references/brakes",
      title: "Тормозные системы",
      subtitle: "Справочник тормозов",
      description: "Каталог тормозных систем и их компонентов для железнодорожного подвижного состава.",
      icon: Disc,
      bgColor: "bg-red-500"
    },
    {
      href: "/references/cargos",
      title: "Грузы",
      subtitle: "Справочник грузов",
      description: "Классификатор грузов для перевозки железнодорожным транспортом.",
      icon: Package,
      bgColor: "bg-orange-500"
    },
    {
      href: "/references/owners",
      title: "Владельцы",
      subtitle: "Справочник владельцев",
      description: "Реестр владельцев железнодорожного подвижного состава.",
      icon: Users,
      bgColor: "bg-purple-500"
    },
    {
      href: "/references/repair-types",
      title: "Типы ремонта",
      subtitle: "Справочник видов ремонта",
      description: "Классификатор типов и видов ремонта железнодорожного подвижного состава.",
      icon: Wrench,
      bgColor: "bg-yellow-500"
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <BackButton className="mb-4">
                ← Назад
              </BackButton>
              <h1 className="text-2xl font-bold text-gray-900">Справочники системы</h1>
              <p className="mt-2 text-sm text-gray-600">
                Управление справочными данными железнодорожного транспорта
              </p>
            </div>
            <LogoutButton />
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {references.map((reference) => (
              <ReferenceCard
                key={reference.href}
                href={reference.href}
                title={reference.title}
                subtitle={reference.subtitle}
                description={reference.description}
                icon={reference.icon}
                bgColor={reference.bgColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
