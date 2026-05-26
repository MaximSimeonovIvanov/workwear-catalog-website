import Link from 'next/link';
import { api } from '@/lib/api';
import { ProductList } from '@/lib/types';
import ShopFilters from './ShopFilters';

interface ShopPageProps {
  searchParams: {
    category?: string;
    brand?: string;
    tag?: string;
    search?: string;
  };
}

export const metadata = {
  title: 'Каталог',
  description: 'Разгледайте нашето работно облекло, обувки и лични предпазни средства.',
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = new URLSearchParams();
  if (searchParams.category) params.set('category', searchParams.category);
  if (searchParams.brand) params.set('brand', searchParams.brand);
  if (searchParams.tag) params.set('tag', searchParams.tag);
  if (searchParams.search) params.set('search', searchParams.search);

  const [products, categories, brands, tags] = await Promise.all([
    api.products.list(params.toString()),
    api.categories.list(),
    api.brands.list(),
    api.tags.list(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Каталог</h1>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Filters sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <ShopFilters
            categories={categories}
            brands={brands}
            tags={tags}
            activeFilters={searchParams}
          />
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg">Няма намерени продукти.</p>
              <Link href="/shop" className="text-brand-600 hover:underline mt-2 inline-block">
                Изчисти филтрите
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-6">
                {products.length} продукта
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product: ProductList) => (
                  <Link
                    key={product.id}
                    href={"/shop/" + product.slug}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      {product.primary_image ? (
                        <img
                          src={product.primary_image.image}
                          alt={product.primary_image.alt_text || product.name}
                          className="w-full h-full object-cover"
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
                      {product.category && (
                        <p className="text-xs text-gray-400 mt-1">
                          {product.category.name}
                        </p>
                      )}
                      {product.price_display && (
                        <p className="text-brand-600 font-semibold mt-2">
                          {product.price_display}
                        </p>
                      )}
                      {product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {product.tags.slice(0, 3).map(tag => (
                            <span key={tag.id} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
