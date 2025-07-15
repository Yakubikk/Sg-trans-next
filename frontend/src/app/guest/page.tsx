import Link from "next/link";

export default function Guest() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">СГ-ТРАНС</h1>
              <span className="ml-3 text-sm text-gray-500">Транспортно-экспедиционные услуги</span>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Вход в систему
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            РУП СГ-ТРАНС
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Лидер в сфере транспортно-экспедиционных услуг по организации перевозки
            сжиженных углеводородных газов железнодорожным транспортом
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-md mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Доминирующее положение</h3>
            <p className="text-gray-600">
              Организация занимает доминирующее положение на товарных рынках Республики Беларусь
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-md mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Собственный парк</h3>
            <p className="text-gray-600">
              Более 800 вагонов-цистерн для перевозки сжиженного газа в собственности
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-md mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Международные перевозки</h3>
            <p className="text-gray-600">
              Организация перевозок как внутри Республики Беларусь, так и за её пределы
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">О компании</h3>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>РУП СГ-ТРАНС</strong> занимается оказанием транспортно-экспедиционных услуг по организации 
              перевозки сжиженных углеводородных газов железнодорожным транспортом как на внутриреспубликанском 
              рынке, так и за пределы Республики Беларусь и относится к организациям, занимающим доминирующее 
              положение на товарных рынках Республики Беларусь.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Предприятие имеет в собственности более 800 вагонов цистерн для перевозки сжиженного газа.
            </p>
            <p className="text-gray-700 leading-relaxed">
              СГ-ТРАНС работает слаженно и рентабельно и за счет собственных средств обновляет активную часть 
              основных средств подвижного железнодорожного парка.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">800+</div>
            <div className="text-sm text-gray-600">Вагонов-цистерн</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">100%</div>
            <div className="text-sm text-gray-600">Собственные средства</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600">Круглосуточная работа</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">∞</div>
            <div className="text-sm text-gray-600">Опыт и надежность</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Управление системой
          </h3>
          <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">
            Для доступа к системе управления транспортом и паспортными данными вагонов необходимо авторизоваться
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Войти в систему
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Узнать больше
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-300">
              © 2025 РУП СГ-ТРАНС. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
