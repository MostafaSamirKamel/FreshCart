"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Lock } from "lucide-react";
import type { CartItem } from "@/Types/cart.types";
import { ROUTES } from "@/Constants/app.constants";

interface CheckoutOrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  discount: number;
  delivery: number;
  tax: number;
  finalTotal: number;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBackToCart: () => void;
}

export default function CheckoutOrderSummary({
  items,
  subtotal,
  discount,
  delivery,
  tax,
  finalTotal,
  isSubmitting,
  onSubmit,
  onBackToCart,
}: CheckoutOrderSummaryProps) {
  return (
    <aside className="sticky top-28">
      <div className="bg-white rounded-[24px] p-8 shadow-xl border border-gray-50">
        <h3 className="text-xl font-black text-gray-900 mb-8">Order Summary</h3>

        <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 p-1 shrink-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <div className="grow min-w-0">
                <p className="text-sm font-black text-gray-900 truncate">
                  {item.title}
                </p>
                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="text-sm font-black text-gray-900 shrink-0">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm font-bold">
            <span className="text-gray-400">Subtotal</span>
            <span className="text-gray-900 font-black">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm font-bold">
            <span className="text-gray-400">Discount (20%)</span>
            <span className="text-primary-600 font-black">
              -${discount.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm font-bold">
            <span className="text-gray-400">Delivery</span>
            <span className="text-gray-900 font-black">
              ${delivery.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm font-bold pb-2">
            <span className="text-gray-400">Tax</span>
            <span className="text-gray-900 font-black">${tax.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <span className="text-lg font-black text-gray-900 tracking-tighter uppercase">
              Total
            </span>
            <span className="text-3xl font-black text-primary-600 tracking-tighter">
              ${finalTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full btn btn-primary py-4! text-base font-black flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-primary-600/20"
          >
            {isSubmitting ? (
              "Processing..."
            ) : (
              <>
                Proceed to Payment <ArrowRight size={18} />
              </>
            )}
          </button>
          <button
            onClick={onBackToCart}
            className="w-full btn btn-outline py-4! text-base font-black flex items-center justify-center gap-2 text-gray-500!"
          >
            <ArrowLeft size={18} /> Return to Cart
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 text-center">
            Secure Checkout
          </h4>
          <div className="flex items-center justify-center gap-3 text-primary-600 mb-6">
            <Lock size={16} fill="currentColor" />
            <span className="text-xs font-black text-gray-600 tracking-tight">
              SSL SECURE PAYMENT INFO
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 opacity-60">
            <Image
              src="https://static-00.iconduck.com/assets.00/visa-icon-512x162-42qnvz65.png"
              alt="Visa"
              width={32}
              height={20}
              className="grayscale"
              unoptimized
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
              alt="Mastercard"
              width={32}
              height={20}
              className="grayscale"
              unoptimized
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Amex_logo_color.svg/2560px-Amex_logo_color.svg.png"
              alt="Amex"
              width={32}
              height={20}
              className="grayscale"
              unoptimized
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
