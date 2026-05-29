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

          <div>
            <span className="text-white font-bold text-xl">СИМ</span>
            <p className="text-sm mt-1 text-brand-400">Работно Облекло</p>
            <p className="mt-3 text-sm leading-relaxed">
              Работно облекло, обувки и лични предпазни средства за всеки бранш.
            </p>

            <div className="mt-4 flex gap-3">
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-gray-800 hover:bg-brand-600 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full bg-gray-800 hover:bg-brand-600 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Категории</h3>
            <ul className="space-y-2 text-sm">
              {parentCategories.map(category => (
                <li key={category.id}>
                  <Link href={"/categories/" + category.slug} className="hover:text-white transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-white transition-colors">Каталог</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">За нас</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Контакти</Link></li>
              <li><Link href="/size-guide" className="hover:text-white transition-colors">Размерна таблица</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Контакти</h3>
            <ul className="space-y-2 text-sm">
              {storeInfo.address && (
                <li className="leading-relaxed">{storeInfo.address}</li>
              )}
              {storeInfo.phone && (
                <li>
                  <a href={"tel:" + storeInfo.phone} className="hover:text-white transition-colors">
                    {storeInfo.phone}
                  </a>
                </li>
              )}
              {storeInfo.email && (
                <li>
                  <a href={"mailto:" + storeInfo.email} className="hover:text-white transition-colors">
                    {storeInfo.email}
                  </a>
                </li>
              )}
              {(Array.isArray(storeInfo.opening_hours) ? storeInfo.opening_hours : []).map((entry: { day: string, hours: string }) => (
                <li key={entry.day} className="text-sm text-gray-400 flex justify-between gap-4">
                  <span>{entry.day}</span>
                  <span className="text-gray-300">{entry.hours}</span>
                </li>
              ))}
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
