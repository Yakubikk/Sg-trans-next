"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Database,
  Building2,
  MapPin,
  Factory,
  Users,
  FileText,
  Wrench,
  Hash,
  Train,
  Truck,
  Container,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Маппинг путей к названиям и иконкам для breadcrumbs
const pathMap: Record<
  string,
  { label: string; icon: React.ComponentType<{ className?: string }>; description?: string }
> = {
  "/directories": {
    label: "Справочники",
    icon: Database,
    description: "Управление данными",
  },
  "/directories/affiliations": {
    label: "Принадлежности",
    icon: Building2,
    description: "Принадлежности железнодорожного транспорта",
  },
  "/directories/depots": {
    label: "Депо",
    icon: Building2,
    description: "Железнодорожные депо",
  },
  "/directories/locations": {
    label: "Местоположения",
    icon: MapPin,
    description: "Географические местоположения",
  },
  "/directories/manufacturers": {
    label: "Производители",
    icon: Factory,
    description: "Производители подвижного состава",
  },
  "/directories/owners": {
    label: "Владельцы",
    icon: Users,
    description: "Владельцы подвижного состава",
  },
  "/directories/registrars": {
    label: "Регистраторы",
    icon: FileText,
    description: "Регистрирующие организации",
  },
  "/directories/repair-types": {
    label: "Типы ремонтов",
    icon: Wrench,
    description: "Классификация типов ремонта",
  },
  "/directories/stamp-numbers": {
    label: "Номера клейм",
    icon: Hash,
    description: "Номера контрольных клейм",
  },
  "/directories/wagon-models": {
    label: "Модели вагонов",
    icon: Train,
    description: "Модели железнодорожных вагонов",
  },
  "/directories/wagon-types": {
    label: "Типы вагонов",
    icon: Truck,
    description: "Классификация типов вагонов",
  },
  "/directories/railway-cisterns": {
    label: "Цистерны",
    icon: Container,
    description: "Железнодорожные цистерны",
  },
};

interface DirectoriesBreadcrumbProps {
  userEmail?: string;
}

export function DirectoriesBreadcrumb({ userEmail }: DirectoriesBreadcrumbProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  // Создаем массив путей для breadcrumbs
  const breadcrumbItems = [];
  let currentPath = "";

  // Добавляем главную страницу
  breadcrumbItems.push({
    href: "/",
    label: "Главная",
    isLast: false,
    icon: Home,
  });

  // Проходим по сегментам пути
  for (let i = 0; i < pathSegments.length; i++) {
    currentPath += `/${pathSegments[i]}`;
    const isLast = i === pathSegments.length - 1;
    const pathInfo = pathMap[currentPath];
    const label = pathInfo?.label || pathSegments[i];
    const icon = pathInfo?.icon || Database;

    breadcrumbItems.push({
      href: currentPath,
      label,
      isLast,
      icon,
      description: pathInfo?.description,
    });
  }

  return (
    <div>
      {/* Beautiful Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbItems.map((item, index) => (
                    <div key={item.href} className="flex items-center gap-2">
                      {index > 0 && (
                        <BreadcrumbSeparator />
                      )}
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link href={item.href}>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <item.icon className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">{item.label}</h1>
                                {item.description && (
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {userEmail && (
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{userEmail}</p>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
