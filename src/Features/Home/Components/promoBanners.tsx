import React from "react";
import Image from "next/image";
import Link from "next/link";

const banners = [
  {
    id: 1,
    title: "Fruits & Vegetables",
    subtitle: "Get Up to 30% Off",
    image:
      "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=1470&auto=format&fit=crop",
    link: "/products?category=fruits",
    color: "bg-yellow-50",
  },
  {
    id: 2,
    title: "Fresh Baked Buns",
    subtitle: "Get Up to 25% Off",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1472&auto=format&fit=crop",
    link: "/products?category=bakery",
    color: "bg-blue-50",
  },
];

export default function PromoBanners() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`relative overflow-hidden rounded-2xl ${banner.color} h-[240px] group`}
            >
              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-center max-w-[60%]">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                  {banner.title}
                </h3>
                <p className="text-gray-600 mb-6 font-medium">
                  {banner.subtitle}
                </p>
                <Link
                  href={banner.link}
                  className="btn btn-primary w-fit px-4! py-2! text-sm"
                >
                  Shop Now
                </Link>
              </div>

              {/* Image */}
              <div className="absolute top-0 right-0 w-1/2 h-full">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>

              {/* Decorative Gradient Overlay for text readability on small screens */}
              <div className="absolute inset-0 bg-linear-to-r from-inherit via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
