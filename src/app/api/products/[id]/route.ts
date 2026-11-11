import { NextRequest } from "next/server";
import { db } from "@/prisma/db";
import { ProductStatus } from "../route";
import {
  successResponse,
  errorResponse,
  isObject,
  isProductStatus,
  requireAdmin,
} from "../_utils";

interface UpdateProductInput {
  name?: string;
  slug?: string;
  description?: string;
  shortDescription?: string | null;
  brandId?: string | null;
  status?: ProductStatus;
  isFeatured?: boolean;
  isPublished?: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
  categoryIds?: string[];
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) return errorResponse("Invalid product ID.");

    const product = await db.orm.public.Product
      .where({ id, status: "ACTIVE", isPublished: true })
      .include("brand")
      .include("images", (images) => images.orderBy((image) => image.position.asc()))
      .include("variants", (variants) => variants.where({ isActive: true }))
      .include("categories", (categories) => categories.include("category"))
      .first();

    if (!product) return errorResponse("Product not found.", 404);

    return successResponse({ product });
  } catch (error: unknown) {
    console.error("GET /api/products/[id] error:", error);
    return errorResponse("Unable to retrieve product details.", 500);
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAdmin(request);
    if (!auth.authorized) return auth.response;

    const { id } = await context.params;
    if (!id) return errorResponse("Product ID is required.");

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return errorResponse("Request body must contain valid JSON.");
    }

    if (!isObject(body)) return errorResponse("Invalid request payload structure.");
    const updates = body as UpdateProductInput;

    const existingProduct = await db.orm.public.Product.where({ id }).first();
    if (!existingProduct) return errorResponse("Product not found.", 404);

    let normalizedName: string | undefined;
    if (updates.name !== undefined) {
      if (typeof updates.name !== "string" || !updates.name.trim()) return errorResponse("Product name cannot be empty.");
      normalizedName = updates.name.trim();
    }

    let normalizedSlug: string | undefined;
    if (updates.slug !== undefined) {
      if (typeof updates.slug !== "string" || !updates.slug.trim()) return errorResponse("Product slug cannot be empty.");
      normalizedSlug = updates.slug.trim().toLowerCase();
    }

    if (updates.status !== undefined && !isProductStatus(updates.status)) return errorResponse("Invalid product status.");

    const targetStatus = updates.status ?? existingProduct.status;
    const targetPublished = updates.isPublished ?? existingProduct.isPublished;
    if (targetPublished && targetStatus !== "ACTIVE") {
      return errorResponse("A product must have ACTIVE status before publication.");
    }

    const uniqueCategoryIds = updates.categoryIds ? [...new Set(updates.categoryIds)] : undefined;
    if (uniqueCategoryIds && uniqueCategoryIds.length > 0) {
      const categories = await db.orm.public.Category.where((c) => c.id.in(uniqueCategoryIds)).all();
      if (categories.length !== uniqueCategoryIds.length || categories.some((c) => !c.isActive)) {
        return errorResponse("Selected categories are invalid or inactive.", 404);
      }
    }

    if (updates.brandId) {
      const brand = await db.orm.public.Brand.where({ id: updates.brandId, isActive: true }).first();
      if (!brand) return errorResponse("Selected brand does not exist or is inactive.", 404);
    }

    const updatedProduct = await db.transaction(async (tx) => {
      if (uniqueCategoryIds !== undefined) {
        const existingRelations = await tx.orm.public.ProductCategory.where({ productId: id }).all();
        for (const rel of existingRelations) {
          await tx.orm.public.ProductCategory.delete(rel.productId);
        }
        for (const catId of uniqueCategoryIds) {
          await tx.orm.public.ProductCategory.create({ productId: id, categoryId: catId });
        }
      }

      return tx.orm.public.Product
        .include("brand")
        .include("images")
        .include("variants")
        .include("categories", (c) => c.include("category"))
        .update(id, {
          ...(normalizedName && { name: normalizedName }),
          ...(normalizedSlug && { slug: normalizedSlug }),
          ...(updates.description !== undefined && { description: updates.description.trim() }),
          ...(updates.shortDescription !== undefined && { shortDescription: updates.shortDescription?.trim() || null }),
          ...(updates.brandId !== undefined && { brandId: updates.brandId }),
          ...(updates.status !== undefined && { status: updates.status }),
          ...(updates.isFeatured !== undefined && { isFeatured: updates.isFeatured }),
          ...(updates.isPublished !== undefined && { isPublished: updates.isPublished }),
          ...(updates.metaTitle !== undefined && { metaTitle: updates.metaTitle?.trim() || null }),
          ...(updates.metaDescription !== undefined && { metaDescription: updates.metaDescription?.trim() || null }),
        });
    });

    return successResponse({ message: "Product updated successfully.", product: updatedProduct });
  } catch (error: unknown) {
    console.error("PUT /api/products/[id] error:", error);
    return errorResponse("Unable to update product.", 500);
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAdmin(request);
    if (!auth.authorized) return auth.response;

    const { id } = await context.params;
    if (!id) return errorResponse("Product ID is required.");

    const existingProduct = await db.orm.public.Product.where({ id }).first();
    if (!existingProduct) return errorResponse("Product not found.", 404);

    const orderItemsCount = await db.orm.public.OrderItem.where({ productId: id }).aggregate((agg) => ({ total: agg.count() }));

    if (orderItemsCount.total > 0) {
      const archivedProduct = await db.orm.public.Product.update(id, { status: "ARCHIVED", isPublished: false, isFeatured: false });
      return successResponse({ message: "Product has orders tied to it; successfully archived instead.", product: archivedProduct });
    }

    await db.transaction(async (tx) => {
      const variants = await tx.orm.public.ProductVariant.where({ productId: id }).all();
      for (const v of variants) await tx.orm.public.ProductVariant.delete(v.id);

      const images = await tx.orm.public.ProductImage.where({ productId: id }).all();
      for (const img of images) await tx.orm.public.ProductImage.delete(img.id);

      const categories = await tx.orm.public.ProductCategory.where({ productId: id }).all();
      for (const cat of categories) await tx.orm.public.ProductCategory.delete(cat.productId);

      await tx.orm.public.Product.delete(id);
    });

    return successResponse({ message: "Product deleted successfully." });
  } catch (error: unknown) {
    console.error("DELETE /api/products/[id] error:", error);
    return errorResponse("Unable to delete product.", 500);
  }
}