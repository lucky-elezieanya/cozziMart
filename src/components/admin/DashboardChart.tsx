
export default function DashboardChart() {
  return (
    <div className="flex h-[250px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/70 px-5 text-center">

      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#006B3A] shadow-sm">
        <svg
          viewBox="0 0 24 24"
          width="23"
          height="23"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3v18h18" />
          <path d="m7 14 4-4 3 3 6-7" />
        </svg>
      </div>

      <p className="text-sm font-semibold text-gray-700">
        Sales analytics will appear here
      </p>

      <p className="mt-1 max-w-sm text-xs leading-5 text-gray-400">
        Once your order and payment records are connected, this
        section will display revenue trends, sales performance
        and order statistics.
      </p>

    </div>
  );
}
