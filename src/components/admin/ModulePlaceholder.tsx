
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import PageHeading from "./PageHeading";

interface ModulePlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  nextStep: string;
}

export default function ModulePlaceholder({
  title,
  description,
  icon: Icon,
  nextStep,
}: ModulePlaceholderProps) {
  return (
    <div className="space-y-8">

      <PageHeading
        eyebrow="STORE MANAGEMENT"
        title={title}
        description={description}
      />

      <div className="flex min-h-[340px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center shadow-sm">

        <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E6F7F0] text-[#006B3A]">
          <Icon size={28} strokeWidth={1.8} />
        </span>

        <h2 className="text-lg font-semibold text-gray-900">
          {title} Workspace
        </h2>

        <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500">
          {description}
        </p>

        <div className="mt-5 max-w-xl rounded-xl bg-gray-50 p-4">
          <p className="text-xs font-semibold text-gray-700">
            Planned functionality
          </p>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            {nextStep}
          </p>
        </div>

        <p className="mt-5 text-xs text-gray-400">
          This section is awaiting its database and API integration.
        </p>

        <Link
          href="/admin"
          className="mt-6 rounded-xl bg-[#006B3A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004D2A]"
        >
          Back to dashboard
        </Link>

      </div>

    </div>
  );
}
