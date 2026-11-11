
import {
  Activity,
  BadgePercent,
  Boxes,
  LayoutDashboard,
  MessageSquareText,
  Package,
  Settings2,
  ShoppingCart,
  Tags,
  Users,
} from "lucide-react";

export const adminNavigation = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
    group: "Overview",
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
    group: "Catalogue",
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: Boxes,
    group: "Catalogue",
  },
  {
    label: "Brands",
    href: "/admin/brands",
    icon: Tags,
    group: "Catalogue",
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
    group: "Sales",
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: Users,
    group: "Sales",
  },
  {
    label: "Inventory",
    href: "/admin/inventory",
    icon: Activity,
    group: "Management",
  },
  {
    label: "Reviews",
    href: "/admin/reviews",
    icon: MessageSquareText,
    group: "Management",
  },
  {
    label: "Coupons",
    href: "/admin/coupons",
    icon: BadgePercent,
    group: "Management",
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings2,
    group: "System",
  },
] as const;
