
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Star,
  Eye,
  Check,
} from "lucide-react";
import { useCart, CartProduct } from "@/components/context/CartContext";

const formatPrice = (price: number) =>
  `₦${price.toLocaleString("en-NG")}`;

export const ProductCard = ({
  product,
}: {
  product: CartProduct;
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);

    window.setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <article className="product-card group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white p-2.5 shadow-sm sm:p-3">

      {/* Product Image */}
      <div className="relative isolate h-40 overflow-hidden rounded-xl bg-gradient-to-br from-[#E6F7F0] to-[#C8F0DF] sm:h-48 lg:h-44 xl:h-48">
        <Link
          href={`/products/${product.id}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="product-card-image h-full w-full object-cover"
          />
        </Link>

        {/* Product Badge */}
        {product.badge && (
          <span
            className={`absolute left-2.5 top-2.5 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold shadow-sm sm:text-xs ${
              product.badgeType === "sale"
                ? "product-sale-badge bg-secondary text-white"
                : product.badgeType === "new"
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          aria-pressed={isWishlisted}
          onClick={() =>
            setIsWishlisted((previous) => !previous)
          }
          className={`product-wishlist absolute right-2.5 top-2.5 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-sm backdrop-blur-md ${
            isWishlisted
              ? "bg-secondary text-white"
              : "bg-white/90 text-foreground hover:bg-secondary hover:text-white"
          }`}
        >
          <Heart
            className={`h-4 w-4 ${
              isWishlisted ? "fill-current" : ""
            }`}
          />
        </button>

        {/* Quick View */}
        <div className="product-card-overlay absolute inset-0 z-[5] flex items-end justify-center bg-primary/15 p-3">
          <Link
            href={`/products/${product.id}`}
            className="inline-flex translate-y-3 items-center gap-2 rounded-full border border-white/70 bg-white/95 px-4 py-2 text-xs font-bold text-primary shadow-md backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 hover:bg-primary hover:text-white"
          >
            <Eye className="h-4 w-4" />
            Quick View
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col px-1 pt-3">

        {/* Category */}
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary/70 sm:text-[11px]">
          {product.category}
        </p>

        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="line-clamp-2 min-h-10 font-heading text-xs font-semibold leading-5 text-foreground transition-colors hover:text-primary sm:text-sm">
            {product.name}
          </h3>
        </Link>

        {/* Short Description */}
        <p className="mt-1 line-clamp-2 min-h-8 text-[10px] leading-4 text-muted sm:text-xs">
          {product.description}
        </p>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5 text-amber-400">
            <Star className="h-3.5 w-3.5 fill-current" />
          </div>

          <span className="text-xs font-bold text-foreground">
            {product.rating}
          </span>

          <span className="text-[10px] text-muted">
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-heading text-sm font-extrabold text-primary sm:text-base">
            {formatPrice(product.price)}
          </span>

          {product.oldPrice && (
            <span className="text-[11px] text-muted line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Product Actions */}
        <div className="mt-3 grid grid-cols-2 gap-2">

          {/* View Product */}
          <Link
            href={`/products/${product.id}`}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-primary/20 bg-white px-2 py-2.5 text-[10px] font-bold text-primary transition-all duration-300 hover:border-primary hover:bg-mint sm:text-xs"
          >
            <Eye className="h-3.5 w-3.5" />
            View Product
          </Link>

          {/* Add to Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`product-cart-button flex items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-[10px] font-bold transition-all duration-300 sm:text-xs ${
              isAdded
                ? "bg-muted text-white"
                : "bg-secondary text-white hover:bg-secondary/70"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
