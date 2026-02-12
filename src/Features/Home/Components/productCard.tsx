"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart, Eye, ArrowRightLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartApi } from "@/Store/Slices/cartSlice";
import { toggleWishlist } from "@/Store/Slices/wishlistSlice";
import { addToCompare, removeFromCompare } from "@/Store/Slices/compareSlice";
import { RootState, AppDispatch } from "@/Store/store";
import { toast } from "react-toastify";
import { Product } from "@/Types/product.types";

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  category: string;
  priceAfterDiscount?: number;
}

export default function ProductCard({
  id,
  title,
  image,
  price,
  rating,
  category,
  priceAfterDiscount,
}: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { items: wishlistItems } = useSelector(
    (state: RootState) => state.wishlist,
  );
  const { token, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const { items: compareItems } = useSelector(
    (state: RootState) => state.compare,
  );

  const isFavorited = wishlistItems.includes(id);
  const isInCompare = compareItems.some((item) => item._id === id);

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInCompare) {
      dispatch(removeFromCompare(id));
      toast.info("Removed from comparison");
    } else {
      if (compareItems.length >= 4) {
        toast.warning("You can only compare up to 4 products");
        return;
      }
      // Note: ProductCard currently receives partial data.
      // For a full comparison, we'd ideally pass the full product object.
      // We'll construct a compatible object for the comparison table.
      const productToCompare: any = {
        _id: id,
        title,
        imageCover: image,
        price,
        priceAfterDiscount,
        category: { name: category },
        ratingsAverage: rating,
        ratingsQuantity: 0, // Placeholder
        brand: { name: "Generic" }, // Placeholder
        quantity: 10, // Placeholder
        description: "Premium quality product from FreshCart selection.", // Placeholder
      };
      dispatch(addToCompare(productToCompare));
      toast.success("Added to comparison!");
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.warning("Please login to manage your wishlist");
      return;
    }
    dispatch(toggleWishlist({ id, token: token! }));
    toast.info(isFavorited ? "Removed from wishlist" : "Added to wishlist", {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: true,
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.warning("Please login to add items to your cart");
      return;
    }
    dispatch(addToCartApi({ productId: id, token: token! }));
    toast.success(`${title.slice(0, 15)}... added!`, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: true,
    });
  };

  return (
    <div className="card group relative flex flex-col h-full bg-white transition-all duration-300 hover:shadow-xl hover:border-primary-200">
      {/* Quick Actions */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button
          onClick={handleWishlist}
          className={`p-2.5 rounded-full shadow-md transition-all ${
            isFavorited
              ? "bg-red-500 text-white"
              : "bg-white text-gray-400 hover:bg-red-50 hover:text-red-500"
          }`}
        >
          <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
        </button>
        <button
          onClick={handleCompare}
          className={`p-2.5 rounded-full shadow-md transition-all ${
            isInCompare
              ? "bg-primary-600 text-white"
              : "bg-white text-gray-400 hover:bg-primary-50 hover:text-primary-600"
          }`}
        >
          <ArrowRightLeft size={18} />
        </button>
        <Link
          href={`/products/${id}`}
          className="p-2.5 bg-white rounded-full shadow-md text-gray-400 hover:bg-primary-600 hover:text-white transition-all"
        >
          <Eye size={18} />
        </Link>
      </div>

      {/* Image */}
      <Link
        href={`/products/${id}`}
        className="relative aspect-square overflow-hidden bg-gray-50/50"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out"
          unoptimized
        />
        {priceAfterDiscount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded shadow-sm uppercase tracking-wider">
            Sale
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
        <span className="text-[10px] text-primary-600 font-black mb-1.5 uppercase tracking-widest opacity-80">
          {category}
        </span>
        <Link
          href={`/products/${id}`}
          className="font-bold text-gray-900 line-clamp-2 mb-3 leading-snug hover:text-primary-600 transition-colors"
        >
          {title}
        </Link>

        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex text-yellow-400">
            <Star size={14} fill="currentColor" />
          </div>
          <span className="text-xs text-gray-400 font-bold tracking-tight">
            ({rating})
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            {priceAfterDiscount ? (
              <>
                <span className="text-xl font-black text-gray-900 tracking-tighter">
                  ${priceAfterDiscount}
                </span>
                <span className="text-xs text-gray-400 line-through font-bold">
                  ${price}
                </span>
              </>
            ) : (
              <span className="text-xl font-black text-gray-900 tracking-tighter">
                ${price}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="btn p-3 bg-primary-600 text-white hover:bg-primary-700 rounded-xl shadow-lg shadow-primary-600/20 active:scale-95 transition-all"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
