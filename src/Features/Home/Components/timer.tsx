"use client";

import React, { useState, useEffect } from "react";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set a target date (e.g., end of the day)
    const targetDate = new Date();
    targetDate.setHours(23, 59, 59, 0);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-lg flex items-center justify-center text-primary-600 font-bold text-xl md:text-2xl shadow-sm border border-gray-100 mb-1">
        {value.toString().padStart(2, "0")}
      </div>
      <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex gap-3 md:gap-4">
      <TimeUnit label="Days" value={timeLeft.days} />
      <TimeUnit label="Hrs" value={timeLeft.hours} />
      <TimeUnit label="Mins" value={timeLeft.minutes} />
      <TimeUnit label="Secs" value={timeLeft.seconds} />
    </div>
  );
}
