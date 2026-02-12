"use client";

import React, { useState } from "react";
import { useCart } from "@/Hooks/useCart";
import Link from "next/link";
import {
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Trash2,
  Loader2,
  Truck,
} from "lucide-react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/config/api.config";
import { ENDPOINTS } from "@/Constants/api.constants";
import { ROUTES } from "@/Constants/app.constants";
import CartItemCard from "@/Features/Cart/Components/CartItemCard";
import CartSummary from "@/Features/Cart/Components/CartSummary";
import CartCoupon from "@/Features/Cart/Components/CartCoupon";
import CartRecommendations from "@/Features/Cart/Components/CartRecommendations";

export default function CartPage() {
  const {
    items,
    totalAmount,
    totalQuantity,
    loading,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  // Cross-selling data
  const { data: recommendations } = useQuery({
    queryKey: ["cart-recommendations"],
    queryFn: async () => {
      const response = await apiClient.get(ENDPOINTS.PRODUCTS.LIST);
      return response.data.data.slice(0, 4);
    },
  });

  const subtotal = totalAmount;
  const tax = subtotal * 0.05; // 5% Tax
  const shipping = subtotal > 150 ? 0 : 15;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const finalTotal = subtotal + tax + shipping - discountAmount;

  const handleApplyCoupon = () => {
    if (!couponCode) return;
    setIsApplying(true);

    // Simulate API call
    setTimeout(() => {
      if (couponCode.toUpperCase() === "FRESH20") {
        const disc = subtotal * 0.2;
        setAppliedCoupon({ code: "FRESH20", discount: disc });
        toast.success("Coupon FRESH20 applied! You saved 20%");
      } else {
        toast.error("Invalid coupon code. Try 'FRESH20'");
      }
      setIsApplying(false);
      setCouponCode("");
    }, 800);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast.info("Coupon removed");
  };

  if (items.length === 0 && !loading) {
    return (
      <main className="py-24 bg-white min-h-[70vh] flex items-center">
        <div className="container text-center">
          <div className="w-32 h-32 bg-gray-50 rounded-[40px] flex items-center justify-center mx-auto mb-8 shadow-sm">
            <ShoppingBag size={56} className="text-gray-300" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">
            Your cart is empty
          </h1>
          <p className="text-gray-400 font-bold mb-10 max-w-md mx-auto text-lg leading-relaxed">
            Looks like you haven't added anything to your cart yet. Dive into
            our fresh selections!
          </p>
          <Link
            href={ROUTES.PRODUCTS}
            className="btn btn-primary px-12! py-4! text-lg font-black shadow-2xl shadow-primary-600/20 active:scale-95 transition-all"
          >
            Start Shopping <ArrowRight className="inline ml-2" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="py-12 bg-[#F8F9FA] min-h-screen">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-10 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link
            href={ROUTES.HOME}
            className="hover:text-primary-600 font-bold transition-colors"
          >
            Home
          </Link>
          <ChevronRight size={14} className="shrink-0" />
          <span className="font-black text-gray-900">Shopping Cart</span>
        </nav>

        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-400 font-bold text-lg uppercase tracking-widest text-sm flex items-center justify-center md:justify-start gap-2">
            <ShoppingBag size={18} className="text-primary-600" />
            {totalQuantity} items in your premium selection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Content: Items & Coupon */}
          <div className="lg:col-span-2 space-y-8">
            {/* Items Card */}
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden relative">
              {loading && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-20 flex items-center justify-center">
                  <Loader2
                    className="animate-spin text-primary-600"
                    size={40}
                  />
                </div>
              )}
              <div className="p-8 md:p-10 divide-y divide-gray-100">
                {items.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
            </div>

            {/* Selection Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-6">
              <Link
                href={ROUTES.PRODUCTS}
                className="flex items-center gap-2 text-sm font-black text-gray-400 uppercase tracking-widest hover:text-primary-600 transition-all"
              >
                <ChevronLeft size={18} /> Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-sm font-black text-gray-400 uppercase tracking-widest hover:text-red-500 transition-all flex items-center gap-2"
              >
                <Trash2 size={18} /> Clear Cart
              </button>
            </div>

            {/* Coupon Section */}
            <CartCoupon
              couponCode={couponCode}
              onCouponCodeChange={setCouponCode}
              onApply={handleApplyCoupon}
              onRemove={handleRemoveCoupon}
              isApplying={isApplying}
              appliedCoupon={appliedCoupon}
            />
          </div>

          {/* Sticky Sidebar: Summary */}
          <div className="lg:col-span-1 space-y-8">
            <CartSummary
              subtotal={subtotal}
              totalQuantity={totalQuantity}
              shipping={shipping}
              tax={tax}
              discount={discountAmount}
              couponCode={appliedCoupon?.code}
              finalTotal={finalTotal}
            />

            {/* Delivery Progress (Mock) */}
            <div className="card bg-linear-to-r from-primary-600 to-primary-700 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-xl font-black mb-1">Eco-Green Delivery</h4>
                <p className="text-primary-100 text-xs font-bold mb-6">
                  Sustainable shipping for a better planet.
                </p>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-1000"
                    style={{ width: "85%" }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-80">
                  <span>Preparing</span>
                  <span>Near Delivery</span>
                </div>
              </div>
              <Truck className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 -rotate-12" />
            </div>
          </div>
        </div>

        {/* === SECTION: YOU MIGHT ALSO LIKE === */}
        <CartRecommendations products={recommendations} />
      </div>
    </main>
  );
}
