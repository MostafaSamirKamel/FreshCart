"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

export interface Step {
  id: number;
  label: string;
  status: "active" | "inactive" | "completed" | string;
}

interface CheckoutStepsProps {
  steps: Step[];
}

export default function CheckoutSteps({ steps }: CheckoutStepsProps) {
  return (
    <nav className="flex items-center gap-4 md:gap-8">
      {steps.map((step, idx) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                step.status === "active" || step.status === "completed"
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-600/20"
                  : "bg-[#E5E5E5] text-gray-400"
              }`}
            >
              {step.id}
            </div>
            <span
              className={`text-sm font-black hidden sm:inline ${
                step.status === "active" || step.status === "completed"
                  ? "text-primary-600"
                  : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <ChevronRight size={18} className="text-gray-300" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
