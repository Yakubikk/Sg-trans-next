import { redirect } from "next/navigation";
import { getSession } from "@/server/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Shield, Settings, Search, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { prisma } from "@/server/db";
import { RegisterUserDialog } from "@/components/RegisterUserDialog";

export default async function PersonnelPage() {
  const session = await getSession();
  if (!session) redirect("/guest");
  
  // Проверяем, что пользователь - администратор
  if (!session.roles.includes("Admin")) {
    redirect("/dashboard");
  }

  // Получаем список пользователей с их ролями
  const users = await prisma.users.findMany({
    include: {
      roles: {
        include: {
          role: true
        }
      }
    },
    orderBy: {
      email: 'asc'
    }
  });

  // Получаем список доступных ролей
  const availableRoles = await prisma.role.findMany({
    orderBy: {
      name: 'asc'
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Управление персоналом</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Пользователи, роли и разрешения</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{session.email}</p>
              <div className="flex gap-1 justify-end">
                {session.roles.map((role) => (
                  <Badge key={role} variant="secondary" className="text-xs">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Поиск пользователей..."
                className="pl-10 w-80"
              />
            </div>
          </div>
          
          <RegisterUserDialog availableRoles={availableRoles}>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Добавить пользователя
            </Button>
          </RegisterUserDialog>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Всего пользователей</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {users.filter(user => user.roles.some(ur => ur.role.name === "Admin")).length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Администраторы</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Settings className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{availableRoles.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ролей в системе</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {users.filter(user => user.roles.length === 0).length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Без ролей</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle>Список пользователей</CardTitle>
            <CardDescription>
              Управление пользователями системы и их ролями
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {user.firstName && user.lastName 
                          ? `${user.lastName} ${user.firstName}${user.patronymic ? ` ${user.patronymic}` : ''}`
                          : user.email
                        }
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                      {user.phoneNumber && (
                        <p className="text-sm text-gray-500 dark:text-gray-500">{user.phoneNumber}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex gap-1">
                      {user.roles.map((userRole) => (
                        <Badge
                          key={userRole.role.id}
                          variant={userRole.role.name === "Admin" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {userRole.role.name}
                        </Badge>
                      ))}
                      {user.roles.length === 0 && (
                        <Badge variant="outline" className="text-xs">
                          Без роли
                        </Badge>
                      )}
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {users.length === 0 && (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Пользователи не найдены
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Начните с добавления первого пользователя в систему
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
