"use client";

import React from "react";
import { CreditCard, Plus } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter">
            Payment Methods
          </h1>
          <p className="text-gray-500 font-medium">
            Securely manage your saved cards and payment options.
          </p>
        </div>
        <button className="btn btn-primary flex items-center gap-2 px-8! py-3! font-black shadow-xl shadow-primary-600/20 active:scale-95 transition-all">
          <Plus size={20} /> Add New Card
        </button>
      </div>

      <div className="card p-20 text-center bg-white border border-gray-100 rounded-[40px] shadow-sm">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400">
          <CreditCard size={40} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter">
          No payment methods saved
        </h2>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto font-medium text-balance">
          You haven't added any payment methods yet. Add a card to start
          shopping conveniently.
        </p>
      </div>
    </div>
  );
}
