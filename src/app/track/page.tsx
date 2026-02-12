import React from "react";
import Link from "next/link";
import {
  Package,
  Truck,
  CheckCircle2,
  Search,
  ArrowLeft,
  Info,
  HelpCircle,
} from "lucide-react";
import { ROUTES } from "@/Constants/app.constants";

export const metadata = {
  title: "Track Your Order - FreshCart",
  description:
    "Track your FreshCart order in real-time. Enter your order ID and email to get started.",
};

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pt-12 pb-24">
      {/* Hero Header */}
      <div className="bg-white border-b border-gray-100 mb-12 py-16">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-primary-600 font-bold text-sm mb-6 hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} />
            BACK TO SHOPPING
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Track Your Order
          </h1>
          <p className="text-gray-500 mt-4 font-medium text-lg max-w-2xl mx-auto">
            Check the status of your delivery in real-time. Enter your details
            below.
          </p>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Tracking Form */}
            <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
                      Order ID
                    </label>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary-600 transition-colors">
                        <Package size={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. #ORD-12345"
                        className="w-full pl-14 pr-5 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-600/5 focus:bg-white focus:border-primary-100 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
                      Billing Email
                    </label>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary-600 transition-colors">
                        <Search size={18} />
                      </div>
                      <input
                        type="email"
                        placeholder="yourname@example.com"
                        className="w-full pl-14 pr-5 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-600/5 focus:bg-white focus:border-primary-100 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full bg-gray-900 hover:bg-black text-white font-black py-5 rounded-[20px] shadow-2xl shadow-gray-900/10 transition-all flex items-center justify-center gap-3 mt-4"
                >
                  <Search size={20} />
                  TRACK ORDER STATUS
                </button>
              </form>
            </div>

            {/* Tracking Visual Stepper (Static Example) */}
            <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-bold text-gray-900">
                  Delivery Status
                </h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full">
                  Processing
                </span>
              </div>

              <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0 mt-4">
                {/* Connector Line */}
                <div className="absolute left-4 md:left-[5%] top-0 md:top-4 h-full md:h-1 w-1 md:w-[90%] bg-gray-100 -z-10 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-primary-600 rounded-full"></div>
                </div>

                {/* Steps */}
                {[
                  {
                    icon: CheckCircle2,
                    label: "Order Placed",
                    date: "Feb 12, 10:30 AM",
                    active: true,
                  },
                  {
                    icon: Package,
                    label: "Processing",
                    date: "Feb 12, 02:45 PM",
                    active: true,
                  },
                  { icon: Truck, label: "Shipped", date: "TBD", active: false },
                  {
                    icon: CheckCircle2,
                    label: "Delivered",
                    date: "TBD",
                    active: false,
                  },
                ].map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={i}
                      className="flex md:flex-col items-center gap-4 text-left md:text-center w-full md:w-1/4"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${step.active ? "bg-primary-600 text-white" : "bg-white text-gray-300 border-2 border-gray-100"}`}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <p
                          className={`text-sm font-black ${step.active ? "text-gray-900" : "text-gray-400"}`}
                        >
                          {step.label}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 mt-0.5">
                          {step.date}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="relative">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <Info size={20} className="text-primary-600" />
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">
                    Quick Info
                  </h3>
                </div>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">
                  The Order ID can be found in your confirmation email sent
                  immediately after checkout.
                </p>
              </div>

              <div className="bg-primary-900 p-8 rounded-[24px] shadow-xl text-white">
                <HelpCircle size={32} className="text-[#10B981] mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Can&apos;t find your ID?
                </h3>
                <p className="text-primary-100 text-sm leading-relaxed mb-6">
                  Check your spam folder or contact our support team for help.
                </p>
                <Link
                  href={ROUTES.CONTACT}
                  className="block w-full text-center bg-[#10B981] hover:bg-[#0ea874] text-white font-black py-4 rounded-xl transition-colors text-sm"
                >
                  GET SUPPORT
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
