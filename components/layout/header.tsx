'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, BookOpen } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white/95 ${isScrolled ? 'backdrop-blur-sm shadow-md' : ''} transition-shadow duration-300 border-b border-gray-200`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">TaskPro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Beranda
            </Link>
            <Link href="/layanan" className="text-gray-600 hover:text-blue-600 transition-colors">
              Layanan
            </Link>
            <Link href="/portofolio" className="text-gray-600 hover:text-blue-600 transition-colors">
              Portofolio
            </Link>
            <Link href="/kontak" className="text-gray-600 hover:text-blue-600 transition-colors">
              Kontak
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Button asChild>
              <Link href="/pesan">Pesan Sekarang</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link 
                href="/layanan" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Layanan
              </Link>
              <Link 
                href="/portofolio" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Portofolio
              </Link>
              <Link 
                href="/kontak" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontak
              </Link>
              <Button asChild className="w-full">
                <Link href="/pesan">Pesan Sekarang</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}