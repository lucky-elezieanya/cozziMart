
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/prisma/db";
import { hashPassword } from "@/lib/password";
import { createDatabaseSession } from "@/lib/auth-session";

export const runtime = "nodejs";

function errorResponse(message: string, status = 400) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: { "Cache-Control": "no-store" },
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return errorResponse("Invalid request body.");
    }

    const data = body as Record<string, unknown>;

    const firstName =
      typeof data.firstName === "string" ? data.firstName.trim() : "";

    const lastName =
      typeof data.lastName === "string" ? data.lastName.trim() : "";

    const email =
      typeof data.email === "string"
        ? data.email.trim().toLowerCase()
        : "";

    const password =
      typeof data.password === "string" ? data.password : "";

    const phone =
      typeof data.phone === "string" ? data.phone.trim() : null;

    if (!firstName || !lastName || !email || !password) {
      return errorResponse(
        "First name, last name, email and password are required."
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return errorResponse("Enter a valid email address.");
    }

    if (firstName.length > 80 || lastName.length > 80) {
      return errorResponse("Names must not exceed 80 characters.");
    }

    if (password.length < 8) {
      return errorResponse("Password must contain at least 8 characters.");
    }

    if (password.length > 128) {
      return errorResponse("Password is too long.");
    }

    if (phone && phone.length > 30) {
      return errorResponse("Phone number is too long.");
    }

    const existingUser = await db.orm.public.User
      .where({ email })
      .first();

    if (existingUser) {
      return errorResponse(
        "An account with this email already exists.",
        409
      );
    }

    if (phone) {
      const existingPhone = await db.orm.public.User
        .where({ phone })
        .first();

      if (existingPhone) {
        return errorResponse(
          "An account with this phone number already exists.",
          409
        );
      }
    }

    const passwordHash = await hashPassword(password);

    const user = await db.orm.public.User.create({
      firstName,
      lastName,
      email,
      phone: phone || null,
      passwordHash,
      role: "CUSTOMER",
      isActive: true,
    });

    await createDatabaseSession(user.id);

    return NextResponse.json(
      {
        message: "Account created successfully.",
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      },
      {
        status: 201,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("POST /api/auth/register error:", error);

    const message =
      error instanceof Error ? error.message.toLowerCase() : "";

    if (message.includes("unique") || message.includes("duplicate")) {
      return errorResponse(
        "An account with these details already exists.",
        409
      );
    }

    return errorResponse("Unable to create your account.", 500);
  }
}
