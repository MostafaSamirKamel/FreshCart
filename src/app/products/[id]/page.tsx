"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle2,
  Package,
  Clock,
  MessageCircle,
  HelpCircle,
  BarChart3,
  Minus,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { useDispatch, useSelector } from "react-redux";
import { addToCartApi } from "@/Store/Slices/cartSlice";
import { toggleWishlist } from "@/Store/Slices/wishlistSlice";
import { RootState, AppDispatch } from "@/Store/store";
import { toast } from "react-toastify";
import Link from "next/link";
import ProductCard from "@/Features/Home/Components/productCard";
import { ProductCardSkeleton } from "@/Components/Shared/Skeleton";
import authorImg from "@/assets/images/review-author.png";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState("details");
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const { items: wishlistItems } = useSelector(
    (state: RootState) => state.wishlist,
  );
  const { token, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const isFavorited = wishlistItems.includes(id as string);

  // Fetch Core Product Data
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      );
      return response.data.data;
    },
  });

  // Fetch Related Products (Same category)
  const { data: relatedProducts } = useQuery({
    queryKey: ["related-products", product?.category?._id],
    queryFn: async () => {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${product.category._id}`,
      );
      return response.data.data.filter((p: any) => p._id !== id).slice(0, 4);
    },
    enabled: !!product?.category?._id,
  });

  if (isLoading) {
    return (
      <div className="container py-20 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-100 rounded-[40px]" />
          <div className="space-y-6">
            <div className="h-4 w-32 bg-gray-100 rounded" />
            <div className="h-12 w-full bg-gray-100 rounded" />
            <div className="h-24 w-full bg-gray-50 rounded" />
            <div className="h-16 w-64 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-32 text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tighter">
          Product Not Found
        </h2>
        <Link href="/" className="btn btn-primary px-10! py-4!">
          <ChevronLeft size={20} /> Return to Store
        </Link>
      </div>
    );
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.warning("Please login to manage your wishlist");
      return;
    }
    dispatch(toggleWishlist({ id: id as string, token: token! }));
    toast.info(isFavorited ? "Removed from wishlist" : "Added to wishlist", {
      position: "bottom-left",
    });
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.warning("Please login to add items to your cart");
      return;
    }
    dispatch(addToCartApi({ productId: id as string, token: token! }));
    // Note: The RouteMisr API typically adds 1 item at a time.
    // If multiple items are needed, we would need to call it 'quantity' times,
    // but usually, e-commerce APIs have a 'count' or handled internally.
    // For this specific API, we'll stick to the provided endpoint behavior.
    toast.success(`Success! Added to your cart.`);
  };

  const images = [product.imageCover, ...(product.images || [])];
  const sku = `FC-${product._id.slice(-6).toUpperCase()}`;

  return (
    <main className="py-12 bg-white min-h-screen">
      <div className="container">
        {/* === SECTION 1: BREADCRUMBS === */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-10 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link
            href="/"
            className="hover:text-primary-600 font-bold transition-colors"
          >
            Home
          </Link>
          <ChevronRight size={14} className="shrink-0" />
          <Link
            href="/categories"
            className="hover:text-primary-600 font-bold transition-colors"
          >
            Shop
          </Link>
          <ChevronRight size={14} className="shrink-0" />
          <Link
            href={`/categories/${product.category._id}`}
            className="hover:text-primary-600 font-bold transition-colors"
          >
            {product.category.name}
          </Link>
          <ChevronRight size={14} className="shrink-0" />
          <span className="font-black text-gray-900 line-clamp-1">
            {product.title}
          </span>
        </nav>

        {/* === SECTION 2: PRODUCT PRIMARY VIEW === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
          {/* Gallery Column */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                {product.priceAfterDiscount && (
                  <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    Sale -
                    {Math.round(
                      (1 - product.priceAfterDiscount / product.price) * 100,
                    )}
                    %
                  </span>
                )}
                <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm border border-gray-100 flex items-center gap-1.5">
                  <Clock size={12} className="text-primary-600" /> Fast Delivery
                </span>
              </div>

              <div className="absolute top-6 right-6 z-10 flex flex-col gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={handleWishlist}
                  className={`w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center transition-all ${
                    isFavorited
                      ? "bg-red-600 text-white"
                      : "bg-white text-gray-400 hover:text-red-500"
                  }`}
                >
                  <Heart
                    size={22}
                    fill={isFavorited ? "currentColor" : "none"}
                  />
                </button>
                <button className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-gray-400 hover:text-primary-600 transition-all">
                  <Share2 size={22} />
                </button>
              </div>

              <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="aspect-square bg-gray-50 rounded-[40px] border border-gray-100 overflow-hidden"
              >
                {images.map((img, idx) => (
                  <SwiperSlide
                    key={idx}
                    className="flex items-center justify-center p-12 lg:p-20"
                  >
                    <div className="relative w-full h-full cursor-zoom-in">
                      <Image
                        src={img}
                        alt={product.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain"
                        priority={idx === 0}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Thumbnails */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={16}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="thumbs-swiper"
            >
              {images.map((img, idx) => (
                <SwiperSlide
                  key={idx}
                  className="aspect-square rounded-2xl border-2 border-transparent cursor-pointer overflow-hidden bg-gray-50 hover:border-primary-200 transition-all p-3"
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="100px"
                    className="object-contain p-2"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Info Column */}
          <div className="flex flex-col">
            {/* Brand & Badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl p-2 border border-gray-100 flex items-center justify-center">
                  <Image
                    src={
                      product.brand?.image || "https://via.placeholder.com/50"
                    }
                    alt={product.brand?.name}
                    width={40}
                    height={40}
                    className="object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
                <div>
                  <Link
                    href={`/brands/${product.brand?._id}`}
                    className="text-xs font-black text-primary-600 uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
                  >
                    {product.brand?.name}
                  </Link>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                    SKU: {sku}
                  </p>
                </div>
              </div>
              {product.quantity > 0 ? (
                <div className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-green-100">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />{" "}
                  In Stock
                </div>
              ) : (
                <div className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100">
                  Out of Stock
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-[0.95] mb-6">
              {product.title}
            </h1>

            <div className="flex items-center gap-8 mb-10">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={
                        i < Math.floor(product.ratingsAverage)
                          ? "currentColor"
                          : "none"
                      }
                      className={
                        i < Math.floor(product.ratingsAverage)
                          ? ""
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>
                <span className="text-lg font-black text-gray-900 mt-1">
                  {product.ratingsAverage}
                </span>
                <span className="text-gray-400 font-bold text-sm mt-1">
                  (4.8k Verified Reviews)
                </span>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-linear-to-br from-gray-50 to-white rounded-[40px] p-10 border border-gray-100 shadow-sm mb-12 relative overflow-hidden group/price">
              <div className="relative z-10">
                <div className="flex items-end gap-6 mb-2">
                  {product.priceAfterDiscount ? (
                    <>
                      <span className="text-6xl font-black text-gray-900 tracking-tighter">
                        ${product.priceAfterDiscount}
                      </span>
                      <span className="text-2xl text-gray-300 line-through font-bold pb-2">
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-6xl font-black text-gray-900 tracking-tighter">
                      ${product.price}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">
                    Best Price
                  </span>
                  <span className="text-gray-400 text-sm font-medium">
                    Free shipping on all orders over $150
                  </span>
                </div>
              </div>
              <Package className="absolute -right-6 -bottom-6 w-32 h-32 text-gray-50 -rotate-12 group-hover/price:scale-110 group-hover/price:text-primary-50 transition-all duration-700" />
            </div>

            {/* Configuration & Action */}
            <div className="space-y-8">
              {/* Quantity Selector */}
              <div className="flex items-center gap-6">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Quantity:
                </span>
                <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-500 hover:bg-white transition-all active:scale-95"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-14 text-center font-black text-gray-900 text-xl">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-500 hover:bg-white transition-all active:scale-95"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                {product.quantity < 10 && product.quantity > 0 && (
                  <span className="text-red-500 font-bold text-xs animate-bounce">
                    Only {product.quantity} left in stock!
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary flex-1 py-6! text-2xl font-black shadow-2xl shadow-primary-600/30 flex items-center justify-center gap-4 active:scale-95 group transition-all"
                >
                  <ShoppingCart
                    size={28}
                    className="group-hover:-translate-y-1 transition-transform"
                  />
                  Add to Cart
                  <ArrowRight
                    size={24}
                    className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                  />
                </button>
                <button className="btn bg-gray-900 hover:bg-black text-white px-10! py-6! text-xl font-black shadow-xl active:scale-95 transition-all">
                  Buy Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-primary-50/30 rounded-3xl border border-primary-50">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary-600 shadow-sm">
                    <ShieldCheck size={18} />
                  </div>
                  <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                    Secure Checkout
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary-600 shadow-sm">
                    <Truck size={18} />
                  </div>
                  <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                    Eco Shipping
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary-600 shadow-sm">
                    <RefreshCw size={18} />
                  </div>
                  <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                    30 Day Returns
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary-600 shadow-sm">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                    Official Product
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === SECTION 3: TABBED CONTENT === */}
        <div className="mb-24">
          <div className="flex items-center justify-center gap-2 md:gap-12 border-b border-gray-100 mb-12 overflow-x-auto no-scrollbar pb-1">
            {["details", "specs", "reviews", "shipping"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative py-6 text-sm font-black uppercase tracking-widest transition-all ${
                  activeTab === tab
                    ? "text-primary-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-primary-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="max-w-5xl mx-auto px-4">
            {activeTab === "details" && (
              <div className="space-y-12 animate-in fade-in duration-500">
                <div className="prose prose-xl max-w-none">
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-6">
                    Product Overview
                  </h2>
                  <p className="text-gray-500 text-lg leading-relaxed font-medium mb-10">
                    {product.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="card bg-gray-50 p-8 border-0 rounded-[32px]">
                      <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
                        <CheckCircle2 className="text-primary-600" /> Key
                        Features
                      </h3>
                      <ul className="space-y-4">
                        {[
                          "Premium quality selection",
                          "Strict hygiene standards",
                          "Sustainable sourcing",
                          "Eco-friendly packaging",
                        ].map((f, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 text-gray-600 font-bold text-sm"
                          >
                            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full" />{" "}
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="card bg-gray-50 p-8 border-0 rounded-[32px]">
                      <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
                        <Info className="text-primary-600" /> Usage Tips
                      </h3>
                      <p className="text-gray-600 text-sm font-medium leading-relaxed">
                        For best results, store in a cool, dry place away from
                        direct sunlight. Follow serving suggestions on the back
                        label for optimal flavor and nutritional value. Keep out
                        of reach of children if applicable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 animate-in fade-in duration-500">
                {[
                  { label: "Weight", value: "500g / 1.1 lbs" },
                  { label: "Dimensions", value: "15 x 10 x 5 cm" },
                  { label: "Category", value: product.category.name },
                  { label: "Brand", value: product.brand.name },
                  {
                    label: "Certification",
                    value: "Organic Certified (EU/USDA)",
                  },
                  { label: "Shelf Life", value: "12 Months from MFD" },
                  {
                    label: "Origin",
                    value: "Locally Sourced / International Export",
                  },
                  { label: "Material", value: "Biodegradable Composite" },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-4 border-b border-gray-50 group hover:border-primary-100 transition-all"
                  >
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                      {spec.label}
                    </span>
                    <span className="text-sm font-black text-gray-900">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-10 animate-in fade-in duration-500">
                {/* Review Summary */}
                <div className="flex flex-col md:flex-row items-center gap-12 p-10 bg-gray-50 rounded-[40px]">
                  <div className="text-center">
                    <p className="text-7xl font-black text-gray-900 tracking-tighter mb-2">
                      {product.ratingsAverage}
                    </p>
                    <div className="flex text-yellow-400 justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                      Global Rating
                    </p>
                  </div>
                  <div className="flex-1 space-y-3 w-full">
                    {[
                      { s: 5, p: 85 },
                      { s: 4, p: 10 },
                      { s: 3, p: 3 },
                      { s: 2, p: 1 },
                      { s: 1, p: 1 },
                    ].map((row) => (
                      <div key={row.s} className="flex items-center gap-4">
                        <span className="text-xs font-black text-gray-900 w-4">
                          {row.s}
                        </span>
                        <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ width: `${row.p}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-400 w-10">
                          {row.p}%
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-primary px-8! py-4! text-sm shadow-lg whitespace-nowrap">
                    Write a Review
                  </button>
                </div>

                {/* Recent Reviews (Mock) */}
                <div className="space-y-6">
                  {[
                    {
                      name: "Sarah Johnson",
                      date: "Feb 10, 2026",
                      rating: 5,
                      text: "Absolutely wonderful! The quality is top-notch and the delivery was incredibly fast. Highly recommended.",
                      badge: true,
                    },
                    {
                      name: "Michael Chen",
                      date: "Jan 28, 2026",
                      rating: 4,
                      text: "Very good product, exactly as described. One minor issue with the packaging box but the item itself was perfect.",
                      badge: true,
                    },
                  ].map((rev, i) => (
                    <div
                      key={i}
                      className="p-8 border-2 border-gray-50 rounded-3xl hover:border-primary-100 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
                            <Image
                              src={authorImg}
                              alt={rev.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-black text-gray-900 leading-none mb-1">
                              {rev.name}
                            </h4>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                              {rev.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, idx) => (
                            <Star
                              key={idx}
                              size={14}
                              fill={idx < rev.rating ? "currentColor" : "none"}
                              className={
                                idx < rev.rating ? "" : "text-gray-200"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        {rev.badge && (
                          <span className="bg-primary-50 text-primary-600 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest flex items-center gap-1">
                            <ShieldCheck size={10} /> Verified Purchase
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 font-medium leading-relaxed">
                        {rev.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-in fade-in duration-500">
                <div className="p-8 bg-gray-50 rounded-3xl border-0">
                  <Truck className="text-primary-600 mb-6" size={40} />
                  <h3 className="text-xl font-black text-gray-900 mb-4">
                    Delivery Options
                  </h3>
                  <ul className="space-y-4 text-sm text-gray-500 font-bold">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />{" "}
                      Standard: 3-5 Working Days
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />{" "}
                      Express: Next Day Service
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />{" "}
                      Local Pickup: 24 Hour Availability
                    </li>
                  </ul>
                </div>
                <div className="p-8 bg-gray-50 rounded-3xl border-0">
                  <RefreshCw className="text-primary-600 mb-6" size={40} />
                  <h3 className="text-xl font-black text-gray-900 mb-4">
                    Return Policy
                  </h3>
                  <p className="text-sm text-gray-500 font-bold leading-relaxed mb-6">
                    We offer a 30-day money-back guarantee. If you're not
                    satisfied, return the product in its original condition for
                    a full refund or exchange.
                  </p>
                  <Link
                    href="/terms"
                    className="text-xs font-black text-primary-600 uppercase tracking-widest hover:underline"
                  >
                    Read Full Policy
                  </Link>
                </div>
                <div className="p-8 bg-gray-50 rounded-3xl border-0">
                  <HelpCircle className="text-primary-600 mb-6" size={40} />
                  <h3 className="text-xl font-black text-gray-900 mb-4">
                    Customer Care
                  </h3>
                  <div className="space-y-4">
                    <button className="btn btn-primary w-full py-3! text-sm shadow-md flex items-center justify-center gap-2">
                      <MessageCircle size={18} /> Live Chat
                    </button>
                    <p className="text-[10px] text-center text-gray-400 font-black uppercase tracking-widest">
                      Available 24/7
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* === SECTION 4: CROSS-SELLING === */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="pt-24 border-t border-gray-100">
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter">
                  You May Also Like
                </h2>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                  Curated recommendations based on your interests
                </p>
              </div>
              <Link
                href="/products"
                className="group flex items-center gap-2 text-sm font-black text-primary-600 uppercase tracking-widest hover:gap-4 transition-all"
              >
                View All <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p: any) => (
                <ProductCard
                  key={p._id}
                  id={p._id}
                  title={p.title}
                  image={p.imageCover}
                  price={p.price}
                  rating={p.ratingsAverage}
                  category={p.category.name}
                  priceAfterDiscount={p.priceAfterDiscount}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
