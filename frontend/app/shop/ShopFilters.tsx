'use client';

import { Brand, Category, Tag } from '@/lib/types';
import { motion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

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

  // Track which parent categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

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
                <div className="flex items-center gap-1">
                  {/* Category name button — filters by this category */}
                  <button
                    onClick={() => updateFilter('category', category.slug)}
                    className={"flex-1 text-left text-sm px-2 py-1.5 rounded-lg transition-colors " +
                      (activeFilters.category === category.slug ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-600 hover:bg-gray-100")}
                  >
                    {category.name}
                  </button>
                  {/* Arrow toggle — only shown if category has children */}
                  {category.children.length > 0 && (
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
                      aria-label={expandedCategories.has(category.id) ? "Скрий подкатегории" : "Покажи подкатегории"}
                    >
                      <svg
                        className={"w-3.5 h-3.5 transition-transform duration-200 " +
                          (expandedCategories.has(category.id) ? "rotate-180" : "")}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                {/* Subcategories — only shown when expanded */}
                {category.children.length > 0 && (
                  <motion.ul
                    initial={false}
                    animate={expandedCategories.has(category.id)
                      ? { height: 'auto', opacity: 1 }
                      : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="ml-4 mt-1 space-y-1 overflow-hidden"
                  >
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
                  </motion.ul>
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