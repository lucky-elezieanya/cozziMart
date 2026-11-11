"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BadgePercent,
  Boxes,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Package,
  Settings2,
  ShoppingCart,
  Store,
  Tags,
  Users,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  mobileOpen: boolean;
  onNavigate: () => void;
}

const navigationGroups = [
  {
    label: "OVERVIEW",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        exact: true,
      },
    ],
  },
  {
    label: "CATALOGUE",
    items: [
      {
        label: "Products",
        href: "/admin/products",
        icon: Package,
      },
      {
        label: "Categories",
        href: "/admin/categories",
        icon: Boxes,
      },
      {
        label: "Brands",
        href: "/admin/brands",
        icon: Tags,
      },
    ],
  },
  {
    label: "SALES",
    items: [
      {
        label: "Orders",
        href: "/admin/orders",
        icon: ShoppingCart,
      },
      {
        label: "Customers",
        href: "/admin/customers",
        icon: Users,
      },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      {
        label: "Inventory",
        href: "/admin/inventory",
        icon: Activity,
      },
      {
        label: "Reviews",
        href: "/admin/reviews",
        icon: MessageSquareText,
      },
      {
        label: "Coupons",
        href: "/admin/coupons",
        icon: BadgePercent,
      },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings2,
      },
    ],
  },
];

export default function AdminSidebar({
  mobileOpen,
  onNavigate,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50
        flex w-[268px] shrink-0 flex-col
        border-r border-gray-200 bg-white
        transition-transform duration-300 ease-in-out
        lg:sticky lg:top-0 lg:h-screen lg:translate-x-0
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Brand */}
      <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-gray-100 px-5">
        <Link
          href="/admin"
          onClick={onNavigate}
          className="flex items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006B3A] text-white shadow-sm">
            <Store size={21} />
          </span>

          <span>
            <span className="block text-base font-bold tracking-tight text-gray-900">
              CozziMart
            </span>

            <span className="mt-0.5 block text-[10px] font-semibold tracking-[0.12em] text-gray-400">
              STORE ADMINISTRATION
            </span>
          </span>
        </Link>

        <button
          type="button"
          onClick={onNavigate}
          aria-label="Close navigation"
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 lg:hidden"
        >
          <X size={19} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
        {navigationGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-[10px] font-bold tracking-[0.15em] text-gray-400">
              {group.label}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                const isActive =
                  "exact" in item && item.exact
                    ? pathname === item.href
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={isActive ? "page" : undefined}
                    className={`
                      group flex items-center gap-3
                      rounded-xl px-3 py-2.5
                      text-[13px] font-medium
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-[#E6F7F0] text-[#006B3A]"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                      }
                    `}
                  >
                    <Icon
                      size={18}
                      strokeWidth={isActive ? 2.2 : 1.8}
                      className="shrink-0"
                    />

                    <span>{item.label}</span>

                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#008B52]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="shrink-0 border-t border-gray-100 p-4">
        <Link
          href="/"
          className="mb-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-gray-500 transition hover:bg-gray-50 hover:text-[#006B3A]"
        >
          <Store size={17} />
          View storefront
        </Link>

        <div className="rounded-xl bg-gray-50 p-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E6F7F0] text-sm font-bold text-[#006B3A]">
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-gray-800">
                Administrator
              </p>

              <p className="mt-0.5 text-[10px] text-gray-400">
                Store management
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          disabled
          title="Authentication integration pending"
          className="mt-3 flex w-full cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-medium text-gray-400"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}