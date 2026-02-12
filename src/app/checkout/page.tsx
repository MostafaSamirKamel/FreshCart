"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/Store/store";
import { clearCartApi } from "@/Store/Slices/cartSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/Constants/app.constants";
import CheckoutSteps, {
  type Step,
} from "@/Features/Checkout/Components/CheckoutSteps";
import PaymentSelector from "@/Features/Checkout/Components/PaymentSelector";
import BillingAddress from "@/Features/Checkout/Components/BillingAddress";
import CheckoutOrderSummary from "@/Features/Checkout/Components/CheckoutOrderSummary";
import CheckoutSuccess from "@/Features/Checkout/Components/CheckoutSuccess";
import CheckoutRecommendations, {
  type RecommendedProduct,
} from "@/Features/Checkout/Components/CheckoutRecommendations";

const checkoutSteps: Step[] = [
  { id: 1, label: "Cart", status: "completed" },
  { id: 2, label: "Review", status: "completed" },
  { id: 3, label: "Payment", status: "active" },
  { id: 4, label: "Complete", status: "inactive" },
];

const recommendedProducts: RecommendedProduct[] = [
  {
    id: "avg1",
    name: "Hass Avocados (2pcs)",
    category: "Fruits & Vegetables",
    price: 2.99,
    image:
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1975&auto=format&fit=crop",
  },
  {
    id: "ban1",
    name: "Organic Bananas (1kg)",
    category: "Fruits & Vegetables",
    price: 1.99,
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=2080&auto=format&fit=crop",
  },
  {
    id: "yog1",
    name: "Greek Yogurt (32oz)",
    category: "Dairy & Eggs",
    price: 4.49,
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "egg1",
    name: "Organic Brown Eggs (12pcs)",
    category: "Dairy & Eggs",
    price: 3.99,
    image:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "bro1",
    name: "Fresh Broccoli (1pc)",
    category: "Fruits & Vegetables",
    price: 1.79,
    image:
      "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function CheckoutPage() {
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("online");
  const [isSameAddress, setIsSameAddress] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = totalAmount;
  const discount = totalAmount * 0.2; // Mock 20% discount
  const delivery = 4.99;
  const tax = totalAmount * 0.08; // Mock 8% tax
  const finalTotal = subtotal - discount + delivery + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate Payment Processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (token) dispatch(clearCartApi(token));
      toast.success("Order confirmed!");
    }, 2000);
  };

  if (isSuccess) {
    return <CheckoutSuccess />;
  }

  return (
    <div className="bg-[#F9F9F9] min-h-screen pb-20">
      {/* 1. Header & Stepper */}
      <section className="bg-white border-b border-gray-100 py-8 mb-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-8 px-4">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">
            Checkout
          </h1>
          <CheckoutSteps steps={checkoutSteps} />
        </div>
      </section>

      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">
          {/* 2. Main Content (Left) */}
          <div className="space-y-8">
            <PaymentSelector
              paymentMethod={paymentMethod}
              onMethodChange={setPaymentMethod}
            />

            <BillingAddress
              isSameAddress={isSameAddress}
              onSameAddressChange={setIsSameAddress}
            />
          </div>

          {/* 3. Order Summary (Right) */}
          <CheckoutOrderSummary
            items={items}
            subtotal={subtotal}
            discount={discount}
            delivery={delivery}
            tax={tax}
            finalTotal={finalTotal}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onBackToCart={() => router.push(ROUTES.CART)}
          />
        </div>

        {/* 4. You Might Also Like Section */}
        <CheckoutRecommendations products={recommendedProducts} />
      </div>
    </div>
  );
}
