"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, Star, Heart } from "lucide-react";
import type { CartItem } from "@/Types/cart.types";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, count: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemCardProps) {
  return (
    <div className="py-10 first:pt-0 last:pb-0 group">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Thumbnail */}
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-gray-50 border border-gray-100 p-4 shrink-0 group-hover:scale-105 transition-transform duration-500">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="150px"
            className="object-contain p-2"
          />
        </div>

        {/* Info */}
        <div className="grow space-y-3 text-center md:text-left w-full md:w-auto">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest pl-0.5">
              Premium Quality
            </span>
            <h3 className="text-xl font-black text-gray-900 line-clamp-1 hover:text-primary-600 transition-colors">
              <Link href={`/products/${item.id}`}>{item.title}</Link>
            </h3>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="flex text-yellow-400">
              {[...Array(4)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
              <Star size={14} fill="currentColor" className="text-gray-200" />
            </div>
            <span className="text-xs font-black text-gray-900 mt-0.5">4.3</span>
            <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider mt-0.5">
              (149 Reviews)
            </span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
            <button
              className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors flex items-center gap-1.5"
              onClick={() => onRemove(item.id)}
            >
              <Trash2 size={14} /> Remove
            </button>
            <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-primary-600 transition-colors flex items-center gap-1.5">
              <Heart size={14} /> Save for later
            </button>
          </div>
        </div>

        {/* Controls & Price */}
        <div className="flex flex-col items-center md:items-end gap-6 shrink-0 w-full md:w-auto">
          <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
            <button
              onClick={() =>
                item.quantity > 1 &&
                onUpdateQuantity(item.id, item.quantity - 1)
              }
              className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:bg-white transition-all active:scale-90"
            >
              <Minus size={18} />
            </button>
            <span className="w-12 text-center font-black text-gray-900 text-lg">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:bg-white transition-all active:scale-90"
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="text-center md:text-right">
            <p className="text-2xl font-black text-gray-900 tracking-tighter leading-none">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
              ${item.price} each
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
