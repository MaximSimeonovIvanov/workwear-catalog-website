'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Category, Brand, Tag } from '@/lib/types';

interface ShopFiltersProps {
  categories: Category[];
  brands: Brand[];
  tags: Tag[];
  activeFilters: {
    category?: string;
    brand?: string;
    tag?: string;
    search?: string;
  };
}

export default function ShopFilters({ categories, brands, tags, activeFilters }: ShopFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(pathname + '?' + params.toString());
  };

  const parentCategories = categories.filter(c => c.parent === null);

  return (
    <div className="space-y-6">

      {/* Search */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Търсене</h3>
        <input
          type="text"
          placeholder="Търси продукт..."
          defaultValue={activeFilters.search || ''}
          onChange={e => {
            const val = e.target.value;
            if (val.length === 0 || val.length >= 3) {
              updateFilter('search', val || null);
            }
          }}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      {/* Categories */}
      {parentCategories.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Категории</h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => updateFilter('category', null)}
                className={"w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors " +
                  (!activeFilters.category ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-600 hover:bg-gray-100")}
              >
                Всички
              </button>
            </li>
            {parentCategories.map(category => (
              <li key={category.id}>
                <button
                  onClick={() => updateFilter('category', category.slug)}
                  className={"w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors " +
                    (activeFilters.category === category.slug ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-600 hover:bg-gray-100")}
                >
                  {category.name}
                </button>
                {category.children.length > 0 && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {category.children.map(child => (
                      <li key={child.id}>
                        <button
                          onClick={() => updateFilter('category', child.slug)}
                          className={"w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors " +
                            (activeFilters.category === child.slug ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-600 hover:bg-gray-100")}
                        >
                          {child.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Brands */}
      {brands.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Марки</h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => updateFilter('brand', null)}
                className={"w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors " +
                  (!activeFilters.brand ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-600 hover:bg-gray-100")}
              >
                Всички
              </button>
            </li>
            {brands.map(brand => (
              <li key={brand.id}>
                <button
                  onClick={() => updateFilter('brand', brand.slug)}
                  className={"w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors " +
                    (activeFilters.brand === brand.slug ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-600 hover:bg-gray-100")}
                >
                  {brand.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Свойства</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag.id}
                onClick={() => updateFilter('tag', activeFilters.tag === tag.slug ? null : tag.slug)}
                className={"text-xs px-3 py-1.5 rounded-full border transition-colors " +
                  (activeFilters.tag === tag.slug
                    ? "bg-brand-600 text-white border-brand-600"
                    : "border-gray-300 text-gray-600 hover:border-brand-400")}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Clear filters */}
      {(activeFilters.category || activeFilters.brand || activeFilters.tag || activeFilters.search) && (
        <button
          onClick={() => router.push(pathname)}
          className="w-full text-sm text-brand-600 hover:text-brand-700 font-medium py-2 border border-brand-200 rounded-lg hover:bg-brand-50 transition-colors"
        >
          Изчисти филтрите
        </button>
      )}
    </div>
  );
}
