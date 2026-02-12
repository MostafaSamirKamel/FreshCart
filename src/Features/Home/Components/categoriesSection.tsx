"use client";

import { useCategories } from "@/Hooks/useCategories";
import { Category } from "@/Types/category.types";
import CategoryCard from "./categoryCard";
import Link from "next/link";
import { ROUTES } from "@/Constants/app.constants";

export default function CategoriesSection() {
  const { categories, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-full bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) return null;

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Shop by Category</h2>
          <Link
            href={ROUTES.CATEGORIES}
            className="text-primary-600 font-semibold hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories?.map((category: Category) => (
            <CategoryCard
              key={category._id}
              id={category._id}
              name={category.name}
              image={category.image || ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
