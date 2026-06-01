'use client';

import { useState, useRef } from 'react';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const turnstileRef = useRef<TurnstileInstance>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!turnstileToken) {
            return;
        }

        setStatus('sending');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, turnstileToken }),
            });

            if (res.ok) {
                setStatus('success');
                setForm({ name: '', email: '', phone: '', message: '' });
                setTurnstileToken(null);
            } else {
                setStatus('error');
                turnstileRef.current?.reset();
            }
        } catch {
            setStatus('error');
            turnstileRef.current?.reset();
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <p className="text-green-800 font-semibold text-lg">Съобщението е изпратено!</p>
                <p className="text-green-600 mt-2">Ще се свържем с вас скоро.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-brand-600 hover:underline text-sm"
                >
                    Изпрати ново съобщение
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Име *</label>
                <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Имейл *</label>
                <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Съобщение *</label>
                <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                />
            </div>

            <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={token => setTurnstileToken(token)}
                onError={() => setTurnstileToken(null)}
                onExpire={() => setTurnstileToken(null)}
            />

            {status === 'error' && (
                <p className="text-red-600 text-sm">Грешка при изпращане. Моля опитайте отново.</p>
            )}

            <button
                type="submit"
                disabled={status === 'sending' || !turnstileToken}
                className="w-full bg-brand-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-50"
            >
                {status === 'sending' ? 'Изпращане...' : 'Изпрати съобщение'}
            </button>
        </form>
    );
}
