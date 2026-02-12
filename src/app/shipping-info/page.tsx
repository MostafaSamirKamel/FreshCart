import React from "react";
import Link from "next/link";
import {
  Truck,
  MapPin,
  Globe,
  Clock,
  ArrowLeft,
  Info,
  HelpCircle,
} from "lucide-react";
import { ROUTES } from "@/Constants/app.constants";

export const metadata = {
  title: "Shipping Information - FreshCart",
  description: "Learn about our shipping methods, delivery times, and rates.",
};

export default function ShippingInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pt-12 pb-24">
      {/* Hero Header */}
      <div className="bg-white border-b border-gray-100 mb-12 py-16">
        <div className="container max-w-5xl mx-auto px-4">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-primary-600 font-bold text-sm mb-6 hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} />
            BACK TO HOME
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                Shipping Info
              </h1>
              <p className="text-gray-500 mt-4 font-medium text-lg">
                Fast, reliable, and transparent delivery for your groceries.
              </p>
            </div>
            <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
              <Truck size={32} />
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          {/* Main Content */}
          <div className="space-y-12">
            {/* Delivery Methods Table */}
            <section className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 md:p-10 border-b border-gray-100">
                <div className="flex items-center gap-4 mb-2">
                  <Clock size={24} className="text-primary-600" />
                  <h2 className="text-2xl font-black text-gray-900 leading-none">
                    Delivery Methods
                  </h2>
                </div>
                <p className="text-gray-500 font-medium text-sm">
                  Choose the option that fits your schedule.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      <th className="px-8 py-4">Method</th>
                      <th className="px-8 py-4">Timeframe</th>
                      <th className="px-8 py-4 text-right">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <span className="block font-bold text-gray-900">
                          Standard Delivery
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium">
                          Eco-friendly route
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-gray-500">
                        2 - 3 Business Days
                      </td>
                      <td className="px-8 py-6 text-right font-black text-gray-900">
                        $5.99
                      </td>
                    </tr>
                    <tr className="group hover:bg-gray-50/50 transition-colors bg-primary-50/30">
                      <td className="px-8 py-6">
                        <span className="block font-bold text-primary-600">
                          Express Delivery
                        </span>
                        <span className="text-[11px] text-primary-400 font-medium">
                          Priority handling
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-primary-600">
                        Next Business Day
                      </td>
                      <td className="px-8 py-6 text-right font-black text-primary-600">
                        $12.99
                      </td>
                    </tr>
                    <tr className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <span className="block font-bold text-gray-900">
                          Same Day
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium">
                          Selected cities only
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-gray-500">
                        Subject to availability
                      </td>
                      <td className="px-8 py-6 text-right font-black text-gray-900">
                        $19.99
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Shipping Zones */}
            <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600">
                  <Globe size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 leading-none">
                  Delivery Areas
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex gap-4">
                  <MapPin className="text-primary-600 shrink-0" size={20} />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Local Radius
                    </h3>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">
                      We offer ultra-fast 2-hour delivery for addresses within
                      15 miles of our fulfillment centers.
                    </p>
                  </div>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex gap-4">
                  <Globe className="text-primary-600 shrink-0" size={20} />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      National Wide
                    </h3>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">
                      Standard and Express options are available across the
                      entire continental United States.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <aside className="relative">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <Info size={20} className="text-primary-600" />
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">
                    Track Policy
                  </h3>
                </div>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">
                  Every order includes real-time tracking. Once your order
                  ships, you will receive an email with your ID.
                </p>
              </div>

              <div className="bg-gray-900 p-8 rounded-[24px] shadow-xl text-white">
                <HelpCircle size={32} className="text-primary-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Tracking issues?</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Check our Tracking guide or reach out to support.
                </p>
                <Link
                  href={ROUTES.TRACK}
                  className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-black py-4 rounded-xl transition-colors text-sm"
                >
                  TRACK MY ORDER
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
