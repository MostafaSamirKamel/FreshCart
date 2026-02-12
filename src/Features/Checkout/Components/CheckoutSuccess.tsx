"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/Constants/app.constants";

export default function CheckoutSuccess() {
  const router = useRouter();

  return (
    <main className="py-20 bg-white min-h-screen">
      <div className="container flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-[#F0F9F4] rounded-full flex items-center justify-center text-primary-600 mb-8 animate-bounce">
          <CheckCircle2 size={64} />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">
          Order Complete!
        </h1>
        <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg font-medium">
          Your payment was successful and your order is on its way. Confirmation
          has been sent to your email.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => router.push(ROUTES.ORDERS)}
            className="btn btn-primary px-10! py-4! font-black"
          >
            Track Order
          </button>
          <button
            onClick={() => router.push(ROUTES.HOME)}
            className="btn btn-outline px-10! py-4! font-black"
          >
            Return Home
          </button>
        </div>
      </div>
    </main>
  );
}
