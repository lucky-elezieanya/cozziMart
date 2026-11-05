
import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Laptop,
  Shirt,
  House,
  Flower2,
  Volleyball,
  BookOpen,
  ToyBrick,
  Ellipsis,
  Truck,
  ShieldCheck,
  Headset,
} from "lucide-react";

const categories = [
  { name: "Electronics", href: "/categories/electronics", icon: Laptop },
  { name: "Fashion & Clothing", href: "/categories/fashion", icon: Shirt },
  { name: "Home & Living", href: "/categories/home-living", icon: House },
  { name: "Beauty & Health", href: "/categories/beauty-health", icon: Flower2 },
  { name: "Sports & Fitness", href: "/categories/sports", icon: Volleyball },
  { name: "Books & Stationery", href: "/categories/books", icon: BookOpen },
  { name: "Toys & Games", href: "/categories/toys-games", icon: ToyBrick },
  { name: "More Categories", href: "/categories", icon: Ellipsis },
];

const benefits = [
  {
    title: "Free Shipping",
    description: "On orders over ₦50,000",
    icon: Truck,
  },
  {
    title: "Secure Payments",
    description: "Shop with confidence",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Support",
    description: "We're here to help",
    icon: Headset,
  },
];

const Hero = () => {
  return (
    <section id="hero" className="w-full bg-white py-0 sm:py-">
      <div className="mx-auto max-w-[1600px] px-3 sm:px-5">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[250px_minmax(0,1fr)]">

          {/* CATEGORY SIDEBAR */}
          <aside className="hidden rounded-xl border border-border bg-white p-4 shadow-sm lg:block">
            <div className="mb-3 flex items-center gap-3 border-b border-border pb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-mint">
                <House className="h-5 w-5 text-primary" />
              </div>

              <h2 className="font-heading text-base font-bold text-foreground">
                Shop by Category
              </h2>
            </div>

            <nav className="flex flex-col">
              {categories.slice(0, 6).map((category) => {
                const Icon = category.icon;

                return (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="group flex items-center justify-between gap-2 rounded-lg px-2 py-[11px] text-sm font-medium text-foreground transition-all duration-200 hover:bg-mint hover:text-primary"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5 shrink-0 text-foreground transition-colors group-hover:text-primary" />
                      {category.name}
                    </span>

                    <ChevronRight className="h-4 w-4 shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                );
              })}
              <Link
                    key="more"
                    href="/categories"
                    className="group flex items-center justify-between gap-2 rounded-lg px-2 py-[11px] text-sm font-medium text-foreground transition-all duration-200 hover:bg-mint hover:text-primary"
                  >
                    <span className="flex items-center gap-3">
                      <Ellipsis className="h-5 w-5 shrink-0 text-foreground transition-colors group-hover:text-primary" />
                      More Categories
                    </span>

                    <ChevronRight className="h-4 w-4 shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
            </nav>
          </aside>

          {/* MAIN PROMOTIONAL BANNER */}
          <div className="relative isolate min-h-[340px] overflow-hidden rounded-xl bg-gradient-to-br from-[#E6F7F0] via-[#D4F1E3] to-[#A9E5C4] sm:min-h-[400px] md:min-h-[390px] lg:h-[365px] lg:min-h-0">

            {/* Decorative background shapes */}
            <div className="absolute -right-20 -top-32 -z-10 h-[400px] w-[400px] rounded-full bg-white/40 blur-2xl" />

            <div className="absolute -bottom-40 left-[35%] -z-10 h-[350px] w-[350px] rounded-full bg-primary/10 blur-3xl" />

            <div className="absolute right-[28%] top-0 -z-10 hidden h-full w-32 rotate-[35deg] bg-white/20 lg:block" />

            {/* HERO TEXT */}
            <div className="relative z-20 flex min-h-[340px] w-full flex-col items-start justify-center px-5 py-8 sm:min-h-[400px] sm:w-[65%] sm:px-7 md:min-h-[390px] md:w-[60%] md:px-8 lg:min-h-0 lg:h-full lg:w-[58%] lg:px-10 lg:py-6 xl:w-[58%]">

              <p className="mb-2 font-heading text-sm font-bold tracking-wide text-secondary sm:text-base">
                Shop Smart. Live Better.
              </p>

              <h1 className="max-w-[530px] font-heading text-3xl font-extrabold leading-[1.08] tracking-tight text-primary sm:text-4xl md:text-[2.5rem] lg:text-[2.8rem] xl:text-5xl">
                Premium Quality Products at{" "}
                <br className="hidden sm:inline" />
                <span className="text-secondary">
                  Amazing Prices
                </span>
              </h1>

              <p className="mt-4 max-w-[380px] text-sm font-medium leading-6 text-foreground sm:text-base">
                Discover a world of quality products, delivered to your
                doorstep.
              </p>

              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-secondary px-7 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-secondary-dark hover:shadow-lg"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

         
          {/* SHOPPING MODEL IMAGE */}
          <div
            className="
              pointer-events-none absolute inset-y-0 right-0 z-20
              hidden w-[43%] items-end justify-center
              sm:flex
              sm:w-[43%]
              md:w-[45%]
              lg:right-[5%] lg:w-[43%]
              xl:right-[19%] xl:w-[39%]
            "
          >
            <img
              src="/assets/banner.png"
              alt="Shop with CozziMart"
              className="
                h-full w-full
                object-contain object-bottom
                origin-bottom
                scale-[1.4]
                -rotate-1
                lg:scale-[1.3]
                lg:-rotate-1
                xl:scale-[1.2]
              "
            />
          </div>


          
            {/* PINK DECORATIVE MARKS - BEHIND MODEL */}
            <div className="
              pointer-events-none absolute
              right-[28%] top-12 z-10
              hidden md:flex md:right-[29px] rotate-[18deg] items-start gap-2
              lg:flex xl:right-[24%]
            ">
              <span className="
                h-10 w-2.5 rounded-full bg-secondary
                rotate-[-38deg]
              " />

              <span className="
                mt-3 h-12 w-2.5 rounded-full bg-secondary
                rotate-[28deg]
              " />

              <span className="
                mt-7 h-10 w-2.5 rounded-full bg-secondary
                rotate-[72deg]
              " />
            </div>


            {/* BENEFIT CARDS */}
            <div className="absolute right-5 top-1/2 z-20 hidden w-[180px] -translate-y-1/2 flex-col gap-3 xl:flex">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="flex min-h-[88px] items-center gap-3 rounded-2xl border border-white/60 bg-white/75 px-4 py-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-x-1 hover:bg-white"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-heading text-sm font-bold leading-tight text-foreground">
                        {benefit.title}
                      </h3>

                      <p className="mt-1 text-[11px] leading-4 text-foreground/75">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CAROUSEL INDICATORS */}
            <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 sm:left-[35%] lg:left-[35%]">
              <button
                aria-label="Slide 1"
                className="h-3 w-3 rounded-full bg-primary"
              />
              <button
                aria-label="Slide 2"
                className="h-3 w-3 rounded-full bg-white/70 transition-colors hover:bg-white"
              />
              <button
                aria-label="Slide 3"
                className="h-3 w-3 rounded-full bg-white/70 transition-colors hover:bg-white"
              />
              <button
                aria-label="Slide 4"
                className="h-3 w-3 rounded-full bg-white/70 transition-colors hover:bg-white"
              />
            </div>
          </div>
        </div>
        {/* MOBILE CATEGORY LIST */}
        <div className="mt-6 lg:hidden">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-foreground">
              Shop by Category
            </h2>

            <Link
              href="/categories"
              className="flex items-center gap-1 text-sm font-semibold text-primary"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-3">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  href={category.href}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-mint hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
     
    </section>
  );
};

export default Hero;
