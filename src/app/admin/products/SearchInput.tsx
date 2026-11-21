"use client";

import { useState, useEffect } from "react";

export function SearchInput({
  initialSearch,
  status,
}: {
  initialSearch: string;
  status: string;
}) {
  const [searchValue, setSearchValue] = useState(initialSearch ?? "");

  // Keep input synced when navigating via status tabs or browser back/forward
  useEffect(() => {
    setSearchValue(initialSearch ?? "");
  }, [initialSearch]);

  return (
    <form method="GET" className="relative w-full sm:w-80">
      {status !== "ALL" && <input type="hidden" name="status" value={status} />}
      <input
        type="text"
        name="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search products by name..."
        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-10 text-xs text-gray-800 outline-none transition-colors focus:border-[#006B3A] focus:bg-white focus:ring-1 focus:ring-[#006B3A] sm:text-sm"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        🔍
      </button>
    </form>
  );
}