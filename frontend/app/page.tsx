import { api } from '@/lib/api';
import { Category, ProductList } from '@/lib/types';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function HomePage() {
  const [products, categories, storeInfo] = await Promise.all([
    api.products.list('featured=true'),
    api.categories.list(),
    api.store.info(),
  ]);

  const parentCategories = categories.filter(c => c.parent === null);

  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-44">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="block md:inline">Работно </span>
              <span className="block md:inline">облекло</span>
              <br className="hidden md:block" />
              <span className="block">за всеки!</span>
            </h1>
            <p className="mt-4 text-lg text-brand-100">
              Над 30 години висококачествено работно облекло, обувки и лични предпазни средства.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="bg-white text-brand-600 font-semibold px-6 py-3 rounded-lg hover:bg-brand-50 transition-colors text-center"
              >
                Разгледай каталога
              </Link>
              <Link
                href="/contact"
                className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors text-center"
              >
                Свържи се с нас
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About us snippet */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-8 sm:px-12 lg:px-8 text-center">
          <p className="text-4xl font-bold text-brand-600 mb-6">
            СИМ
          </p>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 text-justify">
            Вече повече от 30 години нашият семеен труд е неизменна част от бизнес пейзажа на Габрово – град с характер, индустриален дух и традиции, които ни вдъхновяват всеки ден. Още от първия ден нашата мисия е ясна: да предложим висококачествено работно облекло, обувки и лични предпазни средства, на които професионалистите да разчитат без компромис.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors"
          >
            За нас <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Categories */}
      {parentCategories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Категории
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {parentCategories.map((category: Category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-brand-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                  {category.name}
                </h3>
                {category.children.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {category.children.length} подкатегории
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured products */}
      {products.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Препоръчани продукти
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: ProductList) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative aspect-square bg-gray-100">
                    {product.primary_image ? (
                      <Image
                        src={product.primary_image.image}
                        alt={product.primary_image.alt_text || product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">Няма снимка</span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-brand-600 font-medium mb-1">
                      {product.brand?.name}
                    </p>
                    <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    {product.price_display && (
                      <p className="text-brand-600 font-semibold mt-2">
                        {product.price_display}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/shop"
                className="bg-brand-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-brand-700 transition-colors"
              >
                Виж всички продукти
              </Link>
            </div>
          </div>
        </section>
      )}
      {/* Why choose us */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              Защо да изберете нас?
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                title: 'Над 30 години опит',
                description: 'Дългогодишен опит в бранша и познаване нуждите на клиентите.',
              },
              {
                title: 'Лично обслужване',
                description: 'Консултация на място в магазина — не чатбот, а истински разговор.',
              },
              {
                title: 'Широк асортимент',
                description: 'Работно облекло, обувки и ЛПС за всички браншове и сезони.',
              },
              {
                title: 'Удобна локация',
                description: 'Лесно достъпен магазин с възможност за паркиране.',
              },
            ].map(({ title, description }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                  <div className="w-3 h-3 rounded-full bg-brand-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact snippet */}
      {storeInfo && (
        <section className="bg-white py-16 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Left: contact details */}
              <div className="order-last lg:order-first">
                <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center lg:text-left">
                  Контакти
                </h2>
                <div className="flex flex-col gap-5">
                  {storeInfo.address && (
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center shrink-0">
                        <MapPin size={20} className="text-brand-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-0.5">Адрес</p>
                        <p className="text-gray-500">{storeInfo.address}</p>
                      </div>
                    </div>
                  )}
                  {storeInfo.phone && (
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center shrink-0">
                        <Phone size={20} className="text-brand-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-0.5">Телефон</p>
                        <a href={`tel:${storeInfo.phone}`}
                          className="text-brand-600 hover:text-brand-700 transition-colors">
                          {storeInfo.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {storeInfo.email && (
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center shrink-0">
                        <Mail size={20} className="text-brand-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-0.5">Имейл</p>
                        <a href={`mailto:${storeInfo.email}`}
                          className="text-brand-600 hover:text-brand-700 transition-colors">
                          {storeInfo.email}
                        </a>
                      </div>
                    </div>
                  )}
                  {Array.isArray(storeInfo.opening_hours) && storeInfo.opening_hours.length > 0 && (
                    <div className="mt-2 p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3 text-center lg:text-left">Работно време</p>
                      <div className="flex flex-col gap-1.5">
                        {storeInfo.opening_hours.map((entry: { day: string; hours: string }, i: number) => (
                          <div key={i} className="flex gap-4 text-sm">
                            <span className="text-gray-600 shrink-0 w-24">{entry.day}</span>
                            <span className="font-medium text-gray-900">{entry.hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 mt-8 bg-brand-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors w-full lg:w-auto"
                >
                  Изпратете запитване <ArrowRight size={18} />
                </Link>
              </div>

              {/* Right: Google Maps embed */}
              <div className="order-first lg:order-last w-full h-80 lg:h-full min-h-[400px] rounded-xl overflow-hidden border border-gray-100">
                {storeInfo.google_maps_embed_url ? (
                  <iframe
                    src={storeInfo.google_maps_embed_url}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '400px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Местоположение на магазина"
                  />
                ) : (
                  <div className="w-full h-full min-h-[400px] bg-gray-50 flex items-center justify-center text-center p-8">
                    <div className="text-gray-400">
                      <MapPin size={48} className="mx-auto mb-3 opacity-30" />
                      <p className="text-sm">Картата ще се появи след като добавите Google Maps URL в администраторския панел</p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      )}
    </div>
  );
}
