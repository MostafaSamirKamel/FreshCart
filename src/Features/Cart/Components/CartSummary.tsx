"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  LayoutGrid,
  CheckCircle2,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { ROUTES } from "@/Constants/app.constants";

interface CartSummaryProps {
  subtotal: number;
  totalQuantity: number;
  shipping: number;
  tax: number;
  discount: number;
  couponCode?: string;
  finalTotal: number;
}

export default function CartSummary({
  subtotal,
  totalQuantity,
  shipping,
  tax,
  discount,
  couponCode,
  finalTotal,
}: CartSummaryProps) {
  return (
    <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl border border-gray-100 sticky top-28">
      <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tighter flex items-center gap-3 pb-6 border-b border-gray-50">
        <LayoutGrid className="text-primary-600" size={24} /> Order Summary
      </h2>

      <div className="space-y-5 mb-10">
        <div className="flex justify-between items-center group">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            Subtotal ({totalQuantity})
          </span>
          <span className="text-lg font-black text-gray-900 tracking-tight">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center group">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Shipping
            </span>
            {shipping === 0 && (
              <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider">
                Free Shipping Threshold Reached
              </span>
            )}
          </div>
          <span
            className={`text-lg font-black tracking-tight ${shipping === 0 ? "text-green-600" : "text-gray-900"}`}
          >
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        {couponCode && (
          <div className="flex justify-between items-center text-green-600 animate-fade-in">
            <span className="text-sm font-black uppercase tracking-widest">
              Discount ({couponCode})
            </span>
            <span className="text-lg font-black tracking-tight">
              -${discount.toFixed(2)}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center group">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            Estimated Tax (5%)
          </span>
          <span className="text-lg font-black text-gray-900 tracking-tight">
            ${tax.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="bg-gray-50/50 rounded-3xl p-6 border border-gray-100 mb-10">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
              Final Amount
            </p>
            <p className="text-5xl font-black text-gray-900 tracking-tighter leading-none">
              ${finalTotal.toFixed(2)}
            </p>
          </div>
          <CheckCircle2 className="text-primary-600" size={32} />
        </div>
      </div>

      <div className="space-y-4">
        <Link
          href={ROUTES.CHECKOUT}
          className="btn btn-primary w-full py-6! text-2xl font-black shadow-2xl shadow-primary-600/30 flex items-center justify-center gap-4 active:scale-95 group transition-all"
        >
          Checkout Now
          <ArrowRight
            size={24}
            className="group-hover:translate-x-2 transition-transform"
          />
        </Link>
      </div>

      {/* Trust Benchmarks */}
      <div className="mt-10 pt-10 border-t border-gray-50 grid grid-cols-2 gap-6">
        <div className="text-center space-y-2 group">
          <div className="w-10 h-10 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mx-auto transition-all group-hover:scale-110">
            <Truck size={20} />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Free Delivery
          </p>
        </div>
        <div className="text-center space-y-2 group">
          <div className="w-10 h-10 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mx-auto transition-all group-hover:scale-110">
            <ShieldCheck size={20} />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Secure SSL
          </p>
        </div>
      </div>
    </div>
  );
}
