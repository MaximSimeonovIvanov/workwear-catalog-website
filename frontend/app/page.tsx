import { api } from '@/lib/api';
import { Category, ProductList } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    api.products.list('featured=true'),
    api.categories.list(),
  ]);

  const parentCategories = categories.filter(c => c.parent === null);

  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Работно облекло за всеки!
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

      {/* Categories */}
      {parentCategories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
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
            <h2 className="text-2xl font-bold text-gray-900">
              Защо да изберете нас?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
    </div>
  );
}
