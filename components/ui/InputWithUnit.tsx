"use client";

type Props = {
  label: string;
  value: string;
  unit: string;
  onChange: (value: string) => void;
};

export default function InputWithUnit({
  label,
  value,
  unit,
  onChange,
}: Props) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-700">
        {label}
      </label>

      <div className="flex overflow-hidden rounded-2xl border border-zinc-300 bg-white transition-all duration-200 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">

        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 border-0 bg-transparent px-4 py-3 text-base font-medium outline-none"
        />

        <div className="flex min-w-[72px] items-center justify-center border-l border-zinc-200 bg-zinc-50 px-4 text-sm font-medium text-zinc-600">
          {unit}
        </div>

      </div>
    </div>
  );
}