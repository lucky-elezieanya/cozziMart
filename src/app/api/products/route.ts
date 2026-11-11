import { NextRequest } from "next/server";
import { db } from "@/prisma/db";
import {
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  ProductStatus,
  ProductImageInput,
  ProductVariantInput,
  successResponse,
  errorResponse,
  isObject,
  isProductStatus,
  normalizeMoney,
  requireAdmin,
} from "./_utils";

// export const dynamic = "force-dynamic";

export interface CreateProductInput {
  name: string;
  slug: string;
  description: string;
  shortDescription?: string | null;
  brandId?: string | null;
  status?: ProductStatus;
  isFeatured?: boolean;
  isPublished?: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
  categoryIds?: string[];
  images?: ProductImageInput[];
  variants: ProductVariantInput[];
}

type ProductSort = "newest" | "oldest" | "name-asc" | "name-desc";

interface ProductQueryFilters {
  search?: string;
  brandId?: string;
  featured?: boolean;
  categoryIds?: string[];
}

function isValidMoney(value: unknown, required = false): boolean {
  if (value === null || value === undefined) return !required;
  if (typeof value !== "string" && typeof value !== "number") return false;
  const normalized = String(value).trim();
  return /^\d{1,10}(\.\d{1,2})?$/.test(normalized) && Number.isFinite(Number(normalized));
}

function isValidStock(value: unknown): boolean {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

function isValidUrl(value: unknown): value is string {
  if (typeof value !== "string" || !value.trim()) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isJsonValue(value: unknown): boolean {
  if (value === null || typeof value === "string" || typeof value === "boolean") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (Array.isArray(value)) return value.every(isJsonValue);
  if (isObject(value)) return Object.values(value).every(isJsonValue);
  return false;
}

function isCreateProductInput(value: unknown): value is CreateProductInput {
  if (!isObject(value)) return false;
  const body = value;

  if (
    typeof body.name !== "string" || !body.name.trim() ||
    typeof body.slug !== "string" || !body.slug.trim() ||
    typeof body.description !== "string" || !body.description.trim() ||
    !Array.isArray(body.variants) || body.variants.length === 0
  ) {
    return false;
  }

  if (body.status !== undefined && !isProductStatus(body.status)) return false;
  if (body.isFeatured !== undefined && typeof body.isFeatured !== "boolean") return false;
  if (body.isPublished !== undefined && typeof body.isPublished !== "boolean") return false;

  return true;
}

function buildPublicProductQuery(filters: ProductQueryFilters) {
  let query = db.orm.public.Product.where({ status: "ACTIVE", isPublished: true });

  if (filters.search) {
    query = query.where((product) => product.name.ilike(`%${filters.search}%`));
  }
  if (filters.brandId) {
    query = query.where({ brandId: filters.brandId });
  }
  if (filters.featured !== undefined) {
    query = query.where({ isFeatured: filters.featured });
  }
  if (filters.categoryIds !== undefined) {
    query = query.where((product) => product.id.in(filters.categoryIds!));
  }

  return query;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const pageValue = Number(searchParams.get("page") ?? 1);
    const limitValue = Number(searchParams.get("limit") ?? DEFAULT_PAGE_SIZE);

    if (!Number.isInteger(pageValue) || pageValue < 1 || !Number.isInteger(limitValue) || limitValue < 1) {
      return errorResponse("Page and limit must be positive integers.");
    }

    const page = pageValue;
    const limit = Math.min(limitValue, MAX_PAGE_SIZE);
    const skip = (page - 1) * limit;

    const search = searchParams.get("q")?.trim();
    const brandId = searchParams.get("brandId")?.trim();
    const categorySlug = searchParams.get("category")?.trim();
    const featuredParam = searchParams.get("featured");
    let featured: boolean | undefined;

    if (featuredParam === "true") featured = true;
    else if (featuredParam === "false") featured = false;

    const sort = (searchParams.get("sort") ?? "newest") as ProductSort;
    const validSorts: ProductSort[] = ["newest", "oldest", "name-asc", "name-desc"];
    if (!validSorts.includes(sort)) return errorResponse("Invalid sorting option.");

    let categoryIds: string[] | undefined;
    if (categorySlug) {
      const category = await db.orm.public.Category.where({ slug: categorySlug, isActive: true }).first();
      if (!category) {
        return successResponse({ products: [], pagination: { page, limit, total: 0, totalPages: 0, hasNextPage: false, hasPreviousPage: page > 1 } });
      }

      const productCategories = await db.orm.public.ProductCategory.where({ categoryId: category.id }).all();
      categoryIds = productCategories.map((item) => item.productId);
      if (categoryIds.length === 0) {
        return successResponse({ products: [], pagination: { page, limit, total: 0, totalPages: 0, hasNextPage: false, hasPreviousPage: page > 1 } });
      }
    }

    const filters: ProductQueryFilters = { search: search || undefined, brandId: brandId || undefined, featured, categoryIds };

    const countResult = await buildPublicProductQuery(filters).aggregate((aggregate) => ({ total: aggregate.count() }));
    const total = countResult.total;
    const totalPages = Math.ceil(total / limit);

    let productQuery = buildPublicProductQuery(filters);

    switch (sort) {
      case "oldest":
        productQuery = productQuery.orderBy([(p) => p.createdAt.asc(), (p) => p.id.asc()]);
        break;
      case "name-asc":
        productQuery = productQuery.orderBy([(p) => p.name.asc(), (p) => p.id.asc()]);
        break;
      case "name-desc":
        productQuery = productQuery.orderBy([(p) => p.name.desc(), (p) => p.id.desc()]);
        break;
      case "newest":
      default:
        productQuery = productQuery.orderBy([(p) => p.createdAt.desc(), (p) => p.id.desc()]);
        break;
    }

    const products = await productQuery
      .include("brand")
      .include("images", (images) => images.orderBy((image) => image.position.asc()))
      .include("variants", (variants) => variants.where({ isActive: true }))
      .include("categories", (categories) => categories.include("category"))
      .take(limit)
      .skip(skip)
      .all();

    return successResponse({
      products,
      pagination: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 },
      filters: { search: search || null, brandId: brandId || null, category: categorySlug || null, featured: featured ?? null, sort },
    });
  } catch (error: unknown) {
    console.error("GET /api/products error:", error);
    return errorResponse("Unable to retrieve products.", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (!auth.authorized) return auth.response;

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return errorResponse("Request body must contain valid JSON.");
    }

    if (!isCreateProductInput(body)) {
      return errorResponse("Product name, slug, description and at least one variant are required.");
    }

    const {
      name, slug, description, shortDescription, brandId,
      status, isFeatured, isPublished, metaTitle, metaDescription,
      categoryIds = [], images = [], variants,
    } = body;

    const normalizedName = name.trim();
    const normalizedSlug = slug.trim().toLowerCase();

    if (isPublished && (status ?? "DRAFT") !== "ACTIVE") {
      return errorResponse("A product must have ACTIVE status before it can be published.");
    }

    if (variants.length > 50) return errorResponse("A product cannot have more than 50 variants.");

    const invalidVariant = variants.some((v) => {
      if (!v || typeof v !== "object") return true;
      if (typeof v.sku !== "string" || !v.sku.trim()) return true;
      if (!isValidMoney(v.price, true)) return true;
      if (!isValidMoney(v.compareAtPrice)) return true;
      if (!isValidMoney(v.costPrice)) return true;
      if (v.stockQuantity !== undefined && !isValidStock(v.stockQuantity)) return true;
      if (v.attributes !== undefined && v.attributes !== null && (!isObject(v.attributes) || !isJsonValue(v.attributes))) return true;
      return false;
    });

    if (invalidVariant) return errorResponse("One or more variants contain invalid details.");

    const skus = variants.map((v) => v.sku.trim().toLowerCase());
    if (new Set(skus).size !== skus.length) return errorResponse("Variant SKUs must be unique within the product.");

    if (images.length > 20) return errorResponse("A product cannot have more than 20 images.");
    if (images.some((img) => !img || !isValidUrl(img.url))) return errorResponse("One or more image URLs are invalid.");
    if (images.filter((img) => img.isPrimary === true).length > 1) return errorResponse("Only one image can be primary.");

    const uniqueCategoryIds = [...new Set(categoryIds)];

    if (brandId) {
      const brand = await db.orm.public.Brand.where({ id: brandId, isActive: true }).first();
      if (!brand) return errorResponse("Selected brand does not exist or is inactive.", 404);
    }

    if (uniqueCategoryIds.length > 0) {
      const categories = await db.orm.public.Category.where((c) => c.id.in(uniqueCategoryIds)).all();
      if (categories.length !== uniqueCategoryIds.length || categories.some((c) => !c.isActive)) {
        return errorResponse("One or more selected categories do not exist or are inactive.", 404);
      }
    }

    const product = await db.transaction(async (tx) => {
      return tx.orm.public.Product
        .include("brand")
        .include("images")
        .include("variants")
        .include("categories", (c) => c.include("category"))
        .create({
          name: normalizedName,
          slug: normalizedSlug,
          description: description.trim(),
          shortDescription: shortDescription?.trim() || null,
          brandId: brandId || null,
          status: status ?? "DRAFT",
          isFeatured: isFeatured ?? false,
          isPublished: isPublished ?? false,
          metaTitle: metaTitle?.trim() || null,
          metaDescription: metaDescription?.trim() || null,
          categories: (cats) => cats.create(uniqueCategoryIds.map((cid) => ({ category: (cat) => cat.connect({ id: cid }) }))),
          images: (imgs) => imgs.create(images.map((img, idx) => ({
            url: img.url.trim(),
            altText: img.altText?.trim() || normalizedName,
            position: idx,
            isPrimary: img.isPrimary ?? idx === 0,
          }))),
          variants: (vars) => vars.create(variants.map((v) => ({
            name: v.name?.trim() || "Default",
            sku: v.sku.trim(),
            price: normalizeMoney(v.price),
            compareAtPrice: v.compareAtPrice != null ? normalizeMoney(v.compareAtPrice) : null,
            costPrice: v.costPrice != null ? normalizeMoney(v.costPrice) : null,
            stockQuantity: v.stockQuantity ?? 0,
            lowStockThreshold: v.lowStockThreshold ?? 5,
            attributes: v.attributes ?? null,
            isActive: true,
          }))),
        });
    });

    return successResponse({ message: "Product created successfully.", product }, 201);
  } catch (error: unknown) {
    console.error("POST /api/products error:", error);
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    if (message.includes("unique") || message.includes("duplicate")) {
      return errorResponse("A product with this slug or SKU already exists.", 409);
    }
    return errorResponse("Unable to create product.", 500);
  }
}