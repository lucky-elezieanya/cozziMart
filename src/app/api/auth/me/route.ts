
import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth-session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const current = await getCurrentSession();

    if (!current) {
      return NextResponse.json(
        { authenticated: false, user: null },
        {
          status: 401,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    const { user } = current;

    return NextResponse.json(
      {
        authenticated: true,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          profileImage: user.profileImage,
          emailVerifiedAt: user.emailVerifiedAt,
        },
      },
      {
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("GET /api/auth/me error:", error);

    return NextResponse.json(
      { error: "Unable to retrieve your account." },
      { status: 500 }
    );
  }
}
