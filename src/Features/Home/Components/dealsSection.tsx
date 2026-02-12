"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "./productCard";
import Timer from "./timer";
import { ArrowRight } from "lucide-react";

export default function DealsSection() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["deals"],
    queryFn: async () => {
      // Fetching products sorted by price to simulate "expensive" deals or just high-value products
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products?sort=-price&limit=4",
      );
      return response.data.data;
    },
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-primary-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 rounded-xl bg-white animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) return null;

  return (
    <section className="py-16 bg-primary-50">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Deals of the Day
            </h2>
            <p className="text-gray-600">
              Don't miss out on these limited-time offers. Grab them before
              they're gone!
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Timer />
            <button className="hidden sm:flex items-center gap-2 text-primary-600 font-bold group hover:underline decoration-2 underline-offset-4">
              View All Deals{" "}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.map((product: any) => (
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

        <button className="sm:hidden w-full mt-8 btn btn-outline bg-white">
          View All Deals
        </button>
      </div>
    </section>
  );
}
