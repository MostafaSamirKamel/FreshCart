"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Search,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  LayoutGrid,
  Mountain,
} from "lucide-react";

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export default function BrandsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("A-Z");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: brandsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["brands-all"],
    queryFn: async () => {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands",
      );
      return response.data;
    },
  });

  const brands = brandsData?.data || [];

  const filteredBrands = useMemo(() => {
    let result = [...brands].filter((b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (sortBy === "A-Z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Z-A") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [brands, searchTerm, sortBy]);

  // Featured brands are just the first 3 for design purposes
  const featuredBrands = brands.slice(0, 3);

  if (error)
    return (
      <div className="container py-20 text-center">
        <p className="text-red-500 font-bold text-lg">
          Failed to load brands. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-[#00B207] text-white px-8 py-2 rounded-lg font-bold"
        >
          Retry
        </button>
      </div>
    );

  return (
    <main className="bg-white min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E5E5E5] py-[15px]">
        <div className="container px-4">
          <nav className="flex items-center gap-2 text-[14px]">
            <Link href="/" className="text-[#808080] hover:text-[#00B207]">
              Home
            </Link>
            <ChevronRight size={14} className="text-[#808080]" />
            <span className="text-[#00B207] font-medium">All Brands</span>
          </nav>
        </div>
      </div>

      {/* 1. Page Header Section */}
      <section className="py-20 border-b border-gray-50">
        <div className="container px-4 text-center max-w-3xl">
          <h1 className="text-[40px] md:text-[56px] font-black text-[#1A1A1A] mb-6 tracking-tighter leading-tight">
            Our Partner Brands
          </h1>
          <p className="text-[#666666] font-medium text-lg leading-relaxed">
            Discover quality products from our trusted brand partners. We've
            partnered with leading brands to bring you the best selection of
            fresh and organic products.
          </p>
        </div>
      </section>

      {/* 2. Featured Brands Section */}
      {!isLoading && featuredBrands.length > 0 && (
        <section className="py-20 container px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-[#1A1A1A] tracking-tight">
              Featured Brands
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBrands.map((brand: Brand) => (
              <div key={brand._id} className="flex flex-col group">
                <div className="relative aspect-[16/9] rounded-[24px] overflow-hidden bg-gray-50 border border-gray-100 group-hover:shadow-xl transition-all duration-500">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-black text-[#1A1A1A] uppercase tracking-widest shadow-sm">
                      Featured Partner
                    </span>
                  </div>
                </div>

                <div className="pt-6 px-2">
                  <h3 className="text-2xl font-black text-[#1A1A1A] mb-2">
                    {brand.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#999999] uppercase tracking-widest">
                      Official Partner
                    </span>
                    <Link
                      href={`/brands/${brand._id}`}
                      className="flex items-center gap-1.5 text-[#00B207] font-black text-sm hover:gap-3 transition-all"
                    >
                      View All Products <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Search and Sort Bar */}
      <section className="bg-[#F8F8F8] py-8 mb-16 border-y border-[#EEEEEE]">
        <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative w-full md:w-[450px] group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999] group-focus-within:text-[#00B207] transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by brand name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-white border border-[#E5E5E5] rounded-xl text-[15px] font-bold focus:ring-4 focus:ring-[#00B207]/10 focus:border-[#00B207] outline-none transition-all placeholder:text-[#999999] placeholder:font-medium"
            />
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="text-sm font-black text-[#999999] uppercase tracking-widest">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#E5E5E5] h-14 rounded-xl px-6 text-[15px] font-black text-[#1A1A1A] outline-none focus:border-[#00B207] transition-all cursor-pointer shadow-sm"
            >
              <option value="A-Z">Alphabetical: A-Z</option>
              <option value="Z-A">Alphabetical: Z-A</option>
            </select>
          </div>
        </div>
      </section>

      {/* 4. Brand Grid Section */}
      <section className="container px-4">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-[#E5E5E5] rounded-[30px] p-6 h-[250px] animate-pulse"
              >
                <div className="w-full aspect-square bg-gray-100 rounded-2xl mb-4" />
                <div className="h-4 w-2/3 bg-gray-100 rounded ml-4" />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
              {filteredBrands.map((brand: Brand) => (
                <Link
                  key={brand._id}
                  href={`/brands/${brand._id}`}
                  className="bg-white border border-[#E5E5E5] rounded-[30px] p-6 pb-8 hover:shadow-2xl hover:shadow-[#00B207]/5 hover:border-[#00B207]/20 transition-all duration-500 group text-center"
                >
                  <div className="relative w-full aspect-square bg-[#FAFAFA] rounded-[24px] flex items-center justify-center mb-6 px-8 group-hover:scale-95 transition-transform duration-500 overflow-hidden">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      className="object-contain p-6 mix-blend-multiply"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-[17px] font-black text-[#1A1A1A] group-hover:text-[#00B207] transition-colors line-clamp-1">
                      {brand.name}
                    </h3>
                    <p className="text-[#999999] font-bold text-xs uppercase tracking-widest">
                      Partner
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {filteredBrands.length === 0 && (
              <div className="py-20 text-center">
                <Search size={48} className="mx-auto text-gray-200 mb-6" />
                <h3 className="text-xl font-bold text-[#1A1A1A]">
                  No brands match your search
                </h3>
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-[#00B207] font-bold mt-2"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        )}

        {/* 5. Pagination - Simplified for API results */}
        {!isLoading && filteredBrands.length > 0 && (
          <div className="mt-20 flex items-center justify-center gap-2">
            <button className="w-11 h-11 rounded-xl border border-[#E5E5E5] flex items-center justify-center text-[#999999] hover:bg-[#00B207] hover:text-white transition-all">
              <ChevronLeft size={20} />
            </button>
            <button className="w-11 h-11 rounded-xl bg-[#00B207] text-white font-black text-sm shadow-lg shadow-[#00B207]/20">
              1
            </button>
            <button className="w-11 h-11 rounded-xl border border-[#E5E5E5] text-[#999999] hover:bg-gray-50 flex items-center justify-center">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </section>

      {/* 6. Partnership CTA Section */}
      <section className="container px-4 mt-24">
        <div className="bg-[#EDF7EE] rounded-[40px] p-8 md:p-16 lg:p-20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center relative z-10">
            <div className="space-y-8">
              <div className="space-y-6">
                <span className="bg-[#00B207] text-white px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-[2px]">
                  Grow With Us
                </span>
                <h2 className="text-[32px] md:text-[48px] font-black text-[#1A1A1A] tracking-tighter leading-tight">
                  Want to become a<br />
                  brand partner?
                </h2>
                <p className="text-[#666666] font-medium text-lg leading-relaxed max-w-xl">
                  Join our curated network of premium organic and fresh food
                  brands. Reach a wider audience and grow your business with
                  FreshCart.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                {[
                  "Over 1M active customers",
                  "Dedicated account manager",
                  "Premium marketing tools",
                  "Global logistics support",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-[#00B207] shrink-0"
                    />
                    <span className="text-sm font-bold text-[#1A1A1A]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <button className="bg-[#1A1A1A] text-white px-10 py-4 rounded-xl text-lg font-black hover:bg-[#333333] transition-all shadow-xl shadow-black/10">
                Apply to Become a Partner
              </button>
            </div>

            <div className="relative aspect-square lg:aspect-auto lg:h-[500px] rounded-[30px] overflow-hidden shadow-2xl rotate-3">
              <Image
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2044&auto=format&fit=crop"
                alt="Brand Partnership"
                fill
                className="object-cover"
              />
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#00B207]/5 rounded-l-full blur-3xl pointer-events-none" />
        </div>
      </section>
    </main>
  );
}
