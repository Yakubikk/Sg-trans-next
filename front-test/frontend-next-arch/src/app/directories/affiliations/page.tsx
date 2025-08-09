import { getSession } from "@/server/auth";
import { affiliationsService } from "@/lib/directories";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  ArrowLeft, 
  Shield, 
  Plus, 
  Search,
  Edit,
  Trash2
} from "lucide-react";

export default async function AffiliationsPage() {
  const session = await getSession();
  
  // Получаем все принадлежности из базы данных
  const affiliations = await affiliationsService.getAll();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/directories">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Справочники
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Принадлежности</h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Справочник принадлежностей вагонов</p>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {session?.email}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Принадлежности вагонов
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Управление справочником принадлежностей подвижного состава
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Search className="w-4 h-4 mr-2" />
                Поиск
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добавить принадлежность
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="border-0 bg-blue-50 dark:bg-blue-900/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Всего записей</p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                      {affiliations.length}
                    </p>
                  </div>
                  <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-green-50 dark:bg-green-900/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400">Активные</p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                      {affiliations.length}
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-gray-50 dark:bg-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Всего записей БД</p>
                    <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                      {affiliations.length}
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📊</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Data Table */}
        <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Список принадлежностей</CardTitle>
            <CardDescription>
              Все записи справочника принадлежностей вагонов
            </CardDescription>
          </CardHeader>
          <CardContent>
            {affiliations.length > 0 ? (
              <div className="space-y-4">
                {affiliations.map((affiliation) => (
                  <div key={affiliation.id} className="flex items-center justify-between p-4 rounded-lg border bg-white dark:bg-gray-700/50 hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {affiliation.value}
                        </h3>
                        <Badge variant="default" className="text-xs">
                          ID: {affiliation.id.substring(0, 8)}...
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        UUID: {affiliation.id}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Нет данных
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  В справочнике принадлежностей пока нет записей.
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить первую запись
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
