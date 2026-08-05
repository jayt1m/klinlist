"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

type ExpandableCardProps = {
  title: string;
  children: React.ReactNode;
};

export default function ExpandableCard({
  title,
  children,
}: ExpandableCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-6 text-left transition hover:bg-gray-50"
      >

        <div className="flex items-center gap-3">

          <Info className="h-5 w-5 text-blue-600" />

          <span className="font-semibold">
            {title}
          </span>

        </div>

        {open ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}

      </button>

      {open && (
        <div className="border-t border-gray-100 p-6">

          {children}

        </div>
      )}

    </div>
  );
}