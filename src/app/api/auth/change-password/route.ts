
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/prisma/db";
import { requireAuth } from "@/lib/auth-helpers";
import { hashPassword, verifyPassword } from "@/lib/password";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();

    if (!auth.authorized) {
      return auth.response;
    }

    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const data = body as Record<string, unknown>;

    const currentPassword =
      typeof data.currentPassword === "string"
        ? data.currentPassword
        : "";

    const newPassword =
      typeof data.newPassword === "string"
        ? data.newPassword
        : "";

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Both passwords are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 8 || newPassword.length > 128) {
      return NextResponse.json(
        { error: "New password must contain between 8 and 128 characters." },
        { status: 400 }
      );
    }

    const user = await db.orm.public.User
      .where({ id: auth.user.id })
      .first();

    if (!user || !user.passwordHash) {
      return NextResponse.json(
        {
          error:
            "This account does not have a password. Use Google sign-in.",
        },
        { status: 400 }
      );
    }

    const validPassword = await verifyPassword(
      currentPassword,
      user.passwordHash
    );

    if (!validPassword) {
      return NextResponse.json(
        { error: "Your current password is incorrect." },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: "Your new password must be different." },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(newPassword);

    await db.orm.public.User
      .where({ id: auth.user.id })
      .update({ passwordHash });

    return NextResponse.json({
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("POST /api/auth/change-password error:", error);

    return NextResponse.json(
      { error: "Unable to change your password." },
      { status: 500 }
    );
  }
}
