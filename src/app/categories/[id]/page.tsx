"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "@/Features/Home/Components/productCard";
import { ProductCardSkeleton } from "@/Components/Shared/Skeleton";
import { ChevronRight, Filter, Layers, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ROUTES } from "@/Constants/app.constants";

export default function CategoryDetailsPage() {
  const { id } = useParams();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null,
  );

  // Fetch Category info
  const { data: category } = useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      );
      return response.data.data;
    },
  });

  // Fetch Subcategories
  const { data: subcategories } = useQuery({
    queryKey: ["category-subcategories", id],
    queryFn: async () => {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/subcategories`,
      );
      return response.data.data.filter((sub: any) => sub.category === id);
    },
  });

  // Fetch Products for this category
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["category-products", id, selectedSubcategory],
    queryFn: async () => {
      let url = `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`;
      if (selectedSubcategory) {
        url += `&subcategory[in]=${selectedSubcategory}`;
      }
      const response = await axios.get(url);
      return response.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="h-10 w-64 bg-gray-100 rounded mb-8 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) return null;

  return (
    <main className="py-12 bg-white">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10 overflow-x-auto no-scrollbar whitespace-nowrap pb-2 md:pb-0">
          <Link
            href={ROUTES.HOME}
            className="hover:text-primary-600 transition-colors"
          >
            Home
          </Link>
          <ChevronRight size={14} className="shrink-0" />
          <Link
            href={ROUTES.CATEGORIES}
            className="hover:text-primary-600 transition-colors"
          >
            Categories
          </Link>
          <ChevronRight size={14} className="shrink-0" />
          <span className="font-black text-gray-900">{category?.name}</span>
        </nav>

        {/* Hero-like Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter">
              {category?.name}
            </h1>
            <p className="text-gray-500 font-bold flex items-center gap-2">
              <LayoutGrid size={18} className="text-primary-600" />
              Found {products?.length || 0} premium products
            </p>
          </div>

          {/* Subcategory Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            <button
              onClick={() => setSelectedSubcategory(null)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-sm font-black transition-all border-2 ${
                !selectedSubcategory
                  ? "bg-primary-600 border-primary-600 text-white shadow-xl shadow-primary-600/20"
                  : "bg-gray-50 border-transparent text-gray-400 hover:bg-white hover:border-gray-200"
              }`}
            >
              All Items
            </button>
            {subcategories?.map((sub: any) => (
              <button
                key={sub._id}
                onClick={() => setSelectedSubcategory(sub._id)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-sm font-black transition-all border-2 ${
                  selectedSubcategory === sub._id
                    ? "bg-primary-600 border-primary-600 text-white shadow-xl shadow-primary-600/20"
                    : "bg-gray-50 border-transparent text-gray-400 hover:bg-white hover:border-gray-200"
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
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

          {products?.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                <Layers size={40} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                No products found
              </h2>
              <p className="text-gray-400 font-bold">
                Try selecting a different subcategory or checkout other
                sections!
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
