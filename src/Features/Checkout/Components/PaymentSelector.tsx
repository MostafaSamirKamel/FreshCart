"use client";

import React from "react";
import { Banknote, CreditCard, Info } from "lucide-react";

interface PaymentSelectorProps {
  paymentMethod: string;
  onMethodChange: (method: string) => void;
}

export default function PaymentSelector({
  paymentMethod,
  onMethodChange,
}: PaymentSelectorProps) {
  return (
    <div className="bg-white rounded-[24px] p-8 lg:p-10 shadow-sm border border-gray-50">
      <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">
        Payment Method
      </h2>

      <div className="space-y-4">
        {/* Cash on Delivery */}
        <label
          className={`block cursor-pointer group transition-all rounded-2xl border-2 p-6 ${
            paymentMethod === "cash"
              ? "border-primary-600 bg-white"
              : "border-gray-100 hover:border-gray-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cash"}
                  onChange={() => onMethodChange("cash")}
                  className="w-5 h-5 accent-primary-600 cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    paymentMethod === "cash"
                      ? "bg-primary-100 text-primary-600"
                      : "bg-gray-50 text-gray-400"
                  }`}
                >
                  <Banknote size={24} />
                </div>
                <div>
                  <p className="font-black text-gray-900 group-hover:text-primary-600 transition-colors">
                    Cash on Delivery
                  </p>
                  <p className="text-gray-400 font-bold text-sm tracking-wide">
                    Pay when your order arrives
                  </p>
                </div>
              </div>
            </div>
            <span className="text-primary-600 font-black text-sm uppercase tracking-widest bg-primary-50 px-3 py-1 rounded-full">
              No extra charges
            </span>
          </div>

          {paymentMethod === "cash" && (
            <div className="mt-6 flex items-start gap-4 bg-[#F0F9F4] p-4 rounded-xl border border-primary-100 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="p-1 sm:p-0">
                <Info size={18} className="text-primary-600 shrink-0" />
              </div>
              <p className="text-primary-600 text-sm font-bold leading-relaxed">
                Please keep exact change ready for hassle-free delivery.
              </p>
            </div>
          )}
        </label>

        {/* Online Payment (Selected) */}
        <label
          className={`block cursor-pointer group transition-all rounded-2xl border-2 p-6 ${
            paymentMethod === "online"
              ? "border-primary-600 bg-[#F9FEF9]"
              : "border-gray-100 hover:border-gray-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "online"}
                onChange={() => onMethodChange("online")}
                className="w-5 h-5 accent-primary-600 cursor-pointer"
              />
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    paymentMethod === "online"
                      ? "bg-primary-100 text-primary-600"
                      : "bg-gray-50 text-gray-400"
                  }`}
                >
                  <CreditCard size={24} />
                </div>
                <div>
                  <p className="font-black text-gray-900 group-hover:text-primary-600 transition-colors">
                    Online Payment
                  </p>
                  <p className="text-gray-400 font-bold text-sm tracking-wide">
                    Pay securely with card or wallet
                  </p>
                </div>
              </div>
            </div>
            <span className="text-primary-600 font-black text-sm uppercase tracking-widest bg-primary-100 px-4 py-1.5 rounded-full shadow-sm">
              Recommended
            </span>
          </div>

          {paymentMethod === "online" && (
            <div className="mt-6 flex items-start gap-4 bg-[#F0F7FF] p-4 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-top-2 duration-300">
              <Info size={18} className="text-[#3B82F6] shrink-0" />
              <p className="text-[#3B82F6] text-sm font-bold leading-relaxed">
                You will be redirected to secure payment gateway to complete
                your transaction.
              </p>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}
