"use client";

import React from "react";
import ProductCard from "@/Features/Home/Components/productCard";
import { ProductCardSkeleton } from "@/Components/Shared/Skeleton";
import { Search, LayoutGrid, List } from "lucide-react";

interface ProductGridProps {
  products: any[];
  isLoading: boolean;
  sortOrder: string;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
}

export default function ProductGrid({
  products,
  isLoading,
  sortOrder,
  onSortChange,
  onClearFilters,
}: ProductGridProps) {
  return (
    <div className="grow space-y-8">
      {/* Toolbar */}
      <div className="card p-4 md:p-6 bg-white border-0 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-gray-500">
            Showing{" "}
            <span className="text-gray-900">{products?.length || 0}</span>{" "}
            products
          </span>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
            <button className="p-2 bg-white rounded-lg shadow-sm text-primary-600">
              <LayoutGrid size={18} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
              <List size={18} />
            </button>
          </div>

          <select
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
            className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary-600 grow md:grow-0"
          >
            <option value="-createdAt">Newest Arrivals</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="-ratingsAverage">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : products?.length === 0 ? (
        <div className="card py-20 bg-white border-0 shadow-sm text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <Search size={40} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            No products found
          </h2>
          <p className="text-gray-400 font-bold mb-8">
            Try adjusting your filters or search query.
          </p>
          <button
            onClick={onClearFilters}
            className="btn btn-primary px-8! py-3!"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product: any) => (
            <ProductCard
              key={product._id}
              id={product._id}
              title={product.title}
              image={product.imageCover}
              price={product.price}
              rating={product.ratingsAverage}
              category={product.category.name}
              priceAfterDiscount={product.priceAfterDiscount}
            />
          ))}
        </div>
      )}
    </div>
  );
}
