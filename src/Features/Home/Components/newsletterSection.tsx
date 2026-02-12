"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "react-toastify";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    // Simulate API call
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <section className="py-16">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-primary-600 px-8 py-12 md:px-16 md:py-16 text-white shadow-xl">
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary-800/20 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left max-w-lg">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Stay Home & Get Your Daily Necessities From Our Shop
              </h2>
              <p className="text-primary-100 text-lg">
                Start your daily shopping with{" "}
                <span className="font-bold text-white">FreshCart</span> and get
                exclusive offers.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md bg-white p-2 rounded-2xl flex items-center shadow-lg"
            >
              <div className="grow px-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full py-3 text-gray-800 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary rounded-xl! px-6! py-3! flex items-center gap-2"
              >
                <Send size={18} />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
