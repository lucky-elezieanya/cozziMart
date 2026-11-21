import Link from "next/link";
import { db } from "@/prisma/db";
import { Plus, Package, Edit3, Eye, AlertCircle } from "lucide-react";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { SearchInput } from "./SearchInput";

type SearchParams = Promise<{ search?: string; status?: string }>;

type NormalizedStatus = "ALL" | "ACTIVE" | "DRAFT" | "ARCHIVED";

const STATUS_TABS: readonly NormalizedStatus[] = [
  "ALL",
  "ACTIVE",
  "DRAFT",
  "ARCHIVED",
];

function isNormalizedStatus(value: string): value is NormalizedStatus {
  return (STATUS_TABS as readonly string[]).includes(value);
}

const formatPrice = (price: number | string | null | undefined) =>
  `₦${Number(price || 0).toLocaleString("en-NG")}`;

function normalizeFilters(raw: { search?: string; status?: string }): {
  search: string;
  status: NormalizedStatus;
} {
  const search = (raw.search ?? "").trim();
  const candidate = (raw.status ?? "ALL").trim().toUpperCase();
  const status: NormalizedStatus = isNormalizedStatus(candidate)
    ? candidate
    : "ALL";

  return { search, status };
}

async function getFilteredProducts(search: string, status: NormalizedStatus) {
  "use cache";

  const trimmedSearch = search.trim();
  const normalizedStatus: NormalizedStatus = isNormalizedStatus(
    status.trim().toUpperCase()
  )
    ? (status.trim().toUpperCase() as NormalizedStatus)
    : "ALL";

  let query = db.orm.public.Product
    .include("brand")
    .include("images", (img) => img.orderBy((i) => i.position.asc()))
    .include("variants")
    .include("categories", (c) => c.include("category"));

  // List all products unless a non-empty search query is provided
  if (trimmedSearch.length > 0) {
    const term = `%${trimmedSearch}%`;
    query = query.where((p) => p.name.ilike(term));
  }

  // Only restrict by status when a specific status tab is selected
  if (normalizedStatus !== "ALL") {
    query = query.where({ status: normalizedStatus });
  }

  return query.all();
}

async function FilterControls({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { search, status } = normalizeFilters(await searchParams);

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <SearchInput initialSearch={search} status={status} />

      {/* Status Filtering Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        {STATUS_TABS.map((tabStatus) => (
          <Link
            key={tabStatus}
            href={`/admin/products?status=${tabStatus}${
              search ? `&search=${encodeURIComponent(search)}` : ""
            }`}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              status === tabStatus
                ? "bg-[#006B3A] text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tabStatus}
          </Link>
        ))}
      </div>
    </div>
  );
}

async function ProductsTable({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { search, status } = normalizeFilters(await searchParams);
  const products = await getFilteredProducts(search, status);

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      {products.length === 0 ? (
        <div className="py-20 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-[#006B3A]">
            <Package className="h-8 w-8" />
          </div>
          <h3 className="font-heading text-base font-bold text-gray-900">
            No products found
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            No product items matched your filter criteria. Try creating a new product.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                <th className="py-3.5 pl-6 pr-4">Product Info</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Price Range</th>
                <th className="px-4 py-3.5">Inventory</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {products.map((product) => {
                const primaryImage =
                  product.images?.[0]?.url ||
                  "https://placehold.co/100x100?text=No+Image";
                const totalStock =
                  product.variants?.reduce(
                    (acc: number, v: { stockQuantity?: number | null }) =>
                      acc + (v.stockQuantity || 0),
                    0
                  ) || 0;
                const basePrice = product.variants?.[0]?.price || 0;
                const categoryNames =
                  product.categories
                    ?.map(
                      (c: { category?: { name?: string | null } | null }) =>
                        c.category?.name
                    )
                    .filter(Boolean)
                    .join(", ") || "Uncategorized";

                return (
                  <tr
                    key={product.id}
                    className="transition-colors hover:bg-gray-50/50"
                  >
                    {/* Name & Thumbnail */}
                    <td className="py-4 pl-6 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                          <img
                            src={primaryImage}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-heading font-bold text-gray-900 truncate max-w-xs">
                            {product.name}
                          </p>
                          <p className="text-[11px] text-gray-400 truncate">
                            Slug: {product.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Categories */}
                    <td className="px-4 py-4 text-gray-600 font-medium">
                      {categoryNames}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-4 font-semibold text-gray-900">
                      {formatPrice(basePrice)}
                    </td>

                    {/* Stock Level */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          totalStock > 5
                            ? "bg-emerald-50 text-emerald-700"
                            : totalStock > 0
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {totalStock === 0 && <AlertCircle className="h-3 w-3" />}
                        {totalStock} in stock ({product.variants?.length || 0}{" "}
                        variants)
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          product.status === "ACTIVE"
                            ? "bg-emerald-100/70 text-emerald-800"
                            : product.status === "DRAFT"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-rose-100/70 text-rose-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>

                    {/* Action Links */}
                    <td className="py-4 pl-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          target="_blank"
                          aria-label="View storefront entry"
                          className="rounded-xl border border-gray-200 bg-white p-2 text-gray-600 transition hover:bg-gray-100"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          href={`/admin/products/edit/${product.id}`}
                          aria-label="Edit product"
                          className="rounded-xl border border-gray-200 bg-white p-2 text-[#006B3A] transition hover:bg-emerald-50"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function AdminProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div className="space-y-6">
      {/* Static/shared header stays outside Suspense so it prefetches instantaneously */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-gray-900">
            Products Catalog
          </h1>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Manage store products, variant inventories, pricing matrices, and publication settings.
          </p>
        </div>

        <Link
          href="/admin/products/create"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#006B3A] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-900/20 transition-all hover:bg-emerald-700 active:scale-95 sm:text-sm"
        >
          <Plus className="h-4 w-4" />
          Create New Product
        </Link>
      </div>

      {/* URL-dependent filter bar awaits searchParams inside Suspense */}
      <Suspense
        fallback={
          <div className="h-16 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm" />
        }
      >
        <FilterControls searchParams={searchParams} />
      </Suspense>

      {/* URL-dependent products table awaits searchParams & cached query inside Suspense */}
      <Suspense fallback={<Loading />}>
        <ProductsTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
}