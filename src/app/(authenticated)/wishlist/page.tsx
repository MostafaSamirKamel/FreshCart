"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/Store/store";
import {
  ChevronRight,
  Trash2,
  ShoppingCart,
  Star,
  ChevronLeft,
  Facebook,
  Twitter,
  Link as LinkIcon,
  Plus,
  Heart,
  Globe,
  Lock as LockIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { addToCartApi } from "@/Store/Slices/cartSlice";
import { toggleWishlist } from "@/Store/Slices/wishlistSlice";
import { toast } from "react-toastify";

// --- Sub-components ---

const WishlistItemCard = ({
  product,
  token,
}: {
  product: any;
  token: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(addToCartApi({ productId: product._id, token }));
    toast.success(`${product.title.slice(0, 15)}... added to cart!`);
  };

  const handleRemove = () => {
    dispatch(toggleWishlist({ id: product._id, token }));
    toast.info("Removed from wishlist");
  };

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-lg p-5 mb-[15px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex items-center gap-5 hover:shadow-md transition-shadow">
      <div className="relative w-[100px] h-[100px] rounded-lg border border-[#F0F0F0] overflow-hidden shrink-0">
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          sizes="100px"
          className="object-contain p-2"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[12px] text-[#999999] uppercase tracking-wider mb-1.5">
          {product.category.name}
        </p>
        <h3 className="text-[16px] font-bold text-[#1A1A1A] line-clamp-1 mb-2 leading-tight">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 mb-2.5">
          <div className="flex text-[#FFA500]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={
                  i < Math.floor(product.ratingsAverage)
                    ? "currentColor"
                    : "none"
                }
                className={
                  i < Math.floor(product.ratingsAverage) ? "" : "text-[#D1D5DB]"
                }
              />
            ))}
          </div>
          <span className="text-[13px] text-[#666666]">
            {product.ratingsAverage} ({product.ratingsQuantity || 0})
          </span>
        </div>

        <p className="text-[20px] font-bold text-[#00B207]">
          ${product.price.toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col items-center gap-2.5 shrink-0">
        <button
          onClick={handleAddToCart}
          className="bg-[#00B207] hover:bg-[#009606] text-white px-6 py-2.5 rounded-md text-[14px] font-semibold transition-colors"
        >
          Add to Cart
        </button>
        <button
          onClick={handleRemove}
          className="bg-[#F5F5F5] hover:bg-red-50 hover:text-[#DC2626] text-[#999999] p-2 rounded transition-all"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

const SidebarCard = ({ title, children, className = "" }: any) => (
  <div
    className={`bg-white border border-[#E5E5E5] rounded-lg p-[25px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] ${className}`}
  >
    <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-5">{title}</h3>
    {children}
  </div>
);

// --- Main Page ---

export default function WishlistPage() {
  const { token, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [privacy, setPrivacy] = useState("private");

  const { data: wishlist, isLoading } = useQuery({
    queryKey: ["wishlist-full"],
    queryFn: async () => {
      const resp = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: { token } },
      );
      return resp.data;
    },
    enabled: !!token,
  });

  if (!isAuthenticated)
    return (
      <div className="text-center py-20 bg-white border border-[#E5E5E5] rounded-lg mx-auto max-w-2xl mt-12">
        <Heart size={60} className="mx-auto text-gray-200 mb-6" />
        <h2 className="text-2xl font-bold mb-4">You need to sign in</h2>
        <Link
          href="/auth/login"
          className="bg-[#00B207] text-white px-10 py-3 rounded-md font-bold"
        >
          Sign In
        </Link>
      </div>
    );

  if (isLoading)
    return (
      <div className="container py-12 animate-pulse space-y-6">
        <div className="h-8 w-48 bg-gray-100 rounded" />
        <div className="flex gap-8">
          <div className="flex-1 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-lg" />
            ))}
          </div>
          <div className="w-[350px] space-y-4">
            <div className="h-64 bg-gray-100 rounded-lg" />
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E5E5E5] py-[15px]">
        <div className="container px-4">
          <nav className="flex items-center gap-2 text-[14px]">
            <Link href="/" className="text-[#808080] hover:text-[#00B207]">
              Home
            </Link>
            <ChevronRight size={14} className="text-[#808080]" />
            <span className="text-[#00B207] font-medium">Wishlist</span>
          </nav>
        </div>
      </div>

      <div className="container px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-[30px]">
          {/* Main Content */}
          <div className="lg:w-[65%]">
            <div className="bg-white border border-[#E5E5E5] rounded-lg p-[25px_30px] mb-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex items-center justify-between gap-4">
              <div>
                <h1 className="text-[28px] font-bold text-[#1A1A1A] mb-2 tracking-tight">
                  My Wishlist
                </h1>
                <p className="text-[14px] text-[#666666]">
                  {wishlist?.data?.length || 0} items in your wishlist
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 border border-[#E5E5E5] text-[#4D4D4D] px-5 py-2.5 rounded-md text-[14px] font-medium hover:bg-gray-50">
                  <Trash2 size={16} /> Clear All
                </button>
                <button
                  onClick={() =>
                    wishlist?.data?.forEach((item: any) =>
                      dispatch(
                        addToCartApi({ productId: item._id, token: token! }),
                      ),
                    )
                  }
                  className="flex items-center gap-2 bg-[#00B207] text-white px-5 py-2.5 rounded-md text-[14px] font-bold hover:bg-[#009606]"
                >
                  <ShoppingCart size={16} /> Add All to Cart
                </button>
              </div>
            </div>

            {wishlist?.data?.length === 0 ? (
              <div className="bg-white p-20 text-center rounded-lg border border-[#E5E5E5]">
                <Heart size={48} className="mx-auto text-gray-200 mb-6" />
                <h2 className="text-xl font-bold mb-4">
                  Your wishlist is empty
                </h2>
                <Link href="/" className="text-[#00B207] font-bold">
                  Start Shopping &rarr;
                </Link>
              </div>
            ) : (
              <div>
                {wishlist.data.map((item: any) => (
                  <WishlistItemCard
                    key={item._id}
                    product={item}
                    token={token!}
                  />
                ))}

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-10">
                  <button className="w-9 h-9 border border-[#E5E5E5] rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-50">
                    <ChevronLeft size={18} />
                  </button>
                  <button className="w-9 h-9 bg-[#00B207] text-white rounded-md font-bold text-[14px]">
                    1
                  </button>
                  <button className="w-9 h-9 border border-[#E5E5E5] text-[#1A1A1A] rounded-md font-medium text-[14px] hover:bg-gray-50">
                    2
                  </button>
                  <button className="w-9 h-9 border border-[#E5E5E5] rounded-md flex items-center justify-center text-[#1A1A1A] hover:bg-gray-50">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-[35%] space-y-[25px]">
            <SidebarCard title="Create New Wishlist">
              <div className="space-y-5">
                <div>
                  <label className="block text-[14px] font-medium text-[#333333] mb-2">
                    Wishlist Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Holiday Shopping"
                    className="w-full h-11 px-4 border border-[#E5E5E5] rounded-md outline-none focus:border-[#00B207] text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#333333] mb-3">
                    Privacy
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${privacy === "public" ? "border-[#00B207]" : "border-[#E5E5E5]"}`}
                      >
                        {privacy === "public" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#00B207]" />
                        )}
                      </div>
                      <input
                        type="radio"
                        value="public"
                        checked={privacy === "public"}
                        onChange={(e) => setPrivacy(e.target.value)}
                        className="hidden"
                      />
                      <span
                        className={`text-[14px] ${privacy === "public" ? "text-dark font-medium" : "text-[#666666]"}`}
                      >
                        Public
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${privacy === "private" ? "border-[#00B207]" : "border-[#E5E5E5]"}`}
                      >
                        {privacy === "private" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#00B207]" />
                        )}
                      </div>
                      <input
                        type="radio"
                        value="private"
                        checked={privacy === "private"}
                        onChange={(e) => setPrivacy(e.target.value)}
                        className="hidden"
                      />
                      <span
                        className={`text-[14px] ${privacy === "private" ? "text-dark font-medium" : "text-[#666666]"}`}
                      >
                        Private
                      </span>
                    </label>
                  </div>
                </div>
                <button className="w-full h-11 bg-[#00B207] text-white rounded-md font-bold text-[14px] hover:bg-[#009606] transition-colors">
                  Create Wishlist
                </button>
              </div>
            </SidebarCard>

            <SidebarCard title="My Wishlists">
              <div className="divide-y divide-[#F0F0F0] -mb-2">
                {[
                  { name: "Default Wishlist", count: 12 },
                  { name: "Birthday Ideas", count: 8 },
                  { name: "Weekly Groceries", count: 15 },
                ].map((wl, i) => (
                  <div
                    key={i}
                    className="py-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[15px] font-bold text-[#1A1A1A]">
                        {wl.name}
                      </p>
                      <p className="text-[13px] text-[#999999]">
                        {wl.count} Items
                      </p>
                    </div>
                    <button className="text-[#00B207] text-[14px] font-bold hover:underline">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </SidebarCard>

            <SidebarCard title="Share Your Wishlist">
              <p className="text-[14px] text-[#666666] leading-relaxed mb-5">
                Share your wishlist with friends and family
              </p>
              <div className="flex gap-2.5 mb-5">
                <button className="flex-1 bg-[#3B5998] text-white py-2.5 rounded-md flex items-center justify-center gap-2 text-[14px] font-bold hover:opacity-90">
                  <Facebook size={18} /> Facebook
                </button>
                <button className="flex-1 bg-[#1DA1F2] text-white py-2.5 rounded-md flex items-center justify-center gap-2 text-[14px] font-bold hover:opacity-90">
                  <Twitter size={18} /> Twitter
                </button>
              </div>
              <div className="flex items-center">
                <div className="flex-1 h-10 px-4 bg-[#F9F9F9] border border-[#E5E5E5] rounded-l-md flex items-center text-[13px] text-[#666666] truncate">
                  https://freshcart.com/wi...
                </div>
                <button className="h-10 px-4 border border-[#E5E5E5] border-l-0 rounded-r-md text-[13px] font-bold hover:bg-gray-50">
                  Copy Link
                </button>
              </div>
            </SidebarCard>
          </aside>
        </div>

        {/* Recently Viewed */}
        <section className="mt-[60px] pt-12 border-t border-[#E5E5E5]">
          <h2 className="text-[24px] font-bold text-[#1A1A1A] mb-8">
            Recently Viewed
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {/* Minimalist Cards as Placeholder */}
            {[
              {
                name: "Fresh Broccoli (1pc)",
                cat: "Fruits & Vegetables",
                price: 1.79,
                img: "https://ecommerce.routemisr.com/api/v1/projects/605c364c12579df67557e935/products/605c364c12579df67557e935-1.jpeg",
              },
              {
                name: "Greek Yogurt (32oz)",
                cat: "Dairy & Eggs",
                price: 4.49,
                img: "https://ecommerce.routemisr.com/api/v1/projects/605c364c12579df67557e935/products/605c364c12579df67557e935-2.jpeg",
              },
              {
                name: "Organic Brown Eggs (12pcs)",
                cat: "Dairy & Eggs",
                price: 3.99,
                img: "https://ecommerce.routemisr.com/api/v1/projects/605c364c12579df67557e935/products/605c364c12579df67557e935-3.jpeg",
              },
              {
                name: "Organic Fresh Apples (1kg)",
                cat: "Fruits & Vegetables",
                price: 3.99,
                img: "https://ecommerce.routemisr.com/api/v1/projects/605c364c12579df67557e935/products/605c364c12579df67557e935-4.jpeg",
              },
              {
                name: "Artisan Sourdough Bread",
                cat: "Bakery & Snacks",
                price: 3.99,
                img: "https://ecommerce.routemisr.com/api/v1/projects/605c364c12579df67557e935/products/605c364c12579df67557e935-5.jpeg",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="bg-white border border-[#E5E5E5] rounded-lg p-[15px] relative group hover:shadow-md transition-all"
              >
                <button className="absolute top-3 right-3 z-10 text-gray-400 hover:text-[#00B207]">
                  <Heart size={18} />
                </button>
                <div className="relative aspect-square mb-3 rounded-md overflow-hidden bg-gray-50">
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      sizes="200px"
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-[12px] text-gray-400 mb-1">{p.cat}</p>
                <h4 className="text-[14px] font-bold text-[#1A1A1A] line-clamp-1 mb-2">
                  {p.name}
                </h4>
                <div className="flex items-center justify-between">
                  <p className="text-[15px] font-bold text-[#1A1A1A]">
                    ${p.price}
                  </p>
                  <button className="w-8 h-8 rounded-full border border-[#00B207] text-[#00B207] flex items-center justify-center hover:bg-[#00B207] hover:text-white transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
