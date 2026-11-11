
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  note: string;
  icon: LucideIcon;
  trend?: "up" | "down";
}

export default function StatCard({
  title,
  value,
  note,
  icon: Icon,
  trend,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between gap-3">

        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-3 text-[28px] font-bold tracking-tight text-gray-950">
            {value}
          </p>
        </div>

        <span className="rounded-xl bg-[#E6F7F0] p-3 text-[#006B3A]">
          <Icon size={20} strokeWidth={1.9} />
        </span>

      </div>

      <div className="mt-4 flex items-center gap-1.5 text-[11px] text-gray-400">

        {trend === "up" && (
          <span className="font-semibold text-emerald-600">
            ↗
          </span>
        )}

        {trend === "down" && (
          <span className="font-semibold text-rose-600">
            ↘
          </span>
        )}

        <span>{note}</span>

      </div>

    </div>
  );
}
