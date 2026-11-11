
"use client";

import {
  Bell,
  ChevronDown,
  Menu,
  Search,
} from "lucide-react";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">

      {/* Left section */}
      <div className="flex min-w-0 items-center gap-4">

        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="rounded-xl p-2 text-gray-600 transition hover:bg-gray-100 lg:hidden"
        >
          <Menu size={21} />
        </button>

        {/* Breadcrumb */}
        <div className="hidden items-center gap-2 text-xs sm:flex">
          <span className="text-gray-400">
            Workspace
          </span>

          <span className="text-gray-300">/</span>

          <span className="font-semibold text-gray-800">
            Administration
          </span>
        </div>

        {/* Mobile search */}
        <div className="relative w-full max-w-[250px] sm:hidden">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            aria-label="Search administration"
            placeholder="Search..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-xs outline-none transition focus:border-[#008B52] focus:bg-white"
          />
        </div>

      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Desktop search */}
        <div className="relative hidden md:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            aria-label="Search administration"
            placeholder="Search anything..."
            className="w-[240px] rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-xs outline-none transition placeholder:text-gray-400 focus:border-[#008B52] focus:bg-white"
          />
        </div>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          title="Notifications"
          className="relative rounded-xl border border-gray-200 p-2.5 text-gray-500 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
        >
          <Bell size={17} />

          {/* Notification indicator */}
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        <div className="hidden h-8 w-px bg-gray-200 sm:block" />

        {/* Administrator profile */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl p-1.5 text-left transition hover:bg-gray-50"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E6F7F0] text-sm font-bold text-[#006B3A]">
            A
          </span>

          <span className="hidden sm:block">
            <span className="block text-xs font-semibold text-gray-800">
              Administrator
            </span>

            <span className="mt-0.5 block text-[10px] text-gray-400">
              Store manager
            </span>
          </span>

          <ChevronDown
            size={15}
            className="hidden text-gray-400 sm:block"
          />
        </button>

      </div>

    </header>
  );
}
