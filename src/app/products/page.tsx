import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Products from "@/components/sections/Products";


type ProductsPageProps = {
  searchParams: Promise<{
    search?: string | string[];
  }>;
};


async function ProductResults({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  const search = Array.isArray(params.search)
    ? params.search[0] ?? ""
    : params.search ?? "";

  return (
    <Products
      searchTerm={search}
      title={
        search
          ? `Search results for "${search}"`
          : "Explore All Products"
      }
      eyebrow={search ? "Search Results" : "Our Collection"}
      subtitle={
        search
          ? "Here are the products matching your search."
          : "Browse our collection and find exactly what you need."
      }
    />
  );
} 

export default function ProductsPage({
  searchParams,
}: ProductsPageProps) {
 
  return (
    <main className="min-h-screen bg-background-secondary">

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-muted">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-primary">Shop Products</span>
        </nav>
      </div>

      {/* Shopping Hero */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="relative isolate min-h-[260px] overflow-hidden rounded-2xl bg-gradient-to-br from-primary-dark via-primary to-primary-light px-6 py-9 sm:px-10 lg:min-h-[300px] lg:px-14">

          {/* Decorative Elements */}
          <div className="absolute -right-10 -top-20 -z-10 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="absolute -bottom-28 right-[25%] -z-10 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute right-10 top-10 -z-10 h-24 w-24 rotate-12 rounded-2xl border border-white/10 sm:right-24" />

          <div className="relative z-10 flex min-h-[210px] flex-col justify-center lg:w-[65%]">
            <span className="mb-4 w-fit rounded-full bg-white/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white sm:text-xs">
              Discover something special
            </span>

            <h1 className="max-w-xl font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Everything You Love,
              <span className="block text-secondary-light">
                All in One Place.
              </span>
            </h1>

            <p className="mt-4 max-w-lg text-xs leading-6 text-white/80 sm:text-sm sm:leading-7">
              Explore our collection of quality products across electronics,
              fashion, home essentials, beauty and more. Great finds are just
              a click away.
            </p>

            <Link
              href="#all-products"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold text-primary transition-all hover:-translate-y-1 hover:bg-secondary hover:text-white sm:text-sm"
            >
              Explore Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Decorative Shopping Icon */}
          <div className="absolute bottom-0 right-5 hidden h-full items-center justify-center sm:flex lg:right-16">
            <div className="flex h-40 w-40 rotate-[-8deg] items-center justify-center rounded-[2rem] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm lg:h-52 lg:w-52">
              <ShoppingBag className="h-20 w-20 text-white/90 lg:h-28 lg:w-28" />
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Benefits */}
      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-2 rounded-xl border border-border bg-surface px-3 py-4 shadow-sm sm:gap-5 sm:px-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <Truck className="h-5 w-5 shrink-0 text-primary sm:h-6 sm:w-6" />
            <div>
              <p className="text-[10px] font-bold text-foreground sm:text-xs">
                Great Delivery
              </p>
              <p className="hidden text-[10px] text-muted sm:block">
                Convenient shipping
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 border-x border-border px-2 sm:gap-3 sm:px-5">
            <ShieldCheck className="h-5 w-5 shrink-0 text-primary sm:h-6 sm:w-6" />
            <div>
              <p className="text-[10px] font-bold text-foreground sm:text-xs">
                Secure Shopping
              </p>
              <p className="hidden text-[10px] text-muted sm:block">
                Shop with confidence
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <ShoppingBag className="h-5 w-5 shrink-0 text-primary sm:h-6 sm:w-6" />
            <div>
              <p className="text-[10px] font-bold text-foreground sm:text-xs">
                Quality Products
              </p>
              <p className="hidden text-[10px] text-muted sm:block">
                Great value for money
              </p>
            </div>
          </div>
        </div>
      </section>

   {/* Products Listing */}
    <section id="all-products">
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-16 text-center">
            <p className="text-sm text-muted">
              Loading products...
            </p>
          </div>
        }
      >
        <ProductResults searchParams={searchParams} />
      </Suspense>
    </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-mint px-6 py-8 text-center sm:flex-row sm:px-10 sm:text-left">
          <div>
            <h2 className="font-heading text-lg font-extrabold text-primary sm:text-xl">
              Find Something You Love?
            </h2>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Explore our collection and discover your next favourite product.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-primary-dark"
          >
            Back to Home
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </main>
  );
}






