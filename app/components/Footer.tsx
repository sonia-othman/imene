import { Facebook, Instagram, Ghost, MapPin, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from "react-i18next";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, i18n } = useTranslation();
  const socialMedia = [
    { name: 'Facebook', icon: <Facebook className="w-6 h-6" />, href: '#' },
    { name: 'Instagram', icon: <Instagram className="w-6 h-6" />, href: 'https://www.instagram.com/imenelaser.iq?igsh=azl4amMza3R3ZnZ2' },
    { name: 'Snapchat', icon: <Ghost className="w-6 h-6" />, href: '#' },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-primary to-pink-200 text-white py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col items-center text-center space-y-6">

          {/* Logo */}
          <Image
            src="/images/imenelogo.png"
            width={100}
            height={100}
            alt="logo"
            className="object-contain"
          />

          {/* Navigation */}
          <nav>
            <ul className="flex text-md flex-wrap justify-center gap-4 sm:gap-6 text-white mb-2">
              <li><Link href="/" className="hover:text-gray-200 transition-colors">{t('nav.home')}</Link></li>
              <li><Link href="/shop" className="hover:text-gray-200 transition-colors">{t('nav.products')}</Link></li>
            
            </ul>
          </nav>

          {/* Location */}
          <div className="flex flex-wrap justify-center items-center gap-2 text-sm md:text-base text-white/90">
            <MapPin className="w-4 h-4" />
            <span>Sulaimaniyah, Chwarta Street</span>
          </div>
      <div className="flex flex-wrap justify-center items-center gap-2 text-sm md:text-base text-white/90">
            <PhoneCall className="w-4 h-4" />
            <span>0771 900 9090</span>
          </div>
          {/* Social Media Links */}
          <div className="mt-4">
            <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
              {socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/40 pt-6 w-full max-w-md">
            <p className="text-sm md:text-base text-white/90">
              © {currentYear} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
