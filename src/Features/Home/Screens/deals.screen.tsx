"use client";

import React from "react";
import DealsSection from "@/Features/Home/Components/dealsSection";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function DealsScreen() {
  return (
    <main className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-[#F0F0F0] py-4">
        <div className="container px-4">
          <nav className="flex items-center gap-2 text-[14px]">
            <Link
              href="/"
              className="text-[#808080] hover:text-[#00B207] transition-colors"
            >
              Home
            </Link>
            <ChevronRight size={14} className="text-[#808080]" />
            <span className="text-[#00B207] font-medium">Special Offers</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="py-16 bg-white border-b border-gray-50">
        <div className="container px-4">
          <div className="max-w-3xl">
            <h1 className="text-[40px] md:text-[56px] font-black text-[#1A1A1A] mb-6 tracking-tight leading-tight">
              Exclusive <span className="text-[#00B207]">Deals</span> & Coupons
            </h1>
            <p className="text-[#666666] font-medium text-lg leading-relaxed">
              Save big on your favorite fresh produce, organic snacks, and daily
              essentials. Our daily deals are updated every 24 hours to bring
              you the best value.
            </p>
          </div>
        </div>
      </section>

      {/* Deals Section from Home */}
      <div className="-mt-4">
        <DealsSection />
      </div>

      {/* Additional value section could go here */}
      <section className="py-20 container px-4">
        <div className="bg-[#1A1A1A] rounded-[40px] p-8 md:p-16 text-center text-white relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Want even more savings?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and get exclusive coupons and early
            access to mega sales delivered right to your inbox.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-[#00B207] transition-all"
            />
            <button className="px-8 py-4 bg-[#00B207] text-white rounded-xl font-black hover:bg-[#009606] transition-all active:scale-95">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
