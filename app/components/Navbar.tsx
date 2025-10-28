"use client";
import { ShoppingCart, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

export default function Navbar() {
  const { cartCount } = useCart();
  const { t } = useTranslation(); // <- get translation function

  return (
    <nav className="bg-white py-4 px-8 flex justify-between items-center border-b border-gray-100">
      {/* Logo */}
      <div className="text-2xl font-serif italic text-gray-800">
        <Link href="/">
          <Image src="/images/imeneb.png" height={80} width={80} alt="logo" />
        </Link>
      </div>

      {/* Links */}
      <div className="flex gap-8 text-sm font-medium text-gray-700">
        <Link href="/" className="hover:text-gray-900">{t('nav.home')}</Link>
        <Link href="/shop" className="hover:text-gray-900">{t('nav.products')}</Link>
        <Link href="/about" className="hover:text-gray-900">{t('nav.about')}</Link>
        <Link href="/contact" className="hover:text-gray-900">{t('nav.contact')}</Link>
      </div>

      {/* Icons + Language Switcher */}
      <div className="flex gap-4 items-center text-gray-700">
        <Search size={20} className="cursor-pointer hover:text-gray-900" />
        <Link href="/cart" className="relative">
          <ShoppingCart size={20} className="cursor-pointer hover:text-gray-900" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Language Switcher */}
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
