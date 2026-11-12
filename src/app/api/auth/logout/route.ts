
import { NextResponse } from "next/server";
import { destroyDatabaseSession } from "@/lib/auth-session";

export const runtime = "nodejs";

export async function POST() {
  try {
    await destroyDatabaseSession();

    return NextResponse.json(
      { message: "Logged out successfully." },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("POST /api/auth/logout error:", error);

    return NextResponse.json(
      { error: "Unable to log out." },
      { status: 500 }
    );
  }
}
