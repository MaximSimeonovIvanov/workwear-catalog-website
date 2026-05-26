import { api } from '@/lib/api';
import ContactForm from './ContactForm';

export const metadata = {
    title: 'Контакти',
};

export default async function ContactPage() {
    const storeInfo = await api.store.info();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Контакти</h1>
            <p className="text-gray-600 mb-12">Свържете се с нас за въпроси относно продуктите.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Contact form */}
                <div>
                    <ContactForm />
                </div>

                {/* Store info */}
                <div className="space-y-6">
                    <div>
                        <h2 className="font-semibold text-gray-900 mb-2">Адрес</h2>
                        <p className="text-gray-600">{storeInfo.address}</p>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900 mb-2">Телефон</h2>
                        <a href={"tel:" + storeInfo.phone} className="text-brand-600 hover:underline">
                            {storeInfo.phone}
                        </a>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900 mb-2">Имейл</h2>
                        <a href={"mailto:" + storeInfo.email} className="text-brand-600 hover:underline">
                            {storeInfo.email}
                        </a>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900 mb-2">Работно време</h2>
                        <ul className="space-y-1">
                            {(Array.isArray(storeInfo.opening_hours) ? storeInfo.opening_hours : []).map((entry: { day: string, hours: string }) => (
                                <li key={entry.day} className="text-sm text-gray-600">
                                    <span className="font-medium">{entry.day}:</span> {entry.hours}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}