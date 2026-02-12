"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { Shield, Package, Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth);

  const { data: ordersCount } = useQuery({
    queryKey: ["orders-count", user?.id],
    queryFn: async () => {
      if (!user?.id) return 0;
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${user.id}`,
      );
      return response.data.length;
    },
    enabled: !!user?.id,
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Banner */}
      <div className="bg-linear-to-r from-primary-600 to-primary-700 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] animate-pulse" />
        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-2 tracking-tighter">
            Welcome back, {user?.name.split(" ")[0]}!
          </h1>
          <p className="text-primary-100 font-bold text-sm flex items-center gap-1.5">
            <Shield size={16} /> Verified FreshCart Member
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Stats */}
        <div className="card bg-white p-8 border-0 shadow-sm text-center group hover:bg-primary-600 transition-all duration-300">
          <p className="text-4xl font-black text-gray-900 group-hover:text-white mb-2">
            {ordersCount || 0}
          </p>
          <p className="text-xs font-black text-gray-400 group-hover:text-primary-100 uppercase tracking-widest flex items-center justify-center gap-2">
            <Package size={14} /> Total Orders
          </p>
        </div>
        <div className="card bg-white p-8 border-0 shadow-sm text-center group hover:bg-primary-600 transition-all duration-300">
          <p className="text-4xl font-black text-gray-900 group-hover:text-white mb-2">
            12
          </p>
          <p className="text-xs font-black text-gray-400 group-hover:text-primary-100 uppercase tracking-widest flex items-center justify-center gap-2">
            <Heart size={14} /> Wishlist Items
          </p>
        </div>
      </div>

      {/* Account Security Banner */}
      <div className="card bg-linear-to-r from-gray-800 to-gray-900 p-8 rounded-3xl border-0 shadow-xl relative overflow-hidden group">
        <Shield className="absolute -right-8 -bottom-8 w-48 h-48 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
        <div className="relative z-10">
          <h3 className="text-xl font-black text-white mb-2">
            Account Security
          </h3>
          <p className="text-gray-400 font-medium text-sm mb-6 max-w-md">
            Your account is protected with the latest security standards. Ensure
            your password is strong and updated regularly.
          </p>
          <button className="btn btn-primary bg-white! text-gray-900! hover:bg-gray-100! px-8! py-3! text-sm font-black shadow-none active:scale-95 transition-all">
            Manage Security
          </button>
        </div>
      </div>
    </div>
  );
}
