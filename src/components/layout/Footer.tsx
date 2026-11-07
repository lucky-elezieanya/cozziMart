"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  Send,
  ShieldCheck,
  Truck,
  Headphones,
  RotateCcw,
} from "lucide-react";

import {connection} from "next/server"

const footerNavigation = {
  shop: [
    { name: "Electronics", href: "/categories/electronics" },
    { name: "Fashion & Clothing", href: "/categories/fashion" },
    { name: "Home & Living", href: "/categories/home-living" },
    { name: "Health & Beauty", href: "/categories/health-beauty" },
    { name: "Sports & Fitness", href: "/categories/sports" },
    { name: "Kitchen & Dining", href: "/categories/kitchen" },
  ],
  company: [
    { name: "About CozziMart", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Store Locations", href: "/stores" },
    { name: "Our Blog", href: "/blog" },
    { name: "Deals & Offers", href: "/deals" },
  ],
  support: [
    { name: "Help & FAQ", href: "/help" },
    { name: "Track Your Order", href: "/track-order" },
    { name: "Shipping & Delivery", href: "/shipping" },
    { name: "Returns & Exchanges", href: "/returns" },
    { name: "Contact Support", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Cookie Preferences", href: "#" },
  ],
  socials: [
    {
      name: "Instagram",
      href: "https://instagram.com",
      svg: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      svg: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.375 14.5 5 15.5 5H18V0h-3.808C10.59 0 9 1.581 9 4.75V8z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      svg: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      svg: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ],
};

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On eligible orders over ₦50,000",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Encrypted & 100% safe checkout",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated assistance anytime",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Hassle-free 7-day return policy",
  },
];


function CurrentYear(){
   const [year, setYear] = useState<string | null>(null);

  useEffect(() => {
    // This runs strictly on the client after hydration
    setYear(String(new Date().getFullYear()));
  }, []);

  return  <p className="text-center text-xs text-slate-500 md:text-left">
            © {year} <strong className="font-semibold text-slate-300">CozziMart</strong>. All rights reserved.
          </p>
} 

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300">
      {/* 1. Value Proposition Banner */}
      <div className="border-b border-slate-800 bg-slate-900/60 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-emerald-500/30 hover:bg-white/[0.04]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[rgba(0,107,59,0.2)] text-emerald-400">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Main Footer Grid */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Brand Info & Newsletter */}
          <div className="space-y-6 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl shadow-lg shadow-emerald-900/30">
                <img src="/logo.png" alt="cozziMart-logo" className="h-10 w-10 bg-transparent" />
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-white">
                Cozzi<span className="text-pink-500">Mart</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400">
              Your one-stop destination for quality lifestyle products, top-tier
              electronics, fashion, home essentials, and everyday savings delivered
              right to your doorstep.
            </p>

            {/* Newsletter Subscription */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Subscribe & Save 10%
              </h4>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-2"
              >
                <div className="relative w-full">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 sm:text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex shrink-0 items-center justify-center rounded-xl bg-[#006B3B] px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-all hover:bg-emerald-600 active:scale-95 sm:text-sm"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Top Categories
              </h3>
              <ul className="mt-4 space-y-2.5">
                {footerNavigation.shop.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 text-xs text-slate-400 transition-colors hover:text-emerald-400 sm:text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Customer Care
              </h3>
              <ul className="mt-4 space-y-2.5">
                {footerNavigation.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 text-xs text-slate-400 transition-colors hover:text-emerald-400 sm:text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Get in Touch
              </h3>
              <ul className="mt-4 space-y-3.5 text-xs text-slate-400 sm:text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>123 Commerce Way, Victoria Island, Lagos, Nigeria</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-emerald-400" />
                  <a
                    href="tel:+2348000000000"
                    className="transition-colors hover:text-emerald-400"
                  >
                    +234 (0) 800 000 0000
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-emerald-400" />
                  <a
                    href="mailto:support@cozzimart.com"
                    className="transition-colors hover:text-emerald-400"
                  >
                    support@cozzimart.com
                  </a>
                </li>
              </ul>

              {/* Social Links */}
              <div className="mt-6 flex items-center gap-2">
                {footerNavigation.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-800/50 text-slate-400 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400"
                  >
                    {social.svg}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950/80 py-6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:px-6 md:flex-row lg:px-8">
         {/* year */}
         <CurrentYear/>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            {footerNavigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="transition-colors hover:text-emerald-400"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="rounded bg-slate-800 px-2 py-1 font-mono text-[10px] text-slate-300 border border-slate-700">
              PAYSTACK
            </span>
            <span className="rounded bg-slate-800 px-2 py-1 font-mono text-[10px] text-slate-300 border border-slate-700">
              FLUTTERWAVE
            </span>
            <span className="rounded bg-slate-800 px-2 py-1 font-mono text-[10px] text-slate-300 border border-slate-700">
              VISA / MC
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;