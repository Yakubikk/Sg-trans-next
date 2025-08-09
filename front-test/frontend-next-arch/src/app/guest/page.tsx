import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Truck, BarChart3, Users, Shield, ArrowRight, CheckCircle, Globe, Building } from "lucide-react";
import { AutoRefresh } from "@/components/AutoRefresh";

export default function GuestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <AutoRefresh />
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">СГ-ТРАНС</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Система автоматизации</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button asChild>
              <Link href="/login">Войти в систему</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Автоматизация процессов
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                РУП СГ-ТРАНС
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Современная система управления транспортно-экспедиционными процессами 
              для ведущего предприятия по перевозке сжиженных углеводородных газов
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-3" asChild>
              <Link href="/login">
                Войти в систему <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">55+</div>
              <div className="text-gray-600 dark:text-gray-400">лет опыта</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">800+</div>
              <div className="text-gray-600 dark:text-gray-400">вагонов-цистерн</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">20+</div>
              <div className="text-gray-600 dark:text-gray-400">стран-партнеров</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">30K</div>
              <div className="text-gray-600 dark:text-gray-400">тонн в месяц</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Возможности системы
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Комплексное решение для автоматизации всех бизнес-процессов транспортной компании
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-800">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Управление транспортом
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Отслеживание и планирование маршрутов, контроль состояния вагонов-цистерн, 
                оптимизация логистических процессов
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-8 rounded-2xl border border-green-100 dark:border-green-800">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Аналитика и отчётность
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Детальная аналитика перевозок, финансовые отчёты, 
                мониторинг ключевых показателей эффективности
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-8 rounded-2xl border border-purple-100 dark:border-purple-800">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Управление персоналом
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Система ролей и разрешений, учёт рабочего времени, 
                планирование задач и контроль выполнения
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-8 rounded-2xl border border-orange-100 dark:border-orange-800">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Безопасность данных
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Многоуровневая система защиты, шифрование данных, 
                аудит действий пользователей
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-8 rounded-2xl border border-teal-100 dark:border-teal-800">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Международные перевозки
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Управление экспортно-импортными операциями в 20+ стран, 
                таможенное оформление, валютные операции
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-8 rounded-2xl border border-amber-100 dark:border-amber-800">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mb-4">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Управление активами
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Учёт и обслуживание подвижного состава, планирование ремонтов, 
                контроль технического состояния
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Company */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">О РУП СГ-ТРАНС</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Республиканское унитарное предприятие по транспортировке и обеспечению сжиженными 
              нефтяными газами занимает доминирующее положение на товарном рынке Республики Беларусь.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Наша деятельность</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="min-w-5 min-h-5 mr-3 mt-1 text-green-300" />
                    <span>Транспортировка сжиженных углеводородных газов железнодорожным транспортом</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-300" />
                    <span>Обслуживание и ремонт вагонов-цистерн</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-300" />
                    <span>Экспедирование грузов по территории Беларуси</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-4">География поставок</h3>
                <p className="opacity-90">
                  Российская Федерация, Польша, Литва, Латвия, Финляндия, Монголия, 
                  Киргизия, Китай, Грузия, Узбекистан и другие страны.
                </p>
                <p className="mt-4 opacity-90">
                  <strong>Ежемесячно:</strong> перевозим около 30 000 тонн сжиженного газа
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Готовы начать работу в системе?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Войдите в систему управления транспортными процессами СГ-ТРАНС. 
            Для получения доступа обратитесь к администратору.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3" asChild>
              <Link href="/login">
                Войти в систему <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3" asChild>
              <Link href="/register">Запросить доступ</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">СГ-ТРАНС</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Республиканское унитарное предприятие по транспортировке и обеспечению 
                сжиженными нефтяными газами
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-400">
                <p>211440, Республика Беларусь</p>
                <p>г. Новополоцк, ул. Промышленная, 13</p>
                <p>+375 (214) 75-45-35</p>
                <p>info@sgtrans.by</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Режим работы</h4>
              <div className="space-y-2 text-gray-400">
                <p>Пн-Чт: 08:15 - 17:00</p>
                <p>Пт: 08:15 - 15:45</p>
                <p>Сб-Вс: выходной</p>
                <p className="mt-4">УНП: 300041350</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 РУП СГ-ТРАНС. Система автоматизации процессов.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
