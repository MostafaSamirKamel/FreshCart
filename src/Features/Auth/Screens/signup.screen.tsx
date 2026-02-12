"use client";

import SignupHero from "../Components/signup/signupHero";
import SignupForm from "../Components/signup/signupForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICONS } from "@/Constants/icons.constants";

const benefits = [
  {
    icon: ICONS.auth.truckFast,
    title: "Faster Checkout",
    description:
      "Save your delivery information for a quicker shopping experience.",
  },
  {
    icon: ICONS.auth.tag,
    title: "Exclusive Deals",
    description:
      "Get access to member-only discounts and early sale notifications.",
  },
  {
    icon: ICONS.auth.clock,
    title: "Order History",
    description:
      "Easily track and reorder your favorite products from past purchases.",
  },
];

export default function SignupScreen() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Section - Hero */}
          <div className="order-2 lg:order-1">
            <SignupHero />
          </div>

          {/* Right Section - Form */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <SignupForm />
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-24 md:mt-32 border-t border-gray-100 pt-16 md:pt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Create an Account with FreshCart?
            </h2>
            <div className="mt-4 w-20 h-1.5 bg-[#10B981] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981] mb-6">
                  <FontAwesomeIcon icon={benefit.icon} className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
