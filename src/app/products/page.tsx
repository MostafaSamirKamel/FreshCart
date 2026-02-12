"use client";

import React, { Suspense, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import apiClient from "@/config/api.config";
import { ENDPOINTS } from "@/Constants/api.constants";
import ProductFilters from "@/Features/Products/Components/ProductFilters";
import ProductGrid from "@/Features/Products/Components/ProductGrid";
import ProductPagination from "@/Features/Products/Components/ProductPagination";
import { ProductCardSkeleton } from "@/Components/Shared/Skeleton";
import { useCategories } from "@/Hooks/useCategories";

function ProductsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("keyword") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sort") || "-createdAt",
  );

  // --- Data Fetching ---

  const { categories, isLoading: isCategoriesLoading } = useCategories();

  const { data: productsData, isLoading } = useQuery({
    queryKey: [
      "products-search",
      currentPage,
      searchQuery,
      selectedCategory,
      sortOrder,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", String(currentPage));
      params.set("limit", "12");
      params.set("sort", sortOrder);
      if (searchQuery) params.set("keyword", searchQuery);
      if (selectedCategory) params.set("category[in]", selectedCategory);

      const response = await apiClient.get(
        `${ENDPOINTS.PRODUCTS.LIST}?${params.toString()}`,
      );
      return response.data;
    },
    placeholderData: (previousData) => previousData,
  });

  // --- URL Sync Helpers ---

  const updateParams = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, String(value));
      else params.delete(key);
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ keyword: searchQuery, page: 1 });
  };

  const handleCategoryChange = (catId: string) => {
    const newVal = selectedCategory === catId ? "" : catId;
    setSelectedCategory(newVal);
    updateParams({ category: newVal, page: 1 });
  };

  const handleSortChange = (sort: string) => {
    setSortOrder(sort);
    updateParams({ sort, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateParams({ page });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    router.push(pathname);
  };

  // --- Render ---

  return (
    <div className="container">
      <div className="flex flex-col lg:flex-row gap-8">
        <ProductFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearch}
          categories={categories}
          isLoading={isCategoriesLoading}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="grow space-y-8">
          <ProductGrid
            products={productsData?.data ?? []}
            isLoading={isLoading}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            onClearFilters={handleClearFilters}
          />

          <ProductPagination
            currentPage={currentPage}
            totalPages={productsData?.metadata?.numberOfPages ?? 1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

function ProductsPageFallback() {
  return (
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="py-12 bg-gray-50 min-h-screen">
      <Suspense fallback={<ProductsPageFallback />}>
        <ProductsContent />
      </Suspense>
    </main>
  );
}
