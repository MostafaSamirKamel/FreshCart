"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICONS } from "@/Constants/icons.constants";
import Image from "next/image";
import loginImg from "@/assets/images/login-hero.png";

const benefits = [
  "Fresh & Organic Products",
  "Same-Day Delivery",
  "Secure Checkout",
  "Best Prices Guaranteed",
];

export default function LoginHero() {
  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left py-12 px-6">
      <div className="mb-12">
        <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.3em] mb-4 block">
          Welcome to FreshCart
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-[64px] font-black text-gray-900 leading-[0.9] tracking-tighter">
          Freshness <br />
          <span className="text-primary-600">at your door.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-gray-500 max-w-md font-bold leading-relaxed">
          Your trusted source for fresh groceries delivered right to your door.
        </p>
      </div>

      <div className="relative w-full aspect-square max-w-sm mb-16 group">
        <div className="absolute inset-0 bg-primary-600/10 rounded-full blur-[100px] group-hover:bg-primary-600/20 transition-all duration-1000"></div>
        <div className="w-full h-full relative rounded-[40px] overflow-hidden shadow-2xl border-4 border-white transform transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-1">
          <Image src={loginImg} alt="Login" fill className="object-cover" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white p-5 rounded-[20px] shadow-sm border border-gray-50 hover:shadow-xl hover:shadow-primary-900/5 transition-all group/benefit"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 group-hover/benefit:bg-primary-600 group-hover/benefit:text-white transition-colors">
              <FontAwesomeIcon icon={ICONS.common.check} className="text-lg" />
            </div>
            <span className="text-gray-900 font-black text-sm tracking-tight">
              {benefit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
