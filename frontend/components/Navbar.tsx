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
            <span className="text-brand-600 font-bold text-4xl tracking-tight">СИМ</span>
            <span className="text-gray-600 text-xl hidden sm:block">Работно Облекло</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">Начало</Link>
            <Link href="/shop" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">Каталог</Link>
            <Link href="/about" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">За нас</Link>
            <Link href="/contact" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">Контакти</Link>
          </nav>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Отвори меню"
          >
            <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu — always in DOM for CSS transition to work */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-64' : 'max-h-0'}`}>
          <nav className="flex flex-col items-center gap-4 py-4 border-t border-gray-100">
            <Link href="/" className="text-gray-600 hover:text-brand-600 font-medium transition-colors" onClick={() => setMenuOpen(false)}>Начало</Link>
            <Link href="/shop" className="text-gray-600 hover:text-brand-600 font-medium transition-colors" onClick={() => setMenuOpen(false)}>Каталог</Link>
            <Link href="/about" className="text-gray-600 hover:text-brand-600 font-medium transition-colors" onClick={() => setMenuOpen(false)}>За нас</Link>
            <Link href="/contact" className="text-gray-600 hover:text-brand-600 font-medium transition-colors" onClick={() => setMenuOpen(false)}>Контакти</Link>
          </nav>
        </div>

      </div>
    </header>
  );
}