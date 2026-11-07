import React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] w-full items-center justify-center bg-background px-4 py-16">
      <div className="container mx-auto flex max-w-2xl flex-col items-center text-center">
        
        {/* Animated or Styled Icon Container */}
        <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#006B3B]/10 text-[#006B3B] shadow-lg shadow-[#006B3B]/5 transition-transform hover:scale-105">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#006B3B] to-pink-500 opacity-20 blur"></div>
          <ShoppingBag className="relative h-12 w-12" />
        </div>

        {/* 404 Status Code */}
        <span className="mb-2 inline-block rounded-full bg-pink-500/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-pink-600">
          Error 404
        </span>

        {/* Heading */}
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Page not found
        </h1>

        {/* Description */}
        <p className="mt-3 max-w-md text-sm text-muted sm:text-base">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#006B3B] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#006B3B]/20 transition-all hover:bg-emerald-700 active:scale-95"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>

          <Link
            href="/categories"
            className="inline-flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10 active:scale-95"
          >
            <Search className="h-4 w-4" />
            Browse Categories
          </Link>
        </div>

        {/* Helpful Footer Links */}
        <div className="mt-12 border-t border-primary/10 pt-6 text-xs text-muted">
          Need assistance? Visit our{" "}
          <Link href="/help" className="font-semibold text-[#006B3B] underline hover:text-pink-600">
            Help & Customer Support
          </Link>
        </div>

      </div>
    </main>
  );
}