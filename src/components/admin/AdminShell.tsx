"use client";

import { useState, type ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface AdminShellProps {
  children: ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8] text-gray-900 flex flex-col lg:flex-row">
      {/* Mobile sidebar backdrop overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-gray-950/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Sidebar Component */}
      <AdminSidebar
        mobileOpen={mobileOpen}
        onNavigate={closeMobileMenu}
      />

      {/* Main Content Wrapper */}
      <div className="flex flex-1 flex-col min-w-0 lg:pl-[10px]">
        {/* Top Header */}
        <AdminHeader onMenuClick={() => setMobileOpen(true)} />

        {/* Dynamic Page Content */}
        <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}