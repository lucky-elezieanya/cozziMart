import { NextRequest, NextResponse } from "next/server";
import { db } from "@/prisma/db";

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

export async function requireAdmin(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return { authorized: false as const, response: errorResponse("Authentication required.", 401) };
  }

  const token = authorization.slice(7).trim();
  if (!token) {
    return { authorized: false as const, response: errorResponse("Invalid authentication token.", 401) };
  }

  const session = await db.orm.public.Session.include("user").where({ token }).first();

  if (!session || session.expiresAt <= new Date()) {
    return { authorized: false as const, response: errorResponse("Your session is invalid or has expired.", 401) };
  }

  if (!session.user.isActive) {
    return { authorized: false as const, response: errorResponse("Your account has been deactivated.", 403) };
  }

  if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
    return { authorized: false as const, response: errorResponse("You do not have permission to manage products.", 403) };
  }

  return { authorized: true as const, user: session.user };
}