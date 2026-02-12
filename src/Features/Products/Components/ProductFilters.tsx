"use client";

import React from "react";
import { Search, X, Filter } from "lucide-react";

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  categories: any[] | undefined;
  isLoading?: boolean;
  selectedCategory: string;
  onCategoryChange: (catId: string) => void;
}

export default function ProductFilters({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  categories,
  isLoading,
  selectedCategory,
  onCategoryChange,
}: ProductFiltersProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const showSkeletons = !isMounted || isLoading;

  return (
    <aside className="lg:w-72 space-y-8 shrink-0">
      {/* Search Box */}
      <div className="card p-6 bg-white border-0 shadow-sm">
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">
          Search
        </h3>
        <form onSubmit={onSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary-600 outline-none transition-all"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </form>
      </div>

      {/* Category Filter */}
      <div className="card p-6 bg-white border-0 shadow-sm">
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">
          Categories
        </h3>
        <div className="space-y-3">
          {showSkeletons
            ? // Loading Skeletons
              [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-full h-10 bg-gray-50 animate-pulse rounded-lg"
                />
              ))
            : categories?.map((cat: any) => (
                <button
                  key={cat._id}
                  onClick={() => onCategoryChange(cat._id)}
                  className={`flex items-center justify-between w-full text-left p-2 rounded-lg transition-all font-bold text-sm ${
                    selectedCategory === cat._id
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span>{cat.name}</span>
                  {selectedCategory === cat._id && <X size={14} />}
                </button>
              ))}
        </div>
      </div>

      {/* Quality Banner */}
      <div className="card p-8 bg-linear-to-br from-gray-900 to-black text-white relative overflow-hidden rounded-3xl border-0 shadow-xl">
        <div className="relative z-10">
          <h4 className="text-xl font-black mb-2 tracking-tighter">
            Premium Support
          </h4>
          <p className="text-xs text-gray-400 font-bold mb-6">
            Need help picking the right product?
          </p>
          <button className="btn btn-primary bg-white! text-black! py-2! text-xs font-black shadow-none">
            Live Chat
          </button>
        </div>
        <Filter className="absolute -right-8 -bottom-8 w-32 h-32 opacity-10 rotate-12" />
      </div>
    </aside>
  );
}
