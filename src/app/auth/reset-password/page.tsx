"use client";

import React, { useState } from "react";
import {
  Key,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Circle,
} from "lucide-react";
import Link from "next/link";
import { RecoveryCard } from "../RecoveryShared";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const requirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One number", met: /[0-9]/.test(password) },
  ];

  return (
    <div className="bg-[#F9F9F9]">
      <RecoveryCard icon={<Key size={36} />}>
        <div className="text-center mb-[30px]">
          <h1 className="text-[28px] font-bold text-[#1A1A1A] mb-[15px]">
            Reset Password
          </h1>
          <p className="text-[14px] text-[#666666] leading-[1.6]">
            Enter your email address and new password to reset your account
            password.
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-[14px] font-medium text-[#333333] mb-2 text-left">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full h-[48px] border border-[#E5E5E5] rounded-md px-[15px] pl-[45px] text-[14px] focus:border-2 focus:border-[#00B207] outline-none transition-all"
              />
              <Mail
                size={18}
                className="absolute left-[15px] top-1/2 -translate-y-1/2 text-[#999999]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#333333] mb-2 text-left">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[48px] border border-[#E5E5E5] rounded-md px-[45px] text-[14px] focus:border-2 focus:border-[#00B207] outline-none transition-all"
              />
              <Lock
                size={18}
                className="absolute left-[15px] top-1/2 -translate-y-1/2 text-[#999999]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#00B207] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5 mt-3 mb-5">
            {requirements.map((req, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 text-[13px] ${req.met ? "text-[#00B207]" : "text-[#999999]"}`}
              >
                {req.met ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                <span>{req.label}</span>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#333333] mb-2 text-left">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-[48px] border border-[#E5E5E5] rounded-md px-[45px] text-[14px] focus:border-2 focus:border-[#00B207] outline-none transition-all"
              />
              <Lock
                size={18}
                className="absolute left-[15px] top-1/2 -translate-y-1/2 text-[#999999]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#00B207] transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button className="w-full h-[48px] bg-[#00B207] hover:bg-[#009606] text-white rounded-md font-semibold text-[15px] transition-colors mt-[25px]">
            Reset Password
          </button>
        </form>

        <div className="text-center mt-5">
          <p className="text-[14px] text-[#666666]">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="text-[#00B207] hover:underline font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </RecoveryCard>

      <div className="text-center mt-[30px] pb-12">
        <p className="text-[14px] text-[#666666]">
          Need help?{" "}
          <Link
            href="/contact"
            className="text-[#00B207] font-medium hover:underline"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
