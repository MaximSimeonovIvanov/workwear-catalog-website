import { api } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProductPageProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps) {
    try {
        const product = await api.products.detail(params.slug);
        return {
            title: product.name,
            description: product.description.slice(0, 160),
        };
    } catch {
        return { title: 'Продукт не е намерен' };
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    let product;
    try {
        product = await api.products.detail(params.slug);
    } catch {
        notFound();
    }

    const primaryImage = product.images.find(img => img.is_primary) || product.images[0];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                <Link href="/shop" className="hover:text-brand-600 transition-colors">Каталог</Link>
                <span>/</span>
                {product.category && (
                    <>
                        <Link href={"/categories/" + product.category.slug} className="hover:text-brand-600 transition-colors">
                            {product.category.name}
                        </Link>
                        <span>/</span>
                    </>
                )}
                <span className="text-gray-900">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Images */}
                <div className="space-y-4">
                    <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                        {primaryImage ? (
                            <img
                                src={primaryImage.image}
                                alt={primaryImage.alt_text || product.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                Няма снимка
                            </div>
                        )}
                    </div>

                    {/* Thumbnail row */}
                    {product.images.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto">
                            {product.images.map(img => (
                                <div key={img.id} className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-gray-200">
                                    <img
                                        src={img.image}
                                        alt={img.alt_text || product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product info */}
                <div>
                    {product.brand && (
                        <p className="text-brand-600 font-medium mb-2">{product.brand.name}</p>
                    )}
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

                    {product.price_display && (
                        <p className="text-2xl font-bold text-brand-600 mt-4">{product.price_display}</p>
                    )}

                    {/* Tags */}
                    {product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {product.tags.map(tag => (
                                <span key={tag.id} className="text-xs bg-brand-50 text-brand-700 border border-brand-200 px-3 py-1 rounded-full">
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Description */}
                    <div className="mt-6">
                        <h2 className="font-semibold text-gray-900 mb-2">Описание</h2>
                        <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    </div>

                    {/* Material */}
                    {product.material && (
                        <div className="mt-4">
                            <h2 className="font-semibold text-gray-900 mb-2">Материал</h2>
                            <p className="text-gray-600">{product.material}</p>
                        </div>
                    )}

                    {/* Features */}
                    {product.features && (
                        <div className="mt-4">
                            <h2 className="font-semibold text-gray-900 mb-2">Характеристики</h2>
                            <p className="text-gray-600 leading-relaxed">{product.features}</p>
                        </div>
                    )}

                    {/* Variants */}
                    {product.variants.length > 0 && (
                        <div className="mt-6">
                            {product.variants.some(v => v.size) && (
                                <div className="mb-4">
                                    <h2 className="font-semibold text-gray-900 mb-2">Размери</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {product.variants.filter(v => v.size).map(v => (
                                            <span key={v.id} className="border border-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm">
                                                {v.size}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {product.variants.some(v => v.color) && (
                                <div>
                                    <h2 className="font-semibold text-gray-900 mb-2">Цветове</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {product.variants.filter(v => v.color).map(v => (
                                            <div key={v.id} className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-lg text-sm">
                                                {v.color_hex && (
                                                    <div
                                                        className="w-4 h-4 rounded-full border border-gray-300"
                                                        style={{ backgroundColor: v.color_hex }}
                                                    />
                                                )}
                                                {v.color}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* CTA */}
                    <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-gray-700 font-medium mb-3">Интересувате се от този продукт?</p>
                        <Link
                            href="/contact"
                            className="block w-full bg-brand-600 text-white text-center font-semibold px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors"
                        >
                            Свържете се с нас
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}