"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICONS } from "@/Constants/icons.constants";

import authorImg from "@/assets/images/review-author.png";
import Image from "next/image";

const features = [
  {
    icon: ICONS.auth.leaf,
    title: "Fresh & Organic",
    description: "Premium quality products sourced directly from farms",
  },
  {
    icon: ICONS.auth.truckFast,
    title: "Fast Delivery",
    description: "Same-day delivery available in most areas",
  },
  {
    icon: ICONS.auth.shield,
    title: "Secure Shopping",
    description: "Your data and payments are completely secure",
  },
];

export default function SignupHero() {
  return (
    <div className="flex flex-col gap-10 py-10">
      {/* Main Heading Area */}
      <section>
        <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.3em] mb-4 block">
          Since 2026
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-[64px] font-black tracking-tight leading-[0.9] text-gray-900">
          Start your <span className="text-primary-600">Fresh</span> journey
          with us.
        </h1>
        <p className="mt-6 text-gray-500 text-lg md:text-xl max-w-lg font-medium leading-relaxed">
          Join thousands of happy customers who enjoy fresh groceries delivered
          right to their doorstep.
        </p>
      </section>

      {/* Feature List */}
      <div className="flex flex-col gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-5 group">
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-white shadow-lg shadow-primary-600/5 flex items-center justify-center text-primary-600 border border-primary-50 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
              <FontAwesomeIcon icon={feature.icon} className="text-xl" />
            </div>
            <div>
              <h3 className="font-black text-gray-900 text-lg leading-tight mb-1">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm font-medium">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial Card */}
      <div className="bg-white p-8 rounded-[32px] shadow-2xl shadow-primary-900/5 border border-gray-100 max-w-sm relative overflow-hidden group/card">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-50 rounded-full opacity-50 group-hover/card:scale-150 transition-transform duration-700" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-md border-2 border-white bg-gray-100">
              <Image
                src={authorImg}
                alt="Sarah Johnson"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-black text-gray-900 leading-none mb-1.5">
                Sarah Johnson
              </h4>
              <div className="flex text-yellow-400 text-[10px] gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={ICONS.common.star} />
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-600 font-bold italic leading-relaxed text-sm">
            &quot;FreshCart has completely changed how I shop for groceries. The
            quality is amazing and delivery is always on time!&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
