import React from "react";
import Link from "next/link";
import { Cookie, Shield, Eye, Settings, ArrowLeft, Info } from "lucide-react";
import { ROUTES } from "@/Constants/app.constants";

export const metadata = {
  title: "Cookie Policy - FreshCart",
  description:
    "Learn how we use cookies and similar technologies to improve your experience.",
};

export default function CookiePolicyPage() {
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
                Cookie Policy
              </h1>
              <p className="text-gray-500 mt-4 font-medium text-lg">
                Understanding how we use cookies to provide a better service.
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
                  <Cookie size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 leading-none">
                  What Are Cookies?
                </h2>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed">
                Cookies are small text files that are used to store small pieces
                of information. They are stored on your device when the website
                is loaded on your browser. These cookies help us make the
                website function properly, make it more secure, provide better
                user experience, and understand how the website performs.
              </p>
            </section>

            <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600">
                  <Shield size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 leading-none">
                  How We Use Cookies
                </h2>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed mb-6">
                As most of the online services, our website uses first-party and
                third-party cookies for several purposes.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-2">
                    Necessary
                  </h3>
                  <p className="text-gray-500 text-xs font-medium">
                    Required for basic site functionality and security.
                  </p>
                </div>
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-2">
                    Performance
                  </h3>
                  <p className="text-gray-500 text-xs font-medium">
                    To understand how visitors interact with the website.
                  </p>
                </div>
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-2">
                    Functional
                  </h3>
                  <p className="text-gray-500 text-xs font-medium">
                    Helps perform certain functionalities like sharing content.
                  </p>
                </div>
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-2">
                    Advertisement
                  </h3>
                  <p className="text-gray-500 text-xs font-medium">
                    Used to provide visitors with relevant ads and marketing.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600">
                  <Settings size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 leading-none">
                  Manage Preferences
                </h2>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed">
                You can manage your cookies preferences by clicking on the
                &quot;Settings&quot; button and enabling or disabling the cookie
                categories on the popup according to your preferences.
              </p>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <aside className="relative">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                  Cookie Info
                </h3>
                <nav className="space-y-2">
                  <Link
                    href="#what-are-cookies"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <Info size={16} className="text-primary-600" />
                    <span className="text-sm font-bold text-gray-700 group-hover:text-primary-600">
                      Definitions
                    </span>
                  </Link>
                  <Link
                    href="#how-we-use"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <Eye size={16} className="text-primary-600" />
                    <span className="text-sm font-bold text-gray-700 group-hover:text-primary-600">
                      Usage Details
                    </span>
                  </Link>
                  <Link
                    href="#management"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <Settings size={16} className="text-primary-600" />
                    <span className="text-sm font-bold text-gray-700 group-hover:text-primary-600">
                      Preferences
                    </span>
                  </Link>
                </nav>
              </div>

              <div className="bg-primary-900 p-8 rounded-[24px] shadow-xl text-white">
                <Cookie size={32} className="text-amber-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Cookie Privacy</h3>
                <p className="text-primary-100 text-sm leading-relaxed mb-6">
                  Learn more about how we protect your overall privacy.
                </p>
                <Link
                  href={ROUTES.PRIVACY}
                  className="block w-full text-center bg-[#10B981] hover:bg-[#0ea874] text-white font-black py-4 rounded-xl transition-colors text-sm"
                >
                  FULL PRIVACY POLICY
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
