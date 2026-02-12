"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "./productCard";

const tabs = ["All", "Vegetables", "Fruits", "Dairy", "Meat"];

export default function PopularProducts() {
  const [activeTab, setActiveTab] = useState("All");

  const { data, isLoading, error } = useQuery({
    queryKey: ["popular-products"],
    queryFn: async () => {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products",
      );
      return response.data.data;
    },
  });

  const filteredProducts = data
    ?.filter((product: any) => {
      if (activeTab === "All") return true;
      return product.category.name
        .toLowerCase()
        .includes(activeTab.toLowerCase());
    })
    .slice(0, 10); // Limit to top 10 popular items

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container">
          <div className="h-10 w-64 bg-gray-100 mb-8 rounded animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-xl bg-gray-50 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) return null;

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Popular Products
            </h2>
            <p className="text-gray-500">
              Pick your daily essentials at the best price.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                  activeTab === tab
                    ? "bg-primary-600 text-white shadow-md shadow-primary-600/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredProducts?.map((product: any) => (
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

        {filteredProducts?.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-400 font-medium">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
