"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { ShoppingBag, Trash2, Minus, Plus, X, CreditCard, Banknote } from "lucide-react";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone1: "",
    phone2: "",
    paymentMethod: "card"
  });

  const calculateTotal = () =>
    cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentMethodChange = (method: string) => {
    setFormData({
      ...formData,
      paymentMethod: method
    });
  };

  const handleSubmitOrder = () => {
    if (!formData.fullName || !formData.address || !formData.phone1) {
      alert("Please fill in all required fields");
      return;
    }
    
    console.log("Order submitted:", formData);
    alert("Order placed successfully!");
    setShowCheckoutForm(false);
    clearCart();
    setFormData({
      fullName: "",
      address: "",
      phone1: "",
      phone2: "",
      paymentMethod: "card"
    });
  };

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-50 flex items-center justify-center p-6">
        <div className="text-center bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-lg border border-pink-100">
          <ShoppingBag className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-semibold text-gray-800 mb-3">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-6">Let's fill it with something special</p>
          <Link
            href="/"
            className="inline-block bg-primary hover:bg-pink-200 text-white px-8 py-3 rounded-full font-medium shadow-md transition-transform transform hover:scale-105"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-primary" />
            Your Cart
          </h1>
          <Link
            href="/shop"
            className="text-white hover:bg-pink-200 bg-primary rounded-2xl py-4 px-6 font-medium transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Cart Items */}
        <div className="space-y-6 mb-10">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-6 bg-white/70 backdrop-blur-lg p-5 rounded-2xl shadow-sm border border-pink-100 hover:shadow-md transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-28 h-28 object-contain rounded-xl"
              />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-500">{item.subtitle}</p>
                <p className="text-blue-950 font-bold mt-2">{item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-full">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 hover:bg-gray-200 rounded-full transition"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="w-6 text-center font-semibold text-gray-800">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:bg-gray-200 rounded-full transition"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="flex items-center gap-1 text-red-500 hover:text-red-600 font-medium transition"
              >
                <Trash2 className="w-4 h-4" /> Remove
              </button>
            </div>
          ))}
        </div>

        {/* Total and Checkout */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-md border border-pink-100">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-semibold text-gray-800">Total:</span>
            <span className="text-3xl font-bold text-gray-800">${calculateTotal()}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setShowCheckoutForm(true)}
              className="flex-1 bg-primary hover:bg-pink-700 text-white py-3 rounded-full font-medium shadow-md transition-transform transform hover:scale-105"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-full font-medium transition-transform transform hover:scale-105"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Form Modal */}
      {showCheckoutForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
              <button
                onClick={() => setShowCheckoutForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                  placeholder="Enter your delivery address"
                />
              </div>

              {/* Phone Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number 1 *
                  </label>
                  <input
                    type="tel"
                    name="phone1"
                    value={formData.phone1}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    placeholder="Primary phone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number 2
                  </label>
                  <input
                    type="tel"
                    name="phone2"
                    value={formData.phone2}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    placeholder="Secondary phone (optional)"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Payment Method *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handlePaymentMethodChange("card")}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition ${
                      formData.paymentMethod === "card"
                        ? "border-primary bg-pink-50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                  >
                    <img 
                      src="/images/fiblogo.png" 
                      alt="Credit Card"
                      className="w-20 h-20 object-contain"
                    />
                    <span className={`font-semibold ${formData.paymentMethod === "card" ? "text-primary" : "text-gray-700"}`}>
                      Card
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePaymentMethodChange("cash")}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition ${
                      formData.paymentMethod === "cash"
                        ? "border-secondary bg-pink-50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                  >
                    <Banknote className={`w-16 h-16 ${formData.paymentMethod === "cash" ? "text-primary" : "text-gray-600"}`} />
                    <span className={`font-semibold ${formData.paymentMethod === "cash" ? "text-primary" : "text-gray-700"}`}>
                      Cash
                    </span>
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-gray-700">Order Total:</span>
                  <span className="font-bold text-gray-900 text-2xl">${calculateTotal()}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitOrder}
                className="w-full bg-primary hover:bg-pink-900 text-white py-4 rounded-xl font-semibold shadow-md transition-transform transform hover:scale-105"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}