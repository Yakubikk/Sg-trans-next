import { LogoutButton, BackButton } from "@/components";
import { ReferenceCard } from "@/components/cards";
import { 
  Train, 
  Settings, 
  Zap, 
  Wind, 
  CircleStop, 
  Package 
} from "lucide-react";

export default function References() {
  const references = [
    {
      href: "/references/wagons",
      title: "Вагоны",
      subtitle: "Справочник вагонов",
      description: "Просмотр и управление данными о вагонах, их характеристиках и статусах.",
      icon: Train,
      bgColor: "bg-blue-500"
    },
    {
      href: "/references/repair-types",
      title: "Типы ремонта",
      subtitle: "Справочник типов ремонта",
      description: "Управление типами ремонтных работ, их категориями и характеристиками.",
      icon: Settings,
      bgColor: "bg-green-500"
    },
    {
      href: "/references/absorber-devices",
      title: "Поглощающие аппараты",
      subtitle: "Справочник поглощающих аппаратов",
      description: "Управление данными о поглощающих аппаратах и их учете.",
      icon: Zap,
      bgColor: "bg-purple-500"
    },
    {
      href: "/references/air-distributors",
      title: "Воздухораспределители",
      subtitle: "Справочник воздухораспределителей",
      description: "Управление данными о воздухораспределителях и их характеристиках.",
      icon: Wind,
      bgColor: "bg-cyan-500"
    },
    {
      href: "/references/brakes",
      title: "Тормоза",
      subtitle: "Справочник тормозных систем",
      description: "Управление данными о тормозных системах и их характеристиках.",
      icon: CircleStop,
      bgColor: "bg-red-500"
    },
    {
      href: "/references/cargos",
      title: "Грузы",
      subtitle: "Справочник грузов",
      description: "Управление данными о грузах, их названиях и ценах.",
      icon: Package,
      bgColor: "bg-orange-500"
    }
  ];
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <BackButton className="mb-4">
                ← Назад
              </BackButton>
              <h1 className="text-2xl font-bold text-gray-900">Справочники</h1>
              <p className="mt-2 text-sm text-gray-600">
                Выберите справочник для просмотра и управления данными
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
