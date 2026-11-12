
import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { db } from "@/prisma/db";

export const SESSION_COOKIE = "cozzimart.session";
export const SESSION_DURATION = 4 * 60 * 60 * 1000;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createDatabaseSession(userId: string) {
  const rawToken = randomBytes(32).toString("hex");
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_DURATION);

  // Only the hash is stored in the database.
  await db.orm.public.Session.create({
    userId,
    token: hashToken(rawToken),
    expiresAt,
    lastActivityAt: now,
  });

  const cookieStore = await cookies();

  // No maxAge or expires: this is a browser-session cookie.
  cookieStore.set(SESSION_COOKIE, rawToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function getCurrentSession() {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(SESSION_COOKIE)?.value;

  if (!rawToken) return null;

  const token = hashToken(rawToken);

  const session = await db.orm.public.Session
    .include("user")
    .where({ token })
    .first();

  if (!session) return null;

  const now = new Date();
  const inactiveFor = now.getTime() - session.lastActivityAt.getTime();

  if (
    session.expiresAt <= now ||
    inactiveFor >= SESSION_DURATION ||
    !session.user.isActive
  ) {
    await db.orm.public.Session.where({ token }).delete();

    cookieStore.delete(SESSION_COOKIE);
    return null;
  }

  // Sliding four-hour inactivity timeout.
  await db.orm.public.Session
    .where({ token })
    .update({
      lastActivityAt: now,
      expiresAt: new Date(now.getTime() + SESSION_DURATION),
    });

  return {
    session,
    user: session.user,
  };
}

export async function destroyDatabaseSession() {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(SESSION_COOKIE)?.value;

  if (rawToken) {
    await db.orm.public.Session
      .where({ token: hashToken(rawToken) })
      .delete();
  }

  cookieStore.delete(SESSION_COOKIE);
}
