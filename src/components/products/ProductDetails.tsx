
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  MessageCircle,
  Package,
} from "lucide-react";

import { useCart, CartProduct } from "@/components/context/CartContext";

type ProductDetailsProps = {
  product: CartProduct;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);

export default function ProductDetails({
  product,
}: ProductDetailsProps) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const hasDiscount =
    product.oldPrice !== undefined &&
    product.oldPrice > product.price;

  const discount = hasDiscount
    ? Math.round(
        ((product.oldPrice! - product.price) /
          product.oldPrice!) *
          100
      )
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted sm:text-sm">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>

        <ChevronRight className="h-3 w-3" />

        <Link href="/products" className="hover:text-primary">
          Products
        </Link>

        <ChevronRight className="h-3 w-3" />

        <span className="text-foreground">
          {product.name}
        </span>
      </nav>

      {/* Back link */}
      <Link
        href="/products"
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-secondary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      {/* Main Product Section */}
      <section className="grid gap-8 rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-6 lg:grid-cols-2 lg:gap-12 lg:p-8">

        {/* Product Image */}
        <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-xl bg-background-secondary p-5 sm:min-h-[450px]">
          {product.badge && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-secondary px-4 py-2 text-xs font-bold text-white">
              {product.badge}
            </span>
          )}

          {hasDiscount && (
            <span className="absolute right-4 top-4 z-10 rounded-full bg-primary px-3 py-2 text-xs font-bold text-white">
              -{discount}%
            </span>
          )}

          <img
            src={product.image}
            alt={product.name}
            className="h-full max-h-[420px] w-full object-contain"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center">

          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
            {product.category}
          </p>

          <h1 className="font-heading text-2xl font-extrabold leading-tight text-foreground sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${
                    index < Math.round(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-border"
                  }`}
                />
              ))}
            </div>

            <span className="text-sm font-semibold text-foreground">
              {product.rating.toFixed(1)}
            </span>

            <span className="text-sm text-muted">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-6 border-y border-border py-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-heading text-3xl font-extrabold text-primary">
                {formatPrice(product.price)}
              </span>

              {hasDiscount && (
                <span className="text-lg text-muted line-through">
                  {formatPrice(product.oldPrice!)}
                </span>
              )}
            </div>

            {hasDiscount && (
              <p className="mt-2 text-sm font-semibold text-secondary">
                You save {formatPrice(product.oldPrice! - product.price)}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="mb-2 font-heading text-base font-bold text-foreground">
              Product Description
            </h2>

            <p className="text-sm leading-7 text-muted">
              {product.description}
            </p>
          </div>

          {/* Quantity */}
          <div className="mt-7">
            <p className="mb-3 text-sm font-semibold text-foreground">
              Quantity
            </p>

            <div className="flex w-fit items-center overflow-hidden rounded-full border border-border">
              <button
                type="button"
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="flex h-11 w-12 items-center justify-center text-foreground transition-colors hover:bg-mint disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="flex h-11 min-w-12 items-center justify-center border-x border-border text-sm font-bold">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  setQuantity((current) => current + 1)
                }
                aria-label="Increase quantity"
                className="flex h-11 w-12 items-center justify-center text-foreground transition-colors hover:bg-mint"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-secondary px-6 py-4 text-sm font-bold text-white transition-all hover:bg-secondary/70"
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setWishlisted(!wishlisted)}
              aria-label={
                wishlisted
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              className={`flex h-14 items-center justify-center rounded-full border px-6 transition-colors ${
                wishlisted
                  ? "border-secondary bg-secondary/10 text-secondary"
                  : "border-border text-foreground hover:border-secondary hover:text-secondary"
              }`}
            >
              <Heart
                className={`h-5 w-5 ${
                  wishlisted ? "fill-current" : ""
                }`}
              />
            </button>
          </div>

          {/* Shopping Benefits */}
          <div className="mt-8 grid gap-4 border-t border-border pt-6">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Convenient Delivery
                </p>
                <p className="text-xs text-muted">
                  Delivery options available at checkout.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Secure Shopping
                </p>
                <p className="text-xs text-muted">
                  Shop with confidence at CozziMart.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Customer Support
                </p>
                <p className="text-xs text-muted">
                  We're here to help with your shopping experience.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Product Reviews */}
      <section className="mt-10 rounded-2xl border border-border bg-surface p-5 sm:p-8">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Customer Feedback
            </p>

            <h2 className="mt-2 font-heading text-2xl font-extrabold text-foreground">
              Customer Reviews
            </h2>

            <p className="mt-1 text-sm text-muted">
              See what customers think about this product.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-background-secondary p-4">
            <div>
              <p className="font-heading text-3xl font-extrabold text-foreground">
                {product.rating.toFixed(1)}
                <span className="text-base text-muted">/5</span>
              </p>

              <div className="mt-1 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`h-3.5 w-3.5 ${
                      index < Math.round(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="h-10 border-l border-border" />

            <div>
              <p className="font-heading text-xl font-bold text-foreground">
                {product.reviews}
              </p>
              <p className="text-xs text-muted">
                Total reviews
              </p>
            </div>
          </div>
        </div>

        {/* Reviews placeholder */}
        <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background-secondary px-5 py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-mint">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>

          <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
            Individual reviews coming soon
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            Customer ratings are currently shown using the available
            product data. Individual customer comments and verified
            purchase reviews will appear here once review functionality
            is implemented.
          </p>
        </div>
      </section>

      {/* Back to Products */}
      <div className="mt-8 flex justify-center pb-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-mint"
        >
          <Package className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>

    </div>
  );
}
