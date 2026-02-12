"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Link from "next/link";
import Image from "next/image";
import slider1 from "@/assets/images/home-slider-1.png";

const slides = [
  {
    id: 1,
    title: "Fresh & Healthy Organic Food",
    subtitle: "Get up to 30% off on your first order",
    image: slider1,
    cta: "Shop Now",
    link: "/products",
  },
  {
    id: 2,
    title: "Best Quality Groceries",
    subtitle: "Fresh from the farm to your doorstep",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1474&auto=format&fit=crop",
    cta: "View Deals",
    link: "/deals",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative w-full">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect={"fade"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active !bg-primary-600",
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="h-[400px] md:h-[500px] lg:h-[600px] w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center justify-start overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 -z-10">
                {typeof slide.image === "string" ? (
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={slide.id === 1}
                  />
                )}
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 -z-5" />

              {/* Content */}
              <div className="container relative z-10 text-white max-w-2xl">
                <span className="inline-block px-3 py-1 bg-primary-600 rounded text-sm font-semibold mb-4 animate-fade-in">
                  Exclusive Offer
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-100">
                  {slide.subtitle}
                </p>
                <div className="flex gap-4">
                  <Link href={slide.link} className="btn btn-primary">
                    {slide.cta}
                  </Link>
                  <Link
                    href="/categories"
                    className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-800"
                  >
                    Browse Categories
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
