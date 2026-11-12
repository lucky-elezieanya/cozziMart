import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth-session";

export async function requireAuth() {
  const current = await getCurrentSession();

  if (!current) {
    return {
      authorized: false as const,
      response: NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      ),
    };
  }

  return {
    authorized: true as const,
    user: current.user,
    session: current.session,
  };
}

export async function requireAdmin() {
  const auth = await requireAuth();

  if (!auth.authorized) {
    return auth;
  }

  if (
    auth.user.role !== "ADMIN" &&
    auth.user.role !== "SUPER_ADMIN"
  ) {
    return {
      authorized: false as const,
      response: NextResponse.json(
        { error: "You do not have permission to perform this action." },
        { status: 403 }
      ),
    };
  }

  return auth;
}

export async function requireSuperAdmin() {
  const auth = await requireAuth();

  if (!auth.authorized) {
    return auth;
  }

  if (auth.user.role !== "SUPER_ADMIN") {
    return {
      authorized: false as const,
      response: NextResponse.json(
        { error: "Super administrator permission required." },
        { status: 403 }
      ),
    };
  }

  return auth;
}
