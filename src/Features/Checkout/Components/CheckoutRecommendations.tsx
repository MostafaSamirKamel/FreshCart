"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, Plus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export interface RecommendedProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface CheckoutRecommendationsProps {
  products: RecommendedProduct[];
}

export default function CheckoutRecommendations({
  products,
}: CheckoutRecommendationsProps) {
  return (
    <section className="mt-24">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
          You Might Also Like
        </h2>
        <div className="flex gap-3">
          <button className="reco-prev w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary-600 hover:text-primary-600 transition-all cursor-pointer">
            <ChevronLeft size={24} />
          </button>
          <button className="reco-next w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary-600 hover:text-primary-600 transition-all cursor-pointer">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{ prevEl: ".reco-prev", nextEl: ".reco-next" }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        autoplay={{ delay: 3000 }}
        className="pb-10"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-50 group cursor-pointer relative overflow-hidden">
              <button className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors z-10 scale-0 group-hover:scale-100 duration-300">
                <Heart size={20} />
              </button>
              <div className="relative aspect-square rounded-xl bg-gray-50 mb-4 p-4 group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-contain p-2"
                  unoptimized
                />
              </div>
              <div className="space-y-1 pr-10">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">
                  {product.category}
                </p>
                <h4 className="text-sm font-bold text-gray-900 truncate leading-tight mb-2">
                  {product.name}
                </h4>
                <p className="text-base font-black text-primary-600">
                  ${product.price}
                </p>
              </div>
              <button className="absolute bottom-4 right-4 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary-600/20 translate-y-20 group-hover:translate-y-0 transition-all duration-500 hover:scale-110 active:scale-90">
                <Plus size={20} />
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
