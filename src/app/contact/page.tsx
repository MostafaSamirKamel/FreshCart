import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Clock,
  ArrowLeft,
  Send,
  Headphones,
} from "lucide-react";
import { ROUTES } from "@/Constants/app.constants";

export const metadata = {
  title: "Contact Us - FreshCart",
  description:
    "Get in touch with FreshCart support for any inquiries or assistance.",
};

export default function ContactPage() {
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
            Get in touch
          </h1>
          <p className="text-gray-500 mt-4 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            Have a question or feedback? We&apos;re here to help you. Choose
            your preferred way to reach our support team.
          </p>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          {/* Main Content: Contact Form */}
          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
                <MessageSquare size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 leading-none">
                  Send a Message
                </h2>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">
                  Expect a response within 24 hours
                </p>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-600/5 focus:bg-white focus:border-primary-100 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-600/5 focus:bg-white focus:border-primary-100 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
                  Subject
                </label>
                <select className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-600/5 focus:bg-white focus:border-primary-100 outline-none transition-all appearance-none cursor-pointer">
                  <option>Select an inquiry type</option>
                  <option>Order Status</option>
                  <option>Delivery Feedback</option>
                  <option>Product Question</option>
                  <option>Technical Issue</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
                  Your Message
                </label>
                <textarea
                  rows={6}
                  placeholder="How can we help you today?"
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-600/5 focus:bg-white focus:border-primary-100 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-black py-5 rounded-[20px] shadow-xl shadow-primary-600/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                <Send size={18} />
                SEND MESSAGE
              </button>
            </form>
          </div>

          {/* Sidebar: Direct Contact & Locations */}
          <aside className="space-y-8">
            {/* Quick Contact Cards */}
            <div className="bg-gray-900 p-10 rounded-[40px] shadow-2xl text-white relative overflow-hidden group">
              {/* Pattern mask */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:15px_15px]"></div>

              <div className="relative z-10 space-y-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#10B981] rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                    <Headphones size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Live Support</h3>
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mt-1">
                      Available 24/7
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex gap-5">
                    <Mail className="text-[#10B981] shrink-0" size={24} />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
                        Email Us
                      </p>
                      <p className="text-lg font-bold">support@freshcart.com</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <Phone className="text-[#10B981] shrink-0" size={24} />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
                        Call Us
                      </p>
                      <p className="text-lg font-bold">+1 (800) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <Clock className="text-[#10B981] shrink-0" size={24} />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
                        Working Hours
                      </p>
                      <p className="text-lg font-bold">
                        Mon - Sun: 08AM - 10PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <MapPin size={22} className="text-primary-600" />
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">
                  Main Office
                </h3>
              </div>
              <p className="text-gray-500 font-medium leading-relaxed text-sm mb-6">
                123 Fresh Way, Suite 500
                <br />
                San Francisco, CA 94103
                <br />
                United States
              </p>
              <Link
                href="https://maps.google.com"
                target="_blank"
                className="inline-flex items-center gap-2 text-xs font-black text-primary-600 hover:gap-3 transition-all"
              >
                OPEN IN GOOGLE MAPS
                <ArrowLeft size={14} className="rotate-180" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
