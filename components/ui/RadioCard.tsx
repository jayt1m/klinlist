"use client";

type Option = {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
};

type RadioCardProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  columns?: 1 | 2 | 3 | 4;
};

export default function RadioCard({
  label,
  value,
  onChange,
  options,
  columns = 2,
}: RadioCardProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-semibold text-zinc-700">
          {label}
        </label>
      )}

      <div className={`grid gap-3 ${gridCols[columns]}`}>
        {options.map((option) => {
          const active = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`
                group
                rounded-2xl
                border
                p-4
                text-left
                transition-all
                duration-200

                ${
                  active
                    ? "border-emerald-500 bg-emerald-50 shadow-sm ring-2 ring-emerald-100"
                    : "border-zinc-200 bg-white hover:border-emerald-300 hover:shadow-sm"
                }
              `}
            >
              {option.icon && (
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 group-hover:bg-emerald-100 group-hover:text-emerald-700">
                  {option.icon}
                </div>
              )}

              <div className="font-semibold text-zinc-900">
                {option.label}
              </div>

              {option.description && (
                <div className="mt-1 text-sm leading-5 text-zinc-500">
                  {option.description}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}