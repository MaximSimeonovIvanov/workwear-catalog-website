import { api } from '@/lib/api';

export const metadata = {
    title: 'За нас',
};

export default async function AboutPage() {
    const storeInfo = await api.store.info();

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">За нас</h1>

            <div className="prose prose-gray max-w-none">
                {storeInfo.about_text ? (
                    <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                        {storeInfo.about_text}
                    </p>
                ) : (
                    <p className="text-gray-500">Информацията се подготвя.</p>
                )}
            </div>

            {/* Store details */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="font-semibold text-gray-900 mb-3">Адрес</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">{storeInfo.address}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="font-semibold text-gray-900 mb-3">Контакти</h2>
                    <p className="text-gray-600 text-sm">{storeInfo.phone}</p>
                    <p className="text-gray-600 text-sm">{storeInfo.email}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="font-semibold text-gray-900 mb-3">Работно време</h2>
                    <ul className="space-y-1">
                        {(Array.isArray(storeInfo.opening_hours) ? storeInfo.opening_hours : []).map((entry: { day: string, hours: string }) => (
                            <li key={entry.day} className="text-sm text-gray-600">
                                <span className="font-medium">{entry.day}:</span> {entry.hours}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Map */}
            {storeInfo.google_maps_embed_url && (
                <div className="mt-12 rounded-xl overflow-hidden border border-gray-200 h-80">
                    <iframe
                        src={storeInfo.google_maps_embed_url}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                    />
                </div>
            )}
        </div>
    );
}