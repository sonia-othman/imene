"use client";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="container mx-auto bg-gray-50 relative"
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
          
          {/* Desktop Menu - Centered */}
          <ul className="hidden md:flex space-x-8 text-white font-medium absolute left-1/2 transform -translate-x-1/2">
            <li className="hover:text-slate-700 cursor-pointer transition-colors">Home</li>
            <Link href='/shop' className="hover:text-slate-700 cursor-pointer transition-colors">Products</Link>
            <li className="hover:text-slate-700 cursor-pointer transition-colors">About</li>
            <li className="hover:text-slate-700 cursor-pointer transition-colors">Contact</li>
          </ul>
          
          {/* Empty spacer for balance */}
          <div className="w-[100px] hidden md:block"></div>
          
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
              <li className="hover:text-yellow-100 cursor-pointer transition-colors">Home</li>
              <li className="hover:text-yellow-100 cursor-pointer transition-colors">Products</li>
              <li className="hover:text-yellow-100 cursor-pointer transition-colors">About</li>
              <li className="hover:text-yellow-100 cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
        )}
      </nav>

      {/* ===== Landing Content ===== */}
      <div className="container mx-auto pt-20 md:pt-30 px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full px-6 md:px-12 lg:px-20 py-12">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8">
            <p className="text-xs md:text-sm tracking-widest text-gray-100 uppercase">
              THE PERFECT PRODUCT FOR YOU
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              The PERFECT PRODUCT FOR YOU
            </h2>
            <p className="text-gray-50 text-base md:text-lg leading-relaxed max-w-lg">
              Qualified product and excellent customer service is our carefully attitude to every clients
            </p>
            <button className="bg-accent  text-primary px-10 py-4 rounded-lg text-sm tracking-wider uppercase hover:bg-gray-100 transition-colors w-fit mt-4">
              More Info
            </button>
          </div>
          
         
        </div>
      </div>
    </div>
  );
}