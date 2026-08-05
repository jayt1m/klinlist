type CheckboxCardProps = {
  title: string;
  description?: string;
  points: number;
  checked: boolean;
  onChange: () => void;
};

export default function CheckboxCard({
  title,
  description,
  points,
  checked,
  onChange,
}: CheckboxCardProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`
        w-full rounded-3xl border p-6 text-left transition-all
        ${
          checked
            ? "border-blue-600 bg-blue-50 shadow-md"
            : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
        }
      `}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            {title}
          </h3>

          {description && (
            <p className="mt-2 text-sm text-gray-500">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-col items-end">
          <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-bold text-white">
            {points >= 0 ? `+${points}` : points}
          </span>

          <div
            className={`
              mt-4 flex h-7 w-7 items-center justify-center rounded-full border-2 transition
              ${
                checked
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300"
              }
            `}
          >
            {checked ? "✓" : ""}
          </div>
        </div>
      </div>
    </button>
  );
}