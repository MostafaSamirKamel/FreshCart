"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "@/Features/Home/Components/productCard";
import { ProductCardSkeleton } from "@/Components/Shared/Skeleton";
import { ChevronRight, Award, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function BrandDetailsPage() {
  const { id } = useParams();

  // Fetch Brand info
  const { data: brand } = useQuery({
    queryKey: ["brand", id],
    queryFn: async () => {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      );
      return response.data.data;
    },
  });

  // Fetch Products for this brand
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["brand-products", id],
    queryFn: async () => {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`,
      );
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
    <main className="py-12 bg-white min-h-screen">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-12 overflow-x-auto no-scrollbar whitespace-nowrap pb-2 md:pb-0">
          <Link href="/" className="hover:text-primary-600 transition-colors">
            Home
          </Link>
          <ChevronRight size={14} className="shrink-0" />
          <Link
            href="/brands"
            className="hover:text-primary-600 transition-colors"
          >
            Brands
          </Link>
          <ChevronRight size={14} className="shrink-0" />
          <span className="font-black text-gray-900">{brand?.name}</span>
        </nav>

        {/* Brand Header */}
        <div className="card bg-gray-50 rounded-[40px] p-8 md:p-12 border-0 shadow-sm mb-16 relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-40 h-40 bg-white rounded-3xl p-6 shadow-xl flex items-center justify-center border border-gray-100 group-hover:scale-105 transition-transform duration-500">
              <img
                src={brand?.image}
                alt={brand?.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-center md:text-left space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Award className="text-primary-600" size={24} />
                <span className="text-xs font-black text-primary-600 uppercase tracking-widest">
                  Official Brand Partner
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter leading-none">
                {brand?.name} Collection
              </h1>
              <p className="text-gray-500 font-bold flex items-center justify-center md:justify-start gap-2">
                <ShoppingBag size={18} className="text-gray-400" />
                Explore {products?.length || 0} authentic products from{" "}
                {brand?.name}
              </p>
            </div>
          </div>

          {/* Decorative background logo */}
          <div className="absolute -right-10 -bottom-10 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-1000">
            <img src={brand?.image} alt="" className="w-80 h-80 grayscale" />
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              Available Products
              <span className="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full">
                {products?.length || 0}
              </span>
            </h2>
          </div>

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
          </div>

          {products?.length === 0 && (
            <div className="py-20 text-center card bg-gray-50 border-0 rounded-3xl">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300 shadow-sm border border-gray-100">
                <ShoppingBag size={40} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                No products available
              </h2>
              <p className="text-gray-400 font-bold">
                We couldn't find any products for this brand at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
