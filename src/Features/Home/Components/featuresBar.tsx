import React from "react";
import { Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react";
import FeatureCard from "./featureCard";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on all your orders",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure payment methods",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "Return within 30 days for an exchange",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Contact us 24 hours a day, 7 days a week",
  },
];

export default function FeaturesBar() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
