"use client";

import React from "react";
import { Lock, Mail, Send } from "lucide-react";
import Link from "next/link";
import { RecoveryCard, SecurityNotice, HelpSection } from "../RecoveryShared";

export default function ForgotPasswordPage() {
  return (
    <div className="bg-[#F9F9F9]">
      <RecoveryCard icon={<Lock size={36} />}>
        <div className="text-center mb-[30px]">
          <h1 className="text-[28px] font-bold text-[#1A1A1A] mb-[15px]">
            Forgot your password?
          </h1>
          <p className="text-[14px] text-[#666666] leading-[1.6] max-w-[400px] mx-auto">
            No worries! Enter your email address and we'll send you a link to
            reset your password.
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-[14px] font-medium text-[#333333] mb-2 text-left">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Your registered email address"
                className="w-full h-[48px] border border-[#E5E5E5] rounded-md px-[15px] pr-[45px] text-[14px] focus:border-2 focus:border-[#00B207] outline-none transition-all"
              />
              <Mail
                size={18}
                className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#999999]"
              />
            </div>
          </div>

          <button className="w-full h-[48px] bg-[#00B207] hover:bg-[#009606] text-white rounded-md font-semibold text-[15px] flex items-center justify-center gap-2 transition-colors mt-[25px]">
            <Send size={18} className="rotate-15" />
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-5">
          <p className="text-[14px] text-[#666666]">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="text-[#00B207] hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>

        <SecurityNotice />
      </RecoveryCard>

      <HelpSection />
    </div>
  );
}
