
import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";

import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { getCurrentSession } from "@/lib/auth-session";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard | CozziMart",
    template: "%s | CozziMart Admin",
  },
  description: "CozziMart store administration dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  await connection()
    const auth = await getCurrentSession();

  // Redirect users without a valid session.
  if (!auth) {
    redirect("/login?callbackUrl=%2Fadmin");
  }

  const { user } = auth;

  // Only administrators can access the admin dashboard.
  if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
    redirect("/");
  }
  return (
    <AdminShell>
      <Suspense>
      {children}
      </Suspense>
        
    </AdminShell>
  );
}

