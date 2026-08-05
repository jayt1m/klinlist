"use client";

import { ReactNode } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  unit?: string;
  icon?: ReactNode;
};

export default function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "number",
  unit,
  icon,
}: Props) {
  return (
    <div className="space-y-2">

      <label className="block text-sm font-medium text-zinc-700">
        {label}
      </label>

      <div className="relative">

        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`
            h-14
            w-full
            rounded-2xl
            border
            border-zinc-300
            bg-white
            text-base
            transition-all
            duration-200
            outline-none

            ${icon ? "pl-12" : "pl-4"}
            ${unit ? "pr-16" : "pr-4"}

            focus:border-emerald-500
            focus:ring-4
            focus:ring-emerald-100
          `}
        />

        {unit && (
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-zinc-500">
            {unit}
          </div>
        )}

      </div>

    </div>
  );
}