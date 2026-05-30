import { api } from '@/lib/api';
import Link from 'next/link';

export default async function Footer() {
  const [categories, storeInfo] = await Promise.all([
    api.categories.list(),
    api.store.info(),
  ]);

  const parentCategories = categories.filter(c => c.parent === null);

  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Column 1: Brand only */}
          <div className="text-center sm:text-left">
            <span className="text-white font-bold text-xl">СИМ</span>
            <p className="text-sm mt-1 text-brand-400">Работно Облекло</p>
          </div>

          {/* Column 2: Categories */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-semibold mb-4">Категории</h3>
            <ul className="space-y-2 text-sm">
              {parentCategories.map(category => (
                <li key={category.id}>
                  <Link href={"/categories/" + category.slug}
                    className="hover:text-white transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation — removed Размерна таблица and Контакти */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Начало</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">Каталог</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">За нас</Link></li>
            </ul>
          </div>

          {/* Column 4: Contacts with phone/email icons and social icons */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-semibold mb-4">Контакти</h3>
            <ul className="space-y-3 text-sm">
              {storeInfo.address && (
                <li className="leading-relaxed">{storeInfo.address}</li>
              )}
              {storeInfo.phone && (
                <li>
                  <a href={"tel:" + storeInfo.phone}
                    className="hover:text-white transition-colors inline-flex items-center gap-2 justify-center sm:justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="shrink-0 text-brand-500">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {storeInfo.phone}
                  </a>
                </li>
              )}
              {storeInfo.email && (
                <li>
                  <a href={"mailto:" + storeInfo.email}
                    className="hover:text-white transition-colors inline-flex items-center gap-2 justify-center sm:justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="shrink-0 text-brand-500">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    {storeInfo.email}
                  </a>
                </li>
              )}

              {/* Social icons moved here from Column 1 */}
              <li className="pt-2">
                <div className="flex gap-3 justify-center sm:justify-start">
                  <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="p-2 rounded-full bg-gray-800 hover:bg-brand-600 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="p-2 rounded-full bg-gray-800 hover:bg-brand-600 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-sm text-center">
          {new Date().getFullYear()} СИМ - Работно Облекло. Всички права запазени.
        </div>
      </div>
    </footer>
  );
}