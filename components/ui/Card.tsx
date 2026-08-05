type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-gray-100
        bg-white
        p-8
        shadow-sm
        transition
        hover:-translate-y-2
        hover:shadow-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}