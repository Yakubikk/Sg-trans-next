"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { Role } from "@/types/permissions";
import { User } from "@/types/user";
import { cn } from "@/lib/utils";

// Компонент карточки пользователя
function UserCard({
  user,
  onEdit,
  onDelete,
}: {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}) {
  const getRoleColor = (role: Role) => {
    switch (role) {
      case Role.ADMIN:
        return "bg-red-100 text-red-800";
      case Role.USER:
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="min-w-12 h-12 rounded-full flex items-center justify-center border">
            {`${user.firstName[0].toUpperCase()} ${user.lastName[0].toUpperCase()}`}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm text-gray-600">{user.email}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className={cn("px-2 py-1 text-xs font-medium rounded-full", getRoleColor(user.role))}>
                {user.role === Role.ADMIN ? "Админ" : "Пользователь"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(user)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          title="Редактировать"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>

        <button
          onClick={() => onDelete(user.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          title="Удалить"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Основной компонент управления пользователями
export default function UserManagement() {
  const { users, totalUsers, currentPage, totalPages, isLoadingUsers, filters, fetchUsers, deleteUser, setFilters } =
    useUserStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    setFilters({ ...filters, search, page: 1 });
    fetchUsers({ ...filters, search, page: 1 });
  };

  const handleRoleFilter = (role: Role | undefined) => {
    setFilters({ ...filters, role, page: 1 });
    fetchUsers({ ...filters, role, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
    fetchUsers({ ...filters, page });
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этого пользователя?")) {
      try {
        await deleteUser(userId);
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Управление пользователями</h1>
        <p className="mt-2 text-gray-600">Просмотр и управление учетными записями пользователей</p>
      </div>

      {/* Фильтры и поиск */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Поиск</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Имя, email..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Роль</label>
            <select
              value={filters.role || ""}
              onChange={(e) => handleRoleFilter((e.target.value as Role) || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Все роли</option>
              <option value={Role.ADMIN}>Админ</option>
              <option value={Role.USER}>Пользователь</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                /* TODO: Реализовать создание пользователя */
              }}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Добавить пользователя
            </button>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Всего пользователей</p>
              <p className="text-2xl font-semibold text-gray-900">{totalUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Список пользователей */}
      {isLoadingUsers ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={() => {
                  /* TODO: Реализовать редактирование */
                }}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Пагинация */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium",
                      page === currentPage
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    )}
                  >
                    {page}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
}
