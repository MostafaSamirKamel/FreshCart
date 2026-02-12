"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/Store/store";
import { removeFromCompare, clearCompare } from "@/Store/Slices/compareSlice";
import { addToCartApi } from "@/Store/Slices/cartSlice";
import {
  Trash2,
  ShoppingCart,
  Star,
  ChevronRight,
  ArrowLeft,
  X,
  Info,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";

export default function ComparePage() {
  const { items } = useSelector((state: RootState) => state.compare);
  const { token, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (productId: string, title: string) => {
    if (!isAuthenticated) {
      toast.warning("Please login to add items to your cart");
      return;
    }
    dispatch(addToCartApi({ productId, token: token! }));
    toast.success(`Added ${title.slice(0, 15)}... to cart!`);
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCompare(id));
    toast.info("Product removed from comparison");
  };

  if (items.length === 0) {
    return (
      <div className="container py-32 text-center">
        <div className="max-w-md mx-auto space-y-8">
          <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center text-slate-300 mx-auto border border-slate-100">
            <Info size={40} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            Your comparison list is empty.
          </h1>
          <p className="text-slate-500 font-medium">
            Add some products to compare their features and find the best fit
            for your needs.
          </p>
          <Link
            href="/products"
            className="btn btn-primary px-12! py-4! text-lg font-black rounded-2xl shadow-2xl shadow-primary-600/30 inline-flex items-center gap-2"
          >
            <ArrowLeft size={20} /> Back to Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="py-12 bg-slate-50/50 min-h-screen">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-10">
          <Link
            href="/"
            className="hover:text-primary-600 font-bold transition-colors"
          >
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="font-black text-slate-900">Compare Products</span>
        </nav>

        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2">
              Compare Products
            </h1>
            <p className="text-slate-500 font-medium">
              {items.length} products in your list
            </p>
          </div>
          <button
            onClick={() => dispatch(clearCompare())}
            className="text-xs font-black text-red-500 uppercase tracking-widest hover:bg-red-50 px-4 py-2 rounded-lg transition-all border border-transparent hover:border-red-100"
          >
            Clear All
          </button>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-8 text-left bg-slate-50/50 border-b border-slate-100 min-w-[200px]">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Feature
                    </span>
                  </th>
                  {items.map((product) => (
                    <th
                      key={product._id}
                      className="p-8 border-b border-l border-slate-100 min-w-[280px] relative group"
                    >
                      <button
                        onClick={() => handleRemove(product._id)}
                        className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
                      >
                        <X size={16} />
                      </button>
                      <div className="space-y-6">
                        <div className="relative aspect-square rounded-3xl bg-slate-50 p-6 overflow-hidden">
                          <Image
                            src={product.imageCover}
                            alt={product.title}
                            fill
                            sizes="200px"
                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest">
                            {product.category.name}
                          </p>
                          <h3 className="text-lg font-black text-slate-900 line-clamp-2 leading-tight">
                            <Link
                              href={`/products/${product._id}`}
                              className="hover:text-primary-600 transition-colors uppercase"
                            >
                              {product.title}
                            </Link>
                          </h3>
                        </div>
                        <button
                          onClick={() =>
                            handleAddToCart(product._id, product.title)
                          }
                          className="w-full btn btn-primary py-3! text-sm font-black shadow-xl shadow-primary-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={18} /> Add to Cart
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {/* Price */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-8 font-black text-slate-900 bg-slate-50/50 border-b border-slate-100 uppercase tracking-tighter">
                    Price
                  </td>
                  {items.map((product) => (
                    <td
                      key={product._id}
                      className="p-8 border-b border-l border-slate-100"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">
                          ${product.priceAfterDiscount || product.price}
                        </span>
                        {product.priceAfterDiscount && (
                          <span className="text-sm text-slate-300 line-through font-bold">
                            ${product.price}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
                {/* Brand */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-8 font-black text-slate-900 bg-slate-50/50 border-b border-slate-100 uppercase tracking-tighter">
                    Brand
                  </td>
                  {items.map((product) => (
                    <td
                      key={product._id}
                      className="p-8 border-b border-l border-slate-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl p-2 border border-slate-100 flex items-center justify-center overflow-hidden">
                          <Image
                            src={
                              product.brand.image ||
                              "https://via.placeholder.com/50"
                            }
                            alt={product.brand.name}
                            width={30}
                            height={30}
                            className="object-contain grayscale"
                          />
                        </div>
                        <span className="font-bold text-slate-700">
                          {product.brand.name}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
                {/* Rating */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-8 font-black text-slate-900 bg-slate-50/50 border-b border-slate-100 uppercase tracking-tighter">
                    Rating
                  </td>
                  {items.map((product) => (
                    <td
                      key={product._id}
                      className="p-8 border-b border-l border-slate-100"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
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
                                i < Math.floor(product.ratingsAverage)
                                  ? ""
                                  : "text-slate-200"
                              }
                            />
                          ))}
                        </div>
                        <span className="font-black text-slate-900">
                          {product.ratingsAverage}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          ({product.ratingsQuantity})
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
                {/* Stock Status */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-8 font-black text-slate-900 bg-slate-50/50 border-b border-slate-100 uppercase tracking-tighter">
                    Availability
                  </td>
                  {items.map((product) => (
                    <td
                      key={product._id}
                      className="p-8 border-b border-l border-slate-100"
                    >
                      {product.quantity > 0 ? (
                        <div className="inline-flex items-center gap-2 text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-xs">
                          <CheckCircle2 size={14} /> In Stock
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 text-red-600 font-bold bg-red-50 px-3 py-1 rounded-full text-xs">
                          <AlertCircle size={14} /> Out of Stock
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
                {/* Description */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-8 font-black text-slate-900 bg-slate-50/50 border-b border-slate-100 uppercase tracking-tighter">
                    Overview
                  </td>
                  {items.map((product) => (
                    <td
                      key={product._id}
                      className="p-8 border-b border-l border-slate-100 align-top"
                    >
                      <p className="text-slate-500 leading-relaxed font-medium line-clamp-4">
                        {product.description}
                      </p>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 shrink-0">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-slate-900 uppercase tracking-tight">
                Side-by-Side
              </h4>
              <p className="text-sm text-slate-500 font-medium">
                Clear comparison of technical specs and pricing.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 shrink-0">
              <ShoppingCart size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-slate-900 uppercase tracking-tight">
                Easy Purchase
              </h4>
              <p className="text-sm text-slate-500 font-medium">
                Add your selected product directly to the cart.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 shrink-0">
              <X size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-slate-900 uppercase tracking-tight">
                Max 4 Items
              </h4>
              <p className="text-sm text-slate-500 font-medium">
                Compare up to 4 products at once for clarity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
