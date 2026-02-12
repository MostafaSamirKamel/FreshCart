"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Search,
  LayoutGrid,
  List,
  ChevronDown,
  Heart,
  RefreshCcw,
  Eye,
  Plus,
  Star,
  ChevronLeft,
} from "lucide-react";

// --- Mock Data ---

const categories = [
  { id: "veg", name: "Vegetables", count: 78 },
  { id: "fru", name: "Fruits", count: 42 },
  { id: "her", name: "Herbs & Greens", count: 26 },
  { id: "org", name: "Organic Products", count: 64, checked: true },
  { id: "mix", name: "Mixed Boxes", count: 12 },
];

const brands = [
  { name: "Organic Farms", count: 34 },
  { name: "Nature's Basket", count: 28 },
  { name: "Fresh Harvest", count: 22 },
  { name: "Green Valley", count: 19 },
  { name: "Earth Grown", count: 15 },
];

const products = [
  {
    id: 1,
    name: "Organic Fresh Broccoli (1pc)",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?q=80&w=2070&auto=format&fit=crop",
    price: 1.99,
    rating: 4.5,
    reviews: 89,
    isOrganic: true,
  },
  {
    id: 2,
    name: "Organic Baby Spinach (250g)",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=2080&auto=format&fit=crop",
    price: 2.49,
    rating: 4.5,
    reviews: 82,
    isOrganic: true,
  },
  {
    id: 3,
    name: "Organic Bell Peppers Mix (3pcs)",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1566385101042-1a000c1267c4?q=80&w=1975&auto=format&fit=crop",
    price: 4.99,
    rating: 4.1,
    reviews: 71,
    isOrganic: true,
  },
  {
    id: 4,
    name: "Organic Carrots (500g)",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1974&auto=format&fit=crop",
    price: 2.29,
    rating: 4.9,
    reviews: 93,
    isOrganic: true,
  },
  {
    id: 5,
    name: "Organic Cherry Tomatoes (250g)",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=2070&auto=format&fit=crop",
    price: 3.49,
    rating: 4.3,
    reviews: 58,
    isOrganic: true,
  },
  {
    id: 6,
    name: "Organic Cucumber (2pcs)",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1449333254703-93fb5ac5b5bd?q=80&w=2070&auto=format&fit=crop",
    price: 2.79,
    rating: 3.7,
    reviews: 31,
    isOrganic: true,
  },
];

const recentlyViewed = [
  {
    name: "Artisan Sourdough Bread",
    category: "Bakery",
    price: 3.99,
    rating: 5.0,
    reviews: 43,
    image:
      "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Organic Whole Milk (1 gallon)",
    category: "Dairy",
    price: 4.29,
    rating: 4.5,
    reviews: 87,
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Fresh Atlantic Salmon (1lb)",
    category: "Seafood",
    price: 9.99,
    rating: 4.2,
    reviews: 38,
    image:
      "https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=1928&auto=format&fit=crop",
  },
  {
    name: "Organic Brown Eggs (12pcs)",
    category: "Dairy & Eggs",
    price: 3.99,
    rating: 4.2,
    reviews: 78,
    image:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=2070&auto=format&fit=crop",
  },
];

// --- Components ---

const FilterSection = ({
  title,
  children,
  showBorder = true,
  marginTop = false,
}: any) => (
  <div
    className={`${marginTop ? "mt-[30px]" : ""} ${showBorder ? "pb-[30px] border-b border-[#F0F0F0]" : ""}`}
  >
    <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-[15px]">{title}</h3>
    {children}
  </div>
);

const CheckboxItem = ({ label, count, checked = false }: any) => (
  <label className="flex items-center gap-3 py-2 cursor-pointer group hover:bg-gray-50 rounded-md transition-colors px-1 -mx-1">
    <div
      className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${checked ? "bg-[#00B207] border-[#00B207]" : "border-[#E5E5E5] group-hover:border-[#00B207]"}`}
    >
      {checked && (
        <div className="w-2 h-3 border-r-2 border-b-2 border-white rotate-45 mb-0.5" />
      )}
    </div>
    <span className="text-[14px] text-[#4D4D4D] grow">{label}</span>
    <span className="text-[14px] text-[#999999]">({count})</span>
  </label>
);

const SearchProductCard = ({ product }: { product: any }) => (
  <div className="bg-white border border-[#E5E5E5] rounded-lg p-[15px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 relative group">
    {product.isOrganic && (
      <div className="absolute top-2 left-2 z-10 bg-[#00B207] text-white text-[11px] font-bold px-2.5 py-1 rounded-[4px] shadow-sm">
        Organic
      </div>
    )}

    <div className="absolute top-2 right-2 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
      <button className="w-8 h-8 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-all shadow-sm">
        <Heart size={16} />
      </button>
      <button className="w-8 h-8 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center text-gray-400 hover:text-[#00B207] hover:border-[#00B207] transition-all shadow-sm">
        <RefreshCcw size={16} />
      </button>
      <button className="w-8 h-8 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center text-gray-400 hover:text-primary-600 hover:border-primary-600 transition-all shadow-sm">
        <Eye size={16} />
      </button>
    </div>

    <div className="relative aspect-square rounded-[6px] mb-3 overflow-hidden">
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700"
      />
    </div>

    <div className="space-y-1.5">
      <p className="text-[12px] text-[#999999] uppercase tracking-wider">
        {product.category}
      </p>
      <h4 className="text-[15px] font-bold text-[#1A1A1A] line-clamp-2 min-h-[42px] leading-snug">
        {product.name}
      </h4>

      <div className="flex items-center gap-1.5 py-1">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < Math.floor(product.rating) ? "#FFA500" : "none"}
              className={
                i < Math.floor(product.rating)
                  ? "text-[#FFA500]"
                  : "text-[#D1D5DB]"
              }
            />
          ))}
        </div>
        <span className="text-[13px] text-[#666666] font-medium">
          {product.rating} ({product.reviews})
        </span>
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-[18px] font-bold text-[#1A1A1A]">
          ${product.price.toFixed(2)}
        </span>
        <button className="w-9 h-9 bg-[#00B207] hover:bg-[#009606] text-white rounded-full flex items-center justify-center shadow-lg shadow-green-600/20 active:scale-90 transition-all">
          <Plus size={20} />
        </button>
      </div>
    </div>
  </div>
);

// --- Main Page ---

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-[32px] font-bold text-[#1A1A1A] mb-2 tracking-tight">
            Search Results for "organic vegetables"
          </h1>
          <p className="text-[14px] text-[#666666]">
            We found <span className="text-[#1A1A1A] font-bold">124</span>{" "}
            products for you
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-[280px] shrink-0">
            <div className="bg-white rounded-lg p-[25px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E5E5E5] sticky top-[100px]">
              <FilterSection title="Categories">
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <CheckboxItem
                      key={cat.id}
                      label={cat.name}
                      count={cat.count}
                      checked={cat.checked}
                    />
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Price Range" marginTop>
                <div className="pt-4">
                  {/* Mock Slider */}
                  <div className="relative h-1 w-full bg-[#E5E5E5] rounded-full mb-6">
                    <div className="absolute h-full left-[10%] right-[30%] bg-[#00B207] rounded-full" />
                    <div className="absolute w-[18px] h-[18px] bg-white border-2 border-[#00B207] rounded-full top-1/2 -translate-y-1/2 left-[10%] -translate-x-1/2 cursor-pointer shadow-sm" />
                    <div className="absolute w-[18px] h-[18px] bg-white border-2 border-[#00B207] rounded-full top-1/2 -translate-y-1/2 right-[30%] translate-x-1/2 cursor-pointer shadow-sm" />
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative grow">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999] text-[14px]">
                        $
                      </span>
                      <input
                        type="text"
                        defaultValue="5"
                        className="w-full pl-7 pr-3 py-2 border border-[#E5E5E5] rounded-[5px] text-[14px] outline-none"
                      />
                    </div>
                    <span className="text-[13px] text-[#999999]">to</span>
                    <div className="relative grow">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999] text-[14px]">
                        $
                      </span>
                      <input
                        type="text"
                        defaultValue="75"
                        className="w-full pl-7 pr-3 py-2 border border-[#E5E5E5] rounded-[5px] text-[14px] outline-none"
                      />
                    </div>
                  </div>
                </div>
              </FilterSection>

              <FilterSection title="Brands" marginTop>
                <div className="space-y-1">
                  {brands.map((brand, i) => (
                    <CheckboxItem
                      key={i}
                      label={brand.name}
                      count={brand.count}
                    />
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Ratings" marginTop>
                <div className="space-y-1">
                  <CheckboxItem
                    label={
                      <div className="flex gap-0.5 text-[#FFA500]">
                        <Star size={14} fill="currentColor" />{" "}
                        <Star size={14} fill="currentColor" />{" "}
                        <Star size={14} fill="currentColor" />{" "}
                        <Star size={14} fill="currentColor" />{" "}
                        <Star size={14} fill="currentColor" />
                      </div>
                    }
                    count={42}
                  />
                  <CheckboxItem
                    label={
                      <div className="flex gap-0.5 text-[#FFA500]">
                        <Star size={14} fill="currentColor" />{" "}
                        <Star size={14} fill="currentColor" />{" "}
                        <Star size={14} fill="currentColor" />{" "}
                        <Star size={14} fill="currentColor" />{" "}
                        <Star size={14} className="text-[#D1D5DB]" />
                      </div>
                    }
                    count={65}
                  />
                  <CheckboxItem
                    label={
                      <div className="flex gap-0.5 text-[#FFA500]">
                        <Star size={14} fill="currentColor" />{" "}
                        <Star size={14} fill="currentColor" />{" "}
                        <Star size={14} fill="currentColor" />{" "}
                        <Star size={14} className="text-[#D1D5DB]" />{" "}
                        <Star size={14} className="text-[#D1D5DB]" />
                      </div>
                    }
                    count={32}
                  />
                </div>
              </FilterSection>

              <FilterSection title="Availability" marginTop>
                <div className="space-y-1">
                  <CheckboxItem label="In Stock" count={112} />
                  <CheckboxItem label="Out of Stock" count={12} />
                </div>
              </FilterSection>

              <div className="mt-[30px] flex gap-[10px]">
                <button className="grow-2 bg-[#00B207] hover:bg-[#009606] text-white py-3 rounded-[5px] text-[14px] font-semibold transition-colors">
                  Apply Filters
                </button>
                <button className="grow bg-white border border-[#E5E5E5] hover:bg-gray-50 text-[#4D4D4D] py-3 rounded-[5px] text-[14px] font-medium transition-colors">
                  Reset
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="grow min-w-0">
            {/* Top Toolbar */}
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
                  <select className="appearance-none bg-white border border-[#E5E5E5] rounded-[5px] px-[15px] py-[8px] pr-[40px] text-[14px] outline-none cursor-pointer">
                    <option>Relevance</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-[15px] top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((p) => (
                <SearchProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center items-center gap-2">
              <button className="w-9 h-9 border border-[#E5E5E5] rounded-[5px] flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button className="w-9 h-9 bg-[#00B207] text-white rounded-[5px] font-semibold text-[14px] flex items-center justify-center">
                1
              </button>
              {[2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className="w-9 h-9 bg-white border border-[#E5E5E5] text-[#333333] rounded-[5px] font-medium text-[14px] flex items-center justify-center hover:bg-[#F0F9F4] hover:border-[#00B207] hover:text-[#00B207] transition-all"
                >
                  {n}
                </button>
              ))}
              <button className="w-9 h-9 border border-[#E5E5E5] rounded-[5px] flex items-center justify-center text-[#1A1A1A] hover:bg-gray-50 transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </main>
        </div>

        {/* Recently Viewed Section */}
        <section className="mt-[60px] pt-10 border-t border-[#E5E5E5]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[24px] font-bold text-[#1A1A1A]">
              Recently Viewed
            </h2>
            <Link
              href="/products"
              className="text-[14px] font-semibold text-[#00B207] hover:underline"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recentlyViewed.map((p, i) => (
              <SearchProductCard
                key={i}
                product={{ ...p, id: `rv-${i}`, isOrganic: i === 1 }}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
