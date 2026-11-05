import React from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";

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
  {
    id: 7,
    title: "Books & Media",
    image: "/images/category7.png",
  },
  {
    id: 8,
    title: "Kitchen & Dining",
    image: "/images/category8.png",
  },
  {
    id: 9,
    title: "Bags & Accessories",
    image: "/images/category9.png",
  },
  {
    id: 10,
    title: "Footwears",
    image: "/images/category10.png",
  },
];

const PopularCategories = () => {
  return (
    <section
      id="popular-categories"
      className="my-8 w-full px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-primary/10 pb-4">
          <div>
            <span className="mb-1 inline-block text-xs font-bold uppercase tracking-wider text-secondary">
              Discover Collections
            </span>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-primary/80 sm:text-3xl">
              Popular Categories
            </h2>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Explore our wide range of carefully curated products
            </p>
          </div>

          <Link
            href="/categories"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/5 px-4 py-2 text-xs font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white sm:text-sm"
          >
            View All Categories
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Categories Grid - Optimized columns for 10 items */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-6">
          {popularCategories.map((category) => (
            <div
              key={category.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white p-3 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Image Container with custom RGBA background tint */}
              <div 
                className="relative h-36 w-full overflow-hidden rounded-2xl sm:h-40"
                style={{ backgroundColor: "rgba(0, 107, 59, 0.05)" }}
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                  <Link
                    href={`/categories/${category.id}`}
                    aria-label={`Explore ${category.title}`}
                    className="translate-y-3 scale-95 rounded-full bg-white px-4 py-2 text-xs font-bold text-primary shadow-lg transition-all duration-300 hover:bg-secondary hover:text-white group-hover:translate-y-0 group-hover:scale-100"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      Explore
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Category Title & Action Subtext */}
              <div className="flex flex-col items-center justify-between px-2 pt-3 pb-1 text-center">
                <h3 className="font-heading text-sm font-bold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-base">
                  {category.title}
                </h3>
                <span className="mt-0.5 text-[11px] font-medium text-muted/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Browse products &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;