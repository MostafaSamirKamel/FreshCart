"use client";

import React from "react";
import { Star } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">
          My Favorites
        </h1>
        <p className="text-gray-500 font-medium">
          Quickly access the products you love the most.
        </p>
      </div>

      <div className="card p-20 text-center bg-white border border-gray-100 rounded-[40px] shadow-sm">
        <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-400">
          <Star size={40} fill="currentColor" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter">
          No favorites yet
        </h2>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto font-medium">
          Star your favorite products to see them here for easy access.
        </p>
        <Link
          href="/"
          className="btn btn-primary px-10! py-4! text-sm font-black shadow-xl shadow-primary-600/20 active:scale-95 transition-all"
        >
          Explore Products
        </Link>
      </div>
    </div>
  );
}
