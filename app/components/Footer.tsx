import { Facebook, Instagram, Ghost, MapPin, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialMedia = [
    { name: 'Facebook', icon: <Facebook className="w-6 h-6" />, href: '#' },
    { name: 'Instagram', icon: <Instagram className="w-6 h-6" />, href: 'https://www.instagram.com/imenelaser.iq?igsh=azl4amMza3R3ZnZ2' },
    { name: 'Snapchat', icon: <Ghost className="w-6 h-6" />, href: '#' },
  ];

  return (
    <footer className="container mx-auto bg-gradient-to-b from-primary to-pink-100 text-white py-10" >
      <div className=" px-4">
        <div className="flex flex-col items-center text-center space-y-6">
          
          {/* Logo */}
          <Image 
            src="/images/imenelogo.png" 
            width={100} 
            height={100} 
            alt="logo" 
            className="text-2xl font-bold"
          />

          {/* Navigation */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-6 text-white mb-2">
              <li><Link href="/" className="hover:text-gray-100 transition-colors">Home</Link></li>
              <li><Link href="/shop" className="hover:text-gray-100 transition-colors">Product</Link></li>
              <li><Link href="#" className="hover:text-gray-100 transition-colors">Services</Link></li>
              <li><Link href="#" className="hover:text-gray-100 transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-gray-100 transition-colors">Contact</Link></li>
            </ul>
          </nav>

          {/* Location */}
          <div className="flex items-center space-x-2 text-sm text-white/90">
            <MapPin className="w-4 h-4" />
            <span>Sulaimaniyah, Chwarta Street</span> 
            <span>|</span> 
              <PhoneCall className="w-4 h-4" />
            <span>0771 900 9090</span>
          </div>

          {/* Social Media Links */}
          <div className="mt-4">
            <div className="flex justify-center space-x-4">
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

          {/* Footer bottom */}
          <div className="border-t border-white/40 pt-6 w-full max-w-md">
            <p className="text-sm text-white/90">
              © {currentYear} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
