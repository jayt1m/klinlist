import { ReactNode } from "react";

type ResultColor = "green" | "yellow" | "red" | "blue";

type ResultCardProps = {
  score: number | string;
  title: string;
  recommendation: string;
  color?: ResultColor;
  unit?: string;
  children?: ReactNode;
};

export default function ResultCard({
  score,
  title,
  recommendation,
  color = "green",
  unit,
  children,
}: ResultCardProps) {
  const colors = {
    green: {
      bg: "bg-emerald-600",
      header: "from-emerald-600 to-emerald-500",
      badge: "bg-emerald-100 text-emerald-700",
      border: "border-emerald-200",
    },
    yellow: {
      bg: "bg-amber-500",
      header: "from-amber-500 to-yellow-500",
      badge: "bg-yellow-100 text-yellow-700",
      border: "border-yellow-200",
    },
    red: {
      bg: "bg-red-600",
      header: "from-red-600 to-red-500",
      badge: "bg-red-100 text-red-700",
      border: "border-red-200",
    },
    blue: {
      bg: "bg-sky-600",
      header: "from-sky-600 to-cyan-500",
      badge: "bg-sky-100 text-sky-700",
      border: "border-sky-200",
    },
  };

  const style = colors[color];

  return (
    <section
      className={`overflow-hidden rounded-3xl border bg-white shadow-sm ${style.border}`}
    >
      <div
        className={`${style.bg} bg-gradient-to-r ${style.header} px-8 py-7 text-white`}
      >
        <p className="text-sm font-medium opacity-90">
          {title}
        </p>

        <div className="mt-4 flex flex-wrap items-end gap-x-3 gap-y-1">
          <span className="text-6xl font-bold leading-none">
            {score}
          </span>

          {unit && (
            <span className="pb-2 text-lg opacity-90">
              {unit}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-5 p-8">

        <div
          className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${style.badge}`}
        >
          {recommendation}
        </div>

        {children}

      </div>
    </section>
  );
}