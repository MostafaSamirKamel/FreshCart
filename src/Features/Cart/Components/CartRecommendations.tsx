"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/Features/Home/Components/productCard";
import { ROUTES } from "@/Constants/app.constants";

interface CartRecommendationsProps {
  products: any[];
}

export default function CartRecommendations({
  products,
}: CartRecommendationsProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-32 pt-24 border-t border-gray-200">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter">
            You might also like
          </h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
            Handpicked selections to complete your cart
          </p>
        </div>
        <Link
          href={ROUTES.PRODUCTS}
          className="group flex items-center gap-2 text-sm font-black text-primary-600 uppercase tracking-widest hover:gap-4 transition-all"
        >
          View All Collections <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p: any) => (
          <ProductCard
            key={p._id}
            id={p._id}
            title={p.title}
            image={p.imageCover}
            price={p.price}
            rating={p.ratingsAverage}
            category={p.category.name}
            priceAfterDiscount={p.priceAfterDiscount}
          />
        ))}
      </div>
    </div>
  );
}
