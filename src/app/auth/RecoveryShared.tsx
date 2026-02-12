"use client";

import React from "react";
import { ShieldCheck, Headset, HelpCircle, Mail } from "lucide-react";
import Link from "next/link";

interface RecoveryCardProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const RecoveryCard = ({ icon, children }: RecoveryCardProps) => {
  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-[500px]">
        <div className="bg-white rounded-[12px] p-10 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div className="flex justify-center mb-[25px]">
            <div className="w-20 h-20 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#00B207]">
              {icon}
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export const SecurityNotice = () => {
  return (
    <div className="mt-[30px] p-[15px_20px] bg-[#F0F9F4] border border-[#D4F4DD] rounded-lg flex gap-3">
      <div className="shrink-0 mt-0.5">
        <ShieldCheck size={20} className="text-[#00B207]" />
      </div>
      <div>
        <h4 className="text-[14px] font-bold text-[#1A1A1A] mb-1">
          Security Notice
        </h4>
        <p className="text-[13px] text-[#666666] leading-normal">
          For your security, a password reset link will be sent to your
          registered email address. The link will expire after 30 minutes.
        </p>
      </div>
    </div>
  );
};

interface HelpCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  href: string;
}

const HelpCard = ({
  icon,
  title,
  description,
  linkText,
  href,
}: HelpCardProps) => (
  <div className="bg-white border border-[#E5E5E5] rounded-lg py-7 px-6 text-center shadow-sm hover:shadow-md transition-shadow">
    <div className="w-[50px] h-[50px] bg-[#E8F5E9] rounded-full flex items-center justify-center text-[#00B207] mx-auto mb-5">
      {icon}
    </div>
    <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-2.5">{title}</h4>
    <p className="text-[14px] text-[#666666] leading-[1.5] mb-5">
      {description}
    </p>
    <Link
      href={href}
      className="text-[14px] font-bold text-[#00B207] hover:underline flex items-center justify-center gap-1"
    >
      {linkText} →
    </Link>
  </div>
);

export const HelpSection = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 pb-20 mt-[50px]">
      <h2 className="text-[24px] font-bold text-[#1A1A1A] text-center mb-[30px]">
        Need additional help?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HelpCard
          icon={<Headset size={24} />}
          title="Contact Support"
          description="Our customer support team is available 24/7 to assist you."
          linkText="Contact Us"
          href="/contact"
        />
        <HelpCard
          icon={<HelpCircle size={24} />}
          title="FAQs"
          description="Find answers to frequently asked questions about your account."
          linkText="View FAQs"
          href="/faqs"
        />
        <HelpCard
          icon={<Mail size={24} />}
          title="Email Not Received?"
          description="Check your spam folder or request a new reset link."
          linkText="Resend Email"
          href="#"
        />
      </div>
    </div>
  );
};
