
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  Package,
  ShoppingBag,
  Users,
  Boxes,
  Clock3,
  AlertTriangle,
} from "lucide-react";

import PageHeading from "@/components/admin/PageHeading";
import StatCard from "@/components/admin/StatCard";
import DashboardChart from "@/components/admin/DashboardChart";
import DataTable from "@/components/admin/DataTable";

const recentOrders = [
  {
    id: "#CM-0001",
    customer: "No recent orders",
    date: "—",
    amount: "—",
    status: "—",
  },
];

const quickActions = [
  {
    title: "Add a product",
    description: "Create a new product listing.",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Manage categories",
    description: "Organise your product catalogue.",
    href: "/admin/categories",
    icon: Boxes,
  },
  {
    title: "View orders",
    description: "Review customer purchases.",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Manage inventory",
    description: "Monitor available stock.",
    href: "/admin/inventory",
    icon: Activity,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">

      {/* Page heading */}
      <PageHeading
        eyebrow="STORE OVERVIEW"
        title="Dashboard"
        description="Welcome to your CozziMart administration workspace. Here's an overview of your store."
      />

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="₦0.00"
          note="Total successful payments"
          icon={CreditCard}
        />

        <StatCard
          title="Total Orders"
          value="0"
          note="All-time orders"
          icon={ShoppingBag}
        />

        <StatCard
          title="Total Products"
          value="0"
          note="Products in your catalogue"
          icon={Package}
        />

        <StatCard
          title="Total Customers"
          value="0"
          note="Registered customers"
          icon={Users}
        />
      </section>

      {/* Sales and order overview */}
      <section className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.8fr)]">

        {/* Sales chart */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Sales Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Monitor your store's revenue performance.
              </p>
            </div>

            <select
              aria-label="Sales period"
              defaultValue="30"
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 outline-none focus:border-[#008B52]"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">This year</option>
            </select>
          </div>

          <DashboardChart />

        </div>

        {/* Order summary */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Order Summary
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Track your order activity.
              </p>
            </div>

            <span className="rounded-xl bg-[#E6F7F0] p-2.5 text-[#006B3A]">
              <ShoppingBag size={19} />
            </span>
          </div>

          <div className="space-y-5">

            <OrderSummaryItem
              label="Pending"
              value="0"
              color="bg-amber-400"
            />

            <OrderSummaryItem
              label="Processing"
              value="0"
              color="bg-blue-500"
            />

            <OrderSummaryItem
              label="Shipped"
              value="0"
              color="bg-purple-500"
            />

            <OrderSummaryItem
              label="Delivered"
              value="0"
              color="bg-emerald-500"
            />

            <OrderSummaryItem
              label="Cancelled"
              value="0"
              color="bg-rose-500"
            />

          </div>

          <Link
            href="/admin/orders"
            className="mt-7 flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#008B52] hover:bg-[#E6F7F0] hover:text-[#006B3A]"
          >
            Manage orders
            <ArrowRight size={16} />
          </Link>

        </div>

      </section>

      {/* Recent orders */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6">

          <div>
            <h2 className="text-base font-bold text-gray-900">
              Recent Orders
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              A quick look at your latest customer orders.
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="flex items-center gap-2 text-sm font-semibold text-[#006B3A] hover:text-[#004D2A]"
          >
            View all
            <ArrowUpRight size={16} />
          </Link>

        </div>

        <DataTable
          columns={[
            { key: "id", label: "ORDER ID" },
            { key: "customer", label: "CUSTOMER" },
            { key: "date", label: "DATE" },
            { key: "amount", label: "TOTAL" },
            { key: "status", label: "STATUS" },
          ]}
          rows={[]}
          emptyMessage="No orders have been placed yet. New customer orders will appear here."
        />

      </section>

      {/* Quick actions */}
      <section>

        <div className="mb-5">
          <h2 className="text-base font-bold text-gray-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Frequently used store management tools.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#A7DCC5] hover:shadow-md"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="rounded-xl bg-[#E6F7F0] p-3 text-[#006B3A] transition group-hover:bg-[#006B3A] group-hover:text-white">
                    <Icon size={20} />
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="text-gray-400 transition group-hover:text-[#006B3A]"
                  />
                </div>

                <h3 className="text-sm font-bold text-gray-900">
                  {action.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  {action.description}
                </p>
              </Link>
            );
          })}

        </div>

      </section>

      {/* Store status */}
      <section className="rounded-2xl border border-[#C8F0DF] bg-[#E6F7F0] p-5 sm:p-6">

        <div className="flex items-start gap-4">

          <div className="rounded-xl bg-white p-3 text-[#006B3A]">
            <Activity size={21} />
          </div>

          <div className="flex-1">
            <h2 className="text-sm font-bold text-[#004D2A]">
              Your store workspace
            </h2>

            <p className="mt-1 text-sm leading-6 text-[#39765B]">
              Your administration workspace is ready for catalogue,
              inventory and order management. Connect the dashboard
              to your database to display live store statistics.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

function OrderSummaryItem({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">
        <span className={`h-2.5 w-2.5 rounded-full ${color}`} />

        <span className="text-sm text-gray-600">
          {label}
        </span>
      </div>

      <span className="text-sm font-bold text-gray-900">
        {value}
      </span>

    </div>
  );
}
