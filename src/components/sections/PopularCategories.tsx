
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const popularCategories = [
  {
    id: 1,
    title: "Electronics",
    image: "/images/category1.png",
  },
  {
    id: 2,
    title: "Fashion",
    image: "/images/category2.png",
  },
  {
    id: 3,
    title: "Home & Garden",
    image: "/images/category3.png",
  },
  {
    id: 4,
    title: "Sports & Outdoors",
    image: "/images/category4.png",
  },
  {
    id: 5,
    title: "Toys & Games",
    image: "/images/category5.png",
  },
  {
    id: 6,
    title: "Health & Beauty",
    image: "/images/category6.png",
  },
];

const PopularCategories = () => {
  return (
    <section
      id="popular-categories"
      className="mt-4 w-full px-4 py-6 sm:px-8 lg:px-8"
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-xl font-bold text-primary/90 transition-colors hover:text-primary sm:text-2xl">
              Popular Categories
            </h2>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Explore our wide range of products
            </p>
          </div>

          <Link
            href="/categories"
            className="group inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary/90 transition-colors hover:text-secondary sm:text-sm"
          >
            View All Categories
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-6">
          {popularCategories.map((category) => (
            <div
              key={category.id}
              className="group overflow-hidden rounded-2xl border border-primary/10 bg-primary/5 p-2 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Image and Hover Overlay */}
       
            <div className="relative h-32 overflow-hidden rounded-xl bg-primary/5 sm:h-36 lg:h-32 xl:h-36">
            <img
                src={category.image}
                alt={category.title}
                className="h-full w-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Transparent Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-primary/0 transition-all duration-300 group-hover:bg-primary/45">
                <Link
                href={`/categories/${category.id}`}
                aria-label={`Explore ${category.title}`}
                className="translate-y-4 scale-95 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-xs font-bold text-primary opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-secondary hover:text-white group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:scale-100 focus-visible:opacity-100"
                >
                <span className="inline-flex items-center gap-1.5">
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
                </Link>
            </div>
            </div>

              {/* Category Title */}
              <div className="flex items-center justify-center px-1 py-3">
                <h3 className="text-center font-heading text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-[15px]">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
