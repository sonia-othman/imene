"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';
import { ShoppingBasket } from "lucide-react";

const products = [
  {
    id: 1,
    image: "/images/l1.png",
    title: "Discover the Beauty ",
    subtitle: "You Deserve",
    description: "Shop our premium laser devices and skincare essentials designed for smooth, radiant confidence.",
    price: "$99.99",
    bgColor: "from-pink-50 to-white",
    glowColor: "bg-pink-200"
  },
  {
    id: 2,
    image: "/images/l11.png",
    title: "Your Glow",
    subtitle: "Starts Here",
    description: "Explore our collection of advanced body laser treatments and care products for flawless results.",
    price: "$89.99",
    bgColor: "from-purple-50 to-white",
    glowColor: "bg-purple-200"
  },
];

export default function LasersPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart, cartCount } = useCart();

  const extendedProducts = [...products, products[0]];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentSlide === products.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, 700);
    }
  }, [currentSlide]);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      title: product.title,
      subtitle: product.subtitle,
      price: product.price,
      image: product.image,
    });
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const displayProduct = extendedProducts[currentSlide];
  const actualIndex = currentSlide % products.length;

  return (
    <div className={`container mx-auto bg-gradient-to-br ${displayProduct.bgColor} flex items-center justify-center p-4 sm:p-6 md:p-8 transition-all duration-1000 relative`}>
     

      {/* Cart Badge */}
      {cartCount > 0 && (
        <Link href="/cart">
          <div className="fixed top-4 right-4 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-50 cursor-pointer hover:bg-pink-700 transition-all duration-300">
            <ShoppingBasket className="w-7 h-7" />
            <span className="absolute top-1 right-1 bg-white text-primary text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          </div>
        </Link>
      )}

      <div className="max-w-6xl w-full">
        <div className="overflow-hidden">
          <div 
            className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {extendedProducts.map((product, index) => (
              <div key={index} className="min-w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
                {/* Product Image Section */}
                <div className="relative flex justify-center items-center py-8 md:py-0 order-1 md:order-1">
                  <div className={`absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 ${product.glowColor} rounded-full opacity-40 blur-3xl`}></div>
                  <div className="relative z-10">
                    <img 
                      src={product.image} 
                      alt={`${product.title} ${product.subtitle}`}
                      className="w-64 sm:w-80 md:w-96 lg:w-[28rem] h-auto object-contain"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="space-y-4 sm:space-y-5 md:space-y-6 order-2 md:order-2 px-2 sm:px-0">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 leading-tight">
                    {product.title}<br />{product.subtitle}
                  </h1>
                  
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md">
                    {product.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center pt-2">
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 hover:bg-pink-300 transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base rounded"
                    >
                      Add to Cart | {product.price}
                    </button>
                    
                    <Link href="/shop" className="text-pink-300 underline hover:text-pink-700 transition-colors text-sm sm:text-base text-center sm:text-left">
                      Explore More
                    </Link>
                  </div>

                  {/* Slide Indicators */}
                  <div className="flex gap-2 pt-4 justify-center sm:justify-start">
                    {products.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          idx === actualIndex ? 'w-8 bg-primary' : 'w-4 bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}