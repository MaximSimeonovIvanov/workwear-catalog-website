import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <span className="text-white font-bold text-lg">СИМ</span>
            <p className="mt-2 text-sm">
              Работно облекло и лични предпазни средства.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-white transition-colors">Каталог</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">За нас</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Контакти</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Контакти</h3>
            <ul className="space-y-2 text-sm">
              <li>тел: placeholder</li>
              <li>email: placeholder</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          © {new Date().getFullYear()} СИМ - Работно Облекло. Всички права запазени.
        </div>
      </div>
    </footer>
  );
}
