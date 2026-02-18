"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  ChevronRight,
  Search,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronLeft,
  SlidersHorizontal,
} from "lucide-react";
import ProductCard from "@/Features/Home/Components/productCard";
import { ProductCardSkeleton } from "@/Components/Shared/Skeleton";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState("");

  // Fetch all products then filter client-side by keyword
  const { data, isLoading } = useQuery({
    queryKey: ["search-products", query, sortOrder],
    queryFn: async () => {
      let url = `https://ecommerce.routemisr.com/api/v1/products?limit=40`;
      if (sortOrder) url += `&sort=${sortOrder}`;
      const resp = await axios.get(url);
      return resp.data;
    },
    enabled: true,
  });

  // Filter products by search query (title match)
  const allProducts = data?.data || [];
  const filteredProducts = query
    ? allProducts.filter((p: any) =>
        p.title.toLowerCase().includes(query.toLowerCase()),
      )
    : allProducts;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E5E5E5] py-[15px]">
        <div className="container px-4">
          <nav className="flex items-center gap-2 text-[14px]">
            <Link
              href="/"
              className="text-[#808080] hover:text-[#00B207] transition-colors"
            >
              Home
            </Link>
            <ChevronRight size={14} className="text-[#808080]" />
            <span className="text-[#1A1A1A] font-medium">Search Results</span>
          </nav>
        </div>
      </div>

      <div className="container px-4 py-[40px]">
        {/* Page Header with Search */}
        <div className="mb-10">
          <h1 className="text-[32px] font-bold text-[#1A1A1A] mb-2 tracking-tight">
            {query ? (
              <>
                Search Results for &quot;
                <span className="text-[#00B207]">{query}</span>&quot;
              </>
            ) : (
              "Search Products"
            )}
          </h1>
          <p className="text-[14px] text-[#666666]">
            {isLoading ? (
              "Searching..."
            ) : (
              <>
                We found{" "}
                <span className="text-[#1A1A1A] font-bold">
                  {filteredProducts.length}
                </span>{" "}
                products for you
              </>
            )}
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-6 max-w-2xl">
            <div className="relative w-full border border-[#E5E5E5] rounded-lg bg-white focus-within:border-[#00B207] focus-within:ring-[3px] focus-within:ring-[#00B207]/10 transition-all h-[50px]">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full h-full pl-5 pr-[55px] text-[15px] text-[#333333] placeholder-[#999999] bg-transparent outline-none rounded-lg"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full w-[50px] flex items-center justify-center text-white bg-[#00B207] hover:bg-[#009606] rounded-r-lg transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* Toolbar */}
        <div className="bg-white border border-[#E5E5E5] rounded-lg p-[15px] px-[20px] mb-5 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-4">
            <span className="text-[14px] text-[#666666]">View:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`w-9 h-9 rounded-[5px] flex items-center justify-center transition-all ${viewMode === "grid" ? "bg-[#00B207] text-white" : "bg-white border border-[#E5E5E5] text-gray-400 hover:bg-gray-50"}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`w-9 h-9 rounded-[5px] flex items-center justify-center transition-all ${viewMode === "list" ? "bg-[#00B207] text-white" : "bg-white border border-[#E5E5E5] text-gray-400 hover:bg-gray-50"}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[14px] text-[#666666]">Sort by:</span>
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none bg-white border border-[#E5E5E5] rounded-[5px] px-[15px] py-[8px] pr-[40px] text-[14px] outline-none cursor-pointer"
              >
                <option value="">Relevance</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="-ratingsAverage">Top Rated</option>
                <option value="-createdAt">Newest</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-[15px] top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white border border-[#E5E5E5] rounded-lg py-20 text-center shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <Search size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No products found
            </h2>
            <p className="text-gray-400 font-medium mb-6">
              {query
                ? `We couldn\u0027t find any products matching "${query}". Try a different search term.`
                : "Enter a keyword to search for products."}
            </p>
            <Link
              href="/products"
              className="inline-block bg-[#00B207] hover:bg-[#009606] text-white px-8 py-3 rounded-md font-bold text-[14px] transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product: any) => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.title}
                image={product.imageCover}
                price={product.price}
                rating={product.ratingsAverage}
                category={product.category?.name || ""}
                priceAfterDiscount={product.priceAfterDiscount}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#F9F9F9] min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#00B207] border-t-transparent rounded-full" />
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
