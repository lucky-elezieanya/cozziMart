
import type { Metadata } from "next";
import type { ReactNode } from "react";
import AdminShell from "@/components/admin/AdminShell";

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

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <AdminShell>
      {children}
    </AdminShell>
  );
}
