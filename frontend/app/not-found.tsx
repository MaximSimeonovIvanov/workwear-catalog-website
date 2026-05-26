import Link from 'next/link';

export const metadata = {
    title: '404 - Страницата не е намерена',
};

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-brand-600">404</h1>
                <h2 className="text-2xl font-bold text-gray-900 mt-4">
                    Страницата не е намерена
                </h2>
                <p className="text-gray-500 mt-2">
                    Страницата, която търсите, не съществува или е преместена.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="bg-brand-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors"
                    >
                        Начална страница
                    </Link>
                    <Link
                        href="/shop"
                        className="border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Каталог
                    </Link>
                </div>
            </div>
        </div>
    );
}