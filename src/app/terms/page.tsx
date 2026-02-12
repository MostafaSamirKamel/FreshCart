import React from "react";
import Link from "next/link";
import {
  FileText,
  Gavel,
  Scale,
  AlertCircle,
  ArrowLeft,
  HelpCircle,
} from "lucide-react";
import { ROUTES } from "@/Constants/app.constants";

export const metadata = {
  title: "Terms of Service - FreshCart",
  description:
    "Read our terms of service to understand your rights and responsibilities when using FreshCart.",
};

export default function TermsOfServicePage() {
  const lastUpdated = "February 12, 2026";

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
                Terms of Service
              </h1>
              <p className="text-gray-500 mt-4 font-medium text-lg">
                Please read these terms carefully before using our services.
              </p>
            </div>
            <div className="bg-[#10B981]/10 px-6 py-4 rounded-2xl border border-[#10B981]/20 shrink-0">
              <span className="block text-[10px] font-black uppercase tracking-widest text-[#10B981] mb-1">
                Last Updated
              </span>
              <span className="text-gray-900 font-bold">{lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          {/* Main Content */}
          <div className="space-y-12">
            <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600">
                  <Gavel size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 leading-none">
                  Agreement to Terms
                </h2>
              </div>
              <div className="prose prose-gray max-w-none text-gray-600 font-medium leading-relaxed">
                <p>
                  By accessing or using our website, you agree to be bound by
                  these Terms of Service and all applicable laws and
                  regulations. If you do not agree with any of these terms, you
                  are prohibited from using or accessing this site.
                </p>
              </div>
            </section>

            <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600">
                  <FileText size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 leading-none">
                  Intellectual Property
                </h2>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed">
                The content, features, and functionality of FreshCart are and
                will remain the exclusive property of FreshCart and its
                licensors. Our trademarks and trade dress may not be used in
                connection with any product or service without the prior written
                consent of FreshCart.
              </p>
            </section>

            <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600">
                  <AlertCircle size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 leading-none">
                  Limitation of Liability
                </h2>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed">
                In no event shall FreshCart, nor its directors, employees,
                partners, agents, suppliers, or affiliates, be liable for any
                indirect, incidental, special, consequential or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses, resulting from your
                access to or use of or inability to access or use the service.
              </p>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <aside className="relative">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                  Legal Sections
                </h3>
                <nav className="space-y-2">
                  <Link
                    href="#agreement"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <Scale size={16} className="text-primary-600" />
                    <span className="text-sm font-bold text-gray-700 group-hover:text-primary-600">
                      Agreement
                    </span>
                  </Link>
                  <Link
                    href="#property"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <FileText size={16} className="text-primary-600" />
                    <span className="text-sm font-bold text-gray-700 group-hover:text-primary-600">
                      Intellectual Property
                    </span>
                  </Link>
                  <Link
                    href="#liability"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <AlertCircle size={16} className="text-primary-600" />
                    <span className="text-sm font-bold text-gray-700 group-hover:text-primary-600">
                      Liability
                    </span>
                  </Link>
                </nav>
              </div>

              <div className="bg-gray-900 p-8 rounded-[24px] shadow-xl text-white">
                <HelpCircle size={32} className="text-primary-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Need clarification?</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  If you have questions about our terms, we are happy to explain
                  them.
                </p>
                <Link
                  href={ROUTES.CONTACT}
                  className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-black py-4 rounded-xl transition-colors text-sm"
                >
                  GET HELP
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
