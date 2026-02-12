"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { RecoveryCard } from "../RecoveryShared";

export default function VerifyCodePage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(183); // 03:03 in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus move logic
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <div className="bg-[#F9F9F9]">
      <RecoveryCard icon={<ShieldCheck size={36} />}>
        <div className="text-center mb-[30px]">
          <h1 className="text-[28px] font-bold text-[#1A1A1A] mb-[15px]">
            Verify Reset Code
          </h1>
          <p className="text-[14px] text-[#666666] mb-2.5">
            We've sent a verification code to your email address
          </p>
          <p className="text-[15px] font-medium text-[#00B207]">
            john.doe@example.com
          </p>
        </div>

        <div className="mb-[30px]">
          <label className="block text-[14px] text-[#333333] text-center mb-5 font-medium">
            Enter 6-digit verification code
          </label>
          <div className="flex justify-center gap-3">
            {code.map((digit, idx) => (
              <input
                key={idx}
                id={`code-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className={`w-[50px] h-[56px] border-2 rounded-lg text-center text-[24px] font-bold outline-none transition-all ${
                  digit
                    ? "border-[#00B207] bg-[#F0F9F4] text-[#1A1A1A]"
                    : "border-[#E5E5E5] bg-white text-gray-400 focus:border-[#00B207]"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mb-5">
          <p className="text-[13px] text-[#666666]">
            Code expires in{" "}
            <span className="text-[#00B207] font-bold">
              {formatTime(timer)}
            </span>
          </p>
        </div>

        <button
          disabled={!isCodeComplete}
          className={`w-full h-[48px] rounded-md font-semibold text-[15px] transition-colors ${
            isCodeComplete
              ? "bg-[#00B207] hover:bg-[#009606] text-white cursor-pointer"
              : "bg-[#CCCCCC] text-white cursor-not-allowed"
          }`}
        >
          Verify Code
        </button>

        <div className="text-center mt-[25px] space-y-2">
          <p className="text-[14px] text-[#666666]">Didn't receive the code?</p>
          <button className="text-[14px] font-bold text-[#00B207] hover:underline block mx-auto">
            Resend Code
          </button>
          <Link
            href="/auth/login"
            className="text-[14px] font-bold text-[#00B207] hover:underline block"
          >
            Back to Sign In
          </Link>
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
