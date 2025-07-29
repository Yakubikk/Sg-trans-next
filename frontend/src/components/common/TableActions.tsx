"use client";

import { Eye, Edit, Trash2, MoreHorizontal } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";

interface Action<T> {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: (item: T) => void;
  className?: string;
  show?: boolean;
}

interface TableActionsProps<T> {
  item: T;
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  customActions?: Action<T>[];
  itemIdField?: keyof T; // поле для копирования ID
}

/**
 * Универсальный компонент для действий в таблице
 * Устраняет дублирование dropdown меню во всех таблицах
 */
export function TableActions<T>({
  item,
  onView,
  onEdit,
  onDelete,
  customActions = [],
  itemIdField = 'id' as keyof T,
}: TableActionsProps<T>) {
  const itemId = item[itemIdField] as string;

  const defaultActions: Action<T>[] = [
    {
      label: "Просмотр",
      icon: Eye,
      onClick: onView!,
      show: !!onView,
    },
    {
      label: "Редактировать",
      icon: Edit,
      onClick: onEdit!,
      show: !!onEdit,
    },
    {
      label: "Удалить",
      icon: Trash2,
      onClick: onDelete!,
      className: "text-red-600",
      show: !!onDelete,
    },
  ];

  const allActions = [...customActions, ...defaultActions].filter(action => action.show !== false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Открыть меню</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Действия</DropdownMenuLabel>
        
        {itemId && (
          <>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(itemId)}>
              Копировать ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {allActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <DropdownMenuItem
              key={index}
              onClick={() => action.onClick(item)}
              className={action.className}
            >
              <Icon className="mr-2 h-4 w-4" />
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
