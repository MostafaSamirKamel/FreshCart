"use client";

import React from "react";
import { Ticket, X, Loader2 } from "lucide-react";

interface CartCouponProps {
  couponCode: string;
  onCouponCodeChange: (value: string) => void;
  onApply: () => void;
  onRemove: () => void;
  isApplying: boolean;
  appliedCoupon: { code: string; discount: number } | null;
}

export default function CartCoupon({
  couponCode,
  onCouponCodeChange,
  onApply,
  onRemove,
  isApplying,
  appliedCoupon,
}: CartCouponProps) {
  return (
    <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-sm border border-gray-100 relative overflow-hidden group/coupon">
      <Ticket className="absolute -right-4 -bottom-4 w-32 h-32 text-gray-50 -rotate-12 group-hover/coupon:scale-110 group-hover/coupon:text-primary-50 transition-all duration-700" />
      <div className="relative z-10 max-w-lg">
        <h3 className="text-2xl font-black text-gray-900 tracking-tighter mb-4">
          Have a promo code?
        </h3>
        <p className="text-gray-400 text-sm font-bold mb-8 italic">
          Enter your code below to unlock exclusive discounts on your fresh
          haul!
        </p>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter coupon code (Try FRESH20)"
              value={couponCode}
              onChange={(e) => onCouponCodeChange(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-black focus:ring-2 focus:ring-primary-600 outline-none transition-all uppercase placeholder:normal-case shadow-inner"
            />
            {appliedCoupon && (
              <button
                onClick={onRemove}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-red-500 transition-all"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <button
            onClick={onApply}
            disabled={isApplying || !couponCode}
            className="btn btn-primary px-8! py-4! text-sm font-black shadow-xl shadow-primary-600/20 active:scale-95 transition-all flex items-center gap-2 min-w-[120px]"
          >
            {isApplying ? (
              <Loader2 className="animate-spin" size={18} />
            ) : appliedCoupon ? (
              "Applied"
            ) : (
              "Apply"
            )}
          </button>
        </div>

        {appliedCoupon && (
          <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-between animate-in zoom-in duration-300">
            <div className="flex items-center gap-3">
              <span className="bg-green-600 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">
                {appliedCoupon.code}
              </span>
              <span className="text-green-600 text-sm font-black uppercase tracking-widest">
                Active Discount
              </span>
            </div>
            <span className="text-green-600 font-black text-lg">
              -${appliedCoupon.discount.toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
