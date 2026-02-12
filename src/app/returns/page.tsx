import React from "react";
import Link from "next/link";
import {
  RefreshCcw,
  ShieldCheck,
  Clock,
  FileText,
  ArrowLeft,
  Info,
  MessageCircle,
} from "lucide-react";
import { ROUTES } from "@/Constants/app.constants";

export const metadata = {
  title: "Returns & Refunds - FreshCart",
  description: "Our fair and transparent returns and refunds policy.",
};

export default function ReturnsPage() {
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
                Returns & Refunds
              </h1>
              <p className="text-gray-500 mt-4 font-medium text-lg">
                Not happy with your order? We’ll make it right.
              </p>
            </div>
            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
              <RefreshCcw size={32} />
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          {/* Main Content */}
          <div className="space-y-12">
            {/* Core Policy */}
            <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600">
                  <ShieldCheck size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 leading-none">
                  Our Guarantee
                </h2>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed">
                If your groceries aren’t fresh, we’ll refund you. Period. We
                pride ourselves on the quality of our produce and essentials. If
                any item arrives damaged or quality is not up to your standards,
                we offer a no-questions-asked refund or replacement within 24
                hours of delivery.
              </p>
            </section>

            {/* Steps Section */}
            <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600">
                  <Clock size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 leading-none">
                  How to Return
                </h2>
              </div>
              <div className="space-y-8 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-100">
                {[
                  {
                    step: "01",
                    title: "Take a Photo",
                    desc: "Snap a quick photo of the item you're unhappy with.",
                  },
                  {
                    step: "02",
                    title: "Contact Support",
                    desc: "Click the Contact Support button and attach the photo.",
                  },
                  {
                    step: "03",
                    title: "Get Your Refund",
                    desc: "We’ll process your refund to your original payment method within 24 hours.",
                  },
                ].map((item, i) => (
                  <div key={i} className="pl-12 relative group">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border-2 border-primary-600 flex items-center justify-center text-[11px] font-black text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Refund Timeline */}
            <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600">
                  <FileText size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 leading-none">
                  Refund Timeline
                </h2>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <ul className="space-y-4">
                  <li className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-600">
                      Approval Process
                    </span>
                    <span className="text-sm font-black text-gray-900">
                      Instant - 4 Hours
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-600">
                      Credit Card Refund
                    </span>
                    <span className="text-sm font-black text-gray-900">
                      3 - 5 Business Days
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-600">
                      Store Credit
                    </span>
                    <span className="text-sm font-black text-gray-900">
                      Instant
                    </span>
                  </li>
                </ul>
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
                    Quick Help
                  </h3>
                </div>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">
                  Refunds are always issued to the original payment method used
                  during checkout.
                </p>
              </div>

              <div className="bg-primary-900 p-8 rounded-[24px] shadow-xl text-white">
                <MessageCircle size={32} className="text-[#10B981] mb-4" />
                <h3 className="text-xl font-bold mb-2">Need to talk?</h3>
                <p className="text-primary-100 text-sm leading-relaxed mb-6">
                  Our customer happiness team is available 24/7 to resolve
                  issues.
                </p>
                <Link
                  href={ROUTES.CONTACT}
                  className="block w-full text-center bg-[#10B981] hover:bg-[#0ea874] text-white font-black py-4 rounded-xl transition-colors text-sm"
                >
                  START A CHAT
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
