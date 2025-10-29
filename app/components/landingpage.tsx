"use client";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  
  const isRTL = i18n.language === "ar" || i18n.language === "ku";

  return (
    <div
      className="container mx-auto bg-gray-50 relative min-h-screen"
      style={{
        backgroundImage: "url('/images/newcover.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ===== Navbar ===== */}
      <nav className="absolute top-0 left-0 w-full py-4 px-6">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Logo - Left Side */}
          <Image
            src="/images/imenelogo.png"
            width={100}
            height={100}
            alt="logo"
            className="cursor-pointer"
          />
          
          {/* Desktop Menu  */}
          <ul className="hidden md:flex space-x-8 text-white font-medium absolute left-1/2 transform -translate-x-1/2">
            <li className="hover:text-slate-700 cursor-pointer transition-colors">
              {t('nav.home')}
            </li>
            <Link href='/shop' className="hover:text-slate-700 cursor-pointer transition-colors">
              {t('nav.products')}
            </Link>
            <li className="hover:text-slate-700 cursor-pointer transition-colors">
              {t('nav.about')}
            </li>
            <li className="hover:text-slate-700 cursor-pointer transition-colors">
              {t('nav.contact')}
            </li>
          </ul>
          
          {/* Language Switcher - Right Side (Desktop) */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          
          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-50">
            <ul className="flex flex-col items-center py-4 space-y-4 text-gray-800 font-medium">
              <li className="hover:text-yellow-100 cursor-pointer transition-colors">
                {t('nav.home')}
              </li>
              <Link href="/shop" className="hover:text-yellow-100 cursor-pointer transition-colors">
                {t('nav.products')}
              </Link>
              <li className="hover:text-yellow-100 cursor-pointer transition-colors">
                {t('nav.about')}
              </li>
              <li className="hover:text-yellow-100 cursor-pointer transition-colors">
                {t('nav.contact')}
              </li>
              {/* Language Switcher for Mobile */}
              <li className="pt-2">
                <LanguageSwitcher />
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* ===== Landing Content ===== */}
      <div className="container mx-auto pt-20 md:pt-30 px-4 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full px-6 md:px-12 lg:px-20">
          {/* Left Content */}
          <div className={`flex flex-col justify-center space-y-6 ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
            <p className="text-xs md:text-sm tracking-widest text-gray-100 uppercase h-6">
              {t('hero.subtitle')}
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight min-h-[200px] md:min-h-[240px] lg:min-h-[280px]">
              {t('hero.title')}
            </h2>
            <p className="text-gray-50 text-base md:text-lg leading-relaxed max-w-lg min-h-[80px]">
              {t('hero.description')}
            </p>
            <button className="bg-accent text-primary px-10 py-4 rounded-lg text-sm tracking-wider uppercase hover:bg-gray-100 transition-colors w-fit mt-4">
              {t('hero.button')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}