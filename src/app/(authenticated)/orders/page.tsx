"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import {
  Package,
  Search,
  ChevronDown,
  RefreshCw,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface OrderStatusProps {
  status: string;
}

const StatusBadge = ({ status }: OrderStatusProps) => {
  const configs: Record<
    string,
    { label: string; bg: string; text: string; icon: any }
  > = {
    delivered: {
      label: "Delivered",
      bg: "bg-[#E8F5E9]",
      text: "text-[#00B207]",
      icon: CheckCircle2,
    },
    processing: {
      label: "Processing",
      bg: "bg-[#E3F2FD]",
      text: "text-[#1976D2]",
      icon: Clock,
    },
    cancelled: {
      label: "Cancelled",
      bg: "bg-[#FFEBEE]",
      text: "text-[#D32F2F]",
      icon: XCircle,
    },
    pending: {
      label: "Pending",
      bg: "bg-[#FFF3E0]",
      text: "text-[#F57C00]",
      icon: AlertCircle,
    },
  };

  const config = configs[status.toLowerCase()] || configs.pending;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] text-[12px] font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
};

const OrderCard = ({ order }: { order: any }) => {
  let status: "delivered" | "processing" | "cancelled" | "pending" =
    order.isDelivered ? "delivered" : "processing";
  if (order.status === "cancelled") status = "cancelled"; // Assuming API might provide this

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-lg p-[25px] mb-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow duration-300">
      {/* Order Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-[15px]">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-[16px] font-bold text-[#1A1A1A]">
              Order #{order.id || order._id.slice(-6).toUpperCase()}
            </h3>
            <StatusBadge status={status} />
          </div>
          <p className="text-[13px] text-[#999999]">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center gap-[15px] text-[14px]">
          <button className="flex items-center gap-1.5 text-[#00B207] hover:underline font-medium">
            <RefreshCw size={16} />
            Reorder
          </button>
          <button className="flex items-center gap-1.5 text-[#333333] hover:underline font-medium">
            <Eye size={16} />
            View Details
          </button>
        </div>
      </div>

      {/* Order Content */}
      <div className="pt-5 border-t border-[#F0F0F0] flex flex-col md:flex-row gap-5 items-start">
        {/* Product Images */}
        <div className="flex items-center gap-2 shrink-0">
          {order.cartItems.slice(0, 3).map((item: any, idx: number) => (
            <div
              key={idx}
              className="relative w-[60px] h-[60px] rounded-[6px] border border-[#E5E5E5] overflow-hidden p-1 bg-white"
            >
              <Image
                src={item.product.imageCover}
                alt={item.product.title}
                fill
                className="object-contain p-1"
              />
            </div>
          ))}
          {order.cartItems.length > 3 && (
            <div className="relative w-[60px] h-[60px] rounded-[6px] border border-[#E5E5E5] overflow-hidden flex items-center justify-center bg-gray-900/10">
              <span className="text-[14px] font-bold text-gray-600">
                +{order.cartItems.length - 3}
              </span>
            </div>
          )}
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 grow">
          <div>
            <p className="text-[13px] text-[#666666] mb-1">Items</p>
            <p className="text-[15px] font-bold text-[#1A1A1A]">
              {order.cartItems.length} items
            </p>
          </div>
          <div>
            <p className="text-[13px] text-[#666666] mb-1">Total Amount</p>
            <p className="text-[15px] font-bold text-[#1A1A1A]">
              ${order.totalOrderPrice.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-[13px] text-[#666666] mb-1">
              {status === "cancelled" ? "Cancelled on" : "Delivered to"}
            </p>
            <p className="text-[15px] font-bold text-[#1A1A1A]">
              {status === "cancelled"
                ? new Date(order.updatedAt).toLocaleDateString()
                : "Home Address"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-[10px] w-full md:w-[150px] shrink-0">
          <button className="bg-[#00B207] hover:bg-[#009606] text-white py-2.5 rounded-[5px] text-[14px] font-semibold transition-colors">
            Track Order
          </button>
          <button className="bg-white border border-[#E5E5E5] hover:bg-gray-50 text-[#4D4D4D] py-2.5 rounded-[5px] text-[14px] font-medium transition-colors">
            {status === "delivered"
              ? "Write Review"
              : status === "cancelled"
                ? "Reorder All"
                : "Cancel Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function OrdersPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All Orders");

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-orders", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${user.id}`,
      );
      return response.data;
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-gray-100 rounded animate-pulse mb-8" />
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-[200px] bg-white border border-gray-100 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
        <p className="text-red-500 font-bold">
          Failed to load orders. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-[30px]">
        <h1 className="text-[32px] font-bold text-[#1A1A1A] tracking-tight">
          My Orders
        </h1>

        <div className="flex flex-wrap items-center gap-[15px] w-full md:w-auto">
          {/* Dropdown Filter */}
          <div className="relative min-w-[150px]">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-[#E5E5E5] rounded-[5px] py-[10px] pl-[15px] pr-[40px] text-[14px] outline-none cursor-pointer hover:border-gray-400 transition-colors"
            >
              <option>All Orders</option>
              <option>Delivered</option>
              <option>Processing</option>
              <option>Cancelled</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-[15px] top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 md:w-[250px]">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-[#E5E5E5] rounded-[5px] py-[10px] pl-[15px] pr-[40px] text-[14px] outline-none hover:border-gray-400 transition-colors placeholder:text-[#999999]"
            />
            <Search
              size={16}
              className="absolute right-[15px] top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Orders List */}
      {!orders?.length ? (
        <div className="card p-20 text-center bg-white border border-gray-100 rounded-[8px] shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <Package size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tighter">
            No orders found
          </h2>
          <p className="text-gray-400 mb-8 max-w-sm mx-auto font-medium">
            You haven't placed any orders yet. Start shopping and fill your
            history!
          </p>
          <Link
            href="/products"
            className="bg-[#00B207] text-white px-10 py-4 rounded-[5px] text-[14px] font-bold shadow-lg shadow-green-600/20 active:scale-95 transition-all inline-block"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div>
          {orders.map((order: any) => (
            <OrderCard key={order._id} order={order} />
          ))}

          {/* Pagination */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-10">
            <p className="text-[14px] text-[#666666]">
              Showing 1-{orders.length} of {orders.length} orders
            </p>

            <div className="flex items-center gap-2">
              <button className="w-9 h-9 border border-[#E5E5E5] rounded-[5px] flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button className="w-9 h-9 bg-[#00B207] text-white rounded-[5px] font-semibold text-[14px] flex items-center justify-center">
                1
              </button>
              <button className="w-9 h-9 border border-[#E5E5E5] text-[#333333] rounded-[5px] font-medium text-[14px] flex items-center justify-center hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="w-9 h-9 border border-[#E5E5E5] text-[#333333] rounded-[5px] font-medium text-[14px] flex items-center justify-center hover:bg-gray-50 transition-colors">
                3
              </button>
              <button className="w-9 h-9 border border-[#E5E5E5] rounded-[5px] flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
