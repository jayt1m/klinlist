"use client";

type Option = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  value: string;
  selected: string;
  options: Option[];
  onChange: (value: string) => void;
  onSelectChange: (value: string) => void;
};

export default function InputWithSelect({
  label,
  value,
  selected,
  options,
  onChange,
  onSelectChange,
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

        <select
          value={selected}
          onChange={(e) => onSelectChange(e.target.value)}
          className="min-w-[130px] border-l border-zinc-200 bg-zinc-50 px-4 text-sm font-medium outline-none"
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

      </div>
    </div>
  );
}