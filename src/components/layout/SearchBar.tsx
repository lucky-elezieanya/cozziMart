
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
import { useCart } from "@/components/context/CartContext";
import Link from 'next/link'

import { useRouter } from "next/navigation";
import { products } from "@/data/products";

type ProductSearchProps = {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
};

const ProductSearch = ({
  query,
  setQuery,
  onSearch,
}: ProductSearchProps) => {
  const [focused, setFocused] = useState(false);

  const suggestions = query.trim()
    ? products
        .filter((product) => {
          const searchTerm = query.toLowerCase().trim();

          return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
          );
        })
        .slice(0, 5)
    : [];

  return (
    <div className="relative min-w-0 flex-1">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
          setFocused(false);
        }}
        className="flex w-full items-center overflow-hidden rounded-full border border-border bg-background-secondary transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10"
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setFocused(false);
          }}
          placeholder="Search for products..."
          aria-label="Search products"
          autoComplete="off"
          className="h-12 min-w-0 flex-1 border-0 bg-transparent px-5 font-body text-sm text-foreground outline-none placeholder:text-muted focus:ring-0"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="px-3 text-muted transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <button
          type="submit"
          aria-label="Search products"
          className="flex h-12 w-16 shrink-0 items-center justify-center bg-primary text-primary-foreground transition-colors hover:bg-primary-dark"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>

      {/* Search suggestions */}
      {focused && query.trim() && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xl">
          {suggestions.length > 0 ? (
            <>
              <p className="px-4 pb-2 pt-3 text-xs font-semibold uppercase tracking-wide text-muted">
                Suggested products
              </p>

              {suggestions.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  onClick={() => setFocused(false)}
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-mint"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-11 w-11 rounded-lg bg-background-secondary object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted">
                      {product.category}
                    </p>
                  </div>

                  <ChevronRight className="h-4 w-4 shrink-0 text-muted" />
                </Link>
              ))}

              <button
                type="button"
                onClick={() => {
                  onSearch();
                  setFocused(false);
                }}
                className="w-full border-t border-border px-4 py-3 text-left text-sm font-semibold text-primary transition-colors hover:bg-mint"
              >
                See all results for "{query}"
              </button>
            </>
          ) : (
            <div className="px-4 py-5">
              <p className="text-sm font-medium text-foreground">
                No matching products found.
              </p>
              <p className="mt-1 text-xs text-muted">
                Try another product name or category.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const SearchBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { cartCount } = useCart();
  const router = useRouter();

  const closeMenu = () => setMenuOpen(false);

  const handleSearch = () => {
    const searchTerm = searchQuery.trim();

    if (!searchTerm) {
      router.push("/products");
      return;
    }

    router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
  };

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
        <div className="flex min-w-0 flex-1">
          <ProductSearch
            query={searchQuery}
            setQuery={setSearchQuery}
            onSearch={handleSearch}
          />
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

            {/* cart */}
              <Link
              href="/cart"
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative text-primary transition-colors hover:text-secondary"
            >
              <ShoppingCart className="h-6 w-6" />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-secondary-foreground">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

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
            {/* Cart */}
          <Link
            href="/cart"
            aria-label={`Shopping cart with ${cartCount} items`}
            className="relative text-primary"
          >
            <ShoppingCart className="h-6 w-6" />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-secondary-foreground">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-4 w-full">
        <ProductSearch
          query={searchQuery}
          setQuery={setSearchQuery}
          onSearch={handleSearch}
        />
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
