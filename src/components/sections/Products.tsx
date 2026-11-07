
"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Search,
} from "lucide-react";
import { ProductCard } from "../products/ProductCard";

import { products } from "@/data/products";

type ProductsProps = {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  searchTerm?: string;
};

const Products = ({
  title = "Featured Products",
  subtitle = "Discover quality products at amazing prices.",
  eyebrow = "Handpicked for you",
  searchTerm = "",
}: ProductsProps) => {
  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase().trim();

    if (!term) return true;

    return (
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  });


  return (
    <section id="products" className="w-full px-4 py-8 sm:px-8 lg:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            {eyebrow}
            </p>
            <h2 className="font-heading text-xl font-extrabold text-primary sm:text-2xl lg:text-3xl">
              {title}
            </h2>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              {subtitle}
            </p>
          </div>

          <Link
            href="/products"
            className="group inline-flex shrink-0 items-center gap-1 text-xs font-bold text-primary transition-colors hover:text-secondary sm:text-sm"
          >
            View All
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        {/* Empty state */}
        {filteredProducts.length === 0 && (
        <div className="col-span-full py-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-mint">
            <Search className="h-7 w-7 text-primary" />
          </div>

          <h3 className="font-heading text-lg font-semibold text-foreground">
            No products found
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
            We couldn't find any products matching "{searchTerm}". Try a different
            search term.
          </p>

          <Link
            href="/products"
            className="mt-5 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            View all products
          </Link>
        </div>
      )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
