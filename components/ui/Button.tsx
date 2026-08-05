type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const styles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200",
  };

  return (
    <button
      className={`rounded-xl px-5 py-3 font-semibold transition ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}