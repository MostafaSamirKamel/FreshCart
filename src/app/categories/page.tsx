"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CategoryCard from "@/Features/Home/Components/categoryCard";
import { CategoryCardSkeleton } from "@/Components/Shared/Skeleton";
import { ChevronRight, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/Constants/app.constants";

export default function CategoriesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories-all"],
    queryFn: async () => {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories",
      );
      return response.data;
    },
  });

  const categories = data?.data || [];

  if (error)
    return (
      <div className="container py-20 text-center">
        <p className="text-red-500 font-bold text-lg">
          Failed to load categories. Please check your connection and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-[#00B207] text-white px-6 py-2 rounded-md font-bold"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E5E5E5] py-[15px]">
        <div className="container px-4">
          <nav className="flex items-center gap-2 text-[14px]">
            <Link
              href={ROUTES.HOME}
              className="text-[#808080] hover:text-[#00B207]"
            >
              Home
            </Link>
            <ChevronRight size={14} className="text-[#808080]" />
            <span className="text-[#00B207] font-medium">All Categories</span>
          </nav>
        </div>
      </div>

      <div className="container px-4 py-12">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-[#00B207] font-bold text-sm uppercase tracking-wider mb-2">
              <LayoutGrid size={18} />
              <span>Explore Our Shop</span>
            </div>
            <h1 className="text-[36px] md:text-[48px] font-black text-[#1A1A1A] mb-4 tracking-tight leading-tight">
              Browse Categories
            </h1>
            <p className="text-[#666666] text-lg font-medium leading-relaxed">
              Discover our wide selection of premium organic and fresh products,
              carefully organized to help you find exactly what you need.
            </p>
          </div>
          <div className="bg-white border border-[#E5E5E5] px-6 py-4 rounded-2xl shadow-sm shrink-0">
            <p className="text-[#999999] text-xs font-bold uppercase tracking-widest mb-1">
              Total Categories
            </p>
            <p className="text-3xl font-black text-[#1A1A1A]">
              {isLoading ? "..." : categories.length}
            </p>
          </div>
        </div>

        {/* Grid Section */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(12)].map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
            {categories.map((category: any) => (
              <CategoryCard
                key={category._id}
                id={category._id}
                name={category.name}
                image={category.image}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && categories.length === 0 && (
          <div className="bg-white border border-[#E5E5E5] rounded-3xl p-20 text-center shadow-sm">
            <LayoutGrid size={60} className="mx-auto text-gray-200 mb-6" />
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
              No categories found
            </h2>
            <p className="text-[#666666]">
              We couldn't find any categories at the moment.
            </p>
          </div>
        )}
      </div>

      {/* Featured Section / CTA */}
      <div className="container px-4 mt-12">
        <div className="bg-[#00B207] rounded-[30px] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-xl shadow-[#00B207]/20">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">
              Healthy Food, Healthy Life
            </h2>
            <p className="text-white/80 text-lg mb-10 leading-relaxed">
              All our products are 100% organic and fresh from our partner
              farms. Start your healthy journey today with our fresh deliveries.
            </p>
            <Link
              href={ROUTES.PRODUCTS}
              className="bg-white text-[#00B207] px-10 py-4 rounded-xl font-black shadow-lg hover:bg-gray-50 transition-all inline-block"
            >
              Shop All Products
            </Link>
          </div>
          {/* Abstract Background Shapes */}
          <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-50px] right-[-50px] w-80 h-80 bg-black/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
