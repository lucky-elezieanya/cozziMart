
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const formatPrice = (price: number) =>
  `₦${price.toLocaleString("en-NG")}`;

const Cart = () => {
  const {
    cartItems,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
  } = useCart();

  return (
    <section className="min-h-screen w-full bg-background-secondary px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8">
          <Link
            href="/products"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
                Shopping Cart
              </h1>
              <p className="mt-1 text-sm text-muted">
                Review your items before proceeding to checkout.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-sm font-semibold text-primary">
              <ShoppingCart className="h-4 w-4" />
              {cartCount} {cartCount === 1 ? "Item" : "Items"}
            </div>
          </div>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-border bg-surface px-5 py-12 text-center shadow-sm">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-mint">
              <ShoppingBag className="h-10 w-10 text-primary" />
            </div>

            <h2 className="font-heading text-xl font-bold text-foreground">
              Your cart is empty
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
              Looks like you haven't added anything to your cart yet.
              Explore our products and find something you'll love.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-dark"
            >
              Start Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px]">

            {/* Cart Items */}
            <div className="space-y-4">
              <div className="hidden rounded-xl border border-border bg-surface px-6 py-4 sm:grid sm:grid-cols-[1fr_120px_130px] sm:items-center sm:gap-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">
                  Product
                </p>
                <p className="text-center text-xs font-bold uppercase tracking-wider text-muted">
                  Quantity
                </p>
                <p className="text-right text-xs font-bold uppercase tracking-wider text-muted">
                  Subtotal
                </p>
              </div>

              {cartItems.map((item) => {
                const product = item.product;

                return (
                  <div
                    key={product.id}
                    className="rounded-xl border border-border bg-surface p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_120px_130px] sm:items-center sm:gap-4">

                      {/* Product Details */}
                      <div className="flex min-w-0 gap-3 sm:gap-4">
                        <Link
                          href={`/products/${product.id}`}
                          className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-mint sm:h-28 sm:w-28"
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 96px, 112px"
                            className="object-contain p-2"
                          />
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-secondary sm:text-xs">
                            {product.category}
                          </p>

                          <Link
                            href={`/products/${product.id}`}
                            className="mt-1 line-clamp-2 font-heading text-sm font-bold text-foreground transition-colors hover:text-primary sm:text-base"
                          >
                            {product.name}
                          </Link>

                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">
                            {product.description}
                          </p>

                          <p className="mt-2 font-heading text-sm font-extrabold text-primary sm:hidden">
                            {formatPrice(product.price)}
                          </p>

                          <button
                            type="button"
                            onClick={() => removeFromCart(product.id)}
                            className="mt-2 flex w-fit items-center gap-1 text-xs font-semibold text-red-500 transition-colors hover:text-red-700"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between sm:justify-center">
                        <span className="text-xs font-semibold text-muted sm:hidden">
                          Quantity
                        </span>

                        <div className="flex items-center overflow-hidden rounded-full border border-border">
                          <button
                            type="button"
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              updateQuantity(product.id, item.quantity - 1)
                            }
                            aria-label={`Decrease quantity of ${product.name}`}
                            className="flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:bg-mint disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>

                          <span className="flex h-9 min-w-9 items-center justify-center text-sm font-bold text-foreground">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product.id, item.quantity + 1)
                            }
                            aria-label={`Increase quantity of ${product.name}`}
                            className="flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:bg-mint"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Item Subtotal */}
                      <div className="hidden text-right sm:block">
                        <p className="font-heading text-sm font-extrabold text-primary">
                          {formatPrice(product.price * item.quantity)}
                        </p>
                        <p className="mt-1 text-xs text-muted">
                          {formatPrice(product.price)} each
                        </p>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <aside className="rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">
              <h2 className="font-heading text-lg font-bold text-foreground">
                Order Summary
              </h2>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">
                    Subtotal ({cartCount} items)
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Shipping</span>
                  <span className="text-xs font-semibold text-primary">
                    Calculated at checkout
                  </span>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-base font-bold text-foreground">
                      Estimated Total
                    </span>
                    <span className="font-heading text-xl font-extrabold text-primary">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-muted">
                    Shipping fees, if applicable, will be calculated during checkout.
                  </p>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-lg"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/products"
                className="mt-3 flex w-full items-center justify-center rounded-full border border-primary px-5 py-3 text-sm font-bold text-primary transition-colors hover:bg-mint"
              >
                Continue Shopping
              </Link>

              <div className="mt-6 space-y-3 border-t border-border pt-5">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <ShoppingBag className="h-4 w-4 text-primary" />
                  Quality products at great prices
                </div>

                <div className="flex items-center gap-2 text-xs text-muted">
                  <ShoppingCart className="h-4 w-4 text-primary" />
                  Convenient shopping experience
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
