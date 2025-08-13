'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';
import { 
  Database, 
  Train, 
  Users, 
  Settings, 
  LogOut, 
  ChevronDown,
  ChevronRight,
  Building2,
  MapPin,
  Wrench,
  FileText,
  Bookmark
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Главная',
    href: '/dashboard',
    icon: Database,
  },
  {
    title: 'Паспорта цистерн',
    href: '/dashboard/cisterns',
    icon: Train,
  },
  {
    title: 'Справочники',
    icon: Database,
    children: [
      {
        title: 'Производители',
        href: '/dashboard/references/manufacturers',
        icon: Building2,
      },
      {
        title: 'Типы вагонов',
        href: '/dashboard/references/wagon-types',
        icon: Train,
      },
      {
        title: 'Модели вагонов',
        href: '/dashboard/references/wagon-models',
        icon: Train,
      },
      {
        title: 'Регистраторы',
        href: '/dashboard/references/registrars',
        icon: FileText,
      },
      {
        title: 'Владельцы',
        href: '/dashboard/references/owners',
        icon: Users,
      },
      {
        title: 'Депо',
        href: '/dashboard/references/depots',
        icon: Building2,
      },
      {
        title: 'Местоположения',
        href: '/dashboard/references/locations',
        icon: MapPin,
      },
      {
        title: 'Принадлежности',
        href: '/dashboard/references/affiliations',
        icon: Bookmark,
      },
      {
        title: 'Типы деталей',
        href: '/dashboard/references/part-types',
        icon: Wrench,
      },
      {
        title: 'Статусы деталей',
        href: '/dashboard/references/part-statuses',
        icon: Settings,
      },
      {
        title: 'Типы ремонта',
        href: '/dashboard/references/repair-types',
        icon: Wrench,
      },
    ],
  },
  {
    title: 'Пользователи',
    href: '/dashboard/users',
    icon: Users,
  },
  {
    title: 'Настройки',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Справочники']);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.title);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = item.href === pathname;

    return (
      <div key={item.title}>
        {item.href ? (
          <Link href={item.href}>
            <div
              className={cn(
                'flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900',
                isActive && 'bg-gray-200 text-gray-900',
                level > 0 && 'ml-6'
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{item.title}</span>
            </div>
          </Link>
        ) : (
          <button
            onClick={() => toggleExpanded(item.title)}
            className={cn(
              'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-gray-500 transition-all hover:text-gray-900',
              level > 0 && 'ml-6'
            )}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{item.title}</span>
            </div>
            {hasChildren && (
              isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
        
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-full w-64 flex-col bg-white shadow-lg">
      {/* Header */}
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold text-gray-900">SG Trans</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {sidebarItems.map(item => renderSidebarItem(item))}
      </nav>

      {/* User info and logout */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500">
              {user?.roles && user.roles.length > 0 ? user.roles.join(', ') : 'Пользователь'}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Выйти
        </Button>
      </div>
    </div>
  );
}
