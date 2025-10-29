'use client'
import { useState, useMemo } from 'react';
import { ShoppingCart, User, Search, Heart, X, Plus, Minus, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import Navbar from '../components/Navbar';
import { useTranslation } from 'react-i18next';

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  badge: string | null;
  description: string;
  features: string[];
}

export default function ShopPage() {
  const { t, i18n } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, cartCount } = useCart();

  // Detect if current language is RTL
  const isRTL = i18n.language === "ar" || i18n.language === "ku";

  const products: Product[] = [
    { 
      id: 1, 
      name: t('shop.products.imene.name'), 
      price: '$76.00', 
      originalPrice: '$95.00',
      image: '/images/l11.png', 
      badge: t('shop.products.imene.badge'),
      description: t('shop.products.imene.description'),
      features: [
        t('shop.products.imene.features.0'),
        t('shop.products.imene.features.1'),
        t('shop.products.imene.features.2'),
        t('shop.products.imene.features.3')
      ]
    },
    { 
      id: 2, 
      name: t('shop.products.plp.name'), 
      price: '$124.00', 
      image: '/images/l1.png', 
      badge: null,
      description: t('shop.products.plp.description'),
      features: [
        t('shop.products.plp.features.0'),
        t('shop.products.plp.features.1'),
        t('shop.products.plp.features.2'),
        t('shop.products.plp.features.3')
      ]
    },
   
  ];

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    
    const query = searchQuery.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.features.some(feature => feature.toLowerCase().includes(query))
    );
  }, [products, searchQuery]);

  const handleAddToCart = (product: Product, qty: number = 1) => {
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: product.id,
        title: product.name,
        subtitle: '',
        price: product.price,
        image: product.image,
      });
    }
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar onSearchChange={setSearchQuery} />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-100 to-pink-200 py-12 px-4 sm:py-20 sm:px-6 md:py-32 md:px-8 lg:py-48 lg:px-12 xl:py-60 xl:px-30 min-h-[60vh] sm:min-h-[70vh] md:min-h-screen flex items-center" style={{
        backgroundImage: "url('/images/newshop.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className="max-w-7xl mx-auto w-full">
          <div className={`max-w-full sm:max-w-xl lg:max-w-2xl ${isRTL ? 'text-right' : 'text-left'}`}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-relaxed text-accent mb-4 sm:mb-6">
              {t('shop.hero.title')}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-50 mb-6 sm:mb-8 leading-relaxed">
              {t('shop.hero.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar*/}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-8 relative z-10">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('shop.search.placeholder') || "Search products..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-2 text-sm text-gray-500">
              Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12 lg:gap-18">
          <div className="group">
            <div className="overflow-hidden rounded-lg mb-4">
              <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-rose-100 to-pink-50 overflow-hidden">
                <img 
                  src="images/f1.png" 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg sm:text-xl md:text-2xl text-gray-800 mb-3">{t('shop.categories.feature1')}</h3>
            </div>
          </div>
          
          <div className="group">
            <div className="overflow-hidden rounded-lg mb-4">
              <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-amber-100 to-yellow-50 overflow-hidden">
                <img 
                  src="images/f2.png" 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg sm:text-xl md:text-2xl text-gray-800 mb-3">{t('shop.categories.feature2')}</h3>
            </div>
          </div>
          
          <div className="group sm:col-span-2 lg:col-span-1">
            <div className="overflow-hidden rounded-lg mb-4">
              <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-purple-100 to-indigo-50 overflow-hidden">
                <img 
                  src="images/f3.png" 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg sm:text-xl md:text-2xl text-gray-800 mb-3">{t('shop.categories.feature3')}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Products */}
      <div className="max-w-7xl mx-auto py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-medium text-black mb-8 sm:mb-10 md:mb-12 tracking-wider">
          {searchQuery ? `SEARCH RESULTS (${filteredProducts.length})` : 'OUR PRODUCTS'}
        </h2>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer" onClick={() => { setSelectedProduct(product); setQuantity(1); }}>
                <div className="relative bg-gray-50 rounded-lg h-64 sm:h-72 md:h-80 mb-4 overflow-hidden">
                  {product.badge && (
                    <span className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-red-500 text-white text-xs px-2 sm:px-3 py-1 rounded-full z-10">
                      {product.badge}
                    </span>
                  )}
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition z-10">
                    <button className="bg-white p-2 rounded-full shadow hover:bg-gray-50">
                      <Heart size={18} className="text-gray-600" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="bg-white p-2 rounded-full shadow hover:bg-gray-50"
                    >
                      <ShoppingCart size={18} className="text-gray-600" />
                    </button>
                  </div>
                </div>
                <h3 className="text-center text-sm sm:text-base text-gray-800 font-medium mb-1">{product.name}</h3>
                <p className="text-center text-sm sm:text-base text-gray-600">{product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 animate-fadeIn overflow-y-auto"
          onClick={() => setSelectedProduct(null)}
          >
          <div
            className="relative bg-white/90 backdrop-blur-lg rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] my-4 animate-scaleIn overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Floating Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md transition z-10"
            >
              <X size={16} className="sm:hidden text-gray-700" />
              <X size={20} className="hidden sm:block text-gray-700" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto max-h-[90vh]">
              {/* Left Side - Product Image */}
              <div className="relative flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden group min-h-[200px] sm:min-h-[250px] md:min-h-[350px] lg:min-h-[400px]">
                {selectedProduct.badge && (
                  <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-primary text-white text-xs px-2 sm:px-3 py-1 rounded-full shadow-md z-10">
                    {selectedProduct.badge}
                  </span>
                )}
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-contain p-4 sm:p-6 md:p-8 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>

              {/* Right Side - Product Info */}
              <div className="flex flex-col p-1 sm:p-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2 sm:mb-3 tracking-tight">
                  {selectedProduct.name}
                </h2>

                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">{selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm sm:text-base md:text-lg text-gray-400 line-through">{selectedProduct.originalPrice}</span>
                  )}
                </div>

                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed border-y border-gray-100 py-3 sm:py-4 md:py-5 mb-3 sm:mb-4 md:mb-6">
                  {selectedProduct.description}
                </p>

                <div className="mb-3 sm:mb-4 md:mb-6">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">{t('shop.categories.keyfeatures')}</h3>
                  <ul className="space-y-1 sm:space-y-1.5 md:space-y-2">
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-xs sm:text-sm md:text-base text-gray-700">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-primary rounded-full mr-2 sm:mr-3 mt-1 sm:mt-1.5 md:mt-2 flex-shrink-0"></span>
                        <span className="flex-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                  <span className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">{t('shop.products.imene.quantity')}</span>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 sm:p-1.5 md:p-2 px-2 sm:px-3 hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={14} className="sm:hidden" />
                      <Minus size={16} className="hidden sm:block md:hidden" />
                      <Minus size={18} className="hidden md:block" />
                    </button>
                    <span className="px-2 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm md:text-base text-gray-800 font-medium min-w-[2rem] sm:min-w-[2.5rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 sm:p-1.5 md:p-2 px-2 sm:px-3 hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={14} className="sm:hidden" />
                      <Plus size={16} className="hidden sm:block md:hidden" />
                      <Plus size={18} className="hidden md:block" />
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 sm:gap-3 md:gap-4 mt-auto">
                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct, quantity);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 bg-gradient-to-r from-primary to-rose-400 text-white py-2 sm:py-3 md:py-4 rounded-lg text-xs sm:text-sm md:text-base font-semibold shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-1 sm:gap-2"
                  >
                    <ShoppingCart size={14} className="sm:hidden" />
                    <ShoppingCart size={16} className="hidden sm:block md:hidden" />
                    <ShoppingCart size={18} className="hidden md:block" />
                    {t('shop.buttons.addToCart')}
                  </button>

                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 sm:p-3 md:p-4 rounded-lg transition flex items-center justify-center min-w-[2.5rem] sm:min-w-[3rem] md:min-w-[3.5rem]">
                    <Heart size={14} className="sm:hidden" />
                    <Heart size={16} className="hidden sm:block md:hidden" />
                    <Heart size={18} className="hidden md:block" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}