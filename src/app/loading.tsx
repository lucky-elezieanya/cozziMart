import React from "react";
import { ShoppingBag } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-white px-4">
      <div className="relative flex flex-col items-center justify-center space-y-6">
        
        {/* Outer Rotating Glowing Ring */}
        <div className="absolute h-24 w-24 rounded-full border-4 border-[#006B3B]/10 border-t-[#006B3B] animate-spin"></div>

        {/* Inner Pulsing Brand Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#006B3 text-white shadow-xl shadow-[#006B3B]/20 animate-pulse">
          <img src="/logo.png" alt="cozziMart-logo" className="h-15 w-15" />
          {/* <ShoppingBag className="h-8 w-8" /> */}
        </div>

        {/* Loading Text & Subtle Dots */}
        <div className="text-center">
          <h3 className="font-heading text-lg font-bold text-slate-800">
            Cozzi<span className="text-pink-500">Mart</span>
          </h3>
          <p className="mt-1 flex items-center justify-center gap-1 text-xs font-medium text-slate-400">
            <span>Loading your experience</span>
            <span className="flex gap-0.5">
              <span className="animate-bounce [animation-delay:-0.8s]">.</span>
              <span className="animate-bounce [animation-delay:-0.32s]">.</span>
              <span className="animate-bounce">.</span>
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}