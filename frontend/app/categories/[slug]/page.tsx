import { api } from '@/lib/api';
import { ProductList } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: CategoryPageProps) {
    try {
        const categories = await api.categories.list();
        const category = categories.find(c => c.slug === params.slug);
        return { title: category?.name || 'Категория' };
    } catch {
        return { title: 'Категория' };
    }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const [categories, products] = await Promise.all([
        api.categories.list(),
        api.products.list('category=' + params.slug),
    ]);

    const category = categories.find(c => c.slug === params.slug) ||
        categories.flatMap(c => c.children).find(c => c.slug === params.slug);

    if (!category) notFound();

    const parentCategory = category.parent
        ? categories.find(c => c.id === category.parent)
        : null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                <Link href="/shop" className="hover:text-brand-600 transition-colors">Каталог</Link>
                <span>/</span>
                {parentCategory && (
                    <>
                        <Link href={"/categories/" + parentCategory.slug} className="hover:text-brand-600 transition-colors">
                            {parentCategory.name}
                        </Link>
                        <span>/</span>
                    </>
                )}
                <span className="text-gray-900">{category.name}</span>
            </nav>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
            {category.description && (
                <p className="text-gray-600 mb-8">{category.description}</p>
            )}

            {/* Subcategories */}
            {category.children && category.children.length > 0 && (
                <div className="mb-8">
                    <h2 className="font-semibold text-gray-700 mb-3">Подкатегории</h2>
                    <div className="flex flex-wrap gap-3">
                        {category.children.map(child => (
                            <Link
                                key={child.id}
                                href={"/categories/" + child.slug}
                                className="bg-white border border-gray-200 hover:border-brand-400 hover:text-brand-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                {child.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Products */}
            {products.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <p>Няма продукти в тази категория.</p>
                    <Link href="/shop" className="text-brand-600 hover:underline mt-2 inline-block">
                        Виж всички продукти
                    </Link>
                </div>
            ) : (
                <>
                    <p className="text-sm text-gray-500 mb-6">{products.length} продукта</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product: ProductList) => (
                            <Link
                                key={product.id}
                                href={"/shop/" + product.slug}
                                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
                            >
                                <div className="relative aspect-square bg-gray-100">
                                    {product.primary_image ? (
                                        <Image src={product.primary_image.image} alt={product.primary_image.alt_text || product.name} fill className="object-cover" />
                                    ) : (
                                        <span className="text-gray-400 text-sm">Няма снимка</span>
                                    )}
                                </div>
                                <div className="p-4">
                                    <p className="text-xs text-brand-600 font-medium mb-1">{product.brand?.name}</p>
                                    <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                                        {product.name}
                                    </h3>
                                    {product.price_display && (
                                        <p className="text-brand-600 font-semibold mt-2">{product.price_display}</p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}