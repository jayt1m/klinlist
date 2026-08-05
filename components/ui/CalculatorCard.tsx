import { ReactNode } from "react";

type CalculatorCardProps = {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function CalculatorCard({
  title,
  subtitle,
  icon,
  children,
  className = "",
}: CalculatorCardProps) {
  return (
    <section
      className={`
        overflow-hidden
        rounded-3xl
        border
        border-zinc-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:shadow-md
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="border-b border-zinc-100 bg-gradient-to-r from-emerald-50 to-white px-8 py-6">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                {icon}
              </div>
            )}

            <div>
              {title && (
                <h2 className="text-xl font-semibold text-zinc-900">
                  {title}
                </h2>
              )}

              {subtitle && (
                <p className="mt-1 text-sm text-zinc-500">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="p-8">
        {children}
      </div>
    </section>
  );
}