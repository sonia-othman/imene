// Navbar.tsx - Updated with search functionality
"use client";
import { useState } from "react";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

interface NavbarProps {
  onSearchChange?: (query: string) => void;
}

export default function Navbar({ onSearchChange }: NavbarProps) {
  const { cartCount } = useCart();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(searchQuery);
    }
    setSearchOpen(false);
  };

  return (
    <>
      <nav className="bg-white py-4 px-4 sm:px-6 md:px-8 flex justify-between items-center border-b border-gray-100 relative">
        {/* Logo */}
        <div className="text-2xl font-serif italic text-gray-800 z-20">
          <Link href="/">
            <Image 
              src="/images/imeneb.png" 
              height={80} 
              width={80} 
              alt="logo"
            />
          </Link>
        </div>

        {/* Desktop Links - Hidden on mobile */}
        <div className="hidden lg:flex gap-6 xl:gap-8 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-gray-900 transition">{t('nav.home')}</Link>
          <Link href="/shop" className="hover:text-gray-900 transition">{t('nav.products')}</Link>
          <Link href="/about" className="hover:text-gray-900 transition">{t('nav.about')}</Link>
          <Link href="/contact" className="hover:text-gray-900 transition">{t('nav.contact')}</Link>
        </div>

        {/* Icons + Language Switcher - Desktop */}
        <div className="hidden lg:flex gap-3 xl:gap-4 items-center text-gray-700">
          {/* Search Button */}
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            className="hover:text-gray-900 transition"
          >
            <Search size={20} />
          </button>
          
          <Link href="/cart" className="relative">
            <ShoppingCart size={20} className="cursor-pointer hover:text-gray-900 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <LanguageSwitcher />
        </div>

        {/* Mobile Icons */}
        <div className="flex lg:hidden gap-3 items-center text-gray-700 z-20">
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            className="hover:text-gray-900"
          >
            <Search size={20} />
          </button>
          <Link href="/cart" className="relative">
            <ShoppingCart size={20} className="cursor-pointer hover:text-gray-900" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 hover:bg-gray-100 rounded transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Desktop Search Bar */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-4 shadow-lg z-30">
            <form onSubmit={handleSearchSubmit} className="max-w-4xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={t('shop.search.placeholder') || "Search products..."}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      if (onSearchChange) onSearchChange('');
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute top-0 right-0 w-64 h-full bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col p-6 pt-20 space-y-6">
              {/* Mobile Search */}
              <div className="pb-4 border-b border-gray-200">
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </form>
              </div>

              <Link 
                href="/" 
                className="text-gray-700 hover:text-gray-900 font-medium text-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link 
                href="/shop" 
                className="text-gray-700 hover:text-gray-900 font-medium text-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.products')}
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-gray-900 font-medium text-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-gray-900 font-medium text-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>
              
              <div className="pt-6 border-t border-gray-200">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}