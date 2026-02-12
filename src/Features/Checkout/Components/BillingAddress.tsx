"use client";

import React from "react";

interface BillingAddressProps {
  isSameAddress: boolean;
  onSameAddressChange: (val: boolean) => void;
  // In a real app we would use react-hook-form here
}

const inputClasses =
  "w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl font-bold text-sm outline-none transition-all focus:ring-2 focus:ring-primary-600 focus:bg-white placeholder:text-gray-300";

export default function BillingAddress({
  isSameAddress,
  onSameAddressChange,
}: BillingAddressProps) {
  return (
    <div className="bg-white rounded-[24px] p-8 lg:p-10 shadow-sm border border-gray-50">
      <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">
        Billing Address
      </h2>

      <label className="flex items-center gap-3 mb-10 cursor-pointer group">
        <input
          type="checkbox"
          checked={isSameAddress}
          onChange={(e) => onSameAddressChange(e.target.checked)}
          className="w-5 h-5 accent-primary-600 rounded cursor-pointer"
        />
        <span className="text-gray-700 font-bold text-sm group-hover:text-primary-600 transition-colors">
          Same as delivery address
        </span>
      </label>

      {!isSameAddress && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">
              First Name
            </label>
            <input
              type="text"
              className={inputClasses}
              placeholder="Enter first name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">
              Last Name
            </label>
            <input
              type="text"
              className={inputClasses}
              placeholder="Enter last name"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">
              Street Address
            </label>
            <input
              type="text"
              className={inputClasses}
              placeholder="House number and street name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">
              City
            </label>
            <input
              type="text"
              className={inputClasses}
              placeholder="Your city"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">
              ZIP Code
            </label>
            <input
              type="text"
              className={inputClasses}
              placeholder="Postal code"
            />
          </div>
        </div>
      )}
    </div>
  );
}
