"use client";

import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICONS } from "@/Constants/icons.constants";
import { ChevronRight, ArrowRight, Construction } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="bg-white min-h-[70vh] flex flex-col">
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
            <span className="text-[#00B207] font-medium">{title}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto">
        <div className="w-24 h-24 bg-[#EDF7EE] rounded-full flex items-center justify-center mb-8 animate-bounce">
          <Construction size={40} className="text-[#00B207]" />
        </div>

        <h1 className="text-[36px] md:text-[48px] font-black text-[#1A1A1A] mb-4 tracking-tight">
          {title}
        </h1>

        <p className="text-[#666666] text-lg mb-10 leading-relaxed font-medium">
          {description ||
            "We're currently working hard to bring you the best content. This page will be available soon with exciting features and products!"}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="px-10 py-4 bg-[#00B207] text-white rounded-xl font-black shadow-lg shadow-[#00B207]/20 hover:bg-[#009606] transition-all active:scale-95 flex items-center justify-center gap-2 group"
          >
            Back to Home
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="/products"
            className="px-10 py-4 border-2 border-[#E5E5E5] text-[#1A1A1A] rounded-xl font-black hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
