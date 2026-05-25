'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-brand-600 font-bold text-xl tracking-tight">
              СИМ
            </span>
            <span className="text-gray-600 text-sm hidden sm:block">
              Работно Облекло
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">
              Каталог
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">
              За нас
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">
              Контакти
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-brand-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Отвори меню"
          >
            <div className="w-6 h-0.5 bg-current mb-1.5"></div>
            <div className="w-6 h-0.5 bg-current mb-1.5"></div>
            <div className="w-6 h-0.5 bg-current"></div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-4">
            <Link href="/shop" className="text-gray-600 hover:text-brand-600 font-medium"
              onClick={() => setMenuOpen(false)}>
              Каталог
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-brand-600 font-medium"
              onClick={() => setMenuOpen(false)}>
              За нас
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-brand-600 font-medium"
              onClick={() => setMenuOpen(false)}>
              Контакти
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
