import React from "react";
import Link from "next/link";
import {
  HelpCircle,
  ShoppingBag,
  Truck,
  RotateCcw,
  CreditCard,
  User,
  Search,
  ArrowLeft,
  ChevronRight, 
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import { ROUTES } from "@/Constants/app.constants";

export const metadata = {
  title: "Help Center - FreshCart",
  description:
    "Find answers to common questions and get support from the FreshCart team.",
};

const faqCategories = [
  {
    icon: ShoppingBag,
    title: "Orders & Purchases",
    description: "Track orders, manage purchases, and handle cancellations",
    questions: [
      "How do I track my order?",
      "Can I cancel or modify my order?",
      "What payment methods do you accept?",
    ],
  },
  {
    icon: Truck,
    title: "Shipping & Delivery",
    description: "Delivery times, shipping costs, and coverage areas",
    questions: [
      "How long does delivery take?",
      "Do you offer free shipping?",
      "What areas do you deliver to?",
    ],
  },
  {
    icon: RotateCcw,
    title: "Returns & Refunds",
    description: "Return policies, refund process, and exchange options",
    questions: [
      "What is your return policy?",
      "How do I request a refund?",
      "Can I exchange an item?",
    ],
  },
  {
    icon: CreditCard,
    title: "Payments & Billing",
    description: "Payment options, billing issues, and promo codes",
    questions: [
      "Is my payment information secure?",
      "How do I apply a promo code?",
      "Why was my payment declined?",
    ],
  },
  {
    icon: User,
    title: "Account & Profile",
    description: "Account settings, privacy, and security options",
    questions: [
      "How do I reset my password?",
      "How do I update my email address?",
      "How do I delete my account?",
    ],
  },
  {
    icon: Search,
    title: "Products & Availability",
    description: "Product info, stock status, and quality assurance",
    questions: [
      "How do I check product availability?",
      "Are your products organic?",
      "How do you ensure freshness?",
    ],
  },
];

export default function HelpPage() {
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
            BACK TO HOME
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Help Center
          </h1>
          <p className="text-gray-500 mt-4 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            Find quick answers to common questions or get in touch with our
            support team. We&apos;re here to help!
          </p>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4">
        {/* FAQ Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {faqCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary-100 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <h2 className="text-lg font-black text-gray-900">
                    {category.title}
                  </h2>
                </div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">
                  {category.description}
                </p>
                <ul className="space-y-3">
                  {category.questions.map((question) => (
                    <li key={question} className="flex items-start gap-3">
                      <ChevronRight
                        size={16}
                        className="text-primary-600 shrink-0 mt-0.5"
                      />
                      <span className="text-sm font-medium text-gray-600 leading-snug">
                        {question}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Contact Support Section */}
        <div className="bg-gray-900 p-10 md:p-16 rounded-[40px] shadow-2xl text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:15px_15px]"></div>

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-[#10B981] rounded-3xl flex items-center justify-center text-white mx-auto mb-6">
              <HelpCircle size={32} />
            </div>
            <h2 className="text-3xl font-black mb-4">Still need help?</h2>
            <p className="text-gray-400 font-medium mb-10 leading-relaxed">
              Can&apos;t find what you&apos;re looking for? Our support team is
              available around the clock to assist you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={ROUTES.CONTACT}
                className="inline-flex items-center gap-3 bg-[#10B981] hover:bg-[#0EA271] text-white font-black py-4 px-8 rounded-[20px] shadow-xl shadow-[#10B981]/20 transition-all active:scale-[0.98]"
              >
                <MessageSquare size={18} />
                CONTACT US
              </Link>
              <a
                href="mailto:support@freshcart.com"
                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-black py-4 px-8 rounded-[20px] transition-all active:scale-[0.98]"
              >
                <Mail size={18} />
                EMAIL SUPPORT
              </a>
              <a
                href="tel:+18001234567"
                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-black py-4 px-8 rounded-[20px] transition-all active:scale-[0.98]"
              >
                <Phone size={18} />
                CALL US
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
