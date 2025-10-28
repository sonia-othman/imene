'use client'
import { useState } from 'react';
import { ShoppingCart, User, Search, Heart, X, Plus, Minus } from 'lucide-react';
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
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart, cartCount } = useCart();

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
      <Navbar />


      {/* Hero Section */}
      <div className=" relative bg-gradient-to-r from-pink-100 to-pink-200 p-60 px-30 min-h-screen" style={{
        backgroundImage: "url('/images/newshop.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="max-w-xl">
            <h1 className="text-6xl font-bold text-accent mb-6">
              {t('shop.hero.title')}
            </h1>
            <p className="text-gray-50 mb-8 leading-relaxed">
              {t('shop.hero.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto py-16 px-8">
        <div className="grid grid-cols-3 gap-18">
          <div className="group">
            <div className="overflow-hidden rounded-lg mb-4">
              <div className="relative h-64 bg-gradient-to-br from-rose-100 to-pink-50 overflow-hidden">
                <img 
                  src="images/f1.png" 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl text-gray-800 mb-3">{t('shop.categories.feature1')}</h3>
            </div>
          </div>
          
          <div className="group">
            <div className="overflow-hidden rounded-lg mb-4">
              <div className="relative h-64 bg-gradient-to-br from-amber-100 to-yellow-50 overflow-hidden">
                <img 
                  src="images/f2.png" 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl    text-gray-800 mb-3">{t('shop.categories.feature2')}</h3>
            </div>
          </div>
          
          <div className="group">
            <div className="overflow-hidden rounded-lg mb-4">
              <div className="relative h-64 bg-gradient-to-br from-purple-100 to-indigo-50 overflow-hidden">
                <img 
                  src="images/f3.png" 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl  text-gray-800 mb-3">{t('shop.categories.feature3')}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Products */}
      <div className="max-w-7xl mx-auto py-16 px-8">
        <h2 className="text-center text-3xl font-medium text-black mb-12 tracking-wider">
          OUR PRODUCTS
        </h2>
        <div className="grid grid-cols-3 gap-8">
          {products.slice(0, 3).map((product) => (
            <div key={product.id} className="group cursor-pointer" onClick={() => { setSelectedProduct(product); setQuantity(1); }}>
              <div className="relative bg-gray-50 rounded-lg h-80 mb-4 overflow-hidden">
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-10">
                    {product.badge}
                  </span>
                )}
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className="object-contain"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition z-10">
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
              <h3 className="text-center text-gray-800 font-medium mb-1">{product.name}</h3>
              <p className="text-center text-gray-600">{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Preview Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl max-w-6xl w-full overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Floating Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 bg-white/70 hover:bg-white p-3 rounded-full shadow-md transition z-10"
            >
              <X size={22} className="text-gray-700" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
              {/* Left Side - Product Image */}
              <div className="relative flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden group">
                {selectedProduct.badge && (
                  <span className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full shadow-md">
                    {selectedProduct.badge}
                  </span>
                )}
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-contain p-10 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Right Side - Product Info */}
              <div className="flex flex-col">
                <h2 className="text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
                  {selectedProduct.name}
                </h2>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-primary">{selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">{selectedProduct.originalPrice}</span>
                  )}
                </div>

                <p className="text-gray-700 leading-relaxed border-y border-gray-100 py-5 mb-6">
                  {selectedProduct.description}
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('shop.categories.keyfeatures')}</h3>
                  <ul className="space-y-2">
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="w-2.5 h-2.5 bg-primary rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-gray-700 font-medium">{t('shop.products.imene.quantity')}</span>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 px-3 hover:bg-gray-100"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-5 py-2 text-gray-800 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 px-3 hover:bg-gray-100"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                  onClick={() => {
                    handleAddToCart(selectedProduct, quantity);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 bg-gradient-to-r from-primary to-rose-400 text-white py-4 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  {t('shop.buttons.addToCart')}
                </button>

                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-4 rounded-xl transition flex items-center justify-center">
                    <Heart size={20} />
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