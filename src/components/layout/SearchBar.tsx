
'use client'

import { useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Heart,
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Home,
  Package,
  LogIn,
  Headset,
} from 'lucide-react'

const SearchBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <section id="search-bar" className="w-full bg-background">

      {/* ==================================================
          DESKTOP VERSION
      ================================================== */}
      <div className="hidden w-full px-6 py-3 md:block">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-8">

          {/* Logo */}
          <div className="flex shrink-0 items-center gap-2">
            <img
              src="/logo.png"
              alt="CozziMart logo"
              className="h-14 w-14 object-contain"
            />

            <h1 className="whitespace-nowrap font-heading text-2xl font-bold tracking-tight text-primary">
              Cozzi<span className="text-secondary">Mart</span>
            </h1>
          </div>

          {/* Search */}
          <div className="flex min-w-0 flex-1 items-center overflow-hidden rounded-full border border-border bg-background-secondary transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">

            <input
              type="text"
              placeholder="Search for products..."
              className="h-12 min-w-0 flex-1 border-0 bg-transparent px-5 font-body text-sm text-foreground outline-none placeholder:text-muted focus:ring-0"
            />

            <button
              type="button"
              aria-label="Search products"
              className="flex h-12 w-16 shrink-0 items-center justify-center bg-primary text-primary-foreground transition-colors hover:bg-primary-dark"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-5">

            <button
              type="button"
              aria-label="Wishlist"
              className="relative text-primary transition-colors hover:text-secondary"
            >
              <Heart className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                0
              </span>
            </button>

            <button
              type="button"
              aria-label="Shopping cart"
              className="relative text-primary transition-colors hover:text-secondary"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                0
              </span>
            </button>

            <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-heading text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
            >
              <User className="h-5 w-5" />
              <span className="whitespace-nowrap">My Account</span>
              <ChevronDown className="h-4 w-4" />
            </button>

          </div>
        </div>
      </div>


      {/* ==================================================
          MOBILE VERSION
      ================================================== */}
      <div className="block px-4 py-3 md:hidden">

        {/* Mobile Top Row */}
        <div className="flex items-center justify-between gap-3">

          {/* Menu Toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-primary transition-colors hover:bg-mint"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Logo */}
          <div className="flex min-w-0 items-center gap-1">
            <img
              src="/logo.png"
              alt="CozziMart logo"
              className="h-10 w-10 object-contain"
            />

            <h1 className="whitespace-nowrap font-heading text-xl font-bold tracking-tight text-primary">
              Cozzi<span className="text-secondary">Mart</span>
            </h1>
          </div>

          {/* Mobile Actions */}
          <div className="flex shrink-0 items-center gap-4">

            <button
              type="button"
              aria-label="Wishlist"
              className="hidden min-[380px]:block text-primary relative"
            >
              <Heart className="h-5 w-5" />
               <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                5
              </span>
            </button>

            <button
              type="button"
              aria-label="Shopping cart"
              className="relative text-primary"
            >
              <ShoppingCart className="h-6 w-6" />

              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                10
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-4 flex w-full items-center overflow-hidden rounded-full border border-border bg-background-secondary focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">

          <input
            type="text"
            placeholder="Search for products..."
            className="h-11 min-w-0 flex-1 border-0 bg-transparent px-4 text-sm text-foreground outline-none placeholder:text-muted focus:ring-0"
          />

          <button
            type="button"
            aria-label="Search products"
            className="flex h-11 w-12 shrink-0 items-center justify-center bg-primary text-primary-foreground hover:bg-primary-dark"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>


        {/* ==================================================
            MOBILE DROPDOWN MENU
        ================================================== */}
        <div
          className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out ${
            menuOpen
              ? 'mt-4 grid-rows-[1fr] opacity-100'
              : 'mt-0 grid-rows-[0fr] opacity-0 pointer-events-none'
          }`}
          aria-hidden={!menuOpen}
        >
          <div className="overflow-hidden">

            <div className="rounded-xl border border-border bg-surface p-3 shadow-md">

              {/* Account Header */}
              <div className="mb-3 flex items-center gap-3 rounded-lg bg-mint p-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <User className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <p className="font-heading text-sm font-semibold text-foreground">
                    Welcome to CozziMart
                  </p>
                  <p className="text-xs text-muted">
                    Sign in to enjoy your shopping.
                  </p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col">

                <a
                  href="/"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-mint hover:text-primary"
                >
                  <Home className="h-5 w-5 text-primary" />
                  Home
                  <ChevronRight className="ml-auto h-4 w-4 text-muted" />
                </a>

                <a
                  href="/products"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-mint hover:text-primary"
                >
                  <Package className="h-5 w-5 text-primary" />
                  Shop Products
                  <ChevronRight className="ml-auto h-4 w-4 text-muted" />
                </a>

                <a
                  href="/wishlist"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-mint hover:text-primary"
                >
                  <Heart className="h-5 w-5 text-primary" />
                  My Wishlist
                  <ChevronRight className="ml-auto h-4 w-4 text-muted" />
                </a>

                <a
                  href="/cart"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-mint hover:text-primary"
                >
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Shopping Cart
                  <ChevronRight className="ml-auto h-4 w-4 text-muted" />
                </a>

                <div className="my-2 border-t border-border" />

                <a
                  href="/account"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-mint hover:text-primary"
                >
                  <User className="h-5 w-5 text-primary" />
                  My Account
                  <ChevronRight className="ml-auto h-4 w-4 text-muted" />
                </a>

                <a
                  href="/login"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-mint hover:text-primary"
                >
                  <LogIn className="h-5 w-5 text-primary" />
                  Login / Register
                  <ChevronRight className="ml-auto h-4 w-4 text-muted" />
                </a>

                <a
                  href="/help"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-mint hover:text-primary"
                >
                  <Headset className="h-5 w-5 text-primary" />
                  Help & Support
                  <ChevronRight className="ml-auto h-4 w-4 text-muted" />
                </a>

              </nav>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default SearchBar
