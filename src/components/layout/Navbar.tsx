
"use client";

import React, { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import {
  ChevronDown,
  Headset,
  MapPin,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "Deals", href: "/deals" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const categories = [
  { name: "Electronics", href: "/categories/electronics" },
  { name: "Fashion", href: "/categories/fashion" },
  { name: "Phones & Tablets", href: "/categories/phones-tablets" },
  { name: "Home & Living", href: "/categories/home-living" },
  { name: "Health & Beauty", href: "/categories/health-beauty" },
  { name: "Sports & Outdoors", href: "/categories/sports-outdoors" },
  { name: "Groceries", href: "/categories/groceries" },
  { name: "Computers & Accessories", href: "/categories/computers" },
    { name: "Toys & Games", href: "/categories/toys-games" },
    
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileCategoriesOpen(false);
  };

  return (
    <section id="navbar" className="w-full shadow-md">
      {/* Top Bar */}
      <div className="hidden md:flex w-full items-center justify-between bg-primary px-6 py-2">
        <div className="flex items-center gap-4 text-primary-foreground">
          <span className="whitespace-nowrap text-sm">
            Free Shipping on orders over $50
          </span>

          <div className="h-4 w-px bg-primary-foreground/60" />

          <span className="whitespace-nowrap text-sm">
            Secure Payments
          </span>

          <div className="h-4 w-px bg-primary-foreground/60" />

          <span className="flex items-center gap-2 whitespace-nowrap text-sm">
            <Headset className="h-4 w-4 animate-pulse" />
            24/7 Customer Support
          </span>
        </div>

        <div className="flex items-center gap-4 text-primary-foreground">
          <Link href="/track-order" className="text-sm hover:text-secondary">
            Track Order
          </Link>

          <div className="h-4 w-px bg-primary-foreground/60" />

          <Link href="/help" className="text-sm hover:text-secondary">
            Help
          </Link>

          <div className="h-4 w-px bg-primary-foreground/60" />

          <Link href="/login" className="text-sm hover:text-secondary">
            Login / Register
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar />

      {/* Desktop Bottom Navigation */}
      <nav className="hidden md:flex w-full items-center justify-between gap-6 bg-primary px-6 py-3">
        {/* Categories Dropdown */}
        <div className="group relative shrink-0">
          <button
            type="button"
            className="flex items-center gap-2 text-sm font-medium text-primary-foreground transition-colors hover:text-secondary"
            aria-haspopup="true"
          >
            <Menu className="h-5 w-5" />
            All Categories
            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
          </button>

          {/* Dropdown Menu */}
          <div className="invisible absolute left-0 top-full z-50 w-64 translate-y-2 rounded-b-lg border border-border bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <div className="max-h-[calc(100vh-180px)] overflow-y-auto pb-3">

            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="block px-5 py-3 text-sm text-foreground transition-colors hover:bg-mint hover:text-primary"
              >
                {category.name}
              </Link>
            ))}
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center justify-center gap-5 lg:gap-8">
          {navLinks.map((link, index) => (
            <React.Fragment key={link.name}>
              <Link
                href={link.href}
                className="whitespace-nowrap text-sm font-medium text-primary-foreground transition-colors hover:text-secondary"
              >
                {link.name}
              </Link>

              {index !== navLinks.length - 1 && (
                <div className="h-4 w-px bg-primary-foreground/50" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Track Order */}
        <Link
          href="/track-order"
          className="flex shrink-0 items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary-dark hover:text-white"
        >
          <MapPin className="h-4 w-4" />
          Track Order
        </Link>
      </nav>

      {/* Mobile Navigation */}
      <div className="bg-primary md:hidden">
        {/* Mobile Menu Toggle */}
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold text-primary-foreground">
            Explore CozziMart
          </span>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenuOpen}
            className="rounded-md p-2 text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Expandable Mobile Menu */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-primary-foreground/20 px-4 pb-4">
              {/* Main Links */}
              <div className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="border-b border-primary-foreground/10 py-3 text-sm font-medium text-primary-foreground transition-colors hover:text-secondary"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Categories */}
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() =>
                    setMobileCategoriesOpen(!mobileCategoriesOpen)
                  }
                  aria-expanded={mobileCategoriesOpen}
                  className="flex w-full items-center justify-between py-3 text-sm font-semibold text-primary-foreground"
                >
                  <span className="flex items-center gap-2">
                    <Menu className="h-4 w-4" />
                    All Categories
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      mobileCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    mobileCategoriesOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="rounded-lg bg-primary-dark/60 py-2">
                      {categories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          onClick={closeMobileMenu}
                          className="block px-5 py-2.5 text-sm text-primary-foreground/90 transition-colors hover:bg-white/10 hover:text-secondary"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Utility Links */}
              <div className="mt-3 flex flex-col gap-3 border-t border-primary-foreground/20 pt-4">
                <Link
                  href="/track-order"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 text-sm text-primary-foreground hover:text-secondary"
                >
                  <MapPin className="h-4 w-4" />
                  Track Order
                </Link>

                <Link
                  href="/help"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 text-sm text-primary-foreground hover:text-secondary"
                >
                  <Headset className="h-4 w-4" />
                  Help & Customer Support
                </Link>

                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="text-sm text-primary-foreground hover:text-secondary"
                >
                  Login / Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
