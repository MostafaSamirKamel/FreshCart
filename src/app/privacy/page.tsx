import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  ArrowLeft,
  Mail,
} from "lucide-react";
import { ROUTES } from "@/Constants/app.constants";

export const metadata = {
  title: "Privacy Policy - FreshCart",
  description:
    "Learn how FreshCart protects and manages your personal information.",
};

export default function PrivacyPolicyPage() {
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
                Privacy Policy
              </h1>
              <p className="text-gray-500 mt-4 font-medium text-lg">
                Your privacy is our priority. Learn how we handle your data.
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
                  <ShieldCheck size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 leading-none">
                  Overview
                </h2>
              </div>
              <div className="prose prose-gray max-w-none text-gray-600 font-medium leading-relaxed">
                <p>
                  At FreshCart, we are committed to protecting your personal
                  information and your right to privacy. If you have any
                  questions or concerns about our policy, or our practices with
                  regards to your personal information, please contact us at
                  privacy@freshcart.com.
                </p>
                <p className="mt-4">
                  When you visit our website, and use our services, you trust us
                  with your personal information. We take your privacy very
                  seriously. In this privacy notice, we describe our privacy
                  policy. We seek to explain to you in the clearest way possible
                  what information we collect, how we use it and what rights you
                  have in relation to it.
                </p>
              </div>
            </section>

            <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600">
                  <Eye size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 leading-none">
                  Information Collection
                </h2>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Personal Information You Disclose
                  </h3>
                  <p className="text-gray-600 font-medium text-sm leading-relaxed">
                    We collect personal information that you provide to us such
                    as name, address, contact information, passwords and
                    security data, and payment information.
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Information Automatically Collected
                  </h3>
                  <p className="text-gray-600 font-medium text-sm leading-relaxed">
                    We automatically collect certain information when you visit,
                    use or navigate our website. This information does not
                    reveal your specific identity (like your name or contact
                    information) but may include device and usage information,
                    such as your IP address, browser and device characteristics,
                    operating system, language preferences, referring URLs,
                    device name, country, location, information about how and
                    when you use our services and other technical information.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600">
                  <Lock size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 leading-none">
                  Security of Data
                </h2>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed">
                We use administrative, technical, and physical security measures
                to help protect your personal information. While we have taken
                reasonable steps to secure the personal information you provide
                to us, please be aware that despite our efforts, no security
                measures are perfect or impenetrable, and no method of data
                transmission can be guaranteed against any interception or other
                type of misuse.
              </p>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <aside className="relative">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                  Quick Links
                </h3>
                <nav className="space-y-2">
                  <Link
                    href="#overview"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <FileText size={16} className="text-primary-600" />
                    <span className="text-sm font-bold text-gray-700 group-hover:text-primary-600">
                      Overview
                    </span>
                  </Link>
                  <Link
                    href="#collection"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <Eye size={16} className="text-primary-600" />
                    <span className="text-sm font-bold text-gray-700 group-hover:text-primary-600">
                      Information We Collect
                    </span>
                  </Link>
                  <Link
                    href="#security"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <Lock size={16} className="text-primary-600" />
                    <span className="text-sm font-bold text-gray-700 group-hover:text-primary-600">
                      Security Practices
                    </span>
                  </Link>
                </nav>
              </div>

              <div className="bg-primary-900 p-8 rounded-[24px] shadow-xl text-white">
                <Mail size={32} className="text-[#10B981] mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Still have questions?
                </h3>
                <p className="text-primary-100 text-sm leading-relaxed mb-6">
                  Our privacy team is here to help you understand your data
                  rights.
                </p>
                <Link
                  href={ROUTES.CONTACT}
                  className="block w-full text-center bg-[#10B981] hover:bg-[#0ea874] text-white font-black py-4 rounded-xl transition-colors text-sm"
                >
                  CONTACT US
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
