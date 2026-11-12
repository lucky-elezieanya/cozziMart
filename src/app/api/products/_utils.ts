import { NextRequest, NextResponse } from "next/server";
import { requireAdmin as requireAdminUser } from "@/lib/auth-helpers";

export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 50;

export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export interface ProductImageInput {
  url: string;
  altText?: string | null;
  isPrimary?: boolean;
}

export interface ProductVariantInput {
  name?: string;
  sku: string;
  price: number | string;
  compareAtPrice?: number | string | null;
  costPrice?: number | string | null;
  stockQuantity?: number;
  lowStockThreshold?: number;
  attributes?: { [key: string]: JsonValue } | null;
}

export function successResponse(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store" } }
  );
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isProductStatus(value: unknown): value is ProductStatus {
  return value === "DRAFT" || value === "ACTIVE" || value === "ARCHIVED";
}

export function normalizeMoney(value: number | string): string {
  return String(value).trim();
}

export async function requireAdmin(_request: NextRequest) {
  return requireAdminUser();
}
